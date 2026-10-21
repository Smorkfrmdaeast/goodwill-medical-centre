/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, Phone, Calendar, Clock, MapPin, Lock, Shield } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData.ts';

export type PageId =
  | 'home'
  | 'about'
  | 'services'
  | 'appointment'
  | 'pay-bill'
  | 'health-updates'
  | 'contact'
  | 'privacy'
  | 'admin';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  isAdminLoggedIn?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  isAdminLoggedIn = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string; ariaDesc: string }[] = [
    { id: 'home', label: 'Home', ariaDesc: 'Go to Goodwill Medical Centre home overview' },
    { id: 'about', label: 'About Us', ariaDesc: 'Learn about our hospital background in Abakpa and verified community care' },
    { id: 'services', label: 'Services', ariaDesc: 'Explore our 6 clinical care departments and laboratory services' },
    { id: 'pay-bill', label: 'Pay Hospital Bill', ariaDesc: 'Pay hospital bills, laboratory fees, and invoices online securely' },
    { id: 'health-updates', label: 'Health Updates', ariaDesc: 'Read health education articles and disease prevention tips' },
    { id: 'contact', label: 'Contact', ariaDesc: 'View hospital telephone, WhatsApp, and Google Maps directions' },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      role="banner"
      aria-label="Goodwill Medical Centre header and main navigation"
      className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs"
    >
      {/* Skip to Main Content Link for screen readers and keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#0f2d59] focus:text-white focus:rounded-md focus:shadow-md focus:font-semibold focus:outline-2 focus:outline-offset-2 focus:outline-teal-400"
      >
        Skip to main hospital content
      </a>

      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group flex items-center gap-3 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f2d59] rounded-lg p-1"
          aria-label="Goodwill Medical Centre, Abakpa, Enugu - Go to homepage"
        >
          <div
            className="w-10 h-10 rounded-lg bg-[#0f2d59] flex items-center justify-center text-white shrink-0 shadow-xs group-hover:bg-[#163f7a] transition-colors"
            aria-hidden="true"
          >
            {/* Simple medical cross motif */}
            <svg className="w-5 h-5 text-teal-300" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7V3z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-bold tracking-tight text-[#0f2d59] whitespace-nowrap shrink-0 group-hover:text-blue-900 transition-colors">
              Goodwill Medical Centre
            </span>
            <span className="text-[11px] font-medium text-slate-500 whitespace-nowrap">
              Abakpa, Enugu · Nigeria
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links with WAI-ARIA semantics */}
        <nav
          role="navigation"
          aria-label="Primary hospital navigation menu"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                aria-label={item.ariaDesc}
                className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-1 relative focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0f2d59] ${
                  isActive
                    ? 'text-[#0f2d59] font-bold border-b-2 border-[#0f2d59]'
                    : 'hover:text-[#0f2d59]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action, Staff Portal & Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Telephone */}
          <a
            href={HOSPITAL_INFO.phoneTelLink}
            aria-label="Call Goodwill Medical Centre reception desk at 0703 258 5626 (opens telephone dialer)"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f2d59]"
            title="Call Goodwill Medical Centre: 0703 258 5626"
          >
            <Phone className="w-3.5 h-3.5 text-teal-600" aria-hidden="true" />
            <span>0703 258 5626</span>
          </a>

          {/* Book Appointment CTA */}
          <button
            onClick={() => handleNavClick('appointment')}
            aria-label="Book an appointment or enquire about clinic visit"
            className="hidden sm:inline-flex px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#0f2d59] hover:bg-[#163f7a] rounded-lg shadow-xs hover:shadow transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            Book an Appointment
          </button>

          {/* Staff & Admin Portal Button */}
          <button
            onClick={() => handleNavClick('admin')}
            aria-label={isAdminLoggedIn ? "Open Hospital Administrator Dashboard" : "Hospital staff and administrator login portal"}
            title="Staff & Admin Portal"
            className={`hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f2d59] ${
              currentPage === 'admin'
                ? 'bg-blue-50 text-[#0f2d59] border-blue-300 font-bold'
                : 'text-slate-600 hover:text-[#0f2d59] border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-teal-600" aria-hidden="true" />
            <span>{isAdminLoggedIn ? 'Admin Active' : 'Staff Portal'}</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f2d59]"
            aria-label={mobileMenuOpen ? 'Close main navigation menu' : 'Open main navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            aria-haspopup="true"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          role="region"
          aria-label="Mobile navigation links and quick hospital contacts"
          className="lg:hidden border-t border-slate-200 bg-white shadow-lg animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="px-4 pt-3 pb-6 space-y-2">
            <nav role="navigation" aria-label="Mobile menu links" className="space-y-1">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    aria-label={item.ariaDesc}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-blue-50 text-[#0f2d59] font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="pt-3 mt-3 border-t border-slate-100 space-y-2">
              <a
                href={HOSPITAL_INFO.phoneTelLink}
                aria-label={`Call Goodwill Medical Centre reception desk at ${HOSPITAL_INFO.phoneDisplay}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4 text-teal-600" aria-hidden="true" />
                <span>Call {HOSPITAL_INFO.phoneDisplay}</span>
              </a>

              <a
                href={HOSPITAL_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open WhatsApp conversation with Goodwill Medical Centre reception (opens external app)"
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
              >
                <span>WhatsApp Enquiry</span>
              </a>

              <button
                onClick={() => handleNavClick('appointment')}
                aria-label="Open appointment booking form"
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-white bg-[#0f2d59] hover:bg-[#163f7a] rounded-lg transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-teal-300" aria-hidden="true" />
                <span>Book an Appointment</span>
              </button>

              <button
                onClick={() => handleNavClick('admin')}
                aria-label="Open Hospital Staff and Administrator Login"
                className="flex items-center justify-center gap-2 w-full py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-teal-600" aria-hidden="true" />
                <span>{isAdminLoggedIn ? 'Admin Dashboard (Active)' : 'Staff & Administrator Portal Login'}</span>
              </button>
            </div>

            <div
              className="pt-2 text-center text-xs text-slate-500 flex items-center justify-center gap-4"
              role="status"
              aria-label="Location and operating status"
            >
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                Abakpa, Enugu
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-teal-600" aria-hidden="true" />
                Open 24 Hours
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
