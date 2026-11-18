import React, { useState } from 'react'
import { ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react'
import { triggerHaptic } from '../../utils/haptics'

interface BdbCapabilitiesProps {
  onOpenBooking: (service?: string, note?: string) => void
}

interface ServiceItem {
  id: string
  number: string
  title: string
  price: string
  desc: string
  tag: string
  features: string[]
  isFlagship?: boolean
}

export const BdbCapabilities: React.FC<BdbCapabilitiesProps> = ({ onOpenBooking }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const services: ServiceItem[] = [
    {
      id: 'smm-target',
      number: '01',
      title: 'SMM + Target',
      price: 'Від $700 / місяць',
      desc: 'Комплексне ведення соціальних мереж та таргетована реклама. Стратегія, контент, візуальне оформлення, комунікація з аудиторією, рекламні кампанії та аналітика.',
      tag: 'ФЛАГМАНСЬКИЙ КОМПЛЕКС',
      features: ['Повна SMM-стратегія', 'Продакшн контенту & Reels', 'Налаштування та оптимізація таргету', 'Щотижнева аналітика & ROMI'],
      isFlagship: true
    },
    {
      id: 'smm-management',
      number: '02',
      title: 'SMM Management',
      price: 'Від $500 / місяць',
      desc: 'Комплексне ведення соціальних мереж: стратегія, контент-план, тексти, дизайн, монтаж відео, Stories, публікації та аналітика.',
      tag: 'КОНТЕНТ ТА АНАЛІТИКА',
      features: ['Контент-план & копірайтинг', 'Монтаж динамічних відео', 'Stories-менеджмент', 'Аналіз залученості аудиторії']
    },
    {
      id: 'target',
      number: '03',
      title: 'Targeted Advertising',
      price: 'Від $250 / місяць',
      desc: 'Розробка рекламної стратегії, налаштування, запуск, тестування та оптимізація рекламних кампаній. Аналіз ефективності й звітність.',
      tag: 'ТАРГЕТ ТА ОКУПНІСТЬ',
      features: ['Спліт-тестування оферів', 'Зниження вартості ліда (CPA)', 'Meta Ads кампанії (США, Європа, Україна)', 'Прозорий фінансовий звіт']
    },
    {
      id: 'strategic-mgmt',
      number: '04',
      title: 'Strategic Management',
      price: 'Від $300 / місяць',
      desc: 'Стратегічний супровід вашого маркетингу. Розробка позиціонування, комунікаційної стратегії, контент-плану, рекомендацій і контроль загального напряму роботи.',
      tag: 'СУПРОВІД МАРКЕТИНГУ',
      features: ['Аудит роботи підрядників', 'Корекція позиціонування', 'Стратегічні сесії з власником', 'Контроль маркетингового вектору']
    },
    {
      id: 'session',
      number: '05',
      title: 'Strategic Session',
      price: '$100 / сесія',
      desc: 'Індивідуальна консультація для бізнесу, експертів і спеціалістів. Аналізуємо поточну ситуацію, знаходимо точки зростання та формуємо конкретний план подальших дій.',
      tag: 'ІНДИВІДУАЛЬНИЙ АУДИТ',
      features: ['90 хвилин інтенсивного розбору', 'Пошук вузьких місць воронки', 'Покроковий action-plan', 'Запис сесії та підсумкові матеріали']
    }
  ]

  const handleBookService = (serviceTitle: string) => {
    triggerHaptic('medium')
    onOpenBooking(serviceTitle, `Запит на пакет: ${serviceTitle}`)
  }

  const handleGeneralBooking = () => {
    triggerHaptic('medium')
    onOpenBooking('Безкоштовний стратегічний розбір', 'Запит на безкоштовний стратегічний розбір проєкту')
  }

  return (
    <section 
      id="services" 
      data-theme="dark"
      className="relative z-20 py-24 sm:py-36 bg-transparent text-[#EEEBDA] overflow-hidden text-left"
    >
      {/* Ambient luxury lighting */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-[#F3C3CF]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#1E254F] blur-3xl pointer-events-none opacity-50" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-12 border-b border-white/10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#F3C3CF]">
              <span className="w-2 h-2 rounded-full bg-[#F3C3CF]" />
              <span>07 • ПОСЛУГИ ТА ВАРТІСТЬ</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.02]">
              Формати співпраці, які можна <br />
              <span className="font-editorial normal-case text-[#F3C3CF] italic font-normal">
                адаптувати під ваш бізнес.
              </span>
            </h2>
          </div>

          <div className="text-xs font-semibold uppercase tracking-wider text-[#EEEBDA]/50">
            ГНУЧКІ ФОРМАТИ ТА ПАКЕТИ
          </div>
        </div>

        {/* Descriptive Philosophy Card (Luxury Glass, Flawless Contrast, No Muddy Gray Box) */}
        <div className="p-8 sm:p-10 rounded-none bg-white/[0.03] border border-white/12 shadow-2xl mb-12 max-w-4xl space-y-4 backdrop-blur-md">
          <p className="text-base sm:text-lg text-[#EEEBDA]/95 leading-relaxed font-normal">
            Вартість усіх послуг є орієнтовною та залежить від обсягу завдань, потреб вашого бізнесу й обраного формату співпраці.
          </p>
          <p className="text-sm sm:text-base text-[#EEEBDA]/80 leading-relaxed font-normal">
            Ми можемо скоригувати наявні пакети або сформувати індивідуальний комплекс послуг відповідно до вашого запиту та бюджету. Разом визначимо пріоритети й підберемо найбільш вигідний для вас формат.
          </p>
          <div className="pt-2 text-xs font-semibold uppercase tracking-wider text-[#F3C3CF] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F3C3CF]" />
            <span>НИЖЧЕ — ОРІЄНТОВНА ВАРТІСТЬ ОСНОВНИХ ПОСЛУГ • ГНУЧКА АДАПТАЦІЯ</span>
          </div>
        </div>

        {/* Monolithic Editorial Service Spectrum Rows (Guaranteed Legibility in All States) */}
        <div 
          onMouseLeave={() => setHoveredId(null)}
          className="border border-white/12 rounded-none overflow-hidden bg-white/[0.02] divide-y divide-white/10 shadow-2xl mb-14"
        >
          {services.map((srv) => {
            const isHovered = hoveredId === srv.id
            const isActive = isHovered || (srv.isFlagship && hoveredId === null)

            return (
              <div
                key={srv.id}
                onMouseEnter={() => {
                  triggerHaptic('light')
                  setHoveredId(srv.id)
                }}
                className={`p-8 sm:p-10 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-8 cursor-pointer relative group ${
                  isActive
                    ? 'bg-white/[0.06] border-l-4 border-l-[#F3C3CF]'
                    : 'bg-transparent hover:bg-white/[0.04]'
                }`}
              >
                {/* Left: Number, Title, Description & Features */}
                <div className="max-w-xl space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-2xl font-black text-[#F3C3CF]">
                      {srv.number}
                    </span>
                    <span className={`text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${
                      isActive 
                        ? 'bg-[#F3C3CF] text-[#141937] font-bold' 
                        : 'bg-white/10 text-[#EEEBDA]/80 border border-white/10'
                    }`}>
                      {srv.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-white group-hover:text-[#F3C3CF] transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-sm sm:text-base leading-relaxed font-normal text-[#EEEBDA]/85">
                    {srv.desc}
                  </p>

                  {/* Feature Pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {srv.features.map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className="text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-2 transition-colors bg-white/5 border border-white/10 text-white/95"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#F3C3CF] shrink-0" />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Pricing & Refined Luxury Capsule Button */}
                <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10">
                  <div className="text-left lg:text-right">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#EEEBDA]/50">
                      ОРІЄНТОВНА ВАРТІСТЬ
                    </div>
                    <div className="font-display text-2xl sm:text-3xl font-black mt-1 text-[#F3C3CF]">
                      {srv.price}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleBookService(srv.title)
                    }}
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-xs font-black uppercase tracking-wider transition-all hover:scale-105 cursor-pointer shadow-lg rolex-sheen bg-[#EEEBDA] text-[#141937] hover:bg-white"
                  >
                    <span>ОБРАТИ ЦЕЙ ФОРМАТ</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            )
          })}
        </div>

        {/* Refined Global CTA Pill Button */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleGeneralBooking}
            className="inline-flex items-center justify-center gap-3 px-8 sm:px-12 py-5 rounded-full bg-[#EEEBDA] hover:bg-white text-[#141937] text-xs sm:text-sm font-black uppercase tracking-wider transition-all hover:scale-105 shadow-2xl cursor-pointer rolex-sheen"
          >
            <span>Отримати стратегічний розбір свого проєкту</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  )
}
