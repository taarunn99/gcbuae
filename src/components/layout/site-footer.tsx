import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

/**
 * Editorial footer — an Onyx stage closing every page: oversized display
 * wordmark, navigation and product columns, and the NAP details that back
 * the LocalBusiness structured data.
 */
export function SiteFooter() {
  return (
    <footer className="bg-warm-black text-ink grain-gcb relative overflow-hidden">
      <Container className="relative z-10 pt-20 pb-10 sm:pt-28">
        <p className="font-display text-[clamp(2.6rem,7.5vw,7rem)] leading-none tracking-tight text-balance">
          Global Classic
        </p>

        <div className="border-ink/15 mt-12 grid gap-10 border-t pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="label-gcb text-bronze">Navigate</p>
            <ul className="mt-4 space-y-2.5">
              {[...siteConfig.nav, { label: "Contact", href: "/contact" }].map(
                (item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="u-line text-ink/80">
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="label-gcb text-bronze">Products</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {siteConfig.products.map((product) => (
                <li key={product.slug}>
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

          <div>
            <p className="label-gcb text-bronze">Contact</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="u-line text-ink/80"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="text-ink/60">
                {siteConfig.address.city}, United Arab Emirates
              </li>
            </ul>
          </div>
        </div>

        <div className="border-ink/15 mt-14 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-gcb text-ink/50">
            © {new Date().getFullYear()} {siteConfig.legalName}
          </p>
          <p className="label-gcb text-ink/50">{siteConfig.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
