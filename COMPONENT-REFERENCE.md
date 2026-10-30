# Honesty Box - Component Reference Detail

This file supplements CLAUDE.md with implementation detail so Claude doesn't need to re-read source files each session. It covers design tokens, established class names, and the canonical HTML patterns for every component type.

---

## CSS Files & Responsibility

| File | Owns |
|---|---|
| `styles/styles.css` | Reset, tokens (variables), typography, buttons, icons, chips, utility classes, layout primitives (`header`, `main`, `nav`, `.answer-arena`) |
| `styles/input-styles.css` | Page layout (`.page`, `.content-wrapper`, `.content`), question styles, form inputs, grid buttons, validation messages |
| `styles/love-button-styles.css` | Love button component - page layout overrides, circle, rings, fill, adjustment buttons |
| `styles/tinderland-styles.css` | Tinderland card (variants + swipe states) and the swipe-specific Tosser furniture |
| `styles/bingo-styles.css` | Bingo - 3 × 3 board, drop zones, draggable card |
| `styles/dropper-styles.css` | Dropper and Dragger - header strip, card, horizontal and vertical drop zones |
| `styles/ai-styles.css` | AI conversation - chat dock, input, message thread, platform avatar |
| `styles/insert-word-styles.css` | Insert Word - inline trigger, word menu |
| `styles/expand-image-styles.css` | Expand Image - thumbnail, expand button, lightbox |
| `styles/pie-styles.css` | Pie - slices, dividers |

---

## Design Tokens Quick Reference

All tokens live in `:root` in `styles.css`.

### Brand Colours (most-used)

```
--blu-00   #f3f8ff  (page background, surface-brand-muted)
--blu-10   #cfe4ff
--blu-20   #9fc9ff  (surface-brand-subtle)
--blu-50   #0f77ff  (PRIMARY brand - buttons, text-brand-strong, question text)
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
--text-primary-inverted    --grey-1  (white-ish - on dark backgrounds)
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

### Shadows

```
--shadow-card          0 4px 12px rgba(0,0,0,0.1)   draggable card at rest
--shadow-card-lifted   0 4px 12px rgba(0,0,0,0.2)   hovered or grabbed
--shadow-menu          0 2px 4px rgba(0,0,0,0.05)   pop-up menus with a caret
```

Offset, blur and colour only, so a token works in `filter: drop-shadow(var(--…))`
and `box-shadow: var(--…)`. Cards: Tinderland, Bingo, Dropper. Menu: Don't Know,
Insert Word.

### Radius Scale

```
--radius-xs  --size-4    --radius-s   --size-8
--radius-m   --size-12   --radius-l   --size-16
--radius-xl  --size-20   --radius-wrap --size-24  (main card corners)
```

### Layout Spacing

```
--site-header-padding-y    8px at ≤900px tall → 16px at ≥1100px (dvh, same range as the bottom nav); fixed 8px at ≤1024px wide
--site-header-logo-height  --size-32  (logo slot; the logo is capped at this height)
--nav-top-height        calculated - 2 × header padding + logo slot (48px → 64px)
--nav-bottom-height     calculated - follows the bottom nav's rendered height
--space-inline-main     --padding-inline-lg  (16px at 375px wide → 24px at 960px)
--space-block-main      --padding-block-lg   (16px at 700px tall → 24px at 1100px)
```

### Fluid Inline Padding

General-purpose horizontal spacing. Each value grows with the viewport width between
375px and 960px (the stage max width) and is fixed outside that range. Written in
`rem` + `vw` so it follows the browser's text size and zoom. Drives
`--space-inline-main` and `.content-wrapper`.

```
--padding-inline-xxs   2px → 4px
--padding-inline-xs    4px → 8px
--padding-inline-sm    8px → 12px
--padding-inline-rg   12px → 16px
--padding-inline-lg   16px → 24px
--padding-inline-xl   24px → 32px
```

### Fluid Block Padding

The vertical partner to the inline scale, same steps. Each value grows with the
viewport height (`dvh`) between 700px and 1100px tall and is fixed outside that range.
Drives `--space-block-main`, `.content-wrapper` and the heading gaps.

```
--padding-block-xxs    2px → 4px
--padding-block-xs     4px → 8px
--padding-block-sm     8px → 12px
--padding-block-rg    12px → 16px
--padding-block-lg    16px → 24px
--padding-block-xl    24px → 32px
```

### Input Tokens (input-styles.css)

```
--input-height   clamp(2rem → 2.5rem)    32px → 40px
--input-gap      clamp(0.75rem → 1.25rem)
```

---

## Typography

| Element | Font | Weight | Size token | Line height |
|---|---|---|---|---|
| `.display` | Dorian (variable) | 700 | `--display-size` (36px → 52px) | `--line-height-tight` (via `h1`) |
| `h1` / `h2` | Dorian (variable) | 700 | `--h1-size` (28 → 40px), `--h2-size` (22 → 32px) | `--line-height-tight` |
| `h3` / `h4` | Dorian (variable) | 700 | `--h3-size` (20 → 28px), `--h4-size` (18 → 22px) | `--line-height-snug` |
| `.question` | Dorian | 700 | `--p-size-large` (16 → 18px), `letter-spacing: -0.02em` | `--line-height-snug` |
| `.form-label` | Dorian | 700 | `--p-size-regular` (14 → 16px) | 1.4 |
| `p` | Inter | 400 | `--p-size-regular` (14 → 16px) | `--line-height-body` |
| inputs | Inter | 400 | 16px, **fixed** - below 16px iOS Safari zooms the page on focus | 1.4 |
| `.form-label--sub` | Inter | 500 | `--p-size-small` (12 → 14px) | |
| `.small` | Inter | 400 | `--p-size-small` (12 → 14px) | `--line-height-body` (on a `p`) |

**Fluid on both axes.** Every scaling size is worked out from the viewport width
(375px → 960px) and from the viewport height (700px → 1100px), and `min()` takes the
smaller - text shrinks when either axis is tight. Same ranges as the fluid padding
scales. Form inputs are the exception: they stay at 16px, because an input below 16px
makes iOS Safari zoom the page on focus.

**Line heights** are font size plus a fixed amount rather than a ratio, so larger text
gets proportionally tighter leading as it scales:

```
--line-height-tight   calc(1em + 0.25rem)    display, h1, h2
--line-height-snug    calc(1em + 0.375rem)   h3, h4, .question
--line-height-body    calc(1em + 6px → 8px)  p, .small (14px / 20px small → 16px / 24px full size)
```

`--heading-gap-*` (space below headings) points at the `--padding-block-*` scale.

**Component text** follows the same tokens: card, zone and grid-button labels, Story
Question sentences and `.btn` use `--p-size-regular`; validation messages, tooltips,
`.btn-sm`, the Insert Word pill and menu use `--p-size-small`; `.btn-lg` and the love
button counter use `--p-size-large`. Text inputs stay at a fixed 16px.

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

- `.content-wrapper` - full-width, `--padding-block-lg` / `--padding-inline-lg` (16px → 24px), the same as the page gutters
- `.content-wrapper--answer` - removes top padding
- `.content` - `max-width: 640px`, centered, `flex-direction: column`, `gap: --input-gap`
- `.box-Q` / `.box-A` - semantic labels for the handoff reader, no styles of their own

---

## Form Input Component

Defined in `input-styles.css`.

```html
<div class="form-field">
  <label class="form-label" for="[id]">Label text</label>
  <p class="form-label--sub">Optional sub-label</p>
  <input class="text-input" type="text" id="[id]" placeholder="..." />
  <!-- Validation message - hidden by default, shown by adding .form-field--invalid to parent -->
  <div class="input-message">
    <svg …></svg>
    <span>This field is required</span>
  </div>
