import React from 'react'
import { motion, type Variants } from 'framer-motion'

interface SplitTextRevealProps {
  children: string
  className?: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  delay?: number
  immediate?: boolean
}

export const SplitTextReveal: React.FC<SplitTextRevealProps> = ({
  children,
  className = '',
  tag: Tag = 'h2',
  delay = 0,
  immediate = false
}) => {
  // Split into words
  const words = children.split(' ')

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay
      }
    }
  }

  const childVariants: Variants = {
    hidden: {
      y: '105%',
      opacity: 0,
      rotateX: 25
    },
    visible: {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  }

  return (
    <Tag className={`inline-flex flex-wrap gap-x-[0.28em] py-1 ${className}`}>
      <motion.span
        variants={containerVariants}
        initial={immediate ? false : 'hidden'}
        animate={immediate ? 'visible' : undefined}
        whileInView={immediate ? undefined : 'visible'}
        viewport={immediate ? undefined : { once: true, amount: 0.05 }}
        className="inline-flex flex-wrap gap-x-[0.28em]"
      >
        {words.map((word, idx) => (
          <span key={idx} className="overflow-hidden inline-block pt-1 pb-3.5 px-1.5 -mx-1.5 -mb-2.5">
            <motion.span
              variants={childVariants}
              className="inline-block will-change-transform"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
