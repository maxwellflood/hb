# Honesty Box - Component Reference

@COMPONENT-REFERENCE.md

## Project Overview

This is a **front-end component reference library** for the Honesty Box survey platform. It is being built by Grotesk (designer/dev) and handed off to the client's development team. The developers will use this repo as a reference when building out their own front end.

**Semantics and labelling are critical.** Everything must be clearly named - class names, HTML structure, file organisation, and comments all need to be self-explanatory for a developer who has never seen this codebase.

- **Stack:** vanilla HTML, CSS and JS - no frameworks, no build step
- **Content / CMS:** none - demo copy lives inline in the pages

---

## How to work with Max

- Keep summaries short: what changed, what's next, and anything you need from me.
- One step at a time. Confirm before deleting files or running destructive commands.
- Do the work yourself. Never tell me to edit, add to or amend a file. If a file needs changing, change it.
- When I ask for a doc or config file, produce the complete file, not a diff or instructions.
- If you need something only I can do (log in, click Allow, paste a key), say so in one line.
- Never ask me to paste secrets, API keys or tokens into chat. Tell me which environment variable to set instead.
- Ask rather than guess. If a request or a Figma frame leaves a gap, ask before building.

---

## File Structure

| File                                   | Purpose                                                            |
| -------------------------------------- | ------------------------------------------------------------------ |
| `index.html`                           | Design system overview - typography, logos, colours, base elements |
| `inputs.html`                          | Input components - form fields, selects, checkboxes, radios, etc.  |
| `grids-basic.html`                     | Grid/layout component reference (single-select)                    |
| `grids-basic-multiselect.html`         | Grid/layout component reference (multi-select)                     |
| `grids-image.html`                     | Image grid component reference                                     |
| `grids-image-full-width.html`          | Full-width image grid component reference                          |
| `home.html`                            | Home page                                                          |
| `intro.html`                           | Intro page                                                         |
| `navigation.html`                      | Navigation component                                               |
| `love-button.html`                     | Love button question type (0–100, press and hold)                  |
| `love-button-mid.html`                 | Love button question type (−100–100, midpoint start)               |
| `ai.html`                              | AI conversation question type (message thread + chat dock)         |
| `ai-components.html`                   | AI component reference (avatars, messages, chat input states)      |
| `tinderland-components.html`           | Tinderland swipe card reference (variants + states)                |
| `tosser-text.html`                     | Tosser swipe arena - text card                                     |
| `tosser-img.html`                      | Tosser swipe arena - image card                                    |
| `tosser-text_img.html`                 | Tosser swipe arena - text card with image options                  |
| `tosser-text-fav.html`                 | Tosser swipe arena - stacked “favourite” cards                     |
| `bingo-img_text.html`                  | Bingo drag-and-drop board - image card, text drop zones            |
| `bingo-img_text-4-corners.html`        | Bingo board - four zones in the corners of the same 3 × 3          |
| `bingo-img_img.html`                   | Bingo board - image card, image drop zones                         |
| `bingo-img_img-4-corners.html`         | Bingo board - image zones, four in the corners                     |
| `bingo-text_text-4-corners.html`       | Bingo board - text card, four text zones in the corners            |
| `bingo-text_img-4-corners.html`        | Bingo board - text card, four image zones in the corners           |
| `bingo-text_text.html`                 | Bingo board - text card, eight text drop zones                     |
| `bingo-text_img.html`                  | Bingo board - text card, eight image drop zones                    |
| `dropper-text_text.html`               | Dropper board - text card, ten horizontal text zones               |
| `dropper-image_text.html`              | Dropper board - image card, ten horizontal text zones              |
| `dragger-text_text.html`               | Dragger board - text card, ten vertical text zones                 |
| `dragger-image_text.html`              | Dragger board - image card, ten vertical text zones                |
| `story-question.html`                  | Story Question - Insert Word sentences, all three menu variants    |
| `expand-image.html`                    | Expand Image - stimulus image with expand button and lightbox      |
| `styles/styles.css`                    | Global styles, reset, typography, utility classes                  |
| `styles/input-styles.css`              | Styles specific to input components                                |
| `styles/love-button-styles.css`        | Styles specific to the love button component                       |
| `styles/ai-styles.css`                 | Styles specific to the AI conversation components                  |
| `styles/tinderland-styles.css`         | Styles for the Tinderland card and Tosser arena                    |
| `styles/bingo-styles.css`              | Styles for the Bingo board, drop zones and card                    |
| `styles/dropper-styles.css`            | Styles for the Dropper and Dragger boards, card and zones          |
| `styles/insert-word-styles.css`        | Styles for the Insert Word trigger and word menu                   |
| `styles/expand-image-styles.css`       | Styles for the Expand Image thumbnail, button and lightbox         |
| `styles/hb-styles-audited.css`         | Developers' stylesheet, annotated against ours (not linked by pages) |
| `scripts/grids-scripts.js`             | Scripts for grid demos                                             |
| `scripts/grids-multiselect-scripts.js` | Scripts for multiselect grid demos                                 |
| `scripts/inputs-scripts.js`            | Scripts for input demos                                            |
| `scripts/love-button.js`               | Scripts for the love button (0–100 variant)                        |
| `scripts/love-button-mid.js`           | Scripts for the love button (−100–100 variant)                     |
| `scripts/home.js`                      | Scripts for the home page                                          |
| `scripts/ai-scripts.js`                | Scripts for the AI conversation page                               |
| `scripts/insert-word.js`               | Demo behaviour for the Insert Word page (open, choose, change)     |
| `fonts/`                               | Local font files                                                   |
| `lottie/`                              | Lottie animation files                                             |

