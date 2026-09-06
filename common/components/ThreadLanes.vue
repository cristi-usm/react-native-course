<script setup lang="ts">
/**
 * Threads drawn side by side as vertical lanes, with what lives on each one.
 *
 * The picture React Native is always explained with: the platform on one side,
 * JavaScript on the other, and something in between that carries messages
 * across. Reused for the bridge, for the shadow tree, and for a scroll.
 *
 *   <ThreadLanes :lanes="[
 *     { title: 'Main thread', note: 'iOS / Android', frame: 'phone',
 *       nodes: [{ label: 'Header', tone: 'a' }, { label: 'Paragraph', tone: 'b' }] },
 *     { title: 'JS thread', note: 'Hermes', tree: true,
 *       nodes: [{ label: 'Header', tone: 'a' }, { label: 'Paragraph', tone: 'b' }] },
 *   ]" :boundaries="[{ label: 'createView(id, RCTView)', mode: 'queue' }]" />
 *
 * `boundaries[i]` is the seam between lane `i` and lane `i + 1`, so a diagram
 * with three lanes takes two of them. `mode` is the whole point of the picture:
 * `queue` draws a drifting dashed seam (the bridge, where every message is
 * serialized and waits its turn), `direct` a solid one (JSI, where the call goes
 * straight through). Both are crossed in either direction, so both carry a head
 * at each end.
 *
 * A lane is a column of blocks rather than an SVG so a node can hold a `<code>`
 * name at the deck's own type size, and so lanes stay legible when the slide is
 * projected badly.
 */
export interface LaneNode {
  label: string
  /** Second line inside the block. */
  sub?: string
  /** Two hues, to pair the same element across lanes: `a` heading, `b` body. */
  tone?: 'a' | 'b'
  /** Monospace block — a call, a payload, a fragment of a node's props. */
  code?: boolean
  /** Nesting depth inside the lane, for a tree. 0, 1 or 2. */
  depth?: number
  /** The node the slide is about. */
  emphasis?: boolean
}

export interface Lane {
  title: string
  /** Under the title — who runs this lane. */
  note?: string
  nodes: LaneNode[]
  /** Draw a phone body around the nodes: this lane is what the user sees. */
  frame?: 'phone' | 'none'
  /** Join the nodes with tree rules, showing them as one hierarchy. */
  tree?: boolean
  /** Fade the lane back — context, not the subject. */
  dim?: boolean
}

export interface LaneBoundary {
  /** Written on the seam — the message that crosses it. */
  label?: string
  /** `queue` a serialized queue (the bridge), `direct` a straight call (JSI). */
  mode?: 'queue' | 'direct'
  /** Name of the seam itself, above the label: "Bridge", "JSI". */
  name?: string
}

withDefaults(
  defineProps<{
    lanes: Lane[]
    /** Seams between lanes; `boundaries[i]` sits between lane i and i + 1. */
    boundaries?: LaneBoundary[]
    /** Caption under the whole picture. */
    caption?: string
    /** Base font size of node labels, rem. */
    size?: number
    /** Neversink colour scheme. Defaults to the deck's. */
    color?: string
  }>(),
  { boundaries: () => [], caption: '', size: 1, color: 'blue-light' },
)
</script>

