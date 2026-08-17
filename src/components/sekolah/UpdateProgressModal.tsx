import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IncidentReport, ReportStatus, EvidenceFile } from '../../types';
import {
  X,
  Send,
  CheckCircle2,
  Paperclip,
  Upload,
  FileText,
  Clock,
  ShieldCheck,
  Image as ImageIcon,
  Trash2,
} from 'lucide-react';

interface UpdateProgressModalProps {
  report: IncidentReport | null;
  onClose: () => void;
}

export const UpdateProgressModal: React.FC<UpdateProgressModalProps> = ({
  report,
  onClose,
}) => {
  const { addProgressLog, resolveReport, userSession } = useApp();

  const [tindakanPerkembangan, setTindakanPerkembangan] = useState('');
  const [hasilKonseling, setHasilKonseling] = useState('');
  const [statusSaatIni, setStatusSaatIni] = useState<ReportStatus>(
    report?.status || 'Proses Pendampingan'
  );
  const [isFinalResolution, setIsFinalResolution] = useState(false);
  const [catatanPenyelesaian, setCatatanPenyelesaian] = useState('');

  const [evidenceName, setEvidenceName] = useState('');
  const [evidenceList, setEvidenceList] = useState<EvidenceFile[]>([]);

  if (!report) return null;

  // Handle direct file upload (image / document)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    (Array.from(files) as File[]).forEach((file: File) => {
      const isImg = file.type.startsWith('image/');
      const reader = new FileReader();

      reader.onload = (event) => {
        const fileUrl = (event.target?.result as string) || '#';
        const newFile: EvidenceFile = {
          id: `ev-log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          fileName: file.name,
          fileType: isImg ? 'image' : 'document',
          fileUrl: fileUrl,
          uploadedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
          uploadedBy: userSession.namaPengguna || 'Sekolah',
        };
        setEvidenceList((prev) => [...prev, newFile]);
      };

      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const handleAddManualEvidence = () => {
    if (!evidenceName.trim()) return;
    const isDoc = evidenceName.endsWith('.pdf') || evidenceName.endsWith('.doc');
    const newFile: EvidenceFile = {
      id: `ev-log-${Date.now()}`,
      fileName: evidenceName,
      fileType: isDoc ? 'document' : 'image',
      fileUrl: isDoc
        ? '#'
        : 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      uploadedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      uploadedBy: userSession.namaPengguna || 'Sekolah',
    };
    setEvidenceList((prev) => [...prev, newFile]);
    setEvidenceName('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const now = new Date();
    const formattedDate = `${now.toISOString().split('T')[0]} ${now.toTimeString().slice(0, 5)}`;

    if (isFinalResolution) {
      addProgressLog(report.id, {
        tanggal: formattedDate,
        dilaporkanOleh: userSession.namaPengguna || 'TPPK Sekolah',
        tindakanPerkembangan: tindakanPerkembangan || 'Tahap Finalisasi & Evaluasi Akhir',
        hasilKonseling: hasilKonseling || 'Permasalahan dinyatakan teratasi.',
        buktiTambahan: evidenceList,
        statusSaatIni: 'Selesai & Diarsipkan',
      });

      resolveReport(
        report.id,
        catatanPenyelesaian ||
          'Kasus telah ditangani secara tuntas oleh pihak sekolah bersama tim terpadu, anak kembali belajar dengan kondusif.'
      );
    } else {
      addProgressLog(report.id, {
        tanggal: formattedDate,
        dilaporkanOleh: userSession.namaPengguna || 'TPPK Sekolah',
        tindakanPerkembangan,
        hasilKonseling,
        buktiTambahan: evidenceList,
        statusSaatIni,
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 animate-in fade-in zoom-in-95 my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>Update Perkembangan & Dokumentasi Kasus</span>
            </h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              No. Laporan: {report.nomorLaporan} • {report.namaSekolah}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          
          {/* Option: Is Case Resolved? */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <div>
                <h4 className="text-xs font-bold text-emerald-900">
                  Tandai Kasus Selesai & Diarsipkan?
                </h4>
                <p className="text-[11px] text-emerald-700">
                  Centang jika seluruh tahapan penanganan telah tuntas teratasi
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isFinalResolution}
              onChange={(e) => {
                setIsFinalResolution(e.target.checked);
                if (e.target.checked) {
                  setStatusSaatIni('Selesai & Diarsipkan');
                }
              }}
              className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
            />
          </div>

          {!isFinalResolution && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Update Status Penanganan Saat Ini
              </label>
              <select
                value={statusSaatIni}
                onChange={(e) => setStatusSaatIni(e.target.value as ReportStatus)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="Proses Pendampingan">Proses Pendampingan Sekolah</option>
                <option value="Penanganan Terpadu">Penanganan Terpadu (Tim Gabungan)</option>
                <option value="Selesai & Diarsipkan">Selesai & Diarsipkan</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isFinalResolution ? 'Tindakan Akhir Penanganan *' : 'Tindakan Perkembangan Terbaru *'}
            </label>
            <textarea
              required
              rows={3}
              value={tindakanPerkembangan}
              onChange={(e) => setTindakanPerkembangan(e.target.value)}
              placeholder="Contoh: Telah dilaksanakan pertemuan dengan pihak orang tua, konseling sesi ke-2, dan kunjungan rumah..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Hasil Konseling & Perkembangan Perilaku Anak *
            </label>
            <textarea
              required
              rows={3}
              value={hasilKonseling}
              onChange={(e) => setHasilKonseling(e.target.value)}
              placeholder="Jelaskan kondisi psikologis dan perkembangan positif siswa..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {isFinalResolution && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Catatan Penyelesaian Laporan (Bahan Evaluasi Dinas) *
              </label>
              <textarea
                required
                rows={2}
                value={catatanPenyelesaian}
                onChange={(e) => setCatatanPenyelesaian(e.target.value)}
                placeholder="Ringkasan kesimpulan penyelesaian kasus..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          )}

          {/* Evidence Attachments - Upload Photo & Documentation */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Paperclip className="w-4 h-4 text-blue-600" />
                <span>Upload Bukti Perkembangan Tambahan / Dokumentasi Kasus</span>
              </label>
              <span className="text-[11px] text-slate-500">Foto / PDF / Dokumen</span>
            </div>

            {/* Upload Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  id="progressFileInput"
                  className="hidden"
                />
                <label
                  htmlFor="progressFileInput"
                  className="w-full py-2 px-3 rounded-lg border border-blue-300 bg-white hover:bg-blue-50 text-blue-900 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
                >
                  <Upload className="w-4 h-4 text-blue-600" />
                  <span>Upload Foto / Berkas</span>
                </label>
              </div>

              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="Atau ketik nama berkas..."
                  value={evidenceName}
                  onChange={(e) => setEvidenceName(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddManualEvidence}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-semibold"
                >
                  Tambah
                </button>
              </div>
            </div>

            {/* Uploaded Evidence Grid / List */}
            {evidenceList.length > 0 && (
              <div className="pt-2 border-t border-slate-200/80 space-y-2">
                <span className="text-[11px] font-bold text-slate-700 block">
                  Dokumentasi Kasus Terlampir ({evidenceList.length}):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {evidenceList.map((ev) => (
                    <div
                      key={ev.id}
                      className="p-2 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {ev.fileType === 'image' && ev.fileUrl && ev.fileUrl !== '#' ? (
                          <img
                            src={ev.fileUrl}
                            alt={ev.fileName}
                            className="w-10 h-10 rounded object-cover border border-slate-200 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                            <FileText className="w-5 h-5" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-800 truncate">
                            {ev.fileName}
                          </p>
                          <span className="text-[10px] text-slate-400 block">
                            {ev.uploadedAt}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setEvidenceList((prev) => prev.filter((e) => e.id !== ev.id))
                        }
                        className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-2 shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>Simpan Perkembangan & Dokumentasi</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
