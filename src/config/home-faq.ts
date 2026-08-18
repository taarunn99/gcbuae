/**
 * Home FAQ content - a plain module (NOT "use client") so the server
 * page can build FAQPage JSON-LD from the same data the client section
 * renders. Copy targets interior design companies, contractors and
 * BOQ-scale buyers per the owner's positioning (2026-08-18).
 *
 * Each item is a direct-answer lead plus short points (magazine
 * structure, owner correction 2026-08-18 - never a wall of paragraph);
 * faqAnswerText() joins them for the schema and any prose context.
 */

export type FaqItem = {
  q: string;
  lead: string;
  points: string[];
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What does Global Classic supply?",
    lead: "Wholesale slabs and finishing brands for project buyers.",
    points: [
      "KalingaStone engineered quartz, marble and terrazzo slabs",
      "Jaquar bathroom fittings and FILA surface care",
      "Stocked at Al Sajaa, Sharjah - delivered across the whole of the UAE",
    ],
  },
  {
    q: "Are you an authorized distributor?",
    lead: "Yes - every brand we carry is held on written authorization.",
    points: [
      "KalingaStone authorized reseller for the Northern Emirates - in writing",
      "Authorized Jaquar dealer",
      "Part of FILA's official UAE distribution",
    ],
  },
  {
    q: "Can you price a full BOQ?",
    lead: "Yes - that is our favourite kind of enquiry.",
    points: [
      "Send the BOQ through the form below or straight on WhatsApp",
      "AED volume pricing, usually within one working day",
      "Stock positions and delivery programmed to your site schedule",
    ],
  },
  {
    q: "Is there a minimum order?",
    lead: "No formal minimum - but we are built for project volume.",
    points: [
      "Full-slab lots, complete floors, container quantities",
      "Project-scale pricing is where our rate works hardest",
    ],
  },
  {
    q: "What are the payment terms?",
    lead: "Plain terms, agreed on the first quote.",
    points: [
      "New customers: full payment before delivery, at any order size - cash or cheque",
      "Approved trade accounts: up to 30 days",
    ],
  },
  {
    q: "Do you cut, fabricate or install?",
    lead: "We supply - we do not cut or fabricate.",
    points: [
      "Application is handled through our sister company 60 Newton",
      "Authorized applicators available for every brand we carry",
    ],
  },
  {
    q: "Do you provide samples?",
    lead: "Yes - free for trade buyers.",
    points: [
      "Full slabs on racks at Al Sajaa for project sign-off",
      "Approve the exact book-match and lot that reaches site",
    ],
  },
  {
    q: "How fast is delivery?",
    lead: "Ex-stock from Al Sajaa to all seven emirates.",
    points: [
      "Stocked shades leave the warehouse on scheduled deliveries",
      "Unstocked shades ship from the Silvassa plant in about 4-6 weeks",
    ],
  },
  {
    q: "Can we visit?",
    lead: "Please do - real slabs beat any screen.",
    points: [
      "The Al Sajaa warehouse keeps the range on racks",
      "Book through the form or WhatsApp and we walk the stock with you",
    ],
  },
];

export function faqAnswerText(item: FaqItem): string {
  return [item.lead, ...item.points].join(" ") + ".";
}
