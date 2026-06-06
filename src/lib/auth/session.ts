import { cookies } from "next/headers";
import type { NextResponse } from "next/server";
import { getUserProfile } from "@/lib/auth/store";
import { firebaseAuth } from "@/lib/server/firebase";

const sessionMaxAgeSeconds = 60 * 60 * 24 * 30;
const sessionCookieName =
  process.env.NODE_ENV === "production" ? "__Host-advisory_session" : "advisory_session";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
};

export function setSessionCookie(response: NextResponse, token: string) {
  response.cookies.set(sessionCookieName, token, {
    httpOnly: true,
    maxAge: sessionMaxAgeSeconds,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(sessionCookieName, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });
}

export async function createSessionCookie(idToken: string) {
  return firebaseAuth().createSessionCookie(idToken, {
    expiresIn: sessionMaxAgeSeconds * 1000
  });
}

export async function revokeCurrentSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookieName)?.value;

  if (!token) {
    return;
  }

  await firebaseAuth()
    .verifySessionCookie(token)
    .then((decoded) => firebaseAuth().revokeRefreshTokens(decoded.uid))
    .catch(() => undefined);
}

export async function currentUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookieName)?.value;

  if (!token) {
    return null;
  }

  const decoded = await firebaseAuth().verifySessionCookie(token, true).catch(() => null);

  if (!decoded) {
    return null;
  }

  const user = await getUserProfile(decoded.uid);

  if (!user) {
    return null;
  }

  return {
    email: user.email,
    id: user.id,
    name: user.name,
    role: user.role
  };
}
