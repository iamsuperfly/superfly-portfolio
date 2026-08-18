# Superfly Portfolio

A minimal, premium personal portfolio built with Next.js (App Router, JavaScript) and designed for Vercel deployment.

## Sections

- **Navbar** — sticky top bar with smooth scroll links to each section
- **Hero** — brand lockup, headline, and CTA buttons
- **Projects** — responsive card grid with tags and links
- **About** — bio copy and specialization details
- **Contact** — email link and social channel icons

## Managing projects

Projects are stored in Supabase instead of being edited in the source code.

1. Add the variables from `.env.example` to your local environment or Vercel.
2. For a new Supabase project, run `supabase/schema.sql` in the Supabase SQL editor. For an existing project, run `supabase/migrations/202608180001_project_cms_gallery.sql` instead. The migration is idempotent and preserves existing project rows.
3. Run `supabase/seed.sql` to preserve the existing RepSolana project.
4. Create an email/password user in Supabase Auth, then add that user's UUID to `public.admin_users` using the commented SQL in `supabase/seed.sql`.
5. Visit `/admin` to create, edit, publish, highlight, reorder, and delete projects.

The CMS migration adds the nullable `projects.extended_description` field, creates the `project_gallery_items` table and its `projects` foreign-key relationship, configures the `project-images` storage bucket and RLS policies, and reloads the PostgREST schema cache. Existing projects remain valid with a null extended description and no gallery rows.

The public site reads published projects with the Supabase anonymous/publishable key. Admin writes use the signed-in user's session and are protected by server-side authorization checks plus Row Level Security. No service-role key is required by this architecture.

On smaller screens, project cards use a manually scrollable track with slow automatic motion. The motion pauses for interaction and respects `prefers-reduced-motion`.

## Asset upload paths

| Asset | Directory |
|---|---|
| Brand logo / profile photo | `public/images/branding/` |
| Social / contact icons (X, GitHub, Email) | `public/images/icons/` |
| Project screenshots | `public/images/projects/` |
| Slides / deck previews | `public/images/slides/` |

## Run locally

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import the repo in Vercel.
3. Use default build settings (`next build`).
