/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowLeft,
  CheckCircle,
  Share2,
  AlertTriangle,
  Stethoscope,
  HeartPulse
} from 'lucide-react';
import { HEALTH_ARTICLES, HealthArticle } from '../data/hospitalData.ts';
import { PageId } from '../components/Navbar.tsx';

interface HealthUpdatesViewProps {
  onNavigate: (page: PageId) => void;
  selectedArticleId?: string;
}

export const HealthUpdatesView: React.FC<HealthUpdatesViewProps> = ({
  onNavigate,
  selectedArticleId,
}) => {
  const [allArticles] = useState<HealthArticle[]>(() => {
    try {
      const stored = localStorage.getItem('gmc_custom_articles');
      if (stored) {
        const custom: HealthArticle[] = JSON.parse(stored);
        return [...custom, ...HEALTH_ARTICLES];
      }
    } catch {
      // Fallback
    }
    return HEALTH_ARTICLES;
  });

  const [activeArticleId, setActiveArticleId] = useState<string | null>(
    selectedArticleId || null
  );

  const currentArticle = allArticles.find((a) => a.id === activeArticleId);

  if (currentArticle) {
    return (
      <div className="bg-white min-h-screen py-10 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <button
            onClick={() => setActiveArticleId(null)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#0f2d59] hover:underline mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Health Updates</span>
          </button>

          <article className="space-y-6">
            <header className="space-y-3 pb-6 border-b border-slate-200">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-teal-700">{currentArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span>{currentArticle.date}</span>
                <span aria-hidden="true">·</span>
                <span>{currentArticle.readTime}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0f2d59] leading-tight">
                {currentArticle.title}
              </h1>

              <p className="text-base text-slate-600 italic">
                {currentArticle.summary}
              </p>
            </header>

            <div className="prose prose-slate max-w-none space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              {currentArticle.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Key Practical Advice Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3 mt-8">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-600" />
                <span>Key Practical Advice</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {currentArticle.keyAdvice.map((advice, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold">•</span>
                    <span>{advice}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-900">
              <p>
                <strong>Medical Notice:</strong> This article is intended for general health education and does not replace personalized medical advice, diagnosis, or treatment. Always consult a qualified medical professional for health concerns.
              </p>
            </div>

            {/* Footer action */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => onNavigate('appointment')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#0f2d59] hover:bg-[#163f7a] transition-colors"
              >
                Book a Consultation at Goodwill Medical Centre
              </button>
              <button
                onClick={() => setActiveArticleId(null)}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                Browse other topics
              </button>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-[#0f2d59] block mb-2">
              Health Education & Announcements
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0f2d59]">
              Community Health Updates
            </h1>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Practical health guidance, disease prevention tips, and maternal wellness reminders for residents of Abakpa and Enugu.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 transition-all shadow-2xs hover:shadow-xs"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  <span className="font-semibold text-teal-700">{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.date}</span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">
                  {article.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveArticleId(article.id)}
                  className="text-xs font-semibold text-[#0f2d59] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Full Article</span>
                </button>
                <span className="text-xs text-slate-400">{article.readTime}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Note on publication for hospital management */}
        <div className="mt-14 p-5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="font-semibold text-slate-900 block">
              Editorial CMS Readiness for Goodwill Medical Centre
            </span>
            <p className="text-slate-500">
              In the live deployment, hospital administrative staff can easily publish official announcements, immunization schedules, or public health advisories from a simple phone interface.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-4 py-2 text-xs font-semibold text-[#0f2d59] bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap"
          >
            Discuss Content Management →
          </button>
        </div>
      </div>
    </div>
  );
};
