import type { ReactNode } from "react";

import { MapPin, Mail, Phone } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

/**
 * Every direct channel as a tappable card (owner spec, 2026-08-19):
 * icon + short label + the actual number/address as text, so each is
 * both a button (tel:/mailto:/wa.me/maps) and readable data. Icons are
 * line-work, cards hover to Onyx + Marble White via chip-gcb.
 */

const MAPS_HREF =
  "https://www.google.com/maps/dir/?api=1&destination=9M62%2B45M%20Sharjah";

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden
    >
      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3Z" />
      <path d="M8.8 8.6c.2-.5.5-.5.7-.5h.6c.2 0 .4 0 .5.4.2.5.6 1.6.6 1.7.1.1.1.3 0 .4l-.4.6c-.1.2-.2.3 0 .6.2.3.8 1.1 1.6 1.7.9.7 1.5.9 1.8 1 .3.1.4 0 .5-.1l.6-.7c.2-.2.3-.2.6-.1l1.5.7c.3.1.4.2.4.4 0 .2 0 .9-.4 1.4-.4.5-1.3 1-1.8 1-.5.1-1.2.1-3-.6-2.4-1-4-3.4-4.1-3.6-.1-.2-1-1.3-1-2.6 0-1.2.6-1.8.8-2.1Z" />
    </svg>
  );
}

const CHANNELS: {
  label: string;
  value: string;
  href: string;
  icon: ReactNode;
  external?: boolean;
}[] = [
  {
    label: "Mobile",
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`,
    icon: <Phone strokeWidth={1.5} className="h-6 w-6" aria-hidden />,
  },
  {
    label: "Telephone",
    value: siteConfig.contact.landline,
    href: `tel:${siteConfig.contact.landline.replace(/\s/g, "")}`,
    icon: <Phone strokeWidth={1.5} className="h-6 w-6" aria-hidden />,
  },
  {
    label: "WhatsApp",
    value: siteConfig.contact.phone,
    href: `https://wa.me/${siteConfig.contact.whatsapp}`,
    icon: <WhatsAppIcon />,
    external: true,
  },
  {
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
    icon: <Mail strokeWidth={1.5} className="h-6 w-6" aria-hidden />,
  },
  {
    label: "Email",
    value: siteConfig.contact.salesEmail,
    href: `mailto:${siteConfig.contact.salesEmail}`,
    icon: <Mail strokeWidth={1.5} className="h-6 w-6" aria-hidden />,
  },
  {
    label: "Showroom",
    value: "Al Sajaa, Sharjah, UAE",
    href: MAPS_HREF,
    icon: <MapPin strokeWidth={1.5} className="h-6 w-6" aria-hidden />,
    external: true,
  },
];

export function ContactChannels() {
  return (
    <section aria-label="Direct contact channels" className="pb-4">
      <Container>
        <Reveal>
          <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {CHANNELS.map((channel) => (
              <li key={channel.href}>
                <a
                  href={channel.href}
                  {...(channel.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="chip-gcb border-warm-black flex h-full flex-col items-start gap-3 rounded-2xl border p-4"
                >
                  {channel.icon}
                  <span className="min-w-0">
                    <span className="label-gcb block opacity-60">
                      {channel.label}
                    </span>
                    <span className="mt-1 block text-sm leading-snug break-words">
                      {channel.value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
