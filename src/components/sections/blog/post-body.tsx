import Link from "next/link";
import type { ReactNode } from "react";

import type { BlogSection } from "@/content/blog/types";

/**
 * Server-rendered post body for The Journal. Inline [anchor](/path)
 * links become real anchors at render time, paragraphs split on blank
 * lines, and every H2 gets a slugified id so the pillar TOC and
 * fragment links work. No client JS anywhere in the reading column.
 */

export function anchorId(h2: string): string {
  return h2
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

export function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  LINK_RE.lastIndex = 0;
  while ((match = LINK_RE.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const [, label, href] = match;
    if (href.startsWith("/")) {
      nodes.push(
        <Link key={`${href}-${match.index}`} href={href} className="u-line text-warm-black font-medium">
          {label}
        </Link>,
      );
    } else {
      nodes.push(
        <a
          key={`${href}-${match.index}`}
          href={href}
          className="u-line text-warm-black font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>,
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function PostBody({ sections }: { sections: BlogSection[] }) {
  return (
    <div>
      {sections.map((section) => (
        <section key={section.h2} className="mt-14 first:mt-12">
          <span aria-hidden className="bg-bronze block h-px w-12" />
          <h2
            id={anchorId(section.h2)}
            className="font-display text-warm-black mt-5 scroll-mt-28 text-phi-2 leading-tight tracking-tight"
          >
            {section.h2}
          </h2>
          {section.body.split(/\n\n+/).map((paragraph, i) => (
            <p
              key={i}
              className="text-warm-black/80 mt-5 leading-relaxed"
            >
              {renderInline(paragraph)}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}
