import React from 'react'
import { useInView } from './useInView'

type RevealTag = 'div' | 'section' | 'header' | 'figure' | 'ul' | 'ol' | 'li' | 'article' | 'footer' | 'p'

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: RevealTag
  children: React.ReactNode
}

/**
 * Adds `.is-in` once the block enters the viewport. Children opt into motion with
 * the CSS primitives `.reveal-line`, `.fade-up`, `.clip-up` (see index.css).
 * Reduced motion is handled in CSS, so content is never hidden for those users.
 */
export const Reveal: React.FC<RevealProps> = ({ as = 'div', className = '', children, ...rest }) => {
  const { ref, inView } = useInView<HTMLElement>()
  const Tag = as as React.ElementType
  return (
    <Tag ref={ref} className={`${className} ${inView ? 'is-in' : ''}`.trim()} {...rest}>
      {children}
    </Tag>
  )
}

interface LinesProps {
  lines: React.ReactNode[]
  /** Offset the stagger index (e.g. when continuing lines from another block). */
  start?: number
}

/** Line-by-line mask reveal. Each entry renders as its own masked line. */
export const Lines: React.FC<LinesProps> = ({ lines, start = 0 }) => (
  <>
    {lines.map((line, i) => (
      <span key={i} className="reveal-line">
        <span style={{ ['--i' as string]: i + start } as React.CSSProperties}>{line}</span>
      </span>
    ))}
  </>
)
