import { NextResponse, type NextRequest } from "next/server";
import { getSecurityHeaders } from "./lib/security-headers";
import { assessRequest } from "./lib/security";
import { isProbeRateLimited } from "./lib/probe-rate-limit";

function clientIdentity(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    forwardedFor?.split(",")[0]?.trim() ??
    "unknown";
  const userAgent = request.headers.get("user-agent") ?? "unknown";

  return `${ip}:${userAgent.slice(0, 120)}`;
}

function withSecurityHeaders(response: NextResponse): NextResponse {
  for (const header of getSecurityHeaders(process.env.NODE_ENV === "development")) {
    response.headers.set(header.key, header.value);
  }

  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

function logSecurityEvent(
  request: NextRequest,
  reason: string,
  status: number
): void {
  console.warn(
    JSON.stringify({
      event: "security_probe",
      host: request.headers.get("host"),
      method: request.method,
      path: request.nextUrl.pathname,
      reason,
      status,
      userAgent: request.headers.get("user-agent"),
      xForwardedFor: request.headers.get("x-forwarded-for"),
      timestamp: new Date().toISOString(),
    })
  );
}

function notFoundResponse(): NextResponse {
  return new NextResponse("Not found", {
    status: 404,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

function rateLimitedResponse(): NextResponse {
  return new NextResponse("Too many requests", {
    status: 429,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Retry-After": "60",
    },
  });
}

export function proxy(request: NextRequest) {
  const decision = assessRequest({
    method: request.method,
    pathname: request.nextUrl.pathname,
    userAgent: request.headers.get("user-agent"),
  });

  if (decision.suspicious) {
    const isLimited = isProbeRateLimited(clientIdentity(request));

    if (isLimited) {
      logSecurityEvent(request, "probe-rate-limit", 429);
      return withSecurityHeaders(rateLimitedResponse());
    }
  }

  if (decision.action === "deny") {
    logSecurityEvent(request, decision.reason, 404);
    return withSecurityHeaders(notFoundResponse());
  }

  if (decision.reason === "scanner-user-agent") {
    logSecurityEvent(request, decision.reason, 200);
  }

  return NextResponse.next();
}
