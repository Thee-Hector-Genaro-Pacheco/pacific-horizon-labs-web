import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { contactEmailHref, site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${site.legalName} collects, uses, shares, and protects personal information, including event media and text messaging information.`,
  path: "/privacy",
});

const email = (
  <a href={contactEmailHref}>{site.contact.email}</a>
);

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          This Privacy Policy explains how {site.legalName} (&ldquo;Pacific Horizon Labs,&rdquo;
          &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and shares
          information in connection with this website, our communications with you, and our
          products and services, including the Pacific Horizon AI Photo Booth and Pacific Rising
          Ops (together, the &ldquo;Services&rdquo;).
        </p>
        <p>
          By using this website or our Services, you acknowledge the practices described here. If
          you do not agree, please do not use the website or Services.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: (
      <>
        <h3>Information you give us</h3>
        <ul>
          <li>
            <strong>Contact and inquiry details</strong>, such as your name, organization, email
            address, phone number, and the contents of messages you send us.
          </li>
          <li>
            <strong>Event and booking details</strong>, such as event dates, locations, expected
            attendance, branding materials, and billing information needed to provide a service.
          </li>
          <li>
            <strong>Mobile phone number and messaging consent</strong>, if you choose to receive
            text messages from us. See{" "}
            <a href="#text-messaging">Text messaging and mobile information</a> below.
          </li>
        </ul>

        <h3>Information collected automatically</h3>
        <p>
          Like most websites, our hosting provider automatically records technical information
          when you visit, such as your IP address, browser type, device type, referring page, and
          the pages you request. This information is used to operate, secure, and troubleshoot the
          website.
        </p>
        <p>
          This website does not currently use advertising cookies or third-party analytics. If
          that changes, we will update this policy.
        </p>

        <h3>Event media</h3>
        <p>
          When you use the Pacific Horizon AI Photo Booth at an event, the booth captures photos
          and videos of the people in frame. See{" "}
          <a href="#event-media">Photo booth and event media</a> for details.
        </p>
      </>
    ),
  },
  {
    id: "event-media",
    title: "Photo booth and event media",
    body: (
      <>
        <p>
          The photo booth captures images and short videos when a guest chooses to take a photo
          or recording. To apply visual effects in real time, the booth detects the position of
          faces in the camera view. This face-position data is used to place effects on screen
          and is not used to identify who a person is.
        </p>
        <p>Depending on how an event is configured, captured media may be:</p>
        <ul>
          <li>displayed on the booth screen and saved on the booth device;</li>
          <li>printed for the guest;</li>
          <li>made available to the guest through a QR code or link for download or sharing;</li>
          <li>
            provided to the event host or organizer who booked the booth, as agreed with that
            host.
          </li>
        </ul>
        <p>
          We do not sell event media. We do not post a guest&apos;s photos to our own public
          channels without appropriate permission. Event hosts are responsible for the
          notices they give guests about photography at their event. To ask about or request
          deletion of media from an event, contact us at {email} with the event name and date.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use information",
    body: (
      <>
        <p>We use the information we collect to:</p>
        <ul>
          <li>respond to inquiries and communicate with you;</li>
          <li>plan, provide, and support event services and other Services you request;</li>
          <li>send transactional and service-related messages, including text messages you have agreed to receive;</li>
          <li>process payments and maintain business records;</li>
          <li>operate, maintain, secure, and improve the website and our Services;</li>
          <li>comply with legal obligations and enforce our terms.</li>
        </ul>
      </>
    ),
  },
  {
    id: "automated-processing",
    title: "Automated processing and AI tools",
    body: (
      <>
        <p>
          We use our own operations software, Pacific Rising Ops, and related tools to help manage
          business communications. When you email us, your message may be processed by automated
          systems, which can include third-party AI services acting on our behalf, to classify it,
          summarize it, and prepare a draft reply.
        </p>
        <p>
          A person at Pacific Horizon Labs reviews and approves consequential outgoing
          communications before they are sent. We do not use automated processing to make
          decisions that produce legal or similarly significant effects about you.
        </p>
      </>
    ),
  },
  {
    id: "text-messaging",
    title: "Text messaging and mobile information",
    body: (
      <>
        <p>
          If you provide your mobile number and consent to receive text messages, we use that
          number to send the messages you agreed to receive. Our{" "}
          <Link href="/sms">SMS Terms</Link> describe the program, how to opt out, and how to get
          help.
        </p>
        <p>
          <strong>
            No mobile information will be shared with third parties or affiliates for marketing or
            promotional purposes.
          </strong>{" "}
          Text messaging originator opt-in data and consent are excluded from every category of
          sharing described in this policy and will not be shared with any third parties, except
          with service providers that deliver messages on our behalf (such as our SMS provider)
          and only to the extent needed to provide the messaging service.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "How we share information",
    body: (
      <>
        <p>We do not sell your personal information. We share information only as follows:</p>
        <ul>
          <li>
            <strong>Service providers</strong> that perform services for us, such as website
            hosting, email, communications (for example, Twilio for SMS and voice), payment
            processing, cloud storage, and AI processing. They may use the information only to
            provide services to us.
          </li>
          <li>
            <strong>Event hosts</strong>, who may receive media captured at their event, as
            described above.
          </li>
          <li>
            <strong>Legal and safety</strong> purposes, when we believe disclosure is required by
            law or needed to protect the rights, property, or safety of Pacific Horizon Labs, our
            customers, or others.
          </li>
          <li>
            <strong>Business transfers</strong>, in connection with a merger, acquisition,
            financing, or sale of assets, subject to the commitments in this policy.
          </li>
          <li>
            <strong>With your direction</strong>, when you ask us to share information or use a
            feature intended for sharing.
          </li>
        </ul>
        <p>
          All of the categories above exclude text messaging originator opt-in data and consent,
          as described in <a href="#text-messaging">Text messaging and mobile information</a>.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "Data retention",
    body: (
      <p>
        We keep personal information for as long as needed for the purposes described in this
        policy, including providing Services, maintaining business and tax records, resolving
        disputes, and meeting legal obligations. When information is no longer needed, we delete
        it or de-identify it.
      </p>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        We use reasonable administrative, technical, and physical safeguards designed to protect
        personal information. No method of transmission or storage is completely secure, and we
        cannot guarantee absolute security.
      </p>
    ),
  },
  {
    id: "your-choices",
    title: "Your choices and rights",
    body: (
      <>
        <ul>
          <li>
            <strong>Text messages:</strong> reply STOP to any message to opt out. See our{" "}
            <Link href="/sms">SMS Terms</Link>.
          </li>
          <li>
            <strong>Email:</strong> you can ask us to stop contacting you at any time.
          </li>
          <li>
            <strong>Access, correction, and deletion:</strong> you can ask to access, correct, or
            delete personal information we hold about you. Depending on where you live, you may
            have additional rights under applicable law.
          </li>
        </ul>
        <p>
          To make a request, contact us at {email}. We may need to verify your identity before
          acting on a request.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children's privacy",
    body: (
      <p>
        This website is not directed to children under 13, and we do not knowingly collect
        personal information from children under 13 through it. Event media involving minors is
        captured at the direction of the event host. If you believe a child has provided us
        personal information, contact us and we will take appropriate steps to delete it.
      </p>
    ),
  },
  {
    id: "third-party-links",
    title: "Third-party sites and services",
    body: (
      <p>
        Our website and photo booth may link to third-party services, such as social media
        profiles. Those services are governed by their own privacy policies, and we are not
        responsible for their practices.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy from time to time. When we do, we will change the &ldquo;Last
        updated&rdquo; date at the top of this page. Material changes will be reflected here
        before they take effect.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        Questions about this policy or our privacy practices can be sent to {site.legalName} at{" "}
        {email}, or through our <Link href="/contact">contact page</Link>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy"
      summary={
        <p>
          The short version: we collect what we need to respond to you and run our Services, we
          don&apos;t sell personal information, and we never share mobile opt-in data or consent
          with third parties for their marketing.
        </p>
      }
      sections={sections}
    />
  );
}
