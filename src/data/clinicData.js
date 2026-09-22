export const initialDoctors = [
  {
    id: "doc-1",
    name: "Dr. Alisher Qosimov",
    specialtyUz: "Bosh Kardiolog, Tibbiyot Fanlari Nomzodi",
    specialtyRu: "Главный Кардиолог, К.М.Н.",
    specialtyEn: "Head Cardiologist, MD PhD",
    category: "cardiology",
    experience: 16,
    rating: 4.95,
    reviewsCount: 142,
    fee: "250,000 UZS",
    daysUz: "Dush, Chor, Juma (09:00 - 15:00)",
    daysRu: "Пн, Ср, Пт (09:00 - 15:00)",
    daysEn: "Mon, Wed, Fri (09:00 - 15:00)",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
    status: "active",
  },
  {
    id: "doc-2",
    name: "Dr. Nilufar Karimova",
    specialtyUz: "Oliy toifali Nevrolog, Somnolog",
    specialtyRu: "Невролог высшей категории, Сомнолог",
    specialtyEn: "Senior Neurologist & Somnologist",
    category: "neurology",
    experience: 12,
    rating: 4.92,
    reviewsCount: 98,
    fee: "200,000 UZS",
    daysUz: "Sesh, Pay, Shan (10:00 - 16:00)",
    daysRu: "Вт, Чт, Сб (10:00 - 16:00)",
    daysEn: "Tue, Thu, Sat (10:00 - 16:00)",
    image: "/dr_nilufar_karimova.jpg",
    status: "active",
  },
  {
    id: "doc-3",
    name: "Dr. Bobur Mirzayev",
    specialtyUz: "Yetakchi Jarroh-Endoskopist",
    specialtyRu: "Ведущий Хирург-Эндоскопист",
    specialtyEn: "Lead Surgeon & Endoscopist",
    category: "surgery",
    experience: 18,
    rating: 4.98,
    reviewsCount: 215,
    fee: "300,000 UZS",
    daysUz: "Dush, Sesh, Paysh (08:30 - 14:00)",
    daysRu: "Пн, Вт, Чт (08:30 - 14:00)",
    daysEn: "Mon, Tue, Thu (08:30 - 14:00)",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600",
    status: "active",
  },
  {
    id: "doc-4",
    name: "Dr. Zarina Rustamova",
    specialtyUz: "Pediatr, Bolalar Immunologi",
    specialtyRu: "Педиатр, Детский Иммунолог",
    specialtyEn: "Pediatrician & Child Immunologist",
    category: "pediatrics",
    experience: 10,
    rating: 4.89,
    reviewsCount: 164,
    fee: "180,000 UZS",
    daysUz: "Har kuni (09:00 - 17:00)",
    daysRu: "Ежедневно (09:00 - 17:00)",
    daysEn: "Daily (09:00 - 17:00)",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
    status: "active",
  },
  {
    id: "doc-5",
    name: "Dr. Jamshid Shokirov",
    specialtyUz: "Stomatolog-Ortodont, Estetik tish shifokori",
    specialtyRu: "Стоматолог-Ортодонт, Эстетист",
    specialtyEn: "Orthodontist & Aesthetic Dentist",
    category: "dentistry",
    experience: 14,
    rating: 4.96,
    reviewsCount: 180,
    fee: "220,000 UZS",
    daysUz: "Dush - Shan (10:00 - 19:00)",
    daysRu: "Пн - Сб (10:00 - 19:00)",
    daysEn: "Mon - Sat (10:00 - 19:00)",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600",
    status: "active",
  },
  {
    id: "doc-6",
    name: "Dr. Shahlo Yo'ldosheva",
    specialtyUz: "UZI va Funksional Diagnostika Mutaxassisi",
    specialtyRu: "Врач УЗИ и Функциональной Диагностики",
    specialtyEn: "Ultrasound & Functional Diagnostics Specialist",
    category: "diagnostics",
    experience: 11,
    rating: 4.91,
    reviewsCount: 110,
    fee: "160,000 UZS",
    daysUz: "Dush, Chor, Shan (08:00 - 16:00)",
    daysRu: "Пн, Ср, Сб (08:00 - 16:00)",
    daysEn: "Mon, Wed, Sat (08:00 - 16:00)",
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=600",
    status: "active",
  }
];

