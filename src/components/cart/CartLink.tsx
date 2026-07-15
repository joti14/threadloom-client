"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart, selectCartCount } from "@/store/cart";
import { useHasMounted } from "@/hooks/useHasMounted";

export function CartLink({ onNavigate }: { onNavigate?: () => void }) {
  const count = useCart(selectCartCount);
  const mounted = useHasMounted();

  return (
    <Link
      href="/cart"
      onClick={onNavigate}
      aria-label={`Cart${mounted && count > 0 ? `, ${count} item${count === 1 ? "" : "s"}` : ""}`}
      className="relative inline-flex size-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted"
    >
      <ShoppingBag className="size-5" />
      {mounted && count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex min-w-4.5 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-semibold leading-4 text-brand-foreground">
          {count}
        </span>
      )}
    </Link>
  );
}
