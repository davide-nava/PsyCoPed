import type { Locale } from '../i18n';
import type { ProfessionalId } from '../config/site';

/** A professional can be chosen explicitly or resolved to "the first one available". */
export type ProfessionalChoice = ProfessionalId | 'any';
export type SessionFormat = 'studio' | 'online';

export interface Slot {
  /** `YYYY-MM-DD` (local date). */
  date: string;
  /** `HH:MM` (local time). */
  time: string;
  professional: ProfessionalId;
}

export interface OccupiedSlot {
  professional: ProfessionalId;
  date: string;
  time: string;
}

export interface WorkingHours {
  professional: ProfessionalId;
  /** JS weekday: 0 = Sunday … 6 = Saturday. */
  weekday: number;
  /** Half-open ranges `[start, end)` of working time. */
  ranges: readonly (readonly [string, string])[];
  /** Formats offered in these hours (defaults to both). */
  formats?: readonly SessionFormat[];
}

/**
 * Booking form services. `id` is stable; labels live here (not in the i18n dictionaries)
 * because they are also written into the `.ics` file and the e-mail fallback.
 */
export const bookingServices = [
  {
    id: 'consulenza-psicologica',
    minutes: 50,
    label: { it: 'Consulenza Psicologica Individuale', en: 'Individual Psychological Counselling' },
  },
  {
    id: 'potenziamento-cognitivo',
    minutes: 50,
    label: { it: 'Potenziamento Cognitivo Psicopedagogico', en: 'Psycho-pedagogical Cognitive Enhancement' },
  },
  {
    id: 'neuropsicologia',
    minutes: 60,
    label: { it: 'Consulenza Neuropsicologica', en: 'Neuropsychological Consultation' },
  },
  {
    id: 'pedagogica-dsa',
    minutes: 50,
    label: { it: 'Consulenza Pedagogica / DSA', en: 'Pedagogical Counselling / SLD' },
  },
  { id: 'ipnosi', minutes: 50, label: { it: 'Ipnosi', en: 'Hypnosis' } },
  {
    id: 'coaching',
    minutes: 50,
    label: {
      it: 'Professional Coaching / Career Enhancement / Percorso Transpersonale Evolutivo',
      en: 'Professional Coaching / Career Enhancement / Evolutionary Transpersonal Path',
    },
  },
] as const satisfies readonly { id: string; minutes: number; label: Record<Locale, string> }[];

export type BookingServiceId = (typeof bookingServices)[number]['id'];

export const sessionLocations: Record<SessionFormat, Record<Locale, string>> = {
  studio: {
    it: 'Studio PsyCoPed, Via Provinciale, 43, 21030 Cremenaga (VA), Italia',
    en: 'Studio PsyCoPed, Via Provinciale, 43, 21030 Cremenaga (VA), Italy',
  },
  online: {
    it: 'Online (Video Consulenza): il link viene inviato via email',
    en: 'Online (video consultation): the link is sent by e-mail',
  },
};

/** Schedule parameters: edit here, no other file needs to change. VERIFY with the practice. */
export const agendaConfig = {
  /** Default session length in minutes. */
  sessionMinutes: 50,
  /** Pause between two sessions in minutes (slot step = session + buffer). */
  bufferMinutes: 10,
  /** Requests closer than this to the slot start are not offered. */
  minLeadHours: 48,
  /** How far ahead dates can be requested. */
  horizonDays: 90,
  /** Fixed yearly closures, `MM-DD`. */
  holidays: ['01-01', '01-06', '04-25', '05-01', '06-02', '08-15', '11-01', '12-08', '12-25', '12-26'],
  /** Extra closures (inclusive `YYYY-MM-DD` ranges), e.g. winter or summer break. */
  closures: [
    { from: '2026-12-24', to: '2027-01-06' },
    { from: '2027-08-09', to: '2027-08-22' },
  ],
} as const;

export const workingHours: readonly WorkingHours[] = [
  { professional: 'provini', weekday: 1, ranges: [['09:00', '12:00'], ['15:00', '18:00']] },
  { professional: 'provini', weekday: 2, ranges: [['09:00', '12:00'], ['14:30', '17:30']] },
  { professional: 'provini', weekday: 3, ranges: [['10:00', '12:00'], ['15:00', '19:00']] },
  { professional: 'provini', weekday: 4, ranges: [['09:00', '12:00'], ['15:00', '17:00']] },
  { professional: 'provini', weekday: 5, ranges: [['09:00', '12:00'], ['14:00', '16:00']] },
  { professional: 'provini', weekday: 6, ranges: [['09:00', '12:00']], formats: ['online'] },
  { professional: 'coccia', weekday: 2, ranges: [['10:00', '12:00'], ['16:00', '19:00']] },
  { professional: 'coccia', weekday: 4, ranges: [['10:00', '12:00'], ['15:00', '18:00']] },
  { professional: 'coccia', weekday: 6, ranges: [['09:30', '12:30']], formats: ['online'] },
];

