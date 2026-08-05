"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";

import { Logo } from "@/components/layout/logo";
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

  const solid = scrolled || menuOpen || searchOpen;

  return (
    <header
      className={cn(
        "site-header fixed inset-x-0 top-0 z-50",
        solid
          ? "bg-background/85 text-foreground border-b backdrop-blur-md"
          : "text-ink border-b border-transparent",
      )}
    >
      <div className="container-gcb grid h-16 grid-cols-[1fr_auto_1fr] items-center sm:h-20">
        <Link
          href="/"
          aria-label={`${siteConfig.name} — home`}
          className="justify-self-start transition-opacity hover:opacity-70"
        >
          <Logo className="h-12 w-12 sm:h-14 sm:w-14" />
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
                  className="label-gcb inline-flex items-center gap-1.5 py-2 transition-opacity hover:opacity-70"
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
                className="label-gcb py-2 transition-opacity hover:opacity-70"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        {/* col-start-3 is load-bearing: the nav is display:none on phones,
            which removes it from grid flow — without the explicit column this
            cluster auto-places into the middle and renders centred. */}
        <div className="col-start-3 flex items-center gap-1 justify-self-end sm:gap-3">
          <div className="hidden sm:block">
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
            className="p-2 transition-opacity hover:opacity-70"
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
            className="-mr-1 flex h-9 w-9 flex-col items-center justify-center gap-[5px] sm:hidden"
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

      {/* Search overlay — placeholder until the catalogue ships */}
      {searchOpen && (
        <div
          id="site-search"
          className="bg-background text-foreground border-t shadow-xl"
        >
          <div className="container-gcb py-6">
            <form
              role="search"
              onSubmit={(event) => event.preventDefault()}
              className="flex items-center gap-4"
            >
              <input
                autoFocus
                type="search"
                name="q"
                placeholder="Search materials, finishes, care…"
                aria-label="Search the site"
                className="placeholder:text-muted/70 focus:border-accent w-full border-b bg-transparent py-3 text-lg outline-none"
              />
              <button
                type="button"
                aria-label="Close search"
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
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Primary"
          className="bg-background text-foreground border-t sm:hidden"
        >
          <ul className="container-gcb flex flex-col py-4">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="label-gcb block py-4">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <p className="text-muted pt-4 pb-2 text-xs">Products</p>
              <ul className="border-l pl-4">
                {siteConfig.products.map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/products#${product.slug}`}
                      className="block py-2.5 text-sm"
                    >
                      {product.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mt-5">
              <GcbButton href="/contact" size="sm" variant="light">
                Contact Us
              </GcbButton>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
