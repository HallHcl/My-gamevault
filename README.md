# My-gamevault

> แพลตฟอร์มตลาดกลางซื้อขายสินค้าเกมดิจิทัล (Digital Gaming Assets E-commerce) ระดับพรีเมียม พร้อมระบบจำลองการจัดส่งอัตโนมัติ (Instant Auto-Delivery) ตลอด 24 ชั่วโมง

---

## 🎮 ภาพรวมโปรเจกต์ (Project Overview)

**My-gamevault** ถูกออกแบบและพัฒนาขึ้นเพื่อรองรับตลาดสินค้าเกมดิจิทัล 3 กลุ่มหลัก:
1. **Game Accounts (ไอดีเกมแท้):** ระบบจัดการส่งมอบ Credentials (Username, Password, Recovery Code, First Mail) ทันทีหลังยืนยันการชำระเงิน
2. **In-game Items (ไอเทมและเงินในเกม):** จัดส่งผ่านระบบบอทอัตโนมัติ (Robux ผ่าน Gamepass, BP โอนสด, สกินเกม)
3. **Macros & Scripts (สคริปต์มาโคร):** ระบบสร้าง Secure Signed URL สำหรับดาวน์โหลดไฟล์ LUA / Synapse พร้อม License Key แบบเข้ารหัส

---

## ✨ ฟีเจอร์หลัก (Key Features)

- **⚡ Instant Digital Auto-Delivery:** เมื่อผู้ใช้ชำระเงินสำเร็จผ่าน PromptPay QR ระบบจะปลดล็อก Vault แสดงข้อมูลไอดีหรือลิงก์ดาวน์โหลดบนหน้าจอทันที พร้อมปุ่ม Copy สะดวกสบาย
- **🎨 Modern Cyberpunk / Dark Glassmorphism UI:** ดีไซน์สไตล์เกมเมอร์ระดับพรีเมียม โทนสี Neon Violet, Cyan และ Dark Obsidian พร้อมเอฟเฟกต์ Glassmorphism และ Micro-animations
- **🛒 Interactive Cart Drawer & Promo Engine:** ตะกร้าสินค้าแบบสไลด์ข้าง คำนวณยอดเงินและส่วนลดแบบ Real-time (ลองใช้โค้ด `VAULT100` หรือ `PROGAMER`)
- **🔍 Real-Time Filter & Search:** ระบบค้นหาและตัวกรองแยกตามหมวดหมู่ (ไอดีเกม / ไอเทม / มาโคร) และตัวกรองตามชื่อเกม
- **🛡️ Security & Escrow Principles:** โครงสร้างรองรับการเข้ารหัสข้อมูลไอดีด้วย AES-256 และการจัดส่งแบบ Time-limited Signed URLs

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **Framework:** [Next.js (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Architecture:** Modular Component Design & Type-safe Data Models

---

## 🚀 วิธีการติดตั้งและรันในเครื่อง (Getting Started)

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. รันโหมด Development
```bash
npm run dev
```
เปิดบราวเซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

### 3. Build สำหรับ Production
```bash
npm run build
npm run start
```

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```text
my-gamemarket/
├── public/
│   └── images/
│       └── hero-banner.jpg          # แบนเนอร์สไตล์ Cyberpunk
├── src/
│   ├── app/
│   │   ├── globals.css              # Dark theme, Glassmorphism, Neon glow
│   │   ├── layout.tsx               # Root layout & Metadata ภาษาไทย
│   │   └── page.tsx                 # Main Marketplace Catalog page
│   ├── components/
│   │   ├── Navbar.tsx               # ส่วนหัวพร้อม Search, Wallet, และ Cart
│   │   ├── Hero.tsx                 # ส่วนแบนเนอร์ Hero & สถิติระบบ
│   │   ├── ProductCard.tsx          # การ์ดแสดงสินค้าแต่ละชิ้น
│   │   ├── QuickViewModal.tsx       # ป๊อปอัปดูรายละเอียดสินค้าเชิงลึก
│   │   ├── CartDrawer.tsx           # ตะกร้าสินค้าแบบสไลด์ข้าง
│   │   ├── CheckoutModal.tsx        # โมดอลสแกน PromptPay QR & ส่งมอบออโต้
│   │   └── Footer.tsx               # ข้อมูลติดต่อ นโยบายรับประกัน และช่องทางชำระเงิน
│   ├── data/
│   │   └── mockProducts.ts          # ฐานข้อมูลจำลองสินค้าเกม
│   └── types/
│       └── index.ts                 # Type definitions สำหรับ Product, Cart, Order
├── SYSTEM_PROMPT.md
└── README.md
```

---

## 🔒 แนวคิดความปลอดภัย (Security Considerations)

1. **Vault Encryption:** ข้อมูล Credentials ในฐานข้อมูลจริงต้องถูกเข้ารหัสด้วย AES-256-GCM ก่อนจัดเก็บ
2. **Pre-signed Download URLs:** ลิงก์ดาวน์โหลดสคริปต์มาโครสร้างผ่าน S3/Cloudflare R2 แบบกำหนดอายุ 15-30 นาที และจำกัด IP/Session ป้องกันการแชร์ลิงก์ต่อสาธารณะ
3. **Webhook Verification:** ตรวจสอบ Signature ของ Payment Gateway (เช่น Stripe, Omise, GB Prime Pay) เพื่อป้องกันการโจมตีแบบ Replay Attack
