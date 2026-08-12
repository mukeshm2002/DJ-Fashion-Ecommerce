import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { DJLogo } from '../components/DJLogo.jsx';
import api from '../services/api.js';
import { Check, ShieldCheck, Lock, CreditCard, Smartphone, Banknote, ArrowRight, Truck, ChevronRight } from 'lucide-react';

export default function Checkout() {
  const { cartItems, subtotal, couponDiscount, shippingFee, tax, grandTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: user?.addresses?.[0]?.street || '',
    city: user?.addresses?.[0]?.city || '',
    state: user?.addresses?.[0]?.state || 'Tamil Nadu',
    pincode: user?.addresses?.[0]?.pincode || '',
    deliveryOption: 'EXPRESS',
    paymentMethod: 'UPI',
    upiId: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4 font-sans">
        <h2 className="font-serif text-2xl font-bold text-brand-dark">Your Bag is Empty</h2>
        <p className="text-xs text-brand-muted">Please add items to your cart before proceeding to checkout.</p>
        <Link to="/shop" className="inline-block bg-brand-dark text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-btn">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCompleteOrder = async () => {
    setIsSubmitting(true);
    try {
      const orderPayload = {
        items: cartItems,
        shippingAddress: {
          name: formData.name,
          phone: formData.phone,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        paymentMethod: formData.paymentMethod,
        subtotal,
        discount: couponDiscount,
        shippingFee,
        tax,
        totalAmount: grandTotal,
      };

      let createdOrder;
      try {
        const { data } = await api.post('/orders', orderPayload);
        if (data.success) {
          createdOrder = data.order;
        }
      } catch (err) {
        // Fallback for demo mode
        createdOrder = {
          _id: `ord-demo-${Date.now()}`,
          orderNumber: `DJ-ORD-${Date.now().toString().slice(-6)}`,
          orderStatus: 'Confirmed',
          totalAmount: grandTotal,
        };
      }

      clearCart();
      addToast('Order Placed Successfully!', 'success');
      navigate(`/account/orders/${createdOrder._id || createdOrder.orderNumber}`);
    } catch (error) {
      addToast(error.message || 'Payment processing failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      
      {/* Checkout Distraction-Free Header */}
      <div className="border-b border-brand-border pb-6 flex items-center justify-between">
        <DJLogo variant="dark" />
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>256-BIT ENCRYPTED SECURE CHECKOUT</span>
        </div>
      </div>

      {/* Stepper Bar */}
      <div className="flex items-center justify-between max-w-2xl mx-auto border-b border-brand-border pb-4 text-xs font-bold uppercase tracking-wider">
        <span className={activeStep >= 1 ? 'text-brand-dark font-extrabold' : 'text-brand-muted'}>1. Contact</span>
        <ChevronRight className="w-4 h-4 text-brand-muted" />
        <span className={activeStep >= 2 ? 'text-brand-dark font-extrabold' : 'text-brand-muted'}>2. Address</span>
        <ChevronRight className="w-4 h-4 text-brand-muted" />
        <span className={activeStep >= 3 ? 'text-brand-dark font-extrabold' : 'text-brand-muted'}>3. Delivery</span>
        <ChevronRight className="w-4 h-4 text-brand-muted" />
        <span className={activeStep >= 4 ? 'text-brand-dark font-extrabold' : 'text-brand-muted'}>4. Payment</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT: CHECKOUT STEPS FORM */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* STEP 1 & 2: CONTACT & SHIPPING ADDRESS */}
          <div className="bg-brand-surface p-6 rounded-card border border-brand-border space-y-4 shadow-subtle">
            <h3 className="font-serif text-lg font-bold text-brand-dark flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-dark text-white text-xs flex items-center justify-center font-mono">1</span>
              <span>Shipping & Contact Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-brand-dark block mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ananya Sharma"
                  required
                  className="w-full text-xs p-3 bg-brand-bg rounded-btn border border-brand-border focus:outline-none focus:border-brand-dark"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-brand-dark block mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="ananya@example.com"
                  required
                  className="w-full text-xs p-3 bg-brand-bg rounded-btn border border-brand-border focus:outline-none focus:border-brand-dark"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-brand-dark block mb-1">Mobile Phone (For SMS Tracking)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  required
                  className="w-full text-xs p-3 bg-brand-bg rounded-btn border border-brand-border focus:outline-none focus:border-brand-dark"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-brand-dark block mb-1">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="641601"
                  required
                  className="w-full text-xs p-3 bg-brand-bg rounded-btn border border-brand-border focus:outline-none focus:border-brand-dark"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-brand-dark block mb-1">Flat / Building / Street Address</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  placeholder="Street Address, Tiruppur"
                  required
                  className="w-full text-xs p-3 bg-brand-bg rounded-btn border border-brand-border focus:outline-none focus:border-brand-dark"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-brand-dark block mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Tiruppur"
                  required
                  className="w-full text-xs p-3 bg-brand-bg rounded-btn border border-brand-border focus:outline-none focus:border-brand-dark"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-brand-dark block mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Tamil Nadu"
                  required
                  className="w-full text-xs p-3 bg-brand-bg rounded-btn border border-brand-border focus:outline-none focus:border-brand-dark"
                />
              </div>
            </div>
          </div>

          {/* STEP 3: PAYMENT METHOD SELECTION */}
          <div className="bg-brand-surface p-6 rounded-card border border-brand-border space-y-4 shadow-subtle">
            <h3 className="font-serif text-lg font-bold text-brand-dark flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-dark text-white text-xs flex items-center justify-center font-mono">2</span>
              <span>Payment Option</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'UPI', label: 'UPI / GPay / PhonePe', icon: Smartphone },
                { id: 'Card', label: 'Credit / Debit Card', icon: CreditCard },
                { id: 'NetBanking', label: 'Net Banking', icon: ShieldCheck },
                { id: 'COD', label: 'Cash on Delivery', icon: Banknote },
              ].map((method) => {
                const Icon = method.icon;
                const isSelected = formData.paymentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                    className={`p-4 rounded-btn border text-left flex flex-col justify-between transition-all ${
                      isSelected
                        ? 'border-brand-dark bg-brand-secondary text-brand-dark font-bold shadow-sm'
                        : 'border-brand-border bg-brand-bg text-brand-dark hover:border-brand-muted'
                    }`}
                  >
                    <Icon className="w-5 h-5 mb-2 text-brand-accent" />
                    <span className="text-xs">{method.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* COMPLETE ORDER BUTTON */}
          <button
            onClick={handleCompleteOrder}
            disabled={isSubmitting || !formData.name || !formData.street || !formData.pincode}
            className="w-full bg-brand-dark hover:bg-brand-hover text-white font-sans text-xs font-bold uppercase tracking-widest py-4 rounded-btn shadow-floating flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>PROCESSING PAYMENT...</span>
            ) : (
              <>
                <span>PLACE ORDER • ₹{grandTotal.toLocaleString()}</span>
                <ArrowRight className="w-4 h-4 text-brand-accent" />
              </>
            )}
          </button>
        </div>

        {/* RIGHT: ORDER SUMMARY CARD */}
        <div className="lg:col-span-5 bg-brand-surface p-6 rounded-card border border-brand-border shadow-subtle space-y-6 h-fit sticky top-24">
          <h3 className="font-serif text-lg font-bold text-brand-dark border-b border-brand-border pb-3">
            Order Summary ({cartItems.length} items)
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-3 text-xs">
                <img src={item.image} alt={item.name} className="w-14 h-16 object-cover rounded bg-brand-bg shrink-0" />
                <div className="flex-1">
                  <h4 className="font-semibold text-brand-dark line-clamp-1">{item.name}</h4>
                  <p className="text-brand-muted text-[10px]">Qty: {item.quantity} • {item.size} / {item.color}</p>
                  <p className="font-mono font-bold text-brand-dark mt-1">₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs pt-4 border-t border-brand-border text-brand-dark">
            <div className="flex justify-between">
              <span className="text-brand-muted">Subtotal</span>
              <span className="font-mono font-semibold">₹{subtotal.toLocaleString()}</span>
            </div>
            {couponDiscount > 0 && (
              <div className="flex justify-between text-emerald-800 font-bold">
                <span>Discount</span>
                <span className="font-mono">-₹{couponDiscount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-brand-muted">Express Shipping</span>
              <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-brand-dark pt-3 border-t border-brand-border">
              <span>Total Payable</span>
              <span className="font-mono text-brand-dark">₹{grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
