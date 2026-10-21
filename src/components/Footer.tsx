/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, MapPin, Clock, MessageCircle, ExternalLink, Shield, Lock } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData.ts';
import { PageId } from './Navbar.tsx';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      role="contentinfo"
      aria-label="Goodwill Medical Centre footer information, directory, and contact details"
      className="bg-[#0b1e38] text-slate-300 border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Hospital Identity */}
          <section aria-labelledby="footer-hospital-identity" className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300"
                aria-hidden="true"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7V3z" />
                </svg>
              </div>
              <h3 id="footer-hospital-identity" className="text-lg font-bold text-white tracking-tight">
                Goodwill Medical Centre
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Serving the community of Abakpa and Enugu State with accessible clinical consultations, maternal healthcare, laboratory screening, and urgent triage.
            </p>
            <div className="pt-2">
              <span className="text-xs text-teal-300/90 font-medium block">
                Google Maps Verified Listing · 5.0 Rating (6 Reviews)
              </span>
            </div>
          </section>

          {/* Column 2: Navigation Links */}
          <nav aria-label="Footer navigation links" className="space-y-3">
            <h4 id="footer-nav-heading" className="text-xs font-semibold uppercase tracking-wider text-white">
              Website Navigation
            </h4>
            <ul className="space-y-2 text-xs" role="list">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  aria-label="Navigate to Home page"
                  className="hover:text-white transition-colors cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-teal-400 focus-visible:rounded"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  aria-label="Navigate to About Goodwill Medical Centre page"
                  className="hover:text-white transition-colors cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-teal-400 focus-visible:rounded"
                >
                  About Goodwill Medical Centre
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  aria-label="Navigate to Hospital Services & Clinics page"
                  className="hover:text-white transition-colors cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-teal-400 focus-visible:rounded"
                >
                  Hospital Services & Clinics
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('health-updates')}
                  aria-label="Navigate to Community Health Updates page"
                  className="hover:text-white transition-colors cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-teal-400 focus-visible:rounded"
                >
                  Community Health Updates
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('appointment')}
                  aria-label="Navigate to Plan Your Visit & Appointments booking page"
                  className="hover:text-white transition-colors cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-teal-400 focus-visible:rounded"
                >
                  Plan Your Visit & Appointments
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('pay-bill')}
                  aria-label="Navigate to Pay Hospital Bills and Invoices page"
                  className="hover:text-teal-300 font-medium transition-colors cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-teal-400 focus-visible:rounded"
                >
                  Pay Hospital Bills & Invoices
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  aria-label="Navigate to Contact & Location Directions page"
                  className="hover:text-white transition-colors cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-teal-400 focus-visible:rounded"
                >
                  Contact & Location Directions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('privacy')}
                  aria-label="Navigate to Patient Privacy Policy page"
                  className="hover:text-white transition-colors cursor-pointer text-left inline-flex items-center gap-1 text-slate-400 focus-visible:outline-2 focus-visible:outline-teal-400 focus-visible:rounded"
                >
                  <Shield className="w-3 h-3" aria-hidden="true" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li className="pt-1">
                <button
                  onClick={() => handleNav('admin')}
                  aria-label="Staff and Hospital Administrator Login Portal"
                  className="hover:text-teal-300 text-teal-400/90 font-medium transition-colors cursor-pointer text-left inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-teal-400 focus-visible:rounded"
                >
                  <Lock className="w-3 h-3" aria-hidden="true" />
                  <span>Staff & Admin Portal</span>
                </button>
              </li>
            </ul>
          </nav>

          {/* Column 3: Contact Details */}
          <section aria-labelledby="footer-contact-heading" className="space-y-3">
            <h4 id="footer-contact-heading" className="text-xs font-semibold uppercase tracking-wider text-white">
              Contact & Hours
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Direct Hospital Line:</span>
                  <a
                    href={HOSPITAL_INFO.phoneTelLink}
                    aria-label={`Call Goodwill Medical Centre reception desk at telephone number ${HOSPITAL_INFO.phoneDisplay}`}
                    className="text-white hover:text-teal-300 font-semibold block transition-colors focus-visible:outline-2 focus-visible:outline-teal-400 focus-visible:rounded"
                  >
                    {HOSPITAL_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="text-slate-400 block text-[11px]">WhatsApp Enquiries:</span>
                  <a
                    href={HOSPITAL_INFO.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat with Goodwill Medical Centre reception on WhatsApp (opens in new tab or WhatsApp app)"
                    className="text-emerald-300 hover:text-white font-medium inline-flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-teal-400 focus-visible:rounded"
                  >
                    <span>Chat on WhatsApp</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Operating Status:</span>
                  <span className="text-white font-medium block">
                    {HOSPITAL_INFO.openingHoursDisplay}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    * Pending administrative verification
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Column 4: Physical Location */}
          <section aria-labelledby="footer-location-heading" className="space-y-3">
            <h4 id="footer-location-heading" className="text-xs font-semibold uppercase tracking-wider text-white">
              Hospital Location
            </h4>
            <div className="text-xs space-y-2 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-white">Goodwill Medical Centre</p>
                  <p className="text-slate-400 leading-relaxed mt-0.5">
                    {HOSPITAL_INFO.addressCode}, Abakpa, Enugu, 400103, Enugu State, Nigeria
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={HOSPITAL_INFO.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Google Maps driving and walking directions to Goodwill Medical Centre in Abakpa, Enugu (opens in new window)"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800 text-teal-300 hover:bg-slate-700 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-teal-400"
                >
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Google Maps Directions</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom copyright & disclaimer bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Goodwill Medical Centre. All rights reserved.</p>
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => handleNav('privacy')}
              aria-label="View Privacy Policy and Confidentiality Guidelines"
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => handleNav('admin')}
              aria-label="Staff & Administrator Portal Login"
              className="hover:text-teal-300 transition-colors cursor-pointer text-slate-300"
            >
              Staff Portal
            </button>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">
              Website Proposal Concept for Hospital Administration Review
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
