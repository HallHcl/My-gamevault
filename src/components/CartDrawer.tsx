'use client';

import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, Loader2 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: (couponCode?: string) => void;
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
  const [isValidating, setIsValidating] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = Math.max(0, subtotal - appliedDiscount);

  // Backend-First Coupon Validation
  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!discountCode.trim()) return;

    setIsValidating(true);
    setDiscountError('');

    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
          couponCode: discountCode.trim(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setAppliedDiscount(data.discountAmount);
        setDiscountError('');
      } else {
        setAppliedDiscount(0);
        setDiscountError(data.error || 'โค้ดส่วนลดไม่ถูกต้อง');
      }
    } catch {
      setDiscountError('ไม่สามารถตรวจสอบโค้ดกับ Server ได้');
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#222831] border-l border-[#30475E] flex flex-col shadow-2xl">
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#30475E] flex items-center justify-between bg-[#1a1f27]">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">ตะกร้าสินค้าของท่าน</h2>
              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#F05454]/20 text-[#F05454] border border-[#F05454]/30">
                {items.length} รายการ
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#DDDDDD]/70 hover:text-white hover:bg-[#30475E] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#DDDDDD]/60">
                <div className="w-16 h-16 rounded-2xl bg-[#1a1f27] flex items-center justify-center mb-3 border border-[#30475E]">
                  <Tag className="w-7 h-7 text-[#DDDDDD]/50" />
                </div>
                <p className="text-sm font-semibold text-white">ยังไม่มีสินค้าในตะกร้า</p>
                <p className="text-xs text-[#DDDDDD]/60 mt-1">เลือกซื้อไอดีเกมหรือสคริปต์เพื่อดำเนินการต่อ</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3.5 rounded-xl bg-[#1a1f27] border border-[#30475E] flex gap-3 hover:border-[#F05454]/40 transition-colors"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-16 h-16 rounded-lg object-cover bg-[#222831] border border-[#30475E] shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-white line-clamp-1">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#DDDDDD]/50 hover:text-[#F05454] transition-colors shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] text-[#F05454] font-semibold">
                        {item.product.game}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm font-extrabold text-white">
                        ฿{(item.product.price * item.quantity).toLocaleString()}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-[#222831] px-2 py-0.5 rounded-lg border border-[#30475E] text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          disabled={item.quantity <= 1}
                          className="text-[#DDDDDD]/60 hover:text-white disabled:opacity-30"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-semibold px-1 text-white">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="text-[#DDDDDD]/60 hover:text-white disabled:opacity-30"
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
            <div className="p-5 border-t border-[#30475E] bg-[#1a1f27] space-y-4">
              {/* Discount Code Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="โค้ดส่วนลด (เช่น VAULT100)"
                  className="flex-1 px-3 py-2 bg-[#222831] border border-[#30475E] rounded-lg text-xs text-white placeholder-[#DDDDDD]/40 focus:outline-none focus:border-[#F05454]"
                />
                <button
                  type="submit"
                  disabled={isValidating}
                  className="px-3 py-2 bg-[#30475E] hover:bg-[#30475E]/80 disabled:opacity-50 text-xs font-semibold rounded-lg text-white transition-colors border border-[#30475E] flex items-center gap-1"
                >
                  {isValidating && <Loader2 className="w-3 h-3 animate-spin" />}
                  <span>ใช้โค้ด</span>
                </button>
              </form>
              {discountError && (
                <p className="text-[11px] text-[#F05454] font-normal">{discountError}</p>
              )}
              {appliedDiscount > 0 && (
                <p className="text-[11px] text-emerald-400 font-normal">
                  ✓ ยืนยันส่วนลดผ่าน Server: -฿{appliedDiscount.toLocaleString()}
                </p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#DDDDDD]/80">
                <div className="flex justify-between">
                  <span>ยอดรวมสินค้า:</span>
                  <span className="text-white">฿{subtotal.toLocaleString()}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-[#F05454]">
                    <span>ส่วนลดพิเศษ:</span>
                    <span>-฿{appliedDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>ค่าธรรมเนียมจัดส่งดิจิทัล:</span>
                  <span className="text-[#DDDDDD] font-semibold">ฟรี ฿0</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-[#30475E]">
                  <span>ยอดสุทธิที่ต้องชำระ:</span>
                  <span className="text-[#F05454]">฿{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => onCheckout(appliedDiscount > 0 ? discountCode.trim() : undefined)}
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#F05454] hover:bg-[#d94343] text-white shadow-lg shadow-[#F05454]/30 transition-all flex items-center justify-center gap-2"
              >
                <span>สร้างคำสั่งซื้อและชำระเงิน</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#DDDDDD]/60">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F05454]" />
                <span>คำนวณและตรวจสอบยอดเงินผ่าน Backend Server</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
