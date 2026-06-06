import { NextResponse } from "next/server";
import { RateLimitError } from "@/lib/auth/rate-limit";
import { firstValidationError } from "@/lib/auth/validation";
import type { z } from "zod";

export function validationError(error: z.ZodError) {
  return NextResponse.json(
    {
      error: firstValidationError(error)
    },
    { status: 400 }
  );
}

export function rateLimitResponse(error: RateLimitError) {
  return NextResponse.json(
    {
      error: error.message,
      retryAfterSeconds: error.retryAfterSeconds
    },
    {
      headers: {
        "Retry-After": String(error.retryAfterSeconds)
      },
      status: 429
    }
  );
}

export function forbiddenResponse() {
  return NextResponse.json({ error: "Request origin is not allowed." }, { status: 403 });
}

export function serverErrorResponse() {
  return NextResponse.json({ error: "Authentication service is unavailable." }, { status: 500 });
}
