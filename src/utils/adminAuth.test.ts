/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  authenticateAdmin,
  validatePublishPayload,
  getInitialAppointments,
} from './adminAuth.ts';

test('authenticateAdmin validates correct credentials and rejects invalid ones', () => {
  const validUser1 = authenticateAdmin('admin@goodwillmedical.ng', 'goodwill2026');
  assert.ok(validUser1);
  assert.equal(validUser1?.email, 'admin@goodwillmedical.ng');

  const validPasscode = authenticateAdmin('goodwill2026');
  assert.ok(validPasscode);

  const invalidUser = authenticateAdmin('wrong@email.com', 'badpass');
  assert.equal(invalidUser, null);

  const emptyUser = authenticateAdmin('');
  assert.equal(emptyUser, null);
});

test('validatePublishPayload catches missing and short fields', () => {
  const invalid = validatePublishPayload({
    title: 'abc',
    category: '',
    readTime: '3 min read',
    summary: 'short',
    content: 'too short',
    keyAdvice: '',
  });

  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.title);
  assert.ok(invalid.errors.category);
  assert.ok(invalid.errors.summary);
  assert.ok(invalid.errors.content);
});

test('validatePublishPayload succeeds on valid inputs', () => {
  const valid = validatePublishPayload({
    title: 'Vaccination Schedule for Infants in Abakpa',
    category: 'Child Health',
    readTime: '4 min read',
    summary: 'Essential immunization milestones for newborn infants and toddlers in our community.',
    content: 'Routine immunizations provide critical immunity against common childhood illnesses. Parents in Abakpa are encouraged to follow the national immunization calendar.',
    keyAdvice: 'Follow the vaccination schedule strictly and keep immunization cards safe.',
  });

  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('getInitialAppointments provides seed records with valid status', () => {
  const appointments = getInitialAppointments();
  assert.ok(appointments.length >= 2);
  assert.equal(appointments[0].referenceCode.startsWith('GMC-2026-'), true);
  assert.ok(['Pending Review', 'Confirmed', 'Completed', 'Cancelled'].includes(appointments[0].status));
});