---

## Tech & Conventions

- **Layout:** Flexbox only - CSS Grid is never used
- **Fonts:** Inter (Google Fonts) + Dorian (`fonts/DorianVF.woff`, locally loaded variable font)
- **Naming:** Follow existing conventions already established in the codebase - e.g. `form-field`, `form-label`, `form-label--sub`, `text-input`, `input-message`, `form-group`, `content-wrapper`, `content`, `question`, `site-header`, `site-main`. BEM-style modifiers with `--` where variants exist. Class names must be semantic and descriptive - these are read by developers unfamiliar with the codebase
- **Comments:** Use HTML comments to label every major section and component clearly
- **No frameworks** - vanilla HTML, CSS, JS
- **Scope:** Don't refactor, tidy or "improve" code outside the task you were given

---

## Handoff Notes

- This repo is a **static reference** - not a running app
- Developers will read the source to understand structure, spacing, naming, and component variants
- Every component should have clear variant states where relevant (default, hover, focus, disabled, error, etc.)
- Inline SVGs are used for icons/logos

---

## Figma

The Figma file is the design source of truth. When referencing Figma frames, paste the link directly - frames are small and targeted (not full pages).

---

## Debugging runtime and UI problems

**When Max reports something is broken in the browser (clicks not working, styles missing, anything visually wrong), ask for the browser console output FIRST, before forming or acting on any hypothesis.**

- **Read symptom differences.** "Works on refresh, fails when clicking between pages" means the problem is client-side only.
- **Do not guess causes in sequence.** Each wrong guess costs a round trip. Ask for the one piece of evidence that would settle it.
- **Say plainly when you don't know.** "I don't know, and here is the one thing that would tell us" beats another confident theory.
- **Fix the reported problem before anything else.** Do not touch adjacent code while a reported breakage is outstanding.

---

## Verification: hard stop

Do NOT launch browsers, Chromium, Puppeteer, Playwright, or any headless tooling.
Do NOT take screenshots. Do NOT capture, render, or re-inspect pages to "check"
your own work.

The user has the local dev server running and verifies everything visually
themselves. That is the only verification step. Yours is zero. This repo has no
build, typecheck or lint step. Don't start, stop or restart the dev server unless asked.

When a task is complete: say so in text, briefly note what you changed, and stop.
Do not open, screenshot, or re-check anything. The user will report back if
something is broken.

---

## Delegation policy

Follow these rules when choosing where work runs. Subagents are defined in
`.claude/agents/` in this repo.

**Before delegating anything, read `~/Desktop/claude-code-agent-policy.md`.** It
carries hard limits on what subagents may touch and on verifying their work, and
overrides the table below. In this repo that rules out most delegated edits: the
pages carry visible copy and the Markdown docs carry non-ASCII characters (×, ≤, →,
curly quotes), so edits to them stay in the main session. Bulk mechanical changes
are done with a script (`sed`, Python), not by a model retyping lines.

| Tier | Use for | Where it runs |
|---|---|---|
| Basic / mechanical | Adding a component demo block from an established pattern, duplicating a section for a new variant, renaming classes across files, formatting, swapping SVGs, repetitive find and replace, running commands, reading or summarising files | Delegate to the `quick-tasks` subagent (Haiku), subject to the agent policy above |
| Read-only search | Finding where a class is defined, tracing which stylesheet owns a rule, auditing which pages use a component, understanding the codebase without changing it | Delegate to the `Explore` subagent (Haiku) |
| Standard development | Building new component pages, writing the reference markup for a new question type, CSS for a new variant, routine layout and styling fixes | Handle in the main session on Sonnet |
| Hard problems | Naming and structuring a new component so it reads clearly at handoff, deciding how a component generalises across variants, reworking shared tokens or layout primitives, multi-file debugging, anything costly to unwind | Handle in the main session, escalating to Opus only for the reasoning, then drop back down |

Default bias: pick the cheapest tier that can do the task well. Do not use Opus
for routine edits or for anything a Haiku subagent can complete. When a task will
produce a lot of verbose output (large file reads, full-page audits), delegate it
to a subagent so that output stays out of the main context.

Caveats specific to this repo:

- **Verify delegated markup before reporting it done.** This is a handoff reference,
  so wrong markup is the whole cost. Read the `git diff` or re-read the block rather
  than trusting a subagent's summary.
- **Naming is not mechanical.** Class names and section labels are the deliverable
  here - developers read them cold. Treat a new name as standard-development work
  even when the edit itself is trivial.
- **Don't delegate design-source decisions.** Anything driven by a Figma frame stays
  in the main session; a Haiku agent cannot see the design.

---

## Subagent selection

Match the subagent to the task's actual complexity. Do not default to the most capable or expensive subagent.

- Use the lightest subagent that can do the job correctly.
- Only escalate to a more capable subagent when the task genuinely requires it (complex reasoning, architecture decisions, tricky debugging). State why you're escalating before you do.
- Routine work (boilerplate, simple edits, file lookups, formatting, straightforward tests) goes to the lightest tier.
- If unsure which tier fits, pick the lower one and ask before escalating.
- Follow the task to subagent mapping already defined in this file. Do not override it to use a heavier subagent.