</div>
```

**States via parent modifier:**
- `.form-field--invalid` - shows `.input-message`, highlights border blue
- `.form-field--dont-know` - disables text input when DK button is active

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
  <!-- Validation message - hidden by default, shown by .grid-field--invalid -->
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
    <a class="icon-btn icon-btn-secondary icon-btn-sm has-tooltip" href="#" aria-describedby="tip-help">
      <div class="icon icon-lg" aria-hidden="true"><!-- help SVG --></div>
      <span class="tooltip" role="tooltip" id="tip-help">Help</span>
    </a>
    <!-- Back (disabled on first question) -->
    <a class="icon-btn icon-btn-brand-primary icon-btn-sm btn-nav icon-btn-disabled has-tooltip" href="#" aria-describedby="tip-back">
      <div class="icon" aria-hidden="true"><!-- arrow-left SVG --></div>
      <span class="tooltip" role="tooltip" id="tip-back">Back</span>
    </a>
    <!-- Next -->
    <a class="icon-btn icon-btn-brand-primary icon-btn-sm btn-nav has-tooltip" href="#" aria-describedby="tip-next">
      <div class="icon" aria-hidden="true"><!-- arrow-right SVG --></div>
      <span class="tooltip" role="tooltip" id="tip-next">Next</span>
    </a>
  </div>
</nav>
```

`btn-nav` widens the button to `width: auto` with `padding-inline: --size-20` and `--radius-s` (8px) corners. Below 768px it collapses to a square.

**Sizing and spacing** - all tokens in `:root` in `styles.css`. Height-driven values scale with `dvh` between 900px and 1100px tall; width-driven values scale between 768px and 960px wide (the stage max width).

| Token | Controls | Range |
|---|---|---|
| `--primary-nav-padding-y` | nav vertical padding | 12px at ≤900px tall → 24px at ≥1100px; fixed 12px at ≤767px wide |
| `--prog-bar-p-y` | progress bar vertical padding | 12px → 16px, same heights; fixed 12px at ≤767px wide |
| `--prog-bar-p-x` | progress bar horizontal padding | 12px at ≤768px wide → 16px at ≥960px |
| `--prog-bar-gap` | gap between bar and % label | 8px → 12px, same widths |
| `--primary-nav-btn-gap` | gap between Help, Back and Next | 4px → 8px, same widths |
| `--primary-nav-btn-size` | Help / Back / Next height | 36px; 40px at ≤1024px wide or on touch |
| `--primary-nav-btn-icon-size` | Back / Next arrow | 16px; 20px at ≤1024px wide or on touch |
| `--nav-bottom-height` | space `<main>` reserves for the nav | calculated from the tokens above, so it follows the nav's rendered height |

The % label (`.progress-indicator .label`) is 14px Inter Medium, trimmed to cap height with `text-box-trim`.

---

## Button Classes Summary (`styles.css`)

