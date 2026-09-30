'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { CartDrawer } from '../components/CartDrawer';
import { CheckoutModal } from '../components/CheckoutModal';
import { TopUpModal } from '../components/TopUpModal';
import { AdminFinancialModal } from '../components/AdminFinancialModal';
import { AdminProductModal } from '../components/AdminProductModal';
import { Footer } from '../components/Footer';
import { Product, ProductCategory, CartItem, TransactionSplit, DeliveredAsset } from '../types';
import { 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Lock, 
  HelpCircle, 
  SlidersHorizontal,
  ArrowUpDown,
  Plus,
  RefreshCw,
  Loader2,
  PackagePlus
} from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');
  
  // Wallet & Top-up state (Server-synced)
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);

  // Admin Financial & Auto-Payout Split Ledger State (Server-synced)
  const [isAdminFinancialOpen, setIsAdminFinancialOpen] = useState(false);
  const [splits, setSplits] = useState<TransactionSplit[]>([]);

  // Admin Product Creation Modal (Real Data)
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  // Checkout & Order State (Backend-First)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [currentOrderTotal, setCurrentOrderTotal] = useState<number>(0);
  const [isCreatingOrder, setIsCreatingOrder] = useState<boolean>(false);

  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 1. Fetch Products from Backend API
  const loadProducts = useCallback(async () => {
    try {
      setIsLoadingProducts(true);
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success && Array.isArray(data.products)) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error('Failed to load products from API:', err);
    } finally {
      setIsLoadingProducts(false);
    }
  }, []);

  // 2. Fetch Wallet & Financial Ledger from Backend API
  const loadFinancialsAndWallet = useCallback(async () => {
    try {
      const [walletRes, finRes] = await Promise.all([
        fetch('/api/wallet'),
        fetch('/api/admin/financials')
      ]);
      const walletData = await walletRes.json();
      const finData = await finRes.json();

      if (walletData.success && walletData.wallet) {
        setWalletBalance(walletData.wallet.balance);
      }
      if (finData.success && finData.ledger && Array.isArray(finData.ledger.splits)) {
        setSplits(finData.ledger.splits);
      }
    } catch (err) {
      console.error('Failed to load financial records:', err);
    }
  }, []);

  useEffect(() => {
    loadProducts();
    loadFinancialsAndWallet();
  }, [loadProducts, loadFinancialsAndWallet]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
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
        return (b.salesCount || 0) - (a.salesCount || 0); // 'popular'
      });
  }, [products, selectedCategory, selectedGame, searchQuery, sortBy]);

  // Unique games list for dropdown filter
  const gamesList = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.game)));
    return ['all', ...list];
  }, [products]);

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

  // Backend-First Checkout Execution (Creates Order on Server)
  const handleProceedToCheckout = async (couponCode?: string) => {
    if (cart.length === 0) return;
    setIsCreatingOrder(true);

    try {
      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
          paymentMethod: 'promptpay',
          couponCode,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'ไม่สามารถสร้างคำสั่งซื้อได้');
      }

      setCurrentOrderId(data.order.id);
      setCurrentOrderTotal(data.order.netAmount);
      setIsCartOpen(false);
      setIsCheckoutOpen(true);
    } catch (err: any) {
      alert(err.message || 'เกิดข้อผิดพลาดในการประมวลผลคำสั่งซื้อ');
    } finally {
      setIsCreatingOrder(false);
    }
  };

  // Buy now handler (Creates Order on Server for single item)
  const handleBuyNow = async (product: Product) => {
    setIsCreatingOrder(true);
    try {
      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ productId: product.id, quantity: 1 }],
          paymentMethod: 'promptpay',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'ไม่สามารถสร้างคำสั่งซื้อได้');
      }

      setCurrentOrderId(data.order.id);
      setCurrentOrderTotal(data.order.netAmount);
      setQuickViewProduct(null);
      setIsCheckoutOpen(true);
    } catch (err: any) {
      alert(err.message || 'เกิดข้อผิดพลาดในการประมวลผลคำสั่งซื้อ');
    } finally {
      setIsCreatingOrder(false);
    }
  };

  // When checkout is verified on Backend
  const handlePaymentSuccess = (delivered: DeliveredAsset[]) => {
    setCart([]);
    loadProducts();
    loadFinancialsAndWallet();
    setToastMessage(`ชำระเงินสำเร็จ! ได้รับข้อมูล Vault ${delivered.length} รายการแล้ว`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#222831] text-[#DDDDDD] flex flex-col relative selection:bg-[#F05454] selection:text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-[#1a1f27] border border-[#F05454]/60 shadow-2xl text-xs text-white animate-bounce">
          <Zap className="w-4 h-4 text-[#F05454]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar
        cartCount={totalCartCount}
        balance={walletBalance}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTopUp={() => setIsTopUpOpen(true)}
        onOpenFinancial={() => setIsAdminFinancialOpen(true)}
        onOpenAddProduct={() => setIsAddProductOpen(true)}
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#30475E]">
          <div>
            <div className="flex items-center gap-2 text-[#F05454] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>คลังสินค้าเกมดิจิทัลที่ผ่านการตรวจสอบ (Backend Vault)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              รายการสินค้าพร้อมส่งอัตโนมัติ
            </h2>
          </div>

          {/* Action Buttons & Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Add Real Product Button */}
            <button
              onClick={() => setIsAddProductOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
            >
              <PackagePlus className="w-4 h-4" />
              <span>+ เพิ่มสินค้าจริง (Vault)</span>
            </button>

            {/* Refresh Button */}
            <button
              onClick={() => {
                loadProducts();
                loadFinancialsAndWallet();
              }}
              title="รีเฟรชข้อมูลจาก Backend Server"
              className="p-2 rounded-xl bg-[#1a1f27] border border-[#30475E] text-[#DDDDDD]/70 hover:text-white hover:border-[#F05454] transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isLoadingProducts ? 'animate-spin text-[#F05454]' : ''}`} />
            </button>

            {/* Game Selector */}
            <div className="flex items-center gap-1.5 bg-[#1a1f27] border border-[#30475E] rounded-xl px-3 py-2 text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#DDDDDD]/60" />
              <select
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
                className="bg-transparent text-[#DDDDDD] focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-[#222831]">ทุกเกม (All Games)</option>
                {gamesList.filter((g) => g !== 'all').map((g) => (
                  <option key={g} value={g} className="bg-[#222831]">{g}</option>
                ))}
              </select>
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-1.5 bg-[#1a1f27] border border-[#30475E] rounded-xl px-3 py-2 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#DDDDDD]/60" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-[#DDDDDD] focus:outline-none cursor-pointer"
              >
                <option value="popular" className="bg-[#222831]">ยอดนิยมสูงสุด</option>
                <option value="price-asc" className="bg-[#222831]">ราคา: ต่ำไปสูง</option>
                <option value="price-desc" className="bg-[#222831]">ราคา: สูงไปต่ำ</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid / Loading / Empty State */}
        {isLoadingProducts ? (
          <div className="py-24 text-center text-[#DDDDDD]/70 space-y-3">
            <Loader2 className="w-10 h-10 animate-spin text-[#F05454] mx-auto" />
            <p className="text-sm font-semibold text-white">กำลังโหลดข้อมูลสินค้าจาก Backend Vault Server...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-20 text-center text-[#DDDDDD]/60 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#1a1f27] border border-[#30475E] flex items-center justify-center mx-auto mb-4">
              <PackagePlus className="w-8 h-8 text-[#F05454]" />
            </div>
            <h3 className="text-xl font-bold text-white">พร้อมสำหรับการใส่ Data จริง!</h3>
            <p className="text-xs text-[#DDDDDD]/70 mt-2 leading-relaxed">
              ข้อมูล Mock ถูกลบออกทั้งหมดแล้ว ขณะนี้ระบบเชื่อมต่อกับ Backend Database และ Private Vault เรียบร้อยแล้ว 
              คุณสามารถกดปุ่มด้านล่างเพื่อเพิ่มสินค้าจริง (ไอดี Roblox / สคริปต์ FiveM / ไอเทม) พร้อมตั้งค่ารหัสผ่านหรือลิงก์ส่งมอบได้ทันที
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setIsAddProductOpen(true)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>+ เพิ่มสินค้าจริงเข้าคลัง (Live Vault)</span>
              </button>
              {(selectedCategory !== 'all' || selectedGame !== 'all' || searchQuery !== '') && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedGame('all');
                    setSearchQuery('');
                  }}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl bg-[#30475E] hover:bg-[#30475E]/80 text-[#DDDDDD] text-xs font-semibold transition-colors"
                >
                  ล้างตัวกรอง
                </button>
              )}
            </div>
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
        <section className="mt-20 pt-12 border-t border-[#30475E]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F05454]">
              Reliable & Automated Architecture
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
              โครงสร้างระบบ Backend-First ปลอดภัย 100%
            </h3>
            <p className="text-xs sm:text-sm text-[#DDDDDD]/70 mt-2 font-normal">
              แยกส่วนการคำนวณเงินและคลังรหัสผ่านลับไว้บนเซิร์ฟเวอร์หลังบ้าน ไม่เปิดเผยสู่ Client
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#222831] border border-[#30475E] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#30475E] border border-[#30475E] flex items-center justify-center">
                <Zap className="w-6 h-6 text-[#F05454]" />
              </div>
              <h4 className="text-base font-bold text-white">Instant Auto-Delivery</h4>
              <p className="text-xs text-[#DDDDDD]/70 leading-relaxed font-light">
                ระบบเชื่อมต่อ Webhook ชำระเงิน ตรวจสอบสลิปผ่าน AI 
                และถอดรหัสรหัสผ่านหรือส่งลิงก์ดาวน์โหลดขึ้นจอใน 3 วินาที ไม่ต้องรอแอดมินตอบแชท
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#222831] border border-[#30475E] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#30475E] border border-[#30475E] flex items-center justify-center">
                <Lock className="w-6 h-6 text-[#DDDDDD]" />
              </div>
              <h4 className="text-base font-bold text-white">AES-256 Vault Encryption</h4>
              <p className="text-xs text-[#DDDDDD]/70 leading-relaxed font-light">
                คลังจัดเก็บไอดีและไฟล์สคริปต์ถูกเข้ารหัสแบบ End-to-End บน Private Server 
                มีเพียงผู้สั่งซื้อที่ชำระเงินสำเร็จเท่านั้นที่ได้รับสิทธิ์ปลดล็อกข้อมูล
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#222831] border border-[#30475E] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#30475E] border border-[#30475E] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#F05454]" />
              </div>
              <h4 className="text-base font-bold text-white">Automated 90/10 Revenue Split</h4>
              <p className="text-xs text-[#DDDDDD]/70 leading-relaxed font-light">
                เงินยอดเต็มเข้าบัญชี Admin 100% ทันที จากนั้นระบบคำนวณและตัดโอนแบ่ง 10% ให้คนฝากขาย 
                และ 90% เป็นกำไรของ Admin บันทึกเข้า Ledger อัตโนมัติ
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
        orderId={currentOrderId}
        totalAmount={currentOrderTotal}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <TopUpModal
        isOpen={isTopUpOpen}
        onClose={() => setIsTopUpOpen(false)}
        onSuccess={(amt) => {
          loadFinancialsAndWallet();
          setToastMessage(`เติมเงินเข้ากระเป๋า ฿${amt.toLocaleString()} สำเร็จเรียบร้อย!`);
          setTimeout(() => setToastMessage(null), 3000);
        }}
      />

      <AdminFinancialModal
        isOpen={isAdminFinancialOpen}
        onClose={() => setIsAdminFinancialOpen(false)}
        splits={splits}
        onAddSplit={(newSplit) => {
          setSplits((prev) => [newSplit, ...prev]);
          loadFinancialsAndWallet();
          setToastMessage(`บันทึกยอดขาย ฿${newSplit.totalAmount.toLocaleString()} สำเร็จ!`);
          setTimeout(() => setToastMessage(null), 3000);
        }}
      />

      <AdminProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onProductCreated={(newProd) => {
          setIsAddProductOpen(false);
          loadProducts();
          setToastMessage(`เพิ่มสินค้า "${newProd.title.slice(0, 25)}..." เข้าสู่ Vault สำเร็จ!`);
          setTimeout(() => setToastMessage(null), 3000);
        }}
      />
    </div>
  );
}
