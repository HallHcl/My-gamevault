'use client';

import React from 'react';
import { Gamepad2, ShieldCheck, Zap, Headphones, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#07080d] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-500 p-[1px]">
                <div className="w-full h-full bg-[#0a0c16] rounded-[7px] flex items-center justify-center">
                  <Gamepad2 className="w-4 h-4 text-violet-400" />
                </div>
              </div>
              <span className="text-base font-black tracking-wider text-white">
                MY-GAME<span className="text-cyan-400">VAULT</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed font-light">
              ศูนย์กลางการซื้อขายไอดีเกมแท้ ไอเทม และมาโครสคริปต์ชั้นนำ 
              ปลอดภัยด้วยระบบจัดส่งอัตโนมัติ 24 ชั่วโมง และการันตีไอดีตลอดชีพ
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>ระบบจัดส่งอัตโนมัติพร้อมให้บริการ</span>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">หมวดหมู่ยอดนิยม</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:text-cyan-300 transition-colors">ไอดีเกม Valorant แท้</a></li>
              <li><a href="#" className="hover:text-cyan-300 transition-colors">ไอดี Genshin Impact C6</a></li>
              <li><a href="#" className="hover:text-cyan-300 transition-colors">คลังเกม Steam ราคาประหยัด</a></li>
              <li><a href="#" className="hover:text-cyan-300 transition-colors">สคริปต์มาโคร Logitech G-Hub</a></li>
              <li><a href="#" className="hover:text-cyan-300 transition-colors">เติม Robux เรทพิเศษ 10,000 R$</a></li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Security */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">การบริการ & ความปลอดภัย</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:text-cyan-300 transition-colors">นโยบายรับประกันไอดีตลอดชีพ</a></li>
              <li><a href="#" className="hover:text-cyan-300 transition-colors">คู่มือการรับรหัสและเปลี่ยนอีเมล</a></li>
              <li><a href="#" className="hover:text-cyan-300 transition-colors">ขั้นตอนการติดตั้งมาโคร FPS</a></li>
              <li><a href="#" className="hover:text-cyan-300 transition-colors">แจ้งปัญหาการสั่งซื้อ / ติดต่อแอดมิน</a></li>
              <li><a href="#" className="hover:text-cyan-300 transition-colors">ระบบ Secure Escrow ป้องกันโกง</a></li>
            </ul>
          </div>

          {/* Col 4: Channels & Badges */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white mb-2">ช่องทางชำระเงินที่รองรับ</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded-lg bg-slate-900 border border-white/5 flex items-center gap-1.5 font-semibold text-slate-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                PromptPay QR
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-white/5 flex items-center gap-1.5 font-semibold text-slate-300">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                TrueMoney Wallet
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-white/5 flex items-center gap-1.5 font-semibold text-slate-300">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                Visa / Master
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-white/5 flex items-center gap-1.5 font-semibold text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                USDT / Crypto
              </div>
            </div>

            <div className="p-3 rounded-xl bg-violet-950/20 border border-violet-500/20 flex items-center gap-2.5">
              <Headphones className="w-5 h-5 text-violet-400 shrink-0" />
              <div>
                <span className="text-white font-bold block text-xs">Customer Support 24/7</span>
                <span className="text-slate-400 text-[10px]">ติดต่อฝ่ายบริการลูกค้าผ่าน Discord & LINE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 MY-GAMEVAULT. All rights reserved. ไม่มีความเกี่ยวข้องโดยตรงกับค่ายเกมใดๆ เครื่องหมายการค้าเป็นของเจ้าของลิขสิทธิ์</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Gamers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
