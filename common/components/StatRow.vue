<script setup lang="ts">
import { computed } from 'vue'

/**
 * A row of large figures: the number first, what it counts underneath.
 *
 *   <StatRow :stats="[
 *     { value: '64%', label: 'din traficul web mondial vine de pe telefon' },
 *     { value: '~5 h', label: 'pe zi, media de utilizare a telefonului' },
 *   ]" source="StatCounter · Sensor Tower, 2025" />
 *
 * A statistic on a slide is read from the back of the room or not at all, so
 * the number is set at 3.4rem and the sentence under it stays small. The
 * opposite arrangement — a paragraph containing "64%" in bold — is a paragraph,
 * and nobody reads a paragraph while the lecturer is talking.
 *
 * `source` is a required habit rather than a decoration: a figure with no
 * attribution is a rumour, and students do look them up. `note` on an item is
 * for the qualifier that keeps a round number honest ("ordin de mărime").
 *
 * The figures rise in staggered, one after another, because they are read left
 * to right once — the same reason `<FlowSteps>` animates and `<CompareGrid>`
 * does not.
 */
export interface Stat {
  /** The figure itself. Short: "64%", "~5 h", "9 din 10". */
  value: string
  /** What it counts. One line, no full stop. */
  label: string
  /** Small qualifier under the label. */
  note?: string
  /** The figure the slide is about: accent colour, heavier rule. */
  highlight?: boolean
}

const props = withDefaults(
  defineProps<{
    stats: Stat[]
    /** Attribution under the row. Always write one. */
    source?: string
    /** Neversink colour scheme. Defaults to the deck's. */
    color?: string
  }>(),
  { source: '', color: 'blue-light' },
)

/**
 * The figure is set as large as the longest value in the row still allows.
 * A fixed size wrapped "9 din 10" onto two lines while "~5 h" stayed on one,
 * which knocked every label and note in the row out of alignment — the row
 * stopped reading as one comparison. Scaling on the longest value keeps all
 * four figures the same size (they are being compared) and all on one line.
 */
const valueScale = computed(() => {
  const longest = Math.max(...props.stats.map((s) => s.value.length), 1)
  return Math.min(1, 6 / longest)
})
</script>

<template>
  <div :class="[`neversink-${color}-scheme`, 'ns-stats']"
    :style="{ '--ns-stats-scale': valueScale }">
    <div class="ns-stats__row">
      <div
        v-for="(stat, i) in stats"
        :key="i"
        :class="['ns-stats__item', { 'ns-stats__item--on': stat.highlight }]"
        :style="{ animationDelay: `${i * 0.12}s` }"
      >
        <div class="ns-stats__value">{{ stat.value }}</div>
        <div class="ns-stats__label">{{ stat.label }}</div>
        <div v-if="stat.note" class="ns-stats__note">{{ stat.note }}</div>
      </div>
    </div>
    <div v-if="source" class="ns-stats__source">{{ source }}</div>
  </div>
</template>

<style scoped>
.ns-stats {
  width: 100%;
}

.ns-stats__row {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 1rem;
}

/* Each figure sits on its own rule rather than in a box: four boxes in a row
   read as a table of contents, four rules read as one measurement each. */
.ns-stats__item {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding: 0.2rem 0.9rem 0;
  border-top: 3px solid var(--neversink-border-color);
  opacity: 0;
  animation: ns-stats-in 0.5s ease forwards;
}

.ns-stats__item--on {
  border-top-color: var(--neversink-fg-color);
  border-top-width: 5px;
}

.ns-stats__value {
  font-size: calc(3.4rem * var(--ns-stats-scale, 1));
  white-space: nowrap;
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  color: var(--neversink-text-color);
}

.ns-stats__item--on .ns-stats__value {
  color: var(--neversink-fg-color);
}

.ns-stats__label {
  margin-top: 0.35rem;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.3;
}

.ns-stats__note {
  margin-top: auto;
  padding-top: 0.25rem;
  font-size: 0.78rem;
  line-height: 1.3;
  opacity: 0.6;
}

.ns-stats__source {
  margin-top: 1.1rem;
  text-align: center;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  opacity: 0.55;
}

@keyframes ns-stats-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
</style>
