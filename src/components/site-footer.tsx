import Link from "next/link";
import { contactEmailHref, footerNav, site } from "@/config/site";
import { Wordmark } from "./logo";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-line">
      <div className="container-site grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Link href="/" className="-m-1 inline-block p-1 text-paper" aria-label={`${site.name}, home`}>
            <Wordmark />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-6 text-mute">
            Software, automation, and interactive systems for live events and real
            business operations.
          </p>
          <a
            href={contactEmailHref}
            className="mt-6 inline-block text-sm text-paper-dim underline decoration-line-strong underline-offset-4 transition-colors hover:text-paper hover:decoration-signal"
          >
            {site.contact.email}
          </a>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
          {footerNav.map((group) => (
            <div key={group.heading}>
              <h2 className="eyebrow">{group.heading}</h2>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-paper-dim transition-colors hover:text-paper"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-3 py-6 text-xs text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="font-mono uppercase tracking-[0.14em]">Built in-house · Software &amp; systems</p>
        </div>
      </div>
    </footer>
  );
}
