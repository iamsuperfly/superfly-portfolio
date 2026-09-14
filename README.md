# Superfly Portfolio

Live site: [https://iamsuperflly.vercel.app](https://iamsuperflly.vercel.app)

A personal builder portfolio. Next.js App Router, JavaScript, Supabase project CMS, Vercel.

## Sections

- **Navbar** — sticky text wordmark, not the portrait
- **Hero** — separate wordmark, portrait, and name
- **Projects** — screenshots, stack tags, GitHub and live links
- **About** — what Superfly actually ships
- **Contact** — email plus Lucide-style X, GitHub, and Mail icons

## Managing projects

Projects are stored in Supabase. Do not edit inventory in source.

1. Add the variables from `.env.example` locally or on Vercel.
2. For a new Supabase project, run `supabase/schema.sql`. For an existing project, run `supabase/migrations/202608180001_project_cms_gallery.sql`.
3. Run `supabase/seed.sql` to keep the RepSolana row.
4. Create a Supabase Auth user and add that UUID to `public.admin_users`.
5. Use `/admin` to create, edit, publish, highlight, reorder, and delete projects.

Public pages read published projects with the anon key. Admin writes use the signed-in session plus RLS. No service-role key.

On small screens the highlight track is swipeable. Motion pauses on touch and respects `prefers-reduced-motion`.

## Asset paths

| Asset | Directory |
|---|---|
| Portrait (not the logo) | `public/images/branding/` |
| Project screenshots | `public/images/projects/` |
| Slides | `public/images/slides/` |

Contact icons are inline Lucide paths in `components/icons.js`. Do not add downloaded PNG filenames back.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Push to GitHub and let Vercel build with `next build`.
