/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  ShieldCheck,
  Star,
  Users,
  Award,
  ArrowRight
} from 'lucide-react';
import { HOSPITAL_INFO, STAFF_PLACEHOLDERS, FREQUENT_QUESTIONS } from '../data/hospitalData.ts';
import { PageId } from '../components/Navbar.tsx';

const CONSULTATION_IMAGE = '/src/assets/images/goodwill_consultation_1792605556519.jpg';
const CHECKUP_IMAGE = '/src/assets/images/goodwill_checkup_1792605541549.jpg';

interface AboutViewProps {
  onNavigate: (page: PageId) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="bg-slate-50 border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-[#0f2d59] flex items-center gap-2 mb-2">
              <span>About Goodwill Medical Centre</span>
              <span className="text-slate-300">·</span>
              <span>Abakpa, Enugu</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0f2d59]">
              Community Healthcare Built on Respect & Dependability
            </h1>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Serving individuals, mothers, and families in Abakpa and Enugu State with essential clinical consultations, emergency care, and maternal health support.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content & Philosophy */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">
                Our Location & Presence
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Serving the Abakpa Community
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Goodwill Medical Centre is a community medical facility situated at FGQQ+57, Abakpa, Enugu (400103). The hospital provides an essential first point of clinical contact for residents seeking timely medical evaluations, ongoing wellness support, and urgent medical interventions.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Our clinical environment is designed to be accessible, calm, and welcoming. We believe quality healthcare begins with careful listening, prompt diagnosis, and compassionate guidance tailored to each patient's circumstances.
            </p>

            {/* Google Verified Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Verified Public Record & Patient Feedback</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <div className="flex items-center text-amber-700 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-1" />
                  <span>5.0 out of 5.0 Rating</span>
                </div>
                <span>·</span>
                <span>Based on 6 public reviews on Google Maps</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Patients consistently highlight courteous staff, clean clinical spaces, and attentive doctor consultations.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('appointment')}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0f2d59] hover:bg-[#163f7a] transition-colors cursor-pointer"
              >
                Book an Appointment
              </button>
              <a
                href={HOSPITAL_INFO.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors inline-flex items-center gap-1.5"
              >
                <MapPin className="w-4 h-4 text-teal-600" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
              <img
                src={CONSULTATION_IMAGE}
                alt="Doctor taking patient notes at Goodwill Medical Centre"
                className="w-full h-80 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-4 bg-blue-50/60 border border-blue-100 rounded-xl text-xs text-slate-600 space-y-1">
              <p className="font-semibold text-[#0f2d59]">Administrative Notice</p>
              <p className="leading-relaxed">
                Hospital background, historical milestones, and formal clinical accreditations are prepared for updates upon administrative review with the hospital management.
              </p>
            </div>
          </div>
        </div>

        {/* Clinical Staff Leadership Placeholders */}
        <div className="mt-20 pt-14 border-t border-slate-200">
          <div className="max-w-2xl mx-auto text-center mb-10 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">
              Hospital Administration & Medical Team
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0f2d59]">
              Clinical Team & Leadership Profiles
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Structured editable profile spaces ready to showcase the verified credentials, specialties, and schedules of the hospital's clinical staff.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STAFF_PLACEHOLDERS.map((staff, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-xl border border-slate-200 p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-[#0f2d59] flex items-center justify-center mb-3">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider">
                    {staff.role}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-1 mb-2">
                    {staff.designation}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {staff.description}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-slate-200/60 text-[11px] text-blue-900 font-medium">
                  {staff.verifiedStatus}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="mt-20 pt-14 border-t border-slate-200">
          <div className="max-w-2xl mx-auto text-center mb-10 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0f2d59]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Key information for patients and visitors planning a visit to Goodwill Medical Centre.
            </p>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-slate-200 border-y border-slate-200">
            {FREQUENT_QUESTIONS.map((faq, i) => (
              <div key={i} className="py-5 space-y-1.5">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
