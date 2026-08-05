"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

import SpecularButton, {
  type SpecularButtonProps,
} from "@/components/ui/specular-button/specular-button";

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
    textColor: "#f5efe4", // --ink
    lineColor: "#c9a36a", // --bronze, lifted for visibility on dark
    baseColor: "#6e5c44",
    tint: "#ffffff",
    tintOpacity: 0.05,
  },
  light: {
    textColor: "#2b241c", // --foreground
    lineColor: "#a8875a", // --bronze
    baseColor: "#c8b694",
    tint: "#1a150e",
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

  return (
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
  );
}