export const initialServices = [
  {
    id: "srv-1",
    nameUz: "MRT Diagnostikasi (1.5 Tesla)",
    nameRu: "МРТ Диагностика (1.5 Тесла)",
    nameEn: "MRI Diagnostics (1.5 Tesla)",
    category: "diagnostics",
    price: "450,000 UZS",
    duration: 30,
    descUz: "Eng zamonaviy yuqori aniqlikdagi magnit-rezonans tomografiya tekshiruvi.",
    descRu: "Высокоточное обследование на современном аппарате МРТ последнего поколения.",
    descEn: "High-precision magnetic resonance imaging on state-of-the-art scanner.",
    icon: "Activity",
  },
  {
    id: "srv-2",
    nameUz: "Yurak EKG va Ekokardiografiya",
    nameRu: "ЭКГ и Эхокардиография Сердца",
    nameEn: "ECG & Heart Echocardiography",
    category: "cardiology",
    price: "220,000 UZS",
    duration: 25,
    descUz: "Yurak qon-tomir tizimining to'liq instrumental diagnostikasi.",
    descRu: "Полная инструментальная диагностика сердечно-сосудистой системы.",
    descEn: "Comprehensive instrumental diagnostics of the cardiovascular system.",
    icon: "HeartPulse",
  },
  {
    id: "srv-3",
    nameUz: "3D/4D Rangli UZI Tekshiruvi",
    nameRu: "Цветное 3D/4D УЗИ Исследование",
    nameEn: "3D/4D Color Ultrasound Examination",
    category: "diagnostics",
    price: "180,000 UZS",
    duration: 20,
    descUz: "Qorin bo'shlig'i, qalqonsimon bez va barcha a'zolar skanerlashi.",
    descRu: "Сканирование органов брюшной полости, щитовидной железы и др.",
    descEn: "Advanced ultrasound scans of abdominal organs, thyroid, and soft tissues.",
    icon: "Scan",
  },
  {
    id: "srv-4",
    nameUz: "Bolalar Profilaktik Ko'rigi (Check-up)",
    nameRu: "Детский Профилактический Check-up",
    nameEn: "Pediatric Health Check-up",
    category: "pediatrics",
    price: "350,000 UZS",
    duration: 45,
    descUz: "Pediatr, LOR va nevrolog ko'rigi hamda asosiy qon tahlillari to'plami.",
    descRu: "Комплексный осмотр педиатра, ЛОРа, невролога и базовые анализы.",
    descEn: "Comprehensive consultation with pediatrician, ENT, and pediatric screening tests.",
    icon: "Baby",
  },
  {
    id: "srv-5",
    nameUz: "Tishlarni Lazerli Oqartirish & Tozalash",
    nameRu: "Лазерное Отбеливание и Чистка Зубов",
    nameEn: "Laser Teeth Whitening & Deep Cleaning",
    category: "dentistry",
    price: "500,000 UZS",
    duration: 40,
    descUz: "Air-Flow va ultratovush yordamida tish toshlarini og'riqsiz tozalash.",
    descRu: "Безболезненное удаление зубного камня методом Air-Flow и ультразвуком.",
    descEn: "Painless dental calculus removal using Air-Flow and ultrasonic scaling.",
    icon: "Smile",
  },
  {
    id: "srv-6",
    nameUz: "Umumiy Kengaytirilgan Qon Tahlili",
    nameRu: "Развернутый Анализ Крови (Express)",
    nameEn: "Comprehensive Blood Test (Express)",
    category: "laboratory",
    price: "95,000 UZS",
    duration: 15,
    descUz: "Avtomatlashtirilgan laboratoriyada 2 soat ichida aniq natija va Telegramga yuborish.",
    descRu: "Точный результат в автоматизированной лаборатории за 2 часа с отправкой в Telegram.",
    descEn: "Accurate automated lab results ready in 2 hours with Telegram dispatch.",
    icon: "FlaskConical",
  }
];