<template>
  <div
    :class="[`neversink-${color}-scheme`, 'ns-lanes']"
    :style="{ '--ns-lanes-size': `${size}rem` }"
  >
    <div class="ns-lanes__track">
      <template v-for="(lane, i) in lanes" :key="i">
        <!-- The seam before every lane but the first. -->
        <div
          v-if="i > 0"
          :class="['ns-lanes__seam', `ns-lanes__seam--${boundaries[i - 1]?.mode ?? 'queue'}`]"
        >
          <div v-if="boundaries[i - 1]?.name" class="ns-lanes__seam-name">
            {{ boundaries[i - 1]?.name }}
          </div>
          <div class="ns-lanes__seam-line">
            <span class="ns-lanes__seam-rail" />
          </div>
          <div v-if="boundaries[i - 1]?.label" class="ns-lanes__seam-label">
            {{ boundaries[i - 1]?.label }}
          </div>
        </div>

        <div
          :class="['ns-lanes__lane', { 'ns-lanes__lane--dim': lane.dim }]"
          :style="{ animationDelay: `${i * 0.08}s` }"
        >
          <div class="ns-lanes__title">{{ lane.title }}</div>
          <div class="ns-lanes__note">{{ lane.note || ' ' }}</div>

          <div
            :class="[
              'ns-lanes__body',
              { 'ns-lanes__body--phone': lane.frame === 'phone', 'ns-lanes__body--tree': lane.tree },
            ]"
          >
            <div class="ns-lanes__nodes">
              <div
                v-for="(node, j) in lane.nodes"
                :key="j"
                :class="[
                  'ns-lanes__node',
                  `ns-lanes__node--${node.tone ?? 'plain'}`,
                  {
                    'ns-lanes__node--code': node.code,
                    'ns-lanes__node--on': node.emphasis,
                  },
                ]"
                :style="{
                  marginLeft: `${(node.depth ?? 0) * 1.1}em`,
                  '--ns-lanes-depth': `${(node.depth ?? 0) * 1.1}em`,
                }"
              >
                <span class="ns-lanes__node-label">{{ node.label }}</span>
                <span v-if="node.sub" class="ns-lanes__node-sub">{{ node.sub }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div v-if="caption" class="ns-lanes__caption">{{ caption }}</div>
  </div>
</template>

<style scoped>
.ns-lanes {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.ns-lanes__track {
  display: flex;
  align-items: stretch;
  justify-content: center;
  width: 100%;
  gap: 0.2rem;
}

.ns-lanes__lane {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 0;
  min-width: 0;
  animation: ns-lanes-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.ns-lanes__lane--dim {
  opacity: 0.45;
}

.ns-lanes__title {
  font-size: calc(var(--ns-lanes-size) * 0.95);
  font-weight: 700;
  color: var(--neversink-text-color);
  text-align: center;
  line-height: 1.2;
}

.ns-lanes__note {
  font-size: calc(var(--ns-lanes-size) * 0.66);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-weight: 600;
  opacity: 0.55;
  min-height: 1.4em;
  text-align: center;
}

.ns-lanes__body {
  width: 100%;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  padding: 0.35rem 0.2rem;
}

/* The lane the user actually looks at: a phone body around the nodes. */
.ns-lanes__body--phone {
  border: 3px solid var(--neversink-border-color);
  border-radius: 1.1rem;
  padding: 0.7rem 0.55rem 1.1rem;
  background: var(--neversink-admon-bg-color);
  position: relative;
  align-items: flex-start;
}

.ns-lanes__body--phone::after {
  content: '';
  position: absolute;
  bottom: 0.4rem;
  left: 50%;
  transform: translateX(-50%);
  width: 2.4rem;
  height: 0.22rem;
  border-radius: 999px;
  background: var(--neversink-border-color);
  opacity: 0.6;
}

.ns-lanes__nodes {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;
}

/* A hierarchy: one rule down the left, one stub per node. */
.ns-lanes__body--tree .ns-lanes__nodes {
  position: relative;
  padding-left: 0.75rem;
}

.ns-lanes__body--tree .ns-lanes__nodes::before {
  content: '';
  position: absolute;
  left: 0;
  top: 1.1em;
  bottom: 1.1em;
  border-left: 2px solid var(--neversink-border-color);
  opacity: 0.5;
}

/* The stub back to the trunk. It has to grow with the node's own indent, or an
   indented child ends up with a stub that stops short of the line it hangs from. */
.ns-lanes__body--tree .ns-lanes__node::before {
  content: '';
  position: absolute;
  left: calc(-0.75rem - var(--ns-lanes-depth, 0px));
  top: 50%;
  width: calc(0.75rem + var(--ns-lanes-depth, 0px));
  border-top: 2px solid var(--neversink-border-color);
  opacity: 0.5;
}

.ns-lanes__node {
  position: relative;
  border: 1.5px solid var(--neversink-admon-border-color);
  border-radius: 7px;
  padding: 0.35em 0.5em;
  background: #fff;
  text-align: center;
  font-size: calc(var(--ns-lanes-size) * 0.88);
  line-height: 1.25;
  overflow-wrap: break-word;
  text-wrap: balance;
}

/* Two hues, so the same element can be found again in the next lane. */
.ns-lanes__node--a {
  border-color: var(--neversink-fg-color);
  background: var(--neversink-admon-bg-color);
  font-weight: 700;
}

.ns-lanes__node--b {
  border-color: var(--neversink-border-color);
  border-style: dashed;
}

.ns-lanes__node--code {
  font-family: monospace;
  font-size: calc(var(--ns-lanes-size) * 0.74);
  text-align: left;
  background: var(--neversink-bg-color);
  white-space: pre-wrap;
}

.ns-lanes__node--on {
  border-color: var(--neversink-fg-color);
  border-style: solid;
  box-shadow: 0 0 0 3px var(--neversink-admon-bg-color);
  font-weight: 700;
}

.ns-lanes__node-label {
  display: block;
}

.ns-lanes__node-sub {
  display: block;
  margin-top: 0.1rem;
  font-size: calc(var(--ns-lanes-size) * 0.68);
  font-weight: 400;
  opacity: 0.7;
}

/* The seam. Its mode is the argument of the slide, so it is drawn, not labelled:
   a queue of parcels waiting, or one line straight through. */
.ns-lanes__seam {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  max-width: 9em;
  padding: 0 0.3rem;
}

.ns-lanes__seam-name {
  font-size: calc(var(--ns-lanes-size) * 0.8);
  font-weight: 700;
  color: var(--neversink-text-color);
  margin-bottom: 0.3rem;
}

.ns-lanes__seam-line {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* One horizontal run between the two lanes, with a head at each end: the seam is
   crossed in both directions. */
.ns-lanes__seam-rail {
  display: block;
  position: relative;
  width: 100%;
  min-width: 3rem;
  height: 3px;
}

.ns-lanes__seam-rail::before,
.ns-lanes__seam-rail::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 0.42em;
  height: 0.42em;
  border-top: 2.5px solid var(--neversink-border-color);
  border-right: 2.5px solid var(--neversink-border-color);
}

.ns-lanes__seam-rail::before {
  left: 0;
  transform: translateY(-50%) rotate(-135deg);
}

.ns-lanes__seam-rail::after {
  right: 0;
  transform: translateY(-50%) rotate(45deg);
}

.ns-lanes__seam--direct .ns-lanes__seam-rail::before,
.ns-lanes__seam--direct .ns-lanes__seam-rail::after {
  border-color: var(--neversink-fg-color);
}

.ns-lanes__seam--queue .ns-lanes__seam-rail {
  background: repeating-linear-gradient(
    90deg,
    var(--neversink-border-color) 0 7px,
    transparent 7px 13px
  );
  background-size: 13px 3px;
  animation: ns-lanes-drift 1.1s linear infinite;
}

.ns-lanes__seam--direct .ns-lanes__seam-rail {
  background: var(--neversink-fg-color);
}

.ns-lanes__seam--direct .ns-lanes__seam-label {
  margin-top: 0.35rem;
  font-family: monospace;
  font-size: calc(var(--ns-lanes-size) * 0.66);
  line-height: 1.3;
  text-align: center;
  padding: 0.2em 0.4em;
  border-radius: 5px;
  background: var(--neversink-bg-color);
  opacity: 0.85;
  overflow-wrap: break-word;
}

.ns-lanes__caption {
  margin-top: 0.6rem;
  font-size: calc(var(--ns-lanes-size) * 0.78);
  opacity: 0.75;
  text-align: center;
}

@keyframes ns-lanes-drift {
  to {
    background-position: 13px 0;
  }
}

@keyframes ns-lanes-in {
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
  .ns-lanes__lane {
    animation: none;
  }
  .ns-lanes__seam--queue .ns-lanes__seam-rail {
    animation: none;
  }
}
</style>
