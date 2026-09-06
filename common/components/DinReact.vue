<script setup lang="ts">
/**
 * An aside for the half of the room that already took the React course.
 *
 * The course is taught to two groups at once: students who know React and
 * students who do not. A recap lesson serves neither, so every React notion is
 * taught from scratch, in React Native, and the delta from the web goes here.
 * Newcomers read the slide and skip the box; returning students read the box
 * and skip the slide. Same lecture, two paths through it.
 *
 *   <DinReact>
 *   `key` devine `keyExtractor`, iar `FlatList` nu randează toate elementele.
 *   </DinReact>
 *
 *   <DinReact label="Din React Router">…</DinReact>
 *
 * It is deliberately quiet: smaller than body text, one hairline rail, no fill.
 * A box that competes with the slide would pull the newcomers into material
 * written for somebody else, which is the exact failure it exists to avoid.
 *
 * The rail does NOT use the deck's scheme colour. The aside has to read as a
 * different voice from the slide around it, and tinting it with the same
 * indigo as every heading makes it look like part of the argument.
 */
withDefaults(
  defineProps<{
    /** Eyebrow text. Name the source when it is narrower than "React". */
    label?: string
  }>(),
  { label: 'Din React' },
)
</script>

<template>
  <aside class="ns-dinreact">
    <span class="ns-dinreact__label">{{ label }}</span>
    <div class="ns-dinreact__body">
      <slot />
    </div>
  </aside>
</template>

<style scoped>
.ns-dinreact {
  display: flex;
  align-items: baseline;
  gap: 0.9rem;
  margin: 1.1rem 0;
  padding: 0.65rem 0 0.65rem 0.95rem;
  border-left: 3px solid var(--ns-dinreact-accent, #0e7490);
  text-align: left;
}

.ns-dinreact__label {
  flex: none;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  white-space: nowrap;
  color: var(--ns-dinreact-accent, #0e7490);
  /* Nudged onto the first line of body text, which sits on a larger leading. */
  position: relative;
  top: -0.05em;
}

.ns-dinreact__body {
  font-size: 0.95rem;
  line-height: 1.55;
  opacity: 0.85;
}

/* Slot markdown arrives wrapped in <p>; strip the outer margins or the aside
   grows a blank band at each end. */
.ns-dinreact__body :deep(p) {
  margin: 0;
}

.ns-dinreact__body :deep(p + p) {
  margin-top: 0.5rem;
}

.ns-dinreact__body :deep(code) {
  font-size: 0.9em;
}

/* Slidev's dark mode: the cyan rail goes muddy on a dark ground. */
:global(html.dark) .ns-dinreact {
  --ns-dinreact-accent: #67d3ee;
}
</style>
