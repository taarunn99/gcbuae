import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";

/**
 * The WhatsApp section — the conversation, previewed. A palette-safe
 * chat card (no WhatsApp green; Onyx and Porcelain bubbles) plays out
 * the exchange a buyer actually has with us, message by message on
 * scroll, ending in the real thing: one tap opens the chat. Golden
 * split; all text server-rendered.
 */

const THREAD: { from: "buyer" | "gcb"; text: string }[] = [
  { from: "buyer", text: "Do you have Calacatta Lazza ex-stock?" },
  {
    from: "gcb",
    text: "Yes — Sharjah warehouse. Slab count and photos on request, availability confirmed against live stock.",
  },
  { from: "buyer", text: "Delivery to Abu Dhabi, ~40 slabs?" },
  {
    from: "gcb",
    text: "Across the whole of the UAE. Send your BOQ here and volume pricing comes back usually within one working day.",
  },
];

export function WhatsAppPlugin() {
  return (
    <section className="border-warm-black border-t py-24 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.618fr_1fr] lg:gap-20">
          <div>
            <p className="label-gcb text-muted">The fastest quote in Sharjah</p>
            <h2 className="font-display text-phi-3 mt-5 max-w-xl tracking-tight text-balance">
              Slab questions answered where you already are.
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed">
              No portals, no hold music. Message the warehouse directly on
              WhatsApp — availability, photos of the actual slabs, volume
              pricing and delivery slots, in one thread you can forward to your
              client.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/971529927827?text=Hello%20Global%20Classic%20—%20I%27d%20like%20to%20enquire%20about%20materials."
                target="_blank"
                rel="noopener noreferrer"
                className="chip-gcb border-border/50 rounded-full border px-6 py-3 text-sm"
              >
                Start the chat — +971 52 992 7827
              </a>
              <span className="label-gcb text-muted">
                Sat–Thu · 8:00–18:00 GST
              </span>
            </div>
          </div>

          {/* The conversation card */}
          <div className="border-warm-black mx-auto w-full max-w-[360px] overflow-hidden rounded-2xl border shadow-2xl">
            {/* Header */}
            <div className="bg-warm-black text-ink flex items-center gap-3 px-5 py-4">
              <span className="bg-verde flex size-9 shrink-0 items-center justify-center rounded-full">
                <svg
                  aria-hidden
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F7F8F5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3Z" />
                </svg>
              </span>
              <span className="min-w-0">
                <span className="font-display block leading-tight">
                  Global Classic
                </span>
                <span className="text-ink/60 text-xs">
                  typically replies within the hour
                </span>
              </span>
            </div>

            {/* Thread */}
            <div className="bg-surface/40 space-y-3 px-4 py-6">
              {THREAD.map((message, index) => (
                <Reveal key={message.text} delay={0.15 + index * 0.18}>
                  <p
                    className={
                      message.from === "buyer"
                        ? "bg-background border-warm-black/20 mr-10 rounded-2xl rounded-bl-sm border px-4 py-2.5 text-sm leading-relaxed"
                        : "bg-warm-black text-ink ml-10 rounded-2xl rounded-br-sm px-4 py-2.5 text-sm leading-relaxed"
                    }
                  >
                    {message.text}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Composer */}
            <a
              href="https://wa.me/971529927827?text=Hello%20Global%20Classic%20—%20I%27d%20like%20to%20enquire%20about%20materials."
              target="_blank"
              rel="noopener noreferrer"
              className="border-warm-black/20 text-muted hover:text-foreground flex items-center justify-between border-t px-5 py-4 text-sm transition-colors"
            >
              <span>Type a message…</span>
              <span aria-hidden className="text-bronze">
                ➤
              </span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
