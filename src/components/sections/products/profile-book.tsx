"use client";

import Image from "next/image";
import { useRef } from "react";

import { Logo } from "@/components/layout/logo";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * The company profile as a book (the lapizblue treatment): as the page's
 * final section scrolls in, a Pine Green fill rises bottom→top behind
 * it and the type flips to Marble White; hovering the cover opens it on
 * its left hinge like a book, revealing the inner page; the whole book
 * downloads the PDF. Reduced motion gets the filled state, no 3D.
 */
export function ProfileBook() {
  const scope = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) {
        gsap.set("[data-fill]", { scaleY: 1 });
        scope.current?.classList.add("is-filled");
        return;
      }
      gsap.to("[data-fill]", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 85%",
          end: "top 25%",
          scrub: true,
          onUpdate: (self) => {
            scope.current?.classList.toggle("is-filled", self.progress > 0.55);
          },
        },
      });
    },
    { scope, dependencies: [reduced] },
  );

  return (
    <section
      ref={scope}
      className="group/section relative mt-24"
      aria-label="Company profile"
    >
      {/* The rising fill - Pine Green, bottom to top */}
      <span
        data-fill
        aria-hidden
        className="bg-verde absolute inset-0 origin-bottom scale-y-0"
      />

      <div className="container-gcb [.is-filled_&]:text-ink relative py-24 transition-colors duration-500 sm:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-[1.618fr_1fr] lg:gap-20">
          <div>
            <p className="label-gcb text-warm-black/65 [.is-filled_&]:text-travertine transition-colors duration-500">
              The company, in print
            </p>
            <h2 className="font-display text-phi-3 mt-5 max-w-xl tracking-tight text-balance">
              Crafting dreams into reality - the profile.
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed opacity-90">
              Who we are, what we stock, and the partners behind the shelf - the
              complete Global Classic company profile, designed to be read and
              passed on. Open the book, or take it with you.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="/profile/global-classic-profile.pdf"
                download="Global-Classic-Company-Profile.pdf"
                className="chip-gcb rounded-full border border-current/40 px-6 py-3 text-sm"
              >
                Download the profile (PDF · 2.7 MB)
              </a>
              <span className="label-gcb opacity-70">Vol. 01 · Est. 2024</span>
            </div>
          </div>

          {/* The book */}
          <a
            href="/profile/global-classic-profile.pdf"
            download="Global-Classic-Company-Profile.pdf"
            className="group/book mx-auto block w-full max-w-[320px]"
            style={{ perspective: "1600px" }}
          >
            <span className="relative block" style={{ perspective: "1600px" }}>
              {/* Inner page - revealed as the cover opens */}
              <span className="bg-warm-black text-ink border-ink/15 absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-l-sm rounded-r-md border p-6 text-center">
                <Logo className="h-16 w-auto" />
                <span className="font-display text-xl">Global Classic</span>
                <span className="label-gcb text-ink/70">
                  Open the profile →
                </span>
              </span>

              {/* The cover - hinges open on hover/focus */}
              <span
                className="border-warm-black relative block origin-left overflow-hidden rounded-l-sm rounded-r-md border shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/book:[transform:rotateY(-52deg)] group-focus-visible/book:[transform:rotateY(-52deg)] motion-reduce:transition-none motion-reduce:group-hover/book:[transform:none]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Image
                  src="/profile/profile-cover.webp"
                  alt="Global Classic company profile cover - Crafting Dreams into Reality"
                  width={900}
                  height={1273}
                  quality={90}
                  sizes="320px"
                  className="h-auto w-full"
                  loading="lazy"
                />
                {/* Spine shading sells the hinge */}
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/25 to-transparent"
                />
              </span>
            </span>
            <span className="label-gcb mt-5 block text-center opacity-80">
              Hover to open · click to download
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
