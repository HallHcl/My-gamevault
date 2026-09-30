# Strict Architectural Rule: Backend-First & Separation of Concerns

## 1. Core Principle (หลักการสำคัญสูงสุด)
เมื่อผู้ใช้งาน (USER) มอบหมาย Requirements หรือฟังก์ชันใดๆ มา:
**ต้องตระหนักและวิเคราะห์ทันทีว่า Logic นั้นควรอยู่ที่ Backend หรือ Frontend โดยยึดหลักการว่า "Core Business Logic, Data Integrity, Financial Logic และ Security ทั้งหมดต้องอยู่ที่ Backend เท่านั้น"**

---

## 2. การแบ่งหน้าที่อย่างเคร่งครัด (Strict Separation)

### A. ต้องอยู่ที่ Backend (Server-Side) เท่านั้น 🔒
1. **Financial & Calculations (เรื่องเงินและตัวเลข):**
   - การคำนวณราคาสินค้า, ยอดสุทธิ, สัดส่วนแบ่งรายได้ (Revenue Split 90%/10%), ค่าธรรมเนียมระบบ
   - การปรับปรุงยอดเครดิตในกระเป๋า (Wallet Balance Updates)
   - การเชื่อมต่อ Payment Gateway และการตรวจรับ Webhook
   - การสั่ง Payout API หรือโอนเงินออกอัตโนมัติ
2. **Data & Inventory Security (สต็อกและข้อมูลดิจิทัล):**
   - การเก็บและถอดรหัสรหัสผ่านไอดีเกม (Credentials Decryption via AES-256)
   - การสร้าง Signed Download URLs ที่มีอายุจำกัด (Time-limited Presigned URLs)
   - การออก License Key / HWID Activation Code
   - การล็อกข้อมูลสินค้าป้องกันขายซ้อน (Row-level Locking / Transactions)
3. **Authorization & Validation (สิทธิ์และความปลอดภัย):**
   - การตรวจสอบสิทธิ์ว่าผู้ใช้รายนี้ซื้อสินค้านั้นจริงหรือไม่ ก่อนเปิดเผยข้อมูล
   - การ Verify Signature ของ Webhook หรือสลิปธนาคาร

> ⚠️ **Zero Trust on Frontend:** ห้ามเชื่อถือตัวเลข ยอดเงิน หรือสถานะที่ส่งมาจาก Client เด็ดขาด ทุกอย่างต้องถูกคำนวณและตรวจสอบซ้ำที่ Backend เสมอ

### B. สิ่งที่อยู่ที่ Frontend (Client-Side) 🎨
1. **User Interface & Presentation:** การแสดงผลหน้าจอ, กราฟิก, แอนิเมชัน, Glassmorphism, โทนสี
2. **User Experience & Interaction:** ฟอร์มรับข้อมูล, การจัด Format ตัวเลขให้สวยงาม, การเปิด/ปิด Modal, Slide Drawer
3. **Client-side UX Validation:** เช็กเบื้องต้นก่อนกดส่ง เช่น เช็กความยาวตัวอักษร, รูปแบบอีเมล (เพื่อความลื่นไหลของผู้ใช้ แต่การตรวจสอบจริงต้องทำที่ Backend อีกชั้น)
4. **Consuming APIs:** รับข้อมูลที่ Backend ส่งมาแสดงผลบนจอ

---

## 3. ขั้นตอนการทำงานทุกครั้งที่มี Requirement ใหม่ (Standard Workflow)
1. **Think Before Code:** วิเคราะห์ก่อนเสมอว่า Logic ส่วนใดเป็น Backend และส่วนใดเป็น Frontend
2. **Design Backend First:** 
   - ออกแบบ Database Schema / Type Definition
   - ออกแบบ API Endpoint / Server Actions / Webhook Handler ที่รัดกุม ปลอดภัย
3. **Implement Frontend as a Consumer:**
   - สร้าง UI เพื่อส่ง Request ไปยัง Backend และนำผลลัพธ์ที่ได้มาแสดงผล
