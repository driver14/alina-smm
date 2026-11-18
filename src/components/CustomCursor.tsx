import React, { useEffect, useRef, useState } from 'react'

/**
 * Contextual cursor label. The system cursor is never hidden; over elements
 * marked data-cursor="explore" (case covers) a small rectangular tag follows
 * the pointer. Fine pointers only, disabled under reduced motion.
 */
export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(false)
  const tagRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    setEnabled(true)

    let x = 0
    let y = 0
    let cx = 0
    let cy = 0
    let frame = 0
    let running = false

    const loop = () => {
      cx += (x - cx) * 0.22
      cy += (y - cy) * 0.22
      if (tagRef.current) tagRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      if (Math.abs(x - cx) > 0.1 || Math.abs(y - cy) > 0.1) {
        frame = requestAnimationFrame(loop)
      } else {
        running = false
      }
    }

    const onMove = (e: MouseEvent) => {
      x = e.clientX + 14
      y = e.clientY + 14
      if (!running) {
        running = true
        frame = requestAnimationFrame(loop)
      }
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null
      const isExplore = !!t?.closest('[data-cursor="explore"]')
      setActive((prev) => (prev === isExplore ? prev : isExplore))
      if (isExplore && !running) {
        cx = e.clientX + 14
        cy = e.clientY + 14
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [])

  if (!enabled) return null

  return (
    <div
      ref={tagRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50"
      style={{ willChange: 'transform' }}
    >
      <span
        className="btn-tag btn-tag--light block transition-[opacity,transform] duration-300"
        style={{
          opacity: active ? 1 : 0,
          transform: active ? 'scale(1)' : 'scale(0.6)',
          transitionTimingFunction: 'var(--ease-out-expo)',
        }}
      >
        Дивитись кейс
      </span>
    </div>
  )
}
