import { NextResponse } from 'next/server';
import { getFinancialLedger } from '@/lib/server/db';

export async function GET() {
  try {
    const ledger = getFinancialLedger();
    return NextResponse.json({ success: true, ledger });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch financial ledger', details: String(error) },
      { status: 500 }
    );
  }
}
