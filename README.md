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
