import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  Printer, 
  Download, 
  Receipt, 
  PieChart, 
  CheckCircle2, 
  ArrowUpRight,
  Building,
  ShieldCheck,
  X
} from 'lucide-react';

export default function FinancesAnalytics({ finances, appointments, doctors }) {
  const { t } = useLanguage();
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  // Receipt form state
  const [receiptPatient, setReceiptPatient] = useState(appointments[0]?.patientName || 'Otabek Rahimov');
  const [receiptDoctor, setReceiptDoctor] = useState(doctors[0]?.name || 'Dr. Alisher Qosimov');
  const [receiptService, setReceiptService] = useState('MRT Diagnostikasi (1.5 Tesla)');
  const [receiptAmount, setReceiptAmount] = useState('450,000 UZS');
  const [receiptPaymentType, setReceiptPaymentType] = useState('UzCard / Humo');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Klinika Moliyasi & Daromad Tahlillari
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real vaqt rejimidagi kassa tushumlari, bo'limlar daromadi va to'lov kvitansiyalari
          </p>
        </div>

        <button
          onClick={() => setShowReceiptModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 shadow-md shadow-sky-500/20 transition-all cursor-pointer"
        >
          <Receipt className="w-4 h-4" />
          <span>To'lov Cheki Chiqarish</span>
        </button>
      </div>

      {/* Top 4 Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Today's Revenue */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bugungi Tushum</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {finances.todayRevenue}
          </div>
          <div className="mt-2 text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Kassa holati: Yopilmagan</span>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Oylik Jami Daromad</span>
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Building className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {finances.monthlyRevenue}
          </div>
          <div className="mt-2 text-xs text-sky-600 font-semibold">
            Rejadagi ko'rsatkichdan 14% yuqori
          </div>
        </div>

        {/* Net Clinic Profit */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sof Foyda (Klinika)</span>
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {finances.netProfit}
          </div>
          <div className="mt-2 text-xs text-slate-500 font-medium">
            Rentabellik darajasi: 60%
          </div>
        </div>

        {/* Doctor Payroll */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Shifokorlar Ulushi</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {finances.doctorCommissions}
          </div>
          <div className="mt-2 text-xs text-indigo-600 font-medium">
            Konsultatsiyalar bo'yicha foiz
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Department Shares (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Bo'limlar Bo'yicha Daromad Taqsimoti
              </h3>
              <p className="text-xs text-slate-500">
                Eng ko'p daromad keltirgan tibbiy xizmatlar va laboratoriyalar
              </p>
            </div>
            <span className="text-xs font-bold text-teal-600 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-1 rounded-lg">
              Joriy oy
            </span>
          </div>

          <div className="space-y-4">
            {finances.departmentShares.map((dept, i) => (
              <div key={i} className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-800 dark:text-slate-200">{dept.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">{dept.amount}</span>
                    <span className="font-extrabold text-teal-600">{dept.percent}%</span>
                  </div>
                </div>
                {/* Visual progress bar */}
                <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full ${dept.color} rounded-full transition-all duration-500`}
                    style={{ width: `${dept.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              To'lov Usullari Strukturasi
            </h3>
            <p className="text-xs text-slate-500">
              Bemorlar tomonidan qilingan to'lov kanallari
            </p>
          </div>

          <div className="space-y-3.5">
            {finances.paymentMethods.map((pm, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{pm.name}</div>
                  <div className="text-[11px] text-slate-400">{pm.count}</div>
                </div>
                <div className="text-lg font-black text-sky-600 dark:text-sky-400">
                  {pm.percent}%
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs text-sky-800 dark:text-sky-300">
            💡 Barcha onlayn to'lovlar fiskal kassa apparatiga (OFD) avtomatik integratsiya qilingan.
          </div>
        </div>

      </div>

      {/* Payment Receipt / Invoice Generator Modal */}
      {showReceiptModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 max-h-[95vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Receipt className="w-5 h-5 text-teal-600" />
                <span>To'lov Cheki (Kvitansiya) Shakllantirish</span>
              </h3>
              <button onClick={() => setShowReceiptModal(false)} className="p-1 text-slate-400"><X className="w-5 h-5" /></button>
            </div>

            {/* Printable Receipt Preview Area */}
            <div id="printable-receipt" className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 space-y-3 shadow-inner">
              <div className="text-center pb-3 border-b border-dashed border-slate-300 dark:border-slate-700">
                <div className="font-extrabold text-sm text-slate-900 dark:text-white">SHIFONUR MED KLINIKASI</div>
                <div className="text-[10px] text-slate-500">Toshkent sh., Bunyodkor shoh ko'chasi 45</div>
                <div className="text-[10px] text-slate-500">Tel: +998 (71) 200-00-00 • STIR: 308942110</div>
                <div className="text-[11px] font-bold text-teal-600 mt-1">FISKAL TO'LOV CHEKI #{Math.floor(100000 + Math.random() * 900000)}</div>
              </div>

              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Sana va vaqt:</span>
                  <span>{new Date().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Bemor:</span>
                  <span className="font-bold">{receiptPatient}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Shifokor:</span>
                  <span>{receiptDoctor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Xizmat:</span>
                  <span>{receiptService}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">To'lov turi:</span>
                  <span>{receiptPaymentType}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-dashed border-slate-300 dark:border-slate-700 flex justify-between items-center text-sm font-black">
                <span>JAMI TO'LANDI:</span>
                <span className="text-teal-600 dark:text-teal-400">{receiptAmount}</span>
              </div>

              <div className="text-center pt-2 text-[10px] text-slate-400">
                Salomatligingiz uchun rahmat! ShifoNur Med.
              </div>
            </div>

            {/* Receipt Parameters Form */}
            <div className="mt-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Bemor ismi</label>
                  <input
                    type="text"
                    value={receiptPatient}
                    onChange={(e) => setReceiptPatient(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">To'lov summasi</label>
                  <input
                    type="text"
                    value={receiptAmount}
                    onChange={(e) => setReceiptAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Shifokor</label>
                  <input
                    type="text"
                    value={receiptDoctor}
                    onChange={(e) => setReceiptDoctor(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">To'lov shakli</label>
                  <select
                    value={receiptPaymentType}
                    onChange={(e) => setReceiptPaymentType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                  >
                    <option value="UzCard / Humo">UzCard / Humo</option>
                    <option value="Payme / Click">Payme / Click</option>
                    <option value="Naqd to'lov">Naqd to'lov</option>
                    <option value="Tibbiy sug'urta">Tibbiy sug'urta</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-3">
              <button
                type="button"
                onClick={handlePrint}
                className="flex-1 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Chop etish (Print)</span>
              </button>
              <button
                type="button"
                onClick={() => setShowReceiptModal(false)}
                className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs"
              >
                Yopish
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
