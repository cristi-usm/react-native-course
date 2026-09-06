/**
 * Platform marks for `<Discontinued>`, looked up by lowercased name.
 *
 * A third list beside `icon-registry.ts` (languages and tools, for `<Chip>`)
 * and `app-registry.ts` (products on a phone, for `<AppWall>`). These are
 * operating systems, and they are here mostly to be crossed out.
 *
 * Deliberately **monochrome** `mdi` marks rather than the full-colour `logos`
 * set used everywhere else. A `<Discontinued>` card is dashed, dimmed and
 * struck through because its claim is "this is gone"; a saturated brand logo
 * fights that and reads as a live option being promoted. A flat silhouette at
 * reduced opacity reinforces it, and it sits comfortably next to the monogram
 * that stands in for a platform with no mark at all.
 *
 * Symbian, webOS and Tizen have no mark in any icon set installed here, so
 * they fall back to a lettered plate, the same way `<AppWall>` handles an app
 * missing from its registry. Nothing is fetched at presentation time.
 */
import IconBlackberry from '~icons/mdi/blackberry'
import IconFirefox from '~icons/mdi/firefox'
import IconUbuntu from '~icons/mdi/ubuntu'
import IconWindows from '~icons/mdi/microsoft-windows'

export const PLATFORM_REGISTRY: Record<string, unknown> = {
  'blackberry': IconBlackberry,
  'blackberry os': IconBlackberry,
  'firefox': IconFirefox,
  'firefox os': IconFirefox,
  'ubuntu': IconUbuntu,
  'ubuntu touch': IconUbuntu,
  'windows': IconWindows,
  'windows phone': IconWindows,
}

/** The mark for a platform name, or `undefined` when the set has none. */
export function platformIconFor(name: string) {
  return PLATFORM_REGISTRY[name.trim().toLowerCase()]
}
