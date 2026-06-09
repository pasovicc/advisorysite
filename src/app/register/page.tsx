"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { Icon } from "@/components/Icon";
import { useAuth } from "@/components/auth/AuthProvider";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { registerSchema } from "@/lib/validation";

function getRegistrationErrorMessage(message?: string) {
  const normalized = (message || "").toLowerCase();

  if (
    normalized.includes("already registered") ||
    normalized.includes("already exists") ||
    normalized.includes("user already")
  ) {
    return "This email is already registered. Please log in instead.";
  }

  if (normalized.includes("signup") && normalized.includes("disabled")) {
    return "Registration is currently disabled. Please contact the site owner.";
  }

  if (
    normalized.includes("confirmation") ||
    normalized.includes("smtp") ||
    normalized.includes("email provider") ||
    normalized.includes("send")
  ) {
    return "Registration failed because the confirmation email could not be sent. Check Supabase email confirmation or SMTP settings.";
  }

  if (
    normalized.includes("rate") ||
    normalized.includes("too many") ||
    normalized.includes("only request") ||
    normalized.includes("security purposes")
  ) {
    return "Too many registration attempts. Please wait a moment and try again.";
  }

  if (normalized.includes("password")) {
    return "Registration failed. Please check that the password meets the requirements.";
  }

  if (normalized.includes("email")) {
    return "Registration failed. Please check the email address and try again.";
  }

  return "Registration failed. Please try again.";
}

export default function RegisterPage() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const router = useRouter();
  const { refreshProfile } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");

    const parsed = registerSchema.safeParse({ fullName, email, password, confirmPassword });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || "Check your registration details.");
      return;
    }

    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
        data: {
          full_name: parsed.data.fullName
        }
      }
    });

    if (signUpError) {
      setError(getRegistrationErrorMessage(signUpError.message));
      setLoading(false);
      return;
    }

    if (!data.session) {
      setNotice("Registration received. Please check your email to confirm the account before logging in.");
      setLoading(false);
      return;
    }

    const profileResponse = await fetch("/api/profiles/ensure", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName: parsed.data.fullName, email: parsed.data.email })
    }).catch(() => null);

    if (profileResponse && !profileResponse.ok) {
      setNotice("Account created. Profile setup will be retried automatically after login.");
    }

    await refreshProfile();
    router.push("/");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-porcelain px-4 py-28">
      <section className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-premium lg:grid-cols-[0.92fr_1fr]">
        <div className="bg-navy p-8 text-white md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">Create Account</p>
          <h1 className="mt-5 font-display text-5xl leading-[1.02]">Start with a secure account.</h1>
          <p className="mt-5 max-w-md text-base font-medium leading-8 text-slate-200">
            Accounts are protected by Supabase Authentication and server-side booking checks.
          </p>
        </div>

        <form onSubmit={onSubmit} className="grid gap-5 p-8 md:p-12">
          <label className="grid gap-2 text-sm font-extrabold text-navy">
            Full name
            <input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              autoComplete="name"
              className="rounded-lg border border-slate-300 bg-white px-4 py-3 font-semibold text-navy outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
            />
          </label>
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
            <span className="relative">
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 pr-12 font-semibold text-navy outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md text-slate-500 transition hover:bg-porcelain hover:text-navy"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <Icon name={showPassword ? "EyeOff" : "Eye"} className="h-4 w-4" />
              </button>
            </span>
          </label>
          <label className="grid gap-2 text-sm font-extrabold text-navy">
            Confirm password
            <span className="relative">
              <input
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 pr-12 font-semibold text-navy outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((value) => !value)}
                className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md text-slate-500 transition hover:bg-porcelain hover:text-navy"
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} className="h-4 w-4" />
              </button>
            </span>
          </label>
          <p className="rounded-lg border border-slate-200 bg-porcelain px-4 py-3 text-sm font-bold leading-6 text-graphite">
            Use at least 12 characters with uppercase, lowercase, and a number.
          </p>

          {error ? (
            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-800">
              {error}
            </p>
          ) : null}
          {notice ? (
            <p className="rounded-lg border border-gold/40 bg-gold/10 px-4 py-3 text-sm font-bold text-navy">
              {notice}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-navy bg-navy px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Icon name="Briefcase" className="h-4 w-4" />
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="text-center text-sm font-semibold text-graphite">
            Already have an account?{" "}
            <Link href="/login" className="font-extrabold text-navy underline">
              Log in
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
