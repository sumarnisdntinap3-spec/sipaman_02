import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MagetanLogo } from '../common/MagetanLogo';
import {
  X,
  Award,
  Building2,
  Lock,
  User,
  LogIn,
  AlertCircle,
  KeyRound,
  ShieldCheck,
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLandingPage?: boolean;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, isLandingPage = false }) => {
  const { login } = useApp();

  const [activeRoleTab, setActiveRoleTab] = useState<'ADMIN' | 'SEKOLAH'>('ADMIN');
  
  // Clean, secure form states without hardcoded default credentials displayed
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const [schoolNpsn, setSchoolNpsn] = useState('');
  const [schoolPassword, setSchoolPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!adminUsername || !adminPassword) {
      setErrorMessage('Mohon isi Username dan Password Admin.');
      return;
    }
    const res = login('ADMIN_DINAS', adminUsername, adminPassword);
    if (res.success) {
      onClose();
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleSchoolSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!schoolNpsn || !schoolPassword) {
      setErrorMessage('Mohon isi NPSN Sekolah dan Password.');
      return;
    }
    const res = login('AKUN_SEKOLAH', schoolNpsn, schoolPassword);
    if (res.success) {
      onClose();
    } else {
      setErrorMessage(res.message);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fadeIn ${
        isLandingPage ? 'overflow-y-auto py-8' : ''
      }`}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden transition-all my-auto">
        
        {/* Branding Banner Header */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900 text-white p-6 relative text-center flex flex-col items-center">
          {!isLandingPage && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-blue-800/60 hover:bg-blue-800 text-blue-200 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="p-2.5 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 mb-3">
            <MagetanLogo className="w-14 h-16" />
          </div>

          <span className="inline-block px-3 py-0.5 rounded-full bg-blue-800/80 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-blue-700/50 mb-1">
            Kabupaten Magetan
          </span>

          <h2 className="text-xl font-black text-white tracking-tight">
            SI PAMAN MAGETAN
          </h2>
          <p className="text-xs text-blue-200/90 leading-tight mt-0.5">
            Sistem Informasi Penanganan Masalah Anak
          </p>
          <p className="text-[11px] text-blue-300 font-medium">
            Dinas Pendidikan Kepemudaan dan Olahraga
          </p>
        </div>

        {/* Form Body Container */}
        <div className="p-6 space-y-5">
          
          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold">Gagal Masuk Ke Sistem</span>
                <p className="text-rose-700 leading-relaxed">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Role Tab Selector */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setActiveRoleTab('ADMIN');
                setErrorMessage('');
              }}
              className={`py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
                activeRoleTab === 'ADMIN'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Login Admin</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveRoleTab('SEKOLAH');
                setErrorMessage('');
              }}
              className={`py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
                activeRoleTab === 'SEKOLAH'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4 text-blue-200" />
              <span>Login Sekolah</span>
            </button>
          </div>

          {/* ADMIN LOGIN FORM */}
          {activeRoleTab === 'ADMIN' && (
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  Username
                </label>
                <input
                  type="text"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  placeholder="Masukkan Username Admin"
                  required
                  autoFocus
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-blue-600" />
                  Password
                </label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Masukkan Password"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 mt-2"
              >
                <LogIn className="w-4 h-4 text-amber-300" />
                <span>Masuk Sebagai Admin Dinas</span>
              </button>
            </form>
          )}

          {/* SCHOOL LOGIN FORM */}
          {activeRoleTab === 'SEKOLAH' && (
            <form onSubmit={handleSchoolSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  Username (NPSN Sekolah)
                </label>
                <input
                  type="text"
                  value={schoolNpsn}
                  onChange={(e) => setSchoolNpsn(e.target.value)}
                  placeholder="Masukkan NPSN Sekolah"
                  required
                  autoFocus
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                  Password Akun Sekolah
                </label>
                <input
                  type="password"
                  value={schoolPassword}
                  onChange={(e) => setSchoolPassword(e.target.value)}
                  placeholder="Masukkan Password"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 mt-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk Akun Sekolah</span>
              </button>
            </form>
          )}

          {/* Footer note */}
          <div className="pt-3 text-center text-[11px] text-slate-400 border-t border-slate-100 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Akses Otentikasi Terenkripsi & Terintegrasi</span>
          </div>

        </div>

      </div>
    </div>
  );
};
