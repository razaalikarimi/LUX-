'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getTotalCount: () => number;
  getTotalPrice: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item, quantity = 1) => {
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex((i) => i.id === item.id);

        if (existingIndex > -1) {
          const updated = [...currentItems];
          const newQty = Math.min(updated[existingIndex].quantity + quantity, item.maxStock || 99);
          updated[existingIndex].quantity = newQty;
          set({ items: updated, isOpen: true });
        } else {
          set({
            items: [...currentItems, { ...item, quantity: Math.min(quantity, item.maxStock || 99) }],
            isOpen: true,
          });
        }
      },

      removeItem: (id: string) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity: Math.min(quantity, item.maxStock || 99) } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),

      getTotalCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'luxe_cart_storage',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : null!)),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
