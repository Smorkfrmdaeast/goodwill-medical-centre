/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Clock, MessageCircle, AlertCircle, CheckCircle, FileText, Calendar } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData.ts';
import { AppointmentForm } from '../components/AppointmentForm.tsx';
import { PageId } from '../components/Navbar.tsx';

interface AppointmentViewProps {
  onNavigate: (page: PageId) => void;
  selectedDepartment?: string;
}

export const AppointmentView: React.FC<AppointmentViewProps> = ({
  onNavigate,
  selectedDepartment = '',
}) => {
  return (
    <div className="bg-slate-50 min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-10 space-y-3">
          <span className="text-xs font-semibold text-[#0f2d59] uppercase tracking-wider block">
            Goodwill Medical Centre · Patient Desk
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0f2d59]">
            Plan Your Hospital Visit
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Submit an appointment enquiry below to arrange a consultation with our medical team in Abakpa, Enugu. We review availability and confirm your preferred time slot.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Info Column: Preparing for Your Visit */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                What to Bring to Your Appointment
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-[#0f2d59] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    1
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block">Identification or Hospital Card</span>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Your existing hospital card if you have visited before, or a form of ID for new patient record creation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-[#0f2d59] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    2
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block">Previous Medical Reports</span>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Any recent lab tests, ultrasound scans, or referral letters from other healthcare facilities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-[#0f2d59] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    3
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block">Current Medications</span>
                    <p className="text-xs text-slate-500 mt-0.5">
                      A list or packaging of any medicines, vitamins, or supplements you are currently taking.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
                <p>
                  Please arrive 15 minutes before your scheduled appointment to allow our nurses to check your vital signs (blood pressure, temperature, weight).
                </p>
              </div>
            </div>

            {/* Direct Telephone Alternative */}
            <div className="bg-[#0f2d59] text-white rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-teal-300 font-semibold text-xs uppercase tracking-wider">
                <Phone className="w-4 h-4" />
                <span>Prefer to Call Us Directly?</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                If you prefer speaking with our reception desk or have immediate questions about doctor availability, call us directly:
              </p>
              <a
                href={HOSPITAL_INFO.phoneTelLink}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-white text-[#0f2d59] font-bold text-sm hover:bg-slate-100 transition-colors"
              >
                <Phone className="w-4 h-4 text-teal-600" />
                <span>Call {HOSPITAL_INFO.phoneDisplay}</span>
              </a>

              <a
                href={HOSPITAL_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right / Main Column: The Form */}
          <div className="lg:col-span-7">
            <AppointmentForm initialDepartment={selectedDepartment} />
          </div>
        </div>
      </div>
    </div>
  );
};
