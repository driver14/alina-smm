import React, { useRef, useState, useCallback } from 'react'

export interface TiltCardProps {
  children: React.ReactNode
  className?: string
  maxTilt?: number
  perspective?: number
  scale?: number
  glare?: boolean
  glareOpacity?: number
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 7,
  perspective = 1100,
  scale = 1.018,
  glare = true,
  glareOpacity = 0.12,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<React.CSSProperties>({})
  const [glareStyle, setGlareStyle] = useState<{ opacity: number; x: number; y: number }>({
    opacity: 0,
    x: 50,
    y: 50,
  })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // Normalized coordinates from -1 to 1
      const normX = (x - centerX) / centerX
      const normY = (y - centerY) / centerY

      const rotateX = -normY * maxTilt
      const rotateY = normX * maxTilt

      setStyle({
        transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
        transition: 'transform 0.08s ease-out',
      })

      if (glare) {
        setGlareStyle({
          opacity: glareOpacity,
          x: Math.round((x / rect.width) * 100),
          y: Math.round((y / rect.height) * 100),
        })
      }
    },
    [maxTilt, perspective, scale, glare, glareOpacity]
  )

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
    })
    if (glare) {
      setGlareStyle((prev) => ({ ...prev, opacity: 0 }))
    }
  }, [perspective, glare])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative will-change-transform ${className}`}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}

      {glare && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 overflow-hidden z-30"
          style={{
            opacity: glareStyle.opacity,
            background: `radial-gradient(circle 350px at ${glareStyle.x}% ${glareStyle.y}%, rgba(255, 255, 255, 0.4) 0%, transparent 80%)`,
          }}
        />
      )}
    </div>
  )
}
