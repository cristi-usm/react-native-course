<script setup lang="ts">
/**
 * The cast list: one card per thread, saying what that thread's job is.
 *
 * The companion to `<ThreadLanes>`, and deliberately the slide before it. Lanes
 * answer "where does this live"; this answers "who does what", which is the
 * question a student has first and which a bulleted list answers badly — three
 * bullets read as three sentences of prose, and the fact that these run *at the
 * same time* is exactly what a vertical list denies.
 *
 *   <ThreadRoles :threads="[
 *     { title: 'UI thread', note: 'iOS și Android', alias: 'main thread',
 *       role: 'Desenează pe ecran și primește atingerile.',
 *       owns: ['pixeli', 'atingeri'] },
 *     { title: 'JS thread', note: 'Hermes', emphasis: true,
 *       role: 'Rulează codul vostru.', owns: ['componente', 'state'] },
 *   ]" />
 *
 * `title` and `note` mean what they mean in `<ThreadLanes>` — the thread and who
 * runs it — so the two slides name the same three things the same way, in the
 * same order, and the second is recognisable as the first.
 *
 * `owns` is the point of the card: a thread is defined by what it is allowed to
 * touch. They are chips rather than a sentence because they are a set, not a
 * clause, and because a student scanning three cards compares three short rows
 * far faster than three paragraphs.
 */
export interface ThreadRole {
  title: string
  /** Under the title — who runs this thread. `Hermes`, `în C++`, `iOS și Android`. */
  note?: string
  /** Another name for the same thread, when it has one: `main thread`. */
  alias?: string
  /** One sentence: what this thread does. */
  role: string
  /** What it is allowed to touch. Two or three short nouns, not a sentence. */
  owns?: string[]
  /** The thread the slide is about: accented rule, tinted card. */
  emphasis?: boolean
}

withDefaults(
  defineProps<{
    threads: ThreadRole[]
    /** Caption under the row. */
    caption?: string
    /** Base font size, rem. */
    size?: number
    /** Neversink colour scheme. Defaults to the deck's. */
    color?: string
  }>(),
  { caption: '', size: 1, color: 'blue-light' },
)
</script>

<template>
  <div
    :class="[`neversink-${color}-scheme`, 'ns-roles']"
    :style="{ '--ns-roles-size': `${size}rem` }"
  >
    <div class="ns-roles__row">
      <div
        v-for="(thread, i) in threads"
        :key="i"
        :class="['ns-roles__card', { 'ns-roles__card--on': thread.emphasis }]"
        :style="{ animationDelay: `${i * 0.08}s` }"
      >
        <div class="ns-roles__rule" />
        <div class="ns-roles__title">{{ thread.title }}</div>
        <div class="ns-roles__note">{{ thread.note || ' ' }}</div>
        <div class="ns-roles__role">{{ thread.role }}</div>
        <div v-if="thread.owns?.length" class="ns-roles__owns">
          <span v-for="(item, j) in thread.owns" :key="j" class="ns-roles__chip">{{ item }}</span>
        </div>
        <div v-if="thread.alias" class="ns-roles__alias">se numește și {{ thread.alias }}</div>
      </div>
    </div>
    <div v-if="caption" class="ns-roles__caption">{{ caption }}</div>
  </div>
</template>

<style scoped>
.ns-roles {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-size: var(--ns-roles-size);
}

/* Side by side and equal width: they run at the same time, and a column of
   three would say they happen one after another. */
.ns-roles__row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  align-items: stretch;
  gap: 0.8rem;
  width: 100%;
}

.ns-roles__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0.9rem 0.9rem;
  border: 1.5px solid var(--neversink-admon-border-color);
  border-radius: 10px;
  background: #fff;
  text-align: center;
  overflow: hidden;
  animation: ns-roles-rise 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* The thread the slide is about. Five properties move at once, so it reads as a
   hierarchy rather than as a rendering accident. */
.ns-roles__card--on {
  border-color: var(--neversink-border-color);
  background: var(--neversink-admon-bg-color);
  box-shadow: 0 10px 24px -16px var(--neversink-fg-color);
}

/* A bar across the top of the card, the width of the card: a thread is a track
   something runs along, and the bar is that track seen end-on. */
.ns-roles__rule {
  width: calc(100% + 1.8rem);
  height: 0.3rem;
  margin: 0 -0.9rem 0.7rem;
  background: var(--neversink-admon-border-color);
}

.ns-roles__card--on .ns-roles__rule {
  background: var(--neversink-fg-color);
}

.ns-roles__title {
  font-size: calc(var(--ns-roles-size) * 0.95);
  font-weight: 700;
  line-height: 1.2;
  color: var(--neversink-text-color);
}

.ns-roles__note {
  font-size: calc(var(--ns-roles-size) * 0.66);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-weight: 600;
  opacity: 0.55;
  min-height: 1.4em;
  line-height: 1.4;
}

.ns-roles__role {
  margin-top: 0.35rem;
  font-size: calc(var(--ns-roles-size) * 0.82);
  line-height: 1.35;
  text-wrap: balance;
}

.ns-roles__owns {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.3rem;
  margin-top: 0.6rem;
}

.ns-roles__chip {
  padding: 0.15em 0.55em;
  border: 1.5px solid var(--neversink-admon-border-color);
  border-radius: 999px;
  background: var(--neversink-admon-bg-color);
  font-size: calc(var(--ns-roles-size) * 0.68);
  font-weight: 600;
  line-height: 1.4;
  white-space: nowrap;
}

.ns-roles__card--on .ns-roles__chip {
  border-color: var(--neversink-border-color);
  background: #fff;
}

.ns-roles__alias {
  margin-top: 0.5rem;
  font-size: calc(var(--ns-roles-size) * 0.64);
  opacity: 0.55;
  line-height: 1.3;
}

.ns-roles__caption {
  margin-top: 0.6rem;
  text-align: center;
  font-size: calc(var(--ns-roles-size) * 0.72);
  opacity: 0.7;
}

@keyframes ns-roles-rise {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ns-roles__card {
    animation: none;
  }
}
</style>
