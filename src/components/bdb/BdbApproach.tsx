import React, { useEffect, useRef, useState } from 'react'
import { Plus } from 'lucide-react'
import { triggerHaptic } from '../../utils/haptics'
import { Reveal, Lines } from './ui/Reveal'
import { Section } from './ui/Section'
import { photo, type PhotoName } from './ui/media'
import { useReducedMotionPref } from './ui/motion'
import { useSmoothScroll } from '../../providers/SmoothScrollProvider'

interface ApproachItem {
  id: string
  number: string
  title: string
  headline: string
  desc: string
  tag: string
  metric: string
  photo: PhotoName
}

const APPROACH_ITEMS: ApproachItem[] = [
  {
    id: 'immersion',
    number: '01',
    title: 'ЗАНУРЕННЯ',
    headline: 'Глибоке занурення в бізнес',
    desc: 'Вивчаю ваш продукт, нішу, конкурентів, цільову аудиторію та особливості продажів. Мені важливо зрозуміти бізнес зсередини, а не діяти шаблонно.',
    tag: 'ДОСЛІДЖЕННЯ',
    metric: '5–7 днів дослідження ринку перед запуском',
    photo: 'desk-candles'
  },
  {
    id: 'analytics',
    number: '02',
    title: 'АНАЛІТИКА',
    headline: 'Аналітика замість припущень',
    desc: 'Спираюся на показники, дослідження та вимірювані результати. Аналізую, що працює, а що потребує змін. Кожне маркетингове рішення обґрунтоване цифрами.',
    tag: 'ДАНІ ТА СИСТЕМА',
    metric: 'Щотижневі зрізи CPA, CPL та чистого ROMI',
    photo: 'desk-starbucks'
  },
  {
    id: 'results',
    number: '03',
    title: 'РЕЗУЛЬТАТ',
    headline: 'Результат важливіший за охоплення',
    desc: 'Велика кількість переглядів не завжди означає ефективний маркетинг. Для мене важливі звернення, записи, замовлення та чистий прибуток вашого бізнесу.',
    tag: 'КОНВЕРСІЯ & ПРОДАЖІ',
    metric: 'Фокус на окупності кожної вкладеної гривні та долара',
    photo: 'desk-book'
  },
  {
    id: 'partnership',
    number: '04',
    title: 'ПАРТНЕРСТВО',
    headline: 'Партнерство, а не просто підряд',
    desc: 'Я зацікавлена в розвитку вашого бізнесу, тому залишаюся залученою в процеси, допомагаю знаходити рішення та завжди відкрита до прямого діалогу.',
    tag: 'ДОВГОСТРОКОВІСТЬ',
    metric: 'Є клієнти, з якими працюємо понад 1 рік поспіль',
    photo: 'cafe-pose'
  }
]

const N = APPROACH_ITEMS.length
const STEP_SVH = 55 // scroll distance per principle while the list is pinned

/**
 * 03 — Approach: four principles as full-width rows.
 * Desktop with motion: the list pins and the rows open one after another as
 * the page scrolls (the previous one closes). Pinning keeps the page from
 * jumping while panels change height. Elsewhere: a click/Enter accordion.
 */
