# SI PAMAN - Sistem Informasi Penanganan Masalah Anak
### Bidang Dikdas Dinas Dikpora Kabupaten Magetan, Jawa Timur

**SI PAMAN** adalah platform aplikasi web berbasis React, TypeScript, Tailwind CSS, dan Google Firebase Firestore yang dirancang untuk mendukung pelaporan, penanganan cepat, disposisi resmi, serta pemantauan rekam jejak kasus perlindungan anak di lingkungan sekolah SD & SMP di Kabupaten Magetan.

---

## 🌟 Fitur Utama

1. **Dashboard Monitoring Real-Time**
   - Statistik kasus terpadu, sebaran kecamatan, status verifikasi, dan urgensi penanganan.
2. **Manajemen Laporan Kasus (TPPK & Dinas)**
   - Formulir pelaporan insiden dengan perlindungan inisial nama siswa sesuai regulasi.
   - Unggah bukti awal dan dokumentasi foto/berkas.
   - Lembar disposisi resmi Kepala Bidang Pendidikan Dasar (Kabid Dikdas).
3. **Timeline & Log Perkembangan Kasus**
   - Pencatatan berkala pendampingan siswa, hasil konseling BK, dan foto dokumentasi kegiatan tindak lanjut.
4. **Basis Data Sekolah & Lembaga Mitra**
   - Direktori sekolah (NPSN, Kepsek, Ketua TPPK) serta instansi mitra penanganan terpadu (P2TP2A, Dinsos, Polres, Dinkes, Psikolog).
5. **Database Terintegrasi Google Firebase Firestore**
   - Sinkronisasi data real-time, backup otomatis, dan deployment aturan keamanan (*Firestore Security Rules*).

---

## 🛠️ Tech Stack

- **Frontend**: React 18+, TypeScript, Vite, Tailwind CSS
- **Animasi & Ikon**: Motion (`motion/react`), Lucide React
- **Database & Backend**: Google Cloud Firebase Firestore
- **CI/CD**: GitHub Actions (`.github/workflows/ci.yml`)

---

## 🚀 Panduan Memulai (Local Development)

### 1. Kloning Repositori
```bash
git clone https://github.com/USERNAME/sipaman-magetan.git
cd sipaman-magetan
```

### 2. Pasang Dependensi
```bash
npm install
```

### 3. Konfigurasi Lingkungan
Pastikan berkas `firebase-applet-config.json` atau `.env` tersedia dengan kredensial Firebase yang sesuai:
```bash
cp .env.example .env
```

### 4. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka peramban di `http://localhost:3000`.

### 5. Type-checking & Build
```bash
# Validasi TypeScript
npm run lint

# Kompilasi Production Build
npm run build
```

---

## 🔒 Keamanan & Kebijakan Data
- Perlindungan privasi data identitas siswa/anak di bawah umur sesuai ketentuan TPPK dan Permendikbudristek.
- Aturan akses Firestore (`firestore.rules`) mengamankan pembacaan dan penulisan data laporan.

---

## 🏛️ Dinas Dikpora Kabupaten Magetan
Jl. Hasanudin No. 2, Magetan, Jawa Timur.
