---
name: course-components
description: The course's own shared components in common/components/ — <Definition> (definition cards), <Chip> (pills with a logo), <AxisMap> (2D quadrant map), <CompareGrid> (comparison matrix), <LayerStack> (layered stack), <ThreadLanes> (threads as lanes), <ArchMap> (the architecture map), <RuntimeMap> (a JS runtime), <CallTrace> (calls in order), <DeviceFrame> (phone mockup), <LogoWall> (logo collage), <LessonGrid>/<LessonCard>, <DeckNav>, <HomeButton>, <GithubLink>, <SlideBottom> — their props, the slide patterns they belong in, the icon registry, and how to add a new shared component. Use when putting a definition, a language/tool logo, a comparison diagram, or a lesson grid on a slide, or when writing a new component for common/components/.
---

# Course components

Everything in `common/components/` is auto-imported in every deck — **no import needed** in
slides. This file documents the components we wrote. Neversink's and Slidev's own
components are in the `slide-components` skill.

| Component | What it does |
|---|---|
| `<Definition term="…" source="…" [emphasis] [color] />` | Definition card — eyebrow, attribution, text |
| `<Chip [icon] [emphasis] [color]>C</Chip>` | Pill with an auto-resolved logo |
| `<AxisMap :items :zones x-label y-label … />` | 2D map: two axes crossing, four named zones |
| `<LogoWall :names [dir] [size] [dim] />` | Collage of logos from `public/icons/` |
| `<AppWall :apps [mark-rn] [columns] [size] />` | Wall of app tiles, optionally marking the React Native ones |
| `<StatRow :stats [source] />` | A row of large figures, each on its own rule |
| `<Discontinued :items [columns] />` | Things that existed and no longer do, struck through |
| `<ExpoPreview :code [platform] [height] />` | A live Expo Snack embed of a React Native example |
| | `platform` defaults to `web`; the Appetize-backed `android`/`ios` tabs are off by default |
| `<DinReact [label] />` | Aside for students who already took the React course |
| `<FlowSteps :steps [caption] [size] />` | Horizontal pipeline: labelled nodes + animated arrows |
| `<LayerStack :layers [caption] [size] />` | Vertical stack: your code on top, the platform below |
| `<ThreadLanes :lanes [:boundaries] [caption] [size] />` | Threads as vertical lanes, and the seam between them |
| `<ArchMap [variant] [focus-seam] [caption] [size] />` | The architecture map: bridge, or JSI + Fabric + TurboModules |
| `<RuntimeMap title engine [:parts] [:panels] [emphasis] />` | A JS runtime: the engine, and what the host wraps it in |
| `<CallTrace :lanes :steps [caption] [size] />` | Calls between threads, in the order they happen |
| `<CompareGrid :options :rows [caption] />` | Comparison matrix: options × criteria, a verdict per cell |
| `<DeviceFrame [platform] [caption] …>…</DeviceFrame>` | A phone around a piece of the slide |
| `<LessonGrid />` | Grid of all lessons, grouped by module (used by the hub) |
| `<LessonCard slug="08-arrays" />` | A single card in that grid |
| `<DeckNav />` | End-of-deck navigation: previous lesson / hub / next lesson |
| `<HomeButton />` | 🏠 back to the hub; rendered on every slide via `global-bottom.vue` |
| `<GithubLink />` | Repository link icon (repo URL comes from `lessons.json`) |
| `<SlideBottom />` | Page counter footer; rendered via each deck's `slide-bottom.vue` |

---

## `<DinReact>`

Half the room took the React course and half did not. Every React notion is taught from
scratch, in React Native; the delta from the web goes in this aside. Newcomers read the
slide and skip the box, returning students read the box and skip the slide.

```markdown
<DinReact>

`key` devine `keyExtractor`, iar `FlatList` nu randează toate elementele.

</DinReact>

<DinReact label="Din React Router">…</DinReact>
```

- ✅ **One or two sentences.** It is a margin note, not a second explanation
- ✅ Say what *changes*, not what stays the same. "La fel ca pe web" is not worth a box
- ✅ Blank lines inside the tags, or the markdown arrives as literal text
- ❌ Content the newcomers also need — anything load-bearing goes on the slide
- ❌ More than one per slide; two asides means the slide is really two slides

The rail is cyan, deliberately **not** the deck's indigo. The aside has to read as a
different voice from the slide around it; tinting it with the same hue as every heading
makes it look like part of the argument rather than an interruption of it.

---

## `<Definition>`

