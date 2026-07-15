import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { CartItem } from "@/types/cart";

export interface Order {
  _id: string;
  ownerId: string;
  items: {
    product: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
    size?: string;
    color?: string;
  }[];
  subtotal: number;
  status: string;
  createdAt: string;
}

export function useCreateOrder() {
  return useMutation({
    mutationFn: async (items: CartItem[]) => {
      const payload = {
        items: items.map((i) => ({
          product: i.product,
          title: i.title,
          image: i.image,
          price: i.price,
          quantity: i.quantity,
          size: i.size,
          color: i.color,
        })),
      };
      const { data } = await api.post<{ order: Order }>("/api/orders", payload);
      return data.order;
    },
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const { data } = await api.get<{ order: Order }>(`/api/orders/${id}`);
      return data.order;
    },
    enabled: !!id,
    networkMode: "always",
  });
}
