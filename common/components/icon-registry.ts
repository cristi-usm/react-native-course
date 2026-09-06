/**
 * Logo components for `<AxisMap>` and `<Chip>`, looked up by lowercased name.
 *
 * These are `~icons/*` imports — unplugin-icons inlines the SVG from the local
 * `@iconify-json/logos` package at build time, so nothing is fetched at
 * presentation time. Add a language by importing it here; a name that is not
 * in the map simply gets no logo — `<AxisMap>` falls back to a labelled dot and
 * `<Chip>` to a plain pill. Assembly is deliberately absent: the logos set has
 * no assembly mark, and WebAssembly is a different thing.
 */
import IconAndroid from '~icons/logos/android-icon'
import IconApple from '~icons/logos/apple'
import IconC from '~icons/logos/c'
import IconCPlusPlus from '~icons/logos/c-plusplus'
import IconCSharp from '~icons/logos/c-sharp'
import IconExpo from '~icons/logos/expo-icon'
import IconFlutter from '~icons/logos/flutter'
import IconGo from '~icons/logos/go'
import IconHaskell from '~icons/logos/haskell'
import IconIonic from '~icons/logos/ionic'
import IconJava from '~icons/logos/java'
import IconJavaScript from '~icons/logos/javascript'
import IconKotlin from '~icons/logos/kotlin'
import IconNode from '~icons/logos/nodejs-icon'
import IconPhp from '~icons/logos/php'
import IconPython from '~icons/logos/python'
import IconR from '~icons/logos/r-lang'
import IconReact from '~icons/logos/react'
import IconRust from '~icons/logos/rust'
import IconSwift from '~icons/logos/swift'
import IconTypeScript from '~icons/logos/typescript-icon'
import IconXcode from '~icons/logos/xcode'

export const ICON_REGISTRY: Record<string, unknown> = {
  'android': IconAndroid,
  'apple': IconApple,
  'c': IconC,
  'c++': IconCPlusPlus,
  'c#': IconCSharp,
  'expo': IconExpo,
  'flutter': IconFlutter,
  'go': IconGo,
  'haskell': IconHaskell,
  'ionic': IconIonic,
  'ios': IconApple,
  'java': IconJava,
  'javascript': IconJavaScript,
  'kotlin': IconKotlin,
  'node.js': IconNode,
  'php': IconPhp,
  'python': IconPython,
  'r': IconR,
  'react': IconReact,
  'react native': IconReact,
  'rust': IconRust,
  'swift': IconSwift,
  'typescript': IconTypeScript,
  'xcode': IconXcode,
}

export function iconFor(name?: string) {
  return name ? ICON_REGISTRY[name.trim().toLowerCase()] : undefined
}
