import { cert, getApps, initializeApp, type ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

function privateKey() {
  return process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
}

function serviceAccountFromBase64(): ServiceAccount | null {
  const encoded = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;

  if (!encoded) {
    return null;
  }

  return JSON.parse(Buffer.from(encoded, "base64").toString("utf8")) as ServiceAccount;
}

function serviceAccountFromParts(): ServiceAccount | null {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const key = privateKey();

  if (!projectId || !clientEmail || !key) {
    return null;
  }

  return {
    clientEmail,
    privateKey: key,
    projectId
  };
}

function firebaseServiceAccount() {
  const serviceAccount = serviceAccountFromBase64() || serviceAccountFromParts();

  if (!serviceAccount) {
    throw new Error(
      "Firebase credentials are required. Set FIREBASE_SERVICE_ACCOUNT_BASE64 or FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY."
    );
  }

  return serviceAccount;
}

export function firebaseApp() {
  return (
    getApps()[0] ||
    initializeApp({
      credential: cert(firebaseServiceAccount())
    })
  );
}

export function firestore() {
  return getFirestore(firebaseApp());
}

export function firebaseAuth() {
  return getAuth(firebaseApp());
}
