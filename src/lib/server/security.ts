import { createHash } from "crypto";

export function sha256Hex(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function clientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const netlifyIp = request.headers.get("x-nf-client-connection-ip")?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();

  return forwardedFor || netlifyIp || realIp || "unknown";
}

export function sameOriginRequest(request: Request) {
  const origin = request.headers.get("origin");

  if (!origin) {
    return true;
  }

  const requestOrigin = new URL(request.url).origin;
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL).origin
    : requestOrigin;

  return origin === requestOrigin || origin === configuredOrigin;
}
