import { NextResponse } from 'next/server';
import { getWallet, topUpWalletBalance } from '@/lib/server/db';

export async function GET() {
  try {
    const wallet = getWallet();
    return NextResponse.json({ success: true, wallet });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch wallet', details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, method = 'promptpay', voucherUrl } = body;

    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) {
      return NextResponse.json(
        { success: false, error: 'จำนวนเงินไม่ถูกต้อง' },
        { status: 400 }
      );
    }

    if (method === 'truemoney' && !voucherUrl) {
      return NextResponse.json(
        { success: false, error: 'กรุณากรอกลิงก์ซองของขวัญ TrueMoney' },
        { status: 400 }
      );
    }

    const description = method === 'truemoney' 
      ? `เติมเงินผ่าน TrueMoney Voucher (${voucherUrl.slice(0, 30)}...)`
      : 'เติมเงินผ่าน PromptPay QR อัตโนมัติ';

    const updatedWallet = topUpWalletBalance(numericAmount, description);

    return NextResponse.json({
      success: true,
      message: 'เติมเงินเข้ากระเป๋าสำเร็จ',
      wallet: updatedWallet,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'เกิดข้อผิดพลาดในการเติมเงิน', details: String(error) },
      { status: 500 }
    );
  }
}
