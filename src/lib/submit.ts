/** Browser helper that POSTs JSON to a serverless endpoint. */
export async function postJson(url: string, body: unknown): Promise<{ ok: boolean; message?: string }> {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) return { ok: false };
    return { ok: true, ...(await res.json().catch(() => ({}))) };
  } catch {
    return { ok: false };
  }
}

export const mailtoHref = (to: string, subject: string, body: string) =>
  `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
