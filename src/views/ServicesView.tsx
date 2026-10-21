/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Check,
  Calendar,
  Clock,
  ArrowRight,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  HeartPulse,
  Baby,
  Activity,
  FlaskConical,
  Pill,
  Bed
} from 'lucide-react';
import { HOSPITAL_SERVICES, HospitalService } from '../data/hospitalData.ts';
import { PageId } from '../components/Navbar.tsx';

interface ServicesViewProps {
  onNavigate: (page: PageId) => void;
  onBookWithDepartment: (deptName: string) => void;
  selectedServiceId?: string;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  onNavigate,
  onBookWithDepartment,
  selectedServiceId,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(
    selectedServiceId || null
  );

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'General Care', label: 'General Outpatient' },
    { id: 'Maternal & Child', label: 'Maternal & Child' },
    { id: 'Emergency', label: 'Emergency & Triage' },
    { id: 'Diagnostics', label: 'Laboratory' },
    { id: 'Pharmacy', label: 'Pharmacy' },
    { id: 'Inpatient', label: 'Inpatient Care' },
  ];

  const filteredServices =
    activeCategory === 'all'
      ? HOSPITAL_SERVICES
      : HOSPITAL_SERVICES.filter((s) => s.category === activeCategory);

  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'General Care':
        return <Stethoscope className="w-5 h-5 text-blue-700" />;
      case 'Maternal & Child':
        return <Baby className="w-5 h-5 text-teal-700" />;
      case 'Emergency':
        return <HeartPulse className="w-5 h-5 text-rose-700" />;
      case 'Diagnostics':
        return <FlaskConical className="w-5 h-5 text-purple-700" />;
      case 'Pharmacy':
        return <Pill className="w-5 h-5 text-emerald-700" />;
      case 'Inpatient':
        return <Bed className="w-5 h-5 text-indigo-700" />;
      default:
        return <Activity className="w-5 h-5 text-blue-700" />;
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-[#0f2d59] block mb-2">
              Clinical Departments & Healthcare
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0f2d59]">
              Hospital Services & Clinical Care
            </h1>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Explore our core clinical offerings. This structure demonstrates how Goodwill Medical Centre can organize outpatient consultations, antenatal care, laboratory diagnostics, and urgent triage for patients in Abakpa.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
        {/* Category Tabs (Functional filter controls conforming to frontend-design skill) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#0f2d59] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.map((service) => {
            const isExpanded = expandedServiceId === service.id;
            return (
              <div
                key={service.id}
                id={`service-${service.id}`}
                className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 transition-all shadow-2xs"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                        {getServiceIcon(service.category)}
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-teal-700 block">
                          {service.category}
                        </span>
                        <h2 className="text-lg font-bold text-slate-900 leading-snug">
                          {service.title}
                        </h2>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {service.summary}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    <span>Clinic Timing: {service.availability}</span>
                  </div>

                  {/* Expanded details */}
                  {isExpanded ? (
                    <div className="space-y-4 pt-1 animate-in fade-in duration-150">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                          Clinical Scope & Inclusions
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {service.fullDescription}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                          Key Clinical Activities
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                          {service.keyFeatures.map((feat, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {service.isDraftNotice && (
                        <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-lg text-xs text-blue-900">
                          {service.isDraftNotice}
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>

                {/* Card footer actions */}
                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() =>
                      setExpandedServiceId(isExpanded ? null : service.id)
                    }
                    className="text-xs font-semibold text-[#0f2d59] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isExpanded ? 'Show Less' : 'Learn More'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    onClick={() => onBookWithDepartment(service.title)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0f2d59] hover:bg-[#163f7a] rounded-lg transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-teal-300" />
                    <span>Book for this Clinic</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Administrative sign-off reminder */}
        <div className="mt-14 p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-teal-600" />
              <span>Tailoring Services to Goodwill Medical Centre</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
              Do you offer specialized ultrasound scanning, specific surgical procedures, or child wellness clinics on set days? The website content structure is fully modular and ready to reflect your exact clinical portfolio.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-4 py-2.5 rounded-lg text-xs font-semibold text-[#0f2d59] bg-white border border-slate-300 hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            Contact to Confirm Service Details →
          </button>
        </div>
      </div>
    </div>
  );
};
