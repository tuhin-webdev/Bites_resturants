"use client";

import React, { useState } from "react";
import { useUIStore } from "@/store/uiStore";
import { useUserStore } from "@/store/userStore";
import { X, Mail, Lock, User, ArrowRight, CheckCircle2 } from "lucide-react";

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, authModalTab, closeAuthModal, openAuthModal, addToast } = useUIStore();
  const { login } = useUserStore();

  const [email, setEmail] = useState("tuhin@example.com");
  const [password, setPassword] = useState("password123");
  const [name, setName] = useState("Tuhin Ahmed");
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (authModalTab === "forgot") {
        addToast(`Password reset link sent to ${email}`, "info");
        openAuthModal("login");
      } else {
        login(email, name);
        addToast(`Welcome back, ${name || "Foodie"}! 👋`, "success");
        closeAuthModal();
      }
    }, 600);
  };

  const handleDemoLogin = () => {
    login("tuhin@example.com", "Tuhin Ahmed");
    addToast("Logged in with Demo Account! 🎉", "success");
    closeAuthModal();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="User Authentication"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm"
      onClick={closeAuthModal}
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-cream-200 transform animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-cream-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold tracking-wider text-amber-600 uppercase">
              Bites Member Access
            </span>
            <h3 className="text-xl font-black text-charcoal">
              {authModalTab === "login"
                ? "Sign In to Your Account"
                : authModalTab === "register"
                ? "Create Your Account"
                : "Reset Your Password"}
            </h3>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-2 rounded-full hover:bg-cream-100 text-gray-400 hover:text-charcoal transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {authModalTab === "register" && (
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1.5">
                Full Name
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-3.5 w-4 h-4 text-charcoal-50" />
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tuhin Ahmed"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm text-charcoal"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1.5">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 w-4 h-4 text-charcoal-50" />
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm text-charcoal"
              />
            </div>
          </div>

          {authModalTab !== "forgot" && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-charcoal">Password</label>
                {authModalTab === "login" && (
                  <button
                    type="button"
                    onClick={() => openAuthModal("forgot")}
                    className="text-xs font-medium text-amber-600 hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 w-4 h-4 text-charcoal-50" />
                <input
                  type="password"
                  required
                  autoComplete={authModalTab === "login" ? "current-password" : "new-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm text-charcoal"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-charcoal-dark font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-charcoal-dark border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                {authModalTab === "login"
                  ? "Sign In"
                  : authModalTab === "register"
                  ? "Create Account"
                  : "Send Reset Link"}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Quick Demo Login Option */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 bg-cream-100 hover:bg-cream-200 border border-amber-200/80 text-charcoal font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-600" />
              Instant Demo Sign In (1-Click)
            </button>
          </div>
        </form>

        {/* Modal Footer switcher */}
        <div className="p-4 bg-cream-50 border-t border-cream-100 text-center text-xs text-charcoal-100">
          {authModalTab === "login" ? (
            <p>
              Don&apos;t have an account yet?{" "}
              <button
                onClick={() => openAuthModal("register")}
                className="font-bold text-amber-600 hover:underline"
              >
                Sign Up Now
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => openAuthModal("login")}
                className="font-bold text-amber-600 hover:underline"
              >
                Sign In Instead
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
