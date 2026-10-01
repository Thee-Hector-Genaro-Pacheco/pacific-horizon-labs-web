import type { MetadataRoute } from "next";
import { publicRoutes, site } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : ["/privacy", "/terms", "/sms"].includes(path) ? 0.3 : 0.8,
  }));
}