| Class | Description |
|---|---|
| `.btn` | Base - black bg, white text, `border-radius: --radius-m` |
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
| `.icon-btn-lock` | Lock toggle: 40px, 1px border, 8px corners, grey icon. `.icon-btn-lock--locked` turns the icon black (pair with `aria-pressed="true"`) |
| `.icon-btn-grab` | Drag handle: 40px, 1px border, 8px corners, white, `cursor: grab`. `.icon-btn-grab--dragging` holds the pressed look for a whole drag |

---

## Utility Classes Summary (`styles.css`)

**Text colours:** `.txt-primary`, `.txt-secondary`, `.txt-tertiary`, `.txt-disabled`, `.txt-brand-strong`, `.txt-brand-muted`, `.txt-error-strong`, `.txt-success-strong`

**Padding:** `.u-p-sm` (16px), `.u-p-rg` (32px), `.u-p-lg` (48px) - each with `-t`, `-b`, `-y`, `-x` variants

**Margin:** `.u-m-sm`, `.u-m-rg`, `.u-m-lg` - same directional variants

**Flex wrappers:** `.flex-v-wrapper` (column, 16px gap), `.flex-h-wrapper` (row, 16px gap, wraps)

**Borders:** `.u-border-bottom-primary`, `.u-border-top-primary`

**Visibility:** `.hidden`, `.hidden-mobile`, `.hidden-desktop`, `.hidden-splash`

**Aside labels:** `.label-aside` (14px Inter italic, `--text-tertiary`) - a note between parts of a question. `.label-aside-instruction` - the same in `--text-brand-muted-dark` (`--blu-70`), for telling the respondent how to answer

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
| `scripts/ai-scripts.js` | `ai.html` |
| `scripts/insert-word.js` | `story-question.html` (demo only - index.html shows the states statically) |
| *(inline `<script>`)* | `expand-image.html` - `showModal()` / `hideModal()` toggle the lightbox |
| *(inline `<script>`)* | `pie-demo.html` - throwaway drag demo; `pie.html` has no script |

---

## Tinderland Card

Swipe card for the Tinderland / Tosser question type. Defined in `tinderland-styles.css`.

```html
<div class="tinderland-card">
  <p class="tinderland-card__label">The one I prefer</p>
</div>
```

**Variants:** `.tinderland-card--image` (adds `<img class="tinderland-card__img">` above the label),
`.tinderland-card--fav` (compact, used inside `.tosser__card-stack`).

**States** (applied by JS as the pointer moves):

| Modifier | Meaning |
|---|---|
| *(none)* | Idle - white surface, grey border |
| `.tinderland-card--pressed` | Held down - grey surface |
| `.tinderland-card--swipe-l` | Swiping left (reject) - yellow tint, amber border |
| `.tinderland-card--swipe-r` | Swiping right (prefer) - green tint, green border |

---

## Answer Arena

Shared layout primitive (`styles.css`) for any question type that needs a bounded
play area rather than a stacked form. Fills the space below the question and anchors
its furniture to its own edges. Used by the Tosser, Bingo, Dropper, Dragger and Pie question types.

```html
<div class="answer-arena-section box-A">
  <div class="answer-arena">
    <div class="answer-arena__progress"><!-- step-dot-track --></div>
    <div class="answer-arena__dont-know"><!-- dont-know-btn-wrapper --></div>
    <!-- question-type content: swipe card, bingo board, … -->
  </div>
</div>
```

- `.answer-arena-section` - `flex: 1` wrapper, direct child of `<main>`; provides the page gutters
  at the sides and bottom. No top padding - the question's `.content-wrapper` above supplies the gap
- `.answer-arena` - grey surface, `position: relative`, centres its content
- `.answer-arena--board` - opt-in modifier making the arena a `container-type: size`
  query container, so its contents can size themselves against the arena in `cqw` /
  `cqh` / `cqmin` instead of against the viewport. Used by the Bingo board, which has
  to fit whatever height is left with no scrolling. Not applied to `.answer-arena`
  itself so the Tosser arena is unaffected
- `.answer-arena__progress` - step dots, centred 16px from the top edge
- `.answer-arena__dont-know` - Don't Know button, centred 16px from the bottom edge

---

## Tosser Arena

The Tinderland swipe card in an `.answer-arena`. Only the swipe-specific pieces
live in `tinderland-styles.css`.

```html
<div class="answer-arena-section box-A">
  <div class="answer-arena" role="region" aria-label="Swipe card">
    <div class="tosser__side-label tosser__side-label--left" aria-hidden="true"><span>…</span></div>
    <div class="tosser__side-label tosser__side-label--right" aria-hidden="true"><span>…</span></div>
    <div class="answer-arena__progress"><!-- step-dot-track --></div>
    <div class="answer-arena__dont-know"><!-- dont-know-btn-wrapper --></div>
    <div class="tinderland-card">…</div>
  </div>
</div>
```

- `.tosser__side-label--left/--right` - 32px full-height columns; the `<span>` is rotated
  ±90° so its centre sits 16px from the edge. `aria-hidden` - decorative
- `.tosser__options` - optional pair of images pinned to the arena edges (`.tosser__option-img`)
- `.tosser__card-stack` - stacked `.tinderland-card--fav` cards instead of a single card

---

## Bingo Board

Drag-and-drop question type. A card in the centre of a 3 × 3 board is dragged onto
one of the eight surrounding drop zones. Defined in `bingo-styles.css`, inside an
`.answer-arena`.