export const initialAppointments = [
  {
    id: "APT-1082",
    patientName: "Otabek Rahimov",
    phone: "+998 90 912 34 56",
    doctorName: "Dr. Alisher Qosimov",
    serviceName: "Yurak EKG va Ekokardiografiya",
    date: "2026-09-23",
    time: "10:30",
    status: "confirmed", // pending, confirmed, completed, cancelled
    notes: "Yurak sohasida vaqti-vaqti bilan sanchish bezovta qilmoqda.",
    createdAt: "2026-09-22 17:40",
    telegramSent: true,
  },
  {
    id: "APT-1083",
    patientName: "Dilfuza Salimova",
    phone: "+998 97 450 88 12",
    doctorName: "Dr. Nilufar Karimova",
    serviceName: "MRT Diagnostikasi (1.5 Tesla)",
    date: "2026-09-23",
    time: "14:00",
    status: "pending",
    notes: "Uzoq vaqtdan beri kuchli bosh og'rig'i bor.",
    createdAt: "2026-09-22 18:15",
    telegramSent: true,
  },
  {
    id: "APT-1084",
    patientName: "Farrux Zokirov",
    phone: "+998 93 333 44 55",
    doctorName: "Dr. Jamshid Shokirov",
    serviceName: "Tishlarni Lazerli Oqartirish & Tozalash",
    date: "2026-09-24",
    time: "11:00",
    status: "completed",
    notes: "Muntazam profilaktik tozalash.",
    createdAt: "2026-09-21 11:20",
    telegramSent: true,
  },
  {
    id: "APT-1085",
    patientName: "Madina Yusupova",
    phone: "+998 91 789 01 23",
    doctorName: "Dr. Zarina Rustamova",
    serviceName: "Bolalar Profilaktik Ko'rigi (Check-up)",
    date: "2026-09-25",
    time: "09:30",
    status: "pending",
    notes: "Farzandim 5 yoshda, bog'chaga chiqishdan oldin ko'rik.",
    createdAt: "2026-09-22 19:10",
    telegramSent: true,
  }
];

export const patientReviews = [
  {
    id: 1,
    nameUz: "Sardor Ahmedov",
    nameRu: "Сардор Ахмедов",
    nameEn: "Sardor Akhmedov",
    roleUz: "Bemor (Kardiologiya bo'limi)",
    roleRu: "Пациент (Отделение Кардиологии)",
    roleEn: "Patient (Cardiology Dept)",
    commentUz: "Dr. Alisher Qosimovga katta rahmat! 2 yil davomida bosimim ko'tarilib qiynalardim, bu yerda zamonaviy tekshiruvdan o'tib, to'g'ri davo oldim. Sayt orqali navbat olish va Telegram orqali eslatma kelishi juda qulay!",
    commentRu: "Огромная благодарность д-ру Алишеру Касымову! В течение 2 лет мучился с давлением, здесь прошел точную диагностику и получил правильное лечение. Очень удобно записываться на сайте и получать уведомление в Telegram!",
    commentEn: "Huge thanks to Dr. Alisher Qosimov! Suffered from blood pressure fluctuations for 2 years. Accurate diagnostics and personalized treatment here changed everything. Instant Telegram reminder is super convenient!",
    rating: 5,
    date: "2026-09-15"
  },
  {
    id: 2,
    nameUz: "Shahnoza To'rayeva",
    nameRu: "Шахноза Тураева",
    nameEn: "Shahnoza Turaeva",
    roleUz: "Ona (Pediatriya)",
    roleRu: "Мама (Педиатрия)",
    roleEn: "Mother (Pediatrics Dept)",
    commentUz: "Dr. Zarina Rustamova bolalarni juda yaxshi tushunar ekan. Qizim shifokorlardan qo'rqardi, lekin bu yerda xushmuomala muomaladan keyin tabassum bilan chiqdi. Klinika toza, zamonaviy!",
    commentRu: "Д-р Зарина Рустамова прекрасно ладит с детьми. Дочка раньше боялась врачей, но здесь ушла с улыбкой. Клиника чистая, современная и комфортная!",
    commentEn: "Dr. Zarina is wonderful with kids. My daughter was scared of hospitals, but here she was smiling the entire visit. Beautiful clinic and caring staff!",
    rating: 5,
    date: "2026-09-18"
  },
  {
    id: 3,
    nameUz: "Rustam Ikromov",
    nameRu: "Рустам Икрамов",
    nameEn: "Rustam Ikromov",
    roleUz: "Bemor (Stomatologiya)",
    roleRu: "Пациент (Стоматология)",
    roleEn: "Patient (Dentistry)",
    commentUz: "Tish tozalash va davolash mutlaqo og'riqsiz o'tdi. Qorong'u rejimdagi chiroyli sayt orqali yozildim, admin panel va Telegram orqali darhol tasdiq xabari keldi. A'lo xizmat!",
    commentRu: "Чистка и лечение зубов прошли абсолютно безболезненно. Записался через стильный сайт, сразу же получил подтверждение в Telegram. Сервис на 10 из 10!",
    commentEn: "Teeth cleaning was totally painless. Booked through the sleek website and received instant Telegram confirmation. 10/10 clinical service!",
    rating: 5,
    date: "2026-09-20"
  }
];

