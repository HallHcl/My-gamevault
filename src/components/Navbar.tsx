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
  balance: number;
  onOpenCart: () => void;
  onOpenTopUp: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  balance,
  onOpenCart,
  onOpenTopUp,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#30475E]/60 bg-[#222831]/95 backdrop-blur-md">
      {/* Top announcement bar */}
      <div className="bg-[#30475E]/80 border-b border-[#30475E] px-4 py-1.5 text-xs text-center text-[#DDDDDD] flex items-center justify-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-[#F05454] animate-pulse" />
        <span className="font-semibold text-white">ระบบ Auto-Delivery เปิดทำงานปกติ:</span> 
        <span className="text-[#DDDDDD]/90">จัดส่งไอดีและสคริปต์ได้ทันที 24 ชม. เฉลี่ย 3.2 วินาที</span>
        <span className="hidden sm:inline-flex items-center text-[#F05454] font-semibold cursor-pointer hover:underline ml-2">
          ดูสถิติระบบ <ChevronRight className="w-3 h-3 ml-0.5" />
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onSelectCategory('all')}>
            <div className="w-11 h-11 rounded-xl bg-[#F05454] p-[2px] shadow-lg shadow-[#F05454]/25 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#222831] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-[#F05454] group-hover:text-white transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-wider text-white">
                  MY-GAME<span className="text-[#F05454]">VAULT</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-[#F05454]/20 text-[#F05454] border border-[#F05454]/30">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-[#DDDDDD]/70 font-normal">ตลาดซื้อขายไอดี & ดิจิทัลแอสเซทเกม</p>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#DDDDDD]/60" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ค้นหาไอดี Blox Fruits, ผล Kitsune, เพชร Pet Sim, มาโคร FiveM..."
              className="w-full pl-10 pr-12 py-2.5 bg-[#1a1f27] border border-[#30475E] rounded-xl text-sm text-[#DDDDDD] placeholder-[#DDDDDD]/40 focus:outline-none focus:border-[#F05454] focus:ring-1 focus:ring-[#F05454] transition-all shadow-inner"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-[#DDDDDD]/60 bg-[#30475E] border border-[#30475E]/80 rounded">
                Ctrl K
              </kbd>
            </div>
          </div>

          {/* Right Actions: Wallet, Cart, Account */}
          <div className="flex items-center gap-3">
            {/* Wallet balance simulation */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1a1f27] border border-[#30475E] text-xs shadow-sm">
              <Wallet className="w-4 h-4 text-[#F05454]" />
              <div>
                <span className="text-[#DDDDDD]/60 text-[10px] block leading-none">เครดิตคงเหลือ</span>
                <span className="text-white font-bold text-sm">฿ {balance.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</span>
              </div>
              <button 
                onClick={onOpenTopUp}
                className="ml-1 px-2 py-1 text-[11px] bg-[#F05454]/15 hover:bg-[#F05454]/25 text-[#F05454] font-semibold rounded-md border border-[#F05454]/30 transition-colors cursor-pointer"
              >
                + เติมเงิน
              </button>
            </div>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-[#30475E]/60 hover:bg-[#30475E] border border-[#30475E] text-[#DDDDDD] hover:text-white transition-all hover:border-[#F05454]/50"
              aria-label="ตะกร้าสินค้า"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#F05454] text-[11px] font-bold text-white shadow-lg animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile */}
            <div className="flex items-center gap-2 pl-1 cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-[#30475E] border border-[#30475E] hover:border-[#F05454] transition-colors p-[1px]">
                <div className="w-full h-full bg-[#1a1f27] rounded-[10px] flex items-center justify-center">
                  <User className="w-5 h-5 text-[#DDDDDD]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Quick Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-2.5 border-t border-[#30475E]/40 scrollbar-none text-xs">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#F05454] text-white shadow-md shadow-[#F05454]/30'
                : 'text-[#DDDDDD]/70 hover:text-white hover:bg-[#30475E]/60'
            }`}
          >
            🔥 ทั้งหมด
          </button>
          <button
            onClick={() => onSelectCategory('account')}
            className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === 'account'
                ? 'bg-[#F05454] text-white shadow-md shadow-[#F05454]/30'
                : 'text-[#DDDDDD]/70 hover:text-white hover:bg-[#30475E]/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#F05454]" />
            🎮 ไอดี Roblox แมพดัง (Accounts)
          </button>
          <button
            onClick={() => onSelectCategory('item')}
            className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === 'item'
                ? 'bg-[#F05454] text-white shadow-md shadow-[#F05454]/30'
                : 'text-[#DDDDDD]/70 hover:text-white hover:bg-[#30475E]/60'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            💎 ไอเทมใน Roblox (Roblox Items)
          </button>
          <button
            onClick={() => onSelectCategory('macro')}
            className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === 'macro'
                ? 'bg-[#F05454] text-white shadow-md shadow-[#F05454]/30'
                : 'text-[#DDDDDD]/70 hover:text-white hover:bg-[#30475E]/60'
            }`}
          >
            ⚡ มาโคร FiveM (FiveM Macros)
          </button>
        </div>
      </div>
    </header>
  );
};