**Flexbox, not CSS Grid** - three `.bingo-board__row` rows of three
`.bingo-board__cell` cells. Cells use `flex: 1 1 33.3333%`, not `flex: 1`: a zero
basis lets the card image's intrinsic aspect ratio clamp the centre cell narrower
than the other two.

```html
<div class="bingo-board" role="radiogroup" aria-label="[Question text]">
  <div class="bingo-board__row" role="presentation">
    <div class="bingo-board__cell" data-cell="1">
      <button class="bingo-target" type="button" role="radio" aria-checked="false">
        <span class="bingo-target__label">One</span>
      </button>
    </div>
    <!-- cells 2, 3 -->
  </div>
  <div class="bingo-board__row" role="presentation">
    <!-- cell 4 -->
    <div class="bingo-board__cell bingo-board__cell--card" data-cell="5">
      <div class="bingo-card">
        <img class="bingo-card__img" src="…" alt="…" />
      </div>
    </div>
    <!-- cell 6 -->
  </div>
  <!-- row 3: cells 7, 8, 9 -->
</div>
```

- `.bingo-board` - fills the arena; its vertical padding is the fixed clearance that
  keeps the board clear of the progress dots and Don't Know button
- `.bingo-board__cell` - one ninth; the inset is what makes the eight drop
  zones read smaller than the card

**Spacing is fluid, not fixed.** Three shared variables, declared once in
`bingo-styles.css`:

| Variable | Controls | Value |
|---|---|---|
| `--bingo-board-pad-top` | clearance for the progress dots | `40px` - **fixed** |
| `--bingo-board-pad-bottom` | clearance for the Don't Know button | `48px` - **fixed** |
| `--bingo-board-pad-inline` | board gutter | `24px` - **fixed** (8px on mobile) |
| `--bingo-cell-inset` | inset inside each cell, both axes | `clamp(8px, 4cqmin, 24px)` |

Fixed insets are what push the board past the bottom of the arena - three rows of a
fixed 40px inset is 240px of padding before a single zone is drawn. Each clamp gives
full size on a large screen and shrinks smoothly in both directions as the window
does, so the drop zones get the space back.

**The units are container units, not `vh` / `vw`.** They measure the arena, not the
window, and that is what makes them work. The arena is the viewport minus the two
fixed navs, the question and the section padding - roughly 280px that never shrinks -
so a window going 900px to 600px tall loses a third of its height while the arena
loses half. A `vh`-based inset therefore moves at about half the rate of the space it
is protecting and barely appears to respond; `cqh` moves at exactly the right rate.
`.answer-arena--board` is what makes the arena measurable.

**The board wrapper is fixed - it never clamps and never scales.** Its whole job is to
reserve the arena furniture, which is a fixed size pinned to the arena's own edges: dot
track 20px at 16px from the top, Don't Know button 32px at 16px from the bottom. None
of that shrinks with the window, so the space kept clear for it must not shrink either.
Any fluid value there, however carefully clamped, eventually crosses under the button
and puts a drop zone behind it.

**The scaling happens one level in, on the cells.** That is the right place for it -
the cell inset is interior space with nothing underneath it, so it can give way freely
as the arena shrinks without colliding with anything. `--bingo-cell-inset` uses `cqmin`
because it sets the gap on all four sides of a zone and must answer to whichever axis
is tighter: height on a wide short desktop window, width on a tall narrow phone.

The variables are declared on the boards rather than
`:root`, since container units resolve against the nearest ancestor container and
`:root` sits outside the arena; the cells inherit them. The mobile breakpoint retunes
the variables themselves rather than the rules that use them, so both boards pick the
change up.
- `.bingo-board__cell--card` - centre cell (5), no inset, so the card fills its area
- `.bingo-target` - a drop zone. A `<button>` so the question is answerable by keyboard
  or tap without a drag; `data-cell` (1–9) is the value logged to the back end
- `.bingo-target--img` - image zone: the picture fills the zone corner to corner
  (no inset, `overflow: hidden` to clip it to the rounded corners), with
  `.bingo-target__img` in place of `.bingo-target__label`. `object-fit: cover`, so
  any aspect ratio the client supplies fills the zone rather than letterboxing. The
  border draws over the top, so every zone state reads the same as on a text zone.
  The `alt` text is the zone's accessible name
- `.bingo-card` - the draggable card; drop shadow, `cursor: grab`. A centred flex
  column, so whichever content it holds sits in the middle on both axes
- `.bingo-card__label` - text-card content, in place of `.bingo-card__img`. Identical
  to `.tinderland-card__label`, so a text card reads the same on a Bingo board as it
  does on a Tosser card. No variant class on `.bingo-card` itself - swapping the child
  is the whole difference
- `.bingo-card__img` - `object-fit: cover`, so any aspect ratio the client supplies
  fills the card cleanly

**States** (no JavaScript - the host app applies these during a drag):

| Modifier | Meaning |
|---|---|
| `.bingo-card:hover` | Pointer over the card - drop shadow animates from 10% to 20% opacity |
| `.bingo-card--pressed` | Card grabbed - grey surface, `scale(0.95) rotate(6deg)`; eases back to flat on release (also `:active`) |
| `.bingo-target--drop-active` | Card is being dragged over this zone - brand border, muted blue fill |
| `.bingo-target--filled` | Card placed here, answer recorded - brand border, subtle blue fill |

