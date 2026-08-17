import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Agency, AgencyCategory } from '../../types';
import {
  Building,
  Plus,
  Search,
  Phone,
  Mail,
  MapPin,
  UserCheck,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  X,
  ShieldAlert,
  Building2,
  SlidersHorizontal,
} from 'lucide-react';

export const AgencyManagement: React.FC = () => {
  const { agencies, addAgency, updateAgency, deleteAgency } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('SEMUA');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAgency, setEditingAgency] = useState<Agency | null>(null);

  // Form State
  const [namaInstansi, setNamaInstansi] = useState('');
  const [kategori, setKategori] = useState<AgencyCategory>('Perlindungan Anak');
  const [kontakPhone, setKontakPhone] = useState('');
  const [email, setEmail] = useState('');
  const [alamat, setAlamat] = useState('');
  const [namaPJ, setNamaPJ] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [statusAktif, setStatusAktif] = useState(true);

  const openAddModal = () => {
    setEditingAgency(null);
    setNamaInstansi('');
    setKategori('Perlindungan Anak');
    setKontakPhone('');
    setEmail('');
    setAlamat('');
    setNamaPJ('');
    setKeterangan('');
    setStatusAktif(true);
    setIsModalOpen(true);
  };

  const openEditModal = (ag: Agency) => {
    setEditingAgency(ag);
    setNamaInstansi(ag.namaInstansi);
    setKategori(ag.kategori);
    setKontakPhone(ag.kontakPhone);
    setEmail(ag.email);
    setAlamat(ag.alamat);
    setNamaPJ(ag.namaPJ);
    setKeterangan(ag.keterangan || '');
    setStatusAktif(ag.statusAktif);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAgency) {
      updateAgency(editingAgency.id, {
        namaInstansi,
        kategori,
        kontakPhone,
        email,
        alamat,
        namaPJ,
        keterangan,
        statusAktif,
      });
    } else {
      addAgency({
        namaInstansi,
        kategori,
        kontakPhone,
        email,
        alamat,
        namaPJ,
        keterangan,
        statusAktif,
      });
    }
    setIsModalOpen(false);
  };

  const filteredAgencies = agencies.filter((ag) => {
    const matchQuery =
      ag.namaInstansi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ag.namaPJ.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ag.alamat.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === 'SEMUA' || ag.kategori === selectedCategory;
    return matchQuery && matchCat;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Banner Header */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg">
            <Building className="w-6 h-6 text-blue-600" />
            <span>Instansi & Lintas Sektor Penanganan Anak</span>
          </div>
          <p className="text-xs text-slate-500 max-w-2xl">
            Kelola data dinas, kepolisian, instansi kesehatan, dan lembaga perlindungan anak (DP3A, Polres, Dinkes, Dinsos, P2TP2A) yang terintegrasi dalam Disposisi Tim Terpadu Kabupaten Magetan.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95 flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Instansi Terkait</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Cari nama instansi / PJ / alamat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 flex-shrink-0" />
          {['SEMUA', 'Perlindungan Anak', 'Kepolisian', 'Kesehatan', 'Sosial', 'Hukum'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Grid List of Agencies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAgencies.map((ag) => (
          <div
            key={ag.id}
            className={`p-5 rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md flex flex-col justify-between space-y-4 ${
              ag.statusAktif ? 'border-slate-200 hover:border-blue-300' : 'border-slate-200 bg-slate-50/50 opacity-75'
            }`}
          >
            <div className="space-y-2.5">
              
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wider">
                    {ag.kategori}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-1.5 leading-snug">
                    {ag.namaInstansi}
                  </h3>
                </div>

                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 flex-shrink-0 ${
                    ag.statusAktif ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {ag.statusAktif ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                  {ag.statusAktif ? 'Aktif' : 'Non-aktif'}
                </span>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {ag.keterangan || 'Instansi mitra penanganan terpadu perlindungan anak.'}
              </p>

              <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span className="truncate">PJ: <strong>{ag.namaPJ}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span className="font-mono text-[11px]">{ag.kontakPhone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span className="truncate text-[11px]">{ag.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                  <span className="truncate text-[11px]">{ag.alamat}</span>
                </div>
              </div>

            </div>

            {/* Action buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                onClick={() => updateAgency(ag.id, { statusAktif: !ag.statusAktif })}
                className="text-slate-500 hover:text-slate-800 font-medium text-[11px]"
              >
                Set status: {ag.statusAktif ? 'Nonaktifkan' : 'Aktifkan'}
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openEditModal(ag)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Hapus instansi "${ag.namaInstansi}"?`)) {
                      deleteAgency(ag.id);
                    }
                  }}
                  className="px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
            
            <div className="px-6 py-4 bg-blue-900 text-white flex items-center justify-between">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Building className="w-4 h-4 text-amber-300" />
                <span>{editingAgency ? 'Edit Instansi Terkait' : 'Tambah Instansi Terkait Baru'}</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-blue-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Nama Instansi / Lembaga</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: DP3A Kab. Magetan / Polres Magetan"
                  value={namaInstansi}
                  onChange={(e) => setNamaInstansi(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Kategori Lembaga</label>
                  <select
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value as AgencyCategory)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  >
                    <option value="Perlindungan Anak">Perlindungan Anak</option>
                    <option value="Kepolisian">Kepolisian</option>
                    <option value="Kesehatan">Kesehatan</option>
                    <option value="Sosial">Sosial</option>
                    <option value="Hukum">Hukum</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Penanggung Jawab (PJ)</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama & Jabatan PJ"
                    value={namaPJ}
                    onChange={(e) => setNamaPJ(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">No. Telepon / Hotline</label>
                  <input
                    type="text"
                    required
                    placeholder="0812-xxxx-xxxx"
                    value={kontakPhone}
                    onChange={(e) => setKontakPhone(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Email Resmi</label>
                  <input
                    type="email"
                    required
                    placeholder="dinas@magetan.go.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Alamat Kantor / Lokasi</label>
                <input
                  type="text"
                  required
                  placeholder="Jl. Diponegoro No. x, Magetan"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Keterangan / Fungsi Utama</label>
                <textarea
                  rows={2}
                  placeholder="Ringkasan fungsi penanganan..."
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="statusAktifCb"
                  checked={statusAktif}
                  onChange={(e) => setStatusAktif(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label htmlFor="statusAktifCb" className="text-xs font-semibold text-slate-800">
                  Status Instansi Aktif
                </label>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-xs font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                >
                  Simpan Data Instansi
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
