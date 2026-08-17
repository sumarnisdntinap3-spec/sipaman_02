import { School, IncidentReport, KabidConfig, Agency } from '../types';

export const KECAMATAN_MAGETAN = [
  'Magetan',
  'Ngariboyo',
  'Barat',
  'Karangrejo',
  'Maospati',
  'Bendo',
  'Takeran',
  'Kawedanan',
  'Lembeyan',
  'Parang',
  'Poncol',
  'Plaosan',
  'Panekan',
  'Sukomoro',
  'Karas',
  'Kartoharjo',
  'Sidorejo',
  'Kasreman',
];

export const INITIAL_KABID_CONFIG: KabidConfig = {
  namaKabid: 'Drs. ENDANG SRI WAHYUNI, M.Pd.',
  nipKabid: '19720515 199802 2 003',
  jabatan: 'Kepala Bidang Pendidikan Dasar',
  dinasName: 'Dinas Pendidikan, Pemuda, dan Olahraga Kabupaten Magetan',
  stafVerifikator: 'Rina Setyowati, S.IP (Analis Kebijakan Pendidikan)',
  kontakCallCenter: '(0351) 895012 / WA Hotline: 0812-3456-7890',
  emailOfficial: 'dikdas.dikpora@magetan.go.id',
};

export const INITIAL_SCHOOLS: School[] = [
  {
    id: 'sch-1',
    npsn: '20512101',
    namaSekolah: 'SMP Negeri 1 Magetan',
    jenjang: 'SMP',
    kecamatan: 'Magetan',
    alamat: 'Jl. Ahmad Yani No. 12, Magetan',
    namaKepalaSekolah: 'Agus Sunarto, S.Pd., M.M.',
    kontakHp: '081234567801',
    email: 'smpn1magetan@dikpora-magetan.go.id',
    statusAktif: true,
    jumlahSiswa: 720,
    tglDidaftarkan: '2025-01-10',
  },
  {
    id: 'sch-2',
    npsn: '20512102',
    namaSekolah: 'SMP Negeri 1 Maospati',
    jenjang: 'SMP',
    kecamatan: 'Maospati',
    alamat: 'Jl. Raya Maospati - Solo No. 45, Maospati',
    namaKepalaSekolah: 'Dra. Endang Purwanti',
    kontakHp: '081234567802',
    email: 'smpn1maospati@dikpora-magetan.go.id',
    statusAktif: true,
    jumlahSiswa: 680,
    tglDidaftarkan: '2025-01-12',
  },
  {
    id: 'sch-3',
    npsn: '20511012',
    namaSekolah: 'SD Negeri Tinap 3',
    jenjang: 'SD',
    kecamatan: 'Sukomoro',
    alamat: 'Desa Tinap RT 05 RW 02, Sukomoro',
    namaKepalaSekolah: 'Sumarni, S.Pd.SD',
    kontakHp: '081234567803',
    email: 'sdntinap3@dikpora-magetan.go.id',
    statusAktif: true,
    jumlahSiswa: 145,
    tglDidaftarkan: '2025-01-15',
  },
  {
    id: 'sch-4',
    npsn: '20512103',
    namaSekolah: 'SMP Negeri 1 Plaosan',
    jenjang: 'SMP',
    kecamatan: 'Plaosan',
    alamat: 'Jl. Raya Sarangan No. 88, Plaosan',
    namaKepalaSekolah: 'Bambang Triyono, M.Pd.',
    kontakHp: '081234567804',
    email: 'smpn1plaosan@dikpora-magetan.go.id',
    statusAktif: true,
    jumlahSiswa: 540,
    tglDidaftarkan: '2025-01-18',
  },
  {
    id: 'sch-5',
    npsn: '20511001',
    namaSekolah: 'SD Negeri Magetan 1',
    jenjang: 'SD',
    kecamatan: 'Magetan',
    alamat: 'Jl. Basuki Rahmat No. 5, Magetan',
    namaKepalaSekolah: 'Siti Rahayu, S.Pd.',
    kontakHp: '081234567805',
    email: 'sdnmagetan1@dikpora-magetan.go.id',
    statusAktif: true,
    jumlahSiswa: 210,
    tglDidaftarkan: '2025-01-20',
  },
  {
    id: 'sch-6',
    npsn: '20512104',
    namaSekolah: 'SMP Negeri 1 Kawedanan',
    jenjang: 'SMP',
    kecamatan: 'Kawedanan',
    alamat: 'Jl. Bhayangkara No. 10, Kawedanan',
    namaKepalaSekolah: 'Drs. Supriyanto',
    kontakHp: '081234567806',
    email: 'smpn1kawedanan@dikpora-magetan.go.id',
    statusAktif: true,
    jumlahSiswa: 490,
    tglDidaftarkan: '2025-02-01',
  },
  {
    id: 'sch-7',
    npsn: '20511008',
    namaSekolah: 'SD Negeri Bendo 1',
    jenjang: 'SD',
    kecamatan: 'Bendo',
    alamat: 'Jl. Raya Bendo No. 22, Bendo',
    namaKepalaSekolah: 'Sri Hartini, S.Pd.',
    kontakHp: '081234567807',
    email: 'sdnbendo1@dikpora-magetan.go.id',
    statusAktif: true,
    jumlahSiswa: 180,
    tglDidaftarkan: '2025-02-05',
  },
];

