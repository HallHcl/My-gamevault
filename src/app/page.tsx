'use client';

import React, { useState, useMemo } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { CartDrawer } from '../components/CartDrawer';
import { CheckoutModal } from '../components/CheckoutModal';
import { Footer } from '../components/Footer';
import { mockProducts } from '../data/mockProducts';
import { Product, ProductCategory, CartItem } from '../types';
import { 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Lock, 
  HelpCircle, 
  SlidersHorizontal,
  ArrowUpDown
} from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');
  
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return mockProducts
      .filter((p) => {
        // Category match
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }
        // Game match
        if (selectedGame !== 'all' && p.game !== selectedGame) {
          return false;
        }
        // Search query match
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchGame = p.game.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          if (!matchTitle && !matchGame && !matchDesc) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return b.salesCount - a.salesCount; // 'popular'
      });
  }, [selectedCategory, selectedGame, searchQuery, sortBy]);

  // Unique games list for dropdown filter
  const gamesList = useMemo(() => {
    const list = Array.from(new Set(mockProducts.map((p) => p.game)));
    return ['all', ...list];
  }, []);

  // Add to cart handler
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    setRecentlyAddedId(product.id);
    setToastMessage(`เพิ่ม "${product.title.slice(0, 30)}..." ในตะกร้าแล้ว!`);

    setTimeout(() => setRecentlyAddedId(null), 1500);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Buy now handler
  const handleBuyNow = (product: Product) => {
    handleAddToCart(product);
    setIsCheckoutOpen(true);
  };

  // Cart quantity controls
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return {
            ...item,
            quantity: Math.max(1, Math.min(newQty, item.product.stock))
          };
        }
        return item;
      })
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 flex flex-col relative selection:bg-violet-600 selection:text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 border border-violet-500/50 shadow-2xl text-xs text-white animate-bounce">
          <Zap className="w-4 h-4 text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Hero Banner Section */}
      <Hero onSelectCategory={setSelectedCategory} />

      {/* Catalog & Filter Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>คลังสินค้าเกมดิจิทัลที่ผ่านการตรวจสอบ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              รายการสินค้าพร้อมส่งอัตโนมัติ
            </h2>
          </div>

          {/* Filters & Sorting */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Game Selector */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-slate-900">ทุกเกม (All Games)</option>
                {gamesList.filter((g) => g !== 'all').map((g) => (
                  <option key={g} value={g} className="bg-slate-900">{g}</option>
                ))}
              </select>
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="popular" className="bg-slate-900">ยอดนิยมสูงสุด</option>
                <option value="price-asc" className="bg-slate-900">ราคา: ต่ำไปสูง</option>
                <option value="price-desc" className="bg-slate-900">ราคา: สูงไปต่ำ</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center text-slate-400">
            <HelpCircle className="w-12 h-12 mx-auto text-slate-600 mb-3" />
            <h3 className="text-lg font-bold text-white">ไม่พบสินค้าที่คุณค้นหา</h3>
            <p className="text-xs text-slate-500 mt-1">
              ลองปรับคำค้นหา หรือเลือกหมวดหมู่อื่นเพื่อค้นหาสินค้าใหม่
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedGame('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold hover:bg-violet-500 transition-colors"
            >
              ล้างตัวกรองทั้งหมด
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
                onAddToCart={handleAddToCart}
                isAdded={recentlyAddedId === product.id}
              />
            ))}
          </div>
        )}

        {/* Value Proposition & Security Architecture Grid */}
        <section className="mt-20 pt-12 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Reliable & Automated Architecture
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
              ทำไมเกมเมอร์กว่า 45,000 คนจึงเลือกเรา?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 font-normal">
              โครงสร้างระบบถูกออกแบบมาเพื่อความเร็วและความปลอดภัยของข้อมูลดิจิทัล 100%
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl glass-card border border-white/5 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
                <Zap className="w-6 h-6 text-violet-400" />
              </div>
              <h4 className="text-base font-bold text-white">Instant Auto-Delivery</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                ระบบเชื่อมต่อ Webhook ชำระเงิน ตรวจสอบสลิปผ่าน AI 
                และถอดรหัสรหัสผ่านหรือส่งลิงก์ดาวน์โหลดขึ้นจอใน 3 วินาที ไม่ต้องรอแอดมินตอบแชท
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-card border border-white/5 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center">
                <Lock className="w-6 h-6 text-cyan-400" />
              </div>
              <h4 className="text-base font-bold text-white">AES-256 Vault Encryption</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                คลังจัดเก็บไอดีและไฟล์สคริปต์ถูกเข้ารหัสแบบ End-to-End บน Private Cloud 
                มีเพียงผู้สั่งซื้อที่ชำระเงินสำเร็จเท่านั้นที่ได้รับ Decryption Key
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-card border border-white/5 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <h4 className="text-base font-bold text-white">Lifetime Warranty & Anti-Ban</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                ไอดีทุกชิ้นเป็นเมลสะอาดมือเดียว พร้อมรับประกันไม่ดึงคืนตลอดชีพ 
                สคริปต์มาโครทำงานระดับ Hardware Driver ปลอดภัยจากระบบตรวจจับ 100%
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footers */}
      <Footer />

      {/* Modals & Drawers */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleProceedToCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart.length > 0 ? cart : (quickViewProduct ? [{ product: quickViewProduct, quantity: 1 }] : [])}
        totalAmount={cart.length > 0 ? totalAmount : (quickViewProduct ? quickViewProduct.price : 0)}
        onClearCart={() => setCart([])}
      />
    </div>
  );
}
