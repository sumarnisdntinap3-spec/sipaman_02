import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Printer,
  ShieldCheck,
  Building2,
  Calendar,
  Clock,
  MapPin,
  User,
  Paperclip,
  CheckCircle2,
  AlertTriangle,
  Send,
  FileText,
  Lock,
  Image as ImageIcon,
  ZoomIn,
  Camera,
  FileCheck,
} from 'lucide-react';

export const ReportDetailModal: React.FC = () => {
  const {
    selectedReportForDetail,
    setSelectedReportForDetail,
    setSelectedReportForPrint,
    kabidConfig,
  } = useApp();

  // Lightbox Modal state for full photo viewing
  const [lightboxImage, setLightboxImage] = useState<{
    url: string;
    title: string;
    subtitle?: string;
  } | null>(null);

  if (!selectedReportForDetail) return null;
  const r = selectedReportForDetail;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full p-6 animate-in fade-in zoom-in-95 my-6">
          
          {/* Modal Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-slate-900">
                  {r.nomorLaporan}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                    r.status === 'Menunggu Verifikasi'
                      ? 'bg-amber-100 text-amber-900'
                      : r.status === 'Selesai & Diarsipkan'
                      ? 'bg-emerald-100 text-emerald-900'
                      : 'bg-sky-100 text-sky-900'
                  }`}
                >
                  {r.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Dilaporkan oleh <strong className="text-slate-800">{r.namaSekolah}</strong> (Kec. {r.kecamatan})
              </p>
            </div>

            <div className="flex items-center gap-2">
              {r.disposisiDinas && (
                <button
                  onClick={() => {
                    setSelectedReportForPrint(r);
                    setSelectedReportForDetail(null);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak Disposisi</span>
                </button>
              )}

              <button
                onClick={() => setSelectedReportForDetail(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="mt-5 space-y-6 max-h-[70vh] overflow-y-auto pr-1">
            
            {/* Main Incident Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
              <div>
                <span className="text-slate-400 font-medium block">Kategori Masalah</span>
                <strong className="text-slate-900 text-sm">{r.kategori}</strong>
              </div>

              <div>
                <span className="text-slate-400 font-medium block">Tingkat Urgensi</span>
                <span
                  className={`inline-block px-2 py-0.5 rounded font-bold mt-0.5 ${
                    r.urgensi === 'Sangat Mendesak'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {r.urgensi}
                </span>
              </div>

              <div>
                <span className="text-slate-400 font-medium block">Waktu Kejadian</span>
                <span className="text-slate-800 font-medium">
                  {r.tanggalKejadian} ({r.waktuKejadian} WIB)
                </span>
              </div>
            </div>

            {/* Student Profile Card */}
            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-4 h-4 text-blue-700" />
                  Data Identitas Siswa / Anak
                </h4>
                <span className="text-[11px] text-blue-700 font-medium flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Inisial Dilindungi Sesuai Regulasi TPPK
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-800">
                <div>
                  <span className="text-slate-500 block">Inisial Nama:</span>
                  <strong className="text-slate-900 font-bold">{r.siswa.inisialNama}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Kelas / Usia:</span>
                  <span className="font-semibold">{r.siswa.kelas} ({r.siswa.usia} th)</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Jenis Kelamin:</span>
                  <span className="font-semibold">{r.siswa.jenisKelamin}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Status Pengasuhan:</span>
                  <span className="font-semibold">{r.siswa.statusPendampinganOrtu}</span>
                </div>
              </div>
            </div>

            {/* Kronologi & Tindakan Awal */}
            <div className="space-y-3 text-xs">
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Kronologi Kejadian Lengkap:</h4>
                <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-slate-700 leading-relaxed whitespace-pre-line">
                  {r.deskripsiKronologi}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">Tindakan Awal Sekolah:</h4>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
                  {r.tindakanAwalSekolah}
                </div>
              </div>
            </div>

            {/* Evidence Attachments (Bukti Awal) */}
            {r.buktiAwal && r.buktiAwal.length > 0 && (
              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Paperclip className="w-4 h-4 text-emerald-600" />
                  Bukti Pendukung Awal Laporan Terlampir:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {r.buktiAwal.map((ev) => (
                    <div
                      key={ev.id}
                      className="p-3 rounded-xl border border-slate-200 bg-white shadow-sm flex items-start gap-3"
                    >
                      {ev.fileType === 'image' && ev.fileUrl && ev.fileUrl !== '#' ? (
                        <div
                          onClick={() =>
                            setLightboxImage({
                              url: ev.fileUrl!,
                              title: ev.fileName,
                              subtitle: `Diunggah oleh ${ev.uploadedBy} • ${ev.uploadedAt}`,
                            })
                          }
                          className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden relative group cursor-pointer flex-shrink-0 border border-slate-200"
                        >
                          <img
                            src={ev.fileUrl}
                            alt={ev.fileName}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <ZoomIn className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 font-bold">
                          <FileText className="w-6 h-6" />
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-slate-900 truncate">{ev.fileName}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          {ev.uploadedBy}
                        </div>
                        <div className="text-[10px] text-slate-400">{ev.uploadedAt}</div>

                        {ev.fileType === 'image' && ev.fileUrl && ev.fileUrl !== '#' && (
                          <button
                            type="button"
                            onClick={() =>
                              setLightboxImage({
                                url: ev.fileUrl!,
                                title: ev.fileName,
                                subtitle: `Diunggah oleh ${ev.uploadedBy} • ${ev.uploadedAt}`,
                              })
                            }
                            className="text-[11px] text-blue-600 font-bold hover:underline flex items-center gap-1 mt-1"
                          >
                            <Camera className="w-3 h-3" />
                            <span>Lihat Foto Dokumentasi</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Disposisi Resmi Kabid Dikdas */}
            {r.disposisiDinas && (
              <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                    Lembar Disposisi Resmi Kabid Dikdas
                  </h4>
                  <span className="text-[11px] font-mono font-bold text-amber-800">
                    No: {r.disposisiDinas.nomorSuratDisposisi}
                  </span>
                </div>

                <p className="text-xs text-slate-800 font-medium italic bg-white p-3 rounded-lg border border-amber-200/80">
                  "{r.disposisiDinas.arahanKabid}"
                </p>

                <div className="text-xs pt-1">
                  <span className="text-amber-800 font-semibold block">Tim Terpadu Ditugaskan:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {r.disposisiDinas.timTerpaduAssigned.map((team, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[11px] font-semibold"
                      >
                        {team}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Case Progress Timeline Logs & Photo Evidence uploaded by School */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Rekam Jejak Perkembangan Penanganan Kasus ({r.perkembanganLogs.length})</span>
                </h4>
                {r.perkembanganLogs.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-bold">
                    Diperbarui Sekolah
                  </span>
                )}
              </div>

              <div className="space-y-4 relative pl-4 border-l-2 border-blue-500">
                {r.perkembanganLogs.length === 0 ? (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-400 italic">
                    Belum ada catatan perkembangan lanjutan atau foto dokumentasi yang diunggah dari sekolah.
                  </div>
                ) : (
                  r.perkembanganLogs.map((log) => (
                    <div
                      key={log.id}
                      className="relative bg-slate-50 p-4 rounded-xl border border-slate-200/90 text-xs space-y-2.5 shadow-sm"
                    >
                      <span className="absolute -left-[21px] top-4 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white"></span>
                      
                      {/* Log Header */}
                      <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                        <div className="flex items-center gap-2">
                          <strong className="text-slate-900 font-bold">{log.dilaporkanOleh}</strong>
                          {log.statusSaatIni && (
                            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                              {log.statusSaatIni}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-mono text-slate-400">{log.tanggal}</span>
                      </div>

                      {/* Tindakan & Hasil */}
                      <div className="space-y-1.5 text-slate-800">
                        <p className="leading-relaxed">
                          <strong className="text-slate-900">Tindakan Perkembangan:</strong>{' '}
                          {log.tindakanPerkembangan}
                        </p>
                        <p className="leading-relaxed">
                          <strong className="text-slate-900">Hasil Konseling & Kondisi Anak:</strong>{' '}
                          {log.hasilKonseling}
                        </p>
                      </div>

                      {/* Foto Dokumentasi & Bukti Perkembangan Tambahan */}
                      {log.buktiTambahan && log.buktiTambahan.length > 0 && (
                        <div className="pt-2 border-t border-slate-200/80 space-y-2">
                          <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                            <Camera className="w-3.5 h-3.5 text-blue-600" />
                            <span>Foto Dokumentasi & Berkas Terlampir ({log.buktiTambahan.length}):</span>
                          </span>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {log.buktiTambahan.map((ev) => (
                              <div
                                key={ev.id}
                                className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-sm flex items-center gap-3"
                              >
                                {ev.fileType === 'image' && ev.fileUrl && ev.fileUrl !== '#' ? (
                                  <div
                                    onClick={() =>
                                      setLightboxImage({
                                        url: ev.fileUrl!,
                                        title: ev.fileName,
                                        subtitle: `Dokumentasi Kasus oleh ${ev.uploadedBy} • ${ev.uploadedAt}`,
                                      })
                                    }
                                    className="w-14 h-14 rounded bg-slate-100 overflow-hidden relative group cursor-pointer flex-shrink-0 border border-slate-200"
                                  >
                                    <img
                                      src={ev.fileUrl}
                                      alt={ev.fileName}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    />
                                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                      <ZoomIn className="w-4 h-4 text-white" />
                                    </div>
                                  </div>
                                ) : (
                                  <div className="w-10 h-10 rounded bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                                    <FileText className="w-5 h-5" />
                                  </div>
                                )}

                                <div className="min-w-0 flex-1">
                                  <div className="font-bold text-slate-800 text-xs truncate">
                                    {ev.fileName}
                                  </div>
                                  <div className="text-[10px] text-slate-400">
                                    {ev.uploadedAt}
                                  </div>
                                  {ev.fileType === 'image' && ev.fileUrl && ev.fileUrl !== '#' && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setLightboxImage({
                                          url: ev.fileUrl!,
                                          title: ev.fileName,
                                          subtitle: `Dokumentasi Kasus oleh ${ev.uploadedBy} • ${ev.uploadedAt}`,
                                        })
                                      }
                                      className="text-[10px] text-blue-600 font-bold hover:underline flex items-center gap-1 mt-0.5"
                                    >
                                      <ZoomIn className="w-3 h-3" />
                                      <span>Perbesar Foto</span>
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Resolution Summary if Completed */}
            {r.status === 'Selesai & Diarsipkan' && r.catatanPenyelesaian && (
              <div className="p-4 bg-emerald-100/70 rounded-xl border border-emerald-300 text-xs text-emerald-950 space-y-1">
                <strong className="font-bold flex items-center gap-1.5 text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  Catatan Penyelesaian Akhir & Arsip Digital Daerah
                </strong>
                <p>{r.catatanPenyelesaian}</p>
                <div className="text-[10px] text-emerald-800 pt-1">
                  Selesai Pada: {r.tglSelesai}
                </div>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-end">
            <button
              onClick={() => setSelectedReportForDetail(null)}
              className="px-5 py-2 rounded-lg bg-slate-800 text-white text-xs font-semibold hover:bg-slate-900"
            >
              Tutup
            </button>
          </div>

        </div>
      </div>

      {/* Lightbox Modal for Photo Inspection */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-[60] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-amber-400" />
                  <span>{lightboxImage.title}</span>
                </h3>
                {lightboxImage.subtitle && (
                  <p className="text-xs text-slate-400 mt-0.5">{lightboxImage.subtitle}</p>
                )}
              </div>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo View */}
            <div className="p-4 flex items-center justify-center bg-black/80 overflow-auto max-h-[75vh]">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Lightbox Footer */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 text-center">
              <button
                onClick={() => setLightboxImage(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
              >
                Tutup Pratinjau Foto
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
