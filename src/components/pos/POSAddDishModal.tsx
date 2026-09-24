"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePOSStore } from "@/store/posStore";
import { POSDish } from "@/data/posData";
import {
  X,
  Plus,
  Utensils,
  Tag,
  UploadCloud,
  CheckCircle2,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";

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
  const [price, setPrice] = useState("350");
  const [originalPrice, setOriginalPrice] = useState("420");
  const [badge, setBadge] = useState("");
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  if (!isAddDishModalOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadSuccess(false);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "bites_pos_dishes");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        setImageUrl(data.url);
        setUploadSuccess(true);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload image. Please try again or select a preset photo.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newDish: POSDish = {
      id: `dish-custom-${Date.now()}`,
      name: name.trim(),
      category,
      price: parseFloat(price) || 350,
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
    setUploadSuccess(false);
    setIsAddDishModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-gray-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00]">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Add Menu Dish</h2>
              <p className="text-xs text-gray-500">Insert custom dish with Cloudinary image storage</p>
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
              placeholder="e.g. Smoky Naga BBQ Burger"
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
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Selling Price (৳) *</label>
              <input
                type="number"
                step="10"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="350"
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
                placeholder="e.g. 15% Off, Exclusive, Hot"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B00]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Regular Price (৳) (Optional)</label>
              <input
                type="number"
                step="10"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="420"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B00]"
              />
            </div>
          </div>

          {/* Cloudinary Image Upload Section */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-gray-700">
                Dish Photo (Upload to Cloudinary or Pick Preset)
              </label>
              {uploadSuccess && (
                <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Uploaded to Cloudinary
                </span>
              )}
            </div>

            {/* Custom file upload input */}
            <div className="relative border-2 border-dashed border-gray-200 hover:border-[#FF6B00] rounded-2xl p-3 text-center transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 text-[#FF6B00] animate-spin" />
                    <span className="font-semibold text-[#FF6B00]">Uploading to Cloudinary storage...</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4 text-[#FF6B00]" />
                    <span className="font-semibold text-gray-700">Click to upload photo to Cloudinary</span>
                  </>
                )}
              </div>
            </div>

            {/* Preset Image Thumbnails */}
            <div className="grid grid-cols-6 gap-2 pt-1">
              {PRESET_IMAGES.map((img, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => {
                    setImageUrl(img.url);
                    setUploadSuccess(false);
                  }}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    imageUrl === img.url
                      ? "border-[#FF6B00] ring-2 ring-[#FF6B00]/30 scale-105"
                      : "border-gray-200 hover:border-gray-300 opacity-80 hover:opacity-100"
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
              disabled={isUploading}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FF6B00]/25 transition-all disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              Add Dish to Bites Menu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
