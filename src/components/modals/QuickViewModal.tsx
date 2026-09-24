"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUIStore } from "@/store/uiStore";
import { useCartStore } from "@/store/cartStore";
import { RatingStars } from "@/components/ui/RatingStars";
import { X, Flame, Clock, Zap, Plus, Minus, ArrowRight, Check } from "lucide-react";

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToast } = useUIStore();
  const { addItem } = useCartStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedSauce, setSelectedSauce] = useState<string>("");
  const [selectedAddons, setSelectedAddons] = useState<{ name: string; price: number }[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState("");

  if (!quickViewProduct) return null;

  const images = quickViewProduct.gallery || [quickViewProduct.image];
  const sizeOption = quickViewProduct.sizeOptions?.[selectedSizeIndex];
  const sizeExtraPrice = sizeOption ? sizeOption.extraPrice : 0;
  const addonsTotal = selectedAddons.reduce((sum, item) => sum + item.price, 0);
  const unitPrice = quickViewProduct.price + sizeExtraPrice + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const handleToggleAddon = (name: string, price: number) => {
    setSelectedAddons((prev) => {
      const exists = prev.some((a) => a.name === name);
      if (exists) {
        return prev.filter((a) => a.name !== name);
      } else {
        return [...prev, { name, price }];
      }
    });
  };

  const handleAddToCart = () => {
    const cartItemId = `${quickViewProduct.id}-${sizeOption?.name || "std"}-${selectedSauce || "none"}-${selectedAddons
      .map((a) => a.name)
      .sort()
      .join("-")}`;

    addItem({
      id: cartItemId,
      productId: quickViewProduct.id,
      name: quickViewProduct.name,
      price: quickViewProduct.price + sizeExtraPrice,
      image: quickViewProduct.image,
      quantity,
      selectedSize: sizeOption?.name,
      selectedSauce: selectedSauce || quickViewProduct.sauceOptions?.[0],
      selectedAddons,
      specialInstructions: instructions.trim() || undefined,
    });

    addToast(`Added ${quantity}x "${quickViewProduct.name}" to cart! 😋`, "success");
    setQuickViewProduct(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Dish Quick View"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm transition-opacity overflow-y-auto"
      onClick={() => setQuickViewProduct(null)}
    >
      <div
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-cream-200 transform animate-in fade-in zoom-in-95 duration-200 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative grid grid-cols-1 md:grid-cols-2">
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-cream-100 text-charcoal border border-cream-200 transition-colors shadow-sm"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Image Gallery */}
          <div className="p-6 bg-cream-50/60 flex flex-col justify-between border-b md:border-b-0 md:border-r border-cream-200">
            <div>
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-sm border border-cream-100">
                <Image
                  src={images[activeImageIndex] || quickViewProduct.image}
                  alt={quickViewProduct.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 mt-3">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx ? "border-amber-500 scale-105" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt="thumbnail" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Nutrition / Fast Facts */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-cream-200 text-center">
              <div className="p-2 rounded-xl bg-white border border-cream-200/80">
                <span className="flex items-center justify-center text-amber-600 gap-1 text-[11px] font-semibold">
                  <Clock className="w-3 h-3" /> Time
                </span>
                <p className="text-xs font-bold text-charcoal mt-0.5">{quickViewProduct.preparationTime}</p>
              </div>
              <div className="p-2 rounded-xl bg-white border border-cream-200/80">
                <span className="flex items-center justify-center text-amber-600 gap-1 text-[11px] font-semibold">
                  <Zap className="w-3 h-3" /> Calories
                </span>
                <p className="text-xs font-bold text-charcoal mt-0.5">{quickViewProduct.calories} kcal</p>
              </div>
              <div className="p-2 rounded-xl bg-white border border-cream-200/80">
                <span className="flex items-center justify-center text-amber-600 gap-1 text-[11px] font-semibold">
                  <Flame className="w-3 h-3 text-red-500" /> Spice
                </span>
                <p className="text-xs font-bold text-charcoal mt-0.5">
                  {quickViewProduct.spicyLevel === 0 ? "Mild" : "🌶️".repeat(quickViewProduct.spicyLevel)}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Customization & Actions */}
          <div className="p-6 md:p-8 flex flex-col justify-between max-h-[80vh] overflow-y-auto">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                  {quickViewProduct.category}
                </span>
                <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {quickViewProduct.inStock ? "Fresh & Available" : "Sold Out"}
                </span>
              </div>

              <h2 className="text-2xl font-black text-charcoal leading-tight">
                {quickViewProduct.name}
              </h2>

              <div className="flex items-center gap-3 mt-2">
                <RatingStars rating={quickViewProduct.rating} size="md" showScore reviewCount={quickViewProduct.reviewCount} />
                <span className="text-xs text-charcoal-50">• SKU: {quickViewProduct.sku}</span>
              </div>

              <p className="text-xs sm:text-sm text-charcoal-100 mt-3 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Portion Sizes */}
              {quickViewProduct.sizeOptions && (
                <div className="mt-5">
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                    Select Portion Size:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {quickViewProduct.sizeOptions.map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedSizeIndex(idx)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-left flex justify-between items-center transition-all ${
                          selectedSizeIndex === idx
                            ? "border-amber-500 bg-amber-50/50 text-charcoal font-bold shadow-sm"
                            : "border-cream-200 hover:border-amber-300 text-charcoal-200"
                        }`}
                      >
                        <span>{opt.name}</span>
                        {opt.extraPrice !== 0 && (
                          <span className="text-amber-700 font-bold">
                            {opt.extraPrice > 0 ? `+$${opt.extraPrice.toFixed(2)}` : `-$${Math.abs(opt.extraPrice).toFixed(2)}`}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sauce Selection */}
              {quickViewProduct.sauceOptions && (
                <div className="mt-4">
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                    Choice of Sauce:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.sauceOptions.map((sauce, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedSauce(sauce)}
                        className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                          (selectedSauce || quickViewProduct.sauceOptions?.[0]) === sauce
                            ? "bg-amber-500 text-charcoal-dark font-bold border-amber-500"
                            : "bg-white text-charcoal-200 border-cream-200 hover:border-amber-300"
                        }`}
                      >
                        {sauce}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Addons Selection */}
              {quickViewProduct.availableAddons && quickViewProduct.availableAddons.length > 0 && (
                <div className="mt-4">
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                    Add-ons & Extras:
                  </label>
                  <div className="space-y-2">
                    {quickViewProduct.availableAddons.map((addon) => {
                      const isSelected = selectedAddons.some((a) => a.name === addon.name);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => handleToggleAddon(addon.name, addon.price)}
                          className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                            isSelected
                              ? "border-amber-500 bg-amber-50/40 text-charcoal font-semibold"
                              : "border-cream-200 hover:border-amber-200 text-charcoal-200"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 text-xs">
                            <div
                              className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                                isSelected ? "bg-amber-500 border-amber-500 text-charcoal-dark" : "border-gray-300"
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span>{addon.name}</span>
                          </div>
                          <span className="text-xs font-bold text-amber-700">
                            +${addon.price.toFixed(2)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Special Cooking Notes */}
              <div className="mt-4">
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5">
                  Chef Notes / Cooking Preference:
                </label>
                <input
                  type="text"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. Less salt, dressing on the side, extra crispy..."
                  className="w-full text-xs p-2.5 rounded-xl border border-cream-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-200 outline-none text-charcoal"
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-cream-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center bg-cream-100 rounded-full p-1 border border-cream-200">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full bg-white text-charcoal hover:bg-amber-100 flex items-center justify-center transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center font-bold text-sm text-charcoal">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-full bg-white text-charcoal hover:bg-amber-100 flex items-center justify-center transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div>
                  <span className="text-[11px] text-charcoal-50 block">Total Price:</span>
                  <span className="text-xl font-black text-charcoal">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddToCart}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-charcoal-dark font-black text-sm rounded-full shadow-md transition-all active:scale-95"
                >
                  Add to Cart
                </button>
                <Link
                  href={`/menu/${quickViewProduct.slug}`}
                  onClick={() => setQuickViewProduct(null)}
                  className="p-3 rounded-full border border-cream-200 hover:bg-cream-100 text-charcoal-200 transition-colors"
                  aria-label="View full product page"
                  title="View full product details"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
