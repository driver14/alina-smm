import React, { useEffect, useRef, useState } from 'react'
import { useReducedMotionPref } from './motion'

interface LazyVideoProps extends Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'src' | 'poster'> {
  src: string
  poster: string
  /** Play only while true (e.g. the active slide). Defaults to true. */
  active?: boolean
}

/**
 * Muted, looping, inline clip that never downloads until it is near the
 * viewport, plays only while visible + active, and stays on its poster
 * when motion is reduced.
 */
export const LazyVideo: React.FC<LazyVideoProps> = ({ src, poster, active = true, className, ...rest }) => {
  const ref = useRef<HTMLVideoElement>(null)
  const reduced = useReducedMotionPref()
  const [near, setNear] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setNear(true)
      setVisible(true)
      return
    }
    const nearIo = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: '600px 0px' })
    const visIo = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.15 })
    nearIo.observe(el)
    visIo.observe(el)
    return () => {
      nearIo.disconnect()
      visIo.disconnect()
    }
  }, [])

  const shouldPlay = near && visible && active && !reduced

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (shouldPlay) el.play().catch(() => {})
    else el.pause()
  }, [shouldPlay])

  return (
    <video
      ref={ref}
      src={near && !reduced ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
      className={className}
      {...rest}
    />
  )
}