`.bingo-target` also has `:hover` / `:focus-visible` - brand border and muted blue
fill, the same look as `--drop-active`. The modifier exists as well as the pseudo-class
because a touch drag does not fire `:hover` over the zone being dragged onto.

**Zone-count variants** - a board with fewer than eight zones keeps the same 3 × 3,
with only the cells it needs occupied. The `-4-corners` pages are the
four-zone case: zones in the four corners, card in the centre, and the four edge
cells present but empty.

| Class | Applies to | Effect |
|---|---|---|
| `.bingo-board__cell--empty` | an unoccupied cell | marker only, no styles of its own |

The empty cell still takes its share of the row, and that is the whole point - remove
it and the corners stop being corners. `--empty` carries no styles for the same reason
`.box-Q` / `.box-A` don't: it is there so a developer reading the markup can see the
gap is deliberate.

This is the approach kept after comparing it against two alternatives that have since
been removed: a `--fill` board that redistributed the cells so four zones filled it,
and a CSS Grid board with 2 × 2 tracks and the card spanning them. Both made the four
zones larger; neither read as the same component as the eight-zone board.

**Variants:** the full matrix - two card types × two zone types × two zone counts.

| Page | Card | Zone content | Zones |
|---|---|---|---|
| `bingo-img_text.html` | image | text | eight |
| `bingo-img_text-4-corners.html` | image | text | four, in the corners |
| `bingo-img_img.html` | image | image | eight |
| `bingo-img_img-4-corners.html` | image | image | four, in the corners |
| `bingo-text_text.html` | text | text | eight |
| `bingo-text_text-4-corners.html` | text | text | four, in the corners |
| `bingo-text_img.html` | text | image | eight |
| `bingo-text_img-4-corners.html` | text | image | four, in the corners |

The naming is `bingo-[card content]_[zone content]` with the zone count appended when
it is not the default eight. All Bingo imagery comes from `images/bingo_images/` -
`man.png` on the card, the four brand marks on the zones. The eight-zone board cycles
those four twice, since it is a layout reference and only four exist. `data-cell` is the zone index within that variant, so it
runs 1–9 on the eight-zone board (5 being the card) and 1–4 on the four-zone board,
where the card and the empty cells carry no `data-cell` at all.

---

## Dropper and Dragger

Drag-and-drop question type: a card in a header strip is dragged onto one of a list
of zones below it. Two client-facing names for the same component in two
orientations, both defined in `dropper-styles.css`:

- **Dropper** - horizontal zones, stacked top to bottom (`dropper-*.html`)
- **Dragger** - vertical zones, side by side left to right (`dragger-*.html`)

The class names use `dropper` for the shared parts in both. Sits inside an
`.answer-arena`, like Bingo and Tosser, but does not use the arena's own
`__progress` / `__dont-know` slots: the step counter and Don't Know button belong to
the header strip instead.

```html
<div class="answer-arena-section box-A">
  <div class="answer-arena">
    <div class="dropper">

      <!-- Header strip: counter left, card centred, Don't Know right -->
      <div class="dropper-top">
        <div class="dropper-top__progress">
          <div class="step-counter" role="progressbar" aria-label="Card 1 of 8"
            aria-valuenow="1" aria-valuemin="1" aria-valuemax="8">1 / 8</div>
        </div>
        <div class="dropper-card">
          <span class="dropper-card__label">Text</span>
        </div>
        <div class="dropper-top__dont-know"><!-- dont-know-btn-wrapper --></div>
      </div>

      <!-- Zones - Dropper -->
      <div class="answer-dropper-area" role="radiogroup" aria-label="[Question text]">
        <button class="horizontal-answer-drop-area" type="button" role="radio"
          aria-checked="false" data-zone="1">
          <span class="horizontal-answer-drop-area__label">One</span>
        </button>
        <!-- one per zone -->
      </div>

      <!-- Zones - Dragger: add --vertical, swap the zone classes -->
      <div class="answer-dropper-area answer-dropper-area--vertical" role="radiogroup" aria-label="[Question text]">
        <button class="vertical-answer-drop-area" type="button" role="radio"
          aria-checked="false" data-zone="1">
          <span class="vertical-answer-drop-area__label">One</span>
        </button>
      </div>

    </div>
  </div>
</div>
```

- `.dropper` - fills the arena (`align-self: stretch`), column of header strip + zones
- `.dropper-top` - header strip. Its padding and the pinned positions of the counter
  and Don't Know button share two local variables, `--dropper-top-inset-block` /
  `--dropper-top-inset-inline` (`--padding-block-rg` / `--padding-inline-rg`, 12 → 16px),
  so they always line up with the top of the card
- `.dropper-card` - the draggable card. Shrinks to fit its copy and wraps if long.
  `.dropper-card--image` swaps the chip padding for a 4px inset around
  `<img class="dropper-card__img">` (`max-height: 106px` - placeholder until a final
  spec). Same shadow and press treatment as `.bingo-card`
- `.answer-dropper-area` - the zone list; `flex: 1` divides the remaining height (or
  width, with `--vertical`) evenly. No scrolling - the zones compress to fit
- `.horizontal-answer-drop-area` - a Dropper zone: full-width row, label left-aligned,
  hairline border on top
- `.vertical-answer-drop-area` - a Dragger zone: full-height column, label centred at the
  top. Side padding is the smallest step (`--padding-inline-xxs`) so ten columns still
  fit on a phone
