<script setup lang="ts">
/**
 * A project tree as Expo Router reads it: every file on the left, the address
 * it answers on the right.
 *
 *   <RouteTree :items="[
 *     { name: 'app/', depth: 0 },
 *     { name: '_layout.js', depth: 1, note: 'layout-ul rădăcină' },
 *     { name: 'index.js', depth: 1, route: '/' },
 *     { name: '[id].js', depth: 1, route: '/produse/42', emphasis: true },
 *     { name: 'Card.js', depth: 1, note: 'nu este un ecran', dim: true },
 *   ]" />
 *
 * The role of a file is read from its name, the same way the router reads it:
 * a trailing `/` is a directory, `(…)/` a group, `_layout` a layout, `[…]` a
 * dynamic segment, `+…` a special file. Each role gets its own icon and tint,
 * so a student can tell a group from a directory before reading the prose.
 *
 * The right-hand column is the point of the picture. A `route` is drawn as an
 * address pill, joined to its file by a dotted leader; a `note` is plain text,
 * for files that have no address of their own (layouts, components).
 *
 * `dim` fades a row back: code that lives outside `src/app` and is therefore
 * not a route at all.
 */
export interface Item {
  /** File or directory name. A trailing `/` makes it a directory. */
  name: string
  /** Nesting level, 0 for the root. */
  depth: number
  /** The address this file answers on. */
  route?: string
  /** A note for files with no address of their own. */
  note?: string
  /** Faded: outside the router. */
  dim?: boolean
  /** The row the slide is about. */
  emphasis?: boolean
}

type Kind = 'dir' | 'group' | 'layout' | 'dynamic' | 'special' | 'file'

const props = withDefaults(
  defineProps<{
    items: Item[]
    /** Base font size, rem. */
    size?: number
    /** Neversink colour scheme. Defaults to the deck's. */
    color?: string
  }>(),
  { size: 1, color: 'blue-light' },
)

function kindOf(name: string): Kind {
  if (/^\(.*\)\/$/.test(name)) return 'group'
  if (name.endsWith('/')) return 'dir'
  if (name.startsWith('_layout')) return 'layout'
  if (name.startsWith('[')) return 'dynamic'
  if (name.startsWith('+')) return 'special'
  return 'file'
}

// literal class names, so UnoCSS finds them when it scans this file
const ICONS: Record<Kind, string> = {
  dir: 'i-ph-folder-duotone',
  group: 'i-ph-folder-dashed-duotone',
  layout: 'i-ph-frame-corners-duotone',
  dynamic: 'i-ph-brackets-square-duotone',
  special: 'i-ph-warning-circle-duotone',
  file: 'i-ph-file-js-duotone',
}

const rows = props.items.map((item) => {
  const kind = kindOf(item.name)
  return { ...item, kind, icon: ICONS[kind] }
})
</script>

<template>
  <div
    :class="[`neversink-${color}-scheme`, 'ns-tree']"
    :style="{ '--ns-tree-size': `${size}rem` }"
  >
    <div
      v-for="(row, i) in rows"
      :key="i"
      :class="[
        'ns-tree__row',
        `ns-tree__row--${row.kind}`,
        { 'ns-tree__row--dim': row.dim, 'ns-tree__row--on': row.emphasis },
      ]"
    >
      <span v-for="d in row.depth" :key="d" class="ns-tree__guide" />
      <span :class="['ns-tree__icon', row.icon]" />
      <span class="ns-tree__name">{{ row.name }}</span>
      <span class="ns-tree__leader" />
      <code v-if="row.route" class="ns-tree__route">{{ row.route }}</code>
      <span v-if="row.note" class="ns-tree__note">{{ row.note }}</span>
    </div>
  </div>
</template>

<style scoped>
.ns-tree {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: var(--ns-tree-size);
}

.ns-tree__row {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 1.95em;
  padding: 0 0.5rem;
  border-radius: 0.45rem;
}

.ns-tree__row--on {
  background: var(--neversink-admon-bg-color);
}

.ns-tree__row--dim {
  opacity: 0.45;
}

/* One rule per level of nesting: the tree reads as columns, not as spaces. */
.ns-tree__guide {
  align-self: stretch;
  width: 1.1em;
  flex: none;
  margin-left: 0.45em;
  border-left: 1.5px solid var(--neversink-border-color);
  opacity: 0.6;
}

.ns-tree__icon {
  flex: none;
  font-size: 1.15em;
  color: var(--neversink-text-color);
  opacity: 0.55;
}

.ns-tree__name {
  flex: none;
  font-family: var(--slidev-code-font-family, monospace);
  font-size: 0.92em;
  color: var(--neversink-text-color);
}

.ns-tree__row--dir .ns-tree__name,
.ns-tree__row--group .ns-tree__name {
  font-weight: 700;
}

/* The names the router treats specially carry the accent. */
.ns-tree__row--layout .ns-tree__icon,
.ns-tree__row--dynamic .ns-tree__icon,
.ns-tree__row--group .ns-tree__icon,
.ns-tree__row--special .ns-tree__icon,
.ns-tree__row--layout .ns-tree__name,
.ns-tree__row--dynamic .ns-tree__name,
.ns-tree__row--group .ns-tree__name,
.ns-tree__row--special .ns-tree__name {
  color: var(--neversink-fg-color);
  opacity: 1;
}

.ns-tree__leader {
  flex: 1;
  min-width: 1rem;
  border-bottom: 1.5px dotted var(--neversink-border-color);
  opacity: 0.6;
}

.ns-tree__route {
  flex: none;
  padding: 0.05em 0.5em;
  border-radius: 999px;
  border: 1.5px solid var(--neversink-border-color);
  background: #fff;
  font-size: 0.85em;
  color: var(--neversink-fg-color);
}

.ns-tree__row--on .ns-tree__route {
  border-color: var(--neversink-fg-color);
}

.ns-tree__note {
  flex: none;
  font-size: 0.8em;
  opacity: 0.7;
}
</style>
