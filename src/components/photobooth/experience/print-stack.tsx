import type { CSSProperties } from "react";
import { printStack } from "@/config/photobooth-experience";

/**
 * A small stack of 4×6 prints: white border, the photo, and an event-name
 * footer. The scroll timeline in booth-sequence.tsx targets the
 * data-print-card elements and the --pb-sheen variable; without it (reduced
 * motion, the Digital + print section) the stack shows its settled state.
 */
export function PrintStack({ className = "" }: { className?: string }) {
  const { prints, eventLabel, illustrative } = printStack;
  return (
    <div className={`pb-prints ${className}`} aria-hidden="true">
      {/* Bottom of the stack first in the DOM, so the top print paints last. */}
      {[...prints].reverse().map((print, i) => {
        const depth = prints.length - 1 - i;
        return (
          <div key={print.src} data-print-card className="pb-print-card" style={{ "--i": depth } as CSSProperties}>
            <div className="pb-print-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={print.src} alt={print.alt} width={print.width} height={print.height} loading="lazy" decoding="async" />
              <span className="pb-print-sheen" />
              {illustrative && depth === 0 && <span className="pb-print-tag">Illustrative</span>}
            </div>
            <div className="pb-print-footer">
              <span>{eventLabel}</span>
              <span className="pb-print-mark" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