- `data-zone` - the zone index, 1 to n, top to bottom (Dropper) or left to right
  (Dragger). The value logged to the back end. Zones are `<button role="radio">` so
  the question can be answered by tap or keyboard without a drag

Every zone carries a full 1px border at all times, transparent on the edges that
are not showing, so a state change only ever changes `border-color` and the label
never shifts. The end zones take the arena's bottom corner radius so a highlighted
border follows the curve.

**States** (no JavaScript - the host app applies these during a drag):

| Modifier | Meaning |
|---|---|
| `.dropper-card:hover` | Pointer over the card - shadow from `--shadow-card` to `--shadow-card-lifted` |
| `.dropper-card--pressed` | Card grabbed - grey surface, `scale(0.95) rotate(6deg)` (also `:active`) |
| `.horizontal-answer-drop-area--drop-active` / `.vertical-…--drop-active` | Card is being dragged over this zone - brand border, muted blue fill |
| `.horizontal-answer-drop-area--filled` / `.vertical-…--filled` | Card placed here, answer recorded - brand border, subtle blue fill |

Zones also have `:hover` / `:focus-visible`, the same look as `--drop-active`.

**Variants:**

| Page | Card | Zones |
|---|---|---|
| `dropper-text_text.html` | text | ten, horizontal |
| `dropper-image_text.html` | image | ten, horizontal |
| `dragger-text_text.html` | text | ten, vertical |
| `dragger-image_text.html` | image | ten, vertical |

---

## AI Chat

Conversational question type. Defined in `ai-styles.css`; the page `<body>` takes `.ai-body`.

```html
<div class="message-thread" role="log" aria-label="Conversation" aria-live="polite">
  <div class="message message--ai">
    <p class="message-text">Question from the AI</p>
    <div class="hb-icon hb-icon--sm" aria-hidden="true"><!-- avatar SVG --></div>
  </div>
  <div class="message message--user">
    <p class="message-text">User reply</p>
  </div>
</div>
```

- `.message--ai` - left-aligned plain text; the avatar appears below the text when it is still the AI's turn
- `.message--user` - right-aligned pill on `--surface-brand-muted`
- `.hb-icon` - platform avatar; `--xs` (24px), `--sm` (32px), `--md` (48px)

**Chat dock** - fixed above the bottom nav:

```html
<div class="ai-chat-dock">
  <div class="ai-chat-input">
    <textarea class="ai-chat-textarea" rows="1" aria-label="Write a message"></textarea>
    <div class="ai-chat-actions">
      <button class="icon-btn ai-chat-btn--mic" …>…</button>
      <button class="icon-btn icon-btn-brand-primary" …>…</button>
    </div>
  </div>
</div>
```

`.ai-chat-input` takes a blue border on `:focus-within`.

---

## Insert Word

Fill-in-the-blank question type. A button sits inline in a sentence of plain text;
tapping it opens a menu of words, the chosen word replaces the button's content, and
tapping the word again reopens the menu to change it. Defined in `insert-word-styles.css`.

Everything is a `<span>` or `<button>` because it lives inside a `<p>`.

```html
<p class="insert-word-sentence">
  I'd say that I am
  <span class="insert-word">
    <button class="insert-word__trigger" type="button" aria-haspopup="menu" aria-expanded="false" aria-label="Choose a word">
      <span class="insert-word__face insert-word__face--icon" aria-hidden="true"><!-- add SVG, 20px --></span>
    </button>
    <span class="insert-word-menu" role="menu" aria-label="Choose a word">
      <span class="insert-word-menu__caret" aria-hidden="true"></span>
      <span class="insert-word-menu__frame">
        <span class="insert-word-menu__options">
          <button class="insert-word-menu__option" type="button" role="menuitemradio" aria-checked="false">very</button>
          <!-- one per word -->
        </span>
      </span>
    </span>
  </span>
  socially conscious
</p>
```

- `.insert-word__trigger` - the hit area: 40px tall, no fill. The 4px above and below
  the face is invisible tap space, so the visible part can stay 32px in a line of text
- `.insert-word__face` - the visible 32px brand-blue pill holding the chosen word
- `.insert-word__face--icon` - empty state: 32px circle with the add icon. Remove it,
  put the word in the face and drop the trigger's `aria-label` once a word is chosen
- `.insert-word-menu` - opens below the trigger, centred, caret pointing up. Same
  caret layering as the Don't Know menu

**States:**

| Modifier | Meaning |
|---|---|
| `.insert-word__face--icon` | No word chosen yet |
| `.insert-word--open` (wrapper) | Menu visible, face darkens to `--blu-80`. Pair with `aria-expanded="true"` |
| `.insert-word-menu__option--selected` | The word currently in the sentence. Pair with `aria-checked="true"` |

Hover on the face is `--blu-60`; pressed (`:active`) is `--blu-80`, the same as open.

**Menu variants** (modifier on `.insert-word-menu`):

| Modifier | Effect |
|---|---|
| *(none)* | One row of words |
| `.insert-word-menu--multi-row` | Words four to a row in equal-width columns, menu 190px wide; a short last row is centred. Tune with `--insert-word-menu-width` / `--insert-word-menu-columns` |
| `.insert-word-menu--input` | `<input class="insert-word-menu__input">` (204 × 40px, dark border) in place of `.insert-word-menu__options`. Popup is `role="dialog"`, trigger `aria-haspopup="dialog"`. The typed word goes in the face |

