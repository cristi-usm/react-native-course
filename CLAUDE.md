# React Native Course — Project Guide

## 1. What this is

A **Slidev-based presentation system** for a university course on *Dezvoltarea aplicațiilor
mobile*, taught in Romanian to students who already know some JavaScript and React.

- Slidev v52 + Vue 3.5, pnpm workspaces — one workspace per lesson deck
- Neversink theme, **indigo-light** colour scheme
- `slidev-addon-excalidraw` — hand-drawn diagrams embedded in a slide
- `<ExpoPreview>` — a live Expo Snack running the example on a phone, inside the slide

The previous single-deck version of the course is archived under `legacy/` (see §12). It is
kept for content mining only and is not built or deployed.

Generic Slidev and Neversink reference material lives in `.claude/skills/` (see §11). This
file covers only what is true of **this repository** and the rules that always apply.

## 2. Language convention — CRITICAL

- ✅ All educational content, explanations and instructions in **Romanian**
- ✅ Code comments in Romanian, for educational clarity
- ✅ All technical terms in **English** — never translate them

**Never translate**: component, props, state, hook, render, bundler, native, layout,
flexbox, stack, tab, screen, navigation, deep link, storage, cache, token, permission,
push notification, build, gesture, thread, bridge, `View`, `Text`, `Image`, `Pressable`,
`FlatList`, `StyleSheet`, `SafeAreaView`, `useState`, `useEffect`, `async`, `await`,
`fetch`, `Promise`.

**Exceptions that ARE translated** in slide prose, because Romanian CS literature uses them
and students meet them everywhere else: `compilator`, `bibliotecă`, `dispozitiv`, `ecran`,
`aplicație`. The English form stays only where it is an identifier.

### No dashes in slide prose

Em dashes and en dashes are banned in anything a student reads. They are a way of avoiding
a grammatical decision, and the decision is usually the clearer sentence. Use the
punctuation the sentence actually calls for:

| instead of | write |
|---|---|
| `**Fabric** — noul renderer` | `**Fabric**: noul renderer` |
| `nu este o problemă de cod — este una de layout` | `nu este o problemă de cod, ci una de layout` |
| `se vede imediat — rulați exemplul` | `se vede imediat. Rulați exemplul` |

A label followed by its explanation takes a colon. Two contrasted clauses take `ci` or
`iar`. A new thought takes a full stop. Parentheses are fine when the aside really is an
aside.

The exceptions are strings that are not prose: the generated headmatter (`info:` from
`lessons.json`, the `# == shared: … ==` marker that `sync-headmatter.mjs` searches for),
code blocks, terminal output, and simulated UI.

### Two audiences in one room

Half the students took the React course and half did not. There is no recap lesson: every
React notion is taught **from scratch, in React Native**, and what *changes* relative to
the web goes in a `<DinReact>` aside. Newcomers read the slide and skip the box; returning
students read the box and skip the slide.

- ✅ The slide alone must teach the concept to somebody who has never seen React
- ✅ The aside alone must be worth reading to somebody who knows React well
- ❌ Load-bearing content inside a `<DinReact>` — it is optional by construction
- ❌ "Ca în React, …" in slide prose; that sentence is the aside's job

See the `course-components` skill for the component.

## 3. Slide titles — CRITICAL

**A slide title contains only the title. Nothing else.**

- ❌ `# Lecția 6` / `## Navigare` / `# Lecția 6: Navigare` / `# Lecția 6 — Navigare`
- ✅ `# Navigarea cu Expo Router` / `# Problema Ecranelor Multiple`

No lesson number, no `Lecția N` prefix, no numbering of any kind in a visible heading — the
number already appears in the hub grid and in the navigation.

The numbered form (`Lecția 6: Navigare`) belongs **only** in `common/lessons.json` and in
the generated frontmatter `title` / `info`, which drive the browser tab and the hub card.

## 4. Slide conventions

- ✅ `color: indigo-light` and `align: c` on every content slide
- ✅ `layout: top-title` for most content slides
- ✅ `v-click` / `v-clicks` are allowed — see *Clicks* below

### Clicks disappear once a lesson is past

