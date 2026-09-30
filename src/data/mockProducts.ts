import { Product } from '../types';

export const mockProducts: Product[] = [
  // -------------------------------------------------------------
  // 1. หมวด ID GAME (Roblox Maps ต่างๆ)
  // -------------------------------------------------------------
  {
    id: 'rbx-acc-001',
    title: 'ROBLOX [Blox Fruits] - ไอดี Lv.2550 ตัน + ผล Kitsune ถาวร + เคียว CDK + หมัดก็อดมนุษย์',
    game: 'Blox Fruits',
    category: 'account',
    price: 1450,
    originalPrice: 1890,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    badge: '👑 จิ้งจอกถาวร',
    stock: 2,
    rating: 5.0,
    salesCount: 840,
    deliveryType: 'instant_credential',
    description: 'ไอดี Blox Fruits เลเวล Max 2550 สเตตัสอัปเต็ม กินผล Kitsune (จิ้งจอกไฟ) แบบถาวร มีดาบคู่ Cursed Dual Katana, ปืน Soul Guitar และสไตล์หมัด Godhuman ครบเซ็ต เมลสะอาด 100% พร้อมเปลี่ยนเป็นเมลคุณทันที',
    features: [
      'เลเวลตัน Max 2550 สเตตัสสายหมัด/ผลปีศาจเต็มขั้น',
      'ผล Kitsune ถาวร (Perm) และผล Portal สำรองในคลัง',
      'ดาบคู่ CDK + Soul Guitar + หมัด Godhuman ครบ',
      'ไอดีสะอาด ไม่เคยโดนแบน ประกันไม่ดึงคืนตลอดชีพ'
    ],
    sampleAsset: {
      type: 'credential',
      content: 'ROBLOX_USER: bloxfruits_god_th26\nPASS: Vault#Blox2026!Kitsune\nEMAIL_STATUS: Unverified (พร้อมให้ลูกค้านำไปผูกเมลตัวเองได้ทันที)',
      note: 'ล็อกอินเข้าสู่ระบบ Roblox จากนั้นเข้าไปที่ Settings เพื่อผูกอีเมลและเปิดระบบความปลอดภัย 2-Factor Authentication ได้ทันที'
    }
  },
  {
    id: 'rbx-acc-002',
    title: 'ROBLOX [King Legacy] - ไอดี Lv.4400 Max + ผล Dragon V2 + ดาบ Dark Blade (Yoru) V2',
    game: 'King Legacy',
    category: 'account',
    price: 890,
    originalPrice: 1250,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    badge: '🔥 มังกร V2',
    stock: 3,
    rating: 4.9,
    salesCount: 520,
    deliveryType: 'instant_credential',
    description: 'ไอดี King Legacy เลเวลตัน 4400 ทะเล 3 ผลมังกร Dragon Awakening V2 สกิลครบทุกท่า ดาบ Yoru V2 ตีบวกเต็ม 100% เงินเบลีสะสมกว่า 600,000,000 Beli และ 15,000 Gems พร้อมเล่นทันที',
    features: [
      'เลเวลตัน 4400 ปลดล็อกทุกเควสต์และดันเจี้ยนในเกม',
      'ผลมังกร Dragon V2 ตื่นเต็มทุกสกิล ดาเมจมหาศาล',
      'ดาบ Dark Blade V2 + ดาบแรร์ครบแทบทุกเล่ม',
      'ส่งมอบ User/Pass อัตโนมัติใน 3 วินาทีหลังชำระเงิน'
    ],
    sampleAsset: {
      type: 'credential',
      content: 'ROBLOX_USER: kinglegacy_yoru_master\nPASS: KingVault#9948!\nSTATUS: First-hand account (ไอดีมือเดียว)',
      note: 'กรุณาเปลี่ยนรหัสผ่านและผูกอีเมลส่วนตัวของท่านทันทีหลังได้รับรหัส'
    }
  },
  {
    id: 'rbx-acc-003',
    title: 'ROBLOX [Anime Defenders] - ไอดีเลเวล 100+ ตัว Secret/Mythic ฟูลทีม (Igris + Gojo Evo)',
    game: 'Anime Defenders',
    category: 'account',
    price: 1190,
    originalPrice: 1600,
    image: 'https://images.unsplash.com/photo-1612287232252-870b991b5c90?auto=format&fit=crop&w=800&q=80',
    badge: '⚡ Secret ฟูลทีม',
    stock: 1,
    rating: 5.0,
    salesCount: 310,
    deliveryType: 'instant_credential',
    description: 'ไอดีตัวตึงประจำเกม Anime Defenders เลเวล 100+ ตัวละครระดับ Secret ครบครัน นำโดย Igris อัปดาวน์เต็ม Trait ระดับ Almighty และ Gojo ร่าง Evo ไต่หอคอย Infinite ได้ถึงเวฟ 100+ สบายๆ',
    features: [
      'ตัวลับ Secret Igris คริติคอล 100% สเตตัสเต็ม',
      'Gojo Evo + Sukuna Mythic แบกจบทุกโหมด',
      'เพชรคงเหลือในไอดีอีก 35,000 Gems สำหรับสุ่มตู้ใหม่',
      'ไอดีสะอาด ไม่เคยใช้โปรแกรมช่วยเล่น ปลอดภัยชัวร์'
    ],
    sampleAsset: {
      type: 'credential',
      content: 'ROBLOX_USER: anime_defenders_pro99\nPASS: AD#SecretGojo2026\nSTATUS: Clean Account',
      note: 'ล็อกอินเข้าเล่นเกมได้ทันที ข้อมูลทุกอย่างพร้อมโอนย้ายความเป็นเจ้าของ'
    }
  },
  {
    id: 'rbx-acc-004',
    title: 'ROBLOX [Pet Simulator 99] - ไอดีแรงก์ 30 ปลดล็อกโซนสุดท้าย + Huge Rainbow 8 ตัว',
    game: 'Pet Simulator 99',
    category: 'account',
    price: 1650,
    originalPrice: 2200,
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    badge: '💎 สัตว์ Huge แน่น',
    stock: 2,
    rating: 4.9,
    salesCount: 440,
    deliveryType: 'instant_credential',
    description: 'ไอดี Pet Sim 99 แรงก์ 30 สูงสุด ปลดล็อกโซนแมพสุดท้าย ฟาร์มเพชรเร็วติดสปีด มีสัตว์ยักษ์ระดับ Huge Rainbow ถึง 8 ตัว พร้อมหนังสือ Enchant Tier IX เต็มช่อง',
    features: [
      'สัตว์ยักษ์ Huge Rainbow 8 ตัว ตีดาเมจคูณมหาศาล',
      'เพชรสดในกระเป๋าพร้อมใช้อีก 120,000,000 Diamonds',
      'ปลดล็อกช่องใส่สัตว์และช่อง Enchant สูงสุด',
      'รับประกันไอดีสะอาด เมลไม่ยืนยัน สามารถผูกเมลตัวเองได้ทันที'
    ],
    sampleAsset: {
      type: 'credential',
      content: 'ROBLOX_USER: petsim99_huge_vault\nPASS: Pet99#RainbowVault\nSTATUS: Ready to bind email',
      note: 'รับประกันข้อมูลตรงปก 100% สามารถตรวจสอบสัตว์และเพชรในตัวได้ทันที'
    }
  },

  // -------------------------------------------------------------
  // 2. หมวด ITEM ROBLOX (ไอเทมในเกม Roblox)
  // -------------------------------------------------------------
  {
    id: 'rbx-item-001',
    title: 'ROBLOX [Blox Fruits] - ผลปีศาจสด ผล Kitsune (จิ้งจอก) & Dragon ผลสดพร้อมส่งทันที',
    game: 'Blox Fruits',
    category: 'item',
    price: 390,
    originalPrice: 550,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    badge: '🦊 ผลสดยอดฮิต',
    stock: 18,
    rating: 5.0,
    salesCount: 1650,
    deliveryType: 'in_game_trade',
    description: 'ผลปีศาจสดผล Kitsune (จิ้งจอกไฟ) หรือผล Dragon ผลสดในเกม Blox Fruits มีสต็อกพร้อมส่ง มีบอทพาเข้าเซิร์ฟเวอร์ VIP เพื่อทำการเทรดเข้ากระเป๋าของคุณทันทีใน 3 นาที',
    features: [
      'ผลสด Kitsune แท้ 100% เก็บในเป้หรือกินแปลงร่างได้ทันที',
      'บอทส่งลิงก์ห้อง VIP ให้ทางหน้าจอหลังชำระเงิน',
      'มีแอดมินและบอทสแตนด์บายเทรดให้ 24 ชั่วโมง',
      'ปลอดภัยจากการแบน ไม่มีการใช้บั๊กใดๆ ทั้งสิ้น'
    ],
    sampleAsset: {
      type: 'code',
      content: 'ORDER_CODE: BF-FRUIT-KT992\nVIP_SERVER_LINK: https://www.roblox.com/games/2753915549/Blox-Fruits?privateServerLinkCode=gv_vault_secret_room\nTRADE_BOT_NAME: DeliveryBot_Kitsune01',
      note: 'คลิกลิงก์ VIP Server เพื่อเข้าเกม Blox Fruits ใน Sea 2 หรือ Sea 3 บอทชื่อ DeliveryBot จะส่งคำขอเทรดผล Kitsune ให้คุณทันที'
    }
  },
  {
    id: 'rbx-item-002',
    title: 'ROBLOX [Pet Sim 99] - 100,000,000 Diamonds (100M เพชร) โอนไวผ่านระบบ Mailbox ในเกม',
    game: 'Pet Simulator 99',
    category: 'item',
    price: 290,
    originalPrice: 420,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    badge: '💎 100M เพชร',
    stock: 50,
    rating: 4.9,
    salesCount: 2210,
    deliveryType: 'in_game_trade',
    description: 'เพชรสดในเกม Pet Simulator 99 จำนวน 100M เพชร จัดส่งอัตโนมัติผ่านระบบ Mailbox ตู้ไปรษณีย์ในเกม เพียงกรอกชื่อ Username ของคุณ ไม่ต้องให้รหัสผ่าน สะดวก ปลอดภัย 100%',
    features: [
      'ได้รับเพชร 100,000,000 Diamonds ตรงเข้าตู้ไปรษณีย์ในเกม',
      'ระบบอัตโนมัติโอนเข้าภายใน 60 วินาทีหลังชำระเงิน',
      'ไม่ต้องให้รหัสผ่าน ปลอดภัยจากระบบตรวจจับของ Roblox',
      'เพชรจากการฟาร์มแท้ ไม่ติดลบแน่นอน'
    ],
    sampleAsset: {
      type: 'code',
      content: 'TRANSACTION_ID: PS99-MAIL-100M-98124\nSTATUS: Transferred to Mailbox successfully\nBOT_SENDER: Vault_PetBank_Auto03',
      note: 'เปิดเกม Pet Simulator 99 แล้วเดินไปที่ตู้ไปรษณีย์ (Mailbox) บริเวณ Spawn เพื่อกดรับของขวัญ 100M Diamonds ได้ทันที'
    }
  },
  {
    id: 'rbx-item-003',
    title: 'ROBLOX [Robux] - เติม 10,000 Robux ผ่านระบบ Gamepass (ร้านออกค่าภาษี 30% ให้ครบ)',
    game: 'Roblox Universal',
    category: 'item',
    price: 1490,
    originalPrice: 1950,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    badge: '⭐ ได้เต็ม 10,000 R$',
    stock: 35,
    rating: 5.0,
    salesCount: 3890,
    deliveryType: 'in_game_trade',
    description: 'เติม Robux เรทคุ้มที่สุดในไทย ร้านออกภาษีหัก ณ ที่จ่าย 30% ให้เต็มจำนวน คุณจะได้รับ 10,000 Robux เข้าบัญชีแบบ Pending ภายใน 3-5 วันตามกฎระเบียบของ Roblox',
    features: [
      'ไม่ต้องให้รหัสผ่าน เพียงตั้ง Gamepass ราคาตามที่ระบบคำนวณ',
      'ร้านออกภาษี 30% ให้ ได้รับเต็มจำนวน 10,000 Robux ชัวร์',
      'ระบบอัตโนมัติตรวจสอบ Gamepass และกดซื้อทันทีตลอด 24 ชม.',
      'ปลอดภัย 100% ไม่มีความเสี่ยงโดนแบนหรือหักเงินย้อนหลัง'
    ],
    sampleAsset: {
      type: 'code',
      content: 'ORDER_CODE: RBX-GAMEPASS-10K-990412\nBOT_DISPATCHER: Bot_RobuxDeliver_04\nTRANSACTION_STATUS: Purchased Gamepass (Pending)',
      note: 'บอทได้ทำการกดซื้อ Gamepass ของคุณเรียบร้อยแล้ว ยอด 10,000 Robux จะขึ้นในสถานะ Pending ในหน้า Transactions ของ Roblox ทันที'
    }
  },
  {
    id: 'rbx-item-004',
    title: 'ROBLOX [Anime Defenders] - 50,000 Gems + 100 Trait Rerolls (ส่งมอบผ่านเทรดล็อบบี้)',
    game: 'Anime Defenders',
    category: 'item',
    price: 350,
    originalPrice: 490,
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
    badge: '⚡ สุ่มจุใจ',
    stock: 25,
    rating: 4.8,
    salesCount: 780,
    deliveryType: 'in_game_trade',
    description: 'เพชร Gems และหินรีสเตตัส Trait Rerolls สำหรับสายสุ่มตู้หาตัว Secret ใน Anime Defenders บอทส่งลิ้งค์ห้อง Trade Lobby โอนของมอบให้อย่างรวดเร็วใน 2 นาที',
    features: [
      'ได้รับ 50,000 Gems แท้ พร้อม 100 Trait Crystal',
      'เหมาะสำหรับคนต้องการปั้นตัวละครลงดันเจี้ยนด่วน',
      'เทรดปลอดภัยผ่านระบบ Trade Room ในเกม',
      'ทีมงานบอทออนไลน์ส่งของตลอด 24 ชั่วโมง'
    ],
    sampleAsset: {
      type: 'code',
      content: 'ROOM_KEY: AD-TRADE-HUB-7719\nINVITE_URL: https://www.roblox.com/games/17017769292/Anime-Defenders?privateServerLinkCode=gv_ad_trade\nTRADE_BOT: VaultTrade_GemsBot_2',
      note: 'กดลิงก์ห้องเทรดเพื่อรับมอบ Gems และ Trait Rerolls จากบอทได้ทันที'
    }
  },

  // -------------------------------------------------------------
  // 3. หมวด MACRO FIVEM (มาโคร & สคริปต์ FiveM)
  // -------------------------------------------------------------
  {
    id: 'fvm-macro-001',
    title: 'FIVEM MACRO - สลับปืนไว Fast Switch (AP Pistol / Combat PDW) + คุมแรงถอย ไม่แก้ไฟล์เกม',
    game: 'FiveM (GTA V)',
    category: 'macro',
    price: 390,
    originalPrice: 690,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80',
    badge: '🔫 สลับปืนไว 0 วิ',
    stock: 999,
    rating: 5.0,
    salesCount: 2450,
    deliveryType: 'instant_download',
    description: 'สคริปต์มาโครสลับปืนไว Fast Switch สำหรับสายสตอรี่และสายไฟต์ FiveM กดปุ่มเดียวสลับระหว่างปืนพก/ปืนกลทันทีโดยไม่มีดีเลย์ พร้อมโมดูลคุมแรงถอย (No-Recoil) ยิงเกาะกลุ่มเป็นจุดเดียว',
    features: [
      'สลับปืนไวระดับ 0.05 วินาที ยิงสวนคู่ต่อสู้ได้ก่อนเสมอ',
      'คุมแรงดีดปืน AP Pistol, Combat PDW, Heavy Pistol นิ่งเหมือนเลเซอร์',
      'รองรับเมาส์ทุกรุ่น (Logitech G-Hub, Razer Synapse, Bloody, AHK Script)',
      'ทำงานระดับ Hardware Input Driver ไม่ยุ่งเกี่ยวกับไฟล์เกม ไม่โดน FiveM Ban 100%'
    ],
    sampleAsset: {
      type: 'download_link',
      content: 'https://cdn.my-gamevault.com/downloads/fivem/fivem_fast_switch_vip_v4.zip?token=gv_fvm_9821a',
      note: 'แตกไฟล์ .zip แล้วรันโปรแกรมตั้งค่าปุ่มลัด (Hotkey) สลับปืนตามความถนัด มีคลิปสอนการตั้งค่าภาษาไทยแบบละเอียด 5 นาที'
    }
  },
  {
    id: 'fvm-macro-002',
    title: 'FIVEM MACRO - บอทฟาร์มออโต้ 24 ชม. (ขุดแร่, ตกปลา, เก็บส้ม, ตัดไม้, แพ็กยา) ระบบสุ่มดีเลย์',
    game: 'FiveM (GTA V)',
    category: 'macro',
    price: 490,
    originalPrice: 850,
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80',
    badge: '🤖 ฟาร์มออโต้ 24 ชม.',
    stock: 999,
    rating: 4.9,
    salesCount: 1890,
    deliveryType: 'instant_download',
    description: 'สุดยอดสคริปต์มาโครฟาร์มงานอัตโนมัติสำหรับ FiveM ครบทุกอาชีพ ขุดเหมือง, ตกปลา, ตัดไม้, เก็บผลไม้, หลอมเหล็ก, แพ็กยาขาว/ดำ มีระบบ Humanizer สุ่มดีเลย์และขยับเมาส์อัตโนมัติเพื่อหลบการตรวจจับของแอดมินเมือง',
    features: [
      'รองรับงานพื้นฐานทุกเมืองทั้งระบบ ESX และ QBCore',
      'ระบบ Humanizer สุ่มความเร็วและดีเลย์ ป้องกันแอดมินเมืองส่องจับตา',
      'ระบบ Anti-AFK เดินขยับตัวและเปิดกระเป๋าอัตโนมัติ',
      'มีระบบแจ้งเตือนผ่าน Discord Webhook เมื่อกระเป๋าเต็มหรือของหมด'
    ],
    sampleAsset: {
      type: 'download_link',
      content: 'https://cdn.my-gamevault.com/downloads/fivem/fivem_autofarm_ultimate_2026.zip?token=gv_fvm_farm77a',
      note: 'ภายในไฟล์มีโปรไฟล์สำเร็จรูปแยกตามอาชีพ เลือกใช้งานได้ทันที พร้อมคู่มือการตั้งค่าพิกัดจุดฟาร์ม'
    }
  },
  {
    id: 'fvm-macro-003',
    title: 'FIVEM MACRO - มาโครต่อยมวยคอมโบไร้ช่องโหว่ (Stun Lock Punch + สเต็ปหลบไว) ชนะทุกไฟต์',
    game: 'FiveM (GTA V)',
    category: 'macro',
    price: 290,
    originalPrice: 450,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    badge: '🥊 มวยคอมโบไร้พ่าย',
    stock: 999,
    rating: 4.9,
    salesCount: 1120,
    deliveryType: 'instant_download',
    description: 'มาโครต่อยมวย FiveM สำหรับศึกวันดวลหมัดและชิงเดิมพันในสังเวียน รัวหมัดคอมโบแบบติดสตั้น (Stun Lock) คู่ต่อสู้ไม่สามารถกดการ์ดบล็อกหรือสวนกลับได้ พร้อมปุ่มลัดสเต็ปหลบหมัดอัตโนมัติ',
    features: [
      'คอมโบหมัดรัวความเร็วสูง ล็อกคู่ต่อสู้อยู่ในสถานะมึน (Stunned) จนล้ม',
      'ปุ่ม Auto-Dodge หลบหมัดพร้อมเคาน์เตอร์แอทแทคสวนทันที',
      'ปรับแต่งความเร็วในการออกหมัดได้ตามกฎระเบียบของแต่ละเมือง',
      'ไม่ดัดแปลงไฟล์ GTA V ปลอดภัย ไม่เสี่ยงโดนแบน'
    ],
    sampleAsset: {
      type: 'download_link',
      content: 'https://cdn.my-gamevault.com/downloads/fivem/fivem_boxing_combo_pro.zip?token=gv_fvm_punch44',
      note: 'ดาวน์โหลดไฟล์ LUA สำหรับ Logitech หรือโปรไฟล์ Synapse สำหรับ Razer นำเข้าโปรแกรมแล้วใช้งานได้ทันที'
    }
  }
];
