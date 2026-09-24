import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { safeLocalStorage } from "./storage";
import { POSDish, POS_DISHES, POS_TABLES } from "../data/posData";

export interface POSCartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  notes?: string;
}

export interface POSOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  tableOrAddress: string;
  orderType: "Dine-In" | "Takeaway" | "Delivery";
  items: POSCartItem[];
  subtotal: number;
  serviceFee: number;
  tax: number;
  total: number;
  status: "Pending" | "Cooking" | "Ready" | "Out for Delivery" | "Completed" | "Cancelled";
  paymentMethod: "Cash" | "Card" | "Digital Wallet";
  createdAt: string;
}

export interface TableItem {
  id: string;
  number: number;
  capacity: number;
  status: "Available" | "Occupied" | "Reserved";
  currentOrder?: string;
  serverName?: string;
}

interface POSState {
  // Navigation & View
  activeView: "pos" | "orders" | "kitchen" | "menu_mgmt" | "analytics" | "tables";
  setActiveView: (view: POSState["activeView"]) => void;

  // Wallet
  balance: number;
  topUpBalance: (amount: number) => void;
  transferBalance: (amount: number) => void;

  // Address / Order info
  deliveryAddress: string;
  setDeliveryAddress: (address: string) => void;
  deliveryNote: string;
  setDeliveryNote: (note: string) => void;
  orderType: "Dine-In" | "Takeaway" | "Delivery";
  setOrderType: (type: "Dine-In" | "Takeaway" | "Delivery") => void;

  // POS Cart
  cart: POSCartItem[];
  addToCart: (item: Omit<POSCartItem, "quantity">) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;

  // Search & Filter
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Menu / Dishes CRUD
  dishes: POSDish[];
  addDish: (dish: POSDish) => void;
  deleteDish: (id: string) => void;

  // Tables Management
  tables: TableItem[];
  updateTableStatus: (tableId: string, status: TableItem["status"]) => void;

  // Orders Management
  posOrders: POSOrder[];
  addPOSOrder: (order: POSOrder) => void;
  updateOrderStatus: (orderId: string, status: POSOrder["status"]) => void;

  // Modals
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  isAddDishModalOpen: boolean;
  setIsAddDishModalOpen: (open: boolean) => void;
  isAddNoteModalOpen: boolean;
  setIsAddNoteModalOpen: (open: boolean) => void;
  isTopUpModalOpen: boolean;
  setIsTopUpModalOpen: (open: boolean) => void;

  // Financial calculations
  getSubtotal: () => number;
  getServiceFee: () => number;
  getTotal: () => number;
}

const INITIAL_CART: POSCartItem[] = [
  {
    id: "cart-pizza-1",
    name: "Pepperoni Pizza",
    price: 5.59,
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=400&q=80",
    quantity: 1,
    category: "Pizza",
  },
  {
    id: "cart-pizza-2",
    name: "Pepperoni Pizza",
    price: 5.59,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80",
    quantity: 1,
    category: "Pizza",
  },
  {
    id: "cart-pizza-3",
    name: "Pepperoni Pizza",
    price: 5.59,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
    quantity: 1,
    category: "Pizza",
  },
  {
    id: "cart-pizza-4",
    name: "Pepperoni Pizza",
    price: 5.59,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80",
    quantity: 1,
    category: "Pizza",
  },
];

const INITIAL_ORDERS: POSOrder[] = [
  {
    id: "ord-pos-101",
    orderNumber: "#FD-9012",
    customerName: "Alex Morgan",
    tableOrAddress: "Table 04",
    orderType: "Dine-In",
    items: [
      {
        id: "c-1",
        name: "Cheese burger",
        price: 5.59,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
        quantity: 2,
        category: "Burger",
      },
      {
        id: "c-2",
        name: "French Fries",
        price: 3.5,
        image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=400&q=80",
        quantity: 1,
        category: "Fast Food",
      },
    ],
    subtotal: 14.68,
    serviceFee: 1.0,
    tax: 0.73,
    total: 16.41,
    status: "Cooking",
    paymentMethod: "Card",
    createdAt: "10 mins ago",
  },
  {
    id: "ord-pos-102",
    orderNumber: "#FD-9013",
    customerName: "David Miller",
    tableOrAddress: "Elm Street, 23",
    orderType: "Delivery",
    items: [
      {
        id: "c-3",
        name: "Pepperoni Pizza",
        price: 5.59,
        image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=400&q=80",
        quantity: 3,
        category: "Pizza",
      },
    ],
    subtotal: 16.77,
    serviceFee: 1.0,
    tax: 0.84,
    total: 18.61,
    status: "Ready",
    paymentMethod: "Cash",
    createdAt: "18 mins ago",
  },
  {
    id: "ord-pos-103",
    orderNumber: "#FD-9014",
    customerName: "Sarah Connor",
    tableOrAddress: "Table 09",
    orderType: "Dine-In",
    items: [
      {
        id: "c-4",
        name: "Tandoori burger",
        price: 5.59,
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80",
        quantity: 1,
        category: "Burger",
      },
    ],
    subtotal: 5.59,
    serviceFee: 1.0,
    tax: 0.28,
    total: 6.87,
    status: "Pending",
    paymentMethod: "Digital Wallet",
    createdAt: "Just now",
  },
];

