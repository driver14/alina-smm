import type React from 'react'
import { useEffect, useRef } from 'react'
import { isMotionReduced } from './motion'

/**
 * Restrained 3D tilt that follows a fine pointer (max `max` degrees).
 * Returns handlers + ref for the element that should tilt.
 */
export function useTilt<T extends HTMLElement>(max = 7) {
  const ref = useRef<T>(null)
  const state = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: 0 })

  useEffect(() => {
    const s = state.current
    return () => cancelAnimationFrame(s.raf)
  }, [])

  const loop = () => {
    const s = state.current
    s.x += (s.tx - s.x) * 0.14
    s.y += (s.ty - s.y) * 0.14
    if (ref.current) ref.current.style.transform = `perspective(1200px) rotateX(${s.y.toFixed(2)}deg) rotateY(${s.x.toFixed(2)}deg)`
    if (Math.abs(s.tx - s.x) > 0.01 || Math.abs(s.ty - s.y) > 0.01) s.raf = requestAnimationFrame(loop)
    else s.raf = 0
  }

  const kick = () => {
    if (!state.current.raf) state.current.raf = requestAnimationFrame(loop)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || isMotionReduced() || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    state.current.tx = ((e.clientX - r.left) / r.width - 0.5) * 2 * max
    state.current.ty = -((e.clientY - r.top) / r.height - 0.5) * 2 * max
    kick()
  }

  const onPointerLeave = () => {
    state.current.tx = 0
    state.current.ty = 0
    kick()
  }

  return { ref, onPointerMove, onPointerLeave }
}
