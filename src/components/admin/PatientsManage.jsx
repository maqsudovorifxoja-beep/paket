import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Search, 
  UserPlus, 
  Download, 
  FileText, 
  Phone, 
  AlertTriangle, 
  Heart, 
  Calendar, 
  X, 
  User, 
  Trash2, 
  CheckCircle2 
} from 'lucide-react';

export default function PatientsManage({ patients, onAddPatient, onDeletePatient }) {
  const { t } = useLanguage();

  const [search, setSearch] = useState('');
  const [bloodFilter, setBloodFilter] = useState('all');
  const [selectedPatientCard, setSelectedPatientCard] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New patient state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState('Erkak');
  const [bloodGroup, setBloodGroup] = useState('A (II) Rh+');
  const [allergies, setAllergies] = useState('Yo\'q');
  const [address, setAddress] = useState('Toshkent shahri');

  const filteredPatients = patients.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    const matchesBlood = bloodFilter === 'all' || p.bloodGroup.includes(bloodFilter);
    return matchesSearch && matchesBlood;
  });

  const handleCreatePatient = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newPatient = {
      id: 'PAT-' + Math.floor(100 + Math.random() * 900),
      name: name.trim(),
      phone: phone.trim(),
      age: Number(age) || 25,
      gender,
      bloodGroup,
      allergies: allergies.trim() || 'Yo\'q',
      totalVisits: 1,
      lastVisit: new Date().toISOString().split('T')[0],
      status: 'Kuzatuvda',
      address: address.trim(),
      history: [
        {
          date: new Date().toISOString().split('T')[0],
          doctor: 'Birlamchi ko\'rik shifokori',
          diagnosis: 'Birlamchi ro\'yxatga olish kartasi ochildi',
          prescription: 'Umumiy profilaktik ko\'rik tavsiya etildi'
        }
      ]
    };

    onAddPatient(newPatient);
    setShowAddModal(false);
    setName('');
    setPhone('+998 ');
  };

  const handleExportCSV = () => {
    const headers = ["ID,Ism Familiya,Telefon,Yoshi,Jinsi,Qon guruhi,Allergiyalar,Tashriflar soni,Oxirgi tashrif\n"];
    const rows = filteredPatients.map(p => 
      `"${p.id}","${p.name}","${p.phone}","${p.age}","${p.gender}","${p.bloodGroup}","${p.allergies}","${p.totalVisits}","${p.lastVisit}"\n`
    );
    const blob = new Blob([...headers, ...rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ShifoNur_Bemorlar_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Bemorlar Bazasi (CRM & Elektron Tibbiy Kartalar)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Ro'yxatga olingan barcha bemorlar, kasallik tarixi, qon guruhi va tibbiy kartalari
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition-colors shadow-xs"
          >
            <Download className="w-4 h-4 text-sky-500" />
            <span>CSV Eksport</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 shadow-md transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Yangi Bemor Qo'shish</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Bemor ismi, telefoni yoki ID bo'yicha qidiruv..."
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="w-full sm:w-52">
          <select
            value={bloodFilter}
            onChange={(e) => setBloodFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">Barcha qon guruhlari</option>
            <option value="A">A (II) guruhi</option>
            <option value="B">B (III) guruhi</option>
            <option value="AB">AB (IV) guruhi</option>
            <option value="O">O (I) guruhi</option>
          </select>
        </div>
      </div>

      {/* Patients Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-4 py-3.5">ID</th>
                <th className="px-4 py-3.5">Bemor F.I.Sh</th>
                <th className="px-4 py-3.5">Yosh / Jins</th>
                <th className="px-4 py-3.5">Qon guruhi</th>
                <th className="px-4 py-3.5">Allergiyalar</th>
                <th className="px-4 py-3.5">Tashriflar</th>
                <th className="px-4 py-3.5">Oxirgi qabul</th>
                <th className="px-4 py-3.5 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredPatients.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3.5 font-mono font-bold text-sky-600 dark:text-sky-400 whitespace-nowrap">
                    {p.id}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="font-bold text-slate-900 dark:text-white text-sm">{p.name}</div>
                    <a href={`tel:${p.phone}`} className="text-slate-400 hover:text-sky-500 flex items-center gap-1 text-[11px] mt-0.5">
                      <Phone className="w-3 h-3" />
                      <span>{p.phone}</span>
                    </a>
                  </td>
                  <td className="px-4 py-3.5 font-medium text-slate-700 dark:text-slate-300">
                    {p.age} yosh • {p.gender}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="px-2 py-0.5 rounded-md font-bold text-[11px] bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
                      {p.bloodGroup}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 max-w-[140px] truncate text-slate-600 dark:text-slate-400" title={p.allergies}>
                    {p.allergies === 'Yo\'q' ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">Yo'q</span>
                    ) : (
                      <span className="text-amber-600 dark:text-amber-400 font-semibold">{p.allergies}</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">
                    {p.totalVisits} marta
                  </td>
                  <td className="px-4 py-3.5 font-medium text-slate-500">
                    {p.lastVisit}
                  </td>
                  <td className="px-4 py-3.5 text-right whitespace-nowrap space-x-1.5">
                    <button
                      onClick={() => setSelectedPatientCard(p)}
                      className="px-2.5 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-bold text-xs hover:bg-teal-100 transition-colors inline-flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Karta</span>
                    </button>
                    <button
                      onClick={() => onDeletePatient(p.id)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="O'chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredPatients.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-slate-400">
                    Mos keluvchi bemor topilmadi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Medical Card Modal */}
      {selectedPatientCard && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
                  {selectedPatientCard.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {selectedPatientCard.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Tibbiy Karta: <span className="font-mono font-bold text-teal-600">{selectedPatientCard.id}</span> • {selectedPatientCard.phone}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedPatientCard(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-xs">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Yoshi / Jinsi</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{selectedPatientCard.age} yosh ({selectedPatientCard.gender})</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-xs">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Qon guruhi</span>
                <span className="font-bold text-rose-600">{selectedPatientCard.bloodGroup}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-xs">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Allergiyalar</span>
                <span className="font-bold text-amber-600">{selectedPatientCard.allergies}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-xs">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Manzil</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 truncate block">{selectedPatientCard.address}</span>
              </div>
            </div>

            {/* Clinical History Timeline */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-600" />
                <span>Davolanish & Tashxislar Tarixi:</span>
              </h4>

              <div className="space-y-3">
                {selectedPatientCard.history?.map((h, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-bold text-teal-600 dark:text-teal-400">{h.doctor}</span>
                      <span>{h.date}</span>
                    </div>
                    <div className="font-extrabold text-slate-900 dark:text-white">
                      Tashxis: <span className="font-normal text-slate-700 dark:text-slate-300">{h.diagnosis}</span>
                    </div>
                    <div className="text-slate-600 dark:text-slate-300">
                      Tayinlangan dori-darmon: <span className="font-medium text-emerald-600 dark:text-emerald-400">{h.prescription}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <a
                href={`tel:${selectedPatientCard.phone}`}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-teal-500" />
                <span>Qo'ng'iroq</span>
              </a>
              <button
                onClick={() => setSelectedPatientCard(null)}
                className="px-5 py-2 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-500"
              >
                Yopish
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Yangi Bemor Ro'yxatdan O'tkazish</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-slate-400"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleCreatePatient} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">F.I.Sh *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masalan: Azizbek Alimov"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Telefon raqami *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Yoshi</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Jinsi</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                  >
                    <option value="Erkak">Erkak</option>
                    <option value="Ayol">Ayol</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Qon guruhi</label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                  >
                    <option value="O (I) Rh+">O (I) Rh+</option>
                    <option value="O (I) Rh-">O (I) Rh-</option>
                    <option value="A (II) Rh+">A (II) Rh+</option>
                    <option value="A (II) Rh-">A (II) Rh-</option>
                    <option value="B (III) Rh+">B (III) Rh+</option>
                    <option value="B (III) Rh-">B (III) Rh-</option>
                    <option value="AB (IV) Rh+">AB (IV) Rh+</option>
                    <option value="AB (IV) Rh-">AB (IV) Rh-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Allergiyalar</label>
                  <input
                    type="text"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    placeholder="Masalan: Penitsillin"
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Yashash manzili</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Toshkent sh., Chilonzor..."
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-teal-500 to-emerald-600 shadow-md cursor-pointer"
              >
                Kartani Saqlash
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
