"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePOSStore, POSOrder } from "@/store/posStore";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Flame,
  ChefHat,
  Filter,
  Check,
  Play,
  RotateCcw,
  UtensilsCrossed,
  BellRing,
} from "lucide-react";

export const KitchenDisplay: React.FC = () => {
  const { posOrders, updateOrderStatus } = usePOSStore();
  const [filterStatus, setFilterStatus] = useState<string>("All");

  const statusColors: Record<POSOrder["status"], { bg: string; text: string; border: string }> = {
    Pending: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
    Cooking: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-300" },
    Ready: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-300" },
    "Out for Delivery": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
    Completed: { bg: "bg-gray-50", text: "text-gray-500", border: "border-gray-200" },
    Cancelled: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" },
  };

  const filteredOrders = posOrders.filter((order) => {
    if (filterStatus === "All") return order.status !== "Completed" && order.status !== "Cancelled";
    return order.status === filterStatus;
  });

  const cookingCount = posOrders.filter((o) => o.status === "Cooking").length;
  const pendingCount = posOrders.filter((o) => o.status === "Pending").length;
  const readyCount = posOrders.filter((o) => o.status === "Ready").length;

  return (
    <div className="space-y-6">
      {/* Top Banner / Metrics */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FF6B00] text-white flex items-center justify-center shadow-lg shadow-[#FF6B00]/25">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Kitchen Display System (KDS)</h1>
            <p className="text-xs text-gray-500">Live order queue for chefs & line cooks</p>
          </div>
        </div>

        {/* Quick Counters */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-center">
            <span className="text-xs text-amber-700 font-medium block">Pending</span>
            <span className="text-lg font-black text-amber-800">{pendingCount}</span>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-orange-50 border border-orange-200 text-center">
            <span className="text-xs text-orange-700 font-medium block">Cooking</span>
            <span className="text-lg font-black text-[#FF6B00]">{cookingCount}</span>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
            <span className="text-xs text-emerald-700 font-medium block">Ready</span>
            <span className="text-lg font-black text-emerald-800">{readyCount}</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {["All", "Pending", "Cooking", "Ready", "Completed"].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterStatus === st
                ? "bg-[#FF6B00] text-white shadow-md shadow-[#FF6B00]/20"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Orders Grid */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-orange-50 text-[#FF6B00] flex items-center justify-center mb-3">
            <UtensilsCrossed className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">All Kitchen Orders Clear!</h3>
          <p className="text-xs text-gray-400">There are no orders waiting in this status queue.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredOrders.map((order) => {
            const styling = statusColors[order.status];
            return (
              <div
                key={order.id}
                className={`bg-white rounded-3xl border ${styling.border} shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-md`}
              >
                {/* Order Top Bar */}
                <div className={`p-4 ${styling.bg} flex items-center justify-between border-b ${styling.border}`}>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-gray-900 text-sm">
                      {order.orderNumber}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/80 shadow-xs text-gray-700">
                      {order.orderType}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{order.createdAt}</span>
                  </div>
                </div>

                {/* Body / Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs text-gray-600">
                      <span className="font-semibold text-gray-900">{order.customerName}</span>
                      <span className="font-medium text-[#FF6B00] bg-orange-50 px-2 py-0.5 rounded-md">
                        {order.tableOrAddress}
                      </span>
                    </div>

                    {/* Items List */}
                    <div className="border-t border-b border-gray-100 py-3 my-2 space-y-2.5">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-gray-100 text-gray-900 font-bold flex items-center justify-center text-[11px]">
                              {item.quantity}x
                            </span>
                            <span className="font-medium text-gray-800">{item.name}</span>
                          </div>
                          <span className="text-gray-400 font-mono text-[11px]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions according to status */}
                  <div className="pt-4 flex items-center gap-2">
                    {order.status === "Pending" && (
                      <button
                        onClick={() => updateOrderStatus(order.id, "Cooking")}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                      >
                        <Flame className="w-3.5 h-3.5" />
                        Start Cooking
                      </button>
                    )}

                    {order.status === "Cooking" && (
                      <button
                        onClick={() => updateOrderStatus(order.id, "Ready")}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Mark as Ready
                      </button>
                    )}

                    {order.status === "Ready" && (
                      <button
                        onClick={() => updateOrderStatus(order.id, "Completed")}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Complete / Handed Off
                      </button>
                    )}

                    {order.status === "Completed" && (
                      <div className="w-full text-center py-2 text-xs font-semibold text-emerald-600 flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        Order Fulfilled
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
