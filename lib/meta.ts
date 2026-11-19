// Meta (Facebook / Instagram) dataset ID. This is public by design (it is in the
// page source of every site that uses the Pixel). The secret API token is NOT
// here: it lives in the META_CAPI_TOKEN environment variable on Vercel.
export const META_PIXEL_ID = "2335886236677843";

// Tags an outgoing link so Bandcamp / shop analytics can see it came from this
// landing page (and which offer card it was).
export function withUtm(href: string, campaign: string): string {
  const url = new URL(href);
  url.searchParams.set("utm_source", "remixhype");
  url.searchParams.set("utm_medium", "landing");
  url.searchParams.set("utm_campaign", campaign);
  return url.toString();
}

// ---- Ad click ID pass-through -------------------------------------------
// Meta puts ?fbclid=... on the link when someone clicks an ad. That ID is how
// Meta ties a later purchase back to the ad. The purchase happens on
// blindedm.com (which has the same Pixel), so we carry the ID across.
export const FBCLID_KEY = "rh-fbclid";
export const FBCLID_MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000; // Meta's attribution window
const PASS_HOSTS = new Set(["blindedm.com", "www.blindedm.com"]);

export function extractFbclid(search: string): string | null {
  const v = new URLSearchParams(search).get("fbclid");
  return v && v.length <= 500 ? v : null;
}

export function addFbclid(href: string, fbclid: string): string {
  try {
    const url = new URL(href, "https://www.remixhype.com");
    if (!PASS_HOSTS.has(url.hostname)) return href;
    url.searchParams.set("fbclid", fbclid);
    return url.toString();
  } catch {
    return href;
  }
}