Definitions recur across the whole course, so they get one component rather than a
hand-rolled box per slide.

| Prop | Default | |
|---|---|---|
| `term` | `''` | The word being defined. Eyebrow, top left |
| `source` | `''` | Where it comes from — `DEX`, `Standardul C`, `Pe scurt` |
| `emphasis` | `false` | The version to remember: tinted fill, `1.9rem` semibold text, wider rail |
| `color` | `blue-light` | Neversink scheme for the accents |

### The pattern: quote it, then restate it

Two slides, one definition each. First what the source says, then what it means in our
words — the `emphasis` card is the one students should walk away with.

```markdown
---
layout: top-title
align: c
color: blue-light
---

:: title ::

# Ce Spune Dicționarul

:: content ::

<div class="max-w-4xl mx-auto mt-10">

<Definition term="Programare" source="DEX">

- Acțiunea de a programa și rezultatul ei.
- Alcătuire a unei succesiuni de instrucțiuni care permit unui calculator să
  rezolve o problemă dată, plecând de la datele inițiale.

</Definition>

</div>

---
layout: top-title
align: c
color: blue-light
---

:: title ::

# Ce Înseamnă Pe Scurt

:: content ::

<div class="max-w-4xl mx-auto mt-10">

<Definition term="Programare" source="Pe scurt" emphasis>

A face computerul să execute exact ce vrem noi — **fără greșeli**, de fiecare dată.

</Definition>

</div>
```

- ✅ **One definition per slide** — never two cards stacked with an arrow between them
- ✅ The `max-w-4xl mx-auto` wrapper — a full-width card gives unreadably long lines
- ✅ An external definition is **quoted accurately and attributed**. Write `DEX` on the
  badge only if the text is really DEX's; a paraphrase is `Pe scurt`, not `DEX`
- ✅ Several senses → a markdown list in the slot; the component styles the markers
- ❌ DEX's `♦` sense separator — it means nothing to a first-year student, use a list
- ❌ A second `emphasis` card on the same slide; emphasis only works against a quiet one

### Why it looks the way it does

The card is white with one saturated rail, and the body text **inherits** the slide's
near-black colour. Tinting body text with `--neversink-text-color` on a
`--neversink-admon-bg-color` fill puts the 500 and 100 shades of one hue together, which
reads as decoration rather than prose — that was the first version, and it was unreadable
from the back of the room.

`emphasis` moves five properties at once (fill, size, weight, rail width, shadow). A
one-property difference reads as a rendering accident, not a hierarchy.

---

## `<Chip>`

A pill for one item in a list — a language, a tool, a file extension.

```markdown
<Chip>Python</Chip>                  <!-- finds its own logo from the slot text -->
<Chip icon="c" emphasis>C</Chip>     <!-- filled: the one that matters here -->
<Chip :icon="false">MATLAB</Chip>    <!-- plain pill, no logo -->
```

The icon is resolved from `icon-registry.ts` by the `icon` prop, or by the chip's own
text when that prop is absent. Anything not in the registry renders as a plain pill with
no empty gap, so chips work for things that have no logo (SQL, MATLAB, `.h`).

⚠️ Self-resolution reads the slot's **plain text** only. A chip wrapping bold or a link
finds nothing — pass `icon` explicitly there.

---

## `<AxisMap>`

A 2D map for "this one is more X and less Y than that one": languages by level and typing,
data structures by lookup and insert cost, editors by power and learning curve.

```markdown
<AxisMap
  y-label="Nivel" y-min="jos" y-max="înalt"
  x-label="Tipare" x-min="dinamic" x-max="strict"
  :zones="[
    'abstract · verificat la rulare',
    'abstract · verificat la compilare',
    'aproape de mașină · verificat la compilare',
    'aproape de mașină · fără verificări',
  ]"
  :height="400"
  :items="[
    { x: 26, y: 16, label: 'Assembly', icon: false },
    { x: 58, y: 20, label: 'C', highlight: true },
    { x: 30, y: 90, label: 'Python' },
  ]"
/>
```

`items` take `x`/`y` in 0–100 with the origin bottom-left, so the axes cross at (50, 50).
Each item renders as a `<Chip>` — label and logo always travel together. `zones` runs from
the top-left, **clockwise**.

- ✅ Write the four zones as **parallel phrases naming both axes**, so each corner explains
  itself (`abstract · verificat la rulare`)
