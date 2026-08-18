import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Global Classic Building Materials collects, uses and protects personal information on this website - data, cookies, contact details and your rights.",
  alternates: { canonical: "/privacy-policy" },
};

/**
 * Written to satisfy Google AdSense / Ads programme policies from day one:
 * explicit third-party-advertising and cookie disclosure (including the
 * Google advertising-cookie language and opt-out links), what we collect,
 * why, and user rights. Server-rendered prose - no client code.
 */
export default function PrivacyPolicyPage() {
  return (
    <main className="theme-forest bg-background text-foreground flex-1 pt-40 pb-32">
      <Container>
        <p className="label-gcb text-muted">Legal</p>
        <h1 className="font-display mt-6 max-w-3xl text-4xl leading-tight tracking-tight text-balance sm:text-6xl">
          Privacy Policy
        </h1>
        <p className="text-muted mt-4 text-sm">Last updated: 6 August 2026</p>

        <div className="prose-gcb mt-14 max-w-3xl space-y-10 leading-relaxed">
          <section>
            <h2 className="font-display text-2xl">Who we are</h2>
            <p className="mt-3">
              This website is operated by {siteConfig.legalName} (&ldquo;Global
              Classic&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), a building
              materials trading company registered in the United Arab Emirates,
              located at 9M62+45M, Al Sajaa, Al Jlail, Sharjah, UAE. Global
              Classic is a sister company of the Lapiz Group of Companies. For
              any privacy matter, contact us at{" "}
              <a className="u-line" href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>{" "}
              or +971 6 531 2015.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">Information we collect</h2>
            <p className="mt-3">
              We collect only what you choose to give us and the technical
              minimum needed to run the site:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Enquiry details.</strong> When you use the contact form,
                call, or email us: your name, company, email address, phone
                number and the content of your message. We use these solely to
                respond to your enquiry and manage our business relationship
                with you.
              </li>
              <li>
                <strong>Technical data.</strong> Like most websites, our hosting
                infrastructure records standard server logs (IP address, browser
                type, pages visited, timestamps) for security, debugging and
                aggregate statistics.
              </li>
              <li>
                <strong>Analytics.</strong> We use, or may in future use,
                privacy-respecting analytics services such as Google Analytics
                to understand how visitors use the site. These services set
                cookies and collect usage data under their own privacy policies.
              </li>
            </ul>
            <p className="mt-3">
              We do not sell personal information, and we do not collect
              special-category data on this website.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">
              Cookies and third-party advertising
            </h2>
            <p className="mt-3">
              This site uses, or may in future use, cookies and similar
              technologies. Some are strictly necessary for the site to work;
              others support analytics and advertising.
            </p>
            <p className="mt-3">
              We may display advertising served by Google and other third-party
              vendors. Third-party vendors, including Google, use cookies to
              serve ads based on your prior visits to this website or other
              websites. Google&rsquo;s use of advertising cookies enables it and
              its partners to serve ads to you based on your visits to this site
              and/or other sites on the Internet. You may opt out of
              personalised advertising by visiting{" "}
              <a
                className="u-line"
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Ads Settings
              </a>{" "}
              or{" "}
              <a
                className="u-line"
                href="https://www.aboutads.info/choices"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.aboutads.info
              </a>
              .
            </p>
            <p className="mt-3">
              You can also refuse or delete cookies through your browser
              settings; the site remains usable without non-essential cookies.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">Legal basis and retention</h2>
            <p className="mt-3">
              We process enquiry data on the basis of your consent and our
              legitimate interest in responding to business enquiries, and
              retain it only as long as needed for that purpose or as UAE law
              requires. Server logs are retained for a limited period for
              security purposes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">Sharing</h2>
            <p className="mt-3">
              We share personal information only with service providers who help
              us operate this website (hosting, email delivery, analytics and
              advertising partners as described above), each bound by their own
              privacy obligations, or where the law requires disclosure. We do
              not sell it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">Your rights</h2>
            <p className="mt-3">
              Subject to applicable law (including UAE Federal Decree-Law No. 45
              of 2021 on the Protection of Personal Data), you may request
              access to, correction of, or deletion of your personal
              information, and object to or restrict certain processing. Write
              to{" "}
              <a className="u-line" href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>{" "}
              and we will respond within a reasonable period.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">Children</h2>
            <p className="mt-3">
              This website is intended for trade and professional audiences and
              is not directed at children under 16. We do not knowingly collect
              their data.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">Changes</h2>
            <p className="mt-3">
              We may update this policy as the website and applicable law
              evolve. The date above reflects the latest revision; material
              changes will be visible on this page.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
