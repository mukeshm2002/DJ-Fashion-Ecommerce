import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { Lock, Mail, ArrowRight, UserCheck } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await login(email, password);
    setIsSubmitting(false);

    if (res.success) {
      addToast(`Welcome back, ${res.user.name}!`, 'success');
      if (res.user.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/account');
      }
    } else {
      addToast(res.message || 'Login failed', 'error');
    }
  };

  const fillDemoAdmin = () => {
    setEmail('admin@djfashion.com');
    setPassword('admin123');
  };

  const fillDemoCustomer = () => {
    setEmail('customer@djfashion.com');
    setPassword('customer123');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-brand-surface p-8 rounded-card border border-brand-border shadow-subtle space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">AUTHENTICATION</span>
          <h1 className="font-serif text-3xl font-bold text-brand-dark">Sign In</h1>
          <p className="text-xs text-brand-muted">Enter your email and password to access your DJ account.</p>
        </div>

        {/* Demo Quick Fill Buttons */}
        <div className="p-3 bg-brand-bg rounded-btn border border-brand-border/80 text-xs space-y-2">
          <p className="font-bold text-brand-dark text-[11px] uppercase tracking-wider">Demo One-Click Credentials:</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={fillDemoCustomer}
              type="button"
              className="py-1.5 px-2 bg-white hover:bg-brand-secondary text-brand-primary font-bold text-[11px] rounded border border-brand-border"
            >
              Demo Customer
            </button>
            <button
              onClick={fillDemoAdmin}
              type="button"
              className="py-1.5 px-2 bg-brand-primary text-white font-bold text-[11px] rounded"
            >
              Demo Admin Panel
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-brand-dark block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-brand-muted absolute left-3 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer@djfashion.com"
                required
                className="w-full text-xs pl-10 pr-3 py-3 bg-brand-bg rounded-btn border border-brand-border focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-brand-dark">Password</label>
              <Link to="/forgot-password" className="text-[11px] font-semibold text-brand-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-brand-muted absolute left-3 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full text-xs pl-10 pr-3 py-3 bg-brand-bg rounded-btn border border-brand-border focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-primary hover:bg-brand-hover text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-btn shadow-floating flex items-center justify-center gap-2 transition-colors"
          >
            <span>SIGN IN</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-brand-muted pt-2 border-t border-brand-border">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-brand-primary hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
