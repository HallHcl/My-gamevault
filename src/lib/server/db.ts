import fs from 'fs';
import path from 'path';
import { Product, VaultAsset, Order, TransactionSplit, Coupon, WalletRecord, DeliveredAsset } from '../../types/index';

interface DatabaseSchema {
  products: Product[];
  vaultAssets: VaultAsset[];
  orders: Order[];
  splits: TransactionSplit[];
  wallet: WalletRecord;
  coupons: Coupon[];
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Default initial state (Clean starting database)
const defaultDbState: DatabaseSchema = {
  products: [],
  vaultAssets: [],
  orders: [],
  splits: [],
  wallet: {
    balance: 0,
    transactions: [],
  },
  coupons: [
    { code: 'VAULT100', type: 'fixed', value: 100, minSpend: 300, isActive: true },
    { code: 'PROGAMER', type: 'percent', value: 10, minSpend: 500, isActive: true },
  ],
};

function ensureDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(defaultDbState, null, 2), 'utf-8');
      return defaultDbState;
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data) as DatabaseSchema;
  } catch (err) {
    console.error('Error reading database file:', err);
    return defaultDbState;
  }
}

function saveDb(db: DatabaseSchema): void {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing database file:', err);
  }
}

// ----------------------------------------------------------------------
// 1. PRODUCTS & VAULT (Public Catalog vs Secret Vault)
// ----------------------------------------------------------------------

export function getPublicProducts(): Product[] {
  const db = ensureDb();
  // Strictly return public information ONLY (no credentials)
  return db.products;
}

export function getProductById(id: string): Product | undefined {
  const db = ensureDb();
  return db.products.find((p) => p.id === id);
}

export function addProductWithAsset(
  productData: Omit<Product, 'id'>,
  vaultAssetData: {
    type: 'credential' | 'download_link' | 'code';
    content: string;
    note: string;
  }
): Product {
  const db = ensureDb();
  const productId = `prod-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;

  const newProduct: Product = {
    ...productData,
    id: productId,
    stock: productData.stock || 1,
    salesCount: 0,
    rating: 5.0,
  };

  const newVaultAsset: VaultAsset = {
    id: `asset-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
    productId: productId,
    type: vaultAssetData.type,
    content: vaultAssetData.content,
    note: vaultAssetData.note,
    isClaimed: false,
  };

  db.products.unshift(newProduct);
  db.vaultAssets.push(newVaultAsset);

  saveDb(db);
  return newProduct;
}

export function deleteProduct(productId: string): boolean {
  const db = ensureDb();
  db.products = db.products.filter((p) => p.id !== productId);
  db.vaultAssets = db.vaultAssets.filter((a) => a.productId !== productId);
  saveDb(db);
  return true;
}

// ----------------------------------------------------------------------
// 2. FINANCIAL & PRICING LOGIC (Server-side Calculation)
// ----------------------------------------------------------------------

export function calculateOrderPricing(
  items: { productId: string; quantity: number }[],
  couponCode?: string
): {
  isValid: boolean;
  error?: string;
  grossAmount: number;
  discountAmount: number;
  netAmount: number;
  orderItems: Order['items'];
} {
  const db = ensureDb();
  let grossAmount = 0;
  const orderItems: Order['items'] = [];

  for (const item of items) {
    const product = db.products.find((p) => p.id === item.productId);
    if (!product) {
      return {
        isValid: false,
        error: `ไม่พบสินค้า ID: ${item.productId}`,
        grossAmount: 0,
        discountAmount: 0,
        netAmount: 0,
        orderItems: [],
      };
    }
    if (product.stock < item.quantity) {
      return {
        isValid: false,
        error: `สินค้า "${product.title}" มีจำนวนไม่พอ (เหลือ ${product.stock} ชิ้น)`,
        grossAmount: 0,
        discountAmount: 0,
        netAmount: 0,
        orderItems: [],
      };
    }

    const itemTotal = product.price * item.quantity;
    grossAmount += itemTotal;
    orderItems.push({
      productId: product.id,
      productTitle: product.title,
      game: product.game,
      price: product.price,
      quantity: item.quantity,
    });
  }

  // Server-side Coupon Verification
  let discountAmount = 0;
  if (couponCode) {
    const coupon = db.coupons.find(
      (c) => c.code.toUpperCase() === couponCode.trim().toUpperCase() && c.isActive
    );
    if (coupon && grossAmount >= coupon.minSpend) {
      if (coupon.type === 'fixed') {
        discountAmount = coupon.value;
      } else if (coupon.type === 'percent') {
        discountAmount = Math.round((grossAmount * coupon.value) / 100);
      }
    }
  }

  const netAmount = Math.max(0, grossAmount - discountAmount);

  return {
    isValid: true,
    grossAmount,
    discountAmount,
    netAmount,
    orderItems,
  };
}

