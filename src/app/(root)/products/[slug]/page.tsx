import type { Metadata } from "next";
import { ProductDetailsClient } from "./ProductDetailsClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
    const res = await fetch(`${apiUrl}/api/products/${slug}`, { cache: "no-store" });
    if (!res.ok) return { title: "Product" };
    const data = await res.json();
    return { title: data.product.title };
  } catch {
    return { title: "Product" };
  }
}

export default async function ProductDetailsPage({ params }: Props) {
  const { slug } = await params;
  return <ProductDetailsClient slug={slug} />;
}
