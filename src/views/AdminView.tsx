/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Lock,
  LogOut,
  Upload,
  Camera,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Clock,
  Phone,
  MessageCircle,
  FileText,
  User,
  Shield,
  Trash2,
  Eye,
  RefreshCw,
  Plus,
  CreditCard,
  Receipt,
  Search,
  Check,
  Download,
  Filter
} from 'lucide-react';
import {
  AdminUser,
  AdminPublishPayload,
  StoredAppointment,
  authenticateAdmin,
  saveAdminSession,
  getAdminSession,
  clearAdminSession,
  validatePublishPayload,
  getInitialAppointments,
} from '../utils/adminAuth.ts';
import {
  PaymentTransaction,
  getInitialTransactions,
  formatNaira,
} from '../utils/payment.ts';
import { HEALTH_ARTICLES, HealthArticle, HOSPITAL_INFO } from '../data/hospitalData.ts';
import { PageId } from '../components/Navbar.tsx';

interface AdminViewProps {
  onNavigate: (page: PageId) => void;
  onPostPublished?: (article: HealthArticle) => void;
  onAuthChange?: (isLoggedIn: boolean) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  onNavigate,
  onPostPublished,
  onAuthChange,
}) => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState<'publish' | 'appointments' | 'payments' | 'profile'>('publish');

  // Login form states
  const [loginInput, setLoginInput] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Appointments state
  const [appointments, setAppointments] = useState<StoredAppointment[]>([]);

  // Payments & Accounts state
  const [payments, setPayments] = useState<PaymentTransaction[]>([]);
  const [paymentSearch, setPaymentSearch] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<'all' | 'Verified' | 'Pending Verification'>('all');
  const [selectedReceiptPayment, setSelectedReceiptPayment] = useState<PaymentTransaction | null>(null);

  // Publishing form states
  const [publishForm, setPublishForm] = useState<AdminPublishPayload>({
    title: '',
    category: 'Community Health',
    readTime: '3 min read',
    summary: '',
    content: '',
    keyAdvice: '',
    imageBase64: '',
    imageFileName: '',
  });
  const [publishErrors, setPublishErrors] = useState<Record<string, string>>({});
  const [publishSuccess, setPublishSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load session and stored data on mount
  useEffect(() => {
    const session = getAdminSession();
    if (session) {
      setCurrentUser(session);
      if (onAuthChange) onAuthChange(true);
    }

    // Load appointments from localStorage or seed
    try {
      const stored = localStorage.getItem('gmc_appointments_list');
      if (stored) {
        setAppointments(JSON.parse(stored));
      } else {
        const initial = getInitialAppointments();
        setAppointments(initial);
        localStorage.setItem('gmc_appointments_list', JSON.stringify(initial));
      }
    } catch {
      setAppointments(getInitialAppointments());
    }

    // Load payments from localStorage or seed
    try {
      const storedPayments = localStorage.getItem('gmc_payments_list');
      if (storedPayments) {
        setPayments(JSON.parse(storedPayments));
      } else {
        const initialPay = getInitialTransactions();
        setPayments(initialPay);
        localStorage.setItem('gmc_payments_list', JSON.stringify(initialPay));
      }
    } catch {
      setPayments(getInitialTransactions());
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const user = authenticateAdmin(loginInput, loginPassword);
    if (user) {
      setCurrentUser(user);
      saveAdminSession(user);
      if (onAuthChange) onAuthChange(true);
    } else {
      setLoginError('Invalid credentials. Please check the access code or email.');
    }
  };

  const handleQuickDemoFill = () => {
    setLoginInput('admin@goodwillmedical.ng');
    setLoginPassword('goodwill2026');
    setLoginError('');
  };

  const handleLogout = () => {
    clearAdminSession();
    setCurrentUser(null);
    if (onAuthChange) onAuthChange(false);
  };

  // Image Upload handler (works from computer files or phone camera/gallery)
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPEG, PNG, or WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPublishForm((prev) => ({
        ...prev,
        imageBase64: result,
        imageFileName: file.name,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPublishForm((prev) => ({
      ...prev,
      imageBase64: '',
      imageFileName: '',
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePublishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validatePublishPayload(publishForm);
    if (!result.isValid) {
      setPublishErrors(result.errors);
      return;
    }

    const newArticle: HealthArticle = {
      id: `custom-${Date.now()}`,
      title: publishForm.title.trim(),
      category: publishForm.category.trim(),
      date: 'October 2026',
      readTime: publishForm.readTime || '3 min read',
      summary: publishForm.summary.trim(),
      content: publishForm.content
        .split('\n')
        .map((p) => p.trim())
        .filter((p) => p.length > 0),
      keyAdvice: publishForm.keyAdvice
        ? publishForm.keyAdvice
            .split('\n')
            .map((a) => a.trim())
            .filter((a) => a.length > 0)
        : ['Consult Goodwill Medical Centre clinical staff for questions.'],
    };

    // Save to localStorage
    try {
      const existing = localStorage.getItem('gmc_custom_articles');
      const list: HealthArticle[] = existing ? JSON.parse(existing) : [];
      list.unshift(newArticle);
      localStorage.setItem('gmc_custom_articles', JSON.stringify(list));
    } catch {
      // Ignore
    }

    if (onPostPublished) {
      onPostPublished(newArticle);
    }

    setPublishSuccess(true);
    setPublishErrors({});
    setPublishForm({
      title: '',
      category: 'Community Health',
      readTime: '3 min read',
      summary: '',
      content: '',
      keyAdvice: '',
      imageBase64: '',
      imageFileName: '',
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    setTimeout(() => {
      setPublishSuccess(false);
    }, 4000);
  };

  const handleUpdateStatus = (id: string, status: StoredAppointment['status']) => {
    const updated = appointments.map((apt) =>
      apt.id === id ? { ...apt, status } : apt
    );
    setAppointments(updated);
    try {
      localStorage.setItem('gmc_appointments_list', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const handleTogglePaymentStatus = (id: string, newStatus: PaymentTransaction['status']) => {
    const updated = payments.map((p) => (p.id === id ? { ...p, status: newStatus } : p));
    setPayments(updated);
    try {
      localStorage.setItem('gmc_payments_list', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  // If NOT logged in, show Login Form
  if (!currentUser) {
    return (
      <div className="bg-slate-50 min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="bg-white max-w-md w-full rounded-2xl border border-slate-200 p-8 shadow-xs">
          <div className="text-center space-y-2 mb-6">
            <div
              className="w-12 h-12 rounded-xl bg-blue-50 text-[#0f2d59] flex items-center justify-center mx-auto"
              aria-hidden="true"
            >
              <Lock className="w-6 h-6 text-teal-600" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Staff & Administrator Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Goodwill Medical Centre, Abakpa, Enugu
            </p>
          </div>

          {/* Quick Demo Helper for the hospital owner */}
          <div
            className="mb-6 p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-xl text-xs space-y-1.5"
            role="note"
            aria-label="Demo login credentials"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#0f2d59] flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-teal-600" aria-hidden="true" />
                Hospital Management Review Access
              </span>
              <button
                type="button"
                onClick={handleQuickDemoFill}
                className="text-[11px] font-semibold text-teal-700 hover:text-teal-900 underline cursor-pointer"
                aria-label="Automatically fill demo administrator credentials"
              >
                Auto-Fill
              </button>
            </div>
            <p className="text-slate-600">
              Email: <code className="bg-white px-1 py-0.5 rounded text-slate-800">admin@goodwillmedical.ng</code>
            </p>
            <p className="text-slate-600">
              Password: <code className="bg-white px-1 py-0.5 rounded text-slate-800">goodwill2026</code> (or code: <code className="bg-white px-1 py-0.5 rounded">goodwill</code>)
            </p>
          </div>

          {loginError && (
            <div
              role="alert"
              className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} noValidate className="space-y-4">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
              >
                Staff Email or Access Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  id="admin-email"
                  value={loginInput}
                  onChange={(e) => setLoginInput(e.target.value)}
                  placeholder="admin@goodwillmedical.ng"
                  aria-required="true"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0f2d59]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" aria-hidden="true" />
                </div>
                <input
                  type="password"
                  id="admin-password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  aria-required="true"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0f2d59]"
                />
              </div>
            </div>

            <button
              type="submit"
              aria-label="Sign in to hospital administration dashboard"
              className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-[#0f2d59] hover:bg-[#163f7a] transition-colors cursor-pointer shadow-xs"
            >
              Sign In to Admin Portal
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <button
              onClick={() => onNavigate('home')}
              aria-label="Return to public hospital website"
              className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
            >
              ← Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If LOGGED IN, show Admin Portal Dashboard
  return (
    <div className="bg-slate-50 min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Admin Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div
              className="w-12 h-12 rounded-xl bg-[#0f2d59] text-white flex items-center justify-center font-bold text-lg"
              aria-hidden="true"
            >
              GMC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900">
                  Hospital Management Portal
                </h1>
                <span className="bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2 py-0.5 rounded-md border border-emerald-200">
                  Active Session
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Logged in as <strong>{currentUser.name}</strong> ({currentUser.email}) · Goodwill Medical Centre
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              aria-label="View live public hospital website"
              className="px-3.5 py-2 text-xs font-semibold text-[#0f2d59] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
              <span>View Live Website</span>
            </button>

            <button
              onClick={handleLogout}
              aria-label="Log out of hospital administrator portal"
              className="px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div
          role="tablist"
          aria-label="Hospital administrative portal sections"
          className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar"
        >
          <button
            role="tab"
            aria-selected={activeTab === 'publish'}
            aria-controls="panel-publish"
            id="tab-publish"
            onClick={() => setActiveTab('publish')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer inline-flex items-center gap-2 ${
              activeTab === 'publish'
                ? 'bg-[#0f2d59] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Upload className="w-4 h-4" aria-hidden="true" />
            <span>Upload & Publish Health Updates</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'appointments'}
            aria-controls="panel-appointments"
            id="tab-appointments"
            onClick={() => setActiveTab('appointments')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer inline-flex items-center gap-2 ${
              activeTab === 'appointments'
                ? 'bg-[#0f2d59] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" aria-hidden="true" />
            <span>Patient Appointments ({appointments.length})</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'payments'}
            aria-controls="panel-payments"
            id="tab-payments"
            onClick={() => setActiveTab('payments')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer inline-flex items-center gap-2 ${
              activeTab === 'payments'
                ? 'bg-[#0f2d59] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <CreditCard className="w-4 h-4" aria-hidden="true" />
            <span>Hospital Payments & Accounts ({payments.length})</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'profile'}
            aria-controls="panel-profile"
            id="tab-profile"
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer inline-flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-[#0f2d59] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Shield className="w-4 h-4" aria-hidden="true" />
            <span>Hospital Verification Settings</span>
          </button>
        </div>

        {/* TAB 1: UPLOAD & PUBLISH (From Phone Camera or Computer) */}
        {activeTab === 'publish' && (
          <div
            id="panel-publish"
            role="tabpanel"
            aria-labelledby="tab-publish"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left: Publishing Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="mb-6 space-y-1 border-b border-slate-100 pb-4">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-teal-600" aria-hidden="true" />
                  <span>Publish New Update or Health Advisory</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Hospital staff can write announcements and attach clinical photos directly from a smartphone or computer.
                </p>
              </div>

              {publishSuccess && (
                <div
                  role="status"
                  className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs sm:text-sm text-emerald-800 flex items-center gap-3 animate-in fade-in"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-bold">Published successfully!</p>
                    <p className="text-emerald-700 text-xs">
                      The update is now live in the Community Health Updates section for patients to read.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handlePublishSubmit} noValidate className="space-y-4">
                {/* Title */}
                <div>
                  <label
                    htmlFor="pub-title"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
                  >
                    Article or Announcement Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="pub-title"
                    value={publishForm.title}
                    onChange={(e) =>
                      setPublishForm({ ...publishForm, title: e.target.value })
                    }
                    placeholder="e.g. Newborn Immunization Days for Abakpa Residents"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0f2d59]"
                  />
                  {publishErrors.title && (
                    <p className="mt-1 text-xs text-rose-600">{publishErrors.title}</p>
                  )}
                </div>

                {/* Category & Read Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="pub-category"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
                    >
                      Health Category <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="pub-category"
                      value={publishForm.category}
                      onChange={(e) =>
                        setPublishForm({ ...publishForm, category: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0f2d59]"
                    >
                      <option value="Community Health">Community Health</option>
                      <option value="Maternal & Child">Maternal & Child</option>
                      <option value="Preventive Care">Preventive Care</option>
                      <option value="Hospital Announcement">Hospital Announcement</option>
                      <option value="Urgent Advisory">Urgent Advisory</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="pub-readtime"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
                    >
                      Estimated Read Time
                    </label>
                    <input
                      type="text"
                      id="pub-readtime"
                      value={publishForm.readTime}
                      onChange={(e) =>
                        setPublishForm({ ...publishForm, readTime: e.target.value })
                      }
                      placeholder="e.g. 3 min read"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0f2d59]"
                    />
                  </div>
                </div>

                {/* Direct Upload from Phone or Computer */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Upload Photo Direct from Phone or Computer
                  </span>

                  <input
                    type="file"
                    ref={fileInputRef}
                    id="phone-image-upload"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageFileChange}
                    className="hidden"
                    aria-label="Upload photo from phone camera or device gallery"
                  />

                  {publishForm.imageBase64 ? (
                    <div className="space-y-2">
                      <div className="relative rounded-lg overflow-hidden border border-slate-200 max-h-48 bg-slate-100 flex items-center justify-center">
                        <img
                          src={publishForm.imageBase64}
                          alt="Uploaded announcement preview"
                          className="w-full h-44 object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600 font-medium truncate max-w-[200px]">
                          {publishForm.imageFileName || 'Uploaded Photo'}
                        </span>
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="text-rose-600 hover:text-rose-800 font-semibold cursor-pointer inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Remove Photo</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 py-3 px-4 border border-dashed border-slate-300 hover:border-[#0f2d59] rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Camera className="w-4 h-4 text-teal-600" aria-hidden="true" />
                        <span>Take Photo with Camera / Phone</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 py-3 px-4 border border-dashed border-slate-300 hover:border-[#0f2d59] rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <ImageIcon className="w-4 h-4 text-blue-600" aria-hidden="true" />
                        <span>Choose from Computer / Gallery</span>
                      </button>
                    </div>
                  )}
                  <p className="text-[11px] text-slate-500">
                    Supports JPG, PNG, and WebP photos directly from your mobile camera or desktop folders.
                  </p>
                </div>

                {/* Summary */}
                <div>
                  <label
                    htmlFor="pub-summary"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
                  >
                    Short Summary (1-2 sentences) <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="pub-summary"
                    rows={2}
                    value={publishForm.summary}
                    onChange={(e) =>
                      setPublishForm({ ...publishForm, summary: e.target.value })
                    }
                    placeholder="Brief highlight that appears on the card..."
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0f2d59]"
                  />
                  {publishErrors.summary && (
                    <p className="mt-1 text-xs text-rose-600">{publishErrors.summary}</p>
                  )}
                </div>

                {/* Full Article Content */}
                <div>
                  <label
                    htmlFor="pub-content"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
                  >
                    Full Article Content <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="pub-content"
                    rows={5}
                    value={publishForm.content}
                    onChange={(e) =>
                      setPublishForm({ ...publishForm, content: e.target.value })
                    }
                    placeholder="Detailed guidance, advice, or announcement paragraphs..."
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0f2d59]"
                  />
                  {publishErrors.content && (
                    <p className="mt-1 text-xs text-rose-600">{publishErrors.content}</p>
                  )}
                </div>

                {/* Key Takeaways */}
                <div>
                  <label
                    htmlFor="pub-advice"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
                  >
                    Key Practical Advice (One bullet per line)
                  </label>
                  <textarea
                    id="pub-advice"
                    rows={3}
                    value={publishForm.keyAdvice}
                    onChange={(e) =>
                      setPublishForm({ ...publishForm, keyAdvice: e.target.value })
                    }
                    placeholder="• Bring child immunization card&#10;• Arrive between 8 AM and 12 PM&#10;• Wear comfortable clothing"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0f2d59]"
                  />
                </div>

                <button
                  type="submit"
                  aria-label="Publish this update to Goodwill Medical Centre website"
                  className="w-full py-3 px-6 rounded-lg text-sm font-semibold text-white bg-[#0f2d59] hover:bg-[#163f7a] transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-teal-300" aria-hidden="true" />
                  <span>Publish Update to Website</span>
                </button>
              </form>
            </div>

            {/* Right: Existing Articles Preview */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
                  <span>Published Updates</span>
                  <span className="text-xs text-slate-500 font-normal">
                    {HEALTH_ARTICLES.length} default + custom
                  </span>
                </h3>

                <div className="space-y-3">
                  {HEALTH_ARTICLES.map((art) => (
                    <div
                      key={art.id}
                      className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-semibold text-teal-700">{art.category}</span>
                        <span>{art.date}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">
                        {art.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 line-clamp-2">
                        {art.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: APPOINTMENT INQUIRIES */}
        {activeTab === 'appointments' && (
          <div
            id="panel-appointments"
            role="tabpanel"
            aria-labelledby="tab-appointments"
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Patient Visit Enquiries & Bookings
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Real-time list of enquiries submitted by patients on the website or booked by reception.
                </p>
              </div>

              <div className="text-xs text-slate-500 flex items-center gap-2">
                <span>Total Enquiries: <strong className="text-slate-800">{appointments.length}</strong></span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#0f2d59] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                      {apt.referenceCode}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        apt.status === 'Confirmed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : apt.status === 'Pending Review'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">{apt.fullName}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-600 mt-0.5">
                      <Phone className="w-3.5 h-3.5 text-teal-600" aria-hidden="true" />
                      <a href={`tel:${apt.phoneNumber}`} className="hover:underline font-medium">
                        {apt.phoneNumber}
                      </a>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg text-xs space-y-1">
                    <p className="text-slate-700">
                      <strong>Service:</strong> {apt.department}
                    </p>
                    <p className="text-slate-700">
                      <strong>Requested Date & Time:</strong> {apt.preferredDate} · {apt.preferredTime}
                    </p>
                    {apt.notes && (
                      <p className="text-slate-600 italic">
                        <strong>Notes:</strong> {apt.notes}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${apt.phoneNumber}`}
                        aria-label={`Call patient ${apt.fullName}`}
                        className="px-2.5 py-1.5 rounded-md text-xs font-semibold bg-blue-50 text-[#0f2d59] hover:bg-blue-100"
                      >
                        Call Patient
                      </a>
                      <a
                        href={`https://wa.me/234${apt.phoneNumber.replace(/\D/g, '').slice(-10)}?text=Hello%20${encodeURIComponent(apt.fullName)}%2C%20this%20is%20Goodwill%20Medical%20Centre%20regarding%20your%20appointment%20enquiry%20${apt.referenceCode}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`WhatsApp patient ${apt.fullName}`}
                        className="px-2.5 py-1.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                      >
                        WhatsApp
                      </a>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {apt.status !== 'Confirmed' && (
                        <button
                          onClick={() => handleUpdateStatus(apt.id, 'Confirmed')}
                          className="px-2.5 py-1 rounded text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
                        >
                          Confirm
                        </button>
                      )}
                      {apt.status !== 'Completed' && (
                        <button
                          onClick={() => handleUpdateStatus(apt.id, 'Completed')}
                          className="px-2.5 py-1 rounded text-xs font-semibold bg-slate-200 text-slate-800 hover:bg-slate-300 cursor-pointer"
                        >
                          Completed
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: HOSPITAL PAYMENTS & ACCOUNTS */}
        {activeTab === 'payments' && (
          <div
            id="panel-payments"
            role="tabpanel"
            aria-labelledby="tab-payments"
            className="space-y-6"
          >
            {/* Payment Summary Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  Total Hospital Collections
                </span>
                <p className="text-2xl font-bold text-[#0f2d59] mt-2 font-mono">
                  {formatNaira(payments.reduce((acc, p) => acc + p.amount, 0))}
                </p>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  {payments.length} total recorded transactions
                </span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block">
                  Verified In Bank / POS
                </span>
                <p className="text-2xl font-bold text-emerald-700 mt-2 font-mono">
                  {formatNaira(
                    payments
                      .filter((p) => p.status === 'Verified')
                      .reduce((acc, p) => acc + p.amount, 0)
                  )}
                </p>
                <span className="text-[11px] text-emerald-600 mt-1 block">
                  {payments.filter((p) => p.status === 'Verified').length} confirmed receipts
                </span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider block">
                  Pending Verification
                </span>
                <p className="text-2xl font-bold text-amber-700 mt-2 font-mono">
                  {formatNaira(
                    payments
                      .filter((p) => p.status === 'Pending Verification')
                      .reduce((acc, p) => acc + p.amount, 0)
                  )}
                </p>
                <span className="text-[11px] text-amber-600 mt-1 block">
                  {payments.filter((p) => p.status === 'Pending Verification').length} direct bank transfers awaiting teller sign-off
                </span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider block">
                  Designated Account
                </span>
                <p className="text-sm font-bold text-slate-900 mt-2 font-mono">
                  0703 258 5626
                </p>
                <span className="text-[11px] text-slate-500 block">
                  Goodwill Medical Centre · Moniepoint MFB / Wema
                </span>
              </div>
            </div>

            {/* Controls: Search & Status Filter */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" aria-hidden="true" />
                <input
                  type="text"
                  value={paymentSearch}
                  onChange={(e) => setPaymentSearch(e.target.value)}
                  placeholder="Search by patient name, phone, or receipt code..."
                  aria-label="Search payment records"
                  className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0f2d59]"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-500" aria-hidden="true" />
                <span className="text-xs text-slate-600 font-semibold">Filter:</span>
                <div className="flex items-center gap-1.5" role="group" aria-label="Filter transactions by verification status">
                  {(['all', 'Verified', 'Pending Verification'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setPaymentStatusFilter(filter)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        paymentStatusFilter === filter
                          ? 'bg-[#0f2d59] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {filter === 'all' ? 'All Transactions' : filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Transactions List / Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Patient Bill & Appointment Payments
                  </h2>
                  <p className="text-xs text-slate-500">
                    Showing official transaction logs with receipt verification for reception and account desk
                  </p>
                </div>
                <button
                  onClick={() => {
                    const fresh = getInitialTransactions();
                    setPayments(fresh);
                    localStorage.setItem('gmc_payments_list', JSON.stringify(fresh));
                  }}
                  className="text-xs font-semibold text-[#0f2d59] hover:text-blue-800 underline cursor-pointer"
                  title="Reset demo transactions"
                >
                  Reset Demo Logs
                </button>
              </div>

              {/* Transactions filtered */}
              {(() => {
                const filtered = payments.filter((p) => {
                  const matchStatus =
                    paymentStatusFilter === 'all' || p.status === paymentStatusFilter;
                  const matchQuery =
                    !paymentSearch.trim() ||
                    p.patientName.toLowerCase().includes(paymentSearch.toLowerCase()) ||
                    p.referenceNumber.toLowerCase().includes(paymentSearch.toLowerCase()) ||
                    p.phoneNumber.includes(paymentSearch) ||
                    p.category.toLowerCase().includes(paymentSearch.toLowerCase());
                  return matchStatus && matchQuery;
                });

                if (filtered.length === 0) {
                  return (
                    <div className="p-8 text-center text-slate-500 text-sm">
                      No payment records match the current filter or search criteria.
                    </div>
                  );
                }

                return (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-wider">
                        <tr>
                          <th className="py-3 px-4">Receipt Ref</th>
                          <th className="py-3 px-4">Patient / Contact</th>
                          <th className="py-3 px-4">Service Category</th>
                          <th className="py-3 px-4">Method</th>
                          <th className="py-3 px-4 text-right">Amount</th>
                          <th className="py-3 px-4 text-center">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filtered.map((trx) => (
                          <tr key={trx.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3.5 px-4 font-mono font-semibold text-[#0f2d59]">
                              <div>{trx.referenceNumber}</div>
                              <span className="text-[11px] font-normal text-slate-500 font-sans block">
                                {new Date(trx.createdAt).toLocaleDateString('en-GB', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-slate-900">{trx.patientName}</div>
                              <div className="text-xs text-slate-500">{trx.phoneNumber}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-[#0f2d59] border border-blue-200">
                                {trx.category}
                              </span>
                              {trx.notes && (
                                <p className="text-[11px] text-slate-500 mt-0.5 italic truncate max-w-xs">
                                  {trx.notes}
                                </p>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-slate-700">
                              <span className="text-xs font-medium">
                                {trx.paymentMethod === 'Card'
                                  ? 'Debit Card (Online)'
                                  : trx.paymentMethod === 'Bank Transfer'
                                  ? 'Direct Bank Transfer'
                                  : trx.paymentMethod === 'USSD'
                                  ? 'USSD Code'
                                  : 'Pay on Arrival'}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                              {formatNaira(trx.amount)}
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                                  trx.status === 'Verified'
                                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                                }`}
                              >
                                {trx.status === 'Verified' ? (
                                  <>
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                                    <span>Verified</span>
                                  </>
                                ) : (
                                  <>
                                    <Clock className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
                                    <span>Pending Teller</span>
                                  </>
                                )}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setSelectedReceiptPayment(trx)}
                                  aria-label={`View official receipt slip for ${trx.referenceNumber}`}
                                  className="px-2.5 py-1.5 text-xs font-semibold text-[#0f2d59] bg-blue-50 hover:bg-blue-100 rounded-md transition-colors cursor-pointer"
                                  title="View official receipt slip"
                                >
                                  Receipt
                                </button>
                                <button
                                  onClick={() =>
                                    handleTogglePaymentStatus(
                                      trx.id,
                                      trx.status === 'Verified' ? 'Pending Verification' : 'Verified'
                                    )
                                  }
                                  aria-label={`Toggle verification status for receipt ${trx.referenceNumber}`}
                                  className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                                    trx.status === 'Verified'
                                      ? 'text-amber-800 bg-amber-50 hover:bg-amber-100'
                                      : 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100'
                                  }`}
                                >
                                  {trx.status === 'Verified' ? 'Mark Pending' : 'Verify'}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              })()}
            </div>

            {/* Official Printable Receipt Modal */}
            {selectedReceiptPayment && (
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="receipt-dialog-title"
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
              >
                <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
                  <div className="border-b border-slate-200 pb-4 text-center">
                    <span className="text-[10px] font-bold text-teal-700 tracking-wider uppercase block">
                      Official Payment Receipt
                    </span>
                    <h3 id="receipt-dialog-title" className="text-lg font-bold text-[#0f2d59]">
                      Goodwill Medical Centre
                    </h3>
                    <p className="text-xs text-slate-500">
                      {HOSPITAL_INFO.fullAddress}
                    </p>
                    <p className="text-xs font-mono text-slate-500">
                      Tel: {HOSPITAL_INFO.phoneDisplay}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Receipt Ref:</span>
                      <span className="font-mono font-bold text-slate-900">{selectedReceiptPayment.referenceNumber}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Date & Time:</span>
                      <span className="text-slate-800">
                        {new Date(selectedReceiptPayment.createdAt).toLocaleString('en-GB')}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Patient Name:</span>
                      <span className="font-semibold text-slate-900">{selectedReceiptPayment.patientName}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Telephone:</span>
                      <span className="font-mono text-slate-800">{selectedReceiptPayment.phoneNumber}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Payment Category:</span>
                      <span className="font-medium text-slate-800">{selectedReceiptPayment.category}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Channel / Method:</span>
                      <span className="text-slate-800">{selectedReceiptPayment.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between py-2 border-t-2 border-slate-200 text-sm">
                      <span className="font-bold text-slate-900">Total Paid:</span>
                      <span className="font-mono font-bold text-[#0f2d59] text-base">
                        {formatNaira(selectedReceiptPayment.amount)}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Hospital Status:</span>
                      <span
                        className={`font-semibold ${
                          selectedReceiptPayment.status === 'Verified'
                            ? 'text-emerald-700'
                            : 'text-amber-700'
                        }`}
                      >
                        {selectedReceiptPayment.status}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
                    <button
                      onClick={() => window.print()}
                      className="flex-1 py-2 px-3 text-xs font-semibold text-[#0f2d59] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Print / Save Slip</span>
                    </button>
                    <button
                      onClick={() => setSelectedReceiptPayment(null)}
                      className="flex-1 py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: HOSPITAL PROFILE VERIFICATION */}
        {activeTab === 'profile' && (
          <div
            id="panel-profile"
            role="tabpanel"
            aria-labelledby="tab-profile"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs max-w-3xl space-y-6"
          >
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Hospital Profile & Public Verification
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Manage how Goodwill Medical Centre appears to the public and patients in Enugu.
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block">Verified Physical Address:</span>
                <p className="text-slate-700">{HOSPITAL_INFO.fullAddress}</p>
                <span className="text-[11px] text-teal-700 font-semibold">
                  Google Maps Coordinates: FGQQ+57, Abakpa
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block">Public Emergency Telephone:</span>
                <p className="text-slate-700 font-mono font-semibold">{HOSPITAL_INFO.phoneDisplay}</p>
                <span className="text-[11px] text-slate-500">
                  Routes directly to the hospital triage desk.
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block">Opening Hours Confirmation Status:</span>
                <p className="text-slate-700">Currently displayed as: <strong>{HOSPITAL_INFO.openingHoursDisplay}</strong></p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xs text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                    Confirmed by Hospital Administrator
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Hospital record configuration is backed up and saved.
              </span>
              <button
                onClick={() => onNavigate('home')}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0f2d59] rounded-lg hover:bg-[#163f7a]"
              >
                Return to Website
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
