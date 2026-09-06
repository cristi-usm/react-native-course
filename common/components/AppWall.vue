<script setup lang="ts">
/**
 * A wall of app tiles: the phone screen the whole room recognises.
 *
 *   <AppWall :apps="[
 *     { name: 'Instagram', rn: true },
 *     { name: 'Spotify' },
 *   ]" />
 *
 *   <AppWall :apps="…" mark-rn />
 *
 * The point of the component is `mark-rn`, which is why the wall is worth
 * building instead of screenshotting a home screen. The same list appears twice
 * in a lesson: once plainly, as "these are the apps you opened today", and again
 * later with the marks turned on, as "and these are the ones written in React
 * Native". A student recognises the second wall as the first one, which a pair
 * of unrelated pictures could never achieve.
 *
 * Marking dims the rest rather than hiding it. The apps that are *not* React
 * Native are half the argument: the answer to "what is it good for" is only
 * legible next to what it is not used for.
 *
 * An app with no logo in `app-registry.ts` gets a lettered tile, so the wall
 * never depends on the icon set having a particular brand.
 */
import { computed } from 'vue'
import { appIconFor } from './app-registry'

export interface App {
  name: string
  /** Registry key, when it differs from the name. */
  icon?: string | false
  /** Built with React Native. Only shown when the wall is in `mark-rn` mode. */
  rn?: boolean
}

const props = withDefaults(
  defineProps<{
    apps: App[]
    /** Turn on the React Native marks; everything else dims behind them. */
    markRn?: boolean
    /** Tiles per row. */
    columns?: number
    /** Tile size in px. */
    size?: number
    /** Neversink colour scheme. Defaults to the deck's. */
    color?: string
  }>(),
  { markRn: false, columns: 7, size: 76, color: 'blue-light' },
)

const tiles = computed(() =>
  props.apps.map((app) => ({
    ...app,
    logo: app.icon === false ? undefined : appIconFor(app.icon ?? app.name),
    letter: app.name.charAt(0).toUpperCase(),
  })),
)
</script>

<template>
  <div
    :class="[`neversink-${color}-scheme`, 'ns-apps', { 'ns-apps--marking': markRn }]"
    :style="{
      '--ns-apps-size': `${size}px`,
      gridTemplateColumns: `repeat(${columns}, var(--ns-apps-size))`,
    }"
  >
    <figure
      v-for="(app, i) in tiles"
      :key="i"
      :class="['ns-apps__app', { 'ns-apps__app--rn': markRn && app.rn }]"
    >
      <div class="ns-apps__tile">
        <component :is="app.logo" v-if="app.logo" class="ns-apps__logo" />
        <span v-else class="ns-apps__letter">{{ app.letter }}</span>
        <span v-if="markRn && app.rn" class="ns-apps__badge">RN</span>
      </div>
      <figcaption class="ns-apps__name">{{ app.name }}</figcaption>
    </figure>
  </div>
</template>

<style scoped>
.ns-apps {
  display: grid;
  gap: 1.1rem 1.4rem;
  justify-content: center;
}

.ns-apps__app {
  margin: 0;
  text-align: center;
}

/* The tile is the app icon: a rounded square, the shape every phone uses. */
.ns-apps__tile {
  position: relative;
  width: var(--ns-apps-size);
  height: var(--ns-apps-size);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24%;
  background: #fff;
  border: 2px solid var(--neversink-border-color);
  box-shadow: 0 6px 14px -10px rgb(0 0 0 / 0.5);
  transition: opacity 0.35s ease, filter 0.35s ease, border-color 0.35s ease;
}

.ns-apps__logo {
  width: 54%;
  height: 54%;
}

/* Fallback for an app the logo set does not carry. */
.ns-apps__letter {
  font-size: calc(var(--ns-apps-size) * 0.42);
  font-weight: 800;
  color: var(--neversink-fg-color);
  opacity: 0.8;
}

.ns-apps__name {
  margin-top: 0.4rem;
  font-size: 0.72rem;
  font-weight: 600;
  line-height: 1.2;
  color: var(--neversink-text-color);
  transition: opacity 0.35s ease;
}

/* Marking mode: the React Native ones step forward, the rest step back. */
.ns-apps--marking .ns-apps__app:not(.ns-apps__app--rn) .ns-apps__tile {
  opacity: 0.35;
  filter: grayscale(1);
}

.ns-apps--marking .ns-apps__app:not(.ns-apps__app--rn) .ns-apps__name {
  opacity: 0.4;
}

.ns-apps__app--rn .ns-apps__tile {
  border-color: var(--neversink-fg-color);
  box-shadow:
    0 0 0 3px var(--neversink-admon-bg-color),
    0 6px 14px -10px rgb(0 0 0 / 0.5);
}

.ns-apps__badge {
  position: absolute;
  right: -0.4rem;
  bottom: -0.4rem;
  padding: 0.05rem 0.3rem;
  border-radius: 999px;
  background: var(--neversink-fg-color);
  color: var(--neversink-bg-color);
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  line-height: 1.5;
}
</style>
