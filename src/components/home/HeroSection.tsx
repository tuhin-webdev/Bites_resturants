"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useUIStore } from "@/store/uiStore";
import { Search, ArrowRight, Utensils, Coffee, Cake, Pizza, Cookie } from "lucide-react";

export const HeroSection: React.FC = () => {
  const { openSearchModal, openReservationModal } = useUIStore();

  const floatingBadges = [
    { label: "Dishes", icon: <Utensils className="w-3.5 h-3.5 text-amber-500" />, pos: "top-4 right-10 md:right-16" },
    { label: "Dessert", icon: <Cake className="w-3.5 h-3.5 text-pink-500" />, pos: "top-28 right-0 md:right-6" },
    { label: "Drinks", icon: <Coffee className="w-3.5 h-3.5 text-amber-600" />, pos: "top-52 right-4 md:right-10" },
    { label: "Pasta", icon: <Pizza className="w-3.5 h-3.5 text-amber-700" />, pos: "bottom-24 right-2 md:right-8" },
    { label: "Snacks", icon: <Cookie className="w-3.5 h-3.5 text-yellow-600" />, pos: "bottom-6 right-12 md:right-20" },
  ];

  return (
    <section className="relative overflow-hidden pt-6 pb-16 md:py-20 lg:py-24">
      {/* Background Subtle Food Dot Pattern */}
      <div className="absolute top-10 left-8 opacity-30 select-none pointer-events-none hidden sm:block">
        <div className="grid grid-cols-5 gap-2.5">
          {Array.from({ length: 25 }).map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-amber-400/70 block" />
          ))}
        </div>
      </div>
      <div className="absolute bottom-10 right-8 opacity-25 select-none pointer-events-none hidden sm:block">
        <div className="grid grid-cols-4 gap-2.5">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-amber-500 block" />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/70 border border-amber-300 text-amber-900 text-xs font-bold shadow-sm">
              <span>🌟 Michelin-Trained Chefs</span>
              <span>•</span>
              <span>Fast 30-min Delivery</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-charcoal tracking-tight leading-[1.12]">
              We Serve The Taste <br />
              <span className="text-amber-500 underline decoration-amber-300 decoration-wavy decoration-2">
                You Love
              </span>{" "}
              😍
            </h1>

            <p className="text-sm sm:text-base text-charcoal-100 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              There is a type of restaurant which typically serves food and drink, in addition to light refreshment such as baked goods or snacks. Crafted with passion, fresh ingredients, and love.
            </p>

            {/* CTA Buttons matching mockup */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/menu"
                className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-charcoal-dark font-black text-sm rounded-full shadow-hover hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
              >
                Explore Food
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={openSearchModal}
                className="px-7 py-3.5 bg-white hover:bg-cream-100 text-charcoal font-bold text-sm rounded-full border border-cream-200 hover:border-amber-300 shadow-sm transition-all duration-200 flex items-center gap-2"
              >
                <Search className="w-4 h-4 text-amber-500" />
                Search Menu
              </button>

              <button
                onClick={openReservationModal}
                className="px-6 py-3.5 text-xs font-bold text-charcoal-100 hover:text-amber-600 transition-colors"
              >
                Book a Table →
              </button>
            </div>

            {/* Micro Stats */}
            <div className="pt-6 border-t border-cream-200/80 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div>
                <span className="text-2xl font-black text-charcoal">50+</span>
                <p className="text-xs text-charcoal-100">Artisan Dishes</p>
              </div>
              <div>
                <span className="text-2xl font-black text-charcoal">4.9 ★</span>
                <p className="text-xs text-charcoal-100">Customer Rating</p>
              </div>
              <div>
                <span className="text-2xl font-black text-charcoal">25 min</span>
                <p className="text-xs text-charcoal-100">Avg. Delivery</p>
              </div>
            </div>
          </div>

          {/* Right Visual Column (Plate with concentric backdrop & floating badges) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Concentric Decorative Rings */}
            <div className="absolute w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] rounded-full border border-amber-200/60 bg-gradient-to-tr from-amber-100/40 via-amber-50/20 to-transparent pointer-events-none" />
            <div className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full bg-amber-50/50 -z-0 pointer-events-none" />

            {/* Main Gourmet Dish Plate */}
            <div className="relative z-10 w-[270px] h-[270px] sm:w-[380px] sm:h-[380px] rounded-full p-2 bg-white shadow-2xl transition-transform duration-500 hover:scale-105">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80"
                  alt="Gourmet Salmon Salad with Fresh Greens"
                  fill
                  priority
                  className="object-cover animate-float"
                />
              </div>
            </div>

            {/* Floating Category Pills (matching the mockup exactly) */}
            <div className="hidden sm:block absolute inset-0 z-20 pointer-events-none">
              {floatingBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className={`absolute pointer-events-auto ${badge.pos} flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-cream-200/80 transition-all duration-300 hover:scale-110 hover:border-amber-300 cursor-pointer`}
                  onClick={openSearchModal}
                >
                  <div className="w-6 h-6 rounded-full bg-cream-100 flex items-center justify-center">
                    {badge.icon}
                  </div>
                  <span className="text-xs font-bold text-charcoal">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
