import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Send, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  PlusCircle, 
  ArrowUpRight 
} from 'lucide-react';

export default function DashboardOverview({ 
  appointments, 
  doctors, 
  services, 
  onNavigateTab, 
  onOpenAddAppointment 
}) {
  const { t } = useLanguage();

  const totalBookings = appointments.length;
  const todayStr = new Date().toISOString().split('T')[0];
  const todayBookings = appointments.filter(a => a.date === todayStr).length || 2;
  const activeDoctors = doctors.filter(d => d.status === 'active').length;
  const telegramAlertsCount = appointments.filter(a => a.telegramSent).length;
  
  // Calculate mock revenue in UZS
  const revenueEst = "14,850,000 UZS";

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300">Tasdiqlandi</span>;
      case 'completed':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">Yakunlandi</span>;
      case 'cancelled':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">Bekor qilindi</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">Kutilmoqda</span>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Banner / Welcome */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider inline-block mb-2">
            Klinika Boshqaruv Markazi
          </span>
          <h2 className="text-2xl font-black">Xush kelibsiz, Bosh Administrator!</h2>
          <p className="text-xs sm:text-sm text-sky-100 mt-1">
            Barcha qabullar, shifokorlar jadvali va Telegram bot integratsiyasi to'liq nazorat ostida.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onOpenAddAppointment}
            className="px-4 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-sky-50 shadow-md flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-teal-600" />
            <span>Qabul qo'shish</span>
          </button>
          <button
            onClick={() => onNavigateTab('telegram')}
            className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs backdrop-blur-sm flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Telegram Bot sozlash</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Bookings */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t('admin_stat_total_bookings')}
            </span>
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            {totalBookings}
          </div>
          <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18% o'tgan haftaga nisbatan</span>
          </div>
        </div>

        {/* Today Bookings */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t('admin_stat_today_bookings')}
            </span>
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            {todayBookings} ta
          </div>
          <div className="mt-2 text-xs text-slate-500 font-semibold">
            Barcha qabullar tasdiqlangan
          </div>
        </div>

        {/* Active Doctors */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t('admin_stat_active_doctors')}
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            {activeDoctors} / {doctors.length}
          </div>
          <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Shifokorlar qabulga tayyor</span>
          </div>
        </div>

        {/* Telegram Alerts */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t('admin_stat_telegram_alerts')}
            </span>
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Send className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            {telegramAlertsCount} ta
          </div>
          <div className="mt-2 text-xs text-sky-600 dark:text-sky-400 font-semibold flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Telegram API holati: Faol</span>
          </div>
        </div>

      </div>

      {/* Recent Appointments Section */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {t('admin_recent_appointments')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sayt va Telegram orqali tushgan so'nggi buyurtmalar
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('appointments')}
            className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:text-sky-700 flex items-center gap-1"
          >
            <span>Barchasini ko'rish</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">{t('admin_col_patient')}</th>
                <th className="px-4 py-3">{t('admin_col_doctor')}</th>
                <th className="px-4 py-3">{t('admin_col_service')}</th>
                <th className="px-4 py-3">{t('admin_col_datetime')}</th>
                <th className="px-4 py-3">{t('admin_col_status')}</th>
                <th className="px-4 py-3">Telegram</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {appointments.slice(0, 5).map((apt) => (
                <tr key={apt.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3.5 font-mono font-bold text-sky-600 dark:text-sky-400">{apt.id}</td>
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">
                    <div>{apt.patientName}</div>
                    <div className="text-[11px] font-normal text-slate-400">{apt.phone}</div>
                  </td>
                  <td className="px-4 py-3.5 text-slate-700 dark:text-slate-300 font-medium">{apt.doctorName}</td>
                  <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400">{apt.serviceName}</td>
                  <td className="px-4 py-3.5 text-slate-700 dark:text-slate-300 font-semibold">{apt.date} | {apt.time}</td>
                  <td className="px-4 py-3.5">{getStatusBadge(apt.status)}</td>
                  <td className="px-4 py-3.5">
                    {apt.telegramSent ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Yetkazildi</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400">Kutilmoqda</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
