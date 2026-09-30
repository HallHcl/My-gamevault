export type ProductCategory = 'all' | 'account' | 'item' | 'macro';

export type DeliveryType = 'instant_credential' | 'instant_download' | 'in_game_trade';

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
  sampleAsset?: {
    type: 'credential' | 'download_link' | 'code';
    content: string;
    note: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface TransactionSplit {
  id: string;
  orderId: string;
  itemTitle: string;
  totalAmount: number;    // e.g. 500
  adminProfit: number;    // e.g. 450 (90%)
  adminRate: number;      // 90
  sellerPayout: number;   // e.g. 50 (10%)
  sellerRate: number;     // 10
  sellerName: string;
  sellerPromptPay: string;
  payoutStatus: 'completed' | 'processing' | 'held';
  payoutRef: string;
  timestamp: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  paymentMethod: 'promptpay' | 'truemoney' | 'crypto';
  status: 'pending' | 'completed';
  createdAt: string;
  splitInfo?: TransactionSplit[];
  deliveredAssets?: {
    productId: string;
    productTitle: string;
    type: 'credential' | 'download_link' | 'code';
    content: string;
  }[];
}
