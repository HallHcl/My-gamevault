'use client';

import React, { useState } from 'react';
import { X, QrCode, Wallet, CheckCircle2, ShieldCheck, ArrowRight, Gift } from 'lucide-react';

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (amount: number) => void;
}

export const TopUpModal: React.FC<TopUpModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [method, setMethod] = useState<'promptpay' | 'truemoney'>('promptpay');
  const [amount, setAmount] = useState<number>(300);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [voucherUrl, setVoucherUrl] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [addedAmount, setAddedAmount] = useState(0);

  if (!isOpen) return null;

  const quickAmounts = [50, 100, 300, 500, 1000];

  const handleSelectAmount = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const currentPayAmount = customAmount ? parseFloat(customAmount) || 0 : amount;

  const handleConfirmTopUp = async () => {
    if (method === 'truemoney' && !voucherUrl.trim()) {
      alert('กรุณากรอกลิงก์ซองของขวัญ TrueMoney');
      return;
    }

    const finalAmount = method === 'truemoney' ? (currentPayAmount || 300) : currentPayAmount;
    if (finalAmount <= 0) {
      alert('กรุณาระบุจำนวนเงินที่ถูกต้อง');
      return;
    }

    setIsProcessing(true);
    try {
      const res = await fetch('/api/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalAmount,
          method,
          voucherUrl: method === 'truemoney' ? voucherUrl.trim() : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'การเติมเงินล้มเหลว');
      }

      setIsSuccess(true);
      setAddedAmount(finalAmount);
      onSuccess(finalAmount);
    } catch (err: any) {
      alert(err.message || 'เกิดข้อผิดพลาดในการเติมเงิน');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setIsProcessing(false);
    setVoucherUrl('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-[#222831] border border-[#30475E] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#30475E] flex items-center justify-between bg-[#1a1f27]">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-[#F05454]" />
            <h3 className="text-base font-bold text-white">เติมเครดิตเข้ากระเป๋า</h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1 rounded-lg text-[#DDDDDD]/70 hover:text-white hover:bg-[#30475E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5">
          {isSuccess ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#F05454]/20 border border-[#F05454]/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-[#F05454]" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">เติมเงินสำเร็จ!</h4>
                <p className="text-xs text-[#DDDDDD]/80 mt-1">
                  ระบบได้เพิ่มยอดเงิน <span className="text-[#F05454] font-bold">฿{addedAmount.toLocaleString()}</span> เข้าสู่กระเป๋าของคุณเรียบร้อยแล้ว
                </p>
              </div>
              <button
                onClick={handleResetAndClose}
                className="w-full py-3 rounded-xl font-bold text-xs bg-[#F05454] hover:bg-[#d94343] text-white shadow-lg transition-colors mt-2"
              >
                เริ่มสั่งซื้อสินค้า
              </button>
            </div>
          ) : isProcessing ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full border-4 border-[#30475E] border-t-[#F05454] animate-spin mx-auto" />
              <h4 className="text-sm font-bold text-white">กำลังตรวจสอบยอดเงินผ่านระบบอัตโนมัติ...</h4>
              <p className="text-xs text-[#DDDDDD]/60">SlipOK / TrueMoney API Verification</p>
            </div>
          ) : (
            <>
              {/* Payment Method Tabs */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#1a1f27] border border-[#30475E] rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setMethod('promptpay')}
                  className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    method === 'promptpay'
                      ? 'bg-[#F05454] text-white shadow'
                      : 'text-[#DDDDDD]/70 hover:text-white'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>PromptPay QR</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('truemoney')}
                  className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    method === 'truemoney'
                      ? 'bg-[#F05454] text-white shadow'
                      : 'text-[#DDDDDD]/70 hover:text-white'
                  }`}
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>TrueMoney ซอง</span>
                </button>
              </div>

              {/* Method 1: PromptPay */}
              {method === 'promptpay' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-[#DDDDDD]/70 block mb-2 font-medium">
                      เลือกจำนวนเงินที่ต้องการเติม (บาท):
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {quickAmounts.map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => handleSelectAmount(val)}
                          className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                            amount === val && !customAmount
                              ? 'bg-[#30475E] border-[#F05454] text-white shadow'
                              : 'bg-[#1a1f27] border-[#30475E] text-[#DDDDDD] hover:border-[#F05454]/50'
                          }`}
                        >
                          ฿{val}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* QR Box */}
                  <div className="p-4 rounded-xl bg-white text-slate-900 flex flex-col items-center justify-center">
                    <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-slate-200 w-full justify-center">
                      <span className="font-black text-[11px] text-[#003d6d]">PROMPTPAY AUTO QR</span>
                    </div>
                    <QrCode className="w-32 h-32 text-slate-900" />
                    <span className="text-sm font-extrabold text-slate-900 mt-1">
                      ยอดชำระ: ฿{currentPayAmount.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-[11px] text-center text-[#DDDDDD]/60">
                    สแกน QR แล้วระบบ AI จะตรวจสลิปอัตโนมัติภายใน 3 วินาที
                  </p>
                </div>
              )}

              {/* Method 2: TrueMoney Wallet */}
              {method === 'truemoney' && (
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-[#1a1f27] border border-[#30475E] text-xs text-[#DDDDDD] space-y-1">
                    <span className="font-bold text-[#F05454] flex items-center gap-1">
                      <Gift className="w-3.5 h-3.5" /> วิธีการสร้างซองของขวัญ TrueMoney:
                    </span>
                    <p className="text-[11px] text-[#DDDDDD]/80 leading-relaxed font-light">
                      1. เปิดแอป TrueMoney ➡️ โอนเงิน ➡️ ส่งซองของขวัญ<br />
                      2. กรอกยอดเงินที่ต้องการเติม และเลือก &quot;สุ่มจำนวนเงิน 1 คน&quot;<br />
                      3. คัดลอกลิงก์ซองของขวัญมาวางในช่องด้านล่างนี้
                    </p>
                  </div>

                  <div>
                    <label className="text-xs text-[#DDDDDD]/70 block mb-1.5 font-medium">
                      วางลิงก์ซองของขวัญ TrueMoney:
                    </label>
                    <input
                      type="text"
                      value={voucherUrl}
                      onChange={(e) => setVoucherUrl(e.target.value)}
                      placeholder="https://gift.truemoney.com/campaign/?v=..."
                      className="w-full px-3 py-2.5 bg-[#1a1f27] border border-[#30475E] rounded-xl text-xs text-white placeholder-[#DDDDDD]/40 focus:outline-none focus:border-[#F05454]"
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleConfirmTopUp}
                className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-[#F05454] hover:bg-[#d94343] text-white shadow-lg shadow-[#F05454]/30 transition-all flex items-center justify-center gap-2"
              >
                <span>ยืนยันการเติมเงิน (Simulate Instant Top-up)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#DDDDDD]/60">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F05454]" />
                <span>ตรวจสอบอัตโนมัติ 24 ชม. ปลอดภัย 100%</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
