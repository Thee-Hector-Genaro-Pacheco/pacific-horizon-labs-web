import { site } from "@/config/site";

/** The horizon mark: a sun half-risen over a single line. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M8 20a8 8 0 0 1 16 0" stroke="var(--color-signal)" strokeWidth="2" />
      <path d="M12.5 20a3.5 3.5 0 0 1 7 0" stroke="var(--color-signal)" strokeWidth="2" opacity="0.55" />
      <path d="M3 20h26" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      <path d="M9 25h14" stroke="currentColor" strokeWidth="2" strokeLinecap="square" opacity="0.35" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="size-7 shrink-0" />
      <span className="text-[0.9375rem] font-medium tracking-[-0.01em] whitespace-nowrap">
        {site.name}
      </span>
    </span>
  );
}
