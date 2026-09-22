import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Send, 
  Smartphone, 
  Bot, 
  QrCode, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink,
  MessageSquare,
  Clock,
  Calendar
} from 'lucide-react';

export default function TelegramPreview({ onOpenBooking }) {
  const { t } = useLanguage();

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      time: '19:20',
      text: "👋 Assalomu alaykum! <b>ShifoNur Med</b> ko'p tarmoqli tibbiyot markazining rasmiy Telegram botiga xush kelibsiz.\n\nSiz bu yerda shifokorlarimiz qabuliga yozilishingiz, xizmatlar narxi bilan tanishishingiz yoki klinika bilan bog'lanishingiz mumkin."
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleCommand = (cmdText, botResponse) => {
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: cmdText
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: botResponse
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  const handleSendCustom = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const text = inputText;
    setInputText('');

    handleCommand(
      text,
      `Sizning so'rovingiz qabul qilindi: "<b>${text}</b>".\n\nAdministratorimiz tez orada javob beradi yoki quyidagi tezkor tugmalardan foydalanishingiz mumkin.`
    );
  };

  return (
    <section id="telegram" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-sky-50/50 dark:from-slate-950 dark:to-slate-900 border-t border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Send className="w-3.5 h-3.5" />
            <span>{t('bot_section_badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('bot_section_title')}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-3">
            {t('bot_section_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Features & Direct Bot Link */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {t('bot_feature_1_title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                    {t('bot_feature_1_desc')}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {t('bot_feature_2_title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                    {t('bot_feature_2_desc')}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {t('bot_feature_3_title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                    {t('bot_feature_3_desc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Link and QR Code Container */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-sky-600 via-teal-600 to-emerald-600 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <div className="text-xs uppercase font-extrabold tracking-wider text-sky-200">
                  To'g'ridan-to'g'ri ulanish
                </div>
                <div className="text-xl font-black">
                  @ShifoNurMed_bot
                </div>
                <p className="text-xs text-sky-100 max-w-xs">
                  Telegram orqali botni oching va 1 daqiqada qabulga yoziling
                </p>
                <a
                  href="https://t.me/ShifoNurMed_bot"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-sky-50 transition-colors shadow"
                >
                  <span>Telegramda ochish</span>
                  <ExternalLink className="w-3.5 h-3.5 text-sky-600" />
                </a>
              </div>

              {/* QR Code Graphic */}
              <div className="p-3 bg-white rounded-2xl shadow-md flex flex-col items-center">
                <div className="w-24 h-24 bg-slate-900 rounded-lg flex items-center justify-center text-white font-mono text-center text-[10px] p-2 leading-tight">
                  <div className="flex flex-col items-center">
                    <QrCode className="w-12 h-12 mb-1 text-sky-400" />
                    <span>SCAN ME</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-600 mt-1">QR Kod</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Phone Simulator */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[360px] sm:max-w-[380px] bg-slate-900 rounded-[42px] p-3 shadow-2xl border-4 border-slate-800 shadow-sky-500/10">
              
              {/* Phone Speaker & Camera Notch */}
              <div className="w-32 h-4 bg-slate-800 rounded-full mx-auto mb-2 flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-900"></div>
                <div className="w-8 h-1.5 rounded-full bg-slate-900"></div>
              </div>

              {/* Telegram Screen Inside */}
              <div className="rounded-[32px] overflow-hidden bg-slate-950 text-slate-100 flex flex-col h-[560px] border border-slate-800/80">
                
                {/* Telegram Header */}
                <div className="bg-slate-900/90 px-4 py-3 flex items-center gap-3 border-b border-slate-800 backdrop-blur-md">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500 to-teal-400 flex items-center justify-center text-white font-bold text-sm shadow">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>ShifoNur Med Bot</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                    </div>
                    <div className="text-[10px] text-emerald-400 font-medium">bot • online</div>
                  </div>
                </div>

                {/* Chat Scroll Area */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-sm leading-relaxed ${
                          m.sender === 'user'
                            ? 'bg-sky-600 text-white rounded-br-none'
                            : 'bg-slate-800/90 text-slate-100 border border-slate-700/60 rounded-bl-none'
                        }`}
                      >
                        <div 
                          dangerouslySetInnerHTML={{ __html: m.text.replace(/\n/g, '<br/>') }}
                        />
                        <div className={`text-[9px] mt-1 text-right ${m.sender === 'user' ? 'text-sky-200' : 'text-slate-400'}`}>
                          {m.time}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-full w-max">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                      <span className="ml-1 text-[10px]">bot yozmoqda...</span>
                    </div>
                  )}
                </div>

                {/* Quick Command Buttons */}
                <div className="p-2 bg-slate-900 border-t border-slate-800">
                  <div className="text-[10px] text-slate-400 font-semibold mb-1.5 px-1">
                    {t('bot_sim_subtitle')}
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => handleCommand(
                        "👨‍⚕️ Shifokorlar",
                        "📋 <b>Bizning shifokorlarimiz:</b>\n1. Dr. Alisher Qosimov — Kardiolog\n2. Dr. Nilufar Karimova — Nevrolog\n3. Dr. Bobur Mirzayev — Jarroh\n4. Dr. Zarina Rustamova — Pediatr\n\nQabulga yozilish uchun pastdagi '📅 Qabulga yozilish' tugmasini bosing."
                      )}
                      className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-left text-slate-200 truncate font-medium transition-colors"
                    >
                      👨‍⚕️ Shifokorlar
                    </button>
                    <button
                      onClick={() => handleCommand(
                        "🩺 Xizmatlar",
                        "🔬 <b>Klinika xizmatlari:</b>\n• MRT (1.5 Tesla) — 450,000 UZS\n• EKG & Ekokardiografiya — 220,000 UZS\n• UZI 3D/4D — 180,000 UZS\n• Laboratoriya tahlillari — 95,000 UZS dan"
                      )}
                      className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-left text-slate-200 truncate font-medium transition-colors"
                    >
                      🩺 Xizmatlar
                    </button>
                    <button
                      onClick={() => {
                        handleCommand(
                          "📅 Qabulga yozilish",
                          "Qabulga yozilish uchun saytimizdagi qulay onlayn formani ochishingiz mumkin. Hozir qabul formasini ochmoqdaman..."
                        );
                        setTimeout(() => onOpenBooking(), 1000);
                      }}
                      className="px-2 py-1.5 rounded-lg bg-teal-600/30 text-teal-300 hover:bg-teal-600/40 text-[11px] text-left truncate font-bold transition-colors"
                    >
                      📅 Qabulga yozilish
                    </button>
                    <button
                      onClick={() => handleCommand(
                        "📍 Manzil & Ish vaqti",
                        "🏢 <b>ShifoNur Med</b>\n📍 Toshkent sh., Chilonzor tumani, Bunyodkor ko'chasi 45\n📞 +998 (71) 200-00-00\n⏰ Dush - Shan: 08:00 - 20:00\n🚨 Tez yordam: 24/7"
                      )}
                      className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-left text-slate-200 truncate font-medium transition-colors"
                    >
                      📍 Manzil & Aloqa
                    </button>
                  </div>
                </div>

                {/* Input Bar */}
                <form onSubmit={handleSendCustom} className="p-2 bg-slate-900/90 border-t border-slate-800 flex items-center gap-1.5">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Xabar yozing..."
                    className="flex-1 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                  <button
                    type="submit"
                    className="w-8 h-8 rounded-full bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center flex-shrink-0 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
