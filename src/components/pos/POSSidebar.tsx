"use client";

import React from "react";
import { usePOSStore } from "@/store/posStore";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Bike,
  Sparkles,
  BarChart3,
  Boxes,
  Grid,
  ClipboardList,
  Table as TableIcon,
  FileText,
  ChevronRight,
  Flame,
  ChefHat,
} from "lucide-react";

export const POSSidebar: React.FC = () => {
  const { activeView, setActiveView } = usePOSStore();

  const mainMenuItems = [
    { id: "pos", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "kitchen", label: "Live Kitchen (KDS)", icon: <ChefHat className="w-4 h-4" /> },
    { id: "menu_mgmt", label: "Restaurant Menu", icon: <UtensilsCrossed className="w-4 h-4" /> },
    { id: "orders", label: "Drivers & Delivery", icon: <Bike className="w-4 h-4" /> },
  ];

  const otherMenuItems = [
    { id: "analytics", label: "Charts & Sales", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "tables", label: "Table Floor Plan", icon: <TableIcon className="w-4 h-4" /> },
    { id: "inventory", label: "Stock Inventory", icon: <Boxes className="w-4 h-4" /> },
    { id: "forms", label: "Order Logs", icon: <ClipboardList className="w-4 h-4" /> },
    { id: "widgets", label: "POS Widgets", icon: <Grid className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-60 bg-white border-r border-gray-100 flex flex-col justify-between py-6 px-4 shrink-0 overflow-y-auto min-h-[calc(100vh-60px)]">
      <div className="space-y-6">
        {/* Main Menu Section */}
        <div>
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block px-3 mb-2">
            Main Menu
          </span>
          <nav className="space-y-1">
            {mainMenuItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#FFF3EC] text-[#FF6B00] shadow-xs font-black"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? "text-[#FF6B00]" : "text-gray-400"}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? "text-[#FF6B00]" : "text-gray-300"}`} />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Secondary Other Menu Section */}
        <div>
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block px-3 mb-2">
            Other
          </span>
          <nav className="space-y-1">
            {otherMenuItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#FFF3EC] text-[#FF6B00] font-black"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? "text-[#FF6B00]" : "text-gray-400"}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? "text-[#FF6B00]" : "text-gray-300"}`} />
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Promo Upgrade Card from Mockup */}
      <div className="mt-8 space-y-4">
        <div className="relative rounded-2xl bg-gradient-to-br from-[#FF7A00] to-[#FF5500] p-4 text-white shadow-md overflow-hidden">
          {/* Decorative Dot Grid */}
          <div className="absolute top-2 right-2 opacity-30 pointer-events-none">
            <div className="grid grid-cols-3 gap-1">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className="w-1 h-1 bg-white rounded-full block" />
              ))}
            </div>
          </div>

          <h5 className="font-bold text-xs leading-snug max-w-[140px]">
            Upgrade your Account to Get Free Voucher
          </h5>

          <button
            onClick={() => alert("Upgraded to Bites Restaurant POS Enterprise Tier! 🚀")}
            className="mt-3 px-4 py-1.5 bg-white text-[#FF6B00] hover:bg-amber-50 font-bold text-[11px] rounded-full shadow-xs transition-colors"
          >
            Upgrade
          </button>
        </div>

        {/* Footer info matching Bites branding */}
        <div className="text-[10px] text-gray-400 px-1 leading-tight">
          <p className="font-semibold text-gray-600">Bites Restaurant - Food & Dining</p>
          <p>POS & Admin Dashboard</p>
          <p className="mt-0.5 text-gray-400">© 2026 Bites. All Rights Reserved</p>
        </div>
      </div>
    </aside>
  );
};
