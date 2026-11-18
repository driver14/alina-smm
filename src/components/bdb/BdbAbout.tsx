import React, { useState } from 'react'
import { ArrowUpRight, Send, ShieldCheck, Target, Video, BarChart3, CheckCircle2 } from 'lucide-react'
import { triggerHaptic } from '../../utils/haptics'

const InstagramIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

interface BdbAboutProps {
  onOpenBooking: (service?: string, note?: string) => void
}

interface CompetencyItem {
  id: string
  role: string
  lead: string
  desc: string
  metric: string
  icon: React.ElementType
}

const COMPETENCIES: CompetencyItem[] = [
  {
    id: 'strategy',
    role: 'СТРАТЕГІЯ ТА АНАЛІТИКА',
    lead: 'Особисто Аліна Волошина',
    desc: 'Позиціонування бренду, архітектура воронки продажів, аналіз ринку США/Європи та щотижневий контроль фінансового результату.',
    metric: '100% особиста відповідальність',
    icon: ShieldCheck
  },
  {
    id: 'content',
    role: 'КОНТЕНТ ТА ПРОДАКШН',
    lead: 'Команда продакшну',
    desc: 'Сценарії Reels, візуальна естетика, зйомки, монтаж динамічних роликів та щоденні сенсові сторітелінги для високого чеку.',
    metric: 'Регулярність & висока якість',
    icon: Video
  },
  {
    id: 'target',
    role: 'ТАРГЕТОВАНА РЕКЛАМА',
    lead: 'Таргет-спеціаліст',
    desc: 'Запуск рекламних зв’язок у Meta Ads, тестування аудиторій, зниження CPA та щоденна оптимізація рекламних бюджетів.',
    metric: 'Підтверджений ROMI до 10.2X',
    icon: Target
  },
  {
    id: 'management',
    role: 'УПРАВЛІННЯ ТА ЗВІТНІСТЬ',
    lead: 'Аліна + Project Manager',
    desc: 'Синхронізація всіх процесів в єдиний робочий простір, прозора щотижнева звітність у цифрах без води та затримок.',
    metric: 'Повна прозорість для власника',
    icon: BarChart3
  }
]