A lecture wants reveals: the class sees one idea at a time and cannot read ahead. An
archived lesson wants the opposite — a student revisiting lesson 3 in week 9 should see
the whole slide at once, not press Space through it.

Both come from the same source. `common/setup/transformers.ts` (re-exported by each deck's
`setup/transformers.ts`) **strips** `v-click`, `v-clicks` and `v-after` from the markdown of
every deck whose slug is not `currentLesson` in `common/theme/config.ts`. It is a markdown
transformer, so the archived deck has zero click steps — not hidden content: hiding with CSS
would leave the click *count* intact and a five-reveal slide would still swallow five presses
of Space.

It is a build/dev-time switch — advancing `currentLesson` and restarting is what flattens the
previous lesson. To preview either form without touching the config:

```bash
RN_CLICKS=strip pnpm dev:06-navigare   # what students will see later
```

`RN_CLICKS=keep` forces the lecture form. Matches inside fenced code blocks are left alone,
so a slide may show `v-click` as an example. `v-mark` is not touched.

- ✅ Reveals carry the *pacing* of the explanation — one per step you actually stop on
- ❌ Don't rely on click order for meaning; the archived deck shows everything at once
- ⚠️ Nested reveals need explicit numbers (`v-click="2"`) — see the `slide-reveals` skill

```markdown
---
layout: top-title
color: indigo-light
align: c
---

:: title ::

# Liste Performante

:: content ::

`FlatList` randează doar elementele vizibile, nu toată lista.
```

### Discussion questions — always a `<SpeechBubble>`

A slide that asks the class something — not a section title, not a rhetorical lead-in, but a
question you stop and collect answers on — is a centred `<SpeechBubble>` on `layout: center`.
The bubble is the signal: students learn that a bubble means *you are being asked*, and it
sets a plain question apart from the surrounding explanation.

```markdown
---
layout: center
color: indigo-light
---

<div class="flex justify-center">

<SpeechBubble position="b" color="indigo-light" shape="round" animation="float" maxWidth="800px" textAlign="center" borderWidth="2px">

<div class="text-6xl font-bold py-4">

De ce nu scriem două aplicații?

</div>

</SpeechBubble>

</div>
```

- ✅ **One question, nothing else** — no sub-questions, no instructions to the class, no hints
- ✅ `text-6xl font-bold` rather than `#` — it must read from the back of the room
- ✅ `color` matches the deck scheme, so the bubble is tinted, not white-on-white
- ✅ The `flex justify-center` wrapper — `maxWidth` makes the bubble a fixed-width block
  that would otherwise sit left
- ❌ Presenter reminders anywhere on the slide, notes included (see *No presenter notes*)

### One quote character: `"`

Every quotation mark a student reads is a straight `"`. Not the Romanian `„…"`
pair, not `“…”`, not `«…»`, and not `‘…’` for a single quote.

The reason is consistency, not typography. Slide prose sits next to code on almost every
slide, and JSX is full of `"` and `'`. Two visually similar but different pairs of quotes
on one slide invites students to copy a `„` into a `style={{ }}` and then wonder why Metro
is complaining about a character it cannot even name.

```
❌ componenta este „controlată".        ✅ componenta este "controlată".
```

The same goes for apostrophes: `'` where a real quote is needed, and Romanian words that
would take one are rewritten rather than punctuated around.

### No presenter notes

A trailing `<!-- … -->` block in a slide is a **speaker note**: Slidev shows it in
presenter mode. This course does not use them, and no deck should contain one.

The reasons are practical. A note is written for one person on one delivery, it goes stale
the moment the slide is edited, and it is invisible in normal view, so nobody notices it
rotting. Worse, it splits the lesson in two: what the slide says and what the presenter is
supposed to remember to say. If a point is worth making, put it **on the slide**, where the
student revisiting the deck in week 9 will also find it.

⚠️ `align` arity differs per layout: `top-title` takes one letter (`align: c`), but
`top-title-two-cols` and `two-cols-title` need three parts (`align: c-lt-lt`). Passing
`align: c` there renders a red *"invalid layout params"* slide. See the `slide-layouts`
skill.

## 5. Repository layout

