import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { enforceRateLimit } from "@/lib/security/rateLimit";
import { profileEnsureSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const limited = enforceRateLimit(request, "profile-ensure", {
    limit: 20,
    windowMs: 60_000
  });

  if (limited) {
    return limited;
  }

  const body = await request.json().catch(() => ({}));
  const parsed = profileEnsureSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid profile details." }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Please log in to continue." }, { status: 401 });
  }

  const email = user.email || parsed.data.email || "";
  const fullName =
    parsed.data.fullName ||
    (typeof user.user_metadata?.full_name === "string" ? user.user_metadata.full_name : "") ||
    email.split("@")[0] ||
    "User";

  const { data, error } = await supabase
    .from("profiles")
    .upsert(
      {
        id: user.id,
        full_name: fullName,
        email
      },
      { onConflict: "id" }
    )
    .select("id, full_name, email, created_at")
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Could not prepare your profile. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ profile: data });
}
