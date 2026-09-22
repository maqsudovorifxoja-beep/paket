import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Plus, Trash2, CheckCircle2, AlertCircle, X, Award, Star, UserPlus } from 'lucide-react';

export default function DoctorsManage({ doctors, onAddDoctor, onDeleteDoctor, onToggleDoctorStatus }) {
  const { language, t } = useLanguage();
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState('');
  const [specialtyUz, setSpecialtyUz] = useState('');
  const [category, setCategory] = useState('cardiology');
  const [experience, setExperience] = useState(10);
  const [fee, setFee] = useState('200,000 UZS');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600');

  const handleAddDoctor = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newDoc = {
      id: 'doc-' + Date.now(),
      name: name.trim(),
      specialtyUz: specialtyUz.trim() || 'Oliy toifali shifokor',
      specialtyRu: specialtyUz.trim() || 'Врач высшей категории',
      specialtyEn: specialtyUz.trim() || 'Specialist Doctor',
      category,
      experience: Number(experience) || 5,
      rating: 5.0,
      reviewsCount: 1,
      fee,
      daysUz: "Dush - Juma (09:00 - 16:00)",
      daysRu: "Пн - Пт (09:00 - 16:00)",
      daysEn: "Mon - Fri (09:00 - 16:00)",
      image: image || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
      status: 'active'
    };

    onAddDoctor(newDoc);
    setShowModal(false);
    setName('');
    setSpecialtyUz('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {t('admin_nav_doctors')}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Klinikaning barcha malakali shifokorlari ro'yxati va ularning bandlik holati
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 shadow-md transition-all cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Yangi shifokor qo'shish</span>
        </button>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <div
            key={doc.id}
            className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500/20"
                />
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{doc.name}</h3>
                  <p className="text-xs text-teal-600 dark:text-teal-400 font-medium">{doc.specialtyUz}</p>
                  <div className="flex items-center gap-1 text-[11px] text-amber-500 mt-0.5">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{doc.rating} ({doc.reviewsCount} sharh)</span>
                  </div>
                </div>
              </div>

              <div className="text-xs space-y-1 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl mb-4">
                <div>Tajriba: <span className="font-semibold text-slate-800 dark:text-slate-200">{doc.experience} yil</span></div>
                <div>Qabul narxi: <span className="font-semibold text-slate-800 dark:text-slate-200">{doc.fee}</span></div>
                <div>Kunlar: <span className="font-medium text-slate-800 dark:text-slate-200">{doc.daysUz}</span></div>
              </div>
            </div>

            {/* Status toggle & delete */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => onToggleDoctorStatus(doc.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  doc.status === 'active'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                }`}
              >
                {doc.status === 'active' ? '● Qabulda (Faol)' : '○ Ta\'tilda'}
              </button>

              <button
                onClick={() => onDeleteDoctor(doc.id)}
                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                title="O'chirish"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add Doctor */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Yangi Shifokor Qo'shish</h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-slate-400"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleAddDoctor} className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">Shifokor F.I.Sh *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. Ism Familiya"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">Mutaxassisligi *</label>
                <input
                  type="text"
                  required
                  value={specialtyUz}
                  onChange={(e) => setSpecialtyUz(e.target.value)}
                  placeholder="Bosh Kardiolog, tibbiyot fanlari nomzodi"
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
                    <option value="cardiology">Kardiologiya</option>
                    <option value="neurology">Nevrologiya</option>
                    <option value="surgery">Jarrohlik</option>
                    <option value="pediatrics">Pediatriya</option>
                    <option value="dentistry">Stomatologiya</option>
                    <option value="diagnostics">Diagnostika</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">Tajriba (yil)</label>
                  <input
                    type="number"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">Qabul narxi</label>
                <input
                  type="text"
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
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
