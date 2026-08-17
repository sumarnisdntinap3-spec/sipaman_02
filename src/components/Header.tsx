import React from 'react';
import { useApp } from '../context/AppContext';
import { MagetanLogo } from './common/MagetanLogo';
import {
  ShieldAlert,
  Building2,
  UserCheck,
  Sparkles,
  Settings,
  LogOut,
  KeyRound,
  Award,
  Building,
  Image as ImageIcon,
} from 'lucide-react';

interface HeaderProps {
  onOpenKabidSettings: () => void;
  onOpenLogoSettings: () => void;
  onOpenLoginModal: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenKabidSettings,
  onOpenLogoSettings,
  onOpenLoginModal,
  activeTab,
  setActiveTab,
}) => {
  const { userSession, kabidConfig, setIsAiModalOpen, setIsChangePasswordOpen, logout } = useApp();

  return (
    <header className="bg-blue-900 text-white border-b border-blue-800 sticky top-0 z-30 shadow-md">
      {/* Top Banner Government Bar */}
      <div className="bg-blue-950 px-4 py-1.5 text-xs text-blue-200 border-b border-blue-800/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-white tracking-wide">
            SI PAMAN — DIKDAS MAGETAN
          </span>
          <span className="hidden sm:inline text-blue-700">|</span>
          <span className="hidden sm:inline text-blue-200/80">
            Dinas Pendidikan Kepemudaan dan Olahraga Kabupaten Magetan
          </span>
        </div>
        <div className="flex items-center gap-4 text-blue-300 text-[11px]">
          <span>Kabid: <strong className="text-white font-semibold">{kabidConfig.namaKabid}</strong></span>
          <span className="hidden md:inline font-mono">NIP: {kabidConfig.nipKabid}</span>
        </div>
      </div>

      {/* Main Brand & Action Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Brand Logo & Title with Magetan Crest */}
          <div className="flex items-center gap-3.5">
            <div className="p-1.5 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex-shrink-0">
              <MagetanLogo className="w-10 h-12" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                  SI PAMAN
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-blue-800 text-amber-300 border border-blue-700">
                    KAB. MAGETAN
                  </span>
                </h1>
              </div>
              <p className="text-xs text-blue-200/90 font-normal">
                Sistem Informasi Penanganan Masalah Anak (SD & SMP)
              </p>
            </div>
          </div>

          {/* Right Action Tools */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            
            {/* AI Assistant Trigger */}
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="px-3 py-2 rounded-xl bg-blue-800 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 border border-blue-700 shadow-sm transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Panduan TPPK AI</span>
            </button>

            {/* Kabid & Logo Settings Buttons (Admin Only) */}
            {userSession.role === 'ADMIN_DINAS' && (
              <>
                <button
                  onClick={onOpenKabidSettings}
                  className="px-3 py-2 rounded-xl bg-blue-950/80 hover:bg-blue-950 text-blue-100 text-xs font-semibold flex items-center gap-1.5 border border-blue-800 transition-colors"
                  title="Atur Nama & NIP Kabid Dikdas"
                >
                  <Settings className="w-4 h-4 text-blue-400" />
                  <span className="hidden md:inline">Set Kabid</span>
                </button>

                <button
                  onClick={onOpenLogoSettings}
                  className="px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 border border-amber-400/30 transition-all"
                  title="Ubah Logo Aplikasi"
                >
                  <ImageIcon className="w-4 h-4 text-amber-300" />
                  <span className="hidden md:inline">Ubah Logo</span>
                </button>
              </>
            )}

            {/* Change Password Button */}
            {userSession.isLoggedIn && (
              <button
                onClick={() => setIsChangePasswordOpen(true)}
                className="px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 border border-amber-400/30 transition-all"
                title="Ubah Password Akun"
              >
                <KeyRound className="w-4 h-4 text-amber-300" />
                <span className="hidden sm:inline">Ubah Password</span>
              </button>
            )}

            {/* User Session Status & Switch Role / Logout */}
            <div className="flex items-center gap-2 pl-2 border-l border-blue-800">
              <div className="text-right hidden lg:block">
                <div className="text-xs font-bold text-white flex items-center justify-end gap-1">
                  {userSession.role === 'ADMIN_DINAS' ? (
                    <>
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>Admin Dinas Dikpora</span>
                    </>
                  ) : (
                    <>
                      <Building2 className="w-3.5 h-3.5 text-blue-300" />
                      <span className="max-w-[160px] truncate">{userSession.schoolName}</span>
                    </>
                  )}
                </div>
                <div className="text-[11px] text-blue-300 font-mono">
                  {userSession.role === 'ADMIN_DINAS'
                    ? 'Akses Verifikasi & Disposisi'
                    : `NPSN: ${userSession.npsn || '-'}`}
                </div>
              </div>

              {userSession.isLoggedIn ? (
                <button
                  onClick={logout}
                  className="px-3 py-2 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                  title="Keluar dari sistem"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar</span>
                </button>
              ) : (
                <button
                  onClick={onOpenLoginModal}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Menu Login</span>
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex items-center gap-2 mt-3 pt-2.5 border-t border-blue-800 overflow-x-auto no-scrollbar">
          {userSession.role === 'ADMIN_DINAS' ? (
            <>
              <button
                onClick={() => setActiveTab('dinas-dashboard')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'dinas-dashboard'
                    ? 'bg-blue-800 text-white border border-blue-700 shadow-sm'
                    : 'text-blue-200 hover:bg-blue-800/50 hover:text-white'
                }`}
              >
                <Award className="w-4 h-4 text-amber-400" />
                Dashboard Utama
              </button>
              <button
                onClick={() => setActiveTab('dinas-reports')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'dinas-reports'
                    ? 'bg-blue-800 text-white border border-blue-700 shadow-sm'
                    : 'text-blue-200 hover:bg-blue-800/50 hover:text-white'
                }`}
              >
                <ShieldAlert className="w-4 h-4 text-emerald-400" />
                Laporan Masuk Real-Time
              </button>
              <button
                onClick={() => setActiveTab('dinas-agencies')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'dinas-agencies'
                    ? 'bg-blue-800 text-white border border-blue-700 shadow-sm'
                    : 'text-blue-200 hover:bg-blue-800/50 hover:text-white'
                }`}
              >
                <Building className="w-4 h-4 text-sky-300" />
                Instansi Terkait (DP3A, Polres, Dinkes)
              </button>
              <button
                onClick={() => setActiveTab('dinas-schools')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'dinas-schools'
                    ? 'bg-blue-800 text-white border border-blue-700 shadow-sm'
                    : 'text-blue-200 hover:bg-blue-800/50 hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4 text-indigo-300" />
                Manajemen Sekolah SD & SMP
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveTab('sekolah-dashboard')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'sekolah-dashboard'
                    ? 'bg-blue-800 text-white border border-blue-700 shadow-sm'
                    : 'text-blue-200 hover:bg-blue-800/50 hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4 text-indigo-300" />
                Dashboard Sekolah
              </button>
              <button
                onClick={() => setActiveTab('sekolah-reports')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'sekolah-reports'
                    ? 'bg-blue-800 text-white border border-blue-700 shadow-sm'
                    : 'text-blue-200 hover:bg-blue-800/50 hover:text-white'
                }`}
              >
                <ShieldAlert className="w-4 h-4 text-emerald-400" />
                Laporan & Riwayat Kasus
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
