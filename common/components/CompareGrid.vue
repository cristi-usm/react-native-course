<script setup lang="ts">
/**
 * A comparison matrix: one column per option, one row per criterion, and a
 * verdict in each cell.
 *
 *   <CompareGrid
 *     :options="[{ label: 'Nativ' }, { label: 'React Native', highlight: true }]"
 *     :rows="[
 *       { label: 'Cost', cells: [
 *         { verdict: 'bad',  text: 'două echipe' },
 *         { verdict: 'good', text: 'una' },
 *       ] },
 *     ]"
 *   />
 *
 * The verdict is a mark, not a colour alone: `good` a filled dot, `mixed` a half
 * dot, `bad` an empty ring. A projector washes out colour long before it washes
 * out shape, and the shapes still read for a colour-blind student.
 *
 * Nothing here animates in. A matrix is read by scanning a row against a column,
 * and a staggered entrance makes that impossible for the first second, on a
 * slide that is already dense. `<FlowSteps>` and `<Timeline>` animate because
 * they are read left to right, once.
 *
 * `cells` is positional — one entry per option, in the same order. A shorter
 * row simply leaves the remaining cells empty, which is the honest rendering of
 * "we have not measured that one".
 */
import Chip from './Chip.vue'

export type Verdict = 'good' | 'mixed' | 'bad'

export interface CompareCell {
  verdict?: Verdict
  /** Short text under the mark. Two or three words, not a sentence. */
  text?: string
}

export interface CompareRow {
  label: string
  cells: CompareCell[]
}

export interface CompareOption {
  label: string
  /** Icon registry key, when it differs from the label. */
  icon?: string | false
  /** The column the slide is about: accent header, tinted column. */
  highlight?: boolean
}

withDefaults(
  defineProps<{
    options: CompareOption[]
    rows: CompareRow[]
    /** Caption under the grid. */
    caption?: string
    /** Neversink colour scheme. Defaults to the deck's. */
    color?: string
  }>(),
  { caption: '', color: 'blue-light' },
)
</script>

<template>
  <div :class="[`neversink-${color}-scheme`, 'ns-cmp']">
    <div
      class="ns-cmp__grid"
      :style="{ gridTemplateColumns: `minmax(0, 1.1fr) repeat(${options.length}, minmax(0, 1fr))` }"
    >
      <div class="ns-cmp__corner" />
      <div
        v-for="(opt, i) in options"
        :key="`h${i}`"
        :class="['ns-cmp__head', { 'ns-cmp__head--on': opt.highlight }]"
      >
        <Chip :icon="opt.icon" :emphasis="opt.highlight" :color="color">{{ opt.label }}</Chip>
      </div>

      <template v-for="(row, r) in rows" :key="`r${r}`">
        <div :class="['ns-cmp__rowlabel', { 'ns-cmp__rowlabel--last': r === rows.length - 1 }]">
          {{ row.label }}
        </div>
        <div
          v-for="(opt, c) in options"
          :key="`c${r}-${c}`"
          :class="[
            'ns-cmp__cell',
            { 'ns-cmp__cell--on': opt.highlight, 'ns-cmp__cell--last': r === rows.length - 1 },
          ]"
        >
          <span
            v-if="row.cells[c]?.verdict"
            :class="['ns-cmp__mark', `ns-cmp__mark--${row.cells[c]!.verdict}`]"
          />
          <span v-if="row.cells[c]?.text" class="ns-cmp__text">{{ row.cells[c]!.text }}</span>
        </div>
      </template>
    </div>
    <div v-if="caption" class="ns-cmp__caption">{{ caption }}</div>
  </div>
</template>

<style scoped>
.ns-cmp {
  width: 100%;
}

/* No gap between columns: the highlighted column has to read as one continuous
   band down the table, and a gapped grid breaks it into detached tiles. Rows
   are separated by a hairline instead, which is what the eye needs when it
   scans a criterion across three options. */
.ns-cmp__grid {
  display: grid;
  gap: 0;
  align-items: stretch;
  border-radius: 0.75rem;
  overflow: hidden;
  background: var(--neversink-bg-color);
  box-shadow: 0 10px 30px -22px rgb(0 0 0 / 0.55);
}

.ns-cmp__head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.55rem 0.4rem;
  border-bottom: 2px solid var(--neversink-border-color);
}

.ns-cmp__head--on {
  border-bottom-color: var(--neversink-fg-color);
  background: var(--neversink-admon-bg-color);
}

.ns-cmp__corner {
  border-bottom: 2px solid var(--neversink-border-color);
}

.ns-cmp__rowlabel {
  display: flex;
  align-items: center;
  font-size: 0.92rem;
  font-weight: 700;
  line-height: 1.25;
  color: var(--neversink-text-color);
  padding: 0.55rem 0.8rem 0.55rem 0.4rem;
  border-bottom: 1px solid var(--neversink-admon-border-color);
}

.ns-cmp__cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  padding: 0.55rem 0.5rem;
  text-align: center;
  border-bottom: 1px solid var(--neversink-admon-border-color);
  border-left: 1px solid var(--neversink-admon-border-color);
}

/* The last row closes on the container's rounded edge, so it needs no rule. */
.ns-cmp__cell--last,
.ns-cmp__rowlabel--last {
  border-bottom: none;
}

.ns-cmp__cell--on {
  background: var(--neversink-admon-bg-color);
}

.ns-cmp__mark {
  width: 15px;
  height: 15px;
  border-radius: 999px;
  border: 2px solid var(--neversink-fg-color);
  flex: none;
}

.ns-cmp__mark--good {
  background: var(--neversink-fg-color);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--neversink-fg-color) 18%, transparent);
}

/* Half filled: the same ring, filled on one side only. */
.ns-cmp__mark--mixed {
  background: linear-gradient(
    to right,
    var(--neversink-fg-color) 0 50%,
    transparent 50% 100%
  );
}

.ns-cmp__mark--bad {
  background: transparent;
  opacity: 0.4;
}

.ns-cmp__text {
  font-size: 0.8rem;
  line-height: 1.3;
  opacity: 0.85;
}

.ns-cmp__cell--on .ns-cmp__text {
  opacity: 1;
  font-weight: 600;
}

.ns-cmp__caption {
  margin-top: 0.75rem;
  text-align: center;
  font-size: 0.8rem;
  opacity: 0.7;
}
</style>
