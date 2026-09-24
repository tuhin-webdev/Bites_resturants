"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Calendar,
  Clock,
  Sparkles,
  ShieldCheck,
  Award,
  ArrowRight,
} from "lucide-react";

export const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: <ShoppingBag className="w-5 h-5 text-amber-500" />,
      title: "Online Order",
      desc: "Instant live cart with 30-min express doorstep delivery.",
    },
    {
      icon: <Calendar className="w-5 h-5 text-amber-500" />,
      title: "Pre-Reservation",
      desc: "Reserve your ideal indoor or rooftop table in seconds.",
    },
    {
      icon: <Clock className="w-5 h-5 text-amber-500" />,
      title: "24/7 Service",
      desc: "Craving late-night pizza or early breakfast? We are open.",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      title: "Organized Foodie Place",
      desc: "Immaculate ambience with tranquil music and warm lights.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-amber-500" />,
      title: "Clean Kitchen",
      desc: "Highest HACCP hygiene standards and sterilized cooking.",
    },
    {
      icon: <Award className="w-5 h-5 text-amber-500" />,
      title: "Super Chefs",
      desc: "Internationally acclaimed chefs crafting every recipe.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white/70 border-y border-cream-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Visual: Circular Chef Montage */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Concentric Circle Background */}
            <div className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full bg-cream-100 border border-amber-200/80 pointer-events-none" />

            {/* Central Master Chef Portrait */}
            <div className="relative z-10 w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] rounded-full overflow-hidden border-8 border-white shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80"
                alt="Executive Head Chef Preparing Gourmet Plate"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating Organic Ingredient Accents */}
            <div className="absolute -top-4 -right-2 sm:right-6 z-20 bg-white p-3 rounded-2xl shadow-md border border-cream-200 flex items-center gap-2">
              <span className="text-xl">🌿</span>
              <span className="text-xs font-bold text-charcoal">100% Organic Herbs</span>
            </div>

            <div className="absolute -bottom-4 -left-2 sm:left-4 z-20 bg-white p-3 rounded-2xl shadow-md border border-cream-200 flex items-center gap-2">
              <span className="text-xl">🧀</span>
              <span className="text-xs font-bold text-charcoal">Artisanal Cheeses</span>
            </div>
          </div>

          {/* Right Text & Service Badges */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
                Why Foodies Choose Bites
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-charcoal tracking-tight leading-tight">
                We Are More Than <br />
                <span className="text-amber-500">Multiple Service</span>
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-charcoal-100 leading-relaxed">
              This is a type of restaurant which typically serves food and drink, in addition to light refreshment such as baked goods or snacks. The term comes from the French word meaning food. We obsess over every single flavor profile.
            </p>

            {/* 6 Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {services.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-cream-50/80 hover:bg-amber-50/50 border border-cream-200 hover:border-amber-200 transition-all duration-200"
                >
                  <div className="w-9 h-9 rounded-xl bg-white shadow-xs flex items-center justify-center shrink-0 border border-cream-200">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-charcoal">{item.title}</h4>
                    <p className="text-[11px] text-charcoal-100 mt-0.5 leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-charcoal-dark font-black text-xs rounded-full shadow-sm hover:shadow transition-all active:scale-95"
              >
                About Our Story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
