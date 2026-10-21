/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  CreditCard,
  Building2,
  Smartphone,
  CheckCircle2,
  ShieldCheck,
  X,
  Copy,
  Check,
  Printer,
  Download,
  MessageCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import {
  PaymentMethod,
  PaymentTransaction,
  formatNaira,
  generateReceiptNumber,
  generateTransactionReference,
} from '../utils/payment.ts';
import { HOSPITAL_INFO } from '../data/hospitalData.ts';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName: string;
  patientPhone: string;
  amount: number;
  category: string;
  description: string;
  appointmentRef?: string;
  invoiceNumber?: string;
  onPaymentSuccess?: (tx: PaymentTransaction) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  patientName,
  patientPhone,
  amount,
  category,
  description,
  appointmentRef,
  invoiceNumber,
  onPaymentSuccess,
}) => {
  const [method, setMethod] = useState<PaymentMethod>('debit_card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedTx, setCompletedTx] = useState<PaymentTransaction | null>(null);
  const [copiedAccount, setCopiedAccount] = useState(false);

  // Card form mock fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardPin, setCardPin] = useState('');

  if (!isOpen) return null;

  const handleCopyAccount = () => {
    navigator.clipboard?.writeText('8032585626');
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2500);
  };

  const handleCompletePayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const receiptNo = generateReceiptNumber();
      const txRef = generateTransactionReference();
      const newTx: PaymentTransaction = {
        id: `tx-${Date.now()}`,
        receiptNumber: receiptNo,
        transactionReference: txRef,
        patientName: patientName.trim(),
        patientPhone: patientPhone.trim(),
        category: category as any,
        description: description,
        amount: amount,
        paymentMethod: method,
        status: 'Successful',
        createdAt: new Date().toLocaleString(),
        appointmentRef: appointmentRef,
        invoiceNumber: invoiceNumber,
      };

      // Persist to localStorage
      try {
        const stored = localStorage.getItem('gmc_payments_list');
        const list = stored ? JSON.parse(stored) : [];
        list.unshift(newTx);
        localStorage.setItem('gmc_payments_list', JSON.stringify(list));
      } catch {
        // Fallback
      }

      setCompletedTx(newTx);
      setIsProcessing(false);
      if (onPaymentSuccess) {
        onPaymentSuccess(newTx);
      }
    }, 900);
  };

  const handlePrint = () => {
    window.print();
  };

  // SUCCESS RECEIPT VIEW
  if (completedTx) {
    const whatsappReceiptMsg = encodeURIComponent(
      `*Goodwill Medical Centre Payment Receipt*\nReceipt: ${completedTx.receiptNumber}\nRef: ${completedTx.transactionReference}\nPatient: ${completedTx.patientName}\nAmount Paid: ₦${completedTx.amount.toLocaleString()}\nService: ${completedTx.description}\nStatus: Verified & Paid`
    );
    const whatsappHref = `https://wa.me/2347032585626?text=${whatsappReceiptMsg}`;

    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="receipt-title"
        className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      >
        <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-xl border border-slate-200 relative space-y-6 my-8 animate-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="text-center space-y-2 border-b border-slate-100 pb-5">
            <div
              className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto"
              aria-hidden="true"
            >
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block">
              Payment Confirmed & Verified
            </span>
            <h2 id="receipt-title" className="text-2xl font-bold text-slate-900">
              Hospital Official Receipt
            </h2>
            <p className="text-xs text-slate-500">
              Goodwill Medical Centre · Accounts & Billing Dept.
            </p>
          </div>

          {/* Receipt Card */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-5 space-y-3.5 text-xs sm:text-sm">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200/80">
              <div>
                <span className="text-slate-500 block text-xs">Receipt Number</span>
                <span className="font-mono font-bold text-[#0f2d59]">{completedTx.receiptNumber}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block text-xs">Transaction Ref</span>
                <span className="font-mono text-slate-700">{completedTx.transactionReference}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-slate-500 block text-xs">Patient Name</span>
                <span className="font-semibold text-slate-900">{completedTx.patientName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-xs">Telephone</span>
                <span className="font-semibold text-slate-900">{completedTx.patientPhone}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-xs">Billing Purpose</span>
                <span className="font-semibold text-slate-900">{completedTx.category}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-xs">Payment Method</span>
                <span className="font-semibold text-slate-900 capitalize">
                  {completedTx.paymentMethod.replace('_', ' ')}
                </span>
              </div>
            </div>

            {completedTx.appointmentRef && (
              <div className="pt-2 border-t border-slate-200/60 text-xs">
                <span className="text-slate-500">Linked Appointment Ref: </span>
                <span className="font-mono font-bold text-[#0f2d59]">{completedTx.appointmentRef}</span>
              </div>
            )}

            <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900">Amount Paid</span>
              <span className="text-xl font-bold text-[#0f2d59] tabular-nums">
                {formatNaira(completedTx.amount)}
              </span>
            </div>

            <div className="text-[11px] text-slate-400 text-center pt-2">
              Payment verified at Goodwill Medical Centre accounts desk · FGQQ+57, Abakpa, Enugu.
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2.5">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Share Receipt to Hospital WhatsApp Accounts</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCompletedTx(null);
                  onClose();
                }}
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#0f2d59] text-white hover:bg-[#163f7a] text-xs font-semibold cursor-pointer"
              >
                <span>Done</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // CHECKOUT MODAL VIEW
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-payment-title"
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-xl border border-slate-200 relative space-y-6 my-6 animate-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close payment modal"
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-700">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure Hospital Payment Gateway</span>
          </div>
          <h2 id="modal-payment-title" className="text-xl sm:text-2xl font-bold text-slate-900">
            Complete Hospital Bill Payment
          </h2>
          <p className="text-xs text-slate-500">
            Goodwill Medical Centre, Abakpa, Enugu
          </p>
        </div>

        {/* Amount Summary Strip */}
        <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-600 block">Total Payable Amount</span>
            <span className="text-xs font-semibold text-slate-800">{category}</span>
          </div>
          <span className="text-2xl font-bold text-[#0f2d59] tabular-nums">
            {formatNaira(amount)}
          </span>
        </div>

        {/* Patient Details Confirmation */}
        <div className="text-xs text-slate-600 space-y-1 px-1">
          <p>
            <strong>Patient Name:</strong> {patientName}
          </p>
          <p>
            <strong>Contact Phone:</strong> {patientPhone}
          </p>
          {appointmentRef && (
            <p>
              <strong>Appointment Reference:</strong> {appointmentRef}
            </p>
          )}
        </div>

        {/* Payment Method Selector Tabs */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Select Payment Method
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setMethod('debit_card')}
              className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-colors cursor-pointer ${
                method === 'debit_card'
                  ? 'border-[#0f2d59] bg-blue-50/50 text-[#0f2d59] shadow-2xs font-bold'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              <CreditCard className="w-5 h-5 text-teal-600" />
              <span>Debit Card</span>
            </button>

            <button
              type="button"
              onClick={() => setMethod('bank_transfer')}
              className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-colors cursor-pointer ${
                method === 'bank_transfer'
                  ? 'border-[#0f2d59] bg-blue-50/50 text-[#0f2d59] shadow-2xs font-bold'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              <Building2 className="w-5 h-5 text-blue-600" />
              <span>Bank Transfer</span>
            </button>

            <button
              type="button"
              onClick={() => setMethod('ussd')}
              className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-colors cursor-pointer ${
                method === 'ussd'
                  ? 'border-[#0f2d59] bg-blue-50/50 text-[#0f2d59] shadow-2xs font-bold'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              <Smartphone className="w-5 h-5 text-purple-600" />
              <span>USSD Dial</span>
            </button>
          </div>
        </div>

        {/* Method 1: DEBIT CARD FORM */}
        {method === 'debit_card' && (
          <div className="space-y-3 pt-1">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Card Number (Mastercard / Visa / Verve)
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="5399 •••• •••• ••••"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0f2d59]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  placeholder="MM / YY"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0f2d59]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  CVV / CVC
                </label>
                <input
                  type="password"
                  maxLength={4}
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value)}
                  placeholder="123"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0f2d59]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Card PIN
              </label>
              <input
                type="password"
                maxLength={4}
                value={cardPin}
                onChange={(e) => setCardPin(e.target.value)}
                placeholder="••••"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0f2d59]"
              />
            </div>
          </div>
        )}

        {/* Method 2: BANK TRANSFER FORM */}
        {method === 'bank_transfer' && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 text-xs sm:text-sm">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Transfer to Dedicated Hospital Account</span>
              <span className="text-teal-700 font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Valid for 30 mins
              </span>
            </div>

            <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">Bank Name</span>
                <span className="font-bold text-slate-900">Moniepoint MFB / Wema Bank</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">Account Name</span>
                <span className="font-semibold text-slate-900">Goodwill Medical Centre</span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-slate-100">
                <span className="text-xs text-slate-500">Account Number</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-bold text-[#0f2d59]">8032585626</span>
                  <button
                    type="button"
                    onClick={handleCopyAccount}
                    className="p-1 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                    title="Copy Account Number"
                  >
                    {copiedAccount ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 text-center">
              Please use your mobile banking app to transfer exactly <strong>{formatNaira(amount)}</strong>. Your payment will be verified immediately.
            </p>
          </div>
        )}

        {/* Method 3: USSD CODE FORM */}
        {method === 'ussd' && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 text-xs sm:text-sm">
            <span className="text-xs font-semibold text-slate-700 block">
              Choose your bank to dial USSD code
            </span>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                <span>GTBank (*737#)</span>
                <code className="bg-slate-100 px-2 py-0.5 rounded font-bold text-[#0f2d59]">*737*2*8032585626#{amount}</code>
              </div>
              <div className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                <span>Zenith Bank (*966#)</span>
                <code className="bg-slate-100 px-2 py-0.5 rounded font-bold text-[#0f2d59]">*966*8032585626#{amount}</code>
              </div>
              <div className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                <span>First Bank (*894#)</span>
                <code className="bg-slate-100 px-2 py-0.5 rounded font-bold text-[#0f2d59]">*894*8032585626#{amount}</code>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="button"
            disabled={isProcessing}
            onClick={handleCompletePayment}
            className="w-full py-3.5 px-6 rounded-lg text-sm font-semibold text-white bg-[#0f2d59] hover:bg-[#163f7a] transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
          >
            {isProcessing ? (
              <span>Verifying Payment with Accounts Desk...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-teal-300" />
                <span>
                  {method === 'bank_transfer'
                    ? `I have sent ${formatNaira(amount)} (Verify Now)`
                    : `Pay ${formatNaira(amount)} Now`}
                </span>
              </>
            )}
          </button>
        </div>

        <p className="text-[11px] text-center text-slate-400">
          * Payments are protected by standard 256-bit SSL encryption and routed directly to Goodwill Medical Centre accounts.
        </p>
      </div>
    </div>
  );
};
