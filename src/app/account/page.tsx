import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { Icon } from "@/components/Icon";
import { currentUser } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Account"
};

export default async function AccountPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/login?next=/account");
  }

  return (
    <section className="container-shell py-28">
      <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-gold">Account</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-navy md:text-5xl">
            Welcome, {user.name}.
          </h1>
          <p className="mt-5 max-w-xl text-base font-medium leading-8 text-graphite">
            This area confirms the secure session is active and ready for future account-specific features.
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-card md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-gold text-navy">
                <Icon name="UserRound" className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg font-extrabold text-navy">{user.name}</h2>
                <p className="mt-1 text-sm font-semibold text-graphite">{user.email}</p>
              </div>
            </div>
            <span className="rounded-full border border-slate-200 bg-porcelain px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-graphite">
              {user.role}
            </span>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-6">
            <LogoutButton />
          </div>
        </div>
      </div>
    </section>
  );
}
