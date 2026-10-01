import { site } from "@/config/site";

/**
 * Stable short link for QR codes and printed material: /follow → Instagram.
 * The destination lives in `site.social.instagram`. Until it is set, this
 * falls back to the homepage. Uses a temporary (307) redirect so the
 * destination can change later without browsers caching the old one.
 */
export function GET(request: Request) {
  const destination = site.social.instagram ?? new URL("/", request.url).toString();
  return Response.redirect(destination, 307);
}
