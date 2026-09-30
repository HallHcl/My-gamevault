import { NextResponse } from 'next/server';
import { verifyAndFulfillOrder } from '@/lib/server/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Missing orderId' },
        { status: 400 }
      );
    }

    // Server-side verification, Vault unlock, and Auto-Split execution
    const fulfillment = verifyAndFulfillOrder(orderId);

    return NextResponse.json({
      success: true,
      message: 'ยืนยันการชำระเงินสำเร็จ และปลดล็อกข้อมูลสินค้าจาก Vault เรียบร้อยแล้ว',
      order: fulfillment.order,
      deliveredAssets: fulfillment.deliveredAssets,
      splits: fulfillment.splits,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'เกิดข้อผิดพลาดในการตรวจสอบการชำระเงิน', details: String(error) },
      { status: 500 }
    );
  }
}
