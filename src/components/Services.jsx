import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Activity, 
  HeartPulse, 
  Scan, 
  Baby, 
  Smile, 
  FlaskConical, 
  Clock, 
  Check, 
  Search, 
  CalendarPlus 
} from 'lucide-react';

const iconMap = {
  Activity,
  HeartPulse,
  Scan,
  Baby,
  Smile,
  FlaskConical,
};

export default function Services({ services, onSelectService }) {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', labelUz: 'Barchasi', labelRu: 'Все', labelEn: 'All Services' },
    { id: 'diagnostics', labelUz: 'Diagnostika', labelRu: 'Диагностика', labelEn: 'Diagnostics' },
    { id: 'cardiology', labelUz: 'Kardiologiya', labelRu: 'Кардиология', labelEn: 'Cardiology' },
    { id: 'pediatrics', labelUz: 'Pediatriya', labelRu: 'Педиатрия', labelEn: 'Pediatrics' },
    { id: 'dentistry', labelUz: 'Stomatologiya', labelRu: 'Стоматология', labelEn: 'Dentistry' },
    { id: 'laboratory', labelUz: 'Laboratoriya', labelRu: 'Лаборатория', labelEn: 'Laboratory' },
  ];

  const getCategoryLabel = (cat) => {
    if (language === 'ru') return cat.labelRu;
    if (language === 'en') return cat.labelEn;
    return cat.labelUz;
  };

  const getServiceName = (item) => {
    if (language === 'ru') return item.nameRu;
    if (language === 'en') return item.nameEn;
    return item.nameUz;
  };

  const getServiceDesc = (item) => {
    if (language === 'ru') return item.descRu;
    if (language === 'en') return item.descEn;
    return item.descUz;
  };

  const filteredServices = services.filter((srv) => {
    const matchesCategory = selectedCategory === 'all' || srv.category === selectedCategory;
    const name = getServiceName(srv).toLowerCase();
    const desc = getServiceDesc(srv).toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query || name.includes(query) || desc.includes(query);
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="services" className="py-16 sm:py-24 bg-slate-100/60 dark:bg-slate-900/50 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">
            {t('nav_services')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4 tracking-tight">
            {t('services_title')}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            {t('services_subtitle')}
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700'
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Xizmatni qidirish..."
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
            />
          </div>

        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const IconComponent = iconMap[service.icon] || Activity;
            const name = getServiceName(service);
            const desc = getServiceDesc(service);

            return (
              <div
                key={service.id}
                className="group relative rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >
                <div>
                  {/* Card top icon & duration */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 text-white flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/60 px-2.5 py-1 rounded-full">
                      <Clock className="w-3.5 h-3.5 text-sky-500" />
                      <span>{service.duration} {t('services_mins')}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {desc}
                  </p>
                </div>

                {/* Price & Action Button */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{t('services_price')}</div>
                    <div className="text-base sm:text-lg font-black text-sky-600 dark:text-sky-400">{service.price}</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectService(service)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 shadow-sm hover:shadow-md transition-all cursor-pointer"
                  >
                    <CalendarPlus className="w-3.5 h-3.5" />
                    <span>{t('services_book_btn')}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            Hech qanday xizmat topilmadi. Qidiruv so'zini o'zgartirib ko'ring.
          </div>
        )}

      </div>
    </section>
  );
}
