"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CHEFS } from "@/data/mockData";
import { ChevronLeft, ChevronRight, Award } from "lucide-react";

export const MeetChefs: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % Math.max(1, CHEFS.length - itemsPerPage + 1));
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? Math.max(0, CHEFS.length - itemsPerPage) : prev - 1));
  };

  const visibleChefs = CHEFS.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="py-16 md:py-24 bg-white/60 border-t border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Arrows */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
              Culinary Masters
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-charcoal tracking-tight">
              Meet Our Chefs
            </h2>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-cream-200 bg-white hover:bg-cream-100 text-charcoal flex items-center justify-center transition-colors shadow-sm active:scale-95"
              aria-label="Previous chefs"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-600 text-charcoal-dark flex items-center justify-center transition-colors shadow-sm active:scale-95"
              aria-label="Next chefs"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chefs Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleChefs.map((chef) => (
            <div
              key={chef.id}
              className="group bg-white rounded-3xl overflow-hidden border border-cream-200 hover:border-amber-300 shadow-soft hover:shadow-hover transition-all duration-300 flex flex-col items-center text-center p-4 hover:-translate-y-1"
            >
              {/* Chef Portrait */}
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-cream-100 mb-4">
                <Image
                  src={chef.image}
                  alt={chef.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <h4 className="font-black text-base text-charcoal group-hover:text-amber-600 transition-colors">
                {chef.name}
              </h4>
              <p className="text-xs font-semibold text-amber-600 mt-0.5">{chef.role}</p>

              <div className="flex items-center gap-1.5 text-[11px] text-charcoal-100 mt-2 bg-cream-50 px-2.5 py-1 rounded-full border border-cream-200">
                <Award className="w-3 h-3 text-amber-500" />
                <span>{chef.specialty}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
