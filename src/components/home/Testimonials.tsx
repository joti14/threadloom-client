import Image from "next/image";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Priya Nandy",
    role: "Verified Buyer",
    avatar:
      "https://images.unsplash.com/photo-1611695434369-a8f5d76ceb7b?q=80&w=200&auto=format&fit=crop",
    quote:
      "The Merino crewneck fits exactly like the size guide said it would, which never happens. Ordering from three different brands and getting one clean checkout is the real win.",
  },
  {
    name: "Daniel Osei",
    role: "Verified Buyer",
    avatar:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200&auto=format&fit=crop",
    quote:
      "Returned a pair of boots that ran small and had a refund in four days. Customer support answered my email the same afternoon, not a bot reply.",
  },
  {
    name: "Marta Lindqvist",
    role: "Verified Buyer",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    quote:
      "I like that the brands here are ones I hadn't heard of. Found my new go-to denim label through the New Arrivals section.",
  },
] as const;

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="mb-8 text-2xl font-semibold sm:text-3xl">
        What Customers Say
      </h2>
      <div className="grid gap-6 sm:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            className="flex h-full flex-col rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex gap-0.5 text-brand">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-brand" />
              ))}
            </div>
            <p className="mt-4 flex-1 text-sm text-muted-foreground">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="relative size-10 overflow-hidden rounded-full bg-muted">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div>
                <div className="text-sm font-medium">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
