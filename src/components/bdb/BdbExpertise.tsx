import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Users, TrendingUp, ShieldCheck, ArrowUpRight, CheckCircle2, Compass, Layers } from 'lucide-react'
import { triggerHaptic } from '../../utils/haptics'

type ExpertiseViewMode = 'metrics' | 'markets' | 'team'

interface MetricPillar {
  id: string
  number: string
  unit: string
  title: string
  desc: string
  tag: string
  detail: string
  icon: React.ElementType
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
    icon: ShieldCheck
  },
  {
    id: 'markets',
    number: '3',
    unit: 'РИНКИ',
    title: 'Ключові ринки',
    desc: 'Досвід роботи з ринками США, Європи та України. Глибоке розуміння культурного контексту, мови та платоспроможної аудиторії.',
    tag: 'МІЖНАРОДНИЙ ДОСВІД',
    detail: 'Miami • NY • Barcelona • Kyiv',
    icon: Globe
  },
  {
    id: 'team',
    number: '1',
    unit: 'КОМАНДА',
    title: 'Власна команда',
    desc: 'Команда спеціалістів для комплексної реалізації маркетингових проєктів під моїм особистим стратегічним лідерством.',
    tag: 'FULL-CYCLE PRODUCTION',
    detail: 'Таргетолог • Контент • Дизайн',
    icon: Users
  },
  {
    id: 'partnership',
    number: '∞',
    unit: 'LTV',
    title: 'Довгострокове партнерство',
    desc: 'Будую співпрацю з проєктами на роки. Є клієнти, з якими працюємо понад рік, тому що маркетинг окупає себе та росте.',
    tag: 'LTV > 12 МІСЯЦІВ',
    detail: 'Залученість у фінансовий ріст',
    icon: TrendingUp
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

export const BdbExpertise: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0)
  const [viewMode, setViewMode] = useState<ExpertiseViewMode>('metrics')

  const handlePillarHover = (idx: number) => {
    if (activeIdx !== idx) {
      triggerHaptic('light')
      setActiveIdx(idx)
    }
  }

  const handleModeSwitch = (mode: ExpertiseViewMode) => {
    triggerHaptic('medium')
    setViewMode(mode)
  }

  return (
    <section 
      id="expertise" 
      data-theme="dark"
      className="relative z-20 py-24 sm:py-36 bg-transparent text-[#EEEBDA] overflow-hidden text-left"
    >
      {/* Background ambient luxury pearl glow */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-[#F3C3CF]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[#1E254F] blur-2xl pointer-events-none opacity-50" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Section Header (Screen 2 Luxury Dark Aesthetics) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-12 border-b border-white/10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#F3C3CF]">
              <span className="w-2 h-2 rounded-full bg-[#F3C3CF]" />
              <span>02 • ДОСВІД ТА ЕКСПЕРТИЗА</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.02]">
              Маркетинг, побудований <br />
              <span className="font-editorial normal-case text-[#F3C3CF] italic font-normal">
                на досвіді, системі та цифрах.
              </span>
            </h2>
          </div>

          {/* Interactive Mode Switcher Capsule (Replaces boring static cards with high-tech interaction) */}
          <div className="flex items-center p-1 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-md">
            <button
              type="button"
              onClick={() => handleModeSwitch('metrics')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                viewMode === 'metrics'
                  ? 'bg-white text-[#141937] shadow-lg'
                  : 'text-[#EEEBDA]/70 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>МЕТРИКИ</span>
            </button>

            <button
              type="button"
              onClick={() => handleModeSwitch('markets')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                viewMode === 'markets'
                  ? 'bg-white text-[#141937] shadow-lg'
                  : 'text-[#EEEBDA]/70 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>РИНКИ (3)</span>
            </button>

            <button
              type="button"
              onClick={() => handleModeSwitch('team')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                viewMode === 'team'
                  ? 'bg-white text-[#141937] shadow-lg'
                  : 'text-[#EEEBDA]/70 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>КОМАНДА</span>
            </button>
          </div>
        </div>

        {/* Dynamic Interactive Console View */}
        <AnimatePresence mode="wait">
          {viewMode === 'metrics' && (
            <motion.div
              key="metrics"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-white/15 rounded-none overflow-hidden bg-white/[0.02] backdrop-blur-sm divide-y md:divide-y-0 md:divide-x divide-white/15 shadow-2xl"
            >
              {EXPERTISE_METRICS.map((pillar, idx) => {
                const isActive = activeIdx === idx
                const Icon = pillar.icon

                return (
                  <div
                    key={pillar.id}
                    onMouseEnter={() => handlePillarHover(idx)}
                    onClick={() => handlePillarHover(idx)}
                    className={`relative p-8 sm:p-10 flex flex-col justify-between min-h-[380px] sm:min-h-[440px] transition-all duration-300 cursor-pointer select-none group ${
                      isActive ? 'bg-white/[0.08]' : 'hover:bg-white/[0.04]'
                    }`}
                  >
                    {/* Top indicator bar */}
                    <div 
                      className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#F3C3CF] to-transparent transition-opacity duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`} 
                    />

                    {/* Top Row: Tag & Status Icon */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full transition-colors ${
                        isActive ? 'bg-[#F3C3CF] text-[#141937] font-bold' : 'bg-white/10 text-[#EEEBDA]/70'
                      }`}>
                        {pillar.tag}
                      </span>

                      <Icon className={`w-5 h-5 transition-transform duration-300 ${
                        isActive ? 'text-[#F3C3CF] scale-110' : 'text-white/30 group-hover:text-white/60'
                      }`} />
                    </div>

                    {/* Colossal Number Sculpture */}
                    <div className="my-8">
                      <div className="flex items-baseline gap-2">
                        <span className={`font-display text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter transition-colors duration-300 ${
                          isActive ? 'text-white scale-105 inline-block' : 'text-[#EEEBDA]/75'
                        }`}>
                          {pillar.number}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-widest text-[#F3C3CF]">
                          {pillar.unit}
                        </span>
                      </div>

                      <h3 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-white mt-2">
                        {pillar.title}
                      </h3>
                    </div>

                    {/* Bottom Body Text & Detail Tag */}
                    <div className="pt-4 border-t border-white/10 space-y-3">
                      <p className="text-sm text-[#EEEBDA]/80 leading-relaxed font-normal">
                        {pillar.desc}
                      </p>

                      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#F3C3CF] pt-1">
                        <span>{pillar.detail}</span>
                        <ArrowUpRight className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          isActive ? 'translate-x-1 -translate-y-1' : 'opacity-40'
                        }`} />
                      </div>
                    </div>

                  </div>
                )
              })}
            </motion.div>
          )}

          {viewMode === 'markets' && (
            <motion.div
              key="markets"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="grid grid-cols-1 md:grid-cols-3 border border-white/15 rounded-none overflow-hidden bg-white/[0.02] backdrop-blur-sm divide-y md:divide-y-0 md:divide-x divide-white/15 shadow-2xl"
            >
              {MARKETS_DATA.map((market) => (
                <div key={market.code} className="p-8 sm:p-10 flex flex-col justify-between space-y-8 bg-white/[0.04]">
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                      <span className="text-3xl">{market.flag}</span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#F3C3CF]">
                        {market.highlight}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-black uppercase tracking-tight text-white mb-2">
                      {market.region}
                    </h3>
                    <div className="text-xs font-semibold text-[#EEEBDA]/60 uppercase tracking-wider mb-4">
                      {market.hubs}
                    </div>

                    <p className="text-sm text-[#EEEBDA]/85 leading-relaxed font-normal">
                      {market.spec}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs font-bold text-[#F3C3CF]">
                    {market.aov}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {viewMode === 'team' && (
            <motion.div
              key="team"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-white/15 rounded-none overflow-hidden bg-white/[0.02] backdrop-blur-sm divide-y md:divide-y-0 md:divide-x divide-white/15 shadow-2xl"
            >
              {TEAM_ROLES.map((role, rIdx) => (
                <div key={rIdx} className="p-8 sm:p-10 flex flex-col justify-between space-y-6 bg-white/[0.04]">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#F3C3CF] mb-4">
                      0{rIdx + 1} • ПОЗИЦІЯ
                    </div>
                    <h3 className="font-display text-xl font-black uppercase tracking-tight text-white mb-2">
                      {role.title}
                    </h3>
                    <div className="text-xs font-bold text-[#F3C3CF] uppercase tracking-wider mb-4">
                      {role.lead}
                    </div>
                    <p className="text-sm text-[#EEEBDA]/80 leading-relaxed font-normal">
                      {role.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-bold text-white/60">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#F3C3CF]" />
                    <span>Входить у комплексну систему</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Interactive Telemetry Strip */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-bold uppercase tracking-wider text-[#EEEBDA]/60">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-[#F3C3CF]">
              <span className="w-2 h-2 rounded-full bg-[#F3C3CF] animate-pulse" />
              <span>ПІДТВЕРДЖЕНІ ПОКАЗНИКИ</span>
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="hidden sm:inline">СЕРЕДНІЙ ROMI: ДО 10.2X</span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="hidden sm:inline">ФОКУС НА ЧИСТОМУ ПРИБУТКУ БІЗНЕСУ</span>
          </div>

          <div className="text-[11px] font-semibold text-[#EEEBDA]/40 tracking-wider">
            СИСТЕМА ВОЛОШИНОЇ
          </div>
        </div>

      </div>
    </section>
  )
}
