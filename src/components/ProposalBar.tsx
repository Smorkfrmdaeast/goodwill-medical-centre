/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Eye, ChevronDown, ChevronUp, CheckCircle, Info } from 'lucide-react';

export const ProposalBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return (
      <button
        onClick={() => setDismissed(false)}
        aria-label="Restore website proposal details banner"
        className="fixed bottom-4 right-4 z-50 bg-[#0f2d59] text-white px-3 py-1.5 rounded-md text-xs font-medium shadow-md hover:bg-[#153e77] transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-teal-400"
        title="View Proposal Information"
      >
        <Eye className="w-3.5 h-3.5 text-teal-300" aria-hidden="true" />
        <span>Proposal Details</span>
      </button>
    );
  }

  return (
    <aside
      role="complementary"
      aria-label="Website proposal notes and administrative guidance"
      className="bg-[#0b1e38] text-slate-200 text-xs border-b border-slate-700/60 relative z-40 transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-teal-300 font-semibold tracking-wide uppercase text-[11px]">
            <Info className="w-3.5 h-3.5" aria-hidden="true" />
            Website Proposal Concept
          </span>
          <span className="text-slate-400 hidden sm:inline" aria-hidden="true">·</span>
          <span className="text-slate-300">
            Prepared for <strong className="text-white font-medium">Goodwill Medical Centre</strong>, Abakpa, Enugu
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="proposal-notes-content"
            aria-label={isOpen ? 'Hide developer proposal notes' : 'Review developer proposal notes'}
            className="text-slate-300 hover:text-white flex items-center gap-1 underline underline-offset-2 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-teal-400 focus-visible:rounded"
          >
            <span>{isOpen ? 'Hide Developer Notes' : 'Review Proposal Notes'}</span>
            {isOpen ? (
              <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
            )}
          </button>
          <span className="text-slate-600" aria-hidden="true">|</span>
          <button
            onClick={() => setDismissed(true)}
            className="text-slate-400 hover:text-slate-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-teal-400 focus-visible:rounded"
            aria-label="Minimize proposal banner"
          >
            Minimize
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          id="proposal-notes-content"
          role="region"
          aria-label="Detailed developer proposal documentation"
          className="border-t border-slate-700/60 bg-[#071527] px-4 sm:px-6 py-3"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-300">
            <div className="space-y-1">
              <p className="font-semibold text-white flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-teal-400" aria-hidden="true" />
                Verified Hospital Data
              </p>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Uses the hospital's genuine location (FGQQ+57, Abakpa, Enugu) and working phone number (0703 258 5626) with direct call, WhatsApp, and Google Maps links.
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-white flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-teal-400" aria-hidden="true" />
                No Invented Claims
              </p>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Services and staff sections are structured as draft proposals ready for official sign-off by the Medical Director, avoiding fabricated credentials or fake reviews.
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-white flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-teal-400" aria-hidden="true" />
                Live Staff Portal & Phone Uploads
              </p>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Staff can log into the Admin Portal to review live patient appointment bookings and upload health advisories with photos directly from their smartphone or computer.
              </p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
