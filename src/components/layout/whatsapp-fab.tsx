"use client";

/**
 * The WhatsApp floating button - the site's primary lead line, present
 * on every route, bottom-right. Onyx Green disc, Marble White glyph
 * (the brand's WhatsApp green is off-palette and stays off). Owner note
 * 2026-08-17: the glyph leads, the disc is a tight ring around it - the
 * Onyx ground must never dominate the corner again. One tap opens the
 * chat - no hover reveal.
 */
import { siteConfig } from "@/config/site";

export function WhatsAppFab() {
  return (
    <a
      href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20Global%20Classic%20-%20I%27d%20like%20to%20enquire%20about%20materials.`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat on WhatsApp - ${siteConfig.contact.phone}`}
      className="group fixed right-5 bottom-5 z-50 flex items-center gap-0 sm:right-7 sm:bottom-7"
    >
      <span className="bg-warm-black text-ink flex size-16 items-center justify-center rounded-full shadow-2xl transition-transform duration-300 group-hover:scale-105 sm:size-20">
        <svg
          aria-hidden
          className="size-12 sm:size-14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3Z" />
          <path d="M8.8 8.6c.2-.5.5-.5.7-.5h.6c.2 0 .4 0 .5.4.2.5.6 1.6.6 1.7.1.1.1.3 0 .4l-.4.6c-.1.2-.2.3 0 .6.2.3.8 1.1 1.6 1.7.9.7 1.5.9 1.8 1 .3.1.4 0 .5-.1l.6-.7c.2-.2.3-.2.6-.1l1.5.7c.3.1.4.2.4.4 0 .2 0 .9-.4 1.4-.4.5-1.3 1-1.8 1-.5.1-1.2.1-3-.6-2.4-1-4-3.4-4.1-3.6-.1-.2-1-1.3-1-2.6 0-1.2.6-1.8.8-2.1Z" />
        </svg>
      </span>
    </a>
  );
}
