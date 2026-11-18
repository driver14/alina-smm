import React, { useState, useRef } from 'react'
import { triggerHaptic } from '../../utils/haptics'
import { Reveal, Lines } from './ui/Reveal'
import { Section, Kicker } from './ui/Section'

type ExpertiseViewMode = 'metrics' | 'markets' | 'team'

interface MetricPillar {
  id: string
  number: string
  unit: string
  title: string
  desc: string
  tag: string
  detail: string
}

const EXPERTISE_METRICS: MetricPillar[] = [
  {
    id: 'years',
    number: '3+',
    unit: 'РОКИ',
    title: 'Роки досвіду',
    desc: 'У сфері SMM та маркетингу. 36+ місяців системного масштабування бізнесів через прогнозовану генерацію клієнтів.',
    tag: 'СИСТЕМНИЙ ДОСВІД',
    detail: '100+ реалізованих кампаній',

  },
  {
    id: 'markets',
    number: '3',
    unit: 'РИНКИ',
    title: 'Ключові ринки',
    desc: 'Досвід роботи з ринками США, Європи та України. Глибоке розуміння культурного контексту, мови та платоспроможної аудиторії.',
    tag: 'МІЖНАРОДНИЙ ДОСВІД',
    detail: 'Miami • NY • Barcelona • Kyiv',

  },
  {
    id: 'team',
    number: '1',
    unit: 'КОМАНДА',
    title: 'Власна команда',
    desc: 'Команда спеціалістів для комплексної реалізації маркетингових проєктів під моїм особистим стратегічним лідерством.',
    tag: 'FULL-CYCLE PRODUCTION',
    detail: 'Таргетолог • Контент • Дизайн',

  },
  {
    id: 'partnership',
    number: '∞',
    unit: 'LTV',
    title: 'Довгострокове партнерство',
    desc: 'Будую співпрацю з проєктами на роки. Є клієнти, з якими працюємо понад рік, тому що маркетинг окупає себе та росте.',
    tag: 'LTV > 12 МІСЯЦІВ',
    detail: 'Залученість у фінансовий ріст',

  }
]

const MARKETS_DATA = [
  {
    code: 'USA',
    flag: '🇺🇸',
    region: 'США • North America',
    hubs: 'Miami, New York, Los Angeles',
    spec: 'Преміальні б’юті-послуги, e-commerce, персональні бренди',
    highlight: 'ROMI до 10.2X',
    aov: 'Середній чек: $800 — $2,500+'
  },
  {
    code: 'EUR',
    flag: '🇪🇺',
    region: 'ЄВРОПА • European Union',
    hubs: 'Барселона, Варшава, Берлін',
    spec: 'Медичні центри, фешн-ритейл, локальні сервіси високого чеку',
    highlight: 'LTV клієнтів > 14 міс.',
    aov: 'Середній чек: €400 — €1,800+'
  },
  {
    code: 'UKR',
    flag: '🇺🇦',
    region: 'УКРАЇНА • Domestic Scale',
    hubs: 'Київ, Львів, Одеса',
    spec: 'EdTech, онлайн-школи, клініки, системний ріст виробників',
    highlight: 'Зростання продажів у 2.4X',
    aov: 'Конверсія в заявку: до 18.4%'
  }
]

const TEAM_ROLES = [
  {
    title: 'Стратегія & Керування',
    lead: 'Аліна Волошина',
    desc: 'Особистий аудит, архітектура воронки, щотижневий контроль фінансових KPI та бізнес-рішень.'
  },
  {
    title: 'Таргетована реклама Meta Ads',
    lead: 'Senior Media Buyer',
    desc: 'Спліт-тестування оферів, сегментація аудиторій, зниження CPA та щотижневе масштабування бюджету.'
  },
  {
    title: 'Контент & Візуальний продакшн',
    lead: 'Content Creator & Editor',
    desc: 'Сценарії Reels, візуальна айдентика, динамічний монтаж та сенсовий сторітелінг для високого чеку.'
  },
  {
    title: 'Аналітика & Підтримка',
    lead: 'Project Manager',
    desc: 'Синхронізація дедлайнів, прозорий щотижневий дашборд показників без зайвої рутини для власника.'
  }
]

const TABS: { id: ExpertiseViewMode; label: string }[] = [
  { id: 'metrics', label: 'Метрики' },
  { id: 'markets', label: 'Ринки (3)' },
  { id: 'team', label: 'Команда' },
]

