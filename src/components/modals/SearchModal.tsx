"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUIStore } from "@/store/uiStore";
import { PRODUCTS, CATEGORIES } from "@/data/mockData";
import { useCartStore } from "@/store/cartStore";
import { Search, X, Flame, ArrowRight, ShoppingBag } from "lucide-react";

export const SearchModal: React.FC = () => {
  const { isSearchModalOpen, closeSearchModal, addToast } = useUIStore();
  const { addItem } = useCartStore();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setSelectedCategory("All");
    }
  }, [isSearchModalOpen]);

  // Keyboard shortcut Cmd+K or Ctrl+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        useUIStore.getState().openSearchModal();
      }
      if (e.key === "Escape" && isSearchModalOpen) {
        closeSearchModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchModalOpen, closeSearchModal]);

  if (!isSearchModalOpen) return null;

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      query.trim() === "" ||
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.dietary.some((d) => d.toLowerCase().includes(query.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Dishes and Menu"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-charcoal/60 backdrop-blur-sm transition-opacity"
      onClick={closeSearchModal}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-cream-200 transform transition-all animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative p-4 sm:p-5 border-b border-cream-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-500 shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pasta, burger, salad, vegan, spicy..."
            className="w-full text-base sm:text-lg bg-transparent border-none outline-none text-charcoal placeholder-charcoal-50"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-gray-400 hover:text-gray-600 p-1"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={closeSearchModal}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-charcoal transition-colors"
            aria-label="Close search modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Category Chips */}
        <div className="px-5 py-3 bg-cream-50/70 border-b border-cream-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs font-semibold text-charcoal-100 shrink-0 mr-1">Categories:</span>
          {CATEGORIES.slice(0, 6).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1 rounded-full whitespace-nowrap transition-colors font-medium ${
                selectedCategory === cat
                  ? "bg-amber-500 text-charcoal-dark font-bold shadow-sm"
                  : "bg-white text-charcoal-200 hover:bg-cream-100 border border-cream-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 space-y-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm font-medium text-charcoal-100">
                No delicious dishes found matching &quot;{query}&quot;
              </p>
              <p className="text-xs text-charcoal-50 mt-1">
                Try searching for &quot;Pasta&quot;, &quot;Shawarma&quot;, &quot;Curry&quot;, or browse the full menu.
              </p>
            </div>
          ) : (
            filteredProducts.map((dish) => (
              <div
                key={dish.id}
                className="group flex items-center justify-between gap-4 p-3 rounded-2xl hover:bg-cream-50/80 transition-colors border border-transparent hover:border-amber-100"
              >
                <Link
                  href={`/menu/${dish.slug}`}
                  onClick={closeSearchModal}
                  className="flex items-center gap-3.5 flex-1 min-w-0"
                >
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-cream-100 shrink-0 border border-gray-100">
                    <Image src={dish.image} alt={dish.name} fill className="object-cover" />
                  </div>
                  <div className="truncate">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-charcoal group-hover:text-amber-600 transition-colors truncate">
                        {dish.name}
                      </h4>
                      {dish.spicyLevel > 0 && (
                        <span className="text-[10px] text-red-500 flex items-center">
                          <Flame className="w-3 h-3 fill-red-500" />
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-charcoal-100 mt-0.5">
                      <span>{dish.category}</span>
                      <span>•</span>
                      <span className="text-amber-600 font-semibold">★ {dish.rating}</span>
                      <span>•</span>
                      <span className="font-bold text-charcoal">${dish.price.toFixed(2)}</span>
                    </div>
                  </div>
                </Link>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      addItem({
                        id: `${dish.id}-default`,
                        productId: dish.id,
                        name: dish.name,
                        price: dish.price,
                        image: dish.image,
                        quantity: 1,
                      });
                      addToast(`Added "${dish.name}" to cart! 🍽️`);
                    }}
                    className="p-2 rounded-full bg-cream-100 hover:bg-amber-500 text-charcoal hover:text-charcoal-dark transition-colors"
                    aria-label={`Add ${dish.name} to cart`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  <Link
                    href={`/menu/${dish.slug}`}
                    onClick={closeSearchModal}
                    className="p-2 text-charcoal-50 hover:text-amber-600 transition-colors"
                    aria-label={`View details for ${dish.name}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-cream-50 border-t border-cream-100 flex items-center justify-between text-xs text-charcoal-100 px-5">
          <span>
            Showing <strong className="text-charcoal">{filteredProducts.length}</strong> delicacies
          </span>
          <Link
            href="/menu"
            onClick={closeSearchModal}
            className="font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
          >
            Browse Full Menu <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
