'use client';

import React from 'react';
import { Product } from '../types';
import { ShoppingCart, Eye, Star, Zap, Download, ShieldCheck, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isAdded?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  isAdded
}) => {
  const getDeliveryBadge = () => {
    switch (product.deliveryType) {
      case 'instant_credential':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <Zap className="w-3 h-3 text-emerald-400" /> ส่งออโต้ใน 3 วิ
          </span>
        );
      case 'instant_download':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            <Download className="w-3 h-3 text-cyan-400" /> ดาวน์โหลดไฟล์ตรง
          </span>
        );
      case 'in_game_trade':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <ShieldCheck className="w-3 h-3 text-amber-400" /> บอทโอนในเกม
          </span>
        );
    }
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="group relative rounded-2xl glass-card overflow-hidden transition-all duration-300 hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-600/10 flex flex-col justify-between">
      {/* Product Image & Badges */}
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f18] via-transparent to-black/40" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
            {product.badge && (
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-violet-600 text-white shadow-md">
                {product.badge}
              </span>
            )}
            {discountPercentage && (
              <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-rose-500/90 text-white">
                -{discountPercentage}%
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3">
            {getDeliveryBadge()}
          </div>

          {/* Game Tag */}
          <div className="absolute bottom-2.5 left-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-300 bg-slate-900/80 px-2 py-0.5 rounded border border-cyan-500/30">
              {product.game}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5">
          {/* Rating & Sales */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-semibold text-slate-200">{product.rating.toFixed(1)}</span>
            </div>
            <span>ขายแล้ว {product.salesCount} ครั้ง</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="text-base font-bold text-slate-100 line-clamp-2 hover:text-cyan-300 transition-colors cursor-pointer leading-snug"
          >
            {product.title}
          </h3>

          {/* Features preview */}
          <ul className="mt-3 space-y-1.5 text-xs text-slate-400">
            {product.features.slice(0, 2).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-violet-400 font-bold">•</span>
                <span className="line-clamp-1">{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Footer: Price & Actions */}
      <div className="p-4 sm:p-5 pt-0 border-t border-white/5 mt-2">
        <div className="flex items-baseline justify-between pt-3 mb-4">
          <div>
            <span className="text-xs text-slate-400 block">ราคาจำหน่าย</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-white">
                ฿{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-500 line-through">
                  ฿{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${
            product.stock <= 2 
              ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20' 
              : 'text-slate-400'
          }`}>
            {product.stock <= 2 ? `เหลือเพียง ${product.stock} ชิ้น!` : `คงเหลือ ${product.stock}`}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => onQuickView(product)}
            className="col-span-1 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors border border-slate-700/60"
            title="ดูรายละเอียดสินค้า"
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={() => onAddToCart(product)}
            className={`col-span-3 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              isAdded
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md shadow-violet-600/20'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>เพิ่มลงตะกร้าแล้ว</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>หยิบใส่ตะกร้า</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