export const BdbExpertise: React.FC = () => {
  const [viewMode, setViewMode] = useState<ExpertiseViewMode>('metrics')
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const select = (mode: ExpertiseViewMode) => {
    if (mode === viewMode) return
    triggerHaptic('light')
    setViewMode(mode)
  }

  // Roving focus for the tablist (Left/Right/Home/End)
  const onTabKey = (e: React.KeyboardEvent, idx: number) => {
    let next = -1
    if (e.key === 'ArrowRight') next = (idx + 1) % TABS.length
    else if (e.key === 'ArrowLeft') next = (idx - 1 + TABS.length) % TABS.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = TABS.length - 1
    if (next < 0) return
    e.preventDefault()
    select(TABS[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <Section id="expertise" theme="ink" labelledBy="expertise-title" className="section-y">
      <Reveal className="wrap text-center flex flex-col items-center">
        <Kicker index="02" className="justify-center mb-10 text-pink opacity-100">
          Досвід та експертиза
        </Kicker>
        <h2 id="expertise-title" className="t-serif-xl text-pink max-w-[1100px]">
          <Lines lines={['Маркетинг, побудований', 'на досвіді, системі', 'та цифрах.']} />
        </h2>
        <p className="fade-up t-body-l opacity-75 max-w-[560px] mt-10" style={{ ['--i' as string]: 3 } as React.CSSProperties}>
          Середній ROMI: до 10.2x. Фокус на чистому прибутку бізнесу — підтверджені показники.
        </p>
      </Reveal>

      {/* Text tabs */}
      <div className="wrap mt-20 sm:mt-28">
        <div role="tablist" aria-label="Експертиза" className="flex flex-wrap gap-x-8 gap-y-3 border-b border-paper/15">
          {TABS.map((tab, i) => {
            const active = viewMode === tab.id
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                id={`exp-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`exp-panel-${tab.id}`}
                tabIndex={active ? 0 : -1}
                onClick={() => select(tab.id)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={`relative -mb-px pb-4 font-display font-extrabold uppercase text-[20px] sm:text-[24px] leading-none cursor-pointer transition-colors ${
                  active ? 'text-paper border-b-2 border-pink' : 'text-paper/45 hover:text-paper border-b-2 border-transparent'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      <div
        id={`exp-panel-${viewMode}`}
        role="tabpanel"
        aria-labelledby={`exp-tab-${viewMode}`}
        tabIndex={0}
        className="wrap focus-visible:outline-offset-8"
      >
        {viewMode === 'metrics' && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {EXPERTISE_METRICS.map((m, i) => (
              <li
                key={m.id}
                className={`py-10 lg:py-12 sm:pr-8 border-b border-paper/15 lg:border-b-0 ${
                  i > 0 ? 'lg:border-l lg:border-paper/15 lg:pl-8' : ''
                } ${i % 2 === 1 ? 'sm:pl-8 sm:border-l sm:border-paper/15 lg:pl-8' : ''}`}
              >
                <p className="t-ui text-pink">{m.tag}</p>
                <p className="mt-8 flex items-baseline gap-3">
                  <span
                    className="font-display font-black leading-[0.8] tracking-[-0.04em]"
                    style={{ fontSize: 'clamp(88px, 9vw, 140px)' }}
                  >
                    {m.number}
                  </span>
                  <span className="t-ui opacity-70">{m.unit}</span>
                </p>
                <h3 className="t-h3 mt-6">{m.title}</h3>
                <p className="mt-4 text-[15px] leading-[1.5] opacity-75 max-w-[340px]">{m.desc}</p>
                <p className="t-ui mt-6 text-pink">{m.detail}</p>
              </li>
            ))}
          </ul>
        )}

        {viewMode === 'markets' && (
          <ul className="grid grid-cols-1 lg:grid-cols-3">
            {MARKETS_DATA.map((market, i) => (
              <li
                key={market.code}
                className={`py-10 lg:py-12 border-b border-paper/15 lg:border-b-0 ${i > 0 ? 'lg:border-l lg:border-paper/15 lg:pl-8' : ''} lg:pr-8`}
              >
                <p className="font-display font-black leading-[0.8] tracking-[-0.04em]" style={{ fontSize: 'clamp(88px, 9vw, 140px)' }}>
                  {market.code}
                </p>
                <h3 className="t-h3 mt-6">{market.region}</h3>
                <p className="t-ui mt-3 opacity-60">{market.hubs}</p>
                <p className="mt-5 text-[15px] leading-[1.5] opacity-80 max-w-[380px]">{market.spec}</p>
                <p className="t-serif mt-6 text-pink">{market.highlight}</p>
                <p className="t-ui mt-2 opacity-70">{market.aov}</p>
              </li>
            ))}
          </ul>
        )}

        {viewMode === 'team' && (
          <ol>
            {TEAM_ROLES.map((role, i) => (
              <li key={role.title} className="grid grid-cols-12 gap-x-6 gap-y-2 py-8 border-b border-paper/15">
                <span className="col-span-2 sm:col-span-1 t-ui opacity-60 pt-2">{String(i + 1).padStart(2, '0')}</span>
                <div className="col-span-10 sm:col-span-6">
                  <h3 className="t-display-m">{role.title}</h3>
                  <p className="t-serif mt-2 text-pink">{role.lead}</p>
                </div>
                <p className="col-span-12 sm:col-span-5 sm:col-start-8 text-[15px] leading-[1.5] opacity-80 sm:pt-2">{role.desc}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </Section>
  )
}
