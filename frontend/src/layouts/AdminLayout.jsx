import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { DJLogo } from '../components/DJLogo.jsx';
import {
  LayoutDashboard,
  ShoppingBag,
  FolderTree,
  Boxes,
  ClipboardList,
  Users,
  Tag,
  Megaphone,
  Star,
  Image,
  BarChart3,
  LogOut,
  ArrowLeft
} from 'lucide-react';

export default function AdminLayout() {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user || !isAdmin) {
    return (
      <div className="max-w-md mx-auto py-24 text-center space-y-4 px-4 font-sans">
        <h2 className="font-serif text-2xl font-bold text-rose-700">Admin Authorization Required</h2>
        <p className="text-xs text-brand-muted">You must log in with an administrator account to access the DJ Admin Panel.</p>
        <Link to="/login" className="inline-block bg-brand-dark text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-btn">
          Go To Login
        </Link>
      </div>
    );
  }

  const navItems = [
    { label: 'Dashboard Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Products Catalog', path: '/admin/products', icon: ShoppingBag },
    { label: 'Categories', path: '/admin/categories', icon: FolderTree },
    { label: 'Inventory Control', path: '/admin/inventory', icon: Boxes },
    { label: 'Orders Workflow', path: '/admin/orders', icon: ClipboardList },
    { label: 'Customers LTV', path: '/admin/customers', icon: Users },
    { label: 'Discount Coupons', path: '/admin/coupons', icon: Tag },
    { label: 'Meta Ads Campaigns', path: '/admin/campaigns', icon: Megaphone },
    { label: 'Review Moderation', path: '/admin/reviews', icon: Star },
    { label: 'CMS Content & Banners', path: '/admin/content', icon: Image },
    { label: 'Analytics Command', path: '/admin/analytics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-brand-bg flex font-sans">
      
      {/* Admin Sidebar Navigation */}
      <aside className="w-64 bg-brand-dark text-white p-6 flex flex-col justify-between shrink-0 shadow-xl border-r border-white/10 hidden md:flex">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <DJLogo variant="light" />
            <span className="text-[10px] font-sans font-bold bg-brand-accent text-brand-dark px-2 py-0.5 rounded uppercase">ADMIN</span>
          </div>

          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-semibold text-brand-accent hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return To Storefront</span>
          </Link>

          <nav className="space-y-1 pt-4 border-t border-white/10 text-xs font-medium">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-btn transition-all ${
                    isActive
                      ? 'bg-brand-secondary text-brand-dark font-bold shadow-md'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0 text-brand-accent" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Account & Logout */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs">
          <div>
            <p className="font-bold text-white leading-none">{user.name}</p>
            <span className="text-[10px] text-white/50">{user.email}</span>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="p-2 text-white/60 hover:text-rose-400"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}
