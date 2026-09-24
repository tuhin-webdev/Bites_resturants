import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserProfile, UserAddress, Order, TableReservation } from "@/types";
import { INITIAL_RESERVATIONS } from "@/data/mockData";
import { safeLocalStorage } from "./storage";

interface UserState {
  isAuthenticated: boolean;
  user: UserProfile;
  orders: Order[];
  reservations: TableReservation[];

  login: (email: string, name?: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addAddress: (address: Omit<UserAddress, "id">) => void;
  updateAddress: (id: string, address: Partial<UserAddress>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order["status"], step: number) => void;
  addReservation: (reservation: TableReservation) => void;
  cancelReservation: (id: string) => void;
}

const DEFAULT_USER: UserProfile = {
  id: "user-1",
  name: "Tuhin Ahmed",
  email: "tuhin@example.com",
  phone: "+880 1711 234567",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
  addresses: [
    {
      id: "addr-1",
      label: "Home",
      street: "House 42, Road 11, Banani",
      apartment: "Apt 4B",
      city: "Dhaka",
      phone: "+880 1711 234567",
      isDefault: true,
    },
    {
      id: "addr-2",
      label: "Work",
      street: "Gulshan Avenue 12, Floor 7",
      apartment: "Tech Hub Tower",
      city: "Dhaka",
      phone: "+880 1819 876543",
      isDefault: false,
    },
  ],
};

const DEFAULT_ORDERS: Order[] = [
  {
    id: "ord-8831",
    orderNumber: "BITES-88319",
    createdAt: "2026-09-24 11:30 AM",
    status: "Kitchen Preparing",
    trackingStep: 2,
    subtotal: 70.0,
    discount: 14.0,
    deliveryFee: 0.0,
    tax: 2.8,
    total: 58.8,
    deliveryAddress: {
      fullName: "Tuhin Ahmed",
      phone: "+880 1711 234567",
      street: "House 42, Road 11, Banani",
      apartment: "Apt 4B",
      city: "Dhaka",
      deliveryNotes: "Please ring bell and leave with front desk if not answered.",
    },
    deliveryType: "Standard Delivery",
    paymentMethod: "bKash",
    paymentStatus: "Paid",
    estimatedDeliveryTime: "25-35 mins",
    items: [
      {
        id: "prod-1-item",
        productId: "prod-1",
        name: "Tuscan Bolognese Pasta",
        price: 35.0,
        image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281699?auto=format&fit=crop&w=800&q=80",
        quantity: 2,
        selectedSize: "Regular Portion",
        selectedSauce: "Signature Bolognese",
      },
    ],
  },
  {
    id: "ord-8710",
    orderNumber: "BITES-87102",
    createdAt: "2026-09-20 07:15 PM",
    status: "Delivered",
    trackingStep: 4,
    subtotal: 133.0,
    discount: 26.6,
    deliveryFee: 0.0,
    tax: 5.32,
    total: 111.72,
    deliveryAddress: {
      fullName: "Tuhin Ahmed",
      phone: "+880 1711 234567",
      street: "House 42, Road 11, Banani",
      apartment: "Apt 4B",
      city: "Dhaka",
    },
    deliveryType: "Express Delivery",
    paymentMethod: "Credit / Debit Card",
    paymentStatus: "Paid",
    estimatedDeliveryTime: "Delivered",
    items: [
      {
        id: "prod-3-item",
        productId: "prod-3",
        name: "Authentic Chicken Shawarma",
        price: 95.0,
        image: "https://images.unsplash.com/photo-1644783307621-c4d32049e54a?auto=format&fit=crop&w=800&q=80",
        quantity: 1,
        selectedSize: "Single Roll",
      },
      {
        id: "prod-9-item",
        productId: "prod-9",
        name: "Neapolitan Margherita Di Bufala",
        price: 38.0,
        image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80",
        quantity: 1,
      },
    ],
  },
];

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isAuthenticated: true,
      user: DEFAULT_USER,
      orders: DEFAULT_ORDERS,
      reservations: INITIAL_RESERVATIONS,

      login: (email, name) => {
        set((state) => ({
          isAuthenticated: true,
          user: {
            ...state.user,
            email,
            name: name || state.user.name || "Valued Foodie",
          },
        }));
      },

      logout: () => {
        set({ isAuthenticated: false });
      },

      updateProfile: (updates) => {
        set((state) => ({
          user: { ...state.user, ...updates },
        }));
      },

      addAddress: (addressData) => {
        set((state) => {
          const newAddress: UserAddress = {
            id: `addr-${Date.now()}`,
            ...addressData,
          };
          const addresses = addressData.isDefault
            ? state.user.addresses.map((a) => ({ ...a, isDefault: false })).concat(newAddress)
            : [...state.user.addresses, newAddress];
          return {
            user: { ...state.user, addresses },
          };
        });
      },

      updateAddress: (id, updates) => {
        set((state) => {
          let addresses = state.user.addresses.map((a) => (a.id === id ? { ...a, ...updates } : a));
          if (updates.isDefault) {
            addresses = addresses.map((a) => (a.id === id ? { ...a, isDefault: true } : { ...a, isDefault: false }));
          }
          return {
            user: { ...state.user, addresses },
          };
        });
      },

      deleteAddress: (id) => {
        set((state) => ({
          user: {
            ...state.user,
            addresses: state.user.addresses.filter((a) => a.id !== id),
          },
        }));
      },

      setDefaultAddress: (id) => {
        set((state) => ({
          user: {
            ...state.user,
            addresses: state.user.addresses.map((a) => ({
              ...a,
              isDefault: a.id === id,
            })),
          },
        }));
      },

      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }));
      },

      updateOrderStatus: (orderId, status, step) => {
        set((state) => ({
          orders: state.orders.map((o) => (o.id === orderId ? { ...o, status, trackingStep: step } : o)),
        }));
      },

      addReservation: (reservation) => {
        set((state) => ({
          reservations: [reservation, ...state.reservations],
        }));
      },

      cancelReservation: (id) => {
        set((state) => ({
          reservations: state.reservations.map((r) => (r.id === id ? { ...r, status: "Cancelled" } : r)),
        }));
      },
    }),
    {
      name: "bites-user-storage",
      storage: createJSONStorage(() => safeLocalStorage),
    }
  )
);
