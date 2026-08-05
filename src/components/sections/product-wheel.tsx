"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState, useSyncExternalStore } from "react";

import { GcbButton } from "@/components/ui/gcb-button";
import { wheelProducts } from "@/config/product-wheel";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * The product wheel — scroll-driven. On desktop the section pins and the dial
 * of product names rotates with the scroll, one detent per line; the section
 * retints in the active line's accent and the placeholder card turns with it.
 * Clicking a name glides the scroll to that detent. On phones (and under
 * reduced motion) the dial becomes a tappable chip row with no pinning.
 *
 * Images are deliberate placeholder blocks (accent-tinted, crossed frame)
 * until real product photography arrives — swap files in /public/products.
 */

const STEP_DEG = 14;
const RADIUS = 460;
// Mobile fan: pivot below the arc, active name at 12 o'clock. Positive scroll
// rotates anticlockwise (rotation decreases), reverse scroll clockwise.
const STEP_DEG_MOBILE = 38;
const RADIUS_MOBILE = 175;
const COUNT = wheelProducts.length;

const emptySubscribe = () => () => {};

let audioContext: AudioContext | null = null;

/**
 * A quiet, tactile detent — closer to a haptic than a click: a tiny damped
 * "tock" with a low knuckle under it, kept far below speech volume.
 */
function playTick() {
  try {
    audioContext ??= new AudioContext();
    if (audioContext.state === "suspended") void audioContext.resume();
    const t = audioContext.currentTime;

    const tock = audioContext.createOscillator();
    const tockGain = audioContext.createGain();
    tock.type = "sine";
    tock.frequency.setValueAtTime(1050, t);
    tock.frequency.exponentialRampToValueAtTime(650, t + 0.018);
    tockGain.gain.setValueAtTime(0.018, t);
    tockGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
    tock.connect(tockGain).connect(audioContext.destination);
    tock.start(t);
    tock.stop(t + 0.035);

    const sub = audioContext.createOscillator();
    const subGain = audioContext.createGain();
    sub.type = "sine";
    sub.frequency.setValueAtTime(170, t);
    subGain.gain.setValueAtTime(0.012, t);
    subGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    sub.connect(subGain).connect(audioContext.destination);
    sub.start(t);
    sub.stop(t + 0.055);
  } catch {
    // No audio available — the wheel works silently.
  }
}

