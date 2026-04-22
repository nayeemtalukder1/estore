"use client";

import { useState, FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Star, Heart, Plus, Minus, Info, MessageSquare, FileText } from 'lucide-react';
import ProductCard from './ProductCard';
import { PRODUCTS, Product } from '@/app/data/products';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onWishlistToggle: (product: Product) => void;
  isInWishlist: boolean;
  onProductClick: (product: Product) => void;
  // Pass current wishlist IDs to highlight related products
  wishlistIds: number[];
}

const ProductDetail: FC<ProductDetailProps> = ({
  product,
  onBack,
  onAddToCart,
  onWishlistToggle,
  isInWishlist,
  onProductClick,
  wishlistIds
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'Description' | 'Info' | 'Reviews'>('Description');

  const handleQuantityChange = (newQty: number) => {
    setQuantity(Math.max(1, newQty));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Breadcrumbs */}
      <nav className="flex flex-wrap items-center gap-2 text-[10px] md:text-sm text-gray-400 mb-6 md:mb-8">
        <button onClick={onBack} className="hover:text-indigo-600 transition-colors">Home</button>
        <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
        <span className="cursor-default">{product.category}</span>
        <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
        <span className="text-gray-900 font-medium truncate max-w-[150px] md:max-w-none">
          {product.name}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
        {/* Product Image */}
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-gray-100 aspect-square">
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            key={product.id}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.onSale && (
            <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded shadow-lg uppercase tracking-widest">
              Sale
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center space-y-6 md:space-y-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4 leading-none">
              {product.name}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{product.rating}.0 Rating</span>
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-indigo-600 text-3xl md:text-4xl font-black tracking-tighter">৳{product.discountedPrice.toLocaleString()}</span>
            <span className="text-gray-300 text-xl line-through decoration-2">৳{product.originalPrice.toLocaleString()}</span>
          </div>

          <p className="text-gray-500 text-sm md:text-base leading-relaxed">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-y-3 pt-4 border-t border-gray-100">
            <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">SKU: <span className="text-gray-900 ml-2 font-black">{product.sku}</span></div>
            <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">Stock: <span className="text-gray-900 ml-2 font-black">{product.stock} Units</span></div>
            <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">Color: <span className="text-gray-900 ml-2 font-black">{product.color}</span></div>
            <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">Status: <span className="text-green-500 ml-2 font-black italic">Ready to ship</span></div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-200">
              <button onClick={() => handleQuantityChange(quantity - 1)} className="p-1 hover:text-indigo-600 transition-colors"><Minus className="w-4 h-4" /></button>
              <input type="number" value={quantity} readOnly className="w-12 bg-transparent text-center font-black text-gray-900" />
              <button onClick={() => handleQuantityChange(quantity + 1)} className="p-1 hover:text-indigo-600 transition-colors"><Plus className="w-4 h-4" /></button>
            </div>

            <button
              onClick={() => onAddToCart(product, quantity)}
              className="flex-1 bg-gray-900 text-white px-8 py-4 rounded-full font-black text-xs tracking-widest shadow-xl hover:bg-indigo-600 hover:-translate-y-1 transition-all active:scale-95"
            >
              ADD TO SHOPPING BAG
            </button>

            <button
              onClick={() => onWishlistToggle(product)}
              className={`p-4 rounded-full border transition-all ${isInWishlist ? 'bg-red-50 border-red-100 text-red-500' : 'bg-white border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-300'}`}
            >
              <Heart className={`w-6 h-6 ${isInWishlist ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Product Tabs Content */}
      <div className="mb-20">
        <div className="flex gap-8 border-b border-gray-100 mb-8 overflow-x-auto">
          {(['Description', 'Info', 'Reviews'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {tab}
              {activeTab === tab && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-full" />}
            </button>
          ))}
        </div>
        <div className="text-gray-500 leading-relaxed min-h-[100px]">
          {activeTab === 'Description' && <p>This premium {product.name} is crafted from high-quality materials, ensuring both comfort and durability. The {product.color} finish adds a touch of elegance to your daily ensemble.</p>}
          {activeTab === 'Info' && <p>Fabric: 100% Cotton | Care: Machine wash cold | Weight: 250g | Origin: Imported</p>}
          {activeTab === 'Reviews' && <p>There are no reviews yet for this product. Be the first to share your thoughts!</p>}
        </div>
      </div>

      {/* Related Products */}
      <div className="pt-16 border-t border-gray-100">
        <h2 className="text-2xl font-black text-gray-900 tracking-tighter mb-8 italic uppercase">You Might Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {PRODUCTS.filter(p => p.id !== product.id).slice(0, 5).map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onClick={() => onProductClick(p)}
              onAddToCart={(e) => { e.stopPropagation(); onAddToCart(p, 1); }}
              onWishlistToggle={(e) => { e.stopPropagation(); onWishlistToggle(p); }}
              isInWishlist={wishlistIds.includes(p.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;