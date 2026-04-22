"use client";

import { FC, useState } from 'react';
import { PRODUCTS, Product } from './data/products';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeatureProducts';
import Shop from './components/Shop';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import ServiceHighlights from './components/ServiceHighlights';
import MidBanner from './components/MidBanner';
import Reviews from './components/Reviews';
import Wishlist from './components/Wishlist';
import Register from './components/Register';
import Login from './components/Login';
import Checkout from './components/Checkout'; // Import the Checkout component
import { OrderTrack, UserDashboard } from './components/OrderTrack';
import Footer from './components/Footer';

import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';

interface CartItem extends Product {
  quantity: number;
}

const App: FC = () => {
  // 1. Added 'checkout' to the view type
  const [view, setView] = useState<
    'home' | 'shop' | 'productDetail' | 'register' | 'login' | 'wishlist' | 'account' | 'orderTrack' | 'checkout'
  >('home');

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);

  // --- Handlers ---
  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView('productDetail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (newView: typeof view) => {
    setView(newView);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 2. Logic to clear cart on successful order
  const handleOrderSuccess = () => {
    setCart([]);
    handleNavigate('orderTrack');
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar
        onNavigate={handleNavigate}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onProductClick={handleProductClick}
        currentView={view}
      />

      {/* 3. Updated CartDrawer with the navigation prop */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={(id, delta) => {
          setCart(prev => prev.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
          ));
        }}
        onRemove={(id) => setCart(prev => prev.filter(item => item.id !== id))}
        onNavigateToCheckout={() => handleNavigate('checkout')}
      />

      <main>
        {view === 'home' && (
          <>
            <Hero />
            <FeaturedProducts
              onProductClick={handleProductClick}
              onAddToCart={(e, p) => { e.stopPropagation(); addToCart(p); }}
              onWishlistToggle={(e, p) => { e.stopPropagation(); toggleWishlist(p.id); }}
              wishlist={wishlist}
            />
            <ServiceHighlights />
            <MidBanner />
            <Reviews />
          </>
        )}

        {view === 'shop' && (
          <Shop
            onProductClick={handleProductClick}
            onAddToCart={(e, p) => { e.stopPropagation(); addToCart(p); }}
            onWishlistToggle={(e, p) => { e.stopPropagation(); toggleWishlist(p.id); }}
            wishlist={wishlist}
          />
        )}

        {/* 4. Checkout View Integration */}
        {view === 'checkout' && (
          <Checkout
            items={cart}
            onBackToCart={() => handleNavigate('shop')}
            onOrderSuccess={handleOrderSuccess}
          />
        )}

        {view === 'wishlist' && (
          <Wishlist
            items={PRODUCTS.filter((p) => wishlist.includes(p.id))}
            onRemove={toggleWishlist}
            onAddToCart={(p) => addToCart(p, 1)}
            onBackToShop={() => handleNavigate('shop')}
          />
        )}

        {view === 'productDetail' && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onBack={() => handleNavigate('home')}
            onAddToCart={addToCart}
            onWishlistToggle={(p) => toggleWishlist(p.id)}
            isInWishlist={wishlist.includes(selectedProduct.id)}
            onProductClick={handleProductClick}
            wishlistIds={wishlist}
          />
        )}

        {view === 'register' && <Register onLoginClick={() => handleNavigate('login')} />}
        {view === 'login' && <Login onRegisterClick={() => handleNavigate('register')} />}
        {view === 'account' && <UserDashboard />}
        {view === 'orderTrack' && <OrderTrack />}

        {view === 'home' && (
          <section className="max-w-7xl mx-auto px-4 py-24 border-t border-gray-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { icon: Truck, title: "On Time Delivery", desc: "Reliable shipping worldwide" },
                { icon: ShieldCheck, title: "Secure Payment", desc: "100% protected transactions" },
                { icon: RotateCcw, title: "60-Day Returns", desc: "Easy exchange policy" },
                { icon: Headphones, title: "24/7 Support", desc: "Always here to help" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 rounded-xl"><item.icon className="w-6 h-6" /></div>
                  <div>
                    <h4 className="font-bold text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;