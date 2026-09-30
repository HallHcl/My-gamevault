'use client';

import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [discountError, setDiscountError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = Math.max(0, subtotal - appliedDiscount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (discountCode.trim().toUpperCase() === 'VAULT100') {
      setAppliedDiscount(100);
      setDiscountError('');
    } else if (discountCode.trim().toUpperCase() === 'PROGAMER') {
      setAppliedDiscount(Math.round(subtotal * 0.1));
      setDiscountError('');
    } else {
      setDiscountError('โค้ดส่วนลดไม่ถูกต้อง (ลองใช้: VAULT100 หรือ PROGAMER)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0d0f17] border-l border-white/10 flex flex-col shadow-2xl">
          {/* Drawer Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-slate-950/60">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">ตะกร้าสินค้าของท่าน</h2>
              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-violet-600/30 text-violet-300 border border-violet-500/30">
                {items.length} รายการ
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-slate-400">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-3 border border-white/5">
                  <Tag className="w-7 h-7 text-slate-500" />
                </div>
                <p className="text-sm font-semibold text-slate-300">ยังไม่มีสินค้าในตะกร้า</p>
                <p className="text-xs text-slate-500 mt-1">เลือกซื้อไอดีเกมหรือสคริปต์เพื่อดำเนินการต่อ</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 flex gap-3 hover:border-violet-500/30 transition-colors"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-16 h-16 rounded-lg object-cover bg-slate-950 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-white line-clamp-1">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-500 hover:text-rose-400 transition-colors shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] text-cyan-400 font-semibold">
                        {item.product.game}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm font-extrabold text-white">
                        ฿{(item.product.price * item.quantity).toLocaleString()}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-slate-950 px-2 py-0.5 rounded-lg border border-white/10 text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          disabled={item.quantity <= 1}
                          className="text-slate-400 hover:text-white disabled:opacity-30"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-semibold px-1 text-slate-200">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="text-slate-400 hover:text-white disabled:opacity-30"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="p-5 border-t border-white/10 bg-slate-950/80 space-y-4">
              {/* Discount Code Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="โค้ดส่วนลด (เช่น VAULT100)"
                  className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-200 transition-colors"
                >
                  ใช้โค้ด
                </button>
              </form>
              {discountError && (
                <p className="text-[11px] text-rose-400 font-normal">{discountError}</p>
              )}
              {appliedDiscount > 0 && (
                <p className="text-[11px] text-emerald-400 font-normal">
                  ✓ ใช้โค้ดส่วนลดสำเร็จ -฿{appliedDiscount.toLocaleString()}
                </p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>ยอดรวมสินค้า:</span>
                  <span className="text-white">฿{subtotal.toLocaleString()}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>ส่วนลดพิเศษ:</span>
                    <span>-฿{appliedDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>ค่าธรรมเนียมจัดส่งดิจิทัล:</span>
                  <span className="text-emerald-400 font-semibold">ฟรี ฿0</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-white/10">
                  <span>ยอดสุทธิที่ต้องชำระ:</span>
                  <span className="text-cyan-400">฿{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onCheckout}
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white shadow-lg shadow-violet-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>ชำระเงินทันที</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>การันตีความปลอดภัยและจัดส่งออโต้ 100%</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
