<script setup lang="ts">
/**
 * The React Native architecture map: threads as frames, the pieces inside them,
 * and the seam in the middle where JavaScript meets the platform.
 *
 *   <ArchMap variant="bridge" />   the old architecture: JSON over a queue
 *   <ArchMap variant="jsi" />      the new one: JSI, Fabric, TurboModules
 *
 * Purpose-built rather than data-driven, because the two variants are two
 * specific pictures and the whole point is to show them one after the other and
 * have the second read as an edit of the first: the same frames in the same
 * places, with the middle replaced.
 *
 * Two things about the geometry are load-bearing, and both were wrong in the
 * first version:
 *
 * - A crossing is horizontal. The rails sit *between* a frame and the hub and
 *   physically join them, so the picture shows what touches what. Stacking them
 *   above and below the hub leaves two lines floating over empty space.
 * - The shadow thread hangs above the thread it answers to, not over the middle
 *   of the picture: under the bridge, Yoga's answers reach the UI thread; under
 *   JSI, they reach Fabric. Where the box sits *is* the claim.
 */
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** Which architecture: the bridge, or JSI. */
    variant?: 'bridge' | 'jsi'
    /** Caption under the map. */
    caption?: string
    /** Base font size, rem. */
    size?: number
    /** Fade the frames back and keep the seam bright. */
    focusSeam?: boolean
    /** Neversink colour scheme. Defaults to the deck's. */
    color?: string
  }>(),
  { variant: 'bridge', caption: '', size: 1, focusSeam: false, color: 'blue-light' },
)

/** Yoga answers the renderer: the UI thread under the bridge, Fabric under JSI. */
const shadowOver = computed(() => (props.variant === 'bridge' ? 'ui' : 'seam'))
</script>

<template>
  <div
    :class="[
      `neversink-${color}-scheme`,
      'ns-arch',
      `ns-arch--${variant}`,
      `ns-arch--shadow-${shadowOver}`,
      { 'ns-arch--focus': focusSeam },
    ]"
    :style="{ '--ns-arch-size': `${size}rem` }"
  >
    <div class="ns-arch__grid">
      <!-- Row 1: the shadow thread, sitting over whatever it answers to. -->
      <div class="ns-arch__shadow">
        <div class="ns-arch__frame-name">Shadow thread</div>
        <div class="ns-arch__chip">Yoga</div>
        <div class="ns-arch__drop">
          <span class="ns-arch__drop-note">layout</span>
          <span class="ns-arch__drop-rail" />
          <span class="ns-arch__drop-head" />
        </div>
      </div>

      <!-- Row 2, left to right: your code, the bundler, the two threads, the seam. -->
      <div class="ns-arch__source">
        <div class="ns-arch__chip ns-arch__chip--source">React</div>
        <div v-if="variant === 'jsi'" class="ns-arch__types">tipuri</div>
      </div>

      <div class="ns-arch__metro">
        <span class="ns-arch__arrow-name">Metro</span>
        <span class="ns-arch__arrow">
          <span class="ns-arch__arrow-rail" />
          <span class="ns-arch__arrow-head" />
        </span>
      </div>

      <div class="ns-arch__frame ns-arch__frame--js">
        <div class="ns-arch__frame-name">JS thread</div>
        <div class="ns-arch__engine">
          <div class="ns-arch__engine-name">{{ variant === 'bridge' ? 'JSC' : 'Hermes' }}</div>
          <div class="ns-arch__chip">JS bundle</div>
        </div>
      </div>

      <div class="ns-arch__seam">
        <span class="ns-arch__cross">
          <span class="ns-arch__cross-label">{{ variant === 'bridge' ? 'JSON' : 'apel direct' }}</span>
          <span class="ns-arch__cross-rail" />
        </span>

        <div v-if="variant === 'bridge'" class="ns-arch__diamond">
          <span>Bridge</span>
        </div>
        <div v-else class="ns-arch__spine">
          <div class="ns-arch__spine-bar">JSI</div>
          <div class="ns-arch__teeth">
            <div class="ns-arch__tooth">Fabric</div>
            <div class="ns-arch__tooth">TurboModules</div>
          </div>
        </div>

        <span class="ns-arch__cross">
          <span class="ns-arch__cross-label">{{ variant === 'bridge' ? 'JSON' : 'apel direct' }}</span>
          <span class="ns-arch__cross-rail" />
        </span>
      </div>

      <div class="ns-arch__frame ns-arch__frame--ui">
        <div class="ns-arch__frame-name">UI thread</div>
        <div class="ns-arch__chip ns-arch__chip--native">
          <span>Native UI</span>
          <span>Native modules</span>
        </div>
      </div>

      <!-- Codegen: the one arrow that runs at build time, under the whole row. -->
      <div v-if="variant === 'jsi'" class="ns-arch__codegen">
        <span class="ns-arch__codegen-rail" />
        <span class="ns-arch__codegen-label">codegen: tipurile devin interfețe native</span>
        <span class="ns-arch__arrow-head" />
      </div>
    </div>

    <div v-if="caption" class="ns-arch__caption">{{ caption }}</div>
  </div>
