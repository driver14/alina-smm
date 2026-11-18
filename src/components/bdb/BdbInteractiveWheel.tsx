import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { triggerHaptic } from '../../utils/haptics'
import { useSmoothScroll } from '../../providers/SmoothScrollProvider'

interface BdbInteractiveWheelProps {
  onOpenBooking: (service?: string, note?: string) => void
}

interface WheelItem {
  id: string
  label: string
  headline: string
  desc: string
  tag: string
}

const WHEEL_ITEMS: WheelItem[] = [
  {
    id: 'strategy',
    label: 'СТРАТЕГІЯ',
    headline: 'SMM — це маркетинг, а не контент заради контенту.',
    desc: 'Вивчаю ваш продукт, нішу, конкурентів, цільову аудиторію та особливості продажів. Формую позиціонування, УТП, Tone of Voice та шлях клієнта до покупки.',
    tag: 'ФУНДАМЕНТ БРЕНДУ'
  },
  {
    id: 'marketing',
    label: 'МАРКЕТИНГ',
    headline: 'Маркетингова система, яка працює на розвиток і продажі.',
    desc: 'Об’єдную маркетинг, аналітику та командну роботу, щоб перетворювати соціальні мережі на ефективний і прогнозований інструмент залучення платоспроможних клієнтів.',
    tag: 'СИСТЕМНИЙ ПІДХІД'
  },
  {
    id: 'content',
    label: 'КОНТЕНТ',
    headline: 'Сенсовий візуал та естетика, яка закохує аудиторію.',
    desc: 'Контент виходить регулярно та приносить звернення. Від професійного продакшну та сценаріїв Reels до щоденних сторітелінгів, що захищають високу маржинальність бренду.',
    tag: 'REELS & PRODUCTION'
  },
  {
    id: 'target',
    label: 'ТАРГЕТ',
    headline: 'Керована генерація заявок без зливу бюджету.',
    desc: 'Розробка рекламної стратегії, налаштування, запуск, спліт-тестування та щотижнева оптимізація кампаній у США, Європі та Україні. Підтверджений ROMI до 10.2X.',
    tag: 'META ADS ACQUISITION'
  },
  {
    id: 'analytics',
    label: 'АНАЛІТИКА',
    headline: 'Аналітика замість припущень та здогадок.',
    desc: 'Спираюся на показники, дослідження та конкретні цифри. Прозорі звіти, відстеження вартості ліда (CPA), конверсії посадкової сторінки та чистого прибутку бізнесу.',
    tag: 'DATA-FIRST MANAGEMENT'
  },
  {
    id: 'sales',
    label: 'ПРОДАЖІ',
    headline: 'Результат важливіший за порожні перегляди.',
    desc: 'Велика кількість переглядів не завжди означає ефективний маркетинг. Для мене першочерговими є цільові звернення, записи на консультації, замовлення та чисті продажі.',
    tag: 'ОКУПНІСТЬ & ПРИБУТОК'
  }
]