**Story Question** (`story-question.html`) - `.story-question` on `.box-A` stacks Insert Word
sentences 20px apart, with `.label-aside` / `.label-aside-instruction` notes between them.

---

## Expand Image

A stimulus image shown with a question, with a button in its top right corner that
opens it full size in a lightbox. Defined in `expand-image-styles.css`. The image is
not an answer option, so it has no selected state.

```html
<div class="box-A expand-image-answer">
  <div class="expand-image">
    <img class="expand-image__img" src="…" alt="…" />
    <button class="expand-image__btn" type="button" aria-label="Expand image"
      aria-haspopup="dialog" aria-controls="image-lightbox" onclick="showModal()">
      <!-- arrow-expand SVG, 20px -->
    </button>
  </div>
  <div class="form-field">…</div>
</div>

<!-- Outside <main>, so it covers the fixed header and bottom nav -->
<div class="image-lightbox" id="image-lightbox" role="dialog" aria-modal="true" aria-label="Enlarged image">
  <div class="image-lightbox__overlay" onclick="hideModal()"></div>
  <div class="image-lightbox__frame">
    <img class="image-lightbox__img" src="…" alt="…" />
    <button class="image-lightbox__close" type="button" aria-label="Close image" onclick="hideModal()">
      <!-- cancel SVG, 20px -->
    </button>
  </div>
</div>
```

- `.expand-image-answer` - column on `.box-A`: thumbnail above the field, 24px gap
- `.expand-image` - thumbnail wrapper, `position: relative`, 2px grey border, centred
- `.expand-image__img` - capped at 280px wide and 40dvh tall; width follows height
- `.expand-image__btn` - 36px frosted square (`--grey-1` at 80%, 2px blur), 6px from
  the top right. Icon is `--text-tertiary` at rest, `--black` on hover / focus
- `.image-lightbox` - fixed full-screen layer, `z-index: 50` (above the navs at 10,
  below the loader at 100). Hidden until `.image-lightbox--open`
- `.image-lightbox__overlay` - `rgba(0,0,0,0.6)` backdrop; clicking it closes
- `.image-lightbox__img` - longest side capped at 80dvh, and width also capped to the
  screen minus gutters so it never overflows on mobile
- `.image-lightbox__close` - 36px solid grey square with border and drop shadow

**Behaviour:** a short inline `<script>` on the page. `showModal()` adds
`.image-lightbox--open` and focuses the close button; `hideModal()` removes it and
returns focus to the expand button. Escape also closes.

## Pie

Share-of-100% question type. The options are slices of one stacked bar; the
respondent drags the dividers between slices up or down to resize them. Defined in
`pie-styles.css`, inside an `.answer-arena`.

```html
<div class="answer-arena-section box-A">
  <div class="answer-arena">
    <div class="pie" role="group" aria-label="[Question text]">

      <div class="pie-slice pie-slice--colour-1" data-option="1" style="--pie-share: 25">
        <div class="pie-slice__details">
          <div class="chip pie-slice__label">
            <span class="chip__swatch" aria-hidden="true"></span>
            <span class="pie-slice__name">BBC</span>
          </div>
        </div>
        <div class="pie-slice__bar">
          <span class="chip pie-slice__percentage">25%</span>
        </div>
        <div class="pie-slice__control-column"></div>
      </div>

      <!-- one divider between each pair of slices -->
      <div class="pie-divider">
        <div class="pie-divider__controls">
          <button class="icon-btn icon-btn-lock pie-divider__lock" type="button"
            aria-pressed="false" aria-label="Lock the divider between BBC and ITV">…</button>
          <div class="icon-btn icon-btn-grab pie-divider__grab" role="slider" tabindex="0"
            aria-orientation="vertical" aria-label="Divider between BBC and ITV"
            aria-valuemin="0" aria-valuemax="100" aria-valuenow="25"
            aria-valuetext="BBC 25%, ITV 25%">…</div>
        </div>
      </div>

      <!-- next slice … -->
    </div>
  </div>
</div>
```

- `.pie` - fills the arena edge to edge, so the dividers run to the arena's border. The
  content is held in from the sides by `--pie-details-inset` / `--pie-controls-inset`
  (fluid, see below). No rules of its own: the arena's border is its top and bottom edge
- `.pie-slice` - one option. `--pie-share` (0-100, inline) is its `flex-grow` on a
  zero basis, so slice heights are exactly proportional to their shares
- `.pie-slice--colour-1` … `--colour-4` - blue, yellow, red, green. Each sets
  `--pie-slice-colour` for the bar and the swatch. Add one per extra option
- `.pie-slice__details` / `__bar` / `__control-column` - three equal columns,
  `--pie-column-gap` apart (16px at 375px wide → 24px at 960px). The control column is empty; it keeps the bar centred
  and the divider controls sit over it
- `.pie-slice__label` / `.pie-slice__percentage` - the label chip (swatch + name) and
  percentage chip, both global `.chip`s (see Chip). The label chip sits at the left of
  the details column and keys its swatch to the slice by setting `--chip-swatch-colour`.
  The percentage chip is inside the bar in the markup (one copy of the number), and on
  desktop is positioned out to the right-hand end of the details column. `z-index: 2`,
  above the dividers (`1`), so when a slice is thin the chip covers the line rather than
  the line cutting through the text
- `.pie-divider` - the 1px line between two slices. n slices have n - 1 dividers,
  none at the top or bottom edge. Its controls sit on a zero-height row centred on
  the line, so they never change the slices' proportions
