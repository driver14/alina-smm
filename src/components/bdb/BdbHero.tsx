import React, { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight, Send, Globe, ShieldCheck, Users, TrendingUp } from 'lucide-react'
import { triggerHaptic } from '../../utils/haptics'
import { SplitTextReveal } from '../SplitTextReveal'
import { Hero3dObject } from '../3d/Hero3dObject'
import { useSmoothScroll } from '../../providers/SmoothScrollProvider'

interface BdbHeroProps {
  onOpenBooking: () => void
}

const HERO_PHOTOS = [
  { src: '/photos/alina-flowers.jpg', alt: 'Alina Voloshyna — Aesthetics' },
  { src: '/photos/alina-editorial.jpg', alt: 'Alina Voloshyna — Strategist' },
  { src: '/photos/alina-barcelona.jpg', alt: 'Alina Voloshyna — International' },
  { src: '/photos/alina-work-process.jpg', alt: 'Alina Voloshyna — System & Analytics' }
]

export const BdbHero: React.FC<BdbHeroProps> = ({ onOpenBooking }) => {
  const reelRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const { lenis } = useSmoothScroll()
  const scrollY = useMotionValue(0)
  const smoothY = useSpring(scrollY, { stiffness: 220, damping: 28 })

  // Slow, calm, continuous cinematic drift (resets seamlessly)
  useEffect(() => {
    let animId: number
    let lastTime = performance.now()

    const step = (time: number) => {
      const delta = (time - lastTime) / 1000
      lastTime = time

      if (!isPaused) {
        const current = scrollY.get()
        let next = current - delta * 20
        // Reset seamlessly every cycle of 4 photos (approx 1440px)
        if (next <= -1440) {
          next += 1440
        }
        scrollY.set(next)
      }
      animId = requestAnimationFrame(step)
    }

    animId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animId)
  }, [isPaused, scrollY])

  // Wheel interaction: scroll photos smoothly with ZERO movement on the parent page
  useEffect(() => {
    const el = reelRef.current
    if (!el) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()

      const current = scrollY.get()
      let next = current - e.deltaY * 0.75
      if (next > 0) next = -1440 + next
      if (next < -2880) next = next + 1440
      scrollY.set(next)
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [scrollY])

  const handleMouseEnter = () => {
    setIsPaused(true)
    lenis?.stop()
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
    lenis?.start()
  }

  const handleCta = () => {
    triggerHaptic('medium')
    onOpenBooking()
  }

  // Duplicate for seamless infinite loop
  const displayPhotos = [...HERO_PHOTOS, ...HERO_PHOTOS, ...HERO_PHOTOS]

  return (
    <section 
      id="hero" 
      data-theme="light"
      className="relative pt-24 pb-0 md:pt-28 md:pb-0 overflow-hidden bg-transparent text-[#141937] border-b border-[#141937]/10"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Main 2-Column Grid: Left Content tight & Right Reel bounded to left block height */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch py-6 sm:py-10">
          
          {/* Left Column (approx 60% width): Colossal Typography & Action Cluster */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8 text-left">
            
            <div className="space-y-6">
              
              {/* Top Subhead Bar with Interactive 3D WebGL Prism */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#141937]/60">
                  <span className="w-2 h-2 rounded-full bg-[#141937]" />
                  <span>АЛІНА ВОЛОШИНА • SMM & MARKETING</span>
                </div>

                <div className="hidden sm:flex items-center gap-2">
                  <Hero3dObject className="w-12 h-12" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#141937]/40">
                    3D PRISM
                  </span>
                </div>
              </div>

              {/* Colossal Display Headline with Staggered SplitText Assembly (Immediate animation) */}
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-black uppercase tracking-tight leading-[1.0] sm:leading-[0.98] text-[#141937]">
                <SplitTextReveal immediate tag="span">НЕ ПРОСТО ВЕДУ</SplitTextReveal> <br />
                <SplitTextReveal immediate tag="span" delay={0.08}>СОЦІАЛЬНІ МЕРЕЖІ.</SplitTextReveal> <br />
                <SplitTextReveal immediate tag="span" delay={0.16}>БУДУЮ МАРКЕТИНГОВУ</SplitTextReveal> <br />
                <span className="font-editorial normal-case text-[#141937] italic font-normal">
                  Систему®
                </span>{' '}
                <SplitTextReveal immediate tag="span" delay={0.24}>ДЛЯ БІЗНЕСУ.</SplitTextReveal>
              </h1>

              {/* Exact User Text Descriptions */}
              <div className="space-y-3 pt-1 text-[#141937]/80 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
                <p className="font-bold text-[#141937]">
                  SMM-стратегія, контент і таргетована реклама для бізнесів та експертів у США, Європі й Україні.
                </p>
                <p className="text-sm sm:text-base text-[#141937]/75">
                  Об’єдную маркетинг, аналітику та командну роботу, щоб перетворювати соціальні мережі на ефективний інструмент залучення клієнтів.
                </p>
              </div>

              {/* Refined Luxury Button Cluster (Rolex & BDB Aesthetic) */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={handleCta}
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 sm:py-4.5 rounded-full bg-[#141937] hover:bg-[#1E254F] text-[#EEEBDA] text-xs font-extrabold uppercase tracking-[0.16em] transition-all duration-300 shadow-xl shadow-[#141937]/15 hover:scale-[1.02] cursor-pointer rolex-sheen"
                >
                  <span>Отримати стратегічний розбір</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>

                <a
                  href="https://t.me/smmbyvlsh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 sm:py-4.5 rounded-full border border-[#141937]/25 bg-white/60 hover:bg-white text-[#141937] text-xs font-extrabold uppercase tracking-[0.16em] transition-all cursor-pointer shadow-xs hover:scale-[1.02]"
                >
                  <Send className="w-3.5 h-3.5 text-[#141937]" />
                  <span>TELEGRAM</span>
                </a>
              </div>

            </div>

            {/* Bottom Trust Strip */}
            <div className="pt-6 border-t border-[#141937]/10 flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-bold uppercase tracking-wider text-[#141937]/65">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#141937]" />
                <span>3 РИНКИ: США • ЄВРОПА • УКРАЇНА</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#141937]" />
                <span>3+ РОКИ В SMM</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#141937]" />
                <span>1 ВЛАСНА КОМАНДА</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#141937]" />
                <span>ROMI ДО 10.2X</span>
              </div>
            </div>

          </div>

          {/* Right Column (approx 40%): Strictly Bounded to left block height, Straight cut (rounded-none), Minimalist vertical label */}
          <div className="lg:col-span-5 min-h-0 flex flex-col justify-stretch">
            
            <div
              ref={reelRef}
              data-lenis-prevent
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative w-full h-[500px] sm:h-[580px] lg:h-full min-h-[480px] max-h-[640px] rounded-none overflow-hidden border border-[#141937]/20 bg-[#141937] shadow-2xl select-none cursor-ns-resize group"
            >
              {/* Minimalist Vertical Editorial Label along the block (BDB style) */}
              <div className="absolute top-6 right-3.5 z-20 pointer-events-none select-none flex flex-col items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                <span className="text-[9px] font-sans font-bold uppercase tracking-[0.28em] text-white/75 [writing-mode:vertical-rl]">
                  ALINA VOLOSHYNA • REEL 2026
                </span>
              </div>

              {/* Continuous Drifting Track controlled by smooth spring */}
              <motion.div
                style={{ y: smoothY }}
                className="w-full flex flex-col"
              >
                {displayPhotos.map((photo, pIdx) => (
                  <div 
                    key={pIdx}
                    className="relative w-full h-[360px] sm:h-[390px] shrink-0 overflow-hidden border-b border-white/10"
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      loading={pIdx < 2 ? 'eager' : 'lazy'}
                    />
                  </div>
                ))}
              </motion.div>

              {/* Minimal Top & Bottom Clean Edge Shadow */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#141937]/40 to-transparent pointer-events-none z-10" />
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#141937]/50 to-transparent pointer-events-none z-10" />
            </div>

          </div>

        </div>

      </div>

      {/* Running Marquee Ticker (ZERO STARS, PURE CLEAN TYPOGRAPHY) */}
      <div className="border-t border-[#141937]/15 bg-[#E2DEC9]/50 py-3.5 overflow-hidden">
        <div className="animate-bdb-marquee flex gap-8 whitespace-nowrap text-xs font-bold uppercase tracking-[0.16em] text-[#141937]">
          <span>SMM-СТРАТЕГІЯ</span>
          <span className="opacity-40">/</span>
          <span>ТАРГЕТОВАНА РЕКЛАМА</span>
          <span className="opacity-40">/</span>
          <span>3+ РОКИ ДОСВІДУ</span>
          <span className="opacity-40">/</span>
          <span>США • ЄВРОПА • УКРАЇНА</span>
          <span className="opacity-40">/</span>
          <span>МАРКЕТИНГОВА СИСТЕМА</span>
          <span className="opacity-40">/</span>
          <span>ВЛАСНА КОМАНДА СПЕЦІАЛІСТІВ</span>
          <span className="opacity-40">/</span>
          <span>ДОВГОСТРОКОВЕ ПАРТНЕРСТВО</span>
          <span className="opacity-40">/</span>
          <span>РЕЗУЛЬТАТ ЗАМІСТЬ ПРИПУЩЕНЬ</span>
          <span className="opacity-40">/</span>
          <span>SMM-СТРАТЕГІЯ</span>
          <span className="opacity-40">/</span>
          <span>ТАРГЕТОВАНА РЕКЛАМА</span>
          <span className="opacity-40">/</span>
          <span>3+ РОКИ ДОСВІДУ</span>
          <span className="opacity-40">/</span>
          <span>США • ЄВРОПА • УКРАЇНА</span>
          <span className="opacity-40">/</span>
          <span>МАРКЕТИНГОВА СИСТЕМА</span>
          <span className="opacity-40">/</span>
          <span>ВЛАСНА КОМАНДА СПЕЦІАЛІСТІВ</span>
          <span className="opacity-40">/</span>
          <span>ДОВГОСТРОКОВЕ ПАРТНЕРСТВО</span>
          <span className="opacity-40">/</span>
          <span>РЕЗУЛЬТАТ ЗАМІСТЬ ПРИПУЩЕНЬ</span>
        </div>
      </div>
    </section>
  )
}
