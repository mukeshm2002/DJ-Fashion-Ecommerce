import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { BrandProvider } from './context/BrandContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';

// Customer Components & Layouts
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import MobileStickyBar from './components/MobileStickyBar.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import WhatsAppFloat from './components/WhatsAppFloat.jsx';

// Customer Pages
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Checkout from './pages/Checkout.jsx';
import Account from './pages/Account.jsx';
import OrderTracking from './pages/OrderTracking.jsx';
import CampaignLanding from './pages/CampaignLanding.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import FAQ from './pages/FAQ.jsx';
import PolicyPages from './pages/PolicyPages.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

// Admin Components & Pages
import AdminLayout from './layouts/AdminLayout.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminProducts from './pages/admin/AdminProducts.jsx';
import AdminOrders from './pages/admin/AdminOrders.jsx';
import AdminCampaigns from './pages/admin/AdminCampaigns.jsx';
import AdminCoupons from './pages/admin/AdminCoupons.jsx';
import AdminAnalytics from './pages/admin/AdminAnalytics.jsx';

// Customer Layout Shell
function CustomerLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileStickyBar />
      <CartDrawer />
      <WhatsAppFloat />
    </div>
  );
}

export default function App() {
  return (
    <BrandProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ToastProvider>
              <BrowserRouter>
                <Routes>
                  {/* CUSTOMER FRONT STOREFRONT ROUTES */}
                  <Route path="/" element={<CustomerLayout />}>
                    <Route index element={<Home />} />
                    <Route path="shop" element={<Shop />} />
                    <Route path="category/:category" element={<Shop />} />
                    <Route path="product/:slug" element={<ProductDetails />} />
                    <Route path="new-arrivals" element={<Shop />} />
                    <Route path="best-sellers" element={<Shop />} />
                    <Route path="trending" element={<Shop />} />
                    <Route path="offers" element={<Shop />} />
                    <Route path="search" element={<Shop />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="faq" element={<FAQ />} />
                    <Route path="shipping" element={<PolicyPages />} />
                    <Route path="returns" element={<PolicyPages />} />
                    <Route path="privacy" element={<PolicyPages />} />
                    <Route path="terms" element={<PolicyPages />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="forgot-password" element={<Login />} />
                    <Route path="account" element={<Account />} />
                    <Route path="account/orders" element={<Account />} />
                    <Route path="account/orders/:id" element={<OrderTracking />} />
                    <Route path="wishlist" element={<Wishlist />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="campaign/:slug" element={<CampaignLanding />} />
                  </Route>

                  {/* ADMIN PANEL ROUTES */}
                  <Route path="/admin/login" element={<Login />} />
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="categories" element={<AdminProducts />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="customers" element={<AdminDashboard />} />
                    <Route path="inventory" element={<AdminProducts />} />
                    <Route path="coupons" element={<AdminCoupons />} />
                    <Route path="campaigns" element={<AdminCampaigns />} />
                    <Route path="reviews" element={<AdminProducts />} />
                    <Route path="content" element={<AdminCampaigns />} />
                    <Route path="analytics" element={<AdminAnalytics />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </ToastProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrandProvider>
  );
}