- ✅ `highlight` the one language the slide is about — usually C
- ✅ Keep items out of the four corner bands, where the zone captions live
- ❌ A legend under the map explaining the axes — the axes get their own slide before it
- ❌ Reading the coordinates as data: placement is editorial, and worth saying so in class

It is plain HTML, not SVG. Axis names and end captions sit in a gutter **outside** the plot,
so no item can ever collide with the frame; that is a structural guarantee, not tuning.

---

## `<LogoWall>`

A collage, for "there are far more of these than we can cover".

```markdown
<LogoWall :size="52" :names="['python', 'rust', 'go', 'haskell']" />
<LogoWall dir="tools" :size="44" :names="['vscode', 'clion', 'neovim']" />
```

Files come from `common/public/icons/<dir>/<name>.svg`, checked into the repository. `dim`
fades the wall back when it is a backdrop rather than the subject.

---

## `<FlowSteps>`

A horizontal pipeline for any transformation: source → compiler → executable, the
four compile stages, input → program → output. Nodes rise in staggered, arrows are
dashed lines whose dashes drift toward the head — the one authored motion on these
slides.

```markdown
<FlowSteps :size="1.1" :steps="[
  { label: 'hello.c', sub: 'text scris de om', kind: 'file' },
  { label: 'compiler (gcc)', sub: 'traducere', emphasis: true },
  { label: 'hello', sub: 'cod mașină', kind: 'file', highlight: true },
]" caption="…" />
```

- `kind`: `'stage'` (process, rounded box — the default) or `'file'` (artifact:
  monospace, folded document corner)
- `sub` sits above the node (who/what), `note` below it
- `via` puts the **action on the arrow** leading into a node (`via: 'Linking'`),
  with `viaNote` as a small caption under that arrow (`+ biblioteci`). Prefer
  artifacts as nodes and processes as `via` labels — the compile pipeline reads
  as files being transformed, not as ten boxes
- `emphasis` = the step the slide is about; `highlight` = the result worth noticing
- Shrink `size` (rem) for long pipelines
- ✅ Keep `via` to **two or three words** (`2 zile`, `Linking`, `build`). It is a pill
  riding on one arrow, and a sentence there ("nimeni nu a căutat acolo") widens the arrow
  column until the track has nowhere left to go. Put the explanation in `note`, under the
  node, where the caption has the full column width
- ✅ One flow per slide; it *is* the diagram, not an illustration beside one
- ❌ Hand-rolled `div → div` rows or emoji arrows — this component replaces them

---

## `<LayerStack>`

A vertical stack of layers for "your code is up here, the machine is down there, and
these are the things in between": the React Native stack, a graphics pipeline, an OS in
rings. Read top to bottom, unlike `<FlowSteps>`, which is read left to right.

```markdown
<LayerStack :layers="[
  { label: 'Codul vostru', sub: 'componente, hooks', side: 'îl scrieți' },
  { label: 'React Native', kind: 'bridge', emphasis: true, side: 'stratul studiat' },
  { label: 'UIView · android.view.View', kind: 'native' },
]" />
```

- `kind` says what a layer *is*, and tints it accordingly: `js` (your world, the scheme
  tint), `bridge` (dashed, because nothing of yours lives there), `native` (grey,
  outside your repository). The picture then carries the distinction with no legend
- `side` writes a note to the right of the block, joined by a short rule: who owns the
  layer, or what it costs
- `emphasis` = the layer the slide is about
- ✅ Three to six layers. Beyond that, split the picture across two slides
- ❌ Do not use it for a sequence in time; that is `<FlowSteps>`

---

## The four architecture diagrams

Lesson 2 explains how React Native works, and the explanation needs four *different*
shapes. They were images in the old course, which is why the lesson kept losing detail:
a PNG cannot be translated, revealed a step at a time, or corrected. Which one you want
follows from the question the slide answers:

| The slide asks | Shape | Component |
|---|---|---|
| Where does this thing live? | lanes, side by side | `<ThreadLanes>` |
| How is the whole system wired? | boxes and seams | `<ArchMap>` |
| What is inside the runtime? | nested containment | `<RuntimeMap>` |
| What happens, in what order? | a trace down the page | `<CallTrace>` |

---

## `<ThreadLanes>`

Threads drawn as vertical lanes, with what lives on each one and a **seam** between
them. The picture React Native is always explained with: the platform on one side,
JavaScript on the other, and something in the middle that carries messages across.

