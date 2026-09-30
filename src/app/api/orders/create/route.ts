import { NextResponse } from 'next/server';
import { createOrder, calculateOrderPricing } from '@/lib/server/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, paymentMethod = 'promptpay', couponCode } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'ไม่พบรายการสินค้าในคำสั่งซื้อ' },
        { status: 400 }
      );
    }

    // Server-side validation & pricing
    const pricing = calculateOrderPricing(items, couponCode);
    if (!pricing.isValid) {
      return NextResponse.json(
        { success: false, error: pricing.error },
        { status: 400 }
      );
    }

    const order = createOrder(items, paymentMethod, couponCode);

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'เกิดข้อผิดพลาดในการสร้างคำสั่งซื้อ', details: String(error) },
      { status: 500 }
    );
  }
}
