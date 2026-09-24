"use client";

import React, { useState } from "react";
import Image from "next/image";
import { REVIEWS } from "@/data/mockData";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export const Testimonials: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % Math.max(1, REVIEWS.length - itemsPerPage + 1));
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? Math.max(0, REVIEWS.length - itemsPerPage) : prev - 1));
  };

  const visibleReviews = REVIEWS.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Arrows */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
              Foodie Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-charcoal tracking-tight">
              What Our Customer Says?
            </h2>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-cream-200 bg-white hover:bg-cream-100 text-charcoal flex items-center justify-center transition-colors shadow-sm active:scale-95"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-600 text-charcoal-dark flex items-center justify-center transition-colors shadow-sm active:scale-95"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-cream-100/70 hover:bg-white rounded-3xl p-6 border border-cream-200 hover:border-amber-200 transition-all duration-300 shadow-soft hover:shadow-hover flex flex-col justify-between"
            >
              <div>
                <Quote className="w-6 h-6 text-amber-400 mb-3 fill-amber-100" />
                <p className="text-xs text-charcoal-200 leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-cream-200/80">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-amber-300 shrink-0">
                  <Image
                    src={rev.userAvatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"}
                    alt={rev.userName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-black text-charcoal">{rev.userName}</h4>
                  <span className="text-[11px] text-amber-600 font-medium">★ 5.0 Verified Foodie</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
