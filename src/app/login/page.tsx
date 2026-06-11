"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { Icon } from "@/components/Icon";
import { useAuth } from "@/components/auth/AuthProvider";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { loginSchema } from "@/lib/validation";

function getLoginErrorMessage(message?: string) {
  const normalized = (message || "").toLowerCase();

  if (normalized.includes("email") && normalized.includes("confirm")) {
    return "Please confirm your email before logging in.";
  }

  if (
    normalized.includes("rate") ||
    normalized.includes("too many") ||
    normalized.includes("security purposes")
  ) {
    return "Too many login attempts. Please wait a moment and try again.";
  }

  return "Login failed. Check your email and password.";
}

export default function LoginPage() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const router = useRouter();
  const { refreshProfile } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const parsed = loginSchema.safeParse({ email, password });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || "Check your login details.");
      return;
    }

    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword(parsed.data);

    if (signInError) {
      setError(getLoginErrorMessage(signInError.message));
      setLoading(false);
      return;
    }

    await fetch("/api/profiles/ensure", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: parsed.data.email })
    }).catch(() => null);
    await refreshProfile();
    router.push("/");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-porcelain px-4 py-28">
      <section className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-premium lg:grid-cols-[0.92fr_1fr]">
        <div className="bg-navy p-8 text-white md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">Welcome Back</p>
          <h1 className="mt-5 font-display text-5xl leading-[1.02]">Log in to continue.</h1>
          <p className="mt-5 max-w-md text-base font-medium leading-8 text-slate-200">
            Sign in to manage your consultations and access personalized advisory services.
          </p>
        </div>

        <form onSubmit={onSubmit} className="grid gap-5 p-8 md:p-12">
          <label className="grid gap-2 text-sm font-extrabold text-navy">
            Email
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              autoComplete="email"
              className="rounded-lg border border-slate-300 bg-white px-4 py-3 font-semibold text-navy outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
            />
          </label>
          <label className="grid gap-2 text-sm font-extrabold text-navy">
            Password
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              autoComplete="current-password"
              className="rounded-lg border border-slate-300 bg-white px-4 py-3 font-semibold text-navy outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
            />
          </label>

          {error ? (
            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-800">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-navy bg-navy px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Icon name="UserRound" className="h-4 w-4" />
            {loading ? "Logging in..." : "Log In"}
          </button>

          <p className="text-center text-sm font-semibold text-graphite">
            Need an account?{" "}
            <Link href="/register" className="font-extrabold text-navy underline">
              Register
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
