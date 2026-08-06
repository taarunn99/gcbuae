"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Logo } from "@/components/layout/logo";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { useMagneticShineGroup } from "@/hooks/use-magnetic-shine";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Editorial footer, revealed from UNDER the page: the footer is fixed behind
 * the content (a measured spacer holds its place in the flow), so the page
 * lifts away like a sheet and the footer rises to meet it — with a subtle 3D
 * settle (perspective tilt + scale) scrubbed to the reveal.
 *
 * Contact is icon-first per the owner: landline, mobile, mail, Instagram and
 * a Google-Maps directions pin (opens the Maps app on phones with the route
 * ready) in a single line.
 */

const MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=9M62%2B45M%20Al%20Sajaa%20Al%20Jlail%20Sharjah";

const CONTACT_ICONS: {
  label: string;
  href: string;
  external?: boolean;
  path: React.ReactNode;
}[] = [
  {
    label: "Call landline 06 531 2015",
    href: "tel:+97165312015",
    path: (
      <path d="M4 3h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 12l5 2v4a2 2 0 0 1-2 2A14 14 0 0 1 3 6a2 2 0 0 1 1-3" />
    ),
  },
  {
    label: "Call mobile 052 992 7827",
    href: "tel:+971529927827",
    path: (
      <>
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
        <path d="M11 18.5h2" />
      </>
    ),
  },
  {
    label: `Email ${siteConfig.contact.email}`,
    href: `mailto:${siteConfig.contact.email}`,
    path: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
  },
  {
    label: "Instagram — globalclassic.bmt",
    href: "https://www.instagram.com/globalclassic.bmt/",
    external: true,
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "Directions to the showroom (Google Maps)",
    href: MAPS_DIRECTIONS_URL,
    external: true,
    path: (
      <>
        <path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11" />
        <circle cx="12" cy="10" r="2.6" />
      </>
    ),
  },
];

export function SiteFooter() {
  const spacerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const iconRowRef = useMagneticShineGroup<HTMLDivElement>();
  const lapizRowRef = useMagneticShineGroup<HTMLDivElement>();
  const [height, setHeight] = useState(0);

  // The fixed footer occupies no flow space; the spacer mirrors its height
  // so the page scrolls exactly far enough to reveal it.
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    const sync = () => setHeight(footer.offsetHeight);
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(footer);
    return () => ro.disconnect();
  }, []);

  useGSAP(
    () => {
      if (!spacerRef.current || !innerRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        innerRef.current,
        { yPercent: -22, scale: 0.95, rotateX: 7, autoAlpha: 0.35 },
        {
          yPercent: 0,
          scale: 1,
          rotateX: 0,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: spacerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );
    },
    { scope: footerRef, dependencies: [height] },
  );

  // ScrollTrigger measures against the spacer, whose height arrives late.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [height]);

  return (
    <>
      <div
        ref={spacerRef}
        style={{ height }}
        aria-hidden
        className="pointer-events-none"
      />
      <footer
        ref={footerRef}
        className="bg-warm-black text-ink grain-gcb fixed inset-x-0 bottom-0 z-0 overflow-hidden"
        style={{ perspective: "1200px" }}
      >
        <div ref={innerRef} style={{ transformOrigin: "50% 0%" }}>
          <Container className="relative z-10 pt-16 pb-8 sm:pt-20">
            {/* Mark + icon-first contact, one line each side */}
            <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              <Logo className="h-16 w-auto sm:h-20" />
              <div ref={iconRowRef} className="flex items-center gap-3">
                {CONTACT_ICONS.map((icon) => (
                  <a
                    key={icon.label}
                    href={icon.href}
                    aria-label={icon.label}
                    title={icon.label}
                    {...(icon.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    data-shine
                    className="border-ink/25 hover:border-ink/70 relative flex h-11 w-11 items-center justify-center rounded-full border transition-colors will-change-transform"
                  >
                    <svg
                      aria-hidden
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="relative"
                    >
                      {icon.path}
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <p className="label-gcb text-ink/50 mt-6">
              9M62+45M · Al Sajaa · Al Jlail · Sharjah, United Arab Emirates
            </p>

            <div className="border-ink/15 mt-10 grid gap-10 border-t pt-10 sm:grid-cols-[1fr_2fr]">
              <div>
                <p className="label-gcb text-bronze">Navigate</p>
                <ul className="mt-4 space-y-2.5">
                  {[
                    ...siteConfig.nav,
                    { label: "Contact", href: "/contact" },
                  ].map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="u-line text-ink/80">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ONE titled block; the list flows into two columns inside it,
                  so it can never read as an untitled second category. */}
              <div>
                <p className="label-gcb text-bronze">Products</p>
                <ul className="mt-4 columns-2 gap-x-8">
                  {siteConfig.products.map((product) => (
                    <li
                      key={product.slug}
                      className="mb-2.5 break-inside-avoid"
                    >
                      <Link
                        href={`/products#${product.slug}`}
                        className="u-line text-ink/80"
                      >
                        {product.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Lapiz Group affiliation — logo mask-tinted Porcelain */}
            <div
              ref={lapizRowRef}
              className="border-ink/15 mt-10 flex flex-wrap items-center gap-4 border-t pt-8"
            >
              <span
                role="img"
                aria-label="Lapiz Blue"
                className="bg-ink block h-7 w-28 opacity-90"
                style={{
                  maskImage: "url(/brands/lapizblue.png)",
                  maskRepeat: "no-repeat",
                  maskPosition: "left center",
                  maskSize: "contain",
                  WebkitMaskImage: "url(/brands/lapizblue.png)",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "left center",
                  WebkitMaskSize: "contain",
                }}
              />
              <p className="text-ink/60 text-sm">
                A sister company of the Lapiz Group of Companies.
              </p>
              <a
                href="https://www.lapizblue.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit lapizblue.com"
                title="Visit lapizblue.com"
                data-shine
                className="border-ink/25 hover:border-ink/70 ml-auto flex h-11 w-11 items-center justify-center rounded-full border transition-colors will-change-transform"
              >
                <svg
                  aria-hidden
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
                </svg>
              </a>
            </div>

            <div className="border-ink/15 mt-8 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="label-gcb text-ink/50">
                © {new Date().getFullYear()} {siteConfig.legalName}
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href="/privacy-policy"
                  className="label-gcb u-line text-ink/50"
                >
                  Privacy Policy
                </Link>
                <Link href="/terms" className="label-gcb u-line text-ink/50">
                  Terms &amp; Conditions
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </footer>
    </>
  );
}
