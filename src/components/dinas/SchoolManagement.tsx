import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { School, SchoolLevel } from '../../types';
import { KECAMATAN_MAGETAN } from '../../data/mockData';
import {
  Building2,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  X,
  Save,
  Phone,
  Mail,
  MapPin,
  User,
  KeyRound,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';

export const SchoolManagement: React.FC = () => {
  const { schools, addSchool, updateSchool, deleteSchool, resetSchoolPassword } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<SchoolLevel | 'ALL'>('ALL');
  const [kecamatanFilter, setKecamatanFilter] = useState('ALL');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSchool, setEditingSchool] = useState<School | null>(null);
  const [resetModalSchool, setResetModalSchool] = useState<School | null>(null);
  const [customResetPassword, setCustomResetPassword] = useState('');

  const [formData, setFormData] = useState({
    npsn: '',
    namaSekolah: '',
    jenjang: 'SD' as SchoolLevel,
    kecamatan: KECAMATAN_MAGETAN[0],
    alamat: '',
    namaKepalaSekolah: '',
    kontakHp: '',
    email: '',
    statusAktif: true,
    jumlahSiswa: 150,
  });

  const handleOpenAdd = () => {
    setEditingSchool(null);
    setFormData({
      npsn: '',
      namaSekolah: '',
      jenjang: 'SD',
      kecamatan: KECAMATAN_MAGETAN[0],
      alamat: '',
      namaKepalaSekolah: '',
      kontakHp: '',
      email: '',
      statusAktif: true,
      jumlahSiswa: 150,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (school: School) => {
    setEditingSchool(school);
    setFormData({
      npsn: school.npsn,
      namaSekolah: school.namaSekolah,
      jenjang: school.jenjang,
      kecamatan: school.kecamatan,
      alamat: school.alamat,
      namaKepalaSekolah: school.namaKepalaSekolah,
      kontakHp: school.kontakHp,
      email: school.email,
      statusAktif: school.statusAktif,
      jumlahSiswa: school.jumlahSiswa || 150,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSchool) {
      updateSchool(editingSchool.id, formData);
    } else {
      addSchool(formData);
    }
    setIsModalOpen(false);
  };

  const filteredSchools = schools.filter((sch) => {
    const matchesSearch =
      sch.namaSekolah.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sch.npsn.includes(searchTerm) ||
      sch.namaKepalaSekolah.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'ALL' || sch.jenjang === levelFilter;
    const matchesKecamatan =
      kecamatanFilter === 'ALL' || sch.kecamatan === kecamatanFilter;
    return matchesSearch && matchesLevel && matchesKecamatan;
  });

  const totalSD = schools.filter((s) => s.jenjang === 'SD').length;
  const totalSMP = schools.filter((s) => s.jenjang === 'SMP').length;

  return (
    <div className="space-y-6">
      {/* Top Banner & Action */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-600" />
            Manajemen Sekolah SD & SMP
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Tambah, sunting, dan kelola akun sekolah pelapor di Kabupaten Magetan
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700">
            <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold">
              SD: {totalSD}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold">
              SMP: {totalSMP}
            </span>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Sekolah Baru</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {/* Search */}
        <div className="relative col-span-1 md:col-span-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Cari nama sekolah, NPSN, atau nama Kepala Sekolah..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        {/* Level Filter */}
        <div>
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value as any)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="ALL">Semua Jenjang (SD & SMP)</option>
            <option value="SD">Jenjang SD</option>
            <option value="SMP">Jenjang SMP</option>
          </select>
        </div>

        {/* Kecamatan Filter */}
        <div>
          <select
            value={kecamatanFilter}
            onChange={(e) => setKecamatanFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="ALL">Semua Kecamatan (Magetan)</option>
            {KECAMATAN_MAGETAN.map((kec) => (
              <option key={kec} value={kec}>
                Kec. {kec}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* School List Table / Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Menampilkan {filteredSchools.length} dari {schools.length} sekolah</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Sekolah & NPSN</th>
                <th className="py-3 px-4">Jenjang</th>
                <th className="py-3 px-4">Kecamatan & Alamat</th>
                <th className="py-3 px-4">Kepala Sekolah</th>
                <th className="py-3 px-4">Kontak / Email</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredSchools.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                    Tidak ada sekolah yang sesuai filter pencarian.
                  </td>
                </tr>
              ) : (
                filteredSchools.map((sch) => (
                  <tr key={sch.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">{sch.namaSekolah}</div>
                      <div className="text-[11px] text-blue-600 font-mono">NPSN: {sch.npsn}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          sch.jenjang === 'SD'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {sch.jenjang}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 max-w-[220px]">
                      <div className="font-medium text-slate-800 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span>Kec. {sch.kecamatan}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">{sch.alamat}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800 flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span>{sch.namaKepalaSekolah}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-slate-700 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-blue-600" />
                        <span>{sch.kontakHp}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">{sch.email}</div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {sch.statusAktif ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-100 px-2.5 py-0.5 rounded-full uppercase">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full uppercase">
                          <XCircle className="w-3 h-3 text-rose-600" />
                          Non-Aktif
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setResetModalSchool(sch);
                            setCustomResetPassword(sch.npsn);
                          }}
                          className="px-2 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold flex items-center gap-1 border border-amber-200 transition-colors"
                          title="Reset Password Akun Sekolah"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                          <span>Reset Pass</span>
                        </button>
                        <button
                          onClick={() => handleOpenEdit(sch)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          title="Edit Data Sekolah"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (
                              confirm(
                                `Apakah Anda yakin ingin menghapus sekolah ${sch.namaSekolah}?`
                              )
                            ) {
                              deleteSchool(sch.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                          title="Hapus Sekolah"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {editingSchool ? 'Sunting Data Sekolah' : 'Tambah Sekolah Baru'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    NPSN *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={8}
                    value={formData.npsn}
                    onChange={(e) =>
                      setFormData({ ...formData, npsn: e.target.value })
                    }
                    placeholder="8 Digit NPSN"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Jenjang Sekolah *
                  </label>
                  <select
                    value={formData.jenjang}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        jenjang: e.target.value as SchoolLevel,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="SD">SD (Sekolah Dasar)</option>
                    <option value="SMP">SMP (Sekolah Menengah Pertama)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Sekolah Lengkap *
                </label>
                <input
                  type="text"
                  required
                  value={formData.namaSekolah}
                  onChange={(e) =>
                    setFormData({ ...formData, namaSekolah: e.target.value })
                  }
                  placeholder="Contoh: SMP Negeri 2 Maospati"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kecamatan *
                  </label>
                  <select
                    value={formData.kecamatan}
                    onChange={(e) =>
                      setFormData({ ...formData, kecamatan: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    {KECAMATAN_MAGETAN.map((kec) => (
                      <option key={kec} value={kec}>
                        {kec}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Kepala Sekolah *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.namaKepalaSekolah}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        namaKepalaSekolah: e.target.value,
                      })
                    }
                    placeholder="Nama & Gelar"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Alamat Lengkap
                </label>
                <input
                  type="text"
                  value={formData.alamat}
                  onChange={(e) =>
                    setFormData({ ...formData, alamat: e.target.value })
                  }
                  placeholder="Jl. Raya / Desa RT RW..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    No. HP/WA Kontak *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.kontakHp}
                    onChange={(e) =>
                      setFormData({ ...formData, kontakHp: e.target.value })
                    }
                    placeholder="081234..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Official Sekolah *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="sekolah@dikpora-magetan.go.id"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-700 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Data</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {resetModalSchool && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 p-6 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Reset Password Akun Sekolah</h3>
                  <p className="text-[11px] text-slate-500">{resetModalSchool.namaSekolah}</p>
                </div>
              </div>
              <button
                onClick={() => setResetModalSchool(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
              <span className="font-bold block">Reset Ke Password Default:</span>
              <p className="text-amber-800">
                Password default untuk akun sekolah adalah sama dengan NPSN: <strong className="font-mono font-bold text-amber-950">{resetModalSchool.npsn}</strong>
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Password Baru Akun Sekolah</label>
              <input
                type="text"
                value={customResetPassword}
                onChange={(e) => setCustomResetPassword(e.target.value)}
                placeholder="NPSN atau password baru"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setResetModalSchool(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  resetSchoolPassword(resetModalSchool.id, customResetPassword);
                  setResetModalSchool(null);
                }}
                className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Proses Reset Password</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
