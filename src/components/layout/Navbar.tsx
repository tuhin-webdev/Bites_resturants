"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useUIStore } from "@/store/uiStore";
import { useUserStore } from "@/store/userStore";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  UtensilsCrossed,
  Calendar,
  Menu as MenuIcon,
  X,
  ChevronDown,
  LogOut,
  Package,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { getTotalItemsCount } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { openCartDrawer, openSearchModal, openAuthModal, openReservationModal } = useUIStore();
  const { isAuthenticated, user, logout } = useUserStore();

  const cartCount = getTotalItemsCount();
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith("/admin") || pathname.startsWith("/pos")) {
    return null;
  }

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Deals", href: "/deals" },
    { label: "Reservation", href: "/reservation" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-cream-200/80 py-3.5"
            : "bg-[#FCFBF7] py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              <UtensilsCrossed className="w-5 h-5 text-charcoal-dark stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-tight text-charcoal flex items-center gap-1">
                Bites<span className="w-2 h-2 rounded-full bg-amber-500 inline-block animate-pulse"></span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-all relative py-1 ${
                    isActive
                      ? "text-charcoal font-black"
                      : "text-charcoal-100 hover:text-amber-600"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                  )}
                </Link>
              );
            })}
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-600 text-xs font-bold hover:bg-[#FF6B00] hover:text-white transition-all shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
              FoodDesk POS
            </Link>
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={openSearchModal}
              className="p-2.5 rounded-full hover:bg-cream-100 text-charcoal hover:text-amber-600 transition-colors border border-transparent hover:border-cream-200"
              aria-label="Search food dishes"
              title="Search (Cmd + K)"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Trigger */}
            <Link
              href="/dashboard?tab=wishlist"
              className="relative p-2.5 rounded-full hover:bg-cream-100 text-charcoal hover:text-red-500 transition-colors border border-transparent hover:border-cream-200 hidden sm:flex"
              aria-label="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {mounted && wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scale">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={openCartDrawer}
              className="relative p-2.5 rounded-full bg-cream-100 hover:bg-amber-100 text-charcoal transition-all border border-cream-200 hover:border-amber-300"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-charcoal" />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-amber-500 text-charcoal-dark font-black text-[11px] px-1.5 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile / Auth Dropdown */}
            <div className="relative">
              {mounted && isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-1.5 pl-2.5 pr-2 rounded-full border border-cream-200 hover:border-amber-300 bg-white shadow-sm transition-all"
                    aria-label="User Account Menu"
                  >
                    <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 font-bold text-xs flex items-center justify-center">
                      {user.name ? user.name.charAt(0) : "U"}
                    </div>
                    <span className="text-xs font-bold text-charcoal max-w-[80px] truncate hidden lg:inline">
                      {user.name?.split(" ")[0]}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-cream-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <div className="px-4 py-2.5 border-b border-cream-100">
                        <p className="text-xs font-bold text-charcoal truncate">{user.name}</p>
                        <p className="text-[11px] text-charcoal-50 truncate">{user.email}</p>
                      </div>

                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-charcoal hover:bg-cream-50 hover:text-amber-600 transition-colors"
                      >
                        <User className="w-4 h-4 text-amber-500" />
                        My Profile & Addresses
                      </Link>

                      <Link
                        href="/dashboard?tab=orders"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-charcoal hover:bg-cream-50 hover:text-amber-600 transition-colors"
                      >
                        <Package className="w-4 h-4 text-amber-500" />
                        Order History & Tracking
                      </Link>

                      <Link
                        href="/dashboard?tab=wishlist"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-charcoal hover:bg-cream-50 hover:text-amber-600 transition-colors"
                      >
                        <Heart className="w-4 h-4 text-amber-500" />
                        Wishlist ({wishlistCount})
                      </Link>

                      <div className="border-t border-cream-100 my-1" />

                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => openAuthModal("login")}
                  className="p-2 sm:px-4 sm:py-2 rounded-full border border-cream-200 hover:border-amber-300 bg-white text-charcoal font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <User className="w-4 h-4 text-amber-500" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}
            </div>

            {/* Reserve Table Pill CTA (From mockup) */}
            <button
              onClick={openReservationModal}
              className="hidden sm:inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-charcoal-dark font-black text-xs px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
              Reserve Table
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-charcoal hover:bg-cream-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-cream-200 px-5 py-4 space-y-3 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm font-semibold py-2 px-3 rounded-xl transition-colors ${
                    pathname === link.href
                      ? "bg-amber-50 text-amber-700 font-bold"
                      : "text-charcoal hover:bg-cream-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-cream-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openReservationModal();
                }}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-charcoal-dark font-bold text-xs rounded-full flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Reserve Table Now
              </button>

              {!isAuthenticated && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openAuthModal("login");
                  }}
                  className="w-full py-2.5 bg-cream-100 text-charcoal font-bold text-xs rounded-full"
                >
                  Sign In / Register
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
