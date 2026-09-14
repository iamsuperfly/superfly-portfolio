# Superfly portfolio design

Personal builder site. Not a SaaS landing page, not a design-system demo.

## Purpose

Show shipped work and a working email path. Visitors should leave knowing Superfly builds and publishes software, not that a template exists.

## Lockup

- Navbar wordmark is the text “Superfly”.
- The photograph is a portrait in the hero only.
- Name, wordmark, and portrait are three separate things. Never fuse the pfp into a logo.

## Type and colour

- Existing dark tokens in `globals.css`: `--bg #090b10`, `--text #f5f7ff`, `--muted #9aa4bb`, `--accent #dce6ff`.
- Overlay type: Segoe UI / Helvetica Neue / Arial so the page does not lean on Inter-as-lifestyle.
- No italic display serif. No beige. No purple-blue gradient buttons.
- One quiet dark ground already in `globals.css`. Do not add Aura section washes.

## Layout

- Content width stays near 1080px.
- Home is a stack: hero, builds, about, contact.
- `/projects` is a catalogue, not a marketing bento.
- Desktop: two columns on the projects index from 768px. Cards keep screenshot, stack tags, GitHub, and live links.
- Mobile: one column. Nav hamburger is 44px. Project track stays swipeable. Catalogue cards keep description, tags, and links visible.

## Motion

- Existing project track may move slowly on small screens.
- Pause on touch. Honour `prefers-reduced-motion`.
- Hover is extra. Links must work without it.
- Buttons do not lift.

## Copy voice

- Name the work: RepSolana, Emma Gentle.
- No “bringing your ideas to life.” No “one build at a time” as a slogan.
- Case pages describe the live product, not a generic e-commerce template.

## Icons

- One family: Lucide-path SVGs in `components/icons.js`.
- Contact uses X, GitHub, Mail with visible labels.
- Downloaded PNG filenames stay off the public UI.

## Breakpoints to check

375, 390, 430, 768, 1280, 1440.
