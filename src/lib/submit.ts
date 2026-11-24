export interface SubmitResult {
  ok: boolean;
  /** Why the submission did not complete (used to pick the fallback message). */
  reason?: 'no-endpoint' | 'timeout' | 'network' | 'rejected';
}

export interface SubmitOptions {
  /** `json` (default) or `form` (multipart FormData, e.g. Web3Forms / Formspree HTML mode). */
  format?: 'json' | 'form';
  timeoutMs?: number;
}

/**
 * POST a payload to an optional external endpoint (Formspree, Web3Forms, webhook).
 * The site is static, so an empty endpoint is a normal state, not an error: the caller
 * then shows the mailto/contact fallback. Nothing is stored locally.
 */
export async function submitToEndpoint(
  endpoint: string,
  payload: Record<string, unknown>,
  { format = 'json', timeoutMs = 8000 }: SubmitOptions = {},
): Promise<SubmitResult> {
  if (!endpoint) return { ok: false, reason: 'no-endpoint' };
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    let body: BodyInit;
    const headers: Record<string, string> = { Accept: 'application/json' };
    if (format === 'form') {
      const data = new FormData();
      for (const [key, value] of Object.entries(payload)) data.append(key, String(value ?? ''));
      body = data;
    } else {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(payload);
    }
    const res = await fetch(endpoint, { method: 'POST', headers, body, signal: controller.signal });
    return res.ok ? { ok: true } : { ok: false, reason: 'rejected' };
  } catch (error) {
    return { ok: false, reason: (error as { name?: string })?.name === 'AbortError' ? 'timeout' : 'network' };
  } finally {
    clearTimeout(timer);
  }
}

export const mailtoHref = (to: string, subject: string, body: string) =>
  `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
