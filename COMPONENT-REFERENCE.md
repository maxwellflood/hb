# Honesty Box — Component Reference Detail

This file supplements CLAUDE.md with implementation detail so Claude doesn't need to re-read source files each session. It covers design tokens, established class names, and the canonical HTML patterns for every component type.

---

## CSS Files & Responsibility

| File | Owns |
|---|---|
| `styles/styles.css` | Reset, tokens (variables), typography, buttons, icons, utility classes, layout primitives (`header`, `main`, `nav`) |
| `styles/input-styles.css` | Page layout (`.page`, `.content-wrapper`, `.content`), question styles, form inputs, grid buttons, validation messages |
| `styles/love-button-styles.css` | Love button component — page layout overrides, circle, rings, fill, adjustment buttons |

---

## Design Tokens Quick Reference

All tokens live in `:root` in `styles.css`.

### Brand Colours (most-used)

```
--blu-00   #f3f8ff  (page background, surface-brand-muted)
--blu-10   #cfe4ff
--blu-20   #9fc9ff  (surface-brand-subtle)
--blu-50   #0f77ff  (PRIMARY brand — buttons, text-brand-strong, question text)
--blu-60   #005ed8  (hover state)
--blu-70   #0046a2  (active state)
```

### Semantic Surface Tokens

```
--surface-primary          white
--surface-secondary        --grey-1  (#f7f7f7)   ← input backgrounds, secondary buttons
--surface-tertiary         --grey-2  (#dbdbdb)
--surface-disabled         --grey-2
--surface-brand-strong     --blu-50
--surface-brand-muted      --blu-00
--surface-brand-subtle     --blu-20
--surface-error-strong     --red-50
--surface-error-muted      --red-00
```

### Semantic Text Tokens

```
--text-primary             --grey-9  (#1b1b1b)
--text-secondary           --grey-7
--text-tertiary            --grey-5
--text-disabled            --grey-3
--text-primary-inverted    --grey-1  (white-ish — on dark backgrounds)
--text-brand-strong        --blu-50
--text-error-strong        --red-50
```

### Semantic Border Tokens

```
--border-primary           --grey-2
--border-secondary         --grey-3
--border-highlighted       --grey-8
--border-highlighted-brand --blu-50  ← focus rings, selected state
```

### Size Scale (rem)

```
--size-4   0.25rem    --size-8   0.5rem     --size-12  0.75rem
--size-16  1rem       --size-20  1.25rem    --size-24  1.5rem
--size-28  1.75rem    --size-32  2rem       --size-36  2.25rem
--size-40  2.5rem     --size-48  3rem       --size-56  3.5rem
--size-64  4rem       --size-72  4.5rem     --size-80  5rem
--size-96  6rem
```

### Radius Scale

```
--radius-xs  --size-4    --radius-s   --size-8
--radius-m   --size-12   --radius-l   --size-16
--radius-xl  --size-20   --radius-wrap --size-24  (main card corners)
```

### Layout Spacing

```
--nav-top-height        --size-80  (fixed header height)
--nav-bottom-height     --size-96  (fixed bottom nav height)
--space-inline-main     --size-24  (→ --size-16 on mobile)
--space-block-main      --size-24  (→ --size-16 on mobile)
```

### Input Tokens (input-styles.css)

```
--input-height   clamp(2rem → 2.5rem)    32px → 40px
--input-gap      clamp(0.75rem → 1.25rem)
```

---

## Typography

| Element | Font | Weight | Size token |
|---|---|---|---|
| `h1`–`h6` | Dorian (variable) | 700 | `--h1-size` … `--h4-size` (clamp) |
| `.question` | Dorian | 700 | `--p-size-large` (1.125rem), `letter-spacing: -0.02em` |
| `.form-label` | Dorian | 700 | 16px |
| `p`, inputs, buttons | Inter | 400/500 | 1rem |
| `.form-label--sub` | Inter | 500 | 0.875rem |
| `.small` | Inter | 400 | `--p-size-small` (0.875rem) |

Headings default colour: `--blu-50`. Body text: `--grey-9`.

---

## HTML Page Skeleton

