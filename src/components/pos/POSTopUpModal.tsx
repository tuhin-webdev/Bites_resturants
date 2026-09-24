"use client";

import React, { useState } from "react";
import { usePOSStore } from "@/store/posStore";
import { X, Wallet, ArrowUpRight, DollarSign, CheckCircle2 } from "lucide-react";

export const POSTopUpModal: React.FC = () => {
  const { isTopUpModalOpen, setIsTopUpModalOpen, balance, topUpBalance, transferBalance } =
    usePOSStore();

  const [mode, setMode] = useState<"topup" | "transfer">("topup");
  const [amount, setAmount] = useState<string>("100");
  const [recipient, setRecipient] = useState<string>("Main Cash Vault");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isTopUpModalOpen) return null;

  const quickAmounts = [50, 100, 250, 500, 1000];

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount) || 0;
    if (val <= 0) return;

    if (mode === "topup") {
      topUpBalance(val);
      setSuccessMsg(`Successfully added $${val.toFixed(2)} to balance!`);
    } else {
      if (val > balance) {
        alert("Amount exceeds current balance!");
        return;
      }
      transferBalance(val);
      setSuccessMsg(`Successfully transferred $${val.toFixed(2)} to ${recipient}!`);
    }

    setTimeout(() => {
      setSuccessMsg(null);
      setIsTopUpModalOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md border border-gray-100 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00]">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Wallet Management</h2>
              <p className="text-xs text-gray-500">
                Current Balance:{" "}
                <span className="font-bold text-[#FF6B00]">${balance.toLocaleString()}</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsTopUpModalOpen(false)}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="px-6 pt-4">
          <div className="flex items-center bg-gray-100 p-1.5 rounded-2xl">
            <button
              type="button"
              onClick={() => {
                setMode("topup");
                setSuccessMsg(null);
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                mode === "topup" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
              }`}
            >
              Top Up Balance
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("transfer");
                setSuccessMsg(null);
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                mode === "transfer" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
              }`}
            >
              Transfer Funds
            </button>
          </div>
        </div>

        {/* Body */}
        {successMsg ? (
          <div className="p-8 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <p className="text-sm font-bold text-gray-900">{successMsg}</p>
          </div>
        ) : (
          <form onSubmit={handleAction} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                {mode === "topup" ? "Amount to Add ($)" : "Amount to Transfer ($)"}
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  step="1"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-lg font-bold text-gray-900 focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
            </div>

            {/* Quick Presets */}
            {mode === "topup" && (
              <div className="flex flex-wrap gap-2">
                {quickAmounts.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setAmount(q.toString())}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                      amount === q.toString()
                        ? "border-[#FF6B00] bg-[#FF6B00]/10 text-[#FF6B00]"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}
                  >
                    +${q}
                  </button>
                ))}
              </div>
            )}

            {mode === "transfer" && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Transfer Target
                </label>
                <select
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B00]"
                >
                  <option value="Main Cash Vault">Main Cash Vault</option>
                  <option value="Kitchen Expense Petty Cash">Kitchen Expense Petty Cash</option>
                  <option value="Head Office Settlement">Head Office Settlement</option>
                </select>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FF6B00]/25 transition-all"
              >
                <ArrowUpRight className="w-4 h-4" />
                {mode === "topup" ? `Add $${amount} to Balance` : `Transfer $${amount}`}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
