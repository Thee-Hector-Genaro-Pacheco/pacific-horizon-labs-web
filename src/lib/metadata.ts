import type { Metadata } from "next";
import { site } from "@/config/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
};

/** Per-page metadata with consistent canonical URLs and Open Graph fields. */
export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      url: path,
      siteName: site.legalName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${site.name}`,
      description,
    },
  };
}
