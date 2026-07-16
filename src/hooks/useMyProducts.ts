import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Product } from "@/types/product";

export function useMyProducts() {
  return useQuery({
    queryKey: ["my-products"],
    queryFn: async () => {
      const { data } = await api.get<{ items: Product[] }>("/api/products/mine");
      return data.items;
    },
    networkMode: "always",
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/api/products/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
