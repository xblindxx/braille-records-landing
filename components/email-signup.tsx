"use client";

import Script from "next/script";
import { KIT_FORM_HTML } from "@/lib/kit-form-html";

// Email signup (Kit). The form markup comes straight from Kit; Kit's own
// script (ck.5.js) wires up the submit button and the success message.
export function EmailSignup() {
  return (
    <section className="relative z-10 px-4 pb-14 sm:px-8 sm:pb-20 lg:px-12">
      <div className="kit-signup mx-auto max-w-3xl">
        <div dangerouslySetInnerHTML={{ __html: KIT_FORM_HTML }} />
      </div>
      <Script
        src="https://f.convertkit.com/ckjs/ck.5.js"
        strategy="lazyOnload"
      />
    </section>
  );
}
