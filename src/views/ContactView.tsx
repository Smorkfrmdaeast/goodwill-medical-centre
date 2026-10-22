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
  ShieldAlert,
  Navigation,
  Copy,
  Check,
  Car,
  Bus,
  Compass,
  Calendar
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
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = HOSPITAL_INFO.fullAddress;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    } catch {
      // Fallback
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(HOSPITAL_INFO.fullAddress).catch(() => {});
    }

    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const scrollToLocation = () => {
    const el = document.getElementById('location');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
            <span className="text-xs font-semibold text-[#0f2d59] block mb-2 uppercase tracking-wider">
              Get in Touch · Goodwill Medical Centre
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0f2d59]">
              Contact Us & Hospital Directions
            </h1>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Find our exact location in Abakpa, Enugu, contact our medical reception team by phone or WhatsApp, or submit a general patient enquiry.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={scrollToLocation}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0f2d59] text-white text-xs font-semibold hover:bg-[#163f7a] transition-colors cursor-pointer shadow-xs"
              >
                <MapPin className="w-4 h-4 text-teal-300" />
                <span>Jump to Location & Map ↓</span>
              </button>
              <a
                href={HOSPITAL_INFO.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-xs"
              >
                <Navigation className="w-4 h-4 text-blue-600" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Contact Channels & Form */}
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
                    <div className="flex items-center gap-3 mt-1.5">
                      <button
                        onClick={scrollToLocation}
                        className="text-xs text-[#0f2d59] hover:underline font-semibold inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>View map below</span>
                      </button>
                      <span className="text-slate-300">·</span>
                      <a
                        href={HOSPITAL_INFO.googleMapsDirectionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-700 hover:underline font-semibold inline-flex items-center gap-1"
                      >
                        <span>Directions</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
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
                If you are experiencing severe breathing difficulty, acute trauma, or intense bleeding, please do not wait for an online form response. Call <a href={HOSPITAL_INFO.phoneTelLink} className="font-bold underline">{HOSPITAL_INFO.phoneDisplay}</a> immediately or come straight to our hospital in Abakpa.
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
          </div>
        </div>
      </div>

      {/* Dedicated Hospital Location & Directions Section */}
      <section
        id="location"
        aria-labelledby="location-heading"
        className="bg-slate-50 border-t border-slate-200 py-16 lg:py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#0f2d59] text-xs font-bold uppercase tracking-wider mb-3">
              <MapPin className="w-3.5 h-3.5 text-blue-700" />
              <span>Hospital Location & Wayfinding</span>
            </div>
            <h2
              id="location-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0f2d59]"
            >
              Location: Goodwill Medical Centre in Abakpa
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              We are located in the Abakpa district of Enugu, Enugu State. Use the interactive Google Maps embed below to explore our location, plan your route, or launch live turn-by-turn GPS navigation.
            </p>
          </div>

          {/* Main Location Content: Map & Navigation Console */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Top Toolbar / Location Bar */}
            <div className="bg-[#0f2d59] text-white px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <h3 className="text-base font-bold text-white tracking-wide">
                    {HOSPITAL_INFO.name} · {HOSPITAL_INFO.district}, {HOSPITAL_INFO.city}
                  </h3>
                </div>
                <p className="text-xs text-slate-200 mt-0.5">
                  Plus Code: <span className="font-mono text-teal-200 font-semibold">{HOSPITAL_INFO.addressCode}</span> · {HOSPITAL_INFO.state}, Nigeria
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors cursor-pointer"
                  title="Copy physical address to clipboard"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span className="text-emerald-300 font-semibold">Address Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-300" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
                <a
                  href={HOSPITAL_INFO.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-[#071931] text-xs font-bold transition-colors shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>

            {/* Embedded Google Maps iFrame */}
            <div className="relative w-full h-80 sm:h-96 md:h-[460px] lg:h-[500px] bg-slate-100">
              <iframe
                title="Google Maps embed showing Goodwill Medical Centre location in Abakpa, Enugu"
                src="https://maps.google.com/maps?q=Goodwill+Medical+Centre+Abakpa+Enugu+Nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Location Details & Wayfinding Guides */}
            <div className="p-6 sm:p-8 bg-white border-t border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card 1: Address & GPS Information */}
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/90 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-[#0f2d59]">
                      <MapPin className="w-5 h-5 text-blue-700" />
                      <h4 className="text-sm font-bold text-slate-900">Hospital Address & GPS</h4>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {HOSPITAL_INFO.fullAddress}
                    </p>
                    <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-500 space-y-1">
                      <p><span className="font-semibold text-slate-700">District:</span> Abakpa, Enugu East LGA</p>
                      <p><span className="font-semibold text-slate-700">Digital Plus Code:</span> {HOSPITAL_INFO.addressCode}</p>
                      <p><span className="font-semibold text-slate-700">City / State:</span> Enugu, Enugu State</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3">
                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      className="w-full py-2 px-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {copiedAddress ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied to Clipboard</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Copy Full Address</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Card 2: Public Transit & Arriving from Enugu City */}
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/90 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-[#0f2d59]">
                      <Bus className="w-5 h-5 text-emerald-700" />
                      <h4 className="text-sm font-bold text-slate-900">Public Transit & Keke</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Frequent commuter minibuses and tricycles (keke napep) connect Abakpa to Holy Ghost / Old Park, New Haven, and Trans-Ekulu.
                    </p>
                    <ul className="mt-3 space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                      <li>Board any bus or keke headed towards <strong>Abakpa Nike</strong>.</li>
                      <li>Alight at <strong>Abakpa Junction</strong> or specify Goodwill Medical Centre.</li>
                      <li>Motorcycles and tricycles are readily available for immediate door-to-door arrival.</li>
                    </ul>
                  </div>
                  <div className="mt-4 pt-3">
                    <a
                      href={HOSPITAL_INFO.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-lg border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-xs font-semibold text-emerald-900 transition-colors inline-flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                      <span>WhatsApp for Landmark Help</span>
                    </a>
                  </div>
                </div>

                {/* Card 3: Driving, Parking & Emergency Access */}
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/90 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-[#0f2d59]">
                      <Car className="w-5 h-5 text-teal-700" />
                      <h4 className="text-sm font-bold text-slate-900">Driving & Emergency Drop-off</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Easily reached by private vehicle, taxi, or ride-hailing (Uber/Bolt) with straightforward access from major Abakpa arterials.
                    </p>
                    <ul className="mt-3 space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                      <li><strong>Patient Drop-Off:</strong> Direct drive-in casualty access for emergency transfers.</li>
                      <li><strong>Parking:</strong> On-premises vehicle parking for patients and visiting family.</li>
                      <li><strong>Accessibility:</strong> Level, step-free wheelchair entrance at the main portal.</li>
                    </ul>
                  </div>
                  <div className="mt-4 pt-3">
                    <a
                      href={HOSPITAL_INFO.phoneTelLink}
                      className="w-full py-2 px-3 rounded-lg border border-blue-300 bg-blue-50 hover:bg-blue-100 text-xs font-semibold text-[#0f2d59] transition-colors inline-flex items-center justify-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-blue-700" />
                      <span>Call Desk: {HOSPITAL_INFO.phoneDisplay}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Action Banner */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-xs sm:text-sm font-bold text-slate-900">
                    Planning to visit Goodwill Medical Centre for a consultation?
                  </p>
                  <p className="text-xs text-slate-500">
                    Book an advance appointment or check in with our clinical team ahead of time.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onNavigate('appointment')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0f2d59] text-white text-xs font-semibold hover:bg-[#163f7a] transition-colors cursor-pointer shadow-xs"
                  >
                    <Calendar className="w-3.5 h-3.5 text-teal-300" />
                    <span>Plan Your Visit / Appointment</span>
                  </button>
                  <a
                    href={HOSPITAL_INFO.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors shadow-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    <span>Google Maps Directions</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
