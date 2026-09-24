"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { Home, Utensils, ShoppingBag, Calendar, User } from "lucide-react";

export const MobileNav: React.FC = () => {
  const pathname = usePathname();
  const { getTotalItemsCount } = useCartStore();
  const { openCartDrawer, openAuthModal } = useUIStore();
  const count = getTotalItemsCount();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-cream-200 px-4 py-2 shadow-lg no-print">
      <div className="flex items-center justify-around">
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 text-[10px] font-bold py-1 px-3 rounded-xl transition-colors ${
            pathname === "/" ? "text-amber-600" : "text-charcoal-100 hover:text-charcoal"
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>

        <Link
          href="/menu"
          className={`flex flex-col items-center gap-1 text-[10px] font-bold py-1 px-3 rounded-xl transition-colors ${
            pathname.startsWith("/menu") ? "text-amber-600" : "text-charcoal-100 hover:text-charcoal"
          }`}
        >
          <Utensils className="w-5 h-5" />
          <span>Menu</span>
        </Link>

        {/* Central Cart Bubble */}
        <button
          onClick={openCartDrawer}
          className="relative -top-4 flex flex-col items-center justify-center w-12 h-12 rounded-full bg-amber-500 text-charcoal-dark shadow-lg border-4 border-white transition-transform active:scale-95"
          aria-label="View Cart"
        >
          <ShoppingBag className="w-5 h-5" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-charcoal text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {count}
            </span>
          )}
        </button>

        <Link
          href="/reservation"
          className={`flex flex-col items-center gap-1 text-[10px] font-bold py-1 px-3 rounded-xl transition-colors ${
            pathname === "/reservation" ? "text-amber-600" : "text-charcoal-100 hover:text-charcoal"
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span>Table</span>
        </Link>

        <Link
          href="/dashboard"
          className={`flex flex-col items-center gap-1 text-[10px] font-bold py-1 px-3 rounded-xl transition-colors ${
            pathname.startsWith("/dashboard") ? "text-amber-600" : "text-charcoal-100 hover:text-charcoal"
          }`}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </Link>
      </div>
    </div>
  );
};
