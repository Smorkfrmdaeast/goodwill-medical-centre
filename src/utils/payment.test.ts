/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatNaira,
  generateReceiptNumber,
  generateTransactionReference,
  validateBillPayment,
  getInitialTransactions,
} from './payment.ts';

test('formatNaira formats numbers into Nigerian currency string', () => {
  assert.equal(formatNaira(2500), '₦2,500');
  assert.equal(formatNaira(150000), '₦150,000');
  assert.equal(formatNaira(0), '₦0');
});

test('generateReceiptNumber and transaction reference format correctly', () => {
  const receipt = generateReceiptNumber();
  assert.match(receipt, /^GMC-REC-\d{4}-\d{5}$/);

  const txRef = generateTransactionReference();
  assert.match(txRef, /^PAY-GMC-[A-Z0-9]+$/);
});

test('validateBillPayment validates amount, patient name and phone', () => {
  const invalid = validateBillPayment({
    patientName: '',
    patientPhone: '123',
    category: 'Consultation Fee',
    amount: '100', // Below 500 minimum
    paymentMethod: 'debit_card',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.patientName);
  assert.ok(invalid.errors.patientPhone);
  assert.ok(invalid.errors.amount);

  const valid = validateBillPayment({
    patientName: 'Emeka Nwosu',
    patientPhone: '0703 258 5626',
    category: 'Laboratory & Diagnostic Tests',
    amount: '4500',
    paymentMethod: 'bank_transfer',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('getInitialTransactions provides seeded records', () => {
  const txs = getInitialTransactions();
  assert.ok(txs.length >= 2);
  assert.equal(txs[0].status, 'Successful');
  assert.equal(typeof txs[0].amount, 'number');
});
