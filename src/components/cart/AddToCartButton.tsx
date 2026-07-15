"use client";

import { useRef, useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useCart } from "@/store/cart";
import { useToast } from "@/store/toast";
import type { Product } from "@/types/product";
import type { CartItem } from "@/types/cart";

function toCartItem(
  product: Product,
  opts: { size?: string; color?: string; quantity?: number }
): CartItem {
  return {
    product: product._id,
    slug: product.slug,
    title: product.title,
    image: product.images[0],
    price: product.price,
    quantity: opts.quantity ?? 1,
    size: opts.size,
    color: opts.color,
  };
}

export function AddToCartButton({
  product,
  size,
  color,
  quantity = 1,
  variant = "default",
  className,
  label = "Add to Cart",
}: {
  product: Product;
  size?: string;
  color?: string;
  quantity?: number;
  variant?: "default" | "outline";
  className?: string;
  label?: string;
}) {
  const addItem = useCart((s) => s.addItem);
  const addToast = useToast((s) => s.addToast);
  const [added, setAdded] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleClick() {
    addItem(toCartItem(product, { size, color, quantity }));
    addToast(`${product.title} added to cart`);
    setAdded(true);
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setAdded(false), 1500);
  }

  const outOfStock = product.stock <= 0;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={outOfStock}
      className={cn(buttonVariants({ variant, size: "sm" }), className)}
    >
      {added ? (
        <>
          <Check className="size-4" />
          Added
        </>
      ) : (
        <>
          <ShoppingBag className="size-4" />
          {outOfStock ? "Out of Stock" : label}
        </>
      )}
    </button>
  );
}
