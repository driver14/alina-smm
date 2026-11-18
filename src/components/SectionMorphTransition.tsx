import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

interface SectionMorphTransitionProps {
  topSection: React.ReactNode
  bottomSection: React.ReactNode
  className?: string
}

export const SectionMorphTransition: React.FC<SectionMorphTransitionProps> = ({
  topSection,
  bottomSection,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current || !overlayRef.current) return

    // Set initial clipped state
    gsap.set(overlayRef.current, {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
    })

    // Pin container and scrub the liquid clip-path wipe
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=100%',
        pin: true,
        scrub: 1,
        anticipatePin: 1
      }
    })

    tl.to(overlayRef.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      ease: 'none'
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className={`relative w-full h-screen overflow-hidden ${className}`}>
      {/* Top Pinned Section */}
      <div className="absolute inset-0 w-full h-full z-10">
        {topSection}
      </div>

      {/* Bottom Liquid Wipe Layer Morphing In */}
      <div 
        ref={overlayRef} 
        className="absolute inset-0 w-full h-full z-20 will-change-[clip-path]"
      >
        {bottomSection}
      </div>
    </div>
  )
}
