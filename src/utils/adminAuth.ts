/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'Medical Director' | 'Hospital Administrator' | 'Chief Nursing Officer';
}

export interface AdminPublishPayload {
  title: string;
  category: string;
  readTime: string;
  summary: string;
  content: string;
  keyAdvice: string;
  imageBase64?: string;
  imageFileName?: string;
}

export interface StoredAppointment {
  id: string;
  referenceCode: string;
  fullName: string;
  phoneNumber: string;
  preferredDate: string;
  preferredTime: string;
  department: string;
  notes?: string;
  status: 'Pending Review' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

const ADMIN_STORAGE_KEY = 'gmc_admin_session';
const APPOINTMENTS_STORAGE_KEY = 'gmc_appointments_list';
const CUSTOM_ARTICLES_STORAGE_KEY = 'gmc_custom_articles';

/**
 * Validates admin credentials.
 * Supports standard hospital admin demo credentials.
 */
export function authenticateAdmin(passcodeOrEmail: string, password?: string): AdminUser | null {
  const cleanInput = passcodeOrEmail.trim().toLowerCase();
  const cleanPassword = (password || '').trim();

  // Accept admin demo logins:
  // 1) admin@goodwillmedical.ng / goodwill2026
  // 2) Access code: "goodwill" or "gmc2026"
  if (
    (cleanInput === 'admin@goodwillmedical.ng' && (cleanPassword === 'goodwill2026' || cleanPassword === 'admin')) ||
    cleanInput === 'goodwill2026' ||
    cleanInput === 'goodwill' ||
    cleanInput === 'admin'
  ) {
    return {
      id: 'admin-01',
      email: 'admin@goodwillmedical.ng',
      name: 'Hospital Administrator',
      role: 'Hospital Administrator',
    };
  }

  return null;
}

export function saveAdminSession(user: AdminUser): void {
  try {
    sessionStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(user));
  } catch {
    // Fallback if sessionStorage is restricted
  }
}

export function getAdminSession(): AdminUser | null {
  try {
    const raw = sessionStorage.getItem(ADMIN_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearAdminSession(): void {
  try {
    sessionStorage.removeItem(ADMIN_STORAGE_KEY);
  } catch {
    // Ignore
  }
}

export function validatePublishPayload(payload: AdminPublishPayload): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!payload.title || payload.title.trim().length < 5) {
    errors.title = 'Article title must be at least 5 characters long.';
  }

  if (!payload.category || payload.category.trim().length === 0) {
    errors.category = 'Please choose or enter a category.';
  }

  if (!payload.summary || payload.summary.trim().length < 10) {
    errors.summary = 'Summary must be at least 10 characters long.';
  }

  if (!payload.content || payload.content.trim().length < 20) {
    errors.content = 'Main content must be at least 20 characters long.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function getInitialAppointments(): StoredAppointment[] {
  return [
    {
      id: 'apt-001',
      referenceCode: 'GMC-2026-8941',
      fullName: 'Chinedu Okonkwo',
      phoneNumber: '0703 258 5626',
      preferredDate: '2026-10-25',
      preferredTime: 'Morning Clinic (08:00 AM - 12:00 PM)',
      department: 'General Outpatient Care & Consultation',
      notes: 'Routine blood pressure screening and general health review',
      status: 'Confirmed',
      createdAt: '2026-10-21 09:30 AM',
    },
    {
      id: 'apt-002',
      referenceCode: 'GMC-2026-3820',
      fullName: 'Amaka Eze',
      phoneNumber: '0803 123 4567',
      preferredDate: '2026-10-28',
      preferredTime: 'Morning Clinic (08:00 AM - 12:00 PM)',
      department: 'Maternal & Child Health Care',
      notes: 'First trimester antenatal registration',
      status: 'Pending Review',
      createdAt: '2026-10-21 10:15 AM',
    },
  ];
}
