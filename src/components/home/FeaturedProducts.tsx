"use client";

import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/product/ProductCard";

function CardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="aspect-[4/5] w-full animate-pulse bg-muted" />
      <div className="flex flex-col gap-2 p-4">
        <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-3 w-full animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

export function FeaturedProducts() {
  const { data, isLoading, isError } = useProducts({ sort: "newest", limit: 8 });

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-2xl font-semibold sm:text-3xl">New Arrivals</h2>
        <Link href="/products" className="text-sm font-medium hover:underline">
          View all
        </Link>
      </div>

      {isError ? (
        <p className="text-sm text-muted-foreground">
          Couldn&apos;t load new arrivals right now. Please try again shortly.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)
            : data?.items.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
        </div>
      )}
    </section>
  );
}
