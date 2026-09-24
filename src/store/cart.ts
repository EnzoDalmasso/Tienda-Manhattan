"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/lib/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  add: (item: Omit<CartItem, "key" | "quantity">, quantity?: number) => void;
  remove: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  setOpen: (open: boolean) => void;
}

const keyOf = (i: Pick<CartItem, "productId" | "size" | "color">) => `${i.productId}-${i.size}-${i.color.name}`;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      add: (item, quantity = 1) =>
        set((s) => {
          const key = keyOf(item);
          const existing = s.items.find((i) => i.key === key);
          const items = existing
            ? s.items.map((i) => (i.key === key ? { ...i, quantity: Math.min(i.quantity + quantity, 10) } : i))
            : [...s.items, { ...item, key, quantity }];
          return { items };
        }),
      remove: (key) => set((s) => ({ items: s.items.filter((i) => i.key !== key) })),
      setQuantity: (key, quantity) =>
        set((s) => ({
          items: s.items.map((i) => (i.key === key ? { ...i, quantity: Math.max(1, Math.min(quantity, 10)) } : i)),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      setOpen: (isOpen) => set({ isOpen }),
    }),
    { name: "manhattan-cart", partialize: (s) => ({ items: s.items }) },
  ),
);

export const selectCount = (s: CartState) => s.items.reduce((a, i) => a + i.quantity, 0);
export const selectSubtotal = (s: CartState) => s.items.reduce((a, i) => a + i.price * i.quantity, 0);
