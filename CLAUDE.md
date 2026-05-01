# Honesty Box — Component Reference

## Project Overview

This is a **front-end component reference library** for the Honesty Box survey platform. It is being built by Grotesk (designer/dev) and handed off to the client's development team. The developers will use this repo as a reference when building out their own front end.

**Semantics and labelling are critical.** Everything must be clearly named — class names, HTML structure, file organisation, and comments all need to be self-explanatory for a developer who has never seen this codebase.

---

## File Structure

| File | Purpose |
|---|---|
| `index.html` | Design system overview — typography, logos, colours, base elements |
| `inputs.html` | Input components — form fields, selects, checkboxes, radios, etc. |
| `input-styles.css` | Styles specific to input components |
| `grids.html` | Grid/layout component reference |
| `grids-scripts.js` | Scripts for grid demos |
| `inputs-scripts.js` | Scripts for input demos |
| `styles.css` | Global styles, reset, typography, utility classes |
| `home.html` | Home page |
| `intro.html` | Intro page |
| `navigation.html` | Navigation component |
| `fonts/` | Local font files |
| `lottie/` | Lottie animation files |
| `js/` | Shared JS |

---

## Tech & Conventions

- **Layout:** Flexbox only — CSS Grid is never used
- **Fonts:** Inter (Google Fonts) + Dorian (`fonts/DorianVF.woff`, locally loaded variable font)
- **Naming:** Follow existing conventions already established in the codebase — e.g. `form-field`, `form-label`, `form-label--sub`, `text-input`, `input-message`, `form-group`, `content-wrapper`, `content`, `question`, `site-header`, `site-main`. BEM-style modifiers with `--` where variants exist. Class names must be semantic and descriptive — these are read by developers unfamiliar with the codebase
- **Comments:** Use HTML comments to label every major section and component clearly
- **No frameworks** — vanilla HTML, CSS, JS

---

## Handoff Notes

- This repo is a **static reference** — not a running app
- Developers will read the source to understand structure, spacing, naming, and component variants
- Every component should have clear variant states where relevant (default, hover, focus, disabled, error, etc.)
- Inline SVGs are used for icons/logos

---

## Figma

The Figma file is the design source of truth. When referencing Figma frames, paste the link directly — frames are small and targeted (not full pages).
