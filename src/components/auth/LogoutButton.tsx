"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/Icon";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST"
      });
      router.push("/");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-extrabold text-navy shadow-sm transition hover:-translate-y-0.5 hover:border-gold/70 focus:outline-none focus:ring-2 focus:ring-gold/50 disabled:cursor-not-allowed disabled:opacity-70"
      disabled={loading}
      onClick={logout}
      type="button"
    >
      <Icon name="LogOut" className="h-4 w-4" />
      {loading ? "Signing Out..." : "Sign Out"}
    </button>
  );
}
