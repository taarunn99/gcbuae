import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms governing use of the ${siteConfig.name} website.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="theme-forest bg-background text-foreground flex-1 pt-40 pb-32">
      <Container>
        <p className="label-gcb text-muted">Legal</p>
        <h1 className="font-display mt-6 max-w-3xl text-4xl leading-tight tracking-tight text-balance sm:text-6xl">
          Terms &amp; Conditions
        </h1>
        <p className="text-muted mt-4 text-sm">Last updated: 6 August 2026</p>

        <div className="mt-14 max-w-3xl space-y-10 leading-relaxed">
          <section>
            <h2 className="font-display text-2xl">1. Who we are</h2>
            <p className="mt-3">
              This website is operated by {siteConfig.legalName}, a building
              materials trading company registered in the United Arab Emirates,
              located at 9M62+45M, Al Sajaa, Al Jlail, Sharjah, UAE, and a
              sister company of the Lapiz Group of Companies. By using this
              website you agree to these terms; if you do not agree, please do
              not use the site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">2. Use of the website</h2>
            <p className="mt-3">
              The site presents our company and product lines to trade and
              professional audiences. You agree to use it lawfully, not to
              interfere with its operation, and not to attempt unauthorised
              access to any part of it or its infrastructure.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">
              3. Product information - no offer
            </h2>
            <p className="mt-3">
              Content on this site (including images, descriptions,
              specifications and availability) is provided for general
              information and is not a contractual offer, quotation or warranty.
              Product appearance varies with material, batch and photography;
              natural and engineered stone varies slab to slab. All supply is
              subject to our written quotations and sales contracts agreed case
              by case.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">4. Intellectual property</h2>
            <p className="mt-3">
              The Global Classic name, logo, site design, text and imagery are
              owned by {siteConfig.legalName} or used under licence, and may not
              be reproduced without our written permission. Third-party names
              and logos shown on this site - including KalingaStone, Jaquar and
              FILA - are trademarks of their respective owners, used solely to
              describe genuine products we distribute; no affiliation beyond
              that distribution relationship is implied.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">5. Third-party links</h2>
            <p className="mt-3">
              Links to external sites (such as maps, social media or partner
              sites) are provided for convenience. We are not responsible for
              their content or their handling of your data.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">6. Liability</h2>
            <p className="mt-3">
              The website is provided &ldquo;as is&rdquo;. To the fullest extent
              permitted by law, we exclude liability for loss arising from use
              of, or inability to use, this website or reliance on its content.
              Nothing in these terms excludes liability that cannot be excluded
              under applicable law.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">7. Governing law</h2>
            <p className="mt-3">
              These terms are governed by the laws of the United Arab Emirates
              as applied in the Emirate of Sharjah, and disputes are subject to
              the exclusive jurisdiction of the courts of Sharjah, UAE.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">8. Changes and contact</h2>
            <p className="mt-3">
              We may revise these terms from time to time; the date above
              reflects the latest revision. Questions:{" "}
              <a className="u-line" href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>{" "}
              or +971 6 531 2015.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
