import React, { useState, useCallback, useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { triggerHaptic } from '../../utils/haptics'
import { CASES_DATA, type CaseStudy } from '../../data/content'
import { Reveal, Lines } from './ui/Reveal'
import { Section, Kicker } from './ui/Section'

interface BdbWorksProps {
  onOpenBooking: (service?: string, note?: string) => void
}

/** Short niche word for the rotated strip, e.g. "Beauty & Сфера послуг" → "BEAUTY". */
const stripWord = (niche: string) => niche.split(/[&(]/)[0].trim()

/* ───────────────────────────── Case viewer ───────────────────────────── */

interface ViewerProps {
  caseIdx: number
  onClose: () => void
  onCaseChange: (idx: number) => void
  onBook: (c: CaseStudy) => void
}

const CaseViewer: React.FC<ViewerProps> = ({ caseIdx, onClose, onCaseChange, onBook }) => {
  const c = CASES_DATA[caseIdx]
  const [slide, setSlide] = useState(0)
  const [mode, setMode] = useState<'before' | 'after'>('after')
  const dialogRef = useRef<HTMLDivElement>(null)
  const total = c.slides.length
  const current = c.slides[slide]

  useEffect(() => {
    setSlide(0)
    setMode('after')
  }, [caseIdx])

  const go = useCallback(
    (delta: number) => {
      triggerHaptic('light')
      setSlide((s) => (s + delta + total) % total)
    },
    [total],
  )

  // Scroll lock, keyboard (Esc / arrows), focus trap
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const root = dialogRef.current
    const previouslyFocused = document.activeElement as HTMLElement | null
    Array.from(root?.querySelectorAll<HTMLElement>('[data-autofocus]') ?? []).find((el) => el.offsetParent !== null)?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowRight') {
        go(1)
      } else if (e.key === 'ArrowLeft') {
        go(-1)
      } else if (e.key === 'Tab' && root) {
        const items = Array.from(root.querySelectorAll<HTMLElement>('button, a[href]')).filter((el) => !el.hasAttribute('disabled'))
        if (!items.length) return
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      previouslyFocused?.focus?.()
    }
  }, [go, onClose])

  // Preload neighbours
  useEffect(() => {
    ;[slide + 1, slide - 1].forEach((i) => {
      const s = c.slides[(i + total) % total]
      if (s?.imageUrl) new Image().src = s.imageUrl
    })
  }, [slide, c, total])

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-viewer-title"
      className="fixed inset-0 z-[60] bg-ink text-paper overflow-y-auto overscroll-contain"
    >
      <div className="min-h-full grid grid-cols-1 lg:grid-cols-12">
        {/* Slide */}
        <div className="lg:col-span-7 relative bg-black/30 flex flex-col">
          <div className="flex items-center justify-between wrap py-4">
            <p className="t-ui tabular-nums">
              {String(slide + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </p>
            <button
              type="button"
              onClick={onClose}
              data-autofocus
              className="lg:hidden btn-tag btn-tag--light"
              aria-label="Закрити кейс"
            >
              <X className="w-4 h-4" aria-hidden="true" /> Закрити
            </button>
          </div>

          <figure className="m-0 flex-1 flex items-center justify-center px-4 sm:px-10 pb-4">
            {current.imageUrl ? (
              <img
                key={current.imageUrl}
                src={current.imageUrl}
                alt={`${current.title}. ${current.subtitle}`}
                width={819}
                height={1024}
                className="swap-in-img max-h-[min(78svh,900px)] w-auto max-w-full object-contain"
              />
            ) : (
              <p className="t-serif-l text-center max-w-[420px]">{current.placeholderText}</p>
            )}
          </figure>

          <div className="wrap pb-6 flex items-end justify-between gap-6">
            <div className="min-w-0">
              <p className="t-serif text-[22px] leading-tight">{current.title}</p>
              <p className="text-[13px] opacity-60 mt-1">{current.subtitle}</p>
            </div>
            <div className="flex shrink-0">
              <button type="button" onClick={() => go(-1)} className="btn-arrow btn-arrow--light" aria-label="Попередній слайд">
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => go(1)} className="btn-arrow" aria-label="Наступний слайд">
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="lg:col-span-5 wrap py-8 lg:py-6 flex flex-col gap-10">
          <div className="hidden lg:flex justify-end">
            <button type="button" onClick={onClose} data-autofocus className="btn-tag btn-tag--light" aria-label="Закрити кейс">
              <X className="w-4 h-4" aria-hidden="true" /> Закрити
            </button>
          </div>

          <div>
            <p className="t-ui text-pink">
              Кейс {String(caseIdx + 1).padStart(2, '0')} · {c.niche} · {c.period}
            </p>
            <h3 id="case-viewer-title" className="t-display-m mt-4">
              {c.title}
            </h3>
            <p className="mt-6 flex items-baseline gap-4">
              <span className="font-display font-black text-[56px] leading-none tracking-[-0.03em] text-pink">{c.highlightMetric}</span>
              <span className="t-ui opacity-70">{c.metricLabel}</span>
            </p>
            <p className="t-ui mt-4 opacity-60">{c.tags.join(' · ')}</p>
          </div>

          <div>
            <div role="tablist" aria-label="Етап кейсу" className="flex gap-6 border-b border-paper/15">
              {(
                [
                  ['before', 'Точка А (старт)'],
                  ['after', 'Система Волошиної'],
                ] as const
              ).map(([m, label]) => (
                <button
                  key={m}
                  type="button"
                  role="tab"
                  aria-selected={mode === m}
                  onClick={() => {
                    triggerHaptic('light')
                    setMode(m)
                  }}
                  className={`-mb-px pb-3 font-display font-extrabold uppercase text-[18px] cursor-pointer border-b-2 ${
                    mode === m ? 'border-pink text-paper' : 'border-transparent text-paper/45 hover:text-paper'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div key={mode} className="swap-in pt-6" role="tabpanel">
              <p className="t-ui opacity-60">{mode === 'before' ? 'Проблема до співпраці' : 'Впроваджена стратегія'}</p>
              <p className="t-body-l mt-3" style={{ ['--i' as string]: 1 } as React.CSSProperties}>
                {mode === 'before' ? c.problemText : c.solutionText}
              </p>
              {mode === 'after' && (
                <p className="t-serif mt-6 text-pink" style={{ ['--i' as string]: 2 } as React.CSSProperties}>
                  {c.resultSummary}
                </p>
              )}
            </div>
          </div>

          <div className="mt-auto border-t border-paper/15 pt-6 flex flex-wrap items-center justify-between gap-6">
            <p className="t-ui">
              <span className="opacity-60">Економіка проєкту: </span>
              {c.budgetAndReturn}
            </p>
            <button type="button" onClick={() => onBook(c)} className="btn-tag btn-tag--light">
              Обговорити схожий кейс
            </button>
          </div>

          <div className="flex items-center justify-between t-ui">
            <button
              type="button"
              onClick={() => onCaseChange((caseIdx - 1 + CASES_DATA.length) % CASES_DATA.length)}
              className="link-u cursor-pointer"
            >
              ← Попередній кейс
            </button>
            <button
              type="button"
              onClick={() => onCaseChange((caseIdx + 1) % CASES_DATA.length)}
              className="link-u cursor-pointer"
            >
              Наступний кейс →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────────── Section ───────────────────────────── */

/** 06 — Cases: edge-to-edge media columns with rotated niche strips. */
export const BdbWorks: React.FC<BdbWorksProps> = ({ onOpenBooking }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([])
  const lastOpened = useRef<number>(0)

  const open = (idx: number) => {
    triggerHaptic('light')
    lastOpened.current = idx
    setOpenIdx(idx)
  }

  const close = useCallback(() => {
    setOpenIdx(null)
    requestAnimationFrame(() => triggerRefs.current[lastOpened.current]?.focus())
  }, [])

  const handleBook = useCallback(
    (c: CaseStudy) => {
      triggerHaptic('medium')
      setOpenIdx(null)
      onOpenBooking(
        `Кейс: ${c.title}`,
        `Запит після перегляду кейсу ${c.title} (${c.niche}). Метрика: ${c.highlightMetric}`,
      )
    },
    [onOpenBooking],
  )

  return (
    <Section id="cases" theme="ink" labelledBy="cases-title" className="pt-[var(--section-y)]">
      <Reveal className="wrap grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-6 items-end">
        <div className="lg:col-span-9">
          <Kicker index="06" className="mb-8">
            Кейси та результати
          </Kicker>
          <h2 id="cases-title">
            <span className="t-display block">
              <Lines lines={['Не обіцянки,']} />
            </span>
            <span className="t-serif-xl block text-pink mt-2">
              <Lines start={1} lines={['а реальні результати.']} />
            </span>
          </h2>
        </div>
        <p className="lg:col-span-3 t-ui opacity-60 lg:text-right">Оцифрований маркетинг · {CASES_DATA.length} кейси</p>
      </Reveal>

      <Reveal
        as="ul"
        className="mt-16 sm:mt-24 flex lg:grid lg:grid-cols-3 overflow-x-auto lg:overflow-visible snap-x snap-mandatory [scrollbar-width:none]"
      >
        {CASES_DATA.map((c, i) => {
          const word = stripWord(c.niche)
          const cover = c.slides[0]?.imageUrl
          return (
            <li
              key={c.id}
              className="clip-up shrink-0 w-[86vw] sm:w-[60vw] lg:w-auto snap-start border-r border-ink last:border-r-0"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <button
                ref={(el) => {
                  triggerRefs.current[i] = el
                }}
                type="button"
                onClick={() => open(i)}
                data-cursor="explore"
                aria-label={`Відкрити кейс: ${c.title}`}
                className="group block w-full text-left cursor-pointer"
              >
                <div className="relative flex">
                  {/* Rotated niche strip */}
                  <div
                    aria-hidden="true"
                    className="relative w-12 sm:w-14 shrink-0 bg-pink text-ink overflow-hidden"
                  >
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 font-display font-black uppercase text-[40px] sm:text-[48px] leading-none whitespace-nowrap [writing-mode:vertical-rl] rotate-180 tracking-[-0.02em]">
                      {word} {word} {word} {word}
                    </span>
                  </div>
                  <div className="relative flex-1 aspect-[4/5] overflow-hidden bg-navy">
                    {cover && (
                      <img
                        src={cover}
                        alt=""
                        width={819}
                        height={1024}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                        style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
                      />
                    )}
                    <span className="absolute top-4 right-4 btn-tag btn-tag--light pointer-events-none">{c.highlightMetric}</span>
                  </div>
                </div>
                <div className="bg-paper text-ink px-4 sm:px-5 py-4 flex items-baseline justify-between gap-4 min-h-[88px]">
                  <span className="t-serif text-[24px] leading-[1.1]">{c.title}</span>
                  <span className="t-ui opacity-60 shrink-0 hidden sm:inline">Кейс {String(i + 1).padStart(2, '0')}</span>
                </div>
              </button>
            </li>
          )
        })}
      </Reveal>

      {openIdx !== null && (
        <CaseViewer caseIdx={openIdx} onClose={close} onCaseChange={setOpenIdx} onBook={handleBook} />
      )}
    </Section>
  )
}
