"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useMyProducts, useDeleteProduct } from "@/hooks/useMyProducts";
import { useToast } from "@/store/toast";
import { DashboardStats } from "@/components/dashboard/DashboardStats";

export function ManageItems() {
  const { data: products, isLoading, isError } = useMyProducts();
  const deleteProduct = useDeleteProduct();
  const addToast = useToast((s) => s.addToast);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  function handleDelete(id: string, title: string) {
    deleteProduct.mutate(id, {
      onSuccess: () => {
        setConfirmingId(null);
        addToast(`"${title}" deleted`);
      },
    });
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold">Manage Items</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Products you&apos;ve listed on Threadloom.
          </p>
        </div>
        <Link href="/items/add" className={cn(buttonVariants({}))}>
          Add Product
        </Link>
      </div>

      {isLoading ? (
        <div className="mt-8 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-2xl border border-border bg-muted"
            />
          ))}
        </div>
      ) : isError ? (
        <p className="mt-8 text-sm text-muted-foreground">
          Couldn&apos;t load your products. Please try again shortly.
        </p>
      ) : products && products.length > 0 ? (
        <>
          <DashboardStats products={products} />
          <ul className="mt-8 space-y-3">
            {products.map((product) => {
              const confirming = confirmingId === product._id;
            return (
              <li
                key={product._id}
                className="flex flex-wrap items-center gap-4 rounded-2xl border border-border p-4"
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted"
                >
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </Link>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{product.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {product.brand} · <span className="capitalize">{product.category}</span>
                  </p>
                  <p className="mt-0.5 text-sm">
                    ${product.price.toFixed(2)}
                    <span className="text-muted-foreground">
                      {" "}· {product.stock} in stock
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {confirming ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleDelete(product._id, product.title)}
                        disabled={deleteProduct.isPending}
                        className={cn(
                          buttonVariants({ variant: "destructive", size: "sm" })
                        )}
                      >
                        {deleteProduct.isPending ? "Deleting..." : "Confirm"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmingId(null)}
                        className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href={`/products/${product.slug}`}
                        className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                      >
                        <Eye className="size-4" />
                        View
                      </Link>
                      <button
                        type="button"
                        onClick={() => setConfirmingId(product._id)}
                        className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
                      >
                        <Trash2 className="size-4" />
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </li>
            );
          })}
          </ul>
        </>
      ) : (
        <div className="mt-8 rounded-2xl border border-border p-10 text-center">
          <p className="font-medium">You haven&apos;t listed any products yet.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Add your first item to see it here.
          </p>
          <Link
            href="/items/add"
            className={cn(buttonVariants({}), "mt-4 inline-flex")}
          >
            Add Product
          </Link>
        </div>
      )}
    </div>
  );
}
