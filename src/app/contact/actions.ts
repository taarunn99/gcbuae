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
 * the form reports failure and points the visitor at the direct address —
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

  const apiKey = process.env.RESEND_API_KEY;

  // No Resend key configured (e.g. before env setup): deliver through
  // FormSubmit instead — keyless, posts straight to the inbox. NOTE:
  // the FIRST submission triggers a one-time activation email to
  // info@gcbuae.com that must be clicked once; after that, delivery is
  // automatic.
  if (!apiKey) {
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
            _subject: `Website enquiry — ${name}${company ? `, ${company}` : ""}`,
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
          message: `Something went wrong sending your message — please email ${siteConfig.contact.email}.`,
        };
      }
      return { status: "sent" };
    } catch (error) {
      console.error("contact form: formsubmit network error", error);
      return {
        status: "error",
        message: `Something went wrong sending your message — please email ${siteConfig.contact.email}.`,
      };
    }
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Resend's shared onboarding sender works without domain setup;
        // switch to an @gcbuae.com sender once the domain is verified.
        from: process.env.CONTACT_FROM ?? "GCB Website <onboarding@resend.dev>",
        to: [siteConfig.contactRecipient],
        reply_to: email,
        subject: `Website enquiry — ${name}${company ? `, ${company}` : ""}`,
        text: body,
      }),
    });

    if (!response.ok) {
      console.error("contact form: resend error", await response.text());
      return {
        status: "error",
        message: `Something went wrong sending your message — please email ${siteConfig.contact.email}.`,
      };
    }

    return { status: "sent" };
  } catch (error) {
    console.error("contact form: network error", error);
    return {
      status: "error",
      message: `Something went wrong sending your message — please email ${siteConfig.contact.email}.`,
    };
  }
}
