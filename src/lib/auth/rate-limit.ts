import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { firestore } from "@/lib/server/firebase";

type RateLimitInput = {
  key: string;
  limit: number;
  windowMs: number;
};

export class RateLimitError extends Error {
  retryAfterSeconds: number;

  constructor(retryAfterSeconds: number) {
    super("Too many attempts. Please try again later.");
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

function cleanKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9_.:@-]/g, "_").slice(0, 200);
}

export async function enforceRateLimit({ key, limit, windowMs }: RateLimitInput) {
  const db = firestore();
  const now = new Date();
  const resetAt = new Date(now.getTime() + windowMs);
  const normalizedKey = cleanKey(key);
  const rateLimitRef = db.collection("rateLimits").doc(normalizedKey);

  await db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(rateLimitRef);
    const record = snapshot.exists ? snapshot.data() : null;
    const recordResetAt = record?.resetAt instanceof Timestamp ? record.resetAt.toDate() : null;

    if (!record || !recordResetAt || recordResetAt <= now) {
      transaction.set(rateLimitRef, {
        count: 1,
        createdAt: record?.createdAt || FieldValue.serverTimestamp(),
        resetAt: Timestamp.fromDate(resetAt),
        updatedAt: FieldValue.serverTimestamp()
      });
      return;
    }

    const count = Number(record.count || 0);

    if (count >= limit) {
      const retryAfterSeconds = Math.max(1, Math.ceil((recordResetAt.getTime() - now.getTime()) / 1000));
      throw new RateLimitError(retryAfterSeconds);
    }

    transaction.update(rateLimitRef, {
      count: FieldValue.increment(1),
      updatedAt: FieldValue.serverTimestamp()
    });
  });
}

export async function cleanupExpiredRateLimits() {
  const snapshot = await firestore()
    .collection("rateLimits")
    .where("resetAt", "<", Timestamp.fromDate(new Date()))
    .limit(100)
    .get();
  const batch = firestore().batch();

  snapshot.docs.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();
}
