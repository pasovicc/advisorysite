"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/supabase/types";

type AuthContextValue = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(
    async (userId: string) => {
      const { data } = await supabase
        .from("profiles")
        .select("id, full_name, email, created_at")
        .eq("id", userId)
        .maybeSingle();

      setProfile((data as Profile | null) || null);
    },
    [supabase]
  );

  const refreshProfile = useCallback(async () => {
    const {
      data: { user: currentUser }
    } = await supabase.auth.getUser();

    setUser(currentUser);

    if (currentUser) {
      await loadProfile(currentUser.id);
    } else {
      setProfile(null);
    }
  }, [loadProfile, supabase]);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) {
        return;
      }

      const sessionUser = data.session?.user || null;
      setUser(sessionUser);

      if (sessionUser) {
        await loadProfile(sessionUser.id);
      }

      setLoading(false);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const sessionUser = session?.user || null;
      setUser(sessionUser);

      if (sessionUser) {
        void loadProfile(sessionUser.id);
      } else {
        setProfile(null);
      }

      setLoading(false);
      router.refresh();
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [loadProfile, router, supabase]);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    router.refresh();
  }, [router, supabase]);

  return (
    <AuthContext.Provider value={{ user, profile, loading, refreshProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