export function ProductWheel() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const indexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  // The mobile dial is JS-positioned; until hydration the server markup shows
  // the chip fallback instead, so no-JS phones still get a working selector.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const active = wheelProducts[activeIndex];

  const commitIndex = (index: number) => {
    if (indexRef.current === index) return;
    indexRef.current = index;
    playTick();
    setActiveIndex(index);
  };

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // Desktop: names radiate from a pivot off the LEFT edge, active on the
      // horizontal. Mobile: a fan with the pivot BELOW, active at 12 o'clock —
      // scrolling forward turns it anticlockwise, scrolling back clockwise.
      const applyDesktop = (position: number) => {
        itemRefs.current.forEach((el, i) => {
          if (!el) return;
          const angle = (i - position) * STEP_DEG;
          const distance = Math.abs(i - position);
          el.style.transformOrigin = "left center";
          el.style.transform = `rotate(${angle}deg) translateX(${RADIUS}px)`;
          el.style.opacity = String(Math.max(0, 1 - distance * 0.22));
          el.style.pointerEvents = distance > 3.5 ? "none" : "";
        });
      };

      const applyMobile = (position: number) => {
        itemRefs.current.forEach((el, i) => {
          if (!el) return;
          const angle = (i - position) * STEP_DEG_MOBILE;
          const distance = Math.abs(i - position);
          // Origin sits RADIUS_MOBILE below the element's own centre — the
          // fan's hub — so a plain rotate swings the name along the arc.
          el.style.transformOrigin = `50% ${RADIUS_MOBILE}px`;
          el.style.transform = `translateX(-50%) rotate(${angle}deg)`;
          el.style.opacity = String(Math.max(0, 1 - distance * 0.4));
          el.style.pointerEvents = distance > 1.5 ? "none" : "";
        });
      };

      // ScrollTrigger's built-in snap waits for native scroll-end, which
      // Lenis's smoothing delays unreliably — so snap manually: when updates
      // go quiet between detents, glide the scroll to the nearest one.
      let snapTimer: ReturnType<typeof setTimeout> | undefined;
      const queueSnap = (st: ScrollTrigger) => {
        clearTimeout(snapTimer);
        snapTimer = setTimeout(() => {
          const position = st.progress * (COUNT - 1);
          const nearest = Math.round(position);
          if (Math.abs(position - nearest) < 0.02) return;
          gsap.to(window, {
            duration: 0.5,
            ease: "power2.out",
            scrollTo: st.start + (nearest / (COUNT - 1)) * (st.end - st.start),
          });
        }, 200);
      };

      const attach = (apply: (position: number) => void, perDetent: number) => {
        const st = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${(COUNT - 1) * perDetent}%`,
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            const position = self.progress * (COUNT - 1);
            apply(position);
            commitIndex(Math.round(position));
            queueSnap(self);
          },
        });
        triggerRef.current = st;
        apply(st.progress * (COUNT - 1));

        return () => {
          clearTimeout(snapTimer);
          triggerRef.current = null;
          st.kill();
        };
      };

      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 64rem) and (prefers-reduced-motion: no-preference)",
        () => attach(applyDesktop, 45),
      );
      mm.add(
        "(max-width: 63.99rem) and (prefers-reduced-motion: no-preference)",
        () => attach(applyMobile, 35),
      );
    },
    { scope: sectionRef },
  );

  /** Chip tap (mobile) or dial-name click (desktop, glides the scroll). */
  const select = (index: number) => {
    const st = triggerRef.current;
    if (st) {
      const target = st.start + (index / (COUNT - 1)) * (st.end - st.start);
      gsap.to(window, { duration: 0.9, ease: "gcb-out", scrollTo: target });
    } else {
      commitIndex(index);
    }
  };

  const showDial = !prefersReducedMotion;

  return (
    <section
      ref={sectionRef}
      aria-label="Product lines"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden py-24"
      style={{
        backgroundColor: `color-mix(in oklab, #16110b 66%, ${active.accent})`,
        transition: "background-color 700ms ease",
      }}
    >
      <div className="container-gcb">
        <p className="label-gcb text-ink/60">The Collection</p>
        <h2 className="font-display text-ink mt-4 max-w-2xl text-3xl leading-tight tracking-tight sm:text-5xl">
          Eight lines. One standard.
        </h2>
      </div>

      <div className="container-gcb mt-8 grid items-center gap-8 lg:mt-12 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        {/* Dial — scroll-rotated. Desktop: pivot off the left edge, active on
            the horizontal. Mobile: fan at the top, pivot below, active at 12
            o'clock. Hidden on phones until hydration (chips cover no-JS). */}
        {showDial && (
          <div
            className={cn(
              "relative h-40 lg:h-[26rem]",
              !mounted && "hidden lg:block",
            )}
            role="listbox"
            aria-label="Product lines"
            aria-activedescendant={`wheel-${active.id}`}
          >
            <div className="absolute inset-x-0 top-6 lg:inset-x-auto lg:top-1/2 lg:left-[-360px]">
              {wheelProducts.map((product, index) => (
                <button
                  key={product.id}
                  id={`wheel-${product.id}`}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  onClick={() => select(index)}
                  className={cn(
                    "font-display absolute top-0 left-1/2 text-2xl tracking-tight whitespace-nowrap transition-colors duration-500 lg:left-0 lg:origin-left lg:text-3xl xl:text-4xl",
                    index === activeIndex
                      ? "text-ink"
                      : "text-ink/35 hover:text-ink/70",
                  )}
                  // The desktop pose ships as SSR inline style for no-JS
                  // rendering only. Once mounted, the prop is withdrawn so
                  // React re-renders can never clobber the transforms the
                  // scroll code writes — with the prop present, every detent's
                  // re-render reset phones to the desktop pose (off-screen).
                  style={
                    mounted
                      ? undefined
                      : {
                          transform: `rotate(${(index - activeIndex) * STEP_DEG}deg) translateX(${RADIUS}px)`,
                        }
                  }
                >
                  {index === activeIndex && (
                    <span
                      aria-hidden
                      className="absolute top-1/2 -left-14 hidden h-px w-10 transition-colors duration-500 lg:block"
                      style={{ backgroundColor: active.accent }}
                    />
                  )}
                  {product.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chip row — no-JS phones and reduced-motion fallback */}
        <div
          className={cn(
            "-mx-6 overflow-x-auto px-6",
            showDial && (mounted ? "hidden" : "lg:hidden"),
          )}
        >
          <div className="flex w-max gap-3 pb-2">
            {wheelProducts.map((product, index) => (
              <button
                key={product.id}
                type="button"
                onClick={() => select(index)}
                className={cn(
                  "label-gcb rounded-full border px-5 py-3 whitespace-nowrap transition-colors",
                  index === activeIndex
                    ? "text-warm-black border-transparent"
                    : "text-ink/70 border-ink/25",
                )}
                style={
                  index === activeIndex
                    ? { backgroundColor: active.accent }
                    : undefined
                }
              >
                {product.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active line card — centered on phones, right column on desktop */}
        <div className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={active.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={active.image}
                  alt={`${active.label} placeholder`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl border transition-colors duration-500"
              style={{
                borderColor: `color-mix(in srgb, ${active.accent} 55%, transparent)`,
              }}
            />
          </div>

          {/* Phones: counter then button, both centered under the image. */}
          <div className="mt-5 flex flex-col items-center gap-4 lg:mt-6 lg:flex-row lg:flex-wrap lg:justify-between lg:gap-6">
            <p
              className="label-gcb transition-colors duration-500"
              style={{ color: active.accent }}
            >
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(COUNT).padStart(2, "0")} — {active.label}
            </p>
            <GcbButton
              href={active.href}
              size="sm"
              variant="dark"
              accent={active.accent}
            >
              Explore {active.label}
            </GcbButton>
          </div>
        </div>
      </div>
    </section>
  );
}
