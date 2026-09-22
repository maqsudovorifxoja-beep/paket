import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Plus, Trash2, Clock, X, Sparkles } from 'lucide-react';

export default function ServicesManage({ services, onAddService, onDeleteService }) {
  const { t } = useLanguage();
  const [showModal, setShowModal] = useState(false);

  const [nameUz, setNameUz] = useState('');
  const [category, setCategory] = useState('diagnostics');
  const [price, setPrice] = useState('250,000 UZS');
  const [duration, setDuration] = useState(30);
  const [descUz, setDescUz] = useState('');

  const handleAddService = (e) => {
    e.preventDefault();
    if (!nameUz.trim()) return;

    const newSrv = {
      id: 'srv-' + Date.now(),
      nameUz: nameUz.trim(),
      nameRu: nameUz.trim(),
      nameEn: nameUz.trim(),
      category,
      price,
      duration: Number(duration) || 30,
      descUz: descUz.trim() || 'Klinikamizning professional tibbiy xizmati.',
      descRu: descUz.trim() || 'Профессиональная медицинская услуга нашей клиники.',
      descEn: descUz.trim() || 'Professional clinical service at our medical center.',
      icon: 'Activity'
    };

    onAddService(newSrv);
    setShowModal(false);
    setNameUz('');
    setDescUz('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {t('admin_nav_services')}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Klinikada ko'rsatiladigan barcha tibbiy xizmatlar, narxlar va davomiyligi
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi xizmat qo'shish</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400">
                  {srv.category}
                </span>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{srv.duration} daqiqa</span>
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {srv.nameUz}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                {srv.descUz}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Narxi</span>
                <span className="text-sm font-black text-sky-600 dark:text-sky-400">{srv.price}</span>
              </div>

              <button
                onClick={() => onDeleteService(srv.id)}
                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                title="O'chirish"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add Service */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Yangi Xizmat Qo'shish</h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-slate-400"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleAddService} className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">Xizmat nomi *</label>
                <input
                  type="text"
                  required
                  value={nameUz}
                  onChange={(e) => setNameUz(e.target.value)}
                  placeholder="Masalan: Qorin bo'shlig'i UZI"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">Bo'lim</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                  >
                    <option value="diagnostics">Diagnostika</option>
                    <option value="cardiology">Kardiologiya</option>
                    <option value="neurology">Nevrologiya</option>
                    <option value="pediatrics">Pediatriya</option>
                    <option value="dentistry">Stomatologiya</option>
                    <option value="laboratory">Laboratoriya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">Davomiyligi (daqiqa)</label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">Narxi</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="150,000 UZS"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">Tavsifi</label>
                <textarea
                  rows={2}
                  value={descUz}
                  onChange={(e) => setDescUz(e.target.value)}
                  placeholder="Xizmat haqida qisqacha ma'lumot..."
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-teal-500 to-emerald-600 shadow-md cursor-pointer"
              >
                Saqlash
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
