<script setup lang="ts">
/**
 * Things that existed and no longer do: dead platforms, retired APIs, an
 * approach the industry tried and abandoned.
 *
 *   <Discontinued :items="[
 *     { label: 'Symbian', span: '1998-2013', note: 'Nokia; lider mondial în 2007' },
 *     { label: 'Windows Phone', span: '2010-2019', note: 'Microsoft' },
 *   ]" />
 *
 * The label is struck through and the whole card sits at reduced contrast, so
 * the row reads as a graveyard at a glance, before a single word is parsed.
 * That is the entire point: the slide's claim is "these are gone", and a plain
 * list of names makes exactly the opposite first impression — a list of options.
 *
 * `note` is where the argument lives. "Symbian, 1998-2013" is trivia; "lider
 * mondial în 2007" is the reason the slide exists.
 *
 * Each card carries the platform's mark from `platform-registry.ts`, and a
 * lettered plate when the icon set has none — so the row never depends on a
 * particular brand being present. The marks are monochrome on purpose; see the
 * note at the top of that file.
 */
import { computed } from 'vue'
import { platformIconFor } from './platform-registry'

export interface DiscontinuedItem {
  label: string
  /** Registry key, when it differs from the label. `false` forces the monogram. */
  icon?: string | false
  /** Lifespan, or any short dating: "2010-2019". */
  span?: string
  /** Why it mattered, or why it went. One short line. */
  note?: string
}

const props = withDefaults(
  defineProps<{
    items: DiscontinuedItem[]
    /** Tiles per row. */
    columns?: number
    /** Neversink colour scheme. Defaults to the deck's. */
    color?: string
  }>(),
  { columns: 3, color: 'blue-light' },
)

const tiles = computed(() =>
  props.items.map((item) => ({
    ...item,
    logo: item.icon === false ? undefined : platformIconFor(item.icon ?? item.label),
    letter: item.label.charAt(0).toUpperCase(),
  })),
)
</script>

<template>
  <div
    :class="[`neversink-${color}-scheme`, 'ns-gone']"
    :style="{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }"
  >
    <div
      v-for="(item, i) in tiles"
      :key="i"
      class="ns-gone__item"
      :style="{ animationDelay: `${i * 0.08}s` }"
    >
      <div class="ns-gone__head">
        <div class="ns-gone__mark">
          <component :is="item.logo" v-if="item.logo" class="ns-gone__logo" />
          <span v-else class="ns-gone__letter">{{ item.letter }}</span>
        </div>
        <div class="ns-gone__naming">
          <div class="ns-gone__label">{{ item.label }}</div>
          <div v-if="item.span" class="ns-gone__span">{{ item.span }}</div>
        </div>
      </div>
      <div v-if="item.note" class="ns-gone__note">{{ item.note }}</div>
    </div>
  </div>
</template>

<style scoped>
.ns-gone {
  display: grid;
  gap: 0.7rem;
  width: 100%;
}

.ns-gone__item {
  padding: 0.7rem 0.9rem;
  border: 1px dashed var(--neversink-admon-border-color);
  border-radius: 0.6rem;
  text-align: left;
  opacity: 0;
  animation: ns-gone-in 0.45s ease forwards;
}

/* Struck through, not greyed out alone: the line is the meaning, and it
   survives a projector that flattens every grey into the same grey. */
.ns-gone__label {
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.2;
  text-decoration: line-through;
  text-decoration-thickness: 2px;
  text-decoration-color: var(--neversink-fg-color);
  opacity: 0.75;
}

.ns-gone__head {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.ns-gone__naming {
  min-width: 0;
}

.ns-gone__mark {
  flex: none;
  display: grid;
  place-items: center;
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 0.45rem;
  background: var(--neversink-admon-bg-color);
  color: var(--neversink-text-color);
}

.ns-gone__logo {
  width: 1.3rem;
  height: 1.3rem;
  opacity: 0.7;
}

/* A platform with no mark in any installed icon set still gets a plate, so the
   row reads as one set of things rather than four logos and three gaps. */
.ns-gone__letter {
  font-size: 1.05rem;
  font-weight: 800;
  line-height: 1;
  opacity: 0.6;
}

.ns-gone__span {
  margin-top: 0.15rem;
  font-size: 0.75rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
  opacity: 0.55;
}

.ns-gone__note {
  margin-top: 0.3rem;
  font-size: 0.82rem;
  line-height: 1.35;
  opacity: 0.8;
}

@keyframes ns-gone-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
</style>
