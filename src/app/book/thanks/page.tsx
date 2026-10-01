import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui";
import { contactEmailHref, site } from "@/config/site";

export const metadata: Metadata = {
  title: "Request received",
  robots: { index: false, follow: false },
};

const nextSteps = [
  "We review your date, time, and event details.",
  "We reply by email to confirm availability, ask any questions, and share next steps.",
  "Your event is booked only after we confirm it with you. Until then, the date is not held.",
];

export default function BookingThanksPage() {
  return (
    <section className="container-site flex min-h-[70vh] flex-col justify-center pt-32 pb-24">
      <p className="eyebrow anim-rise">
        <span className="text-signal">Received</span> / Not yet confirmed
      </p>
      <h1 className="display anim-rise mt-6 max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] text-paper">
        Your request has been received.
      </h1>
      <p className="lede anim-rise mt-6 max-w-xl">
        We&rsquo;ll confirm availability and next steps before your event is considered booked.
      </p>

      <ol className="anim-rise mt-12 max-w-2xl divide-y divide-line border-y border-line">
        {nextSteps.map((step, i) => (
          <li key={step} className="flex gap-4 py-5 text-[0.9375rem] leading-7 text-paper-dim">
            <span className="font-mono text-sm leading-7 text-signal">0{i + 1}</span>
            {step}
          </li>
        ))}
      </ol>

      <p className="mt-8 max-w-xl text-sm leading-6 text-mute">
        Please wait for our confirmation before making plans that depend on the booth. Questions in
        the meantime? Email{" "}
        <a href={contactEmailHref} className="text-paper-dim underline underline-offset-2 hover:text-paper">
          {site.contact.email}
        </a>
        .
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/photobooth" variant="secondary">
          About the photo booth
        </ButtonLink>
      </div>
    </section>
  );
}