export const BdbApproach: React.FC = () => {
  const reduced = useReducedMotionPref()
  const { lenis } = useSmoothScroll()
  const [wide, setWide] = useState(false)
  const pinned = wide && !reduced
  const [openId, setOpenId] = useState<string | null>(APPROACH_ITEMS[0].id)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setWide(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Scroll progress through the pinned track picks the open principle
  useEffect(() => {
    if (!pinned) return
    const track = trackRef.current
    if (!track) return
    let raf = 0
    const read = () => {
      raf = 0
      const travel = Math.max(1, track.offsetHeight - window.innerHeight)
      const p = Math.min(0.9999, Math.max(0, -track.getBoundingClientRect().top / travel))
      setOpenId(APPROACH_ITEMS[Math.floor(p * N)].id)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read)
    }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pinned])

  const toggle = (id: string) => {
    triggerHaptic('light')
    const track = trackRef.current
    if (pinned && track) {
      // Scroll to the middle of that principle's span; the scroll opens it
      const i = APPROACH_ITEMS.findIndex((it) => it.id === id)
      const travel = track.offsetHeight - window.innerHeight
      const top = track.getBoundingClientRect().top + window.scrollY + ((i + 0.5) / N) * travel
      if (lenis) lenis.scrollTo(top, { duration: 0.9 })
      else window.scrollTo({ top, behavior: 'smooth' })
      return
    }
    setOpenId((cur) => (cur === id ? null : id))
  }

  const list = (
    <ul className="wrap border-t border-ink/15">
      {APPROACH_ITEMS.map((item) => {
        const open = openId === item.id
        const panelId = `approach-panel-${item.id}`
        return (
          <li key={item.id} className="border-b border-ink/15">
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className={`group w-full grid grid-cols-12 gap-x-6 items-baseline text-left cursor-pointer ${
                  pinned ? 'py-[clamp(14px,2.2svh,28px)]' : 'py-6 sm:py-8'
                }`}
              >
                <span
                  className={`col-span-10 sm:col-span-7 t-display-m transition-[transform,opacity] duration-300 group-hover:translate-x-1.5 ${
                    pinned && !open ? 'opacity-35' : ''
                  }`}
                  style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
                >
                  {item.title}
                </span>
                <span className="hidden sm:block sm:col-span-4 t-serif opacity-80">{item.headline}</span>
                <span className="col-span-2 sm:col-span-1 flex justify-end">
                  <Plus
                    aria-hidden="true"
                    className={`w-6 h-6 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
                    style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
                  />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-label={item.headline}
              className="grid transition-[grid-template-rows] duration-[480ms]"
              style={{ gridTemplateRows: open ? '1fr' : '0fr', transitionTimingFunction: 'var(--ease-out-expo)' }}
              inert={!open}
            >
              <div className="overflow-hidden">
                <div className={`grid grid-cols-12 gap-x-6 gap-y-6 ${pinned ? 'pb-[clamp(16px,3svh,40px)]' : 'pb-10 sm:pb-14'}`}>
                  <figure
                    className={`m-0 col-span-12 sm:col-span-6 overflow-hidden bg-ink ${
                      pinned ? 'h-[clamp(160px,calc(100svh-580px),380px)]' : 'aspect-[4/3]'
                    }`}
                  >
                    <img
                      {...photo(item.photo)}
                      sizes="(min-width: 640px) 40vw, 100vw"
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className={`w-full h-full object-cover transition-transform duration-[1400ms] ${open ? 'scale-100' : 'scale-[1.1]'}`}
                      style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
                    />
                  </figure>
                  <div className="col-span-12 sm:col-span-5 sm:col-start-8 flex flex-col justify-between gap-6">
                    <div>
                      <p className="t-ui opacity-60">{item.tag}</p>
                      <p className="t-serif-l mt-4 sm:hidden">{item.headline}</p>
                      <p className={`mt-4 ${pinned ? 'text-[clamp(15px,1.25vw,19px)] leading-[1.45]' : 't-body-l'}`}>{item.desc}</p>
                    </div>
                    <p className="border-t border-ink/15 pt-4 t-ui">{item.metric}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )

  const header = (
    <Reveal className="wrap grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-8 items-end">
      <div className="lg:col-span-7">
        <h2 id="approach-title" className="t-display-m">
          <Lines lines={['Чотири принципи', 'роботи']} />
        </h2>
      </div>
      <p className="fade-up lg:col-span-4 lg:col-start-9 t-serif" style={{ ['--i' as string]: 2 } as React.CSSProperties}>
        Кожне рішення має бути обґрунтованим і працювати на конкретну бізнес-ціль.
      </p>
    </Reveal>
  )

  if (!pinned) {
    return (
      <Section id="approach" theme="paper" labelledBy="approach-title" className="section-y">
        {header}
        <div className="mt-16 sm:mt-24">{list}</div>
      </Section>
    )
  }

  return (
    <Section id="approach" theme="paper" labelledBy="approach-title" style={{ paddingTop: 'var(--section-y)' }}>
      {header}
      <div ref={trackRef} className="relative mt-16" style={{ height: `calc(100svh + ${N * STEP_SVH}svh)` }}>
        <div
          className="sticky top-0 h-[100svh] flex flex-col justify-center overflow-hidden"
          style={{ paddingTop: 'var(--header-h)' }}
        >
          {list}
        </div>
      </div>
    </Section>
  )
}