```
react-native-course/
├── slides/                    # one independent deck per lesson
│   ├── 00-hub/                # landing page / table of contents (port 3030)
│   ├── 01-dezvoltarea-aplicatiilor-mobile/   (port 3031)
│   └── …                      # up to 15-build-si-distribuire (port 3045)
├── common/                    # shared across every deck
│   ├── lessons.json              # ⭐ single source of truth for the lesson structure
│   ├── lessons.ts                # navigation logic between decks
│   ├── components/            # shared Vue components (auto-imported everywhere)
│   ├── setup/main.ts          # theme mixin + markdown globals
│   ├── theme/                 # colour scheme and shared styles
│   ├── vite/                  # componentDirs + multiPublicPlugin
│   └── public/                # shared assets
├── scripts/                   # dev orchestration, build, headmatter sync
├── legacy/                    # the previous single-deck course (§12)
└── README.md                  # quick start (Romanian)
```

Each `slides/*` is an independent pnpm workspace (`@react-native-course/<name>`)
with its own `package.json`, `vite.config.ts`, `setup/main.ts` and dev port.

### Why one deck per lesson

Every lesson is a separate Slidev app rather than one deck stitched together. Slide
numbering is then local to a lesson (adding a slide to lesson 2 cannot shift the links in
lesson 7), each dev server only reloads its own file, and a lesson can be presented on its
own. The `legacy/` course is exactly the failure mode this avoids: its table of contents
links to absolute slide numbers (`[Curs 2](57)`) into one 16000-line deck.

The cost: cross-deck links are real navigations. In dev they point at `localhost:<port>` —
**the deck you navigate to must be running**; in a build they are paths under a shared
base. `common/lessons.ts` (`deckUrl`) is the only place that knows the difference.

### `common/lessons.json` is the single source of truth ⭐

Lesson number, slug, port, module, icon, title, description and `published` all live
in this one file.
`scripts/*.mjs` read it at build time; `common/lessons.ts` reads it at runtime. The hub
grid, the prev/next `<DeckNav>` and the generated deck titles all derive from it.

**Never hardcode** a lesson title, port or neighbour link in a deck — edit the registry.

`icon` is an **UnoCSS icon class** (`i-ph-…`), not an emoji — drawn icons only,
one family (Phosphor duotone), everywhere. UnoCSS never scans `.json`, so those
classes would generate nothing; `common/setup/unocss.ts` safelists them and every
deck re-exports it from its own `setup/unocss.ts`. That file's default export is
**called** by Slidev, so it must be a function returning a config, not a config.

`published: true` is what makes a lesson clickable on the hub grid. Everything
else stays visible but locked, rendered as **skeleton bars with no title** — the semester
walks the flag forward. The hub slide the 🏠 button and `<DeckNav>` link to is
`HUB_LESSONS_SLIDE` in `common/lessons.ts`; move the grid in `slides/00-hub/slides.md` and
that constant moves with it.

## 6. Headmatter is generated

Slidev cannot include headmatter, so every deck repeats `theme`, `addons` and the shiki
config in full. `scripts/sync-headmatter.mjs` owns that repetition:

```yaml
---
title: 'RN · Lecția 6: Navigare'   # generated from common/lessons.json
info: '…'                          # generated from common/lessons.json
layout: cover                      # ← the deck's own half, edit freely
color: indigo-light
# == shared: generated by scripts/sync-headmatter.mjs — do not edit below ==
theme: neversink                   # ← regenerated on every run, edits are lost
addons:
  - slidev-addon-excalidraw
---
```

To change the theme or an addon **for the whole course**, edit `SHARED` in
`scripts/sync-headmatter.mjs`, then run `pnpm sync-headmatter`.
`node scripts/sync-headmatter.mjs --check` exits non-zero if any deck is stale.

⚠️ Never put `---` inside the headmatter, not even in a YAML comment — Slidev silently
truncates it there. See the `slide-deck-config` skill for the full failure mode.

## 7. Shared components

In `common/components/`, auto-imported in every deck — **no import needed** in slides:

