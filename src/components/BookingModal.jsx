import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { sendAppointmentToTelegram } from '../services/telegramService';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  FileText, 
  Send, 
  CheckCircle, 
  Loader2, 
  Sparkles,
  PhoneCall
} from 'lucide-react';

export default function BookingModal({ 
  isOpen, 
  onClose, 
  doctors, 
  services, 
  preselectedDoctor, 
  preselectedService,
  onAppointmentCreated 
}) {
  const { language, t } = useLanguage();

  const [doctorId, setDoctorId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00');
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const timeSlots = ['09:00', '10:00', '11:30', '14:00', '15:30', '16:30', '17:30'];

  // Sync preselected props when modal opens
  useEffect(() => {
    if (isOpen) {
      if (preselectedDoctor) {
        setDoctorId(preselectedDoctor.id);
      } else if (doctors.length > 0 && !doctorId) {
        setDoctorId(doctors[0].id);
      }

      if (preselectedService) {
        setServiceId(preselectedService.id);
      } else if (services.length > 0 && !serviceId) {
        setServiceId(services[0].id);
      }

      // Default date to tomorrow if not set
      if (!date) {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        setDate(d.toISOString().split('T')[0]);
      }

      setSuccessData(null);
      setErrorMsg('');
    }
  }, [isOpen, preselectedDoctor, preselectedService, doctors, services]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!patientName.trim()) {
      setErrorMsg("Iltimos, ism va familiyangizni kiriting.");
      return;
    }

    if (!phone || phone.trim().length < 9) {
      setErrorMsg("Iltimos, to'g'ri telefon raqamingizni kiriting.");
      return;
    }

    const selectedDoc = doctors.find((d) => d.id === doctorId) || doctors[0];
    const selectedSrv = services.find((s) => s.id === serviceId) || services[0];

    setLoading(true);

    const newAppointment = {
      id: 'APT-' + Math.floor(1000 + Math.random() * 9000),
      patientName: patientName.trim(),
      phone: phone.trim(),
      doctorName: selectedDoc ? selectedDoc.name : 'Navbatchi shifokor',
      serviceName: selectedSrv ? (language === 'ru' ? selectedSrv.nameRu : language === 'en' ? selectedSrv.nameEn : selectedSrv.nameUz) : 'Umumiy ko\'rik',
      date: date || new Date().toISOString().split('T')[0],
      time: time || '10:00',
      status: 'pending',
      notes: notes.trim(),
      createdAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      telegramSent: false,
    };

    try {
      // 1. Send alert to Telegram API / reception group!
      const tgResult = await sendAppointmentToTelegram(newAppointment);
      if (tgResult && tgResult.success) {
        newAppointment.telegramSent = true;
      }

      // 2. Notify parent state so Admin Panel sees it live
      if (onAppointmentCreated) {
        onAppointmentCreated(newAppointment);
      }

      setSuccessData(newAppointment);
    } catch (err) {
      console.error(err);
      // Still show success since appointment is logged locally
      if (onAppointmentCreated) {
        onAppointmentCreated(newAppointment);
      }
      setSuccessData(newAppointment);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccessData(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="relative px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center text-white shadow-md">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t('booking_modal_title')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('booking_modal_subtitle')}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: Form or Success */}
        <div className="p-6">
          {successData ? (
            /* Success confirmation screen */
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle className="w-9 h-9" />
              </div>

              <div>
                <h4 className="text-xl font-black text-slate-900 dark:text-white">
                  {t('booking_success_title')}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-md mx-auto">
                  {t('booking_success_desc')}
                </p>
              </div>

              {/* Ticket Details Summary */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-left text-xs space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500">Buyurtma raqami:</span>
                  <span className="font-mono font-bold text-sky-600 dark:text-sky-400">{successData.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Bemor:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{successData.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Shifokor:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{successData.doctorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Xizmat:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{successData.serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Sana va vaqt:</span>
                  <span className="font-bold text-teal-600 dark:text-teal-400">{successData.date} | {successData.time}</span>
                </div>
              </div>

              {/* Telegram Confirmation Pill */}
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 p-2.5 rounded-xl border border-sky-200 dark:border-sky-800">
                <Send className="w-4 h-4" />
                <span>{t('booking_telegram_alert_hint')}</span>
              </div>

              <div className="pt-2 flex gap-3">
                <a
                  href="tel:+998712000000"
                  className="flex-1 py-3 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-500" />
                  <span>Tezkor qo'ng'iroq</span>
                </a>
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 shadow-md"
                >
                  {t('booking_success_btn')}
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 text-xs font-medium text-rose-700 bg-rose-50 dark:bg-rose-950/60 dark:text-rose-300 rounded-xl border border-rose-200 dark:border-rose-900">
                  {errorMsg}
                </div>
              )}

              {/* Doctor Select */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('booking_doctor_label')}
                </label>
                <select
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
                >
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({language === 'ru' ? d.specialtyRu : language === 'en' ? d.specialtyEn : d.specialtyUz})
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Select */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('booking_service_label')}
                </label>
                <select
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {language === 'ru' ? s.nameRu : language === 'en' ? s.nameEn : s.nameUz} — {s.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t('booking_date_label')}
                  </label>
                  <input
                    type="date"
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t('booking_time_label')}
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Patient Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('booking_name_label')} *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder={t('booking_name_placeholder')}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
              </div>

              {/* Patient Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('booking_phone_label')} *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t('booking_phone_placeholder')}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('booking_notes_label')}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t('booking_notes_placeholder')}
                  className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500 hover:from-sky-600 hover:via-teal-600 hover:to-emerald-600 shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t('booking_submitting')}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t('booking_submit')}</span>
                  </>
                )}
              </button>

              <div className="text-center text-[11px] text-slate-400">
                🔒 Shaxsiy ma'lumotlaringiz xavfsizligi kafolatlanadi.
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
