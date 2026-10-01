import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { contactEmailHref, site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "SMS Terms",
  description: `How ${site.legalName} uses text messaging: consent, message frequency, rates, opting out with STOP, getting help with HELP, and how mobile information is protected.`,
  path: "/sms",
});

const programName = site.name;

const samples = [
  `${programName}: Thanks for your inquiry. We received your request for a photo booth on your event date and will follow up shortly. Reply HELP for help, STOP to opt out.`,
  `${programName}: Your booking is confirmed. We will text you with setup details before your event. Msg & data rates may apply. Reply STOP to opt out.`,
  `${programName}: You have been unsubscribed and will receive no further messages. Reply START to resubscribe.`,
];

const sections: LegalSection[] = [
  {
    id: "program",
    title: "Program overview",
    body: (
      <>
        <p>
          {site.legalName} (&ldquo;{programName},&rdquo; &ldquo;we,&rdquo; or &ldquo;us&rdquo;)
          may send text messages to customers, prospective customers, and business contacts who
          have agreed to receive them. Messages relate to the business relationship you started
          with us, and may include:
        </p>
        <ul>
          <li>responses to inquiries you submitted;</li>
          <li>event booking confirmations, scheduling, and logistics;</li>
          <li>appointment or event reminders;</li>
          <li>customer service and support messages;</li>
          <li>service notifications related to work we are doing for you.</li>
        </ul>
        <p>
          We do not send marketing or promotional text messages unless you have separately and
          expressly agreed to receive them.
        </p>
      </>
    ),
  },
  {
    id: "consent",
    title: "How you opt in",
    body: (
      <>
        <p>
          You will only receive text messages from us after you have given appropriate consent.
          You may opt in by providing your mobile number to us directly and expressly agreeing
          to receive text messages, for example by:
        </p>
        <ul>
          <li>checking an unchecked consent box on a form that references these SMS Terms;</li>
          <li>agreeing in writing, such as by email, when you book or inquire about a service;</li>
          <li>texting us first at a number we have provided to you.</li>
        </ul>
        <p>
          Your consent applies to the types of messages described when you opted in. We do not
          purchase phone numbers or send messages to numbers obtained from third parties.
        </p>
        <p>
          <strong>Consent to receive text messages is not a condition of purchase.</strong> You
          can book or buy our services without agreeing to receive texts.
        </p>
      </>
    ),
  },
  {
    id: "frequency",
    title: "Message frequency",
    body: (
      <p>
        Message frequency varies depending on your interaction with us. For example, an event
        booking may involve several messages around the event date, while a general inquiry may
        involve only one or two.
      </p>
    ),
  },
  {
    id: "rates",
    title: "Message and data rates",
    body: (
      <p>
        <strong>Message and data rates may apply.</strong> Charges are determined by your mobile
        carrier and plan. We do not charge for text messages, but your carrier may.
      </p>
    ),
  },
  {
    id: "opt-out",
    title: "Opting out: STOP",
    body: (
      <>
        <p>
          You can opt out at any time by replying <strong>STOP</strong> to any message from us.
          Where supported, keywords such as <strong>CANCEL</strong>, <strong>END</strong>,{" "}
          <strong>QUIT</strong>, <strong>UNSUBSCRIBE</strong>, and <strong>STOPALL</strong> also
          work.
        </p>
        <p>
          After you opt out, you will receive a single message confirming that you have been
          unsubscribed, and no further messages will be sent to that number unless you opt in
          again. Where applicable, you can opt back in by replying <strong>START</strong>.
        </p>
        <p>
          You can also ask to be removed by contacting us at{" "}
          <a href={contactEmailHref}>{site.contact.email}</a> with the phone number you want
          removed.
        </p>
      </>
    ),
  },
  {
    id: "help",
    title: "Getting help: HELP",
    body: (
      <p>
        Reply <strong>HELP</strong> to any message for help, where applicable. You will receive a
        reply with our contact information. You can also reach us at{" "}
        <a href={contactEmailHref}>{site.contact.email}</a> or through our{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    ),
  },
  {
    id: "privacy",
    title: "Privacy of mobile information",
    body: (
      <>
        <p>
          <strong>
            We do not sell, rent, or share your mobile phone number, text messaging opt-in data, or
            consent information with third parties or affiliates for their marketing or
            promotional purposes.
          </strong>
        </p>
        <p>
          We share this information only with service providers that help us deliver messages,
          such as our SMS provider, and only as needed to operate the messaging program. See our{" "}
          <Link href="/privacy">Privacy Policy</Link> for more on how we handle personal
          information.
        </p>
      </>
    ),
  },
  {
    id: "carriers",
    title: "Carriers and delivery",
    body: (
      <p>
        Mobile carriers are not liable for delayed or undelivered messages. Message delivery
        depends on carrier networks and device settings outside our control, and we cannot
        guarantee that every message will be delivered.
      </p>
    ),
  },
  {
    id: "samples",
    title: "Sample messages",
    body: (
      <>
        <p>Messages you receive from us will look similar to these examples:</p>
        <ul className="space-y-3 pl-0">
          {samples.map((s) => (
            <li
              key={s}
              className="rounded-2xl rounded-bl-sm border border-line bg-ink-raised px-5 py-4 text-[0.9375rem] leading-6 text-paper before:hidden"
            >
              {s}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "voice",
    title: "Voice communications",
    body: (
      <p>
        We are developing phone-based operations that use our communications provider. Calls we
        place or receive are for business purposes related to your relationship with us. We will
        not place prerecorded or automated marketing calls to you without the consent required
        by law.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes and contact",
    body: (
      <p>
        We may update these SMS Terms from time to time by posting a revised version on this page
        and updating the &ldquo;Last updated&rdquo; date. Questions can be sent to{" "}
        {site.legalName} at <a href={contactEmailHref}>{site.contact.email}</a>.
      </p>
    ),
  },
];

export default function SmsPage() {
  return (
    <LegalPage
      title="SMS Terms"
      path="/sms"
      summary={
        <p>
          We only text people who have agreed to receive messages from us. Message frequency
          varies, message and data rates may apply, reply STOP to opt out, and reply HELP for
          help. Consent is never a condition of purchase.
        </p>
      }
      sections={sections}
    />
  );
}