</template>

<style scoped>
.ns-arch {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-size: var(--ns-arch-size);
}

/* Five columns: React, the Metro arrow, the JS thread, the seam, the UI thread.
   Row 1 holds only the shadow thread, over the column it answers to; row gap is
   zero so its arrow lands on the frame below. */
.ns-arch__grid {
  display: grid;
  grid-template-columns: auto auto minmax(0, 1fr) auto minmax(0, 1fr);
  grid-template-rows: auto auto auto;
  align-items: center;
  justify-items: stretch;
  column-gap: 0.35rem;
  row-gap: 0;
  width: 100%;
}

.ns-arch__shadow {
  grid-row: 1;
  justify-self: center;
  min-width: 9em;
}

.ns-arch--shadow-ui .ns-arch__shadow {
  grid-column: 5;
}

.ns-arch--shadow-seam .ns-arch__shadow {
  grid-column: 4;
}

.ns-arch__source {
  grid-row: 2;
  grid-column: 1;
}
.ns-arch__metro {
  grid-row: 2;
  grid-column: 2;
}
.ns-arch__frame--js {
  grid-row: 2;
  grid-column: 3;
}
.ns-arch__seam {
  grid-row: 2;
  grid-column: 4;
}
.ns-arch__frame--ui {
  grid-row: 2;
  grid-column: 5;
}
.ns-arch__codegen {
  grid-row: 3;
  grid-column: 1 / 5;
}