export const initialPatients = [
  {
    id: "PAT-001",
    name: "Otabek Rahimov",
    phone: "+998 90 912 34 56",
    age: 42,
    gender: "Erkak",
    bloodGroup: "A (II) Rh+",
    allergies: "Penitsillin, chang",
    totalVisits: 4,
    lastVisit: "2026-09-23",
    status: "Davolanmoqda",
    address: "Toshkent sh., Yunusobod 12",
    history: [
      { date: "2026-09-23", doctor: "Dr. Alisher Qosimov", diagnosis: "Arterial gipertoniya 1-daraja", prescription: "Kardiomagnil 75mg, Amlodipin 5mg" },
      { date: "2026-08-10", doctor: "Dr. Shahlo Yo'ldosheva", diagnosis: "Profilaktik EKG tekshiruvi", prescription: "Muntazam qon bosimi nazorati" }
    ]
  },
  {
    id: "PAT-002",
    name: "Dilfuza Salimova",
    phone: "+998 97 450 88 12",
    age: 35,
    gender: "Ayol",
    bloodGroup: "O (I) Rh+",
    allergies: "Yo'q",
    totalVisits: 2,
    lastVisit: "2026-09-23",
    status: "Ko'rikda",
    address: "Toshkent sh., Chilonzor 6",
    history: [
      { date: "2026-09-23", doctor: "Dr. Nilufar Karimova", diagnosis: "Migren, stress asorati", prescription: "Magne B6, Sedavit" }
    ]
  },
  {
    id: "PAT-003",
    name: "Farrux Zokirov",
    phone: "+998 93 333 44 55",
    age: 28,
    gender: "Erkak",
    bloodGroup: "B (III) Rh+",
    allergies: "Novokain",
    totalVisits: 5,
    lastVisit: "2026-09-21",
    status: "Sog'lom",
    address: "Toshkent sh., Mirzo Ulug'bek",
    history: [
      { date: "2026-09-21", doctor: "Dr. Jamshid Shokirov", diagnosis: "Tish emali tozalash va flyuoridlash", prescription: "Sensodyne tish pastasi" }
    ]
  },
  {
    id: "PAT-004",
    name: "Madina Yusupova",
    phone: "+998 91 789 01 23",
    age: 5,
    gender: "Ayol",
    bloodGroup: "AB (IV) Rh+",
    allergies: "Sitrus mevalar",
    totalVisits: 3,
    lastVisit: "2026-09-22",
    status: "Kuzatuvda",
    address: "Toshkent sh., Shayxontohur",
    history: [
      { date: "2026-09-22", doctor: "Dr. Zarina Rustamova", diagnosis: "Bog'cha oldi rejalashtirilgan check-up", prescription: "Vitamin D3 tomchilari" }
    ]
  }
];

