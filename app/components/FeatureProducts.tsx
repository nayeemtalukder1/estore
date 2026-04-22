"use client";

import { MouseEvent, FC } from 'react';
import ProductCard from './ProductCard';
import { PRODUCTS, Product } from '../data/products'; // Import the data and type

interface FeaturedProductsProps {
  onProductClick: (product: Product) => void;
  onAddToCart: (e: MouseEvent<HTMLButtonElement>, product: Product) => void;
  onWishlistToggle: (e: MouseEvent<HTMLButtonElement>, product: Product) => void;
  wishlist: number[];
}

const FeaturedProducts: FC<FeaturedProductsProps> = ({
  onProductClick,
  onAddToCart,
  onWishlistToggle,
  wishlist,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="flex justify-between items-end mb-8 md:mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Featured Products
          </h2>
          <div className="h-1.5 w-16 md:w-20 bg-indigo-600 mt-2 rounded-full" />
        </div>
        <button className="text-indigo-600 font-bold hover:underline text-sm md:text-base transition-colors">
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {/* Now PRODUCTS is defined and won't crash */}
        {PRODUCTS.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => onProductClick(product)}
            onAddToCart={(e) => onAddToCart(e, product)}
            onWishlistToggle={(e) => onWishlistToggle(e, product)}
            isInWishlist={wishlist.includes(product.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;