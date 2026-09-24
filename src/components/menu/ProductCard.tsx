"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useUIStore } from "@/store/uiStore";
import { RatingStars } from "@/components/ui/RatingStars";
import { Heart, Eye, Plus, Minus, Flame, Sparkles } from "lucide-react";

interface ProductCardProps {
  product: Product;
  highlightStyle?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, highlightStyle = false }) => {
  const [mounted, setMounted] = React.useState(false);
  const { items, addItem, updateQuantity } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { setQuickViewProduct, addToast } = useUIStore();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isFavorited = mounted ? isInWishlist(product.id) : false;
  const cartItem = items.find((item) => item.productId === product.id);
  const inCartQty = mounted && cartItem ? cartItem.quantity : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: `${product.id}-default`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      selectedSize: product.sizeOptions?.[0]?.name,
      selectedSauce: product.sauceOptions?.[0],
    });

    addToast(`Added "${product.name}" to cart! 😋`, "success");
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(cartItem.id, 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(cartItem.id, -1);
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product.id);
    addToast(
      added ? `Added "${product.name}" to wishlist ❤️` : `Removed "${product.name}" from wishlist`,
      added ? "success" : "info"
    );
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className={`group relative bg-white rounded-3xl p-5 border transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between ${
        highlightStyle
          ? "border-amber-300 shadow-hover bg-gradient-to-b from-white to-amber-50/20"
          : "border-cream-200/70 hover:border-amber-200 shadow-soft hover:shadow-hover"
      }`}
    >
      {/* Top Badges */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
        <div className="flex flex-col gap-1 items-start">
          {discountPercent > 0 && (
            <span className="pointer-events-auto inline-flex items-center gap-1 bg-amber-500 text-charcoal-dark text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
              <Sparkles className="w-3 h-3" />
              {discountPercent}% OFF
            </span>
          )}
          {product.spicyLevel > 0 && (
            <span className="pointer-events-auto inline-flex items-center gap-0.5 bg-red-50 text-red-600 border border-red-200 text-[10px] font-semibold px-2 py-0.5 rounded-full">
              <Flame className="w-2.5 h-2.5 fill-red-500" />
              {"🌶️".repeat(product.spicyLevel)}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`pointer-events-auto p-2 rounded-full transition-all duration-200 shadow-sm ${
            isFavorited
              ? "bg-red-50 text-red-500 border border-red-200"
              : "bg-white/90 text-charcoal-50 hover:text-red-500 hover:bg-white border border-gray-100"
          }`}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
        </button>
      </div>

      {/* Product Image with Quick View Hover Overlay */}
      <div className="relative w-full aspect-square my-2 rounded-2xl overflow-hidden bg-cream-50 flex items-center justify-center">
        <Link href={`/menu/${product.slug}`} className="relative w-full h-full block">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Quick View Button overlay */}
        <button
          onClick={handleQuickView}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-charcoal/80 hover:bg-charcoal text-white text-xs font-medium px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md backdrop-blur-sm"
          aria-label="Quick View dish details"
        >
          <Eye className="w-3.5 h-3.5" />
          Quick View
        </button>
      </div>

      {/* Content Details */}
      <div className="pt-2 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <RatingStars rating={product.rating} size="sm" showScore />
            <span className="text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
              {product.category}
            </span>
          </div>

          <Link href={`/menu/${product.slug}`} className="block">
            <h3 className="font-bold text-lg text-charcoal hover:text-amber-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-charcoal-100 mt-1 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Action Button */}
        <div className="mt-4 pt-3 border-t border-cream-100 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-charcoal">
                ৳{product.price.toFixed(0)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-charcoal-50 line-through">
                  ৳{product.originalPrice.toFixed(0)}
                </span>
              )}
            </div>
          </div>

          {inCartQty > 0 ? (
            <div className="inline-flex items-center bg-amber-500 rounded-full p-1 shadow-sm">
              <button
                onClick={handleDecrement}
                className="w-7 h-7 rounded-full bg-white text-charcoal hover:bg-amber-100 flex items-center justify-center transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-7 text-center font-bold text-xs text-charcoal-dark">
                {inCartQty}
              </span>
              <button
                onClick={handleIncrement}
                className="w-7 h-7 rounded-full bg-white text-charcoal hover:bg-amber-100 flex items-center justify-center transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="inline-flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-charcoal-dark font-bold text-xs px-4 py-2 rounded-full transition-all duration-200 shadow-sm hover:shadow active:scale-95"
            >
              Add To Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
