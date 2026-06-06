import { NextResponse } from "next/server";
import { clearSessionCookie, revokeCurrentSession } from "@/lib/auth/session";
import { forbiddenResponse, serverErrorResponse } from "@/lib/auth/responses";
import { sameOriginRequest } from "@/lib/server/security";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!sameOriginRequest(request)) {
    return forbiddenResponse();
  }

  try {
    await revokeCurrentSession();
    const response = NextResponse.json({ ok: true });
    clearSessionCookie(response);

    return response;
  } catch {
    return serverErrorResponse();
  }
}
