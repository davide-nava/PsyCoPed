/**
 * Editorial content migrated from the legacy Jimdo / Wix sites.
 * Items flagged VERIFY must be completed or confirmed by the practice
 * (the legacy sites only provide section titles for several of them).
 */
import type { Locale } from '../i18n';

export interface ContentItem {
  title: string;
  description?: string;
  year?: string;
  url?: string;
}

// VERIFY: complete from the legacy "Pubblicazioni & Progetti" pages.
const publicationsText: Record<Locale, ContentItem[]> = {
  it: [
    {
      title: 'Collaborazione editoriale con TXT-RSI (Svizzera)',
      description: 'Contributi editoriali di carattere psicologico e pedagogico.',
    },
  ],
  en: [
    {
      title: 'Editorial collaboration with TXT-RSI (Switzerland)',
      description: 'Editorial contributions on psychological and pedagogical topics.',
    },
  ],
};
export const getPublications = (locale: Locale): ContentItem[] => publicationsText[locale];

// VERIFY: add interview titles, outlets, dates and links from the legacy sites.
export const interviews: ContentItem[] = [];

// VERIFY: complete from the legacy Jimdo site ("Discografia", "Progetti Musicali", "Video").
export const discography: ContentItem[] = [];
export const musicProjects: ContentItem[] = [];
export const videos: { title: string; youtubeId: string }[] = [];
