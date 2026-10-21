/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, Star, ExternalLink } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData.ts';

export const QuickContactStrip: React.FC = () => {
  return (
    <section className="bg-slate-50 border-y border-slate-200/80 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Item 1: Telephone */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex items-start gap-3.5 hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0f2d59] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Direct Telephone
              </p>
              <a
                href={HOSPITAL_INFO.phoneTelLink}
                className="text-base font-bold text-[#0f2d59] hover:underline block truncate mt-0.5"
              >
                {HOSPITAL_INFO.phoneDisplay}
              </a>
              <p className="text-xs text-slate-500 mt-0.5">Click to call reception desk</p>
            </div>
          </div>

          {/* Item 2: WhatsApp Chat */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex items-start gap-3.5 hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                WhatsApp Messaging
              </p>
              <a
                href={HOSPITAL_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-bold text-emerald-800 hover:underline inline-flex items-center gap-1 mt-0.5"
              >
                <span>Chat on WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
              </a>
              <p className="text-xs text-slate-500 mt-0.5">Quick enquiries & directions</p>
            </div>
          </div>

          {/* Item 3: Hospital Location */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex items-start gap-3.5 hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Hospital Address
              </p>
              <a
                href={HOSPITAL_INFO.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-slate-900 hover:text-[#0f2d59] hover:underline block truncate mt-0.5"
                title={HOSPITAL_INFO.fullAddress}
              >
                {HOSPITAL_INFO.addressCode}, Abakpa, Enugu
              </a>
              <p className="text-xs text-slate-500 mt-0.5">Get driving/walking directions</p>
            </div>
          </div>

          {/* Item 4: Opening Hours & Public Rating */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex items-start gap-3.5 hover:border-teal-300 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Service Hours
                </p>
                <div className="flex items-center text-amber-700 text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-1" />
                  <span>5.0</span>
                  <span className="text-slate-400 font-normal ml-0.5">(6)</span>
                </div>
              </div>
              <p className="text-base font-bold text-slate-900 mt-0.5">
                {HOSPITAL_INFO.openingHoursDisplay}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5" title={HOSPITAL_INFO.openingHoursNote}>
                Emergency & urgent triage
              </p>
            </div>
          </div>
        </div>

        {/* Small subtle notice regarding verification */}
        <div className="mt-3 text-center">
          <p className="text-[11px] text-slate-500">
            * Opening hours status and emergency shift availability are subject to final administrative confirmation prior to official launch.
          </p>
        </div>
      </div>
    </section>
  );
};
