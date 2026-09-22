import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  getTelegramConfig, 
  saveTelegramConfig, 
  sendTestTelegramMessage, 
  getTelegramLogs 
} from '../../services/telegramService';
import { 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Key, 
  MessageSquare, 
  Terminal, 
  Loader2, 
  ExternalLink,
  Trash2,
  HelpCircle
} from 'lucide-react';

export default function TelegramConfig() {
  const { t } = useLanguage();

  const [token, setToken] = useState('');
  const [chatId, setChatId] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [testLoading, setTestLoading] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const cfg = getTelegramConfig();
    setToken(cfg.token);
    setChatId(cfg.chatId);
    setLogs(getTelegramLogs());
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    saveTelegramConfig(token, chatId);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSendTest = async () => {
    setTestLoading(true);
    setTestResult(null);

    const result = await sendTestTelegramMessage(token, chatId);
    setTestLoading(false);
    setTestResult(result);
    setLogs(getTelegramLogs());
  };

  const handleClearLogs = () => {
    localStorage.removeItem('shifonur_tg_logs');
    setLogs([]);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          {t('admin_tg_title')}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {t('admin_tg_desc')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form & Test Ping (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Credentials Form */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-sm">
            
            {saveSuccess && (
              <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>{t('admin_tg_saved_alert')}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-5">
              {/* Bot Token */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('admin_tg_token_label')}
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="7123456789:AAFx..."
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  {t('admin_tg_token_hint')}
                </p>
              </div>

              {/* Chat ID */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('admin_tg_chat_id_label')}
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={chatId}
                    onChange={(e) => setChatId(e.target.value)}
                    placeholder="-1001234567890 yoki 123456789"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  {t('admin_tg_chat_id_hint')}
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 transition-colors cursor-pointer shadow"
                >
                  {t('admin_tg_save_btn')}
                </button>

                <button
                  type="button"
                  onClick={handleSendTest}
                  disabled={testLoading}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 shadow-md shadow-sky-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {testLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t('admin_tg_test_sending')}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{t('admin_tg_test_btn')}</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Test result status display */}
            {testResult && (
              <div className={`mt-5 p-4 rounded-2xl border text-xs leading-relaxed ${
                testResult.success
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                  : 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'
              }`}>
                <div className="flex items-center gap-2 font-bold mb-1">
                  {testResult.success ? (
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-500" />
                  )}
                  <span>{testResult.success ? t('admin_tg_test_success') : t('admin_tg_test_fail')}</span>
                </div>
                {testResult.isSimulation && (
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">
                    (Simulyatsiya muvaffaqiyatli yakunlandi. Haqiqiy jonli Telegram guruhiga yuborish uchun o'zingizning @BotFather tokenni kiriting).
                  </p>
                )}
                {testResult.error && (
                  <p className="font-mono text-[11px] text-rose-600 mt-1">
                    Tafsilot: {testResult.error}
                  </p>
                )}
              </div>
            )}

          </div>

          {/* Setup Guide Instructions */}
          <div className="rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 p-6 text-xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <HelpCircle className="w-4 h-4 text-sky-500" />
              <span>O'z Telegram botingizni qanday ulaysiz?</span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-600 dark:text-slate-300 leading-relaxed">
              <li>Telegramda <a href="https://t.me/BotFather" target="_blank" rel="noreferrer" className="text-sky-600 font-bold underline">@BotFather</a> ga o'ting va yangi bot yarating (<code>/newbot</code>).</li>
              <li>@BotFather bergan API tokenni yuqoridagi <b>Bot Token</b> maydoniga nusxalang.</li>
              <li>Botni klinika administratori yoki maxsus xodimlar guruhiga qo'shing.</li>
              <li>Guruh yoki o'zingizning Chat ID raqamingizni (masalan: <a href="https://t.me/username_to_id_bot" target="_blank" rel="noreferrer" className="text-sky-600 underline">@username_to_id_bot</a> orqali) <b>Chat ID</b> maydoniga kiriting.</li>
              <li><b>"Sinov xabari yuborish"</b> tugmasini bosib darhol tekshiring!</li>
            </ol>
          </div>

        </div>

        {/* Right Column: Template Preview & Activity Logs (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Format Template Preview */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
              <Send className="w-4 h-4 text-sky-500" />
              <span>Telegramdagi Xabar Ko'rinishi</span>
            </h3>
            <p className="text-[11px] text-slate-400 mb-4">
              Har bir yangi buyurtma guruhga mana shunday chiroyli formatda keladi:
            </p>

            <div className="p-4 rounded-2xl bg-slate-950 text-slate-100 font-mono text-xs border border-slate-800 space-y-1.5 shadow-inner">
              <div className="text-sky-400 font-bold">🏥 YANGI QABUL BUYURTMASI (ShifoNur Med)</div>
              <div className="text-slate-600">━━━━━━━━━━━━━━━━━━━━</div>
              <div>👤 <b className="text-white">Bemor:</b> Jasur Alimov</div>
              <div>📞 <b className="text-white">Telefon:</b> <span className="text-sky-400">+998 90 123 45 67</span></div>
              <div>👨‍⚕️ <b className="text-white">Shifokor:</b> Dr. Alisher Qosimov</div>
              <div>🩺 <b className="text-white">Xizmat:</b> Yurak EKG tekshiruvi</div>
              <div>📅 <b className="text-white">Sana:</b> 2026-09-23 | ⏰ 10:30</div>
              <div>📝 <b className="text-white">Izoh:</b> Profilaktik ko'rik</div>
              <div className="text-slate-600">━━━━━━━━━━━━━━━━━━━━</div>
              <div className="text-[10px] text-emerald-400 italic">Xabar ShifoNur Med saytidan yuborildi</div>
            </div>
          </div>

          {/* Activity Logs */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-slate-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {t('admin_tg_logs_title')}
                </h3>
              </div>

              {logs.length > 0 && (
                <button
                  onClick={handleClearLogs}
                  className="text-[11px] text-rose-500 hover:text-rose-600 font-semibold flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Tozalash</span>
                </button>
              )}
            </div>

            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className={`px-2 py-0.5 rounded-full font-bold uppercase ${
                      log.status === 'success'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : log.status === 'simulated'
                        ? 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {log.status}
                    </span>
                    <span className="text-slate-400">{log.timestamp}</span>
                  </div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">{log.action}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">{log.message}</div>
                </div>
              ))}

              {logs.length === 0 && (
                <div className="py-8 text-center text-xs text-slate-400">
                  {t('admin_tg_no_logs')}
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
