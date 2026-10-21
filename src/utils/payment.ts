/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PaymentMethod = 'debit_card' | 'bank_transfer' | 'ussd' | 'pay_at_hospital';

export type PaymentCategory =
  | 'Consultation Fee'
  | 'Laboratory & Diagnostic Tests'
  | 'Pharmacy & Prescription Medications'
  | 'Maternity & Antenatal Care'
  | 'Inpatient Admission & Ward Care'
  | 'Emergency & Urgent Triage'
  | 'General Hospital Invoice';

export interface PaymentTransaction {
  id: string;
  receiptNumber: string;
  transactionReference: string;
  patientName: string;
  patientPhone: string;
  category: PaymentCategory;
  description: string;
  amount: number;
  paymentMethod: PaymentMethod;
  status: 'Successful' | 'Pending Verification' | 'Failed';
  createdAt: string;
  appointmentRef?: string;
  invoiceNumber?: string;
}

export interface BillPaymentForm {
  patientName: string;
  patientPhone: string;
  category: PaymentCategory;
  invoiceNumber?: string;
  amount: string;
  paymentMethod: PaymentMethod;
  notes?: string;
}

export const STANDARD_FEES: Record<string, number> = {
  'General Outpatient Care & Consultation': 2500,
  'Maternal & Child Health Care': 3500,
  '24-Hour Emergency & Urgent Triage': 4000,
  'Diagnostic Laboratory Investigations': 3000,
  'Pharmacy & Medical Dispensary': 2000,
  'Inpatient Observation & Nursing Care': 5000,
  'General Health Enquiry': 2500,
};

/**
 * Format currency in Nigerian Naira (₦) with commas and tabular figures.
 */
export function formatNaira(amount: number): string {
  if (isNaN(amount)) return '₦0';
  return '₦' + amount.toLocaleString('en-NG');
}

/**
 * Generates an official payment receipt number.
 */
export function generateReceiptNumber(): string {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  return `GMC-REC-${year}-${randomSuffix}`;
}

/**
 * Generates a gateway transaction reference.
 */
export function generateTransactionReference(): string {
  const random = Math.random().toString(36).substring(2, 9).toUpperCase();
  return `PAY-GMC-${random}`;
}

/**
 * Validates bill payment inputs.
 */
export function validateBillPayment(data: BillPaymentForm): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!data.patientName || data.patientName.trim().length < 2) {
    errors.patientName = 'Please enter the patient’s full name.';
  }

  const phoneClean = (data.patientPhone || '').replace(/[\s\-\(\)\.]/g, '');
  if (!phoneClean || phoneClean.length < 10) {
    errors.patientPhone = 'Please provide a valid 11-digit phone number (e.g. 0703 258 5626).';
  }

  const numAmount = parseFloat(data.amount);
  if (isNaN(numAmount) || numAmount < 500) {
    errors.amount = 'Minimum payment amount is ₦500.';
  } else if (numAmount > 5000000) {
    errors.amount = 'Amount exceeds single payment limit of ₦5,000,000.';
  }

  if (!data.category) {
    errors.category = 'Please select a bill or service category.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function getInitialTransactions(): PaymentTransaction[] {
  return [
    {
      id: 'tx-101',
      receiptNumber: 'GMC-REC-2026-48192',
      transactionReference: 'PAY-GMC-87F92A',
      patientName: 'Chinedu Okonkwo',
      patientPhone: '0703 258 5626',
      category: 'Consultation Fee',
      description: 'General Outpatient Consultation Fee',
      amount: 2500,
      paymentMethod: 'debit_card',
      status: 'Successful',
      createdAt: '2026-10-21 09:35 AM',
      appointmentRef: 'GMC-2026-8941',
    },
    {
      id: 'tx-102',
      receiptNumber: 'GMC-REC-2026-19304',
      transactionReference: 'PAY-GMC-33X18P',
      patientName: 'Amaka Eze',
      patientPhone: '0803 123 4567',
      category: 'Maternity & Antenatal Care',
      description: 'First Trimester Antenatal Care Registration',
      amount: 3500,
      paymentMethod: 'bank_transfer',
      status: 'Successful',
      createdAt: '2026-10-21 10:20 AM',
      appointmentRef: 'GMC-2026-3820',
    },
  ];
}
