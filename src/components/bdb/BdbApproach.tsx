import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { triggerHaptic } from '../../utils/haptics'
import { Reveal, Lines } from './ui/Reveal'
import { Section, Kicker } from './ui/Section'

interface ApproachItem {
  id: string
  number: string
  title: string
  headline: string
  desc: string
  tag: string
  metric: string
  photo: string
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
    photo: '/photos/alina-work-process.jpg'
  },
  {
    id: 'analytics',
    number: '02',
    title: 'АНАЛІТИКА',
    headline: 'Аналітика замість припущень',
    desc: 'Спираюся на показники, дослідження та вимірювані результати. Аналізую, що працює, а що потребує змін. Кожне маркетингове рішення обґрунтоване цифрами.',
    tag: 'ДАНІ ТА СИСТЕМА',
    metric: 'Щотижневі зрізи CPA, CPL та чистого ROMI',
    photo: '/photos/alina-editorial.jpg'
  },
  {
    id: 'results',
    number: '03',
    title: 'РЕЗУЛЬТАТ',
    headline: 'Результат важливіший за охоплення',
    desc: 'Велика кількість переглядів не завжди означає ефективний маркетинг. Для мене важливі звернення, записи, замовлення та чистий прибуток вашого бізнесу.',
    tag: 'КОНВЕРСІЯ & ПРОДАЖІ',
    metric: 'Фокус на окупності кожної вкладеної гривні та долара',
    photo: '/photos/alina-flowers.jpg'
  },
  {
    id: 'partnership',
    number: '04',
    title: 'ПАРТНЕРСТВО',
    headline: 'Партнерство, а не просто підряд',
    desc: 'Я зацікавлена в розвитку вашого бізнесу, тому залишаюся залученою в процеси, допомагаю знаходити рішення та завжди відкрита до прямого діалогу.',
    tag: 'ДОВГОСТРОКОВІСТЬ',
    metric: 'Є клієнти, з якими працюємо понад 1 рік поспіль',
    photo: '/photos/alina-barcelona.jpg'
  }
]

/** 03 — Approach: four principles as full-width rows that open on click/Enter. */
export const BdbApproach: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('immersion')

  const toggle = (id: string) => {
    triggerHaptic('light')
    setOpenId((cur) => (cur === id ? null : id))
  }

  return (
    <Section id="approach" theme="paper" labelledBy="approach-title" className="section-y">
      <Reveal className="wrap grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-8 items-end">
        <div className="lg:col-span-7">
          <Kicker index="03" className="mb-8">
            Мій підхід
          </Kicker>
          <h2 id="approach-title" className="t-display">
            <Lines lines={['Чотири принципи', 'роботи']} />
          </h2>
        </div>
        <p className="fade-up lg:col-span-4 lg:col-start-9 t-serif" style={{ ['--i' as string]: 2 } as React.CSSProperties}>
          Кожне рішення має бути обґрунтованим і працювати на конкретну бізнес-ціль.
        </p>
      </Reveal>

      <ul className="wrap mt-16 sm:mt-24 border-t border-ink/15">
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
                  className="group w-full grid grid-cols-12 gap-x-6 items-baseline py-6 sm:py-8 text-left cursor-pointer"
                >
                  <span className="col-span-2 sm:col-span-1 t-ui opacity-60">{item.number}</span>
                  <span className="col-span-8 sm:col-span-6 t-display-m transition-transform duration-500 group-hover:translate-x-2" style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}>
                    {item.title}
                  </span>
                  <span className="hidden sm:block sm:col-span-4 t-serif opacity-80">{item.headline}</span>
                  <span className="col-span-2 sm:col-span-1 flex justify-end">
                    <Plus
                      aria-hidden="true"
                      className={`w-6 h-6 transition-transform duration-500 ${open ? 'rotate-45' : ''}`}
                      style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
                    />
                  </span>
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-label={item.headline}
                className="grid transition-[grid-template-rows] duration-700"
                style={{ gridTemplateRows: open ? '1fr' : '0fr', transitionTimingFunction: 'var(--ease-out-expo)' }}
                inert={!open}
              >
                <div className="overflow-hidden">
                  <div className="grid grid-cols-12 gap-x-6 gap-y-6 pb-10 sm:pb-14">
                    <figure className="m-0 col-span-12 sm:col-span-5 sm:col-start-2 aspect-[4/3] overflow-hidden bg-ink">
                      <img
                        src={item.photo}
                        alt=""
                        width={800}
                        height={600}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </figure>
                    <div className="col-span-12 sm:col-span-5 sm:col-start-8 flex flex-col justify-between gap-8">
                      <div>
                        <p className="t-ui opacity-60">{item.tag}</p>
                        <p className="t-serif-l mt-4 sm:hidden">{item.headline}</p>
                        <p className="t-body-l mt-5">{item.desc}</p>
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
    </Section>
  )
}
