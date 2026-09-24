"use client";

import React, { useState, useEffect } from "react";
import { POSNavbar } from "@/components/pos/POSNavbar";
import { POSSidebar } from "@/components/pos/POSSidebar";
import { POSCatalog } from "@/components/pos/POSCatalog";
import { POSRightBilling } from "@/components/pos/POSRightBilling";
import { KitchenDisplay } from "@/components/pos/KitchenDisplay";
import { MenuManagement } from "@/components/pos/MenuManagement";
import { AnalyticsView } from "@/components/pos/AnalyticsView";
import { TablesView } from "@/components/pos/TablesView";

import { POSCheckoutModal } from "@/components/pos/POSCheckoutModal";
import { POSAddDishModal } from "@/components/pos/POSAddDishModal";
import { POSAddNoteModal } from "@/components/pos/POSAddNoteModal";
import { POSTopUpModal } from "@/components/pos/POSTopUpModal";
import { POSAdminLogin } from "@/components/pos/POSAdminLogin";

import { usePOSStore } from "@/store/posStore";

export default function AdminPOSPage() {
  const [mounted, setMounted] = useState(false);
  const { activeView, isAdminAuthenticated } = usePOSStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#1E1B18] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#FF6B00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return <POSAdminLogin />;
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-gray-900 flex flex-col font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* Top Header Navbar */}
      <POSNavbar />

      {/* Main 3-Column Work Area */}
      <div className="flex-1 flex max-w-[1920px] w-full mx-auto relative overflow-hidden">
        {/* Left Navigation Sidebar */}
        <POSSidebar />

        {/* Center Fluid Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-7 overflow-y-auto max-h-[calc(100vh-72px)]">
          {activeView === "pos" && <POSCatalog />}
          {activeView === "kitchen" && <KitchenDisplay />}
          {activeView === "orders" && <KitchenDisplay />}
          {activeView === "menu_mgmt" && <MenuManagement />}
          {activeView === "analytics" && <AnalyticsView />}
          {activeView === "tables" && <TablesView />}
        </main>

        {/* Right Order Summary & Billing Panel */}
        <POSRightBilling />
      </div>

      {/* Persistent Modals */}
      <POSCheckoutModal />
      <POSAddDishModal />
      <POSAddNoteModal />
      <POSTopUpModal />
    </div>
  );
}
