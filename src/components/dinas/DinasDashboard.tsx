import React from 'react';
import { useApp } from '../../context/AppContext';
import { IncidentReport } from '../../types';
import {
  ShieldAlert,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Building2,
  TrendingUp,
  FileCheck,
  Eye,
  ArrowUpRight,
  ShieldCheck,
  MapPin,
  Calendar,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

interface DinasDashboardProps {
  onNavigateToReports: () => void;
  onOpenReportDetail: (report: IncidentReport) => void;
}

const COLORS = [
  '#059669', // Emerald
  '#2563eb', // Blue
  '#d97706', // Amber
  '#dc2626', // Red
  '#7c3aed', // Purple
  '#0891b2', // Cyan
  '#db2777', // Pink
  '#475569', // Slate
];

export const DinasDashboard: React.FC<DinasDashboardProps> = ({
  onNavigateToReports,
  onOpenReportDetail,
}) => {
  const { reports, schools, kabidConfig } = useApp();

  // Metrics
  const totalReports = reports.length;
  const pendingVerification = reports.filter(
    (r) => r.status === 'Menunggu Verifikasi'
  ).length;
  const inProgress = reports.filter(
    (r) =>
      r.status === 'Diverifikasi Dinas' ||
      r.status === 'Penanganan Terpadu' ||
      r.status === 'Proses Pendampingan'
  ).length;
  const resolved = reports.filter((r) => r.status === 'Selesai & Diarsipkan').length;
  const urgentCount = reports.filter(
    (r) => r.urgensi === 'Sangat Mendesak' && r.status !== 'Selesai & Diarsipkan'
  ).length;

  // Category Distribution
  const categoryMap: { [key: string]: number } = {};
  reports.forEach((r) => {
    categoryMap[r.kategori] = (categoryMap[r.kategori] || 0) + 1;
  });
  const categoryData = Object.keys(categoryMap).map((cat) => ({
    name: cat,
    jumlah: categoryMap[cat],
  }));

  // Level Breakdown (SD vs SMP)
  const sdCount = reports.filter((r) => r.jenjang === 'SD').length;
  const smpCount = reports.filter((r) => r.jenjang === 'SMP').length;
  const levelData = [
    { name: 'Sekolah Dasar (SD)', value: sdCount },
    { name: 'Sekolah Menengah Pertama (SMP)', value: smpCount },
  ];

  // Kecamatan Distribution
  const kecMap: { [key: string]: number } = {};
  reports.forEach((r) => {
    kecMap[r.kecamatan] = (kecMap[r.kecamatan] || 0) + 1;
  });
  const kecData = Object.keys(kecMap).map((k) => ({
    kecamatan: `Kec. ${k}`,
    total: kecMap[k],
  }));

  const recentPendingReports = reports
    .filter((r) => r.status === 'Menunggu Verifikasi')
    .slice(0, 5);

  return (
    <div className="space-y-6">
      
      {/* Official Welcome Banner */}
      <div className="bg-blue-900 text-white rounded-2xl p-6 shadow-md border border-blue-800 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded bg-blue-800 text-blue-200 text-[10px] font-bold uppercase tracking-wider border border-blue-700">
                Monitoring Real-Time Dikdas
              </span>
              {urgentCount > 0 && (
                <span className="px-2.5 py-1 rounded bg-red-500/20 text-red-200 text-[10px] font-bold uppercase tracking-wider border border-red-500/30 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                  {urgentCount} Kasus Urgent
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Selamat Datang, {kabidConfig.namaKabid}
            </h2>
            <p className="text-xs sm:text-sm text-blue-200/90 mt-1 max-w-2xl">
              Sistem Informasi Penanganan Masalah Anak (SI PAMAN) Dinas Pendidikan Kepemudaan dan Olahraga Kabupaten Magetan.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToReports}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Verifikasi Laporan ({pendingVerification})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Reports */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">
            Total Laporan
          </span>
          <span className="text-2xl font-bold text-blue-600">
            {totalReports}
          </span>
          <span className="text-[11px] text-slate-500 mt-1">
            {schools.length} Sekolah Terdaftar
          </span>
        </div>

        {/* Pending Verification */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] uppercase font-bold text-amber-500 mb-1">
            Menunggu Verifikasi
          </span>
          <span className="text-2xl font-bold text-slate-900">
            {pendingVerification}
          </span>
          <span className="text-[11px] text-amber-600 font-medium mt-1">
            Perlu Disposisi Kabid
          </span>
        </div>

        {/* Penanganan Terpadu */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] uppercase font-bold text-indigo-500 mb-1">
            Dalam Penanganan
          </span>
          <span className="text-2xl font-bold text-slate-900">
            {inProgress}
          </span>
          <span className="text-[11px] text-indigo-600 font-medium mt-1">
            Proses Pendampingan
          </span>
        </div>

        {/* Selesai & Diarsipkan */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] uppercase font-bold text-green-600 mb-1">
            Kasus Selesai
          </span>
          <span className="text-2xl font-bold text-slate-900">
            {resolved}
          </span>
          <span className="text-[11px] text-green-600 font-medium mt-1">
            Tuntas & Diarsipkan
          </span>
        </div>

      </div>

      {/* Analytics Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Category Distribution Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Sebaran Kategori Masalah Anak
              </h3>
              <p className="text-xs text-slate-500">
                Klasifikasi kasus yang dilaporkan sekolah di Magetan
              </p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  angle={-15}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="jumlah" fill="#1d4ed8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Level SD vs SMP Breakdown */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Proporsi Kasus (SD vs SMP)
            </h3>
            <p className="text-xs text-slate-500 mb-3">
              Perbandingan tingkat jenjang sekolah
            </p>
            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={levelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill="#f59e0b" />
                    <Cell fill="#1d4ed8" />
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>

      {/* Real-time Pending Reports Requiring Action */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
            <h3 className="text-sm font-bold text-slate-700">
              Laporan Masuk Terbaru & Menunggu Verifikasi
            </h3>
          </div>
          <button
            onClick={onNavigateToReports}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>Lihat Semua ({pendingVerification})</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {recentPendingReports.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              <CheckCircle2 className="w-8 h-8 mx-auto text-green-500/50 mb-2" />
              <span>Semua laporan telah diverifikasi dan ditindaklanjuti. Tidak ada antrean baru.</span>
            </div>
          ) : (
            recentPendingReports.map((report) => (
              <div
                key={report.id}
                className="p-4 hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-600">
                      #{report.nomorLaporan}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        report.urgensi === 'Sangat Mendesak'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {report.urgensi}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                      {report.kategori}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-slate-800 flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{report.namaSekolah}</span>
                    <span className="text-slate-400">•</span>
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Kec. {report.kecamatan}</span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-1 italic">
                    "{report.deskripsiKronologi}"
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => onOpenReportDetail(report)}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Tinjau & Disposisi</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};
