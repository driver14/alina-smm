import React, { useEffect, useRef } from 'react'
import { useReducedMotionPref } from './motion'

/**
 * Rolex-style media: settles from 1.14x to 1x while entering the viewport and
 * dims slightly while leaving. Transform/opacity only, rAF while visible.
 */
export const ScrollZoom: React.FC<{ children: React.ReactNode; className?: string; dim?: boolean }> = ({
  children,
  className = '',
  dim = true,
}) => {
  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const shade = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotionPref()

  useEffect(() => {
    const el = outer.current
    const img = inner.current
    if (!el || !img) return
    if (reduced) {
      img.style.transform = ''
      if (shade.current) shade.current.style.opacity = '0'
      return
    }
    let raf = 0
    let running = false
    const tick = () => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const t = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height))) // 0 entering → 1 gone
      const enter = Math.min(1, t / 0.5)
      const ease = 1 - Math.pow(1 - enter, 3)
      img.style.transform = `scale(${1.14 - 0.14 * ease})`
      if (shade.current) shade.current.style.opacity = String(Math.max(0, (t - 0.55) / 0.45) * 0.35)
      raf = running ? requestAnimationFrame(tick) : 0
    }
    const io = new IntersectionObserver(([e]) => {
      running = e.isIntersecting
      if (running && !raf) raf = requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [reduced])

  return (
    <div ref={outer} className={`overflow-hidden ${/\b(absolute|fixed|sticky)\b/.test(className) ? '' : 'relative'} ${className}`}>
      <div ref={inner} className="absolute inset-0 will-change-transform" style={{ transform: reduced ? undefined : 'scale(1.14)' }}>
        {children}
      </div>
      {dim && <div ref={shade} aria-hidden="true" className="absolute inset-0 bg-ink pointer-events-none" style={{ opacity: 0 }} />}
    </div>
  )
}

