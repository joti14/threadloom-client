import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Review } from "@/types/review";

export function useReviews(productId: string | undefined) {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      const { data } = await api.get<{ items: Review[] }>(
        `/api/products/${productId}/reviews`
      );
      return data.items;
    },
    enabled: !!productId,
    networkMode: "always",
  });
}

export function useCreateReview(productId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: { rating: number; comment: string }) => {
      const { data } = await api.post<{ review: Review }>(
        `/api/products/${productId}/reviews`,
        input
      );
      return data.review;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
}
