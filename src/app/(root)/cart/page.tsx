"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { Minus, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useCart, selectCartSubtotal } from "@/store/cart";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useSession } from "@/lib/auth-client";
import { useCreateOrder } from "@/hooks/useOrders";

export default function CartPage() {
  const router = useRouter();
  const mounted = useHasMounted();
  const items = useCart((s) => s.items);
  const subtotal = useCart(selectCartSubtotal);
  const removeItem = useCart((s) => s.removeItem);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const clear = useCart((s) => s.clear);
  const { data: session } = useSession();
  const createOrder = useCreateOrder();

  function handlePlaceOrder() {
    createOrder.mutate(items, {
      onSuccess: (order) => {
        clear();
        router.push(`/orders/${order._id}`);
      },
    });
  }

  if (!mounted) {
    return <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8" />;
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          href="/products"
          className={cn(buttonVariants({}), "mt-6 inline-flex")}
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold">Your Cart</h1>

      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <div
            key={item.product}
            className="flex gap-3 rounded-2xl border border-border p-4 sm:gap-4"
          >
            <Link
              href={`/products/${item.slug}`}
              className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted sm:size-24"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="96px"
              />
            </Link>

            <div className="flex min-w-0 flex-1 flex-col">
              <Link
                href={`/products/${item.slug}`}
                className="line-clamp-1 font-medium hover:underline"
              >
                {item.title}
              </Link>
              <span className="text-sm text-muted-foreground">
                ${item.price.toFixed(2)}
              </span>

              <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-2">
                <div className="flex items-center rounded-lg border border-border">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => updateQuantity(item.product, item.quantity - 1)}
                    className="flex size-8 items-center justify-center text-muted-foreground hover:text-foreground"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => updateQuantity(item.product, item.quantity + 1)}
                    className="flex size-8 items-center justify-center text-muted-foreground hover:text-foreground"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>

                <button
                  type="button"
                  aria-label="Remove item"
                  onClick={() => removeItem(item.product)}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                  Remove
                </button>
              </div>
            </div>

            <div className="shrink-0 text-right font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">Subtotal</span>
          <span className="text-2xl font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Shipping and taxes calculated at checkout.
        </p>

        {session ? (
          <button
            type="button"
            onClick={handlePlaceOrder}
            disabled={createOrder.isPending}
            className={cn(buttonVariants({ size: "lg" }), "mt-6 w-full")}
          >
            {createOrder.isPending ? "Placing order..." : "Place Order"}
          </button>
        ) : (
          <Link
            href="/login?redirect=/cart"
            className={cn(buttonVariants({ size: "lg" }), "mt-6 w-full")}
          >
            Log in to Place Order
          </Link>
        )}

        {createOrder.isError && (
          <p className="mt-3 text-sm text-destructive">
            {isAxiosError(createOrder.error) &&
            createOrder.error.response?.data?.error
              ? createOrder.error.response.data.error
              : "Couldn't place your order. Please try again."}
          </p>
        )}
      </div>
    </div>
  );
}
