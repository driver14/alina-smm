import React from 'react'

export type SectionTheme = 'ink' | 'paper' | 'pink' | 'cream'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id: string
  theme: SectionTheme
  labelledBy?: string
  ref?: React.Ref<HTMLElement>
  children: React.ReactNode
}

const SURFACE: Record<SectionTheme, string> = {
  ink: 'surface-ink',
  paper: 'surface-paper',
  pink: 'surface-pink',
  cream: 'surface-cream',
}

// data-theme drives the navbar colour (see DynamicBackgroundController)
const NAV_THEME: Record<SectionTheme, 'dark' | 'light' | 'accent'> = {
  ink: 'dark',
  paper: 'light',
  pink: 'accent',
  cream: 'light',
}

export const Section: React.FC<SectionProps> = ({ id, theme, labelledBy, className = "", children, ref, ...rest }) => (
  <section
    ref={ref}
    id={id}
    data-theme={NAV_THEME[theme]}
    aria-labelledby={labelledBy}
    className={`relative ${SURFACE[theme]} ${className}`}
    {...rest}
  >
    {children}
  </section>
)

/** Small section index label, e.g. "02 — Досвід". Quiet, UI-sized. */
export const Kicker: React.FC<{ index?: string; children: React.ReactNode; className?: string }> = ({
  index,
  children,
  className = '',
}) => (
  <p className={`t-ui flex items-center gap-3 opacity-70 ${className}`}>
    {index && <span>{index}</span>}
    {index && <span aria-hidden="true" className="inline-block w-6 h-px bg-current" />}
    <span>{children}</span>
  </p>
)
