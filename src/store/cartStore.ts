import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, Coupon } from "@/types";
import { AVAILABLE_COUPONS } from "@/data/mockData";
import { safeLocalStorage } from "./storage";

interface CartState {
  items: CartItem[];
  coupon: Coupon | null;
  deliveryType: "standard" | "express" | "pickup";
  deliveryFee: number;
  freeDeliveryThreshold: number;

  addItem: (item: CartItem) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  setDeliveryType: (type: "standard" | "express" | "pickup") => void;

  getSubtotal: () => number;
  getDiscount: () => number;
  getTax: () => number;
  getEffectiveDeliveryFee: () => number;
  getTotal: () => number;
  getTotalItemsCount: () => number;
  getAmountToFreeDelivery: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [
        {
          id: "prod-1-regular",
          productId: "prod-1",
          name: "Tuscan Bolognese Pasta",
          price: 35.0,
          image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
          quantity: 1,
          selectedSize: "Regular Portion",
          selectedSauce: "Signature Bolognese",
          selectedAddons: [{ name: "Extra Shaved Truffle Parmigiano", price: 4.5 }],
        },
        {
          id: "prod-3-single",
          productId: "prod-3",
          name: "Authentic Chicken Shawarma",
          price: 95.0,
          image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80",
          quantity: 1,
          selectedSize: "Single Roll",
          selectedSauce: "Classic Lebanese Toum",
        },
      ],
      coupon: { code: "BITES20", discountPercent: 20, minSpend: 40, description: "20% OFF on orders over $40" },
      deliveryType: "standard",
      deliveryFee: 5.0,
      freeDeliveryThreshold: 75.0,

      addItem: (newItem) => {
        set((state) => {
          const existingIndex = state.items.findIndex((item) => item.id === newItem.id);
          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex].quantity += newItem.quantity;
            return { items: updated };
          }
          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (cartItemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== cartItemId),
        }));
      },

      updateQuantity: (cartItemId, delta) => {
        set((state) => {
          const updated = state.items
            .map((item) => {
              if (item.id === cartItemId) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
              }
              return item;
            })
            .filter(Boolean) as CartItem[];
          return { items: updated };
        });
      },

      clearCart: () => set({ items: [], coupon: null }),

      applyCoupon: (code: string) => {
        const cleanCode = code.trim().toUpperCase();
        const found = AVAILABLE_COUPONS.find((c) => c.code === cleanCode);
        if (!found) {
          return { success: false, message: "Invalid coupon code. Try BITES20 or FEAST30." };
        }
        const subtotal = get().getSubtotal();
        if (subtotal < found.minSpend) {
          return {
            success: false,
            message: `Minimum order of $${found.minSpend.toFixed(2)} required for ${found.code}.`,
          };
        }
        set({ coupon: found });
        return { success: true, message: `Coupon ${found.code} applied! ${found.discountPercent}% OFF!` };
      },

      removeCoupon: () => set({ coupon: null }),

      setDeliveryType: (type) => set({ deliveryType: type }),

      getSubtotal: () => {
        const { items } = get();
        return items.reduce((acc, item) => {
          const addonPrice = item.selectedAddons?.reduce((s, a) => s + a.price, 0) || 0;
          return acc + (item.price + addonPrice) * item.quantity;
        }, 0);
      },

      getDiscount: () => {
        const { coupon } = get();
        const subtotal = get().getSubtotal();
        if (!coupon || subtotal < coupon.minSpend) return 0;
        return (subtotal * coupon.discountPercent) / 100;
      },

      getTax: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        return (subtotal - discount) * 0.05; // 5% VAT / Tax
      },

      getEffectiveDeliveryFee: () => {
        const { deliveryType, freeDeliveryThreshold } = get();
        if (deliveryType === "pickup") return 0;
        const subtotal = get().getSubtotal();
        if (subtotal >= freeDeliveryThreshold && deliveryType === "standard") return 0;
        if (deliveryType === "express") return 9.0;
        return 5.0;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        const tax = get().getTax();
        const delivery = get().getEffectiveDeliveryFee();
        return Math.max(0, subtotal - discount + tax + delivery);
      },

      getTotalItemsCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },

      getAmountToFreeDelivery: () => {
        const { freeDeliveryThreshold } = get();
        const subtotal = get().getSubtotal();
        return Math.max(0, freeDeliveryThreshold - subtotal);
      },
    }),
    {
      name: "bites-cart-storage",
      storage: createJSONStorage(() => safeLocalStorage),
    }
  )
);
