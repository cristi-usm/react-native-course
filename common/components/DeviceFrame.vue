<script setup lang="ts">
/**
 * A phone around a piece of a slide.
 *
 * The screen is a plain slot, so what goes inside is normal markdown or normal
 * components: simulated UI, a screenshot, a single sentence describing what the
 * user sees. Two of these side by side is the cheapest way to show "the same
 * code, two platforms" or "before and after".
 *
 *   <DeviceFrame platform="ios" caption="iOS">
 *
 *   ... conținutul ecranului ...
 *
 *   </DeviceFrame>
 *
 * `platform` only changes the chrome: iOS gets a notch and a home indicator,
 * Android a punch-hole camera and a squarer body. Neither draws any real system
 * UI, because a fake status bar that is subtly wrong is worse than none.
 *
 * The device does not animate in. It is scenery for whatever is on the screen,
 * and an entrance would put the frame ahead of the thing it frames.
 *
 * `tone="dim"` fades the whole device back, for the phone that is the
 * counter-example on a slide with two.
 */
withDefaults(
  defineProps<{
    /** Chrome style: notch and rounded body, or punch-hole and squarer body. */
    platform?: 'ios' | 'android'
    /** Label under the device. */
    caption?: string
    /** Screen width in px. The body scales with it. */
    width?: number
    /** Screen height in px. */
    height?: number
    /** The device the slide is *not* about: faded back. */
    tone?: 'normal' | 'dim'
    /** Accent the body, for the device the slide is about. */
    emphasis?: boolean
    /** Neversink colour scheme. Defaults to the deck's. */
    color?: string
  }>(),
  {
    platform: 'ios',
    caption: '',
    width: 220,
    height: 440,
    tone: 'normal',
    emphasis: false,
    color: 'blue-light',
  },
)
</script>

<template>
  <figure
    :class="[
      `neversink-${color}-scheme`,
      'ns-device',
      `ns-device--${platform}`,
      { 'ns-device--dim': tone === 'dim', 'ns-device--on': emphasis },
    ]"
    :style="{ '--ns-device-w': `${width}px`, '--ns-device-h': `${height}px` }"
  >
    <div class="ns-device__body">
      <div class="ns-device__screen">
        <div v-if="platform === 'ios'" class="ns-device__notch" />
        <div v-else class="ns-device__punch" />
        <div class="ns-device__content">
          <slot />
        </div>
        <div v-if="platform === 'ios'" class="ns-device__home" />
        <div v-else class="ns-device__nav">
          <span class="ns-device__nav-tri" />
          <span class="ns-device__nav-dot" />
          <span class="ns-device__nav-sq" />
        </div>
      </div>
    </div>
    <figcaption v-if="caption" class="ns-device__caption">{{ caption }}</figcaption>
  </figure>
</template>

<style scoped>
.ns-device {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
}

.ns-device--dim {
  opacity: 0.55;
  filter: saturate(0.6);
}

/* The body is the aluminium; the screen sits inside it with an even bezel. */
.ns-device__body {
  padding: 10px;
  border-radius: 2.4rem;
  background: var(--neversink-bg-color);
  border: 2px solid var(--neversink-border-color);
  box-shadow:
    0 1px 0 rgb(255 255 255 / 0.6) inset,
    0 14px 30px -14px rgb(0 0 0 / 0.35);
}

.ns-device--android .ns-device__body {
  border-radius: 1.6rem;
}

.ns-device--on .ns-device__body {
  border-color: var(--neversink-fg-color);
  box-shadow:
    0 0 0 3px var(--neversink-admon-bg-color),
    0 14px 30px -12px rgb(0 0 0 / 0.4);
}

.ns-device__screen {
  position: relative;
  width: var(--ns-device-w);
  height: var(--ns-device-h);
  border-radius: 1.8rem;
  background: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.ns-device--android .ns-device__screen {
  border-radius: 1rem;
}

/* iOS notch: a rounded tab hanging from the top edge. */
.ns-device__notch {
  align-self: center;
  width: 42%;
  height: 20px;
  border-radius: 0 0 0.9rem 0.9rem;
  background: var(--neversink-border-color);
  opacity: 0.55;
  flex: none;
}

/* Android punch-hole: a single camera dot, top centre. */
.ns-device__punch {
  align-self: center;
  width: 9px;
  height: 9px;
  margin-top: 7px;
  border-radius: 999px;
  background: var(--neversink-border-color);
  opacity: 0.6;
  flex: none;
}

.ns-device__content {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  padding: 0.8rem 0.9rem;
  font-size: 0.8rem;
  line-height: 1.4;
  color: var(--neversink-text-color);
}

/* Slot markdown arrives as `<p>` tags carrying Slidev's prose margins, which
   compound with whatever `gap` the slide sets and spread three short lines over
   the whole screen. The screen is a small fixed box, so spacing here belongs to
   the author's flex `gap` alone. */
.ns-device__content :deep(p) {
  margin: 0;
}

.ns-device__content :deep(> :first-child) {
  margin-top: 0;
}

.ns-device__home {
  align-self: center;
  width: 34%;
  height: 4px;
  margin-bottom: 7px;
  border-radius: 999px;
  background: var(--neversink-border-color);
  opacity: 0.6;
  flex: none;
}

/* Android's three buttons: triangle, circle, square. */
.ns-device__nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;
  padding-bottom: 8px;
  opacity: 0.55;
  flex: none;
}

.ns-device__nav-tri {
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-right: 8px solid var(--neversink-border-color);
}

.ns-device__nav-dot {
  width: 10px;
  height: 10px;
  border: 2px solid var(--neversink-border-color);
  border-radius: 999px;
}

.ns-device__nav-sq {
  width: 9px;
  height: 9px;
  border: 2px solid var(--neversink-border-color);
  border-radius: 2px;
}

.ns-device__caption {
  margin-top: 0.6rem;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--neversink-text-color);
  opacity: 0.75;
}
</style>
