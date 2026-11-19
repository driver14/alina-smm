import { useEffect, useState } from 'react'

/**
 * One source of truth for "reduce motion":
 *  - the OS setting (prefers-reduced-motion), or
 *  - the manual switch in the footer (persisted in localStorage).
 * The result is mirrored to <html data-motion="reduce"> so CSS can react too.
 */
const KEY = 'alina_motion'
const QUERY = '(prefers-reduced-motion: reduce)'

function readStored(): 'reduce' | 'full' | null {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'reduce' || v === 'full' ? v : null
  } catch {
    return null
  }
}

export function isMotionReduced(): boolean {
  if (typeof window === 'undefined') return false
  const stored = readStored()
  if (stored) return stored === 'reduce'
  return window.matchMedia?.(QUERY).matches ?? false
}

function apply() {
  if (typeof document === 'undefined') return
  if (isMotionReduced()) document.documentElement.dataset.motion = 'reduce'
  else delete document.documentElement.dataset.motion
  window.dispatchEvent(new Event('motionchange'))
}

/** Manual override from the footer switch. */
export function setMotionReduced(reduce: boolean) {
  try {
    localStorage.setItem(KEY, reduce ? 'reduce' : 'full')
  } catch {
    /* storage blocked: still apply for this page view */
    if (reduce) document.documentElement.dataset.motion = 'reduce'
    else delete document.documentElement.dataset.motion
    window.dispatchEvent(new Event('motionchange'))
    return
  }
  apply()
}

// Apply as soon as the module loads (before first paint of the BDB tree)
if (typeof window !== 'undefined') {
  apply()
  window.matchMedia?.(QUERY).addEventListener?.('change', apply)
}

export function useReducedMotionPref(): boolean {
  const [reduced, setReduced] = useState(isMotionReduced)
  useEffect(() => {
    const update = () => setReduced(isMotionReduced())
    window.addEventListener('motionchange', update)
    return () => window.removeEventListener('motionchange', update)
  }, [])
  return reduced
}
