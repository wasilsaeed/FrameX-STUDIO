# FrameX Studio

A cinematic, conversion-focused React website for a boutique video editing and photo post-production studio.

## Local development

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.

Run only one dependency installation at a time. After cloning, `npm ci` installs
the exact versions in `package-lock.json`; stop the dev server before using it
to replace an interrupted installation. Once installed, use `npm run dev` without
reinstalling on each start.

## Browser regression check

`node tests/browser-smoke.mjs http://localhost:5173` checks navigation, portfolio
filtering, mobile navigation, and form validation, and fails on React errors.
It requires an isolated Chrome instance launched with `--remote-debugging-port=9224`
and its own temporary `--user-data-dir`. The same check can target a production
preview on port 4173. It covers the scroll effect cleanup regression: never return
the result of `window.scrollTo` from a React effect, since it can be a Promise.

Use `--audit` for all-page layout checks at 320, 390, 768, and 1440px, consistent
48px buttons, image loading, FAQ behavior, project-slider and service-tab keyboard controls, service prefill,
and reduced-motion preferences. Inquiry success/failure UI checks use mock
responses; they do not verify live email delivery. `--screenshots` captures
desktop and phone previews. Run browser checks sequentially so background tab
animation throttling does not invalidate visual checks.

## Design and conversion flow

The homepage presents a branded finishing-suite hero, a six-concept horizontal
project rail, interactive Edit / Retouch / Finish service tabs, a concise three-step
workflow, and verified client feedback when available. The project rail supports
swiping, horizontal scrolling, arrow buttons, and keyboard navigation; it does not
auto-advance. “View all work” still links to the unchanged Work page.
Work retains all twelve concepts; supporting pages keep details behind closed
accordions where useful. The header has Work, Services, Studio, and one project
action. Team is also a primary navigation link; FAQ remains in the footer.

`clientTestimonials` in `src/data/testimonials.ts` accepts genuine approved
feedback. Until verified records are supplied, the homepage shows “Verified reviews
coming soon,” not invented praise, names, or ratings. The Team page describes exactly
two roles: Editor and Client & Operations Lead. No unconfirmed personal identities
are presented as staff.

Shared controls use one 48px/10px-radius button system. `index.css` owns design
tokens and shared primitives; `editorial.css`, `chrome.css`, `secondary.css`, and
`portfolio.css` each own their respective layouts. `contact.css` contains the branded
intake presentation. Motion includes page entrances, scroll reveals, a restrained
hero parallax, portfolio filter transitions, hover feedback, and FAQ expansion.
The system honors reduced-motion preferences; mobile menus support keyboard
focus, Escape, and scroll locking.

## Updating content

- Brand and contact details: `src/config/`
- Portfolio projects: `src/data/projects.ts`
- Services: `src/data/services.ts`
- Exactly two team profiles: `src/data/team.ts`
- FAQs: `src/data/faq.ts`
- Placeholder client feedback: `src/data/testimonials.ts`

All portfolio items are intentionally labeled **Concept / Demo Work**. Replace images and project data before presenting real client work.

## Artwork and local media

The redesigned site serves its photography from `public/media/` for reliable,
fast page loads. `scripts/download-media.mjs` records the stock reference sources.
The cinematic automotive hero at `public/media/midnight-drive.jpg` was created
with the built-in image generation tool. Its full creative prompt and provenance
are saved in `public/media/hero-artwork.json`. It is illustrative concept artwork.
Interactive color comparisons use one photo with explicitly labeled CSS color
treatments; they are not presented as completed client retouching.

## Contact form and Vercel

The frontend validates inquiries with Zod and React Hook Form. `api/contact.ts` validates again server-side, applies basic IP rate limiting, blocks a honeypot field, and sends email through Resend.

Copy `.env.example` to `.env.local` and provide:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL` using a domain verified in Resend

The current static ChatGPT Site deployment does not execute the Vercel API route.
Live delivery is **not configured**. Hosting the handler on the current Sites host
requires a supported Worker/Vinext migration plus runtime email configuration;
alternatively, Vercel can execute the existing handler with those environment variables.
The UI shows “Your query has been submitted successfully” only after the endpoint
confirms acceptance. HTML fallbacks and delivery errors are not treated as success,
and failed requests preserve the brief. Never expose provider keys in client code.

`node --experimental-strip-types tests/contact-api.mjs` checks the email handler
with a mocked provider. Browser form tests also use mock responses; neither test
sends email or proves production delivery.

## Launch checklist

1. Supply real contact details, team names/photos if desired, and approved client reviews.
2. Replace demo project media and keep accurate demo/client labels.
3. Configure Resend and test form delivery from production.
4. Update canonical URLs and `public/sitemap.xml` if the domain changes.
5. Have the starter privacy policy and terms reviewed for the operating jurisdiction.
6. If adding a custom domain or changing host, verify its production configuration.
