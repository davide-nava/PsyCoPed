/** Validation shared by the browser forms and the server handlers. */

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  callbackWindow?: string;
  subject: string;
  channel: 'phone' | 'email' | 'whatsapp' | 'telegram';
  message: string;
  consent: boolean;
  /** Honeypot: must stay empty. */
  website?: string;
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
}

export type Errors<T> = Partial<Record<keyof T, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+]?[\d\s().-]{7,20}$/;
const CHANNELS = ['phone', 'email', 'whatsapp', 'telegram'];

export function validateContact(p: Partial<ContactPayload>): Errors<ContactPayload> {
  const e: Errors<ContactPayload> = {};
  if (!p.name || p.name.trim().length < 2) e.name = 'Inserisci nome e cognome.';
  if (!p.email || !EMAIL.test(p.email.trim())) e.email = 'Inserisci un indirizzo email valido.';
  if (p.phone && !PHONE.test(p.phone.trim())) e.phone = 'Inserisci un numero di telefono valido.';
  if (!p.subject) e.subject = 'Seleziona il servizio di interesse.';
  if (!p.channel || !CHANNELS.includes(p.channel)) e.channel = 'Scegli un canale di contatto.';
  if (p.channel === 'phone' || p.channel === 'whatsapp' || p.channel === 'telegram') {
    if (!p.phone?.trim()) e.phone = 'Per questo canale è necessario il numero di telefono.';
  }
  if (!p.message || p.message.trim().length < 10) e.message = 'Scrivi un breve messaggio (almeno 10 caratteri).';
  if (p.message && p.message.length > 2000) e.message = 'Il messaggio è troppo lungo (max 2000 caratteri).';
  if (!p.consent) e.consent = 'Il consenso al trattamento dei dati è obbligatorio.';
  return e;
}

export function validateBooking(p: Partial<BookingPayload>): Errors<BookingPayload> {
  const e: Errors<BookingPayload> = {};
  if (!p.service) e.service = 'Seleziona un servizio.';
  if (p.format !== 'studio' && p.format !== 'online') e.format = 'Seleziona la modalità.';
  if (!p.professional) e.professional = 'Seleziona un professionista.';
  if (!p.date || !/^\d{4}-\d{2}-\d{2}$/.test(p.date)) e.date = 'Seleziona una data.';
  if (!p.time || !/^\d{2}:\d{2}$/.test(p.time)) e.time = 'Seleziona un orario.';
  if (!p.name || p.name.trim().length < 2) e.name = 'Inserisci nome e cognome.';
  if (!p.email || !EMAIL.test(p.email.trim())) e.email = 'Inserisci un indirizzo email valido.';
  if (!p.phone || !PHONE.test(p.phone.trim())) e.phone = 'Inserisci un numero di telefono valido.';
  if (p.note && p.note.length > 600) e.note = 'La nota è troppo lunga (max 600 caratteri).';
  if (!p.consent) e.consent = 'Il consenso al trattamento dei dati è obbligatorio.';
  if (!p.policy) e.policy = 'Conferma di aver letto le condizioni di prenotazione.';
  return e;
}
