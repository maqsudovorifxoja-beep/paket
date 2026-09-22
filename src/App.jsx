import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

import { 
  initialDoctors, 
  initialServices, 
  initialAppointments, 
  patientReviews,
  initialPatients,
  initialLabTests,
  initialDoctorShifts,
  initialFinances
} from './data/clinicData';

// Public Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Doctors from './components/Doctors';
import TelegramPreview from './components/TelegramPreview';
import Reviews from './components/Reviews';
import Contacts from './components/Contacts';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

// Admin Components
import AdminLoginModal from './components/admin/AdminLoginModal';
import AdminLayout from './components/admin/AdminLayout';

function MainApp() {
  // Appointments state with persistence
  const [appointments, setAppointments] = useState(() => {
    try {
      const saved = localStorage.getItem('shifonur_appointments');
      return saved ? JSON.parse(saved) : initialAppointments;
    } catch {
      return initialAppointments;
    }
  });

  // Doctors state with persistence
  const [doctors, setDoctors] = useState(() => {
    try {
      const saved = localStorage.getItem('shifonur_doctors');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((d) =>
          d.id === 'doc-2' && (d.image.includes('unsplash') || !d.image.includes('nilufar'))
            ? { ...d, image: '/dr_nilufar_karimova.jpg' }
            : d
        );
      }
      return initialDoctors;
    } catch {
      return initialDoctors;
    }
  });

  // Services state with persistence
  const [services, setServices] = useState(() => {
    try {
      const saved = localStorage.getItem('shifonur_services');
      return saved ? JSON.parse(saved) : initialServices;
    } catch {
      return initialServices;
    }
  });

  // Patients state with persistence
  const [patients, setPatients] = useState(() => {
    try {
      const saved = localStorage.getItem('shifonur_patients');
      return saved ? JSON.parse(saved) : initialPatients;
    } catch {
      return initialPatients;
    }
  });

  // Laboratory tests state with persistence
  const [labTests, setLabTests] = useState(() => {
    try {
      const saved = localStorage.getItem('shifonur_labtests');
      return saved ? JSON.parse(saved) : initialLabTests;
    } catch {
      return initialLabTests;
    }
  });

  // Doctor shifts state with persistence
  const [shifts, setShifts] = useState(() => {
    try {
      const saved = localStorage.getItem('shifonur_shifts');
      return saved ? JSON.parse(saved) : initialDoctorShifts;
    } catch {
      return initialDoctorShifts;
    }
  });

  const finances = initialFinances;

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('shifonur_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('shifonur_doctors', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem('shifonur_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('shifonur_patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('shifonur_labtests', JSON.stringify(labTests));
  }, [labTests]);

  useEffect(() => {
    localStorage.setItem('shifonur_shifts', JSON.stringify(shifts));
  }, [shifts]);

  // Modal & View states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedDoctor, setPreselectedDoctor] = useState(null);
  const [preselectedService, setPreselectedService] = useState(null);

  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem('shifonur_admin_logged') === 'true';
  });
  const [isAdminView, setIsAdminView] = useState(false);

  // Booking handlers
  const handleOpenBooking = (doctor = null, service = null) => {
    setPreselectedDoctor(doctor);
    setPreselectedService(service);
    setIsBookingOpen(true);
  };

  const handleAppointmentCreated = (newApt) => {
    setAppointments((prev) => [newApt, ...prev]);
  };

  const handleUpdateStatus = (aptId, newStatus) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === aptId ? { ...apt, status: newStatus } : apt))
    );
  };

  const handleDeleteAppointment = (aptId) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== aptId));
  };

  const handleAddAppointment = (newApt) => {
    setAppointments((prev) => [newApt, ...prev]);
  };

  // Doctors handlers
  const handleAddDoctor = (newDoc) => {
    setDoctors((prev) => [newDoc, ...prev]);
  };

  const handleDeleteDoctor = (docId) => {
    setDoctors((prev) => prev.filter((d) => d.id !== docId));
  };

  const handleToggleDoctorStatus = (docId) => {
    setDoctors((prev) =>
      prev.map((d) =>
        d.id === docId
          ? { ...d, status: d.status === 'active' ? 'inactive' : 'active' }
          : d
      )
    );
  };

  // Services handlers
  const handleAddService = (newSrv) => {
    setServices((prev) => [newSrv, ...prev]);
  };

  const handleDeleteService = (srvId) => {
    setServices((prev) => prev.filter((s) => s.id !== srvId));
  };

  // Patients handlers
  const handleAddPatient = (newP) => {
    setPatients((prev) => [newP, ...prev]);
  };

  const handleDeletePatient = (id) => {
    setPatients((prev) => prev.filter(p => p.id !== id));
  };

  // Lab Tests handlers
  const handleAddLabTest = (newT) => {
    setLabTests((prev) => [newT, ...prev]);
  };

  const handleUpdateLabTest = (id, updates) => {
    setLabTests((prev) => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  // Shifts handlers
  const handleToggleShiftDuty = (id) => {
    setShifts((prev) => prev.map(s => s.id === id ? { ...s, onDuty: !s.onDuty } : s));
  };

  const handleUpdateShift = (id, updates) => {
    setShifts((prev) => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const handleAddShift = (newS) => {
    setShifts((prev) => [newS, ...prev]);
  };

  // Admin access handlers
  const handleOpenAdmin = () => {
    if (isAdminLoggedIn) {
      setIsAdminView(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    sessionStorage.setItem('shifonur_admin_logged', 'true');
    setIsAdminLoginOpen(false);
    setIsAdminView(true);
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('shifonur_admin_logged');
    setIsAdminView(false);
  };

  // If Admin View is active, render the dedicated Admin Dashboard
  if (isAdminView && isAdminLoggedIn) {
    return (
      <AdminLayout
        onClose={() => setIsAdminView(false)}
        onLogout={handleLogout}
        appointments={appointments}
        doctors={doctors}
        services={services}
        patients={patients}
        onAddPatient={handleAddPatient}
        onDeletePatient={handleDeletePatient}
        finances={finances}
        labTests={labTests}
        onUpdateLabTest={handleUpdateLabTest}
        onAddLabTest={handleAddLabTest}
        shifts={shifts}
        onToggleShiftDuty={handleToggleShiftDuty}
        onUpdateShift={handleUpdateShift}
        onAddShift={handleAddShift}
        onUpdateStatus={handleUpdateStatus}
        onDeleteAppointment={handleDeleteAppointment}
        onAddAppointment={handleAddAppointment}
        onAddDoctor={handleAddDoctor}
        onDeleteDoctor={handleDeleteDoctor}
        onToggleDoctorStatus={handleToggleDoctorStatus}
        onAddService={handleAddService}
        onDeleteService={handleDeleteService}
      />
    );
  }

  // Public Clinic Landing Page & Portal
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors selection:bg-sky-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        <Hero
          onOpenBooking={() => handleOpenBooking()}
        />

        <Services
          services={services}
          onSelectService={(srv) => handleOpenBooking(null, srv)}
        />

        <Doctors
          doctors={doctors}
          onSelectDoctor={(doc) => handleOpenBooking(doc, null)}
        />

        <TelegramPreview
          onOpenBooking={() => handleOpenBooking()}
        />

        <Reviews
          reviews={patientReviews}
        />

        <Contacts />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Online Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        doctors={doctors}
        services={services}
        preselectedDoctor={preselectedDoctor}
        preselectedService={preselectedService}
        onAppointmentCreated={handleAppointmentCreated}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MainApp />
      </LanguageProvider>
    </ThemeProvider>
  );
}
