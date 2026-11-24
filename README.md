# Studio PsyCoPed — sito unificato

Astro 7 + TypeScript + Tailwind CSS 4. Static output, vanilla-TS interactive islands (no framework runtime), bilingual site (Italian default at `/`, English at `/en`), English code.

```bash
npm install
npm run dev      # http://localhost:4321
npm run check    # type check
npm run build    # static site in dist/
```

## Structure

| Path | Purpose |
|---|---|
| `src/i18n/` | UI dictionaries (`it.ts` is the source of truth, `en.ts` is typed against it), locale helpers (`localePath`, `i18n(Astro)`) |
| `src/config/site.ts` | Address, contacts, professionals, nav, opening hours, endpoints |
| `src/data/` | Services, FAQ, publications/artistic content |
| `src/data/agenda.ts` | Professionals, schedule, holidays, occupied slots, `getAvailableSlotsForDate()` (optional runtime feed via `PUBLIC_AGENDA_FEED_URL`) |
| `src/utils/url.ts`, `src/utils/ics.ts` | Base-path/locale URL helpers; RFC 5545 `.ics` booking reminder |
| `src/lib/validation.ts` | Validation shared by browser and server |
| `src/lib/schema.ts` | JSON-LD: `MedicalBusiness`/`Psychologist`, `Person`, `FAQPage`, `BreadcrumbList` |
| `src/lib/submit.ts` | Browser POST helper with timeout for optional external endpoints |
| `src/components/BookingWidget.astro` | 5-step booking flow (`/prenota`) |
| `src/components/ContactForm.astro` | Accessible contact form (`/contatti`) |
| `src/components/CookieBanner.astro` | Granular consent; emits `psycoped:consent` on `window` |

Every route also exists under `/en` (pages live in `src/pages/[...lang]/`; slugs are shared between languages). The header switcher links to the same page in the other language. To add copy, add the key to `it.ts` and `en.ts`; `npm run test:i18n` (run in CI) and `npm run check` fail if the two diverge. Long legal pages (privacy, cookie, note legali) and a few rich-text paragraphs are written inline per language in the page files.

Routes: `/`, `/chi-sono`, `/servizi`, `/servizi/[slug]`, `/come-funziona`, `/prenota`, `/contatti`, `/pubblicazioni`, `/interviste`, `/vocal-coach`, `/privacy`, `/cookie`, `/note-legali`.

## Connecting the backends

- **Forms (static hosting, no server):** optionally set `PUBLIC_CONTACT_ENDPOINT` / `PUBLIC_BOOKING_ENDPOINT` (Formspree, Web3Forms, webhook) at build time, see `.env.example`. Without an endpoint, or if it fails, the UI shows a fallback card (mailto, copyable summary, PEC, phone/WhatsApp). Never put secrets in `PUBLIC_*` variables; use the provider's anti-spam/CAPTCHA.
- **Agenda:** return an `AvailabilityMap` (`{ professionalId: { 'YYYY-MM-DD': ['HH:MM'] } }`) from a real provider at build time, or fetch it client-side in `BookingWidget.astro`.
- **Angular alternative:** `validation.ts`, `agenda.ts`, `submit.ts` and the data files are framework-free; port the two `<script>` blocks to Angular components (signals + reactive forms) and keep the rest of the site in Astro.

## Pre-launch checklist (to verify / complete)

1. Production domain (`astro.config.mjs`, `site.ts`, `robots.txt`).
2. **Partita IVA, codice fiscale**, fee schedule, professional liability insurance (`site.ts`, `/note-legali`).
3. Dott.ssa Coccia's Albo registration number and bio details (only title and phone were available).
4. Opening hours, session durations, cancellation policy (24 h is a sample), real availability.
5. Legacy content still to migrate: publications, interviews, Vocal Coach bio (ENG), videos, discography, music projects (`src/data/content.ts`). The legacy sites were not scraped; content came from the project brief.
6. Privacy / Cookie / Note legali are **drafts**: have them reviewed by legal counsel / DPO; list actual processors; remove `DraftBanner`.
7. Telepsychology consent wording and the video-call provider.
8. Add real photos, OG image, and test with a screen reader and Lighthouse.
