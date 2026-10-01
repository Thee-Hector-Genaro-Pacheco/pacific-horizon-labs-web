import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/config/site";

export type LegalSection = { id: string; title: string; body: ReactNode };

const related = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/sms", label: "SMS Terms" },
];

/** Shared layout for Privacy, Terms, and SMS pages: header, table of contents, and readable prose. */
export function LegalPage({
  title,
  path,
  summary,
  sections,
}: {
  title: string;
  path: string;
  summary: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <article className="pt-32 pb-24 md:pt-44 md:pb-32">
      <header className="container-site">
        <p className="eyebrow">{site.legalName} · Legal</p>
        <h1 className="display mt-6 text-[clamp(2.5rem,6vw,4.75rem)] text-paper">{title}</h1>
        <p className="mt-6 font-mono text-xs tracking-[0.1em] text-mute uppercase">
          Last updated {site.legalLastUpdated}
        </p>
        <div className="lede mt-8 max-w-3xl">{summary}</div>
      </header>

      <div className="container-site mt-16 grid gap-12 border-t border-line pt-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
        <nav aria-label="On this page" className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">On this page</p>
            <ol className="mt-5 space-y-2.5 text-sm">
              {sections.map((s, i) => (
                <li key={s.id} className="flex gap-3">
                  <span className="font-mono text-xs leading-5 text-mute">{String(i + 1).padStart(2, "0")}</span>
                  <a href={`#${s.id}`} className="leading-5 text-paper-dim transition-colors hover:text-paper">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
            <p className="eyebrow mt-10">Related</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {related
                .filter((r) => r.href !== path)
                .map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} className="text-paper-dim transition-colors hover:text-paper">
                      {r.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </nav>

        <div className="prose-legal max-w-[46rem] lg:col-span-8 lg:col-start-5 [&>section:first-child>h2]:mt-0">
          {sections.map((s, i) => (
            <section key={s.id} aria-labelledby={s.id}>
              <h2 id={s.id}>
                <span className="mr-3 font-mono text-sm text-signal">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </h2>
              {s.body}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
