import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Ambulance, 
  Send, 
  Navigation, 
  CheckCircle2 
} from 'lucide-react';

export default function Contacts() {
  const { t } = useLanguage();

  return (
    <section id="contacts" className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">
            {t('nav_contact')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4 tracking-tight">
            {t('contact_title')}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            {t('contact_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Info cards (4 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Address */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  {t('contact_address_label')}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t('contact_address_val')}
                </p>
                <div className="mt-2 text-xs font-semibold text-sky-600 dark:text-sky-400">
                  Mo'ljal: "Mirzo Ulug'bek" metro bekati yaqinida
                </div>
              </div>
            </div>

            {/* Phones */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  {t('contact_phone_label')}
                </h4>
                <div>
                  <a href="tel:+998712000000" className="text-sm font-extrabold text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors block">
                    +998 (71) 200-00-00 (Call Center)
                  </a>
                  <a href="tel:+998901234567" className="text-xs text-slate-600 dark:text-slate-400 hover:underline block">
                    +998 (90) 123-45-67 (Telegram & WhatsApp)
                  </a>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  {t('contact_workhours_label')}
                </h4>
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                  {t('contact_workhours_val')}
                </div>
              </div>
            </div>

            {/* 24/7 Ambulance Emergency Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Ambulance className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-xs uppercase font-extrabold tracking-wider text-rose-100">Shoshilinch tibbiy yordam</div>
                  <div className="text-lg font-black">103 yoki +998 71 200-00-03</div>
                </div>
              </div>
              <a
                href="tel:103"
                className="px-3.5 py-2 rounded-xl bg-white text-rose-600 font-extrabold text-xs hover:bg-rose-50 transition-colors shadow"
              >
                Qo'ng'iroq
              </a>
            </div>

          </div>

          {/* Interactive Map Visual (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 sm:p-5">
              
              {/* Map Canvas Mockup with realistic styling */}
              <div className="relative h-96 sm:h-[460px] rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                
                {/* Stylized Map Background Pattern */}
                <div className="absolute inset-0 opacity-40 dark:opacity-20" style={{
                  backgroundImage: `radial-gradient(#0284c7 1.5px, transparent 1.5px), radial-gradient(#0d9488 1.5px, #f8fafc 1.5px)`,
                  backgroundSize: '30px 30px',
                  backgroundPosition: '0 0, 15px 15px'
                }}></div>

                {/* Map Grid Roads representation */}
                <svg className="absolute inset-0 w-full h-full stroke-slate-300 dark:stroke-slate-700" strokeWidth="6" fill="none">
                  <path d="M-50,150 Q200,100 450,220 T900,180" />
                  <path d="M100,-20 L250,500" strokeWidth="8" />
                  <path d="M-20,320 L800,280" />
                </svg>

                {/* Centered Clinic Location Pin */}
                <div className="relative z-10 flex flex-col items-center animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="p-3 rounded-2xl bg-gradient-to-tr from-sky-600 via-teal-500 to-emerald-500 text-white shadow-2xl flex items-center gap-2 border-2 border-white dark:border-slate-900">
                    <Navigation className="w-5 h-5 fill-current" />
                    <span className="text-xs font-black tracking-wide">ShifoNur Med</span>
                  </div>
                  <div className="w-4 h-4 bg-teal-500 rotate-45 -mt-2 border-r-2 border-b-2 border-white dark:border-slate-900"></div>
                  <div className="w-8 h-2 bg-slate-950/20 rounded-full blur-[2px] mt-2"></div>
                </div>

                {/* Bottom map overlay controls */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <MapPin className="w-4 h-4 text-sky-600" />
                    <span className="font-semibold">Bunyodkor shoh ko'chasi, 45</span>
                  </div>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-sky-600 text-white font-bold hover:bg-sky-500 transition-colors shadow"
                  >
                    Google Xaritada ochish
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
