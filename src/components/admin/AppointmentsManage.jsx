import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Search, 
  Filter, 
  Plus, 
  Check, 
  X, 
  Trash2, 
  CheckCircle2, 
  Calendar, 
  Send,
  Phone,
  Clock,
  User,
  AlertCircle
} from 'lucide-react';

export default function AppointmentsManage({ 
  appointments, 
  doctors, 
  services, 
  onUpdateStatus, 
  onDeleteAppointment,
  onAddAppointment 
}) {
  const { t } = useLanguage();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [doctorFilter, setDoctorFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New appointment form state
  const [newPatient, setNewPatient] = useState('');
  const [newPhone, setNewPhone] = useState('+998 ');
  const [newDoctor, setNewDoctor] = useState(doctors[0]?.name || '');
  const [newService, setNewService] = useState(services[0]?.nameUz || '');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newTime, setNewTime] = useState('11:00');
  const [newNotes, setNewNotes] = useState('');

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch = 
      apt.patientName.toLowerCase().includes(search.toLowerCase()) ||
      apt.phone.includes(search) ||
      apt.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    const matchesDoctor = doctorFilter === 'all' || apt.doctorName === doctorFilter;

    return matchesSearch && matchesStatus && matchesDoctor;
  });

  const handleCreateAppointment = (e) => {
    e.preventDefault();
    if (!newPatient.trim()) return;

    const newApt = {
      id: 'APT-' + Math.floor(1000 + Math.random() * 9000),
      patientName: newPatient.trim(),
      phone: newPhone.trim(),
      doctorName: newDoctor,
      serviceName: newService,
      date: newDate,
      time: newTime,
      status: 'confirmed',
      notes: newNotes.trim() || 'Qo\'lda kiritilgan qabul',
      createdAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      telegramSent: true,
    };

    onAddAppointment(newApt);
    setShowAddModal(false);
    setNewPatient('');
    setNewNotes('');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-700 dark:bg-teal-950/80 dark:text-teal-300">Tasdiqlandi</span>;
      case 'completed':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300">Yakunlandi</span>;
      case 'cancelled':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300">Bekor qilindi</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300">Kutilmoqda</span>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {t('admin_nav_appointments')}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Jami {appointments.length} ta qabul mavjud ({filteredAppointments.length} ta ko'rsatilyapti)
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-md shadow-teal-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{t('admin_add_appointment')}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-3">
        
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('admin_search_placeholder')}
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Status Filter */}
        <div className="w-full md:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">{t('admin_filter_all')}</option>
            <option value="pending">{t('admin_status_pending')}</option>
            <option value="confirmed">{t('admin_status_confirmed')}</option>
            <option value="completed">{t('admin_status_completed')}</option>
            <option value="cancelled">{t('admin_status_cancelled')}</option>
          </select>
        </div>

        {/* Doctor Filter */}
        <div className="w-full md:w-56">
          <select
            value={doctorFilter}
            onChange={(e) => setDoctorFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">{t('admin_filter_doctor')}</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Appointments Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-4 py-3.5">ID</th>
                <th className="px-4 py-3.5">{t('admin_col_patient')}</th>
                <th className="px-4 py-3.5">{t('admin_col_doctor')}</th>
                <th className="px-4 py-3.5">{t('admin_col_service')}</th>
                <th className="px-4 py-3.5">{t('admin_col_datetime')}</th>
                <th className="px-4 py-3.5">Izoh</th>
                <th className="px-4 py-3.5">{t('admin_col_status')}</th>
                <th className="px-4 py-3.5 text-right">{t('admin_col_actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredAppointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-4 font-mono font-bold text-sky-600 dark:text-sky-400 whitespace-nowrap">
                    {apt.id}
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-bold text-slate-900 dark:text-white text-sm">{apt.patientName}</div>
                    <a href={`tel:${apt.phone}`} className="text-slate-500 hover:text-sky-600 flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>{apt.phone}</span>
                    </a>
                  </td>
                  <td className="px-4 py-4 font-semibold text-slate-700 dark:text-slate-300">
                    {apt.doctorName}
                  </td>
                  <td className="px-4 py-4 text-slate-600 dark:text-slate-400 max-w-[180px] truncate" title={apt.serviceName}>
                    {apt.serviceName}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="font-bold text-slate-800 dark:text-slate-200">{apt.date}</div>
                    <div className="text-teal-600 dark:text-teal-400 font-semibold">{apt.time}</div>
                  </td>
                  <td className="px-4 py-4 text-slate-500 max-w-[140px] truncate" title={apt.notes || '-'}>
                    {apt.notes || '-'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {getStatusBadge(apt.status)}
                  </td>
                  <td className="px-4 py-4 text-right whitespace-nowrap space-x-1">
                    {apt.status !== 'confirmed' && (
                      <button
                        onClick={() => onUpdateStatus(apt.id, 'confirmed')}
                        title={t('admin_action_confirm')}
                        className="p-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 hover:bg-teal-100 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    {apt.status !== 'completed' && (
                      <button
                        onClick={() => onUpdateStatus(apt.id, 'completed')}
                        title={t('admin_action_complete')}
                        className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}
                    {apt.status !== 'cancelled' && (
                      <button
                        onClick={() => onUpdateStatus(apt.id, 'cancelled')}
                        title={t('admin_action_cancel')}
                        className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 hover:bg-amber-100 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => onDeleteAppointment(apt.id)}
                      title={t('admin_action_delete')}
                      className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredAppointments.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-slate-400">
                    Mos keluvchi qabullar topilmadi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Walk-in Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t('admin_add_appointment')}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAppointment} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Bemor Ismi va Familiyasi *
                </label>
                <input
                  type="text"
                  required
                  value={newPatient}
                  onChange={(e) => setNewPatient(e.target.value)}
                  placeholder="Masalan: Aziz Rahimov"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Telefon raqami *
                </label>
                <input
                  type="tel"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Shifokor
                  </label>
                  <select
                    value={newDoctor}
                    onChange={(e) => setNewDoctor(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {doctors.map((d) => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Xizmat turi
                  </label>
                  <select
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.nameUz}>{s.nameUz}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Sana
                  </label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Vaqt
                  </label>
                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Qo'shimcha izoh
                </label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Kasalxona qabuli yoki maxsus ko'rsatma..."
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 shadow-md"
              >
                Qabulni saqlash
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
