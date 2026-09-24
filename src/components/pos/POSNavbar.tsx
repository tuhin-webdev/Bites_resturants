"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePOSStore } from "@/store/posStore";
import {
  UtensilsCrossed,
  MapPin,
  Search,
  Bell,
  ChevronDown,
  ExternalLink,
  Store,
  Layers,
  Settings,
  LogOut,
  User,
  Sliders,
} from "lucide-react";

export const POSNavbar: React.FC = () => {
  const { searchQuery, setSearchQuery, activeView, setActiveView } = usePOSStore();
  const [selectedLocation, setSelectedLocation] = useState("India");
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const locations = ["India", "Downtown Main Hub", "Airport Boulevard", "Gulshan Express"];

  return (
    <header className="bg-[#FF6B00] text-white px-4 sm:px-6 py-3 sticky top-0 z-50 shadow-md">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Brand Logo + Location Selector */}
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <span className="font-black text-2xl tracking-tight text-white">
              FoodDesk<span className="text-amber-200">.</span>
            </span>
          </Link>

          {/* Location Selector Pill from Mockup */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setIsLocationMenuOpen(!isLocationMenuOpen)}
              className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors backdrop-blur-sm border border-white/20"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-200" />
              <span>{selectedLocation}</span>
              <ChevronDown className="w-3 h-3 opacity-80" />
            </button>

            {isLocationMenuOpen && (
              <div
                className="absolute left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 text-charcoal z-50 text-xs animate-in fade-in"
                onClick={() => setIsLocationMenuOpen(false)}
              >
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setSelectedLocation(loc)}
                    className="w-full text-left px-4 py-2 hover:bg-amber-50 hover:text-amber-700 font-medium transition-colors"
                  >
                    📍 {loc}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Search Bar from Mockup */}
        <div className="flex-1 max-w-lg hidden sm:block">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-4 h-4 text-white/70" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What do you want to eat today..."
              className="w-full pl-11 pr-4 py-2 rounded-full bg-white/20 hover:bg-white/25 focus:bg-white text-white focus:text-charcoal placeholder-white/80 focus:placeholder-gray-400 text-xs font-medium outline-none border border-white/30 focus:border-white transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Right: Quick Storefront Switcher, Notifications, Profile */}
        <div className="flex items-center gap-3">
          {/* Quick link to Customer Storefront */}
          <Link
            href="/"
            target="_blank"
            className="hidden lg:flex items-center gap-1.5 bg-black/20 hover:bg-black/30 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors border border-white/10"
            title="Open customer online ordering website"
          >
            <Store className="w-3.5 h-3.5 text-amber-200" />
            <span>Storefront</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </Link>

          {/* Quick View Mode Switcher Pills */}
          <div className="hidden xl:flex items-center bg-black/15 p-0.5 rounded-full border border-white/10 text-[11px] font-bold">
            <button
              onClick={() => setActiveView("pos")}
              className={`px-3 py-1 rounded-full transition-all ${
                activeView === "pos" ? "bg-white text-[#FF6B00] shadow-sm" : "text-white/90 hover:text-white"
              }`}
            >
              POS Terminal
            </button>
            <button
              onClick={() => setActiveView("kitchen")}
              className={`px-3 py-1 rounded-full transition-all ${
                activeView === "kitchen" ? "bg-white text-[#FF6B00] shadow-sm" : "text-white/90 hover:text-white"
              }`}
            >
              Kitchen (KDS)
            </button>
            <button
              onClick={() => setActiveView("analytics")}
              className={`px-3 py-1 rounded-full transition-all ${
                activeView === "analytics" ? "bg-white text-[#FF6B00] shadow-sm" : "text-white/90 hover:text-white"
              }`}
            >
              Analytics
            </button>
          </div>

          {/* Notification Bell */}
          <button
            className="relative p-2 rounded-full hover:bg-white/20 transition-colors text-white"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-amber-200 rounded-full animate-ping" />
          </button>

          {/* Admin Profile Avatar & Dropdown from Mockup */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-white/15 transition-colors border border-white/20"
            >
              <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
                  alt="Joshua Admin"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xs font-bold text-white hidden sm:inline">Joshua &gt;</span>
            </button>

            {isProfileMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 text-charcoal z-50 text-xs animate-in fade-in"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="font-bold text-charcoal">Joshua Miller</p>
                  <span className="text-[10px] text-gray-500">General POS Manager</span>
                </div>
                <button
                  onClick={() => setActiveView("menu_mgmt")}
                  className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-charcoal font-medium"
                >
                  <Layers className="w-3.5 h-3.5 text-[#FF6B00]" /> Menu Management
                </button>
                <button
                  onClick={() => setActiveView("analytics")}
                  className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-charcoal font-medium"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#FF6B00]" /> Store Analytics
                </button>
                <Link
                  href="/"
                  className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-charcoal font-medium"
                >
                  <Store className="w-3.5 h-3.5 text-[#FF6B00]" /> Switch to Storefront
                </Link>
                <div className="border-t border-gray-100 my-1" />
                <button
                  onClick={() => alert("Logged out from FoodDesk POS Terminal")}
                  className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-600 font-semibold"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
