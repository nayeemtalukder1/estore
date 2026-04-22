"use client";

import { motion } from 'motion/react';
import { MouseEvent, FC } from 'react';
import { Heart, Star, ShoppingBag } from 'lucide-react';

// ──────────────────────────────────────────────────────────────
// TYPES
// ──────────────────────────────────────────────────────────────

interface Product {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  category: string;
  sku: string;
  description: string;
  stock: number;
  maxStock: number;
  color: string;
  rating: number;
  onSale: boolean;
}

// ──────────────────────────────────────────────────────────────
// PRODUCT CARD COMPONENT
// ──────────────────────────────────────────────────────────────

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  onAddToCart?: (e: MouseEvent<HTMLButtonElement>, product: Product) => void;
  onWishlistToggle?: (e: MouseEvent<HTMLButtonElement>, product: Product) => void;
  isInWishlist?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  product,
  onClick,
  onAddToCart,
  onWishlistToggle,
  isInWishlist = false,
}) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      onClick={onClick}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-indigo-600 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded">
            -{product.discount}%
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onWishlistToggle?.(e, product);
          }}
          className={`absolute top-3 right-3 md:top-4 md:right-4 p-2 rounded-full shadow-md transition-all ${isInWishlist
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-400 hover:text-indigo-600 hover:bg-gray-50'
            }`}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-all ${isInWishlist ? 'fill-current' : ''
              }`}
          />
        </button>

        {/* Quick Add to Cart Button */}
        <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 translate-y-full md:group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(e, product);
            }}
            className="w-full bg-indigo-600/90 backdrop-blur-sm md:bg-white text-white md:text-gray-900 py-2.5 md:py-3 rounded-xl font-bold text-[10px] md:text-sm flex items-center justify-center gap-2 shadow-lg hover:bg-indigo-600 hover:text-white md:hover:bg-indigo-600 md:hover:text-white transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            Add To Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 md:p-4 space-y-1 md:space-y-2">
        <p className="text-[10px] md:text-xs text-gray-400 font-medium uppercase tracking-wider">
          {product.category}
        </p>

        <h4 className="text-xs md:text-sm font-semibold text-gray-900 line-clamp-2 leading-tight min-h-[2.5em]">
          {product.name}
        </h4>

        {/* Rating Stars */}
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < product.rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
                }`}
            />
          ))}
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-2">
          <span className="text-sm md:text-base font-bold text-indigo-600">
            ৳{product.discountedPrice.toLocaleString()}
          </span>
          <span className="text-[10px] md:text-xs text-gray-400 line-through">
            ৳{product.originalPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;