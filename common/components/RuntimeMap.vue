<script setup lang="ts">
/**
 * A JavaScript runtime drawn as what it actually is: an engine, plus everything
 * the host puts around it.
 *
 * The picture that answers "so is JavaScript the same language on the phone as
 * in the browser?" — yes, that is the inner box; no, that is everything else.
 * Draw the browser with one of these and the phone with another, side by side,
 * and the difference is one band of the picture: the right-hand column by
 * default, or the bottom row with `stacked`.
 *
 *   <RuntimeMap
 *     title="Runtime în browser"
 *     engine="V8, JSC, SpiderMonkey"
 *     :parts="['call stack', 'heap', 'garbage collector']"
 *     :panels="[
 *       { title: 'API-uri de la gazdă', items: ['document', 'fetch', 'setTimeout'] },
 *       { title: 'cozi de sarcini' },
 *       { title: 'event loop' },
 *     ]" />
 *
 * `stacked` puts the engine above the host panels rather than beside them, which
 * is what you want for two of these compared side by side.
 *
 * The nesting is load-bearing: `parts` are inside the engine (the standard, the
 * same everywhere), `panels` are outside it (the host, different everywhere). A
 * panel with no `items` is a named box with nothing in it, which is how the
 * event loop and the queues should look — they are machinery, not a list.
 */
withDefaults(
  defineProps<{
    /** Name of the whole runtime — the outer box. */
    title: string
    /** Which engines this describes — written inside the engine box. */
    engine: string
    /** What the engine itself contains: stack, heap, interpreter. */
    parts?: string[]
    /** What the host adds around the engine. */
    panels?: { title: string; items?: string[] }[]
    /** Caption under the box. */
    caption?: string
    /** Base font size, rem. */
    size?: number
    /** Accent the whole box — the runtime the slide is about. */
    emphasis?: boolean
    /** Engine on top, host panels in a row below. For two maps side by side. */
    stacked?: boolean
    /** Neversink colour scheme. Defaults to the deck's. */
    color?: string
  }>(),
  {
    parts: () => [],
    panels: () => [],
    caption: '',
    size: 1,
    emphasis: false,
    stacked: false,
    color: 'blue-light',
  },
)
</script>

<template>
  <div
    :class="[
      `neversink-${color}-scheme`,
      'ns-rt',
      { 'ns-rt--on': emphasis, 'ns-rt--stacked': stacked },
    ]"
    :style="{ '--ns-rt-size': `${size}rem` }"
  >
    <div class="ns-rt__outer">
      <div class="ns-rt__outer-name">{{ title }}</div>

      <div class="ns-rt__cols">
        <!-- Inside the engine: the language. Identical on every platform. -->
        <div class="ns-rt__engine">
          <div class="ns-rt__engine-name">JS engine</div>
          <div class="ns-rt__engine-list">{{ engine }}</div>
          <div v-if="parts.length" class="ns-rt__parts">
            <div v-for="part in parts" :key="part" class="ns-rt__part">{{ part }}</div>
          </div>
        </div>

        <!-- Outside the engine: the host. Different on every platform. -->
        <div v-if="panels.length" class="ns-rt__panels">
          <div
            v-for="(panel, i) in panels"
            :key="i"
            :class="['ns-rt__panel', { 'ns-rt__panel--bare': !panel.items?.length }]"
            :style="{ animationDelay: `${0.1 + i * 0.07}s` }"
          >
            <div class="ns-rt__panel-name">{{ panel.title }}</div>
            <ul v-if="panel.items?.length" class="ns-rt__panel-items">
              <li v-for="item in panel.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div v-if="caption" class="ns-rt__caption">{{ caption }}</div>
  </div>
</template>

<style scoped>
.ns-rt {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: var(--ns-rt-size);
}

.ns-rt__outer {
  position: relative;
  border: 2px solid var(--neversink-border-color);
  border-radius: 0.9rem;
  padding: 1.4rem 0.7rem 0.7rem;
  background: color-mix(in srgb, var(--neversink-admon-bg-color) 35%, transparent);
  animation: ns-rt-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.ns-rt--on .ns-rt__outer {
  border-color: var(--neversink-fg-color);
  box-shadow: 0 0 0 3px var(--neversink-admon-bg-color);
}

.ns-rt__outer-name {
  position: absolute;
  top: 0.4rem;
  left: 0.75rem;
  font-size: 0.72em;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--neversink-text-color);
  opacity: 0.75;
}

.ns-rt__cols {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 0.5rem;
  align-items: stretch;
}

/* The engine box, and the machinery inside it. Two nested borders, because the
   slide's claim is precisely about which of the two you are inside. */
.ns-rt__engine {
  position: relative;
  border: 1.5px solid var(--neversink-fg-color);
  border-radius: 0.7rem;
  padding: 1.2rem 0.55rem 0.6rem;
  background: #fff;
}

.ns-rt__engine-name {
  position: absolute;
  top: 0.3rem;
  left: 0.6rem;
  font-size: 0.62em;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--neversink-fg-color);
}

.ns-rt__engine-list {
  font-family: monospace;
  font-size: 0.68em;
  opacity: 0.75;
  margin-bottom: 0.45rem;
  text-align: center;
  overflow-wrap: break-word;
}

.ns-rt__parts {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border: 1.5px dashed var(--neversink-admon-border-color);
  border-radius: 0.5rem;
  padding: 0.4rem;
}

.ns-rt__part {
  font-family: monospace;
  font-size: 0.7em;
  text-align: center;
  padding: 0.15em 0;
}

.ns-rt__panels {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.ns-rt__panel {
  border: 1.5px solid var(--neversink-admon-border-color);
  border-radius: 0.6rem;
  padding: 0.4rem 0.55rem;
  background: #fff;
  flex: 0 0 auto;
  animation: ns-rt-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* Machinery, not a list: centred name, no contents, grows to fill. */
.ns-rt__panel--bare {
  display: grid;
  place-items: center;
  flex: 1 1 auto;
  background: var(--neversink-bg-color);
}

.ns-rt__panel-name {
  font-size: 0.72em;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--neversink-text-color);
}

.ns-rt__panel--bare .ns-rt__panel-name {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.8;
}

.ns-rt__panel-items {
  list-style: none;
  margin: 0.2rem 0 0;
  padding: 0;
}

.ns-rt__panel-items li {
  font-family: monospace;
  font-size: 0.66em;
  line-height: 1.5;
  opacity: 0.8;
  overflow-wrap: break-word;
}

.ns-rt__caption {
  margin-top: 0.5rem;
  font-size: 0.75em;
  opacity: 0.75;
  text-align: center;
}

/* Stacked: the engine above, the host in a row beneath it. Two maps compared
   side by side would otherwise be four narrow columns, and the mono names inside
   the engine box stop fitting on one line. */
.ns-rt--stacked .ns-rt__cols {
  grid-template-columns: minmax(0, 1fr);
}

.ns-rt--stacked .ns-rt__panels {
  flex-direction: row;
  align-items: stretch;
}

.ns-rt--stacked .ns-rt__panel {
  flex: 1 1 0;
  min-width: 0;
}

.ns-rt--stacked .ns-rt__parts {
  flex-direction: row;
  justify-content: center;
  gap: 0.5rem;
}

@keyframes ns-rt-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ns-rt__outer,
  .ns-rt__panel {
    animation: none;
  }
}
</style>
