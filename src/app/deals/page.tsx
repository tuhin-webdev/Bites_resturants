"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AVAILABLE_COUPONS, PRODUCTS } from "@/data/mockData";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { ProductCard } from "@/components/menu/ProductCard";
import { Tag, Sparkles, Clock, Copy, ArrowRight, Percent, Flame } from "lucide-react";

export default function DealsPage() {
  const { applyCoupon, addItem } = useCartStore();
  const { addToast } = useUIStore();

  const handleCopyAndApply = (code: string) => {
    navigator.clipboard?.writeText(code);
    const res = applyCoupon(code);
    if (res.success) {
      addToast(`Copied & Applied ${code}! 🎉`, "success");
    } else {
      addToast(`Copied ${code} to clipboard! (Min spend required)`, "info");
    }
  };

  const discountDishes = PRODUCTS.filter((p) => p.originalPrice);

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Banner */}
        <div className="relative rounded-4xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 p-8 sm:p-12 text-charcoal-dark shadow-hover overflow-hidden">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/30 backdrop-blur-md text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Exclusive Foodie Coupons & Bundles
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Hot Deals & Daily Gourmet Feasts
            </h1>
            <p className="text-xs sm:text-sm font-semibold max-w-lg leading-relaxed text-charcoal-dark/90">
              Save big on your favorite chef specials! Copy instant promo codes or grab value meal combos delivered sizzling hot to your door.
            </p>
          </div>
        </div>

        {/* Available Promo Coupons Grid */}
        <div>
          <h2 className="text-2xl font-black text-charcoal mb-6 flex items-center gap-2">
            <Tag className="w-5 h-5 text-amber-500" /> Active Voucher Coupons
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AVAILABLE_COUPONS.map((coupon) => (
              <div
                key={coupon.code}
                className="bg-white rounded-3xl p-6 border-2 border-dashed border-amber-300 shadow-soft hover:shadow-hover transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-amber-100 text-amber-900 font-black text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Percent className="w-3 h-3" /> {coupon.discountPercent}% OFF
                    </span>
                    <span className="text-[11px] text-charcoal-50">Min ৳{coupon.minSpend}</span>
                  </div>

                  <h3 className="font-mono text-2xl font-black text-charcoal tracking-wider">
                    {coupon.code}
                  </h3>
                  <p className="text-xs text-charcoal-100 mt-1">{coupon.description}</p>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => handleCopyAndApply(coupon.code)}
                    className="w-full py-2.5 bg-cream-100 hover:bg-amber-500 text-charcoal hover:text-charcoal-dark font-bold text-xs rounded-full flex items-center justify-center gap-2 transition-colors border border-amber-200"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copy & Apply Code
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Discounted Dishes Showcase */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
                Limited Time Markdowns
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-charcoal">
                Discounted Gourmet Dishes
              </h2>
            </div>
            <Link
              href="/menu"
              className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              Full Menu <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {discountDishes.map((p) => (
              <ProductCard key={p.id} product={p} highlightStyle />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
