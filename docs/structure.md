# Project Structure

Portfolio site for Jaden Wong - React 19 + Vite 8, deployed on Vercel.
Live at: https://jadenwong.ca (or similar - check vercel.json for domain)

## File tree

```
Portfolio/
  CLAUDE.md               # minimal per-session rules
  docs/                   # project knowledge (reference with @docs/filename.md)
  index.html
  vite.config.js
  vercel.json
  public/
    favicon.svg
    banner.svg
    icons.svg
    profile.jpg
    logos/                # org/company logos used in Experience and Research
    screenshots/          # app screenshots
    work/                 # project images shown in the Home page project row
  src/
    main.jsx              # router, Shell (single Home route + music widget)
    index.css             # global styles, CSS variables, critter animations
    pages/
      Home.jsx            # landing page - bio chips, stats, experience preview
      Research.jsx        # articles, educational resources
    components/
      Reveal.jsx          # scroll-reveal animation wrapper
      Critters.jsx        # 14 CSS animal figurines (Bunny, Chick, Bear, Cat, Frog, Panda, Fox, Dog, Sheep, Penguin, Mouse, Hamster, Dino, Owl)
      Icons.jsx           # SVG icon components (GitHubIcon, LinkedInIcon, etc.)
      Charts.jsx          # chart components
      ChessHero.jsx / ChessLazySusan.jsx / ChessShowcase.jsx  # chess-related 3D/display
      HelixScene.jsx / HeroCanvas3D.jsx / ResearchCanvas3D.jsx / RoyalCanvas3D.jsx  # Three.js scenes
      PageBanner.jsx
      ParticleWarp.jsx
      ProjectRotunda.jsx
```

## Pages - what's on each

### Home.jsx
- Hero with animated name, bio chips (tech stack chips as inline spans)
- Stats row, experience preview cards, featured project cards
- Bio chips array: Python, React, Next.js, TypeScript, FastAPI, PostgreSQL, Prisma, Supabase, GPT-4o, scikit-learn, PyQt6, Three.js, Signal Processing, NumPy, Pine Script v6, Puppeteer

### Projects (section on Home)
- 4 projects in src/data/projects.js: MyMurry, Quant-Trading, myojam, Machine Learning Series
- Rendered by components/ProjectsRow.jsx: hover expands a card and pops its images out over the neighbours

### Experience and Hackathons (sections on Home)
- Experience: 4 roles in src/data/roles.js, rendered by components/ExperienceRow.jsx (text only, no pop-outs)
- Hackathons: 4 in src/data/hackathons.js, rendered by components/HackathonsRow.jsx (same pop-out as Projects, trophy icon + result tag on award winners)

## Design conventions

- CSS variables: `var(--bg)`, `var(--bg-2)`, `var(--text)`, `var(--text-secondary)`, `var(--text-tertiary)`, `var(--accent)`, `var(--gold)`, `var(--border)`, `var(--border-dark)`, `var(--serif)`, `var(--font)`
- All styles are inline (no CSS modules)
- Hero spacing pattern: `padding: "140px 0 80px"` on hero section (NOT `height: 100vh`) - About, Experience, Research all use this
- Critters are `position: absolute` inside a `position: relative, overflow: visible` section, with `z-index: 0`
- `<Reveal>` wraps animated content; `<Reveal grand>` for larger entrance animations
- Separators: use ` - ` (not em/en dashes), use `•` (not `·`) for structural separators

## GitHub profile

Jaden300 on GitHub. The portfolio links to https://github.com/Jaden300.
Repo: https://github.com/Jaden300/Portfolio (may redirect from /portfolio lowercase)
