type Bucket = {
  count: number;
  resetAt: number;
};

export const PROBE_RATE_LIMIT = {
  maxEvents: 20,
  windowMs: 60_000,
};

declare global {
  var __defiTriangleProbeBuckets: Map<string, Bucket> | undefined;
}

function getBuckets(): Map<string, Bucket> {
  globalThis.__defiTriangleProbeBuckets ??= new Map<string, Bucket>();
  return globalThis.__defiTriangleProbeBuckets;
}

export function clearProbeRateLimit(): void {
  getBuckets().clear();
}

export function isProbeRateLimited(
  key: string,
  now = Date.now(),
  limit = PROBE_RATE_LIMIT
): boolean {
  const buckets = getBuckets();
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, {
      count: 1,
      resetAt: now + limit.windowMs,
    });
    pruneBuckets(buckets, now);
    return false;
  }

  current.count += 1;
  return current.count > limit.maxEvents;
}

function pruneBuckets(buckets: Map<string, Bucket>, now: number): void {
  if (buckets.size < 2_000) {
    return;
  }

  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}
