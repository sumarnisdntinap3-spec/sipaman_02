import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Category, UrgencyLevel, EvidenceFile } from '../../types';
import {
  ShieldAlert,
  X,
  Upload,
  Sparkles,
  Paperclip,
  CheckCircle,
  FileText,
  AlertCircle,
  User,
  MapPin,
  Calendar,
  Lock,
} from 'lucide-react';

interface CreateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateReportModal: React.FC<CreateReportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { createReport, userSession } = useApp();

  const [form, setForm] = useState({
    tanggalKejadian: new Date().toISOString().split('T')[0],
    waktuKejadian: '09:00',
    lokasiKejadian: '',
    kategori: 'Perundungan (Bullying)' as Category,
    urgensi: 'Sangat Mendesak' as UrgencyLevel,

    // Student Info
    inisialNama: '',
    kelas: '',
    usia: 13,
    jenisKelamin: 'Laki-Laki' as 'Laki-Laki' | 'Perempuan',
    statusPendampinganOrtu: 'Tinggal Bersama Orang Tua',
    anonymizeInPublic: true,

    deskripsiKronologi: '',
    tindakanAwalSekolah: '',
  });

  const [evidenceList, setEvidenceList] = useState<EvidenceFile[]>([
    {
      id: 'ev-sample-1',
      fileName: 'dokumentasi_bukti_awal.jpg',
      fileType: 'image',
      fileUrl:
        'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
      uploadedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      uploadedBy: userSession.namaPengguna || 'TPPK Sekolah',
    },
  ]);

  const [newFileName, setNewFileName] = useState('');

  if (!isOpen) return null;

  const handleAddSampleEvidence = () => {
    if (!newFileName.trim()) return;
    const isDoc = newFileName.endsWith('.pdf') || newFileName.endsWith('.doc');
    const newFile: EvidenceFile = {
      id: `ev-${Date.now()}`,
      fileName: newFileName,
      fileType: isDoc ? 'document' : 'image',
      fileUrl: isDoc
        ? '#'
        : 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      uploadedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      uploadedBy: userSession.namaPengguna || 'TPPK Sekolah',
    };
    setEvidenceList((prev) => [...prev, newFile]);
    setNewFileName('');
  };

  const handleRemoveEvidence = (id: string) => {
    setEvidenceList((prev) => prev.filter((e) => e.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createReport({
      tanggalKejadian: form.tanggalKejadian,
      waktuKejadian: form.waktuKejadian,
      lokasiKejadian: form.lokasiKejadian || 'Lingkungan Sekolah',
      kategori: form.kategori,
      urgensi: form.urgensi,

      siswa: {
        inisialNama: form.inisialNama,
        kelas: form.kelas,
        usia: form.usia,
        jenisKelamin: form.jenisKelamin,
        statusPendampinganOrtu: form.statusPendampinganOrtu,
        anonymizeInPublic: form.anonymizeInPublic,
      },

      deskripsiKronologi: form.deskripsiKronologi,
      tindakanAwalSekolah: form.tindakanAwalSekolah,
      buktiAwal: evidenceList,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full p-6 animate-in fade-in zoom-in-95 my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Buat Laporan Permasalahan Anak Real-Time
              </h3>
              <p className="text-xs text-slate-500">
                Laporan dari <strong className="text-slate-800">{userSession.schoolName}</strong> akan terkirim langsung ke Dinas Dikpora Magetan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          
          {/* Section 1: Tanggal & Kategori */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-600" />
              1. Informasi Kejadian & Klasifikasi
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tanggal Kejadian *
                </label>
                <input
                  type="date"
                  required
                  value={form.tanggalKejadian}
                  onChange={(e) =>
                    setForm({ ...form, tanggalKejadian: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Waktu Kejadian
                </label>
                <input
                  type="time"
                  value={form.waktuKejadian}
                  onChange={(e) =>
                    setForm({ ...form, waktuKejadian: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tingkat Urgensi Penanganan *
                </label>
                <select
                  value={form.urgensi}
                  onChange={(e) =>
                    setForm({ ...form, urgensi: e.target.value as UrgencyLevel })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="Sangat Mendesak">Sangat Mendesak (Membutuhkan Atensi Segera)</option>
                  <option value="Perlu Penanganan Cepat">Perlu Penanganan Cepat</option>
                  <option value="Rutin">Rutin (Pembinaan Biasa)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kategori Permasalahan *
                </label>
                <select
                  value={form.kategori}
                  onChange={(e) =>
                    setForm({ ...form, kategori: e.target.value as Category })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="Perundungan (Bullying)">Perundungan (Bullying)</option>
                  <option value="Kekerasan Fisik / Verbal">Kekerasan Fisik / Verbal</option>
                  <option value="Anak Berisiko Putus Sekolah">Anak Berisiko Putus Sekolah</option>
                  <option value="Pelanggaran Kehadiran / Membolos">Pelanggaran Kehadiran / Membolos</option>
                  <option value="Masalah Perilaku / Kenakalan">Masalah Perilaku / Kenakalan</option>
                  <option value="Kesehatan Mental & Trauma">Kesehatan Mental & Trauma</option>
                  <option value="Anak Berkebutuhan Khusus (ABK)">Anak Berkebutuhan Khusus (ABK)</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Lokasi Spesifik Kejadian *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Belakang Perpustakaan / Lingkungan Desa X"
                  value={form.lokasiKejadian}
                  onChange={(e) =>
                    setForm({ ...form, lokasiKejadian: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Data Siswa (Perlindungan Hak Anak) */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-4 h-4 text-emerald-600" />
                2. Data Identitas Anak / Siswa
              </h4>
              <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                <Lock className="w-3 h-3 text-emerald-600" />
                Privasi Terjaga Sesuai SOP TPPK
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Inisial Nama Siswa *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: ANP / MFA"
                  value={form.inisialNama}
                  onChange={(e) =>
                    setForm({ ...form, inisialNama: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs uppercase font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kelas *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: VIII B / Kelas IV"
                  value={form.kelas}
                  onChange={(e) =>
                    setForm({ ...form, kelas: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Usia (Tahun)
                </label>
                <input
                  type="number"
                  min={6}
                  max={18}
                  value={form.usia}
                  onChange={(e) =>
                    setForm({ ...form, usia: parseInt(e.target.value) || 12 })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jenis Kelamin
                </label>
                <select
                  value={form.jenisKelamin}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      jenisKelamin: e.target.value as 'Laki-Laki' | 'Perempuan',
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="Laki-Laki">Laki-Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Status Pengasuhan & Keluarga
              </label>
              <input
                type="text"
                placeholder="Contoh: Tinggal bersama Orang Tua / Yatim Piatu / Ikut Nenek"
                value={form.statusPendampinganOrtu}
                onChange={(e) =>
                  setForm({ ...form, statusPendampinganOrtu: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* Section 3: Kronologi & Tindakan Awal */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kronologi Lengkap Kejadian *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Uraikan peristiwa secara rinci: waktu, pihak yang terlibat, dampak pada anak, dan saksi-saksi..."
                value={form.deskripsiKronologi}
                onChange={(e) =>
                  setForm({ ...form, deskripsiKronologi: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tindakan Penanganan Awal yang Telah Dilakukan Sekolah *
              </label>
              <textarea
                required
                rows={2}
                placeholder="Contoh: Konseling awal di ruang BK, pemanggilan orang tua, pengamanan barang bukti..."
                value={form.tindakanAwalSekolah}
                onChange={(e) =>
                  setForm({ ...form, tindakanAwalSekolah: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* Section 4: Upload Bukti Pendukung */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Paperclip className="w-4 h-4 text-emerald-600" />
              4. Lampiran Bukti Pendukung (Foto / Dokumen)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (!files || files.length === 0) return;
                    (Array.from(files) as File[]).forEach((file: File) => {
                      const isImg = file.type.startsWith('image/');
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const fileUrl = (event.target?.result as string) || '#';
                        const newFile: EvidenceFile = {
                          id: `ev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
                          fileName: file.name,
                          fileType: isImg ? 'image' : 'document',
                          fileUrl: fileUrl,
                          uploadedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
                          uploadedBy: userSession.namaPengguna || 'TPPK Sekolah',
                        };
                        setEvidenceList((prev) => [...prev, newFile]);
                      };
                      reader.readAsDataURL(file);
                    });
                    e.target.value = '';
                  }}
                  id="createReportFileInput"
                  className="hidden"
                />
                <label
                  htmlFor="createReportFileInput"
                  className="w-full py-2 px-3 rounded-lg border border-emerald-300 bg-white hover:bg-emerald-50 text-emerald-900 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
                >
                  <Upload className="w-4 h-4 text-emerald-600" />
                  <span>Upload Foto / Berkas Bukti</span>
                </label>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Atau nama berkas bukti..."
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddSampleEvidence}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold"
                >
                  Lampirkan
                </button>
              </div>
            </div>

            {/* Evidence List with Thumbnails */}
            {evidenceList.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {evidenceList.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-2 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-between gap-2 text-xs"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {ev.fileType === 'image' && ev.fileUrl && ev.fileUrl !== '#' ? (
                        <img
                          src={ev.fileUrl}
                          alt={ev.fileName}
                          className="w-10 h-10 rounded object-cover border border-slate-200 flex-shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                          <FileText className="w-5 h-5" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <span className="font-semibold text-slate-800 truncate block">{ev.fileName}</span>
                        <span className="text-[10px] text-slate-400 block">{ev.uploadedAt}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveEvidence(ev.id)}
                      className="p-1 text-slate-400 hover:text-rose-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Kirim Laporan Resmi Ke Dinas</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
