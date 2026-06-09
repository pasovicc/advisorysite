import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { enforceRateLimit } from "@/lib/security/rateLimit";
import { bookingSchema, isPastDate } from "@/lib/validation";

export async function POST(request: Request) {
  const limited = enforceRateLimit(request, "booking-create", {
    limit: 8,
    windowMs: 60_000
  });

  if (limited) {
    return limited;
  }

  const body = await request.json().catch(() => null);
  const parsed = bookingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Please choose a valid date and time." }, { status: 400 });
  }

  if (isPastDate(parsed.data.bookingDate)) {
    return NextResponse.json({ error: "Please choose a future date." }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Please log in before requesting a consultation." }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, email")
    .eq("id", user.id)
    .maybeSingle();

  const email = profile?.email || user.email || "";
  const fullName =
    profile?.full_name ||
    (typeof user.user_metadata?.full_name === "string" ? user.user_metadata.full_name : "") ||
    email.split("@")[0] ||
    "User";

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      user_id: user.id,
      full_name: fullName,
      email,
      booking_date: parsed.data.bookingDate,
      booking_time: parsed.data.bookingTime,
      notes: parsed.data.notes || null,
      status: "pending"
    })
    .select("id, booking_date, booking_time, status")
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Could not save your consultation request. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ booking: data }, { status: 201 });
}