/* A thread is a named region: a thin box around its pieces. */
.ns-arch__frame,
.ns-arch__shadow {
  position: relative;
  border: 1.5px solid var(--neversink-border-color);
  border-radius: 0.7rem;
  padding: 1.15rem 0.6rem 0.6rem;
  background: color-mix(in srgb, var(--neversink-admon-bg-color) 45%, transparent);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ns-arch-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.ns-arch__shadow {
  padding-bottom: 0.5rem;
}

.ns-arch__frame-name {
  position: absolute;
  top: 0.3rem;
  left: 0.6rem;
  font-size: 0.6em;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 700;
  opacity: 0.6;
}

/* The engine inside the JS thread: another box, because "the thread" and "the
   engine running on it" are two things students routinely merge into one. */
.ns-arch__engine {
  position: relative;
  width: 100%;
  border: 1.5px dashed var(--neversink-admon-border-color);
  border-radius: 0.5rem;
  padding: 1rem 0.45rem 0.45rem;
}

.ns-arch__engine-name {
  position: absolute;
  top: 0.18rem;
  left: 0.45rem;
  font-family: monospace;
  font-size: 0.6em;
  opacity: 0.7;
}

.ns-arch__chip {
  border: 1.5px solid var(--neversink-fg-color);
  border-radius: 0.4rem;
  background: #fff;
  padding: 0.3em 0.55em;
  font-size: 0.78em;
  font-weight: 700;
  text-align: center;
  line-height: 1.25;
  width: 100%;
}

.ns-arch__chip--source {
  background: var(--neversink-admon-bg-color);
  white-space: nowrap;
}

.ns-arch__chip--native {
  display: flex;
  flex-direction: column;
  gap: 0.1em;
  font-family: monospace;
  font-weight: 600;
  font-size: 0.72em;
}

.ns-arch__source {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.ns-arch__types {
  font-family: monospace;
  font-size: 0.58em;
  padding: 0.12em 0.35em;
  border: 1px solid var(--neversink-admon-border-color);
  border-radius: 4px;
  opacity: 0.8;
}

/* Build-time arrows: Metro across the top, codegen along the bottom. */
.ns-arch__metro {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
}

.ns-arch__arrow-name {
  font-size: 0.58em;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  opacity: 0.7;
}

.ns-arch__arrow {
  display: flex;
  align-items: center;
}

.ns-arch__arrow-rail {
  display: block;
  width: 1.9rem;
  height: 3px;
  background: var(--neversink-fg-color);
  opacity: 0.85;
}

.ns-arch__arrow-head {
  width: 0.42em;
  height: 0.42em;
  flex: none;
  border-top: 2.5px solid var(--neversink-fg-color);
  border-right: 2.5px solid var(--neversink-fg-color);
  transform: rotate(45deg);
  margin-left: -0.3em;
}

.ns-arch__codegen {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.5rem;
}

.ns-arch__codegen-rail {
  flex: 1 1 auto;
  height: 3px;
  background: repeating-linear-gradient(
    90deg,
    var(--neversink-fg-color) 0 8px,
    transparent 8px 14px
  );
  background-size: 14px 3px;
  opacity: 0.8;
}

.ns-arch__codegen-label {
  font-size: 0.6em;
  font-weight: 700;
  letter-spacing: 0.03em;
  opacity: 0.75;
  white-space: nowrap;
}

/* Yoga's answer coming down into the renderer. */
.ns-arch__drop {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: -0.9rem;
}

.ns-arch__drop-note {
  font-size: 0.55em;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  opacity: 0.55;
}

.ns-arch__drop-rail {
  width: 3px;
  height: 0.9rem;
  background: var(--neversink-border-color);
  opacity: 0.7;
}

.ns-arch__drop-head {
  width: 0.42em;
  height: 0.42em;
  border-top: 2.5px solid var(--neversink-border-color);
  border-right: 2.5px solid var(--neversink-border-color);
  transform: rotate(135deg);
  margin-top: -0.28em;
  opacity: 0.85;
}

/* The seam: one horizontal run from the JS thread, through the hub, to the UI
   thread. Everything the two variants disagree about lives here. */
.ns-arch__seam {
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ns-arch-in 0.45s 0.1s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.ns-arch__cross {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 auto;
  width: 3.4rem;
}

.ns-arch__cross-label {
  font-family: monospace;
  font-size: 0.55em;
  opacity: 0.7;
  line-height: 1.2;
  margin-bottom: 0.15rem;
  white-space: nowrap;
}

.ns-arch__cross-rail {
  display: block;
  position: relative;
  width: 100%;
  height: 3px;
}

/* Serialized and queued: dashes that drift, so the seam reads as a conveyor. */
.ns-arch--bridge .ns-arch__cross-rail {
  background: repeating-linear-gradient(
    90deg,
    var(--neversink-border-color) 0 6px,
    transparent 6px 12px
  );
  background-size: 12px 3px;
  animation: ns-arch-drift 1.1s linear infinite;
}

/* A direct call: one solid line, a head at each end. */
.ns-arch--jsi .ns-arch__cross-rail {
  background: var(--neversink-fg-color);
}

.ns-arch--jsi .ns-arch__cross-rail::before,
.ns-arch--jsi .ns-arch__cross-rail::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 0.38em;
  height: 0.38em;
  border-top: 2.5px solid var(--neversink-fg-color);
  border-right: 2.5px solid var(--neversink-fg-color);
}

.ns-arch--jsi .ns-arch__cross-rail::before {
  left: 0;
  transform: translateY(-50%) rotate(-135deg);
}

.ns-arch--jsi .ns-arch__cross-rail::after {
  right: 0;
  transform: translateY(-50%) rotate(45deg);
}

.ns-arch__diamond {
  display: grid;
  place-items: center;
  flex: none;
  width: 4.4em;
  height: 4.4em;
  transform: rotate(45deg);
  border: 2px solid var(--neversink-fg-color);
  background: var(--neversink-admon-bg-color);
}

.ns-arch__diamond span {
  transform: rotate(-45deg);
  font-size: 0.72em;
  font-weight: 700;
}

/* JSI: a spine with two teeth, because Fabric and TurboModules are not beside
   JSI, they are built on it. */
.ns-arch__spine {
  display: flex;
  align-items: stretch;
  flex: none;
  width: 8.5em;
}

.ns-arch__spine-bar {
  display: grid;
  place-items: center;
  flex: none;
  padding: 0.45em 0.3em;
  border: 2px solid var(--neversink-fg-color);
  border-radius: 0.4rem 0 0 0.4rem;
  background: var(--neversink-fg-color);
  color: #fff;
  font-weight: 700;
  font-size: 0.72em;
  writing-mode: vertical-rl;
  letter-spacing: 0.08em;
}

.ns-arch__teeth {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.2rem;
  flex: 1 1 auto;
  min-width: 0;
}

.ns-arch__tooth {
  border: 2px solid var(--neversink-fg-color);
  border-left: none;
  border-radius: 0 0.4rem 0.4rem 0;
  background: #fff;
  padding: 0.3em 0.35em;
  font-size: 0.62em;
  font-weight: 700;
  text-align: center;
  line-height: 1.15;
  overflow-wrap: break-word;
}

/* A slide that is only about the middle. */
.ns-arch--focus .ns-arch__frame,
.ns-arch--focus .ns-arch__shadow,
.ns-arch--focus .ns-arch__source,
.ns-arch--focus .ns-arch__metro {
  opacity: 0.35;
}

.ns-arch__caption {
  margin-top: 0.9rem;
  font-size: 0.78em;
  opacity: 0.75;
  text-align: center;
}

@keyframes ns-arch-drift {
  to {
    background-position: 12px 0;
  }
}

@keyframes ns-arch-in {
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
  .ns-arch__frame,
  .ns-arch__shadow,
  .ns-arch__seam {
    animation: none;
  }
  .ns-arch--bridge .ns-arch__cross-rail {
    animation: none;
  }
}
</style>
