"use client";

import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState, FC, useCallback } from 'react';
import AdvancedSearch from './AdvancedSearch';

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

interface CartItem extends Product {
  quantity: number;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

// ──────────────────────────────────────────────────────────────
// MOCK DATA
// ──────────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  { id: 1, name: "Burgundy Hooded Solid Blouson Crop Top", image: "https://picsum.photos/seed/p1/400/500", originalPrice: 1000, discountedPrice: 700, discount: 30, category: "Women", sku: "Blouson11", description: "100% Original Products Pay on delivery might be available Easy 7 days exchanges This item is only exchangeable for the same or a different size, if available, and cannot be...", stock: 130, maxStock: 150, color: "Pink", rating: 4, onSale: true },
  { id: 2, name: "Short Faux Fur With Hood Black", image: "https://picsum.photos/seed/p2/400/500", originalPrice: 3000, discountedPrice: 2499, discount: 17, category: "Women", sku: "Hoodia12", description: "Elevate your winter wardrobe with this chic faux fur coat. Its shorter length and hood add a stylish touch, making it easy to dress up for special occasions or dress...", stock: 45, maxStock: 100, color: "Black", rating: 5, onSale: true },
  { id: 3, name: "Xumplo Boys Hoodies Kids", image: "https://picsum.photos/seed/p3/400/500", originalPrice: 2500, discountedPrice: 1599, discount: 36, category: "Kids", sku: "Hoodie111", description: "Material composition 100% Polyester Care instructions Machine Wash Closure type Pull On Weave type Plain", stock: 12, maxStock: 50, color: "Dark Navy", rating: 4, onSale: true },
  { id: 4, name: "Turtle neck tops blouse - Full sleeve", image: "https://picsum.photos/seed/p4/400/500", originalPrice: 700, discountedPrice: 500, discount: 29, category: "Women", sku: "Turtle01", description: "Comfortable and stylish turtle neck top for any occasion. Made with high-quality fabric for a soft feel.", stock: 88, maxStock: 120, color: "Pink", rating: 3, onSale: true },
  { id: 5, name: "Mens biker Leather Jacket Black", image: "https://picsum.photos/seed/p5/400/500", originalPrice: 2500, discountedPrice: 1899, discount: 24, category: "Men", sku: "Leather05", description: "Classic biker leather jacket for men. Durable and stylish, perfect for riding or casual wear.", stock: 5, maxStock: 30, color: "Black", rating: 5, onSale: true },
  { id: 6, name: "The Lifestyle Co. Men Fleece Sweatshirt", image: "https://picsum.photos/seed/p6/400/500", originalPrice: 2000, discountedPrice: 1599, discount: 20, category: "Men", sku: "Fleece06", description: "Warm and cozy fleece sweatshirt for men. Ideal for cold weather and casual outings.", stock: 56, maxStock: 80, color: "Dark Navy", rating: 4, onSale: true },
  { id: 7, name: "Basic Joggin Shorts", image: "https://picsum.photos/seed/p7/400/500", originalPrice: 2500, discountedPrice: 2111, discount: 16, category: "Men", sku: "Joggin07", description: "Lightweight and breathable jogging shorts for men. Perfect for workouts or lounging.", stock: 102, maxStock: 150, color: "Black", rating: 4, onSale: true },
  { id: 8, name: "Dark Navy Hoodie for Boy", image: "https://picsum.photos/seed/p8/400/500", originalPrice: 1500, discountedPrice: 1199, discount: 20, category: "Kids", sku: "Hoodie11", description: "PRODUCT FEATURES 60% COTTON 40% POLYESTER BRUSHED FLEECE 260 GSM", stock: 34, maxStock: 60, color: "Dark Navy", rating: 5, onSale: true },
  { id: 9, name: "Ribbed Square Neck Pink Top", image: "https://picsum.photos/seed/p9/400/500", originalPrice: 1500, discountedPrice: 1250, discount: 17, category: "Women", sku: "Ribbed09", description: "Trendy ribbed square neck top in pink. Soft and stretchy fabric for a comfortable fit.", stock: 66, maxStock: 100, color: "Pink", rating: 4, onSale: true },
  { id: 10, name: "Abstract Print Bomber Jacket | M", image: "https://picsum.photos/seed/p10/400/500", originalPrice: 4999, discountedPrice: 3599, discount: 28, category: "Men", sku: "Bomber10", description: "Eye-catching abstract print bomber jacket. Lightweight and stylish, perfect for layering.", stock: 2, maxStock: 20, color: "Black", rating: 5, onSale: true },
];

