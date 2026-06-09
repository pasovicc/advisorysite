"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { useAuth } from "@/components/auth/AuthProvider";

type ConsultationCTAProps = {
  content: {
    eyebrow?: string;
    title: string;
    text: string;
    primaryCta?: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
    primary?: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
  compact?: boolean;
};

const benefits = [
  "Clarify the transformation or governance challenge",
  "Identify the right advisory, workshop or education format",
  "Define practical next steps for leadership and delivery teams"
];

const sessionDetails = [
  { label: "Duration", value: "30-minute introductory call" },
  { label: "Format", value: "Online consultation" },
  { label: "Focus", value: "AI, governance and project leadership" }
];

const timeSlots = ["09:00", "10:30", "12:00", "13:30", "15:00"];
const weekdayLabels = ["M", "T", "W", "T", "F", "S", "S"];
const fallbackMonth = new Date(2026, 4, 1);

export function ConsultationCTA({ content, compact = false }: ConsultationCTAProps) {
  const primary = content.primaryCta || content.primary;
  const secondary = content.secondaryCta || content.secondary;
  const external = primary?.href.startsWith("http");

  return (
    <section
      id={compact ? undefined : "schedule-consultation"}
      className={`${compact ? "pb-20" : "scroll-mt-24 py-20 lg:py-24"} bg-porcelain`}
    >
      <Reveal className="container-shell">
        <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-premium">
          <div className="absolute inset-y-0 right-0 hidden w-2/5 bg-navy lg:block" />
          <div className="absolute right-0 top-0 hidden h-full w-2/5 opacity-70 lg:block">
            <div className="hero-boardroom-motion h-full w-full" />
          </div>
          <div className="relative grid gap-10 p-7 md:p-10 lg:grid-cols-[1fr_0.92fr] lg:p-12">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-gold">
                {content.eyebrow || "Schedule Consultation"}
              </p>
              <h2 className="font-display text-4xl leading-[1.05] text-navy md:text-5xl">
                {content.title}
              </h2>
              <p className="mt-5 text-base font-medium leading-8 text-slate-700">{content.text}</p>

              <div className="mt-8 grid gap-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex gap-3">
                    <Icon name="CheckCircle2" className="mt-1 h-4 w-4 shrink-0 text-gold" />
                    <p className="text-sm font-bold leading-6 text-slate-700">{benefit}</p>
                  </div>
                ))}
              </div>

              {secondary ? (
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={secondary.href}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-navy transition hover:-translate-y-0.5 hover:border-gold/70"
                  >
                    {secondary.label}
                    <Icon name="ArrowRight" className="h-4 w-4" />
                  </Link>
                </div>
              ) : null}
            </div>

            {compact ? <CompactConsultationCard primary={primary} external={external} /> : <BookingCalendar />}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function CompactConsultationCard({
  primary,
  external
}: {
  primary?: { label: string; href: string };
  external?: boolean;
}) {
  return (
    <div className="relative rounded-lg border border-slate-200 bg-porcelain p-5 shadow-card lg:border-white/[0.15] lg:bg-white/[0.95]">
      <div className="flex items-start gap-4 border-b border-slate-200 pb-5">
        <div className="grid h-12 w-12 place-items-center rounded-lg bg-navy text-gold">
          <Icon name="Calendar" className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Consultation</p>
          <h3 className="mt-1 font-display text-3xl leading-tight text-navy">
            30-minute introductory call
          </h3>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {sessionDetails.map((detail) => (
          <div
            key={detail.label}
            className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white px-4 py-3"
          >
            <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-600">
              {detail.label}
            </span>
            <span className="text-right text-sm font-extrabold text-navy">{detail.value}</span>
          </div>
        ))}
      </div>

      {primary ? (
        <Link
          href={primary.href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-navy bg-navy px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
        >
          <Icon name="Calendar" className="h-4 w-4" />
          {primary.label}
        </Link>
      ) : null}
    </div>
  );
}

function BookingCalendar() {
  const { user, profile, loading } = useAuth();
  const [monthDate, setMonthDate] = useState(fallbackMonth);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const calendarDays = useMemo(() => getCalendarDays(monthDate), [monthDate]);
  const monthTitle = useMemo(
    () => monthDate.toLocaleDateString("en", { month: "long", year: "numeric" }),
    [monthDate]
  );
  const selectedLabel = selectedDate
    ? selectedDate.toLocaleDateString("en", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      })
    : "Select a date";

  useEffect(() => {
    const now = new Date();
    setMonthDate(new Date(now.getFullYear(), now.getMonth(), 1));
  }, []);

  function changeMonth(offset: number) {
    setMonthDate((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
    setSelectedDate(null);
    setSelectedTime("");
    setConfirmed(false);
    setError("");
  }

  function selectDate(day: Date) {
    if (isPastDay(day)) {
      return;
    }

    setSelectedDate(day);
    setSelectedTime("");
    setConfirmed(false);
    setError("");
  }

  function selectTime(time: string) {
    setSelectedTime(time);
    setConfirmed(false);
    setError("");
  }

  async function requestConsultation() {
    setError("");
    setConfirmed(false);

    if (!selectedDate || !selectedTime) {
      setError("Choose a valid date and time before requesting a consultation.");
      return;
    }

    if (isPastDay(selectedDate)) {
      setError("Please choose a future date.");
      return;
    }

    if (!user) {
      setError("Please log in or register before requesting a consultation.");
      return;
    }

    setSubmitting(true);

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookingDate: dateValue(selectedDate),
        bookingTime: selectedTime,
        notes
      })
    }).catch(() => null);

    setSubmitting(false);

    if (!response) {
      setError("Could not reach the booking service. Please try again.");
      return;
    }

    const data = (await response.json().catch(() => null)) as { error?: string } | null;

    if (!response.ok) {
      setError(data?.error || "Could not save your consultation request. Please try again.");
      return;
    }

    setConfirmed(true);
  }

  return (
    <div className="relative rounded-lg border border-slate-200 bg-porcelain p-4 shadow-card lg:border-white/[0.15] lg:bg-white/[0.95] md:p-5">
      <div className="flex items-start gap-4 border-b border-slate-200 pb-5">
        <div className="grid h-12 w-12 place-items-center rounded-lg bg-navy text-gold">
          <Icon name="Calendar" className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
            Schedule Consultation
          </p>
          <h3 className="mt-1 font-display text-3xl leading-tight text-navy">
            Choose a preferred time
          </h3>
        </div>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[0.9fr_1fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-navy transition hover:border-gold/60 hover:bg-gold/10"
              aria-label="Previous month"
            >
              <span aria-hidden="true">{"<"}</span>
            </button>
            <p className="text-sm font-extrabold text-navy">{monthTitle}</p>
            <button
              type="button"
              onClick={() => changeMonth(1)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-navy transition hover:border-gold/60 hover:bg-gold/10"
              aria-label="Next month"
            >
              <span aria-hidden="true">{">"}</span>
            </button>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[10px] font-extrabold uppercase text-slate-500">
            {weekdayLabels.map((day, index) => (
              <span key={`${day}-${index}`}>{day}</span>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-7 gap-1.5">
            {calendarDays.map((day, index) =>
              day ? (
                <button
                  type="button"
                  key={dateKey(day)}
                  onClick={() => selectDate(day)}
                  disabled={isPastDay(day)}
                  className={`aspect-square rounded-lg border text-sm font-extrabold transition ${
                    selectedDate && sameDay(day, selectedDate)
                      ? "border-gold bg-gold text-navy shadow-sm"
                      : isPastDay(day)
                        ? "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300"
                      : "border-slate-200 bg-porcelain text-navy hover:border-gold/60 hover:bg-gold/10"
                  }`}
                >
                  {day.getDate()}
                </button>
              ) : (
                <span key={`blank-${index}`} className="aspect-square rounded-lg" />
              )
            )}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-gold">
              Available Times
            </p>
            <p className="mt-2 text-sm font-bold text-navy">{selectedLabel}</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {timeSlots.map((time) => (
                <button
                  type="button"
                  key={time}
                  onClick={() => selectTime(time)}
                  disabled={!selectedDate}
                  style={
                    selectedTime === time
                      ? { backgroundColor: "#0F172A", borderColor: "#C8A96B", color: "#FFFFFF" }
                      : undefined
                  }
                  className={`rounded-lg border px-3 py-3 text-sm font-extrabold transition disabled:cursor-not-allowed disabled:opacity-45 ${
                    selectedTime === time
                      ? "border-gold bg-navy text-white"
                      : "border-slate-200 bg-porcelain text-navy hover:border-gold/60 hover:bg-white"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-gold/[0.35] bg-gold/10 p-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-gold">
              Selection
            </p>
            <p className="mt-2 text-sm font-bold leading-6 text-navy">
              {selectedDate && selectedTime
                ? `${selectedLabel} at ${selectedTime}`
                : "Choose a date and available time slot."}
            </p>
            {!loading && user ? (
              <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.16em] text-slate-600">
                Booking as {profile?.full_name || user.email}
              </p>
            ) : null}
          </div>

          <label className="grid gap-2 rounded-lg border border-slate-200 bg-white p-4 text-sm font-extrabold text-navy">
            Notes <span className="font-semibold text-slate-500">(optional)</span>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value.slice(0, 1000))}
              rows={3}
              placeholder="PMO, AI governance, DORA readiness..."
              className="resize-none rounded-lg border border-slate-300 bg-porcelain px-3 py-2.5 text-sm font-semibold text-navy outline-none transition placeholder:text-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/20"
            />
          </label>

          <button
            type="button"
            disabled={!selectedDate || !selectedTime || submitting}
            onClick={() => void requestConsultation()}
            style={
              selectedDate && selectedTime
                ? { backgroundColor: "#0F172A", borderColor: "#0F172A" }
                : undefined
            }
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-navy bg-navy px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-slate-300"
          >
            <Icon name="CheckCircle2" className="h-4 w-4" />
            {submitting ? "Saving request..." : "Request Consultation"}
          </button>

          {!loading && !user ? (
            <div className="rounded-lg border border-gold/35 bg-white px-4 py-3 text-sm font-bold leading-6 text-navy">
              Log in or register to save your consultation request.
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href="/login?next=%2F%23schedule-consultation"
                  className="rounded-lg border border-navy bg-navy px-3 py-2 text-xs font-extrabold text-white"
                >
                  Log in
                </Link>
                <Link
                  href="/register?next=%2F%23schedule-consultation"
                  className="rounded-lg border border-slate-300 bg-porcelain px-3 py-2 text-xs font-extrabold text-navy"
                >
                  Register
                </Link>
              </div>
            </div>
          ) : null}

          {error ? (
            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold leading-6 text-red-800">
              {error}
            </p>
          ) : null}

          {confirmed ? (
            <p className="rounded-lg border border-gold/35 bg-white px-4 py-3 text-sm font-bold leading-6 text-navy">
              Your consultation request was saved. Status: pending.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function getCalendarDays(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingBlanks = (firstDay.getDay() + 6) % 7;
  const totalCells = Math.ceil((leadingBlanks + daysInMonth) / 7) * 7;

  return Array.from({ length: totalCells }, (_, index) => {
    const dayNumber = index - leadingBlanks + 1;
    if (dayNumber < 1 || dayNumber > daysInMonth) {
      return null;
    }
    return new Date(year, month, dayNumber);
  });
}

function dateKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function dateValue(date: Date) {
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function isPastDay(date: Date) {
  const today = new Date();
  const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return normalizedDate < normalizedToday;
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
