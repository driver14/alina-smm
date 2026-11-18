import React, { useEffect, useState, createContext, useContext } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SmoothScrollContextType {
  lenis: Lenis | null
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({ lenis: null })

export const useSmoothScroll = () => useContext(SmoothScrollContext)

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null)

  useEffect(() => {
    // Respect user's motion preference (WCAG / Master Prompt compliance)
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    // 1. Initialize Lenis with luxury inertial momentum physics (Awwwards / BDB style)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      prevent: (node) => {
        return (
          node.nodeType === 1 &&
          Boolean(
            (node as HTMLElement).hasAttribute('data-lenis-prevent') ||
            (node as HTMLElement).closest('[data-lenis-prevent]')
          )
        )
      }
    })

    setLenisInstance(lenis)

    // 2. Synchronize Lenis scroll updates with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // 3. Drive Lenis updates directly via GSAP ticker for 60-120fps hardware sync
    const updateGsapTicker = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateGsapTicker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(updateGsapTicker)
      lenis.destroy()
    }
  }, [])

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisInstance }}>
      {children}
    </SmoothScrollContext.Provider>
  )
}
