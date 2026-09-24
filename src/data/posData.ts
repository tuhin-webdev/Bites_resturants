export interface POSDish {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  rating: number;
  image: string;
  distance?: string;
  duration?: string;
  isPopular?: boolean;
  isRecent?: boolean;
}

export const POS_CATEGORIES = [
  { id: "all", name: "All Menu", icon: "🍽️", count: 24 },
  { id: "Chicken", name: "Chicken", icon: "🍗", count: 8 },
  { id: "Pizza", name: "Pizza", icon: "🍕", count: 6 },
  { id: "Burger", name: "Burger", icon: "🍔", count: 7 },
  { id: "Pasta", name: "Pasta", icon: "🍝", count: 5 },
  { id: "Drinks", name: "Drinks", icon: "🥤", count: 9 },
  { id: "Dessert", name: "Dessert", icon: "🍰", count: 4 },
];

export const POS_DISHES: POSDish[] = [
  // Popular Dishes matching the mockup
  {
    id: "pos-d1",
    name: "Cheese burger",
    category: "Burger",
    price: 5.59,
    originalPrice: 6.58,
    badge: "15% Off",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
    isPopular: true,
  },
  {
    id: "pos-d2",
    name: "Panner burger",
    category: "Burger",
    price: 5.59,
    originalPrice: 6.58,
    badge: "15% Off",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=80",
    isPopular: true,
  },
  {
    id: "pos-d3",
    name: "Tandoori burger",
    category: "Burger",
    price: 5.59,
    badge: "Exclusive",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=500&q=80",
    isPopular: true,
  },

  // Recent Orders matching the mockup
  {
    id: "pos-d4",
    name: "Japan Ramen",
    category: "Pasta",
    price: 5.59,
    rating: 4.9,
    distance: "4.97 km",
    duration: "21 min",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80",
    isRecent: true,
  },
  {
    id: "pos-d5",
    name: "Fried Rice",
    category: "Chicken",
    price: 5.59,
    rating: 4.8,
    distance: "4.97 km",
    duration: "21 min",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=500&q=80",
    isRecent: true,
  },
  {
    id: "pos-d6",
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 5.59,
    rating: 5.0,
    distance: "4.97 km",
    duration: "21 min",
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=500&q=80",
    isRecent: true,
  },

  // Additional Menu Items
  {
    id: "pos-d7",
    name: "Crispy Fried Chicken Wings",
    category: "Chicken",
    price: 6.99,
    rating: 4.9,
    badge: "Hot",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "pos-d8",
    name: "Tuscan Alfredo Fettuccine",
    category: "Pasta",
    price: 7.49,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "pos-d9",
    name: "Golden Truffle Fries",
    category: "Burger",
    price: 3.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "pos-d10",
    name: "Iced Caramel Macchiato",
    category: "Drinks",
    price: 3.5,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=80",
  },
];

export const POS_TABLES = [
  { id: "tbl-1", number: 1, capacity: 2, status: "Occupied", currentOrder: "#FD-9010", serverName: "Alex" },
  { id: "tbl-2", number: 2, capacity: 4, status: "Available" },
  { id: "tbl-3", number: 3, capacity: 4, status: "Reserved", serverName: "David" },
  { id: "tbl-4", number: 4, capacity: 6, status: "Occupied", currentOrder: "#FD-9012", serverName: "Elena" },
  { id: "tbl-5", number: 5, capacity: 2, status: "Available" },
  { id: "tbl-6", number: 6, capacity: 8, status: "Reserved" },
  { id: "tbl-7", number: 7, capacity: 4, status: "Occupied", currentOrder: "#FD-9014", serverName: "Michael" },
  { id: "tbl-8", number: 8, capacity: 2, status: "Available" },
];
