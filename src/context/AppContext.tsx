import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  School,
  IncidentReport,
  KabidConfig,
  UserSession,
  UserRole,
  ReportStatus,
  DisposisiDinas,
  ProgressLog,
  Agency,
} from '../types';
import {
  INITIAL_SCHOOLS,
  INITIAL_REPORTS,
  INITIAL_KABID_CONFIG,
  INITIAL_AGENCIES,
} from '../data/mockData';
import {
  initializeFirestoreCollections,
  subscribeReports,
  subscribeSchools,
  subscribeAgencies,
  subscribeKabidConfig,
  subscribeAppConfig,
  syncReportToFirestore,
  syncSchoolToFirestore,
  deleteSchoolFromFirestore,
  syncAgencyToFirestore,
  deleteAgencyFromFirestore,
  syncKabidConfigToFirestore,
  syncAppConfigToFirestore,
} from '../lib/firestoreService';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

interface AppContextType {
  userSession: UserSession;
  setUserSession: (session: UserSession) => void;
  schools: School[];
  reports: IncidentReport[];
  kabidConfig: KabidConfig;
  agencies: Agency[];
  customLogoUrl: string | null;
  setCustomLogoUrl: (url: string | null) => void;
  toasts: ToastMessage[];

  // Authentication & Password Management
  login: (role: UserRole, username: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  changeAdminPassword: (oldPass: string, newPass: string) => { success: boolean; message: string };
  changeSchoolPassword: (npsn: string, oldPass: string, newPass: string) => { success: boolean; message: string };
  resetSchoolPassword: (schoolId: string, customNewPassword?: string) => { success: boolean; message: string; newPass: string };

  // School Actions
  addSchool: (school: Omit<School, 'id' | 'tglDidaftarkan'>) => void;
  updateSchool: (id: string, updated: Partial<School>) => void;
  deleteSchool: (id: string) => void;

  // Agency Actions
  addAgency: (agencyData: Omit<Agency, 'id'>) => void;
  updateAgency: (id: string, updated: Partial<Agency>) => void;
  deleteAgency: (id: string) => void;

  // Report Actions
  createReport: (
    reportData: Omit<
      IncidentReport,
      | 'id'
      | 'nomorLaporan'
      | 'status'
      | 'tglDilaporkan'
      | 'perkembanganLogs'
      | 'sekolahId'
      | 'namaSekolah'
      | 'jenjang'
      | 'kecamatan'
    >
  ) => string;

  addDisposisi: (reportId: string, disposisi: DisposisiDinas, newStatus?: ReportStatus) => void;
  addProgressLog: (reportId: string, logData: Omit<ProgressLog, 'id'>) => void;
  resolveReport: (reportId: string, catatanPenyelesaian: string) => void;
  updateReportStatus: (reportId: string, status: ReportStatus) => void;

  updateKabidConfig: (config: Partial<KabidConfig>) => void;
  showToast: (type: ToastMessage['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;

  selectedReportForDetail: IncidentReport | null;
  setSelectedReportForDetail: (report: IncidentReport | null) => void;

  selectedReportForPrint: IncidentReport | null;
  setSelectedReportForPrint: (report: IncidentReport | null) => void;
  
  isAiModalOpen: boolean;
  setIsAiModalOpen: (open: boolean) => void;

  isChangePasswordOpen: boolean;
  setIsChangePasswordOpen: (open: boolean) => void;
}

const STORAGE_KEY_SCHOOLS = 'sipaman_magetan_schools_v1';
const STORAGE_KEY_REPORTS = 'sipaman_magetan_reports_v1';
const STORAGE_KEY_KABID = 'sipaman_magetan_kabid_v1';
const STORAGE_KEY_USER = 'sipaman_magetan_user_v1';
const STORAGE_KEY_AGENCIES = 'sipaman_magetan_agencies_v1';
const STORAGE_KEY_ADMIN_PASS = 'sipaman_magetan_admin_pass_v1';
const STORAGE_KEY_SCHOOL_PASS = 'sipaman_magetan_school_pass_v1';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default user session
  const [userSession, setUserSession] = useState<UserSession>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_USER);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (typeof parsed.isLoggedIn === 'boolean') {
          return parsed;
        }
      } catch (e) {
        // fallback
      }
    }
    // Default to NOT logged in on initial landing
    return {
      role: 'ADMIN_DINAS',
      isLoggedIn: false,
      email: 'kabid.dikdas@magetan.go.id',
      namaPengguna: 'Drs. ENDANG SRI WAHYUNI, M.Pd.',
    };
  });

  const [schools, setSchools] = useState<School[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_SCHOOLS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_SCHOOLS;
  });

  const [reports, setReports] = useState<IncidentReport[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_REPORTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_REPORTS;
  });

  const [kabidConfig, setKabidConfig] = useState<KabidConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_KABID);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_KABID_CONFIG;
  });

  const [agencies, setAgencies] = useState<Agency[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_AGENCIES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_AGENCIES;
  });

  // Admin password (default: admin)
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_ADMIN_PASS) || 'admin';
  });

  // School passwords map (key: NPSN, default: NPSN value)
  const [schoolPasswords, setSchoolPasswords] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_SCHOOL_PASS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {};
  });

  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(() => {
    return localStorage.getItem('sipaman_custom_logo') || null;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [selectedReportForDetail, setSelectedReportForDetail] = useState<IncidentReport | null>(null);
  const [selectedReportForPrint, setSelectedReportForPrint] = useState<IncidentReport | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState<boolean>(false);

  useEffect(() => {
    if (customLogoUrl) {
      localStorage.setItem('sipaman_custom_logo', customLogoUrl);
    } else {
      localStorage.removeItem('sipaman_custom_logo');
    }
    syncAppConfigToFirestore({ customLogoUrl });
  }, [customLogoUrl]);

  // Firestore Realtime Subscriptions & Initial Seeding
  useEffect(() => {
    // 1. Seed initial data if Firestore is empty
    initializeFirestoreCollections();

    // 2. Realtime listeners
    const unsubReports = subscribeReports((data) => setReports(data));
    const unsubSchools = subscribeSchools((data) => setSchools(data));
    const unsubAgencies = subscribeAgencies((data) => setAgencies(data));
    const unsubKabid = subscribeKabidConfig((data) => setKabidConfig(data));
    const unsubAppConfig = subscribeAppConfig((data) => setCustomLogoUrl(data.customLogoUrl));

    return () => {
      unsubReports();
      unsubSchools();
      unsubAgencies();
      unsubKabid();
      unsubAppConfig();
    };
  }, []);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SCHOOLS, JSON.stringify(schools));
  }, [schools]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_KABID, JSON.stringify(kabidConfig));
  }, [kabidConfig]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(userSession));
  }, [userSession]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_AGENCIES, JSON.stringify(agencies));
  }, [agencies]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ADMIN_PASS, adminPassword);
  }, [adminPassword]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SCHOOL_PASS, JSON.stringify(schoolPasswords));
  }, [schoolPasswords]);

  const showToast = (type: ToastMessage['type'], title: string, message: string) => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 5);
    setToasts((prev) => [...prev, { id, type, title, message }]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Login Handler
  const login = (role: UserRole, username: string, password: string): { success: boolean; message: string } => {
    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    if (!trimmedUser || !trimmedPass) {
      return { success: false, message: 'Username dan password tidak boleh kosong.' };
    }

    if (role === 'ADMIN_DINAS') {
      if (trimmedUser.toLowerCase() === 'admin' && trimmedPass === adminPassword) {
        const session: UserSession = {
          role: 'ADMIN_DINAS',
          isLoggedIn: true,
          email: kabidConfig.emailOfficial || 'kabid.dikdas@magetan.go.id',
          namaPengguna: kabidConfig.namaKabid || 'Kabid Dikdas Dinas Dikpora',
        };
        setUserSession(session);
        showToast('success', 'Selamat Datang, Admin Dinas', 'Berhasil masuk ke Sistem Informasi Penanganan Masalah Anak (SI PAMAN).');
        return { success: true, message: 'Berhasil login sebagai Admin Dinas.' };
      }
      return { success: false, message: 'Username atau Password Admin Dinas salah! (Default: admin / admin)' };
    }

    if (role === 'AKUN_SEKOLAH') {
      // Find school by NPSN
      const school = schools.find((s) => s.npsn.trim() === trimmedUser);
      if (!school) {
        return { success: false, message: `Sekolah dengan NPSN "${trimmedUser}" tidak ditemukan.` };
      }

      if (!school.statusAktif) {
        return { success: false, message: 'Akun sekolah ini sedang non-aktif. Silakan hubungi Admin Dinas Dikpora.' };
      }

      // Check password (custom or default NPSN)
      const expectedPass = schoolPasswords[school.npsn] || school.npsn;

      if (trimmedPass === expectedPass) {
        const session: UserSession = {
          role: 'AKUN_SEKOLAH',
          isLoggedIn: true,
          schoolId: school.id,
          schoolName: school.namaSekolah,
          npsn: school.npsn,
          email: school.email,
          namaPengguna: `Tim TPPK ${school.namaSekolah}`,
        };
        setUserSession(session);
        showToast('success', `Akses ${school.namaSekolah}`, `Berhasil masuk sebagai akun sekolah (NPSN: ${school.npsn}).`);
        return { success: true, message: 'Berhasil login sebagai Akun Sekolah.' };
      }

      return { success: false, message: 'Password Akun Sekolah salah! (Default: Password sama dengan NPSN)' };
    }

    return { success: false, message: 'Role tidak dikenal.' };
  };

  const logout = () => {
    setUserSession((prev) => ({
      ...prev,
      isLoggedIn: false,
    }));
    showToast('info', 'Logout Berhasil', 'Anda telah keluar dari aplikasi.');
  };

  // Change Admin Password
  const changeAdminPassword = (oldPass: string, newPass: string): { success: boolean; message: string } => {
    if (oldPass !== adminPassword) {
      return { success: false, message: 'Password lama Admin salah.' };
    }
    if (!newPass || newPass.trim().length < 4) {
      return { success: false, message: 'Password baru minimal 4 karakter.' };
    }
    setAdminPassword(newPass.trim());
    showToast('success', 'Password Diubah', 'Password akun Admin Dinas berhasil diperbarui.');
    return { success: true, message: 'Password Admin berhasil diubah.' };
  };

  // Change School Password
  const changeSchoolPassword = (npsn: string, oldPass: string, newPass: string): { success: boolean; message: string } => {
    const currentPass = schoolPasswords[npsn] || npsn;
    if (oldPass !== currentPass) {
      return { success: false, message: 'Password lama sekolah salah.' };
    }
    if (!newPass || newPass.trim().length < 4) {
      return { success: false, message: 'Password baru minimal 4 karakter.' };
    }
    setSchoolPasswords((prev) => ({ ...prev, [npsn]: newPass.trim() }));
    showToast('success', 'Password Sekolah Diubah', `Password untuk NPSN ${npsn} berhasil diperbarui.`);
    return { success: true, message: 'Password Sekolah berhasil diubah.' };
  };

  // Admin Reset School Password to Default NPSN
  const resetSchoolPassword = (schoolId: string, customNewPassword?: string): { success: boolean; message: string; newPass: string } => {
    const school = schools.find((s) => s.id === schoolId);
    if (!school) {
      return { success: false, message: 'Sekolah tidak ditemukan.', newPass: '' };
    }

    const resetPass = customNewPassword ? customNewPassword.trim() : school.npsn;
    setSchoolPasswords((prev) => ({ ...prev, [school.npsn]: resetPass }));
    showToast('success', 'Password Direset', `Password ${school.namaSekolah} berhasil direset ke: ${resetPass}`);
    return { success: true, message: `Password direset ke ${resetPass}`, newPass: resetPass };
  };

  // Agency Handlers
  const addAgency = (agencyData: Omit<Agency, 'id'>) => {
    const newAgency: Agency = {
      ...agencyData,
      id: `ag-${Date.now()}`,
    };
    setAgencies((prev) => [newAgency, ...prev]);
    syncAgencyToFirestore(newAgency);
    showToast('success', 'Instansi Terkait Ditambahkan', `${newAgency.namaInstansi} berhasil ditambahkan.`);
  };

  const updateAgency = (id: string, updated: Partial<Agency>) => {
    let updatedAgency: Agency | null = null;
    setAgencies((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          updatedAgency = { ...a, ...updated };
          return updatedAgency;
        }
        return a;
      })
    );
    if (updatedAgency) {
      syncAgencyToFirestore(updatedAgency);
    }
    showToast('success', 'Instansi Diperbarui', 'Data instansi mitra telah disimpan.');
  };

  const deleteAgency = (id: string) => {
    const target = agencies.find((a) => a.id === id);
    setAgencies((prev) => prev.filter((a) => a.id !== id));
    deleteAgencyFromFirestore(id);
    showToast('warning', 'Instansi Dihapus', `${target?.namaInstansi || 'Instansi'} telah dihapus.`);
  };

  const addSchool = (schoolData: Omit<School, 'id' | 'tglDidaftarkan'>) => {
    const newId = `sch-${Date.now()}`;
    const today = new Date().toISOString().split('T')[0];
    const newSchool: School = {
      ...schoolData,
      id: newId,
      tglDidaftarkan: today,
    };
    setSchools((prev) => [newSchool, ...prev]);
    syncSchoolToFirestore(newSchool);
    showToast(
      'success',
      'Sekolah Ditambahkan',
      `${newSchool.namaSekolah} (NPSN: ${newSchool.npsn}) berhasil dibuat.`
    );
  };

  const updateSchool = (id: string, updated: Partial<School>) => {
    let updatedSchool: School | null = null;
    setSchools((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          updatedSchool = { ...s, ...updated };
          return updatedSchool;
        }
        return s;
      })
    );
    if (updatedSchool) {
      syncSchoolToFirestore(updatedSchool);
    }
    showToast('success', 'Data Diperbarui', 'Informasi sekolah telah disimpan.');
  };

  const deleteSchool = (id: string) => {
    const sch = schools.find((s) => s.id === id);
    setSchools((prev) => prev.filter((s) => s.id !== id));
    deleteSchoolFromFirestore(id);
    showToast('warning', 'Sekolah Dihapus', `${sch?.namaSekolah || 'Sekolah'} berhasil dihapus dari sistem.`);
  };

  const createReport = (
    reportData: Omit<
      IncidentReport,
      | 'id'
      | 'nomorLaporan'
      | 'status'
      | 'tglDilaporkan'
      | 'perkembanganLogs'
      | 'sekolahId'
      | 'namaSekolah'
      | 'jenjang'
      | 'kecamatan'
    >
  ): string => {
    if (userSession.role !== 'AKUN_SEKOLAH' || !userSession.schoolId) {
      showToast('error', 'Akses Ditolak', 'Hanya akun sekolah yang dapat mengirimkan laporan baru.');
      return '';
    }

    const school = schools.find((s) => s.id === userSession.schoolId);
    if (!school) {
      showToast('error', 'Gagal', 'Data sekolah tidak valid.');
      return '';
    }

    const reportId = `rep-${Date.now()}`;
    const count = reports.length + 1;
    const padCount = count.toString().padStart(3, '0');
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().slice(0, 5);
    const nomorLaporan = `LAP/DIKDAS/${now.getFullYear()}/${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${padCount}`;

    const newReport: IncidentReport = {
      ...reportData,
      id: reportId,
      nomorLaporan,
      sekolahId: school.id,
      namaSekolah: school.namaSekolah,
      jenjang: school.jenjang,
      kecamatan: school.kecamatan,
      status: 'Menunggu Verifikasi',
      tglDilaporkan: `${formattedDate} ${formattedTime}`,
      perkembanganLogs: [],
    };

    setReports((prev) => [newReport, ...prev]);
    syncReportToFirestore(newReport);
    showToast(
      'success',
      'Laporan Berhasil Terkirim',
      `Nomor Laporan: ${nomorLaporan}. Dinas Dikpora akan memverifikasi secara real-time.`
    );
    return reportId;
  };

  const addDisposisi = (reportId: string, disposisi: DisposisiDinas, newStatus?: ReportStatus) => {
    let updatedReport: IncidentReport | null = null;
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          const targetStatus = newStatus || 'Diverifikasi Dinas';
          updatedReport = {
            ...r,
            disposisiDinas: disposisi,
            status: targetStatus,
          };
          return updatedReport;
        }
        return r;
      })
    );
    if (updatedReport) {
      syncReportToFirestore(updatedReport);
    }
    showToast(
      'success',
      'Disposisi Terkirim',
      'Arahan dan rekomendasi Kabid Dikdas berhasil dikirimkan ke sekolah.'
    );
  };

  const addProgressLog = (reportId: string, logData: Omit<ProgressLog, 'id'>) => {
    const newLog: ProgressLog = {
      ...logData,
      id: `log-${Date.now()}`,
    };

    let updatedReport: IncidentReport | null = null;
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          updatedReport = {
            ...r,
            status: logData.statusSaatIni,
            perkembanganLogs: [...r.perkembanganLogs, newLog],
          };
          return updatedReport;
        }
        return r;
      })
    );
    if (updatedReport) {
      syncReportToFirestore(updatedReport);
    }
    showToast('success', 'Perkembangan Kasus Dicatat', 'Catatan penanganan sekolah berhasil diperbarui.');
  };

  const resolveReport = (reportId: string, catatanPenyelesaian: string) => {
    const now = new Date();
    const formattedDate = `${now.toISOString().split('T')[0]} ${now.toTimeString().slice(0, 5)}`;

    let updatedReport: IncidentReport | null = null;
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          updatedReport = {
            ...r,
            status: 'Selesai & Diarsipkan',
            catatanPenyelesaian,
            tglSelesai: formattedDate,
          };
          return updatedReport;
        }
        return r;
      })
    );
    if (updatedReport) {
      syncReportToFirestore(updatedReport);
    }
    showToast(
      'success',
      'Kasus Selesai',
      'Laporan kasus berhasil dinyatakan tuntas dan masuk arsip digital daerah.'
    );
  };

  const updateReportStatus = (reportId: string, status: ReportStatus) => {
    let updatedReport: IncidentReport | null = null;
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          updatedReport = { ...r, status };
          return updatedReport;
        }
        return r;
      })
    );
    if (updatedReport) {
      syncReportToFirestore(updatedReport);
    }
    showToast('info', 'Status Diperbarui', `Status laporan diubah menjadi "${status}".`);
  };

  const updateKabidConfig = (config: Partial<KabidConfig>) => {
    setKabidConfig((prev) => {
      const nextConfig = { ...prev, ...config };
      syncKabidConfigToFirestore(nextConfig);
      return nextConfig;
    });
    showToast('success', 'Konfigurasi Kabid', 'Data Kepala Bidang & Verifikator Dikdas diperbarui.');
  };

  return (
    <AppContext.Provider
      value={{
        userSession,
        setUserSession,
        schools,
        reports,
        kabidConfig,
        agencies,
        customLogoUrl,
        setCustomLogoUrl,
        toasts,
        login,
        logout,
        changeAdminPassword,
        changeSchoolPassword,
        resetSchoolPassword,
        addSchool,
        updateSchool,
        deleteSchool,
        addAgency,
        updateAgency,
        deleteAgency,
        createReport,
        addDisposisi,
        addProgressLog,
        resolveReport,
        updateReportStatus,
        updateKabidConfig,
        showToast,
        removeToast,
        selectedReportForDetail,
        setSelectedReportForDetail,
        selectedReportForPrint,
        setSelectedReportForPrint,
        isAiModalOpen,
        setIsAiModalOpen,
        isChangePasswordOpen,
        setIsChangePasswordOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
