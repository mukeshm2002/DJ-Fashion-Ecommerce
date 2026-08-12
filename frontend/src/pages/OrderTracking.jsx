import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api.js';
import { Package, Truck, CheckCircle2, Clock, MapPin, Calendar, MessageCircle, ChevronLeft } from 'lucide-react';

export default function OrderTracking() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        if (data.success && data.order) {
          setOrder(data.order);
        } else {
          fallbackDemoOrder();
        }
      } catch (err) {
        fallbackDemoOrder();
      } finally {
        setLoading(false);
      }
    };

    const fallbackDemoOrder = () => {
      setOrder({
        _id: id,
        orderNumber: 'DJ-ORD-984201',
        createdAt: new Date().toISOString(),
        orderStatus: 'Shipped',
        trackingNumber: 'TRK-88492014',
        courierPartner: 'Bluedart Express',
        estimatedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        totalAmount: 3499,
        paymentMethod: 'UPI',
        paymentStatus: 'Paid',
        shippingAddress: {
          name: 'Ananya Sharma',
          phone: '+91 98765 11111',
          street: '402 Sunrise Heights, Indiranagar',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560038'
        },
        items: [
          {
            name: 'Seraphina Tiered Midi Dress',
            image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop',
            size: 'M',
            color: 'Wine Plum',
            quantity: 1,
            price: 3499
          }
        ]
      });
    };

    fetchOrderDetails();
  }, [id]);

  if (loading || !order) {
    return <div className="py-20 text-center text-brand-muted text-sm font-medium">Loading tracking timeline...</div>;
  }

  const steps = ['Placed', 'Confirmed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];

  const getStepStatusIndex = (status) => {
    const map = {
      'Pending': 0,
      'Confirmed': 1,
      'Packed': 2,
      'Shipped': 3,
      'Out for Delivery': 4,
      'Delivered': 5
    };
    return map[status] !== undefined ? map[status] : 1;
  };

  const currentStepIdx = getStepStatusIndex(order.orderStatus);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-brand-border pb-6">
        <div>
          <Link to="/account" className="text-xs font-bold text-brand-primary flex items-center gap-1 hover:underline mb-2">
            <ChevronLeft className="w-4 h-4" />
            <span>Back to My Orders</span>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-brand-dark">Tracking Order #{order.orderNumber}</h1>
          <p className="text-xs text-brand-muted mt-1">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>

        <a
          href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi DJ Support! I want an update on my order #${order.orderNumber}`)}`}
          target="_blank"
          rel="noreferrer"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase px-4 py-2.5 rounded-btn flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Ask On WhatsApp</span>
        </a>
      </div>

      {/* VISUAL TIMELINE TRACKER */}
      <div className="bg-brand-surface p-8 rounded-card border border-brand-border shadow-subtle space-y-8">
        <h2 className="font-serif text-lg font-bold text-brand-dark">Delivery Progress Timeline</h2>

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-0">
          
          {/* Connecting Bar */}
          <div className="hidden md:block absolute top-5 left-8 right-8 h-1 bg-brand-border z-0">
            <div
              className="h-full bg-brand-primary transition-all duration-500"
              style={{ width: `${(currentStepIdx / (steps.length - 1)) * 100}%` }}
            />
          </div>

          {steps.map((step, idx) => {
            const isCompleted = idx <= currentStepIdx;
            const isCurrent = idx === currentStepIdx;

            return (
              <div key={step} className="relative z-10 flex md:flex-col items-center gap-4 md:gap-2 text-left md:text-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-sm ${
                    isCompleted
                      ? 'bg-brand-primary text-white scale-105'
                      : 'bg-brand-bg text-brand-muted border border-brand-border'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${isCurrent ? 'text-brand-primary' : 'text-brand-dark'}`}>
                    {step}
                  </h4>
                  {isCurrent && <span className="text-[10px] text-emerald-700 font-bold uppercase block">Current Status</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Courier Info */}
        <div className="p-4 bg-brand-bg/60 rounded-btn border border-brand-border/60 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-brand-primary" />
            <div>
              <p className="font-bold text-brand-dark">Courier Partner: {order.courierPartner}</p>
              <p className="text-brand-muted">Tracking AWB: <strong>{order.trackingNumber}</strong></p>
            </div>
          </div>
          <div className="text-left sm:text-right font-semibold text-brand-dark">
            <span>Estimated Delivery: </span>
            <strong className="text-brand-primary block sm:inline">
              {new Date(order.estimatedDeliveryDate).toLocaleDateString()}
            </strong>
          </div>
        </div>
      </div>

      {/* ITEMS & ADDRESS BREAKDOWN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Ordered Items */}
        <div className="bg-brand-surface p-6 rounded-card border border-brand-border shadow-subtle space-y-4">
          <h3 className="font-serif text-base font-bold text-brand-dark border-b border-brand-border pb-3">Items in Order</h3>
          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-center">
                <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded bg-brand-bg" />
                <div>
                  <h4 className="font-bold text-xs text-brand-dark">{item.name}</h4>
                  <p className="text-brand-muted text-[11px]">Size: {item.size} • Color: {item.color} • Qty: {item.quantity}</p>
                  <p className="font-extrabold text-xs text-brand-primary mt-1">₹{item.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-brand-surface p-6 rounded-card border border-brand-border shadow-subtle space-y-4">
          <h3 className="font-serif text-base font-bold text-brand-dark border-b border-brand-border pb-3">Delivery Address</h3>
          <div className="space-y-1 text-xs text-brand-dark">
            <p className="font-bold text-sm">{order.shippingAddress.name}</p>
            <p className="text-brand-muted">{order.shippingAddress.street}</p>
            <p className="text-brand-muted">{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
            <p className="text-brand-muted pt-2">Phone: {order.shippingAddress.phone}</p>
          </div>
        </div>

      </div>

    </div>
  );
}
