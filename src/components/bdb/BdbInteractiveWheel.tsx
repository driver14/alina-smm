import React, { useState, useRef, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import { triggerHaptic } from '../../utils/haptics'
import { Section, Kicker } from './ui/Section'

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

const STEP_VH = 55 // scroll distance per vector while the drum is pinned

/**
 * 02.6 — System vectors as a vertical word drum.
 * Desktop (fine pointer, motion allowed): the drum is sticky and the active
 * vector follows scroll progress through the section. Everywhere else it is a
 * plain list of buttons. Clicking a word always selects it (and on desktop
 * scrolls to its position), so nothing depends on scroll alone.
 */
export const BdbInteractiveWheel: React.FC<BdbInteractiveWheelProps> = ({ onOpenBooking }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [pinned, setPinned] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const activeItem = WHEEL_ITEMS[activeIndex]

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setPinned(mq.matches && !reduce)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [reduce])

  // Map scroll progress through the tall section to the active vector
  useEffect(() => {
    if (!pinned) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const el = sectionRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const travel = el.offsetHeight - window.innerHeight
        const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, travel)))
        const idx = Math.min(WHEEL_ITEMS.length - 1, Math.floor(p * WHEEL_ITEMS.length))
        setActiveIndex((prev) => (prev === idx ? prev : idx))
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [pinned])

  const selectIdx = (idx: number) => {
    triggerHaptic('light')
    setActiveIndex(idx)
    if (pinned && sectionRef.current) {
      const el = sectionRef.current
      const travel = el.offsetHeight - window.innerHeight
      const top = el.getBoundingClientRect().top + window.scrollY + ((idx + 0.5) / WHEEL_ITEMS.length) * travel
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const handleBook = () => {
    triggerHaptic('medium')
    onOpenBooking(
      `Стратегічний розбір: ${activeItem.label}`,
      `Запит через систему векторів: ${activeItem.label} — ${activeItem.headline}`,
    )
  }

  return (
    <Section
      id="wheel"
      theme="ink"
      labelledBy="wheel-title"
      ref={sectionRef}
      style={pinned ? { height: `calc(100svh + ${WHEEL_ITEMS.length * STEP_VH}svh)` } : undefined}
    >
      <div className={pinned ? 'sticky top-0 h-[100svh] flex flex-col overflow-hidden' : 'section-y'}>
        <div className="wrap flex items-end justify-between gap-6" style={pinned ? { paddingTop: 'calc(var(--header-h) + 32px)' } : undefined}>
          <div>
            <Kicker className="mb-4 text-pink opacity-100">Архітектура маркетингу</Kicker>
            <h2 id="wheel-title" className="t-display-m">Ключові вектори системи</h2>
          </div>
          <p className="t-ui opacity-60 hidden sm:block tabular-nums">
            {String(activeIndex + 1).padStart(2, '0')} / {String(WHEEL_ITEMS.length).padStart(2, '0')}
          </p>
        </div>

        <div className="wrap flex-1 grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-10 items-center mt-12 lg:mt-0">
          {/* Drum */}
          <div className="lg:col-span-7 relative" style={pinned ? { height: '62svh' } : undefined}>
            <ul
              className={pinned ? 'absolute inset-x-0 top-1/2' : 'flex flex-col'}
              style={
                pinned
                  ? {
                      transform: `translate3d(0, calc(${-activeIndex} * var(--drum-row) - var(--drum-row) / 2), 0)`,
                      transition: 'transform 700ms var(--ease-out-expo)',
                      ['--drum-row' as string]: 'clamp(64px, 8.4vw, 124px)',
                    } as React.CSSProperties
                  : undefined
              }
            >
              {WHEEL_ITEMS.map((item, i) => {
                const d = Math.abs(i - activeIndex)
                const active = d === 0
                return (
                  <li key={item.id} style={pinned ? { height: 'var(--drum-row)' } : undefined}>
                    <button
                      type="button"
                      onClick={() => selectIdx(i)}
                      aria-pressed={active}
                      className={`block w-full text-left font-display font-black uppercase leading-[0.9] tracking-[-0.03em] origin-left cursor-pointer transition-[transform,opacity,color] duration-700 ${
                        active ? 'text-paper' : 'text-paper hover:!opacity-70'
                      }`}
                      style={{
                        fontSize: pinned ? 'clamp(64px, 8.4vw, 124px)' : 'clamp(44px, 12vw, 72px)',
                        transform: pinned && !active ? 'scaleY(0.62)' : 'none',
                        opacity: active ? 1 : pinned ? (d === 1 ? 0.28 : d === 2 ? 0.12 : 0.05) : 0.35,
                        transitionTimingFunction: 'var(--ease-out-expo)',
                      }}
                    >
                      {item.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Detail */}
          <div className="lg:col-span-5 lg:pb-0 pb-4" aria-live="polite">
            <div key={activeItem.id} className="swap-in">
              <p className="t-ui text-pink">{activeItem.tag}</p>
              <h3 className="t-serif-l mt-5" style={{ ['--i' as string]: 1 } as React.CSSProperties}>
                {activeItem.headline}
              </h3>
              <p className="mt-6 text-[16px] leading-[1.5] opacity-75 max-w-[460px]" style={{ ['--i' as string]: 2 } as React.CSSProperties}>
                {activeItem.desc}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3" style={{ ['--i' as string]: 3 } as React.CSSProperties}>
                <button type="button" onClick={handleBook} className="btn-tag btn-tag--light">
                  Отримати стратегію
                </button>
                <span className="t-ui opacity-60">США • Європа • Україна</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
