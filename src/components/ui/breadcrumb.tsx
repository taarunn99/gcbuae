import { Fragment } from "react";

import Link from "next/link";

import { siteConfig } from "@/config/site";

/**
 * One breadcrumb source of truth per page: the same items array renders the
 * visible trail AND the BreadcrumbList JSON-LD, so the two can never
 * disagree. Every crumb except the current page is a real link - every
 * level of the trail now has a page behind it (/products, /kalingastone,
 * /jaquar, the pillars, the families).
 */

export type Crumb = { label: string; href: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  const last = items.length - 1;
  return (
    /* flex-wrap, not inline flow: with no whitespace between the inline
       elements the whole trail was ONE unbreakable line, and its
       min-content width expanded the mobile layout viewport - zooming
       out and side-panning every deep page on phones (audit,
       2026-08-19). gap-x-2 reproduces the old mx-2 spacing exactly. */
    <nav
      aria-label="Breadcrumb"
      className="label-gcb text-muted flex flex-wrap items-center gap-x-2 gap-y-2"
    >
      {items.map((item, i) => (
        <Fragment key={item.href}>
          {i > 0 && <span aria-hidden>/</span>}
          {i === last ? (
            <span className="text-foreground">{item.label}</span>
          ) : (
            <Link href={item.href} className="u-line">
              {item.label}
            </Link>
          )}
        </Fragment>
      ))}
    </nav>
  );
}

export function breadcrumbJsonLd(items: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.href === "/" ? siteConfig.url : `${siteConfig.url}${item.href}`,
    })),
  };
}
