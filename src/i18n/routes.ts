import type { Locale } from './index';

/**
 * Routes whose slug differs between languages. Every other page uses the same slug
 * in both languages (English pages live under `/en/`).
 */
export const localizedRoutes: readonly Record<Locale, string>[] = [{ it: '/prenota', en: '/book' }];