```markdown
<ThreadLanes :lanes="[
  { title: 'UI thread', note: 'iOS și Android', frame: 'phone', nodes: [
    { label: 'Titlu', tone: 'a' }, { label: 'Paragraf', tone: 'b' },
  ] },
  { title: 'JS thread', note: 'Hermes', tree: true, nodes: [
    { label: '<Text>', tone: 'a' }, { label: '<Text>', tone: 'b', depth: 1 },
  ] },
]" :boundaries="[{ name: 'Bridge', label: 'createView(id, RCTView)', mode: 'queue' }]" />
```

- `boundaries[i]` is the seam between lane `i` and lane `i + 1`, so three lanes take two
  of them. **`mode` is the argument of the slide**: `queue` draws a drifting dashed seam
  (the bridge, where every message is serialized and waits), `direct` a solid double
  arrow (JSI, where the call goes straight through). Show the same lanes twice with the
  mode flipped and the whole New Architecture story is one edit
- `tone: 'a' | 'b'` pairs the *same* element across lanes, so a student can follow one
  node from JavaScript to the screen. Use it consistently or not at all
- `frame: 'phone'` draws a phone body around a lane: this is what the user sees.
  `tree: true` joins the nodes with tree rules: this is one hierarchy
- ✅ Two or three lanes. Four fits nothing legible at the back of the room
- ❌ Not for a sequence of events, even though the lanes look like a sequence diagram.
  Order in time is `<CallTrace>`

## `<ArchMap>`

The whole architecture in one picture: four thread frames, the engine inside the JS
thread, and the seam in the middle.

```markdown
<ArchMap variant="bridge" caption="Tot ce trece prin mijloc este text JSON." />
<ArchMap variant="jsi" />
```

Purpose-built rather than data-driven, and deliberately so: the two variants are two
specific pictures, and the point is that the second reads as an *edit* of the first. Same
four frames in the same four places, middle replaced. `bridge` puts a diamond on the seam
and labels both crossings `JSON`; `jsi` replaces it with a spine carrying Fabric and
TurboModules, and adds the codegen arrow from the types in your code.

- ✅ Show both, consecutively, in that order. One alone wastes the component
- `focus-seam` fades the frames and keeps the middle bright, for a slide that is only
  about the seam
- ❌ Do not add variants for intermediate versions. Two states is the story

## `<RuntimeMap>`

A JavaScript runtime drawn as what it is: an engine, plus everything the host puts
around it. The answer to "is JavaScript the same language on the phone as in the
browser?" — yes, that is the inner box; no, that is the right-hand column.

```markdown
<RuntimeMap title="În browser" engine="V8, JSC, SpiderMonkey"
  :parts="['call stack', 'heap', 'interpreter']"
  :panels="[
    { title: 'API-uri de la gazdă', items: ['document', 'window', 'fetch'] },
    { title: 'cozi de sarcini' },
    { title: 'event loop' },
  ]" />
```

- **The nesting is load-bearing.** `parts` sit inside the engine (the standard, identical
  everywhere), `panels` outside it (the host, different everywhere). Putting `fetch`
  inside the engine box would teach the wrong thing
- A panel with no `items` renders as a named empty box, which is how the event loop and
  the queues should look: machinery, not a list
- ✅ Two of them side by side, browser against phone, with `emphasis` on the phone. The
  difference is then visibly one column
- ❌ Not for a call stack walkthrough or an event-loop animation

## `<CallTrace>`

A trace of calls between threads: lanes across the top, time down the page, one arrow
per crossing. Where `<ThreadLanes>` shows where things live, this shows what happens.

```markdown
<CallTrace :lanes="['UI thread', 'Shadow tree', 'JS thread']" :steps="[
  { phase: 'La pornire', from: 0, to: 2, label: 'runApplication()' },
  { from: 2, to: 2, label: 'setState({ ... })', note: 'nu traversează' },
  { from: 2, to: 1, label: 'createNode()' },
  { from: 1, to: 0, label: 'Android View', emphasis: true },
]" />
```

- `from` and `to` are lane **indices**. It earns its place over prose because the zigzag
  is countable: "five crossings, for one frame of scrolling" is an argument a paragraph
  cannot make
- `from === to` is work that stays on one lane, drawn dashed and headless so it reads as
  a pause rather than a message
- `phase` starts a new named group, so one trace can hold both "at startup" and "after a
  tap" without becoming two diagrams
- ✅ Up to about eight steps. Longer traces stop being countable, which was the point
- ❌ Do not label the steps in Romanian if they are real function names. `onScroll` is an
  identifier; the `note` beside it is where the Romanian goes

