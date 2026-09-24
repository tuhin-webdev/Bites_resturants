"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePOSStore } from "@/store/posStore";
import {
  Lock,
  UtensilsCrossed,
  ShieldCheck,
  KeyRound,
  ArrowRight,
  AlertCircle,
  Sparkles,
  ChevronLeft,
} from "lucide-react";

export const POSAdminLogin: React.FC = () => {
  const { loginAdmin } = usePOSStore();
  const [activeTab, setActiveTab] = useState<"pin" | "password">("pin");

  // PIN state
  const [pin, setPin] = useState<string>("");

  // Password state
  const [email, setEmail] = useState<string>("admin@bites.com");
  const [password, setPassword] = useState<string>("admin123");

  const [error, setError] = useState<string | null>(null);

  const handlePinPress = (val: string) => {
    setError(null);
    if (pin.length < 4) {
      const newPin = pin + val;
      setPin(newPin);
      if (newPin.length === 4) {
        // Automatically submit when 4 digits entered
        const ok = loginAdmin(newPin);
        if (!ok) {
          setError("Invalid PIN code! (Demo PIN: 1234)");
          setTimeout(() => setPin(""), 800);
        }
      }
    }
  };

  const handlePinDelete = () => {
    setError(null);
    setPin((p) => p.slice(0, -1));
  };

  const handlePinClear = () => {
    setError(null);
    setPin("");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const ok = loginAdmin(password, email);
    if (!ok) {
      setError("Incorrect password! (Demo: admin123)");
    }
  };

  const handleQuickDemoLogin = () => {
    setError(null);
    loginAdmin("1234", "admin@bites.com");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E1B18] via-[#2A241F] to-[#1E1B18] flex items-center justify-center p-4 selection:bg-[#FF6B00] selection:text-white">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/10 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header Banner */}
        <div className="bg-[#FF6B00] p-6 text-white text-center relative">
          <Link
            href="/"
            className="absolute left-4 top-4 p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
            title="Return to Customer Storefront"
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>

          <div className="w-14 h-14 mx-auto rounded-2xl bg-white text-[#FF6B00] flex items-center justify-center shadow-lg mb-3">
            <UtensilsCrossed className="w-7 h-7 stroke-[2.5]" />
          </div>
          <h1 className="text-2xl font-black tracking-tight flex items-center justify-center gap-1">
            Bites<span className="w-2.5 h-2.5 rounded-full bg-amber-200 inline-block animate-pulse" />
          </h1>
          <p className="text-xs text-white/90 font-semibold uppercase tracking-wider mt-1">
            Restaurant POS & Admin Portal
          </p>
        </div>

        {/* Tab switch: PIN vs Password */}
        <div className="p-6 pb-2">
          <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-4">
            <button
              type="button"
              onClick={() => {
                setActiveTab("pin");
                setError(null);
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "pin"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Quick PIN Pad
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("password");
                setError(null);
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "password"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Email & Password
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Mode 1: 4-digit PIN */}
          {activeTab === "pin" && (
            <div className="space-y-5">
              <div className="text-center">
                <span className="text-xs text-gray-500 font-medium">Enter 4-Digit Staff PIN</span>
                {/* Dots indicator */}
                <div className="flex justify-center items-center gap-4 mt-3">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-full border-2 transition-all ${
                        pin.length > i
                          ? "bg-[#FF6B00] border-[#FF6B00] scale-110 shadow-sm"
                          : "border-gray-300 bg-gray-50"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Number keypad */}
              <div className="grid grid-cols-3 gap-3 max-w-[280px] mx-auto pt-2">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handlePinPress(num)}
                    className="w-full aspect-square rounded-2xl bg-gray-50 hover:bg-orange-50 active:bg-[#FF6B00] active:text-white border border-gray-200 font-bold text-lg text-gray-800 flex items-center justify-center transition-colors shadow-xs"
                  >
                    {num}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handlePinClear}
                  className="w-full aspect-square rounded-2xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-500 flex items-center justify-center transition-colors"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => handlePinPress("0")}
                  className="w-full aspect-square rounded-2xl bg-gray-50 hover:bg-orange-50 active:bg-[#FF6B00] active:text-white border border-gray-200 font-bold text-lg text-gray-800 flex items-center justify-center transition-colors shadow-xs"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={handlePinDelete}
                  className="w-full aspect-square rounded-2xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-500 flex items-center justify-center transition-colors"
                >
                  ⌫
                </button>
              </div>
            </div>
          )}

          {/* Mode 2: Password */}
          {activeTab === "password" && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Manager Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FF6B00]/25 transition-all mt-2"
              >
                <KeyRound className="w-4 h-4" />
                Sign In to POS
              </button>
            </form>
          )}

          {/* Demo 1-Click Access & Info */}
          <div className="pt-6 border-t border-gray-100 mt-6 space-y-3">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 px-4 rounded-xl border border-orange-200 bg-orange-50 hover:bg-orange-100 text-[#FF6B00] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              1-Click Demo Access (PIN: 1234)
            </button>

            <div className="bg-gray-50 rounded-xl p-3 text-center text-[11px] text-gray-500 space-y-0.5">
              <p>Demo Email: <span className="font-semibold text-gray-800">admin@bites.com</span></p>
              <p>Demo Password: <span className="font-semibold text-gray-800">admin123</span> • PIN: <span className="font-semibold text-[#FF6B00]">1234</span></p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
          <Link
            href="/"
            className="text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
          >
            ← Return to Bites Storefront
          </Link>
        </div>
      </div>
    </div>
  );
};
