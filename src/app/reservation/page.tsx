"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useUserStore } from "@/store/userStore";
import { useUIStore } from "@/store/uiStore";
import { TableReservation } from "@/types";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
  User,
  HeartHandshake,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function ReservationPage() {
  const { user, reservations, addReservation } = useUserStore();
  const { addToast } = useUIStore();

  const [name, setName] = useState(user?.name || "Tuhin Ahmed");
  const [email, setEmail] = useState(user?.email || "tuhin@example.com");
  const [phone, setPhone] = useState(user?.phone || "+880 1711 234567");
  const [date, setDate] = useState("2026-09-26");
  const [timeSlot, setTimeSlot] = useState("07:30 PM");
  const [guestsCount, setGuestsCount] = useState(4);
  const [seatingPreference, setSeatingPreference] = useState<TableReservation["seatingPreference"]>("Indoor Main Hall");
  const [specialRequests, setSpecialRequests] = useState("");
  const [lastConfirmed, setLastConfirmed] = useState<TableReservation | null>(null);

  const timeSlots = [
    "12:00 PM",
    "12:45 PM",
    "01:30 PM",
    "06:00 PM",
    "07:00 PM",
    "07:45 PM",
    "08:30 PM",
    "09:15 PM",
  ];

  const seatingOptions: TableReservation["seatingPreference"][] = [
    "Indoor Main Hall",
    "Outdoor Garden Terrace",
    "Rooftop View",
    "Private Dining VIP",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRes: TableReservation = {
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

    addReservation(newRes);
    setLastConfirmed(newRes);
    addToast(`Table confirmed! Reference #${newRes.reservationNumber}`, "success");

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#F59E0B", "#FBBF24", "#FEF3C7", "#1E1B18"],
      });
    } catch {}
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Banner Section */}
        <div className="relative rounded-4xl bg-gradient-to-r from-amber-100/80 via-amber-50 to-cream-100 p-8 sm:p-12 border border-amber-200 shadow-soft overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Premium Culinary Table Booking
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-charcoal">
                Reserve Your Dining Experience
              </h1>
              <p className="text-xs sm:text-sm text-charcoal-100 max-w-lg leading-relaxed">
                Whether you&apos;re planning an intimate candlelit dinner, family celebrations, or a private corporate gathering, we ensure every detail is tailored to perfection.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-8 border-white shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
                  alt="Claypot Feast"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Reservation Form + Confirmed Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-cream-200 shadow-soft space-y-6">
            <div>
              <h2 className="text-2xl font-black text-charcoal">Book a Table</h2>
              <p className="text-xs text-charcoal-50 mt-1">Instant confirmation, zero cancellation fee</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Date & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" /> Booking Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-cream-200 bg-white text-charcoal outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-amber-500" /> Number of Guests
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full text-xs p-3 rounded-xl border border-cream-200 bg-white text-charcoal outline-none focus:border-amber-500 cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Person (Solo Table)" : "Guests (Party)"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-bold text-charcoal mb-2 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-500" /> Desired Time Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={`py-2 px-3 text-xs rounded-xl border font-bold transition-all ${
                        timeSlot === slot
                          ? "bg-amber-500 text-charcoal-dark border-amber-500 shadow-sm"
                          : "bg-white text-charcoal-200 border-cream-200 hover:border-amber-300"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seating preference */}
              <div>
                <label className="block text-xs font-bold text-charcoal mb-2 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" /> Seating Area
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {seatingOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSeatingPreference(opt)}
                      className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all ${
                        seatingPreference === opt
                          ? "bg-amber-50 border-amber-500 text-charcoal font-bold shadow-xs"
                          : "bg-white text-charcoal-200 border-cream-200 hover:border-amber-200"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest contact details */}
              <div className="pt-2 border-t border-cream-100 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Tuhin Ahmed"
                      className="w-full text-xs p-3 rounded-xl border border-cream-200 bg-white text-charcoal outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+880 1..."
                      className="w-full text-xs p-3 rounded-xl border border-cream-200 bg-white text-charcoal outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">Email for SMS/Confirmation</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@address.com"
                    className="w-full text-xs p-3 rounded-xl border border-cream-200 bg-white text-charcoal outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    Dietary Requirements or Special Requests
                  </label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Anniversary cake, wheelchair access, high chairs, quiet table..."
                    className="w-full text-xs p-3 rounded-xl border border-cream-200 bg-white text-charcoal outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-charcoal-dark font-black text-sm rounded-full shadow-hover hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Sparkles className="w-4 h-4" /> Confirm Table Reservation
              </button>
            </form>
          </div>

          {/* Right Column: Confirmed Booking / History */}
          <div className="lg:col-span-5 space-y-6">
            {lastConfirmed && (
              <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-200 shadow-soft space-y-4 animate-in fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-emerald-950">Reservation Confirmed!</h3>
                    <p className="text-[11px] text-emerald-800 font-mono">
                      Booking Ref: #{lastConfirmed.reservationNumber}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-emerald-200 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-charcoal-50">Date & Time:</span>
                    <strong className="text-charcoal">{lastConfirmed.date} @ {lastConfirmed.timeSlot}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-50">Party Size:</span>
                    <strong className="text-charcoal">{lastConfirmed.guestsCount} Guests</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-50">Seating:</span>
                    <strong className="text-charcoal">{lastConfirmed.seatingPreference}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-50">Guest:</span>
                    <strong className="text-charcoal">{lastConfirmed.name}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Existing Reservations */}
            <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-soft space-y-4">
              <h3 className="font-black text-base text-charcoal flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-500" /> Your Bookings ({reservations.length})
              </h3>

              <div className="space-y-3">
                {reservations.map((res) => (
                  <div
                    key={res.id}
                    className="p-4 rounded-2xl bg-cream-50/70 border border-cream-200 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-amber-700">{res.reservationNumber}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          res.status === "Confirmed"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {res.status}
                      </span>
                    </div>

                    <div className="font-bold text-charcoal">
                      {res.date} at {res.timeSlot}
                    </div>

                    <div className="text-charcoal-100 text-[11px]">
                      {res.guestsCount} Guests • {res.seatingPreference}
                    </div>

                    {res.specialRequests && (
                      <p className="text-[10px] italic text-charcoal-50">&quot;{res.specialRequests}&quot;</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Restaurant Dining Policy */}
            <div className="p-6 rounded-3xl bg-cream-100/70 border border-cream-200 text-xs space-y-2">
              <h4 className="font-bold text-charcoal flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-amber-600" /> Dining Guidelines
              </h4>
              <p className="text-charcoal-100 leading-relaxed text-[11px]">
                Tables are held for up to 15 minutes past your reserved time. Dress code is smart casual. For parties over 20 guests, please contact our events team at +880 1711 234567.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
