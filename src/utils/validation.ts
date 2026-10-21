/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AppointmentFormData {
  fullName: string;
  phoneNumber: string;
  preferredDate: string;
  preferredTime: string;
  department: string;
  notes?: string;
}

export interface ValidationErrors {
  fullName?: string;
  phoneNumber?: string;
  preferredDate?: string;
  preferredTime?: string;
  department?: string;
  notes?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrors;
}

/**
 * Validates phone numbers commonly used in Nigeria and internationally.
 * Accepts formats like:
 * 0703 258 5626, 07032585626, +2347032585626, 2347032585626, 08012345678, etc.
 */
export function isValidPhoneNumber(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
  // Must be between 10 and 15 digits (or start with + and have 10-14 digits)
  const phoneRegex = /^(\+?\d{10,14})$/;
  return phoneRegex.test(cleaned);
}

/**
 * Checks if a date string is today or in the future (YYYY-MM-DD format).
 */
export function isDateTodayOrFuture(dateStr: string): boolean {
  if (!dateStr || typeof dateStr !== 'string') return false;
  const parts = dateStr.split('-');
  if (parts.length !== 3) return false;
  
  const [year, month, day] = parts.map(p => parseInt(p, 10));
  if (isNaN(year) || isNaN(month) || isNaN(day)) return false;

  const targetDate = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return targetDate >= today;
}

/**
 * Validates the appointment enquiry form.
 */
export function validateAppointmentForm(data: AppointmentFormData): ValidationResult {
  const errors: ValidationErrors = {};

  // Full name validation
  const trimmedName = data.fullName ? data.fullName.trim() : '';
  if (!trimmedName) {
    errors.fullName = 'Please enter the patient’s full name.';
  } else if (trimmedName.length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.';
  } else if (trimmedName.length > 80) {
    errors.fullName = 'Full name cannot exceed 80 characters.';
  }

  // Phone number validation
  const trimmedPhone = data.phoneNumber ? data.phoneNumber.trim() : '';
  if (!trimmedPhone) {
    errors.phoneNumber = 'Please enter a contact phone number.';
  } else if (!isValidPhoneNumber(trimmedPhone)) {
    errors.phoneNumber = 'Please enter a valid phone number (e.g. 0703 258 5626).';
  }

  // Preferred date validation
  if (!data.preferredDate) {
    errors.preferredDate = 'Please select a preferred date for your visit.';
  } else if (!isDateTodayOrFuture(data.preferredDate)) {
    errors.preferredDate = 'Appointment date cannot be in the past.';
  }

  // Preferred time validation
  if (!data.preferredTime) {
    errors.preferredTime = 'Please select a preferred time slot.';
  }

  // Department / service validation
  if (!data.department) {
    errors.department = 'Please select a medical service or department.';
  }

  // Notes validation (optional, max 500 characters)
  if (data.notes && data.notes.length > 500) {
    errors.notes = 'Additional notes cannot exceed 500 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Generates a clean human-readable booking enquiry reference ID.
 */
export function generateReferenceCode(prefix = 'GMC'): string {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${year}-${randomSuffix}`;
}

/**
 * Formats a WhatsApp enquiry message string for 1-click patient handoff.
 */
export function createWhatsAppMessage(data: AppointmentFormData, refCode: string): string {
  const lines = [
    `*Goodwill Medical Centre Appointment Enquiry*`,
    `Reference: ${refCode}`,
    `Patient: ${data.fullName.trim()}`,
    `Phone: ${data.phoneNumber.trim()}`,
    `Service: ${data.department}`,
    `Preferred Date: ${data.preferredDate}`,
    `Preferred Time: ${data.preferredTime}`,
  ];
  if (data.notes && data.notes.trim()) {
    lines.push(`Notes: ${data.notes.trim()}`);
  }
  return encodeURIComponent(lines.join('\n'));
}
