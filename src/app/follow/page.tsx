import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui";
import { site } from "@/config/site";

/**
 * Stable short link for QR codes and printed material: /follow → Instagram.
 * The destination lives in `site.social.instagram`. Until it is set, this
 * sends visitors to the homepage instead. The site is a static export, so
 * the redirect is an HTML meta refresh with a visible fallback link.
 */
const destination = site.social.instagram ?? "/";
const isInstagram = site.social.instagram !== null;

export const metadata: Metadata = {
  title: "Follow",
  robots: { index: false, follow: false },
};

export default function Follow() {
  return (
    <section className="container-site flex min-h-[70vh] flex-col justify-center pt-32 pb-24">
      <meta httpEquiv="refresh" content={`0;url=${destination}`} />
      <p className="eyebrow">
        <span className="text-signal">Follow</span> / Redirecting
      </p>
      <h1 className="display mt-6 max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] text-paper">
        {isInstagram ? `Taking you to ${site.name} on Instagram.` : `Taking you to ${site.name}.`}
      </h1>
      <div className="mt-10">
        {isInstagram ? (
          <a
            href={destination}
            rel="noopener"
            className="inline-flex h-12 items-center justify-center rounded-full bg-paper px-6 text-[0.9375rem] font-medium text-ink transition-colors duration-200 hover:bg-white"
          >
            Open Instagram
          </a>
        ) : (
          <ButtonLink href="/">Back to home</ButtonLink>
        )}
      </div>
    </section>
  );
}
