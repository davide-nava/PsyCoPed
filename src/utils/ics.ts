/**
 * Minimal RFC 5545 generator for the "appointment request" reminder.
 * The file only contains the requested slot and a "pending confirmation" notice:
 * no clinical data, e-mail address or phone number of the requester is written into it.
 */

export const ICS_FILENAME = 'richiesta-appuntamento-psycoped.ics';
export const ICS_TIMEZONE = 'Europe/Rome';

export interface BookingIcsLabels {
  /** Event title prefix, e.g. "Richiesta appuntamento (da confermare)". */
  summary: string;
  /** Explains that the slot is NOT confirmed until the studio replies. */
  pendingNotice: string;
  service: string;
  professional: string;
  format: string;
}

export interface BookingIcsInput {
  /** `YYYY-MM-DD` (local date in Italy). */
  date: string;
  /** `HH:MM` (local time in Italy). */
  time: string;
  durationMinutes: number;
  serviceLabel: string;
  professionalName: string;
  formatLabel: string;
  location: string;
  labels: BookingIcsLabels;
}

const CRLF = '\r\n';
const pad = (n: number) => String(n).padStart(2, '0');

/** Escape TEXT values (RFC 5545 §3.3.11). */
export const escapeIcsText = (value: string): string =>
  value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

/** Fold lines longer than 75 octets (RFC 5545 §3.1), never splitting a multi-byte character. */
export function foldIcsLine(line: string): string {
  const encoder = new TextEncoder();
  if (encoder.encode(line).length <= 75) return line;
  const parts: string[] = [];
  let current = '';
  let size = 0;
  let limit = 75;
  for (const char of line) {
    const bytes = encoder.encode(char).length;
    if (size + bytes > limit) {
      parts.push(current);
      current = '';
      size = 0;
      limit = 74; // continuation lines start with one space
    }
    current += char;
    size += bytes;
  }
  parts.push(current);
  return parts.join(`${CRLF} `);
}

const formatUtc = (d: Date): string =>
  `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;

/** `2026-12-05` + `10:00` -> `20261205T100000` (floating value paired with TZID). */
const localStamp = (date: string, time: string): string => `${date.replace(/-/g, '')}T${time.replace(':', '')}00`;

function addMinutes(date: string, time: string, minutes: number): string {
  const total = Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5)) + minutes;
  const base = new Date(Date.UTC(Number(date.slice(0, 4)), Number(date.slice(5, 7)) - 1, Number(date.slice(8, 10))));
  base.setUTCDate(base.getUTCDate() + Math.floor(total / 1440));
  const m = ((total % 1440) + 1440) % 1440;
  return localStamp(`${base.getUTCFullYear()}-${pad(base.getUTCMonth() + 1)}-${pad(base.getUTCDate())}`, `${pad(Math.floor(m / 60))}:${pad(m % 60)}`);
}

/** Europe/Rome VTIMEZONE (EU daylight saving rules). */
const VTIMEZONE = [
  'BEGIN:VTIMEZONE',
  `TZID:${ICS_TIMEZONE}`,
  'BEGIN:DAYLIGHT',
  'TZOFFSETFROM:+0100',
  'TZOFFSETTO:+0200',
  'TZNAME:CEST',
  'DTSTART:19700329T020000',
  'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU',
  'END:DAYLIGHT',
  'BEGIN:STANDARD',
  'TZOFFSETFROM:+0200',
  'TZOFFSETTO:+0100',
  'TZNAME:CET',
  'DTSTART:19701025T030000',
  'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU',
  'END:STANDARD',
  'END:VTIMEZONE',
];

/** Build the `.ics` text (CRLF line endings, folded lines). `now` is injectable for tests. */
export function generateBookingIcs(booking: BookingIcsInput, now: Date = new Date()): string {
  const { labels } = booking;
  const description = [
    labels.pendingNotice,
    `${labels.service}: ${booking.serviceLabel}`,
    `${labels.professional}: ${booking.professionalName}`,
    `${labels.format}: ${booking.formatLabel}`,
  ].join('\n');
  const uid = `${localStamp(booking.date, booking.time)}-${Math.abs(hashString(booking.serviceLabel + booking.professionalName))}@psycoped`;

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Studio PsyCoPed//Booking request//IT',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    ...VTIMEZONE,
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${formatUtc(now)}`,
    `DTSTART;TZID=${ICS_TIMEZONE}:${localStamp(booking.date, booking.time)}`,
    `DTEND;TZID=${ICS_TIMEZONE}:${addMinutes(booking.date, booking.time, booking.durationMinutes)}`,
    `SUMMARY:${escapeIcsText(`${labels.summary}: ${booking.serviceLabel}`)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    `LOCATION:${escapeIcsText(booking.location)}`,
    'STATUS:TENTATIVE',
    'TRANSP:TRANSPARENT',
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeIcsText(labels.summary)}`,
    'TRIGGER:-P1D',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return lines.map(foldIcsLine).join(CRLF) + CRLF;
}

function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Trigger a browser download of the generated `.ics` file. */
export function downloadBookingIcs(booking: BookingIcsInput): void {
  const blob = new Blob([generateBookingIcs(booking)], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = ICS_FILENAME;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
