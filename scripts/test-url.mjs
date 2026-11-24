// Unit checks for src/utils/url.ts and src/utils/ics.ts (pure variants). Run with: npm run test:url
import assert from 'node:assert/strict';
import { joinBase, joinAsset, switchLocalePathFor, isActivePathFor, stripBase } from '../src/utils/url.ts';
import { generateBookingIcs, escapeIcsText, foldIcsLine } from '../src/utils/ics.ts';

const B = '/PsyCoPed/';
assert.equal(joinBase(B, '/'), '/PsyCoPed/');
assert.equal(joinBase(B, ''), '/PsyCoPed/');
assert.equal(joinBase(B, '/prenota'), '/PsyCoPed/prenota/');
assert.equal(joinBase(B, 'prenota//x'), '/PsyCoPed/prenota/x/');
assert.equal(joinBase(B, '/prenota?servizio=ipnosi#top'), '/PsyCoPed/prenota/?servizio=ipnosi#top');
assert.equal(joinBase(B, '/en'), '/PsyCoPed/en/');
assert.equal(joinBase(B, '/richiesta.ics'), '/PsyCoPed/richiesta.ics');
for (const ext of ['https://x.it/a', 'http://x.it', 'mailto:a@b.it', 'tel:+39', '#main', '//cdn.x/y']) assert.equal(joinBase(B, ext), ext);
assert.equal(joinBase('/', '/privacy'), '/privacy/');
assert.equal(joinBase('PsyCoPed', '/privacy'), '/PsyCoPed/privacy/');
assert.equal(joinAsset(B, '/favicon.svg'), '/PsyCoPed/favicon.svg');
assert.equal(joinAsset(B, 'og-image.png'), '/PsyCoPed/og-image.png');
assert.equal(stripBase(B, '/PsyCoPed/en/book/'), '/en/book/');
assert.equal(stripBase(B, '/PsyCoPed'), '/');

assert.equal(switchLocalePathFor(B, '/PsyCoPed/', 'en'), '/PsyCoPed/en/');
assert.equal(switchLocalePathFor(B, '/PsyCoPed/en/', 'it'), '/PsyCoPed/');
assert.equal(switchLocalePathFor(B, '/PsyCoPed/prenota/', 'en'), '/PsyCoPed/en/book/');
assert.equal(switchLocalePathFor(B, '/PsyCoPed/en/book/', 'it'), '/PsyCoPed/prenota/');
assert.equal(switchLocalePathFor(B, '/PsyCoPed/servizi/ipnosi/', 'en'), '/PsyCoPed/en/servizi/ipnosi/');
assert.equal(switchLocalePathFor('/', '/en/privacy/', 'it'), '/privacy/');

assert.equal(isActivePathFor(B, '/PsyCoPed/', '/PsyCoPed/'), true);
assert.equal(isActivePathFor(B, '/PsyCoPed/servizi/ipnosi/', '/PsyCoPed/'), false);
assert.equal(isActivePathFor(B, '/PsyCoPed/servizi/ipnosi/', '/PsyCoPed/servizi/'), true);
assert.equal(isActivePathFor(B, '/PsyCoPed/servizi', '/servizi/'), true);
assert.equal(isActivePathFor(B, '/PsyCoPed/en/', '/PsyCoPed/en/'), true);
assert.equal(isActivePathFor(B, '/PsyCoPed/en/servizi/', '/PsyCoPed/en/'), false);
assert.equal(isActivePathFor(B, '/PsyCoPed/chi-sono-altro/', '/PsyCoPed/chi-sono/'), false);

