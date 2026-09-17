# Portfolio

Next.js 15 (App Router) + Tailwind v4 + Framer Motion + Lenis.

## Run it

```bash
npm install
cp .env.example .env.local   # only needed for the contact form
npm run dev
```

Open http://localhost:3000

## Routes

| Route | What it is |
| --- | --- |
| `/` | Hero, selected work, capabilities, experience, quote, contact band |
| `/projects` | All seven projects, filterable by category |
| `/projects/[slug]` | Case studies: MOH platform, Note-App pipeline, ZK voting, EventNet |
| `/about` | Long-form about, education, experience, achievements, certifications |
| `/contact` | Email, phone, links, and a form that posts to `/api/contact` |

## Still to add

- `public/cv.pdf` for the CV download links
- Project cover images in `public/`, replacing the placeholder boxes in
  `ProjectCard.tsx`, `SelectedWork.tsx` and the case study template
- Certificate URLs in `app/about/page.tsx`
- SMTP credentials in `.env.local` for the contact form

## Where things live

- Colour, type and motion tokens: `app/globals.css` and `lib/motion.ts`
- All project content: `lib/projects.ts`
- Contact delivery: `app/api/contact/route.ts` (honeypot + 5 messages per hour per IP)

## Deployment

See `deploy/README.md`. Push to `main` builds an image, pushes it to GHCR and
restarts the container on the Azure VM behind nginx.
