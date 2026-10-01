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

The Privacy Policy, Terms of Use, and SMS Terms are a starting point written for this business. They have not been reviewed by an attorney.