Every component page uses this shell:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Honesty Box | [Page Title]</title>
    <link rel="stylesheet" href="styles.css" />
    <link rel="stylesheet" href="input-styles.css" />
    <link rel="shortcut icon" href="favicon_blue.png" type="image/x-icon" />
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");
    </style>
  </head>
  <body>

    <!-- Fixed top header -->
    <header class="site-header" role="banner">
      <a class="brand" href="/" aria-label="Home">
        <!-- [HB logo inline SVG] -->
      </a>
    </header>

    <!-- Primary page content -->
    <main id="main" class="site-main" role="main">
      <div class="main-surface">
        <section class="page">

          <!-- [components go here] -->

        </section>
      </div>
    </main>

    <!-- Fixed bottom navigation -->
    <nav class="bottom-nav" aria-label="Primary">
      <!-- [progress indicator + button-container] -->
    </nav>

    <script src="[page-scripts].js"></script>
  </body>
</html>
```

---

## Q & A Content Pattern

Questions and answers live in separate `.content-wrapper` divs. The answer wrapper removes its top padding to sit tight below the question.

```html
<!-- Question -->
<div class="content-wrapper">
  <div class="content">
    <div class="box-Q">
      <p class="question">Question text here?</p>
    </div>
  </div>
</div>

<!-- Answer -->
<div class="content-wrapper content-wrapper--answer">
  <div class="content">
    <div class="box-A">
      <!-- [input component] -->
    </div>
  </div>
</div>
```

- `.content-wrapper` — full-width, `padding: 1.5rem`
- `.content-wrapper--answer` — removes top padding
- `.content` — `max-width: 640px`, centered, `flex-direction: column`, `gap: --input-gap`
- `.box-Q` / `.box-A` — semantic labels for the handoff reader, no styles of their own

---

## Form Input Component

Defined in `input-styles.css`.

```html
<div class="form-field">
  <label class="form-label" for="[id]">Label text</label>
  <p class="form-label--sub">Optional sub-label</p>
  <input class="text-input" type="text" id="[id]" placeholder="..." />
  <!-- Validation message — hidden by default, shown by adding .form-field--invalid to parent -->
  <div class="input-message">
    <svg …></svg>
    <span>This field is required</span>
  </div>
</div>
```

**States via parent modifier:**
- `.form-field--invalid` — shows `.input-message`, highlights border blue
- `.form-field--dont-know` — disables text input when DK button is active

**Input + Don't Know button side-by-side:**

```html
<div class="input-row">
  <input class="text-input" …>
  <button class="dont-know-btn" type="button" aria-pressed="false">🤷</button>
</div>
```

`.dont-know-btn--active` toggles on the button when selected.

**Form group** (multiple fields stacked):

```html
<div class="form-group">
  <div class="form-field">…</div>
  <div class="form-field">…</div>
</div>
```

---

## Grid Button Component

Single-select and multi-select question type. Defined in `input-styles.css`.

```html
<div class="grid-field">
  <div class="grid-group" role="radiogroup" aria-label="[Question text]">
    <button class="grid-btn" type="button" role="radio" aria-checked="false">Option A</button>
    <button class="grid-btn" type="button" role="radio" aria-checked="false">Option B</button>
  </div>
  <!-- Validation message — hidden by default, shown by .grid-field--invalid -->
  <div class="grid-message" aria-live="polite">
    <svg …></svg>
    <span>Please select an option</span>
  </div>
</div>
```

**Selection state:** `.grid-btn--selected` on the active button (JS-managed).

**Layout modifiers on `.grid-group`:**

| Modifier | Effect |
|---|---|
| *(none)* | Horizontal row, buttons share equal width, wrap |
| `.grid-group--col` | Vertical stack, full width |
| `.grid-group--fixed` | Buttons shrink to content width, no stretch |
| `.grid-group--col.grid-group--fixed` | Vertical + content-width |
| `.grid-group--wrap` | Wraps at 4-per-row, last row centred (multiselect) |
| `.grid-group--img-fw` | 4-column full-width image grid |

**Don't Know button alongside grid:**

```html
<div class="grid-wrapper">       <!-- or .grid-wrapper--col / .grid-wrapper--col-fixed -->
  <div class="grid-group">…</div>
  <button class="dont-know-btn" …>🤷</button>
</div>
```

**Image grid button:**

```html
<button class="grid-btn grid-btn--img" type="button" role="radio" aria-checked="false">
  <span class="img-selected-icon"><!-- checkmark SVG --></span>
  <img src="…" alt="…">
