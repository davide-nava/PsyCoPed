// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const siteUrl = (process.env.PUBLIC_SITE_URL || 'https://www.studiopsycoped.com').replace(/\/+$/, '');
const rawBase = process.env.PUBLIC_BASE_PATH || '/';
const normalizedBase = `/${rawBase.replace(/^\/+|\/+$/g, '')}/`.replace(/^\/\/$/, '/');
const rootUrl = `${siteUrl}${normalizedBase}`;

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  base: normalizedBase,
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'it',
        locales: {
          it: 'it-IT',
          en: 'en-US',
        },
      },
      serialize(item) {
        const { url } = item;

        if (url === rootUrl || url === `${rootUrl}en/`) {
          return {
            ...item,
            priority: 1.0,
          };
        }

        if (
          /\/(servizi|chi-siamo|chi-sono|prenota|contatti|faq|services|about|book|contact)\/$/.test(url)
        ) {
          return {
            ...item,
            priority: 0.9,
          };
        }

        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
