import { site, getProfessionals } from '../config/site';
import type { FaqItem } from '../data/faq';
import { bcp47, getDict, localePath, type Locale } from '../i18n';

const abs = (path: string) => `${site.url}${path}`;
/** Absolute URL of a localized path. */
const id = (locale: Locale, path: string) => abs(localePath(locale, path) === '/' ? '' : localePath(locale, path));
/** Language-independent entity id (the practice is one entity across locales). */
const practiceId = abs('/#practice');

export const personSchema = (key: 'provini' | 'coccia', locale: Locale) => {
  const p = getProfessionals(locale)[key];
  return {
    '@type': 'Person',
    '@id': `${id(locale, '/chi-sono')}#${key}`,
    name: p.name,
    jobTitle: p.title,
    telephone: p.phoneRaw,
    ...(p.email ? { email: p.email } : {}),
    knowsAbout: p.specializations,
    worksFor: { '@id': practiceId },
  };
};

export const practiceSchema = (locale: Locale) => ({
  '@context': 'https://schema.org',
  '@type': ['MedicalBusiness', 'Psychologist'],
  '@id': practiceId,
  name: site.name,
  url: site.url,
  image: abs('/og-image.png'),
  logo: abs('/favicon.svg'),
  description: getDict(locale).meta.practiceDescription,
  telephone: site.contact.phoneRaw,
  email: site.contact.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    postalCode: site.address.postalCode,
    addressLocality: site.address.city,
    addressRegion: site.address.province,
    addressCountry: site.address.country,
  },
  openingHoursSpecification: site.openingHours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  })),
  availableLanguage: ['it', 'en'],
  employee: [personSchema('provini', locale), personSchema('coccia', locale)],
});

export const faqSchema = (items: FaqItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export const breadcrumbSchema = (crumbs: { name: string; href: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    // Crumb hrefs are already localized by the pages.
    item: abs(c.href === '/' ? '' : c.href),
  })),
});

export const websiteSchema = (locale: Locale) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${id(locale, '/')}#website`,
  url: id(locale, '/'),
  name: site.name,
  inLanguage: bcp47[locale],
  publisher: { '@id': practiceId },
});

export const webPageSchema = (p: { type: string; url: string; name: string; description: string; locale: Locale }) => ({
  '@context': 'https://schema.org',
  '@type': p.type,
  '@id': `${p.url}#webpage`,
  url: p.url,
  name: p.name,
  description: p.description,
  inLanguage: bcp47[p.locale],
  isPartOf: { '@id': `${id(p.locale, '/')}#website` },
  about: { '@id': practiceId },
});

export const serviceSchema = (s: { title: string; description: string; slug: string }, locale: Locale) => {
  const m = getDict(locale).meta;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title,
    description: s.description,
    url: id(locale, `/servizi/${s.slug}`),
    serviceType: s.title,
    provider: { '@id': practiceId },
    areaServed: [
      { '@type': 'Place', name: 'Cremenaga (VA)' },
      { '@type': 'Place', name: m.areaProvince },
      { '@type': 'Place', name: m.areaOnline },
    ],
  };
};
