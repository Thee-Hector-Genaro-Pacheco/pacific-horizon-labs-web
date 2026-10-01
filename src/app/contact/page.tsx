import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/ui";
import { contactEmailHref, inquiryTypes, site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Pacific Horizon Labs LLC about photo booth event bookings, business partnerships, technology inquiries, or general questions.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Let's talk."
        intro={
          <p>
            Reach {site.legalName} about event bookings, partnerships, our technology, or
            anything else. Email is the fastest way to reach us.
          </p>
        }
      />

      <section aria-labelledby="contact-form-title" className="border-t border-line py-20 md:py-28">
        <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <h2 id="contact-form-title" className="heading text-3xl text-paper md:text-4xl">
              Send an inquiry
            </h2>
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>

          <aside aria-label="Other ways to reach us" className="lg:col-span-5">
            <div className="rounded-2xl border border-line bg-ink-raised p-7 md:p-9 lg:sticky lg:top-28">
              <p className="eyebrow">Direct email</p>
              <a
                href={contactEmailHref}
                className="mt-4 block text-xl font-medium tracking-tight break-all text-paper underline decoration-line-strong underline-offset-[6px] transition-colors hover:decoration-signal md:text-2xl"
              >
                {site.contact.email}
              </a>

              <p className="eyebrow mt-12">We handle</p>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {inquiryTypes.map((t) => (
                  <li key={t.id} className="py-4">
                    <p className="text-[0.9375rem] font-medium text-paper">{t.label}</p>
                    <p className="mt-1 text-sm leading-6 text-mute">{t.description}</p>
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-xs leading-5 text-mute">
                How we handle information you send us is described in our{" "}
                <Link href="/privacy" className="text-paper-dim underline underline-offset-2 hover:text-paper">
                  Privacy Policy
                </Link>
                . For text message terms, see{" "}
                <Link href="/sms" className="text-paper-dim underline underline-offset-2 hover:text-paper">
                  SMS Terms
                </Link>
                .
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
