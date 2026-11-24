import { it } from './it';
import { en } from './en';
import type { Dict } from './it';
import { stripBase, translateRoute, withBase } from '../utils/url';

export const locales = ['it', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'it';

/** BCP-47 tags used for `lang`, `hreflang`, JSON-LD and date formatting. */
export const bcp47: Record<Locale, string> = { it: 'it-IT', en: 'en-GB' };
export const ogLocale: Record<Locale, string> = { it: 'it_IT', en: 'en_GB' };

const dictionaries: Record<Locale, Dict> = { it, en };
export const getDict = (locale: Locale): Dict => dictionaries[locale];

/** Locale from the route param (`[...lang]` pages) or, for dedicated pages such as `/en/book/`, from the URL. */
export const getLocale = (astro: { params: Record<string, string | undefined>; url?: URL }): Locale => {
  if (astro.params.lang === 'en') return 'en';
  if (astro.url && /^\/en(\/|$)/.test(stripBase(import.meta.env.BASE_URL, astro.url.pathname))) return 'en';
  return defaultLocale;
};

/** Locale-prefixed, route-translated path WITHOUT the base path (the default locale has no prefix). */
export function localePath(locale: Locale, path: string): string {
  const suffixAt = path.search(/[?#]/);
  const suffix = suffixAt >= 0 ? path.slice(suffixAt) : '';
  const bare = suffixAt >= 0 ? path.slice(0, suffixAt) : path;
  const p = translateRoute(bare.startsWith('/') ? bare : `/${bare}`, defaultLocale, locale);
  if (locale === defaultLocale) return p + suffix;
  return (p === '/' ? `/${locale}` : `/${locale}${p}`) + suffix;
}

/** Remove the locale prefix from a pathname and map the route back to the Italian slug. */
export function stripLocale(pathname: string): string {
  const m = pathname.match(/^\/(it|en)(?=\/|$)/);
  if (!m) return pathname || '/';
  const rest = pathname.slice(m[0].length) || '/';
  return translateRoute(rest, m[1] as Locale, defaultLocale);
}

/** Params for `getStaticPaths` in pages living under `src/pages/[...lang]/`. */
export const getLocaleStaticPaths = () =>
  locales.map((l) => ({ params: { lang: l === defaultLocale ? undefined : l } }));

/** Helper for `.astro` files: `const { locale, t, l } = i18n(Astro)`; `l()` returns a link that includes the base path. */
export function i18n(astro: { params: Record<string, string | undefined>; url?: URL }) {
  const locale = getLocale(astro);
  return { locale, t: getDict(locale), l: (path: string) => withBase(localePath(locale, path)) };
}
