"use client";

import { useState, useMemo, FC, MouseEvent } from 'react';
import { ChevronRight, Filter, Search, RotateCcw, Grid, List as ListIcon, Star } from 'lucide-react';
import ProductCard from './ProductCard';
// 1. IMPORT DATA AND TYPES
import { PRODUCTS, Product } from '@/app/data/products';

interface ShopProps {
  onProductClick: (product: Product) => void;
  onAddToCart: (e: MouseEvent<HTMLButtonElement>, product: Product) => void;
  onWishlistToggle: (e: MouseEvent<HTMLButtonElement>, product: Product) => void;
  wishlist: number[];
}

const Shop: FC<ShopProps> = ({
  onProductClick,
  onAddToCart,
  onWishlistToggle,
  wishlist,
}) => {
  const [priceRange, setPriceRange] = useState<number>(5000);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSale, setSelectedSale] = useState<'On Sale' | 'Regular' | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'popularity' | 'price-low' | 'price-high'>('default');

  const filteredProducts = useMemo(() => {
    // 2. USE THE IMPORTED PRODUCTS
    let result = [...PRODUCTS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
      );
    }

    result = result.filter((p) => p.discountedPrice <= priceRange);

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedSale) {
      result = result.filter((p) => (selectedSale === 'On Sale' ? p.onSale : !p.onSale));
    }

    if (selectedColor) {
      result = result.filter((p) => p.color === selectedColor);
    }

    if (selectedRating !== null) {
      result = result.filter((p) => p.rating >= selectedRating);
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case 'price-high':
        result.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case 'popularity':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [priceRange, selectedCategory, selectedSale, selectedColor, selectedRating, searchQuery, sortBy]);

  const resetFilters = () => {
    setPriceRange(5000);
    setSelectedCategory(null);
    setSelectedSale(null);
    setSelectedColor(null);
    setSelectedRating(null);
    setSearchQuery('');
    setSortBy('default');
  };

  return (
    <div className="bg-white">
      {/* Shop Header */}
      <div className="bg-[#F9F6F1] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">Shop</h1>
          <nav className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
            <button onClick={() => window.location.href = '/'} className="hover:text-indigo-600">Home</button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">Shop</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="lg:hidden w-full mb-8 bg-gray-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
        >
          <Filter className="w-4 h-4" />
          {showMobileFilters ? 'HIDE FILTERS' : 'SHOW FILTERS'}
        </button>

        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          {/* Sidebar Filters */}
          <aside className={`${showMobileFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 space-y-10`}>
            {/* Price Filter */}
            <div>
              <h3 className="text-lg font-black text-gray-900 mb-6 pb-2 border-b-2 border-indigo-600 inline-block">Filter by price</h3>
              <div className="space-y-4">
                <input
                  type="range"
                  min="500"
                  max="5000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>৳500 — ৳{priceRange}</span>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search Products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 text-sm focus:border-indigo-600 outline-none"
              />
              <div className="absolute right-3 top-3.5 text-gray-400">
                <Search className="w-4 h-4" />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-lg font-black text-gray-900 mb-6">Categories</h3>
              <div className="space-y-3">
                {Array.from(new Set(PRODUCTS.map(p => p.category))).map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <div
                      onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                      className={`w-4 h-4 rounded-full border-2 transition-colors ${selectedCategory === cat ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'}`}
                    />
                    <span className={`text-sm ${selectedCategory === cat ? 'text-indigo-600 font-bold' : 'text-gray-600'}`}>
                      {cat} ({PRODUCTS.filter(p => p.category === cat).length})
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={resetFilters}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              RESET FILTERS
            </button>
          </aside>

          {/* Main Area */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <p className="text-sm text-gray-500">Showing {filteredProducts.length} results</p>
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="border border-gray-200 rounded px-4 py-2 text-sm outline-none"
                >
                  <option value="default">Default Sorting</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popularity">Popularity</option>
                </select>
                <div className="hidden sm:flex border border-gray-200 rounded overflow-hidden">
                  <button onClick={() => setViewType('grid')} className={`p-2 ${viewType === 'grid' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-400'}`}><Grid className="w-4 h-4" /></button>
                  <button onClick={() => setViewType('list')} className={`p-2 ${viewType === 'list' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-400'}`}><ListIcon className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

            <div className={`grid gap-6 ${viewType === 'grid' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => onProductClick(product)}
                  onAddToCart={onAddToCart}
                  onWishlistToggle={onWishlistToggle}
                  isInWishlist={wishlist.includes(product.id)}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-20 text-center text-gray-500">No products match your criteria.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;