import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  {
    label: "Women",
    href: "/products?category=women",
    image:
      "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?q=80&w=800&auto=format&fit=crop",
  },
  {
    label: "Men",
    href: "/products?category=men",
    image:
      "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?q=80&w=800&auto=format&fit=crop",
  },
  {
    label: "Kids",
    href: "/products?category=kids",
    image:
      "https://images.unsplash.com/photo-1578897367107-2828e351c8a8?q=80&w=800&auto=format&fit=crop",
  },
  {
    label: "Footwear",
    href: "/products?category=footwear",
    image:
      "https://images.unsplash.com/photo-1549290127-7f758fdadff7?q=80&w=800&auto=format&fit=crop",
  },
  {
    label: "Accessories",
    href: "/products?category=accessories",
    image:
      "https://images.unsplash.com/photo-1589363358751-ab05797e5629?q=80&w=800&auto=format&fit=crop",
  },
] as const;

export function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-2xl font-semibold sm:text-3xl">Shop by Category</h2>
        <Link href="/products" className="text-sm font-medium hover:underline">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.label}
            href={cat.href}
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted"
          >
            <Image
              src={cat.image}
              alt={cat.label}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <span className="absolute bottom-3 left-3 text-sm font-semibold text-white sm:text-base">
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
