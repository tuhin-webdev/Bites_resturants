"use client";

import React from "react";
import Image from "next/image";
import { Smartphone, Download, Play } from "lucide-react";

export const AppDownload: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-4xl bg-[#FAF6ED] border border-amber-200/80 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200/60 text-amber-900 text-xs font-bold">
                <Smartphone className="w-3.5 h-3.5 text-amber-700" />
                <span>Bites Mobile iOS & Android App</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-charcoal tracking-tight leading-tight">
                Never Feel Hungry! <br />
                Download Our Mobile App <br />
                <span className="text-amber-500">Enjoy Delicious Foods</span>
              </h2>

              <p className="text-xs sm:text-sm text-charcoal-100 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Order your favorites in one tap, track live kitchen prep and rider GPS in real time, and unlock exclusive app-only deals and loyalty perks!
              </p>

              {/* App Store Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#appstore"
                  className="flex items-center gap-3 bg-charcoal hover:bg-black text-white px-5 py-3 rounded-2xl transition-transform hover:-translate-y-0.5 shadow-md active:scale-95"
                >
                  <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.64 1.35-.58.65-.99 1.7-0.88 2.73 1.01.08 2.05-.51 2.59-1.23z" />
                  </svg>
                  <div className="text-left">
                    <span className="text-[10px] text-gray-300 block uppercase tracking-wider">Download on the</span>
                    <strong className="text-xs font-bold block">App Store</strong>
                  </div>
                </a>

                <a
                  href="#googleplay"
                  className="flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-charcoal-dark px-5 py-3 rounded-2xl transition-transform hover:-translate-y-0.5 shadow-md active:scale-95"
                >
                  <Play className="w-5 h-5 fill-charcoal-dark" />
                  <div className="text-left">
                    <span className="text-[10px] text-amber-950 block uppercase tracking-wider">Get it on</span>
                    <strong className="text-xs font-bold block">Google Play</strong>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Phone Mockup */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              {/* Smartphone Frame */}
              <div className="relative w-64 sm:w-72 h-[480px] bg-charcoal rounded-[45px] p-3 shadow-2xl border-4 border-amber-300/40 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                {/* Speaker notch */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-4 bg-charcoal-dark rounded-full z-30" />

                {/* Inner Screen */}
                <div className="w-full h-full bg-[#FCFBF7] rounded-[36px] overflow-hidden flex flex-col p-4 pt-8 text-charcoal relative">
                  <div className="flex items-center justify-between pb-3 border-b border-cream-200">
                    <span className="font-black text-xs text-charcoal flex items-center gap-1">
                      🍔 Bites
                    </span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                      App v2.4
                    </span>
                  </div>

                  <div className="mt-3">
                    <h5 className="font-black text-sm text-charcoal leading-snug">
                      We Serve The Taste <br />You Love 😍
                    </h5>
                    <p className="text-[10px] text-charcoal-50 mt-1">
                      Quick order from nearby gourmet kitchen.
                    </p>
                  </div>

                  {/* App Screen Mini Plate */}
                  <div className="relative w-full h-32 rounded-2xl overflow-hidden mt-3 shadow-inner">
                    <Image
                      src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
                      alt="Salmon Salad"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* App Quick CTA */}
                  <div className="mt-4 p-2.5 rounded-xl bg-amber-500 text-charcoal-dark text-center font-bold text-xs shadow-sm">
                    Order In App (20% OFF)
                  </div>

                  <div className="mt-auto text-center text-[9px] text-charcoal-50 pb-1">
                    4.9 ★ Rating over 40k+ reviews
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
