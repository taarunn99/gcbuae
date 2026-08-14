import type { Metadata } from "next";
import { Anton } from "next/font/google";

import { FilaMotion } from "@/components/sections/fila/fila-motion";

/**
 * The FILA hub wrapper - "Yellow Editorial" design system, an
 * owner-sanctioned brand exception scoped to /fila only (see
 * docs/FILA-V2-BUILD-BRIEF.md section 1). Display face: Anton,
 * uppercase, stacked - the FILA profile cover system.
 */

const filaDisplay = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fila-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FILA Surface Care UAE | Global Classic",
    template: "%s | FILA UAE - Global Classic",
  },
};

export default function FilaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`theme-fila ${filaDisplay.variable} flex-1`}>
      <FilaMotion />
      {children}
    </div>
  );
}
