// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// TODO(go-live): set to the real production domain.
export default defineConfig({
  site: 'https://www.studiopsycoped.it',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.endsWith('/interviste'), // thin until populated
      serialize(item) {
        const p = new URL(item.url).pathname;
        item.lastmod = new Date().toISOString();
        item.changefreq = 'monthly';
        item.priority = p === '/' ? 1.0 : p === '/prenota' || p === '/servizi' || p.startsWith('/servizi/') ? 0.9 : ['/privacy', '/cookie', '/note-legali'].includes(p) ? 0.2 : 0.7;
        return item;
      },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
