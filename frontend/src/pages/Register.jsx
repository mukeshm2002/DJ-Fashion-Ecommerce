import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { User, Mail, Lock, Phone, ArrowRight } from 'lucide-react';

export default function Register() {
  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await register(name, email, password, phone);
    setIsSubmitting(false);

    if (res.success) {
      addToast(`Account created successfully! Welcome ${res.user.name}`, 'success');
      navigate('/account');
    } else {
      addToast(res.message || 'Registration failed', 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-brand-surface p-8 rounded-card border border-brand-border shadow-subtle space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">NEW CUSTOMER</span>
          <h1 className="font-serif text-3xl font-bold text-brand-dark">Create Account</h1>
          <p className="text-xs text-brand-muted">Join DJ to track orders, save wishlists & get 10% off your first drop.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-brand-dark block mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-brand-muted absolute left-3 top-3.5" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ananya Sharma"
                required
                className="w-full text-xs pl-10 pr-3 py-3 bg-brand-bg rounded-btn border border-brand-border focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-brand-dark block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-brand-muted absolute left-3 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ananya@example.com"
                required
                className="w-full text-xs pl-10 pr-3 py-3 bg-brand-bg rounded-btn border border-brand-border focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-brand-dark block mb-1">Mobile Phone (Optional)</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-brand-muted absolute left-3 top-3.5" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full text-xs pl-10 pr-3 py-3 bg-brand-bg rounded-btn border border-brand-border focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-brand-dark block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-brand-muted absolute left-3 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                required
                minLength={6}
                className="w-full text-xs pl-10 pr-3 py-3 bg-brand-bg rounded-btn border border-brand-border focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-primary hover:bg-brand-hover text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-btn shadow-floating flex items-center justify-center gap-2 transition-colors"
          >
            <span>CREATE ACCOUNT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-brand-muted pt-2 border-t border-brand-border">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-brand-primary hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
