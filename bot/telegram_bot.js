/**
 * ShifoNur Med — Rasmiy Telegram Bot (Node.js)
 * 
 * Ushbu bot hech qanday og'ir kutubxonalarsiz, to'g'ridan-to'g'ri Node.js (v18+)
 * fetch va Telegram Bot API orqali ishlaydi.
 * 
 * Ishga tushirish:
 *   1. BOT_TOKEN ni o'zingizning @BotFather dan olgan tokeningizga almashtiring.
 *   2. Terminalda: node bot/telegram_bot.js
 */

const BOT_TOKEN = process.env.BOT_TOKEN || '7891234567:AAFx_demoClinicTokenExample123456';
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

const CLINIC_INFO = {
  name: "ShifoNur Med Ko'p Tarmoqli Zamonaviy Klinika",
  phone: "+998 (71) 200-00-00",
  emergency: "103 / +998 (71) 200-00-03",
  address: "Toshkent shahri, Chilonzor tumani, Bunyodkor shoh ko'chasi, 45-uy",
  hours: "Dushanba - Shanba: 08:00 - 20:00 (Tez yordam 24/7)"
};

const DOCTORS = [
  "1. Dr. Alisher Qosimov — Bosh Kardiolog (16 yil tajriba)",
  "2. Dr. Nilufar Karimova — Oliy toifali Nevrolog (12 yil tajriba)",
  "3. Dr. Bobur Mirzayev — Yetakchi Jarroh-Endoskopist (18 yil tajriba)",
  "4. Dr. Zarina Rustamova — Pediatr & Bolalar Immunologi (10 yil tajriba)",
  "5. Dr. Jamshid Shokirov — Stomatolog-Ortodont (14 yil tajriba)",
  "6. Dr. Shahlo Yo'ldosheva — UZI va Funksional Diagnostika (11 yil tajriba)"
];

const SERVICES = [
  "• MRT Diagnostikasi (1.5 Tesla) — 450,000 UZS",
  "• Yurak EKG va Ekokardiografiya — 220,000 UZS",
  "• 3D/4D Rangli UZI Tekshiruvi — 180,000 UZS",
  "• Bolalar Profilaktik Check-up — 350,000 UZS",
  "• Tishlarni Lazerli Oqartirish — 500,000 UZS",
  "• Umumiy Qon Tahlili (Express 2 soat) — 95,000 UZS"
];

