import { site, professionals } from '../config/site';
import type { FaqItem } from '../data/faq';

const id = (path: string) => `${site.url}${path}`;

export const personSchema = (key: 'provini' | 'coccia') => {
  const p = professionals[key];
  return {
    '@type': 'Person',
    '@id': id(`/chi-sono#${key}`),
    name: p.name,
    jobTitle: p.title,
    telephone: p.phoneRaw,
    ...(p.email ? { email: p.email } : {}),
    knowsAbout: p.specializations,
    worksFor: { '@id': id('/#practice') },
  };
};

export const practiceSchema = () => ({
  '@context': 'https://schema.org',
  '@type': ['MedicalBusiness', 'Psychologist'],
  '@id': id('/#practice'),
  name: site.name,
  url: site.url,
  image: id('/og-image.png'),
  logo: id('/favicon.svg'),
  description:
    'Studio di psicologia clinica, neuropsicologia, pedagogia, ipnosi e professional coaching a Cremenaga (VA). Consulenze in studio e online.',
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
  employee: [personSchema('provini'), personSchema('coccia')],
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
    item: id(c.href === '/' ? '' : c.href),
  })),
});

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': id('/#website'),
  url: site.url,
  name: site.name,
  inLanguage: 'it-IT',
  publisher: { '@id': id('/#practice') },
});

export const webPageSchema = (p: { type: string; url: string; name: string; description: string }) => ({
  '@context': 'https://schema.org',
  '@type': p.type,
  '@id': `${p.url}#webpage`,
  url: p.url,
  name: p.name,
  description: p.description,
  inLanguage: 'it-IT',
  isPartOf: { '@id': id('/#website') },
  about: { '@id': id('/#practice') },
});

export const serviceSchema = (s: { title: string; description: string; slug: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: s.title,
  description: s.description,
  url: id(`/servizi/${s.slug}`),
  serviceType: s.title,
  provider: { '@id': id('/#practice') },
  areaServed: [
    { '@type': 'Place', name: 'Cremenaga (VA)' },
    { '@type': 'Place', name: 'Provincia di Varese' },
    { '@type': 'Place', name: 'Online (Italia)' },
  ],
});
