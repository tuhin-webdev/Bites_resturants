"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/userStore";
import { useUIStore } from "@/store/uiStore";
import { Order } from "@/types";
import {
  MapPin,
  Truck,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Clock,
  Plus,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    coupon,
    deliveryType,
    setDeliveryType,
    getSubtotal,
    getDiscount,
    getTax,
    getEffectiveDeliveryFee,
    getTotal,
    clearCart,
  } = useCartStore();

  const { user, addOrder } = useUserStore();
  const { addToast } = useUIStore();

  // Form step states
  const [selectedAddressId, setSelectedAddressId] = useState(
    user?.addresses?.[0]?.id || "new"
  );

  // Address inputs
  const [fullName, setFullName] = useState(user?.name || "Tuhin Ahmed");
  const [phone, setPhone] = useState(user?.phone || "+880 1711 234567");
  const [street, setStreet] = useState(user?.addresses?.[0]?.street || "House 42, Road 11, Banani");
  const [apartment, setApartment] = useState(user?.addresses?.[0]?.apartment || "Apt 4B");
  const [city, setCity] = useState("Dhaka");
  const [deliveryNotes, setDeliveryNotes] = useState("");

  // Payment inputs
  const [paymentMethod, setPaymentMethod] = useState<Order["paymentMethod"]>("Credit / Debit Card");
  const [cardNumber, setCardNumber] = useState("•••• •••• •••• 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("888");
  const [walletPhone, setWalletPhone] = useState("+880 1711 234567");

  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const tax = getTax();
  const delivery = getEffectiveDeliveryFee();
  const total = getTotal();

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      addToast("Your cart is empty!", "error");
      router.push("/menu");
      return;
    }

    if (!fullName || !phone || !street) {
      addToast("Please fill out complete delivery details", "warning");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `ord-${Date.now().toString().slice(-6)}`;
      const orderNumber = `BITES-${Math.floor(10000 + Math.random() * 90000)}`;

      const newOrder: Order = {
        id: orderId,
        orderNumber,
        createdAt: new Date().toLocaleString([], {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "Order Placed",
        trackingStep: 1,
        items: [...items],
        subtotal,
        discount,
        deliveryFee: delivery,
        tax,
        total,
        deliveryAddress: {
          fullName,
          phone,
          street,
          apartment: apartment || undefined,
          city,
          deliveryNotes: deliveryNotes.trim() || undefined,
        },
        deliveryType:
          deliveryType === "express"
            ? "Express Delivery"
            : deliveryType === "pickup"
            ? "Table Pickup"
            : "Standard Delivery",
        paymentMethod,
        paymentStatus: paymentMethod === "Cash on Delivery" ? "Pending" : "Paid",
        estimatedDeliveryTime:
          deliveryType === "express" ? "20-25 mins" : deliveryType === "pickup" ? "Ready in 15 mins" : "30-40 mins",
      };

      addOrder(newOrder);
      clearCart();
      setIsProcessing(false);

      addToast("Order Placed Successfully! 🍽️🎉", "success");

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#F59E0B", "#FBBF24", "#FEF3C7", "#1E1B18"],
        });
      } catch {}

      router.push(`/order-confirmation/${orderId}`);
    }, 1200);
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-xs font-bold text-charcoal hover:text-amber-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </Link>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-charcoal mb-8">
          Seamless Checkout
        </h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Form: Step 1, Step 2, Step 3 */}
          <div className="lg:col-span-8 space-y-8">
            {/* Step 1: Delivery Address */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-soft space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-cream-100">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-charcoal-dark font-black text-sm flex items-center justify-center">
                  1
                </div>
                <div>
                  <h2 className="text-lg font-black text-charcoal">Delivery Address & Contact</h2>
                  <p className="text-xs text-charcoal-50">Where should we deliver your hot food?</p>
                </div>
              </div>

              {/* Saved addresses selector */}
              {user?.addresses && user.addresses.length > 0 && (
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider">
                    Select Saved Address:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {user.addresses.map((addr) => (
                      <div
                        key={addr.id}
                        onClick={() => {
                          setSelectedAddressId(addr.id);
                          setStreet(addr.street);
                          setApartment(addr.apartment || "");
                          setPhone(addr.phone);
                        }}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          selectedAddressId === addr.id
                            ? "border-amber-500 bg-amber-50/50 shadow-xs"
                            : "border-cream-200 hover:border-amber-200 bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-bold text-charcoal mb-1">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-amber-500" />
                            {addr.label}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-charcoal-100">{addr.street}</p>
                        <p className="text-[11px] text-charcoal-50 mt-1">{addr.phone}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Form inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-cream-200 bg-white text-charcoal outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-cream-200 bg-white text-charcoal outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-charcoal mb-1.5">Street Address *</label>
                  <input
                    type="text"
                    required
                    autoComplete="street-address"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="House number, road number, area"
                    className="w-full text-xs p-3 rounded-xl border border-cream-200 bg-white text-charcoal outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1.5">Apartment / Suite</label>
                  <input
                    type="text"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    placeholder="e.g. Apt 4B, 3rd Floor"
                    className="w-full text-xs p-3 rounded-xl border border-cream-200 bg-white text-charcoal outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1.5">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-cream-200 bg-white text-charcoal outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-charcoal mb-1.5">
                    Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    placeholder="e.g. Ring bell twice, leave with security guard, do not knock..."
                    className="w-full text-xs p-3 rounded-xl border border-cream-200 bg-white text-charcoal outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Delivery Option */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-soft space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-cream-100">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-charcoal-dark font-black text-sm flex items-center justify-center">
                  2
                </div>
                <div>
                  <h2 className="text-lg font-black text-charcoal">Delivery Speed & Method</h2>
                  <p className="text-xs text-charcoal-50">Select your preferred courier service</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    type: "standard",
                    title: "Standard Delivery",
                    time: "30-40 mins",
                    price: subtotal >= 800 ? "FREE" : "৳60",
                    desc: "Thermal bag bicycle courier",
                  },
                  {
                    type: "express",
                    title: "Priority Express",
                    time: "15-25 mins",
                    price: "৳120",
                    desc: "Direct motorbike priority courier",
                  },
                  {
                    type: "pickup",
                    title: "Dine-In / Table Pickup",
                    time: "Ready in 15 mins",
                    price: "FREE",
                    desc: "Pick up fresh at Bites counter",
                  },
                ].map((opt) => (
                  <div
                    key={opt.type}
                    onClick={() => setDeliveryType(opt.type as any)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      deliveryType === opt.type
                        ? "border-amber-500 bg-amber-50/50 shadow-xs"
                        : "border-cream-200 hover:border-amber-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-bold text-charcoal">{opt.title}</strong>
                      <span className="text-xs font-black text-amber-700">{opt.price}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-charcoal-100 mt-1">
                      <Clock className="w-3 h-3 text-amber-500" />
                      <span>{opt.time}</span>
                    </div>
                    <p className="text-[10px] text-charcoal-50 mt-1.5 leading-snug">{opt.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-soft space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-cream-100">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-charcoal-dark font-black text-sm flex items-center justify-center">
                  3
                </div>
                <div>
                  <h2 className="text-lg font-black text-charcoal">Payment Option</h2>
                  <p className="text-xs text-charcoal-50">256-bit encrypted secure checkout</p>
                </div>
              </div>

              {/* Payment Type Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: "Credit / Debit Card", label: "Card", sub: "Visa / MC" },
                  { id: "bKash", label: "bKash", sub: "Instant OTP" },
                  { id: "Nagad", label: "Nagad", sub: "Wallet Pay" },
                  { id: "Cash on Delivery", label: "COD", sub: "Pay at Door" },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPaymentMethod(p.id as any)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      paymentMethod === p.id
                        ? "border-amber-500 bg-amber-50/60 shadow-xs"
                        : "border-cream-200 hover:border-amber-200 bg-white"
                    }`}
                  >
                    <span className="block text-xs font-bold text-charcoal">{p.label}</span>
                    <span className="block text-[10px] text-charcoal-50">{p.sub}</span>
                  </button>
                ))}
              </div>

              {/* Conditional Payment Details */}
              {paymentMethod === "Credit / Debit Card" && (
                <div className="p-4 rounded-2xl bg-cream-50/60 border border-cream-200 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-50" />
                      <input
                        type="text"
                        required
                        autoComplete="cc-number"
                        inputMode="numeric"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-cream-200 bg-white text-xs text-charcoal outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-charcoal mb-1">Expiry Date</label>
                      <input
                        type="text"
                        required
                        autoComplete="cc-exp"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full p-2.5 rounded-xl border border-cream-200 bg-white text-xs text-charcoal outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-charcoal mb-1">CVV / CVC</label>
                      <input
                        type="password"
                        required
                        autoComplete="cc-csc"
                        inputMode="numeric"
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="•••"
                        className="w-full p-2.5 rounded-xl border border-cream-200 bg-white text-xs text-charcoal outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {(paymentMethod === "bKash" || paymentMethod === "Nagad") && (
                <div className="p-4 rounded-2xl bg-cream-50/60 border border-cream-200 space-y-3">
                  <p className="text-xs text-charcoal-100">
                    You will receive an instant payment verification request on your {paymentMethod} account.
                  </p>
                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1">
                      {paymentMethod} Registered Mobile
                    </label>
                    <input
                      type="tel"
                      required
                      value={walletPhone}
                      onChange={(e) => setWalletPhone(e.target.value)}
                      placeholder="+880 1..."
                      className="w-full p-2.5 rounded-xl border border-cream-200 bg-white text-xs text-charcoal outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "Cash on Delivery" && (
                <div className="p-4 rounded-2xl bg-cream-50/60 border border-cream-200 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <p className="text-xs text-charcoal-100">
                    Pay securely in cash or via mobile QR code when our rider arrives at your doorstep.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sticky Order Summary */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-soft space-y-4">
              <h3 className="font-black text-lg text-charcoal">Order Breakdown</h3>

              {/* Order Items Preview */}
              <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-cream-100 pr-1">
                {items.map((item) => (
                  <div key={item.id} className="pt-2 first:pt-0 flex items-center gap-3 text-xs">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-cream-100 shrink-0 border border-cream-200">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-charcoal truncate">{item.name}</h4>
                      <p className="text-[11px] text-charcoal-50">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-charcoal">
                      ৳{(item.price * item.quantity).toFixed(0)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculations */}
              <div className="space-y-2 pt-4 border-t border-cream-200 text-xs text-charcoal-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-charcoal">৳{subtotal.toFixed(0)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({coupon?.code})</span>
                    <span>-৳{discount.toFixed(0)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-charcoal">
                    {delivery === 0 ? <strong className="text-emerald-600">FREE</strong> : `৳${delivery.toFixed(0)}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>VAT / Taxes (5%)</span>
                  <span className="font-semibold text-charcoal">৳{tax.toFixed(0)}</span>
                </div>

                <div className="pt-3 border-t border-cream-200 flex justify-between text-base font-black text-charcoal">
                  <span>Grand Total</span>
                  <span className="text-2xl text-amber-600">৳{total.toFixed(0)}</span>
                </div>
              </div>

              {/* Place Order CTA Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-charcoal-dark font-black text-sm rounded-full shadow-hover hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="inline-block w-4 h-4 border-2 border-charcoal-dark border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Lock className="w-4 h-4" /> Place Order • ৳{total.toFixed(0)}
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-charcoal-50 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Safe SSL Payment Guarantee</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
