# FrameX Studio

A cinematic, conversion-focused React website for a boutique video editing and photo post-production studio.

## Local development

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.

## Updating content

- Brand and contact details: `src/config/`
- Portfolio projects: `src/data/projects.ts`
- Services: `src/data/services.ts`
- Exactly two team profiles: `src/data/team.ts`
- FAQs: `src/data/faq.ts`
- Placeholder client feedback: `src/data/testimonials.ts`

All portfolio items are intentionally labeled **Concept / Demo Work**. Replace images and project data before presenting real client work.

## Contact form and Vercel

The frontend validates inquiries with Zod and React Hook Form. `api/contact.ts` validates again server-side, applies basic IP rate limiting, blocks a honeypot field, and sends email through Resend.

Copy `.env.example` to `.env.local` and provide:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL` using a domain verified in Resend

The current static ChatGPT Site deployment does not execute the Vercel API route. Deploy the same repository to Vercel and configure the environment variables there for live inquiry delivery.

## Launch checklist

1. Replace the placeholder email, social links, team names, and portraits.
2. Replace demo project media and keep accurate demo/client labels.
3. Configure Resend and test form delivery from production.
4. Update canonical URLs and `public/sitemap.xml` if the domain changes.
5. Have the starter privacy policy and terms reviewed for the operating jurisdiction.
6. Connect the production domain in Vercel and verify SSL/DNS.
