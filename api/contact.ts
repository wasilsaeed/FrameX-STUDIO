import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  company: z.string().max(120).optional(),
  service: z.string().min(1).max(100),
  projectType: z.string().max(120).optional(),
  description: z.string().min(20).max(5000),
  budget: z.string().max(120).optional(),
  deadline: z.string().max(60).optional(),
  reference: z.union([z.literal(''), z.string().url().max(500)]).optional(),
  contactMethod: z.string().max(60).optional(),
  website: z.string().max(0).optional(),
});

const attempts = new Map<string, { count: number; reset: number }>();

function clean(value?: string) {
  return (value || '').replace(/[<>]/g, '').trim();
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed.' });
  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0];
  const now = Date.now();
  const record = attempts.get(ip);
  if (record && record.reset > now && record.count >= 5) return res.status(429).json({ message: 'Too many requests. Please try again later.' });
  attempts.set(ip, !record || record.reset <= now ? { count: 1, reset: now + 60 * 60 * 1000 } : { ...record, count: record.count + 1 });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success || parsed.data.website) return res.status(400).json({ message: 'Please check the form and try again.' });
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return res.status(503).json({ message: 'Email delivery is not configured yet. Please contact us by email.' });

  const data = parsed.data;
  const lines = [
    `Name: ${clean(data.name)}`,
    `Email: ${clean(data.email)}`,
    `Company: ${clean(data.company) || '—'}`,
    `Service: ${clean(data.service)}`,
    `Project type: ${clean(data.projectType) || '—'}`,
    `Budget: ${clean(data.budget) || '—'}`,
    `Deadline: ${clean(data.deadline) || '—'}`,
    `Reference: ${clean(data.reference) || '—'}`,
    `Contact preference: ${clean(data.contactMethod) || '—'}`,
    '', 'Project description:', clean(data.description),
  ];
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], reply_to: data.email, subject: `New FrameX inquiry — ${clean(data.service)}`, text: lines.join('\n') }),
  });
  if (!response.ok) return res.status(502).json({ message: 'Email delivery failed. Please try again or email us directly.' });
  return res.status(200).json({ message: 'Inquiry sent.' });
}
