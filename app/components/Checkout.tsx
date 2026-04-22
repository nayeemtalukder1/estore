"use client";

import { FC, useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Product } from '@/app/data/products';

interface CartItem extends Product {
  quantity: number;
}

interface CheckoutProps {
  items: CartItem[];
  onBackToCart: () => void;
  onOrderSuccess: () => void;
}

const Checkout: FC<CheckoutProps> = ({ items, onBackToCart, onOrderSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.discountedPrice * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Simulate a network delay
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      setTimeout(() => onOrderSuccess(), 2000);
    }, 1500);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
        <CheckCircle2 className="w-20 h-20 text-green-500 mb-6 animate-bounce" />
        <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase mb-2">Order Confirmed!</h2>
        <p className="text-gray-500">Thank you for your purchase. We've sent a receipt to your email.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Left Column: Form */}
          <div className="flex-1 space-y-12">
            {/* Contact Information */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-tight">Contact information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email address</label>
                  <input
                    type="email"
                    placeholder="nayeemtalukder882@gmail.com"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all"
                  />
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Shipping address</h2>
                <button className="text-xs font-bold text-indigo-600 hover:underline">Edit</button>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
                <p className="text-sm font-bold text-gray-900">Data Talukder</p>
                <p className="text-sm text-gray-500 leading-relaxed">Tarakemda, Mymensingh, Mymensingh, CA 22520, United States (US), +8801969148410</p>
              </div>
            </section>

            {/* Payment Options */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-tight">Payment options</h2>
              <div className="space-y-4">
                <div className="p-6 bg-gray-50 rounded-2xl border border-indigo-600/20 space-y-4">
                  <label className="flex items-center gap-4 cursor-pointer">
                    <input type="radio" name="payment" defaultChecked className="w-4 h-4 text-indigo-600 focus:ring-indigo-600" />
                    <span className="text-sm font-bold text-gray-900">Direct bank transfer</span>
                  </label>
                  <p className="text-xs text-gray-500 leading-relaxed pl-8">
                    Make your payment directly into our bank account. Please use your Order ID as reference.
                  </p>
                </div>
                <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-2xl cursor-pointer hover:border-indigo-600 transition-all">
                  <input type="radio" name="payment" className="w-4 h-4 text-indigo-600 focus:ring-indigo-600" />
                  <span className="text-sm font-bold text-gray-900">Cash on delivery</span>
                </label>
              </div>
            </section>

            <div className="pt-8 flex flex-col items-center gap-6">
              <p className="text-[10px] text-gray-400 text-center max-w-md leading-relaxed uppercase tracking-widest font-bold">
                By proceeding you agree to our <span className="text-gray-900 underline">Terms</span> and <span className="text-gray-900 underline">Privacy</span>
              </p>
              <div className="flex items-center gap-8 w-full">
                <button
                  onClick={onBackToCart}
                  className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Return to Basket
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className={`flex-1 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all ${isProcessing
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 text-white shadow-xl hover:bg-indigo-700 active:scale-95"
                    }`}
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-tight">Order summary</h2>

              <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-gray-900 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                      <p className="text-xs font-bold text-indigo-600 mt-1">{item.discountedPrice.toLocaleString()}৳</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-gray-900">{(item.discountedPrice * item.quantity).toLocaleString()}৳</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Subtotal</span>
                  <span className="font-black text-gray-900">{subtotal.toLocaleString()}৳</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Shipping</span>
                  <span className="font-black text-green-500 uppercase text-[10px] tracking-widest">Free</span>
                </div>
                <div className="pt-6 border-t border-gray-100 flex items-end justify-between">
                  <span className="text-lg font-black text-gray-900 uppercase tracking-tight">Total</span>
                  <span className="text-3xl font-black text-gray-900 tracking-tighter">{total.toLocaleString()}৳</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;