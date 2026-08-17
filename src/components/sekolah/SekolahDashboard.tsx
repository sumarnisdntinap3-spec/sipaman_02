import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IncidentReport } from '../../types';
import {
  ShieldAlert,
  Plus,
  Search,
  Clock,
  CheckCircle2,
  TrendingUp,
  FileText,
  Eye,
  PlusCircle,
  Building2,
  Lock,
  Printer,
  Sparkles,
  MapPin,
  Calendar,
} from 'lucide-react';

interface SekolahDashboardProps {
  onOpenCreateReport: () => void;
  onOpenUpdateProgress: (report: IncidentReport) => void;
}

export const SekolahDashboard: React.FC<SekolahDashboardProps> = ({
  onOpenCreateReport,
  onOpenUpdateProgress,
}) => {
  const {
    reports,
    userSession,
    setSelectedReportForDetail,
    setSelectedReportForPrint,
    setIsAiModalOpen,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Filter reports submitted by current school
  const myReports = reports.filter((r) => r.sekolahId === userSession.schoolId);

  const totalMyReports = myReports.length;
  const waitingResponse = myReports.filter(
    (r) => r.status === 'Menunggu Verifikasi'
  ).length;
  const activeHandling = myReports.filter(
    (r) =>
      r.status === 'Diverifikasi Dinas' ||
      r.status === 'Penanganan Terpadu' ||
      r.status === 'Proses Pendampingan'
  ).length;
  const resolvedCount = myReports.filter(
    (r) => r.status === 'Selesai & Diarsipkan'
  ).length;

  const filteredMyReports = myReports.filter((r) => {
    const matchesSearch =
      r.nomorLaporan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.siswa.inisialNama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.deskripsiKronologi.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === 'MENUNGGU') return r.status === 'Menunggu Verifikasi';
    if (statusFilter === 'AKTIF')
      return (
        r.status === 'Diverifikasi Dinas' ||
        r.status === 'Penanganan Terpadu' ||
        r.status === 'Proses Pendampingan'
      );
    if (statusFilter === 'SELESAI') return r.status === 'Selesai & Diarsipkan';

    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* School Portal Banner */}
      <div className="bg-blue-900 text-white p-6 rounded-2xl shadow-md border border-blue-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded bg-blue-800 text-blue-200 text-[10px] font-bold uppercase tracking-wider border border-blue-700 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              Portal Pelaporan Sekolah — NPSN: {userSession.npsn}
            </span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            {userSession.schoolName}
          </h2>
          <p className="text-xs text-blue-200/90 mt-1 max-w-xl">
            Laporkan kejadian masalah anak secara real-time disertai bukti pendukung. Dinas Dikpora Magetan akan menindaklanjuti secara terpadu.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCreateReport}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Laporan Kejadian Baru</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">
            Total Dilaporkan
          </span>
          <span className="text-2xl font-bold text-blue-600">
            {totalMyReports}
          </span>
          <span className="text-[11px] text-slate-500 mt-1">Laporan dari sekolah ini</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] uppercase font-bold text-amber-500 mb-1">
            Menunggu Respon
          </span>
          <span className="text-2xl font-bold text-slate-900">
            {waitingResponse}
          </span>
          <span className="text-[11px] text-amber-600 font-medium mt-1">Sedang ditinjau verifikator</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] uppercase font-bold text-indigo-500 mb-1">
            Penanganan Aktif
          </span>
          <span className="text-2xl font-bold text-slate-900">
            {activeHandling}
          </span>
          <span className="text-[11px] text-indigo-600 font-medium mt-1">Dalam pendampingan terpadu</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] uppercase font-bold text-green-600 mb-1">
            Selesai & Tuntas
          </span>
          <span className="text-2xl font-bold text-slate-900">
            {resolvedCount}
          </span>
          <span className="text-[11px] text-green-600 font-medium mt-1">Arsip Digital Daerah</span>
        </div>
      </div>

      {/* Reports List Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Daftar Laporan & Perkembangan Kasus
            </h3>
            <p className="text-xs text-slate-500">
              Pantau respon dinas, unggah bukti pendukung, dan catat kemajuan pendampingan secara berkala
            </p>
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Cari laporan sekolah ini..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>

        {/* Filter Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              statusFilter === 'ALL'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>Semua Kasus</span>
            <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">
              {totalMyReports}
            </span>
          </button>

          <button
            onClick={() => setStatusFilter('MENUNGGU')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              statusFilter === 'MENUNGGU'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            <span>Menunggu Verifikasi</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-200 text-amber-900 text-[10px]">
              {waitingResponse}
            </span>
          </button>

          <button
            onClick={() => setStatusFilter('AKTIF')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              statusFilter === 'AKTIF'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
            }`}
          >
            <span>Proses Penanganan</span>
            <span className="px-1.5 py-0.2 rounded-full bg-blue-200 text-blue-900 text-[10px]">
              {activeHandling}
            </span>
          </button>

          <button
            onClick={() => setStatusFilter('SELESAI')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              statusFilter === 'SELESAI'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>Selesai & Diarsipkan</span>
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-200 text-emerald-900 text-[10px]">
              {resolvedCount}
            </span>
          </button>
        </div>

        {/* Table / Cards */}
        <div className="space-y-3">
          {filteredMyReports.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              Belum ada laporan masalah anak yang diajukan oleh {userSession.schoolName}.
            </div>
          ) : (
            filteredMyReports.map((report) => (
              <div
                key={report.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-all bg-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-600">
                      #{report.nomorLaporan}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        report.status === 'Menunggu Verifikasi'
                          ? 'bg-amber-100 text-amber-700'
                          : report.status === 'Selesai & Diarsipkan'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {report.status}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                      {report.kategori}
                    </span>
                  </div>

                  <div className="text-xs text-slate-700 flex items-center gap-3">
                    <span>
                      Siswa: <strong>{report.siswa.inisialNama}</strong> ({report.siswa.kelas})
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <Calendar className="w-3 h-3" />
                      {report.tanggalKejadian}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2">
                    "{report.deskripsiKronologi}"
                  </p>

                  {/* Disposisi Dinas Note Highlight if available */}
                  {report.disposisiDinas && (
                    <div className="mt-2 p-2.5 bg-blue-50/80 rounded-lg border border-blue-200 text-xs text-blue-900">
                      <strong className="font-semibold block">
                        Arahan Disposisi Dinas ({report.disposisiDinas.diresponOleh}):
                      </strong>
                      <span className="italic">"{report.disposisiDinas.arahanKabid}"</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setSelectedReportForDetail(report)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Detail</span>
                  </button>

                  <button
                    onClick={() => onOpenUpdateProgress(report)}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1 shadow-sm"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Update Perkembangan</span>
                  </button>

                  {report.disposisiDinas && (
                    <button
                      onClick={() => setSelectedReportForPrint(report)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white"
                      title="Cetak Surat Disposisi / Tanda Terima"
                    >
                      <Printer className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
};
