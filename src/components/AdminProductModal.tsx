'use client';

import React, { useState } from 'react';
import { X, Plus, Package, ShieldCheck, Key, Lock, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface AdminProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductCreated: (newProduct: Product) => void;
}

export const AdminProductModal: React.FC<AdminProductModalProps> = ({
  isOpen,
  onClose,
  onProductCreated,
}) => {
  const [title, setTitle] = useState('');
  const [game, setGame] = useState('Blox Fruits');
  const [category, setCategory] = useState<'account' | 'item' | 'macro'>('account');
  const [price, setPrice] = useState<number>(500);
  const [originalPrice, setOriginalPrice] = useState<number>(750);
  const [stock, setStock] = useState<number>(1);
  const [image, setImage] = useState('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80');
  const [description, setDescription] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [deliveryType, setDeliveryType] = useState<'instant_credential' | 'instant_download' | 'in_game_trade'>('instant_credential');

  // Private Vault Asset Content (Never exposed to public)
  const [vaultContent, setVaultContent] = useState('');
  const [vaultNote, setVaultNote] = useState('กรุณาเปลี่ยนรหัสผ่านและผูกอีเมลของท่านทันทีหลังได้รับข้อมูล');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleQuickPreFill = (type: 'blox' | 'fivem' | 'item') => {
    if (type === 'blox') {
      setTitle('ROBLOX [Blox Fruits] - ไอดี Lv.2550 ตัน ผล Kitsune ถาวร + หมัด Godhuman');
      setGame('Blox Fruits');
      setCategory('account');
      setPrice(1450);
      setOriginalPrice(1900);
      setStock(1);
      setImage('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80');
      setDescription('ไอดีเลเวลตัน 2550 สเตตัสเต็ม กินผล Kitsune ถาวร มีหมัด Godhuman และเคียว CDK เมลสะอาดพร้อมเปลี่ยน');
      setFeaturesText('เลเวล Max 2550\nผลจิ้งจอก Kitsune ถาวร\nหมัด Godhuman + CDK\nรับประกันไอดีสะอาด 100%');
      setDeliveryType('instant_credential');
      setVaultContent('ROBLOX_USER: my_real_roblox_account_2026\nPASS: Password#Real9928!\nEMAIL_STATUS: Unverified');
      setVaultNote('ล็อกอินเข้าเว็บ Roblox แล้วกดเปลี่ยนรหัสผ่านและผูกอีเมลส่วนตัวทันที');
    } else if (type === 'fivem') {
      setTitle('FIVEM MACRO - สลับปืนไว Fast Switch 0.05 วิ + คุมแรงถอย ไม่แก้ไฟล์เกม');
      setGame('FiveM (GTA V)');
      setCategory('macro');
      setPrice(390);
      setOriginalPrice(650);
      setStock(999);
      setImage('https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80');
      setDescription('สคริปต์มาโครสลับปืนไว สำหรับเมาส์ Logitech G-Hub และ Razer Synapse ทำงานระดับฮาร์ดแวร์ ปลอดภัย 100%');
      setFeaturesText('สลับปืนไว 0.05 วินาที\nคุมแรงดีดปืน AP Pistol/PDW\nไม่ยุ่งเกี่ยวกับไฟล์ FiveM\nมีคลิปสอนติดตั้งภาษาไทย');
      setDeliveryType('instant_download');
      setVaultContent('https://cdn.my-gamevault.com/downloads/fivem_fast_switch_clean.zip?key=vault_secure_token');
      setVaultNote('แตกไฟล์ .zip และเปิดโปรแกรมเพื่อตั้งค่าปุ่มลัด');
    } else {
      setTitle('ROBLOX [Pet Sim 99] - 100,000,000 Diamonds โอนสดเข้า Mailbox ทันที');
      setGame('Pet Simulator 99');
      setCategory('item');
      setPrice(290);
      setOriginalPrice(420);
      setStock(50);
      setImage('https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80');
      setDescription('เพชรในเกม Pet Sim 99 จำนวน 100M จัดส่งผ่านตู้ไปรษณีย์ Mailbox อัตโนมัติภายใน 1 นาที');
      setFeaturesText('100M Diamonds เต็มจำนวน\nไม่ต้องใช้รหัสผ่าน\nโอนผ่านตู้จดหมาย Mailbox\nเพชรสะอาดไม่ติดลบ');
      setDeliveryType('in_game_trade');
      setVaultContent('TRANSACTION_KEY: PS99-MAIL-100M-REAL\nSTATUS: Transferred to Mailbox');
      setVaultNote('เปิดเกม Pet Sim 99 แล้วเดินไปกดรับที่ตู้ Mailbox หน้า Spawn ได้ทันที');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price || !vaultContent.trim()) {
      setErrorMsg('กรุณากรอกชื่อสินค้า, ราคา, และข้อมูลจัดส่ง (Vault Asset Content)');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const features = featuresText
        .split('\n')
        .map((f) => f.trim())
        .filter((f) => f.length > 0);

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productData: {
            title,
            game,
            category,
            price: Number(price),
            originalPrice: originalPrice ? Number(originalPrice) : undefined,
            stock: Number(stock) || 1,
            image,
            description,
            features,
            deliveryType,
            seller: {
              name: 'ร้านค้าหลัก (Admin/Seller)',
              promptPay: '089-XXX-1249',
              ratePercent: 10,
            },
          },
          vaultAsset: {
            type: deliveryType === 'instant_download' ? 'download_link' : 'credential',
            content: vaultContent,
            note: vaultNote,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save product');
      }

      onProductCreated(data.product);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'เกิดข้อผิดพลาดในการบันทึกสินค้า');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#222831] border border-[#30475E] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#30475E] flex items-center justify-between bg-[#1a1f27]">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#F05454]" />
            <h3 className="text-base font-bold text-white">เพิ่มสินค้าจริงเข้าระบบ (Backend-First Vault)</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#DDDDDD]/70 hover:text-white hover:bg-[#30475E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-4 text-xs">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300">
              {errorMsg}
            </div>
          )}

          {/* Quick Pre-fill buttons */}
          <div className="p-3 rounded-xl bg-[#1a1f27] border border-[#30475E] flex flex-wrap items-center justify-between gap-2">
            <span className="text-[#DDDDDD]/70 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#F05454]" /> ลองกรอกข้อมูลตัวอย่างแบบเร็ว:
            </span>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickPreFill('blox')}
                className="px-2.5 py-1 bg-[#30475E] hover:bg-[#30475E]/80 text-white rounded text-[11px] font-semibold"
              >
                ไอดี Blox Fruits
              </button>
              <button
                type="button"
                onClick={() => handleQuickPreFill('fivem')}
                className="px-2.5 py-1 bg-[#30475E] hover:bg-[#30475E]/80 text-white rounded text-[11px] font-semibold"
              >
                มาโคร FiveM
              </button>
              <button
                type="button"
                onClick={() => handleQuickPreFill('item')}
                className="px-2.5 py-1 bg-[#30475E] hover:bg-[#30475E]/80 text-white rounded text-[11px] font-semibold"
              >
                เพชร Pet Sim
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[#DDDDDD]/70 block mb-1">หมวดหมู่สินค้า:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#1a1f27] border border-[#30475E] rounded-lg text-white focus:outline-none focus:border-[#F05454]"
              >
                <option value="account">🎮 ไอดีเกม (Accounts)</option>
                <option value="item">💎 ไอเทมในเกม (In-game Items)</option>
                <option value="macro">⚡ มาโคร & สคริปต์ (Macros & Scripts)</option>
              </select>
            </div>

            <div>
              <label className="text-[#DDDDDD]/70 block mb-1">ชื่อเกม (Game Name):</label>
              <input
                type="text"
                value={game}
                onChange={(e) => setGame(e.target.value)}
                placeholder="เช่น Blox Fruits, FiveM, King Legacy"
                className="w-full px-3 py-2 bg-[#1a1f27] border border-[#30475E] rounded-lg text-white focus:outline-none focus:border-[#F05454]"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[#DDDDDD]/70 block mb-1">ชื่อสินค้า (Product Title):</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="เช่น ROBLOX [Blox Fruits] - ไอดี Lv.2550 ตัน ผล Kitsune ถาวร"
              className="w-full px-3 py-2 bg-[#1a1f27] border border-[#30475E] rounded-lg text-white focus:outline-none focus:border-[#F05454]"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[#DDDDDD]/70 block mb-1">ราคาขายจริง (฿):</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#1a1f27] border border-[#30475E] rounded-lg text-white focus:outline-none focus:border-[#F05454]"
                required
              />
            </div>

            <div>
              <label className="text-[#DDDDDD]/70 block mb-1">ราคาเต็ม (สำหรับลด ฿):</label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#1a1f27] border border-[#30475E] rounded-lg text-white focus:outline-none focus:border-[#F05454]"
              />
            </div>

            <div>
              <label className="text-[#DDDDDD]/70 block mb-1">จำนวนสต็อก:</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#1a1f27] border border-[#30475E] rounded-lg text-white focus:outline-none focus:border-[#F05454]"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[#DDDDDD]/70 block mb-1">URL รูปภาพสินค้า (Image URL):</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-3 py-2 bg-[#1a1f27] border border-[#30475E] rounded-lg text-white focus:outline-none focus:border-[#F05454]"
            />
          </div>

          <div>
            <label className="text-[#DDDDDD]/70 block mb-1">รายละเอียดสินค้า (Description):</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="อธิบายรายละเอียด สเปกไอดี หรือคุณสมบัติสคริปต์"
              className="w-full px-3 py-2 bg-[#1a1f27] border border-[#30475E] rounded-lg text-white focus:outline-none focus:border-[#F05454]"
            />
          </div>

          <div>
            <label className="text-[#DDDDDD]/70 block mb-1">จุดเด่นสินค้า (1 บรรทัด = 1 ข้อ):</label>
            <textarea
              rows={2}
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              placeholder="เลเวล Max 2550&#10;ผล Kitsune ถาวร&#10;เมลสะอาด 100%"
              className="w-full px-3 py-2 bg-[#1a1f27] border border-[#30475E] rounded-lg text-white focus:outline-none focus:border-[#F05454]"
            />
          </div>

          {/* Secure Vault Section (Strictly Backend) */}
          <div className="p-4 rounded-xl bg-[#1a1f27] border border-[#F05454]/40 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold">
              <Lock className="w-4 h-4 text-[#F05454]" />
              <span>ข้อมูลจัดส่งเข้ารหัสความปลอดภัย (Vault Asset - เก็บที่ Backend เท่านั้น):</span>
            </div>
            <p className="text-[11px] text-[#DDDDDD]/70">
              ข้อมูลในกล่องนี้จะถูกเก็บไว้ที่ Database หลังบ้าน และจะถูกปลดล็อกส่งให้ลูกค้า **เฉพาะเมื่อลูกค้าชำระเงินสำเร็จแล้วเท่านั้น**
            </p>

            <div>
              <label className="text-[#DDDDDD]/80 block mb-1 font-semibold">
                เนื้อหาไอดี / ลิงก์ดาวน์โหลด (User, Password, หรือ Signed Download Link):
              </label>
              <textarea
                rows={3}
                value={vaultContent}
                onChange={(e) => setVaultContent(e.target.value)}
                placeholder="ROBLOX_USER: my_id_01&#10;PASS: MySecurePassword2026!&#10;RECOVERY: 9942-0012"
                className="w-full px-3 py-2 bg-[#222831] border border-[#30475E] rounded-lg text-white font-mono text-xs focus:outline-none focus:border-[#F05454]"
                required
              />
            </div>

            <div>
              <label className="text-[#DDDDDD]/80 block mb-1">หมายเหตุหลังได้รับของ:</label>
              <input
                type="text"
                value={vaultNote}
                onChange={(e) => setVaultNote(e.target.value)}
                className="w-full px-3 py-2 bg-[#222831] border border-[#30475E] rounded-lg text-white text-xs focus:outline-none focus:border-[#F05454]"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#30475E] hover:bg-[#30475E]/80 text-[#DDDDDD] font-semibold transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-[#F05454] hover:bg-[#d94343] disabled:opacity-50 text-white font-bold flex items-center gap-1.5 shadow-lg shadow-[#F05454]/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{isSubmitting ? 'กำลังบันทึกลง Database...' : 'บันทึกสินค้าลงระบบ'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
