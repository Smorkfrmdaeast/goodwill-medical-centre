/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ExternalLink,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldAlert
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData.ts';
import { PageId } from '../components/Navbar.tsx';

interface ContactViewProps {
  onNavigate: (page: PageId) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    phoneOrEmail: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }
    if (!formData.phoneOrEmail.trim()) {
      newErrors.phoneOrEmail = 'Please provide a telephone number or email address.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your enquiry message.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-[#0f2d59] block mb-2">
              Get in Touch with Goodwill Medical Centre
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0f2d59]">
              Contact Us & Hospital Directions
            </h1>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Find our exact location in Abakpa, Enugu, contact our reception team by phone or WhatsApp, or submit a general enquiry.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick action boxes */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-5">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-200/80 pb-3">
                Hospital Contact Channels
              </h2>

              <div className="space-y-4">
                {/* Telephone */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100/70 text-[#0f2d59] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                      Telephone Call
                    </span>
                    <a
                      href={HOSPITAL_INFO.phoneTelLink}
                      className="text-base font-bold text-[#0f2d59] hover:underline"
                    >
                      {HOSPITAL_INFO.phoneDisplay}
                    </a>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Direct line to reception desk for consultations & triage.
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100/70 text-emerald-800 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                      WhatsApp Messaging
                    </span>
                    <a
                      href={HOSPITAL_INFO.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-emerald-800 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Chat on WhatsApp</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Fast responses for appointment enquiries & location assistance.
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                      Hospital Location
                    </span>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">
                      {HOSPITAL_INFO.fullAddress}
                    </p>
                    <a
                      href={HOSPITAL_INFO.googleMapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#0f2d59] hover:underline font-semibold mt-1 inline-flex items-center gap-1"
                    >
                      <span>Open Google Maps Directions</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-100/70 text-teal-800 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                      Emergency & Clinic Hours
                    </span>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">
                      {HOSPITAL_INFO.openingHoursDisplay}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      24-hour urgent care listing subject to hospital administrative confirmation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency note */}
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 space-y-1">
              <p className="font-bold flex items-center gap-1.5 text-rose-950">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                Medical Emergencies
              </p>
              <p className="leading-relaxed">
                If you are experiencing severe breathing difficulty, acute trauma, or intense bleeding, please do not wait for an online form response. Call <a href={HOSPITAL_INFO.phoneTelLink} className="font-bold underline">{HOSPITAL_INFO.phoneDisplay}</a> immediately or come straight to our hospital.
              </p>
            </div>
          </div>

          {/* Right Column: General Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                Send a Message or General Enquiry
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                Have a non-urgent question regarding hospital services, records, or admissions? Send us a message and our administrative team will respond.
              </p>

              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">
                    Enquiry Logged (Prototype Demonstration)
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. In the live website, your message will be forwarded directly to the hospital's reception email and SMS gateway.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', phoneOrEmail: '', subject: '', message: '' });
                    }}
                    className="mt-4 px-4 py-2 text-xs font-semibold text-[#0f2d59] border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Your Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      placeholder="e.g. Nneka Umeh"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0f2d59]"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phoneOrEmail" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Phone Number or Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="phoneOrEmail"
                      value={formData.phoneOrEmail}
                      onChange={(e) => {
                        setFormData({ ...formData, phoneOrEmail: e.target.value });
                        if (errors.phoneOrEmail) setErrors({ ...errors, phoneOrEmail: '' });
                      }}
                      placeholder="0703... or user@example.com"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0f2d59]"
                    />
                    {errors.phoneOrEmail && (
                      <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.phoneOrEmail}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder="e.g. Antenatal clinic schedule enquiry"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0f2d59]"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Enquiry Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      placeholder="How can our hospital team assist you?"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0f2d59]"
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 rounded-lg text-sm font-semibold text-white bg-[#0f2d59] hover:bg-[#163f7a] transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    <Send className="w-4 h-4 text-teal-300" />
                    <span>Send Enquiry</span>
                  </button>
                </form>
              )}
            </div>

            {/* Embedded interactive map preview card */}
            <div className="mt-8 bg-slate-50 rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Interactive Map View · Abakpa, Enugu
                </span>
                <a
                  href={HOSPITAL_INFO.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#0f2d59] font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-200 h-64 bg-slate-200">
                <iframe
                  title="Goodwill Medical Centre Google Map Location"
                  src={HOSPITAL_INFO.googleMapsEmbedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
