"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Channels - the home page finale (owner spec, 2026-08-18): WhatsApp and
 * Instagram as a diptych of genuinely interactive cards.
 *
 * WhatsApp composer (Onyx card): the visitor assembles a real enquiry
 * from chips - material and intent - and the message forms live in a
 * chat bubble; the CTA is a real wa.me link carrying the composed text.
 * The brand's WhatsApp green stays off-palette, same rule as the FAB.
 *
 * Instagram deck (Pastel Green card): a swipeable stack of imagery the
 * site already ships - drag or tap to cycle - with the real
 * @globalclassic.bmt handle and follow link.
 *
 * Everything indexable (number, handle, links, chips) is plain JSX in
 * SSR HTML. Reduced motion: instant bubble swaps, tap-to-cycle deck.
 */

const MATERIALS = ["Quartz", "Marble", "Terrazzo", "Jaquar", "FILA"] as const;

const INTENTS = [
  { label: "Get a price", phrase: "get a price" },
  { label: "Check stock", phrase: "check stock" },
  { label: "Book a visit", phrase: "book a showroom visit" },
] as const;

/** Deck imagery - files already shipped elsewhere on the site. */
const DECK = [
  { src: "/home/materials/quartz-scene.webp", alt: "Calacatta Lazza quartz island" },
  { src: "/jaquar/scenes/bathtubs.webp", alt: "Freestanding bathtub against a green wall" },
  { src: "/images/fila/brand/droplets-macro-stone-hero.webp", alt: "Sealed stone beading golden droplets" },
  { src: "/home/materials/terrazzo-scene.webp", alt: "Exotic Green terrazzo stair" },
  { src: "/jaquar/scenes/faucets.webp", alt: "Chrome basin mixer running over marble" },
  { src: "/home/materials/marble-scene.webp", alt: "Emperador Scuro marble vanity" },
];

export function Channels() {
  return (
    <section
      aria-label="WhatsApp and Instagram"
      className="bg-background relative py-24 lg:py-32"
    >
      <div className="container-gcb">
        <p className="label-gcb text-warm-black/60">Always open</p>
        <h2 className="font-display text-warm-black mt-3 text-3xl tracking-tight sm:text-5xl">
          Two more doors.
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <WhatsAppComposer />
          <InstagramDeck />
        </div>
      </div>
    </section>
  );
}

function WhatsAppComposer() {
  const [material, setMaterial] = useState<(typeof MATERIALS)[number]>("Quartz");
  const [intent, setIntent] = useState<(typeof INTENTS)[number]>(INTENTS[0]);
  const reduced = useReducedMotion();

  const message = `Hello Global Classic - I'd like to ${intent.phrase} for ${material}.`;
  const href = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;

  const chip = (selected: boolean) =>
    cn(
      "cursor-pointer rounded-full border px-4 py-1.5 text-sm transition-colors",
      selected
        ? "bg-ink text-warm-black border-ink"
        : "border-ink/40 text-ink hover:border-ink",
    );

  return (
    <div className="bg-warm-black border-warm-black relative flex flex-col overflow-hidden rounded-3xl border p-7 sm:p-9">
      <div className="flex items-baseline justify-between">
        <p className="label-gcb text-ink/60">WhatsApp</p>
        <p className="text-ink/80 text-sm">{siteConfig.contact.phone}</p>
      </div>

      {/* The conversation */}
      <div className="mt-8 flex flex-1 flex-col gap-4">
        <div className="bg-ink text-warm-black max-w-[85%] self-start rounded-2xl rounded-bl-md px-4 py-3 text-sm leading-relaxed">
          Salam! What are you specifying? Compose your message below - it
          opens straight in our chat.
        </div>
        <div className="min-h-[4.5rem] self-end">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={message}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.25 }}
              className="bg-bronze text-warm-black max-w-[85%] rounded-2xl rounded-br-md px-4 py-3 text-sm leading-relaxed"
            >
              {message}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* The composer chips */}
      <div className="mt-8">
        <p className="label-gcb text-ink/50">Material</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {MATERIALS.map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={material === m}
              onClick={() => setMaterial(m)}
              className={chip(material === m)}
            >
              {m}
            </button>
          ))}
        </div>
        <p className="label-gcb text-ink/50 mt-5">I want to</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {INTENTS.map((i) => (
            <button
              key={i.label}
              type="button"
              aria-pressed={intent.label === i.label}
              onClick={() => setIntent(i)}
              className={chip(intent.label === i.label)}
            >
              {i.label}
            </button>
          ))}
        </div>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-ink text-warm-black hover:bg-bronze mt-8 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors"
      >
        Open in WhatsApp
        <svg aria-hidden width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3Z" />
        </svg>
      </a>
    </div>
  );
}

function InstagramDeck() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const advance = () => setIndex((i) => (i + 1) % DECK.length);

  /* Top three cards of the stack, top first. */
  const visible = [0, 1, 2].map((offset) => DECK[(index + offset) % DECK.length]);

  return (
    <div className="bg-bronze border-warm-black relative flex flex-col overflow-hidden rounded-3xl border p-7 sm:p-9">
      <div className="flex items-baseline justify-between">
        <p className="label-gcb text-warm-black/70">Instagram</p>
        <span className="text-warm-black/70 flex items-center gap-2 text-sm">
          <svg aria-hidden width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
          </svg>
          Swipe the deck
        </span>
      </div>

      {/* The deck */}
      <div className="relative mx-auto mt-8 h-72 w-56 flex-none sm:h-80 sm:w-64">
        {visible
          .map((card, depth) => ({ card, depth }))
          .reverse()
          .map(({ card, depth }) =>
            depth === 0 ? (
              <motion.button
                key={card.src}
                type="button"
                aria-label={`${card.alt} - show next`}
                drag={reduced ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={(_, info) => {
                  if (Math.abs(info.offset.x) > 80) advance();
                }}
                onClick={advance}
                whileDrag={{ rotate: 4 }}
                initial={reduced ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: reduced ? 0 : 0.3 }}
                className="border-warm-black absolute inset-0 cursor-grab overflow-hidden rounded-2xl border bg-background shadow-lg active:cursor-grabbing"
              >
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  sizes="16rem"
                  className="pointer-events-none object-cover"
                  loading="lazy"
                />
              </motion.button>
            ) : (
              <div
                key={card.src}
                aria-hidden
                className="border-warm-black absolute inset-0 overflow-hidden rounded-2xl border bg-background"
                style={{
                  transform: `rotate(${depth === 1 ? 5 : -4}deg) translateY(${depth * 6}px)`,
                }}
              >
                <Image
                  src={card.src}
                  alt=""
                  fill
                  sizes="16rem"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            ),
          )}
      </div>

      <p className="font-display text-warm-black mt-8 text-center text-2xl tracking-tight">
        @globalclassic.bmt
      </p>
      <a
        href={siteConfig.social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-warm-black text-ink mx-auto mt-4 inline-flex w-fit items-center rounded-full px-6 py-3 text-sm font-medium transition-transform hover:scale-[1.03]"
      >
        Follow on Instagram
      </a>
    </div>
  );
}
