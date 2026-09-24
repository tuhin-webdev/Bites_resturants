"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UtensilsCrossed, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { useUIStore } from "@/store/uiStore";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useUIStore();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    addToast("Thank you for subscribing! Check your email for a 15% discount code! 🎉", "success");
    setEmail("");
  };

  return (
    <footer className="bg-white border-t border-cream-200 pt-16 pb-12 mt-20 text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-cream-200">
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-amber-500 flex items-center justify-center shadow-sm">
                <UtensilsCrossed className="w-5 h-5 text-charcoal-dark stroke-[2.5]" />
              </div>
              <span className="font-black text-2xl tracking-tight text-charcoal">
                Bites<span className="w-2 h-2 rounded-full bg-amber-500 inline-block ml-0.5"></span>
              </span>
            </Link>

            <p className="text-xs text-charcoal-100 max-w-sm leading-relaxed">
              We serve the taste you love with passion and top-tier culinary excellence. Crafted daily with farm-fresh organic ingredients.
            </p>

            {/* Newsletter Subscription Form */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                Subscribe to Our Newsletter
              </h4>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Subscribed! Welcome to the Bites VIP Club.
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex max-w-sm">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-cream-50 border border-cream-200 rounded-l-full px-4 py-2.5 text-xs text-charcoal outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600 text-charcoal-dark px-4 py-2.5 rounded-r-full font-bold text-xs transition-colors flex items-center justify-center shadow-sm"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-cream-100 hover:bg-amber-500 text-charcoal hover:text-charcoal-dark flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#twitter"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full bg-cream-100 hover:bg-amber-500 text-charcoal hover:text-charcoal-dark flex items-center justify-center transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-cream-100 hover:bg-amber-500 text-charcoal hover:text-charcoal-dark flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#youtube"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-cream-100 hover:bg-amber-500 text-charcoal hover:text-charcoal-dark flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Service */}
          <div>
            <h4 className="font-bold text-sm text-charcoal mb-4">Service</h4>
            <ul className="space-y-2.5 text-xs text-charcoal-100">
              <li><Link href="/menu" className="hover:text-amber-600 transition-colors">Online Order</Link></li>
              <li><Link href="/reservation" className="hover:text-amber-600 transition-colors">Pre-Reservation</Link></li>
              <li><span className="text-charcoal-50">24/7 Delivery Hub</span></li>
              <li><Link href="/menu?category=Special+Dishes" className="hover:text-amber-600 transition-colors">Super Chef Specials</Link></li>
              <li><Link href="/deals" className="hover:text-amber-600 transition-colors">Daily Meal Bundles</Link></li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="font-bold text-sm text-charcoal mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs text-charcoal-100">
              <li><Link href="/menu" className="hover:text-amber-600 transition-colors">Menu Catalog</Link></li>
              <li><Link href="/deals" className="hover:text-amber-600 transition-colors">Deals & Coupons</Link></li>
              <li><Link href="/dashboard" className="hover:text-amber-600 transition-colors">Order Tracking</Link></li>
              <li><Link href="/reservation" className="hover:text-amber-600 transition-colors">Book Dining Table</Link></li>
              <li><Link href="/dashboard?tab=wishlist" className="hover:text-amber-600 transition-colors">Wishlist Items</Link></li>
            </ul>
          </div>

          {/* Column 4: Legal & Policy */}
          <div>
            <h4 className="font-bold text-sm text-charcoal mb-4">Policies & Help</h4>
            <ul className="space-y-2.5 text-xs text-charcoal-100">
              <li><Link href="/contact" className="hover:text-amber-600 transition-colors">Contact Support</Link></li>
              <li><span className="hover:text-amber-600 transition-colors cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-amber-600 transition-colors cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-amber-600 transition-colors cursor-pointer">Refund & Cancel Policy</span></li>
              <li><span className="hover:text-amber-600 transition-colors cursor-pointer">Hygiene Certifications</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Payment Badges & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-100">
          <p>© {new Date().getFullYear()} Bites Restaurant & Food E-Commerce. All rights reserved.</p>

          {/* Payment Badges */}
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-[11px] font-semibold text-charcoal-50 mr-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Secure Payments:
            </span>
            <span className="px-2.5 py-1 rounded-md bg-cream-100 font-bold text-[11px] text-blue-900 border border-blue-200">
              VISA
            </span>
            <span className="px-2.5 py-1 rounded-md bg-cream-100 font-bold text-[11px] text-orange-600 border border-orange-200">
              Mastercard
            </span>
            <span className="px-2.5 py-1 rounded-md bg-pink-50 font-bold text-[11px] text-pink-600 border border-pink-200">
              bKash
            </span>
            <span className="px-2.5 py-1 rounded-md bg-amber-50 font-bold text-[11px] text-orange-700 border border-orange-200">
              Nagad
            </span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-50 font-bold text-[11px] text-emerald-800 border border-emerald-200">
              Cash on Delivery
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
