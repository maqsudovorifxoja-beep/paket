import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Calendar, 
  Send, 
  Award, 
  Users, 
  HeartHandshake, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ShieldAlert,
  ArrowRight,
  Stethoscope
} from 'lucide-react';

export default function Hero({ onOpenBooking }) {
  const { t } = useLanguage();

  const stats = [
    {
      value: "15+",
      label: t('stat_experience'),
      icon: Award,
      color: "from-sky-500 to-blue-600",
      shadow: "shadow-sky-500/20"
    },
    {
      value: "50+",
      label: t('stat_doctors'),
      icon: Users,
      color: "from-teal-500 to-emerald-600",
      shadow: "shadow-teal-500/20"
    },
    {
      value: "120K+",
      label: t('stat_patients'),
      icon: HeartHandshake,
      color: "from-indigo-500 to-purple-600",
      shadow: "shadow-indigo-500/20"
    },
    {
      value: "24/7",
      label: t('stat_support'),
      icon: Clock,
      color: "from-emerald-500 to-teal-600",
      shadow: "shadow-emerald-500/20"
    }
  ];

  return (
    <section id="home" className="relative overflow-hidden pt-6 pb-16 lg:pt-12 lg:pb-24">
      {/* Background Glows & Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-sky-400/20 to-teal-300/20 dark:from-sky-600/15 dark:to-teal-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-emerald-400/15 dark:bg-emerald-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
              <Sparkles className="w-4 h-4 text-sky-500 animate-spin" style={{ animationDuration: '8s' }} />
              <span>{t('hero_badge')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              {t('hero_title_1')}{' '}
              <span className="bg-gradient-to-r from-sky-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent underline decoration-sky-400/40 decoration-wavy decoration-2">
                {t('hero_title_highlight')}
              </span>{' '}
              {t('hero_title_2')}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {t('hero_subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                type="button"
                onClick={() => onOpenBooking()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl font-extrabold text-base text-white bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500 hover:from-sky-600 hover:via-teal-600 hover:to-emerald-600 shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>{t('hero_cta_book')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#telegram"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl font-bold text-base text-slate-800 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 transition-all"
              >
                <Send className="w-5 h-5 text-sky-500" />
                <span>{t('hero_cta_bot')}</span>
              </a>
            </div>

            {/* Live Clinic Status indicator */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{t('hero_open_status')}</span>
              </div>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-500" />
                <span>Navbatchi shifokorlar qabul qilmoqda</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Doctor Main Feature Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl p-3 sm:p-5">
                
                <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800"
                    alt="Leading doctor"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>
                  
                  {/* Doctor badge inside image */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-teal-500 uppercase tracking-wider mb-1">
                      Bosh Kardiolog
                    </span>
                    <h3 className="text-xl font-bold">Dr. Alisher Qosimov</h3>
                    <p className="text-xs text-slate-300">16 yillik tajribaga ega tibbiyot fanlari nomzodi</p>
                  </div>
                </div>

                {/* Floating Quick Action Card */}
                <div className="mt-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">Bugun bo'sh vaqtlar mavjud</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">14:00, 15:30, 17:00 slotlari ochiq</div>
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenBooking()}
                    className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:text-sky-700 underline"
                  >
                    Band qilish
                  </button>
                </div>

              </div>

              {/* Decorative floating badge */}
              <div className="absolute -top-4 -left-4 sm:-left-6 p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 hidden sm:flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900 dark:text-white">ISO 9001:2025</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Xalqaro sertifikat</div>
                </div>
              </div>

              {/* Decorative Telegram floating badge */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900 dark:text-white">Telegram Bot 24/7</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Avtomatik eslatmalar</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4 Stats Cards */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={idx}
                className="relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center shadow-lg ${stat.shadow} group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                    {stat.value}
                  </span>
                </div>
                <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
