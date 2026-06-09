import { z } from "zod";

const passwordSchema = z
  .string()
  .min(12, "Use at least 12 characters.")
  .max(128, "Password is too long.")
  .regex(/[a-z]/, "Add at least one lowercase letter.")
  .regex(/[A-Z]/, "Add at least one uppercase letter.")
  .regex(/[0-9]/, "Add at least one number.");

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address.").max(254),
  password: z.string().min(1, "Password is required.")
});

export const registerSchema = z
  .object({
    fullName: z.string().trim().min(2, "Full name is required.").max(120),
    email: z.string().trim().email("Enter a valid email address.").max(254),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm your password.")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"]
  });

export const profileEnsureSchema = z.object({
  fullName: z.string().trim().min(2).max(120).optional(),
  email: z.string().trim().email().max(254).optional()
});

export const bookingSchema = z.object({
  bookingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Select a valid date."),
  bookingTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Select a valid time.")
    .max(10),
  notes: z.string().trim().max(1000, "Notes must be 1000 characters or less.").optional()
});

export const aiAdvisorRequestSchema = z.object({
  question: z.string().trim().min(1).max(1000).optional(),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(1000)
      })
    )
    .max(8)
    .optional()
});

export function isPastDate(dateValue: string) {
  const today = new Date().toISOString().slice(0, 10);
  return dateValue < today;
}
