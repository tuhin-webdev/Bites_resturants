"use client";

import React, { useState } from "react";
import { useUIStore } from "@/store/uiStore";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const { addToast } = useUIStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSent(true);
    addToast("Your message has been sent to our dining concierge! 📩", "success");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Banner */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
            We Are Here For You
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-charcoal">
            Get in Touch with Bites
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-100 leading-relaxed">
            Have questions about catering, private party reservations, allergen specifics, or delivery tracking? Reach out to our hospitable team anytime.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-soft space-y-2 text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-charcoal">Our Restaurant</h3>
            <p className="text-xs text-charcoal-100">House 42, Road 11, Block D, Banani, Dhaka</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-soft space-y-2 text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-charcoal">Direct Line</h3>
            <p className="text-xs text-charcoal-100">+880 1711 234567 / +880 2 9876543</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-soft space-y-2 text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-charcoal">Email Support</h3>
            <p className="text-xs text-charcoal-100">concierge@bitesrestaurant.com</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-soft space-y-2 text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-charcoal">Opening Hours</h3>
            <p className="text-xs text-charcoal-100">Mon - Sun: 10:00 AM - 11:30 PM (24/7 Delivery)</p>
          </div>
        </div>

        {/* Form and Map Simulation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-cream-200 shadow-soft space-y-6">
            <h2 className="text-2xl font-black text-charcoal">Send Us a Direct Message</h2>

            {sent ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2 animate-in fade-in">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm text-emerald-950">Message Sent Successfully!</h4>
                <p className="text-xs text-emerald-800">
                  Our food hospitality representative will get back to you within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maria Sharapova"
                      className="w-full text-xs p-3 rounded-xl border border-cream-200 outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@email.com"
                      className="w-full text-xs p-3 rounded-xl border border-cream-200 outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">Topic / Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-cream-200 outline-none focus:border-amber-500 bg-white"
                  >
                    <option value="General Inquiry">General Dining Inquiry</option>
                    <option value="Table Reservation">Large Party Reservation (10+ guests)</option>
                    <option value="Corporate Catering">Corporate Catering / Event Request</option>
                    <option value="Delivery Feedback">Delivery & Order Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us how we can help your culinary experience..."
                    className="w-full text-xs p-3 rounded-xl border border-cream-200 outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-charcoal-dark font-black text-xs rounded-full shadow-hover transition-all flex items-center gap-2 active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* Location Map Visual Simulation */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-cream-200 shadow-soft space-y-4">
            <h3 className="font-black text-lg text-charcoal">Restaurant Location</h3>
            <div className="relative w-full h-72 rounded-2xl overflow-hidden bg-cream-100 border border-cream-200 flex items-center justify-center p-4 text-center">
              {/* Map mockup background */}
              <div className="space-y-3 z-10 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-md border border-amber-200 max-w-xs">
                <MapPin className="w-8 h-8 text-amber-500 mx-auto animate-bounce" />
                <h4 className="font-bold text-xs text-charcoal">Bites Gourmet Kitchen</h4>
                <p className="text-[11px] text-charcoal-100">
                  House 42, Road 11, Banani Commercial District, Dhaka
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-[11px] font-bold text-amber-600 hover:underline"
                >
                  Open in Google Maps ↗
                </a>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cream-50 text-xs space-y-1 text-charcoal-100">
              <strong className="text-charcoal block">Valet Parking & Accessibility:</strong>
              <p>Complimentary valet parking available at front gate. Wheelchair ramp accessible.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
