"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";
import { duration, ease, gsap, SplitText, useGSAP } from "@/lib/gsap";

type SplitHeadingProps = {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  /** Delay before the first line rises, in seconds. */
  delay?: number;
};

/**
 * Reveals text line by line from behind a mask, re-splitting on resize.
 *
 * The split is deferred until `document.fonts.ready` because SplitText measures
 * line breaks from rendered glyphs — splitting against a fallback font produces
 * lines that jump once the webfont swaps in.
 */
export function SplitHeading({
  children,
  className,
  as: Tag = "h2",
  delay = 0,
}: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      let split: SplitText | undefined;
      let cancelled = false;

      void document.fonts.ready.then(() => {
        if (cancelled || !ref.current) return;

        gsap.set(ref.current, { visibility: "visible" });

        split = SplitText.create(ref.current, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          linesClass: "gcb-line",
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 120,
              duration: duration.reveal,
              ease: ease.reveal,
              stagger: 0.09,
              delay,
              scrollTrigger: {
                trigger: ref.current,
                start: "top 85%",
                once: true,
              },
            }),
        });
      });

      return () => {
        cancelled = true;
        split?.revert();
      };
    },
    { scope: ref, dependencies: [delay] },
  );

  return (
    <Tag ref={ref} className={cn("invisible", className)}>
      {children}
    </Tag>
  );
}