---

## `<CompareGrid>`

A matrix: one column per option, one row per criterion, a verdict per cell. This is the
component for "which of these should I choose", and it replaces the two-column list of
pros and cons.

```markdown
<CompareGrid
  :options="[{ label: 'Flutter' }, { label: 'React Native', highlight: true }]"
  :rows="[
    { label: 'Limbaj', cells: [
      { verdict: 'bad', text: 'Dart, nou' },
      { verdict: 'good', text: 'JavaScript' },
    ] },
  ]"
  caption="Cerc plin: punctul tare al abordării."
/>
```

- The verdict is a **shape**, not a colour alone: `good` a filled dot, `mixed` a half
  dot, `bad` an empty ring. A projector washes out colour long before it washes out
  shape, and the shapes still read for a colour-blind student
- `cells` is positional, one entry per option in the same order. Either half of a cell
  is optional: a mark alone, a text alone, or both
- Column headers are `<Chip>`s, so they find their own logo; `icon` overrides the lookup
- `highlight` tints the column the slide argues for
- Nothing animates in. A matrix is read by scanning a row against a column, and a
  staggered entrance makes that impossible for the first second on an already dense slide
- ✅ Up to three or four options and six rows. Wider than that, it stops being readable
  from the back of the room
- ❌ Do not use it for a table of facts with no verdict; that is a plain markdown table

---

## `<DeviceFrame>`

A phone drawn around a slot, so the slide can show *what the user sees* instead of
describing it. Two side by side is the cheapest way to show "the same code, two
platforms", or a symptom against its cause.

```markdown
<DeviceFrame platform="ios" caption="iOS" :width="170" :height="250">

<div class="h-full flex flex-col justify-center items-center text-center gap-3">

<Chip icon="apple" emphasis>Swift</Chip>

App Store

</div>

</DeviceFrame>
```

- The screen is a plain slot: normal markdown, normal components, simulated UI, a
  screenshot, or one sentence
- `platform` changes only the chrome: `ios` gets a notch and a home indicator, `android`
  a punch-hole camera, a squarer body and the three buttons. Neither draws a status bar,
  because a fake one that is subtly wrong is worse than none
- `width` and `height` are the **screen** in px; the body scales around them. Around
  250px tall leaves room for a paragraph under the phones on a `top-title` slide
- Paragraph margins are stripped inside the screen, so spacing between slot lines is
  whatever flex `gap` you set on your own wrapper and nothing else
- ✅ When two phones sit side by side, give them the **same** `width` and write their
  captions as **parallel phrases**. "iOS · ~28% din telefoanele lumii" against
  "Android · ~72%" makes the pair look like two unrelated facts instead of one split
- `tone="dim"` fades back the device that is the counter-example; `emphasis` accents the
  one that is not
- It does not animate in. The device is scenery for what is on the screen
- ❌ Not for a full screenshot that would be legible on its own; the frame then only
  makes it smaller

---

## `<AppWall>`

A wall of app tiles: the phone screen the whole room recognises. Logos come from
`app-registry.ts`, a separate list from the language and tool `icon-registry.ts`.

```markdown
<AppWall :columns="7" :size="78" :apps="[
  { name: 'Instagram', rn: true },
  { name: 'Spotify' },
]" />

<AppWall :apps="…" mark-rn />
```

- `mark-rn` is the reason the component exists. Put the same list on the wall twice in a
  lesson: once plainly ("these are the apps you opened today"), and again later with the
  marks on ("and these are the ones written in React Native"). Students recognise the
  second wall as the first one, which two unrelated pictures could never do
- Marking **dims** the rest rather than hiding it. The apps that are not React Native are
  half the argument: what a tool is good for is only legible next to what it is not used for
- An app missing from the registry gets a lettered tile, so the wall never depends on the
  icon set carrying a particular brand
- ✅ Around 14 tiles in two rows of 7. A third row pushes the caption off a `top-title` slide
- ❌ Do not mark an app you have not checked. A wrong `rn: true` is a claim about a real
  company, and a student will look it up

---

## `<StatRow>`

A row of large figures, for the slide that has to establish a fact before the argument
starts: how much the phone is used, how big a market is, how slow something got.

```markdown
<StatRow source="StatCounter · Sensor Tower, 2025" :stats="[
  { value: '~64%', label: 'din traficul web mondial vine de pe telefon', note: 'desktop: sub o treime' },
  { value: '9 din 10', label: 'minute pe telefon sunt petrecute într-o aplicație', highlight: true },
]" />
```

