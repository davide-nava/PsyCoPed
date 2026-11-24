import { it } from './it';
import { en } from './en';
import type { Dict } from './it';

export const locales = ['it', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'it';

/** BCP-47 tags used for `lang`, `hreflang`, JSON-LD and date formatting. */
export const bcp47: Record<Locale, string> = { it: 'it-IT', en: 'en-GB' };
export const ogLocale: Record<Locale, string> = { it: 'it_IT', en: 'en_GB' };

const dictionaries: Record<Locale, Dict> = { it, en };
export const getDict = (locale: Locale): Dict => dictionaries[locale];

/** Locale from the `[...lang]` route param (undefined = default locale, served without prefix). */
export const getLocale = (astro: { params: Record<string, string | undefined> }): Locale =>
  astro.params.lang === 'en' ? 'en' : defaultLocale;

/** Prefix an internal path with the locale (the default locale has no prefix). */
export function localePath(locale: Locale, path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  if (locale === defaultLocale) return p;
  if (p === '/') return `/${locale}`;
  return `/${locale}${p}`;
}

/** Remove the locale prefix from a pathname. */
export function stripLocale(pathname: string): string {
  const m = pathname.match(/^\/(it|en)(?=\/|$)/);
  if (!m) return pathname || '/';
  return pathname.slice(m[0].length) || '/';
}

/** Params for `getStaticPaths` in pages living under `src/pages/[...lang]/`. */
export const getLocaleStaticPaths = () =>
  locales.map((l) => ({ params: { lang: l === defaultLocale ? undefined : l } }));

/** Helper for `.astro` files: `const { locale, t, l } = i18n(Astro)`. */
export function i18n(astro: { params: Record<string, string | undefined> }) {
  const locale = getLocale(astro);
  return { locale, t: getDict(locale), l: (path: string) => localePath(locale, path) };
}
