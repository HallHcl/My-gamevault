import { TransactionSplit } from '../types';

export interface PayoutResult {
  success: boolean;
  payoutRef: string;
  transferTimestamp: string;
  statement: {
    grossIncoming: number;   // e.g. +500
    sellerPayout: number;    // e.g. -50
    adminNetProfit: number;  // e.g. +450
  };
  details: string;
}

/**
 * คำนวณการแบ่งสัดส่วนรายได้ระหว่าง Admin และคนฝากขาย
 * ตัวอย่าง: 500 บาท -> Admin 90% (450 บาท), คนฝากขาย 10% (50 บาท)
 */
export function calculateRevenueSplit(
  orderId: string,
  itemTitle: string,
  totalAmount: number,
  sellerName = 'ผู้ฝากขาย (Seller)',
  sellerPromptPay = '089-XXX-1249',
  sellerRate = 10, // 10%
  adminRate = 90   // 90%
): TransactionSplit {
  const sellerPayout = Math.round((totalAmount * sellerRate) / 100);
  const adminProfit = totalAmount - sellerPayout;

  const randomRefSuffix = Math.floor(100000 + Math.random() * 900000);

  return {
    id: `split-${Date.now()}-${randomRefSuffix}`,
    orderId,
    itemTitle,
    totalAmount,
    adminProfit,
    adminRate,
    sellerPayout,
    sellerRate,
    sellerName,
    sellerPromptPay,
    payoutStatus: 'completed',
    payoutRef: `TRF-PROMPTPAY-${randomRefSuffix}`,
    timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
  };
}

/**
 * จำลองการเรียก API โอนเงินออกอัตโนมัติ (เช่น Omise Transfers API / GB Prime Pay Payout)
 * ส่งเงินตรงเข้าบัญชี PromptPay ของคนฝากขายใน 3 วินาที
 */
export async function executeAutoPayout(split: TransactionSplit): Promise<PayoutResult> {
  // จำลอง network latency 500ms
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    payoutRef: split.payoutRef,
    transferTimestamp: new Date().toISOString(),
    statement: {
      grossIncoming: split.totalAmount,
      sellerPayout: split.sellerPayout,
      adminNetProfit: split.adminProfit,
    },
    details: `ระบบ Payout API ได้โอนเงินจำนวน ฿${split.sellerPayout.toLocaleString()} ไปยังบัญชีพร้อมเพย์ ${split.sellerPromptPay} (${split.sellerName}) สำเร็จเรียบร้อย`,
  };
}