| Component | What it does |
|---|---|
| `<LessonGrid />` | Grid of all lessons, grouped by module (used by the hub) |
| `<LessonCard slug="06-navigare" />` | A single card in that grid |
| `<DeckNav />` | End-of-deck navigation: previous lesson / hub / next lesson |
| `<HomeButton />` | 🏠 back to the hub; rendered on every slide via `global-bottom.vue` |
| `<GithubLink />` | Repository link icon (repo URL comes from `lessons.json`) |
| `<SlideBottom />` | Page counter footer; rendered via each deck's `slide-bottom.vue` |
| `<ExpoPreview :code platform height />` | A live Expo Snack running the example (§8) |
| `<DinReact [label] />` | Aside for students who already took the React course (§2) |
| `<Definition term="…" source="…" [emphasis] />` | A definition card — term, attribution, text |
| `<Chip>React Native</Chip>` | A pill with an auto-resolved language/tool logo |
| `<AxisMap :items :zones … />` | A 2D map: two axes crossing, four named zones |
| `<LogoWall :names />` | A collage of logos from `common/public/icons/` |
| `<AppWall :apps [mark-rn] />` | A wall of app tiles; `mark-rn` marks the React Native ones |
| `<StatRow :stats :source />` | A row of large figures, each on its own rule |
| `<Discontinued :items />` | Things that existed and no longer do, struck through |
| `<FlowSteps :steps />` | A left-to-right pipeline of named stages |
| `<LayerStack :layers />` | A top-to-bottom stack: your code above, the platform below |
| `<ThreadLanes :lanes :boundaries />` | Threads side by side, and the seam between them |
| `<ArchMap variant="bridge\|jsi" />` | The React Native architecture map, old or new |
| `<RuntimeMap title engine :parts :panels />` | A JS runtime: the engine, and what the host adds |
| `<CallTrace :lanes :steps />` | Calls between threads, in the order they happen |
| `<CompareGrid :options :rows />` | A comparison matrix with a verdict mark per cell |
| `<DeviceFrame [platform]>…</DeviceFrame>` | A phone drawn around a piece of the slide |
| `<Timeline :items />` | A dated sequence of events |

Props, the slide patterns each one belongs in, and how to write a new one: the
**`course-components`** skill. Read it before using `<Definition>` or adding anything to
`common/components/`.

They are wired in through each deck's `vite.config.ts`, which adds `common/components` to
Slidev's auto-import dirs. **That directory entry is load-bearing** — registering a shared
component globally in `setup/main.ts` is not enough, and it fails as a bogus "Icon not
found" error. See the `slide-components` skill.

⚠️ Slidev **spreads** `slidev.components` over its own options, so a `dirs` array
*replaces* its default list rather than extending it — dropping the builtins (`<Toc/>`,
`<Link/>`), the theme's components (`<Admonition/>`, `<SpeechBubble/>`, the Kawaii
characters) and the deck's own `components/`. It fails **silently**: Vue renders the
unresolved tag as a plain HTML element, so a `<SpeechBubble>` shows its text with no
bubble around it. `common/vite/component-dirs.ts` rebuilds the full list —
`componentDirs(import.meta.dirname)`; never hand-write `dirs` in a deck.

Deck-local components go in `slides/<deck>/components/`. Neversink components
(`<AdmonitionType>`, `<StickyNote>`, …) are available everywhere.

## 8. Code in slides

**JavaScript + JSX by default** — the course starts from `create-expo-app --template
blank`, which is a plain JavaScript project (`App.js`), so React Native components are
fenced as `jsx`, never as `js` (which loses the JSX highlighting).

`ts` and `tsx` are still correct where the example really is TypeScript and would not
compile without it — a TurboModule spec in lesson 2 is the case that exists today. Do not
add types to an ordinary component example just to reach for `tsx`.

⚠️ `common/setup/shiki.ts` **replaces** Slidev's auto-detected `langs` list rather than
extending it. Every language used in any deck must be listed there by hand, or its blocks
render grey with no highlighting. Check with:

```bash
grep -rhoE '^```[a-z]+' slides/*/slides.md | sort -u
```

### Running an example: `<ExpoPreview>`

There is no local code runner. A React Native example that must actually *run* goes in an
`<ExpoPreview>`, which embeds an **Expo Snack**: the code compiles on Expo's servers and
renders in a phone frame in the slide.

That has the same failure mode as any remote runner: it needs a live network connection at
presentation time, and it is slow to boot. So:

- ✅ Use `<ExpoPreview>` only when *seeing it run on a phone* is the point
- ✅ Plain ` ```tsx ` blocks for syntax, comparisons and short fragments
- ✅ Keep the expected result visible on the slide too — a screenshot or a described
  outcome — so a dead network does not cost you the point
