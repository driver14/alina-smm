import React, { useRef, useState, useCallback } from 'react'

export interface MagneticProps {
  children: React.ReactNode
  className?: string
  strength?: number
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  as?: 'div' | 'span' | 'button' | 'a'
  href?: string
  target?: string
  rel?: string
  type?: 'button' | 'submit' | 'reset'
  title?: string
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  className = '',
  strength = 0.28,
  onClick,
  as = 'div',
  href,
  target,
  rel,
  type = 'button',
  title,
}) => {
  const ref = useRef<HTMLElement | null>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength
      setOffset({ x: deltaX, y: deltaY })
    },
    [strength]
  )

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 })
  }, [])

  const style: React.CSSProperties = {
    transform: `translate3d(${offset.x.toFixed(1)}px, ${offset.y.toFixed(1)}px, 0)`,
    transition:
      offset.x === 0 && offset.y === 0
        ? 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)'
        : 'transform 0.08s ease-out',
  }

  if (as === 'a') {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`inline-flex will-change-transform ${className}`}
        style={style}
        title={title}
      >
        {children}
      </a>
    )
  }

  if (as === 'button') {
    return (
      <button
        ref={ref as React.RefObject<HTMLButtonElement>}
        type={type}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`inline-flex will-change-transform ${className}`}
        style={style}
        title={title}
      >
        {children}
      </button>
    )
  }

  if (as === 'span') {
    return (
      <span
        ref={ref as React.RefObject<HTMLSpanElement>}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`inline-block will-change-transform ${className}`}
        style={style}
        title={title}
      >
        {children}
      </span>
    )
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block will-change-transform ${className}`}
      style={style}
      title={title}
    >
      {children}
    </div>
  )
}
