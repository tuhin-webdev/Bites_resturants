"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/mockData";
import { ProductCard } from "@/components/menu/ProductCard";
import { ArrowRight } from "lucide-react";

export const RegularMenuPack: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Italian");

  const tabs = [
    "Special Dishes",
    "Mexican",
    "Italian",
    "Japanese",
    "Drinks",
    "Lunch",
    "All Dishes",
  ];

  // Filter products based on selected tab
  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeTab === "All Dishes") return true;
    if (activeTab === "Special Dishes") return p.isChefSpecial || p.subCategory === "Special Dishes";
    return p.category === activeTab || p.subCategory === activeTab;
  });

  // Display up to 8 cards like in the mockup
  const displayProducts = filteredProducts.slice(0, 8);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Heading */}
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
          Handcrafted Daily
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-charcoal tracking-tight">
          Our Regular Menu Pack
        </h2>
        <p className="text-xs sm:text-sm text-charcoal-100 max-w-lg mx-auto mt-2.5">
          Select your favorite culinary style to view freshly prepared appetizers, main courses, and signature desserts.
        </p>

        {/* Category Filter Pills (matching the mockup styling) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-8 mb-12">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs px-5 py-2.5 rounded-full font-bold transition-all duration-200 border ${
                  isActive
                    ? "bg-amber-500 text-charcoal-dark border-amber-500 shadow-sm scale-105"
                    : "bg-white text-charcoal-200 border-cream-200 hover:border-amber-300 hover:bg-cream-50"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* 8 Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA to browse full menu */}
        <div className="mt-12 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-cream-100 border border-cream-200 hover:border-amber-300 text-charcoal font-black text-xs rounded-full shadow-sm transition-all"
          >
            Explore Complete 50+ Menu Catalog
            <ArrowRight className="w-4 h-4 text-amber-500" />
          </Link>
        </div>
      </div>
    </section>
  );
};
