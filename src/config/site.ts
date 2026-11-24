/**
 * Central site configuration. Every value marked VERIFY must be confirmed by the
 * practice before go-live (see README "Pre-launch checklist").
 */
export const site = {
  name: 'Studio PsyCoPed',
  tagline: 'Il vostro benessere psicofisico è in buone mani',
  url: 'https://www.studiopsycoped.it', // VERIFY: production domain
  locale: 'it-IT',
  address: {
    street: 'Via Provinciale, 43',
    postalCode: '21030',
    city: 'Cremenaga',
    province: 'VA',
    country: 'IT',
    full: 'Via Provinciale, 43 — 21030 Cremenaga (VA), Italia',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Via+Provinciale+43+21030+Cremenaga+VA',
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
  /** Endpoints that receive contact/booking requests (see functions/api). */
  endpoints: {
    contact: '/api/contact',
    booking: '/api/booking',
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
  bioEn?: string;
}

export const professionals: Record<ProfessionalId, Professional> = {
  provini: {
    id: 'provini',
    name: 'Dott. Mirko Provini',
    shortName: 'Mirko Provini',
    title: 'Psicologo Clinico',
    registration: 'Iscritto all’Ordine degli Psicologi della Lombardia (OPL), n. 24451',
    phone: '+39 347 521 3108',
    phoneRaw: '+393475213108',
    email: site.contact.email,
    specializations: ['Neuropsicologia', 'Pedagogia', 'Ipnosi', 'Professional Coaching'],
    bio: [
      'Psicologo Clinico (OPL n. 24451), specializzato in Neuropsicologia, Pedagogia, Ipnosi e Professional Coaching.',
      'È in possesso dell’abilitazione all’insegnamento nella scuola secondaria per Psicologia, Pedagogia e Scienze Umane e collabora a livello editoriale con la testata svizzera TXT-RSI.',
      'Nella pratica clinica unisce valutazione neuropsicologica, lavoro psicopedagogico e strumenti di ipnosi e coaching, adattando il percorso alla persona e ai suoi obiettivi.',
    ],
    bioEn:
      'Clinical Psychologist (OPL no. 24451), specialised in Neuropsychology, Pedagogy, Hypnosis and Professional Coaching. Qualified to teach Psychology, Pedagogy and Human Sciences in secondary schools, and editorial collaborator with Swiss TXT-RSI.',
  },
  coccia: {
    id: 'coccia',
    name: 'Dott.ssa Valentina Coccia',
    shortName: 'Valentina Coccia',
    title: 'Psicologo Clinico e Pedagogista Clinico',
    // VERIFY: registration number to be provided by the professional
    phone: '+39 348 032 0892',
    phoneRaw: '+393480320892',
    specializations: ['Psicologia Clinica', 'Pedagogia Clinica'],
    bio: [
      'Psicologo Clinico e Pedagogista Clinico, affianca nello Studio PsyCoPed persone e famiglie in percorsi di sostegno psicologico e pedagogico.',
      'Il suo lavoro integra la prospettiva clinica e quella educativa, con attenzione ai percorsi di crescita, apprendimento e relazione.',
    ],
  },
};

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/chi-sono', label: 'Chi siamo' },
  { href: '/servizi', label: 'Servizi' },
  { href: '/come-funziona', label: 'Come funziona' },
  { href: '/pubblicazioni', label: 'Pubblicazioni' },
  { href: '/vocal-coach', label: 'Vocal Coach' },
  { href: '/contatti', label: 'Contatti' },
] as const;
