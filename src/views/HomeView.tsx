/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Phone,
  Calendar,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Check,
  Stethoscope,
  Clock,
  HeartPulse,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Star
} from 'lucide-react';
import { HOSPITAL_INFO, HOSPITAL_SERVICES, HEALTH_ARTICLES, STAFF_PLACEHOLDERS } from '../data/hospitalData.ts';
import { QuickContactStrip } from '../components/QuickContactStrip.tsx';
import { AppointmentForm } from '../components/AppointmentForm.tsx';
import { PageId } from '../components/Navbar.tsx';

// Image paths from batch generation
const HERO_IMAGE = '/src/assets/images/goodwill_hero_care_1792605540973.jpg';
const CONSULTATION_IMAGE = '/src/assets/images/goodwill_consultation_1792605556519.jpg';
const CHECKUP_IMAGE = '/src/assets/images/goodwill_checkup_1792605541549.jpg';

interface HomeViewProps {
  onNavigate: (page: PageId) => void;
  onSelectService?: (serviceId: string) => void;
  onSelectArticle?: (articleId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectService,
  onSelectArticle,
}) => {
  const displayArticles = React.useMemo(() => {
    try {
      const stored = localStorage.getItem('gmc_custom_articles');
      if (stored) {
        const custom: HealthArticle[] = JSON.parse(stored);
        return [...custom, ...HEALTH_ARTICLES].slice(0, 3);
      }
    } catch {
      // Fallback
    }
    return HEALTH_ARTICLES.slice(0, 3);
  }, []);

  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION */}
      <section className="relative bg-white pt-8 pb-16 lg:pt-14 lg:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Headlines & Actions */}
            <div className="lg:col-span-7 space-y-6">
              {/* Clean metadata kicker - no pill */}
              <div className="text-xs font-semibold text-[#0f2d59] flex items-center gap-2">
                <span>Goodwill Medical Centre</span>
                <span className="text-slate-300" aria-hidden="true">·</span>
                <span>Abakpa, Enugu</span>
                <span className="text-slate-300" aria-hidden="true">·</span>
                <span className="text-teal-700">Healthcare Proposal Concept</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0f2d59] leading-[1.15] text-balance">
                Caring for You, Every Step of the Way.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Find essential hospital information, explore available services, and contact Goodwill Medical Centre to make an appointment. Providing dedicated patient care for families across Abakpa and Enugu State.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('appointment')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#0f2d59] hover:bg-[#163f7a] rounded-lg shadow-xs hover:shadow transition-all cursor-pointer whitespace-nowrap"
                >
                  <Calendar className="w-4 h-4 text-teal-300" />
                  <span>Book an Appointment</span>
                </button>

                <a
                  href={HOSPITAL_INFO.phoneTelLink}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#0f2d59] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 text-teal-600" />
                  <span>Call the Hospital ({HOSPITAL_INFO.phoneDisplay})</span>
                </a>
              </div>

              {/* Verified Registry Note */}
              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-3 text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  Verified Google Maps Listing
                </span>
                <span className="text-slate-300 hidden sm:inline">·</span>
                <span className="inline-flex items-center gap-1">
                  <span className="font-semibold text-slate-800">5.0</span>
                  <div className="flex text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  </div>
                  <span>(6 reviews)</span>
                </span>
                <span className="text-slate-300 hidden sm:inline">·</span>
                <span>Open 24 Hours for Emergencies</span>
              </div>
            </div>

            {/* Right Column: Authentic Healthcare Photography */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-100">
                <img
                  src={HERO_IMAGE}
                  alt="Doctor and patient consultation at Goodwill Medical Centre"
                  className="w-full h-[360px] sm:h-[440px] object-cover"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                {/* Subtle caption overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/85 via-slate-900/40 to-transparent p-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-wider text-teal-300">
                    Clinical Care in Abakpa
                  </p>
                  <p className="text-sm font-medium mt-0.5 leading-snug">
                    Dedicated outpatient consultations, compassionate nursing, and personalized attention.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK CONTACT SECTION */}
      <QuickContactStrip />

      {/* 3. INTRODUCTION SECTION */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0f2d59]">
              Welcome to Goodwill Medical Centre
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Goodwill Medical Centre is situated in the heart of Abakpa, Enugu. Visitors can use this website to explore essential hospital information, review available healthcare services, obtain driving directions, and contact our facility to arrange clinical consultations.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              We focus on providing dependable community care, clear communication, and timely assistance whenever you or your loved ones require medical support.
            </p>
          </div>

          {/* 3 Core Highlights (Clean editorial layout, no pill sandwiches) */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-100/70 text-[#0f2d59] flex items-center justify-center mb-4">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">
                Accessible Community Care
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Conveniently located in Abakpa, Enugu, making healthcare readily accessible without burdensome travel for local families.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-teal-100/70 text-teal-800 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">
                24-Hour Emergency Triage
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Listed as open 24 hours on public health directories, providing medical evaluation and stabilizing care whenever urgent situations arise.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-100/70 text-emerald-800 flex items-center justify-center mb-4">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">
                Clear Appointment Process
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Enquire online or call in advance to plan your visit, reduce waiting times, and coordinate directly with nursing staff.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES PREVIEW SECTION */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">
                Clinical Services
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0f2d59] mt-1">
                Hospital Healthcare Services
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-xl">
                Draft service categories presented for hospital administrative review. Neutral placeholders can be tailored to the centre's exact verified specialty list.
              </p>
            </div>

            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0f2d59] hover:underline cursor-pointer self-start md:self-auto"
            >
              <span>View All 6 Hospital Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOSPITAL_SERVICES.slice(0, 6).map((service, index) => (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-slate-200/90 p-6 flex flex-col justify-between shadow-2xs hover:shadow-sm hover:border-blue-300 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="font-semibold text-teal-700">{service.category}</span>
                    <span>{service.availability}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {service.summary}
                  </p>

                  <ul className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                    {service.keyFeatures.slice(0, 2).map((feat, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (onSelectService) {
                        onSelectService(service.id);
                      } else {
                        onNavigate('services');
                      }
                    }}
                    className="text-xs font-semibold text-[#0f2d59] hover:text-blue-900 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onNavigate('appointment')}
                    className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    Book for this
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Draft notice banner */}
          <div className="mt-8 p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-slate-600">
              * Note for Hospital Owner: These service descriptions represent realistic standard offerings. They will be adjusted with exact laboratory tests, surgical capabilities, and consulting days once verified.
            </span>
            <button
              onClick={() => onNavigate('contact')}
              className="text-xs font-semibold text-[#0f2d59] hover:underline whitespace-nowrap"
            >
              Confirm Hospital Services →
            </button>
          </div>
        </div>
      </section>

      {/* 5. APPOINTMENT SECTION */}
      <section className="py-16 sm:py-20 bg-white" id="appointment-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center mb-10 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">
              Scheduling & Appointments
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0f2d59]">
              Plan Your Visit
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Contact our team to enquire about availability and arrange a suitable appointment. Hospital staff will confirm your preferred timing.
            </p>
          </div>

          {/* Embedded Appointment Form Component */}
          <AppointmentForm />
        </div>
      </section>

      {/* 6. ABOUT SECTION PREVIEW */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                <img
                  src={CONSULTATION_IMAGE}
                  alt="Doctor at clinical desk at Goodwill Medical Centre"
                  className="w-full h-[360px] object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">
                About The Hospital
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0f2d59]">
                Dedicated Healthcare in Abakpa, Enugu
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Goodwill Medical Centre has established a trusted presence within Abakpa, Enugu State. Our focus is centered on dependable patient consultations, respectful treatment, maternal care, and timely medical attention.
              </p>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                With a perfect 5.0 rating across public reviews on Google Maps, our facility is recognized by patients for compassionate care, clean facilities, and responsive support.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#0f2d59] bg-white border border-slate-300 hover:border-slate-400 rounded-lg shadow-2xs transition-colors cursor-pointer"
                >
                  <span>Read More About Our Hospital</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={HOSPITAL_INFO.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-200/80 hover:bg-slate-300/80 rounded-lg transition-colors"
                >
                  <MapPin className="w-4 h-4 text-teal-700" />
                  <span>View on Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. MEDICAL STAFF & CLINICAL LEADERSHIP PLACEHOLDERS */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center mb-12 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">
              Clinical Team & Leadership
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0f2d59]">
              Medical Staff Profiles
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              In accordance with ethical healthcare standards, specific doctor and nurse credentials will be published once officially confirmed by Goodwill Medical Centre management.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STAFF_PLACEHOLDERS.map((staff, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-xl border border-slate-200/80 p-5 flex flex-col justify-between hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-blue-100/60 text-[#0f2d59] flex items-center justify-center mb-4">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider block">
                    {staff.role}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-1 mb-2">
                    {staff.designation}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {staff.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-medium">Verification Status:</span>
                  <span className="text-blue-800 font-semibold">{staff.verifiedStatus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. HEALTH UPDATES SECTION */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">
                Community Health Education
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0f2d59] mt-1">
                Health Updates & Wellness Notes
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-xl">
                Practical, evidence-based preventive health education tailored for individuals and families in Enugu.
              </p>
            </div>

            <button
              onClick={() => onNavigate('health-updates')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0f2d59] hover:underline cursor-pointer self-start md:self-auto"
            >
              <span>Explore All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-xl border border-slate-200/90 p-6 flex flex-col justify-between shadow-2xs hover:shadow-sm hover:border-blue-300 transition-all"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <span className="font-semibold text-teal-700">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (onSelectArticle) {
                        onSelectArticle(article.id);
                      } else {
                        onNavigate('health-updates');
                      }
                    }}
                    className="text-xs font-semibold text-[#0f2d59] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read Article</span>
                  </button>
                  <span className="text-[11px] text-slate-400">Sample Health Post</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 9. LOCATION SECTION */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center mb-10 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">
              Visit Our Hospital
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0f2d59]">
              Find Us in Abakpa, Enugu
            </h2>
            <p className="text-sm text-slate-600">
              Easily accessible location in Enugu State. Reach out via telephone or use navigation directions to visit our facility.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Map / Directions Card */}
            <div className="lg:col-span-7 bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-teal-600" />
                    <span className="font-bold text-slate-900 text-base">
                      Hospital Location & Access
                    </span>
                  </div>
                  <span className="text-xs bg-white border border-slate-200 px-2.5 py-1 rounded-md text-slate-600 font-mono">
                    {HOSPITAL_INFO.addressCode}
                  </span>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {HOSPITAL_INFO.fullAddress}
                </p>

                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Located within the residential and commercial hub of Abakpa, accessible via standard transport routes, taxis, and keke tricycles across Enugu metropolis.
                </p>

                {/* Embedded Map Visual */}
                <div className="mt-5 rounded-xl overflow-hidden border border-slate-200 h-64 bg-slate-200 relative flex items-center justify-center">
                  <iframe
                    title="Goodwill Medical Centre Location Map"
                    src={HOSPITAL_INFO.googleMapsEmbedUrl}
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap gap-3">
                <a
                  href={HOSPITAL_INFO.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#0f2d59] hover:bg-[#163f7a] transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
                </a>

                <a
                  href={HOSPITAL_INFO.phoneTelLink}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors"
                >
                  <Phone className="w-4 h-4 text-teal-600" />
                  <span>Call {HOSPITAL_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Practical Arrival Guide Card */}
            <div className="lg:col-span-5 bg-[#0f2d59] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">
                    Quick Visitor Checklist
                  </span>
                  <h3 className="text-xl font-bold">Visiting Goodwill Medical Centre</h3>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm text-slate-200">
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
                    <span>Bring any existing medical cards, previous lab test reports, or ongoing medication prescriptions.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
                    <span>Check in with our reception desk on arrival for vitals check and medical file preparation.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
                    <span>For urgent emergencies or severe bleeding/fever, notify the triage desk immediately upon entry.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
                    <span>Direct WhatsApp support is available for directions or clinic schedule confirmations.</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-blue-900/80">
                <p className="text-xs text-slate-300 mb-3">
                  Have questions before arriving?
                </p>
                <a
                  href={HOSPITAL_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition-colors"
                >
                  <span>Chat with Us on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
