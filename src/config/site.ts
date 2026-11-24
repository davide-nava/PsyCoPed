import type { Locale } from '../i18n';

/**
 * Central site configuration. Every value marked VERIFY must be confirmed by the
 * practice before go-live (see README "Pre-launch checklist").
 */
export const site = {
  name: 'Studio PsyCoPed',
  url: 'https://www.studiopsycoped.com/', // fallback only: the deployed origin comes from `site` in astro.config.mjs
  address: {
    street: 'Via Provinciale, 43',
    postalCode: '21030',
    city: 'Cremenaga',
    province: 'VA',
    country: 'IT',
    full: {
      it: 'Via Provinciale, 43 — 21030 Cremenaga (VA), Italia',
      en: 'Via Provinciale, 43 — 21030 Cremenaga (VA), Italy',
    },
    mapsUrl: 'https://www.google.com/maps/place/Studio+PsyCoPed/@45.9903585,8.7982417,17z/data=!3m1!4b1!4m6!3m5!1s0x4785d385ca4f0323:0x95115a496cfee1d4!8m2!3d45.9903548!4d8.8008166!16s%2Fg%2F11pzwfqq21?entry=ttu&g_ep=EgoyMDI2MTExOC4xIKXMDSoASAFQAw%3D%3D',
  },
  contact: {
    phone: '+39 347 521 3108',
    phoneRaw: '+393475213108',
    email: 'mirko.provini@icloud.com',
    pec: 'mirkoprovini.psycoped@pec.it',
  },
  // VERIFY: Partita IVA, codice fiscale, fee schedule, professional liability insurance
  admin: {
    vatNumber: 'DA COMPLETARE',
    fiscalCode: 'DA COMPLETARE',
  },
  /**
   * Optional external endpoints (Formspree, Web3Forms, custom webhook) injected at build time.
   * The site is fully static: when empty, forms fall back to mailto: and the contact card.
   */
  endpoints: {
    contact: import.meta.env.PUBLIC_CONTACT_ENDPOINT || '',
    booking: import.meta.env.PUBLIC_BOOKING_ENDPOINT || import.meta.env.PUBLIC_CONTACT_ENDPOINT || '',
    /** Optional JSON feed with already-booked slots, merged at runtime (see src/data/agenda.ts). */
    agendaFeed: import.meta.env.PUBLIC_AGENDA_FEED_URL || '',
  },
  /** Opening hours used for structured data. VERIFY with the practice. */
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '19:00' },
    { days: ['Saturday'], opens: '09:00', closes: '13:00' },
  ],
  emergencyNumber: '112',
} as const;

export type ProfessionalId = 'provini' | 'coccia';

export interface Professional {
  id: ProfessionalId;
  name: string;
  shortName: string;
  title: string;
  registration?: string;
  phone: string;
  phoneRaw: string;
  email?: string;
  specializations: string[];
  bio: string[];
}

type LocalizedFields = Pick<Professional, 'name' | 'title' | 'registration' | 'specializations' | 'bio'>;

const professionalBase = {
  provini: {
    shortName: 'Mirko Provini',
    phone: '+39 347 521 3108',
    phoneRaw: '+393475213108',
    email: site.contact.email,
  },
  coccia: {
    shortName: 'Valentina Coccia',
    // VERIFY: registration number to be provided by the professional
    phone: '+39 348 032 0892',
    phoneRaw: '+393480320892',
  },
} as const;

const professionalText: Record<Locale, Record<ProfessionalId, LocalizedFields>> = {
  it: {
    provini: {
      name: 'Dott. Mirko Provini',
      title: 'Psicologo Clinico',
      registration: 'Iscritto all’Ordine degli Psicologi della Lombardia (OPL), n. 24451',
      specializations: ['Neuropsicologia', 'Pedagogia', 'Ipnosi', 'Professional Coaching'],
      bio: [
        'Psicologo Clinico (OPL n. 24451), specializzato in Neuropsicologia, Pedagogia, Ipnosi e Professional Coaching.',
        'È in possesso dell’abilitazione all’insegnamento nella scuola secondaria per Psicologia, Pedagogia e Scienze Umane e collabora a livello editoriale con la testata svizzera TXT-RSI.',
        'Nella pratica clinica unisce valutazione neuropsicologica, lavoro psicopedagogico e strumenti di ipnosi e coaching, adattando il percorso alla persona e ai suoi obiettivi.',
      ],
    },
    coccia: {
      name: 'Dott.ssa Valentina Coccia',
      title: 'Psicologo Clinico e Pedagogista Clinico',
      specializations: ['Psicologia Clinica', 'Pedagogia Clinica'],
      bio: [
        'Psicologo Clinico e Pedagogista Clinico, affianca nello Studio PsyCoPed persone e famiglie in percorsi di sostegno psicologico e pedagogico.',
        'Il suo lavoro integra la prospettiva clinica e quella educativa, con attenzione ai percorsi di crescita, apprendimento e relazione.',
      ],
    },
  },
  en: {
    provini: {
      name: 'Dr. Mirko Provini',
      title: 'Clinical Psychologist',
      registration: 'Registered with the Lombardy Order of Psychologists (OPL), no. 24451',
      specializations: ['Neuropsychology', 'Pedagogy', 'Hypnosis', 'Professional Coaching'],
      bio: [
        'Clinical Psychologist (OPL no. 24451), specialised in Neuropsychology, Pedagogy, Hypnosis and Professional Coaching.',
        'Qualified to teach Psychology, Pedagogy and Human Sciences in secondary schools, and editorial collaborator with the Swiss publication TXT-RSI.',
        'In clinical practice he combines neuropsychological assessment, psycho-pedagogical work and hypnosis and coaching tools, adapting the path to the person and their goals.',
      ],
    },
    coccia: {
      name: 'Dr. Valentina Coccia',
      title: 'Clinical Psychologist and Clinical Pedagogist',
      specializations: ['Clinical Psychology', 'Clinical Pedagogy'],
      bio: [
        'Clinical Psychologist and Clinical Pedagogist, at Studio PsyCoPed she supports individuals and families through psychological and pedagogical support paths.',
        'Her work integrates the clinical and educational perspectives, with attention to paths of growth, learning and relationships.',
      ],
    },
  },
};

export function getProfessionals(locale: Locale): Record<ProfessionalId, Professional> {
  const build = (id: ProfessionalId): Professional => ({ id, ...professionalBase[id], ...professionalText[locale][id] });
  return { provini: build('provini'), coccia: build('coccia') };
}

/** Navigation entries; labels live in the i18n dictionaries (`nav.<key>`). */
export const nav = [
  { href: '/', key: 'home' },
  { href: '/chi-sono', key: 'about' },
  { href: '/servizi', key: 'services' },
  { href: '/come-funziona', key: 'how' },
  { href: '/pubblicazioni', key: 'publications' },
  { href: '/contatti', key: 'contact' },
] as const;
