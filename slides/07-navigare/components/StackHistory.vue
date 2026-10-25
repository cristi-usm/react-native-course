<script setup lang="ts">
/**
 * A navigation stack, drawn once per step: what the stack holds after each
 * operation, left to right, with the operation written on the arrow between.
 *
 *   <StackHistory :frames="[
 *     { stack: ['Acasă'] },
 *     { op: 'push', stack: ['Acasă', 'Produse'] },
 *     { op: 'back', stack: ['Acasă'], note: 'Produse se demontează' },
 *   ]" />
 *
 * `stack` is listed bottom to top, the way the screens were opened. The last
 * entry is the screen the user sees, so it is the one drawn filled; everything
 * under it is mounted but covered, and drawn plain. That one distinction is
 * the whole lesson of the stack, and it needs no legend.
 *
 * The piles stand on a common baseline, so a push visibly grows the pile and a
 * back visibly shrinks it. A table of "push adds, back removes" says the same
 * thing in words; this shows it as a height.
 *
 * `highlight` marks the frame the slide is about, usually the last one.
 */
export interface Frame {
  /** Screens in the stack, bottom to top. The last one is on screen. */
  stack: string[]
  /** The operation that produced this frame, written on the arrow into it. */
  op?: string
  /** Caption under the frame. */
  note?: string
  /** The frame the slide is about: accent baseline and note. */
  highlight?: boolean
}

const props = withDefaults(
  defineProps<{
    frames: Frame[]
    /** Caption under the whole row. */
    caption?: string
    /** Base font size of screen labels, rem. */
    size?: number
    /** Neversink colour scheme. Defaults to the deck's. */
    color?: string
  }>(),
  { caption: '', size: 1, color: 'blue-light' },
)

// frame, arrow, frame, arrow, frame: the arrows take only what their label needs
const columns = props.frames.map(() => 'minmax(0, 1fr)').join(' auto ')
</script>

<template>
  <div
    :class="[`neversink-${color}-scheme`, 'ns-hist']"
    :style="{ '--ns-hist-size': `${size}rem` }"
  >
    <div class="ns-hist__grid" :style="{ gridTemplateColumns: columns }">
      <template v-for="(frame, i) in frames" :key="i">
        <div
          v-if="i > 0"
          class="ns-hist__arrow"
          :style="{ gridColumn: 2 * i, gridRow: 1, animationDelay: `${i * 0.08}s` }"
        >
          <code v-if="frame.op" class="ns-hist__op">{{ frame.op }}</code>
          <span class="ns-hist__shaft" />
        </div>

        <div
          :class="['ns-hist__frame', { 'ns-hist__frame--on': frame.highlight }]"
          :style="{ gridColumn: 2 * i + 1, gridRow: 1, animationDelay: `${i * 0.08}s` }"
        >
          <div
            v-for="(screen, j) in [...frame.stack].reverse()"
            :key="j"
            :class="['ns-hist__card', { 'ns-hist__card--top': j === 0 }]"
          >
            {{ screen }}
          </div>
          <div class="ns-hist__base" />
        </div>

        <div
          v-if="frame.note"
          :class="['ns-hist__note', { 'ns-hist__note--on': frame.highlight }]"
          :style="{ gridColumn: 2 * i + 1, gridRow: 2 }"
        >
          {{ frame.note }}
        </div>
      </template>
    </div>
    <div v-if="caption" class="ns-hist__caption">{{ caption }}</div>
  </div>
</template>

<style scoped>
.ns-hist {
  width: 100%;
}

.ns-hist__grid {
  display: grid;
  align-items: end;
  column-gap: 0.4rem;
  row-gap: 0.45rem;
}

/* A pile standing on its baseline: the top card is the last one pushed. */
.ns-hist__frame {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  animation: ns-hist-in 0.4s ease-out both;
}

.ns-hist__card {
  width: 100%;
  max-width: 9.5rem;
  padding: 0.35rem 0.6rem;
  border: 2px solid var(--neversink-border-color);
  border-radius: 0.6rem;
  background: #fff;
  text-align: center;
  font-size: var(--ns-hist-size);
  font-weight: 600;
  line-height: 1.25;
  color: var(--neversink-text-color);
  opacity: 0.6;
}

/* The screen the user sees: the only card at full strength. */
.ns-hist__card--top {
  border-color: var(--neversink-fg-color);
  background: var(--neversink-admon-bg-color);
  color: var(--neversink-fg-color);
  box-shadow: 0 0 0 3px var(--neversink-admon-bg-color);
  opacity: 1;
}

.ns-hist__base {
  width: 100%;
  max-width: 10.5rem;
  height: 3px;
  margin-top: 0.15rem;
  border-radius: 999px;
  background: var(--neversink-border-color);
}

.ns-hist__frame--on .ns-hist__base {
  background: var(--neversink-fg-color);
}

/* The operation rides on the arrow, at the height of the bottom card. */
.ns-hist__arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  margin-bottom: 0.9rem;
  animation: ns-hist-in 0.4s ease-out both;
}

.ns-hist__op {
  font-size: calc(var(--ns-hist-size) * 0.8);
  white-space: nowrap;
}

.ns-hist__shaft {
  position: relative;
  width: 3.2rem;
  height: 2px;
  background: var(--neversink-fg-color);
  opacity: 0.7;
}

.ns-hist__shaft::after {
  content: '';
  position: absolute;
  right: -2px;
  top: -4px;
  border-left: 8px solid var(--neversink-fg-color);
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
}

.ns-hist__note {
  text-align: center;
  font-size: calc(var(--ns-hist-size) * 0.75);
  line-height: 1.3;
  opacity: 0.7;
}

.ns-hist__note--on {
  color: var(--neversink-fg-color);
  opacity: 1;
}

.ns-hist__caption {
  margin-top: 0.8rem;
  text-align: center;
  font-size: calc(var(--ns-hist-size) * 0.8);
  opacity: 0.7;
}

@keyframes ns-hist-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ns-hist__frame,
  .ns-hist__arrow {
    animation: none;
  }
}
</style>
