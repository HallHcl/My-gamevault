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

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  paymentMethod: 'promptpay' | 'truemoney' | 'crypto';
  status: 'pending' | 'completed';
  createdAt: string;
  deliveredAssets?: {
    productId: string;
    productTitle: string;
    type: 'credential' | 'download_link' | 'code';
    content: string;
  }[];
}
