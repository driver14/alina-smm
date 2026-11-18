import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LIGHT_BG = '#EEEBDA'
const DARK_BG = '#0B1021'

export const DynamicBackgroundController: React.FC = () => {
  useEffect(() => {
    const bgCanvas = document.getElementById('site-bg-canvas') || document.body

    const ctx = gsap.context(() => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>('section[data-theme], footer[data-theme]'))
      if (!sections.length) return

      // Initial state
      bgCanvas.style.backgroundColor = LIGHT_BG
      let activeTheme = 'light'

      sections.forEach((sec, idx) => {
        const theme = sec.getAttribute('data-theme') || 'light'
        const targetBg = theme === 'dark' ? DARK_BG : LIGHT_BG

        const prevSec = idx > 0 ? sections[idx - 1] : null
        const prevTheme = prevSec ? (prevSec.getAttribute('data-theme') || 'light') : 'light'
        const fromBg = prevTheme === 'dark' ? DARK_BG : LIGHT_BG

        if (fromBg !== targetBg) {
          const bgInterp = gsap.utils.interpolate(fromBg, targetBg)

          ScrollTrigger.create({
            trigger: sec,
            start: 'top 85%',
            end: 'top 25%',
            scrub: 0.6, // Ultra-responsive, smooth damping
            onUpdate: (self) => {
              bgCanvas.style.backgroundColor = bgInterp(self.progress)

              const newTheme = self.progress > 0.45 ? theme : prevTheme
              if (newTheme !== activeTheme) {
                activeTheme = newTheme
                if (newTheme === 'dark') {
                  document.documentElement.classList.add('theme-dark-active')
                } else {
                  document.documentElement.classList.remove('theme-dark-active')
                }
              }
            },
            onLeave: () => {
              bgCanvas.style.backgroundColor = targetBg
            },
            onLeaveBack: () => {
              bgCanvas.style.backgroundColor = fromBg
            },
            onRefresh: (self) => {
              if (self.progress >= 1) {
                bgCanvas.style.backgroundColor = targetBg
              }
            }
          })
        } else {
          ScrollTrigger.create({
            trigger: sec,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter: () => {
              bgCanvas.style.backgroundColor = targetBg
              if (theme !== activeTheme) {
                activeTheme = theme
                if (theme === 'dark') {
                  document.documentElement.classList.add('theme-dark-active')
                } else {
                  document.documentElement.classList.remove('theme-dark-active')
                }
              }
            },
            onEnterBack: () => {
              bgCanvas.style.backgroundColor = targetBg
              if (theme !== activeTheme) {
                activeTheme = theme
                if (theme === 'dark') {
                  document.documentElement.classList.add('theme-dark-active')
                } else {
                  document.documentElement.classList.remove('theme-dark-active')
                }
              }
            }
          })
        }
      })

      ScrollTrigger.refresh()
    })

    return () => ctx.revert()
  }, [])

  return null
}
