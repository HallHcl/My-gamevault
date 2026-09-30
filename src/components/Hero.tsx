'use client';

import React from 'react';
import { ShieldCheck, Zap, KeyRound, ArrowRight } from 'lucide-react';
import { ProductCategory } from '../types';

interface HeroProps {
  onSelectCategory: (cat: ProductCategory) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectCategory }) => {
  return (
    <div className="relative overflow-hidden pt-6 pb-12">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-violet-600/15 via-cyan-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 glass-panel shadow-2xl">
          {/* Banner Graphic overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105 transform hover:scale-100 transition-transform duration-1000"
            style={{ backgroundImage: `url('/images/hero-banner.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090b11] via-[#090b11]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090b11] via-transparent to-transparent" />

          {/* Content */}
          <div className="relative z-10 px-6 py-12 sm:px-12 sm:py-16 lg:py-20 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-400/30 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-5">
              <Zap className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
              <span>Next-Gen Gaming Asset Marketplace</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              ปลดล็อกไอดีเกม & สคริปต์ <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-400">
                ส่งออโต้ทันทีใน 3 วินาที
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              ศูนย์รวมไอดีเกมแท้มือเดียว สกินหายาก และมาโครลดแรงดีดสำหรับคอ FPS 
              ชำระเงินผ่าน PromptPay สแกนจ่ายแล้วรับ User/Password และลิงก์ดาวน์โหลดเข้ารหัสความปลอดภัยระดับธนาคาร
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onSelectCategory('account')}
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white shadow-lg shadow-violet-600/30 hover:shadow-cyan-500/20 transition-all flex items-center gap-2 group"
              >
                <span>เลือกดูไอดีเกมสุดแรร์</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onSelectCategory('macro')}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-violet-500/50 transition-all flex items-center gap-2"
              >
                <KeyRound className="w-4 h-4 text-cyan-400" />
                <span>มาโคร & สคริปต์ FPS</span>
              </button>
            </div>

            {/* Quick Trust Badges */}
            <div className="mt-10 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                  <Zap className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-100">Auto Delivery</h4>
                  <p className="text-[11px] text-slate-400">ระบบบอทส่งมอบ 24 ชม.</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-100">Lifetime Warranty</h4>
                  <p className="text-[11px] text-slate-400">ประกันไอดีไม่ดึงคืน 100%</p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-violet-500/20 flex items-center justify-center border border-violet-500/30">
                  <KeyRound className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-100">Secure Vault</h4>
                  <p className="text-[11px] text-slate-400">เข้ารหัสข้อมูลผู้ซื้อสูงสุด</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
