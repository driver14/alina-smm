import React, { useEffect, useRef, useState } from 'react'
import { Reveal, Lines } from './ui/Reveal'
import { Section, Kicker } from './ui/Section'

const STEPS = [
  {
    num: '01',
    title: 'Безкоштовний аудит',
    desc: 'Знайомлюся з вашим бізнесом і соціальними мережами, аналізую поточну ситуацію, визначаю сильні сторони та точки зростання. Ділюся своїм баченням розвитку проєкту.',
    stage: 'ЗНАЙОМСТВО & АУДИТ'
  },
  {
    num: '02',
    title: 'Брифінг',
    desc: 'Детальніше знайомимося з бізнесом, обговорюємо цілі, завдання, особливості продукту та очікування від співпраці.',
    stage: 'СИНХРОНІЗАЦІЯ ЦІЛЕЙ'
  },
  {
    num: '03',
    title: 'Розробка стратегії',
    desc: 'Проводжу необхідні дослідження та формую індивідуальну маркетингову стратегію для вашого бізнесу.',
    stage: 'СТРАТЕГІЧНИЙ ПЛАН'
  },
  {
    num: '04',
    title: 'Реалізація',
    desc: 'Переходимо до роботи за погодженим планом. Команда виконує поставлені завдання, а я координую процеси та контролюю якість.',
    stage: 'КОМАНДНА РОБОТА'
  },
  {
    num: '05',
    title: 'Аналітика та оптимізація',
    desc: 'Регулярно аналізуємо показники, оцінюємо ефективність рішень і вдосконалюємо стратегію для максимальної окупності.',
    stage: 'ОЦІНКА РЕЗУЛЬТАТІВ'
  }
]

/** 09 — Process: vertical timeline; the rail fills and numbers ink in as you scroll. */
export const BdbProcess: React.FC = () => {
  const listRef = useRef<HTMLOListElement>(null)
  const railRef = useRef<HTMLSpanElement>(null)
  const [reached, setReached] = useState(-1)

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    let frame = 0
    const update = () => {
      frame = 0
      const rect = list.getBoundingClientRect()
      const mid = window.innerHeight * 0.55
      const p = Math.min(1, Math.max(0, (mid - rect.top) / Math.max(1, rect.height)))
      if (railRef.current) railRef.current.style.transform = `scaleY(${p})`
      const items = Array.from(list.children) as HTMLElement[]
      let idx = -1
      items.forEach((el, i) => {
        if (el.getBoundingClientRect().top < mid) idx = i
      })
      setReached((prev) => (prev === idx ? prev : idx))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <Section id="process" theme="paper" labelledBy="process-title" className="section-y">
      <div className="wrap grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-16">
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky" style={{ top: 'calc(var(--header-h) + 40px)' }}>
            <Kicker index="09" className="mb-8">
              Як відбувається співпраця
            </Kicker>
            <h2 id="process-title">
              <span className="t-display block">
                <Lines lines={['Зрозумілий', 'процес']} />
              </span>
              <span className="t-serif-xl block mt-2">
                <Lines start={2} lines={['від знайомства', 'до результату.']} />
              </span>
            </h2>
            <p className="fade-up t-ui opacity-60 mt-10" style={{ ['--i' as string]: 4 } as React.CSSProperties}>
              Прозорість та зрозумілість на кожному етапі
            </p>
          </div>
        </Reveal>

        <div className="lg:col-span-7 relative">
          <span aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-px bg-ink/15" />
          <span
            ref={railRef}
            aria-hidden="true"
            className="absolute left-0 top-0 bottom-0 w-[2px] -ml-px bg-ink origin-top"
            style={{ transform: 'scaleY(0)' }}
          />
          <ol ref={listRef} className="space-y-16 sm:space-y-24">
            {STEPS.map((step, i) => {
              const on = i <= reached
              return (
                <li key={step.num} className="pl-8 sm:pl-14 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-10 gap-y-4">
                  <span
                    className={`font-display font-black leading-[0.8] tracking-[-0.04em] transition-colors duration-500 ${on ? 'text-ink' : 'text-ink/15'}`}
                    style={{ fontSize: 'clamp(88px, 10vw, 160px)' }}
                  >
                    {step.num}
                  </span>
                  <div className="sm:pt-3">
                    <p className="t-ui opacity-60">{step.stage}</p>
                    <h3 className="t-display-m mt-3">{step.title}</h3>
                    <p className="t-body-l mt-4 opacity-80 max-w-[520px]">{step.desc}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </Section>
  )
}
