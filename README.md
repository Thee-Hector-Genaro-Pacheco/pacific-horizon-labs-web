# Pacific Horizon Labs — website

Public website for **Pacific Horizon Labs LLC**. Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4. No database, no runtime secrets.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Where things live

| What | File |
| --- | --- |
| Company name, contact email, Instagram URL, nav, footer links, legal date | `src/config/site.ts` |
| Product copy and capability lists | `src/config/products.ts` |
| Per-page metadata helper | `src/lib/metadata.ts` |
| Design tokens, motion, legal prose styles | `src/app/globals.css` |
| Shared UI (buttons, section headers, CTA, capability grid) | `src/components/ui.tsx` |
| `/follow` redirect (static page) | `src/app/follow/page.tsx` |

## Launch settings

Contact email and Instagram URL are set in `src/config/site.ts`. `/follow` redirects to `site.social.instagram`, or to `/` if that is `null`.

Set `NEXT_PUBLIC_SITE_URL` (for example `https://yourdomain.com`) in the hosting environment once the custom domain is connected. See `.env.example`.

## Booking availability

`/book` is a static page. When a visitor picks a date it calls `/api/availability` (`netlify/functions/availability.ts`), which queries Google Calendar **FreeBusy** server-side with a service account. Only open/unavailable flags for each booking window reach the browser, never event titles, attendees, or other calendar data. Booking rules (time zone, lead time, window length, hours, buffers) live in `src/config/booking.ts`.

Submissions go to **Netlify Forms** (form `event-booking`, registered by `public/__forms.html`). A submission is a request only: nothing is reserved or written to the calendar, and every request is confirmed by a person.

Server-side environment variables (set in Netlify, never with a `NEXT_PUBLIC_` prefix):

- `GOOGLE_CALENDAR_ID`: the dedicated booking calendar.
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: service account with free/busy access to that calendar.
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`: that service account's private key.
- `BOOKING_TIMEZONE` (optional): overrides the time zone in `src/config/booking.ts`; keep them the same.
- `BOOKING_AVAILABILITY_MODE` (optional, development only): `mock` returns sample availability. Ignored in production deploys.

If the Google variables are missing or the lookup fails, the page says live availability is unavailable and still accepts requests; it never shows times as open.

The Privacy Policy, Terms of Use, and SMS Terms are a starting point written for this business. They have not been reviewed by an attorney.

## /photobooth media

All swappable media and copy for `/photobooth` lives in **`src/config/photobooth-experience.ts`**. Colors, spacing, and durations are CSS variables at the top of **`src/app/photobooth/photobooth.css`** (the amber alternative is in a comment there). Put files under `public/media/photobooth/`.

| What | Config field | Format |
| --- | --- | --- |
| Scroll sequence media | `boothSequence.media` | a still photo (`kind: "image"`, current), WebP frames (recommended for footage), or all-intra MP4; 4:3 |
| Focus area during the countdown | `boothSequence.focusMask` | CSS mask; the area inside stays sharp while the background blurs |
| Face bracket positions | `boothSequence.faces` | percent of screen; only used when `faceBrackets` is on |
| Beat timing | `boothSequence.beats[].range` | fraction of the scroll track, 0–1 |
| Captured photo shown next to the QR code | `boothSequence.resultPhoto` | 4:3 WebP |
| Reduced-motion stills | `beats[].still` | 4:3 WebP |
| Gallery | `gallerySets[].photos[].src` | WebP, set `width`/`height` to match; 1–2 photos per set show two-up, 3+ show in three columns |
| Theme backgrounds | `themeOptions[].src` | 3:4 WebP |
| Pricing, FAQ, schema | `packages`, `faqs`, `localBusiness` | text; `null` schema fields are omitted |

Flags in the same file:

- `photoboothFeatures.themePicker` (default `false`): shows the "Tonight's theme" section. It's off because the app doesn't generate AI backgrounds yet; its copy and concept art need updating before you turn it on.
- `boothSequence.faceBrackets` (default `false`): draws a bracket on each face in `faces` instead of the app's fixed viewfinder corners. Turn it on only once the app shows per-face brackets.
- `boothSequence.illustrative` (default `true`): shows the "Illustrative image" label on the iPad screen. Set it to `false` when the media is real event footage.
- `gallerySets[].photos[].illustrative`: labels each gallery photo "Illustrative". Set it to `false` for real event photos; the gallery's heading label disappears once no photo is illustrative.

The "Concept art" labels disappear once themes have real `src` values. The "Placeholder pricing" label is in `sections.tsx`; remove it when prices are real.

**Why frames and not video:** iOS Safari seeks video unreliably while scrolling, even with every frame a keyframe, and often skips painting. A WebP sequence drawn to a canvas scrubs smoothly and lets mobile load a smaller, lower-frame-count set. Video is supported (`kind: "video"`) if you prefer one file.

Footage maps linearly onto the scroll track, so time your edit to the beat ranges (defaults: welcome 0–16%, faces 16–36%, countdown 36–58%, capture 58–72%, result 72–100%). Leave `drawInterface: true` for raw camera footage; set it to `false` for a screen recording of the app, which already has its own UI.

### Preparing footage (ffmpeg)

Sources are assumed to be 16:9 or wider; `crop=ih*4/3:ih` cuts a centered 4:3. Adjust `-ss` (start) and `-t` (length).

```bash
mkdir -p public/media/photobooth/sequence/{desktop,mobile}

# Desktop frames: 1440x1080, 25 fps, ~150 frames for a 6 s edit
ffmpeg -ss 2 -t 6 -i take.mov -an \
  -vf "fps=25,crop=ih*4/3:ih,scale=1440:1080:flags=lanczos" \
  -c:v libwebp -quality 72 -compression_level 6 \
  public/media/photobooth/sequence/desktop/frame_%04d.webp

# Mobile frames: 800x600, 15 fps (~90 frames)
ffmpeg -ss 2 -t 6 -i take.mov -an \
  -vf "fps=15,crop=ih*4/3:ih,scale=800:600:flags=lanczos" \
  -c:v libwebp -quality 65 -compression_level 6 \
  public/media/photobooth/sequence/mobile/frame_%04d.webp

# Poster (first frame, shown before frames load)
ffmpeg -ss 2 -i take.mov -frames:v 1 \
  -vf "crop=ih*4/3:ih,scale=1440:1080" -c:v libwebp -quality 80 \
  public/media/photobooth/sequence/poster.webp

# Count frames, then set frameCount in the config
ls public/media/photobooth/sequence/desktop | wc -l
ls public/media/photobooth/sequence/mobile | wc -l
```

Video alternative (every frame a keyframe so seeking is instant):

```bash
ffmpeg -ss 2 -t 6 -i take.mov -an \
  -vf "fps=30,crop=ih*4/3:ih,scale=1440:1080" \
  -c:v libx264 -pix_fmt yuv420p -profile:v high -crf 23 \
  -g 1 -keyint_min 1 -sc_threshold 0 -movflags +faststart \
  public/media/photobooth/sequence/booth.mp4
```

Stills (gallery, result photo, strip, beat stills) to 4:3 WebP:

```bash
ffmpeg -i IMG_0001.jpg \
  -vf "crop='min(iw,ih*4/3)':'min(ih,iw*3/4)',scale=1200:900" \
  -c:v libwebp -quality 78 public/media/photobooth/gallery/wedding-1.webp
```

Theme backgrounds use 3:4: `crop='min(iw,ih*3/4)':'min(ih,iw*4/3)',scale=600:800`.
