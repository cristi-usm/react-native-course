<script setup lang="ts">
/**
 * A stack of layers, drawn top to bottom, each one sitting on the one below.
 *
 * For anything explained as "your code is up here, the machine is down there,
 * and these are the things in between": the React Native stack, the graphics
 * pipeline, an OS in rings.
 *
 *   <LayerStack :layers="[
 *     { label: 'Codul vostru', sub: 'JSX, hooks', side: 'îl scrieți' },
 *     { label: 'React Native', emphasis: true },
 *     { label: 'UIView / android.view.View', kind: 'native' },
 *   ]" />
 *
 * `kind` tints a layer by what it is — `js` (your world), `bridge` (the layer
 * that translates) and `native` (the platform's world) — so the picture carries
 * the distinction without a legend. A `side` note is written to the right of a
 * layer, on its own line, joined by a short rule.
 *
 * The stack is a column of blocks rather than an SVG so a layer can hold a
 * `<code>` name at the deck's own type size and still wrap on a narrow slide.
 */
export interface Layer {
  label: string
  /** Second line inside the block — what it is made of. */
  sub?: string
  /** Note to the right of the block — who owns this layer, or what it costs. */
  side?: string
  /** 'js' your code, 'bridge' the translating layer, 'native' the platform. */
  kind?: 'js' | 'bridge' | 'native'
  /** The layer the slide is about: accent border, filled. */
  emphasis?: boolean
}

withDefaults(
  defineProps<{
    layers: Layer[]
    /** Caption under the stack. */
    caption?: string
    /** Base font size of layer labels, rem. */
    size?: number
    /** Neversink colour scheme. Defaults to the deck's. */
    color?: string
  }>(),
  { caption: '', size: 1, color: 'blue-light' },
)
</script>

<template>
  <div
    :class="[`neversink-${color}-scheme`, 'ns-stack']"
    :style="{ '--ns-stack-size': `${size}rem` }"
  >
    <div
      v-for="(layer, i) in layers"
      :key="i"
      class="ns-stack__row"
      :style="{ animationDelay: `${i * 0.05}s` }"
    >
      <div
        :class="[
          'ns-stack__block',
          `ns-stack__block--${layer.kind ?? 'js'}`,
          { 'ns-stack__block--on': layer.emphasis },
        ]"
      >
        <div class="ns-stack__label">{{ layer.label }}</div>
        <div v-if="layer.sub" class="ns-stack__sub">{{ layer.sub }}</div>
      </div>
      <div class="ns-stack__side">
        <span v-if="layer.side" class="ns-stack__rule" />
        <span v-if="layer.side" class="ns-stack__side-text">{{ layer.side }}</span>
      </div>
    </div>
    <div v-if="caption" class="ns-stack__caption">{{ caption }}</div>
  </div>
</template>

<style scoped>
.ns-stack {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;
}

.ns-stack__row {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
  align-items: center;
  gap: 0.5rem;
  animation: ns-stack-in 0.4s ease-out both;
}

.ns-stack__block {
  border: 2px solid var(--neversink-border-color);
  border-radius: 0.7rem;
  padding: 0.55rem 0.9rem;
  background: #fff;
  text-align: center;
}

/* Your code: the scheme's own tint. */
.ns-stack__block--js {
  background: var(--neversink-admon-bg-color);
}

/* The translating layer: dashed, because nothing of yours lives here. */
.ns-stack__block--bridge {
  background: transparent;
  border-style: dashed;
}

/* The platform: grey, outside your repository. */
.ns-stack__block--native {
  background: var(--neversink-bg-color);
  border-color: var(--neversink-border-color);
}

.ns-stack__block--on {
  border-color: var(--neversink-fg-color);
  border-style: solid;
  box-shadow: 0 0 0 3px var(--neversink-admon-bg-color);
}

.ns-stack__label {
  font-size: var(--ns-stack-size);
  font-weight: 700;
  line-height: 1.25;
  color: var(--neversink-text-color);
}

.ns-stack__block--on .ns-stack__label {
  color: var(--neversink-fg-color);
}

.ns-stack__sub {
  margin-top: 0.1rem;
  font-size: calc(var(--ns-stack-size) * 0.72);
  line-height: 1.3;
  opacity: 0.7;
}

.ns-stack__side {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 1px;
}

.ns-stack__rule {
  width: 1.4rem;
  height: 2px;
  flex: none;
  background: var(--neversink-border-color);
  opacity: 0.5;
}

.ns-stack__side-text {
  font-size: calc(var(--ns-stack-size) * 0.75);
  line-height: 1.3;
  opacity: 0.75;
}

.ns-stack__caption {
  margin-top: 0.5rem;
  text-align: center;
  font-size: calc(var(--ns-stack-size) * 0.78);
  opacity: 0.7;
}

@keyframes ns-stack-in {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ns-stack__row {
    animation: none;
  }
}
</style>
