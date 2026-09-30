'use client';

import React from 'react';
import { 
  Gamepad2, 
  ShoppingCart, 
  Wallet, 
  Search, 
  User, 
  ShieldCheck, 
  Flame,
  ChevronRight
} from 'lucide-react';
import { ProductCategory } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#090b11]/90 backdrop-blur-md">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-violet-900/60 via-indigo-900/50 to-cyan-900/60 border-b border-white/5 px-4 py-1.5 text-xs text-center text-slate-300 flex items-center justify-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-medium text-emerald-300">ระบบ Auto-Delivery เปิดทำงานปกติ:</span> 
        <span>จัดส่งไอดีและสคริปต์ได้ทันที 24 ชม. เฉลี่ย 3.2 วินาที</span>
        <span className="hidden sm:inline-flex items-center text-violet-300 font-semibold cursor-pointer hover:underline ml-2">
          ดูสถิติระบบ <ChevronRight className="w-3 h-3 ml-0.5" />
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onSelectCategory('all')}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-cyan-400 p-[2px] shadow-lg shadow-violet-600/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0a0c16] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-violet-400 group-hover:text-cyan-300 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-violet-300">
                  MY-GAME<span className="text-cyan-400">VAULT</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-normal">ตลาดซื้อขายไอดี & ดิจิทัลแอสเซทเกม</p>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ค้นหาไอดี Valorant, Genshin, สคริปต์มาโคร..."
              className="w-full pl-10 pr-12 py-2.5 bg-slate-900/80 border border-slate-700/60 rounded-xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all shadow-inner"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 border border-slate-700 rounded">
                Ctrl K
              </kbd>
            </div>
          </div>

          {/* Right Actions: Wallet, Cart, Account */}
          <div className="flex items-center gap-3">
            {/* Wallet balance simulation */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-xs shadow-sm">
              <Wallet className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-slate-400 text-[10px] block leading-none">เครดิตคงเหลือ</span>
                <span className="text-emerald-400 font-bold text-sm">฿ 1,500.00</span>
              </div>
              <button 
                onClick={() => alert('จำลองหน้าต่างเติมเงิน (TrueMoney / PromptPay / บัตรเครดิต)')}
                className="ml-1 px-2 py-1 text-[11px] bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold rounded-md border border-emerald-500/30 transition-colors"
              >
                + เติมเงิน
              </button>
            </div>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/70 text-slate-200 transition-all hover:border-violet-500/50"
              aria-label="ตะกร้าสินค้า"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-[11px] font-bold text-white shadow-lg animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile */}
            <div className="flex items-center gap-2 pl-1 cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 p-[1px]">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <User className="w-5 h-5 text-violet-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Quick Tabs on Mobile/Subheader */}
        <div className="flex items-center gap-2 overflow-x-auto py-2.5 border-t border-white/5 scrollbar-none text-xs">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            🔥 ทั้งหมด
          </button>
          <button
            onClick={() => onSelectCategory('account')}
            className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === 'account'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            🎮 ไอดีเกมพร้อมเล่น (Accounts)
          </button>
          <button
            onClick={() => onSelectCategory('item')}
            className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === 'item'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            💎 ไอเทมในเกม & สกิน (Items)
          </button>
          <button
            onClick={() => onSelectCategory('macro')}
            className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === 'macro'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            ⚡ มาโคร & สคริปต์ (Macros & Scripts)
          </button>
        </div>
      </div>
    </header>
  );
};
