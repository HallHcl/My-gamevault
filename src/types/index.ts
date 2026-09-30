export type ProductCategory = 'all' | 'account' | 'item' | 'macro';

export type DeliveryType = 'instant_credential' | 'instant_download' | 'in_game_trade';

/**
 * Public Product (ข้อมูลที่เปิดเผยหน้าร้าน - ไม่มีรหัสผ่านหรือ Credentials หลุดออกมา)
 */
export interface Product {
  id: string;
  title: string;
  game: string;
  category: 'account' | 'item' | 'macro';
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  stock: number;
  rating: number;
  salesCount: number;
  deliveryType: DeliveryType;
  description: string;
  features: string[];
  seller?: {
    name: string;
    promptPay: string;
    ratePercent: number; // e.g. 10%
  };
}

/**
 * Private Vault Asset (เก็บอยู่หลังบ้านใน Database เท่านั้น - ส่งมอบเฉพาะผู้ที่จ่ายเงินแล้ว)
 */
export interface VaultAsset {
  id: string;
  productId: string;
  type: 'credential' | 'download_link' | 'code';
  content: string; // e.g. USER: ... PASS: ... หรือ Signed URL
  licenseKey?: string;
  note: string;
  isClaimed: boolean;
  claimedOrderId?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Coupon {
  code: string;
  type: 'fixed' | 'percent';
  value: number;
  minSpend: number;
  isActive: boolean;
}

export interface TransactionSplit {
  id: string;
  orderId: string;
  itemTitle: string;
  totalAmount: number;    // ยอดขายรวม เช่น 500
  adminProfit: number;    // กำไร Admin เช่น 450 (90%)
  adminRate: number;      // 90
  sellerPayout: number;   // ยอดโอนคนฝากขาย เช่น 50 (10%)
  sellerRate: number;     // 10
  sellerName: string;
  sellerPromptPay: string;
  payoutStatus: 'completed' | 'processing' | 'held';
  payoutRef: string;
  timestamp: string;
}

export interface DeliveredAsset {
  productId: string;
  productTitle: string;
  type: 'credential' | 'download_link' | 'code';
  content: string;
  licenseKey?: string;
  note: string;
}

export interface Order {
  id: string;
  items: {
    productId: string;
    productTitle: string;
    game: string;
    price: number;
    quantity: number;
  }[];
  grossAmount: number;
  discountAmount: number;
  netAmount: number;
  paymentMethod: 'promptpay' | 'truemoney' | 'crypto';
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  splits?: TransactionSplit[];
  deliveredAssets?: DeliveredAsset[];
}

export interface WalletRecord {
  balance: number;
  transactions: {
    id: string;
    type: 'topup' | 'purchase';
    amount: number;
    description: string;
    timestamp: string;
  }[];
}
