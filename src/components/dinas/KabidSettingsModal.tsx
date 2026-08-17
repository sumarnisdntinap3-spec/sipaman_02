import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Save, UserCheck, ShieldCheck, PhoneCall, Mail } from 'lucide-react';

interface KabidSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KabidSettingsModal: React.FC<KabidSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { kabidConfig, updateKabidConfig } = useApp();

  const [form, setForm] = useState({
    namaKabid: kabidConfig.namaKabid,
    nipKabid: kabidConfig.nipKabid,
    jabatan: kabidConfig.jabatan,
    stafVerifikator: kabidConfig.stafVerifikator,
    kontakCallCenter: kabidConfig.kontakCallCenter,
    emailOfficial: kabidConfig.emailOfficial,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateKabidConfig(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Pengaturan Pejabat & Verifikator
              </h3>
              <p className="text-xs text-slate-500">
                Nama dan NIP akan tercetak pada Lembar Disposisi & Laporan Resmi
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Kepala Bidang Pendidikan Dasar *
            </label>
            <input
              type="text"
              required
              value={form.namaKabid}
              onChange={(e) => setForm({ ...form, namaKabid: e.target.value })}
              placeholder="Contoh: Drs. ENDANG SRI WAHYUNI, M.Pd."
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              NIP Kabid Dikdas *
            </label>
            <input
              type="text"
              required
              value={form.nipKabid}
              onChange={(e) => setForm({ ...form, nipKabid: e.target.value })}
              placeholder="Contoh: 19720515 199802 2 003"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Jabatan Resmi
            </label>
            <input
              type="text"
              value={form.jabatan}
              onChange={(e) => setForm({ ...form, jabatan: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Staf Verifikator Penanggung Jawab
            </label>
            <input
              type="text"
              value={form.stafVerifikator}
              onChange={(e) => setForm({ ...form, stafVerifikator: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-slate-500" />
                Hotline / Call Center
              </label>
              <input
                type="text"
                value={form.kontakCallCenter}
                onChange={(e) => setForm({ ...form, kontakCallCenter: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                Email Official
              </label>
              <input
                type="email"
                value={form.emailOfficial}
                onChange={(e) => setForm({ ...form, emailOfficial: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 shadow-md transition-colors"
            >
              <Save className="w-4 h-4" />
              Simpan Pengaturan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
