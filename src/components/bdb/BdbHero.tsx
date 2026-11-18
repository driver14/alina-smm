import React, { useRef, useState, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import { triggerHaptic } from '../../utils/haptics'
import { Reveal, Lines } from './ui/Reveal'

interface BdbHeroProps {
  onOpenBooking: () => void
}

const HERO_PHOTOS = [
  { src: '/photos/alina-flowers.jpg', alt: 'Аліна Волошина з букетом квітів' },
  { src: '/photos/alina-editorial.jpg', alt: 'Аліна Волошина — редакційний портрет' },
  { src: '/photos/alina-barcelona.jpg', alt: 'Аліна Волошина в Барселоні' },
  { src: '/photos/alina-work-process.jpg', alt: 'Аліна Волошина за роботою над стратегією' },
]

const FACTS = ['3 ринки: США • Європа • Україна', '3+ роки в SMM', '1 власна команда', 'ROMI до 10.2x']

const MARQUEE_ITEMS = [
  'SMM-стратегія',
  'Таргетована реклама',
  'Маркетингова система',
  'Власна команда спеціалістів',
  'Довгострокове партнерство',
  'Результат замість припущень',
]

export const BdbHero: React.FC<BdbHeroProps> = ({ onOpenBooking }) => {
  const reelRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [userPaused, setUserPaused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [inView, setInView] = useState(true)

  // Pause the drift while the reel is off-screen
  useEffect(() => {
    const el = reelRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const isRunning = !prefersReducedMotion && !userPaused && !isHovered && inView

  const handleCta = () => {
    triggerHaptic('medium')
    onOpenBooking()
  }

  // Two identical sets + translateY(-50%) = seamless loop at any item height
  const displayPhotos = [...HERO_PHOTOS, ...HERO_PHOTOS]

  return (
    <section
      id="hero"
      data-theme="accent"
      aria-labelledby="hero-title"
      className="surface-pink relative flex flex-col lg:min-h-[100svh]"
      style={{ paddingTop: 'var(--header-h)' }}
    >
      <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-12">
        {/* Copy */}
        <Reveal className="wrap lg:col-span-9 flex flex-col justify-between gap-12 pt-8 sm:pt-12 lg:pt-10 pb-12 lg:pb-14">
          <h1
            id="hero-title"
            className="font-display font-black uppercase text-ink leading-[0.86] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(44px, 6.3vw, 104px)' }}
          >
            <Lines
              lines={[
                'Не просто веду',
                'соціальні мережі.',
                'Будую маркетингову',
                <>
                  <span className="t-mix">Систему®</span> для бізнесу.
                </>,
              ]}
            />
          </h1>

          <div className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end max-w-[880px]">
            <div className="fade-up space-y-3 max-w-[520px]" style={{ ['--i' as string]: 4 } as React.CSSProperties}>
              <p className="t-body-l font-medium">
                SMM-стратегія, контент і таргетована реклама для бізнесів та експертів у США, Європі й Україні.
              </p>
              <p className="text-[15px] leading-[1.45] opacity-75">
                Об’єдную маркетинг, аналітику та командну роботу, щоб перетворювати соціальні мережі на ефективний
                інструмент залучення клієнтів.
              </p>
            </div>

            <div className="fade-up flex flex-wrap items-center gap-x-6 gap-y-4" style={{ ['--i' as string]: 5 } as React.CSSProperties}>
              <button type="button" onClick={handleCta} className="btn-tag btn-tag--lg">
                Отримати стратегічний розбір
              </button>
              <a href="https://t.me/smmbyvlsh" target="_blank" rel="noopener noreferrer" className="t-ui link-u">
                Telegram ↗
              </a>
            </div>
          </div>
        </Reveal>

        {/* Edge-to-edge editorial photo reel */}
        <figure
          ref={reelRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Фотографії Аліни Волошиної"
          className="relative m-0 lg:col-span-3 h-[72svh] min-h-[420px] lg:h-auto lg:min-h-0 overflow-hidden bg-ink"
        >
          <div className="reel-track absolute inset-x-0 top-0 flex flex-col" data-running={isRunning ? 'true' : 'false'}>
            {displayPhotos.map((photo, i) => (
              <div
                key={i}
                aria-hidden={i >= HERO_PHOTOS.length ? true : undefined}
                className="relative w-full aspect-[4/5] shrink-0 overflow-hidden"
              >
                <img
                  src={photo.src}
                  alt={i >= HERO_PHOTOS.length ? '' : photo.alt}
                  width={800}
                  height={1000}
                  decoding="async"
                  fetchPriority={i === 0 ? 'high' : undefined}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {!prefersReducedMotion && (
            <button
              type="button"
              onClick={() => {
                triggerHaptic('light')
                setUserPaused((p) => !p)
              }}
              aria-pressed={userPaused}
              aria-label={userPaused ? 'Відновити рух фотографій' : 'Зупинити рух фотографій'}
              className="btn-tag btn-tag--light absolute left-4 bottom-4 z-10 !text-[13px]"
            >
              {userPaused ? <Play className="w-3 h-3" aria-hidden="true" /> : <Pause className="w-3 h-3" aria-hidden="true" />}
              {userPaused ? 'Play' : 'Stop'}
            </button>
          )}
        </figure>
      </div>

      {/* Facts strip + marquee */}
      <div className="border-t border-ink/20">
        <ul className="wrap grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-2 py-4 t-ui">
          {FACTS.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <div className="border-t border-ink/20 overflow-hidden py-3 bg-ink text-pink" aria-hidden="true">
          <div className="marquee">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0">
                {MARQUEE_ITEMS.map((item) => (
                  <span key={item} className="font-display font-extrabold uppercase text-[22px] leading-none px-6 whitespace-nowrap">
                    {item}
                    <span className="t-mix font-normal pl-12">/</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
