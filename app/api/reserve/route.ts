import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ReservationPayload {
  name: string;
  email: string;
  partySize: string;
  date: string;
  time: string;
  requests?: string;
}

function isValidPayload(body: unknown): body is ReservationPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" && b.name.trim().length > 0 &&
    typeof b.email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    typeof b.partySize === "string" && b.partySize.length > 0 &&
    typeof b.date === "string" && b.date.length > 0 &&
    typeof b.time === "string" && b.time.length > 0
  );
}

export async function POST(request: Request) {
  const toEmail = process.env.RESERVATION_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!process.env.RESEND_API_KEY || !toEmail) {
    console.error("Missing RESEND_API_KEY or RESERVATION_EMAIL env vars");
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 422 });
  }

  const formattedDate = new Date(body.date + "T00:00:00").toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: body.email,
    subject: `New Reservation Request — ${body.name} · ${formattedDate}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1E0900">
        <h2 style="color:#2F1100;margin-bottom:4px">New Reservation Request</h2>
        <p style="color:#7a5c44;margin-top:0">Crew &amp; Co. · Hackney</p>
        <table style="width:100%;border-collapse:collapse;margin-top:16px">
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0e8df;width:140px;color:#7a5c44;font-size:14px">Name</td><td style="padding:8px 0;border-bottom:1px solid #f0e8df;font-weight:600">${body.name}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0e8df;color:#7a5c44;font-size:14px">Email</td><td style="padding:8px 0;border-bottom:1px solid #f0e8df"><a href="mailto:${body.email}" style="color:#D4920A">${body.email}</a></td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0e8df;color:#7a5c44;font-size:14px">Party size</td><td style="padding:8px 0;border-bottom:1px solid #f0e8df;font-weight:600">${body.partySize} ${body.partySize === "1" ? "guest" : "guests"}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0e8df;color:#7a5c44;font-size:14px">Date</td><td style="padding:8px 0;border-bottom:1px solid #f0e8df;font-weight:600">${formattedDate}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0e8df;color:#7a5c44;font-size:14px">Time</td><td style="padding:8px 0;border-bottom:1px solid #f0e8df;font-weight:600">${body.time}</td></tr>
          ${body.requests ? `<tr><td style="padding:8px 0;color:#7a5c44;font-size:14px;vertical-align:top">Special requests</td><td style="padding:8px 0">${body.requests}</td></tr>` : ""}
        </table>
        <p style="margin-top:24px;font-size:13px;color:#7a5c44">Reply directly to this email to respond to the guest.</p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
