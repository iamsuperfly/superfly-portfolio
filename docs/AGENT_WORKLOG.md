# Portfolio visual pass — work log

## Summary
Separated the text wordmark from the portrait, rewrote hero and about so they name shipped work, replaced downloaded PNG social icons with Lucide-path SVGs, and overlaid Emma Gentle / RepSolana case copy without touching Supabase rows.

## Architecture check
Unchanged: Next.js App Router, Supabase project CMS, `/admin`, publish/reorder, env contract, Vercel setup. `lib/projects.js`, `app/admin/actions.js`, and schema files were not edited.

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
Hero, About, Contact, Navbar remains text-only, ProjectCard, project detail page, `lib/caseNotes.js`, `components/icons.js`, `app/portfolio.css`, `app/layout.js`, README, DESIGN.md, PRODUCT.md, this log.

## Copy rewritten
Old hero: “One build at a time.” / “Bringing your ideas to life.”
New hero: ships work, names RepSolana and Emma Gentle.
Old about: generic builder paragraph.
New about: Port Harcourt, catalogue + on-chain work, email first.

## Icons
Removed from the contact UI: `images (1).png`, `images.png`, `1000740531-removebg-preview.png`.
Replaced with Lucide-path X, GitHub, Mail. Files remain in `public/images/icons/` unused so CMS/asset paths stay intact.

## Aura / React Bits
none

## Appearance notes — mobile vs desktop
### Decisions
Portrait is a small hero photo, not the nav logo. Contact chips include labels so hover is not required. Project links wrap and stay 44px tall.
### Issues found
| Page | Width | Problem | Fix |
|---|---|---|---|
| Home | 375 | Hero title was 4.4rem marketing type | Capped in overlay |
| Contact | 375 | Icon-only PNG circles | Labelled Lucide chips |
| Projects | 375 | Track already swipeable | Left CMS/track logic |
### Screenshots
Production before: https://iamsuperflly.vercel.app and `/projects`, `/projects/emma-gentle`.
After: Vercel preview on this branch.
### Residual risk
CMS description fields still hold the old generic Emma blurb; the overlay hides it on public cards and the case page. Admin forms still show stored text.

## Commands run
Cloned source via GitHub API. Create branch `design/portfolio-visual-pass`. Run `npm run lint` and `npm run build` on Node matching the project.

## Follow-ups
Owner can update CMS rows later so admin preview matches the overlay. Did not merge.
