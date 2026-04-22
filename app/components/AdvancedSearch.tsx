"use client";

import { useState, useMemo, FC } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS, Product } from '@/app/data/products';

interface AdvancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onProductClick: (product: Product) => void;
}

const AdvancedSearch: FC<AdvancedSearchProps> = ({ isOpen, onClose, onProductClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    return PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.sku.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    ).slice(0, 5);
  }, [searchQuery]);

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? <span key={i} className="font-black text-indigo-600">{part}</span> : part
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-4 border-b flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                autoFocus placeholder="Search products..."
                className="flex-1 outline-none text-lg"
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              {filteredProducts.map(product => (
                <div
                  key={product.id} onClick={() => { onProductClick(product); onClose(); }}
                  className="p-4 flex gap-4 hover:bg-gray-50 cursor-pointer border-b last:border-0"
                >
                  <img src={product.image} alt="" className="w-16 h-20 object-cover rounded-md" />
                  <div>
                    <h4 className="font-bold text-gray-900">{highlightText(product.name, searchQuery)}</h4>
                    <p className="text-sm text-gray-500 line-clamp-1">{product.category} • SKU: {product.sku}</p>
                    <p className="font-bold text-indigo-600 mt-1">৳{product.discountedPrice}</p>
                  </div>
                </div>
              ))}
              {searchQuery && filteredProducts.length === 0 && (
                <div className="p-10 text-center text-gray-500">No results found for "{searchQuery}"</div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AdvancedSearch;