</button>
```

---

## Bottom Navigation

```html
<nav class="bottom-nav" aria-label="Primary">
  <!-- Progress indicator -->
  <div class="progress-indicator">
    <div class="progress-bar">
      <span class="progress" style="width: 75%"></span>
    </div>
    <p class="label">75%</p>
  </div>

  <!-- Nav buttons -->
  <div class="button-container">
    <!-- Help -->
    <a class="icon-btn icon-btn-secondary icon-btn-lg has-tooltip" href="#" aria-describedby="tip-help">
      <div class="icon icon-lg" aria-hidden="true"><!-- help SVG --></div>
      <span class="tooltip" role="tooltip" id="tip-help">Help</span>
    </a>
    <!-- Back (disabled on first question) -->
    <a class="icon-btn icon-btn-brand-primary icon-btn-lg btn-nav icon-btn-disabled has-tooltip" href="#" aria-describedby="tip-back">
      <div class="icon" aria-hidden="true"><!-- arrow-left SVG --></div>
      <span class="tooltip" role="tooltip" id="tip-back">Back</span>
    </a>
    <!-- Next -->
    <a class="icon-btn icon-btn-brand-primary icon-btn-lg btn-nav has-tooltip" href="#" aria-describedby="tip-next">
      <div class="icon" aria-hidden="true"><!-- arrow-right SVG --></div>
      <span class="tooltip" role="tooltip" id="tip-next">Next</span>
    </a>
  </div>
</nav>
```

`btn-nav` widens the button to `width: auto` with `padding-inline: --size-20`. On mobile it collapses back to 48px square.

---

## Button Classes Summary (`styles.css`)

| Class | Description |
|---|---|
| `.btn` | Base — black bg, white text, `border-radius: --radius-m` |
| `.btn-lg` / `.btn-sm` | Size variants |
| `.btn-secondary` | Grey bg, dark text |
| `.btn-ghost` | Transparent, no padding inline |
| `.btn-primary-brand` | Blue bg (`--blu-50`) |
| `.btn-secondary-brand` | Light blue bg (`--blu-00`), blue text |
| `.btn-disabled` | Grey, `cursor: not-allowed` |
| `.icon-btn` | Square icon-only button, 40×40 |
| `.icon-btn-lg` / `.icon-btn-sm` | 48px / 36px |
| `.icon-btn-secondary` | Grey variant |
| `.icon-btn-brand-primary` | Blue variant |
| `.icon-btn-brand-secondary` | Light blue variant |
| `.icon-btn-disabled` | Disabled variant |
| `.btn-nav` | Nav-specific: `width: auto`, wider padding |

---

## Utility Classes Summary (`styles.css`)

**Text colours:** `.txt-primary`, `.txt-secondary`, `.txt-tertiary`, `.txt-disabled`, `.txt-brand-strong`, `.txt-brand-muted`, `.txt-error-strong`, `.txt-success-strong`

**Padding:** `.u-p-sm` (16px), `.u-p-rg` (32px), `.u-p-lg` (48px) — each with `-t`, `-b`, `-y`, `-x` variants

**Margin:** `.u-m-sm`, `.u-m-rg`, `.u-m-lg` — same directional variants

**Flex wrappers:** `.flex-v-wrapper` (column, 16px gap), `.flex-h-wrapper` (row, 16px gap, wraps)

**Borders:** `.u-border-bottom-primary`, `.u-border-top-primary`

**Visibility:** `.hidden`, `.hidden-mobile`, `.hidden-desktop`, `.hidden-splash`

---

## Established Files & Scripts

| Script | Used by |
|---|---|
| `scripts/grids-scripts.js` | `grids-basic.html`, `grids-image.html`, `grids-image-full-width.html` |
| `scripts/grids-multiselect-scripts.js` | `grids-basic-multiselect.html` |
| `scripts/inputs-scripts.js` | `inputs.html`, `intro.html` |
| `scripts/love-button.js` | `love-button.html` |
| `scripts/love-button-mid.js` | `love-button-mid.html` |
| `scripts/home.js` | `home.html` |

---

## Hard Rules

- **Flexbox only** — CSS Grid is never used anywhere in this project
- **No frameworks** — vanilla HTML, CSS, JS
- **Inline SVGs** for all icons and logos
- **HTML comments** must label every major section and component
- **Semantic, descriptive class names** — these are read by developers unfamiliar with the codebase
- **BEM-style modifiers** with `--` (e.g. `.grid-group--col`, `.form-field--invalid`)
