"use client";

import React from "react";
import { useUIStore } from "@/store/uiStore";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

export const ToastContainer = () => {
  const { toasts, removeToast } = useUIStore();

  if (toasts.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="Notifications"
      className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((toast) => {
        let bgClass = "bg-white border-amber-200 text-charcoal";
        let icon = <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />;

        if (toast.type === "error") {
          bgClass = "bg-red-50 border-red-200 text-red-900";
          icon = <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />;
        } else if (toast.type === "warning") {
          bgClass = "bg-amber-50 border-amber-300 text-amber-900";
          icon = <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />;
        } else if (toast.type === "info") {
          bgClass = "bg-blue-50 border-blue-200 text-blue-900";
          icon = <Info className="w-5 h-5 text-blue-500 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-2xl shadow-lg border backdrop-blur-md transition-all duration-300 transform translate-y-0 opacity-100 ${bgClass}`}
          >
            <div className="flex items-center gap-3">
              {icon}
              <p className="text-sm font-medium tracking-tight leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