export const BdbAbout: React.FC<BdbAboutProps> = ({ onOpenBooking }) => {
  const [activeCompetency, setActiveCompetency] = useState<number>(0)

  const handleBookSession = () => {
    triggerHaptic('medium')
    onOpenBooking('Особиста стратегія з Аліною', 'Запит на знайомство та стратегічну сесію')
  }

  const handleSelectRole = (idx: number) => {
    triggerHaptic('light')
    setActiveCompetency(idx)
  }

  return (
    <section 
      id="about" 
      data-theme="dark"
      className="relative z-20 py-24 sm:py-36 bg-transparent text-[#EEEBDA] overflow-hidden text-left"
    >
      {/* Background ambient luxury pearl glow */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-[#F3C3CF]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#1E254F] blur-3xl pointer-events-none opacity-40" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Section Header (Screen 2 Luxury Dark Aesthetics) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-16 border-b border-white/10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#F3C3CF]">
              <span className="w-2 h-2 rounded-full bg-[#F3C3CF]" />
              <span>08 • ПРО МЕНЕ ТА КОМАНДУ</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.02]">
              Особиста стратегія. <br />
              <span className="font-editorial normal-case text-[#F3C3CF] italic font-normal">
                Командна реалізація.
              </span>
            </h2>
          </div>

          <div className="text-xs font-semibold uppercase tracking-wider text-[#EEEBDA]/50">
            LEADERSHIP & IN-HOUSE TEAM
          </div>
        </div>

        {/* Editorial Fashion Studio Split Layout (Straight architectural cuts) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
          
          {/* Left Column (5 cols): High-Fashion Portrait with Straight Edge Framing */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="relative aspect-[3/4] w-full rounded-none overflow-hidden border border-white/15 bg-black/40 shadow-2xl group">
              <img
                src="/photos/alina-barcelona.jpg"
                alt="Аліна Волошина — SMM-стратегиня"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Status Badge Top */}
              <div className="absolute top-5 left-5 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider text-white border border-white/15 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F3C3CF]" />
                <span>3+ РОКИ В SMM & МАРКЕТИНГУ</span>
              </div>

              {/* Founder Signature HUD Card Bottom */}
              <div className="absolute bottom-5 inset-x-5 p-5 bg-[#141937]/95 backdrop-blur-md border border-white/15 rounded-none shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-display text-lg font-black uppercase tracking-tight text-white">
                      АЛІНА ВОЛОШИНА
                    </div>
                    <div className="text-[11px] font-semibold text-[#F3C3CF] uppercase mt-0.5">
                      SMM-СТРАТЕГИЦЯ & КЕРІВНИЦЯ КОМАНДИ
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href="https://instagram.com/smmbyvlsh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#141937] flex items-center justify-center text-white transition-all"
                      aria-label="Instagram"
                    >
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="https://t.me/smmbyvlsh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#141937] flex items-center justify-center text-white transition-all"
                      aria-label="Telegram"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro Metadata Strip */}
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#EEEBDA]/50 px-1">
              <span>США • ЄВРОПА • УКРАЇНА</span>
              <span>100+ УСПІШНИХ КАМПАНІЙ</span>
            </div>

          </div>

          {/* Right Column (7 cols): Editorial Typography & Manifesto */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#F3C3CF]">
                ФІЛОСОФІЯ КЕРУВАННЯ МАРКЕТИНГОМ
              </span>
              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                Мене звати Аліна Волошина. <br />
                <span className="font-editorial normal-case text-[#EEEBDA] italic font-normal text-2xl sm:text-3xl lg:text-4xl">
                  Я будую системний маркетинг, який приносить реальний дохід.
                </span>
              </h3>
            </div>

            <div className="space-y-4 text-base sm:text-lg text-[#EEEBDA]/85 leading-relaxed font-normal">
              <p>
                Я особисто відповідаю за стратегію, управління проєктами, маркетингові рішення та фінансовий результат кожного клієнта.
              </p>
              <p>
                Над реалізацією працюю разом із власною командою спеціалістів: залежно від завдань бізнесу залучаємо експертів із якісного контенту, дизайну, динамічного монтажу та високоефективної таргетованої реклами.
              </p>
            </div>

            {/* Large Editorial Pull Quote */}
            <div className="p-8 rounded-none bg-white/[0.04] border-l-2 border-[#F3C3CF] border-y-0 border-r-0 relative">
              <p className="font-editorial text-xl sm:text-2xl text-white italic leading-snug">
                «Для мене важливо, щоб кожен етап роботи був узгодженим, а всі інструменти маркетингу працювали на єдину бізнес-мету вашого проєкту.»
              </p>
              <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#F3C3CF]">
                — АЛІНА ВОЛОШИНА • СТАНДАРТ ЯКОСТІ
              </div>
            </div>

            {/* CTA Button (Screen 2 Cream Pill) */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={handleBookSession}
                className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4.5 rounded-full bg-[#EEEBDA] hover:bg-white text-[#141937] text-xs sm:text-sm uppercase tracking-[0.16em] font-extrabold transition-all hover:scale-105 cursor-pointer shadow-xl rolex-sheen"
              >
                <span>ОБГОВОРИТИ СПІВПРАЦЮ З АЛІНОЮ</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <span className="text-xs font-semibold uppercase tracking-wider text-[#EEEBDA]/50 text-center sm:text-left">
                БЕЗКОШТОВНИЙ ПЕРВИННИЙ АУДИТ
              </span>
            </div>

          </div>

        </div>

        {/* Bottom Architectural Matrix: 4 Connected Competency Pillars */}
        <div className="border border-white/15 rounded-none overflow-hidden bg-white/[0.02] backdrop-blur-sm divide-y lg:divide-y-0 lg:divide-x divide-white/15 shadow-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {COMPETENCIES.map((comp, idx) => {
            const isSelected = activeCompetency === idx
            const Icon = comp.icon

            return (
              <div
                key={comp.id}
                onMouseEnter={() => handleSelectRole(idx)}
                onClick={() => handleSelectRole(idx)}
                className={`p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer relative group ${
                  isSelected ? 'bg-white/[0.08]' : 'hover:bg-white/[0.03]'
                }`}
              >
                {/* Active indicator bar */}
                <div 
                  className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#F3C3CF] to-transparent transition-opacity duration-300 ${
                    isSelected ? 'opacity-100' : 'opacity-0'
                  }`} 
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#F3C3CF]">
                      0{idx + 1} • НАПРЯМ
                    </span>
                    <Icon className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-[#F3C3CF] scale-110' : 'text-white/40'
                    }`} />
                  </div>

                  <h4 className="font-display text-lg font-black uppercase tracking-tight text-white mb-1">
                    {comp.role}
                  </h4>
                  <div className="text-xs text-[#F3C3CF] font-semibold mb-3">
                    {comp.lead}
                  </div>

                  <p className="text-sm text-[#EEEBDA]/80 leading-relaxed font-normal">
                    {comp.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#EEEBDA]/60">
                  <span>{comp.metric}</span>
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-[#F3C3CF]' : 'text-white/30'}`} />
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
