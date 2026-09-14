# Portfolio visual pass — work log

## Summary
Separated the text wordmark from the portrait, rewrote hero/about/projects copy so they name shipped work, replaced downloaded PNG social icons with Lucide-path SVGs, overlaid Emma Gentle / RepSolana case copy without touching Supabase rows, and forced catalogue cards to keep GitHub and live links on mobile.

## Architecture check
Unchanged: Next.js App Router, Supabase project CMS, `/admin`, publish/reorder, env contract, Vercel setup. `lib/projects.js`, `app/admin/actions.js`, middleware, schema, and package.json were not edited.

## Skills used
| Skill / source | URL | How applied |
|---|---|---|
| Taste Skill | https://github.com/Leonxlnx/taste-skill | Anti-slop: kill fused pfp lockup and generic hero |
| Impeccable | https://github.com/pbakaus/impeccable | Contrast, type scale, no beige italic |
| Emil Kowalski | https://github.com/emilkowalski/skill | Track motion left in place; reduced-motion overlay |
| DESIGN.md spec | https://github.com/google-labs-code/design.md | Project-specific DESIGN.md |
| Lucide | https://lucide.dev/icons | X, GitHub, Mail as inline paths |
| Playwright | https://playwright.dev | Not added as a pipeline dependency |
| Aura / React Bits | — | none |

## Files changed
`components/HeroSection.js`, `components/AboutSection.js`, `components/ContactSection.js`, `components/ProjectCard.js`, `components/ProjectsSection.js`, `components/icons.js`, `app/projects/page.js`, `app/projects/[slug]/page.js`, `lib/caseNotes.js`, `app/portfolio.css`, `app/layout.js`, README.md, DESIGN.md, PRODUCT.md, this log.
Navbar stays a text wordmark. Admin pipeline untouched.

## Copy rewritten
Old hero: “One build at a time.” / “Bringing your ideas to life.”
New hero: “I build things, put them online, and keep them running.” Names RepSolana and Emma Gentle.
Old about: generic builder paragraph.
New about: Port Harcourt, catalogue + on-chain work, email first.
Old projects strip: “Selected builds, experiments, and products worth a closer look.”
New projects strip: names the two public builds.
Old Emma case (CMS): generic e-commerce blurb.
New Emma case (overlay): catalogue, categories, WhatsApp, admin desk. No checkout.

## Icons
Removed from the contact UI: `images (1).png`, `images.png`, `1000740531-removebg-preview.png`.
Replaced with Lucide-path X, GitHub, Mail. Files remain in `public/images/icons/` unused so asset folders stay intact.

## Aura / React Bits
none

## Appearance notes — mobile vs desktop
### Decisions
Portrait is a small hero photo, not the nav logo. Contact chips include labels so hover is not required. Project links wrap and stay 44px tall. Catalogue cards stay one column under 679px and two columns from 768px.
### Issues found
| Page | Width | Problem | Fix |
|---|---|---|
| Home | 375 | Hero title was 4.4rem marketing type | Capped in overlay |
| Contact | 375 | Icon-only PNG circles | Labelled Lucide chips |
| /projects | 375 | Catalogue hid description, tags, and links | Overlay forces them visible |
| /projects | 1280 | Grid already 2–3 columns in globals | Overlay keeps two-up catalogue, not a stretched mobile card |
| Project track | 375 | Already swipeable | Left CMS/track logic |
### Screenshots
- 375: live home, /projects, /projects/emma-gentle, #contact — production still shows old copy until this branch deploys.
- 1280: same pages on production for before-state.
After: Vercel preview on `design/portfolio-visual-pass`.
### Residual risk
CMS description fields still hold the old generic Emma blurb; the overlay hides it on public cards and the case page. Admin forms still show stored text. Playwright was not added, so screenshots are production-before only.

## Commands run
GitHub API branch `design/portfolio-visual-pass` from latest `main`. File updates via GitHub contents API. Did not merge. Did not change package-lock.

## Follow-ups
Owner can update CMS rows later so admin preview matches the overlay. Not merged.
