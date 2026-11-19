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
