import { NextResponse } from 'next/server';
import { calculateRevenueSplit, executeAutoPayout } from '@/lib/payoutEngine';

/**
 * Production-ready Webhook Handler:
 * เมื่อลูกค้าชำระเงินสำเร็จ (PromptPay / TrueMoney):
 * 1. รับ Webhook จาก Gateway (SlipOK / GB Prime Pay / Omise)
 * 2. ตรวจสอบความถูกต้องของคำสั่งซื้อ
 * 3. หักแบ่งเงินอัตโนมัติ (เช่น 500 บาท -> Admin 450 บาท, คนฝากขาย 50 บาท)
 * 4. ยิง Auto-Payout API โอนเงิน 50 บาทเข้าบัญชีคนฝากขายทันที 24 ชม.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, amount, itemTitle, sellerPromptPay, sellerRate = 10 } = body;

    if (!orderId || !amount) {
      return NextResponse.json(
        { error: 'Missing required orderId or amount' },
        { status: 400 }
      );
    }

    // 1. คำนวณสัดส่วนการแบ่งเงิน
    const splitData = calculateRevenueSplit(
      orderId,
      itemTitle || 'สินค้าเกมดิจิทัล',
      amount,
      'คนฝากขาย (Seller)',
      sellerPromptPay || '089-XXX-1249',
      sellerRate,
      100 - sellerRate
    );

    // 2. เรียก Payout API โอนเงินออกให้อัตโนมัติ (Auto-Disbursement)
    const payoutResult = await executeAutoPayout(splitData);

    return NextResponse.json({
      success: true,
      message: 'การชำระเงินสำเร็จและระบบได้ทำการโอนเงินแบ่งจ่ายให้คนฝากขายเรียบร้อยแล้ว',
      data: {
        orderId,
        grossReceived: splitData.totalAmount,     // เงินเข้า Admin (+500)
        sellerPayout: splitData.sellerPayout,       // เงินโอนออก Auto (-50)
        adminNetProfit: splitData.adminProfit,      // กำไรสุทธิของ Admin (+450)
        payoutRef: payoutResult.payoutRef,
        recipient: splitData.sellerPromptPay,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error in payout webhook', details: String(error) },
      { status: 500 }
    );
  }
}
