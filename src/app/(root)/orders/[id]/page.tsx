"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useOrder } from "@/hooks/useOrders";

export default function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: order, isLoading, isError } = useOrder(id);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="h-8 w-1/2 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold">Order not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We couldn&apos;t find this order, or you don&apos;t have access to it.
        </p>
        <Link href="/products" className={cn(buttonVariants({}), "mt-6 inline-flex")}>
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <CheckCircle2 className="size-12 text-brand" />
        <h1 className="mt-4 text-3xl font-semibold">Order Confirmed</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Thank you for your order. A confirmation has been sent to your email.
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Order #{order._id}
        </p>
      </div>

      <div className="mt-10 space-y-4">
        {order.items.map((item, i) => (
          <div
            key={`${item.product}-${i}`}
            className="flex items-center gap-4 rounded-2xl border border-border p-4"
          >
            <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-muted-foreground">
                Qty {item.quantity} × ${item.price.toFixed(2)}
              </p>
            </div>
            <span className="font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-2xl border border-border p-6">
        <span className="text-lg font-medium">Total</span>
        <span className="text-2xl font-semibold">
          ${order.subtotal.toFixed(2)}
        </span>
      </div>

      <Link
        href="/products"
        className={cn(buttonVariants({}), "mt-8 inline-flex w-full")}
      >
        Continue Shopping
      </Link>
    </div>
  );
}