assert.equal(escapeIcsText('a,b;c\\d\ne'), 'a\\,b\\;c\\\\d\\ne');
assert.ok(foldIcsLine('x'.repeat(200)).split('\r\n').every((line) => new TextEncoder().encode(line).length <= 75));
const ics = generateBookingIcs(
  {
    date: '2026-12-10', time: '15:00', durationMinutes: 50, serviceLabel: 'Ipnosi', professionalName: 'Dott. Mirko Provini',
    formatLabel: 'In studio', location: 'Via Provinciale, 43, 21030 Cremenaga (VA)',
    labels: { summary: 'Richiesta appuntamento', pendingNotice: 'Non confermato', service: 'Servizio', professional: 'Professionista', format: 'Modalità' },
  },
  new Date('2026-11-24T10:00:00Z'),
);
for (const needle of ['BEGIN:VCALENDAR', 'END:VCALENDAR', 'BEGIN:VEVENT', 'END:VEVENT', 'DTSTART;TZID=Europe/Rome:20261210T150000', 'DTEND;TZID=Europe/Rome:20261210T155000', 'DTSTAMP:20261124T100000Z', 'STATUS:TENTATIVE', 'LOCATION:Via Provinciale\\, 43\\, 21030 Cremenaga (VA)']) {
  assert.ok(ics.includes(needle), `ICS missing ${needle}`);
}
assert.ok(ics.endsWith('\r\n') && !/[^\r]\n/.test(ics), 'ICS must use CRLF only');
console.log('url/ics checks passed.');

// Agenda: slot generation rules.
const { getAvailableSlotsForDate, parseOccupiedFeed, isClosedDate } = await import('../src/data/agenda.ts');
const now = new Date('2026-11-24T10:00:00');
const dec1 = getAvailableSlotsForDate('2026-12-01', { professional: 'provini', now }); // Tuesday
assert.ok(dec1.length > 0 && dec1.every((s) => s.professional === 'provini'), 'Tuesday has Provini slots');
assert.ok(!getAvailableSlotsForDate('2026-12-02', { professional: 'provini', now }).some((s) => s.time === '10:00'), 'occupied slot removed');
assert.deepEqual(getAvailableSlotsForDate('2026-12-27', { now }), [], 'Sunday closed / holiday closure');
assert.equal(getAvailableSlotsForDate('2026-11-25', { now }).length, 0, 'inside the minimum lead time');
assert.ok(isClosedDate('2026-12-25') && isClosedDate('2027-08-10'));
assert.ok(getAvailableSlotsForDate('2026-12-05', { professional: 'provini', format: 'studio', now }).length === 0, 'Saturday is online only');
assert.ok(getAvailableSlotsForDate('2026-12-05', { professional: 'provini', format: 'online', now }).length > 0);
const feed = parseOccupiedFeed([{ professional: 'provini', date: '2026-12-01', time: dec1[0].time }, { bad: true }]);
assert.equal(feed.length, 1, 'feed validation drops malformed entries');
assert.ok(!getAvailableSlotsForDate('2026-12-01', { professional: 'provini', now, extraOccupied: feed }).some((s) => s.time === dec1[0].time), 'feed slot merged');
console.log('agenda checks passed.');

// Root base ('/'): no double slashes, same behaviour as a sub-path.
const R = '/';
assert.equal(joinBase(R, '/'), '/');
assert.equal(joinBase(R, '/prenota'), '/prenota/');
assert.equal(joinBase(R, 'prenota//x'), '/prenota/x/');
assert.equal(joinBase(R, '/en'), '/en/');
assert.equal(joinBase(R, '/richiesta.ics'), '/richiesta.ics');
assert.equal(joinAsset(R, '/favicon.svg'), '/favicon.svg');
assert.equal(joinAsset(R, 'og-image.png'), '/og-image.png');
assert.equal(stripBase(R, '/en/book/'), '/en/book/');
assert.equal(switchLocalePathFor(R, '/', 'en'), '/en/');
assert.equal(switchLocalePathFor(R, '/en/', 'it'), '/');
assert.equal(switchLocalePathFor(R, '/prenota/', 'en'), '/en/book/');
assert.equal(isActivePathFor(R, '/', '/'), true);
assert.equal(isActivePathFor(R, '/servizi/ipnosi/', '/'), false);
assert.equal(isActivePathFor(R, '/servizi/ipnosi/', '/servizi/'), true);
console.log('root-base url checks passed.');
