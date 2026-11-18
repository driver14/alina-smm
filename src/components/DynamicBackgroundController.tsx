import React, { useEffect } from 'react'

/**
 * Navigation theme sync.
 *
 * Every section paints its own solid surface, so contrast is guaranteed at any
 * scroll position. This controller only reports which surface sits directly
 * under the fixed header, by observing a 1px band near the top of the viewport,
 * and writes it to <html data-nav-theme="light|dark|accent">.
 */
const NAV_PROBE_Y = 30

export const DynamicBackgroundController: React.FC = () => {
  useEffect(() => {
    const root = document.documentElement
    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[data-theme], footer[data-theme]'))
    if (!sections.length) return

    const apply = (theme: string | null) => {
      root.dataset.navTheme = theme ?? 'light'
    }
    apply(sections[0].getAttribute('data-theme'))

    let observer: IntersectionObserver | null = null
    const build = () => {
      observer?.disconnect()
      const bottom = Math.max(0, window.innerHeight - NAV_PROBE_Y - 1)
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) apply(entry.target.getAttribute('data-theme'))
          }
        },
        { rootMargin: `-${NAV_PROBE_Y}px 0px -${bottom}px 0px`, threshold: 0 },
      )
      sections.forEach((s) => observer!.observe(s))
    }

    build()
    let resizeTimer = 0
    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(build, 150)
    }
    window.addEventListener('resize', onResize)

    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', onResize)
      window.clearTimeout(resizeTimer)
      delete root.dataset.navTheme
    }
  }, [])

  return null
}