- The number is the slide; the sentence under it is the caption. The inverse arrangement,
  a paragraph with a bold `64%` inside it, is a paragraph, and nobody reads a paragraph
  while the lecturer is talking
- ✅ **Always write `source`.** A figure with no attribution is a rumour, and students do
  look them up. It is a prop rather than slide prose precisely so it cannot be forgotten
- ✅ `note` carries the qualifier that keeps a round number honest
- ✅ Two to four figures. Five stop being legible from the back of the room
- ✅ Keep `label` to one short clause. The figure size is scaled from the **longest**
  `value` in the row so that no figure wraps, but a long label still runs to three lines
  and pulls its column out of step with the rest
- ❌ Do not use it for a number that is the *result* of the lesson; that is a `<Definition>`

Each figure sits on a top rule rather than in a card: four boxes in a row read as a menu
of equal options, four rules read as four separate measurements.

---

## `<Discontinued>`

Things that existed and no longer do: dead platforms, retired APIs, an approach the
industry tried and abandoned.

```markdown
<Discontinued :columns="3" :items="[
  { label: 'Symbian', span: 'Nokia · 1998-2013', note: 'Peste jumătate din piața mondială în 2007.' },
  { label: 'Windows Phone', span: 'Microsoft · 2010-2019', note: 'Interfață admirată, prea puține aplicații.' },
]" />
```

Each card carries the platform's mark, resolved from `platform-registry.ts` by the label
(or by an explicit `icon`; `icon: false` forces the monogram). A platform the icon sets do
not have renders as a lettered plate, the same fallback `<AppWall>` uses, so the row never
depends on a particular brand being present.

Those marks are **monochrome `mdi` silhouettes**, not the full-colour `logos` set the rest
of the course uses. A dashed, dimmed, struck-through card whose logo is glossy and
saturated reads as a live option being advertised, which is the opposite of the slide's
claim; and a silhouette sits next to a monogram far more comfortably than a colour logo
does, which matters when half the list has no mark.

- The label is **struck through** and the card is dashed, so the row reads as a graveyard
  before a single word is parsed. A plain list of the same names makes the opposite first
  impression, that these are options
- ✅ `note` is where the argument lives. "Symbian, 1998-2013" is trivia, "peste jumătate
  din piață în 2007" is the reason the slide exists
- ❌ Not for things that are merely unfashionable. The claim the styling makes is that they
  are gone

---

## Icons

Two sources, deliberately:

| | Where | Used by |
|---|---|---|
| Inlined at build | `~icons/logos/*` imports in `common/components/icon-registry.ts` | `<Chip>`, `<AxisMap>` |
| Inlined at build | `~icons/logos/*` imports in `common/components/app-registry.ts` | `<AppWall>` |
| Inlined at build | `~icons/mdi/*` imports in `common/components/platform-registry.ts` | `<Discontinued>` |
| Tracked SVG files | `common/public/icons/{languages,tools}/` | `<LogoWall>`, any `<img>` |

Both are local: **nothing is fetched at presentation time**. Add a language to the registry
with one import plus one entry keyed by its lowercased name; add a wall logo by dropping an
SVG in the folder. Assembly is deliberately absent from both — the `logos` set has no
assembly mark, and WebAssembly is a different thing, so it renders as a labelled dot.

`<LogoWall>` builds its paths from `import.meta.env.BASE_URL`; a hardcoded `/icons/…` would
404 under the GitHub Pages subpath.

---

## Adding a shared component

1. Write it in `common/components/<Name>.vue`. Style it with the `--neversink-*` variables
   (`--neversink-border-color`, `--neversink-admon-bg-color`, `--neversink-text-color`, …)
   rather than fixed colours, so it follows whatever `color` scheme the deck sets and picks
   up dark mode for free. Take a `color` prop defaulting to `blue-light` and bind
   `neversink-${color}-scheme` on the root element to make that work.
2. Use `:deep()` for markdown that arrives through the slot, and reset `p` margins — slot
   markdown comes wrapped in `<p>` tags that will otherwise blow the layout apart.
3. Document it in the table above.

No registration step: `common/components` is already in every deck's auto-import dirs.

⚠️ It fails **silently** if the dirs are wrong — Vue renders an unresolved component as a
plain HTML element, so the tag's text shows up unstyled instead of raising an error. Decks
must build their auto-import dirs with `componentDirs()` from `common/vite/component-dirs.ts`;
see §7 of `CLAUDE.md`.
