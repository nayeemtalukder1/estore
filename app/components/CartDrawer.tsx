"use client";

import { motion, AnimatePresence } from 'framer-motion'; // Using framer-motion consistently
import { X, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { FC, useMemo } from 'react';

// Interfaces remain the same as your snippet...
interface Product {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onNavigateToCheckout: () => void; // New prop for navigation
}

const CartDrawer: FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
  onNavigateToCheckout
}) => {
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.discountedPrice * item.quantity, 0);
  }, [items]);

  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-black text-gray-900 tracking-tighter uppercase italic">Bag</h2>
                <span className="bg-gray-900 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-900" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingBag className="w-12 h-12 text-gray-200 mb-4" />
                  <p className="text-gray-900 font-black uppercase tracking-tight">Your bag is empty</p>
                  <button onClick={onClose} className="mt-4 text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline">
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                          <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-500">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{item.category}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center bg-gray-50 rounded-lg p-1">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:text-indigo-600 disabled:opacity-20"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-black text-gray-900">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:text-indigo-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-sm font-black text-gray-900">{item.discountedPrice.toLocaleString()}৳</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Subtotal</span>
                  <span className="text-2xl font-black text-gray-900 tracking-tighter">{subtotal.toLocaleString()}৳</span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateToCheckout();
                    }}
                    className="w-full py-5 bg-gray-900 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all shadow-xl active:scale-[0.98]"
                  >
                    Checkout Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;