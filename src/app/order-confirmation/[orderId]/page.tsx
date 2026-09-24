"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { useUIStore } from "@/store/uiStore";
import {
  CheckCircle2,
  Clock,
  Printer,
  ShoppingBag,
  ArrowRight,
  Phone,
  Bike,
  ChefHat,
  PackageCheck,
  MapPin,
} from "lucide-react";
import confetti from "canvas-confetti";

interface OrderConfirmationPageProps {
  params: Promise<{ orderId: string }>;
}

export default function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const resolvedParams = use(params);
  const { orders, updateOrderStatus } = useUserStore();
  const { addToast } = useUIStore();

  const order = orders.find(
    (o) => o.id === resolvedParams.orderId || o.orderNumber === resolvedParams.orderId
  ) || orders[0]; // fallback to most recent order if fresh reload

  const [activeStep, setActiveStep] = useState(order?.trackingStep || 2);

  if (!order) {
    notFound();
  }

  const steps = [
    { step: 1, label: "Order Placed", time: "11:30 AM", icon: <ShoppingBag className="w-5 h-5" /> },
    { step: 2, label: "Kitchen Preparing", time: "11:35 AM", icon: <ChefHat className="w-5 h-5" /> },
    { step: 3, label: "Out for Delivery", time: "11:55 AM", icon: <Bike className="w-5 h-5" /> },
    { step: 4, label: "Delivered", time: "12:10 PM", icon: <PackageCheck className="w-5 h-5" /> },
  ];

  const handleSimulateNextStep = () => {
    const nextStep = activeStep < 4 ? activeStep + 1 : 1;
    const statusText =
      nextStep === 1
        ? "Order Placed"
        : nextStep === 2
        ? "Kitchen Preparing"
        : nextStep === 3
        ? "Out for Delivery"
        : "Delivered";

    setActiveStep(nextStep);
    updateOrderStatus(order.id, statusText as any, nextStep);
    addToast(`Live Tracker Updated: ${statusText}! 🚀`, "success");

    if (nextStep === 4) {
      try {
        confetti({ particleCount: 70, spread: 60 });
      } catch {}
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Celebration Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-cream-200 shadow-soft text-center space-y-4">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Receipt & Confirmation
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-charcoal mt-1">
              Thank You for Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-100 mt-2">
              We&apos;ve received your order and our chefs are firing up the ovens.
            </p>
          </div>

          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-cream-50 border border-cream-200 text-xs">
            <span className="text-charcoal-50">Order Number:</span>
            <strong className="text-charcoal font-mono font-bold">{order.orderNumber}</strong>
            <span className="text-charcoal-50">•</span>
            <span className="text-charcoal-50">Est. Time:</span>
            <strong className="text-amber-600">{order.estimatedDeliveryTime}</strong>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2 no-print">
            <button
              onClick={handlePrintReceipt}
              className="px-5 py-2.5 rounded-full border border-cream-200 bg-white hover:bg-cream-100 text-charcoal font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4 text-amber-500" />
              Print / Save Invoice PDF
            </button>
            <Link
              href="/menu"
              className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-charcoal-dark font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              Order More Delights <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Live Order Status Tracker */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-soft space-y-6">
          <div className="flex items-center justify-between border-b border-cream-100 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                Live Kitchen Radar
              </span>
              <h2 className="text-xl font-black text-charcoal">Real-Time Delivery Tracker</h2>
            </div>

            {/* Interactive Simulation Button */}
            <button
              onClick={handleSimulateNextStep}
              className="no-print text-xs font-bold px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 hover:bg-amber-200 transition-colors border border-amber-300"
              title="Click to simulate progressing to next order status"
            >
              Simulate Next Status ⏩
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div className="relative pt-4 pb-2">
            <div className="grid grid-cols-4 gap-2 text-center">
              {steps.map((st) => {
                const isPassed = activeStep >= st.step;
                const isCurrent = activeStep === st.step;

                return (
                  <div key={st.step} className="flex flex-col items-center relative z-10">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isCurrent
                          ? "bg-amber-500 text-charcoal-dark shadow-md scale-110 ring-4 ring-amber-100 animate-pulse"
                          : isPassed
                          ? "bg-emerald-500 text-white"
                          : "bg-cream-100 text-charcoal-50"
                      }`}
                    >
                      {st.icon}
                    </div>

                    <span
                      className={`text-xs font-bold mt-2.5 ${
                        isPassed ? "text-charcoal" : "text-charcoal-50"
                      }`}
                    >
                      {st.label}
                    </span>
                    <span className="text-[10px] text-charcoal-50">{st.time}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Courier Card when Out for Delivery */}
          {activeStep >= 3 && (
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-center justify-between gap-4 animate-in fade-in">
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                    alt="Rider"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-charcoal">Kamrul Hassan</h4>
                  <p className="text-[11px] text-charcoal-100">Bites Priority Courier • Honda CG 125</p>
                  <span className="text-[10px] font-bold text-amber-700">★ 4.9 (1.2k deliveries)</span>
                </div>
              </div>

              <a
                href="tel:+8801711000000"
                className="px-4 py-2 rounded-full bg-charcoal text-white hover:bg-black font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" /> Call Rider
              </a>
            </div>
          )}
        </div>

        {/* Invoice Summary Details (Print Friendly) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-soft space-y-6">
          <div className="flex justify-between items-start pb-4 border-b border-cream-100">
            <div>
              <h3 className="font-black text-lg text-charcoal">Tax Invoice & Order Receipt</h3>
              <p className="text-xs text-charcoal-50">Placed on {order.createdAt}</p>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold rounded-full">
              {order.paymentStatus === "Paid" ? "Payment Confirmed" : "Payment On Delivery"}
            </span>
          </div>

          {/* Delivery & Payment Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-cream-50/70 border border-cream-200">
              <span className="font-bold text-charcoal block mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-500" /> Delivery Address:
              </span>
              <p className="text-charcoal font-semibold">{order.deliveryAddress.fullName}</p>
              <p className="text-charcoal-100">{order.deliveryAddress.street}</p>
              {order.deliveryAddress.apartment && (
                <p className="text-charcoal-100">{order.deliveryAddress.apartment}</p>
              )}
              <p className="text-charcoal-50 mt-1">{order.deliveryAddress.phone}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-cream-50/70 border border-cream-200">
              <span className="font-bold text-charcoal block mb-1">Payment & Dispatch:</span>
              <p className="text-charcoal-100">
                Method: <strong className="text-charcoal">{order.paymentMethod}</strong>
              </p>
              <p className="text-charcoal-100">
                Courier Mode: <strong className="text-charcoal">{order.deliveryType}</strong>
              </p>
              {order.deliveryAddress.deliveryNotes && (
                <p className="text-amber-800 italic mt-1 text-[11px]">
                  &quot;{order.deliveryAddress.deliveryNotes}&quot;
                </p>
              )}
            </div>
          </div>

          {/* Items breakdown table */}
          <div className="divide-y divide-cream-100 pt-2">
            {order.items.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-cream-100 shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-charcoal">{item.name}</h5>
                    <span className="text-[11px] text-charcoal-50">
                      Qty: {item.quantity} {item.selectedSize ? `• ${item.selectedSize}` : ""}
                    </span>
                  </div>
                </div>
                <span className="font-bold text-charcoal">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="pt-4 border-t border-cream-200 space-y-1.5 text-xs text-charcoal-100 max-w-xs ml-auto">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-bold text-charcoal">${order.subtotal.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount:</span>
                <span>-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Charge:</span>
              <span>{order.deliveryFee === 0 ? "FREE" : `$${order.deliveryFee.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax / VAT (5%):</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-cream-200 flex justify-between text-base font-black text-charcoal">
              <span>Total Paid:</span>
              <span className="text-amber-600">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
