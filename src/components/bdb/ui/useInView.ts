import { useEffect, useRef, useState } from 'react'

/**
 * One-shot viewport detection. Returns a ref and a boolean that flips to true
 * the first time the element enters the viewport (never flips back).
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: { rootMargin?: string; threshold?: number } = {},
) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  const { rootMargin = '0px 0px -12% 0px', threshold = 0 } = options

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin, threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [inView, rootMargin, threshold])

  return { ref, inView }
}
