"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS, CATEGORIES } from "@/data/mockData";
import { ProductCard } from "@/components/menu/ProductCard";
import {
  SlidersHorizontal,
  Search,
  RotateCcw,
  Sparkles,
  Flame,
  ArrowUpDown,
  Filter,
} from "lucide-react";

function MenuContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [spicyLevel, setSpicyLevel] = useState<number | "all">("all");
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<"popular" | "price-asc" | "price-desc" | "rating">("popular");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const dietaryOptions = ["Veg", "Non-Veg", "Halal", "Gluten-Free", "Vegan"];

  const handleDietaryToggle = (item: string) => {
    setSelectedDietary((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setMaxPrice(100);
    setSelectedDietary([]);
    setSpicyLevel("all");
    setMinRating(0);
    setSortBy("popular");
  };

  // Filter logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory !== "All") {
        const matchesCat =
          item.category === selectedCategory ||
          item.subCategory === selectedCategory ||
          (selectedCategory === "Special Dishes" && item.isChefSpecial);
        if (!matchesCat) return false;
      }

      // Search query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesQ =
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q);
        if (!matchesQ) return false;
      }

      // Price filter
      if (item.price > maxPrice) return false;

      // Dietary filter
      if (selectedDietary.length > 0) {
        const hasAllSelectedDietary = selectedDietary.every((diet) =>
          item.dietary.includes(diet as any)
        );
        if (!hasAllSelectedDietary) return false;
      }

      // Spicy level
      if (spicyLevel !== "all" && item.spicyLevel !== spicyLevel) return false;

      // Rating filter
      if (minRating > 0 && item.rating < minRating) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      // Default: popularity
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, maxPrice, selectedDietary, spicyLevel, minRating, sortBy]);

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Banner Header */}
        <div className="mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cream-200 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
              Gourmet Dining & Takeaway
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-charcoal">
              Explore Our Full Menu
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-100 mt-1">
              Discover artisan dishes, woodfired pizzas, spicy coastal curries, and handcrafted desserts.
            </p>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="flex items-center justify-center sm:justify-end gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden px-4 py-2 rounded-full border border-cream-200 bg-white font-bold text-xs text-charcoal flex items-center gap-2 shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-500" />
              Filters ({selectedDietary.length + (selectedCategory !== "All" ? 1 : 0)})
            </button>
          </div>
        </div>

        {/* Category Horizontal Bar */}
        <div className="mb-8 flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-4 py-2 rounded-full font-bold whitespace-nowrap transition-all border ${
                  isActive
                    ? "bg-amber-500 text-charcoal-dark border-amber-500 shadow-sm scale-105"
                    : "bg-white text-charcoal-200 border-cream-200 hover:border-amber-300"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Layout: Sidebar Filters + Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Filter Sidebar */}
          <aside
            className={`lg:col-span-3 bg-white rounded-3xl p-6 border border-cream-200 shadow-soft space-y-6 ${
              isMobileFilterOpen ? "block" : "hidden lg:block"
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-cream-100">
              <h3 className="font-black text-sm text-charcoal flex items-center gap-2">
                <Filter className="w-4 h-4 text-amber-500" />
                Refine Selection
              </h3>
              <button
                onClick={handleResetFilters}
                className="text-xs text-amber-600 hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                Search Recipe
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Pasta, Burger, Garlic..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-cream-200 text-xs text-charcoal outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider">
                  Max Price:
                </label>
                <span className="text-xs font-bold text-amber-600">${maxPrice.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="15"
                max="100"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-charcoal-50 mt-1">
                <span>$15</span>
                <span>$100</span>
              </div>
            </div>

            {/* Dietary Preferences */}
            <div>
              <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2.5">
                Dietary Preferences
              </label>
              <div className="space-y-2">
                {dietaryOptions.map((diet) => {
                  const isChecked = selectedDietary.includes(diet);
                  return (
                    <label
                      key={diet}
                      className="flex items-center gap-2.5 text-xs text-charcoal-200 cursor-pointer hover:text-charcoal"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleDietaryToggle(diet)}
                        className="rounded text-amber-500 focus:ring-amber-400 accent-amber-500"
                      />
                      <span>{diet}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Spicy Level Filter */}
            <div>
              <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                Spiciness
              </label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {[
                  { label: "All", val: "all" },
                  { label: "Mild (0)", val: 0 },
                  { label: "Medium 🌶️", val: 1 },
                  { label: "Hot 🌶️🌶️", val: 2 },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setSpicyLevel(item.val as any)}
                    className={`py-1.5 px-2 rounded-xl border text-xs font-medium transition-colors ${
                      spicyLevel === item.val
                        ? "bg-amber-500 text-charcoal-dark font-bold border-amber-500"
                        : "bg-white border-cream-200 text-charcoal-200 hover:border-amber-200"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                Minimum Rating
              </label>
              <div className="flex gap-2">
                {[
                  { label: "All", val: 0 },
                  { label: "4.5+ ★", val: 4.5 },
                  { label: "4.8+ ★", val: 4.8 },
                ].map((r) => (
                  <button
                    key={r.label}
                    onClick={() => setMinRating(r.val)}
                    className={`flex-1 py-1.5 rounded-xl border text-xs font-semibold ${
                      minRating === r.val
                        ? "bg-amber-500 text-charcoal-dark border-amber-500"
                        : "bg-white border-cream-200 text-charcoal-200 hover:border-amber-200"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Product Grid Area */}
          <main className="lg:col-span-9 space-y-6">
            {/* Sorting & Result Counts Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-cream-200 shadow-xs">
              <span className="text-xs font-semibold text-charcoal-100">
                Found <strong className="text-charcoal font-bold">{filteredProducts.length}</strong> delicacies
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-bold text-charcoal flex items-center gap-1 shrink-0">
                  <ArrowUpDown className="w-3.5 h-3.5 text-amber-500" /> Sort By:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-cream-50 border border-cream-200 rounded-xl px-3 py-1.5 text-xs text-charcoal font-semibold outline-none focus:border-amber-500 cursor-pointer flex-1 sm:flex-none"
                >
                  <option value="popular">Popular Dishes</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Customer Rated</option>
                </select>
              </div>
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-cream-200 p-8 space-y-3">
                <Sparkles className="w-10 h-10 text-amber-500 mx-auto" />
                <h3 className="font-bold text-lg text-charcoal">No matching dishes found</h3>
                <p className="text-xs text-charcoal-100 max-w-sm mx-auto">
                  Try adjusting your filters or price slider to see more gourmet options.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-charcoal-dark font-bold text-xs rounded-full shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-charcoal font-bold">
          Loading gourmet menu...
        </div>
      }
    >
      <MenuContent />
    </Suspense>
  );
}
