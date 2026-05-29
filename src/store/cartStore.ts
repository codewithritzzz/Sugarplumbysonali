import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, Order } from '../types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  orders: Order[];
  addItem: (product: Product, options: { flavor: string; size: string; message?: string; price: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  addOrder: (order: Order) => void;
  total: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      orders: [],

      addItem: (product, { flavor, size, message, price }) => {
        const existingId = `${product.id}-${flavor}-${size}`;
        set((state) => {
          const existing = state.items.find((i) => i.id === existingId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === existingId ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return {
            items: [
              ...state.items,
              { id: existingId, product, quantity: 1, selectedFlavor: flavor, selectedSize: size, message, price },
            ],
          };
        });
      },

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: quantity <= 0
            ? state.items.filter((i) => i.id !== id)
            : state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })),

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addOrder: (order) =>
        set((state) => ({ orders: [order, ...state.orders] })),

      total: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      itemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: 'sugarplum-cart',
      partialize: (state) => ({ items: state.items, orders: state.orders }),
    }
  )
);

interface ThemeState {
  isDark: boolean;
  toggle: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: false,
      toggle: () =>
        set((state) => {
          const next = !state.isDark;
          if (next) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { isDark: next };
        }),
    }),
    { name: 'sugarplum-theme' }
  )
);