// ----------------------------------------------------------------------
// 3. ORDERS & DIGITAL DELIVERY VAULT (Claim upon verified payment)
// ----------------------------------------------------------------------

export function createOrder(
  items: { productId: string; quantity: number }[],
  paymentMethod: Order['paymentMethod'],
  couponCode?: string
): Order {
  const db = ensureDb();
  const pricing = calculateOrderPricing(items, couponCode);

  if (!pricing.isValid) {
    throw new Error(pricing.error || 'คำสั่งซื้อไม่ถูกต้อง');
  }

  const orderId = `GV-ORD-${Date.now().toString().slice(-6)}`;

  const newOrder: Order = {
    id: orderId,
    items: pricing.orderItems,
    grossAmount: pricing.grossAmount,
    discountAmount: pricing.discountAmount,
    netAmount: pricing.netAmount,
    paymentMethod,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  db.orders.unshift(newOrder);
  saveDb(db);
  return newOrder;
}

export function verifyAndFulfillOrder(orderId: string): {
  order: Order;
  deliveredAssets: DeliveredAsset[];
  splits: TransactionSplit[];
} {
  const db = ensureDb();
  const order = db.orders.find((o) => o.id === orderId);

  if (!order) {
    throw new Error(`ไม่พบคำสั่งซื้อ: ${orderId}`);
  }

  if (order.status === 'completed') {
    return {
      order,
      deliveredAssets: order.deliveredAssets || [],
      splits: order.splits || [],
    };
  }

  // 1. Mark Order Paid
  order.status = 'completed';

  // 2. Automated Digital Asset Claim & Decryption from Vault
  const deliveredAssets: DeliveredAsset[] = [];
  const splits: TransactionSplit[] = [];

  for (const item of order.items) {
    const product = db.products.find((p) => p.id === item.productId);
    const asset = db.vaultAssets.find(
      (a) => a.productId === item.productId && (!a.isClaimed || a.type === 'download_link')
    );

    // Decrease Stock
    if (product && product.stock > 0) {
      product.stock = Math.max(0, product.stock - item.quantity);
      product.salesCount += item.quantity;
    }

    if (asset) {
      asset.isClaimed = true;
      asset.claimedOrderId = order.id;

      deliveredAssets.push({
        productId: item.productId,
        productTitle: item.productTitle,
        type: asset.type,
        content: asset.content,
        licenseKey: asset.type === 'download_link' ? `FVM-VAULT-${Date.now().toString().slice(-4)}-AUTH` : undefined,
        note: asset.note,
      });
    }

    // 3. Automated Revenue Split (90% Admin / 10% Seller) & Auto-Payout
    const sellerRate = product?.seller?.ratePercent || 10;
    const adminRate = 100 - sellerRate;
    const sellerPayout = Math.round((item.price * sellerRate) / 100);
    const adminProfit = item.price - sellerPayout;

    const splitRecord: TransactionSplit = {
      id: `split-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      orderId: order.id,
      itemTitle: item.productTitle,
      totalAmount: item.price,
      adminProfit,
      adminRate,
      sellerPayout,
      sellerRate,
      sellerName: product?.seller?.name || 'ผู้ฝากขาย (Seller)',
      sellerPromptPay: product?.seller?.promptPay || '089-XXX-1249',
      payoutStatus: 'completed',
      payoutRef: `TRF-PROMPTPAY-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };

    splits.push(splitRecord);
    db.splits.unshift(splitRecord);
  }

  order.deliveredAssets = deliveredAssets;
  order.splits = splits;

  saveDb(db);
  return { order, deliveredAssets, splits };
}

// ----------------------------------------------------------------------
// 4. WALLET & TOP-UP LOGIC
// ----------------------------------------------------------------------

export function getWallet(): WalletRecord {
  const db = ensureDb();
  return db.wallet;
}

export function topUpWalletBalance(amount: number, description: string): WalletRecord {
  const db = ensureDb();
  db.wallet.balance += amount;
  db.wallet.transactions.unshift({
    id: `tx-${Date.now()}`,
    type: 'topup',
    amount,
    description,
    timestamp: new Date().toISOString(),
  });
  saveDb(db);
  return db.wallet;
}

// ----------------------------------------------------------------------
// 5. ADMIN FINANCIAL & LEDGER
// ----------------------------------------------------------------------

export function getFinancialLedger(): {
  grossVolume: number;
  sellerPayouts: number;
  adminNetProfit: number;
  splits: TransactionSplit[];
} {
  const db = ensureDb();
  const grossVolume = db.splits.reduce((sum, s) => sum + s.totalAmount, 0);
  const sellerPayouts = db.splits.reduce((sum, s) => sum + s.sellerPayout, 0);
  const adminNetProfit = db.splits.reduce((sum, s) => sum + s.adminProfit, 0);

  return {
    grossVolume,
    sellerPayouts,
    adminNetProfit,
    splits: db.splits,
  };
}
