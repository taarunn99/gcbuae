"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ease, gsap } from "@/lib/gsap";

/**
 * Onyx wipe between routes. One overlay + document-level click delegation:
 * any same-origin link click sweeps the curtain up from the bottom, then
 * navigates; when the new pathname lands, the curtain exits through the top.
 *
 * Delegation (rather than a custom Link) keeps every existing <Link> and
 * GcbButton untouched. Modified clicks, new-tab targets, downloads, external
 * hosts, hash-only jumps and reduced-motion all fall through to default
 * behaviour.
 */
export function RouteTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const coveringRef = useRef(false);
  const router = useRouter();
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const reducedRef = useRef(prefersReducedMotion);
  useEffect(() => {
    reducedRef.current = prefersReducedMotion;
  }, [prefersReducedMotion]);

  // Cover on qualifying link clicks.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (reducedRef.current) return;
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;

      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      const samePage =
        url.pathname === window.location.pathname && url.hash !== "";
      if (samePage) return;
      if (url.pathname === window.location.pathname && !url.hash) return;

      const overlay = overlayRef.current;
      if (!overlay || coveringRef.current) return;

      event.preventDefault();
      coveringRef.current = true;

      gsap.set(overlay, { transformOrigin: "50% 100%", scaleY: 0 });
      gsap.to(overlay, {
        scaleY: 1,
        duration: 0.45,
        ease: ease.inOut,
        onComplete: () => {
          router.push(url.pathname + url.hash);
        },
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  // Reveal once the new route has rendered.
  useEffect(() => {
    if (!coveringRef.current) return;
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Double-rAF: let the new page paint beneath the curtain first.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        gsap.set(overlay, { transformOrigin: "50% 0%" });
        gsap.to(overlay, {
          scaleY: 0,
          duration: 0.5,
          delay: 0.08,
          ease: ease.inOut,
          onComplete: () => {
            coveringRef.current = false;
          },
        });
      });
    });
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      aria-hidden
      className="bg-warm-black pointer-events-none fixed inset-0 z-[90] scale-y-0"
    />
  );
}
