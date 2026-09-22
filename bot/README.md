# ShifoNur Med — Telegram Bot Qo'llanmasi

Ushbu bot klinika bemorlariga Telegram orqali xizmat ko'rsatish, shifokorlar jadvalini ko'rsatish va yangi qabullarni qabul qilish uchun xizmat qiladi.

## Ishga tushirish qadamlari:

1. **Telegram Bot Token olish:**
   - Telegramda [@BotFather](https://t.me/BotFather) ga kiring.
   - `/newbot` buyrug'ini yuboring va botingiz nomini tanlang (masalan, `shifonur_med_bot`).
   - BotFather sizga API Token beradi (masalan: `7123456789:AAFx...`).

2. **Botni ishga tushirish:**
   ```bash
   # Windows PowerShell yoki CMD da:
   $env:BOT_TOKEN="sizning_tokeningiz"; node bot/telegram_bot.js
   
   # Yoki to'g'ridan-to'g'ri telegram_bot.js ichidagi BOT_TOKEN o'zgaruvchisiga yozib:
   node bot/telegram_bot.js
   ```

3. **Sayt bilan integratsiya:**
   - Saytdagi **Admin Panel** -> **Telegram Bot Sozlamalari** bo'limiga kiring.
   - Ushbu tokenni va xabarlar borishi kerak bo'lgan guruh/kanal **Chat ID** sini kiriting.
   - **"Sinov xabari yuborish"** tugmasini bosing!
