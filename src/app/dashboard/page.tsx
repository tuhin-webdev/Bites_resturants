"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { PRODUCTS } from "@/data/mockData";
import { ProductCard } from "@/components/menu/ProductCard";
import {
  User,
  Package,
  Heart,
  MapPin,
  Calendar,
  Lock,
  Plus,
  Trash2,
  CheckCircle2,
  ArrowRight,
  LogOut,
  Edit2,
  RotateCcw,
} from "lucide-react";

function DashboardContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "orders";

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const { user, orders, isAuthenticated, updateProfile, addAddress, deleteAddress, setDefaultAddress, logout } =
    useUserStore();
  const { items: wishlistIds, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const { addToast, openAuthModal } = useUIStore();

  // Profile edit state
  const [profileName, setProfileName] = useState(user?.name || "Tuhin Ahmed");
  const [profileEmail, setProfileEmail] = useState(user?.email || "tuhin@example.com");
  const [profilePhone, setProfilePhone] = useState(user?.phone || "+880 1711 234567");
  const [newPassword, setNewPassword] = useState("");

  // Address form modal/state
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addrLabel, setAddrLabel] = useState<"Home" | "Work" | "Other">("Home");
  const [addrStreet, setAddrStreet] = useState("");
  const [addrApartment, setAddrApartment] = useState("");
  const [addrCity, setAddrCity] = useState("Dhaka");
  const [addrPhone, setAddrPhone] = useState("+880 1711 234567");
  const [addrDefault, setAddrDefault] = useState(false);

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: profileName,
      email: profileEmail,
      phone: profilePhone,
    });
    addToast("Profile information updated! ✅", "success");
    if (newPassword) {
      addToast("Password changed successfully!", "info");
      setNewPassword("");
    }
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrStreet) return;

    addAddress({
      label: addrLabel,
      street: addrStreet,
      apartment: addrApartment || undefined,
      city: addrCity,
      phone: addrPhone,
      isDefault: addrDefault,
    });

    addToast("New delivery address saved! 🏡", "success");
    setShowAddressForm(false);
    setAddrStreet("");
    setAddrApartment("");
  };

  const handleReorder = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    order.items.forEach((item) => {
      addItem({
        ...item,
        id: `${item.productId}-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      });
    });

    addToast("Added all items from past order to cart! 🛒", "success");
  };

  if (!isAuthenticated) {
    return (
      <div className="py-24 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-cream-200 shadow-soft space-y-4">
          <User className="w-12 h-12 text-amber-500 mx-auto" />
          <h2 className="text-2xl font-black text-charcoal">Sign In to View Dashboard</h2>
          <p className="text-xs text-charcoal-100">
            Access your orders, saved delivery addresses, wishlist items, and dining reservations.
          </p>
          <button
            onClick={() => openAuthModal("login")}
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-charcoal-dark font-bold text-xs rounded-full shadow-md"
          >
            Sign In / Register
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-amber-300 shadow-sm shrink-0">
              <Image
                src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="text-xl sm:text-2xl font-black text-charcoal">{user.name}</h1>
                <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  VIP Foodie
                </span>
              </div>
              <p className="text-xs text-charcoal-100 mt-0.5">{user.email} • {user.phone}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="px-5 py-2.5 rounded-full border border-cream-200 hover:border-red-200 hover:bg-red-50 text-red-600 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        {/* Dashboard Tabs & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tabs Navigation Sidebar */}
          <aside className="lg:col-span-3 bg-white rounded-3xl p-4 border border-cream-200 shadow-soft space-y-1">
            {[
              { id: "orders", label: "Order History", icon: <Package className="w-4 h-4" />, count: orders.length },
              { id: "wishlist", label: "My Wishlist", icon: <Heart className="w-4 h-4" />, count: wishlistIds.length },
              { id: "addresses", label: "Saved Addresses", icon: <MapPin className="w-4 h-4" />, count: user.addresses.length },
              { id: "profile", label: "Profile & Security", icon: <User className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-amber-500 text-charcoal-dark shadow-xs"
                    : "text-charcoal-200 hover:bg-cream-50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {tab.icon}
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      activeTab === tab.id ? "bg-white text-charcoal-dark" : "bg-cream-100 text-charcoal-100"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </aside>

          {/* Tab Main Content */}
          <main className="lg:col-span-9 space-y-6">
            {/* Tab 1: Orders */}
            {activeTab === "orders" && (
              <div className="space-y-4">
                <h2 className="text-xl font-black text-charcoal">Your Recent Orders</h2>
                {orders.length === 0 ? (
                  <div className="p-8 text-center bg-white rounded-3xl border border-cream-200 text-charcoal-100 text-xs">
                    No orders placed yet. Time to order your first meal!
                  </div>
                ) : (
                  orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white rounded-3xl p-6 border border-cream-200 shadow-soft space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cream-100 pb-3">
                        <div>
                          <span className="font-mono font-bold text-amber-700 text-xs">
                            {order.orderNumber}
                          </span>
                          <p className="text-[11px] text-charcoal-50">{order.createdAt}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`text-xs font-bold px-3 py-1 rounded-full ${
                              order.status === "Delivered"
                                ? "bg-emerald-100 text-emerald-800"
                                : order.status === "Kitchen Preparing"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {order.status}
                          </span>
                          <span className="font-black text-base text-charcoal">
                            ৳{order.total.toFixed(0)}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-2">
                        {order.items.map((it) => (
                          <div key={it.id} className="flex items-center justify-between text-xs">
                            <span className="text-charcoal-100">
                              {it.quantity}x <strong className="text-charcoal">{it.name}</strong>{" "}
                              {it.selectedSize ? `(${it.selectedSize})` : ""}
                            </span>
                            <span className="font-semibold text-charcoal">
                              ৳{(it.price * it.quantity).toFixed(0)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-3 border-t border-cream-100 text-xs">
                        <Link
                          href={`/order-confirmation/${order.id}`}
                          className="font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                        >
                          Live Radar & Invoice Receipt <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => handleReorder(order.id)}
                          className="px-4 py-1.5 rounded-full bg-cream-100 hover:bg-amber-500 text-charcoal hover:text-charcoal-dark font-bold text-xs flex items-center gap-1.5 transition-colors"
                        >
                          <RotateCcw className="w-3.5 h-3.5" /> Re-Order
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab 2: Wishlist */}
            {activeTab === "wishlist" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black text-charcoal">
                    Saved Favorites ({wishlistProducts.length})
                  </h2>
                  {wishlistProducts.length > 0 && (
                    <button
                      onClick={clearWishlist}
                      className="text-xs text-red-500 hover:underline font-semibold"
                    >
                      Clear Wishlist
                    </button>
                  )}
                </div>

                {wishlistProducts.length === 0 ? (
                  <div className="p-12 text-center bg-white rounded-3xl border border-cream-200 text-charcoal-100 text-xs space-y-3">
                    <Heart className="w-8 h-8 text-gray-300 mx-auto" />
                    <p>Your wishlist is empty. Tap the heart icon on any dish to save it here!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {wishlistProducts.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Saved Addresses */}
            {activeTab === "addresses" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black text-charcoal">Saved Delivery Addresses</h2>
                  <button
                    onClick={() => setShowAddressForm(!showAddressForm)}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-charcoal-dark font-bold text-xs rounded-full flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-4 h-4" /> Add New Address
                  </button>
                </div>

                {showAddressForm && (
                  <form
                    onSubmit={handleAddAddress}
                    className="bg-white rounded-3xl p-6 border border-amber-200 shadow-soft space-y-4 animate-in fade-in"
                  >
                    <h3 className="font-bold text-sm text-charcoal">Add New Delivery Location</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-charcoal mb-1">Tag / Label</label>
                        <select
                          value={addrLabel}
                          onChange={(e) => setAddrLabel(e.target.value as any)}
                          className="w-full text-xs p-2.5 rounded-xl border border-cream-200 outline-none"
                        >
                          <option value="Home">Home</option>
                          <option value="Work">Work</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-charcoal mb-1">Street Address</label>
                        <input
                          type="text"
                          required
                          value={addrStreet}
                          onChange={(e) => setAddrStreet(e.target.value)}
                          placeholder="House, Road, Area"
                          className="w-full text-xs p-2.5 rounded-xl border border-cream-200 outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-charcoal mb-1">Apartment / Flat</label>
                        <input
                          type="text"
                          value={addrApartment}
                          onChange={(e) => setAddrApartment(e.target.value)}
                          placeholder="Apt 4B"
                          className="w-full text-xs p-2.5 rounded-xl border border-cream-200 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-charcoal mb-1">Contact Phone</label>
                        <input
                          type="tel"
                          required
                          value={addrPhone}
                          onChange={(e) => setAddrPhone(e.target.value)}
                          className="w-full text-xs p-2.5 rounded-xl border border-cream-200 outline-none"
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-2 text-xs text-charcoal cursor-pointer">
                      <input
                        type="checkbox"
                        checked={addrDefault}
                        onChange={(e) => setAddrDefault(e.target.checked)}
                        className="rounded accent-amber-500"
                      />
                      <span>Set as default delivery address</span>
                    </label>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-charcoal-dark font-bold text-xs rounded-full shadow-xs"
                      >
                        Save Address
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddressForm(false)}
                        className="px-5 py-2 bg-cream-100 text-charcoal font-bold text-xs rounded-full"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="bg-white rounded-3xl p-5 border border-cream-200 shadow-soft space-y-2 relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-charcoal flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-amber-500" />
                          {addr.label}
                        </span>
                        {addr.isDefault ? (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                            Default
                          </span>
                        ) : (
                          <button
                            onClick={() => setDefaultAddress(addr.id)}
                            className="text-[10px] text-amber-600 hover:underline font-semibold"
                          >
                            Set Default
                          </button>
                        )}
                      </div>

                      <p className="text-xs text-charcoal font-medium">{addr.street}</p>
                      {addr.apartment && <p className="text-xs text-charcoal-100">{addr.apartment}</p>}
                      <p className="text-[11px] text-charcoal-50">{addr.phone}</p>

                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => deleteAddress(addr.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Delete address"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Profile & Password */}
            {activeTab === "profile" && (
              <form
                onSubmit={handleProfileSave}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-soft space-y-6"
              >
                <h2 className="text-xl font-black text-charcoal">Personal Information & Security</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-cream-200 outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-cream-200 outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-cream-200 outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1">New Password (Optional)</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full text-xs p-3 rounded-xl border border-cream-200 outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-charcoal-dark font-black text-xs rounded-full shadow-md active:scale-95"
                >
                  Save Profile Changes
                </button>
              </form>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
