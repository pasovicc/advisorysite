import { NextResponse } from "next/server";
import { RateLimitError, enforceRateLimit } from "@/lib/auth/rate-limit";
import {
  forbiddenResponse,
  rateLimitResponse,
  serverErrorResponse,
  validationError
} from "@/lib/auth/responses";
import { createSessionCookie, setSessionCookie } from "@/lib/auth/session";
import { InvalidCredentialError, signInWithFirebasePassword, updateLastLogin } from "@/lib/auth/store";
import { loginSchema } from "@/lib/auth/validation";
import { clientIp, sameOriginRequest } from "@/lib/server/security";

export const runtime = "nodejs";

const invalidLogin = NextResponse.json(
  { error: "Email or password is incorrect." },
  { status: 401 }
);

export async function POST(request: Request) {
  if (!sameOriginRequest(request)) {
    return forbiddenResponse();
  }

  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const { email, password } = parsed.data;

  try {
    await enforceRateLimit({
      key: `login:${clientIp(request)}:${email}`,
      limit: 5,
      windowMs: 15 * 60 * 1000
    });

    const { idToken, user } = await signInWithFirebasePassword({ email, password });
    await updateLastLogin(user.id);

    const sessionCookie = await createSessionCookie(idToken);
    const response = NextResponse.json({
      user
    });
    setSessionCookie(response, sessionCookie);

    return response;
  } catch (error) {
    if (error instanceof RateLimitError) {
      return rateLimitResponse(error);
    }

    if (error instanceof InvalidCredentialError) {
      return invalidLogin;
    }

    return serverErrorResponse();
  }
}