export const usePOSStore = create<POSState>()(
  persist(
    (set, get) => ({
      activeView: "pos",
      setActiveView: (view) => set({ activeView: view }),

      balance: 12000,
      topUpBalance: (amount) => set((s) => ({ balance: s.balance + amount })),
      transferBalance: (amount) => set((s) => ({ balance: Math.max(0, s.balance - amount) })),

      deliveryAddress: "Elm Street, 23",
      setDeliveryAddress: (address) => set({ deliveryAddress: address }),
      deliveryNote: "Leave with security guard if not available",
      setDeliveryNote: (note) => set({ deliveryNote: note }),
      orderType: "Delivery",
      setOrderType: (type) => set({ orderType: type }),

      cart: INITIAL_CART,
      addToCart: (item) => {
        set((state) => {
          const existing = state.cart.find((c) => c.name === item.name);
          if (existing) {
            return {
              cart: state.cart.map((c) =>
                c.id === existing.id ? { ...c, quantity: c.quantity + 1 } : c
              ),
            };
          }
          return {
            cart: [
              ...state.cart,
              {
                ...item,
                id: `pos-item-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
                quantity: 1,
              },
            ],
          };
        });
      },

      updateQuantity: (id, delta) => {
        set((state) => ({
          cart: state.cart
            .map((item) => {
              if (item.id === id) {
                const newQ = item.quantity + delta;
                return newQ > 0 ? { ...item, quantity: newQ } : null;
              }
              return item;
            })
            .filter(Boolean) as POSCartItem[],
        }));
      },

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((c) => c.id !== id),
        })),

      clearCart: () => set({ cart: [] }),

      selectedCategory: "All",
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),

      dishes: POS_DISHES,
      addDish: (dish) => set((s) => ({ dishes: [dish, ...s.dishes] })),
      deleteDish: (id) => set((s) => ({ dishes: s.dishes.filter((d) => d.id !== id) })),

      tables: POS_TABLES as TableItem[],
      updateTableStatus: (tableId, status) =>
        set((s) => ({
          tables: s.tables.map((t) => (t.id === tableId ? { ...t, status } : t)),
        })),

      posOrders: INITIAL_ORDERS,
      addPOSOrder: (order) => set((s) => ({ posOrders: [order, ...s.posOrders] })),
      updateOrderStatus: (orderId, status) =>
        set((s) => ({
          posOrders: s.posOrders.map((o) => (o.id === orderId ? { ...o, status } : o)),
        })),

      isCheckoutModalOpen: false,
      setIsCheckoutModalOpen: (open) => set({ isCheckoutModalOpen: open }),
      isAddDishModalOpen: false,
      setIsAddDishModalOpen: (open) => set({ isAddDishModalOpen: open }),
      isAddNoteModalOpen: false,
      setIsAddNoteModalOpen: (open) => set({ isAddNoteModalOpen: open }),
      isTopUpModalOpen: false,
      setIsTopUpModalOpen: (open) => set({ isTopUpModalOpen: open }),

      getSubtotal: () => {
        return get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
      getServiceFee: () => {
        return get().cart.length > 0 ? 1.0 : 0;
      },
      getTotal: () => {
        const subtotal = get().getSubtotal();
        const service = get().getServiceFee();
        return subtotal > 0 ? subtotal + service : 0;
      },
    }),
    {
      name: "fooddesk-pos-storage",
      storage: createJSONStorage(() => safeLocalStorage),
    }
  )
);