- ⚠️ A handful per deck, not one per slide: each embed is an iframe booting a bundler
- ✅ Romanian in comments and in user-visible strings inside the example
- ❌ Never leave a lint or type error in an example — students copy them verbatim

The component lazy-loads on scroll (`IntersectionObserver`) and shares one
`snack.expo.dev/embed.js` across every embed in a deck, so several on one slide cost one
script load, not several.

## 9. Workflows

### Adding a lesson

1. Add the entry to `common/lessons.json` — number, slug, port, module, icon, title,
   description. Leave `status` off until the deck is written; it then shows as a *schelet*
   in the hub grid.
2. Create `slides/<slug>/` with `slides.md`, copying `package.json`, `vite.config.ts`,
   `setup/main.ts`, `setup/unocss.ts`, `setup/transformers.ts`, `setup/shiki.ts`,
   `global-bottom.vue` and `slide-bottom.vue` from a neighbouring deck (adjust the package
   name and port).
3. Add a `dev:<slug>` script to the root `package.json`.
4. `pnpm install` (registers the workspace), then `pnpm sync-headmatter`.

The deck then appears in the hub grid and in prev/next navigation automatically.

### Development

```bash
pnpm install

pnpm dev                        # all decks (mprocs TUI if installed)
pnpm dev --lazy                 # only the hub; start the rest from the mprocs UI
node scripts/dev.mjs hub 5 6    # only the hub and lessons 5 and 6
pnpm dev:hub                    # a single deck
pnpm dev:06-navigare
```

Ports: `3030` hub, `3030 + lesson number` for lessons. Cross-deck links point at
`localhost:<port>` in dev, so the deck you navigate to must be running.

Editing `slides.md` or a component hot-reloads; `vite.config.ts` needs a restart.

The lesson currently being taught is `currentLesson` (a slug) in `common/theme/config.ts` —
earlier lessons show ✅ in the hub grid, this one ▶️, and this is the only deck that keeps
its `v-click` reveals (§4).

> **Node**: on Node 25 the global `localStorage` breaks a transitive Slidev dependency at
> import time; `scripts/node-compat.mjs` applies the workaround to every spawned process.

### Never open a browser preview

Do not start a browser preview, a dev server or any browser automation to "verify" a slide.
The user runs the decks themselves and looks at them. Make the change, explain what it does,
and stop there.

### Build & deploy

```bash
pnpm build                                   # everything into dist/
node scripts/build.mjs --only 06-navigare    # rebuild a single deck in place
BASE_PATH=/react-native-course pnpm build
pnpm preview
```

The hub builds to `dist/`, each lesson to `dist/<slug>/`. `scripts/fix-spa-routing.mjs`
then gives every deck a `404.html` copy of its own `index.html` and writes a root
dispatcher, so deep links like `/06-navigare/12` survive on static hosts.

GitHub Pages serves the site from a repository subpath — `.github/workflows/deploy.yml`
passes it through `BASE_PATH`. That is the only deploy target; another static host needs
the same per-deck SPA fallback, which the generated `404.html` files provide.

## 10. Troubleshooting

**Theme is `@slidev/theme-default`, every layout "Unknown"** — the headmatter was
truncated by a `---` inside it (§6). Fix it and run `pnpm sync-headmatter`.

**A component renders as plain text, unstyled, with no error** — its directory is missing
from the deck's auto-import `dirs` (§7). Use `componentDirs()`; don't override `dirs`.

**"Icon `xx/…` not found" for a component you wrote** — unplugin-icons claimed the tag.
Make sure the component's directory is in the deck's `slidev.components.dirs` (§7).

**`ParseError: Unexpected token` in a `.ts` file under `common/setup/`** — a doc comment
contains the glob `slides/*/slides.md`, and `*/` closes the block comment early. Space it
out as `slides/ * /slides.md`.

