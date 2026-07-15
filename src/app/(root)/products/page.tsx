import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductsPageClient } from "./ProductsPageClient";

export const metadata: Metadata = {
  title: "Shop All",
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={<div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8" />}
    >
      <ProductsPageClient />
    </Suspense>
  );
}
