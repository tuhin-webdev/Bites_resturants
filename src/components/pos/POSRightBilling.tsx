"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePOSStore } from "@/store/posStore";
import {
  MapPin,
  Plus,
  Minus,
  Trash2,
  ArrowDownLeft,
  ArrowUpRight,
  Receipt,
  FileText,
  Sparkles,
} from "lucide-react";

export const POSRightBilling: React.FC = () => {
  const {
    balance,
    deliveryAddress,
    deliveryNote,
    cart,
    updateQuantity,
    removeFromCart,
    getSubtotal,
    getServiceFee,
    getTotal,
    setIsCheckoutModalOpen,
    setIsAddNoteModalOpen,
    setIsTopUpModalOpen,
    setDeliveryAddress,
  } = usePOSStore();

  const [isChangingAddress, setIsChangingAddress] = useState(false);
  const [addressInput, setAddressInput] = useState(deliveryAddress);

  const subtotal = getSubtotal();
  const service = getServiceFee();
  const total = getTotal();

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (addressInput.trim()) {
      setDeliveryAddress(addressInput.trim());
      setIsChangingAddress(false);
    }
  };

  return (
    <aside className="w-80 xl:w-[350px] bg-white border-l border-gray-100 flex flex-col justify-between p-5 shrink-0 overflow-y-auto min-h-[calc(100vh-60px)] space-y-5">
      <div className="space-y-5">
        {/* Your Balance Card from Mockup */}
        <div>
          <h4 className="font-bold text-xs text-charcoal mb-2.5">Your Balance</h4>
          <div className="relative rounded-2xl bg-gradient-to-r from-[#FF7A00] to-[#FF5500] p-4 text-white shadow-md space-y-3">
            <div>
              <span className="text-[11px] text-white/80 font-medium block">Balance</span>
              <span className="text-2xl font-black tracking-tight text-white">
                ৳{balance.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setIsTopUpModalOpen(true)}
                className="flex-1 py-1.5 px-3 bg-white text-[#FF6B00] hover:bg-amber-50 rounded-full font-bold text-xs flex items-center justify-center gap-1 shadow-xs transition-colors"
              >
                <ArrowDownLeft className="w-3.5 h-3.5" /> Top Up
              </button>
              <button
                onClick={() => setIsTopUpModalOpen(true)}
                className="flex-1 py-1.5 px-3 bg-white text-[#FF6B00] hover:bg-amber-50 rounded-full font-bold text-xs flex items-center justify-center gap-1 shadow-xs transition-colors"
              >
                <ArrowUpRight className="w-3.5 h-3.5" /> Transfer
              </button>
            </div>
          </div>
        </div>

        {/* Your Address Card from Mockup */}
        <div className="bg-[#FAF9F8] rounded-2xl p-4 border border-gray-100 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              Your Address
            </span>
            <button
              onClick={() => setIsChangingAddress(!isChangingAddress)}
              className="text-xs font-bold text-[#FF6B00] hover:underline"
            >
              {isChangingAddress ? "Cancel" : "Change"}
            </button>
          </div>

          {isChangingAddress ? (
            <form onSubmit={handleSaveAddress} className="space-y-2">
              <input
                type="text"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                className="w-full text-xs p-2 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#FF6B00]"
                placeholder="Enter outlet / table / street"
              />
              <button
                type="submit"
                className="w-full py-1.5 bg-[#FF6B00] text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Save Location
              </button>
            </form>
          ) : (
            <div>
              <p className="text-xs font-bold text-charcoal flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                {deliveryAddress}
              </p>
              <p className="text-[11px] text-gray-400 mt-1 leading-snug">
                {deliveryNote ? `Note: "${deliveryNote}"` : "Express kitchen counter / Doorstep dispatch"}
              </p>
            </div>
          )}

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => setIsChangingAddress(true)}
              className="flex-1 py-1.5 px-3 bg-[#FF6B00] hover:bg-[#E56000] text-white rounded-xl font-bold text-xs transition-colors shadow-xs"
            >
              Add Details
            </button>
            <button
              onClick={() => setIsAddNoteModalOpen(true)}
              className="flex-1 py-1.5 px-3 bg-[#FF6B00] hover:bg-[#E56000] text-white rounded-xl font-bold text-xs transition-colors shadow-xs"
            >
              Add Note
            </button>
          </div>
        </div>

        {/* Current Order Cart Items List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-charcoal flex items-center gap-1.5">
              <Receipt className="w-4 h-4 text-[#FF6B00]" />
              Current Order ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h4>
          </div>

          <div className="max-h-56 overflow-y-auto space-y-2.5 pr-1 divide-y divide-gray-100">
            {cart.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-xs">
                Tap (+) on any dish to start an order
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="pt-2 first:pt-0 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-100 shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="truncate">
                      <h5 className="font-bold text-charcoal truncate">{item.name}</h5>
                      <span className="text-[10px] text-gray-400">x{item.quantity}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-bold text-charcoal text-xs">
                      +৳{(item.price * item.quantity).toFixed(0)}
                    </span>

                    {/* Stepper buttons [-] 1 [+] from mockup */}
                    <div className="inline-flex items-center bg-gray-50 rounded-lg border border-gray-200 p-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-5 h-5 flex items-center justify-center hover:bg-white rounded text-gray-600 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center font-bold text-[11px] text-charcoal">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-5 h-5 flex items-center justify-center hover:bg-white rounded text-gray-600 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="pt-3 border-t border-gray-100 space-y-2 text-xs">
          <div className="flex justify-between text-gray-500 font-medium">
            <span>Service Fee</span>
            <span className="font-bold text-charcoal">+৳{service.toFixed(0)}</span>
          </div>

          <div className="flex justify-between items-baseline pt-1">
            <span className="font-bold text-charcoal text-sm">Total</span>
            <span className="text-xl font-black text-[#FF6B00]">
              ৳{total > 0 ? total.toFixed(0) : "0"}
            </span>
          </div>

          {/* Full-width Checkout CTA Button from Mockup */}
          <button
            onClick={() => setIsCheckoutModalOpen(true)}
            disabled={cart.length === 0}
            className="w-full py-3.5 bg-[#FF6B00] hover:bg-[#E56000] text-white font-black text-sm rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-40 mt-2"
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Bottom Discount Voucher Promo Card from Mockup */}
      <div className="mt-4 pt-3">
        <div className="relative rounded-2xl bg-gradient-to-r from-[#FF7A00] to-[#FFA040] p-4 text-white overflow-hidden shadow-sm flex items-center justify-between">
          <div className="max-w-[170px] space-y-1">
            <h5 className="font-black text-xs leading-snug">
              Get Discount Voucher Up To 20%
            </h5>
            <p className="text-[9px] text-white/90 leading-tight">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/40 shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
              alt="Promo Customer"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
