// Cloudflare Pages Function: POST /api/contact
import { handleSubmission } from '../../src/lib/server';

export const onRequest = ({ request, env }: { request: Request; env: Record<string, string | undefined> }) =>
  handleSubmission(request, 'contact', env);
