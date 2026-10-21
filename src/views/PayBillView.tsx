/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  CreditCard,
  ShieldCheck,
  Building2,
  Phone,
  FileText,
  User,
  CheckCircle,
  HelpCircle,
  Receipt,
  ArrowRight
} from 'lucide-react';
import {
  PaymentCategory,
  BillPaymentForm,
  validateBillPayment,
  formatNaira,
  PaymentTransaction,
} from '../utils/payment.ts';
import { PaymentModal } from '../components/PaymentModal.tsx';
import { HOSPITAL_INFO } from '../data/hospitalData.ts';
import { PageId } from '../components/Navbar.tsx';

interface PayBillViewProps {
  onNavigate: (page: PageId) => void;
}

export const PayBillView: React.FC<PayBillViewProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<BillPaymentForm>({
    patientName: '',
    patientPhone: '',
    category: 'Consultation Fee',
    invoiceNumber: '',
    amount: '2500',
    paymentMethod: 'debit_card',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);
  const [recentReceipt, setRecentReceipt] = useState<PaymentTransaction | null>(null);

  const categories: { label: PaymentCategory; defaultAmt: number }[] = [
    { label: 'Consultation Fee', defaultAmt: 2500 },
    { label: 'Laboratory & Diagnostic Tests', defaultAmt: 4500 },
    { label: 'Pharmacy & Prescription Medications', defaultAmt: 3000 },
    { label: 'Maternity & Antenatal Care', defaultAmt: 3500 },
    { label: 'Inpatient Admission & Ward Care', defaultAmt: 15000 },
    { label: 'General Hospital Invoice', defaultAmt: 5000 },
  ];

  const quickAmounts = [2500, 5000, 10000, 20000, 50000];

  const handleCategoryChange = (cat: PaymentCategory) => {
    const match = categories.find((c) => c.label === cat);
    setFormData((prev) => ({
      ...prev,
      category: cat,
      amount: match ? match.defaultAmt.toString() : prev.amount,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateBillPayment(formData);
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    setShowModal(true);
  };

  const handlePaymentSuccess = (tx: PaymentTransaction) => {
    setRecentReceipt(tx);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 space-y-3">
          <span className="text-xs font-semibold text-[#0f2d59] uppercase tracking-wider block">
            Goodwill Medical Centre · Accounts & Billing
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0f2d59]">
            Pay Hospital Bills & Invoices
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Settle medical bills, laboratory fees, medications, and consultation charges securely online via Debit Card, Bank Transfer, or USSD.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 mb-5 flex items-center justify-between">
              <span>Patient & Billing Information</span>
              <span className="text-xs text-teal-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                SSL Encrypted
              </span>
            </h2>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Patient Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Patient Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={formData.patientName}
                    onChange={(e) => {
                      setFormData({ ...formData, patientName: e.target.value });
                      if (errors.patientName) setErrors({ ...errors, patientName: '' });
                    }}
                    placeholder="e.g. Chinedu Eze"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0f2d59]"
                  />
                </div>
                {errors.patientName && (
                  <p className="mt-1 text-xs text-rose-600">{errors.patientName}</p>
                )}
              </div>

              {/* Patient Phone */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Patient / Payer Telephone <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    value={formData.patientPhone}
                    onChange={(e) => {
                      setFormData({ ...formData, patientPhone: e.target.value });
                      if (errors.patientPhone) setErrors({ ...errors, patientPhone: '' });
                    }}
                    placeholder="e.g. 0703 258 5626 or 080..."
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0f2d59]"
                  />
                </div>
                {errors.patientPhone && (
                  <p className="mt-1 text-xs text-rose-600">{errors.patientPhone}</p>
                )}
                <p className="text-[11px] text-slate-500 mt-1">
                  Payment confirmation receipt will be credited to this phone number and patient file.
                </p>
              </div>

              {/* Bill Category */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Bill Category / Service <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleCategoryChange(e.target.value as PaymentCategory)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0f2d59]"
                >
                  {categories.map((c) => (
                    <option key={c.label} value={c.label}>
                      {c.label} (Suggested: {formatNaira(c.defaultAmt)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Optional Invoice or Patient ID */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Invoice or Patient Card Number (Optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={formData.invoiceNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, invoiceNumber: e.target.value })
                    }
                    placeholder="e.g. GMC-INV-8492 or Card # 1042"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0f2d59]"
                  />
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Payment Amount in Naira (₦) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 font-bold text-base">
                    ₦
                  </span>
                  <input
                    type="number"
                    step="100"
                    min="500"
                    value={formData.amount}
                    onChange={(e) => {
                      setFormData({ ...formData, amount: e.target.value });
                      if (errors.amount) setErrors({ ...errors, amount: '' });
                    }}
                    placeholder="e.g. 5000"
                    className="w-full pl-8 pr-3.5 py-2.5 text-base font-bold text-[#0f2d59] rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0f2d59] tabular-nums"
                  />
                </div>
                {errors.amount && (
                  <p className="mt-1 text-xs text-rose-600">{errors.amount}</p>
                )}

                {/* Quick amount chips */}
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className="text-[11px] text-slate-500">Quick select:</span>
                  {quickAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setFormData({ ...formData, amount: amt.toString() })}
                      className="text-xs px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors cursor-pointer"
                    >
                      {formatNaira(amt)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Trigger */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-lg text-sm font-semibold text-white bg-[#0f2d59] hover:bg-[#163f7a] transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4 text-teal-300" />
                  <span>Proceed to Pay {formatNaira(parseFloat(formData.amount) || 0)}</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-500 pt-1">
                Receipts are generated immediately and can be printed or shared to hospital WhatsApp.
              </p>
            </form>
          </div>

          {/* Right Column: Information & Diaspora Support */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-teal-600" />
                <span>Paying from Lagos, Abuja, or Abroad?</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Many relatives living outside Enugu support parents and family members at Goodwill Medical Centre. You can pay bills online directly on their behalf.
              </p>
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>Enter the patient's name as registered in hospital records.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>Instant digital receipt with official verification stamp.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>Send the receipt to hospital WhatsApp accounts at 0703 258 5626 for immediate credit.</span>
                </div>
              </div>
            </div>

            {/* Direct Hospital Accounts Contact */}
            <div className="bg-[#0f2d59] text-white rounded-2xl p-6 space-y-3">
              <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider block">
                Hospital Accounts Support
              </span>
              <p className="text-xs sm:text-sm text-slate-200">
                Need to confirm an invoice balance or ask about payment options? Call reception accounts directly:
              </p>
              <a
                href={HOSPITAL_INFO.phoneTelLink}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white text-[#0f2d59] font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors"
              >
                <Phone className="w-4 h-4 text-teal-600" />
                <span>Call {HOSPITAL_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Gateway Modal */}
      <PaymentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        patientName={formData.patientName}
        patientPhone={formData.patientPhone}
        amount={parseFloat(formData.amount) || 2500}
        category={formData.category}
        description={`${formData.category} payment for ${formData.patientName}`}
        invoiceNumber={formData.invoiceNumber}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};
