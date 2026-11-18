import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, TrendingUp, AlertCircle, CheckCircle2, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import { triggerHaptic } from '../../utils/haptics'
import { CASES_DATA } from '../../data/content'

interface BdbWorksProps {
  onOpenBooking: (service?: string, note?: string) => void
}

export const BdbWorks: React.FC<BdbWorksProps> = ({ onOpenBooking }) => {
  const [activeCaseIdx, setActiveCaseIdx] = useState(0)
  const [slideIndices, setSlideIndices] = useState<number[]>([0, 0, 0])
  const [comparisonModes, setComparisonModes] = useState<('before' | 'after')[]>(['after', 'after', 'after'])
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null)

  const currentCase = CASES_DATA[activeCaseIdx] || CASES_DATA[0]
  const currentSlideIdx = slideIndices[activeCaseIdx] || 0
  const currentSlide = currentCase.slides[currentSlideIdx] || currentCase.slides[0]
  const currentMode = comparisonModes[activeCaseIdx] || 'after'

  const handleSelectCase = useCallback((idx: number) => {
    triggerHaptic('light')
    setActiveCaseIdx(idx)
  }, [])

  const handleSlideChange = useCallback((delta: number) => {
    triggerHaptic('light')
    setSlideIndices((prev) => {
      const next = [...prev]
      const totalSlides = currentCase.slides.length
      next[activeCaseIdx] = (next[activeCaseIdx] + delta + totalSlides) % totalSlides
      return next
    })
  }, [activeCaseIdx, currentCase.slides.length])

  const handleToggleComparison = useCallback((mode: 'before' | 'after') => {
    triggerHaptic('light')
    setComparisonModes((prev) => {
      const next = [...prev]
      next[activeCaseIdx] = mode
      return next
    })
  }, [activeCaseIdx])

  const handleBookWithCase = useCallback(() => {
    triggerHaptic('medium')
    onOpenBooking(
      `Кейс: ${currentCase.title}`,
      `Запит після перегляду кейсу ${currentCase.title} (${currentCase.niche}). Метрика: ${currentCase.highlightMetric}`
    )
  }, [onOpenBooking, currentCase])

  return (
    <section 
      id="cases" 
      data-theme="dark"
      className="relative z-20 py-24 sm:py-32 bg-transparent text-[#EEEBDA] overflow-hidden text-left"
    >
      {/* Background ambient luxury pearl glow */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-[#F3C3CF]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#1E254F] blur-3xl pointer-events-none opacity-40" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-10 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#F3C3CF]">
              <span className="w-2 h-2 rounded-full bg-[#F3C3CF]" />
              <span>06 • КЕЙСИ ТА РЕЗУЛЬТАТИ</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.02]">
              Не обіцянки, <span className="font-editorial normal-case text-[#F3C3CF] italic font-normal">а реальні результати.</span>
            </h2>
          </div>

          <div className="text-xs font-semibold uppercase tracking-wider text-[#EEEBDA]/50">
            ОЦИФРОВАНИЙ МАРКЕТИНГ
          </div>
        </div>

        {/* Clean Case Selector Tabs (No //, No mono, 100% visible) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-10">
          {CASES_DATA.map((item, idx) => {
            const isSelected = activeCaseIdx === idx

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectCase(idx)}
                className={`p-5 sm:p-6 rounded-none text-left transition-all duration-300 cursor-pointer relative border group ${
                  isSelected
                    ? 'bg-white/[0.08] border-[#F3C3CF] shadow-xl'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.04]'
                }`}
              >
                {/* Active indicator top hairline */}
                <div 
                  className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#F3C3CF] to-transparent transition-opacity duration-300 ${
                    isSelected ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                <div className="flex items-center justify-between w-full mb-2">
                  <span className={`text-[11px] font-semibold uppercase tracking-wider ${
                    isSelected ? 'text-[#F3C3CF]' : 'text-white/40 group-hover:text-white/70'
                  }`}>
                    КЕЙС 0{idx + 1} • {item.niche}
                  </span>
                  <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-[#F3C3CF] text-[#141937]' : 'bg-white/10 text-white/70'
                  }`}>
                    {item.highlightMetric}
                  </span>
                </div>

                <div className="font-display text-lg sm:text-xl font-black uppercase tracking-tight text-white line-clamp-1">
                  {item.title}
                </div>
              </button>
            )
          })}
        </div>

        {/* Master Case Study Card (100% visible, fully responsive, zero scroll clipping) */}
        <div className="p-6 sm:p-10 lg:p-12 rounded-none bg-white/[0.03] border border-white/15 shadow-2xl backdrop-blur-md">
          
          {/* Card Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#F3C3CF] text-[#141937]">
                0{activeCaseIdx + 1} • {currentCase.niche}
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-white/60">
                {currentCase.period}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-medium uppercase tracking-wider text-[#EEEBDA]/70 hidden sm:inline">
                {currentCase.metricLabel}:
              </span>
              <span className="font-display text-2xl sm:text-3xl font-black text-[#F3C3CF]">
                {currentCase.highlightMetric}
              </span>
            </div>
          </div>

          {/* 2-Column Split: Interactive Slide Showcase (Left) & Strategy Transformation (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left 6 cols: High-Res Slide Presentation */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full bg-black/80 border border-white/20 overflow-hidden shadow-xl group/slide select-none">
                <img
                  src={currentSlide.imageUrl || '/cases/case1/slide-1.png'}
                  alt={currentSlide.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover/slide:scale-102"
                />

                {/* Fullscreen Zoom Inspector */}
                <button
                  type="button"
                  onClick={() => setLightboxImage({ src: currentSlide.imageUrl || '/cases/case1/slide-1.png', title: currentSlide.title })}
                  className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-black/75 hover:bg-black text-white border border-white/20 transition-all cursor-pointer shadow-lg hover:scale-105 flex items-center gap-1.5 text-xs font-semibold"
                  title="Відкрити на весь екран"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#F3C3CF]" />
                  <span className="hidden sm:inline">ЗБІЛЬШИТИ</span>
                </button>

                {/* Slide Caption Bottom */}
                <div className="absolute bottom-0 inset-x-0 p-3.5 bg-black/85 backdrop-blur-md border-t border-white/10 flex items-center justify-between text-xs font-bold text-white">
                  <span className="truncate pr-3 text-[#EEEBDA]/95">{currentSlide.title}</span>
                  <span className="text-[#F3C3CF] shrink-0 font-semibold">
                    Слайд 0{currentSlideIdx + 1} з 0{currentCase.slides.length}
                  </span>
                </div>
              </div>

              {/* Slide Stepper Controls */}
              <div className="flex items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleSlideChange(-1)}
                    className="p-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white transition-all cursor-pointer"
                    aria-label="Попередній слайд"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
                    СЛАЙД {currentSlideIdx + 1} З {currentCase.slides.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSlideChange(1)}
                    className="p-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white transition-all cursor-pointer"
                    aria-label="Наступний слайд"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Indicator Dots */}
                <div className="flex items-center gap-1.5 overflow-hidden">
                  {currentCase.slides.slice(0, 7).map((_, sDotIdx) => (
                    <button
                      key={sDotIdx}
                      type="button"
                      aria-label={`Перейти до слайду 0${sDotIdx + 1}`}
                      onClick={() => {
                        triggerHaptic('light')
                        setSlideIndices(prev => {
                          const n = [...prev]
                          n[activeCaseIdx] = sDotIdx
                          return n
                        })
                      }}
                      className={`w-2.5 h-1.5 rounded-full transition-all cursor-pointer ${
                        sDotIdx === currentSlideIdx ? 'bg-[#F3C3CF] w-5' : 'bg-white/25 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right 6 cols: Strategy, Transformation, Metrics, CTA */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="space-y-3">
                <h3 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                  {currentCase.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {currentCase.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 rounded-full bg-white/5 text-[11px] font-semibold uppercase tracking-wider text-[#EEEBDA]/80 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mode Switcher: Точка А vs Система Волошиної */}
              <div className="space-y-3">
                <div className="flex rounded-full bg-black/60 p-1.5 border border-white/15">
                  <button
                    type="button"
                    onClick={() => handleToggleComparison('before')}
                    className={`flex-1 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      currentMode === 'before'
                        ? 'bg-rose-950 text-rose-100 shadow-md border border-rose-500/40'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                    <span>ТОЧКА А (СТАРТ)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleComparison('after')}
                    className={`flex-1 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      currentMode === 'after'
                        ? 'bg-white text-[#141937] shadow-xl font-black'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <TrendingUp className="w-3.5 h-3.5 text-[#141937]" />
                    <span>СИСТЕМА ВОЛОШИНОЇ</span>
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {currentMode === 'before' ? (
                    <motion.div
                      key="before"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="p-5 rounded-none bg-rose-950/40 border border-rose-500/30 text-left space-y-2"
                    >
                      <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300 flex items-center gap-2">
                        <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                        <span>ПРОБЛЕМА ДО СПІВПРАЦІ:</span>
                      </div>
                      <p className="text-sm sm:text-base text-rose-100/90 leading-relaxed font-normal">
                        {currentCase.problemText}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="after"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="p-5 rounded-none bg-white/[0.06] border border-white/15 text-white text-left space-y-3 shadow-lg"
                    >
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#F3C3CF] flex items-center gap-2">
                        <TrendingUp className="w-3.5 h-3.5 text-[#F3C3CF]" />
                        <span>ВПРОВАДЖЕНА СТРАТЕГІЯ:</span>
                      </div>
                      <p className="text-sm sm:text-base text-[#EEEBDA]/95 leading-relaxed font-normal">
                        {currentCase.solutionText}
                      </p>
                      <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-xs sm:text-sm font-bold text-[#F3C3CF]">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-[#F3C3CF]" />
                        <span>{currentCase.resultSummary}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Financial Metrics Strip & Booking Button */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs uppercase tracking-wider text-white/70">
                  <span className="font-semibold text-white/50">ЕКОНОМІКА ПРОЄКТУ: </span>
                  <span className="text-white font-black">{currentCase.budgetAndReturn}</span>
                </div>

                <button
                  type="button"
                  onClick={handleBookWithCase}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#EEEBDA] hover:bg-white text-[#141937] text-xs font-black uppercase tracking-wider transition-all hover:scale-102 cursor-pointer shadow-lg rolex-sheen shrink-0"
                >
                  <span>ОБГОВОРИТИ СХОЖИЙ КЕЙС</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Lightbox Fullscreen Image Inspector Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxImage(null)}
          >
            <div className="absolute top-6 right-6 flex items-center gap-4 z-10">
              <span className="text-xs font-medium text-white/70 uppercase tracking-wider hidden sm:inline">
                {lightboxImage.title}
              </span>
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-all"
                aria-label="Закрити"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={lightboxImage.src}
              alt={lightboxImage.title}
              className="max-h-[88vh] max-w-[95vw] object-contain rounded-none border border-white/20 shadow-2xl select-none"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}
