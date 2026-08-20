import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The catalogue spec table treatment - server-rendered real HTML tables
 * (the SEO moat: no UAE competitor publishes these), mobile-scrollable,
 * on the dark band styling from the quartz details pattern. `dark`
 * controls ink-on-onyx vs onyx-on-porcelain.
 */

type SpecTableProps = {
  caption?: string;
  head: string[];
  rows: (string | ReactNode)[][];
  footnote?: string;
  dark?: boolean;
  minWidth?: number;
};

export function SpecTable({
  caption,
  head,
  rows,
  footnote,
  dark = true,
  minWidth = 640,
}: SpecTableProps) {
  return (
    <div>
      <div className="min-w-0 [contain:inline-size] overflow-x-auto">
        <table
          className="w-full text-sm"
          style={{ minWidth: `${minWidth}px` }}
        >
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead>
            <tr
              className={cn(
                "label-gcb text-left",
                dark ? "text-ink/50" : "text-muted",
              )}
            >
              {head.map((h) => (
                <th key={h} className="py-2.5 pr-4 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            className={cn(
              "divide-y",
              dark ? "divide-ink/10" : "divide-border/30",
            )}
          >
            {rows.map((cells, rowIndex) => (
              <tr key={rowIndex}>
                {cells.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={cn(
                      "py-2.5 pr-4 align-top",
                      cellIndex === 0 &&
                        (dark ? "text-ink/60" : "text-muted"),
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {footnote && (
        <p
          className={cn(
            "mt-4 text-xs leading-relaxed",
            dark ? "text-ink/50" : "text-muted",
          )}
        >
          {footnote}
        </p>
      )}
    </div>
  );
}
