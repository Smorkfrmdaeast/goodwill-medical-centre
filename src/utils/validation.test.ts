/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isValidPhoneNumber,
  isDateTodayOrFuture,
  validateAppointmentForm,
  generateReferenceCode,
  createWhatsAppMessage,
} from './validation.ts';

test('isValidPhoneNumber identifies valid Nigerian and international formats', () => {
  assert.equal(isValidPhoneNumber('0703 258 5626'), true);
  assert.equal(isValidPhoneNumber('07032585626'), true);
  assert.equal(isValidPhoneNumber('+2347032585626'), true);
  assert.equal(isValidPhoneNumber('08031234567'), true);
  assert.equal(isValidPhoneNumber('123'), false);
  assert.equal(isValidPhoneNumber(''), false);
  assert.equal(isValidPhoneNumber('abcdefghijk'), false);
});

test('isDateTodayOrFuture checks dates accurately', () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  assert.equal(isDateTodayOrFuture(tomorrowStr), true);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  assert.equal(isDateTodayOrFuture(yesterdayStr), false);

  assert.equal(isDateTodayOrFuture('invalid-date'), false);
});

test('validateAppointmentForm catches missing and invalid fields', () => {
  const emptyResult = validateAppointmentForm({
    fullName: '',
    phoneNumber: '',
    preferredDate: '',
    preferredTime: '',
    department: '',
  });

  assert.equal(emptyResult.isValid, false);
  assert.ok(emptyResult.errors.fullName);
  assert.ok(emptyResult.errors.phoneNumber);
  assert.ok(emptyResult.errors.preferredDate);
  assert.ok(emptyResult.errors.preferredTime);
  assert.ok(emptyResult.errors.department);
});

test('validateAppointmentForm succeeds on valid inputs', () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 2);
  const validDate = tomorrow.toISOString().split('T')[0];

  const validResult = validateAppointmentForm({
    fullName: 'Chinedu Okonkwo',
    phoneNumber: '0703 258 5626',
    preferredDate: validDate,
    preferredTime: 'Morning (08:00 AM - 12:00 PM)',
    department: 'General Outpatient Care & Consultation',
    notes: 'Routine health checkup',
  });

  assert.equal(validResult.isValid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);
});

test('generateReferenceCode produces formatted GMC code', () => {
  const code = generateReferenceCode();
  assert.match(code, /^GMC-\d{4}-\d{4}$/);
});

test('createWhatsAppMessage creates encoded string containing patient details', () => {
  const msg = createWhatsAppMessage(
    {
      fullName: 'Amara Eze',
      phoneNumber: '08031234567',
      preferredDate: '2026-11-10',
      preferredTime: 'Morning',
      department: 'Maternal & Child Health Care',
      notes: 'Antenatal registration',
    },
    'GMC-2026-1234'
  );
  assert.ok(msg.includes('GMC-2026-1234'));
  assert.ok(msg.includes('Amara%20Eze'));
});
