import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, Send, ShieldCheck, BookOpen, Lightbulb } from 'lucide-react';

export const AiAssistantModal: React.FC = () => {
  const { isAiModalOpen, setIsAiModalOpen } = useApp();

  const [promptCategory, setPromptCategory] = useState('Perundungan (Bullying)');
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isAiModalOpen) return null;

  const handleGenerateGuidance = (cat: string) => {
    setLoading(true);
    setResponse(null);

    setTimeout(() => {
      let advice = '';
      if (cat.includes('Bullying') || cat.includes('Perundungan')) {
        advice = `📌 REKOMENDASI TPPK — PENANGANAN KASUS PERUNDUNGAN (BULLYING):
1. Pengamanan & Pendampingan Awal: Pisahkan segera korban dan terduga pelaku. Berikan ruang aman di BK tanpa tekanan.
2. Konseling Psikologis: Libatkan P2TP2A atau Psikolog Puskesmas untuk mengukur trauma psikologis anak.
3. Mediasi Berperspektif Hak Anak: Panggil orang tua kedua belah pihak secara terpisah terlebih dahulu sebelum mediasi bersama.
4. Komitmen & Tindakan Pembinaan: Buat kesepakatan tertulis yang tidak mencabut hak pendidikan kedua siswa. Terduga pelaku diberikan tugas konseling perubahan perilaku.
5. Pemantauan 30 Hari: Wali kelas dan Guru BK wajib melakukan pengawasan berkala dan evaluasi mingguan.`;
      } else if (cat.includes('Putus Sekolah')) {
        advice = `📌 REKOMENDASI TPPK — PENANGANAN RISIKO PUTUS SEKOLAH:
1. Home Visit Tim TPPK: Lakukan kunjungan rumah untuk mengidentifikasi akar masalah (faktor ekonomi, pengasuhan, atau perundungan).
2. Bantuan Sosial Pendidikan: Koordinasikan dengan Dinas Sosial Magetan dan Dinas Dikpora untuk intervensi program PIP / Kartu Magetan Pintar.
3. Fleksibilitas Belajar Sementara: Berikan modul pembelajaran terpandu apabila siswa harus membantu keluarga, serta dorong kehadiran bertahap.
4. Pendampingan Tokoh Masyarakat: Libatkan Kepala Desa / Perangkat RT Sukomoro/Kecamatan setempat untuk penguatan motivasi keluarga.`;
      } else {
        advice = `📌 REKOMENDASI UMUM TPPK PERMENDIKBUDRISTEK NO. 46 TAHUN 2023:
1. Menjamin kerahasiaan identitas dan perlindungan data pribadi anak (menggunakan inisial nama).
2. Mengedepankan penyelesaian yang ramah anak, edukatif, dan pemulihan kondisi emosional (restorative justice).
3. Mendokumentasikan seluruh tahapan dalam sistem Si Paman agar menjadi bahan evaluasi terpadu Dinas Dikpora Kabupaten Magetan.`;
      }

      setResponse(advice);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Panduan Asisten TPPK & Konseling AI
              </h3>
              <p className="text-xs text-slate-500">
                Pedoman Permendikbudristek No. 46 Tahun 2023 Penanganan Kasus Anak
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAiModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <div className="text-xs text-slate-600">
            Pilih kategori kasus untuk mendapatkan rekomendasi langkah awal penanganan bagi Guru BK, Wali Kelas, dan Tim TPPK Sekolah:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={() => handleGenerateGuidance('Perundungan (Bullying)')}
              className="p-3 rounded-xl border border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/50 text-left text-xs font-semibold text-slate-800 transition-all flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Kasus Perundungan (Bullying)</span>
            </button>

            <button
              onClick={() => handleGenerateGuidance('Anak Berisiko Putus Sekolah')}
              className="p-3 rounded-xl border border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/50 text-left text-xs font-semibold text-slate-800 transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Risiko Putus Sekolah</span>
            </button>
          </div>

          {loading && (
            <div className="p-6 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600 animate-spin" />
              <span>Menyusun panduan rekomendasi TPPK...</span>
            </div>
          )}

          {response && (
            <div className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs space-y-2 leading-relaxed whitespace-pre-line border border-slate-800 shadow-inner">
              {response}
            </div>
          )}
        </div>

        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={() => setIsAiModalOpen(false)}
            className="px-4 py-2 rounded-lg bg-slate-800 text-white text-xs font-semibold"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
