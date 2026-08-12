import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import api from '../services/api.js';
import { Package, Heart, MapPin, User, LogOut, ExternalLink, ChevronRight, Clock, CheckCircle2 } from 'lucide-react';

export default function Account() {
  const { user, logout } = useAuth();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const { data } = await api.get('/orders/myorders');
        if (data.success) {
          setOrders(data.orders);
        } else {
          fallbackDemoOrders();
        }
      } catch (err) {
        fallbackDemoOrders();
      } finally {
        setLoading(false);
      }
    };

    const fallbackDemoOrders = () => {
      setOrders([
        {
          _id: 'ord-demo-001',
          orderNumber: 'DJ-ORD-984201',
          createdAt: new Date().toISOString(),
          orderStatus: 'Confirmed',
          totalAmount: 3499,
          items: [
            { name: 'Seraphina Tiered Midi Dress', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400&auto=format&fit=crop', quantity: 1, price: 3499 }
          ]
        }
      ]);
    };

    fetchUserOrders();
  }, []);

  if (!user) {
    navigate('/login');
    return null;
  }

  const pendingCount = orders.filter(o => o.orderStatus !== 'Delivered' && o.orderStatus !== 'Cancelled').length;
  const deliveredCount = orders.filter(o => o.orderStatus === 'Delivered').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Header */}
      <div className="border-b border-brand-border pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">CUSTOMER DASHBOARD</span>
          <h1 className="font-serif text-3xl font-bold text-brand-dark mt-1">Welcome back, {user.name}</h1>
          <p className="text-xs text-brand-muted mt-1">{user.email} • Member since 2026</p>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-800 bg-rose-50 px-4 py-2.5 rounded-btn border border-rose-200"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-brand-surface p-5 rounded-card border border-brand-border shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-brand-dark">{orders.length}</span>
            <p className="text-xs font-medium text-brand-muted">Total Orders</p>
          </div>
        </div>

        <div className="bg-brand-surface p-5 rounded-card border border-brand-border shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-brand-dark">{pendingCount}</span>
            <p className="text-xs font-medium text-brand-muted">Pending Orders</p>
          </div>
        </div>

        <div className="bg-brand-surface p-5 rounded-card border border-brand-border shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-brand-dark">{deliveredCount}</span>
            <p className="text-xs font-medium text-brand-muted">Delivered</p>
          </div>
        </div>

        <Link to="/wishlist" className="bg-brand-surface p-5 rounded-card border border-brand-border shadow-subtle flex items-center gap-4 hover:border-brand-primary transition-colors">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-brand-dark">{wishlistCount}</span>
            <p className="text-xs font-medium text-brand-muted">Wishlist Items</p>
          </div>
        </Link>
      </div>

      {/* Recent Orders List */}
      <div className="bg-brand-surface p-6 rounded-card border border-brand-border shadow-subtle space-y-6">
        <div className="flex items-center justify-between border-b border-brand-border pb-4">
          <h2 className="font-serif text-xl font-bold text-brand-dark">Recent Orders</h2>
        </div>

        {orders.length === 0 ? (
          <div className="py-12 text-center text-brand-muted text-xs space-y-3">
            <Package className="w-8 h-8 mx-auto" />
            <p>You haven't placed any orders yet.</p>
            <Link to="/shop" className="inline-block bg-brand-primary text-white font-bold text-xs px-5 py-2.5 rounded-btn uppercase">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((ord) => (
              <div
                key={ord._id}
                className="p-4 bg-brand-bg/50 rounded-card border border-brand-border/60 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-brand-bg rounded-lg overflow-hidden border shrink-0">
                    <img src={ord.items?.[0]?.image} alt="Order item" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">Order ID: {ord.orderNumber}</span>
                    <h3 className="font-bold text-sm text-brand-dark line-clamp-1">{ord.items?.[0]?.name}</h3>
                    <p className="text-xs text-brand-muted mt-0.5">
                      Placed on {new Date(ord.createdAt).toLocaleDateString()} • {ord.items?.length || 1} Item(s)
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-brand-border">
                  <div className="text-left md:text-right">
                    <span className="text-sm font-extrabold text-brand-primary block">₹{ord.totalAmount?.toLocaleString()}</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-brand-secondary text-brand-primary inline-block">
                      {ord.orderStatus}
                    </span>
                  </div>

                  <Link
                    to={`/account/orders/${ord._id}`}
                    className="bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-btn flex items-center gap-1"
                  >
                    <span>Track Order</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
