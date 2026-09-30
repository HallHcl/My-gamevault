'use client';

import React, { useState, useEffect } from 'react';
import { DeliveredAsset } from '../types';
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
  AlertTriangle,
  Gift,
  Loader2
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string | null;
  totalAmount: number;
  onPaymentSuccess: (deliveredAssets: DeliveredAsset[]) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  orderId,
  totalAmount,
  onPaymentSuccess
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'promptpay' | 'truemoney'>('promptpay');
  const [truemoneyVoucher, setTruemoneyVoucher] = useState('');
  const [step, setStep] = useState<'payment' | 'processing' | 'success'>('payment');
  const [timeLeft, setTimeLeft] = useState(300); // 5 mins
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deliveredAssets, setDeliveredAssets] = useState<DeliveredAsset[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

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

  // Backend-First Payment Verification
  const handleConfirmPayment = async () => {
    if (!orderId) {
      setErrorMessage('ไม่พบ Order ID กรุณาลองใหม่อีกครั้ง');
      return;
    }

    if (paymentMethod === 'truemoney' && !truemoneyVoucher.trim()) {
      alert('กรุณากรอกลิงก์ซองของขวัญ TrueMoney หรือกดสุ่มลิงก์จำลอง');
      return;
    }

    setStep('processing');
    setErrorMessage('');

    try {
      const res = await fetch('/api/orders/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          paymentMethod,
          proof: paymentMethod === 'truemoney' ? truemoneyVoucher : 'promptpay_qr_verified',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'การตรวจสอบการชำระเงินล้มเหลว');
      }

      setDeliveredAssets(data.deliveredAssets || []);
      setStep('success');
      onPaymentSuccess(data.deliveredAssets || []);
    } catch (err: any) {
      setErrorMessage(err.message || 'เกิดข้อผิดพลาดในการตรวจสอบยอดเงิน');
      setStep('payment');
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-[#222831] border border-[#30475E] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#30475E] flex items-center justify-between bg-[#1a1f27]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#F05454]" />
            <h3 className="text-base font-bold text-white">
              {step === 'success' ? 'จัดส่งสินค้าดิจิทัลสำเร็จ (Digital Vault)' : 'ระบบชำระเงินอัตโนมัติ 24 ชม.'}
            </h3>
          </div>
          {step !== 'processing' && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-[#DDDDDD]/70 hover:text-white hover:bg-[#30475E] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-6">
          {errorMessage && (
            <div className="p-3 mb-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
              {errorMessage}
            </div>
          )}

          {step === 'payment' && (
            <div className="flex flex-col items-center text-center space-y-4">
              {/* Payment Details */}
              <div className="w-full p-3 rounded-xl bg-[#1a1f27] border border-[#30475E] flex items-center justify-between text-xs">
                <span className="text-[#DDDDDD]/70">เลขอ้างอิงคำสั่งซื้อ:</span>
                <span className="font-mono text-[#F05454] font-bold">{orderId || 'PENDING-ORDER'}</span>
              </div>

              {/* Payment Tabs: PromptPay vs TrueMoney */}
              <div className="w-full grid grid-cols-2 gap-2 p-1 bg-[#1a1f27] border border-[#30475E] rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('promptpay')}
                  className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'promptpay'
                      ? 'bg-[#F05454] text-white shadow'
                      : 'text-[#DDDDDD]/70 hover:text-white'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>PromptPay QR</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('truemoney')}
                  className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'truemoney'
                      ? 'bg-[#F05454] text-white shadow'
                      : 'text-[#DDDDDD]/70 hover:text-white'
                  }`}
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>TrueMoney ซอง</span>
                </button>
              </div>

              {paymentMethod === 'promptpay' ? (
                <>
                  {/* QR Code Card */}
                  <div className="p-5 rounded-2xl bg-white text-slate-900 shadow-xl flex flex-col items-center max-w-[260px] w-full">
                    <div className="w-full flex items-center justify-center gap-1.5 pb-3 border-b border-slate-200">
                      <div className="w-6 h-6 rounded bg-[#003d6d] flex items-center justify-center text-white font-black text-[10px]">
                        PP
                      </div>
                      <span className="font-bold text-xs tracking-wider text-[#003d6d]">PROMPTPAY</span>
                    </div>

                    <div className="my-3 p-2 border-2 border-slate-900 rounded-lg">
                      <QrCode className="w-40 h-40 text-slate-900" />
                    </div>

                    <div className="text-center">
                      <span className="text-[11px] text-slate-500 block">ยอดชำระสุทธิ (คำนวณโดย Backend)</span>
                      <span className="text-2xl font-black text-slate-900">
                        ฿{totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Countdown & Instructions */}
                  <div className="space-y-1">
                    <p className="text-xs text-[#DDDDDD]">
                      กรุณาสแกนจ่ายภายในเวลา: <span className="font-mono font-bold text-[#F05454]">{formattedTime}</span>
                    </p>
                    <p className="text-[11px] text-[#DDDDDD]/60">
                      ระบบ Backend AI จะตรวจจับสลิปและปลดล็อกข้อมูลส่งมอบทันทีอัตโนมัติ
                    </p>
                  </div>
                </>
              ) : (
                <div className="w-full space-y-4 text-left">
                  <div className="p-4 rounded-xl bg-[#1a1f27] border border-[#30475E] text-xs text-[#DDDDDD] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#F05454] flex items-center gap-1.5">
                        <Gift className="w-4 h-4" /> ชำระเงินด้วยซองของขวัญ TrueMoney:
                      </span>
                      <span className="text-white font-black text-sm">
                        ฿{totalAmount.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#DDDDDD]/70 font-light leading-relaxed">
                      1. สร้างซองของขวัญในแอป TrueMoney มูลค่า <strong>฿{totalAmount.toLocaleString()}</strong><br />
                      2. เลือก &quot;สุ่มจำนวนเงิน 1 คน&quot;<br />
                      3. นำลิงก์ซองของขวัญมาวางในช่องด้านล่างนี้
                    </p>
                  </div>

                  <div>
                    <label className="text-xs text-[#DDDDDD]/80 block mb-1.5 font-medium">
                      วางลิงก์ซองของขวัญ TrueMoney:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={truemoneyVoucher}
                        onChange={(e) => setTruemoneyVoucher(e.target.value)}
                        placeholder="https://gift.truemoney.com/campaign/?v=..."
                        className="flex-1 px-3 py-2.5 bg-[#1a1f27] border border-[#30475E] rounded-xl text-xs text-white placeholder-[#DDDDDD]/40 focus:outline-none focus:border-[#F05454]"
                      />
                      <button
                        type="button"
                        onClick={() => setTruemoneyVoucher('https://gift.truemoney.com/campaign/?v=sample_voucher_key')}
                        className="px-2.5 py-1 text-[11px] bg-[#30475E] hover:bg-[#30475E]/80 text-[#DDDDDD] font-semibold rounded-lg border border-[#30475E] shrink-0"
                      >
                        สุ่มลิงก์จำลอง
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Confirm Pay Button */}
              <button
                onClick={handleConfirmPayment}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-[#F05454] hover:bg-[#d94343] text-white shadow-lg shadow-[#F05454]/30 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>ยืนยันการชำระเงิน (Verify with Backend)</span>
              </button>
            </div>
          )}

          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 rounded-full border-4 border-[#30475E] border-t-[#F05454] animate-spin" />
              <h4 className="text-base font-bold text-white">Backend กำลังตรวจสอบยอดและดึงข้อมูลจาก Vault...</h4>
              <p className="text-xs text-[#DDDDDD]/70 max-w-xs">
                ระบบกำลังทำการแยกรายได้ 90%/10% และส่งมอบรหัสผ่านอย่างปลอดภัย
              </p>
            </div>
          )}

          {step === 'success' && (
            <div className="space-y-5">
              {/* Success Badge */}
              <div className="p-4 rounded-xl bg-[#30475E]/40 border border-[#30475E] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F05454]/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-[#F05454]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">ชำระเงินสำเร็จ & ปลดล็อกของจาก Server สำเร็จ!</h4>
                  <p className="text-xs text-[#DDDDDD]/80">
                    ข้อมูลไอดีและสคริปต์ถูกถอดรหัสและส่งมอบให้เฉพาะบัญชีของคุณเท่านั้น
                  </p>
                </div>
              </div>

              {/* Unlocked Credentials from Server Response */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-[#DDDDDD] uppercase tracking-wider flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-[#F05454]" />
                  <span>ข้อมูลที่ได้รับมอบ (Digital Vault):</span>
                </h5>

                {deliveredAssets.length === 0 ? (
                  <p className="text-xs text-[#DDDDDD]/60">จัดส่งสินค้าเรียบร้อย</p>
                ) : (
                  deliveredAssets.map((asset, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#1a1f27] border border-[#30475E] space-y-3">
                      <div className="flex items-center justify-between border-b border-[#30475E]/60 pb-2">
                        <span className="text-xs font-bold text-white line-clamp-1">
                          {asset.productTitle}
                        </span>
                        <span className="text-[10px] font-semibold text-[#F05454] uppercase bg-[#F05454]/10 px-2 py-0.5 rounded border border-[#F05454]/20">
                          {asset.type.toUpperCase()}
                        </span>
                      </div>

                      {/* Content Box */}
                      <div className="space-y-2">
                        <div className="relative p-3 rounded-lg bg-[#222831] border border-[#30475E] font-mono text-xs text-[#DDDDDD] break-all whitespace-pre-wrap leading-relaxed">
                          {asset.content}
                          <button
                            onClick={() => handleCopyText(`asset-${idx}`, asset.content)}
                            className="absolute top-2 right-2 p-1.5 rounded bg-[#30475E] hover:bg-[#30475E]/80 text-[#DDDDDD] transition-colors"
                            title="คัดลอกข้อมูล"
                          >
                            {copiedId === `asset-${idx}` ? (
                              <Check className="w-3.5 h-3.5 text-[#F05454]" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>

                        {asset.type === 'download_link' && (
                          <div className="space-y-2 pt-1">
                            {asset.licenseKey && (
                              <div className="p-2.5 rounded-lg bg-[#222831] border border-[#30475E] text-xs">
                                <span className="text-[#DDDDDD]/60 text-[10px] block">LICENSE KEY:</span>
                                <span className="font-mono text-[#F05454] font-bold">{asset.licenseKey}</span>
                              </div>
                            )}
                            <a
                              href={asset.content}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F05454] hover:bg-[#d94343] text-white text-xs font-bold transition-colors"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>ดาวน์โหลดไฟล์สคริปต์ (ZIP)</span>
                              <ExternalLink className="w-3 h-3 ml-0.5" />
                            </a>
                          </div>
                        )}

                        {asset.note && (
                          <p className="text-[11px] text-[#DDDDDD]/70 flex items-start gap-1">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#F05454]" />
                            <span>{asset.note}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#30475E] hover:bg-[#30475E]/80 text-white transition-colors"
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
