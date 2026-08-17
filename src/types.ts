export type UserRole = 'ADMIN_DINAS' | 'AKUN_SEKOLAH';

export type SchoolLevel = 'SD' | 'SMP';

export type Category =
  | 'Perundungan (Bullying)'
  | 'Kekerasan Fisik / Verbal'
  | 'Anak Berisiko Putus Sekolah'
  | 'Pelanggaran Kehadiran / Membolos'
  | 'Masalah Perilaku / Kenakalan'
  | 'Kesehatan Mental & Trauma'
  | 'Anak Berkebutuhan Khusus (ABK)'
  | 'Lainnya';

export type UrgencyLevel = 'Sangat Mendesak' | 'Perlu Penanganan Cepat' | 'Rutin';

export type ReportStatus =
  | 'Menunggu Verifikasi'
  | 'Diverifikasi Dinas'
  | 'Penanganan Terpadu'
  | 'Proses Pendampingan'
  | 'Selesai & Diarsipkan'
  | 'Ditolak';

export interface School {
  id: string;
  npsn: string;
  namaSekolah: string;
  jenjang: SchoolLevel;
  kecamatan: string;
  alamat: string;
  namaKepalaSekolah: string;
  kontakHp: string;
  email: string;
  statusAktif: boolean;
  jumlahSiswa?: number;
  tglDidaftarkan: string;
}

export interface StudentInfo {
  inisialNama: string;
  kelas: string;
  usia: number;
  jenisKelamin: 'Laki-Laki' | 'Perempuan';
  statusPendampinganOrtu: string;
  anonymizeInPublic: boolean;
}

export interface EvidenceFile {
  id: string;
  fileName: string;
  fileType: 'image' | 'document';
  fileUrl: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface DisposisiDinas {
  tglDisposisi: string;
  diresponOleh: string; // Staf / Kabid
  arahanKabid: string;
  timTerpaduAssigned: string[]; // e.g. ['P2TP2A Kab. Magetan', 'Dinas Sosial Magetan', 'Psikolog Puskesmas']
  prioritasTindakan: UrgencyLevel;
  nomorSuratDisposisi: string;
}

export interface ProgressLog {
  id: string;
  tanggal: string;
  dilaporkanOleh: string; // e.g. 'Tim TPPK SMPN 1 Magetan'
  tindakanPerkembangan: string;
  hasilKonseling: string;
  buktiTambahan?: EvidenceFile[];
  statusSaatIni: ReportStatus;
}

export interface IncidentReport {
  id: string;
  nomorLaporan: string;
  sekolahId: string;
  namaSekolah: string;
  jenjang: SchoolLevel;
  kecamatan: string;

  tanggalKejadian: string;
  waktuKejadian: string;
  lokasiKejadian: string;
  kategori: Category;
  urgensi: UrgencyLevel;

  siswa: StudentInfo;
  deskripsiKronologi: string;
  tindakanAwalSekolah: string;
  buktiAwal: EvidenceFile[];

  status: ReportStatus;
  tglDilaporkan: string;

  disposisiDinas?: DisposisiDinas;
  perkembanganLogs: ProgressLog[];
  catatanPenyelesaian?: string;
  tglSelesai?: string;
}

export interface KabidConfig {
  namaKabid: string;
  nipKabid: string;
  jabatan: string;
  dinasName: string;
  stafVerifikator: string;
  kontakCallCenter: string;
  emailOfficial: string;
}

export type AgencyCategory =
  | 'Perlindungan Anak'
  | 'Kepolisian'
  | 'Kesehatan'
  | 'Sosial'
  | 'Hukum'
  | 'Lainnya';

export interface Agency {
  id: string;
  namaInstansi: string;
  kategori: AgencyCategory;
  kontakPhone: string;
  email: string;
  alamat: string;
  namaPJ: string;
  statusAktif: boolean;
  keterangan?: string;
}

export interface UserSession {
  role: UserRole;
  isLoggedIn: boolean;
  schoolId?: string;
  schoolName?: string;
  npsn?: string;
  email: string;
  namaPengguna: string;
}
