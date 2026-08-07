"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

import SpecularButton, {
  type SpecularButtonProps,
} from "@/components/ui/specular-button/specular-button";
import { useMagnetic } from "@/hooks/use-magnetic";

/**
 * Brand skin over SpecularButton. The WebGL shader needs literal colours (it
 * cannot resolve CSS variables), so the palette lives here as hex mirrors of
 * the tokens in globals.css.
 *
 * `variant="dark"` sits on photography and dark sections; `variant="light"`
 * sits on limestone pages. `accent` retints the specular line — the product
 * wheel drives this per selection.
 */
const PALETTE = {
  dark: {
    textColor: "#f7f8f5", // Porcelain (--ink)
    lineColor: "#6f8f78", // Dusty Olive — the accent
    baseColor: "#355e4d", // Pine Teal
    tint: "#f7f8f5",
    tintOpacity: 0.05,
  },
  light: {
    textColor: "#0c1510", // Onyx (--foreground; Pine Teal is never text)
    lineColor: "#6f8f78", // Dusty Olive
    baseColor: "#d2d4c8", // Dust Grey
    tint: "#0c1510", // Onyx
    tintOpacity: 0.04,
  },
} as const;

export type GcbButtonProps = {
  children: ReactNode;
  variant?: keyof typeof PALETTE;
  /** Overrides the specular line colour, e.g. the wheel's active accent. */
  accent?: string;
  /** Internal route to navigate to on click. */
  href?: string;
  size?: SpecularButtonProps["size"];
  type?: SpecularButtonProps["type"];
  onClick?: SpecularButtonProps["onClick"];
  disabled?: boolean;
  className?: string;
};

export function GcbButton({
  children,
  variant = "dark",
  accent,
  href,
  size = "md",
  type = "button",
  onClick,
  disabled,
  className,
}: GcbButtonProps) {
  const router = useRouter();
  const palette = PALETTE[variant];
  // Magnetic pull on the wrapper so the WebGL rim canvas travels with the
  // button instead of being clipped by a transformed inner element.
  const magneticRef = useMagnetic<HTMLSpanElement>(0.25, 70);

  return (
    <span ref={magneticRef} className="inline-block will-change-transform">
      <SpecularButton
        size={size}
        radius={999}
        blur={10}
        tint={palette.tint}
        tintOpacity={palette.tintOpacity}
        textColor={palette.textColor}
        lineColor={accent ?? palette.lineColor}
        baseColor={palette.baseColor}
        intensity={1}
        shineSize={12}
        shineFade={45}
        thickness={1.1}
        proximity={220}
        type={type}
        disabled={disabled}
        className={className}
        onClick={(event) => {
          onClick?.(event);
          if (href && !event.defaultPrevented) router.push(href);
        }}
      >
        <span className="label-gcb whitespace-nowrap">{children}</span>
      </SpecularButton>
    </span>
  );
}
