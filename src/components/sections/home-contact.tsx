import { ContactForm } from "./contact-form";
import { AmbientClip } from "@/components/ui/ambient-clip";

/**
 * Contact on home - the second-to-last section (owner spec, 2026-08-18):
 * the exact /contact form, one heading, one line. Wrapped in
 * .theme-forest so the form's muted/accent tokens resolve the same way
 * they do on the contact page.
 */
export function HomeContact() {
  return (
    <section
      aria-label="Contact"
      className="theme-forest bg-background text-foreground relative py-24 lg:py-32"
    >
      {/* The clip shares the grid with the heading so its top edge sits level
          with the title, not with the form (owner, 2026-08-21). */}
      <div className="container-gcb grid items-start gap-14 lg:grid-cols-[1fr_0.618fr]">
        <div>
          <p className="label-gcb text-warm-black/60">Contact</p>
          <h2 className="font-display text-warm-black mt-3 text-3xl tracking-tight sm:text-5xl">
            Tell us what you are building.
          </h2>
          <p className="text-warm-black/70 mt-4 max-w-xl leading-relaxed">
            Send the spec, the quantity or just the idea - a person replies
            within one working day.
          </p>
          <div className="mt-12 max-w-3xl">
            <ContactForm />
          </div>
        </div>
        <figure
          className="border-warm-black relative aspect-[3/4] overflow-hidden rounded-3xl border"
          aria-label="Water running over a brushed-brass fitting"
        >
          <AmbientClip name="brass-water" />
        </figure>
      </div>
    </section>
  );
}
