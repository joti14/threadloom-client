"use client";

import type { FormEvent } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useProducts, type ProductListParams } from "@/hooks/useProducts";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductCardSkeleton } from "@/components/product/ProductCardSkeleton";
import { PRODUCT_CATEGORIES } from "@/config/categories";

const PRICE_BANDS = [
  { value: "", label: "Any Price" },
  { value: "0-50", label: "Under $50" },
  { value: "50-100", label: "$50 – $100" },
  { value: "100-200", label: "$100 – $200" },
  { value: "200-", label: "$200 & Up" },
];

const RATING_OPTIONS = [
  { value: "", label: "Any Rating" },
  { value: "4", label: "4 Stars & Up" },
  { value: "3", label: "3 Stars & Up" },
];

const SORT_OPTIONS: { value: NonNullable<ProductListParams["sort"]>; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

const SELECT_CLASS =
  "h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

function parsePriceBand(band: string): { minPrice?: number; maxPrice?: number } {
  if (!band) return {};
  const [min, max] = band.split("-");
  return {
    minPrice: min ? Number(min) : undefined,
    maxPrice: max ? Number(max) : undefined,
  };
}

export function ProductsPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? "";
  const priceBand = searchParams.get("price") ?? "";
  const rating = searchParams.get("rating") ?? "";
  const sort = (searchParams.get("sort") as ProductListParams["sort"]) ?? "newest";
  const page = Number(searchParams.get("page") ?? "1");
  const urlSearch = searchParams.get("search") ?? "";

  function updateParams(updates: Record<string, string | undefined>, resetPage = true) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    if (resetPage) params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  function handleSearchSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = new FormData(e.currentTarget).get("search");
    updateParams({ search: typeof value === "string" && value ? value : undefined });
  }

  const { minPrice, maxPrice } = parsePriceBand(priceBand);

  const { data, isLoading, isError } = useProducts({
    category: category || undefined,
    minPrice,
    maxPrice,
    minRating: rating ? Number(rating) : undefined,
    search: urlSearch || undefined,
    sort,
    page,
    limit: 12,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold">Shop All</h1>

      <form onSubmit={handleSearchSubmit} className="mt-6 flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>
          <input
            key={urlSearch}
            id="product-search"
            name="search"
            type="search"
            defaultValue={urlSearch}
            placeholder="Search products..."
            className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </div>
        <button type="submit" className={cn(buttonVariants({}))}>
          Search
        </button>
      </form>

      <div className="mt-6 flex flex-wrap gap-3">
        <select
          value={category}
          onChange={(e) => updateParams({ category: e.target.value || undefined })}
          className={SELECT_CLASS}
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          {PRODUCT_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        <select
          value={priceBand}
          onChange={(e) => updateParams({ price: e.target.value || undefined })}
          className={SELECT_CLASS}
          aria-label="Filter by price"
        >
          {PRICE_BANDS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>

        <select
          value={rating}
          onChange={(e) => updateParams({ rating: e.target.value || undefined })}
          className={SELECT_CLASS}
          aria-label="Filter by rating"
        >
          {RATING_OPTIONS.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => updateParams({ sort: e.target.value }, false)}
          className={cn(SELECT_CLASS, "sm:ml-auto")}
          aria-label="Sort products"
        >
          {SORT_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        {data ? `${data.total} result${data.total === 1 ? "" : "s"}` : ""}
      </p>

      {isError ? (
        <p className="mt-6 text-sm text-muted-foreground">
          Couldn&apos;t load products right now. Please try again shortly.
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 12 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : data?.items.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
        </div>
      )}

      {!isLoading && !isError && data?.items.length === 0 && (
        <p className="mt-6 text-sm text-muted-foreground">
          No products match your filters. Try adjusting your search or filters.
        </p>
      )}

      {data && data.totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => updateParams({ page: String(page - 1) }, false)}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            Previous
          </button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {data.totalPages}
          </span>
          <button
            type="button"
            disabled={page >= data.totalPages}
            onClick={() => updateParams({ page: String(page + 1) }, false)}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
