import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Clock, 
  DoorOpen, 
  Calendar, 
  UserCheck, 
  AlertCircle, 
  Plus, 
  Edit3, 
  X, 
  CheckCircle2 
} from 'lucide-react';

export default function DoctorShiftsManage({ shifts, onToggleShiftDuty, onUpdateShift, onAddShift, doctors }) {
  const { t } = useLanguage();

  const [editingShift, setEditingShift] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Edit state
  const [room, setRoom] = useState('');
  const [shiftHours, setShiftHours] = useState('');
  const [days, setDays] = useState('');

  // Add state
  const [newDoctorName, setNewDoctorName] = useState(doctors[0]?.name || '');
  const [newSpecialty, setNewSpecialty] = useState('Bosh Kardiolog');
  const [newRoom, setNewRoom] = useState('105-xona');
  const [newHours, setNewHours] = useState('09:00 - 16:00');
  const [newDays, setNewDays] = useState('Dush - Juma');

  const handleStartEdit = (shf) => {
    setEditingShift(shf);
    setRoom(shf.room);
    setShiftHours(shf.shift);
    setDays(shf.days);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingShift) return;

    onUpdateShift(editingShift.id, {
      room,
      shift: shiftHours,
      days
    });
    setEditingShift(null);
  };

  const handleCreateShift = (e) => {
    e.preventDefault();

    const newShf = {
      id: 'SHF-' + Date.now(),
      doctorId: 'doc-' + Date.now(),
      doctorName: newDoctorName,
      specialty: newSpecialty,
      room: newRoom,
      shift: newHours,
      days: newDays,
      onDuty: true
    };

    onAddShift(newShf);
    setShowAddModal(false);
  };

  const onDutyCount = shifts.filter(s => s.onDuty).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Shifokorlar Ish Jadvali va Xonalar (Navbatchilik)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Hozirda {shifts.length} ta shifokordan <span className="font-bold text-emerald-600 dark:text-emerald-400">{onDutyCount} nafari navbatchi</span> qabulda
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Jadvalga Qo'shish</span>
        </button>
      </div>

      {/* Shifts Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shifts.map((shf) => (
          <div
            key={shf.id}
            className={`rounded-3xl border p-6 flex flex-col justify-between transition-all duration-200 shadow-sm ${
              shf.onDuty
                ? 'bg-white dark:bg-slate-900 border-teal-500/40 dark:border-teal-500/30'
                : 'bg-slate-50/80 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-80'
            }`}
          >
            <div>
              {/* Room & Status Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs">
                  <DoorOpen className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  <span>{shf.room}</span>
                </div>

                <button
                  onClick={() => onToggleShiftDuty(shf.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    shf.onDuty
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                  title="Navbatchilikni o'zgartirish"
                >
                  {shf.onDuty ? '● Hozir qabulda' : '○ Dam olishda'}
                </button>
              </div>

              {/* Doctor Name & Specialty */}
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-0.5">
                {shf.doctorName}
              </h3>
              <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 mb-4">
                {shf.specialty}
              </p>

              {/* Shift Hours & Days */}
              <div className="space-y-2 text-xs bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Smena: <strong className="text-slate-900 dark:text-white">{shf.shift}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Qabul kunlari: <strong className="text-slate-900 dark:text-white">{shf.days}</strong></span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">
                ID: {shf.id}
              </span>
              <button
                onClick={() => handleStartEdit(shf)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Tahrirlash</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Edit Shift Modal */}
      {editingShift && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Smena va Xonani Tahrirlash ({editingShift.doctorName})
              </h3>
              <button onClick={() => setEditingShift(null)} className="p-1 text-slate-400"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Xona raqami va bo'lim</label>
                <input
                  type="text"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Ish smenasi (soatlar)</label>
                <input
                  type="text"
                  value={shiftHours}
                  onChange={(e) => setShiftHours(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Qabul kunlari</label>
                <input
                  type="text"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold shadow-md cursor-pointer"
                >
                  Saqlash
                </button>
                <button
                  type="button"
                  onClick={() => setEditingShift(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                >
                  Bekor qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Shift Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Jadvalga Yangi Smena Qo'shish</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-slate-400"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleCreateShift} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Shifokor</label>
                <select
                  value={newDoctorName}
                  onChange={(e) => setNewDoctorName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                >
                  {doctors.map(d => (
                    <option key={d.id} value={d.name}>{d.name} ({d.specialtyUz})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Xona raqami</label>
                <input
                  type="text"
                  value={newRoom}
                  onChange={(e) => setNewRoom(e.target.value)}
                  placeholder="204-xona"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Ish soatlari</label>
                  <input
                    type="text"
                    value={newHours}
                    onChange={(e) => setNewHours(e.target.value)}
                    placeholder="09:00 - 16:00"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Kunlar</label>
                  <input
                    type="text"
                    value={newDays}
                    onChange={(e) => setNewDays(e.target.value)}
                    placeholder="Dush - Shan"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-teal-500 to-emerald-600 shadow-md cursor-pointer mt-2"
              >
                Jadvalga Kiritish
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
