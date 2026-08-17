import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, KeyRound, CheckCircle2, AlertCircle, X, Shield } from 'lucide-react';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
  const { userSession, changeAdminPassword, changeSchoolPassword } = useApp();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!oldPassword) {
      setErrorMsg('Masukkan password lama Anda.');
      return;
    }

    if (!newPassword || newPassword.length < 4) {
      setErrorMsg('Password baru minimal 4 karakter.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('Konfirmasi password baru tidak cocok.');
      return;
    }

    if (userSession.role === 'ADMIN_DINAS') {
      const res = changeAdminPassword(oldPassword, newPassword);
      if (res.success) {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        onClose();
      } else {
        setErrorMsg(res.message);
      }
    } else if (userSession.role === 'AKUN_SEKOLAH' && userSession.npsn) {
      const res = changeSchoolPassword(userSession.npsn, oldPassword, newPassword);
      if (res.success) {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        onClose();
      } else {
        setErrorMsg(res.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-blue-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-800 flex items-center justify-center text-blue-200">
              <KeyRound className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Ubah Password Akun</h3>
              <p className="text-[11px] text-blue-200">
                {userSession.role === 'ADMIN_DINAS'
                  ? 'Akun Admin Dinas Dikpora'
                  : `Akun Sekolah (${userSession.schoolName || userSession.npsn})`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-blue-200 hover:text-white hover:bg-blue-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              Password Saat Ini
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Masukkan password lama"
              required
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-blue-600" />
              Password Baru
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Masukkan password baru (min 4 karakter)"
              required
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Konfirmasi Password Baru
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Ulangi password baru"
              required
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Shield className="w-4 h-4" />
              <span>Simpan Password Baru</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
