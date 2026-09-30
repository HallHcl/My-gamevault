import { NextResponse } from 'next/server';
import { calculateOrderPricing } from '@/lib/server/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, couponCode } = body;

    if (!items || !couponCode) {
      return NextResponse.json(
        { success: false, error: 'ข้อมูลไม่ครบถ้วน' },
        { status: 400 }
      );
    }

    const pricing = calculateOrderPricing(items, couponCode);

    if (pricing.discountAmount <= 0) {
      return NextResponse.json({
        success: false,
        error: 'โค้ดส่วนลดไม่ถูกต้อง หมดอายุ หรือยอดสั่งซื้อไม่ถึงขั้นต่ำ',
      });
    }

    return NextResponse.json({
      success: true,
      message: 'ใช้โค้ดส่วนลดสำเร็จ',
      discountAmount: pricing.discountAmount,
      grossAmount: pricing.grossAmount,
      netAmount: pricing.netAmount,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'เกิดข้อผิดพลาดในการตรวจสอบโค้ด', details: String(error) },
      { status: 500 }
    );
  }
}
