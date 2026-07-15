"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { useProduct } from "@/hooks/useProduct";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductCard } from "@/components/product/ProductCard";
import { ReviewSection } from "@/components/product/ReviewSection";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { BuyNowButton } from "@/components/cart/BuyNowButton";

export function ProductDetailsClient({ slug }: { slug: string }) {
  const { data, isLoading, isError } = useProduct(slug);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="aspect-4/5 w-full animate-pulse rounded-2xl bg-muted" />
          <div className="space-y-4">
            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            <div className="h-8 w-2/3 animate-pulse rounded bg-muted" />
            <div className="h-6 w-1/3 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold">Product not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This product may have been removed, or the link is incorrect.
        </p>
        <Link
          href="/products"
          className="mt-4 inline-block text-sm font-medium underline"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const { product, related } = data;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} alt={product.title} />

        <div>
          <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {product.brand}
          </span>
          <h1 className="mt-1 text-3xl font-semibold">{product.title}</h1>

          <div className="mt-2 flex items-center gap-1.5 text-sm">
            <Star className="size-4 fill-brand text-brand" />
            <span className="font-medium">{product.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">
              ({product.ratingCount} review{product.ratingCount === 1 ? "" : "s"})
            </span>
          </div>

          <p className="mt-4 text-2xl font-semibold">${product.price.toFixed(2)}</p>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {product.shortDescription}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <BuyNowButton product={product} />
            <AddToCartButton product={product} variant="outline" />
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-border p-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Category</dt>
              <dd className="font-medium capitalize">{product.category}</dd>
            </div>
            {product.subCategory && (
              <div>
                <dt className="text-muted-foreground">Type</dt>
                <dd className="font-medium capitalize">{product.subCategory}</dd>
              </div>
            )}
            {product.sizes.length > 0 && (
              <div>
                <dt className="text-muted-foreground">Sizes</dt>
                <dd className="font-medium">{product.sizes.join(", ")}</dd>
              </div>
            )}
            {product.colors.length > 0 && (
              <div>
                <dt className="text-muted-foreground">Colors</dt>
                <dd className="font-medium">{product.colors.join(", ")}</dd>
              </div>
            )}
            <div>
              <dt className="text-muted-foreground">Availability</dt>
              <dd className="font-medium">
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <section className="mt-16 max-w-3xl">
        <h2 className="text-xl font-semibold">Description</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
      </section>

      <section className="mt-16">
        <ReviewSection productId={product._id} />
      </section>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-semibold">You Might Also Like</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
