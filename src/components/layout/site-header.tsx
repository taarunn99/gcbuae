"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { Logo } from "@/components/layout/logo";
import { useMagneticShineGroup } from "@/hooks/use-magnetic-shine";
import { GcbButton } from "@/components/ui/gcb-button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Fixed header. Over the hero it is invisible as a bar — only the buttons show
 * (ink text, no background). Once scrolled past ~85vh it gains a blurred
 * limestone background and switches to foreground text. While the scroll film
 * is pinned, `html[data-film-pinned]` slides the whole thing out of frame
 * (CSS in globals.css).
 *
 * Off the home page there is no full-bleed image behind it, so it renders in
 * its "scrolled" state from the start.
 */
function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  window.addEventListener("resize", callback);
  return () => {
    window.removeEventListener("scroll", callback);
    window.removeEventListener("resize", callback);
  };
}

export function SiteHeader() {
  const pathname = usePathname();
  const overHero = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const clusterRef = useMagneticShineGroup<HTMLDivElement>(0.25, 50);

  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => (overHero ? window.scrollY > window.innerHeight * 0.85 : true),
    () => !overHero,
  );

  // Close menu and search on navigation (state adjustment during render).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
    setSearchOpen(false);
  }

  // The full-screen menu panel is dark, so the bar must NOT go light while
  // it is open — transparent ink-on-dark reads correctly over the panel.
  const solid = (scrolled || searchOpen) && !menuOpen;

  // Lock page scroll behind the full-screen menu.
  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", menuOpen);
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [menuOpen]);

  // The search panel stays mounted (its entrance is a CSS grid-rows
  // transition), so focus is driven here instead of autoFocus.
  const searchInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  return (
    <header
      className={cn(
        "site-header fixed inset-x-0 top-0 z-50",
        // Off the home page the whole chrome follows the brand-green scope;
        // the home page keeps the palette of its photography.
        !overHero && "theme-forest",
        // Fully opaque: an 85%-alpha bar composited off-palette colours from
        // whatever scrolled beneath it — a colour-picker must read exactly
        // #F7F8F5 here (strict palette).
        solid
          ? "bg-background text-foreground border-b"
          : "text-ink border-b border-transparent",
        menuOpen && "text-ink",
      )}
    >
      <div className="container-gcb grid h-16 grid-cols-[1fr_auto_1fr] items-center sm:h-20">
        <Link
          href="/"
          aria-label={`${siteConfig.name} — home`}
          className="justify-self-start transition-opacity hover:opacity-70"
        >
          {/* viewBox is cropped to the mark's content, so the logo renders at
              roughly twice its old visual size inside the same bar. */}
          <Logo className="h-12 w-auto sm:h-16" />
        </Link>

        {/* Desktop nav, centered */}
        <nav
          className="hidden items-center gap-10 sm:flex"
          aria-label="Primary"
        >
          {siteConfig.nav.map((item) =>
            item.label === "Products" ? (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="label-gcb u-line inline-flex items-center gap-1.5 py-2"
                >
                  {item.label}
                  <span aria-hidden className="text-[0.55rem]">
                    ▾
                  </span>
                </Link>
                {/* Hover/focus dropdown */}
                <div className="invisible absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className="bg-background text-foreground w-64 border py-2 shadow-xl">
                    {siteConfig.products.map((product) => (
                      <li key={product.slug}>
                        <Link
                          href={`/products#${product.slug}`}
                          className="hover:bg-surface block px-5 py-2.5 text-sm transition-colors"
                        >
                          {product.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="label-gcb u-line py-2"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        {/* col-start-3 is load-bearing: the nav is display:none on phones,
            which removes it from grid flow — without the explicit column this
            cluster auto-places into the middle and renders centred. */}
        <div
          ref={clusterRef}
          className="col-start-3 flex items-center gap-1 justify-self-end sm:gap-3"
        >
          <div>
            <GcbButton
              href="/contact"
              size="sm"
              variant={solid ? "light" : "dark"}
            >
              Contact Us
            </GcbButton>
          </div>

          {/* Search — the interface exists now, the engine arrives with the
              product catalogue. Rightmost, beside Contact Us. */}
          <button
            type="button"
            aria-label="Search"
            aria-expanded={searchOpen}
            aria-controls="site-search"
            onClick={() => setSearchOpen((open) => !open)}
            data-shine
            className="flex h-9 w-9 items-center justify-center rounded-full border border-current/30 transition-colors will-change-transform hover:border-current/70"
          >
            <svg
              aria-hidden
              width="17"
              height="17"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <circle cx="8.5" cy="8.5" r="6" />
              <path d="m13 13 5 5" />
            </svg>
          </button>

          {/* Mobile menu button — hamburger to X */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            data-shine
            className="-mr-1 flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full will-change-transform sm:hidden"
          >
            <span
              aria-hidden
              className={cn(
                "block h-px w-5 bg-current transition-transform duration-300",
                menuOpen && "translate-y-[3px] rotate-45",
              )}
            />
            <span
              aria-hidden
              className={cn(
                "block h-px w-5 bg-current transition-transform duration-300",
                menuOpen && "-translate-y-[3px] -rotate-45",
              )}
            />
          </button>
        </div>
      </div>

      {/* Search — drops from the top, expanding into the text box (CSS
          grid-rows transition). Placeholder until the catalogue ships. */}
      <div
        id="site-search"
        aria-hidden={!searchOpen}
        className={cn(
          "ease-in-out-quart grid transition-[grid-template-rows] duration-500",
          searchOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="bg-background text-foreground min-h-0 overflow-hidden">
          <div
            className={cn(
              "container-gcb border-t py-6 transition-all delay-100 duration-400",
              searchOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-6 opacity-0",
            )}
          >
            <form
              role="search"
              onSubmit={(event) => event.preventDefault()}
              className="flex items-center gap-4"
            >
              <input
                ref={searchInputRef}
                type="search"
                name="q"
                placeholder="Search materials, finishes, care…"
                aria-label="Search the site"
                tabIndex={searchOpen ? 0 : -1}
                className="placeholder:text-muted/70 focus:border-accent w-full border-b bg-transparent py-3 text-lg outline-none"
              />
              <button
                type="button"
                aria-label="Close search"
                tabIndex={searchOpen ? 0 : -1}
                onClick={() => setSearchOpen(false)}
                className="label-gcb p-2 opacity-70 hover:opacity-100"
              >
                Close
              </button>
            </form>
            <p className="text-muted mt-3 text-xs">
              Search goes live with the product catalogue.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile menu — full screen, slides in from the right (CSS transform
          transition; stays mounted). Sits under the fixed bar z-wise so the
          logo and the X stay on top of it. */}
      <nav
        id="mobile-menu"
        aria-label="Primary"
        aria-hidden={!menuOpen}
        className={cn(
          "bg-warm-black text-ink fixed inset-0 -z-10 overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] sm:hidden",
          menuOpen ? "translate-x-0" : "pointer-events-none translate-x-full",
        )}
      >
        <div className="container-gcb pt-24 pb-12">
          <p
            className={cn(
              "label-gcb text-bronze transition-opacity duration-500",
              menuOpen ? "opacity-100 delay-200" : "opacity-0 delay-0",
            )}
          >
            Navigate
          </p>

          <ul className="mt-4">
            {[...siteConfig.nav, { label: "Contact", href: "/contact" }].map(
              (item, index) => (
                <li
                  key={item.href}
                  className={cn(
                    "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    menuOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-8 opacity-0",
                  )}
                  style={{
                    transitionDelay: menuOpen ? `${240 + index * 60}ms` : "0ms",
                  }}
                >
                  <Link
                    href={item.href}
                    tabIndex={menuOpen ? 0 : -1}
                    className="font-display block py-3 text-4xl tracking-tight"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>

          <div
            className={cn(
              "border-ink/15 mt-8 border-t pt-8 transition-opacity duration-500",
              menuOpen ? "opacity-100 delay-500" : "opacity-0 delay-0",
            )}
          >
            <p className="label-gcb text-bronze">Products</p>
            <ul className="mt-4">
              {siteConfig.products.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/products#${product.slug}`}
                    tabIndex={menuOpen ? 0 : -1}
                    className="text-ink/80 block py-2.5 text-base"
                  >
                    {product.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
