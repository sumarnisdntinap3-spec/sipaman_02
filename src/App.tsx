import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { ToastContainer } from './components/common/ToastContainer';
import { DinasDashboard } from './components/dinas/DinasDashboard';
import { ReportManagement } from './components/dinas/ReportManagement';
import { SchoolManagement } from './components/dinas/SchoolManagement';
import { AgencyManagement } from './components/dinas/AgencyManagement';
import { KabidSettingsModal } from './components/dinas/KabidSettingsModal';
import { LogoSettingsModal } from './components/dinas/LogoSettingsModal';
import { SekolahDashboard } from './components/sekolah/SekolahDashboard';
import { CreateReportModal } from './components/sekolah/CreateReportModal';
import { UpdateProgressModal } from './components/sekolah/UpdateProgressModal';
import { ReportDetailModal } from './components/common/ReportDetailModal';
import { PrintDispositionModal } from './components/common/PrintDispositionModal';
import { AiAssistantModal } from './components/common/AiAssistantModal';
import { LoginModal } from './components/auth/LoginModal';
import { ChangePasswordModal } from './components/auth/ChangePasswordModal';
import { IncidentReport } from './types';

function MainAppContent() {
  const { userSession, setSelectedReportForDetail, isChangePasswordOpen, setIsChangePasswordOpen } = useApp();

  const [activeTab, setActiveTab] = useState<string>('dinas-dashboard');
  const [isKabidSettingsOpen, setIsKabidSettingsOpen] = useState(false);
  const [isLogoSettingsOpen, setIsLogoSettingsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCreateReportOpen, setIsCreateReportOpen] = useState(false);
  const [reportForProgress, setReportForProgress] = useState<IncidentReport | null>(null);

  // Sync active tab when user switches role
  React.useEffect(() => {
    if (userSession.role === 'ADMIN_DINAS') {
      if (!activeTab.startsWith('dinas-')) {
        setActiveTab('dinas-dashboard');
      }
    } else {
      if (!activeTab.startsWith('sekolah-')) {
        setActiveTab('sekolah-dashboard');
      }
    }
  }, [userSession.role]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col antialiased selection:bg-blue-500 selection:text-white">
      
      {/* Top Header & Navigation */}
      <Header
        onOpenKabidSettings={() => setIsKabidSettingsOpen(true)}
        onOpenLogoSettings={() => setIsLogoSettingsOpen(true)}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Admin Dinas Views */}
        {userSession.role === 'ADMIN_DINAS' && (
          <>
            {activeTab === 'dinas-dashboard' && (
              <DinasDashboard
                onNavigateToReports={() => setActiveTab('dinas-reports')}
                onOpenReportDetail={(report) => setSelectedReportForDetail(report)}
              />
            )}

            {activeTab === 'dinas-reports' && <ReportManagement />}

            {activeTab === 'dinas-agencies' && <AgencyManagement />}

            {activeTab === 'dinas-schools' && <SchoolManagement />}
          </>
        )}

        {/* Akun Sekolah Views */}
        {userSession.role === 'AKUN_SEKOLAH' && (
          <>
            {(activeTab === 'sekolah-dashboard' || activeTab === 'sekolah-reports') && (
              <SekolahDashboard
                onOpenCreateReport={() => setIsCreateReportOpen(true)}
                onOpenUpdateProgress={(report) => setReportForProgress(report)}
              />
            )}
          </>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-6 text-xs mt-auto print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <p className="font-bold text-slate-200">
              SI PAMAN — Sistem Informasi Penanganan Masalah Anak
            </p>
            <p className="text-slate-400">
              Bidang Pendidikan Dasar Dinas Dikpora Kabupaten Magetan, Jawa Timur
            </p>
          </div>
          <div className="text-[11px] text-slate-400">
            © 2026 Dinas Dikpora Kab. Magetan. Hak Cipta Dilindungi.
          </div>
        </div>
      </footer>

      {/* Login Screen Modal if not logged in or explicitly opened */}
      <LoginModal
        isOpen={!userSession.isLoggedIn || isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        isLandingPage={!userSession.isLoggedIn}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />

      {/* Modals & Dialogs */}
      <KabidSettingsModal
        isOpen={isKabidSettingsOpen}
        onClose={() => setIsKabidSettingsOpen(false)}
      />

      <LogoSettingsModal
        isOpen={isLogoSettingsOpen}
        onClose={() => setIsLogoSettingsOpen(false)}
      />

      <CreateReportModal
        isOpen={isCreateReportOpen}
        onClose={() => setIsCreateReportOpen(false)}
      />

      <UpdateProgressModal
        report={reportForProgress}
        onClose={() => setReportForProgress(null)}
      />

      <ReportDetailModal />
      <PrintDispositionModal />
      <AiAssistantModal />

      {/* Global Toast Alerts */}
      <ToastContainer />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
