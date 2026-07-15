import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {product.brand}
        </span>
        <h3 className="line-clamp-1 font-medium">{product.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {product.shortDescription}
        </p>
        <div className="mt-1 flex items-center gap-1 text-sm">
          <Star className="size-3.5 fill-brand text-brand" />
          <span className="font-medium">{product.rating.toFixed(1)}</span>
          <span className="text-muted-foreground">({product.ratingCount})</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
          <Link
            href={`/products/${product.slug}`}
            className={cn(buttonVariants({ size: "sm" }))}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
