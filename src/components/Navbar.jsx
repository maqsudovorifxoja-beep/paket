import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { 
  HeartPulse, 
  Sun, 
  Moon, 
  PhoneCall, 
  ShieldCheck, 
  Menu, 
  X, 
  Send,
  CalendarCheck,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ onOpenBooking, onOpenAdmin }) {
  const { language, setLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const languages = [
    { code: 'uz', label: "O'zbekcha", flag: "🇺🇿" },
    { code: 'ru', label: "Русский", flag: "🇷🇺" },
    { code: 'en', label: "English", flag: "🇬🇧" },
  ];

  const currentLangObj = languages.find(l => l.code === language) || languages[0];

  const navLinks = [
    { href: '#home', label: t('nav_home') },
    { href: '#services', label: t('nav_services') },
    { href: '#doctors', label: t('nav_doctors') },
    { href: '#telegram', label: t('nav_telegram'), isBot: true },
    { href: '#reviews', label: t('nav_reviews') },
    { href: '#contacts', label: t('nav_contact') },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      
      {/* Top emergency strip - sleek and single row */}
      <div className="bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 text-white text-[11px] py-1 px-4 hidden lg:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center whitespace-nowrap">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
              <span>{t('emergency_call')}:</span>
            </span>
            <a href="tel:+998712000000" className="font-bold tracking-wide hover:underline">+998 (71) 200-00-00</a>
            <span className="opacity-50">•</span>
            <span className="opacity-90">{t('hero_open_hours')}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a 
              href="#telegram" 
              className="inline-flex items-center gap-1 hover:text-sky-100 transition-colors"
            >
              <Send className="w-3 h-3 text-sky-200" />
              <span>@ShifoNurMed_bot</span>
            </a>
            <span className="opacity-50">•</span>
            <button 
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3 h-3 text-teal-200" />
              <span className="font-semibold">{t('nav_admin')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-2">
          
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 via-teal-500 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
              <HeartPulse className="w-5 h-5 animate-pulse" />
            </div>
            <div className="whitespace-nowrap">
              <div className="text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 dark:from-sky-400 dark:via-teal-300 dark:to-emerald-400 bg-clip-text text-transparent">
                {t('clinic_name')}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Ko'p Tarmoqli Klinika
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links - guaranteed single line with whitespace-nowrap */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 flex-shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-2.5 xl:px-3 py-1.5 text-xs xl:text-sm font-semibold whitespace-nowrap text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 rounded-lg transition-colors group flex items-center gap-1.5"
              >
                <span>{link.label}</span>
                {link.isBot && (
                  <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-black bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800">
                    BOT
                  </span>
                )}
                <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-gradient-to-r from-sky-500 to-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
              </a>
            ))}
          </nav>

          {/* Right Controls: Lang, Theme, Admin, Book CTA */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0 whitespace-nowrap">
            
            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors border border-slate-200/80 dark:border-slate-700 cursor-pointer"
                aria-label="Change language"
              >
                <span>{currentLangObj.flag}</span>
                <span className="uppercase">{currentLangObj.code}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langMenuOpen && (
                <div 
                  className="absolute right-0 mt-1.5 w-36 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setLangMenuOpen(false)}
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs font-semibold transition-colors ${
                        language === l.code 
                          ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400' 
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60'
                      }`}
                    >
                      <span className="text-sm">{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors border border-slate-200/80 dark:border-slate-700 cursor-pointer"
              aria-label="Toggle Dark Mode"
              title={isDark ? "Yorug' rejim (Light mode)" : "Qorong'u rejim (Dark mode)"}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-600" />}
            </button>

            {/* Admin shortcut icon */}
            <button
              onClick={onOpenAdmin}
              className="p-2 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors border border-slate-200/80 dark:border-slate-700 cursor-pointer"
              title={t('nav_admin')}
            >
              <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            </button>

            {/* Book Appointment CTA */}
            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500 hover:from-sky-600 hover:via-teal-600 hover:to-emerald-600 shadow-md shadow-sky-500/20 hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>{t('book_appointment')}</span>
            </button>
          </div>

          {/* Mobile menu triggers */}
          <div className="flex items-center gap-1.5 sm:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-600" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-500">Tilni tanlang:</span>
            <div className="flex gap-1.5">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                    language === l.code
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {l.flag} {l.code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl flex items-center justify-between"
              >
                <span>{link.label}</span>
                {link.isBot && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-300 font-bold">
                    BOT
                  </span>
                )}
              </a>
            ))}
          </div>

          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-xl font-bold text-center text-white bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500 shadow-md flex items-center justify-center gap-2"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>{t('book_appointment')}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 rounded-xl font-semibold text-center text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-teal-500" />
              <span>{t('nav_admin')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
