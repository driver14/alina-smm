import React from 'react'

export interface BdbSectionSeamProps {
  type?: 'light-to-dark' | 'dark-to-light'
  className?: string
}

/**
 * BdbSectionSeam is permanently retired per Elite Digital Studio & Awwwards Engineering Standards.
 * All transitions between light and dark sections are handled strictly via GSAP ScrollTrigger
 * dynamic canvas background morphing (scrub: 1) without artificial patches, bands, or seams.
 */
export const BdbSectionSeam: React.FC<BdbSectionSeamProps> = () => {
  return null
}
