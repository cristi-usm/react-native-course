/**
 * Syntax highlighting for the course.
 *
 * ⚠️ `langs` REPLACES Slidev's auto-detected list rather than extending it — the
 * same trap as `components.dirs` (CLAUDE.md §7). Every language used in any deck
 * must therefore be listed here by hand, or its blocks silently render as plain
 * text. Check with:
 *
 *   grep -rhoE '^```[a-z]+' slides/ * /slides.md | sort -u
 *
 * `tsx` is the workhorse: React Native components are TypeScript + JSX, and
 * fencing them as `ts` loses the JSX highlighting entirely. The native
 * languages (`swift`, `kotlin`, `objc`, `java`) appear only where a lesson
 * shows what sits underneath the JS — config plugins, native modules.
 *
 * Each deck's `setup/shiki.ts` re-exports this file.
 */
import { defineShikiSetup } from '@slidev/types'

export default defineShikiSetup(() => ({
  langs: [
    'tsx', 'jsx', 'ts', 'js', 'json', 'jsonc',
    'bash', 'sh', 'text', 'diff', 'yaml', 'xml', 'html', 'css',
    'swift', 'kotlin', 'java', 'objc', 'gradle', 'ruby', 'sql',
  ],
}))
