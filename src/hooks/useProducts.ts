import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { ProductListResponse } from "@/types/product";

export interface ProductListParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  search?: string;
  sort?: "newest" | "price_asc" | "price_desc" | "rating";
  page?: number;
  limit?: number;
}

export function useProducts(params: ProductListParams = {}) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      const { data } = await api.get<ProductListResponse>("/api/products", {
        params,
      });
      return data;
    },
    networkMode: "always",
  });
}