export const BdbInteractiveWheel: React.FC<BdbInteractiveWheelProps> = ({ onOpenBooking }) => {
  const [activeIndex, setActiveIndex] = useState(1) // Default to МАРКЕТИНГ
  const wheelContainerRef = useRef<HTMLDivElement>(null)
  const lastWheelTimeRef = useRef<number>(0)
  const { lenis } = useSmoothScroll()

  const activeItem = WHEEL_ITEMS[activeIndex]

  const handleSelect = useCallback((idx: number) => {
    triggerHaptic('light')
    setActiveIndex(idx)
  }, [])

  const nextItem = useCallback(() => {
    triggerHaptic('light')
    setActiveIndex((prev) => (prev + 1) % WHEEL_ITEMS.length)
  }, [])

  const prevItem = useCallback(() => {
    triggerHaptic('light')
    setActiveIndex((prev) => (prev - 1 + WHEEL_ITEMS.length) % WHEEL_ITEMS.length)
  }, [])

  // Smooth wheel handling with strict Lenis isolation (prevents page jump)
  useEffect(() => {
    const el = wheelContainerRef.current
    if (!el) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()

      const now = Date.now()
      if (now - lastWheelTimeRef.current < 200) return

      if (Math.abs(e.deltaY) > 12) {
        lastWheelTimeRef.current = now
        if (e.deltaY > 0) {
          nextItem()
        } else {
          prevItem()
        }
      }
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [nextItem, prevItem])

  const handleMouseEnter = () => {
    lenis?.stop()
  }

  const handleMouseLeave = () => {
    lenis?.start()
  }

  const handleBook = () => {
    triggerHaptic('medium')
    onOpenBooking(
      `Стратегічний розбір: ${activeItem.label}`,
      `Запит через систему векторів: ${activeItem.label} — ${activeItem.headline}`
    )
  }

  return (
    <section 
      id="wheel"
      data-theme="dark"
      className="relative z-20 py-24 sm:py-36 bg-transparent text-[#EEEBDA] overflow-hidden text-left"
    >
      {/* Background ambient luxury pearl glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#F3C3CF]/10 blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Top Minimalist Header without extra lines */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-12">
          <div>
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#F3C3CF] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#F3C3CF]" />
              <span>АРХІТЕКТУРА МАРКЕТИНГУ</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
              КЛЮЧОВІ ВЕКТОРИ СИСТЕМИ
            </h2>
          </div>

          <div className="text-xs font-semibold uppercase tracking-wider text-[#EEEBDA]/50">
            06 ВЕКТОРІВ СИСТЕМИ
          </div>
        </div>

        {/* 2-Column Layout (NO dividing lines, NO clunky frames, pure crystal-clear typography) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Interactive 3D Roller Stack */}
          <div
            ref={wheelContainerRef}
            data-lenis-prevent
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-6 relative select-none py-4 flex flex-col justify-center items-start cursor-pointer"
          >
            {WHEEL_ITEMS.map((item, idx) => {
              const distance = idx - activeIndex
              const isCenter = distance === 0
              const isAdjacent = Math.abs(distance) === 1

              if (Math.abs(distance) > 2) return null

              return (
                <motion.div
                  key={item.id}
                  onClick={() => handleSelect(idx)}
                  animate={{
                    scale: isCenter ? 1.05 : isAdjacent ? 0.88 : 0.74,
                    opacity: isCenter ? 1 : isAdjacent ? 0.35 : 0.15,
                    y: distance * 8,
                    filter: isCenter ? 'blur(0px)' : isAdjacent ? 'blur(0.5px)' : 'blur(1.5px)'
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className={`font-display font-black uppercase tracking-tight transition-colors duration-200 cursor-pointer text-left leading-[0.92] my-1.5 ${
                    isCenter
                      ? 'text-white text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem]'
                      : isAdjacent
                      ? 'text-[#EEEBDA]/50 text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] hover:text-[#EEEBDA]/80'
                      : 'text-stroke-outline text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem]'
                  }`}
                >
                  <span className="inline-block relative">
                    {item.label}
                    {isCenter && (
                      <motion.span
                        layoutId="wheel-active-bullet"
                        className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#F3C3CF] hidden sm:inline-block"
                      />
                    )}
                  </span>
                </motion.div>
              )
            })}
          </div>

          {/* Right Column: Pure Minimalist Editorial Typography (NO DIVIDING LINES, CLEAR FONT) */}
          <div className="lg:col-span-6 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 text-left"
              >
                {/* Clear, refined category badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider text-[#F3C3CF]">
                  <span>{activeItem.tag}</span>
                </div>

                {/* Bold high-contrast headline */}
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-[1.18] tracking-tight">
                  {activeItem.headline}
                </h3>

                {/* Clear, legible editorial paragraph */}
                <p className="text-base sm:text-lg text-[#EEEBDA]/85 leading-relaxed font-normal max-w-xl">
                  {activeItem.desc}
                </p>

                {/* Minimalist CTA cluster (NO lines, luxury cream capsule) */}
                <div className="pt-3 flex flex-col sm:flex-row sm:items-center gap-4">
                  <button
                    type="button"
                    onClick={handleBook}
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#EEEBDA] hover:bg-white text-[#141937] text-xs font-extrabold uppercase tracking-[0.16em] transition-all hover:scale-105 cursor-pointer rolex-sheen shadow-xl"
                  >
                    <span>ОТРИМАТИ СТРАТЕГІЮ</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <span className="text-xs font-semibold uppercase tracking-wider text-[#EEEBDA]/50">
                    США • ЄВРОПА • УКРАЇНА
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  )
}
