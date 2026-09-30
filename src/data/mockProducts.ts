import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: 'prod-001',
    title: 'VALORANT - ไอดี Radiant สะอาด + มีด Kuronami & Prime Vandal เต็มขั้น',
    game: 'Valorant',
    category: 'account',
    price: 3890,
    originalPrice: 5200,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    badge: '👑 แรร์สูงสุด',
    stock: 1,
    rating: 5.0,
    salesCount: 142,
    deliveryType: 'instant_credential',
    description: 'ไอดีมือเดียว ไม่เคยโดนแบน เมลสะอาดพร้อมเปลี่ยนเป็นเมลคุณทันที มีสกินปืนอัปเกรดเต็มกว่า 24 ชิ้น ประกันไอดีตลอดอายุการใช้งาน',
    features: [
      'แรงก์ Radiant ซีซั่นปัจจุบัน',
      'สกิน Kuronami No Yaiba + Prime Vandal (Max Level)',
      'เปลี่ยนอีเมล และ รหัสผ่านได้ทันที',
      'ระบบ Auto-Delivery ส่ง User/Pass เข้าจอทันทีหลังจ่ายเงิน'
    ],
    sampleAsset: {
      type: 'credential',
      content: 'USER: valorant_radiant_th@gamevault.net\nPASS: Vault#9982!Kuronami\nRECOVERY_CODE: 4491-0021-9938',
      note: 'กรุณาเปลี่ยนรหัสผ่านและผูกเบอร์โทรศัพท์ของท่านทันทีหลังได้รับข้อมูล'
    }
  },
  {
    id: 'prod-002',
    title: 'GENSHIN IMPACT - AR60 ตัวท็อป C6 Furina + Raiden + อาวุธ 5 ดาว 18 ชิ้น',
    game: 'Genshin Impact',
    category: 'account',
    price: 4950,
    originalPrice: 6500,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    badge: '🔥 ยอดนิยม',
    stock: 2,
    rating: 4.9,
    salesCount: 388,
    deliveryType: 'instant_credential',
    description: 'ไอดีเซิร์ฟเวอร์ Asia ตัวละคร 5 ดาวแน่นๆ สำรวจแมพ 100% เกือบทุกโซน พรีโมเจมสะสมอีก 12,000+ ดวง เมลตายไม่มี ปลอดภัยแน่นอน',
    features: [
      'ตัวละคร Furina C6R1 พลังโจมตีมหาศาล',
      'Raiden Shogun C2R1 ฟันบอสทีเดียวหลับ',
      'Primogems ค้างในตัว 12,500+ พร้อมกาชา',
      'ส่งมอบล็อกอิน Hoyoverse อัตโนมัติใน 3 วินาที'
    ],
    sampleAsset: {
      type: 'credential',
      content: 'HOYOVERSE_ID: genshin_pro_c6@gamevault.net\nPASS: GenshinVault#2026\nBACKUP_EMAIL: available_to_bind',
      note: 'ล็อกอินเข้าเกมแล้วกดยกเลิกอุปกรณ์เก่า และผูกอีเมลใหม่ได้ทันที'
    }
  },
  {
    id: 'prod-003',
    title: 'LOGITECH G-HUB - No Recoil Macro VIP (Valorant / CS2 / Apex Legends)',
    game: 'Universal FPS',
    category: 'macro',
    price: 390,
    originalPrice: 690,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80',
    badge: '⚡ อัปเดต 2026',
    stock: 999,
    rating: 4.9,
    salesCount: 1540,
    deliveryType: 'instant_download',
    description: 'สคริปต์มาโครเมาส์ Logitech G-Hub แบบ LUA Script แท้ 100% ไม่มีการดัดแปลงไฟล์เกม ไม่รันโปรแกรมภายนอก ปลอดภัยจากระบบ Anti-cheat (Vanguard/EAC/VAC)',
    features: [
      'รองรับเมาส์ Logitech ซีรีส์ G ทุกรุ่น (G502, G Pro X, G304, etc.)',
      'คุมแรงดีดปืน Vandal, Phantom, R-99, Flatline นิ่งเหมือนยิงเลเซอร์',
      'มี GUI สลับโหมดปืนและปุ่มลัด (Hotkey Toggle)',
      'รับประกันอัปเดตไฟล์สคริปต์ฟรีตลอดอายุการใช้งาน'
    ],
    sampleAsset: {
      type: 'download_link',
      content: 'https://cdn.my-gamevault.com/downloads/secure/ghub_vip_v4_2026.zip?token=gv_dl_88192a8e1b',
      note: 'ดาวน์โหลดไฟล์ .zip พร้อมคู่มือการตั้งค่าแบบคลิปวิดีโอภาษาไทย ภายในไฟล์มี License Key ใช้งานได้ทันที'
    }
  },
  {
    id: 'prod-004',
    title: 'STEAM ACCOUNT - รวม 42 เกมดัง (Black Myth Wukong, Elden Ring + DLC, Cyberpunk)',
    game: 'Steam',
    category: 'account',
    price: 1850,
    originalPrice: 3200,
    image: 'https://images.unsplash.com/photo-1612287232252-870b991b5c90?auto=format&fit=crop&w=800&q=80',
    badge: '🎮 สุดคุ้ม',
    stock: 5,
    rating: 5.0,
    salesCount: 620,
    deliveryType: 'instant_credential',
    description: 'คลังเกมแท้รวมเกม AAA ฟอร์มยักษ์ ประหยัดกว่าซื้อแยกมากกว่า 80% ปลดล็อกทุก achievement เล่นได้ทั้ง Online/Offline',
    features: [
      'Black Myth: Wukong Deluxe Edition',
      'Elden Ring + Shadow of the Erdtree DLC',
      'Cyberpunk 2077 + Phantom Liberty',
      'ส่งมอบ Account พร้อม First Email ดั้งเดิม'
    ],
    sampleAsset: {
      type: 'credential',
      content: 'STEAM_USER: steam_wukong_vault99\nPASS: Wukong#Steam2026!\nORIGINAL_MAIL: wukong99_first@mailhub.com',
      note: 'รับพร้อม First Mail ยืนยันความเป็นเจ้าของ 100%'
    }
  },
  {
    id: 'prod-005',
    title: 'ROBLOX - 10,000 Robux ผ่านระบบ Gamepass / VIP Server (ภาษี 30% ร้านออกให้)',
    game: 'Roblox',
    category: 'item',
    price: 1490,
    originalPrice: 1950,
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    badge: '💎 ส่งด่วน',
    stock: 45,
    rating: 4.8,
    salesCount: 2840,
    deliveryType: 'in_game_trade',
    description: 'เติม Robux เรทคุ้มที่สุดในไทย ร้านออกภาษี 30% ให้เต็มจำนวน ได้รับ 10,000 Robux เข้าบัญชีแบบ Pending ภายใน 3-5 วันตามระบบ Roblox',
    features: [
      'ไม่ต้องให้รหัสผ่าน เพียงตั้ง Gamepass ในเกมของคุณ',
      'ร้านออกภาษีหัก ณ ที่จ่าย 30% ให้ ได้รับเต็มจำนวน 10,000 R$',
      'ระบบอัตโนมัติตรวจสอบ Gamepass และกดซื้อทันที 24 ชม.',
      'ปลอดภัย 100% ไม่มีความเสี่ยงโดนแบน'
    ],
    sampleAsset: {
      type: 'code',
      content: 'ORDER_CODE: RBX-990214-GAMEPASS\nBOT_DISPATCHER: Bot_RobuxDeliver_04',
      note: 'ระบบเชื่อมต่อบอทตรวจจับ Gamepass ของคุณเรียบร้อยและเริ่มโอนทันที'
    }
  },
  {
    id: 'prod-006',
    title: 'RAZER SYNAPSE - Apex Legends Jitter Aim & Superglide Auto-Script',
    game: 'Apex Legends',
    category: 'macro',
    price: 320,
    originalPrice: 550,
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80',
    badge: '⚡ ยอดฮิต',
    stock: 999,
    rating: 4.9,
    salesCount: 910,
    deliveryType: 'instant_download',
    description: 'สคริปต์มาโคร Razer Synapse สำหรับสายปืน Flatline / HAVOC ยิงระยะ 200 เมตรไม่มีส่าย กดปุ่มเดียวทำ Superglide สำเร็จ 100%',
    features: [
      'ใช้งานได้กับเมาส์และคีย์บอร์ด Razer ทุกรุ่น',
      'Superglide อัตโนมัติ ติด 100% ทุกจังหวะ',
      'Jitter Aim สลายแรงดีดปืนอัตโนมัติ',
      'ปลอดภัย ไร้การแบน ใช้งานง่ายผ่าน Synapse 3 / Synapse 4'
    ],
    sampleAsset: {
      type: 'download_link',
      content: 'https://cdn.my-gamevault.com/downloads/secure/razer_apex_jitter_v3.synapse?token=syn_vault_901a',
      note: 'ไฟล์ Import เข้าโปรแกรม Razer Synapse ได้ทันที ภายในมีโปรไฟล์ปรับแต่ง DPI'
    }
  }
];
