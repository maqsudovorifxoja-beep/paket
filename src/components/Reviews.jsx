import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export default function Reviews({ reviews }) {
  const { language, t } = useLanguage();

  const getReviewName = (r) => {
    if (language === 'ru') return r.nameRu;
    if (language === 'en') return r.nameEn;
    return r.nameUz;
  };

  const getReviewRole = (r) => {
    if (language === 'ru') return r.roleRu;
    if (language === 'en') return r.roleEn;
    return r.roleUz;
  };

  const getReviewComment = (r) => {
    if (language === 'ru') return r.commentRu;
    if (language === 'en') return r.commentEn;
    return r.commentUz;
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">
            {t('nav_reviews')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4 tracking-tight">
            {t('reviews_title')}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            {t('reviews_subtitle')}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r) => {
            const name = getReviewName(r);
            const role = getReviewRole(r);
            const comment = getReviewComment(r);

            return (
              <div
                key={r.id}
                className="relative rounded-3xl p-7 bg-slate-50 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <Quote className="w-10 h-10 text-sky-500/20 mb-4" />
                  
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < r.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300 dark:text-slate-700'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic mb-6">
                    "{comment}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    </h4>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {role}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">{r.date}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
