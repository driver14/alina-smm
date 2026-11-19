import React, { useState, useRef, useEffect, useCallback } from 'react'
import { triggerHaptic } from '../../utils/haptics'
import { Section } from './ui/Section'
import { useReducedMotionPref } from './ui/motion'
import { useSmoothScroll } from '../../providers/SmoothScrollProvider'
import { LazyVideo } from './ui/LazyVideo'
import { photo, type PhotoName } from './ui/media'

interface BdbInteractiveWheelProps {
  onOpenBooking: (service?: string, note?: string) => void
}

type VectorMedia = { kind: 'photo'; name: PhotoName; alt: string } | { kind: 'video'; src: string; poster: string }

interface WheelItem {
  id: string
  label: string
  headline: string
  desc: string
  tag: string
  media: VectorMedia
}

const WHEEL_ITEMS: WheelItem[] = [
  {
    id: 'strategy',
    label: 'СТРАТЕГІЯ',
    headline: 'SMM — це маркетинг, а не контент заради контенту.',
    desc: 'Вивчаю ваш продукт, нішу, конкурентів, цільову аудиторію та особливості продажів. Формую позиціонування, УТП, Tone of Voice та шлях клієнта до покупки.',
    tag: 'ФУНДАМЕНТ БРЕНДУ',
    media: { kind: 'video', src: '/media/video/night-mindmap.mp4', poster: '/media/video/night-mindmap.webp' },
  },
  {
    id: 'marketing',
    label: 'МАРКЕТИНГ',
    headline: 'Маркетингова система, яка працює на розвиток і продажі.',
    desc: 'Об’єдную маркетинг, аналітику та командну роботу, щоб перетворювати соціальні мережі на ефективний і прогнозований інструмент залучення платоспроможних клієнтів.',
    tag: 'СИСТЕМНИЙ ПІДХІД',
    media: { kind: 'photo', name: 'desk-notion', alt: 'Матриця контенту в Notion на ноутбуці' },
  },
  {
    id: 'content',
    label: 'КОНТЕНТ',
    headline: 'Сенсовий візуал та естетика, яка закохує аудиторію.',
    desc: 'Контент виходить регулярно та приносить звернення. Від професійного продакшну та сценаріїв Reels до щоденних сторітелінгів, що захищають високу маржинальність бренду.',
    tag: 'REELS & PRODUCTION',
    media: { kind: 'photo', name: 'desk-roses', alt: 'Робоче місце з ноутбуком, трояндами та свічкою' },
  },
  {
    id: 'target',
    label: 'ТАРГЕТ',
    headline: 'Керована генерація заявок без зливу бюджету.',
    desc: 'Розробка рекламної стратегії, налаштування, запуск, спліт-тестування та щотижнева оптимізація кампаній у США, Європі та Україні. Підтверджений ROMI до 10.2X.',
    tag: 'META ADS ACQUISITION',
    media: { kind: 'photo', name: 'desk-terrazzo', alt: 'Ноутбук і кава на столику в кав’ярні' },
  },
  {
    id: 'analytics',
    label: 'АНАЛІТИКА',
    headline: 'Аналітика замість припущень та здогадок.',
    desc: 'Спираюся на показники, дослідження та конкретні цифри. Прозорі звіти, відстеження вартості ліда (CPA), конверсії посадкової сторінки та чистого прибутку бізнесу.',
    tag: 'DATA-FIRST MANAGEMENT',
    media: { kind: 'video', src: '/media/video/night-analytics.mp4', poster: '/media/video/night-analytics.webp' },
  },
  {
    id: 'sales',
    label: 'ПРОДАЖІ',
    headline: 'Результат важливіший за порожні перегляди.',
    desc: 'Велика кількість переглядів не завжди означає ефективний маркетинг. Для мене першочерговими є цільові звернення, записи на консультації, замовлення та чисті продажі.',
    tag: 'ОКУПНІСТЬ & ПРИБУТОК',
    media: { kind: 'photo', name: 'desk-matcha', alt: 'Робота над SMM-стратегією в кав’ярні' },
  },
]

