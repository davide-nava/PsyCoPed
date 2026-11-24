import type { ProfessionalId } from '../config/site';

/**
 * SAMPLE availability generator.
 *
 * Replace `getAvailability()` with a call to a real provider (Cal.com, Google
 * Calendar free/busy, or a custom API) returning the same `AvailabilityMap` shape.
 * The booking widget only depends on that shape.
 */
export type AvailabilityMap = Record<ProfessionalId, Record<string, string[]>>;

/** Weekly template: JS weekday (0 = Sunday) -> slot start times. SAMPLE values. */
const weekly: Record<ProfessionalId, Partial<Record<number, string[]>>> = {
  provini: {
    1: ['09:00', '10:00', '11:00', '15:00', '16:00', '17:00'],
    2: ['09:00', '10:00', '11:00', '14:30', '15:30', '16:30'],
    3: ['10:00', '11:00', '15:00', '16:00', '17:00', '18:00'],
    4: ['09:00', '10:00', '11:00', '15:00', '16:00'],
    5: ['09:00', '10:00', '11:00', '14:00', '15:00'],
    6: ['09:00', '10:00', '11:00'],
  },
  coccia: {
    2: ['10:00', '11:00', '16:00', '17:00', '18:00'],
    4: ['10:00', '11:00', '15:00', '16:00', '17:00'],
    6: ['09:30', '10:30', '11:30'],
  },
};

const pad = (n: number) => String(n).padStart(2, '0');
export const toISODate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/** Small deterministic hash so "already booked" slots are stable between builds. */
function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function getAvailability(from: Date = new Date(), days = 75): AvailabilityMap {
  const result: AvailabilityMap = { provini: {}, coccia: {} };
  for (let i = 1; i <= days; i++) {
    const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() + i);
    const iso = toISODate(d);
    for (const id of Object.keys(weekly) as ProfessionalId[]) {
      const base = weekly[id][d.getDay()];
      if (!base) continue;
      const free = base.filter((t) => hash(`${id}-${iso}-${t}`) % 100 >= 30); // ~30% pre-booked
      if (free.length) result[id][iso] = free;
    }
  }
  return result;
}
