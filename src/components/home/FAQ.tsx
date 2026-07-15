"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 3-5 business days within the country. Free on orders over $75; a flat $6 fee applies below that.",
  },
  {
    question: "What's your return policy?",
    answer:
      "Unworn items with tags attached can be returned within 30 days of delivery for a full refund to your original payment method.",
  },
  {
    question: "How do I know what size to order?",
    answer:
      "Each product page lists the available sizes for that specific item. Sizing varies by brand, so check the size listed on the product before ordering.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Once your order ships, you'll receive a confirmation with tracking details. You can also view your order history from your account.",
  },
  {
    question: "Are the brands on Threadloom authentic?",
    answer:
      "Yes. Every brand listed on Threadloom is vetted before being onboarded, and we work directly with the labels themselves.",
  },
] as const;

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="mb-8 text-2xl font-semibold sm:text-3xl">
        Frequently Asked Questions
      </h2>
      <div className="divide-y divide-border rounded-2xl border border-border">
        {FAQS.map((faq, i) => {
          const open = openIndex === i;
          return (
            <div key={faq.question}>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 text-muted-foreground transition-transform",
                    open && "rotate-180"
                  )}
                />
              </button>
              {open && (
                <div className="px-5 pb-4 text-sm text-muted-foreground">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
