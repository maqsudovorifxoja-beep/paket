import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Star, 
  Calendar, 
  Clock, 
  Award, 
  CheckCircle, 
  UserCheck 
} from 'lucide-react';

export default function Doctors({ doctors, onSelectDoctor }) {
  const { language, t } = useLanguage();
  const [selectedDept, setSelectedDept] = useState('all');

  const departments = [
    { id: 'all', labelUz: 'Barchasi', labelRu: 'Все врачи', labelEn: 'All Doctors' },
    { id: 'cardiology', labelUz: 'Kardiologiya', labelRu: 'Кардиология', labelEn: 'Cardiology' },
    { id: 'neurology', labelUz: 'Nevrologiya', labelRu: 'Неврология', labelEn: 'Neurology' },
    { id: 'surgery', labelUz: 'Jarrohlik', labelRu: 'Хирургия', labelEn: 'Surgery' },
    { id: 'pediatrics', labelUz: 'Pediatriya', labelRu: 'Педиатрия', labelEn: 'Pediatrics' },
    { id: 'dentistry', labelUz: 'Stomatologiya', labelRu: 'Стоматология', labelEn: 'Dentistry' },
    { id: 'diagnostics', labelUz: 'Diagnostika', labelRu: 'Диагностика', labelEn: 'Diagnostics' },
  ];

  const getDeptLabel = (dept) => {
    if (language === 'ru') return dept.labelRu;
    if (language === 'en') return dept.labelEn;
    return dept.labelUz;
  };

  const getDoctorSpecialty = (doc) => {
    if (language === 'ru') return doc.specialtyRu;
    if (language === 'en') return doc.specialtyEn;
    return doc.specialtyUz;
  };

  const getDoctorDays = (doc) => {
    if (language === 'ru') return doc.daysRu;
    if (language === 'en') return doc.daysEn;
    return doc.daysUz;
  };

  const filteredDoctors = doctors.filter(
    (doc) => selectedDept === 'all' || doc.category === selectedDept
  );

  return (
    <section id="doctors" className="py-16 sm:py-24 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400">
            {t('nav_doctors')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4 tracking-tight">
            {t('doctors_title')}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            {t('doctors_subtitle')}
          </p>
        </div>

        {/* Department Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDept(dept.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedDept === dept.id
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {getDeptLabel(dept)}
            </button>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doc) => {
            const specialty = getDoctorSpecialty(doc);
            const days = getDoctorDays(doc);

            return (
              <div
                key={doc.id}
                className="group rounded-3xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Doctor Image Header */}
                  <div className="relative h-64 overflow-hidden bg-slate-200 dark:bg-slate-800">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                    {/* Rating Pill */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 dark:text-white shadow">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>{doc.rating}</span>
                      <span className="text-[10px] text-slate-500">({doc.reviewsCount})</span>
                    </div>

                    {/* Experience Tag */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-sky-600/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-xs font-semibold">
                      <Award className="w-3.5 h-3.5" />
                      <span>{doc.experience} {t('doctors_experience')}</span>
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-sky-600 dark:text-sky-400 font-semibold mb-4">
                      {specialty}
                    </p>

                    <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span>{days}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>Onlayn va statsionar konsultatsiya</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer fee & book button */}
                <div className="px-6 pb-6 pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{t('doctors_fee')}</div>
                    <div className="text-base font-black text-slate-900 dark:text-white">{doc.fee}</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectDoctor(doc)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-md shadow-teal-500/20 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>{t('doctors_book_btn')}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
