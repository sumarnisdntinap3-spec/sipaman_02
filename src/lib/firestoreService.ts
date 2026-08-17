import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  getDocs,
  writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';
import {
  School,
  IncidentReport,
  KabidConfig,
  Agency,
} from '../types';
import {
  INITIAL_SCHOOLS,
  INITIAL_REPORTS,
  INITIAL_KABID_CONFIG,
  INITIAL_AGENCIES,
} from '../data/mockData';

// Helper to seed initial collections if Firestore is empty
export const initializeFirestoreCollections = async () => {
  try {
    // 1. Reports
    const reportsSnap = await getDocs(collection(db, 'reports'));
    if (reportsSnap.empty) {
      const batch = writeBatch(db);
      INITIAL_REPORTS.forEach((report) => {
        const ref = doc(db, 'reports', report.id);
        batch.set(ref, report);
      });
      await batch.commit();
    }

    // 2. Schools
    const schoolsSnap = await getDocs(collection(db, 'schools'));
    if (schoolsSnap.empty) {
      const batch = writeBatch(db);
      INITIAL_SCHOOLS.forEach((school) => {
        const ref = doc(db, 'schools', school.id);
        batch.set(ref, school);
      });
      await batch.commit();
    }

    // 3. Agencies
    const agenciesSnap = await getDocs(collection(db, 'agencies'));
    if (agenciesSnap.empty) {
      const batch = writeBatch(db);
      INITIAL_AGENCIES.forEach((agency) => {
        const ref = doc(db, 'agencies', agency.id);
        batch.set(ref, agency);
      });
      await batch.commit();
    }

    // 4. Kabid Config
    const kabidSnap = await getDocs(collection(db, 'config'));
    if (kabidSnap.empty) {
      await setDoc(doc(db, 'config', 'kabidConfig'), INITIAL_KABID_CONFIG);
    }
  } catch (error) {
    console.error('Firestore initialization error:', error);
  }
};

// Firestore document mutations
export const syncReportToFirestore = async (report: IncidentReport) => {
  try {
    await setDoc(doc(db, 'reports', report.id), report, { merge: true });
  } catch (err) {
    console.error('Failed to sync report to Firestore:', err);
  }
};

export const syncSchoolToFirestore = async (school: School) => {
  try {
    await setDoc(doc(db, 'schools', school.id), school, { merge: true });
  } catch (err) {
    console.error('Failed to sync school to Firestore:', err);
  }
};

export const deleteSchoolFromFirestore = async (schoolId: string) => {
  try {
    await deleteDoc(doc(db, 'schools', schoolId));
  } catch (err) {
    console.error('Failed to delete school from Firestore:', err);
  }
};

export const syncAgencyToFirestore = async (agency: Agency) => {
  try {
    await setDoc(doc(db, 'agencies', agency.id), agency, { merge: true });
  } catch (err) {
    console.error('Failed to sync agency to Firestore:', err);
  }
};

export const deleteAgencyFromFirestore = async (agencyId: string) => {
  try {
    await deleteDoc(doc(db, 'agencies', agencyId));
  } catch (err) {
    console.error('Failed to delete agency from Firestore:', err);
  }
};

export const syncKabidConfigToFirestore = async (config: KabidConfig) => {
  try {
    await setDoc(doc(db, 'config', 'kabidConfig'), config, { merge: true });
  } catch (err) {
    console.error('Failed to sync kabid config to Firestore:', err);
  }
};

export const syncAppConfigToFirestore = async (appConfig: { customLogoUrl: string | null }) => {
  try {
    await setDoc(doc(db, 'config', 'appConfig'), appConfig, { merge: true });
  } catch (err) {
    console.error('Failed to sync app config to Firestore:', err);
  }
};

// Realtime Subscriptions
export const subscribeReports = (onData: (reports: IncidentReport[]) => void) => {
  return onSnapshot(
    collection(db, 'reports'),
    (snapshot) => {
      if (!snapshot.empty) {
        const list: IncidentReport[] = [];
        snapshot.forEach((d) => {
          list.push(d.data() as IncidentReport);
        });
        onData(list);
      }
    },
    (err) => console.error('Firestore reports listener error:', err)
  );
};

export const subscribeSchools = (onData: (schools: School[]) => void) => {
  return onSnapshot(
    collection(db, 'schools'),
    (snapshot) => {
      if (!snapshot.empty) {
        const list: School[] = [];
        snapshot.forEach((d) => {
          list.push(d.data() as School);
        });
        onData(list);
      }
    },
    (err) => console.error('Firestore schools listener error:', err)
  );
};

export const subscribeAgencies = (onData: (agencies: Agency[]) => void) => {
  return onSnapshot(
    collection(db, 'agencies'),
    (snapshot) => {
      if (!snapshot.empty) {
        const list: Agency[] = [];
        snapshot.forEach((d) => {
          list.push(d.data() as Agency);
        });
        onData(list);
      }
    },
    (err) => console.error('Firestore agencies listener error:', err)
  );
};

export const subscribeKabidConfig = (onData: (config: KabidConfig) => void) => {
  return onSnapshot(
    doc(db, 'config', 'kabidConfig'),
    (docSnap) => {
      if (docSnap.exists()) {
        onData(docSnap.data() as KabidConfig);
      }
    },
    (err) => console.error('Firestore kabid listener error:', err)
  );
};

export const subscribeAppConfig = (onData: (config: { customLogoUrl: string | null }) => void) => {
  return onSnapshot(
    doc(db, 'config', 'appConfig'),
    (docSnap) => {
      if (docSnap.exists()) {
        onData(docSnap.data() as { customLogoUrl: string | null });
      }
    },
    (err) => console.error('Firestore appConfig listener error:', err)
  );
};
