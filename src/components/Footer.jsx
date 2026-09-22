import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  HeartPulse, 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  ArrowUp 
} from 'lucide-react';

export default function Footer({ onOpenAdmin }) {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Clinic brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 via-teal-500 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-sky-500/25">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">
                  {t('clinic_name')}
                </span>
                <span className="block text-xs text-sky-400 font-medium">
                  {t('clinic_tagline')}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              {t('footer_desc')}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="#telegram"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-sky-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                title="Telegram Bot"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="tel:+998712000000"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                title="Call Center"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-teal-600 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
                title="Admin Panel"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{t('nav_admin')}</span>
              </button>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t('footer_quick_links')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-white transition-colors">{t('nav_home')}</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">{t('nav_services')}</a>
              </li>
              <li>
                <a href="#doctors" className="hover:text-white transition-colors">{t('nav_doctors')}</a>
              </li>
              <li>
                <a href="#telegram" className="hover:text-white transition-colors">{t('nav_telegram')}</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">{t('nav_reviews')}</a>
              </li>
              <li>
                <a href="#contacts" className="hover:text-white transition-colors">{t('nav_contact')}</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Departments */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t('footer_departments')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Kardiologiya va EKG</li>
              <li>Nevrologiya & Somnologiya</li>
              <li>MRT va 4D UZI Diagnostika</li>
              <li>Endoskopik Jarrohlik</li>
              <li>Bolalar Pediatriyasi</li>
              <li>Lazerli Stomatologiya</li>
              <li>Avtomatlashtirilgan Laboratoriya</li>
            </ul>
          </div>

          {/* Col 5: Working Hours & Emergency */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t('contact_workhours_label')}
            </h4>
            <div className="space-y-1.5 text-xs text-slate-400">
              <p>Dushanba - Shanba:</p>
              <p className="font-semibold text-white">08:00 - 20:00</p>
              <p className="pt-1">Yakshanba:</p>
              <p className="font-semibold text-white">09:00 - 15:00</p>
              <div className="pt-2 text-rose-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                <span>Tezkor yordam: 24/7 (103)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {t('clinic_name')}. {t('footer_rights')} Lic: #UZ-MED-84920.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="hover:text-slate-300 transition-colors"
            >
              {t('nav_admin')}
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
            >
              <span>Yuqoriga</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
