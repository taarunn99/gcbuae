"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";

import { Logo } from "@/components/layout/logo";
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

  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => (overHero ? window.scrollY > window.innerHeight * 0.85 : true),
    () => !overHero,
  );

  // Close the mobile menu on navigation (state adjustment during render).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  const solid = scrolled || menuOpen;

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

        <div className="flex items-center justify-self-end">
          <Link
            href="/contact"
            className={cn(
              "label-gcb hidden border px-5 py-3 transition-colors sm:inline-block",
              solid
                ? "border-foreground/30 hover:bg-foreground hover:text-background"
                : "border-ink/40 hover:bg-ink hover:text-warm-black",
            )}
          >
            Contact Us
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="label-gcb -mr-2 p-2 sm:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

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
            <li>
              <Link
                href="/contact"
                className="label-gcb border-foreground/30 mt-5 inline-block border px-5 py-3"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
