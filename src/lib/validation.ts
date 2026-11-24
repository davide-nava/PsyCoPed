/** Validation shared by the browser forms and the server handlers. */
import { it } from '../i18n/it';
import type { Dict } from '../i18n/it';

export type ValidationMessages = Dict['validation'];

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  callbackWindow?: string;
  subject: string;
  channel: 'phone' | 'email' | 'messaging';
  message: string;
  consent: boolean;
  /** Honeypot: must stay empty. */
  website?: string;
  /** UI language the request was sent from (informational). */
  locale?: string;
}

export interface BookingPayload {
  service: string;
  format: 'studio' | 'online';
  professional: 'provini' | 'coccia' | 'any';
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  name: string;
  email: string;
  phone: string;
  note?: string;
  consent: boolean;
  policy: boolean;
  website?: string;
  locale?: string;
}

export type Errors<T> = Partial<Record<keyof T, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+]?[\d\s().-]{7,20}$/;
const CHANNELS = ['phone', 'email', 'messaging'];

export function validateContact(p: Partial<ContactPayload>, m: ValidationMessages = it.validation): Errors<ContactPayload> {
  const e: Errors<ContactPayload> = {};
  if (!p.name || p.name.trim().length < 2) e.name = m.name;
  if (!p.email || !EMAIL.test(p.email.trim())) e.email = m.email;
  if (p.phone && !PHONE.test(p.phone.trim())) e.phone = m.phone;
  if (!p.subject) e.subject = m.subject;
  if (!p.channel || !CHANNELS.includes(p.channel)) e.channel = m.channel;
  if (p.channel === 'phone' || p.channel === 'messaging') {
    if (!p.phone?.trim()) e.phone = m.phoneRequired;
  }
  if (!p.message || p.message.trim().length < 10) e.message = m.messageShort;
  if (p.message && p.message.length > 2000) e.message = m.messageLong;
  if (!p.consent) e.consent = m.consent;
  return e;
}

export function validateBooking(p: Partial<BookingPayload>, m: ValidationMessages = it.validation): Errors<BookingPayload> {
  const e: Errors<BookingPayload> = {};
  if (!p.service) e.service = m.service;
  if (p.format !== 'studio' && p.format !== 'online') e.format = m.format;
  if (!p.professional) e.professional = m.professional;
  if (!p.date || !/^\d{4}-\d{2}-\d{2}$/.test(p.date)) e.date = m.date;
  if (!p.time || !/^\d{2}:\d{2}$/.test(p.time)) e.time = m.time;
  if (!p.name || p.name.trim().length < 2) e.name = m.name;
  if (!p.email || !EMAIL.test(p.email.trim())) e.email = m.email;
  if (!p.phone || !PHONE.test(p.phone.trim())) e.phone = m.phone;
  if (p.note && p.note.length > 600) e.note = m.noteLong;
  if (!p.consent) e.consent = m.consent;
  if (!p.policy) e.policy = m.policy;
  return e;
}
