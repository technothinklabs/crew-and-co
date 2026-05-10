"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./Button";

interface ReserveTableModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormState {
  name: string;
  email: string;
  partySize: string;
  date: string;
  time: string;
  requests: string;
}

const TIME_SLOTS = Array.from({ length: 27 }, (_, i) => {
  const totalMinutes = 9 * 60 + i * 30;
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  const ampm = h < 12 ? "AM" : "PM";
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hour12}:${m.toString().padStart(2, "0")} ${ampm}`;
});

const todayStr = () => new Date().toISOString().split("T")[0];

export default function ReserveTableModal({
  open,
  onClose,
}: ReserveTableModalProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    partySize: "",
    date: "",
    time: "",
    requests: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setSubmitted(false);
        setLoading(false);
        setErrorMsg(null);
        setForm({ name: "", email: "", partySize: "", date: "", time: "", requests: "" });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) onClose();
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Something went wrong");
      }
      setSubmitted(true);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "h-11 w-full rounded-lg border border-cream-400 bg-white px-4 font-sans text-sm text-coffee-900 placeholder:text-coffee-400 transition-all duration-[150ms] focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 hover:border-coffee-300";

  const labelClass = "font-sans text-sm font-medium text-coffee-700";

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-coffee-950/70 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Reserve a table"
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-[0_32px_80px_-10px_rgb(61_21_0_/_0.18)] max-h-[90vh] overflow-y-auto"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-coffee-400 transition-colors hover:bg-cream-200 hover:text-coffee-700 focus-visible:outline-2 focus-visible:outline-gold-500"
          aria-label="Close reservation form"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {submitted ? (
          /* Success state */
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-100">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M6 16l7 7 13-13" stroke="#D4920A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-display text-2xl font-bold text-coffee-900">
              You&rsquo;re on the list!
            </h3>
            <p className="font-sans text-base text-coffee-600 leading-relaxed max-w-sm">
              We&rsquo;ll be in touch at{" "}
              <span className="font-medium text-coffee-900">{form.email}</span> to confirm
              your reservation for{" "}
              <span className="font-medium text-coffee-900">
                {form.partySize} {parseInt(form.partySize) === 1 ? "guest" : "guests"}
              </span>{" "}
              on{" "}
              <span className="font-medium text-coffee-900">
                {new Date(form.date + "T00:00:00").toLocaleDateString("en-GB", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </span>{" "}
              at <span className="font-medium text-coffee-900">{form.time}</span>.
            </p>
            <p className="font-sans text-sm text-coffee-400">
              See you soon at Crew &amp; Co.
            </p>
            <Button variant="primary" size="md" onClick={onClose} className="mt-2">
              Done
            </Button>
          </div>
        ) : (
          /* Form */
          <>
            <div className="mb-6">
              <p className="font-sans text-xs font-medium uppercase tracking-[0.12em] text-coffee-400">
                Crew &amp; Co. · Hackney
              </p>
              <h3 className="font-display text-2xl font-bold text-coffee-900 mt-1">
                Reserve a Table
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="rt-name" className={labelClass}>
                    Full Name <span className="text-spice-500">*</span>
                  </label>
                  <input
                    id="rt-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="rt-party" className={labelClass}>
                    Party Size <span className="text-spice-500">*</span>
                  </label>
                  <select
                    id="rt-party"
                    name="partySize"
                    required
                    value={form.partySize}
                    onChange={handleChange}
                    className={`${inputClass} cursor-pointer appearance-none`}
                  >
                    <option value="">Select…</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "guest" : "guests"}
                      </option>
                    ))}
                    <option value="10">10+ guests</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="rt-email" className={labelClass}>
                  Email Address <span className="text-spice-500">*</span>
                </label>
                <input
                  id="rt-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="rt-date" className={labelClass}>
                    Preferred Date <span className="text-spice-500">*</span>
                  </label>
                  <input
                    id="rt-date"
                    name="date"
                    type="date"
                    required
                    min={todayStr()}
                    value={form.date}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="rt-time" className={labelClass}>
                    Preferred Time <span className="text-spice-500">*</span>
                  </label>
                  <select
                    id="rt-time"
                    name="time"
                    required
                    value={form.time}
                    onChange={handleChange}
                    className={`${inputClass} cursor-pointer appearance-none`}
                  >
                    <option value="">Select…</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="rt-requests" className={labelClass}>
                  Special Requests{" "}
                  <span className="text-coffee-400 font-normal">(optional)</span>
                </label>
                <textarea
                  id="rt-requests"
                  name="requests"
                  rows={3}
                  placeholder="Allergies, high chair needed, anniversary celebration…"
                  value={form.requests}
                  onChange={handleChange}
                  className={`${inputClass} h-auto py-3 resize-none`}
                />
              </div>

              {errorMsg && (
                <p className="rounded-lg bg-spice-50 px-4 py-3 font-sans text-sm text-spice-500">
                  {errorMsg}
                </p>
              )}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="mt-2 w-full"
                loading={loading}
              >
                Confirm Reservation
              </Button>
              <p className="text-center font-sans text-xs text-coffee-400">
                We&rsquo;ll confirm within 2 hours during opening hours.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
