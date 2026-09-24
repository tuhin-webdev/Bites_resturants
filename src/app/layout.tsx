import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchModal } from "@/components/modals/SearchModal";
import { AuthModal } from "@/components/modals/AuthModal";
import { QuickViewModal } from "@/components/modals/QuickViewModal";
import { ReservationModal } from "@/components/modals/ReservationModal";
import { ToastContainer } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "Bites - We Serve The Taste You Love | Food E-Commerce & Dining",
  description:
    "Order exquisite gourmet cuisine, reserve your favorite dining table, and enjoy lightning-fast food delivery with Bites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className="min-h-screen flex flex-col bg-[#FCFBF7] text-[#1E1B18] antialiased selection:bg-amber-200 selection:text-amber-900 pb-16 md:pb-0"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileNav />

        {/* Global Drawers & Modals */}
        <CartDrawer />
        <SearchModal />
        <AuthModal />
        <QuickViewModal />
        <ReservationModal />
        <ToastContainer />
      </body>
    </html>
  );
}
