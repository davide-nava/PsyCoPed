/**
 * Framework-neutral request handling for the contact and booking endpoints.
 * Uses only Web-standard Request/Response, so it runs unchanged on Cloudflare
 * Pages Functions, Netlify (edge), Vercel (edge) or Astro API routes.
 */
import { it } from '../i18n/it';
import { en } from '../i18n/en';
import { validateBooking, validateContact, type BookingPayload, type ContactPayload } from './validation';

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });

type Kind = 'contact' | 'booking';

/**
 * Integration point — deliver the validated message.
 * TODO(go-live): send an email via a transactional provider (e.g. Resend, Postmark, SMTP relay)
 * and/or create the event in the calendar backend (Cal.com API, Google Calendar).
 * Do NOT log personal data in production.
 */
async function deliver(kind: Kind, payload: ContactPayload | BookingPayload, env: Record<string, string | undefined>) {
  if (!env.NOTIFY_WEBHOOK_URL) return; // stub: no destination configured
  await fetch(env.NOTIFY_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kind, payload }),
  });
}

export async function handleSubmission(request: Request, kind: Kind, env: Record<string, string | undefined> = {}) {
  if (request.method !== 'POST') return json({ ok: false, error: 'method_not_allowed' }, 405);
  if (!(request.headers.get('content-type') ?? '').includes('application/json')) return json({ ok: false, error: 'bad_content_type' }, 415);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }

  if (typeof body.website === 'string' && body.website) return json({ ok: true }); // honeypot: silently drop

  const messages = (body.locale === 'en' ? en : it).validation;
  const errors =
    kind === 'contact'
      ? validateContact(body as Partial<ContactPayload>, messages)
      : validateBooking(body as Partial<BookingPayload>, messages);
  if (Object.keys(errors).length) return json({ ok: false, errors }, 422);

  try {
    await deliver(kind, body as unknown as ContactPayload | BookingPayload, env);
  } catch {
    return json({ ok: false, error: 'delivery_failed' }, 502);
  }
  return json({ ok: true });
}
