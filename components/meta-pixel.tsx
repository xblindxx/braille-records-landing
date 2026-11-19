"use client";

import Script from "next/script";
import { useEffect } from "react";
import {
  META_PIXEL_ID,
  FBCLID_KEY,
  FBCLID_MAX_AGE_MS,
  extractFbclid,
  addFbclid,
} from "@/lib/meta";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const STANDARD_EVENTS = new Set(["Lead", "InitiateCheckout"]);

function newId(): string {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// Same event is sent from the browser (Pixel) and from our server (Conversions
// API). The shared event_id lets Meta count it once instead of twice.
function sendToServer(body: Record<string, unknown>) {
  fetch("/api/meta-event", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => {});
}

export function MetaPixel() {
  useEffect(() => {
    // Remember the ad click ID (from the landing URL, or from an earlier visit
    // inside Meta's 90-day window) and attach it to links going to blindedm.com.
    let fbclid = extractFbclid(window.location.search);
    try {
      if (fbclid) {
        localStorage.setItem(FBCLID_KEY, JSON.stringify({ v: fbclid, t: Date.now() }));
      } else {
        const raw = localStorage.getItem(FBCLID_KEY);
        const saved = raw ? JSON.parse(raw) : null;
        if (saved && typeof saved.v === "string" && Date.now() - saved.t < FBCLID_MAX_AGE_MS) {
          fbclid = saved.v;
        }
      }
    } catch {
      /* storage unavailable: skip pass-through */
    }
    const decorate = (a: HTMLAnchorElement) => {
      if (!fbclid) return;
      const next = addFbclid(a.href, fbclid);
      if (next !== a.href) a.href = next;
    };
    if (fbclid) {
      document.querySelectorAll<HTMLAnchorElement>("a[href]").forEach(decorate);
    }

    const handle = (e: MouseEvent) => {
      if (e.type === "auxclick" && e.button !== 1) return; // middle-click only
      const link = (e.target as Element | null)?.closest?.(
        "a[href]",
      ) as HTMLAnchorElement | null;
      if (link) decorate(link);
      const el = (e.target as Element | null)?.closest?.(
        "a[data-meta-event]",
      ) as HTMLAnchorElement | null;
      if (!el) return;

      const event = el.dataset.metaEvent as string;
      const name = el.dataset.metaName;
      const raw = el.dataset.metaValue;
      const value = raw !== undefined && raw !== "" ? Number(raw) : undefined;
      const hasValue = value !== undefined && !Number.isNaN(value);
      const eventId = newId();

      const params: Record<string, unknown> = { content_name: name };
      if (hasValue) {
        params.value = value;
        params.currency = "USD";
      }
      window.fbq?.(
        STANDARD_EVENTS.has(event) ? "track" : "trackCustom",
        event,
        params,
        { eventID: eventId },
      );
      sendToServer({
        event_name: event,
        event_id: eventId,
        url: window.location.href,
        content_name: name,
        value: hasValue ? value : undefined,
      });
    };
    document.addEventListener("click", handle);
    document.addEventListener("auxclick", handle);
    return () => {
      document.removeEventListener("click", handle);
      document.removeEventListener("auxclick", handle);
    };
  }, []);

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');
var pid=(window.crypto&&crypto.randomUUID)?crypto.randomUUID():String(Date.now())+Math.random();
fbq('track','PageView',{},{eventID:pid});
setTimeout(function(){fetch('/api/meta-event',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({event_name:'PageView',event_id:pid,url:location.href}),keepalive:true}).catch(function(){})},1200);
`}
      </Script>
    </>
  );
}
