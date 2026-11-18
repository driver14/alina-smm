import React from 'react'
import { Reveal, Lines } from './ui/Reveal'
import { Section, Kicker } from './ui/Section'

const STEPS = [
  {
    number: '01',
    title: 'Бізнес та цілі',
    desc: 'Знайомлюся з вашим бізнесом, продуктом, послугами та цілями. Визначаємо поточну ситуацію, бажаний результат і ключові показники ефективності.',
    stage: 'АУДИТ ТА ЦІЛІ',
    deliverables: ['Аналіз поточної воронки', 'Визначення фінансових KPI', 'Синхронізація очікувань']
  },
  {
    number: '02',
    title: 'Аналітика та дослідження',
    desc: 'Аналізую цільову аудиторію, конкурентів, ринок, сильні сторони бізнесу та точки зростання. Жодних здогадок — лише оцифровані факти.',
    stage: 'АНАЛІТИКА РИНКУ',
    deliverables: ['Карта конкурентів', 'Сегментація платоспроможної ЦА', 'Пошук невидимих точок росту']
  },
  {
    number: '03',
    title: 'Маркетингова стратегія',
    desc: 'Формую позиціонування, унікальну торгову пропозицію, Tone of Voice, комунікаційну стратегію, контентну систему та шлях клієнта до покупки.',
    stage: 'АРХІТЕКТУРА ВОРОНКИ',
    deliverables: ['Формування УТП бренду', 'Сценарії конверсії в Direct', 'Календарний план запусків']
  },
  {
    number: '04',
    title: 'Реалізація та оптимізація',
    desc: 'Переходимо до роботи з контентом і рекламою. Аналізуємо результати, тестуємо гіпотези та коригуємо стратегію відповідно до показників.',
    stage: 'ЗАПУСК ТА ОПТИМІЗАЦІЯ',
    deliverables: ['Запуск рекламних зв’язок', 'Щотижнева оптимізація CPA', 'Регулярні аналітичні звіти']
  }
]


/** 05 — Methodology: four stages as a quiet horizontal sequence, no cards. */
export const BdbMethodology: React.FC = () => (
  <Section id="methodology" theme="paper" labelledBy="methodology-title" className="section-y">
    <Reveal className="wrap">
      <Kicker index="05" className="mb-8">
        Як я будую маркетингову систему
      </Kicker>
      <h2 id="methodology-title">
        <span className="t-display block">
          <Lines lines={['Не починаю', 'з публікацій.']} />
        </span>
        <span className="t-serif-xl block mt-3">
          <Lines start={2} lines={['Починаю з розуміння бізнесу.']} />
        </span>
      </h2>
    </Reveal>

    <Reveal as="ol" className="wrap mt-20 sm:mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14">
      {STEPS.map((step, i) => (
        <li
          key={step.number}
          className="fade-up border-t-2 border-ink pt-6 flex flex-col"
          style={{ ['--i' as string]: i } as React.CSSProperties}
        >
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-display font-black leading-[0.8] tracking-[-0.04em]" style={{ fontSize: 'clamp(72px, 7vw, 112px)' }}>
              {step.number}
            </span>
            <span className="t-ui opacity-60 text-right">{step.stage}</span>
          </div>
          <h3 className="t-h3 mt-8">{step.title}</h3>
          <p className="mt-4 text-[15px] leading-[1.5] opacity-80">{step.desc}</p>
          <ul className="mt-6 pt-5 border-t border-ink/15 space-y-2 text-[14px]">
            {step.deliverables.map((d) => (
              <li key={d} className="flex gap-3">
                <span aria-hidden="true" className="opacity-40">—</span>
                {d}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </Reveal>

    <p className="wrap mt-16 t-ui opacity-60">Системна послідовність • Кожен крок працює на прибуток</p>
  </Section>
)
