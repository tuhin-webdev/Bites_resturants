import { create } from "zustand";
import { Product } from "@/types";

export interface ToastMessage {
  id: string;
  message: string;
  type?: "success" | "info" | "warning" | "error";
  duration?: number;
}

interface UIState {
  isCartDrawerOpen: boolean;
  isSearchModalOpen: boolean;
  isAuthModalOpen: boolean;
  authModalTab: "login" | "register" | "forgot";
  isReservationModalOpen: boolean;
  quickViewProduct: Product | null;
  toasts: ToastMessage[];

  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;

  openSearchModal: () => void;
  closeSearchModal: () => void;

  openAuthModal: (tab?: "login" | "register" | "forgot") => void;
  closeAuthModal: () => void;

  openReservationModal: () => void;
  closeReservationModal: () => void;

  setQuickViewProduct: (product: Product | null) => void;

  addToast: (message: string, type?: ToastMessage["type"], duration?: number) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  isCartDrawerOpen: false,
  isSearchModalOpen: false,
  isAuthModalOpen: false,
  authModalTab: "login",
  isReservationModalOpen: false,
  quickViewProduct: null,
  toasts: [],

  openCartDrawer: () => set({ isCartDrawerOpen: true }),
  closeCartDrawer: () => set({ isCartDrawerOpen: false }),
  toggleCartDrawer: () => set((state) => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),

  openSearchModal: () => set({ isSearchModalOpen: true }),
  closeSearchModal: () => set({ isSearchModalOpen: false }),

  openAuthModal: (tab = "login") => set({ isAuthModalOpen: true, authModalTab: tab }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),

  openReservationModal: () => set({ isReservationModalOpen: true }),
  closeReservationModal: () => set({ isReservationModalOpen: false }),

  setQuickViewProduct: (product) => set({ quickViewProduct: product }),

  addToast: (message, type = "success", duration = 3200) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastMessage = { id, message, type, duration };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    if (duration > 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, duration);
    }
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));
