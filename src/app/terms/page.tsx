import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { contactEmailHref, site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: `The terms that govern use of the ${site.legalName} website and related communications.`,
  path: "/terms",
});

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of these terms",
    body: (
      <>
        <p>
          These Terms of Use (&ldquo;Terms&rdquo;) govern your access to and use of this website,
          operated by {site.legalName} (&ldquo;Pacific Horizon Labs,&rdquo; &ldquo;we,&rdquo;
          &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By using the website, you agree to these Terms
          and to our <Link href="/privacy">Privacy Policy</Link>. If you do not agree, do not use
          the website.
        </p>
        <p>
          Event services, product licenses, and other commercial engagements are governed by
          separate written agreements or quotes. If those agreements conflict with these Terms,
          the separate agreement controls for that engagement.
        </p>
      </>
    ),
  },
  {
    id: "use-of-site",
    title: "Using the website",
    body: (
      <>
        <p>You may use this website for lawful purposes only. You agree not to:</p>
        <ul>
          <li>interfere with or disrupt the website, its servers, or its networks;</li>
          <li>attempt to gain unauthorized access to any part of the website or related systems;</li>
          <li>use automated means to scrape or collect data from the website in a way that burdens it;</li>
          <li>submit false, misleading, or unlawful content through any contact method we provide;</li>
          <li>use the website to send spam or unsolicited commercial messages;</li>
          <li>impersonate any person or misrepresent your affiliation with any person or organization.</li>
        </ul>
      </>
    ),
  },
  {
    id: "product-information",
    title: "Product and service information",
    body: (
      <>
        <p>
          Descriptions of the Pacific Horizon AI Photo Booth, Pacific Rising Ops, and our other
          work are provided for general information. Some features described on this website
          are in development, and available capabilities may vary by event, configuration, or
          release.
        </p>
        <p>
          Nothing on this website is an offer, a guarantee of availability, or a commitment to
          deliver a specific feature. Pricing, availability, and scope for any engagement are
          confirmed in writing before work begins.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: (
      <p>
        The website and its content, including text, graphics, logos, product names, and software,
        are owned by or licensed to Pacific Horizon Labs and are protected by intellectual
        property laws. &ldquo;Pacific Horizon Labs,&rdquo; &ldquo;Pacific Horizon AI Photo
        Booth,&rdquo; and &ldquo;Pacific Rising Ops&rdquo; are names used by {site.legalName}.
        You may view and print pages for personal or internal business reference. Any other use
        requires our prior written permission.
      </p>
    ),
  },
  {
    id: "communications",
    title: "Communications",
    body: (
      <>
        <p>
          When you contact us, you agree that we may respond using the contact information you
          provide. Messages you send may be processed by automated tools to help us organize and
          respond to them, as described in our <Link href="/privacy">Privacy Policy</Link>.
        </p>
        <p>
          Text messages are sent only with your consent and are governed by our{" "}
          <Link href="/sms">SMS Terms</Link>, which are part of these Terms.
        </p>
      </>
    ),
  },
  {
    id: "submissions",
    title: "Feedback and submissions",
    body: (
      <p>
        If you send us ideas, suggestions, or feedback about our products, you agree that we may
        use them without obligation to you. Please do not send confidential information through
        general contact channels unless we have agreed in writing to keep it confidential.
      </p>
    ),
  },
  {
    id: "third-parties",
    title: "Third-party links and services",
    body: (
      <p>
        The website may link to third-party websites and services, such as social media
        platforms. We do not control and are not responsible for their content, policies, or
        practices. Your use of them is governed by their terms.
      </p>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    body: (
      <p>
        THE WEBSITE AND ITS CONTENT ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS
        AVAILABLE,&rdquo; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING
        IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
        NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE WEBSITE WILL BE UNINTERRUPTED, ERROR-FREE,
        OR FREE OF HARMFUL COMPONENTS.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <p>
        TO THE FULLEST EXTENT PERMITTED BY LAW, PACIFIC HORIZON LABS AND ITS MEMBERS, MANAGERS,
        AND CONTRACTORS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
        OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM OR RELATED
        TO YOUR USE OF THE WEBSITE. OUR TOTAL LIABILITY FOR ANY CLAIM RELATED TO THE WEBSITE WILL
        NOT EXCEED ONE HUNDRED U.S. DOLLARS (US$100). SOME JURISDICTIONS DO NOT ALLOW THESE
        LIMITATIONS, SO THEY MAY NOT APPLY TO YOU.
      </p>
    ),
  },
  {
    id: "indemnification",
    title: "Indemnification",
    body: (
      <p>
        You agree to indemnify and hold harmless Pacific Horizon Labs from claims, losses, and
        expenses, including reasonable attorneys&apos; fees, arising from your misuse of the
        website or your violation of these Terms.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law",
    body: (
      <p>
        These Terms are governed by the laws of the state in which {site.legalName} is
        organized, and applicable U.S. federal law, without regard to conflict-of-law rules. Any
        dispute will be brought in the state or federal courts located in that state, unless
        applicable law requires otherwise.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <p>
        We may update these Terms from time to time by posting a revised version on this page and
        updating the &ldquo;Last updated&rdquo; date. Continued use of the website after changes
        take effect means you accept the revised Terms.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions about these Terms can be sent to {site.legalName} at{" "}
        <a href={contactEmailHref}>{site.contact.email}</a>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      path="/terms"
      summary={
        <p>
          These terms cover use of this website. Event bookings and other commercial work are
          covered by a separate agreement or quote.
        </p>
      }
      sections={sections}
    />
  );
}
