/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { ProposalBar } from './components/ProposalBar.tsx';
import { Navbar, PageId } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { HomeView } from './views/HomeView.tsx';
import { AboutView } from './views/AboutView.tsx';
import { ServicesView } from './views/ServicesView.tsx';
import { AppointmentView } from './views/AppointmentView.tsx';
import { HealthUpdatesView } from './views/HealthUpdatesView.tsx';
import { ContactView } from './views/ContactView.tsx';
import { PrivacyView } from './views/PrivacyView.tsx';
import { AdminView } from './views/AdminView.tsx';
import { PayBillView } from './views/PayBillView.tsx';
import { HOSPITAL_INFO } from './data/hospitalData.ts';
import { getAdminSession } from './utils/adminAuth.ts';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedArticleId, setSelectedArticleId] = useState<string>('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return getAdminSession() !== null;
  });

  // Sync with window.location.hash for shareable navigation and back-button support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validPages: PageId[] = [
        'home',
        'about',
        'services',
        'appointment',
        'pay-bill',
        'health-updates',
        'contact',
        'privacy',
        'admin',
      ];
      if (validPages.includes(hash as PageId)) {
        setCurrentPage(hash as PageId);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookWithDepartment = (deptName: string) => {
    setSelectedDepartment(deptName);
    navigateTo('appointment');
  };

  const handleSelectService = (serviceId: string) => {
    navigateTo('services');
    // Allow view to render then scroll to service card
    setTimeout(() => {
      const el = document.getElementById(`service-${serviceId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleSelectArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
    navigateTo('health-updates');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-100 selection:text-[#0f2d59]">
      {/* 1. Developer Proposal Bar for hospital administration review */}
      <ProposalBar />

      {/* 2. Top Navigation Bar (Adhering to Top Bar Contract & WAI-ARIA) */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* 3. Main Page Content */}
      <main className="flex-1" id="main-content" tabIndex={-1}>
        {currentPage === 'home' && (
          <HomeView
            onNavigate={navigateTo}
            onSelectService={handleSelectService}
            onSelectArticle={handleSelectArticle}
          />
        )}

        {currentPage === 'about' && <AboutView onNavigate={navigateTo} />}

        {currentPage === 'services' && (
          <ServicesView
            onNavigate={navigateTo}
            onBookWithDepartment={handleBookWithDepartment}
          />
        )}

        {currentPage === 'appointment' && (
          <AppointmentView
            onNavigate={navigateTo}
            selectedDepartment={selectedDepartment}
          />
        )}

        {currentPage === 'pay-bill' && (
          <PayBillView onNavigate={navigateTo} />
        )}

        {currentPage === 'health-updates' && (
          <HealthUpdatesView
            onNavigate={navigateTo}
            selectedArticleId={selectedArticleId}
          />
        )}

        {currentPage === 'contact' && <ContactView onNavigate={navigateTo} />}

        {currentPage === 'privacy' && <PrivacyView onNavigate={navigateTo} />}

        {currentPage === 'admin' && (
          <AdminView
            onNavigate={navigateTo}
            onAuthChange={(loggedIn) => setIsAdminLoggedIn(loggedIn)}
          />
        )}
      </main>

      {/* 4. Global Footer */}
      <Footer onNavigate={navigateTo} />

      {/* 5. Mobile Quick Action Bar (Discreet, accessible emergency float for Android phone screen) */}
      <aside
        role="toolbar"
        aria-label="Quick mobile hospital emergency and contact actions"
        className="sm:hidden fixed bottom-3 left-3 right-3 z-30 flex items-center gap-2 p-1.5 bg-[#0f2d59]/95 backdrop-blur-md rounded-xl shadow-lg border border-white/20"
      >
        <a
          href={HOSPITAL_INFO.phoneTelLink}
          aria-label={`Call hospital directly at ${HOSPITAL_INFO.phoneDisplay}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-white bg-blue-700/80 hover:bg-blue-600 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-white"
          title="Direct call to Goodwill Medical Centre"
        >
          <Phone className="w-3.5 h-3.5 text-teal-300" aria-hidden="true" />
          <span>Call Hospital</span>
        </a>

        <a
          href={HOSPITAL_INFO.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open WhatsApp chat with Goodwill Medical Centre reception desk"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-white"
          title="WhatsApp chat"
        >
          <MessageCircle className="w-3.5 h-3.5 text-white" aria-hidden="true" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={() => navigateTo('appointment')}
          aria-label="Open appointment booking form"
          className="flex-1 inline-flex items-center justify-center py-2 px-3 text-xs font-bold text-[#0f2d59] bg-white hover:bg-slate-100 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0f2d59]"
        >
          <span>Book Visit</span>
        </button>
      </aside>
    </div>
  );
}
