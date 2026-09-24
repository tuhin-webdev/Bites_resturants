"use client";

import React, { useState } from "react";
import Image from "next/image";
import { POS_CATEGORIES, POS_DISHES, POSDish } from "@/data/posData";
import { usePOSStore } from "@/store/posStore";
import {
  Heart,
  Plus,
  Star,
  Clock,
  MapPin,
  Flame,
  ArrowRight,
  Sparkles,
  Phone,
  PlusCircle,
} from "lucide-react";

export const POSCatalog: React.FC = () => {
  const {
    addToCart,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setIsAddDishModalOpen,
    dishes,
  } = usePOSStore();

  const [favorites, setFavorites] = useState<string[]>(["pos-d1", "pos-d4"]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleAdd = (dish: POSDish) => {
    addToCart({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
      category: dish.category,
    });
  };

  // Filter dishes by search & category
  const filteredDishes = dishes.filter((d) => {
    const matchesCat =
      selectedCategory === "All" ||
      selectedCategory === "all" ||
      d.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      searchQuery.trim() === "" ||
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const popularDishes = filteredDishes.filter((d) => d.isPopular || !d.isRecent).slice(0, 3);
  const recentDishes = filteredDishes.filter((d) => d.isRecent || d.distance).slice(0, 3);

  return (
    <div className="flex-1 p-5 sm:p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-60px)] bg-[#F8F9FA]">
      {/* 1. Hero Promo Dark/Fire Banner from Mockup */}
      <div className="relative rounded-3xl bg-[#141210] overflow-hidden shadow-lg border border-gray-900 text-white p-6 sm:p-8">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#FF6B00]/40 via-[#FF4500]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
          <div className="md:col-span-7 space-y-4">
            <span className="text-[#FF7A00] font-script text-xl italic font-serif tracking-wide block">
              Special
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-none text-white font-sans">
              DELICIOUS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-200">
                BURGER
              </span>
            </h2>

            <p className="text-xs font-bold uppercase tracking-widest text-[#FF7A00]">
              THE BEST BURGER IN TOWN
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={() => handleAdd(POS_DISHES[0])}
                className="px-6 py-2.5 bg-[#FF6B00] hover:bg-[#E56000] text-white font-black text-xs uppercase tracking-wider rounded-full shadow-md transition-all active:scale-95"
              >
                ORDER NOW
              </button>

              <div className="text-[11px] text-gray-400 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#FF7A00]" />
                <span>More information: <strong className="text-white">+00 123 456 789</strong></span>
              </div>
            </div>
          </div>

          {/* Right Burger Photo with flying leaves */}
          <div className="md:col-span-5 flex justify-center relative">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64">
              <Image
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80"
                alt="Delicious Burger"
                fill
                priority
                className="object-contain drop-shadow-[0_20px_25px_rgba(255,107,0,0.35)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Category Quick Filter Section from Mockup */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-base text-charcoal">Category</h3>
          <button
            onClick={() => setSelectedCategory("All")}
            className="text-xs font-bold text-gray-400 hover:text-[#FF6B00] transition-colors"
          >
            View all &gt;
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {POS_CATEGORIES.map((cat) => {
            const isSelected =
              selectedCategory.toLowerCase() === cat.id.toLowerCase() ||
              (selectedCategory === "All" && cat.id === "all");

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id === "all" ? "All" : cat.id)}
                className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                  isSelected
                    ? "bg-white border-[#FF6B00] shadow-md ring-2 ring-[#FF6B00]/20"
                    : "bg-white border-gray-100 hover:border-gray-200 shadow-xs"
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-orange-50/60 flex items-center justify-center text-2xl">
                  {cat.icon}
                </div>
                <span className={`text-xs font-bold ${isSelected ? "text-[#FF6B00]" : "text-gray-700"}`}>
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Popular Dishes Grid (3 Cards matching mockup) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="font-black text-base text-charcoal">Popular Dishes</h3>
            <button
              onClick={() => setIsAddDishModalOpen(true)}
              className="text-xs font-bold text-[#FF6B00] bg-orange-50 hover:bg-orange-100 px-2.5 py-1 rounded-full flex items-center gap-1 transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" /> + Add Dish
            </button>
          </div>
          <button
            onClick={() => setSelectedCategory("Burger")}
            className="text-xs font-bold text-gray-400 hover:text-[#FF6B00] transition-colors"
          >
            View all &gt;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularDishes.map((dish) => {
            const isFav = favorites.includes(dish.id);

            return (
              <div
                key={dish.id}
                className="bg-white rounded-3xl p-4 border border-gray-100 hover:border-orange-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Top Badge & Heart from Mockup */}
                <div className="flex items-center justify-between">
                  {dish.badge ? (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        dish.badge === "Exclusive"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-50 text-red-600 border border-red-100"
                      }`}
                    >
                      {dish.badge}
                    </span>
                  ) : (
                    <span />
                  )}

                  <button
                    onClick={() => toggleFavorite(dish.id)}
                    className="p-1 rounded-full text-gray-300 hover:text-red-500 transition-colors"
                    aria-label="Favorite"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? "fill-red-500 text-red-500" : ""}`} />
                  </button>
                </div>

                {/* Dish Photo */}
                <div className="relative w-full h-32 my-3 rounded-2xl overflow-hidden flex items-center justify-center">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Details */}
                <div className="space-y-1">
                  {/* 5 Rating Stars */}
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>

                  <h4 className="font-bold text-sm text-charcoal">{dish.name}</h4>

                  {/* Price and Orange (+) Add button from Mockup */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-black text-base text-charcoal">
                      ৳{dish.price.toFixed(0)}
                    </span>

                    <button
                      onClick={() => handleAdd(dish)}
                      className="w-7 h-7 rounded-lg bg-[#FF6B00] hover:bg-[#E56000] text-white flex items-center justify-center shadow-xs transition-transform active:scale-90"
                      aria-label={`Add ${dish.name} to order`}
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Recent Order Section (3 Cards from Mockup) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-base text-charcoal">Recent Order</h3>
          <button
            onClick={() => setSelectedCategory("All")}
            className="text-xs font-bold text-gray-400 hover:text-[#FF6B00] transition-colors"
          >
            View all &gt;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentDishes.map((dish) => {
            const isFav = favorites.includes(dish.id);

            return (
              <div
                key={dish.id}
                className="bg-white rounded-3xl p-4 border border-gray-100 hover:border-orange-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Heart in top right from mockup */}
                <div className="flex justify-end">
                  <button
                    onClick={() => toggleFavorite(dish.id)}
                    className="p-1 rounded-full text-gray-300 hover:text-red-500 transition-colors"
                    aria-label="Favorite"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? "fill-red-500 text-red-500" : ""}`} />
                  </button>
                </div>

                {/* Circular plate image */}
                <div className="relative w-28 h-28 mx-auto my-2 rounded-full overflow-hidden shadow-sm border border-gray-100">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="text-center space-y-1">
                  <h4 className="font-bold text-sm text-charcoal">{dish.name}</h4>
                  <p className="font-black text-sm text-[#FF6B00]">৳{dish.price.toFixed(0)}</p>
                  <p className="text-[10px] text-gray-400 font-medium">
                    {dish.distance || "4.97 km"} • {dish.duration || "21 min"}
                  </p>

                  <button
                    onClick={() => handleAdd(dish)}
                    className="mt-2 w-full py-1.5 bg-orange-50 hover:bg-[#FF6B00] text-[#FF6B00] hover:text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Quick Order +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
