import { NextRequest, NextResponse } from "next/server";
import { META_PIXEL_ID } from "@/lib/meta";

export const runtime = "nodejs";

const ALLOWED_EVENTS = new Set([
  "PageView",
  "Lead",
  "InitiateCheckout",
  "ReleaseClick",
]);

// Browsers always send Origin/Referer on a same-site POST. This keeps random
// third-party sites from stuffing fake events into the dataset.
function originAllowed(req: NextRequest): boolean {
  const o = req.headers.get("origin") || req.headers.get("referer");
  if (!o) return false;
  try {
    const h = new URL(o).hostname;
    return (
      h === "remixhype.com" ||
      h.endsWith(".remixhype.com") ||
      h === "localhost" ||
      h.endsWith(".vercel.app")
    );
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (!originAllowed(req)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const token = process.env.META_CAPI_TOKEN;
  if (!token) {
    // Pixel still works without the server side; nothing to send yet.
    return NextResponse.json({ skipped: "no token configured" }, { status: 202 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }

  const eventName = typeof body.event_name === "string" ? body.event_name : "";
  const eventId = typeof body.event_id === "string" ? body.event_id.slice(0, 100) : "";
  const url = typeof body.url === "string" ? body.url.slice(0, 500) : "";
  if (!ALLOWED_EVENTS.has(eventName) || !eventId || !/^https?:\/\//.test(url)) {
    return NextResponse.json({ error: "bad event" }, { status: 400 });
  }

  const customData: Record<string, unknown> = {};
  if (typeof body.content_name === "string") {
    customData.content_name = body.content_name.slice(0, 100);
  }
  if (typeof body.value === "number" && body.value >= 0 && body.value <= 1000) {
    customData.value = body.value;
    customData.currency = "USD";
  }

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim();
  const userData: Record<string, unknown> = {
    client_user_agent: req.headers.get("user-agent") || undefined,
  };
  if (ip) userData.client_ip_address = ip;
  const fbp = req.cookies.get("_fbp")?.value;
  const fbc = req.cookies.get("_fbc")?.value;
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;

  const payload: Record<string, unknown> = {
    access_token: token,
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: url,
        action_source: "website",
        user_data: userData,
        ...(Object.keys(customData).length ? { custom_data: customData } : {}),
      },
    ],
  };
  // Set META_TEST_EVENT_CODE in Vercel while checking the Test Events tab.
  if (process.env.META_TEST_EVENT_CODE) {
    payload.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  try {
    const res = await fetch(`https://graph.facebook.com/${META_PIXEL_ID}/events`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = (await res.json().catch(() => ({}))) as {
      events_received?: number;
      error?: { message?: string; code?: number };
    };
    if (!res.ok) {
      return NextResponse.json(
        { error: json.error?.message || "meta rejected", code: json.error?.code },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true, events_received: json.events_received });
  } catch {
    return NextResponse.json({ error: "meta unreachable" }, { status: 502 });
  }
}
