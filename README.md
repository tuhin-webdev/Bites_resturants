# Bites - Gourmet Food E-Commerce & Dining Platform

A full-stack, production-ready, fully responsive E-Commerce Restaurant Website built with Next.js, TypeScript, Tailwind CSS, and Zustand. Inspired by modern fine-dining aesthetics (Cream `#FCFBF7`, Warm Amber `#F59E0B`, Charcoal `#1E1B18`, and soft rounded cards).

![Bites Brand Mockup](https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Key Features

### 1. Visual & Aesthetic Architecture
- **Color Palette**: Cream (`#FCFBF7`), Warm Amber (`#F59E0B`), Charcoal (`#1E1B18`), Emerald accents for verified tags.
- **Card Styling**: Pill buttons, soft rounded borders (`rounded-3xl`), subtle shadows, and food image hover zoom.
- **Responsive Layout**: Pixel-perfect on Mobile (with dedicated sticky mobile navigation), Tablet, and Desktop.

### 2. Global Navigation & Layout
- **Sticky Navbar**:
  - Brand Logo & Navigation Links (`Home`, `Menu`, `Deals`, `Reservation`, `Contact`).
  - Search trigger modal (`Cmd/Ctrl + K` live auto-complete search).
  - Cart drawer trigger with live item count badge.
  - Wishlist icon with counter badge.
  - User Account Dropdown (`Profile`, `Orders`, `Wishlist`, `Sign Out`).
  - Table Reservation CTA button.
- **Footer**:
  - VIP newsletter subscription with instant confirmation.
  - Categorized site links (Services, Quick Links, Policies, Help).
  - Payment gateway badges: **VISA**, **Mastercard**, **bKash**, **Nagad**, **Cash on Delivery**.
  - Social media links & copyright info.
- **Floating Cart & Mobile Nav**:
  - Sticky bottom navigation on mobile devices with prominent cart trigger badge.

### 3. Complete Page Breakdown
1. **Home Page (`/`)**:
   - Hero banner with *"We Serve The Taste You Love 😍"*, floating category pills (Dishes, Dessert, Drinks, Pasta, Snacks), and decorative concentric ring plate presentation.
   - Popular Dishes carousel with prev/next navigation arrows.
   - *"We Are More Than Multiple Service"* with chef collage montage & 6 service features.
   - *"Our Regular Menu Pack"* with interactive tab categories and 8-card responsive product grid.
   - *"Do You Have Any Dinner Plan Today? Reserve Your Table"* callout banner with claypot roast image.
   - *"What Our Customer Says?"* testimonial slider.
   - *"Meet Our Chefs"* featuring 4 executive chef profile cards.
   - *"Download Our Mobile App"* promo with realistic smartphone mockup and App Store badges.

2. **Full Shop / Menu Page (`/menu`)**:
   - Multi-category filtering (Special Dishes, Italian, Mexican, Japanese, Fast Food, Desserts, Drinks, Lunch, Dinner).
   - Advanced filters: Price slider ($15 - $100), Dietary checkboxes (Veg, Non-Veg, Halal, Gluten-Free, Vegan), Spicy level filters, and Minimum Rating filters.
   - Sorting options: Popular Dishes, Price (Low to High, High to Low), Top Rated.
   - Product cards with quick add-to-cart, wishlist toggle, and quick view modal.

3. **Single Product Detail Page (`/menu/[id]`)**:
   - Image gallery with interactive mouse-hover zoom and thumbnail previews.
   - Dietary badges, SKU, stock status, prep time, calories, and spice meter.
   - Portion size selector, sauce selection, optional add-ons/extras, and custom cooking instructions.
   - Quantity counter with real-time total price calculation.
   - Customer Reviews & Ratings section with photo uploads and new review submission form.
   - *"Frequently Bought Together"* companion bundle with 1-click add-both-to-cart.
   - Related Dishes carousel.

4. **Shopping Cart (`/cart`) & Slide-Over Mini-Cart Drawer**:
   - Slide-over drawer accessible from any page + dedicated `/cart` page.
   - Free shipping progress bar (`Add $X more for Free Delivery!`).
   - Voucher code coupon applicator (Try `BITES20` or `FEAST30`).
   - Item breakdown with custom options, quantity increment/decrement, and deletion.
   - Real-time subtotal, discount, delivery fee, and tax/VAT calculation.

5. **Checkout Page (`/checkout`)**:
   - Step 1: Delivery Address (Saved addresses selector, custom address form, delivery instructions).
   - Step 2: Delivery Option (Standard, Priority Express, Table/Dine-In Pickup).
   - Step 3: Payment Method (Online card with format validation, bKash, Nagad, Cash on Delivery).
   - Sticky real-time order breakdown and instant validation.

6. **Order Confirmation & Live Order Radar (`/order-confirmation/[orderId]`)**:
   - Celebration screen with confetti animation.
   - Live Order Status Tracker:
     1. `Order Placed` -> 2. `Kitchen Preparing` -> 3. `Out for Delivery` -> 4. `Delivered`.
   - Interactive status simulation button (`Simulate Next Status ⏩`) to test the full lifecycle.
   - Dedicated Courier / Rider profile card with vehicle details and direct call button.
   - Downloadable / Printable PDF Tax Invoice receipt.

7. **Table Reservation System (`/reservation`)**:
   - Date picker, guest count selector, time slot buttons, and seating area options (Indoor Main Hall, Outdoor Garden Terrace, Rooftop View, VIP Private Room).
   - Instant booking confirmation card with reference ID and existing bookings list.

8. **User Dashboard (`/dashboard`)**:
   - Profile information management & password reset.
   - Saved delivery addresses (Add, delete, set default).
   - Order history with re-order button and direct links to live radar tracking.
   - Saved wishlist items.

9. **Deals & Daily Bundles (`/deals`)**:
   - Active voucher cards with 1-click copy & apply.
   - Limited-time discounted dishes showcase.

10. **Contact & Location (`/contact`)**:
    - Direct inquiry form with subject routing.
    - Restaurant hours, phone numbers, and simulated interactive location map.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand with persistent storage (`cartStore`, `userStore`, `wishlistStore`, `uiStore`)
- **Icons**: Lucide React + custom inline brand SVGs
- **Celebration Animations**: `canvas-confetti`

---

## 🚀 Getting Started

1. Clone or navigate into the workspace:
   ```bash
   cd "c:\Tuhinwebdev\Food Ecom Web site"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

5. Build for production:
   ```bash
   npm run build
   npm run start
   ```
