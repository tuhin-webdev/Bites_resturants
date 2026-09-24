"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { PRODUCTS, REVIEWS } from "@/data/mockData";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useUIStore } from "@/store/uiStore";
import { RatingStars } from "@/components/ui/RatingStars";
import { ProductCard } from "@/components/menu/ProductCard";
import {
  Heart,
  Share2,
  Clock,
  Zap,
  Flame,
  ShieldCheck,
  Truck,
  Plus,
  Minus,
  Check,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Camera,
} from "lucide-react";
import confetti from "canvas-confetti";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();

  const product = PRODUCTS.find(
    (p) => p.slug === resolvedParams.id || p.id === resolvedParams.id
  );

  if (!product) {
    notFound();
  }

  const { addItem } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { addToast } = useUIStore();

  const isFavorited = isInWishlist(product.id);
  const images = product.gallery || [product.image];

  // Component States
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedSauce, setSelectedSauce] = useState(product.sauceOptions?.[0] || "");
  const [selectedAddons, setSelectedAddons] = useState<{ name: string; price: number }[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Reviews state
  const [productReviews, setProductReviews] = useState(
    REVIEWS.filter((r) => r.dishName === product.name || true).slice(0, 3)
  );
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Price calculations
  const sizeOption = product.sizeOptions?.[selectedSizeIndex];
  const sizeExtraPrice = sizeOption ? sizeOption.extraPrice : 0;
  const addonsTotal = selectedAddons.reduce((s, a) => s + a.price, 0);
  const unitPrice = product.price + sizeExtraPrice + addonsTotal;
  const totalPrice = unitPrice * quantity;

  // Frequently bought together companion dish
  const companionDish = PRODUCTS.find((p) => p.id !== product.id && p.category === "Drinks") || PRODUCTS[1];

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleAddToCart = (redirectCheckout = false) => {
    const cartItemId = `${product.id}-${sizeOption?.name || "std"}-${selectedSauce || "none"}-${selectedAddons
      .map((a) => a.name)
      .sort()
      .join("-")}`;

    addItem({
      id: cartItemId,
      productId: product.id,
      name: product.name,
      price: product.price + sizeExtraPrice,
      image: product.image,
      quantity,
      selectedSize: sizeOption?.name,
      selectedSauce: selectedSauce || product.sauceOptions?.[0],
      selectedAddons,
      specialInstructions: instructions.trim() || undefined,
    });

    addToast(`Added ${quantity}x "${product.name}" to cart! 🍽️`, "success");

    if (redirectCheckout) {
      router.push("/checkout");
    }
  };

  const handleAddBundle = () => {
    // Add current product
    handleAddToCart(false);
    // Add companion dish
    addItem({
      id: `${companionDish.id}-bundle`,
      productId: companionDish.id,
      name: companionDish.name,
      price: companionDish.price,
      image: companionDish.image,
      quantity: 1,
    });
    addToast(`Added Pair Feast Bundle to cart! 🥤✨`, "success");
    try {
      confetti({ particleCount: 50, spread: 50 });
    } catch {}
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewText) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      userName: newReviewAuthor,
      rating: newReviewRating,
      date: "Just now",
      dishName: product.name,
      comment: newReviewText,
      userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    };

    setProductReviews([newRev, ...productReviews]);
    setNewReviewAuthor("");
    setNewReviewText("");
    setShowReviewForm(false);
    addToast("Thank you! Your verified food review is live! 🌟", "success");
  };

  const relatedDishes = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-charcoal-100">
          <Link href="/" className="hover:text-amber-600">Home</Link>
          <span>/</span>
          <Link href="/menu" className="hover:text-amber-600">Menu</Link>
          <span>/</span>
          <Link href={`/menu?category=${encodeURIComponent(product.category)}`} className="hover:text-amber-600">
            {product.category}
          </Link>
          <span>/</span>
          <span className="font-bold text-charcoal truncate">{product.name}</span>
        </nav>

        {/* Top Product View: Gallery + Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Image Gallery with Interactive Hover Zoom */}
          <div className="lg:col-span-6 space-y-4">
            <div
              className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white shadow-soft border border-cream-200 cursor-crosshair group"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <Image
                src={images[activeImageIndex] || product.image}
                alt={product.name}
                fill
                priority
                className={`object-cover transition-transform duration-200 ${
                  isZoomed ? "scale-150" : "scale-100"
                }`}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                      }
                    : undefined
                }
              />

              <div className="absolute top-4 left-4 flex gap-2">
                {product.isChefSpecial && (
                  <span className="bg-amber-500 text-charcoal-dark font-black text-xs px-3 py-1 rounded-full shadow-sm">
                    Chef Special
                  </span>
                )}
                <span className="bg-white/90 backdrop-blur-sm text-charcoal text-xs font-semibold px-2.5 py-1 rounded-full border border-cream-200">
                  {product.dietary.join(", ")}
                </span>
              </div>
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex items-center gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? "border-amber-500 scale-105 shadow-sm"
                        : "border-cream-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Fast Food Facts */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center">
              <div className="p-3 rounded-2xl bg-white border border-cream-200 shadow-xs">
                <span className="flex items-center justify-center gap-1 text-xs font-semibold text-amber-600">
                  <Clock className="w-3.5 h-3.5" /> Prep Time
                </span>
                <p className="text-xs font-bold text-charcoal mt-1">{product.preparationTime}</p>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-cream-200 shadow-xs">
                <span className="flex items-center justify-center gap-1 text-xs font-semibold text-amber-600">
                  <Zap className="w-3.5 h-3.5" /> Energy
                </span>
                <p className="text-xs font-bold text-charcoal mt-1">{product.calories} kcal</p>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-cream-200 shadow-xs">
                <span className="flex items-center justify-center gap-1 text-xs font-semibold text-amber-600">
                  <Flame className="w-3.5 h-3.5 text-red-500" /> Heat
                </span>
                <p className="text-xs font-bold text-charcoal mt-1">
                  {product.spicyLevel === 0 ? "Mild" : "🌶️".repeat(product.spicyLevel)}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Customization & Ordering */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                  {product.category}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const added = toggleWishlist(product.id);
                      addToast(
                        added ? `Added "${product.name}" to wishlist ❤️` : `Removed from wishlist`,
                        added ? "success" : "info"
                      );
                    }}
                    className={`p-2 rounded-full border transition-colors ${
                      isFavorited
                        ? "bg-red-50 text-red-500 border-red-200"
                        : "bg-white text-charcoal-50 hover:text-red-500 border-cream-200"
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                      addToast("Link copied to clipboard! 📋", "info");
                    }}
                    className="p-2 rounded-full border border-cream-200 bg-white text-charcoal-50 hover:text-charcoal"
                    aria-label="Share"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-charcoal mt-2 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mt-2.5 text-xs">
                <RatingStars rating={product.rating} size="md" showScore reviewCount={product.reviewCount} />
                <span className="text-charcoal-50">•</span>
                <span className="font-mono text-charcoal-100">SKU: {product.sku}</span>
                <span className="text-charcoal-50">•</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {product.inStock ? "Available Now" : "Out of stock"}
                </span>
              </div>

              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-3xl font-black text-charcoal">
                  ${unitPrice.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-charcoal-50 line-through">
                    ${(product.originalPrice + sizeExtraPrice).toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-charcoal-100 mt-3 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Customization 1: Size / Portions */}
            {product.sizeOptions && (
              <div className="pt-2 border-t border-cream-200">
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                  Choose Portion Size:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {product.sizeOptions.map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedSizeIndex(idx)}
                      className={`p-3 rounded-2xl border text-xs font-semibold flex justify-between items-center transition-all ${
                        selectedSizeIndex === idx
                          ? "border-amber-500 bg-amber-50 text-charcoal font-bold shadow-sm"
                          : "border-cream-200 hover:border-amber-300 text-charcoal-200 bg-white"
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

            {/* Customization 2: Sauce */}
            {product.sauceOptions && (
              <div className="pt-2">
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                  Select Sauce / Dressing:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sauceOptions.map((sauce) => (
                    <button
                      key={sauce}
                      type="button"
                      onClick={() => setSelectedSauce(sauce)}
                      className={`text-xs px-3.5 py-2 rounded-xl border transition-all ${
                        selectedSauce === sauce
                          ? "bg-amber-500 text-charcoal-dark font-bold border-amber-500 shadow-sm"
                          : "bg-white text-charcoal-200 border-cream-200 hover:border-amber-300"
                      }`}
                    >
                      {sauce}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Customization 3: Addons */}
            {product.availableAddons && product.availableAddons.length > 0 && (
              <div className="pt-2">
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                  Optional Add-ons & Extra Flavors:
                </label>
                <div className="space-y-2">
                  {product.availableAddons.map((addon) => {
                    const isSelected = selectedAddons.some((a) => a.name === addon.name);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => handleToggleAddon(addon.name, addon.price)}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? "border-amber-500 bg-amber-50/50 text-charcoal font-semibold"
                            : "border-cream-200 hover:border-amber-200 text-charcoal-200 bg-white"
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

            {/* Customization 4: Special Cooking Notes */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5">
                Special Chef Notes:
              </label>
              <textarea
                rows={2}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="e.g. Extra crispy, dressing on the side, allergies to peanuts..."
                className="w-full text-xs p-3 rounded-2xl border border-cream-200 outline-none focus:border-amber-500 bg-white text-charcoal"
              />
            </div>

            {/* Quantity and CTA Buttons */}
            <div className="pt-4 border-t border-cream-200 space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Quantity selector */}
                <div className="inline-flex items-center bg-cream-100 rounded-full p-1 border border-cream-200 w-full sm:w-auto justify-between sm:justify-start">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 rounded-full bg-white text-charcoal hover:bg-amber-100 flex items-center justify-center transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold text-sm text-charcoal">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 rounded-full bg-white text-charcoal hover:bg-amber-100 flex items-center justify-center transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to cart */}
                <button
                  onClick={() => handleAddToCart(false)}
                  className="w-full sm:flex-1 py-4 bg-amber-500 hover:bg-amber-600 text-charcoal-dark font-black text-sm rounded-full shadow-hover hover:shadow-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart • ${totalPrice.toFixed(2)}
                </button>

                {/* Instant Buy Now */}
                <button
                  onClick={() => handleAddToCart(true)}
                  className="w-full sm:w-auto px-6 py-4 bg-charcoal hover:bg-charcoal-dark text-white font-bold text-xs rounded-full shadow-sm transition-all"
                >
                  Buy Now
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-between text-[11px] text-charcoal-100 pt-2 px-1">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-amber-500" /> Fast 30-min Hot Delivery
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Quality Guaranteed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Bought Together Bundle Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-soft">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-black text-charcoal">Frequently Bought Together</h3>
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
              Combo Deal
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 flex-wrap">
              {/* Product 1 */}
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-cream-200">
                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-charcoal">{product.name}</h4>
                  <span className="text-xs text-amber-700 font-bold">${product.price.toFixed(2)}</span>
                </div>
              </div>

              <span className="text-xl font-bold text-charcoal-50">+</span>

              {/* Product 2 Companion */}
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-cream-200">
                  <Image src={companionDish.image} alt={companionDish.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-charcoal">{companionDish.name}</h4>
                  <span className="text-xs text-amber-700 font-bold">${companionDish.price.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Bundle Action */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <div>
                <span className="text-[11px] text-charcoal-50 block">Bundle Price:</span>
                <span className="text-xl font-black text-charcoal">
                  ${(product.price + companionDish.price).toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleAddBundle}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-charcoal-dark font-black text-xs rounded-full shadow-sm active:scale-95 flex items-center gap-2"
              >
                Add Both to Cart
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Customer Reviews & Submission Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-cream-200 shadow-soft space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-cream-100 pb-6">
            <div>
              <h3 className="text-2xl font-black text-charcoal">
                Customer Reviews & Ratings
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <RatingStars rating={product.rating} size="md" showScore />
                <span className="text-xs text-charcoal-100">
                  Based on {product.reviewCount} verified foodie opinions
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-5 py-2.5 rounded-full bg-cream-100 hover:bg-amber-500 text-charcoal hover:text-charcoal-dark font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              {showReviewForm ? "Close Review Form" : "Write a Review"}
            </button>
          </div>

          {/* Review Submission Form */}
          {showReviewForm && (
            <form
              onSubmit={handleReviewSubmit}
              className="p-6 rounded-2xl bg-cream-50/80 border border-amber-200 space-y-4 animate-in fade-in"
            >
              <h4 className="font-bold text-sm text-charcoal">Share Your Culinary Experience</h4>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Your Rating</label>
                <RatingStars
                  rating={newReviewRating}
                  interactive
                  onRatingChange={(r) => setNewReviewRating(r)}
                  size="lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="e.g. Maria Sharapova"
                    className="w-full text-xs p-2.5 rounded-xl border border-cream-200 bg-white text-charcoal outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1 flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5 text-amber-500" /> Photo Upload (Optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full text-xs p-1.5 rounded-xl border border-cream-200 bg-white text-charcoal-50 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-amber-100 file:text-amber-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Your Review</label>
                <textarea
                  rows={3}
                  required
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  placeholder="How was the flavor, texture, and delivery speed?"
                  className="w-full text-xs p-3 rounded-xl border border-cream-200 bg-white text-charcoal outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-charcoal-dark font-bold text-xs rounded-full shadow-sm"
              >
                Submit Verified Review
              </button>
            </form>
          )}

          {/* Reviews List */}
          <div className="space-y-6">
            {productReviews.map((rev) => (
              <div key={rev.id} className="border-b border-cream-100 pb-6 last:border-b-0 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden border border-amber-300">
                      <Image
                        src={rev.userAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"}
                        alt={rev.userName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-charcoal">{rev.userName}</h4>
                      <span className="text-[10px] text-charcoal-50">{rev.date}</span>
                    </div>
                  </div>

                  <RatingStars rating={rev.rating} size="sm" />
                </div>

                <p className="text-xs text-charcoal-100 leading-relaxed pl-12">{rev.comment}</p>

                {rev.photos && rev.photos.length > 0 && (
                  <div className="flex gap-2 pl-12 pt-1">
                    {rev.photos.map((p, idx) => (
                      <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden border border-cream-200">
                        <Image src={p} alt="Review photo" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related Dishes Carousel */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
                You Might Also Relish
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-charcoal">Related Specialties</h3>
            </div>
            <Link
              href="/menu"
              className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              See All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedDishes.map((dish) => (
              <ProductCard key={dish.id} product={dish} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
