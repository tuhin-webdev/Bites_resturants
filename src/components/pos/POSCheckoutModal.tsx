"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePOSStore, POSOrder } from "@/store/posStore";
import {
  X,
  CreditCard,
  Banknote,
  Wallet,
  CheckCircle2,
  Printer,
  Receipt,
  User,
  MapPin,
  Utensils,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const POSCheckoutModal: React.FC = () => {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cart,
    getSubtotal,
    getServiceFee,
    getTotal,
    clearCart,
    addPOSOrder,
    balance,
    transferBalance,
    deliveryAddress,
    deliveryNote,
    orderType,
    setOrderType,
  } = usePOSStore();

  const [paymentMethod, setPaymentMethod] = useState<"Cash" | "Card" | "Digital Wallet">("Cash");
  const [cashTendered, setCashTendered] = useState<string>("1000");
  const [customerName, setCustomerName] = useState<string>("Tuhin Ahmed");
  const [tableNumber, setTableNumber] = useState<string>("Table 04");
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [createdOrder, setCreatedOrder] = useState<POSOrder | null>(null);

  if (!isCheckoutModalOpen) return null;

  const subtotal = getSubtotal();
  const serviceFee = getServiceFee();
  const tax = Number((subtotal * 0.05).toFixed(0));
  const grandTotal = Number((subtotal + serviceFee + tax).toFixed(0));

  const tenderedNum = parseFloat(cashTendered) || 0;
  const changeDue = Math.max(0, tenderedNum - grandTotal);

  const handleCompleteOrder = () => {
    if (cart.length === 0) return;

    if (paymentMethod === "Digital Wallet") {
      if (balance < grandTotal) {
        alert("Insufficient wallet balance! Please top up your wallet.");
        return;
      }
      transferBalance(grandTotal);
    }

    const orderNum = `#BT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: POSOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      customerName: customerName.trim() || "Walk-in Guest",
      tableOrAddress: orderType === "Dine-In" ? tableNumber : deliveryAddress,
      orderType,
      items: [...cart],
      subtotal,
      serviceFee,
      tax,
      total: grandTotal,
      status: "Cooking",
      paymentMethod,
      createdAt: "Just now",
    };

    addPOSOrder(newOrder);
    setCreatedOrder(newOrder);
    setIsCompleted(true);
    clearCart();
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleClose = () => {
    setIsCompleted(false);
    setCreatedOrder(null);
    setIsCheckoutModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00]">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {isCompleted ? "Payment Received" : "Complete POS Checkout"}
              </h2>
              <p className="text-xs text-gray-500">
                {isCompleted ? "Order recorded to Kitchen & POS" : "Select tender type & finalize order"}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {isCompleted && createdOrder ? (
          /* Success / Receipt Screen */
          <div className="p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              Payment Successful!
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Order <span className="font-bold text-[#FF6B00]">{createdOrder.orderNumber}</span> has been dispatched to the Kitchen Display System (KDS).
            </p>

            {/* Printable Thermal Receipt Card */}
            <div id="thermal-receipt" className="w-full max-w-sm bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-6 text-left font-mono text-xs text-gray-700 shadow-inner mb-6">
              <div className="text-center pb-4 border-b border-dashed border-gray-300">
                <h4 className="text-base font-black text-gray-900">BITES RESTAURANT</h4>
                <p className="text-gray-500 text-[11px]">Gulshan-2 Hub, Dhaka • POS Terminal #1</p>
                <p className="text-gray-400 text-[10px] mt-1">{new Date().toLocaleString()}</p>
              </div>

              <div className="py-3 border-b border-dashed border-gray-300 space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Order ID:</span>
                  <span className="font-bold">{createdOrder.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Customer:</span>
                  <span>{createdOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Type / Target:</span>
                  <span>{createdOrder.orderType} ({createdOrder.tableOrAddress})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tender:</span>
                  <span className="font-bold uppercase">{createdOrder.paymentMethod}</span>
                </div>
              </div>

              {/* Items */}
              <div className="py-3 border-b border-dashed border-gray-300 space-y-2">
                {createdOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="line-clamp-1">{it.quantity}x {it.name}</span>
                    <span className="font-semibold">৳{(it.price * it.quantity).toFixed(0)}</span>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="pt-3 space-y-1 text-right">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal:</span>
                  <span>৳{createdOrder.subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Service Fee:</span>
                  <span>৳{createdOrder.serviceFee.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Tax (5%):</span>
                  <span>৳{createdOrder.tax.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-dashed border-gray-300">
                  <span>TOTAL PAID:</span>
                  <span className="text-[#FF6B00]">৳{createdOrder.total.toFixed(0)}</span>
                </div>
                {paymentMethod === "Cash" && (
                  <>
                    <div className="flex justify-between text-gray-500 pt-1">
                      <span>Cash Tendered:</span>
                      <span>৳{tenderedNum.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Change Given:</span>
                      <span>৳{changeDue.toFixed(0)}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="text-center pt-4 text-gray-400 text-[10px]">
                *** THANK YOU FOR DINING WITH US ***
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full max-w-sm">
              <button
                onClick={handlePrintReceipt}
                className="flex-1 py-3 px-4 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Printer className="w-4 h-4 text-gray-600" />
                Print Receipt
              </button>
              <button
                onClick={handleClose}
                className="flex-1 py-3 px-4 rounded-xl bg-[#FF6B00] hover:bg-[#E05E00] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#FF6B00]/25"
              >
                Next Order
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <div className="p-6 space-y-6">
            {/* Order Type Tabs */}
            <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-2xl">
              {(["Dine-In", "Takeaway", "Delivery"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setOrderType(type)}
                  className={`flex-1 py-2.5 rounded-xl font-medium text-xs transition-all ${
                    orderType === type
                      ? "bg-white text-gray-900 font-bold shadow-sm"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Customer Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter customer name..."
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B00] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  {orderType === "Dine-In" ? "Table Assignment" : "Destination / Address"}
                </label>
                <div className="relative">
                  {orderType === "Dine-In" ? (
                    <Utensils className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  ) : (
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  )}
                  {orderType === "Dine-In" ? (
                    <select
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B00] transition-colors"
                    >
                      <option value="Table 01">Table 01 (2 Seats)</option>
                      <option value="Table 02">Table 02 (4 Seats)</option>
                      <option value="Table 04">Table 04 (6 Seats - VIP)</option>
                      <option value="Table 05">Table 05 (2 Seats)</option>
                      <option value="Table 07">Table 07 (4 Seats)</option>
                      <option value="Table 09">Table 09 (Bar Counter)</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={deliveryAddress}
                      readOnly
                      className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Cart Preview List */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Order Items ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h4>
              <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
                {cart.length === 0 ? (
                  <p className="text-xs text-gray-400 py-3 text-center">Cart is empty</p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-xs py-1.5 border-b border-gray-100 last:border-none"
                    >
                      <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <span className="font-semibold text-gray-900">{item.name}</span>
                        <span className="text-gray-400">×{item.quantity}</span>
                      </div>
                      <span className="font-bold text-gray-800">
                        ৳{(item.price * item.quantity).toFixed(0)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Payment Tender
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("Cash")}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === "Cash"
                      ? "border-[#FF6B00] bg-[#FF6B00]/5 text-[#FF6B00] font-bold"
                      : "border-gray-200 hover:border-gray-300 text-gray-600 bg-white"
                  }`}
                >
                  <Banknote className="w-5 h-5" />
                  <span className="text-xs">Cash</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("Card")}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === "Card"
                      ? "border-[#FF6B00] bg-[#FF6B00]/5 text-[#FF6B00] font-bold"
                      : "border-gray-200 hover:border-gray-300 text-gray-600 bg-white"
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="text-xs">Credit/Debit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("Digital Wallet")}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === "Digital Wallet"
                      ? "border-[#FF6B00] bg-[#FF6B00]/5 text-[#FF6B00] font-bold"
                      : "border-gray-200 hover:border-gray-300 text-gray-600 bg-white"
                  }`}
                >
                  <Wallet className="w-5 h-5" />
                  <span className="text-xs">Wallet (৳{balance.toLocaleString()})</span>
                </button>
              </div>
            </div>

            {/* Cash Tender Calculation */}
            {paymentMethod === "Cash" && (
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="w-full sm:w-auto">
                  <span className="text-xs font-semibold text-gray-700 block mb-1">
                    Amount Tendered (৳)
                  </span>
                  <input
                    type="number"
                    step="10"
                    value={cashTendered}
                    onChange={(e) => setCashTendered(e.target.value)}
                    className="w-36 px-3 py-2 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
                <div className="text-right w-full sm:w-auto">
                  <span className="text-xs text-gray-500 block">Change Due</span>
                  <span
                    className={`text-xl font-black ${
                      changeDue >= 0 ? "text-emerald-600" : "text-red-500"
                    }`}
                  >
                    ৳{changeDue.toFixed(0)}
                  </span>
                </div>
              </div>
            )}

            {/* Total Summary */}
            <div className="border-t border-gray-100 pt-4 space-y-1.5">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Subtotal</span>
                <span>৳{subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Service Fee</span>
                <span>৳{serviceFee.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Sales VAT (5%)</span>
                <span>৳{tax.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100">
                <span>Total Amount</span>
                <span className="text-2xl font-black text-[#FF6B00]">
                  ৳{grandTotal.toFixed(0)}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleCompleteOrder}
              disabled={cart.length === 0 || (paymentMethod === "Cash" && tenderedNum < grandTotal)}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-base transition-all shadow-lg shadow-[#FF6B00]/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Pay & Print Order (৳{grandTotal.toFixed(0)})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
