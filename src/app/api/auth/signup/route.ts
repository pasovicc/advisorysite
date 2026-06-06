import { NextResponse } from "next/server";
import { RateLimitError, enforceRateLimit } from "@/lib/auth/rate-limit";
import {
  forbiddenResponse,
  rateLimitResponse,
  serverErrorResponse,
  validationError
} from "@/lib/auth/responses";
import { createSessionCookie, setSessionCookie } from "@/lib/auth/session";
import {
  DuplicateUserError,
  createFirebaseUser,
  signInNewFirebaseUser,
  updateLastLogin
} from "@/lib/auth/store";
import { signupSchema } from "@/lib/auth/validation";
import { clientIp, sameOriginRequest } from "@/lib/server/security";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!sameOriginRequest(request)) {
    return forbiddenResponse();
  }

  const body = await request.json().catch(() => null);
  const parsed = signupSchema.safeParse(body);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const { email, name, password } = parsed.data;

  try {
    await enforceRateLimit({
      key: `signup:${clientIp(request)}:${email}`,
      limit: 3,
      windowMs: 60 * 60 * 1000
    });

    const user = await createFirebaseUser({ email, name, password });
    const { idToken } = await signInNewFirebaseUser({ email, password });
    await updateLastLogin(user.id);

    const sessionCookie = await createSessionCookie(idToken);
    const response = NextResponse.json({ user }, { status: 201 });
    setSessionCookie(response, sessionCookie);

    return response;
  } catch (error) {
    if (error instanceof RateLimitError) {
      return rateLimitResponse(error);
    }

    if (error instanceof DuplicateUserError) {
      return NextResponse.json(
        { error: "An account with that email already exists." },
        { status: 409 }
      );
    }

    return serverErrorResponse();
  }
}
