'use client';

import React, { useState, useEffect } from 'react';
import { CartItem } from '../types';
import { 
  X, 
  QrCode, 
  CheckCircle2, 
  Copy, 
  Check, 
  Download, 
  ExternalLink,
  ShieldCheck, 
  Key, 
  AlertTriangle
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totalAmount: number;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  totalAmount,
  onClearCart
}) => {
  const [step, setStep] = useState<'payment' | 'processing' | 'success'>('payment');
  const [timeLeft, setTimeLeft] = useState(300); // 5 mins
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || step !== 'payment') return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, step]);

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const handleSimulatePayment = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      onClearCart();
    }, 1200);
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-[#0e111a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">
              {step === 'success' ? 'จัดส่งสินค้าดิจิทัลสำเร็จ' : 'ระบบชำระเงิน PromptPay QR'}
            </h3>
          </div>
          {step !== 'processing' && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-6">
          {step === 'payment' && (
            <div className="flex flex-col items-center text-center space-y-4">
              {/* Payment Details */}
              <div className="w-full p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-400">เลขอ้างอิงคำสั่งซื้อ:</span>
                <span className="font-mono text-cyan-300 font-bold">GV-2026-98124</span>
              </div>

              {/* QR Code Card */}
              <div className="p-5 rounded-2xl bg-white text-slate-900 shadow-xl flex flex-col items-center max-w-[260px] w-full">
                <div className="w-full flex items-center justify-center gap-1.5 pb-3 border-b border-slate-200">
                  <div className="w-6 h-6 rounded bg-[#003d6d] flex items-center justify-center text-white font-black text-[10px]">
                    PP
                  </div>
                  <span className="font-bold text-xs tracking-wider text-[#003d6d]">PROMPTPAY</span>
                </div>

                {/* Simulated QR Code Graphic */}
                <div className="my-3 p-2 border-2 border-slate-900 rounded-lg">
                  <QrCode className="w-40 h-40 text-slate-900" />
                </div>

                <div className="text-center">
                  <span className="text-[11px] text-slate-500 block">ยอดชำระสุทธิ</span>
                  <span className="text-2xl font-black text-slate-900">
                    ฿{totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Countdown & Instructions */}
              <div className="space-y-1">
                <p className="text-xs text-slate-400">
                  กรุณาสแกนจ่ายภายในเวลา: <span className="font-mono font-bold text-rose-400">{formattedTime}</span>
                </p>
                <p className="text-[11px] text-slate-500">
                  ระบบจะตรวจจับสลิปและปลดล็อกข้อมูลส่งมอบทันทีอัตโนมัติ
                </p>
              </div>

              {/* Mock Trigger Button */}
              <button
                onClick={handleSimulatePayment}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>จำลองการชำระเงินสำเร็จ (Simulate Instant Delivery)</span>
              </button>
            </div>
          )}

          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 rounded-full border-4 border-violet-500/20 border-t-cyan-400 animate-spin" />
              <h4 className="text-base font-bold text-white">กำลังยืนยันยอดเงินและถอดรหัสข้อมูลดิจิทัล...</h4>
              <p className="text-xs text-slate-400 max-w-xs">
                ระบบ Secure Vault กำลังทำการจัดสรรไอดีและสร้างลิงก์ดาวน์โหลดที่ปลอดภัยสำหรับคุณ
              </p>
            </div>
          )}

          {step === 'success' && (
            <div className="space-y-5">
              {/* Success Badge */}
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-300">ชำระเงินสำเร็จ & จัดส่งข้อมูลแล้ว!</h4>
                  <p className="text-xs text-slate-300">
                    ข้อมูลสินค้าดิจิทัลของคุณพร้อมใช้งานทันทีด้านล่างนี้
                  </p>
                </div>
              </div>

              {/* Unlocked Credentials & Download Keys */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-cyan-400" />
                  <span>ข้อมูลที่ได้รับมอบ (Digital Vault):</span>
                </h5>

                {items.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-xs font-bold text-white line-clamp-1">
                        {item.product.title}
                      </span>
                      <span className="text-[10px] font-semibold text-cyan-400 uppercase bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                        {item.product.game}
                      </span>
                    </div>

                    {/* Reveal Credentials or Links */}
                    {item.product.sampleAsset && (
                      <div className="space-y-2">
                        <div className="relative p-3 rounded-lg bg-black/70 border border-slate-800 font-mono text-xs text-emerald-400 break-all whitespace-pre-wrap leading-relaxed">
                          {item.product.sampleAsset.content}
                          <button
                            onClick={() => handleCopyText(item.product.id, item.product.sampleAsset!.content)}
                            className="absolute top-2 right-2 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                            title="คัดลอกข้อมูล"
                          >
                            {copiedId === item.product.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>

                        {item.product.sampleAsset.type === 'download_link' && (
                          <a
                            href={item.product.sampleAsset.content}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/40 text-cyan-300 text-xs font-bold border border-cyan-500/30 transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>ดาวน์โหลดไฟล์สคริปต์ทันที</span>
                            <ExternalLink className="w-3 h-3 ml-0.5" />
                          </a>
                        )}

                        <p className="text-[11px] text-amber-300/90 flex items-start gap-1">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                          <span>{item.product.sampleAsset.note}</span>
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                >
                  ปิดหน้าต่างและกลับไปยังหน้าหลัก
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
