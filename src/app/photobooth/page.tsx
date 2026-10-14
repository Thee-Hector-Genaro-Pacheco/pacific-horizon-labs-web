import { BoothSequence } from "@/components/photobooth/experience/booth-sequence";
import { IrisGallery, IrisReveal } from "@/components/photobooth/experience/iris";
import { Modes } from "@/components/photobooth/experience/modes";
import {
  BookingCta,
  Faq,
  Packages,
  PbHero,
  ThemePicker,
} from "@/components/photobooth/experience/sections";
import { localBusiness, photoboothFeatures } from "@/config/photobooth-experience";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import "./photobooth.css";

const description =
  "AI photo booth rental in Orange County for weddings, parties, and corporate events. Live face effects, photo and Loop capture, and QR delivery to guests' phones.";

export const metadata = pageMetadata({
  title: "AI Photo Booth Rental in Orange County",
  description,
  path: "/photobooth",
});

/** LocalBusiness JSON-LD. Unset (null) fields in the config are left out. */
function businessJsonLd() {
  const { address, geo, ...rest } = localBusiness;
  const hasAddress = address.streetAddress || address.addressLocality;
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/photobooth#business`,
    name: rest.name,
    description,
    url: `${site.url}/photobooth`,
    email: site.contact.email,
    telephone: rest.telephone,
    priceRange: rest.priceRange,
    image: rest.image,
    openingHours: rest.openingHours,
    areaServed: rest.areaServed,
    parentOrganization: { "@type": "Organization", name: site.legalName, url: site.url },
    sameAs: site.social.instagram ? [site.social.instagram] : undefined,
    address: hasAddress ? { "@type": "PostalAddress", ...address } : undefined,
    geo: geo ? { "@type": "GeoCoordinates", ...geo } : undefined,
  };
  return JSON.stringify(data, (_, v) => (v === null ? undefined : v)).replace(/</g, "\\u003c");
}

export default function PhotoBoothPage() {
  return (
    <div className="pb-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: businessJsonLd() }} />
      <PbHero />
      <BoothSequence />
      {photoboothFeatures.modes && <Modes />}
      <IrisReveal>
        <section aria-labelledby="gallery-title">
          <IrisGallery />
        </section>
      </IrisReveal>
      {photoboothFeatures.themePicker && <ThemePicker />}
      <Packages />
      <Faq />
      <BookingCta />
    </div>
  );
}
