/**
 * App logos for `<AppWall>`, looked up by lowercased name.
 *
 * Separate from `icon-registry.ts`, which is the language and tool vocabulary
 * used by `<Chip>` and `<AxisMap>`. These are products a student has on their
 * phone, and the two lists have no reason to grow together.
 *
 * As there, these are `~icons/*` imports: unplugin-icons inlines the SVG from
 * the local `@iconify-json/logos` package at build time, so nothing is fetched
 * at presentation time. A name that is not here renders as a lettered tile,
 * which is why an app with no logo in the set can still appear on the wall.
 */
import IconAirbnb from '~icons/logos/airbnb-icon'
import IconDiscord from '~icons/logos/discord-icon'
import IconFacebook from '~icons/logos/facebook'
import IconGoogleMaps from '~icons/logos/google-maps'
import IconInstagram from '~icons/logos/instagram-icon'
import IconLinkedin from '~icons/logos/linkedin-icon'
import IconMessenger from '~icons/logos/messenger'
import IconNetflix from '~icons/logos/netflix-icon'
import IconReddit from '~icons/logos/reddit-icon'
import IconPinterest from '~icons/logos/pinterest'
import IconShopify from '~icons/logos/shopify'
import IconSkype from '~icons/logos/skype'
import IconSpotify from '~icons/logos/spotify-icon'
import IconTeams from '~icons/logos/microsoft-teams'
import IconTelegram from '~icons/logos/telegram'
import IconTiktok from '~icons/logos/tiktok-icon'
import IconWhatsapp from '~icons/logos/whatsapp-icon'
import IconWix from '~icons/logos/wix'
import IconWordpress from '~icons/logos/wordpress-icon'
import IconX from '~icons/logos/x'
import IconYoutube from '~icons/logos/youtube-icon'
import IconZoom from '~icons/logos/zoom-icon'

export const APP_REGISTRY: Record<string, unknown> = {
  'airbnb': IconAirbnb,
  'discord': IconDiscord,
  'facebook': IconFacebook,
  'google maps': IconGoogleMaps,
  'instagram': IconInstagram,
  'linkedin': IconLinkedin,
  'messenger': IconMessenger,
  'netflix': IconNetflix,
  'pinterest': IconPinterest,
  'reddit': IconReddit,
  'shopify': IconShopify,
  'skype': IconSkype,
  'spotify': IconSpotify,
  'teams': IconTeams,
  'telegram': IconTelegram,
  'tiktok': IconTiktok,
  'whatsapp': IconWhatsapp,
  'wix': IconWix,
  'wordpress': IconWordpress,
  'x': IconX,
  'youtube': IconYoutube,
  'zoom': IconZoom,
}

export function appIconFor(name?: string) {
  return name ? APP_REGISTRY[name.trim().toLowerCase()] : undefined
}
