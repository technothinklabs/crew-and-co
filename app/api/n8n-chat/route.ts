import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_URL = process.env.N8N_CHAT_WEBHOOK_URL;

export async function POST(request: NextRequest) {
  if (!WEBHOOK_URL) {
    return NextResponse.json({ error: "Chat not configured" }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  const upstreamUrl = action
    ? `${WEBHOOK_URL}?action=${encodeURIComponent(action)}`
    : WEBHOOK_URL;

  let body: string;
  try {
    body = await request.text();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(upstreamUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
  } catch (err) {
    console.error("n8n chat proxy error:", err);
    return NextResponse.json({ error: "Failed to reach chat service" }, { status: 502 });
  }

  const data = await upstream.text();
  return new NextResponse(data, {
    status: upstream.status,
    headers: { "Content-Type": upstream.headers.get("Content-Type") ?? "application/json" },
  });
}
