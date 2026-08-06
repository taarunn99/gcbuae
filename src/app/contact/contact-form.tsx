"use client";

import { useActionState } from "react";

import { GcbButton } from "@/components/ui/gcb-button";

import { sendContactMessage, type ContactFormState } from "./actions";

const initialState: ContactFormState = { status: "idle" };

const fieldClass =
  "w-full border-b bg-transparent py-3 text-base outline-none transition-colors placeholder:text-muted/60 focus:border-accent";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState,
  );

  if (state.status === "sent") {
    return (
      <div className="border p-10">
        <p className="font-display text-2xl">Thank you.</p>
        <p className="text-muted mt-3 leading-relaxed">
          Your message is on its way — we will come back to you within one
          working day.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-8">
      {/* Honeypot — hidden from people, attractive to bots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className="label-gcb text-muted">Name *</span>
          <input
            name="name"
            required
            autoComplete="name"
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="label-gcb text-muted">Company</span>
          <input
            name="company"
            autoComplete="organization"
            className={fieldClass}
          />
        </label>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className="label-gcb text-muted">Email *</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="label-gcb text-muted">Phone</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
          />
        </label>
      </div>

      <label className="block">
        <span className="label-gcb text-muted">Message *</span>
        <textarea name="message" required rows={5} className={fieldClass} />
      </label>

      {state.status === "error" && (
        <p role="alert" className="text-accent text-sm leading-relaxed">
          {state.message}
        </p>
      )}

      <div className="justify-self-start">
        <GcbButton type="submit" size="md" variant="light" disabled={pending}>
          {pending ? "Sending…" : "Send message"}
        </GcbButton>
      </div>
    </form>
  );
}
