"use client";

import React, { useState } from "react";
import { PRODUCTS } from "@/data/mockData";
import { ProductCard } from "@/components/menu/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const PopularDishes: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);

  // We filter popular products
  const popularList = PRODUCTS.filter((p) => p.isPopular);
  const itemsPerPage = 4;

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % Math.max(1, popularList.length - itemsPerPage + 1));
  };

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev === 0 ? Math.max(0, popularList.length - itemsPerPage) : prev - 1
    );
  };

  const visibleDishes = popularList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Controls */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
              Top Customer Choices
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-charcoal tracking-tight">
              Popular Dishes
            </h2>
          </div>

          {/* Navigation Arrows (Matching mockup styling) */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-cream-200 bg-white hover:bg-cream-100 text-charcoal flex items-center justify-center transition-colors shadow-sm active:scale-95"
              aria-label="Previous dishes"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-600 text-charcoal-dark flex items-center justify-center transition-colors shadow-sm active:scale-95"
              aria-label="Next dishes"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleDishes.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
