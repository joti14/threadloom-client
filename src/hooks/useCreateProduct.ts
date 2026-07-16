import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Product } from "@/types/product";

type CreateProductInput = Omit<
  Product,
  "_id" | "slug" | "rating" | "ratingCount" | "ownerId" | "createdAt" | "updatedAt"
>;

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateProductInput) => {
      const { data } = await api.post<{ product: Product }>(
        "/api/products",
        input
      );
      return data.product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["my-products"] });
    },
  });
}
