import { BookingFlow } from "@/components/booking-flow";
import { PageHero } from "@/components/ui";
import { contactEmailHref, site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Book an Event",
  description:
    "Request the Pacific Horizon AI Photo Booth for a wedding, corporate event, private party, school event, or brand activation. Check open dates and send a booking request.",
  path: "/book",
});

export default function BookPage() {
  return (
    <>
      <PageHero
        label="Book an event"
        title="Bring the booth to your event."
        intro={
          <p>
            Pick a date, see which time windows are open, and tell us about the event. This is a
            booking request: we&apos;ll confirm availability and next steps with you before
            anything is reserved.
          </p>
        }
      />

      <section aria-label="Booking request" className="border-t border-line py-20 md:py-28">
        <div className="container-site">
          <noscript>
            <p className="mb-10 rounded-xl border border-line-strong bg-ink-raised px-5 py-4 text-sm leading-6 text-paper-dim">
              The booking form needs JavaScript. You can also email your event date, city, and guest
              count to <a href={contactEmailHref} className="text-paper underline underline-offset-4">{site.contact.email}</a>.
            </p>
          </noscript>
          <BookingFlow />
        </div>
      </section>
    </>
  );
}