export const INITIAL_REPORTS: IncidentReport[] = [
  {
    id: 'rep-2026-001',
    nomorLaporan: 'LAP/DIKDAS/2026/02/001',
    sekolahId: 'sch-1',
    namaSekolah: 'SMP Negeri 1 Magetan',
    jenjang: 'SMP',
    kecamatan: 'Magetan',

    tanggalKejadian: '2026-02-05',
    waktuKejadian: '10:15',
    lokasiKejadian: 'Area Belakang Kantin Sekolah',
    kategori: 'Perundungan (Bullying)',
    urgensi: 'Sangat Mendesak',

    siswa: {
      inisialNama: 'ANP',
      kelas: 'VIII B',
      usia: 14,
      jenisKelamin: 'Laki-Laki',
      statusPendampinganOrtu: 'Tinggal Bersama Orang Tua',
      anonymizeInPublic: true,
    },

    deskripsiKronologi:
      'Siswa mengalami tindakan penguncian di lorong kantin serta intimidasi verbal dan pemerasan uang saku secara berulang oleh oknum kakak kelas. Korban tampak ketakutan dan enggan masuk kelas.',
    tindakanAwalSekolah:
      'Tim TPPK Sekolah telah mengamankan korban ke ruang BK, memanggil orang tua korban dan terduga pelaku, serta mengumpulkan rekaman keterangan saksi.',
    buktiAwal: [
      {
        id: 'ev-1',
        fileName: 'foto_lokasi_kantin.jpg',
        fileType: 'image',
        fileUrl:
          'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
        uploadedAt: '2026-02-05 11:30',
        uploadedBy: 'Guru BK SMPN 1 Magetan',
      },
      {
        id: 'ev-2',
        fileName: 'berita_acara_pemeriksaan_awal.pdf',
        fileType: 'document',
        fileUrl: '#',
        uploadedAt: '2026-02-05 11:35',
        uploadedBy: 'Tim TPPK SMPN 1 Magetan',
      },
    ],

    status: 'Penanganan Terpadu',
    tglDilaporkan: '2026-02-05 11:40',

    disposisiDinas: {
      tglDisposisi: '2026-02-05 14:20',
      diresponOleh: 'Drs. ENDANG SRI WAHYUNI, M.Pd.',
      arahanKabid:
        'Lakukan konseling intensif untuk korban dan penanganan terukur bagi terduga pelaku. Libatkan P2TP2A untuk evaluasi trauma psikologis. Hindari tindakan pemecahan yang memutus hak belajar anak.',
      timTerpaduAssigned: [
        'P2TP2A Kab. Magetan',
        'Tim TPPK Kabupaten Magetan',
        'Psikolog Dinas Sosial',
      ],
      prioritasTindakan: 'Sangat Mendesak',
      nomorSuratDisposisi: '421/108/403.101/2026',
    },

    perkembanganLogs: [
      {
        id: 'log-1',
        tanggal: '2026-02-06 09:00',
        dilaporkanOleh: 'Tim TPPK SMPN 1 Magetan',
        tindakanPerkembangan:
          'Pelaksanaan mediasi pertama didampingi Psikolog P2TP2A Magetan di sekolah.',
        hasilKonseling:
          'Orang tua kedua belah pihak sepakat membuat surat perjanjian tidak mengulangi. Korban mulai bersedia mengikuti pendampingan motivasi belajar.',
        statusSaatIni: 'Penanganan Terpadu',
        buktiTambahan: [
          {
            id: 'ev-log-101',
            fileName: 'foto_mediasi_bersama_p2tp2a.jpg',
            fileType: 'image',
            fileUrl:
              'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
            uploadedAt: '2026-02-06 09:30',
            uploadedBy: 'Tim TPPK SMPN 1 Magetan',
          },
          {
            id: 'ev-log-102',
            fileName: 'surat_kesepakatan_damai.pdf',
            fileType: 'document',
            fileUrl: '#',
            uploadedAt: '2026-02-06 10:00',
            uploadedBy: 'Guru BK SMPN 1 Magetan',
          },
        ],
      },
      {
        id: 'log-2',
        tanggal: '2026-02-08 13:00',
        dilaporkanOleh: 'Guru BK SMPN 1 Magetan',
        tindakanPerkembangan:
          'Home visit dan monitoring perilaku berkala di dalam kelas.',
        hasilKonseling:
          'Kondisi psikologis korban pulih 80%, sudah kembali berinteraksi normal dengan teman sebaya. Terduga pelaku diberikan tugas pembinaan sosial.',
        statusSaatIni: 'Proses Pendampingan',
        buktiTambahan: [
          {
            id: 'ev-log-103',
            fileName: 'foto_home_visit_siswa.jpg',
            fileType: 'image',
            fileUrl:
              'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
            uploadedAt: '2026-02-08 13:45',
            uploadedBy: 'Guru BK SMPN 1 Magetan',
          },
        ],
      },
    ],
  },
  {
    id: 'rep-2026-002',
    nomorLaporan: 'LAP/DIKDAS/2026/02/002',
    sekolahId: 'sch-3',
    namaSekolah: 'SD Negeri Tinap 3',
    jenjang: 'SD',
    kecamatan: 'Sukomoro',

    tanggalKejadian: '2026-02-07',
    waktuKejadian: '08:00',
    lokasiKejadian: 'Lingkungan Tempat Tinggal Siswa',
    kategori: 'Anak Berisiko Putus Sekolah',
    urgensi: 'Perlu Penanganan Cepat',

    siswa: {
      inisialNama: 'MFA',
      kelas: 'V SD',
      usia: 11,
      jenisKelamin: 'Laki-Laki',
      statusPendampinganOrtu: 'Yatim Piatu (Ikut Nenek)',
      anonymizeInPublic: true,
    },

    deskripsiKronologi:
      'Siswa tidak masuk sekolah tanpa keterangan selama 10 hari berturut-turut. Hasil penelusuran wali kelas menunjukkan siswa bekerja membantu memulung karena ekonomi nenek yang terbatas.',
    tindakanAwalSekolah:
      'Kepala Sekolah dan Wali Kelas telah melakukan kunjungan rumah (Home Visit), memberikan bantuan sembako darurat serta perlengkapan sekolah dasar dari dana infak guru.',
    buktiAwal: [
      {
        id: 'ev-3',
        fileName: 'dokumentasi_home_visit.jpg',
        fileType: 'image',
        fileUrl:
          'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
        uploadedAt: '2026-02-07 10:15',
        uploadedBy: 'Kepala SDN Tinap 3',
      },
    ],

    status: 'Menunggu Verifikasi',
    tglDilaporkan: '2026-02-07 10:30',
    perkembanganLogs: [],
  },
  {
    id: 'rep-2026-003',
    nomorLaporan: 'LAP/DIKDAS/2026/01/015',
    sekolahId: 'sch-2',
    namaSekolah: 'SMP Negeri 1 Maospati',
    jenjang: 'SMP',
    kecamatan: 'Maospati',

    tanggalKejadian: '2026-01-22',
    waktuKejadian: '13:00',
    lokasiKejadian: 'Luar Gerbang Sekolah',
    kategori: 'Pelanggaran Kehadiran / Membolos',
    urgensi: 'Rutin',

    siswa: {
      inisialNama: 'RKI',
      kelas: 'IX C',
      usia: 15,
      jenisKelamin: 'Laki-Laki',
      statusPendampinganOrtu: 'Orang Tua Bekerja di Luar Kota',
      anonymizeInPublic: false,
    },

    deskripsiKronologi:
      'Ditemukan melompati pagar sekolah saat jam pelajaran ke-5 bersama dua rekannya. Terindikasi nongkrong di warung internet saat jam aktif.',
    tindakanAwalSekolah:
      'Dilakukan pembinaan disiplin oleh Tim Ketertiban Sekolah dan wali kelas, pemanggilan wali murid terdekat, serta pembuatan komitmen tertulis.',
    buktiAwal: [
      {
        id: 'ev-4',
        fileName: 'surat_pernyataan_siswa.pdf',
        fileType: 'document',
        fileUrl: '#',
        uploadedAt: '2026-01-22 14:00',
        uploadedBy: 'Tim Ketertiban SMPN 1 Maospati',
      },
    ],

    status: 'Selesai & Diarsipkan',
    tglDilaporkan: '2026-01-22 14:30',

    disposisiDinas: {
      tglDisposisi: '2026-01-23 09:10',
      diresponOleh: 'Staf Analis Dikdas',
      arahanKabid:
        'Lakukan pemantauan absensi harian dan libatkan dalam kegiatan ekstrakurikuler kepramukaan.',
      timTerpaduAssigned: ['Tim Ketertiban Sekolah'],
      prioritasTindakan: 'Rutin',
      nomorSuratDisposisi: '421/045/403.101/2026',
    },

    perkembanganLogs: [
      {
        id: 'log-3',
        tanggal: '2026-01-29 10:00',
        dilaporkanOleh: 'Wali Kelas IX C',
        tindakanPerkembangan:
          'Evaluasi absensi mingguan dan keaktifan ekstra kurikuler.',
        hasilKonseling:
          'Kehadiran 100% tepat waktu selama satu minggu penuh, aktif di tim basket sekolah.',
        statusSaatIni: 'Selesai & Diarsipkan',
      },
    ],
    catatanPenyelesaian:
      'Siswa telah kembali aktif belajar secara teratur dan tidak pernah mengulangi pelanggaran absensi. Kasus dinyatakan selesai.',
    tglSelesai: '2026-01-30 11:00',
  },
  {
    id: 'rep-2026-004',
    nomorLaporan: 'LAP/DIKDAS/2026/02/008',
    sekolahId: 'sch-4',
    namaSekolah: 'SMP Negeri 1 Plaosan',
    jenjang: 'SMP',
    kecamatan: 'Plaosan',

    tanggalKejadian: '2026-02-08',
    waktuKejadian: '11:00',
    lokasiKejadian: 'Ruang Komputer Sekolah',
    kategori: 'Kekerasan Fisik / Verbal',
    urgensi: 'Perlu Penanganan Cepat',

    siswa: {
      inisialNama: 'DA',
      kelas: 'VII A',
      usia: 13,
      jenisKelamin: 'Perempuan',
      statusPendampinganOrtu: 'Tinggal Bersama Orang Tua',
      anonymizeInPublic: true,
    },

    deskripsiKronologi:
      'Terjadi perselisihan ucapan verbal antar kelompok siswi di media sosial yang berlanjut adu mulut kasar dan dorongan di area sekolah.',
    tindakanAwalSekolah:
      'Guru BK telah melerai, melakukan klarifikasi bersama, dan mengamankan tangkapan layar obrolan media sosial.',
    buktiAwal: [
      {
        id: 'ev-5',
        fileName: 'tangkapan_layar_chat.jpg',
        fileType: 'image',
        fileUrl:
          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
        uploadedAt: '2026-02-08 12:00',
        uploadedBy: 'Guru BK SMPN 1 Plaosan',
      },
    ],

    status: 'Diverifikasi Dinas',
    tglDilaporkan: '2026-02-08 12:15',

    disposisiDinas: {
      tglDisposisi: '2026-02-08 15:00',
      diresponOleh: 'Drs. ENDANG SRI WAHYUNI, M.Pd.',
      arahanKabid:
        'Fasilitasi pertemuan edukasi literasi digital bersama wali murid dan berikan sesi pembinaan toleransi.',
      timTerpaduAssigned: ['Pengawas Sekolah Wilayah Plaosan', 'Tim TPPK'],
      prioritasTindakan: 'Perlu Penanganan Cepat',
      nomorSuratDisposisi: '421/112/403.101/2026',
    },

    perkembanganLogs: [],
  },
];

