import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BrandLogo } from '../BrandLogo'

interface BdbPreloaderProps {
  onComplete?: () => void
}

export const BdbPreloader: React.FC<BdbPreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [isAssembling, setIsAssembling] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    const start = Date.now()
    const duration = 750 // 0.75s snappy luxury load on page entry/refresh

    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const current = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(current)

      if (current >= 100) {
        clearInterval(interval)
        setIsAssembling(true)

        setTimeout(() => {
          setIsFinished(true)
          if (onComplete) onComplete()
        }, 450)
      }
    }, 20)

    return () => clearInterval(interval)
  }, [onComplete])

  if (isFinished) return null

  return (
    <AnimatePresence>
      {!isFinished && (
        <div className="fixed inset-0 z-50 pointer-events-none select-none overflow-hidden">
          
          {/* Top Architectural Shutter Curtain */}
          <motion.div
            initial={{ y: '0%' }}
            animate={isAssembling ? { y: '-100%' } : { y: '0%' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#0B1021] border-b border-white/10"
          />

          {/* Bottom Architectural Shutter Curtain */}
          <motion.div
            initial={{ y: '0%' }}
            animate={isAssembling ? { y: '100%' } : { y: '0%' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#0B1021] border-t border-white/10"
          />

          {/* Center Stage Assembly Content */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={isAssembling ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="absolute inset-0 flex flex-col items-center justify-center text-[#EEEBDA] z-10 px-6"
          >
            <div className="relative p-4 mb-6">
              <BrandLogo size="lg" theme="glass" showSparkle={false} showShimmer={true} />
            </div>

            <div className="text-center space-y-2">
              <div className="font-display text-2xl sm:text-3xl font-black uppercase tracking-[0.22em] text-white">
                АЛІНА ВОЛОШИНА
              </div>
              <div className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#F3C3CF]">
                SMM & MARKETING • DIGITAL SYSTEM
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-3 w-48">
              <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#F3C3CF] to-white"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="font-display text-2xl font-black text-white flex items-baseline">
                {String(progress).padStart(2, '0')}
                <span className="text-xs font-semibold text-[#F3C3CF] ml-1">%</span>
              </div>
            </div>

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  )
}
