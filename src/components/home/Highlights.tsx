import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";

const HIGHLIGHTS = [
  {
    Icon: Truck,
    title: "Free Shipping",
    description: "Free standard shipping on all orders over $75.",
  },
  {
    Icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day returns on unworn items, no questions asked.",
  },
  {
    Icon: ShieldCheck,
    title: "Verified Brands",
    description: "Every label is vetted for quality and authenticity.",
  },
  {
    Icon: Headphones,
    title: "Real Support",
    description: "Reach a human by email, every day of the week.",
  },
] as const;

export function Highlights() {
  return (
    <section className="border-y border-border bg-secondary">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        {HIGHLIGHTS.map(({ Icon, title, description }) => (
          <div key={title} className="flex flex-col items-start gap-2">
            <Icon className="size-6 text-brand" />
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
