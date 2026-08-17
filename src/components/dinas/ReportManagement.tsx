import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  IncidentReport,
  ReportStatus,
  UrgencyLevel,
  Category,
  SchoolLevel,
  DisposisiDinas,
} from '../../types';
import { KECAMATAN_MAGETAN } from '../../data/mockData';
import {
  ShieldAlert,
  Search,
  Filter,
  Eye,
  FileCheck,
  Send,
  Printer,
  Calendar,
  Building2,
  MapPin,
  Clock,
  UserCheck,
  X,
  FileText,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

export const ReportManagement: React.FC = () => {
  const {
    reports,
    kabidConfig,
    addDisposisi,
    setSelectedReportForDetail,
    setSelectedReportForPrint,
  } = useApp();

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ReportStatus | 'ALL'>('ALL');
  const [urgencyFilter, setUrgencyFilter] = useState<UrgencyLevel | 'ALL'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'ALL'>('ALL');
  const [jenjangFilter, setJenjangFilter] = useState<SchoolLevel | 'ALL'>('ALL');
  const [kecamatanFilter, setKecamatanFilter] = useState('ALL');

  // Disposisi Modal State
  const [disposisiReport, setDisposisiReport] = useState<IncidentReport | null>(null);
  const [arahanText, setArahanText] = useState('');
  const [selectedPartners, setSelectedPartners] = useState<string[]>([
    'Tim TPPK Kabupaten Magetan',
  ]);
  const [priorityLevel, setPriorityLevel] = useState<UrgencyLevel>('Sangat Mendesak');
  const [nextStatus, setNextStatus] = useState<ReportStatus>('Penanganan Terpadu');

  const partnerOptions = [
    'P2TP2A Kab. Magetan',
    'Tim TPPK Kabupaten Magetan',
    'Dinas Sosial Magetan',
    'Psikolog Puskesmas / RSUD Sayidiman Magetan',
    'Pengawas Sekolah Wilayah',
    'Satpol PP Kabupaten Magetan',
    'Kepolisian Resor (Polres) Magetan',
  ];

  const handleTogglePartner = (partner: string) => {
    if (selectedPartners.includes(partner)) {
      setSelectedPartners((prev) => prev.filter((p) => p !== partner));
    } else {
      setSelectedPartners((prev) => [...prev, partner]);
    }
  };

  const handleOpenDisposisiModal = (report: IncidentReport) => {
    setDisposisiReport(report);
    setArahanText(
      report.disposisiDinas?.arahanKabid ||
        'Segera lakukan verifikasi lapangan dan pendampingan terpadu bersama tim terkait. Hak pendidikan anak wajib dijamin.'
    );
    setSelectedPartners(
      report.disposisiDinas?.timTerpaduAssigned || [
        'Tim TPPK Kabupaten Magetan',
        'P2TP2A Kab. Magetan',
      ]
    );
    setPriorityLevel(report.urgensi);
    setNextStatus(
      report.status === 'Menunggu Verifikasi' ? 'Penanganan Terpadu' : report.status
    );
  };

  const handleSaveDisposisi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disposisiReport) return;

    const now = new Date();
    const formattedDate = `${now.toISOString().split('T')[0]} ${now.toTimeString().slice(0, 5)}`;
    const padNum = (reports.length + 10).toString().padStart(3, '0');
    const nomorSurat = `421/${padNum}/403.101/${now.getFullYear()}`;

    const newDisposisi: DisposisiDinas = {
      tglDisposisi: formattedDate,
      diresponOleh: kabidConfig.namaKabid,
      arahanKabid: arahanText,
      timTerpaduAssigned: selectedPartners,
      prioritasTindakan: priorityLevel,
      nomorSuratDisposisi: nomorSurat,
    };

    addDisposisi(disposisiReport.id, newDisposisi, nextStatus);
    setDisposisiReport(null);
  };

  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      r.nomorLaporan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.namaSekolah.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.siswa.inisialNama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.deskripsiKronologi.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || r.status === statusFilter;
    const matchesUrgency = urgencyFilter === 'ALL' || r.urgensi === urgencyFilter;
    const matchesCategory = categoryFilter === 'ALL' || r.kategori === categoryFilter;
    const matchesJenjang = jenjangFilter === 'ALL' || r.jenjang === jenjangFilter;
    const matchesKecamatan =
      kecamatanFilter === 'ALL' || r.kecamatan === kecamatanFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesUrgency &&
      matchesCategory &&
      matchesJenjang &&
      matchesKecamatan
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-blue-600" />
            Kelola Laporan Masuk (Admin Dinas)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Pantau seluruh laporan masuk dari SD & SMP, berikan arahan disposisi resmi Kabid Dikdas
          </p>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          
          {/* Search Input */}
          <div className="relative col-span-1 md:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Cari No. Laporan, Nama Sekolah, Inisial Siswa, Kronologi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="ALL">Semua Status Laporan</option>
              <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
              <option value="Diverifikasi Dinas">Diverifikasi Dinas</option>
              <option value="Penanganan Terpadu">Penanganan Terpadu</option>
              <option value="Proses Pendampingan">Proses Pendampingan</option>
              <option value="Selesai & Diarsipkan">Selesai & Diarsipkan</option>
              <option value="Ditolak">Ditolak</option>
            </select>
          </div>

          {/* Urgency Filter */}
          <div>
            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="ALL">Tingkat Urgensi (Semua)</option>
              <option value="Sangat Mendesak">Sangat Mendesak</option>
              <option value="Perlu Penanganan Cepat">Perlu Penanganan Cepat</option>
              <option value="Rutin">Rutin</option>
            </select>
          </div>

        </div>

        {/* Secondary Filter Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
          <div>
            <select
              value={jenjangFilter}
              onChange={(e) => setJenjangFilter(e.target.value as any)}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="ALL">Semua Jenjang (SD & SMP)</option>
              <option value="SD">Jenjang SD</option>
              <option value="SMP">Jenjang SMP</option>
            </select>
          </div>

          <div>
            <select
              value={kecamatanFilter}
              onChange={(e) => setKecamatanFilter(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="ALL">Semua Kecamatan Magetan</option>
              {KECAMATAN_MAGETAN.map((kec) => (
                <option key={kec} value={kec}>
                  Kec. {kec}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as any)}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="ALL">Semua Kategori Masalah</option>
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
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>
            Menampilkan {filteredReports.length} dari {reports.length} Laporan Masuk
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">ID Laporan & Tgl</th>
                <th className="py-3.5 px-4">Sekolah</th>
                <th className="py-3.5 px-4">Jenis Masalah</th>
                <th className="py-3.5 px-4">Urgensi</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400 text-xs">
                    Tidak ada laporan yang sesuai kriteria filter.
                  </td>
                </tr>
              ) : (
                filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                    
                    {/* No Laporan */}
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-blue-600">
                        #{report.nomorLaporan}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        <span>{report.tglDilaporkan}</span>
                      </div>
                    </td>

                    {/* Sekolah */}
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>{report.namaSekolah}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>Kec. {report.kecamatan}</span>
                      </div>
                    </td>

                    {/* Kategori & Siswa */}
                    <td className="py-3.5 px-4">
                      <div className="text-slate-700 font-medium text-xs">
                        {report.kategori}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Inisial: <strong className="text-slate-600">{report.siswa.inisialNama}</strong> ({report.siswa.kelas})
                      </div>
                    </td>

                    {/* Urgensi */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          report.urgensi === 'Sangat Mendesak'
                            ? 'bg-rose-100 text-rose-800'
                            : report.urgensi === 'Perlu Penanganan Cepat'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {report.urgensi}
                      </span>
                    </td>

                    {/* Status & Evidence Indicators */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          report.status === 'Menunggu Verifikasi'
                            ? 'bg-amber-100 text-amber-700'
                            : report.status === 'Selesai & Diarsipkan'
                            ? 'bg-green-100 text-green-700'
                            : report.status === 'Diverifikasi Dinas'
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {report.status}
                      </span>

                      <div className="flex flex-col gap-0.5 mt-1">
                        {report.disposisiDinas && (
                          <div className="text-[10px] text-blue-600 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-blue-600" />
                            <span>Disposisi Ada</span>
                          </div>
                        )}

                        {report.perkembanganLogs && report.perkembanganLogs.length > 0 && (
                          <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                            <Clock className="w-3 h-3 text-emerald-600" />
                            <span>{report.perkembanganLogs.length} Update Perkembangan</span>
                          </div>
                        )}

                        {/* Count total evidence photos */}
                        {(() => {
                          const initialPhotos = (report.buktiAwal || []).filter((b) => b.fileType === 'image').length;
                          const logPhotos = (report.perkembanganLogs || []).reduce(
                            (acc, log) => acc + (log.buktiTambahan || []).filter((b) => b.fileType === 'image').length,
                            0
                          );
                          const totalPhotos = initialPhotos + logPhotos;
                          if (totalPhotos === 0) return null;
                          return (
                            <div className="text-[10px] text-amber-800 font-semibold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                              <span>{totalPhotos} Foto Dokumentasi</span>
                            </div>
                          );
                        })()}
                      </div>
                    </td>

                    {/* Aksi */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedReportForDetail(report)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                          title="Lihat Detail Kronologi & Timeline"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Detail</span>
                        </button>

                        <button
                          onClick={() => handleOpenDisposisiModal(report)}
                          className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1 transition-colors shadow-sm"
                          title="Input Disposisi Kabid Dikdas"
                        >
                          <FileCheck className="w-3.5 h-3.5" />
                          <span>Disposisi</span>
                        </button>

                        {report.disposisiDinas && (
                          <button
                            onClick={() => setSelectedReportForPrint(report)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white transition-colors"
                            title="Cetak Surat Lembar Disposisi"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Disposisi Modal */}
      {disposisiReport && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 animate-in fade-in zoom-in-95">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Respon & Disposisi Resmi Dinas Dikpora
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Nomor Laporan: {disposisiReport.nomorLaporan} ({disposisiReport.namaSekolah})
                </p>
              </div>
              <button
                onClick={() => setDisposisiReport(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDisposisi} className="mt-4 space-y-4">
              
              {/* Report Summary Card */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="font-semibold text-slate-800">
                  {disposisiReport.kategori} — Usia/Siswa: {disposisiReport.siswa.inisialNama} ({disposisiReport.siswa.kelas})
                </div>
                <p className="text-slate-600 line-clamp-2 italic">
                  "{disposisiReport.deskripsiKronologi}"
                </p>
              </div>

              {/* Status & Priority Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ubah Status Laporan *
                  </label>
                  <select
                    value={nextStatus}
                    onChange={(e) => setNextStatus(e.target.value as ReportStatus)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="Diverifikasi Dinas">Diverifikasi Dinas</option>
                    <option value="Penanganan Terpadu">Penanganan Terpadu (Tim Gabungan)</option>
                    <option value="Proses Pendampingan">Proses Pendampingan Sekolah</option>
                    <option value="Selesai & Diarsipkan">Selesai & Diarsipkan</option>
                    <option value="Ditolak">Ditolak / Informasi Tidak Cukup</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Prioritas Penanganan *
                  </label>
                  <select
                    value={priorityLevel}
                    onChange={(e) => setPriorityLevel(e.target.value as UrgencyLevel)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="Sangat Mendesak">Sangat Mendesak</option>
                    <option value="Perlu Penanganan Cepat">Perlu Penanganan Cepat</option>
                    <option value="Rutin">Rutin</option>
                  </select>
                </div>
              </div>

              {/* Arahan Kabid Dikdas */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Catatan Arahan & Disposisi Kabid Dikdas ({kabidConfig.namaKabid}) *
                </label>
                <textarea
                  required
                  rows={4}
                  value={arahanText}
                  onChange={(e) => setArahanText(e.target.value)}
                  placeholder="Tuliskan arahan resmi tindak lanjut untuk sekolah dan tim terkait..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              {/* Assignment Tim Terpadu Lintas Instansi */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tugaskan Tim Terpadu Lintas Sektor (Magetan)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                  {partnerOptions.map((partner) => {
                    const isChecked = selectedPartners.includes(partner);
                    return (
                      <label
                        key={partner}
                        onClick={() => handleTogglePartner(partner)}
                        className={`px-3 py-2 rounded-lg border text-xs cursor-pointer flex items-center gap-2 transition-all ${
                          isChecked
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="accent-emerald-600 rounded"
                        />
                        <span>{partner}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDisposisiReport(null)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Disposisi Resmi</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
