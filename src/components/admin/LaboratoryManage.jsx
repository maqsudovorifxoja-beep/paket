import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { sendLabResultToTelegram } from '../../services/telegramService';
import { 
  FlaskConical, 
  Search, 
  Plus, 
  Send, 
  CheckCircle2, 
  Clock, 
  FileText, 
  X, 
  Loader2,
  AlertCircle
} from 'lucide-react';

export default function LaboratoryManage({ labTests, onUpdateLabTest, onAddLabTest }) {
  const { t } = useLanguage();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sendingId, setSendingId] = useState(null);
  const [notificationMsg, setNotificationMsg] = useState('');

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTestModal, setSelectedTestModal] = useState(null);

  // New test form state
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [testName, setTestName] = useState('Umumiy Kengaytirilgan Qon Tahlili');
  const [orderedBy, setOrderedBy] = useState('Dr. Alisher Qosimov');
  const [resultSummary, setResultSummary] = useState('');

  const filteredTests = labTests.filter((tst) => {
    const matchesSearch = 
      tst.patientName.toLowerCase().includes(search.toLowerCase()) ||
      tst.testName.toLowerCase().includes(search.toLowerCase()) ||
      tst.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tst.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSendTelegram = async (test) => {
    setSendingId(test.id);
    setNotificationMsg('');

    try {
      const res = await sendLabResultToTelegram(test);
      if (res && res.success) {
        onUpdateLabTest(test.id, { telegramSent: true, status: 'ready' });
        setNotificationMsg(`Tahlil natijasi (${test.id}) bemor Telegramiga yuborildi!`);
      } else {
        setNotificationMsg(`Xatolik: ${res?.error || 'Telegramga yuborilmadi'}`);
      }
    } catch (e) {
      setNotificationMsg('Yuborishda xatolik yuz berdi.');
    } finally {
      setSendingId(null);
      setTimeout(() => setNotificationMsg(''), 4000);
    }
  };

  const handleCreateTest = (e) => {
    e.preventDefault();
    if (!patientName.trim()) return;

    const newTest = {
      id: 'LAB-' + Math.floor(500 + Math.random() * 500),
      patientName: patientName.trim(),
      phone: phone.trim(),
      testName,
      orderedBy,
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: resultSummary.trim() ? 'ready' : 'in_progress',
      resultSummary: resultSummary.trim() || 'Tahlil jarayonda, xulosa kutilmoqda.',
      telegramSent: false
    };

    onAddLabTest(newTest);
    setShowAddModal(false);
    setPatientName('');
    setResultSummary('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Laboratoriya va Diagnostika Xulosalari
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Tahlil natijalarini kiritish va to'g'ridan-to'g'ri Telegram bot orqali bemorga yuborish
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 shadow-md shadow-teal-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi Tahlil Qo'shish</span>
        </button>
      </div>

      {/* Notification Toast */}
      {notificationMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Search & Status Filter */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tahlil nomi, bemor ismi yoki ID bo'yicha qidiruv..."
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="w-full sm:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">Barcha tahlillar</option>
            <option value="ready">Tayyor (Ready)</option>
            <option value="in_progress">Jarayonda</option>
          </select>
        </div>
      </div>

      {/* Tests Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-4 py-3.5">ID</th>
                <th className="px-4 py-3.5">Bemor</th>
                <th className="px-4 py-3.5">Tahlil turi</th>
                <th className="px-4 py-3.5">Yo'llovchi Shifokor</th>
                <th className="px-4 py-3.5">Sana</th>
                <th className="px-4 py-3.5">Holati</th>
                <th className="px-4 py-3.5">Telegram</th>
                <th className="px-4 py-3.5 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTests.map((test) => (
                <tr key={test.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3.5 font-mono font-bold text-sky-600 dark:text-sky-400 whitespace-nowrap">
                    {test.id}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="font-bold text-slate-900 dark:text-white">{test.patientName}</div>
                    <div className="text-[11px] text-slate-400">{test.phone}</div>
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-slate-800 dark:text-slate-200 max-w-[200px] truncate" title={test.testName}>
                    {test.testName}
                  </td>
                  <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400 font-medium">
                    {test.orderedBy}
                  </td>
                  <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">
                    {test.date}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    {test.status === 'ready' ? (
                      <span className="px-2 py-0.5 rounded-full font-bold text-[11px] bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                        Tayyor
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full font-bold text-[11px] bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                        Jarayonda
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    {test.telegramSent ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Yuborilgan</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400">Yuborilmagan</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-right whitespace-nowrap space-x-1.5">
                    <button
                      onClick={() => setSelectedTestModal(test)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 transition-colors"
                    >
                      Xulosa
                    </button>

                    <button
                      onClick={() => handleSendTelegram(test)}
                      disabled={sendingId === test.id}
                      className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-teal-500 text-white font-bold text-xs hover:from-sky-600 hover:to-teal-600 transition-all inline-flex items-center gap-1 shadow-xs cursor-pointer disabled:opacity-50"
                      title="Telegram botga xulosani uzatish"
                    >
                      {sendingId === test.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                      <span>Telegramga</span>
                    </button>
                  </td>
                </tr>
              ))}

              {filteredTests.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-slate-400">
                    Tahlillar topilmadi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lab Conclusion View Modal */}
      {selectedTestModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-teal-600" />
                <span>Tahlil Xulosasi (#{selectedTestModal.id})</span>
              </h3>
              <button onClick={() => setSelectedTestModal(null)} className="p-1 text-slate-400"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <div>Bemor: <span className="font-bold text-slate-900 dark:text-white">{selectedTestModal.patientName}</span> ({selectedTestModal.phone})</div>
                <div>Tahlil turi: <span className="font-semibold text-teal-600 dark:text-teal-400">{selectedTestModal.testName}</span></div>
                <div>Shifokor: <span className="font-medium text-slate-700 dark:text-slate-300">{selectedTestModal.orderedBy}</span></div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Laboratoriya xulosasi va ko'rsatkichlar:</label>
                <div className="p-4 rounded-2xl bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed border border-slate-800">
                  {selectedTestModal.resultSummary}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <button
                onClick={() => {
                  handleSendTelegram(selectedTestModal);
                  setSelectedTestModal(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Telegram orqali yuborish</span>
              </button>
              <button
                onClick={() => setSelectedTestModal(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Test Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Yangi Tahlil Buyurtmasi</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-slate-400"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleCreateTest} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Bemor F.I.Sh *</label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Masalan: Sardor Aliyev"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Telefon raqami *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tahlil turi</label>
                <select
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                >
                  <option value="Umumiy Kengaytirilgan Qon Tahlili">Umumiy Kengaytirilgan Qon Tahlili</option>
                  <option value="Biokimyoviy Qon Tahlili & Xolesterin">Biokimyoviy Qon Tahlili & Xolesterin</option>
                  <option value="Bosh miya MRT Diagnostikasi (1.5T)">Bosh miya MRT Diagnostikasi (1.5T)</option>
                  <option value="Qorin bo'shlig'i UZI Skaneri">Qorin bo'shlig'i UZI Skaneri</option>
                  <option value="Yurak Ekokardiografiya & UZI Protokoli">Yurak Ekokardiografiya & UZI Protokoli</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Yo'llovchi shifokor</label>
                <input
                  type="text"
                  value={orderedBy}
                  onChange={(e) => setOrderedBy(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Dastlabki xulosa (ixtiyoriy)</label>
                <textarea
                  rows={2}
                  value={resultSummary}
                  onChange={(e) => setResultSummary(e.target.value)}
                  placeholder="Agar tahlil tayyor bo'lsa xulosani kiriting..."
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-teal-500 to-emerald-600 shadow-md"
              >
                Tahlilni saqlash
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
