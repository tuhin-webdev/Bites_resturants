export interface ProductAddon {
  id: string;
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  subCategory?: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery?: string[];
  isPopular?: boolean;
  isChefSpecial?: boolean;
  isNew?: boolean;
  dietary: ("Veg" | "Non-Veg" | "Halal" | "Gluten-Free" | "Vegan")[];
  spicyLevel: 0 | 1 | 2 | 3; // 0=Mild, 1=Medium, 2=Hot, 3=Extra Hot
  preparationTime: string;
  calories: number;
  availableAddons?: ProductAddon[];
  sauceOptions?: string[];
  sizeOptions?: { name: string; extraPrice: number }[];
  sku: string;
  inStock: boolean;
}

export interface CartItemAddon {
  name: string;
  price: number;
}

export interface CartItem {
  id: string; // unique cart item id (product id + variations)
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedSize?: string;
  selectedSauce?: string;
  selectedAddons?: CartItemAddon[];
  specialInstructions?: string;
}

export interface CustomerReview {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  dishName?: string;
  photos?: string[];
}

export interface Chef {
  id: string;
  name: string;
  role: string;
  experience: string;
  image: string;
  specialty: string;
}

export interface UserAddress {
  id: string;
  label: "Home" | "Work" | "Other";
  street: string;
  apartment?: string;
  city: string;
  phone: string;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: UserAddress[];
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  size?: string;
  addons?: string[];
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: "Order Placed" | "Kitchen Preparing" | "Out for Delivery" | "Delivered" | "Cancelled";
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tax: number;
  total: number;
  deliveryAddress: {
    fullName: string;
    phone: string;
    street: string;
    apartment?: string;
    city: string;
    deliveryNotes?: string;
  };
  deliveryType: "Standard Delivery" | "Express Delivery" | "Table Pickup";
  paymentMethod: "Credit / Debit Card" | "bKash" | "Nagad" | "Cash on Delivery";
  paymentStatus: "Paid" | "Pending";
  estimatedDeliveryTime: string;
  trackingStep: number; // 1 to 4
}

export interface TableReservation {
  id: string;
  reservationNumber: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  seatingPreference: "Indoor Main Hall" | "Outdoor Garden Terrace" | "Rooftop View" | "Private Dining VIP";
  specialRequests?: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  createdAt: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minSpend: number;
  description: string;
}
