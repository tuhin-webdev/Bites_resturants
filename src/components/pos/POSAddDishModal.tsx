"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePOSStore } from "@/store/posStore";
import { POSDish } from "@/data/posData";
import { X, Plus, Utensils, Tag, DollarSign, Image as ImageIcon, Sparkles } from "lucide-react";

const PRESET_IMAGES = [
  { name: "Burger", url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80" },
  { name: "Pizza", url: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=500&q=80" },
  { name: "Pasta", url: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=80" },
  { name: "Chicken", url: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=500&q=80" },
  { name: "Ramen", url: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80" },
  { name: "Drink", url: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=80" },
];

export const POSAddDishModal: React.FC = () => {
  const { isAddDishModalOpen, setIsAddDishModalOpen, addDish } = usePOSStore();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Burger");
  const [price, setPrice] = useState("5.99");
  const [originalPrice, setOriginalPrice] = useState("");
  const [badge, setBadge] = useState("");
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);

  if (!isAddDishModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newDish: POSDish = {
      id: `dish-custom-${Date.now()}`,
      name: name.trim(),
      category,
      price: parseFloat(price) || 4.99,
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      badge: badge.trim() || undefined,
      rating: 5.0,
      image: imageUrl || PRESET_IMAGES[0].url,
      isPopular: true,
    };

    addDish(newDish);
    setName("");
    setBadge("");
    setOriginalPrice("");
    setIsAddDishModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg border border-gray-100 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00]">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Add Menu Dish</h2>
              <p className="text-xs text-gray-500">Insert custom dish directly into POS catalog</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddDishModalOpen(false)}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Dish Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Smoky BBQ Bacon Burger"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B00]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B00]"
              >
                <option value="Burger">Burger</option>
                <option value="Pizza">Pizza</option>
                <option value="Pasta">Pasta</option>
                <option value="Chicken">Chicken</option>
                <option value="Drinks">Drinks</option>
                <option value="Dessert">Dessert</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Selling Price ($) *</label>
              <input
                type="number"
                step="0.01"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="5.99"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:border-[#FF6B00]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Badge (Optional)</label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. 15% Off, Exclusive"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B00]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Regular Price (Optional)</label>
              <input
                type="number"
                step="0.01"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="6.99"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B00]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Preset Dish Photo</label>
            <div className="grid grid-cols-6 gap-2">
              {PRESET_IMAGES.map((img, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setImageUrl(img.url)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    imageUrl === img.url ? "border-[#FF6B00] ring-2 ring-[#FF6B00]/30 scale-105" : "border-gray-200 hover:border-gray-300 opacity-80 hover:opacity-100"
                  }`}
                >
                  <Image src={img.url} alt={img.name} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FF6B00]/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Dish to Catalog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
