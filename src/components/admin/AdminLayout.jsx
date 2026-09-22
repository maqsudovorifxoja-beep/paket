import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  HeartPulse, 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Stethoscope, 
  Send, 
  ArrowLeft, 
  LogOut, 
  Sun, 
  Moon, 
  Menu, 
  X,
  ShieldCheck
} from 'lucide-react';

import DashboardOverview from './DashboardOverview';
import AppointmentsManage from './AppointmentsManage';
import PatientsManage from './PatientsManage';
import FinancesAnalytics from './FinancesAnalytics';
import LaboratoryManage from './LaboratoryManage';
import DoctorShiftsManage from './DoctorShiftsManage';
import DoctorsManage from './DoctorsManage';
import ServicesManage from './ServicesManage';
import TelegramConfig from './TelegramConfig';

import { 
  UserCheck, 
  FlaskConical, 
  Clock, 
  TrendingUp 
} from 'lucide-react';

export default function AdminLayout({
  onClose,
  onLogout,
  appointments,
  doctors,
  services,
  patients,
  onAddPatient,
  onDeletePatient,
  finances,
  labTests,
  onUpdateLabTest,
  onAddLabTest,
  shifts,
  onToggleShiftDuty,
  onUpdateShift,
  onAddShift,
  onUpdateStatus,
  onDeleteAppointment,
  onAddAppointment,
  onAddDoctor,
  onDeleteDoctor,
  onToggleDoctorStatus,
  onAddService,
  onDeleteService,
}) {
  const { language, setLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const pendingCount = appointments.filter(a => a.status === 'pending').length;

  const tabs = [
    { id: 'dashboard', label: t('admin_nav_dashboard'), icon: LayoutDashboard },
    { id: 'appointments', label: t('admin_nav_appointments'), icon: Calendar, badge: pendingCount },
    { id: 'patients', label: t('admin_nav_patients'), icon: UserCheck },
    { id: 'finances', label: t('admin_nav_finances'), icon: TrendingUp },
    { id: 'laboratory', label: t('admin_nav_laboratory'), icon: FlaskConical },
    { id: 'shifts', label: t('admin_nav_shifts'), icon: Clock },
    { id: 'doctors', label: t('admin_nav_doctors'), icon: Users },
    { id: 'services', label: t('admin_nav_services'), icon: Stethoscope },
    { id: 'telegram', label: t('admin_nav_telegram'), icon: Send },
  ];

  const languages = [
    { code: 'uz', label: "UZ", flag: "🇺🇿" },
    { code: 'ru', label: "RU", flag: "🇷🇺" },
    { code: 'en', label: "EN", flag: "🇬🇧" },
  ];

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col transition-colors">
      
      {/* Admin Topbar */}
      <header className="sticky top-0 z-30 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>ShifoNur Med</span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                  Admin
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right action controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Language selector */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                  language === l.code
                    ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {l.flag} {l.label}
              </button>
            ))}
          </div>

          {/* Dark mode */}
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
            title="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-600" />}
          </button>

          {/* Return to website */}
          <button
            onClick={onClose}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t('admin_exit')}</span>
          </button>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors"
            title={t('admin_logout')}
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('admin_logout')}</span>
          </button>
        </div>
      </header>

      {/* Main Body with Sidebar */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 gap-6">
        
        {/* Left Sidebar (Desktop) */}
        <aside className="hidden md:flex flex-col w-64 space-y-1.5 flex-shrink-0">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-md shadow-teal-500/20'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isActive ? 'bg-white text-teal-700' : 'bg-rose-500 text-white'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick info card in sidebar */}
          <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-xs space-y-2 mt-4">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Tizim holati: Barqaror</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Telegram webhook faol. Oxirgi sinxronizatsiya: hozir.
            </p>
          </div>
        </aside>

        {/* Mobile Sidebar Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm md:hidden flex">
            <div className="w-72 bg-white dark:bg-slate-900 h-full p-4 flex flex-col justify-between shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white">Admin Menyu</span>
                  <button onClick={() => setMobileSidebarOpen(false)} className="p-1">
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                <div className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setMobileSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-teal-600 text-white'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4" />
                          <span>{tab.label}</span>
                        </div>
                        {tab.badge > 0 && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500 text-white">
                            {tab.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t('admin_exit')}</span>
                </button>
              </div>
            </div>
            <div className="flex-1" onClick={() => setMobileSidebarOpen(false)}></div>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          {activeTab === 'dashboard' && (
            <DashboardOverview
              appointments={appointments}
              doctors={doctors}
              services={services}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenAddAppointment={() => setActiveTab('appointments')}
            />
          )}

          {activeTab === 'appointments' && (
            <AppointmentsManage
              appointments={appointments}
              doctors={doctors}
              services={services}
              onUpdateStatus={onUpdateStatus}
              onDeleteAppointment={onDeleteAppointment}
              onAddAppointment={onAddAppointment}
            />
          )}

          {activeTab === 'patients' && (
            <PatientsManage
              patients={patients}
              onAddPatient={onAddPatient}
              onDeletePatient={onDeletePatient}
            />
          )}

          {activeTab === 'finances' && (
            <FinancesAnalytics
              finances={finances}
              appointments={appointments}
              doctors={doctors}
            />
          )}

          {activeTab === 'laboratory' && (
            <LaboratoryManage
              labTests={labTests}
              onUpdateLabTest={onUpdateLabTest}
              onAddLabTest={onAddLabTest}
            />
          )}

          {activeTab === 'shifts' && (
            <DoctorShiftsManage
              shifts={shifts}
              onToggleShiftDuty={onToggleShiftDuty}
              onUpdateShift={onUpdateShift}
              onAddShift={onAddShift}
              doctors={doctors}
            />
          )}

          {activeTab === 'doctors' && (
            <DoctorsManage
              doctors={doctors}
              onAddDoctor={onAddDoctor}
              onDeleteDoctor={onDeleteDoctor}
              onToggleDoctorStatus={onToggleDoctorStatus}
            />
          )}

          {activeTab === 'services' && (
            <ServicesManage
              services={services}
              onAddService={onAddService}
              onDeleteService={onDeleteService}
            />
          )}

          {activeTab === 'telegram' && (
            <TelegramConfig />
          )}
        </main>

      </div>
    </div>
  );
}
