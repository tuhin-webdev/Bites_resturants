"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePOSStore } from "@/store/posStore";
import { POS_CATEGORIES } from "@/data/posData";
import {
  Plus,
  Search,
  Trash2,
  Edit,
  Tag,
  Star,
  Check,
  ShoppingBag,
  Filter,
} from "lucide-react";

export const MenuManagement: React.FC = () => {
  const { dishes, deleteDish, addToCart, setIsAddDishModalOpen } = usePOSStore();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredDishes = dishes.filter((d) => {
    const matchCat =
      selectedCategory === "All" ||
      d.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchSearch =
      search.trim() === "" ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Menu & Catalog Management</h1>
          <p className="text-xs text-gray-500">
            Configure dishes, adjust pricing, and expand restaurant offerings
          </p>
        </div>
        <button
          onClick={() => setIsAddDishModalOpen(true)}
          className="py-3 px-5 rounded-2xl bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-[#FF6B00]/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add New Dish
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search menu item..."
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#FF6B00]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          {["All", "Burger", "Pizza", "Pasta", "Chicken", "Drinks"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-gray-900 text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Dishes Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/70 border-b border-gray-100 text-xs text-gray-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">Dish Details</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Selling Price</th>
                <th className="py-4 px-4">Badge / Promo</th>
                <th className="py-4 px-4">Rating</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredDishes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-400 text-xs">
                    No menu items found.
                  </td>
                </tr>
              ) : (
                filteredDishes.map((dish) => (
                  <tr key={dish.id} className="hover:bg-gray-50/50 transition-colors">
                    {/* Details */}
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image src={dish.image} alt={dish.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{dish.name}</p>
                          <p className="text-gray-400 text-xs">ID: {dish.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                        {dish.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-bold text-gray-900">৳{dish.price.toFixed(0)}</span>
                        {dish.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            ৳{dish.originalPrice.toFixed(0)}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Badge */}
                    <td className="py-3 px-4">
                      {dish.badge ? (
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          {dish.badge}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">—</span>
                      )}
                    </td>

                    {/* Rating */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-xs font-semibold text-gray-800">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{dish.rating || 5.0}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() =>
                            addToCart({
                              id: dish.id,
                              name: dish.name,
                              price: dish.price,
                              image: dish.image,
                              category: dish.category,
                            })
                          }
                          title="Add to Current Order"
                          className="w-8 h-8 rounded-lg bg-orange-50 hover:bg-[#FF6B00] text-[#FF6B00] hover:text-white flex items-center justify-center transition-colors"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to remove "${dish.name}"?`)) {
                              deleteDish(dish.id);
                            }
                          }}
                          title="Delete Dish"
                          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-600 flex items-center justify-center transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
