"use client";

import React, { useState } from "react";
import { usePOSStore, TableItem } from "@/store/posStore";
import {
  Utensils,
  Users,
  CheckCircle2,
  Clock,
  Plus,
  RefreshCw,
  Sparkles,
  Search,
} from "lucide-react";

export const TablesView: React.FC = () => {
  const { tables, updateTableStatus, setActiveView } = usePOSStore();
  const [filter, setFilter] = useState<string>("All");

  const statusConfig: Record<
    TableItem["status"],
    { bg: string; text: string; border: string; badgeBg: string }
  > = {
    Available: {
      bg: "bg-emerald-50/50 hover:bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-200",
      badgeBg: "bg-emerald-100 text-emerald-800",
    },
    Occupied: {
      bg: "bg-orange-50/50 hover:bg-orange-50",
      text: "text-[#FF6B00]",
      border: "border-orange-200",
      badgeBg: "bg-orange-100 text-orange-800",
    },
    Reserved: {
      bg: "bg-blue-50/50 hover:bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
      badgeBg: "bg-blue-100 text-blue-800",
    },
  };

  const filteredTables = tables.filter((t) => {
    if (filter === "All") return true;
    return t.status === filter;
  });

  const availableCount = tables.filter((t) => t.status === "Available").length;
  const occupiedCount = tables.filter((t) => t.status === "Occupied").length;
  const reservedCount = tables.filter((t) => t.status === "Reserved").length;

  const cycleStatus = (table: TableItem) => {
    const nextStatus: Record<TableItem["status"], TableItem["status"]> = {
      Available: "Occupied",
      Occupied: "Reserved",
      Reserved: "Available",
    };
    updateTableStatus(table.id, nextStatus[table.status]);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Dining Room & Floor Plan</h1>
          <p className="text-xs text-gray-500">Live seat occupancy, reservations, and table orders</p>
        </div>

        {/* Counter Badges */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
            <span className="text-xs text-emerald-700 font-medium block">Available</span>
            <span className="text-lg font-black text-emerald-800">{availableCount}</span>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-orange-50 border border-orange-200 text-center">
            <span className="text-xs text-[#FF6B00] font-medium block">Occupied</span>
            <span className="text-lg font-black text-[#FF6B00]">{occupiedCount}</span>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-blue-50 border border-blue-200 text-center">
            <span className="text-xs text-blue-700 font-medium block">Reserved</span>
            <span className="text-lg font-black text-blue-800">{reservedCount}</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {["All", "Available", "Occupied", "Reserved"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              filter === f
                ? "bg-[#FF6B00] text-white shadow-md shadow-[#FF6B00]/20"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredTables.map((table) => {
          const conf = statusConfig[table.status];
          return (
            <div
              key={table.id}
              className={`bg-white rounded-3xl border ${conf.border} shadow-sm overflow-hidden p-5 flex flex-col justify-between transition-all hover:shadow-md cursor-pointer`}
              onClick={() => cycleStatus(table)}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center font-black text-gray-900 text-sm">
                    T{table.number}
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${conf.badgeBg}`}
                  >
                    {table.status}
                  </span>
                </div>

                <div className="space-y-1 mb-4">
                  <h3 className="font-bold text-gray-900 text-base">Table 0{table.number}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Users className="w-3.5 h-3.5" />
                    <span>Up to {table.capacity} Guests</span>
                  </div>
                </div>

                {table.currentOrder && (
                  <div className="bg-orange-50/80 rounded-xl p-2.5 border border-orange-100 text-xs mb-3">
                    <span className="text-gray-500 block">Active Bill:</span>
                    <span className="font-mono font-bold text-[#FF6B00]">
                      {table.currentOrder}
                    </span>
                  </div>
                )}

                {table.serverName && (
                  <p className="text-xs text-gray-400">
                    Server: <span className="font-medium text-gray-600">{table.serverName}</span>
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-gray-100 mt-4 flex items-center justify-between text-xs text-gray-500">
                <span className="text-[11px]">Click to cycle status</span>
                <RefreshCw className="w-3.5 h-3.5 text-gray-400" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
