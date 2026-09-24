"use client";

import React, { useState } from "react";
import { usePOSStore } from "@/store/posStore";
import { X, FileText, Check } from "lucide-react";

export const POSAddNoteModal: React.FC = () => {
  const { isAddNoteModalOpen, setIsAddNoteModalOpen, deliveryNote, setDeliveryNote } = usePOSStore();
  const [note, setNote] = useState(deliveryNote || "");

  if (!isAddNoteModalOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setDeliveryNote(note);
    setIsAddNoteModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md border border-gray-100 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Order & Delivery Note</h2>
              <p className="text-xs text-gray-500">Special kitchen or courier instructions</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddNoteModalOpen(false)}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Special Instructions
            </label>
            <textarea
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Leave with security guard, extra napkins, allergy notice..."
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#FF6B00] transition-colors resize-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddNoteModalOpen(false)}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-[#FF6B00] hover:bg-[#E05E00] text-white text-sm font-bold shadow-lg shadow-[#FF6B00]/25 transition-colors flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
