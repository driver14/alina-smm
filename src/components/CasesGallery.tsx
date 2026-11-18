import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CaseSlideTranslation } from '../data/translations'
import { useLanguage } from '../context/LanguageContext'
import { haptics } from '../utils/haptics'
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  TrendingUp, 
  CheckCircle, 
  Image as ImageIcon,
  Play,
  Pause
} from 'lucide-react'

export const CasesGallery = () => {
  const { t } = useLanguage()
  const casesData = t.cases.data

  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0)
  const [slideDirection, setSlideDirection] = useState(1)
  const [isAutoplay, setIsAutoplay] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  
  // Independent slide indices for each of the 3 cases
  const [currentSlideIndices, setCurrentSlideIndices] = useState<Record<string, number>>({
    'case-permanent-makeup': 0,
    'case-english-school': 0,
    'case-fashion-brand': 0,
  })

  // Fullscreen preview state
  const [fullscreenSlide, setFullscreenSlide] = useState<{
    caseTitle: string
    slide: CaseSlideTranslation
    index: number
    total: number
  } | null>(null)

  const activeCase = casesData[selectedCaseIdx] || casesData[0]
  const totalSlides = activeCase.slides.length
  const currentIdx = currentSlideIndices[activeCase.id] || 0
  const currentSlide = activeCase.slides[currentIdx]

  // Ref to track touch start to avoid false pauses
  const touchTimerRef = useRef<number | null>(null)

  const handlePrevSlide = (caseId: string, total: number) => {
    haptics.slide()
    setSlideDirection(-1)
    setCurrentSlideIndices((prev) => ({
      ...prev,
      [caseId]: (prev[caseId] - 1 + total) % total,
    }))
  }

  const handleNextSlide = (caseId: string, total: number) => {
    haptics.slide()
    setSlideDirection(1)
    setCurrentSlideIndices((prev) => ({
      ...prev,
      [caseId]: (prev[caseId] + 1) % total,
    }))
  }

  const handleSelectSlide = (caseId: string, idx: number) => {
    haptics.slide()
    const current = currentSlideIndices[caseId] || 0
    setSlideDirection(idx >= current ? 1 : -1)
    setCurrentSlideIndices((prev) => ({
      ...prev,
      [caseId]: idx,
    }))
  }

  // Smooth Auto-Play Effect (5.5s per slide)
  useEffect(() => {
    if (!isAutoplay || isPaused || fullscreenSlide) return

    const timer = setInterval(() => {
      handleNextSlide(activeCase.id, totalSlides)
    }, 5500)

    return () => clearInterval(timer)
  }, [isAutoplay, isPaused, fullscreenSlide, activeCase.id, totalSlides, currentIdx])

  // Keyboard navigation for fullscreen lightbox modal
  useEffect(() => {
    if (!fullscreenSlide) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const targetCase = casesData.find(c => c.title === fullscreenSlide.caseTitle) || activeCase
      if (e.key === 'ArrowRight') {
        const nextIdx = (fullscreenSlide.index + 1) % fullscreenSlide.total
        setSlideDirection(1)
        setFullscreenSlide({
          ...fullscreenSlide,
          index: nextIdx,
          slide: targetCase.slides[nextIdx]
        })
        handleSelectSlide(targetCase.id, nextIdx)
      } else if (e.key === 'ArrowLeft') {
        const prevIdx = (fullscreenSlide.index - 1 + fullscreenSlide.total) % fullscreenSlide.total
        setSlideDirection(-1)
        setFullscreenSlide({
          ...fullscreenSlide,
          index: prevIdx,
          slide: targetCase.slides[prevIdx]
        })
        handleSelectSlide(targetCase.id, prevIdx)
      } else if (e.key === 'Escape') {
        setFullscreenSlide(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [fullscreenSlide, activeCase, casesData])

  return (
    <section id="cases" className="py-16 sm:py-24 bg-[#F9F7F1] border-b border-[#141937]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-[#141937]/10 text-[#141937] px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <img
              src="/pins/pin-rocket.png"
              alt=""
              className="w-5 h-5 object-contain shrink-0 -my-0.5 animate-float-delayed"
            />
            <span>{t.cases.tag}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#141937] tracking-tight leading-[1.15]">
            {t.cases.titleBefore}{' '}
            <span className="word-highlight">
              {t.cases.titleHighlight}
            </span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-[#141937]/80 leading-relaxed">
            {t.cases.intro}
          </p>
        </div>

        {/* Tab Buttons to Switch Between the 3 Case Studies */}
        {/* Mobile: Horizontal scrollable strip with snap. Desktop: 3-column grid */}
        <div className="flex md:grid md:grid-cols-3 gap-3 overflow-x-auto pb-3 mb-6 sm:mb-10 no-scrollbar snap-x snap-mandatory">
          {casesData.map((item, idx) => {
            const isCurrent = idx === selectedCaseIdx
            return (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedCaseIdx(idx)
                  setIsPaused(false)
                }}
                className={`snap-start shrink-0 min-w-[260px] sm:min-w-[280px] md:min-w-0 p-4 sm:p-5 text-left rounded-2xl border transition-all duration-300 relative cursor-pointer select-none ${
                  isCurrent
                    ? 'bg-[#141937] text-[#EEEBDA] border-[#141937] shadow-lg -translate-y-0.5'
                    : 'bg-white/85 backdrop-blur-sm text-[#141937] border-[#141937]/10 hover:border-[#141937]/25 hover:bg-white shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
                    isCurrent ? 'bg-[#F3C3CF] text-[#141937]' : 'bg-[#141937]/10 text-[#141937]'
                  }`}>
                    {item.niche}
                  </span>
                  <span className={`text-xs font-black ${isCurrent ? 'text-[#F3C3CF]' : 'text-[#141937]/40'}`}>
                    0{idx + 1}
                  </span>
                </div>

                <div className="text-sm sm:text-base font-extrabold tracking-tight mb-2 line-clamp-1 sm:line-clamp-none">
                  {item.title}
                </div>

                <div className="flex items-center gap-2 pt-2 sm:pt-3 border-t border-current/15">
                  <span className={`text-base sm:text-lg font-black ${isCurrent ? 'text-[#F3C3CF]' : 'text-[#141937]'}`}>
                    {item.highlightMetric}
                  </span>
                  <span className="text-[11px] opacity-80 font-medium truncate">
                    • {item.period}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Active Case Main Presentation Block */}
        <div className="bg-white/95 backdrop-blur-md border border-[#141937]/10 p-4 sm:p-7 lg:p-9 rounded-3xl shadow-[0_12px_45px_rgba(20,25,55,0.06)]">
          
          {/* Case Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-5 border-b border-[#141937]/10 mb-6 sm:mb-8">
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-[#141937] text-[#EEEBDA] px-3 py-1 rounded-full">
                  {activeCase.niche}
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#F3C3CF] text-[#141937] px-3 py-1 rounded-full">
                  {activeCase.highlightMetric}
                </span>
                <span className="text-xs text-[#141937]/70 font-semibold">
                  • {activeCase.period}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#141937] leading-snug">
                {activeCase.title}
              </h3>
            </div>

            {/* Metric pill */}
            <div className="bg-[#EEEBDA]/70 border border-[#141937]/15 p-3 sm:p-4 rounded-2xl text-left sm:text-right shrink-0">
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#141937]/70">
                {t.cases.financialResultLabel}
              </div>
              <div className="text-base sm:text-lg lg:text-xl font-black text-[#141937]">
                {activeCase.budgetAndReturn}
              </div>
            </div>
          </div>

          {/* Grid Layout: Visual Carousel comes FIRST on mobile for ultra-smooth browsing! */}
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Visual Photo Presentation Slider (Top on mobile, Right on desktop) */}
            <div className="w-full order-1 lg:order-2 lg:col-span-7">
              <div 
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => {
                  if (touchTimerRef.current) clearTimeout(touchTimerRef.current)
                  setIsPaused(true)
                }}
                onTouchEnd={() => {
                  touchTimerRef.current = setTimeout(() => setIsPaused(false), 2000)
                }}
                className="bg-[#EEEBDA]/50 border border-[#141937]/10 p-3 sm:p-5 rounded-3xl shadow-xs relative"
              >
                
                {/* Carousel Top Bar: Stories-style animated progress bar */}
                <div className="flex items-center gap-1 mb-3">
                  {activeCase.slides.map((_, sIdx) => {
                    const isPassed = sIdx < currentIdx
                    const isCurrent = sIdx === currentIdx
                    return (
                      <div 
                        key={sIdx} 
                        onClick={() => handleSelectSlide(activeCase.id, sIdx)}
                        className="flex-1 h-1 bg-[#141937]/15 rounded-full overflow-hidden cursor-pointer"
                        title={`${t.cases.slideLabel} ${sIdx + 1}`}
                      >
                        {isPassed && <div className="h-full w-full bg-[#141937]" />}
                        {isCurrent && (
                          <motion.div
                            key={`prog-${activeCase.id}-${currentIdx}-${isPaused}`}
                            initial={{ width: '0%' }}
                            animate={{ width: isPaused || !isAutoplay ? '100%' : '100%' }}
                            transition={{ 
                              duration: isPaused || !isAutoplay ? 0 : 5.5, 
                              ease: 'linear' 
                            }}
                            className="h-full bg-[#141937]"
                          />
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Carousel Header & Counter */}
                <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#141937]/10 gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F3C3CF] shrink-0"></span>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#141937] truncate">
                      {t.cases.materialsLabel}
                    </span>
                    <button
                      onClick={() => setIsAutoplay(prev => !prev)}
                      className="ml-1 p-1 rounded-md text-[#141937]/70 hover:text-[#141937] hover:bg-[#141937]/10 transition-colors"
                      title={isAutoplay ? t.cases.pauseAutoplay : t.cases.playAutoplay}
                      aria-label="Toggle autoplay"
                    >
                      {isAutoplay && !isPaused ? <Pause size={12} /> : <Play size={12} />}
                    </button>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-black tracking-widest text-[#141937] whitespace-nowrap">
                      {String(currentIdx + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-[#141937]/60 hidden xs:inline whitespace-nowrap">
                      ({totalSlides} {t.cases.slidesCountSuffix})
                    </span>
                  </div>
                </div>

                {/* Main Active Slide Display Area */}
                <div className="relative w-full max-w-[370px] sm:max-w-[420px] mx-auto aspect-[4/5] max-h-[58vh] bg-[#FAF8F5] rounded-2xl overflow-hidden border border-[#141937]/15 hover:border-[#141937] transition-colors duration-300 shadow-md">
                  <AnimatePresence initial={false} custom={slideDirection} mode="wait">
                    <motion.div
                      key={`${activeCase.id}-${currentIdx}`}
                      custom={slideDirection}
                      initial={{ opacity: 0, x: slideDirection > 0 ? 40 : -40, scale: 0.98 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: slideDirection > 0 ? -40 : 40, scale: 0.98 }}
                      transition={{
                        x: { type: 'spring', stiffness: 320, damping: 30 },
                        opacity: { duration: 0.22, ease: 'easeOut' },
                        scale: { duration: 0.22, ease: 'easeOut' }
                      }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(_, info) => {
                        if (info.offset.x < -35) {
                          handleNextSlide(activeCase.id, totalSlides)
                        } else if (info.offset.x > 35) {
                          handlePrevSlide(activeCase.id, totalSlides)
                        }
                      }}
                      onClick={() => setFullscreenSlide({
                        caseTitle: activeCase.title,
                        slide: currentSlide,
                        index: currentIdx,
                        total: totalSlides
                      })}
                      className="absolute inset-0 w-full h-full cursor-pointer select-none group"
                    >
                      {currentSlide.imageUrl ? (
                        <>
                          <img
                            src={currentSlide.imageUrl}
                            alt={currentSlide.title}
                            className="w-full h-full object-contain pointer-events-none transition-transform duration-500 group-hover:scale-[1.01]"
                            loading="lazy"
                          />
                          {/* Top floating pill */}
                          <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 bg-[#141937]/85 backdrop-blur-md text-[#EEEBDA] px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold shadow-md pointer-events-none">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F3C3CF]"></span>
                            <span>{t.cases.slideLabel} {currentIdx + 1} {t.cases.ofLabel} {totalSlides}</span>
                          </div>
                          {/* Zoom hint overlay */}
                          <div className="absolute top-2.5 right-2.5 z-20 bg-[#141937]/85 backdrop-blur-md text-[#EEEBDA] px-2.5 py-1 rounded-xl opacity-80 group-hover:opacity-100 transition-all flex items-center gap-1.5 text-xs font-bold shadow-md">
                            <Maximize2 size={12} />
                            <span className="hidden sm:inline text-[11px]">{t.cases.zoomLabel}</span>
                          </div>
                          {/* Bottom info banner: clearly visible so translated title & subtitle are immediately readable */}
                          <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-[#141937]/95 via-[#141937]/80 to-transparent text-[#EEEBDA] transition-all duration-300 pointer-events-none">
                            <div className="text-xs sm:text-sm font-black leading-snug line-clamp-1">{currentSlide.title}</div>
                            <div className="text-[10px] sm:text-[11px] text-[#EEEBDA]/85 line-clamp-1 mt-0.5">{currentSlide.subtitle}</div>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full p-6 flex flex-col items-center justify-center text-center">
                          <div className="w-12 h-12 bg-[#141937] text-[#F3C3CF] rounded-2xl flex items-center justify-center mb-3 shadow-xs">
                            <ImageIcon size={22} />
                          </div>
                          <h4 className="text-base sm:text-lg font-black text-[#141937] max-w-md mb-1 leading-snug">
                            {currentSlide.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-[#141937]/75 font-medium max-w-sm mb-4">
                            {currentSlide.subtitle}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Slider Navigation Controls */}
                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#141937]/10 gap-2">
                  <div className="flex gap-1.5 sm:gap-2">
                    <button
                      onClick={() => handlePrevSlide(activeCase.id, totalSlides)}
                      className="p-2.5 sm:p-3 bg-white text-[#141937] hover:bg-[#141937] hover:text-[#EEEBDA] rounded-xl border border-[#141937]/15 transition-all cursor-pointer shadow-xs active:scale-95"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() => handleNextSlide(activeCase.id, totalSlides)}
                      className="p-2.5 sm:p-3 bg-white text-[#141937] hover:bg-[#141937] hover:text-[#EEEBDA] rounded-xl border border-[#141937]/15 transition-all cursor-pointer shadow-xs active:scale-95"
                      aria-label="Next slide"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  {/* Desktop: Numbered Dots. Mobile: Compact swipe indicator */}
                  <div className="hidden sm:flex items-center gap-1 sm:gap-1.5 flex-wrap max-w-[280px] justify-end">
                    {activeCase.slides.map((_, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleSelectSlide(activeCase.id, sIdx)}
                        className={`transition-all duration-200 cursor-pointer rounded-full flex items-center justify-center text-[10px] font-black ${
                          sIdx === currentIdx
                            ? 'w-6 h-6 bg-[#141937] text-[#F3C3CF] shadow-xs scale-105'
                            : 'w-5 h-5 bg-[#141937]/15 hover:bg-[#141937]/35 text-[#141937]/70'
                        }`}
                        aria-label={`Go to slide ${sIdx + 1}`}
                      >
                        {sIdx + 1}
                      </button>
                    ))}
                  </div>

                  {/* Mobile-only compact pill */}
                  <div className="sm:hidden flex items-center gap-1.5 text-xs font-bold text-[#141937]/80">
                    <span className="text-[11px] font-extrabold bg-[#141937] text-[#EEEBDA] px-3 py-1 rounded-full">
                      {currentIdx + 1} / {totalSlides}
                    </span>
                    <span className="text-[10px] text-[#141937]/60">
                      {t.cases.swipeHint}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Problem, Solution & Summary Description (Below carousel on mobile, Left on desktop) */}
            <div className="w-full order-2 lg:order-1 lg:col-span-5 space-y-3 sm:space-y-4">
              
              <div className="p-4 sm:p-5 bg-red-50/60 border border-red-200/60 rounded-2xl space-y-1.5">
                <div className="text-xs font-extrabold uppercase tracking-wider text-red-700 flex items-center gap-1.5">
                  <span>{t.cases.pointALabel}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#141937]/85 leading-relaxed font-medium">
                  {activeCase.problemText}
                </p>
              </div>

              <div className="p-4 sm:p-5 bg-[#EEEBDA]/40 border border-[#141937]/10 rounded-2xl space-y-1.5">
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#141937] flex items-center gap-1.5">
                  <CheckCircle size={15} className="text-[#141937]" />
                  <span>{t.cases.solutionLabel}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#141937]/85 leading-relaxed font-medium">
                  {activeCase.solutionText}
                </p>
              </div>

              <div className="p-4 sm:p-5 bg-[#141937] text-[#EEEBDA] rounded-2xl space-y-1.5 shadow-md">
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#F3C3CF] flex items-center gap-1.5">
                  <TrendingUp size={15} />
                  <span>{t.cases.pointBLabel}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#EEEBDA]/90 leading-relaxed font-semibold">
                  {activeCase.resultSummary}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeCase.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 bg-[#EEEBDA] border border-[#141937]/15 rounded-lg text-[#141937]">
                    #{tag}
                  </span>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Fullscreen Modal View for Slides with Modal Navigation */}
      {fullscreenSlide && (
        <div 
          onClick={() => setFullscreenSlide(null)}
          className="fixed inset-0 z-50 bg-[#141937]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#EEEBDA] border border-[#141937]/20 rounded-3xl max-w-4xl w-full max-h-[96vh] flex flex-col p-4 sm:p-6 relative shadow-2xl overflow-hidden"
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-[#141937]/15 shrink-0">
              <div className="pr-12">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#141937]/70">
                  {fullscreenSlide.caseTitle} • {t.cases.slideLabel} {fullscreenSlide.index + 1} {t.cases.ofLabel} {fullscreenSlide.total}
                </span>
                <h4 className="text-sm sm:text-lg font-black text-[#141937] leading-snug line-clamp-1">
                  {fullscreenSlide.slide.title}
                </h4>
              </div>

              <button
                onClick={() => setFullscreenSlide(null)}
                className="p-2.5 bg-[#141937] text-[#EEEBDA] hover:bg-[#F3C3CF] hover:text-[#141937] rounded-full transition-colors cursor-pointer shrink-0"
                aria-label="Close fullscreen view"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body: Image with Smooth Motion */}
            <div className="flex-1 overflow-auto flex items-center justify-center py-3 min-h-[300px]">
              <AnimatePresence mode="wait" custom={slideDirection}>
                <motion.div
                  key={fullscreenSlide.index}
                  custom={slideDirection}
                  initial={{ opacity: 0, x: slideDirection > 0 ? 30 : -30, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: slideDirection > 0 ? -30 : 30, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="w-full flex items-center justify-center"
                >
                  {fullscreenSlide.slide.imageUrl ? (
                    <div className="relative max-h-[75vh] w-auto flex items-center justify-center">
                      <img
                        src={fullscreenSlide.slide.imageUrl}
                        alt={fullscreenSlide.slide.title}
                        className="max-h-[75vh] w-auto object-contain rounded-xl shadow-lg border border-[#141937]/10"
                      />
                    </div>
                  ) : (
                    <div className="text-center p-8 bg-white/70 rounded-2xl border border-[#141937]/10 max-w-md">
                      <h5 className="text-lg font-black text-[#141937] mb-2">{fullscreenSlide.slide.title}</h5>
                      <p className="text-sm text-[#141937]/75">{fullscreenSlide.slide.subtitle}</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Modal Navigation Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-[#141937]/15 shrink-0">
              <button
                onClick={() => {
                  const targetCase = casesData.find(c => c.title === fullscreenSlide.caseTitle) || activeCase
                  const prevIdx = (fullscreenSlide.index - 1 + fullscreenSlide.total) % fullscreenSlide.total
                  setSlideDirection(-1)
                  setFullscreenSlide({
                    ...fullscreenSlide,
                    index: prevIdx,
                    slide: targetCase.slides[prevIdx]
                  })
                  handleSelectSlide(targetCase.id, prevIdx)
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-white text-[#141937] hover:bg-[#141937] hover:text-[#EEEBDA] rounded-xl border border-[#141937]/15 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <ChevronLeft size={16} />
                <span>{t.cases.prevSlide}</span>
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: fullscreenSlide.total }).map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => {
                      const targetCase = casesData.find(c => c.title === fullscreenSlide.caseTitle) || activeCase
                      setSlideDirection(dotIdx >= fullscreenSlide.index ? 1 : -1)
                      setFullscreenSlide({
                        ...fullscreenSlide,
                        index: dotIdx,
                        slide: targetCase.slides[dotIdx]
                      })
                      handleSelectSlide(targetCase.id, dotIdx)
                    }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      dotIdx === fullscreenSlide.index 
                        ? 'w-6 bg-[#141937]' 
                        : 'w-2 bg-[#141937]/25 hover:bg-[#141937]/50'
                    }`}
                    aria-label={`Jump to slide ${dotIdx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  const targetCase = casesData.find(c => c.title === fullscreenSlide.caseTitle) || activeCase
                  const nextIdx = (fullscreenSlide.index + 1) % fullscreenSlide.total
                  setSlideDirection(1)
                  setFullscreenSlide({
                    ...fullscreenSlide,
                    index: nextIdx,
                    slide: targetCase.slides[nextIdx]
                  })
                  handleSelectSlide(targetCase.id, nextIdx)
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-white text-[#141937] hover:bg-[#141937] hover:text-[#EEEBDA] rounded-xl border border-[#141937]/15 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <span>{t.cases.nextSlide}</span>
                <ChevronRight size={16} />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  )
}
