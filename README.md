# Superfly Portfolio

A minimal, premium personal portfolio built with Next.js (App Router, JavaScript) and designed for Vercel deployment.

## Sections

- **Navbar** — sticky top bar with smooth scroll links to each section
- **Hero** — brand lockup, headline, and CTA buttons
- **Projects** — responsive card grid with tags and links
- **About** — bio copy and specialization details
- **Contact** — email link and social channel icons

## Customizing projects

Edit the `projects` array at the top of `components/ProjectsSection.js`:

```js
const projects = [
  {
    title: 'Your Project Name',
    description: 'What it does and why it matters.',
    tags: ['React', 'TypeScript'],
    links: {
      github: 'https://github.com/iamsuperfly/your-repo',
      live: 'https://your-live-url.com', // leave empty string to hide
    },
  },
];
```

Add or remove objects to add or remove cards. The grid adjusts automatically (1 column on mobile → 2 on tablet → 3 on desktop).

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
