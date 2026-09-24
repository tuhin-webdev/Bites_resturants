"use client";

import React, { useState } from "react";
import { useUIStore } from "@/store/uiStore";
import { useUserStore } from "@/store/userStore";
import { TableReservation } from "@/types";
import { X, Calendar, Clock, Users, Sparkles, CheckCircle2, MapPin } from "lucide-react";
import confetti from "canvas-confetti";

export const ReservationModal: React.FC = () => {
  const { isReservationModalOpen, closeReservationModal, addToast } = useUIStore();
  const { user, addReservation } = useUserStore();

  const [name, setName] = useState(user?.name || "Tuhin Ahmed");
  const [email, setEmail] = useState(user?.email || "tuhin@example.com");
  const [phone, setPhone] = useState(user?.phone || "+880 1711 234567");
  const [date, setDate] = useState("2026-09-26");
  const [timeSlot, setTimeSlot] = useState("07:30 PM");
  const [guestsCount, setGuestsCount] = useState(2);
  const [seatingPreference, setSeatingPreference] = useState<TableReservation["seatingPreference"]>("Indoor Main Hall");
  const [specialRequests, setSpecialRequests] = useState("");
  const [confirmedReservation, setConfirmedReservation] = useState<TableReservation | null>(null);

  if (!isReservationModalOpen) return null;

  const timeSlots = ["12:30 PM", "01:30 PM", "06:30 PM", "07:30 PM", "08:30 PM", "09:15 PM"];
  const seatingOptions: TableReservation["seatingPreference"][] = [
    "Indoor Main Hall",
    "Outdoor Garden Terrace",
    "Rooftop View",
    "Private Dining VIP",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReservation: TableReservation = {
      id: `res-${Date.now()}`,
      reservationNumber: `RES-${Math.floor(10000 + Math.random() * 90000)}`,
      name,
      email,
      phone,
      date,
      timeSlot,
      guestsCount,
      seatingPreference,
      specialRequests: specialRequests.trim() || undefined,
      status: "Confirmed",
      createdAt: new Date().toISOString().split("T")[0],
    };

    addReservation(newReservation);
    setConfirmedReservation(newReservation);
    addToast(`Table reserved successfully! 🎉 Booking #${newReservation.reservationNumber}`, "success");

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#F59E0B", "#FBBF24", "#FEF3C7", "#1E1B18"],
      });
    } catch {
      // ignore
    }
  };

  const handleResetAndClose = () => {
    setConfirmedReservation(null);
    closeReservationModal();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Table Reservation"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm"
      onClick={handleResetAndClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-cream-200 transform animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-cream-100 flex items-center justify-between bg-gradient-to-r from-amber-50/50 to-white">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold tracking-wider text-amber-600 uppercase">
                Fine Dining Reservation
              </span>
              <h3 className="text-xl font-black text-charcoal">Book a Table at Bites</h3>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 rounded-full hover:bg-cream-100 text-gray-400 hover:text-charcoal transition-colors"
            aria-label="Close reservation modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedReservation ? (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h4 className="text-2xl font-black text-charcoal">Table Confirmed!</h4>
            <p className="text-xs text-charcoal-100 max-w-xs mx-auto">
              We look forward to serving you an unforgettable culinary feast. A confirmation SMS and email have been dispatched.
            </p>

            <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-charcoal-50">Reservation ID:</span>
                <strong className="text-charcoal font-mono">{confirmedReservation.reservationNumber}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-50">Date & Time:</span>
                <strong className="text-charcoal">{confirmedReservation.date} at {confirmedReservation.timeSlot}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-50">Guests & Area:</span>
                <strong className="text-charcoal">{confirmedReservation.guestsCount} Guests • {confirmedReservation.seatingPreference}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-50">Guest Name:</span>
                <strong className="text-charcoal">{confirmedReservation.name}</strong>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-charcoal-dark font-bold text-sm rounded-full transition-colors shadow-md"
            >
              Great, See You Soon!
            </button>
          </div>
        ) : (
          /* Reservation Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Date & Guests */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" /> Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-cream-200 text-xs text-charcoal outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-amber-500" /> Guests
                </label>
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-cream-200 text-xs text-charcoal outline-none focus:border-amber-500 bg-white"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Time Slot */}
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" /> Available Time Slot
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`py-2 text-xs rounded-xl border font-medium transition-all ${
                      timeSlot === slot
                        ? "bg-amber-500 text-charcoal-dark font-bold border-amber-500 shadow-sm"
                        : "bg-white text-charcoal-200 border-cream-200 hover:border-amber-300"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Seating Preference */}
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-500" /> Seating Preference
              </label>
              <div className="grid grid-cols-2 gap-2">
                {seatingOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSeatingPreference(opt)}
                    className={`p-2.5 text-xs rounded-xl border font-medium text-left transition-all ${
                      seatingPreference === opt
                        ? "bg-amber-50 border-amber-500 text-charcoal font-bold"
                        : "bg-white text-charcoal-200 border-cream-200 hover:border-amber-300"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Guest Contact Details */}
            <div className="space-y-3 pt-2 border-t border-cream-100">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-charcoal mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full p-2.5 rounded-xl border border-cream-200 text-xs text-charcoal outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-charcoal mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 1..."
                    className="w-full p-2.5 rounded-xl border border-cream-200 text-xs text-charcoal outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-charcoal mb-1">Email for Confirmation</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="w-full p-2.5 rounded-xl border border-cream-200 text-xs text-charcoal outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-charcoal mb-1">
                  Special Requests (Birthday, Anniversary, High Chair...)
                </label>
                <input
                  type="text"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Quiet corner table, anniversary flowers..."
                  className="w-full p-2.5 rounded-xl border border-cream-200 text-xs text-charcoal outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-charcoal-dark font-black text-sm rounded-full shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 mt-4"
            >
              <Sparkles className="w-4 h-4" />
              Confirm Reservation
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
