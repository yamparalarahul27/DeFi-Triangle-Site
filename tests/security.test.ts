import assert from "node:assert/strict";
import { beforeEach, test } from "node:test";
import {
  clearProbeRateLimit,
  isProbeRateLimited,
} from "../src/lib/probe-rate-limit.ts";
import {
  assessRequest,
  isPublicPath,
  isProtectedRoute,
  isScannerUserAgent,
  isSensitivePath,
} from "../src/lib/security.ts";

beforeEach(() => {
  clearProbeRateLimit();
});

test("denies sensitive path probes", () => {
  const deniedPaths = [
    "/.env",
    "/.env.local",
    "/%2eenv",
    "/.git/config",
    "/.terraform.lock.hcl",
    "/state.tfstate",
    "/dump.sql",
    "/app.log",
    "/archive.backup",
    "/admin/config/database.js",
    "/_next/server/app-paths-manifest.json",
  ];

  for (const pathname of deniedPaths) {
    assert.equal(isSensitivePath(pathname), true, pathname);
    assert.deepEqual(
      assessRequest({ method: "GET", pathname }),
      {
        action: "deny",
        reason: "sensitive-path",
        suspicious: true,
      },
      pathname
    );
  }
});

test("denies protected route groups without exposing route existence", () => {
  for (const pathname of [
    "/admin",
    "/admin/users",
    "/internal/jobs",
    "/debug/default/view",
    "/api/internal/reindex",
  ]) {
    assert.equal(isProtectedRoute(pathname) || isSensitivePath(pathname), true);
    assert.equal(assessRequest({ method: "GET", pathname }).action, "deny");
  }
});

test("denies direct Server Action endpoint probes and unsafe methods", () => {
  assert.deepEqual(assessRequest({ method: "POST", pathname: "/_nextjs_action" }), {
    action: "deny",
    reason: "next-action-probe",
    suspicious: true,
  });

  assert.deepEqual(assessRequest({ method: "POST", pathname: "/" }), {
    action: "deny",
    reason: "unsafe-method",
    suspicious: true,
  });
});

test("allows expected public read routes", () => {
  for (const pathname of [
    "/",
    "/log",
    "/log/",
    "/brand/defi_logo_white.svg",
    "/_next/static/chunks/app.js",
    "/robots.txt",
    "/sitemap.xml",
    "/opengraph-image",
  ]) {
    assert.equal(isPublicPath(pathname), true, pathname);
    assert.deepEqual(assessRequest({ method: "GET", pathname }), {
      action: "allow",
      suspicious: false,
    });
  }
});

test("denies unknown paths through the same guarded 404 path", () => {
  assert.deepEqual(assessRequest({ method: "GET", pathname: "/does-not-exist" }), {
    action: "deny",
    reason: "unknown-path",
    suspicious: true,
  });
});

test("detects scanner-like user agents", () => {
  assert.equal(isScannerUserAgent("Mozilla/5.0 nuclei scanner"), true);
  assert.equal(isScannerUserAgent("python-requests/2.31.0"), true);
  assert.equal(isScannerUserAgent("Mozilla/5.0 Safari/605.1.15"), false);
});

test("rate limits repeated suspicious requests per identity", () => {
  const now = 1_000;
  const limit = { maxEvents: 2, windowMs: 60_000 };

  assert.equal(isProbeRateLimited("ip:ua", now, limit), false);
  assert.equal(isProbeRateLimited("ip:ua", now + 1, limit), false);
  assert.equal(isProbeRateLimited("ip:ua", now + 2, limit), true);
  assert.equal(isProbeRateLimited("ip:ua", now + limit.windowMs + 1, limit), false);
});
