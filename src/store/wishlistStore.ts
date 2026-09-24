import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { safeLocalStorage } from "./storage";

interface WishlistState {
  items: string[]; // product IDs
  toggleWishlist: (productId: string) => boolean; // returns true if added, false if removed
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: ["prod-1", "prod-5"],

      toggleWishlist: (productId: string) => {
        const { items } = get();
        const exists = items.includes(productId);
        if (exists) {
          set({ items: items.filter((id) => id !== productId) });
          return false;
        } else {
          set({ items: [...items, productId] });
          return true;
        }
      },

      isInWishlist: (productId: string) => {
        return get().items.includes(productId);
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "bites-wishlist-storage",
      storage: createJSONStorage(() => safeLocalStorage),
    }
  )
);