const N = WHEEL_ITEMS.length
const THETA = 22 // degrees between words on the cylinder
const STEP_SVH = 60 // scroll distance per vector while pinned
const TURN_MS = 720 // duration of one word-to-word turn
const GESTURE_GAP_MS = 180 // wheel silence that ends a gesture (covers trackpad inertia tails)
const SNAP_IDLE_MS = 140 // settle time before touch/scrollbar scrolling magnetises to a word
const SNAP_INTENT = 0.2 // share of a step that counts as "go to the next word"
const pad = (n: number) => String(n).padStart(2, '0')

/** Detent ease: quick departure, firm arrival with a ~2% overshoot (ease-out-back, soft). */
function detent(t: number) {
  const c1 = 0.7
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}

/** True while the sticky stage fully covers the viewport. */
function isEngaged(section: HTMLElement) {
  const r = section.getBoundingClientRect()
  return r.top <= 1 && r.bottom >= window.innerHeight - 1
}

/** Continuous word index (0…N-1) from the pinned section's scroll progress. */
function rawIndex(section: HTMLElement) {
  const travel = Math.max(1, section.offsetHeight - window.innerHeight)
  const p = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / travel))
  return Math.min(N - 1, Math.max(0, p * N - 0.5))
}

/** Document scroll position at which word `idx` sits centred in the window. */
function indexTop(section: HTMLElement, idx: number) {
  const travel = section.offsetHeight - window.innerHeight
  return section.getBoundingClientRect().top + window.scrollY + ((idx + 0.5) / N) * travel
}

/** Photo or clip for one vector; `active` controls video playback. */
const VectorMediaView: React.FC<{ media: VectorMedia; active: boolean; sizes: string }> = ({ media, active, sizes }) =>
  media.kind === 'video' ? (
    <LazyVideo src={media.src} poster={media.poster} active={active} className="w-full h-full object-cover" />
  ) : (
    <img {...photo(media.name)} sizes={sizes} alt={media.alt} loading="lazy" decoding="async" className="w-full h-full object-cover" />
  )

/**
 * 02.6 — System vectors.
 * Desktop with motion: a pinned stage. Left, a real CSS-3D word cylinder that
 * turns one word per wheel/key gesture (hard snap, detent tween via refs).
 * Middle, a media stage that wipes in per vector. Right, the detail.
 * Mobile / reduced motion: a swipeable rail of cards. Native scroll always.
 */