- `.pie-divider__controls` - spans the right-hand column exactly; the lock is centred
  in it, the grab handle is flush right
- `data-option` - the option index, 1 to n, top to bottom. Each option's share is the
  value logged to the back end; the shares always total 100

**States** (no JavaScript - the host app applies these):

| Modifier | Meaning |
|---|---|
| `.icon-btn-grab--dragging` | On the grab handle for the length of a drag |
| `.pie-divider--locked` | Divider locked: it can't be dragged. Pair with `.icon-btn-lock--locked` + `aria-pressed="true"` on the lock and `aria-disabled="true"` on the grab handle |

As a divider moves, the host app updates `--pie-share` and the percentage text on the
two slices either side, and `aria-valuenow` / `aria-valuetext` on the grab handle.

**Mobile** (below 768px) - same markup, retuned through the Pie's spacing variables
in the same way as the Bingo board:

| Variable | Desktop | Mobile |
|---|---|---|
| `--pie-details-inset` | 40px at 768px wide → 80px at 960px, left of the label chip | `--padding-inline-rg` (12 → 16px) |
| `--pie-controls-inset` | the same as `--pie-details-inset`, right of the controls | 8px at 375px wide → 24px at 960px (about 19px at 767px) |
| `--pie-column-gap` | `--padding-inline-lg` (24px from 960px wide) | the same token, 16px at 375px |

The percentage chip drops back into the bar and is centred on
it. A long name wraps inside its label chip.
The lock leaves the centre of the right column and sits beside the grab handle, 4px
apart.

**Demo:** `pie-demo.html` is a throwaway copy of `pie.html` with an inline script at
the foot of the page, so the drag can be tried. `pie.html` itself has no script.

---

## Chip

Small grey label for text that sits on a busy or coloured surface. Defined in
`styles.css`. First used by the Pie question type.

```html
<span class="chip">25%</span>

<!-- With a colour key -->
<span class="chip" style="--chip-swatch-colour: var(--blu-50)">
  <span class="chip__swatch" aria-hidden="true"></span>
  BBC
</span>
```

- `.chip` - `--surface-secondary`, 4px padding, 4px corners, `--p-size-regular` text,
  sized to its content and kept to one line (`white-space: nowrap`; override where a
  long label should wrap, as the Pie does on mobile)
- `.chip__swatch` - optional 12px dot before the text, `--padding-inline-xs` (4px at
  375px wide → 8px at 960px) from it. Colour from `--chip-swatch-colour`, set on the
  chip or any ancestor; falls back to the text colour

---

## Tooltip

```html
<button class="icon-btn has-tooltip" aria-describedby="tip-x">
  …
  <span class="tooltip" role="tooltip" id="tip-x">Label</span>
</button>
```

CSS-only - revealed on `:hover` and `:focus-visible` of `.has-tooltip`. No JavaScript.

---

## Progress Bar

Overall survey completion, shown at the left of the bottom nav. Distinct from the
Step Progress Dots, which track cards within a single question.

```html
<div class="progress-indicator">
  <div class="progress-bar">
    <span class="progress" style="width: 50%"></span>
  </div>
  <p class="label">50%</p>
</div>
```

Set the fill percentage inline on `.progress` and repeat it as text in `.label`.

---

## Timer

Time left on a timed question. Defined in `styles.css`. Max width 420px; the track
stretches to fill.

```html
<div class="timer timer--running" role="timer" aria-label="Time remaining" style="--timer-duration: 30s;">
  <span class="timer__icon" aria-hidden="true"><!-- stopwatch SVG, 16px --></span>
  <div class="timer__track">
    <span class="timer__fill"></span>
  </div>
</div>
```

- **Static:** leave off `.timer--running` and set the fill's inline width to the time
  remaining (`style="width: 30%"`)
- **Counting down:** `.timer--running` runs the fill from 100% to 0% over
  `--timer-duration` in CSS, with no JavaScript. Set `animation-play-state: paused` on
  `.timer__fill` to pause it

### Timer Circle

Compact version: the stopwatch in a 34px circle, with a blue ring over the grey border
that empties clockwise from 12 o'clock.

```html
<div class="timer-circle timer-circle--running" role="timer" aria-label="Time remaining" style="--timer-duration: 30s;">
  <span class="timer-circle__icon" aria-hidden="true"><!-- stopwatch SVG, 16px --></span>
  <svg class="timer-circle__ring" width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
    <circle class="timer-circle__fill" cx="17" cy="17" r="16" pathLength="100" />
  </svg>
</div>
```

- **Static:** leave off `--running` and set `--timer-remaining` (0-100) on `.timer-circle`
- **Counting down:** `.timer-circle--running` with `--timer-duration`, same as the bar
- **Time up:** `.timer-circle--expired` hides the fill. The ring has round ends, so at
  zero it would otherwise leave a dot at 12 o'clock
- `pathLength="100"` on the `<circle>` is what lets the dash values read as percentages;
  keep it

---

## Hard Rules

- **Flexbox only** - CSS Grid is never used anywhere in this project
- **No frameworks** - vanilla HTML, CSS, JS
- **Inline SVGs** for all icons and logos
- **HTML comments** must label every major section and component
- **Semantic, descriptive class names** - these are read by developers unfamiliar with the codebase
- **BEM-style modifiers** with `--` (e.g. `.grid-group--col`, `.form-field--invalid`)
