"use client";

import React from "react";
import Image from "next/image";
import { useUIStore } from "@/store/uiStore";
import { Calendar, Sparkles } from "lucide-react";

export const ReserveBanner: React.FC = () => {
  const { openReservationModal } = useUIStore();

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-4xl bg-gradient-to-r from-amber-100/70 via-amber-50 to-cream-100 p-8 sm:p-12 lg:p-16 overflow-hidden border border-amber-200/60 shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-amber-200 text-amber-800 text-[11px] font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Evening Dining & Family Banquets</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-charcoal tracking-tight leading-tight">
                Do You Have Any Dinner <br className="hidden sm:block" />
                Plan Today? <span className="text-amber-600">Reserve Your Table</span>
              </h2>

              <p className="text-xs sm:text-sm text-charcoal-100 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Make online reservation, explore our dinner specials, and enjoy candle-light private seating with your loved ones. Guarantee your favorite spot ahead of time.
              </p>

              <div className="pt-2">
                <button
                  onClick={openReservationModal}
                  className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-charcoal-dark font-black text-xs rounded-full shadow-hover hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 inline-flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 stroke-[2.5]" />
                  Make Reservation
                </button>
              </div>
            </div>

            {/* Right Visual: Circular Claypot Dish */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              {/* Radial Graphic Backdrop */}
              <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border-4 border-dashed border-amber-300/60 pointer-events-none" />

              <div className="relative z-10 w-52 h-52 sm:w-72 sm:h-72 rounded-full overflow-hidden border-8 border-white shadow-2xl transition-transform duration-500 hover:scale-105">
                <Image
                  src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80"
                  alt="Traditional Claypot Dinner Roast"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
