"use client";

import { FC } from 'react';
import { Trash2, ShoppingBag, Heart } from 'lucide-react';
// 1. Import the unified type
import { Product } from '@/app/data/products';

interface WishlistProps {
  items: Product[];
  onRemove: (id: number) => void;
  onAddToCart: (product: Product) => void;
  onBackToShop: () => void; // Added for better UX
}

const Wishlist: FC<WishlistProps> = ({ items, onRemove, onAddToCart, onBackToShop }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Your Wishlist</h2>
        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-4 py-1 rounded-full">
          {items.length} Items
        </span>
      </div>

      {items.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl">
          <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-8">Save your favorite items here to keep an eye on them.</p>
          <button
            onClick={onBackToShop}
            className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700 transition-all"
          >
            RETURN TO SHOP
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-100">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="py-6 px-6 text-xs font-black text-gray-400 uppercase tracking-widest">Products</th>
                <th className="py-6 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Price</th>
                <th className="py-6 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Stock Status</th>
                <th className="py-6 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Action</th>
                <th className="py-6 px-6 text-xs font-black text-gray-400 uppercase tracking-widest text-center">
                  <Trash2 className="w-4 h-4 mx-auto" />
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {items.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/30 transition-colors">
                  {/* Product Info */}
                  <td className="py-6 px-6">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-24 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden shadow-sm">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="max-w-[240px]">
                        <h4 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug">
                          {product.name}
                        </h4>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                          SKU: {product.sku}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-6 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-indigo-600 font-black text-base">
                        ৳{product.discountedPrice.toLocaleString()}
                      </span>
                      {product.onSale && (
                        <span className="text-xs text-gray-400 line-through">
                          ৳{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Availability */}
                  <td className="py-6">
                    <div className="flex flex-col items-center gap-2 w-32 mx-auto">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                        {product.stock > 0 ? 'IN STOCK' : 'OUT OF STOCK'}
                      </span>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((product.stock / product.maxStock) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Add to Cart */}
                  <td className="py-6 text-center">
                    <button
                      onClick={() => onAddToCart(product)}
                      disabled={product.stock === 0}
                      className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full font-bold text-xs hover:bg-indigo-600 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      ADD TO CART
                    </button>
                  </td>

                  {/* Remove */}
                  <td className="py-6 px-6 text-center">
                    <button
                      onClick={() => onRemove(product.id)}
                      className="p-2 text-gray-300 hover:text-red-500 transition-colors hover:bg-red-50 rounded-full"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Wishlist;