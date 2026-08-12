# DJ — Premium Fashion D2C E-Commerce Platform

> **"Style That Feels Like You."**  
> *Discover thoughtfully curated fashion designed for your everyday confidence.*  
> **Headquarters**: Tiruppur, Tamil Nadu, India  

---

## 🌟 Executive Overview
**DJ** is a production-grade, mobile-first D2C Fashion E-Commerce platform built with **React**, **Vite**, **Tailwind CSS**, **Node.js**, **Express.js**, and **MongoDB**. Designed as a real-world fashion business foundation, an executive portfolio, and a 3-Month Marketing Case Study ecosystem.

---

## ☁️ Render Production Deployment Guide

### Option A: Automatic Blueprint Deployment (Recommended)
1. Push this repository to **GitHub**.
2. Log into [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** ➔ **Blueprint**.
4. Connect your GitHub repository. Render will automatically detect `render.yaml` and provision:
   - **`dj-fashion-backend`** (Web Service, Node.js)
   - **`dj-fashion-frontend`** (Static Site, Vite React)
5. Set Environment Variables:
   - On `dj-fashion-backend`: `FRONTEND_URL=https://dj-fashion-frontend.onrender.com`
   - On `dj-fashion-frontend`: `VITE_API_URL=https://dj-fashion-backend.onrender.com/api`

### Option B: Manual Service Creation
1. **Backend Web Service (`dj-fashion-backend`)**:
   - **Type**: Web Service
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Health Check Path**: `/api/health`
2. **Frontend Static Site (`dj-fashion-frontend`)**:
   - **Type**: Static Site
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Rewrite Rule**: `/* -> /index.html` (Handled via `public/_redirects`)

---

## 💎 Key Platform Features

### 🛍️ Customer Storefront (27 Dedicated Screens)
- **Home Page (`/`)**: Edge-to-edge 85vh editorial hero, category campaign blocks, New Arrivals drop, Trending Now asymmetric edit, "Shop by Style", Deep Espresso Brand Story, Instagram UGC (`#DJStyle`), and newsletter signup.
- **Shop Catalog & Discovery (`/shop`)**: Left filter column + 4-column luxury catalogue grid on desktop, mobile bottom sheet drawer, and search filters.
- **Product Details (`/product/:slug`)**: Open gallery layout, size/color selectors, Size Guide Modal, quantity controls, "Complete the Look" recommendations, and direct WhatsApp size concierge button.
- **Cart Drawer & Free Shipping Progress Bar**: Warm Ivory slide-out cart drawer calculating free shipping progress (*"You're ₹X away from FREE SHIPPING"*), coupon validation (`WELCOME10`, `DJSTYLE500`), subtotal, tax, and shipping calculation.
- **Distraction-Free 5-Step Checkout (`/checkout`)**: Multi-step checkout with `<DJLogo />` supporting UPI, Credit/Debit Cards, NetBanking, and Cash on Delivery (COD).
- **Customer Account & Visual Order Tracker (`/account/orders/:id`)**: Step-by-step progress timeline (*Order Placed ➔ Confirmed ➔ Packed ➔ Shipped ➔ Out for Delivery ➔ Delivered*).

### 📊 Executive Admin Suite (`/admin/*`)
- **Dashboard Overview (`/admin/dashboard`)**: Live KPI cards for Total Revenue, Total Orders, Active Customers, Conversion Rate %, AOV, Low Stock Alerts, and Recent Orders.
- **Products Catalog CRUD (`/admin/products`)**: Add, edit, archive, and delete products with SKUs (`DJ-DRS-xxx`), color swatches, size arrays, stock counts, fabric composition, and status controls.
- **Orders Workflow (`/admin/orders`)**: Order status fulfillment pipeline management.
- **Meta Ads Campaigns (`/admin/campaigns`)**: Track campaign performance (Impressions, Clicks, Conversions, Revenue), Meta Pixel ID hooks (`PX-9842014-DJ`), and UTM tracking parameters.
- **Coupons Management (`/admin/coupons`) & Analytics Suite (`/admin/analytics`)**: Includes the **3-Month Marketing Case Study Module**.

---

## 🔑 Demo Credentials

| Role | Email | Password | Access Path |
| :--- | :--- | :--- | :--- |
| **Demo Customer** | `customer@djfashion.com` | `customer123` | `/account` |
| **Executive Admin** | `admin@djfashion.com` | `admin123` | `/admin/dashboard` |

---

## 📍 Business Location
**Brand Identity**: DJ  
**Location**: Tiruppur, Tamil Nadu, India  
**Target Local SEO**: Online Fashion Store in Tiruppur | Tamil Nadu Fashion E-Commerce  
