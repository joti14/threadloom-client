import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types/cart";

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (product: string) => void;
  updateQuantity: (product: string, quantity: number) => void;
  clear: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.product === item.product);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product === item.product
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      removeItem: (product) =>
        set((state) => ({
          items: state.items.filter((i) => i.product !== product),
        })),
      updateQuantity: (product, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.product === product ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "threadloom-cart" }
  )
);

export const selectCartCount = (state: CartState) =>
  state.items.reduce((sum, i) => sum + i.quantity, 0);

export const selectCartSubtotal = (state: CartState) =>
  state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
