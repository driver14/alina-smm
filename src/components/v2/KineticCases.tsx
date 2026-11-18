import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, ArrowRight, Sparkles } from 'lucide-react'
import { triggerHaptic } from '../../utils/haptics'
import { CASES_DATA } from '../../data/content'

interface KineticCasesProps {
  onOpenBooking: (service?: string, note?: string) => void
}

export const KineticCases: React.FC<KineticCasesProps> = ({ onOpenBooking }) => {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0)
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0)
  const currentCase = CASES_DATA[selectedCaseIndex] || CASES_DATA[0]

  const handleSelectCase = (index: number) => {
    triggerHaptic('light')
    setSelectedCaseIndex(index)
    setSelectedSlideIndex(0)
  }

  const handleNextSlide = () => {
    if (selectedSlideIndex < currentCase.slides.length - 1) {
      triggerHaptic('light')
      setSelectedSlideIndex(selectedSlideIndex + 1)
    }
  }

  const handlePrevSlide = () => {
    if (selectedSlideIndex > 0) {
      triggerHaptic('light')
      setSelectedSlideIndex(selectedSlideIndex - 1)
    }
  }

  return (
    <section id="cases" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141937]/5 border border-[#141937]/10 text-xs font-bold text-[#141937] uppercase tracking-wider mb-4">
              <TrendingUp className="w-3.5 h-3.5 text-[#141937]" />
              Кейси та результати в цифрах
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#141937] tracking-tight text-balance">
              Реальні гроші клієнтів, <br />
              <span className="relative inline-block px-2 py-0.5 rounded-md bg-[#F3C3CF] text-[#141937]">
                а не просто перегляди
              </span>
            </h2>
          </div>

          <p className="text-base text-[#141937]/75 font-medium max-w-md text-pretty">
            Кожен кейс — це перевірена гіпотеза, налаштована аналітика та прогнозований прибуток.
          </p>
        </div>

        {/* Case Navigation Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-10 pb-2 border-b border-[#141937]/10">
          {CASES_DATA.map((c, idx) => (
            <button
              key={c.id}
              type="button"
              onClick={() => handleSelectCase(idx)}
              className={`relative px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-200 flex items-center gap-2.5 ${
                selectedCaseIndex === idx
                  ? 'bg-[#141937] text-white shadow-lg shadow-[#141937]/20'
                  : 'bg-white/60 hover:bg-white text-[#141937]/80 hover:text-[#141937] border border-[#141937]/5'
              }`}
            >
              <span>{c.title}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-mono font-bold ${
                selectedCaseIndex === idx ? 'bg-[#F3C3CF] text-[#141937]' : 'bg-[#141937]/10 text-[#141937]'
              }`}>
                {c.highlightMetric}
              </span>
            </button>
          ))}
        </div>

        {/* Active Case Feature Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#141937]/10 shadow-2xl shadow-[#141937]/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Interactive Media & Evidence Gallery */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="relative w-full aspect-[4/5] sm:aspect-square max-w-[460px] rounded-2xl overflow-hidden bg-[#141937]/5 border border-[#141937]/10 shadow-inner group">
                
                {/* Slide Image */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${currentCase.id}-${selectedSlideIndex}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full relative"
                  >
                    {currentCase.slides[selectedSlideIndex]?.imageUrl ? (
                      <img
                        src={currentCase.slides[selectedSlideIndex].imageUrl}
                        alt={currentCase.slides[selectedSlideIndex].title}
                        className="w-full h-full object-contain p-2 bg-[#F9F7F1]"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#141937] to-[#1E254F] text-white">
                        <Sparkles className="w-10 h-10 text-[#F3C3CF] mb-4" />
                        <h4 className="text-xl font-bold mb-2">{currentCase.slides[selectedSlideIndex]?.title}</h4>
                        <p className="text-xs text-white/70">{currentCase.slides[selectedSlideIndex]?.subtitle}</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Top Badge: Slide Category */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#141937]/80 backdrop-blur-md text-white border border-white/20">
                    Слайд {selectedSlideIndex + 1} з {currentCase.slides.length}
                  </span>
                </div>

                {/* Arrow navigation on image */}
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between z-20">
                  <button
                    type="button"
                    onClick={handlePrevSlide}
                    disabled={selectedSlideIndex === 0}
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#141937] flex items-center justify-center shadow-md disabled:opacity-30 disabled:pointer-events-none hover:bg-white transition-all"
                  >
                    ‹
                  </button>
                  <span className="text-xs font-bold bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[#141937] shadow-sm">
                    {currentCase.slides[selectedSlideIndex]?.title}
                  </span>
                  <button
                    type="button"
                    onClick={handleNextSlide}
                    disabled={selectedSlideIndex === currentCase.slides.length - 1}
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#141937] flex items-center justify-center shadow-md disabled:opacity-30 disabled:pointer-events-none hover:bg-white transition-all"
                  >
                    ›
                  </button>
                </div>
              </div>

              {/* Thumbnails strip */}
              <div className="flex items-center gap-2 mt-4 max-w-[460px] overflow-x-auto pb-2 w-full">
                {currentCase.slides.map((s, sIdx) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      triggerHaptic('light')
                      setSelectedSlideIndex(sIdx)
                    }}
                    className={`relative w-12 h-12 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      selectedSlideIndex === sIdx ? 'border-[#141937] scale-105 shadow-md' : 'border-black/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    {s.imageUrl ? (
                      <img src={s.imageUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#141937] flex items-center justify-center text-[10px] text-white font-bold">
                        {sIdx + 1}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Strategy & Business Impact Breakdown */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <div className="flex items-center gap-2 text-xs font-bold text-[#141937]/60 uppercase tracking-wider mb-2">
                <span>{currentCase.niche}</span>
                <span>•</span>
                <span>{currentCase.period}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#141937] tracking-tight mb-4">
                {currentCase.title}
              </h3>

              {/* Big Metric Box */}
              <div className="w-full p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#141937] to-[#1E254F] text-white shadow-xl mb-6">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs uppercase tracking-wider text-white/70 font-semibold">{currentCase.metricLabel}</span>
                  <span className="text-2xl sm:text-3xl font-black text-[#F3C3CF] font-mono">{currentCase.highlightMetric}</span>
                </div>
                <div className="text-sm font-semibold text-white/90">
                  {currentCase.budgetAndReturn}
                </div>
              </div>

              {/* Challenge vs Solution */}
              <div className="space-y-4 mb-8 w-full">
                <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200/60">
                  <div className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <span>Точка А (Проблема)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-rose-950 font-medium leading-relaxed">
                    {currentCase.problemText}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/60">
                  <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <span>Рішення та Архітектура</span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                    {currentCase.solutionText}
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('medium')
                  onOpenBooking(`Кейс: ${currentCase.title}`, `Хочу отримати подібний результат: ${currentCase.budgetAndReturn}`)
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#141937] hover:bg-[#1E254F] text-white font-bold text-sm shadow-xl shadow-[#141937]/20 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Отримати таку ж систему для свого бізнесу</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