export const initialLabTests = [
  {
    id: "LAB-501",
    patientName: "Otabek Rahimov",
    phone: "+998 90 912 34 56",
    testName: "Biokimyoviy Qon Tahlili & Xolesterin",
    orderedBy: "Dr. Alisher Qosimov",
    date: "2026-09-23 09:15",
    status: "ready", // pending, in_progress, ready, sent_telegram
    resultSummary: "Xolesterin: 5.4 mmol/l (norma), Glyukoza: 4.8 mmol/l. Tahlil natijalari barqaror.",
    telegramSent: true
  },
  {
    id: "LAB-502",
    patientName: "Dilfuza Salimova",
    phone: "+998 97 450 88 12",
    testName: "Bosh miya MRT Diagnostikasi (1.5T)",
    orderedBy: "Dr. Nilufar Karimova",
    date: "2026-09-23 14:30",
    status: "in_progress",
    resultSummary: "Skanerlash yakunlandi, radiolog xulosasi shakllantirilmoqda.",
    telegramSent: false
  },
  {
    id: "LAB-503",
    patientName: "Madina Yusupova",
    phone: "+998 91 789 01 23",
    testName: "Umumiy Kengaytirilgan Qon Tahlili",
    orderedBy: "Dr. Zarina Rustamova",
    date: "2026-09-22 10:00",
    status: "ready",
    resultSummary: "Gemoglobin: 128 g/l, Eritrotsitlar: 4.2 mln. Leykotsitar formula normada.",
    telegramSent: true
  },
  {
    id: "LAB-504",
    patientName: "Jasur Alimov",
    phone: "+998 90 123 45 67",
    testName: "Yurak Ekokardiografiya & UZI Protokoli",
    orderedBy: "Dr. Alisher Qosimov",
    date: "2026-09-22 18:30",
    status: "ready",
    resultSummary: "Yurak klapanlari faoliyati me'yorda. Qon aylanishi qoniqarli darajada.",
    telegramSent: false
  }
];

export const initialDoctorShifts = [
  {
    id: "SHF-1",
    doctorId: "doc-1",
    doctorName: "Dr. Alisher Qosimov",
    specialty: "Bosh Kardiolog",
    room: "204-xona (Kardiologiya)",
    shift: "08:30 - 15:00",
    days: "Dush, Chor, Juma",
    onDuty: true
  },
  {
    id: "SHF-2",
    doctorId: "doc-2",
    doctorName: "Dr. Nilufar Karimova",
    specialty: "Oliy toifali Nevrolog",
    room: "108-xona (Nevrologiya)",
    shift: "10:00 - 16:30",
    days: "Sesh, Pay, Shan",
    onDuty: true
  },
  {
    id: "SHF-3",
    doctorId: "doc-3",
    doctorName: "Dr. Bobur Mirzayev",
    specialty: "Yetakchi Jarroh",
    room: "312-xona (Operatsion blok)",
    shift: "08:00 - 14:00",
    days: "Dush, Sesh, Paysh",
    onDuty: false
  },
  {
    id: "SHF-4",
    doctorId: "doc-4",
    doctorName: "Dr. Zarina Rustamova",
    specialty: "Pediatr-Immunolog",
    room: "102-xona (Pediatriya)",
    shift: "09:00 - 17:00",
    days: "Har kuni",
    onDuty: true
  },
  {
    id: "SHF-5",
    doctorId: "doc-5",
    doctorName: "Dr. Jamshid Shokirov",
    specialty: "Stomatolog-Ortodont",
    room: "215-xona (Stomatologiya)",
    shift: "10:00 - 19:00",
    days: "Dush - Shan",
    onDuty: false
  },
  {
    id: "SHF-6",
    doctorId: "doc-6",
    doctorName: "Dr. Shahlo Yo'ldosheva",
    specialty: "UZI Diagnostikasi",
    room: "114-xona (Diagnostika)",
    shift: "08:00 - 16:00",
    days: "Dush, Chor, Shan",
    onDuty: true
  }
];

export const initialFinances = {
  todayRevenue: "3,850,000 UZS",
  monthlyRevenue: "48,600,000 UZS",
  doctorCommissions: "19,440,000 UZS",
  netProfit: "29,160,000 UZS",
  expenses: "12,200,000 UZS",
  departmentShares: [
    { name: "MRT & Diagnostika", amount: "18,200,000 UZS", percent: 37, color: "bg-sky-500" },
    { name: "Kardiologiya", amount: "12,500,000 UZS", percent: 26, color: "bg-teal-500" },
    { name: "Jarrohlik", amount: "8,900,000 UZS", percent: 18, color: "bg-indigo-500" },
    { name: "Stomatologiya", amount: "5,400,000 UZS", percent: 11, color: "bg-emerald-500" },
    { name: "Pediatriya & Lab", amount: "3,600,000 UZS", percent: 8, color: "bg-amber-500" }
  ],
  paymentMethods: [
    { name: "UzCard / Humo (Terminal)", percent: 54, count: "142 ta to'lov" },
    { name: "Payme / Click / Onlayn", percent: 31, count: "85 ta to'lov" },
    { name: "Naqd to'lov", percent: 15, count: "38 ta to'lov" }
  ]
};

