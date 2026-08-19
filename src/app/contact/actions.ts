"use server";

import { siteConfig } from "@/config/site";

export type ContactFormState = {
  status: "idle" | "sent" | "error";
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Emails the enquiry to siteConfig.contactRecipient via the Resend API.
 * Needs RESEND_API_KEY in the environment (free tier is enough). Without it,
 * the form reports failure and points the visitor at the direct address -
 * enquiries must never silently vanish.
 */
export async function sendContactMessage(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot: real visitors never see this field, bots fill it. Pretend
  // success so the bot moves on.
  if (formData.get("website")) return { status: "sent" };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !message || !EMAIL_RE.test(email)) {
    return {
      status: "error",
      message: "Please fill in your name, a valid email, and a message.",
    };
  }

  const body = [
    `Name: ${name}`,
    company && `Company: ${company}`,
    `Email: ${email}`,
    phone && `Phone: ${phone}`,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const subject = `Website enquiry - ${name}${company ? `, ${company}` : ""}`;

  // Delivery chain (hardened 2026-08-19 after a live failure): try
  // Resend when configured, and on ANY Resend failure - unverified
  // domain, bad key, outage - fall back to keyless FormSubmit. The
  // visitor only ever sees an error if BOTH channels fail. NOTE:
  // FormSubmit's first-ever submission sends a one-time activation
  // email to the inbox that must be clicked once.
  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // The shared onboarding sender only works to the account
          // owner's own inbox; a verified @gcbuae.com CONTACT_FROM is
          // what makes Resend deliver to the business inbox.
          from:
            process.env.CONTACT_FROM ?? "GCB Website <onboarding@resend.dev>",
          to: [siteConfig.contactRecipient],
          reply_to: email,
          subject,
          text: body,
        }),
      });
      if (response.ok) return { status: "sent" };
      console.error(
        "contact form: resend error, falling back to formsubmit",
        await response.text(),
      );
    } catch (error) {
      console.error(
        "contact form: resend network error, falling back to formsubmit",
        error,
      );
    }
  }

  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${siteConfig.contactRecipient}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: subject,
          _template: "box",
          name,
          email,
          phone,
          company,
          message: body,
        }),
      },
    );
    if (!response.ok) {
      console.error("contact form: formsubmit error", await response.text());
      return {
        status: "error",
        message: `Something went wrong sending your message - please email ${siteConfig.contact.email}.`,
      };
    }
    return { status: "sent" };
  } catch (error) {
    console.error("contact form: formsubmit network error", error);
    return {
      status: "error",
      message: `Something went wrong sending your message - please email ${siteConfig.contact.email}.`,
    };
  }
}
