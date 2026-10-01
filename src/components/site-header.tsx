"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { primaryNav, site } from "@/config/site";
import { Wordmark } from "./logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();

  // Close the mobile menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || open
          ? "border-b border-line bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-site flex h-16 items-center justify-between md:h-[4.5rem]">
        <Link href="/" className="-m-1 p-1 text-paper" aria-label={`${site.name}, home`}>
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="rounded-full px-3.5 py-2 text-sm text-paper-dim transition-colors hover:text-paper aria-[current=page]:text-paper"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="ml-3">
              <Link
                href="/contact"
                aria-current={isActive("/contact") ? "page" : undefined}
                className="inline-flex h-9 items-center rounded-full border border-line-strong px-4 text-sm text-paper transition-colors hover:border-paper/40 hover:bg-paper/5"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-paper md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="relative block h-3 w-5">
            <span
              className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id={menuId}
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-ink md:hidden"
      >
        <nav aria-label="Mobile" className="container-site py-8">
          <ul className="flex flex-col">
            {[...primaryNav, { label: "Contact", href: "/contact" }].map((item, i) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex items-baseline justify-between py-5 text-2xl tracking-tight text-paper aria-[current=page]:text-signal"
                >
                  {item.label}
                  <span className="eyebrow">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10 eyebrow">{site.legalName}</p>
        </nav>
      </div>
    </header>
  );
}
