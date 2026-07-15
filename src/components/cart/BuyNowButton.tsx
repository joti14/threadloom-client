"use client";

import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useCart } from "@/store/cart";
import type { Product } from "@/types/product";

export function BuyNowButton({
  product,
  size,
  color,
  className,
}: {
  product: Product;
  size?: string;
  color?: string;
  className?: string;
}) {
  const router = useRouter();
  const addItem = useCart((s) => s.addItem);
  const outOfStock = product.stock <= 0;

  function handleClick() {
    addItem({
      product: product._id,
      slug: product.slug,
      title: product.title,
      image: product.images[0],
      price: product.price,
      quantity: 1,
      size,
      color,
    });
    router.push("/cart");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={outOfStock}
      className={cn(
        buttonVariants({ size: "sm" }),
        "bg-brand text-brand-foreground hover:bg-brand/90",
        className
      )}
    >
      <Zap className="size-4" />
      Buy Now
    </button>
  );
}
