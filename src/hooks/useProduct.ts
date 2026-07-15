import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Product } from "@/types/product";

interface ProductDetailResponse {
  product: Product;
  related: Product[];
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const { data } = await api.get<ProductDetailResponse>(`/api/products/${slug}`);
      return data;
    },
    enabled: !!slug,
    networkMode: "always",
  });
}
