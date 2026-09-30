'use client';

import React, { useState } from 'react';
import { 
  X, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShieldCheck, 
  CheckCircle2, 
  Sliders, 
  Play, 
  RefreshCw,
  Landmark,
  Layers
} from 'lucide-react';
import { TransactionSplit } from '../types';
import { calculateRevenueSplit } from '../lib/payoutEngine';

interface AdminFinancialModalProps {
  isOpen: boolean;
  onClose: () => void;
  splits: TransactionSplit[];
  onAddSplit: (split: TransactionSplit) => void;
}

export const AdminFinancialModal: React.FC<AdminFinancialModalProps> = ({
  isOpen,
  onClose,
  splits,
  onAddSplit
}) => {
  const [testAmount, setTestAmount] = useState<number>(500);
  const [adminRate, setAdminRate] = useState<number>(90);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const sellerRate = 100 - adminRate;

  // Totals
  const totalGross = splits.reduce((sum, s) => sum + s.totalAmount, 0);
  const totalSellerPayout = splits.reduce((sum, s) => sum + s.sellerPayout, 0);
  const totalAdminProfit = splits.reduce((sum, s) => sum + s.adminProfit, 0);

  const handleSimulateSplit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newSplit = calculateRevenueSplit(
        `GV-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        'ไอดี Roblox / FiveM Script',
        testAmount,
        'นายสมชาย ฝากขาย (Seller)',
        '089-XXX-1249',
        sellerRate,
        adminRate
      );
      onAddSplit(newSplit);
      setIsProcessing(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-[#222831] border border-[#30475E] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#30475E] flex items-center justify-between bg-[#1a1f27]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F05454]/20 border border-[#F05454]/40 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[#F05454]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">ระบบบัญชีแยกเงินอัตโนมัติ (Automated Split & Payout)</h3>
              <p className="text-[11px] text-[#DDDDDD]/60">คำนวณและตัดโอนแบ่งจ่ายระหว่าง Admin และคนฝากขายแบบ Real-time</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#DDDDDD]/70 hover:text-white hover:bg-[#30475E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* 3 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Card 1: Gross Received */}
            <div className="p-4 rounded-xl bg-[#1a1f27] border border-[#30475E] space-y-2">
              <div className="flex items-center justify-between text-xs text-[#DDDDDD]/70">
                <span>ยอดเงินเข้าทั้งหมด (Gross):</span>
                <span className="p-1 rounded bg-[#30475E] text-[#DDDDDD]">
                  <ArrowDownLeft className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="text-2xl font-black text-white">
                ฿{totalGross.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-[10px] text-[#DDDDDD]/60">ยอดที่ลูกค้าสแกนจ่ายผ่าน QR Code</p>
            </div>

            {/* Card 2: Auto Payout to Sellers */}
            <div className="p-4 rounded-xl bg-[#1a1f27] border border-[#30475E] space-y-2">
              <div className="flex items-center justify-between text-xs text-[#DDDDDD]/70">
                <span>โอนออก Auto ให้คนขาย:</span>
                <span className="p-1 rounded bg-[#F05454]/20 text-[#F05454]">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="text-2xl font-black text-[#F05454]">
                -฿{totalSellerPayout.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-[10px] text-[#DDDDDD]/60">ระบบยิง Payout API โอนออกให้อัตโนมัติ</p>
            </div>

            {/* Card 3: Admin Net Profit */}
            <div className="p-4 rounded-xl bg-[#30475E]/30 border border-[#F05454]/40 space-y-2">
              <div className="flex items-center justify-between text-xs text-white">
                <span className="font-bold">กำไรสุทธิของ Admin:</span>
                <span className="p-1 rounded bg-[#F05454] text-white">
                  <DollarSign className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="text-2xl font-black text-white">
                +฿{totalAdminProfit.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-[10px] text-[#DDDDDD]">เงินคงเหลือในบัญชีธนาคาร Admin จริง</p>
            </div>
          </div>

          {/* Bank Statement Visual Comparison */}
          <div className="p-4 rounded-xl bg-[#1a1f27] border border-[#30475E] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Landmark className="w-4 h-4 text-[#F05454]" />
              <span>ภาพจำลอง Statement ในแอปธนาคารของ Admin จริง (ตัวอย่างยอด ฿500):</span>
            </div>
            
            <div className="space-y-2 font-mono text-xs">
              <div className="p-2.5 rounded-lg bg-[#222831] border border-[#30475E] flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-400">
                  <ArrowDownLeft className="w-4 h-4" />
                  <span>รับเงินโอนพร้อมเพย์ (ลูกค้าชำระค่าสินค้า)</span>
                </div>
                <span className="font-bold text-emerald-400">+฿500.00</span>
              </div>

              <div className="p-2.5 rounded-lg bg-[#222831] border border-[#30475E] flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#F05454]">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>โอนออกอัตโนมัติ (Payout API ไปคนฝากขาย 10%)</span>
                </div>
                <span className="font-bold text-[#F05454]">-฿50.00</span>
              </div>

              <div className="p-2.5 rounded-lg bg-[#30475E]/60 border border-[#30475E] flex items-center justify-between text-white font-bold">
                <span>💰 ยอดคงเหลือสุทธิที่เข้ากระเป๋า Admin ทันที:</span>
                <span className="text-lg text-white">+฿450.00</span>
              </div>
            </div>
          </div>

          {/* Interactive Simulation Sandbox */}
          <div className="p-4 rounded-xl bg-[#222831] border border-[#30475E] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Sliders className="w-4 h-4 text-[#F05454]" />
                <span>กล่องทดลองยิงคำสั่งซื้อจำลอง (Live Simulation):</span>
              </div>
              <span className="text-[11px] text-[#DDDDDD]/60">ทดสอบระบบคำนวณและตัดจ่ายทันที</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-[#DDDDDD]/70 block mb-1">ยอดเงินคำสั่งซื้อ (บาท):</label>
                <input
                  type="number"
                  value={testAmount}
                  onChange={(e) => setTestAmount(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 bg-[#1a1f27] border border-[#30475E] rounded-lg text-xs text-white focus:outline-none focus:border-[#F05454]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#DDDDDD]/70 block mb-1">
                  สัดส่วน Admin / คนขาย (%):
                </label>
                <div className="flex items-center gap-2">
                  <select
                    value={adminRate}
                    onChange={(e) => setAdminRate(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#1a1f27] border border-[#30475E] rounded-lg text-xs text-white focus:outline-none focus:border-[#F05454]"
                  >
                    <option value={90} className="bg-[#222831]">Admin 90% | คนขาย 10%</option>
                    <option value={80} className="bg-[#222831]">Admin 80% | คนขาย 20%</option>
                    <option value={95} className="bg-[#222831]">Admin 95% | คนขาย 5%</option>
                    <option value={50} className="bg-[#222831]">Admin 50% | คนขาย 50%</option>
                  </select>
                </div>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleSimulateSplit}
                  disabled={isProcessing}
                  className="w-full py-2 px-3 rounded-lg bg-[#F05454] hover:bg-[#d94343] disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-[#F05454]/20"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>กำลังยิง Payout API...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>ยิงคำสั่งซื้อ ฿{testAmount}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Transactions Ledger Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#F05454]" />
              <span>ประวัติรายการธุรกรรมและการโอนออกอัตโนมัติ (Ledger Logs):</span>
            </h4>

            <div className="overflow-x-auto rounded-xl border border-[#30475E]">
              <table className="w-full text-left text-xs text-[#DDDDDD]">
                <thead className="bg-[#1a1f27] text-[#DDDDDD]/70 border-b border-[#30475E]">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">เลขอ้างอิง</th>
                    <th className="py-2.5 px-3 font-semibold">ยอดขายรวม</th>
                    <th className="py-2.5 px-3 font-semibold text-white">กำไร Admin</th>
                    <th className="py-2.5 px-3 font-semibold text-[#F05454]">โอนให้คนขาย (Auto)</th>
                    <th className="py-2.5 px-3 font-semibold">บัญชีปลายทาง</th>
                    <th className="py-2.5 px-3 font-semibold">สถานะ Payout</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#30475E]/50 bg-[#222831]">
                  {splits.map((s) => (
                    <tr key={s.id} className="hover:bg-[#1a1f27]/60 transition-colors">
                      <td className="py-2.5 px-3 font-mono text-[11px] text-[#DDDDDD]/80">
                        {s.orderId}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-white">
                        ฿{s.totalAmount.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-white">
                        +฿{s.adminProfit.toLocaleString()} ({s.adminRate}%)
                      </td>
                      <td className="py-2.5 px-3 font-bold text-[#F05454]">
                        -฿{s.sellerPayout.toLocaleString()} ({s.sellerRate}%)
                      </td>
                      <td className="py-2.5 px-3 text-[11px] text-[#DDDDDD]/70">
                        {s.sellerPromptPay}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#30475E] text-white border border-[#30475E]">
                          <CheckCircle2 className="w-3 h-3 text-[#F05454]" /> โอนสำเร็จ Auto
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#1a1f27] border-t border-[#30475E] flex items-center justify-between text-xs text-[#DDDDDD]/70">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#F05454]" />
            <span>เชื่อมต่อ Payout API (Omise / GB Prime Pay / PromptPay API) ตลอด 24 ชม.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#30475E] hover:bg-[#30475E]/80 text-white font-semibold transition-colors"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
