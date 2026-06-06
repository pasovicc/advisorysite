import { FieldValue, type DocumentData } from "firebase-admin/firestore";
import { firebaseAuth, firestore } from "@/lib/server/firebase";

export type UserRole = "USER" | "ADMIN";

export type PublicUser = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
};

export class DuplicateUserError extends Error {
  constructor() {
    super("An account with that email already exists.");
  }
}

export class InvalidCredentialError extends Error {
  constructor() {
    super("Email or password is incorrect.");
  }
}

function firebaseWebApiKey() {
  const apiKey = process.env.FIREBASE_WEB_API_KEY;

  if (!apiKey) {
    throw new Error("FIREBASE_WEB_API_KEY is required for Firebase Authentication.");
  }

  return apiKey;
}

function firebaseAuthErrorMessage(error: unknown) {
  if (!(error instanceof Error)) {
    return "";
  }

  return error.message;
}

function firebaseRestErrorCode(errorBody: unknown) {
  if (
    errorBody &&
    typeof errorBody === "object" &&
    "error" in errorBody &&
    errorBody.error &&
    typeof errorBody.error === "object" &&
    "message" in errorBody.error
  ) {
    return String(errorBody.error.message);
  }

  return "";
}

async function firebaseAuthRequest<TResponse>(path: string, payload: Record<string, unknown>) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/${path}?key=${firebaseWebApiKey()}`,
    {
      body: JSON.stringify({
        returnSecureToken: true,
        ...payload
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    }
  );
  const data = (await response.json().catch(() => null)) as TResponse;

  if (!response.ok) {
    const code = firebaseRestErrorCode(data);

    if (code === "EMAIL_EXISTS") {
      throw new DuplicateUserError();
    }

    if (
      code === "EMAIL_NOT_FOUND" ||
      code === "INVALID_PASSWORD" ||
      code === "INVALID_LOGIN_CREDENTIALS" ||
      code === "USER_DISABLED"
    ) {
      throw new InvalidCredentialError();
    }

    throw new Error(`Firebase Authentication failed: ${code || response.status}`);
  }

  return data;
}

function publicUserFromData(id: string, data: DocumentData | undefined): PublicUser {
  return {
    email: String(data?.email || ""),
    id,
    name: String(data?.name || data?.email || "User"),
    role: data?.role === "ADMIN" ? "ADMIN" : "USER"
  };
}

export async function createFirebaseUser(input: {
  email: string;
  name: string;
  password: string;
}) {
  try {
    const authUser = await firebaseAuth().createUser({
      displayName: input.name,
      email: input.email,
      password: input.password
    });

    await firestore().collection("users").doc(authUser.uid).set({
      createdAt: FieldValue.serverTimestamp(),
      email: input.email,
      emailVerifiedAt: null,
      name: input.name,
      role: "USER",
      updatedAt: FieldValue.serverTimestamp()
    });

    return {
      email: input.email,
      id: authUser.uid,
      name: input.name,
      role: "USER" as const
    };
  } catch (error) {
    if (firebaseAuthErrorMessage(error).includes("auth/email-already-exists")) {
      throw new DuplicateUserError();
    }

    throw error;
  }
}

export async function signInWithFirebasePassword(input: {
  email: string;
  password: string;
}) {
  const data = await firebaseAuthRequest<{
    displayName?: string;
    email?: string;
    idToken: string;
    localId: string;
  }>("accounts:signInWithPassword", {
    email: input.email,
    password: input.password
  });

  const user = await upsertUserProfile({
    email: data.email || input.email,
    id: data.localId,
    name: data.displayName || data.email || input.email
  });

  return {
    idToken: data.idToken,
    user
  };
}

export async function signInNewFirebaseUser(input: {
  email: string;
  password: string;
}) {
  const data = await firebaseAuthRequest<{
    idToken: string;
    localId: string;
  }>("accounts:signInWithPassword", input);

  return {
    idToken: data.idToken,
    userId: data.localId
  };
}

export async function upsertUserProfile(input: {
  id: string;
  email: string;
  name: string;
}) {
  const userRef = firestore().collection("users").doc(input.id);
  const snapshot = await userRef.get();
  const existing = snapshot.data();
  const profile = {
    email: input.email,
    name: existing?.name || input.name,
    role: existing?.role || "USER",
    updatedAt: FieldValue.serverTimestamp()
  };

  await userRef.set(
    {
      ...profile,
      createdAt: existing?.createdAt || FieldValue.serverTimestamp()
    },
    { merge: true }
  );

  return publicUserFromData(input.id, profile);
}

export async function updateLastLogin(userId: string) {
  await firestore().collection("users").doc(userId).set(
    {
      lastLoginAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    },
    { merge: true }
  );
}

export async function getUserProfile(userId: string) {
  const snapshot = await firestore().collection("users").doc(userId).get();

  if (snapshot.exists) {
    return publicUserFromData(snapshot.id, snapshot.data());
  }

  const authUser = await firebaseAuth().getUser(userId);
  return upsertUserProfile({
    email: authUser.email || "",
    id: authUser.uid,
    name: authUser.displayName || authUser.email || "User"
  });
}
