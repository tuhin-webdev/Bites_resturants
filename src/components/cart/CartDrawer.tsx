"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { X, Trash2, Plus, Minus, ArrowRight, Tag, Truck, CheckCircle2, ShoppingBag } from "lucide-react";

export const CartDrawer: React.FC = () => {
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
  } = useCartStore();

  const { isCartDrawerOpen, closeCartDrawer, addToast } = useUIStore();
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  if (!isCartDrawerOpen) return null;

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
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Your Food Cart"
      className="fixed inset-0 z-50 overflow-hidden bg-charcoal/60 backdrop-blur-sm transition-opacity"
      onClick={closeCartDrawer}
    >
      <div
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-cream-200 transform animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-cream-100 flex items-center justify-between bg-cream-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-500" />
              <h3 className="font-black text-lg text-charcoal">Your Food Cart</h3>
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={closeCartDrawer}
              className="p-2 rounded-full hover:bg-cream-100 text-gray-400 hover:text-charcoal transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-amber-50/70 border-b border-amber-100">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="flex items-center gap-1 text-amber-900">
                <Truck className="w-4 h-4 text-amber-600" />
                {neededForFree === 0
                  ? "🎉 You qualified for FREE Delivery!"
                  : `Add $${neededForFree.toFixed(2)} more for Free Delivery!`}
              </span>
              <span className="text-amber-700 font-bold">{freePercent}%</span>
            </div>
            <div className="w-full bg-amber-200/60 rounded-full h-2 overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${freePercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 bg-cream-100 rounded-full flex items-center justify-center mx-auto text-amber-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-base text-charcoal">Your cart is empty</h4>
                <p className="text-xs text-charcoal-100 max-w-xs mx-auto">
                  Explore our mouth-watering menu and treat your taste buds with our chef specials!
                </p>
                <Link
                  href="/menu"
                  onClick={closeCartDrawer}
                  className="inline-block mt-3 px-6 py-2.5 bg-amber-500 text-charcoal-dark font-bold text-xs rounded-full shadow hover:bg-amber-600 transition-colors"
                >
                  Explore Delicious Menu
                </Link>
              </div>
            ) : (
              items.map((item) => {
                const addonsPrice = item.selectedAddons?.reduce((s, a) => s + a.price, 0) || 0;
                const itemTotal = (item.price + addonsPrice) * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="flex gap-3.5 p-3.5 rounded-2xl bg-cream-50/50 border border-cream-200/80 hover:border-amber-200 transition-colors"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0 border border-cream-200">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-charcoal truncate">{item.name}</h4>
                        <button
                          onClick={() => {
                            removeItem(item.id);
                            addToast(`Removed ${item.name}`, "info");
                          }}
                          className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Customization Details */}
                      <div className="text-[11px] text-charcoal-100 mt-0.5 space-y-0.5">
                        {item.selectedSize && <div>Size: <span className="font-medium text-charcoal">{item.selectedSize}</span></div>}
                        {item.selectedSauce && <div>Sauce: <span className="font-medium text-charcoal">{item.selectedSauce}</span></div>}
                        {item.selectedAddons && item.selectedAddons.length > 0 && (
                          <div className="truncate">
                            Extras:{" "}
                            <span className="font-medium text-charcoal">
                              {item.selectedAddons.map((a) => a.name).join(", ")}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Quantity & Item Total */}
                      <div className="flex items-center justify-between mt-2.5">
                        <div className="inline-flex items-center bg-white rounded-full p-0.5 border border-cream-200">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 rounded-full hover:bg-amber-100 flex items-center justify-center transition-colors text-charcoal"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-charcoal">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 rounded-full hover:bg-amber-100 flex items-center justify-center transition-colors text-charcoal"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-black text-charcoal">
                          ${itemTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Order Summary */}
          {items.length > 0 && (
            <div className="p-5 border-t border-cream-200 bg-cream-50/70 space-y-3.5">
              {/* Promo Coupon Field */}
              {coupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="font-bold text-emerald-900">{coupon.code}</span>
                      <span className="text-emerald-700 ml-1">({coupon.discountPercent}% off applied)</span>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs font-bold text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Coupon code (Try BITES20)"
                        className="w-full pl-8 pr-3 py-2 rounded-xl border border-cream-200 text-xs text-charcoal outline-none focus:border-amber-500 bg-white uppercase font-medium"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-charcoal text-white hover:bg-charcoal-dark font-bold text-xs rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-[11px] text-red-500">{couponError}</p>}
                </form>
              )}

              {/* Price Calculation breakdown */}
              <div className="space-y-1.5 text-xs text-charcoal-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-charcoal">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({coupon?.discountPercent}%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-semibold text-charcoal">
                    {delivery === 0 ? <strong className="text-emerald-600">FREE</strong> : `$${delivery.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated VAT / Tax (5%)</span>
                  <span className="font-semibold text-charcoal">${tax.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-cream-200 flex justify-between text-sm font-black text-charcoal">
                  <span>Grand Total</span>
                  <span className="text-lg text-amber-600">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  onClick={closeCartDrawer}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-charcoal-dark font-black text-sm rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="text-center">
                  <Link
                    href="/cart"
                    onClick={closeCartDrawer}
                    className="text-xs font-bold text-charcoal-100 hover:text-amber-600 hover:underline"
                  >
                    View Full Cart Details
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
