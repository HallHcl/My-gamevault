'use client';

import React from 'react';
import { Product } from '../types';
import { X, CheckCircle2, ShieldCheck, Zap, ShoppingCart, ArrowRight } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#222831] border border-[#30475E] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#1a1f27] hover:bg-[#30475E] text-[#DDDDDD] transition-colors border border-[#30475E]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scroll Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Header & Image */}
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-1/2 aspect-video sm:aspect-square rounded-xl overflow-hidden bg-[#1a1f27] relative border border-[#30475E]">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 px-2 py-1 rounded bg-[#F05454] text-white text-[10px] font-bold uppercase">
                {product.badge || product.game}
              </div>
            </div>

            <div className="w-full sm:w-1/2 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-[#F05454] tracking-wider uppercase">
                  {product.game} • {product.category.toUpperCase()}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white mt-1 leading-snug">
                  {product.title}
                </h2>

                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-black text-white">
                    ฿{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#DDDDDD]/50 line-through">
                      ฿{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#F05454] bg-[#F05454]/15 px-3 py-1 rounded-full border border-[#F05454]/30">
                  <Zap className="w-3.5 h-3.5" />
                  <span>ระบบส่งอัตโนมัติ (Instant Digital Delivery)</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#30475E]/60 space-y-2 text-xs text-[#DDDDDD]/80">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#DDDDDD]" />
                  <span>รับประกันความปลอดภัย ตรวจสอบก่อนจัดส่ง</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F05454]" />
                  <span>จัดส่งเข้าบัญชีและแสดงบนหน้าเว็บทันที 100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Features */}
          <div className="space-y-4 pt-2 border-t border-[#30475E]/60">
            <h4 className="text-sm font-bold text-white">รายละเอียดสินค้า:</h4>
            <p className="text-sm text-[#DDDDDD] leading-relaxed font-normal">
              {product.description}
            </p>

            <h4 className="text-sm font-bold text-white pt-2">คุณสมบัติเด่น:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-[#1a1f27] border border-[#30475E] text-xs text-[#DDDDDD]">
                  <CheckCircle2 className="w-4 h-4 text-[#F05454] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Note */}
          <div className="p-4 rounded-xl bg-[#30475E]/30 border border-[#30475E] text-xs text-[#DDDDDD] space-y-1">
            <span className="font-bold flex items-center gap-1.5 text-white">
              <Zap className="w-4 h-4 text-[#F05454]" /> ขั้นตอนการรับสินค้าหลังการชำระเงิน
            </span>
            <p className="text-[#DDDDDD]/80 font-light">
              เมื่อทำการชำระเงินสำเร็จ ระบบจะทำการแสดงข้อมูลไอดี (Username/Password) หรือลิงก์ดาวน์โหลดสคริปต์ให้บนหน้าจอทันที พร้อมส่งสำเนาเข้าอีเมลของคุณอย่างปลอดภัย
            </p>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 sm:p-6 bg-[#1a1f27] border-t border-[#30475E] flex items-center justify-end gap-3">
          <button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#30475E] hover:bg-[#30475E]/80 text-[#DDDDDD] hover:text-white border border-[#30475E] transition-colors flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>ใส่ตะกร้า</span>
          </button>

          <button
            onClick={() => {
              onBuyNow(product);
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#F05454] hover:bg-[#d94343] text-white shadow-lg shadow-[#F05454]/30 transition-all flex items-center gap-2"
          >
            <span>สั่งซื้อทันที</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