export const INITIAL_AGENCIES: Agency[] = [
  {
    id: 'ag-1',
    namaInstansi: 'Dinas PPKB PP & PA Kab. Magetan',
    kategori: 'Perlindungan Anak',
    kontakPhone: '0813-3567-9001',
    email: 'dp3a@magetan.go.id',
    alamat: 'Jl. Diponegoro No. 14, Magetan',
    namaPJ: 'Dra. Endang Sulastri (Kabid Perlindungan Anak)',
    statusAktif: true,
    keterangan: 'Layanan pendampingan psikologis, konseling, dan advokasi perlindungan anak.',
  },
  {
    id: 'ag-2',
    namaInstansi: 'Polres Kabupaten Magetan (Unit PPA Satreskrim)',
    kategori: 'Kepolisian',
    kontakPhone: '(0351) 895110 / 0812-9988-7766',
    email: 'ppa.polresmagetan@polri.go.id',
    alamat: 'Jl. Yos Sudarso No. 1, Magetan',
    namaPJ: 'Ipda Rina Wulandari, S.H. (Kanit PPA)',
    statusAktif: true,
    keterangan: 'Penanganan unsur tindak pidana kekerasan/pelecehan pada anak di bawah umur.',
  },
  {
    id: 'ag-3',
    namaInstansi: 'Dinas Kesehatan Kabupaten Magetan',
    kategori: 'Kesehatan',
    kontakPhone: '(0351) 891234',
    email: 'dinkes@magetan.go.id',
    alamat: 'Jl. Pahlawan No. 2, Magetan',
    namaPJ: 'dr. Tri Hapsari (Seksi Kesehatan Remaja & Jiwa)',
    statusAktif: true,
    keterangan: 'Pemeriksaan visum et repertum, layanan kesehatan fisik, dan rujukan Puskesmas.',
  },
  {
    id: 'ag-4',
    namaInstansi: 'Dinas Sosial Kabupaten Magetan',
    kategori: 'Sosial',
    kontakPhone: '(0351) 892345',
    email: 'dinsos@magetan.go.id',
    alamat: 'Jl. Salak No. 8, Magetan',
    namaPJ: 'Budi Santoso, S.ST (Pekerja Sosial Muda)',
    statusAktif: true,
    keterangan: 'Bantuan jaminan sosial, pendampingan anak terlantar, dan perlengkapan sekolah.',
  },
  {
    id: 'ag-5',
    namaInstansi: 'P2TP2A (Pusat Pelayanan Terpadu) Magetan',
    kategori: 'Perlindungan Anak',
    kontakPhone: '0857-4567-8901',
    email: 'p2tp2a.magetan@gmail.com',
    alamat: 'Gedung Kartini Jl. Pangeran Diponegoro, Magetan',
    namaPJ: 'Siti Zulaikha, M.Psi. (Psikolog Klinis)',
    statusAktif: true,
    keterangan: 'Rehabilitasi trauma, rumah aman (shelter), dan konseling keluarga.',
  },
  {
    id: 'ag-6',
    namaInstansi: 'Kejaksaan Negeri Kabupaten Magetan',
    kategori: 'Hukum',
    kontakPhone: '(0351) 891112',
    email: 'kejari.magetan@kejaksaan.go.id',
    alamat: 'Jl. Karya Dharma No. 5, Magetan',
    namaPJ: 'Ahmad Fauzi, S.H. (Jaksa Fungsional PPA)',
    statusAktif: true,
    keterangan: 'Pendampingan sistem peradilan pidana anak (SPPA) dan diversi hukum.',
  },
];

