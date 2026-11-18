import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export const CustomCursor: React.FC = () => {
  const [cursorState, setCursorState] = useState<'default' | 'pointer' | 'drag' | 'explore'>('default')
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Spring physics for trailing luxury ring
  const springX = useSpring(mouseX, { stiffness: 450, damping: 32 })
  const springY = useSpring(mouseY, { stiffness: 450, damping: 32 })

  useEffect(() => {
    // Only enable on non-touch devices with fine pointers and no reduced-motion preference
    if (
      typeof window === 'undefined' || 
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    // Inspect hovered elements to morph cursor
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      if (target.closest('[data-cursor="drag"]') || target.closest('[data-lenis-prevent]')) {
        setCursorState('drag')
      } else if (target.closest('[data-cursor="explore"]')) {
        setCursorState('explore')
      } else if (target.closest('button') || target.closest('a') || target.closest('.cursor-pointer')) {
        setCursorState('pointer')
      } else {
        setCursorState('default')
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [mouseX, mouseY, isVisible])

  if (!isVisible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* 1. Precise Center Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: cursorState === 'pointer' ? 0 : cursorState === 'drag' ? 0 : 1,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ duration: 0.15 }}
        className="fixed w-2 h-2 rounded-full bg-[#141937] dark:bg-white shadow-xs"
      />

      {/* 2. Trailing Smooth Luxury Morphing Ring / Capsule */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          width: cursorState === 'drag' ? 76 : cursorState === 'explore' ? 84 : cursorState === 'pointer' ? 44 : 26,
          height: cursorState === 'drag' ? 32 : cursorState === 'explore' ? 32 : cursorState === 'pointer' ? 44 : 26,
          borderRadius: cursorState === 'drag' || cursorState === 'explore' ? 16 : 9999,
          backgroundColor: cursorState === 'drag' || cursorState === 'explore' 
            ? 'rgba(20, 25, 55, 0.85)' 
            : cursorState === 'pointer' 
            ? 'rgba(243, 195, 207, 0.35)' 
            : 'rgba(20, 25, 55, 0.08)',
          borderWidth: cursorState === 'drag' || cursorState === 'explore' ? 0 : 1,
          borderColor: cursorState === 'pointer' ? 'rgba(243, 195, 207, 0.8)' : 'rgba(20, 25, 55, 0.25)',
          scale: isVisible ? 1 : 0
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className="fixed backdrop-blur-xs flex items-center justify-center shadow-lg"
      >
        {cursorState === 'drag' && (
          <span className="text-[10px] font-black uppercase tracking-widest text-[#EEEBDA]">
            DRAG
          </span>
        )}
        {cursorState === 'explore' && (
          <span className="text-[10px] font-black uppercase tracking-widest text-[#EEEBDA]">
            VIEW
          </span>
        )}
      </motion.div>
    </div>
  )
}