// Helper: Send message
async function sendMessage(chatId, text, replyMarkup = null) {
  try {
    const payload = {
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML',
      disable_web_page_preview: true
    };
    if (replyMarkup) {
      payload.reply_markup = replyMarkup;
    }

    const res = await fetch(`${API_URL}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch (err) {
    console.error('Xabar yuborishda xatolik:', err.message);
  }
}

// Main inline keyboard
function getMainKeyboard() {
  return {
    keyboard: [
      [{ text: "👨‍⚕️ Shifokorlar ro'yxati" }, { text: "🩺 Xizmatlar va Narxlar" }],
      [{ text: "📅 Qabulga yozilish" }, { text: "📍 Klinika manzili" }],
      [{ text: "📞 Bog'lanish & Tez yordam" }]
    ],
    resize_keyboard: true,
    one_time_keyboard: false
  };
}

// Message handler
async function handleMessage(message) {
  const chatId = message.chat.id;
  const text = (message.text || '').trim();
  const userName = message.from.first_name || 'Hurmatli bemor';

  console.log(`[Xabar keldi] ChatID: ${chatId} | ${userName}: ${text}`);

  if (text === '/start') {
    const welcome = `
👋 <b>Assalomu alaykum, ${userName}!</b>

<b>ShifoNur Med</b> ko'p tarmoqli zamonaviy tibbiyot markazining rasmiy Telegram botiga xush kelibsiz.

🏥 Biz sizga yuqori darajadagi tibbiy xizmat va tajribali shifokorlar ko'rigini taqdim etamiz.

<i>Pastdagi tugmalardan birini tanlang:</i>
`;
    await sendMessage(chatId, welcome, getMainKeyboard());
    return;
  }

  if (text.includes("Shifokorlar") || text === '/doctors') {
    const docText = `
👨‍⚕️ <b>ShifoNur Med Yetakchi Shifokorlari:</b>
━━━━━━━━━━━━━━━━━━━━
${DOCTORS.join('\n\n')}
━━━━━━━━━━━━━━━━━━━━
<i>Qabulga yozilish uchun "📅 Qabulga yozilish" tugmasini bosing yoki Call-markazga qo'ng'iroq qiling:</i> ${CLINIC_INFO.phone}
`;
    await sendMessage(chatId, docText, getMainKeyboard());
    return;
  }

  if (text.includes("Xizmatlar") || text === '/services') {
    const srvText = `
🩺 <b>Klinikamiz Xizmatlari va Narxlari:</b>
━━━━━━━━━━━━━━━━━━━━
${SERVICES.join('\n')}
━━━━━━━━━━━━━━━━━━━━
<i>Barcha tahlil natijalari 2-4 soat ichida Telegram orqali yuboriladi.</i>
`;
    await sendMessage(chatId, srvText, getMainKeyboard());
    return;
  }

  if (text.includes("Qabulga yozilish") || text === '/book') {
    const bookText = `
📅 <b>Shifokor qabuliga yozilish:</b>

Qabulga yozilishning 2 ta tezkor usuli mavjud:
1️⃣ <b>Veb-saytimiz orqali:</b> Onlayn vaqtni tanlang (bir necha soniya)
2️⃣ <b>Telefon orqali:</b> <a href="tel:${CLINIC_INFO.phone}">${CLINIC_INFO.phone}</a>

Yoki shu yerga ismingiz, telefon raqamingiz va qaysi shifokor kerakligini yozib qoldiring. Operatorimiz 5 daqiqada siz bilan bog'lanadi!
`;
    await sendMessage(chatId, bookText, getMainKeyboard());
    return;
  }

  if (text.includes("manzili") || text === '/location') {
    const locText = `
📍 <b>ShifoNur Med Manzili va Ish Tartibi:</b>
━━━━━━━━━━━━━━━━━━━━
🏢 <b>Manzil:</b> ${CLINIC_INFO.address}
🚇 <b>Mo'ljal:</b> "Mirzo Ulug'bek" metro bekati yaqinida
⏰ <b>Ish vaqti:</b> ${CLINIC_INFO.hours}
🚨 <b>Shoshilinch tibbiy yordam:</b> ${CLINIC_INFO.emergency}
━━━━━━━━━━━━━━━━━━━━
`;
    await sendMessage(chatId, locText, getMainKeyboard());
    return;
  }

  if (text.includes("Bog'lanish") || text.includes("Tez yordam") || text === '/contact') {
    const contactText = `
📞 <b>Bog'lanish Ma'lumotlari:</b>
━━━━━━━━━━━━━━━━━━━━
📞 <b>Call-markaz:</b> ${CLINIC_INFO.phone}
🚑 <b>Tez yordam (24/7):</b> ${CLINIC_INFO.emergency}
🌐 <b>Rasmiy sayt:</b> ShifoNur Med
━━━━━━━━━━━━━━━━━━━━
`;
    await sendMessage(chatId, contactText, getMainKeyboard());
    return;
  }

  // Default response
  const defaultText = `
Sizning so'rovingiz qabul qilindi: "<b>${text}</b>"

Tezkor javob olish uchun quyidagi tugmalardan birini bosing yoki Call-markaz bilan bog'laning: ${CLINIC_INFO.phone}
`;
  await sendMessage(chatId, defaultText, getMainKeyboard());
}

// Long polling loop
let lastUpdateId = 0;

async function startPolling() {
  console.log("==========================================");
  console.log("🏥 ShifoNur Med Telegram Boti ishga tushdi!");
  console.log(`🤖 Token: ${BOT_TOKEN.slice(0, 10)}...`);
  console.log("Xabarlar tinglanmoqda (Long Polling)...");
  console.log("==========================================");

  while (true) {
    try {
      const res = await fetch(`${API_URL}/getUpdates?offset=${lastUpdateId + 1}&timeout=30`);
      const data = await res.json();

      if (data.ok && data.result) {
        for (const update of data.result) {
          lastUpdateId = update.update_id;
          if (update.message) {
            await handleMessage(update.message);
          }
        }
      } else {
        // If demo token or invalid token, wait 10 seconds before next attempt
        await new Promise(r => setTimeout(r, 10000));
      }
    } catch (err) {
      await new Promise(r => setTimeout(r, 5000));
    }
  }
}

// Run bot
startPolling();
