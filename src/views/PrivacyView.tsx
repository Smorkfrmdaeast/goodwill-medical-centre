/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Lock, FileText, CheckCircle, ArrowLeft } from 'lucide-react';
import { PageId } from '../components/Navbar.tsx';
import { HOSPITAL_INFO } from '../data/hospitalData.ts';

interface PrivacyViewProps {
  onNavigate: (page: PageId) => void;
}

export const PrivacyView: React.FC<PrivacyViewProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-screen py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#0f2d59] hover:underline mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <header className="space-y-3 pb-8 border-b border-slate-200">
          <div className="flex items-center gap-2 text-teal-700 text-xs font-semibold uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>Patient Privacy & Confidentiality Notice</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0f2d59]">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500">
            Goodwill Medical Centre, Abakpa, Enugu, Nigeria · Effective March 2026
          </p>
        </header>

        <div className="py-8 space-y-8 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">
              1. Our Commitment to Patient Confidentiality
            </h2>
            <p>
              At Goodwill Medical Centre, patient privacy and medical confidentiality are fundamental to the trust you place in our facility. This policy explains how we collect, handle, and protect personal and health-related information submitted through our website and within our clinic in Abakpa, Enugu.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">
              2. Information We Collect
            </h2>
            <p>
              When you use our online appointment enquiry form, WhatsApp contact links, or general enquiry channels, we may collect:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Patient full name and contact telephone number.</li>
              <li>Preferred appointment dates, clinic departments, and consultation preferences.</li>
              <li>Voluntary short descriptions of symptoms or reasons for visit provided by the patient.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">
              3. Purpose of Information Use
            </h2>
            <p>
              Any contact details provided via this website are used strictly for clinical and operational purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Confirming and scheduling doctor consultations with hospital nursing staff.</li>
              <li>Reaching patients to communicate clinic availability or schedule changes.</li>
              <li>Preparing outpatient hospital files in advance of your physical visit.</li>
            </ul>
            <p>
              We do <strong>not</strong> sell, rent, or lease patient contact details to marketing agencies, commercial pharmaceutical advertisers, or third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">
              4. Security of Clinical Information
            </h2>
            <p>
              We maintain strict safeguards to protect patient data from unauthorized access or disclosure. Physical patient records at the clinic are handled exclusively by authorized clinical and administrative personnel in accordance with Nigerian medical ethics and data protection standards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">
              5. Contacting the Hospital Regarding Privacy
            </h2>
            <p>
              If you have any questions about this privacy notice or wish to update your contact preferences, please contact the administrative desk at Goodwill Medical Centre, FGQQ+57, Abakpa, Enugu, or call us at <a href={HOSPITAL_INFO.phoneTelLink} className="font-semibold text-[#0f2d59] underline">{HOSPITAL_INFO.phoneDisplay}</a>.
            </p>
          </section>
        </div>

        <div className="pt-8 border-t border-slate-200">
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-[#0f2d59] bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Have questions? Contact Hospital Administration
          </button>
        </div>
      </div>
    </div>
  );
};
