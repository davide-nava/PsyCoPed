/**
 * URL helpers for a site deployed under a sub-path (GitHub Pages: `/PsyCoPed/`).
 * Every internal link and public asset must go through these helpers.
 */
import { localizedRoutes } from '../i18n/routes.ts';

export type UrlLocale = 'it' | 'en';

const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i;
const FILE_EXTENSION = /\.[a-z0-9]{1,8}$/i;

/** Base path with a leading and a trailing slash (`/` when the site lives at the domain root). */
export function normalizeBase(base: string | undefined): string {
  const trimmed = (base ?? '/').replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}/` : '/';
}

const currentBase = () => normalizeBase(import.meta.env.BASE_URL);

/** Split `path?query#hash` into its three parts (query and hash keep their delimiter). */
function splitUrl(url: string): { pathname: string; query: string; hash: string } {
  const hashIndex = url.indexOf('#');
  const hash = hashIndex >= 0 ? url.slice(hashIndex) : '';
  const rest = hashIndex >= 0 ? url.slice(0, hashIndex) : url;
  const queryIndex = rest.indexOf('?');
  return {
    pathname: queryIndex >= 0 ? rest.slice(0, queryIndex) : rest,
    query: queryIndex >= 0 ? rest.slice(queryIndex) : '',
    hash,
  };
}

/** `/a//b` -> `/a/b`, always with a leading slash. */
const cleanPath = (pathname: string) => `/${pathname.replace(/\/{2,}/g, '/').replace(/^\/+/, '')}`;

/** Pure version of {@link withBase}; `base` is injected so it can be unit-tested. */
export function joinBase(base: string, path: string = '/'): string {
  if (EXTERNAL.test(path)) return path;
  const { pathname, query, hash } = splitUrl(path || '/');
  let clean = cleanPath(pathname);
  // Internal pages always end with a slash (`trailingSlash: 'always'`); files (.ics, .png) do not.
  if (!clean.endsWith('/') && !FILE_EXTENSION.test(clean)) clean += '/';
  const normalizedBase = normalizeBase(base);
  return `${normalizedBase}${clean.slice(1)}${query}${hash}`;
}

/** Prefix an internal path with `import.meta.env.BASE_URL`; external URLs and anchors are untouched. */
export const withBase = (path: string = '/'): string => joinBase(currentBase(), path);

/** Prefix a file from `public/` with the base path, without forcing a trailing slash. */
export function joinAsset(base: string, assetPath: string): string {
  if (EXTERNAL.test(assetPath)) return assetPath;
  return `${normalizeBase(base)}${assetPath.replace(/^\/+/, '')}`;
}
export const publicAsset = (assetPath: string): string => joinAsset(currentBase(), assetPath);

/** Remove the base prefix from a pathname (`/PsyCoPed/en/book/` -> `/en/book/`). */
export function stripBase(base: string, pathname: string): string {
  const normalizedBase = normalizeBase(base);
  const clean = cleanPath(pathname);
  if (normalizedBase === '/') return clean;
  if (clean === normalizedBase.slice(0, -1)) return '/';
  return clean.startsWith(normalizedBase) ? `/${clean.slice(normalizedBase.length)}` : clean;
}

/** Locale-less, slash-normalised pathname without trailing slash (`/` for the home page). */
function trimSlash(pathname: string): string {
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
}

function splitLocale(pathname: string): { locale: UrlLocale; rest: string } {
  const trimmed = trimSlash(pathname);
  if (trimmed === '/en') return { locale: 'en', rest: '/' };
  if (trimmed.startsWith('/en/')) return { locale: 'en', rest: trimmed.slice(3) };
  return { locale: 'it', rest: trimmed };
}

/** Translate a locale-less route between languages using `src/i18n/routes.ts`. */
export function translateRoute(rest: string, from: UrlLocale, to: UrlLocale): string {
  for (const route of localizedRoutes) {
    if (route[from] === rest) return route[to];
  }
  return rest;
}

/** Pure version of {@link switchLocalePath}. */
export function switchLocalePathFor(base: string, currentPathname: string, targetLocale: UrlLocale): string {
  const { locale, rest } = splitLocale(stripBase(base, currentPathname));
  const translated = translateRoute(rest, locale, targetLocale);
  const localized = targetLocale === 'en' ? (translated === '/' ? '/en' : `/en${translated}`) : translated;
  return joinBase(base, localized);
}

/** Same page in the other language, base path included. */
export const switchLocalePath = (currentPathname: string, targetLocale: UrlLocale): string =>
  switchLocalePathFor(currentBase(), currentPathname, targetLocale);

/** Pure version of {@link isActivePath}. */
export function isActivePathFor(base: string, currentPathname: string, targetPath: string): boolean {
  const current = trimSlash(stripBase(base, splitUrl(currentPathname).pathname));
  const target = trimSlash(stripBase(base, splitUrl(targetPath).pathname));
  if (target === '/' || target === '/en') return current === target;
  return current === target || current.startsWith(`${target}/`);
}

/** True when `targetPath` is the current page or one of its ancestors (home matches only itself). */
export const isActivePath = (currentPathname: string, targetPath: string): boolean =>
  isActivePathFor(currentBase(), currentPathname, targetPath);
