import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      //Sepete Ürün ekleme
      addItem: (product) => {
        const { items } = get();
        const existingItem = items.find(
          (item) => parseInt(item.id) === parseInt(product.id)
        );
        if (existingItem) {
          set((state) => {
            const updatedItems = state.items.map((item) =>
              parseInt(item.id) === parseInt(product.id)
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            return {
              items: updatedItems,
              totalItems: state.totalItems + 1,
              totalPrice: state.totalPrice + parseFloat(product.price),
            };
          });
        } else {
          set((state) => ({
            items: [...state.items, { ...product, quantity: 1 }],
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + parseFloat(product.price),
          }));
        }
      },
    }),
    {
      name: "cart-storage",
      getStorage: () => localStorage(),
    }
  )
);

export { useCartStore };