**An admonition ignores `class="mt-8"`** — `Admonition`'s scoped styles set `margin` and
`.markdown-alert[data-v-…]` outranks a one-class UnoCSS utility. Wrap it in
`<div class="mt-8">` (blank lines inside) and put any `v-click` on the wrapper.

**Several clicks change nothing, then everything appears at once** — reveals are nested
inside a reveal and the ids were handed out in registration order, not visual order. Number
them explicitly. See the `slide-reveals` skill.

**A code block renders grey with no highlighting** — its language is missing from `langs`
in `common/setup/shiki.ts` (§8).

**A `v-click` does nothing** — the deck is not `currentLesson`, so its reveals were
stripped (§4). `RN_CLICKS=keep pnpm dev:<slug>` to work on them anyway; the setup file is
read at server start, so changing either needs a restart.

**A lesson card shows only grey bars** — that lesson is `published: false`. It is the
intended locked state, not a rendering bug (§5).

**"Entry file … does not exist"** — a dev server still points at an old deck path after a
rename. Kill it and restart, then `pnpm install` to relink the workspace.

**Renaming a deck** touches more than the directory: `common/lessons.json` (`slug`), the
deck's `package.json` (`name`), the root `package.json` (`dev:*` script),
`common/theme/config.ts` (`currentLesson`), `README.md` — then `pnpm install` and
`pnpm sync-headmatter`.

**Port already in use** — decks use `strictPort`, so this fails loudly on purpose (a
shifted port would silently break every cross-deck link). `lsof -ti:3035 | xargs kill`.

## 11. Reference

Slidev and Neversink reference material is in `.claude/skills/`, loaded on demand:

| Skill | For |
|---|---|
| `slide-layouts` | layouts, slots, columns, the `align` notation, colour schemes |
| `slide-components` | Neversink and Slidev components, icons, `v-mark`, `ns-c-*` classes |
| `slide-code-blocks` | highlighting, Monaco, magic-move, snippets, code groups |
| `slide-reveals` | `v-click` policy, nested-click numbering, animated components |
| `slide-diagrams` | Mermaid (with examples per diagram type), PlantUML, LaTeX |
| `slide-presenting` | presenter mode, notes, drawing, timer, export, hosting |
| `slide-theming` | setup hooks, custom layouts/components, styles, UnoCSS, addons |
| `slide-deck-config` | headmatter/frontmatter options, directory structure, CLI |
| `course-components` | **our own** components: `<Definition>`, `<LessonGrid>`, `<DeckNav>`, … |
| `impeccable` | visual design work on components and layouts |

Upstream: [Slidev](https://sli.dev/) ·
[Neversink](https://gureckis.github.io/slidev-theme-neversink/) ·
[Expo](https://docs.expo.dev/) · [React Native](https://reactnative.dev/)

## 12. `legacy/`

The course as it was before this restructure: one Slidev deck (`legacy/slides.md`) plus 16
`legacy/presentations/*/slides.md` files, around 16000 lines in total, with its assets in
`legacy/public/`.

It is **not a workspace**, is not built, and is not deployed. It exists so lessons can mine
it for material — diagrams, examples, explanations that were already written and worked in
class. When you take content from it, take the *content*: rewrite it to the conventions in
§2, §3 and §4 rather than pasting it across, since the old decks predate most of them.

Do not add to it, and do not fix bugs in it.

---

## Quick checklist ✅

- [ ] Slide content in **Romanian**, technical terms in **English**
- [ ] Slide titles carry **only the title** — no `Lecția N`, no numbering
- [ ] `color: indigo-light` and `align: c` on every content slide
- [ ] Quotes are straight `"`, never `„…"`
- [ ] No em dashes or en dashes in slide prose
- [ ] No `<!-- … -->` speaker notes anywhere in the deck
- [ ] `v-click` used for pacing only — the deck must still read with every reveal removed
- [ ] Code fenced as `tsx`, and its language is listed in `common/setup/shiki.ts`
- [ ] `<ExpoPreview>` only where running it live is the point, with the outcome also visible
- [ ] Lesson metadata changed in `common/lessons.json`, not in the deck
- [ ] Shared headmatter changed in `scripts/sync-headmatter.mjs`, then `pnpm sync-headmatter`
