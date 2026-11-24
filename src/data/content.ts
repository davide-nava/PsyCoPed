/**
 * Editorial content migrated from the legacy Jimdo / Wix sites.
 * Items flagged VERIFY must be completed or confirmed by the practice
 * (the legacy sites only provide section titles for several of them).
 */

export interface ContentItem {
  title: string;
  description?: string;
  year?: string;
  url?: string;
}

// VERIFY: complete from the legacy "Pubblicazioni & Progetti" pages.
export const publications: ContentItem[] = [
  {
    title: 'Collaborazione editoriale con TXT-RSI (Svizzera)',
    description: 'Contributi editoriali di carattere psicologico e pedagogico.',
  },
];

// VERIFY: add interview titles, outlets, dates and links from the legacy sites.
export const interviews: ContentItem[] = [];

// VERIFY: complete from the legacy Jimdo site ("Discografia", "Progetti Musicali", "Video").
export const discography: ContentItem[] = [];
export const musicProjects: ContentItem[] = [];
export const videos: { title: string; youtubeId: string }[] = [];

export const artisticBioEn =
  'Mirko Provini is also active as a vocal coach and in the artistic field. His artistic biography, discography, videos and music projects are being migrated from the original website.';
