import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MY-GAMEVAULT | แพลตฟอร์มซื้อขายไอดีเกม ไอเทม และมาโครสคริปต์ ระบบออโต้ 24 ชม.",
  description: "ตลาดสินทรัพย์เกมดิจิทัลครบวงจร ซื้อขายไอดีเกม สกิน ไอเทม และมาโครสคริปต์ จัดส่งข้อมูลอัตโนมัติทันทีหลังชำระเงิน ปลอดภัย 100%",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="dark">
      <body className="min-h-screen bg-[#222831] text-[#DDDDDD] flex flex-col selection:bg-[#F05454] selection:text-white">
        {children}
      </body>
    </html>
  );
}
