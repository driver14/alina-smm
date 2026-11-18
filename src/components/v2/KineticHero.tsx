import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react'
import { triggerHaptic } from '../../utils/haptics'

interface KineticHeroProps {
  onOpenBooking: () => void
}

export const KineticHero: React.FC<KineticHeroProps> = ({ onOpenBooking }) => {
  const heroCardRef = useRef<HTMLDivElement>(null)

  // 3D Tilt Card physics
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 25 })
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 25 })

  const rotateX = useTransform(smoothY, [-0.5, 0.5], ['7deg', '-7deg'])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ['-7deg', '7deg'])

  // Magnetic Button Physics
  const btnRef = useRef<HTMLButtonElement>(null)
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 })

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroCardRef.current) return
    const rect = heroCardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleCardMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const handleBtnMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * 0.25
    const dy = (e.clientY - cy) * 0.25
    setBtnOffset({ x: dx, y: dy })
  }

  const handleBtnMouseLeave = () => {
    setBtnOffset({ x: 0, y: 0 })
  }

  const handleCtaClick = () => {
    triggerHaptic('medium')
    onOpenBooking()
  }

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Editorial Watermark Background */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-black tracking-tighter text-[#141937]/[0.025] select-none pointer-events-none whitespace-nowrap z-0"
      >
        VOLOSHYNA SMM
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Kinetic Editorial Copy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Live Availability Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#141937]/10 shadow-xs mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold tracking-wide uppercase text-[#141937]">
                Зараз відкрито 2 місця на стратегію
              </span>
            </motion.div>

            {/* Main Kinetic Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#141937] tracking-tight leading-[1.08] text-balance mb-6"
            >
              Перетворюємо <br className="hidden sm:inline" />
              Instagram на{' '}
              <span className="relative inline-block px-2 py-0.5 rounded-md bg-[#F3C3CF] text-[#141937] shadow-xs">
                систему продажів
              </span>{' '}
              з чеком від $500+
            </motion.h1>

            {/* Body Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="text-lg sm:text-xl text-[#141937]/80 leading-relaxed text-pretty max-w-xl mb-8 font-medium"
            >
              Не просто «красиві фото», а чітка архітектура вашого бренду: від сенсових Reels та воронки у Direct до окупності трафіку в 10X.
            </motion.p>

            {/* Action Bar with Magnetic Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-wrap items-center gap-4 sm:gap-6 mb-10 w-full sm:w-auto"
            >
              <motion.button
                ref={btnRef}
                type="button"
                onClick={handleCtaClick}
                onMouseMove={handleBtnMouseMove}
                onMouseLeave={handleBtnMouseLeave}
                animate={{ x: btnOffset.x, y: btnOffset.y }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className="relative group w-full sm:w-auto px-8 py-4 rounded-full bg-[#141937] text-white font-bold text-base shadow-xl shadow-[#141937]/25 hover:shadow-2xl hover:shadow-[#141937]/40 transition-shadow duration-300 flex items-center justify-center gap-2 overflow-hidden"
              >
                {/* Shimmer Sheen effect */}
                <div 
                  aria-hidden="true" 
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                />
                <span>Забронювати стратегічну сесію</span>
                <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.button>

              <a
                href="#cases"
                className="px-6 py-4 rounded-full border border-[#141937]/20 hover:border-[#141937] text-[#141937] font-semibold text-sm transition-all duration-200 flex items-center gap-2 bg-white/40 backdrop-blur-xs w-full sm:w-auto justify-center"
              >
                <span>Дивитись кейси в цифрах</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#141937]/10 font-mono font-bold">ROMI 10x</span>
              </a>
            </motion.div>

            {/* Quick Metrics Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-[#141937]/10 w-full max-w-lg"
            >
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#141937] tabular-nums">×10</div>
                <div className="text-xs text-[#141937]/70 font-medium">Окупність реклами</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#141937] tabular-nums">5–7</div>
                <div className="text-xs text-[#141937]/70 font-medium">Днів до перших лідів</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#141937] tabular-nums">100%</div>
                <div className="text-xs text-[#141937]/70 font-medium">Прозорі звітні дані</div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: 3D Interactive Portrait Card */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              ref={heroCardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{
                perspective: 1000,
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d'
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl p-3 bg-gradient-to-b from-white/90 to-white/40 backdrop-blur-xl border border-white/60 shadow-2xl shadow-[#141937]/15 cursor-pointer group"
            >
              {/* Photo Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#141937]">
                <img
                  src="/photos/alina-hero.jpg"
                  alt="Аліна Волошина — SMM-стратег"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Soft Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141937]/80 via-transparent to-black/20" />

                {/* Bottom Floating Identity */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 text-left shadow-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-black text-[#141937] tracking-tight">Аліна Волошина</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                      <Sparkles className="w-3 h-3" />
                      SMM Strategist
                    </span>
                  </div>
                  <p className="text-xs text-[#141937]/75 font-medium">
                    Створюю прогнозований потік заявок для бізнесу та експертів
                  </p>
                </div>
              </div>

              {/* Floating Live Metric Pill (Overhanging the photo) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 p-3 rounded-2xl bg-[#141937] text-white shadow-xl border border-white/20 flex items-center gap-3 backdrop-blur-md"
              >
                <div className="w-9 h-9 rounded-xl bg-[#F3C3CF] flex items-center justify-center text-[#141937]">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="text-left pr-1">
                  <div className="text-xs text-white/70 font-medium">Середній чек клієнтів</div>
                  <div className="text-sm font-black text-white tabular-nums">$500 – $2,000+</div>
                </div>
              </motion.div>

              {/* Floating Guarantee Badge */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-4 -left-4 p-3 rounded-2xl bg-white text-[#141937] shadow-xl border border-black/5 flex items-center gap-2.5 backdrop-blur-md"
              >
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-bold text-[#141937]">Гарантія системи та прозорості</span>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
