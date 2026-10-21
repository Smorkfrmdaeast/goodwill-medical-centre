/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  FileText,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  RotateCcw,
  ShieldCheck,
  Send,
  CreditCard,
  Building2,
  Check
} from 'lucide-react';
import { HOSPITAL_INFO, HOSPITAL_SERVICES } from '../data/hospitalData.ts';
import {
  AppointmentFormData,
  ValidationErrors,
  validateAppointmentForm,
  generateReferenceCode,
  createWhatsAppMessage,
} from '../utils/validation.ts';
import { STANDARD_FEES, formatNaira, PaymentTransaction } from '../utils/payment.ts';
import { PaymentModal } from './PaymentModal.tsx';

interface AppointmentFormProps {
  initialDepartment?: string;
  onSuccess?: (refCode: string) => void;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  initialDepartment = '',
  onSuccess,
}) => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    phoneNumber: '',
    preferredDate: '',
    preferredTime: '',
    department: initialDepartment,
    notes: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [payOnline, setPayOnline] = useState<boolean>(true);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [paymentReceipt, setPaymentReceipt] = useState<PaymentTransaction | null>(null);

  const [submittedData, setSubmittedData] = useState<{
    data: AppointmentFormData;
    referenceCode: string;
    timestamp: string;
    payOnline: boolean;
  } | null>(null);

  // Set minimum date to today (YYYY-MM-DD)
  const todayStr = new Date().toISOString().split('T')[0];

  const timeSlots = [
    'Morning Clinic (08:00 AM - 12:00 PM)',
    'Afternoon Clinic (12:00 PM - 04:00 PM)',
    'Evening Clinic (04:00 PM - 08:00 PM)',
    'Urgent / Flexible Time (Please Call to Confirm)',
  ];

  const consultationFee =
    STANDARD_FEES[formData.department] || 2500;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field once typed
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateAppointmentForm(formData);

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const refCode = generateReferenceCode();
      const submission = {
        data: { ...formData },
        referenceCode: refCode,
        timestamp: new Date().toLocaleString(),
        payOnline: payOnline,
      };

      // Persist to admin appointment queue
      try {
        const stored = localStorage.getItem('gmc_appointments_list');
        const list = stored ? JSON.parse(stored) : [];
        list.unshift({
          id: `apt-${Date.now()}`,
          referenceCode: refCode,
          fullName: formData.fullName.trim(),
          phoneNumber: formData.phoneNumber.trim(),
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          department: formData.department,
          notes: formData.notes?.trim() || '',
          status: 'Pending Review',
          createdAt: new Date().toLocaleString(),
        });
        localStorage.setItem('gmc_appointments_list', JSON.stringify(list));
      } catch {
        // Fallback
      }

      setSubmittedData(submission);
      setIsSubmitting(false);

      if (payOnline) {
        setShowPaymentModal(true);
      }

      if (onSuccess) {
        onSuccess(refCode);
      }
    }, 400);
  };

  const handleReset = () => {
    setSubmittedData(null);
    setPaymentReceipt(null);
    setFormData({
      fullName: '',
      phoneNumber: '',
      preferredDate: '',
      preferredTime: '',
      department: '',
      notes: '',
    });
    setErrors({});
  };

  if (submittedData) {
    const whatsappText = createWhatsAppMessage(
      submittedData.data,
      submittedData.referenceCode
    );
    const whatsappHref = `https://wa.me/2347032585626?text=${whatsappText}`;

    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-3 pb-6 border-b border-slate-100">
          <div
            className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600"
            aria-hidden="true"
          >
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Appointment Enquiry Logged
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Your clinic consultation enquiry reference is:
          </p>
          <div className="inline-block bg-blue-50 border border-blue-200 text-[#0f2d59] font-mono font-bold text-base px-4 py-1.5 rounded-lg tracking-wider">
            {submittedData.referenceCode}
          </div>
        </div>

        {/* Payment Status Card */}
        {paymentReceipt ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-800">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                Consultation Fee Paid & Verified
              </span>
              <span className="font-mono">{paymentReceipt.receiptNumber}</span>
            </div>
            <p className="text-xs text-emerald-700">
              {formatNaira(paymentReceipt.amount)} settled via {paymentReceipt.paymentMethod.replace('_', ' ')}. Fast-track registration enabled on arrival at Goodwill Medical Centre reception.
            </p>
          </div>
        ) : submittedData.payOnline ? (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-[#0f2d59]">Consultation Fee: {formatNaira(consultationFee)}</p>
              <p className="text-[11px] text-slate-600">Complete payment now to avoid payment queue at hospital reception.</p>
            </div>
            <button
              type="button"
              onClick={() => setShowPaymentModal(true)}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-[#0f2d59] hover:bg-[#163f7a] rounded-lg cursor-pointer whitespace-nowrap shadow-xs"
            >
              Pay {formatNaira(consultationFee)} Now
            </button>
          </div>
        ) : (
          <div className="p-4 bg-slate-100 rounded-xl text-xs text-slate-700 space-y-0.5">
            <span className="font-semibold block">Payment Preference: Pay on Arrival</span>
            <p className="text-slate-500">You may settle the consultation fee ({formatNaira(consultationFee)}) at the hospital front desk using cash or POS terminal.</p>
          </div>
        )}

        {/* Summary of details */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 space-y-3 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="text-slate-500 block text-xs">Patient Full Name</span>
              <span className="font-semibold text-slate-900">{submittedData.data.fullName}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">Contact Phone</span>
              <span className="font-semibold text-slate-900">{submittedData.data.phoneNumber}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">Department / Service</span>
              <span className="font-semibold text-slate-900">{submittedData.data.department}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">Preferred Date & Time</span>
              <span className="font-semibold text-slate-900">
                {submittedData.data.preferredDate} · {submittedData.data.preferredTime}
              </span>
            </div>
          </div>
          {submittedData.data.notes && (
            <div className="pt-2 border-t border-slate-200/60">
              <span className="text-slate-500 block text-xs">Additional Notes</span>
              <p className="text-slate-800 italic mt-0.5">{submittedData.data.notes}</p>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Forward booking reference to Goodwill Medical Centre WhatsApp desk"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>Forward to Hospital WhatsApp</span>
          </a>

          <a
            href={HOSPITAL_INFO.phoneTelLink}
            aria-label="Call Goodwill Medical Centre reception desk"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-[#0f2d59] bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <Phone className="w-4 h-4 text-teal-600" aria-hidden="true" />
            <span>Call 0703 258 5626</span>
          </a>
        </div>

        <div className="text-center">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Book another appointment or pay another bill</span>
          </button>
        </div>

        {/* Modal if prompted */}
        {submittedData && (
          <PaymentModal
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            patientName={submittedData.data.fullName}
            patientPhone={submittedData.data.phoneNumber}
            amount={consultationFee}
            category="Consultation Fee"
            description={`Consultation Booking for ${submittedData.data.department}`}
            appointmentRef={submittedData.referenceCode}
            onPaymentSuccess={(tx) => {
              setPaymentReceipt(tx);
              setShowPaymentModal(false);
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-2xl mx-auto">
      {/* Demo notification badge */}
      <div className="mb-6 pb-4 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="inline-flex items-center gap-1 font-medium text-slate-700">
          <Clock className="w-3.5 h-3.5 text-teal-600" aria-hidden="true" />
          Appointment & Online Payment Portal
        </span>
        <span className="text-slate-400">Response within 2-4 hrs</span>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Patient Name */}
        <div>
          <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Patient Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" aria-hidden="true" />
            </div>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Chinedu Eze"
              aria-required="true"
              aria-invalid={!!errors.fullName}
              className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                errors.fullName
                  ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                  : 'border-slate-300 focus:border-[#0f2d59] focus:ring-blue-100 bg-white'
              }`}
            />
          </div>
          {errors.fullName && (
            <p className="mt-1 text-xs text-rose-600 flex items-center gap-1" role="alert">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.fullName}</span>
            </p>
          )}
        </div>

        {/* Telephone Number */}
        <div>
          <label htmlFor="phoneNumber" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Contact Telephone Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Phone className="w-4 h-4" aria-hidden="true" />
            </div>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="e.g. 0703 258 5626 or 080..."
              aria-required="true"
              aria-invalid={!!errors.phoneNumber}
              className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                errors.phoneNumber
                  ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                  : 'border-slate-300 focus:border-[#0f2d59] focus:ring-blue-100 bg-white'
              }`}
            />
          </div>
          {errors.phoneNumber && (
            <p className="mt-1 text-xs text-rose-600 flex items-center gap-1" role="alert">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.phoneNumber}</span>
            </p>
          )}
          <p className="text-[11px] text-slate-500 mt-1">
            Our nurses or reception team will call or WhatsApp this number to confirm availability.
          </p>
        </div>

        {/* Service / Department */}
        <div>
          <label htmlFor="department" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Medical Service / Department <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!errors.department}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                errors.department
                  ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                  : 'border-slate-300 focus:border-[#0f2d59] focus:ring-blue-100 bg-white'
              }`}
            >
              <option value="">-- Select department or service --</option>
              {HOSPITAL_SERVICES.map((s) => (
                <option key={s.id} value={s.title}>
                  {s.title} ({formatNaira(STANDARD_FEES[s.title] || 2500)})
                </option>
              ))}
              <option value="General Health Enquiry">Other / General Health Enquiry (₦2,500)</option>
            </select>
          </div>
          {errors.department && (
            <p className="mt-1 text-xs text-rose-600 flex items-center gap-1" role="alert">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.department}</span>
            </p>
          )}
        </div>

        {/* Date and Time row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="preferredDate" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Preferred Date <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Calendar className="w-4 h-4" aria-hidden="true" />
              </div>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                min={todayStr}
                value={formData.preferredDate}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!errors.preferredDate}
                className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                  errors.preferredDate
                    ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                    : 'border-slate-300 focus:border-[#0f2d59] focus:ring-blue-100 bg-white'
                }`}
              />
            </div>
            {errors.preferredDate && (
              <p className="mt-1 text-xs text-rose-600 flex items-center gap-1" role="alert">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{errors.preferredDate}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="preferredTime" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Preferred Time Slot <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Clock className="w-4 h-4" aria-hidden="true" />
              </div>
              <select
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!errors.preferredTime}
                className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                  errors.preferredTime
                    ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                    : 'border-slate-300 focus:border-[#0f2d59] focus:ring-blue-100 bg-white'
                }`}
              >
                <option value="">-- Choose time slot --</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
            {errors.preferredTime && (
              <p className="mt-1 text-xs text-rose-600 flex items-center gap-1" role="alert">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{errors.preferredTime}</span>
              </p>
            )}
          </div>
        </div>

        {/* Consultation Fee & Payment Preference */}
        <div className="pt-2 border-t border-slate-100">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            Payment & Consultation Fee Preference
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label
              className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                payOnline
                  ? 'border-[#0f2d59] bg-blue-50/50 text-slate-900 shadow-2xs'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <input
                type="radio"
                name="payPref"
                checked={payOnline}
                onChange={() => setPayOnline(true)}
                className="mt-1"
              />
              <div>
                <span className="font-bold text-xs sm:text-sm block text-[#0f2d59]">
                  Pay Online Now ({formatNaira(consultationFee)})
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Card, Bank Transfer, or USSD. Generates instant receipt & priority check-in.
                </span>
              </div>
            </label>

            <label
              className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                !payOnline
                  ? 'border-[#0f2d59] bg-blue-50/50 text-slate-900 shadow-2xs'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <input
                type="radio"
                name="payPref"
                checked={!payOnline}
                onChange={() => setPayOnline(false)}
                className="mt-1"
              />
              <div>
                <span className="font-bold text-xs sm:text-sm block text-slate-900">
                  Pay at Hospital Reception
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Pay with Cash or POS at the clinic front counter upon physical arrival.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Optional Notes */}
        <div>
          <label htmlFor="notes" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Optional Short Note or Symptoms
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3.5 pointer-events-none text-slate-400">
              <FileText className="w-4 h-4" aria-hidden="true" />
            </div>
            <textarea
              id="notes"
              name="notes"
              rows={2}
              value={formData.notes}
              onChange={handleChange}
              placeholder="Brief description of consultation reason..."
              className="w-full pl-10 pr-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0f2d59]"
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-lg text-sm font-semibold text-white bg-[#0f2d59] hover:bg-[#163f7a] active:bg-[#0b1e38] transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {isSubmitting ? (
              <span>Processing Visit Enquiry...</span>
            ) : payOnline ? (
              <>
                <CreditCard className="w-4 h-4 text-teal-300" aria-hidden="true" />
                <span>Book & Pay Consultation Fee ({formatNaira(consultationFee)})</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-teal-300" aria-hidden="true" />
                <span>Submit Appointment (Pay at Reception)</span>
              </>
            )}
          </button>
        </div>

        <p className="text-[11px] text-center text-slate-500 pt-1">
          * In urgent emergencies, call <a href={HOSPITAL_INFO.phoneTelLink} className="font-semibold text-[#0f2d59] underline">0703 258 5626</a> immediately or come directly to the hospital in Abakpa.
        </p>
      </form>
    </div>
  );
};
