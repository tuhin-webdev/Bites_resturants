"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  Truck,
  CheckCircle2,
  ShoppingBag,
  ArrowLeft,
  UtensilsCrossed,
} from "lucide-react";

export default function CartPage() {
  const {
    items,
    coupon,
    freeDeliveryThreshold,
    removeItem,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getDiscount,
    getTax,
    getEffectiveDeliveryFee,
    getTotal,
    getAmountToFreeDelivery,
    clearCart,
  } = useCartStore();

  const { addToast } = useUIStore();
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const tax = getTax();
  const delivery = getEffectiveDeliveryFee();
  const total = getTotal();
  const neededForFree = getAmountToFreeDelivery();
  const freePercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    if (!couponInput) return;

    const res = applyCoupon(couponInput);
    if (res.success) {
      addToast(res.message, "success");
      setCouponInput("");
    } else {
      setCouponError(res.message);
      addToast(res.message, "warning");
    }
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Top Link */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs font-bold text-charcoal hover:text-amber-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Exploring Menu
          </Link>

          {items.length > 0 && (
            <button
              onClick={() => {
                clearCart();
                addToast("Cart emptied", "info");
              }}
              className="text-xs text-red-500 hover:text-red-700 font-semibold"
            >
              Clear Cart
            </button>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-charcoal mb-8">
          Your Shopping Cart ({items.reduce((s, i) => s + i.quantity, 0)} items)
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-cream-200 p-8 space-y-4 shadow-soft">
            <div className="w-20 h-20 rounded-full bg-cream-100 text-amber-500 flex items-center justify-center mx-auto">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-charcoal">Your cart is feeling lonely</h2>
            <p className="text-xs sm:text-sm text-charcoal-100 max-w-md mx-auto leading-relaxed">
              Explore our fresh dishes, hand-tossed pizzas, and grilled specials crafted with love.
            </p>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-charcoal-dark font-black text-xs rounded-full shadow-md transition-all"
            >
              Explore Our Delicious Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Items Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free delivery progress bar */}
              <div className="p-5 rounded-3xl bg-amber-50/70 border border-amber-200 shadow-soft">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="flex items-center gap-1.5 text-amber-900">
                    <Truck className="w-4 h-4 text-amber-600" />
                    {neededForFree === 0
                      ? "🎉 You qualified for FREE Delivery!"
                      : `Add $${neededForFree.toFixed(2)} more for Free Express Delivery!`}
                  </span>
                  <span className="text-amber-800 font-bold">{freePercent}%</span>
                </div>
                <div className="w-full bg-amber-200/60 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${freePercent}%` }}
                  />
                </div>
              </div>

              {/* Items Card List */}
              <div className="bg-white rounded-3xl border border-cream-200 shadow-soft divide-y divide-cream-100 overflow-hidden">
                {items.map((item) => {
                  const addonsPrice = item.selectedAddons?.reduce((s, a) => s + a.price, 0) || 0;
                  const itemUnitPrice = item.price + addonsPrice;
                  const itemTotal = itemUnitPrice * item.quantity;

                  return (
                    <div
                      key={item.id}
                      className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-cream-100 shrink-0 border border-cream-200">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/menu/${item.productId}`}
                            className="font-bold text-sm sm:text-base text-charcoal hover:text-amber-600 transition-colors line-clamp-1"
                          >
                            {item.name}
                          </Link>

                          {/* Options details */}
                          <div className="text-xs text-charcoal-100 mt-1 space-y-0.5">
                            {item.selectedSize && (
                              <div>Portion: <strong className="text-charcoal">{item.selectedSize}</strong></div>
                            )}
                            {item.selectedSauce && (
                              <div>Sauce: <strong className="text-charcoal">{item.selectedSauce}</strong></div>
                            )}
                            {item.selectedAddons && item.selectedAddons.length > 0 && (
                              <div>
                                Add-ons:{" "}
                                <strong className="text-charcoal">
                                  {item.selectedAddons.map((a) => a.name).join(", ")}
                                </strong>
                              </div>
                            )}
                            {item.specialInstructions && (
                              <div className="italic text-amber-800">
                                &quot;{item.specialInstructions}&quot;
                              </div>
                            )}
                          </div>

                          <div className="mt-2 text-xs font-semibold text-charcoal">
                            ${itemUnitPrice.toFixed(2)} each
                          </div>
                        </div>
                      </div>

                      {/* Controls and Total */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                        <div className="inline-flex items-center bg-cream-100 rounded-full p-1 border border-cream-200">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-full bg-white text-charcoal hover:bg-amber-100 flex items-center justify-center transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-charcoal">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-full bg-white text-charcoal hover:bg-amber-100 flex items-center justify-center transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-base font-black text-charcoal min-w-[70px] text-right">
                          ${itemTotal.toFixed(2)}
                        </span>

                        <button
                          onClick={() => {
                            removeItem(item.id);
                            addToast(`Removed ${item.name}`, "info");
                          }}
                          className="p-2 text-charcoal-50 hover:text-red-500 rounded-full hover:bg-cream-100 transition-colors"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-4 space-y-6">
              {/* Promo Coupon Card */}
              <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-soft">
                <h3 className="font-bold text-xs uppercase tracking-wider text-charcoal mb-3 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-amber-500" /> Have a Coupon Code?
                </h3>

                {coupon ? (
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <strong className="text-emerald-900 block">{coupon.code}</strong>
                        <span className="text-emerald-700 text-[11px]">{coupon.description}</span>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs font-bold text-red-500 hover:text-red-700 underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="e.g. BITES20, FEAST30"
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-cream-200 text-xs text-charcoal outline-none focus:border-amber-500 uppercase font-semibold"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-charcoal-dark font-bold text-xs rounded-xl shadow-xs transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-xs text-red-500">{couponError}</p>}
                    <p className="text-[11px] text-charcoal-50">
                      Use code <strong className="text-charcoal">BITES20</strong> for 20% off orders over $40!
                    </p>
                  </form>
                )}
              </div>

              {/* Order Breakdown */}
              <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-soft space-y-4">
                <h3 className="font-black text-lg text-charcoal">Order Summary</h3>

                <div className="space-y-2 text-xs text-charcoal-100">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-charcoal">${subtotal.toFixed(2)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Discount ({coupon?.code})</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-semibold text-charcoal">
                      {delivery === 0 ? <strong className="text-emerald-600">FREE</strong> : `$${delivery.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated Tax / VAT (5%)</span>
                    <span className="font-semibold text-charcoal">${tax.toFixed(2)}</span>
                  </div>

                  <div className="pt-3 border-t border-cream-200 flex justify-between text-base font-black text-charcoal">
                    <span>Total Amount</span>
                    <span className="text-2xl text-amber-600">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-charcoal-dark font-black text-sm rounded-full shadow-hover hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>

                <p className="text-[11px] text-center text-charcoal-50">
                  Safe & encrypted checkout. Multiple payment options available.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