/** Sample already-booked slots known at build time (add real bookings here or via the feed). */
export const occupiedSlots: readonly OccupiedSlot[] = [
  { professional: 'provini', date: '2026-12-02', time: '10:00' },
  { professional: 'provini', date: '2026-12-03', time: '09:00' },
  { professional: 'coccia', date: '2026-12-03', time: '10:00' },
];

/** Weekly recurring commitments (e.g. a standing appointment every Monday at 15:00). */
export const recurringOccupiedSlots: readonly { professional: ProfessionalId; weekday: number; time: string }[] = [
  { professional: 'provini', weekday: 1, time: '15:00' },
  { professional: 'coccia', weekday: 4, time: '16:00' },
];

const pad = (n: number) => String(n).padStart(2, '0');
export const toISODate = (d: Date): string => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
/** Parse `YYYY-MM-DD` as a local date (noon avoids DST edge cases). */
export const parseISODate = (iso: string): Date => new Date(`${iso}T12:00:00`);
const toMinutes = (hhmm: string): number => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3, 5));
const fromMinutes = (m: number): string => `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;

export function isClosedDate(iso: string): boolean {
  if (agendaConfig.holidays.some((h) => iso.slice(5) === h)) return true;
  return agendaConfig.closures.some((c) => iso >= c.from && iso <= c.to);
}

/** Validate untrusted feed data (the feed is third-party JSON). */
export function parseOccupiedFeed(data: unknown): OccupiedSlot[] {
  const list = Array.isArray(data) ? data : (data as { occupied?: unknown } | null)?.occupied;
  if (!Array.isArray(list)) return [];
  return list.filter(
    (s): s is OccupiedSlot =>
      !!s &&
      (s.professional === 'provini' || s.professional === 'coccia') &&
      typeof s.date === 'string' &&
      /^\d{4}-\d{2}-\d{2}$/.test(s.date) &&
      typeof s.time === 'string' &&
      /^\d{2}:\d{2}$/.test(s.time),
  );
}

/** Fetch the optional runtime feed; any failure silently falls back to the static agenda. */
export async function fetchAgendaFeed(url: string = import.meta.env.PUBLIC_AGENDA_FEED_URL || '', timeoutMs = 4000): Promise<OccupiedSlot[]> {
  if (!url) return [];
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } });
    return res.ok ? parseOccupiedFeed(await res.json()) : [];
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

export interface SlotQuery {
  professional?: ProfessionalChoice;
  format?: SessionFormat;
  /** Session length in minutes (defaults to `agendaConfig.sessionMinutes`). */
  minutes?: number;
  now?: Date;
  /** Extra occupied slots, typically the result of {@link fetchAgendaFeed}. */
  extraOccupied?: readonly OccupiedSlot[];
}

/**
 * Free slots for one day. With `professional: 'any'` every professional is considered and
 * each start time is returned once, attributed to the first professional who is free.
 */
export function getAvailableSlotsForDate(date: string, query: SlotQuery = {}): Slot[] {
  const { professional = 'any', format, minutes = agendaConfig.sessionMinutes, now = new Date(), extraOccupied = [] } = query;
  if (isClosedDate(date)) return [];
  const day = parseISODate(date);
  if (Number.isNaN(day.getTime())) return [];
  const earliest = now.getTime() + agendaConfig.minLeadHours * 3_600_000;
  const latest = now.getTime() + agendaConfig.horizonDays * 86_400_000;
  const step = agendaConfig.sessionMinutes + agendaConfig.bufferMinutes;
  const weekday = day.getDay();

  const taken = new Set<string>();
  for (const s of [...occupiedSlots, ...extraOccupied]) taken.add(`${s.professional}|${s.date}|${s.time}`);
  for (const r of recurringOccupiedSlots) if (r.weekday === weekday) taken.add(`${r.professional}|${date}|${r.time}`);

  const byTime = new Map<string, Slot>();
  for (const hours of workingHours) {
    if (hours.weekday !== weekday) continue;
    if (professional !== 'any' && hours.professional !== professional) continue;
    if (format && hours.formats && !hours.formats.includes(format)) continue;
    for (const [start, end] of hours.ranges) {
      for (let m = toMinutes(start); m + minutes <= toMinutes(end); m += step) {
        const time = fromMinutes(m);
        const startsAt = new Date(`${date}T${time}:00`).getTime();
        if (startsAt < earliest || startsAt > latest) continue;
        if (taken.has(`${hours.professional}|${date}|${time}`)) continue;
        if (!byTime.has(time)) byTime.set(time, { date, time, professional: hours.professional });
      }
    }
  }
  return [...byTime.values()].sort((a, b) => a.time.localeCompare(b.time));
}
