import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/AuthForm";
import { currentUser } from "@/lib/auth/session";
import { safeRedirectPath } from "@/lib/auth/redirect";

export const metadata: Metadata = {
  title: "Sign Up"
};

export default async function SignupPage({
  searchParams
}: {
  searchParams?: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const nextPath = safeRedirectPath(params?.next);
  const user = await currentUser();

  if (user) {
    redirect(nextPath);
  }

  return (
    <section className="container-shell grid min-h-[calc(100vh-72px)] place-items-center px-0 py-28">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-premium lg:grid-cols-[0.92fr_1.08fr]">
        <div className="bg-navy p-8 text-white md:p-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-gold">Create Account</p>
          <h1 className="mt-5 font-display text-4xl leading-tight md:text-5xl">Start with a secure account.</h1>
          <p className="mt-5 max-w-md text-base font-medium leading-7 text-slate-300">
            Accounts are protected by Firebase Authentication, rate limits, and HttpOnly session cookies.
          </p>
        </div>
        <div className="p-6 md:p-10">
          <AuthForm mode="signup" nextPath={nextPath} />
        </div>
      </div>
    </section>
  );
}
