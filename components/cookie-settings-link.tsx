"use client";

export function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
      className="mt-4 block w-full text-white/50 underline-offset-2 hover:text-white hover:underline"
    >
      Cookie settings
    </button>
  );
}