const REVIEWS: Review[] = [
  { id: 1, name: "Rahul Sharma", rating: 5, text: "I absolutely love the women's collection! The fabric quality is amazing and the designs are so elegant. Will definitely shop again.", date: "7 Day Ago", avatar: "https://i.pravatar.cc/150?u=rahul" },
  { id: 2, name: "Priya Verma", rating: 5, text: "The men's shirts fit perfectly and the material feels premium. Fast delivery and great packaging too!", date: "10.04.2018", avatar: "https://i.pravatar.cc/150?u=priya" },
];

// ──────────────────────────────────────────────────────────────
// NAVBAR COMPONENT
// ──────────────────────────────────────────────────────────────

interface NavbarProps {
  onNavigate: (view: 'home' | 'shop' | 'register' | 'login' | 'wishlist' | 'account') => void;
  cartCount: number;
  onOpenCart: () => void;
  onProductClick: (product: Product) => void;
  currentView: string;
}

const Navbar: FC<NavbarProps> = ({
  onNavigate,
  cartCount,
  onOpenCart,
  onProductClick,
  currentView,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const handleNavClick = useCallback((view: 'home' | 'shop' | 'register' | 'login' | 'wishlist' | 'account') => {
    onNavigate(view);
    setIsMenuOpen(false);
  }, [onNavigate]);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-indigo-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => handleNavClick('home')}
              role="button"
              tabIndex={0}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <ShoppingBag className="text-white w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">E-store</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => handleNavClick('home')}
                className={`text-sm font-medium transition-colors ${currentView === 'home' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
                  }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('shop')}
                className={`text-sm font-medium transition-colors ${currentView === 'shop' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
                  }`}
              >
                Shop
              </button>
              <button
                onClick={() => handleNavClick('wishlist')}
                className={`text-sm font-medium transition-colors ${currentView === 'wishlist' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
                  }`}
              >
                Wishlist
              </button>
              <button
                onClick={() => handleNavClick('register')}
                className={`text-sm font-medium transition-colors ${currentView === 'register' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
                  }`}
              >
                Register
              </button>
              <button
                onClick={() => handleNavClick('login')}
                className={`text-sm font-medium transition-colors ${currentView === 'login' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
                  }`}
              >
                Login
              </button>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-3 md:space-x-5">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <button
                onClick={() => handleNavClick('account')}
                className={`p-2 transition-colors hidden sm:block ${currentView === 'account' ? 'text-indigo-600' : 'text-gray-400 hover:text-indigo-600'
                  }`}
                aria-label="Account"
              >
                <User className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <button
                onClick={onOpenCart}
                className="p-2 text-gray-400 hover:text-indigo-600 transition-colors relative"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-indigo-600 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-b border-gray-100 py-4 px-4 space-y-4 shadow-xl"
          >
            {(['home', 'shop', 'wishlist', 'register', 'login'] as const).map((view) => (
              <button
                key={view}
                onClick={() => handleNavClick(view)}
                className={`block w-full text-left px-4 py-2 text-base font-medium rounded-lg ${currentView === view
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
                  }`}
              >
                {view === 'home' && 'Home'}
                {view === 'shop' && 'Shop'}
                {view === 'wishlist' && 'Wishlist'}
                {view === 'register' && 'Register'}
                {view === 'login' && 'Login'}
              </button>
            ))}
          </motion.div>
        )}
      </nav>

      {/* Advanced Search Modal */}
      <AdvancedSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onProductClick={onProductClick}
      />
    </>
  );
};

export default Navbar;