export const BdbInteractiveWheel: React.FC<BdbInteractiveWheelProps> = ({ onOpenBooking }) => {
  const reduced = useReducedMotionPref()
  const { lenis } = useSmoothScroll()
  const [wide, setWide] = useState(false)
  const pinned = wide && !reduced

  const [active, setActive] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const activeRef = useRef(0)

  const sectionRef = useRef<HTMLElement>(null)
  const drumRef = useRef<HTMLUListElement>(null)
  const wordRefs = useRef<(HTMLLIElement | null)[]>([])
  const railRef = useRef<HTMLUListElement>(null)
  const [radius, setRadius] = useState(260)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setWide(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const commit = useCallback((idx: number) => {
    if (idx === activeRef.current) return
    setPrev(activeRef.current)
    activeRef.current = idx
    setActive(idx)
  }, [])

  // Cylinder radius from the rendered row height
  useEffect(() => {
    if (!pinned) return
    const measure = () => {
      const row = wordRefs.current[0]?.offsetHeight ?? 100
      setRadius(row / (2 * Math.tan(((THETA / 2) * Math.PI) / 180)))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [pinned])

  // Stepped rotation: the scroll position picks a whole word; the drum never
  // shows an in-between state, it tweens from word to word with a detent ease.
  useEffect(() => {
    if (!pinned) return
    const section = sectionRef.current
    if (!section) return
    let raf = 0
    let running = false
    let to = Math.round(rawIndex(section))
    let from = to
    let current = to
    let t0 = 0
    let dur = TURN_MS

    const paint = () => {
      if (drumRef.current) drumRef.current.style.transform = `translateZ(${-radius}px) rotateX(${current * THETA}deg)`
      wordRefs.current.forEach((el, i) => {
        if (!el) return
        const d = Math.abs(i - current)
        const facing = d * THETA < 80
        el.style.opacity = facing ? String(0.07 + 0.93 * Math.exp(-d * 1.35)) : '0'
      })
    }

    const tick = (now: number) => {
      const want = Math.round(rawIndex(section))
      if (want !== to) {
        from = current
        to = want
        t0 = now
        dur = TURN_MS * Math.min(1.6, Math.max(1, Math.sqrt(Math.abs(to - from))))
        commit(to) // media + detail start with the turn, not after it
      }
      const k = Math.min(1, (now - t0) / dur)
      current = k >= 1 ? to : from + (to - from) * detent(k)
      paint()
      raf = running ? requestAnimationFrame(tick) : 0
    }

    const io = new IntersectionObserver(([e]) => {
      running = e.isIntersecting
      if (running && !raf) raf = requestAnimationFrame(tick)
    })
    io.observe(section)
    paint()
    commit(to)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [pinned, radius, commit])

  const scrollToY = useCallback(
    (top: number) => {
      if (lenis) lenis.scrollTo(top, { duration: 0.7, easing: (t: number) => 1 - Math.pow(1 - t, 3) })
      else window.scrollTo({ top, behavior: 'smooth' })
    },
    [lenis],
  )

  // Instant scroll to a word's position. The stage is sticky, so the jump is
  // invisible; the drum tween above provides the motion.
  const jumpTo = useCallback(
    (section: HTMLElement, idx: number) => {
      const top = indexTop(section, idx)
      if (lenis) lenis.scrollTo(top, { immediate: true, force: true })
      else window.scrollTo(0, top)
    },
    [lenis],
  )

  // Hard snap for wheel / trackpad / keys: one gesture = exactly one word.
  // At the first and last word a fresh gesture is released to the page.
  useEffect(() => {
    if (!pinned) return
    let lastWheel = 0
    let prevAbs = 0
    let lockUntil = 0
    let released = false // current gesture was handed back to the page at an end word

    const onWheel = (e: WheelEvent) => {
      const section = sectionRef.current
      if (!section || e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return
      const now = performance.now()
      const abs = Math.abs(e.deltaY)
      // New gesture: after a pause, or a clear rise over a decaying inertia tail
      const fresh = now - lastWheel > GESTURE_GAP_MS || abs > prevAbs * 1.5 + 4
      lastWheel = now
      prevAbs = abs
      if (fresh) released = false
      if (released || !isEngaged(section)) return // a released gesture belongs to the page, whole
      const dir = Math.sign(e.deltaY)
      const cur = Math.round(rawIndex(section))
      const next = cur + dir
      if ((next < 0 || next > N - 1) && fresh && now >= lockUntil) {
        released = true // exit the section: let this gesture scroll the page
        return
      }
      e.preventDefault()
      e.stopImmediatePropagation() // keep Lenis from also moving the page
      if (!fresh || now < lockUntil || next < 0 || next > N - 1) {
        // Swallow the tail of this gesture; also cancel any leftover momentum
        if (now >= lockUntil && Math.abs(window.scrollY - indexTop(section, cur)) > 1) jumpTo(section, cur)
        return
      }
      lockUntil = now + TURN_MS * 0.8
      jumpTo(section, next)
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return
      const t = e.target as HTMLElement | null
      if (t?.closest('input, textarea, select, [contenteditable="true"], [role="dialog"]')) return
      let dir = 0
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) dir = 1
      else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) dir = -1
      if (!dir || (e.key === ' ' && t?.closest('button, a'))) return
      const section = sectionRef.current
      if (!section || !isEngaged(section)) return
      const next = Math.round(rawIndex(section)) + dir
      if (next < 0 || next > N - 1) return
      e.preventDefault()
      const now = performance.now()
      if (now < lockUntil) return
      lockUntil = now + TURN_MS * 0.6
      jumpTo(section, next)
    }

    window.addEventListener('wheel', onWheel, { passive: false, capture: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('wheel', onWheel, { capture: true })
      window.removeEventListener('keydown', onKey)
    }
  }, [pinned, jumpTo])

  // Magnet for touch / scrollbar: when scrolling settles between two words,
  // glide to one so the stage never rests off a word position.
  useEffect(() => {
    if (!pinned) return
    let timer = 0
    let rest = -1 // word the drum last came to rest on
    const settle = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      if (rect.top > 0 || rect.bottom < window.innerHeight) {
        rest = -1 // not pinned: leave the page alone
        return
      }
      // Past the first or last word the page is on its way in/out: leave it alone
      const travel = Math.max(1, section.offsetHeight - window.innerHeight)
      const unclamped = (-rect.top / travel) * N - 0.5
      if (unclamped < 0 || unclamped > N - 1) return
      const raw = rawIndex(section)
      // Direction-aware: a deliberate nudge (> SNAP_INTENT of a step) carries on
      // to the next word in that direction; a tiny one falls back.
      let idx = Math.round(raw)
      if (rest >= 0) {
        const delta = raw - rest
        if (delta > SNAP_INTENT) idx = Math.ceil(raw - SNAP_INTENT)
        else if (delta < -SNAP_INTENT) idx = Math.floor(raw + SNAP_INTENT)
      }
      idx = Math.min(N - 1, Math.max(0, idx))
      rest = idx
      const top = indexTop(section, idx)
      if (Math.abs(top - window.scrollY) > 2) scrollToY(top)
    }
    const onScroll = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(settle, SNAP_IDLE_MS)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [pinned, scrollToY])

  // Mobile rail: the card most in view is active
  useEffect(() => {
    if (pinned) return
    const rail = railRef.current
    if (!rail || typeof IntersectionObserver === 'undefined') return
    const visible = new Set<number>()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const idx = Number((e.target as HTMLElement).dataset.index)
          if (e.isIntersecting) visible.add(idx)
          else visible.delete(idx)
        })
        if (visible.size) commit(Math.min(...visible))
      },
      { root: rail, threshold: 0.6 },
    )
    Array.from(rail.children).forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [pinned, commit])

  const goTo = (idx: number) => {
    triggerHaptic('light')
    if (pinned && sectionRef.current) {
      jumpTo(sectionRef.current, idx)
    } else {
      const card = railRef.current?.children[idx] as HTMLElement | undefined
      card?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', inline: 'start', block: 'nearest' })
      commit(idx)
    }
  }

  const book = (item: WheelItem) => {
    triggerHaptic('medium')
    onOpenBooking(`Стратегічний розбір: ${item.label}`, `Запит через систему векторів: ${item.label} — ${item.headline}`)
  }

  const item = WHEEL_ITEMS[active]

  const header = (
    <div className="wrap flex items-end justify-between gap-6">
      <div>
        <h2 id="wheel-title" className="t-display-m">
          Ключові вектори системи
        </h2>
      </div>
      <div className="flex flex-col items-end gap-3 shrink-0">
        <p className="font-display font-black text-[clamp(28px,2.6vw,40px)] leading-none tabular-nums">
          {pad(active + 1)}
          <span className="opacity-30"> / {pad(N)}</span>
        </p>
        <div className="flex gap-1.5" role="group" aria-label="Вектори системи">
          {WHEEL_ITEMS.map((it, i) => (
            <button
              key={it.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Вектор ${pad(i + 1)}: ${it.label}`}
              aria-current={i === active ? 'step' : undefined}
              className="group relative h-6 w-7 cursor-pointer"
            >
              <span
                aria-hidden="true"
                className={`absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 transition-colors duration-500 ${
                  i === active ? 'bg-pink' : 'bg-paper/25 group-hover:bg-paper/60'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  if (!pinned) {
    return (
      <Section id="wheel" theme="ink" labelledBy="wheel-title" ref={sectionRef} className="section-y">
        {header}
        <ul
          ref={railRef}
          className="no-scrollbar mt-10 flex gap-4 overflow-x-auto snap-x snap-mandatory px-[var(--gutter)] scroll-px-[var(--gutter)] pb-2"
          aria-label="Ключові вектори системи"
        >
          {WHEEL_ITEMS.map((it, i) => (
            <li key={it.id} data-index={i} className="snap-start shrink-0 w-[82vw] max-w-[420px] flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden bg-navy">
                <VectorMediaView media={it.media} active={i === active} sizes="82vw" />
                <span className="absolute left-3 top-3 btn-tag btn-tag--light !text-[12px] pointer-events-none">
                  {pad(i + 1)} / {pad(N)}
                </span>
              </div>
              <h3 className="mt-6 font-display font-black uppercase leading-[0.9] tracking-[-0.03em] text-[clamp(40px,11vw,56px)]">
                {it.label}
              </h3>
              <p className="t-ui text-pink mt-4">{it.tag}</p>
              <p className="t-serif text-[22px] leading-[1.15] mt-3">{it.headline}</p>
              <p className="mt-4 text-[15px] leading-[1.5] opacity-75">{it.desc}</p>
              <div className="mt-6">
                <button type="button" onClick={() => book(it)} className="btn-tag btn-tag--light">
                  Отримати стратегію
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    )
  }

  return (
    <Section
      id="wheel"
      theme="ink"
      labelledBy="wheel-title"
      ref={sectionRef}
      style={{ height: `calc(100svh + ${N * STEP_SVH}svh)` }}
    >
      <div className="sticky top-0 h-[100svh] flex flex-col overflow-hidden" style={{ paddingTop: 'calc(var(--header-h) + 28px)' }}>
        {header}

        <div className="wrap flex-1 min-h-0 grid grid-cols-12 gap-x-6 items-center pb-10">
          {/* 3D cylinder */}
          <div
            className="col-span-6 relative h-full"
            style={{
              perspective: '1400px',
              maskImage: 'linear-gradient(to bottom, transparent 0%, #000 24%, #000 76%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, #000 24%, #000 76%, transparent 100%)',
            }}
          >
            {/* Selection window */}
            <div aria-hidden="true" className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none" style={{ height: 'var(--drum-row)' }}>
              <span className="drum-rule absolute inset-x-0 top-0" />
              <span className="drum-rule absolute inset-x-0 bottom-0" />
            </div>

            <ul
              ref={drumRef}
              className="absolute inset-0"
              style={{ transformStyle: 'preserve-3d', transform: `translateZ(${-radius}px)`, willChange: 'transform' }}
            >
              {WHEEL_ITEMS.map((it, i) => (
                <li
                  key={it.id}
                  ref={(el) => {
                    wordRefs.current[i] = el
                  }}
                  className="absolute inset-x-0 top-1/2 flex items-center"
                  style={{
                    height: 'var(--drum-row)',
                    marginTop: 'calc(var(--drum-row) / -2)',
                    transform: `rotateX(${-i * THETA}deg) translateZ(${radius}px)`,
                    backfaceVisibility: 'hidden',
                    opacity: i === 0 ? 1 : 0.3,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-pressed={i === active}
                    className="block w-full text-left font-display font-black uppercase tracking-[-0.03em] leading-none text-paper cursor-pointer"
                    style={{ fontSize: 'calc(var(--drum-row) * 0.92)' }}
                  >
                    {it.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Media stage */}
          <div className="col-span-3 relative w-full h-[min(64svh,640px)] overflow-hidden bg-navy">
            {WHEEL_ITEMS.map((it, i) => (
              <div key={it.id} className="vec-layer" data-state={i === active ? 'active' : i === prev ? 'prev' : 'idle'}>
                <VectorMediaView media={it.media} active={i === active} sizes="(min-width: 1024px) 25vw, 82vw" />
              </div>
            ))}
          </div>

          {/* Detail */}
          <div className="col-span-3 self-center" aria-live="polite">
            <div key={item.id} className="swap-in">
              <p className="t-ui text-pink">{item.tag}</p>
              <h3 className="t-serif text-[clamp(24px,2vw,32px)] leading-[1.1] mt-4" style={{ ['--i' as string]: 1 } as React.CSSProperties}>
                {item.headline}
              </h3>
              <p className="mt-5 text-[15px] leading-[1.55] opacity-75" style={{ ['--i' as string]: 2 } as React.CSSProperties}>
                {item.desc}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3" style={{ ['--i' as string]: 3 } as React.CSSProperties}>
                <button type="button" onClick={() => book(item)} className="btn-tag btn-tag--light">
                  Отримати стратегію
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
