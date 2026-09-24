"use client";

import React from "react";
import { usePOSStore } from "@/store/posStore";
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Clock,
  Sparkles,
  PieChart,
} from "lucide-react";

export const AnalyticsView: React.FC = () => {
  const { balance, posOrders } = usePOSStore();

  const totalOrdersCount = posOrders.length + 138;
  const totalGrossRevenue = posOrders.reduce((acc, o) => acc + o.total, 85400);

  const hourlyData = [
    { hour: "10 AM", revenue: 4200, orders: 12, height: "30%" },
    { hour: "11 AM", revenue: 7800, orders: 18, height: "55%" },
    { hour: "12 PM", revenue: 16500, orders: 36, height: "95%" },
    { hour: "01 PM", revenue: 18200, orders: 42, height: "100%" },
    { hour: "02 PM", revenue: 10400, orders: 24, height: "65%" },
    { hour: "03 PM", revenue: 6500, orders: 15, height: "40%" },
    { hour: "04 PM", revenue: 5800, orders: 14, height: "35%" },
    { hour: "05 PM", revenue: 9500, orders: 22, height: "60%" },
    { hour: "06 PM", revenue: 14800, orders: 34, height: "85%" },
    { hour: "07 PM", revenue: 19500, orders: 48, height: "100%" },
    { hour: "08 PM", revenue: 17900, orders: 44, height: "92%" },
    { hour: "09 PM", revenue: 8500, orders: 19, height: "50%" },
  ];

  const categoryShare = [
    { name: "Burgers & Combos", percentage: 42, color: "bg-[#FF6B00]", amount: "৳45,400" },
    { name: "Artisan Pizzas", percentage: 28, color: "bg-amber-500", amount: "৳28,900" },
    { name: "Pastas & Bowls", percentage: 18, color: "bg-orange-400", amount: "৳18,200" },
    { name: "Beverages & Desserts", percentage: 12, color: "bg-rose-400", amount: "৳11,800" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Analytics & Sales Reporting</h1>
          <p className="text-xs text-gray-500">Real-time performance metrics and register settlement</p>
        </div>
        <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-200 text-xs font-semibold text-gray-700">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>Today, {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Revenue */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-500">Gross Sales Today</span>
            <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900 mb-1">
            ৳{totalGrossRevenue.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% vs yesterday</span>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-500">Total Orders</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900 mb-1">
            {totalOrdersCount}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+12.3% peak load</span>
          </div>
        </div>

        {/* Average Ticket */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-500">Average Ticket</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900 mb-1">
            ৳{(totalGrossRevenue / totalOrdersCount).toFixed(0)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <span>Avg items/ticket: 2.8</span>
          </div>
        </div>

        {/* Wallet Balance */}
        <div className="bg-gradient-to-br from-[#FF6B00] to-[#FF8533] rounded-3xl p-5 text-white shadow-lg shadow-[#FF6B00]/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-white/80">Register Balance</span>
            <div className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black mb-1">
            ৳{balance.toLocaleString()}
          </div>
          <div className="text-xs text-white/80 font-medium">
            Auto-settles daily at 11:59 PM
          </div>
        </div>
      </div>

      {/* Hourly Sales Chart & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hourly Volume */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-gray-900 text-sm">Hourly Sales Traffic</h3>
              <p className="text-xs text-gray-400">Peak dining hours between 12-1 PM and 7-8 PM</p>
            </div>
            <span className="text-xs font-bold text-[#FF6B00] bg-orange-50 px-3 py-1 rounded-full">
              Live Feed
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-48 flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-gray-100">
            {hourlyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
                {/* Tooltip */}
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[10px] py-1 px-2 rounded-lg pointer-events-none whitespace-nowrap z-10">
                  ৳{d.revenue.toLocaleString()} ({d.orders} ord)
                </div>
                <div className="w-full bg-gray-100 rounded-t-lg h-36 flex items-end overflow-hidden">
                  <div
                    style={{ height: d.height }}
                    className="w-full bg-gradient-to-t from-[#FF6B00] to-[#FFA04D] rounded-t-lg group-hover:brightness-110 transition-all duration-300"
                  />
                </div>
                <span className="text-[10px] font-medium text-gray-400">{d.hour}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Share */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-900 text-sm mb-1">Sales by Category</h3>
            <p className="text-xs text-gray-400 mb-6">Proportion of gross menu sales</p>

            <div className="space-y-4">
              {categoryShare.map((cat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-700">{cat.name}</span>
                    <span className="font-bold text-gray-900">{cat.percentage}% ({cat.amount})</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${cat.percentage}%` }}
                      className={`h-full ${cat.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500 flex items-center justify-between">
            <span>Best Seller:</span>
            <span className="font-bold text-[#FF6B00]">Cheese burger (৳350)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
