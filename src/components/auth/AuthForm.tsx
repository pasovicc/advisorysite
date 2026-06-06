"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Icon } from "@/components/Icon";

type AuthMode = "login" | "signup";

type AuthFormProps = {
  mode: AuthMode;
  nextPath: string;
};

type AuthResponse = {
  error?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
};

export function AuthForm({ mode, nextPath }: AuthFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const payload =
      mode === "signup"
        ? {
            email: String(form.get("email") || ""),
            name: String(form.get("name") || ""),
            password: String(form.get("password") || "")
          }
        : {
            email: String(form.get("email") || ""),
            password: String(form.get("password") || "")
          };

    try {
      const response = await fetch(`/api/auth/${mode}`, {
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      });
      const data = (await response.json()) as AuthResponse;

      if (!response.ok) {
        setError(data.error || "Authentication failed. Please try again.");
        return;
      }

      router.push(nextPath);
      router.refresh();
    } catch {
      setError("Authentication service is unavailable. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const isSignup = mode === "signup";

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      {isSignup ? (
        <label className="grid gap-2 text-sm font-bold text-navy">
          Full name
          <input
            autoComplete="name"
            className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-base font-semibold text-navy outline-none transition placeholder:text-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/25"
            name="name"
            required
            type="text"
          />
        </label>
      ) : null}

      <label className="grid gap-2 text-sm font-bold text-navy">
        Email
        <input
          autoComplete="email"
          className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-base font-semibold text-navy outline-none transition placeholder:text-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/25"
          name="email"
          required
          type="email"
        />
      </label>

      <label className="grid gap-2 text-sm font-bold text-navy">
        Password
        <input
          autoComplete={isSignup ? "new-password" : "current-password"}
          className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-base font-semibold text-navy outline-none transition placeholder:text-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/25"
          minLength={isSignup ? 12 : undefined}
          name="password"
          required
          type="password"
        />
      </label>

      {isSignup ? (
        <p className="rounded-lg border border-slate-200 bg-porcelain px-4 py-3 text-sm font-semibold leading-6 text-graphite">
          Use at least 12 characters with uppercase, lowercase, and a number.
        </p>
      ) : null}

      {error ? (
        <div
          className="rounded-lg border border-oxblood/30 bg-oxblood/10 px-4 py-3 text-sm font-bold text-oxblood"
          role="alert"
        >
          {error}
        </div>
      ) : null}

      <button
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-gold/60 bg-navy px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-gold/60 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={loading}
        type="submit"
      >
        <Icon name={isSignup ? "UserPlus" : "LogIn"} className="h-4 w-4" />
        {loading ? "Please wait..." : isSignup ? "Create Account" : "Log In"}
      </button>

      <p className="text-center text-sm font-semibold text-graphite">
        {isSignup ? "Already have an account?" : "Need an account?"}{" "}
        <Link
          className="font-extrabold text-navy underline decoration-gold/70 underline-offset-4 transition hover:text-gold"
          href={isSignup ? `/login?next=${encodeURIComponent(nextPath)}` : "/signup"}
        >
          {isSignup ? "Log in" : "Sign up"}
        </Link>
      </p>
    </form>
  );
}
