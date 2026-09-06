<script setup lang="ts">
/**
 * A trace of calls between threads, in the order they happen: lanes across the
 * top, time down the page, one arrow per crossing.
 *
 * Where `<ThreadLanes>` shows *where things live*, this shows *what happens*.
 * It is the picture for "walk me through one render" or "what does a scroll
 * actually cost", and it earns its place over prose because the zigzag is the
 * point: you can count the crossings.
 *
 *   <CallTrace :lanes="['Platformă', 'Shadow tree', 'JS']" :steps="[
 *     { phase: 'Pornire', from: 0, to: 2, label: 'runApplication()' },
 *     { from: 2, to: 1, label: 'createNode()' },
 *     { from: 1, to: 0, label: 'Android View', emphasis: true },
 *   ]" />
 *
 * `from` and `to` are lane indices. A step with `from === to` is work that
 * happens on one lane without crossing, drawn as a block instead of an arrow —
 * useful for `setState()` or a layout pass. `phase` starts a new named group,
 * so one trace can hold both "at startup" and "after a tap" without becoming
 * two diagrams.
 */
import { computed } from 'vue'

export interface TraceStep {
  label: string
  /** Lane the call starts on. */
  from: number
  /** Lane it lands on. Equal to `from` for work that does not cross. */
  to: number
  /** Small note to the side — why this happens. */
  note?: string
  /** Start a new named group of steps here. */
  phase?: string
  /** The crossing the slide is about. */
  emphasis?: boolean
}

const props = withDefaults(
  defineProps<{
    /** Lane names, left to right. */
    lanes: string[]
    steps: TraceStep[]
    /** Caption under the trace. */
    caption?: string
    /** Base font size, rem. */
    size?: number
    /** Neversink colour scheme. Defaults to the deck's. */
    color?: string
  }>(),
  { caption: '', size: 1, color: 'blue-light' },
)

/** Grid placement: a crossing spans the lanes between its ends, inclusive. */
function span(step: TraceStep) {
  const lo = Math.min(step.from, step.to)
  const hi = Math.max(step.from, step.to)
  return `${lo + 1} / ${hi + 2}`
}

/** One equal column per lane; computed, so a lane list built in a slide can change. */
const cols = computed(() => `repeat(${props.lanes.length}, minmax(0, 1fr))`)
</script>

<template>
  <div
    :class="[`neversink-${color}-scheme`, 'ns-trace']"
    :style="{ '--ns-trace-size': `${size}rem`, '--ns-trace-cols': cols }"
  >
    <div class="ns-trace__head">
      <div v-for="lane in lanes" :key="lane" class="ns-trace__lane-name">{{ lane }}</div>
    </div>

    <div class="ns-trace__body">
      <!-- One rule per lane, running the height of the trace: the lanes are
           continuous, the calls are the events on them. -->
      <div class="ns-trace__rails">
        <span v-for="(lane, i) in lanes" :key="i" class="ns-trace__rail" />
      </div>

      <div class="ns-trace__steps">
        <template v-for="(step, i) in steps" :key="i">
          <div v-if="step.phase" class="ns-trace__phase">
            <span>{{ step.phase }}</span>
          </div>

          <div class="ns-trace__row" :style="{ animationDelay: `${i * 0.06}s` }">
            <div
              :class="[
                'ns-trace__step',
                step.to === step.from
                  ? 'ns-trace__step--local'
                  : step.to > step.from
                    ? 'ns-trace__step--right'
                    : 'ns-trace__step--left',
                { 'ns-trace__step--on': step.emphasis },
              ]"
              :style="{ gridColumn: span(step) }"
            >
              <span class="ns-trace__label">{{ step.label }}</span>
              <span v-if="step.note" class="ns-trace__note">{{ step.note }}</span>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div v-if="caption" class="ns-trace__caption">{{ caption }}</div>
  </div>
</template>

<style scoped>
.ns-trace {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: var(--ns-trace-size);
}

.ns-trace__head {
  display: grid;
  grid-template-columns: var(--ns-trace-cols);
  gap: 0.3rem;
  padding-bottom: 0.3rem;
  border-bottom: 2px solid var(--neversink-border-color);
}

.ns-trace__lane-name {
  text-align: center;
  font-size: 0.8em;
  font-weight: 700;
  color: var(--neversink-text-color);
  line-height: 1.2;
}

.ns-trace__body {
  position: relative;
}

.ns-trace__rails {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: var(--ns-trace-cols);
  gap: 0.3rem;
  pointer-events: none;
}

.ns-trace__rail {
  justify-self: center;
  width: 2px;
  height: 100%;
  background: var(--neversink-border-color);
  opacity: 0.25;
}

.ns-trace__steps {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.28rem;
  padding: 0.4rem 0;
}

.ns-trace__row {
  display: grid;
  grid-template-columns: var(--ns-trace-cols);
  gap: 0.3rem;
  animation: ns-trace-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* A crossing: a labelled bar with a head on the end it arrives at. */
.ns-trace__step {
  position: relative;
  border: 1.5px solid var(--neversink-admon-border-color);
  border-radius: 0.4rem;
  background: #fff;
  padding: 0.22em 1.1em;
  text-align: center;
  line-height: 1.25;
  min-width: 0;
}

.ns-trace__step::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 0.42em;
  height: 0.42em;
  border-top: 2.5px solid var(--neversink-fg-color);
  border-right: 2.5px solid var(--neversink-fg-color);
}

.ns-trace__step--right::after {
  right: 0.35em;
  transform: translateY(-50%) rotate(45deg);
}

.ns-trace__step--left::after {
  left: 0.35em;
  transform: translateY(-50%) rotate(-135deg);
}

/* Work that stays on one lane: no head, dashed, so it reads as a pause rather
   than a message. */
.ns-trace__step--local {
  border-style: dashed;
  background: var(--neversink-bg-color);
}

.ns-trace__step--on {
  border-color: var(--neversink-fg-color);
  border-style: solid;
  background: var(--neversink-admon-bg-color);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--neversink-admon-bg-color) 60%, transparent);
}

.ns-trace__label {
  display: block;
  font-family: monospace;
  font-size: 0.72em;
  font-weight: 600;
  overflow-wrap: break-word;
}

.ns-trace__note {
  display: block;
  font-size: 0.6em;
  opacity: 0.65;
  line-height: 1.3;
}

/* A named group of steps: a rule across the trace with the phase on it. */
.ns-trace__phase {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0 0.15rem;
}

.ns-trace__phase span {
  font-size: 0.62em;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.6;
  white-space: nowrap;
}

.ns-trace__phase::after {
  content: '';
  flex: 1 1 auto;
  height: 1px;
  background: var(--neversink-border-color);
  opacity: 0.35;
}

.ns-trace__caption {
  margin-top: 0.5rem;
  font-size: 0.75em;
  opacity: 0.75;
  text-align: center;
}

@keyframes ns-trace-in {
  from {
    opacity: 0;
    transform: translateX(-6px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ns-trace__row {
    animation: none;
  }
}
</style>
