import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { triggerHaptic } from '../../utils/haptics'

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

export const BdbApproach: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('immersion')

  const handleHover = (id: string) => {
    if (activeId !== id) {
      triggerHaptic('light')
      setActiveId(id)
    }
  }

  return (
    <section 
      id="approach" 
      data-theme="light"
      className="relative z-20 py-24 sm:py-36 bg-transparent text-[#141937] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-12 border-b border-[#141937]/10 text-left">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#141937]/60 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#141937]" />
              <span>03 • МІЙ ПІДХІД</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#141937] leading-[1.05]">
              Для мене SMM — це маркетинг, <br />
              <span className="font-editorial normal-case text-[#141937] italic font-normal">
                а не контент заради контенту.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[#141937]/75 mt-4 font-normal max-w-2xl leading-relaxed">
              Кожне рішення має бути обґрунтованим і працювати на конкретну бізнес-ціль. Наведіть курсор або натисніть на стовпчик філософії:
            </p>
          </div>

          <div className="text-xs font-semibold uppercase tracking-wider text-[#141937]/50">
            КІНЕТИЧНА МАТРИЦЯ ПРИНЦИПІВ
          </div>
        </div>

        {/* Awwwards Interactive Kinetic Expanding Pillars (Straight cuts, no rounded corners) */}
        <div className="flex flex-col lg:flex-row gap-3 h-auto lg:h-[540px] select-none text-left">
          {APPROACH_ITEMS.map((item) => {
            const isExpanded = activeId === item.id

            return (
              <motion.div
                key={item.id}
                onMouseEnter={() => handleHover(item.id)}
                onClick={() => handleHover(item.id)}
                animate={{
                  flex: isExpanded ? 4 : 1,
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                className={`relative rounded-none overflow-hidden cursor-pointer transition-colors min-h-[160px] lg:min-h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 border border-[#141937]/15 group ${
                  isExpanded ? 'bg-[#141937] text-white shadow-2xl' : 'bg-white text-[#141937] hover:bg-[#EEEBDA]/70 shadow-sm'
                }`}
              >
                {/* Background Photography */}
                <div 
                  className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out pointer-events-none ${
                    isExpanded ? 'opacity-40 scale-105' : 'opacity-0 scale-100'
                  }`}
                  style={{ backgroundImage: `url(${item.photo})` }}
                />

                {/* Dark Vignette Overlay for Crisp Readability */}
                {isExpanded && (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141937] via-[#141937]/75 to-transparent pointer-events-none" />
                )}

                {/* Top Bar inside pillar */}
                <div className="relative z-10 flex items-center justify-between w-full">
                  <span className={`font-display text-3xl sm:text-4xl font-black ${isExpanded ? 'text-[#F3C3CF]' : 'text-[#141937]'}`}>
                    {item.number}
                  </span>

                  <span className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${
                    isExpanded ? 'bg-white/15 text-[#EEEBDA] backdrop-blur-md' : 'bg-[#141937]/5 text-[#141937]/70'
                  }`}>
                    {item.tag}
                  </span>
                </div>

                {/* Middle Content */}
                <div className="relative z-10 my-auto py-4">
                  {/* Collapsed view: Vertical Sleek Title on desktop */}
                  {!isExpanded && (
                    <div className="hidden lg:flex flex-col items-center justify-center h-full">
                      <span className="font-display text-2xl font-black uppercase tracking-wider text-[#141937]/60 group-hover:text-[#141937] transition-colors [writing-mode:vertical-rl] rotate-180">
                        {item.title}
                      </span>
                    </div>
                  )}

                  {/* Expanded view: Rich Animated Typography */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="space-y-4 max-w-xl"
                      >
                        <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                          {item.headline}
                        </h3>

                        <p className="text-sm sm:text-base lg:text-lg text-[#EEEBDA]/90 leading-relaxed font-normal">
                          {item.desc}
                        </p>

                        <div className="pt-2 flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#F3C3CF]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F3C3CF]" />
                          <span>{item.metric}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Mobile-only collapsed summary */}
                  {!isExpanded && (
                    <div className="lg:hidden text-left font-display text-xl font-black uppercase text-[#141937] mt-2">
                      {item.headline}
                    </div>
                  )}
                </div>

                {/* Bottom Bar inside pillar */}
                <div className="relative z-10 flex items-center justify-between w-full pt-4 border-t border-white/10">
                  <span className={`text-[11px] font-semibold uppercase tracking-wider ${isExpanded ? 'text-[#EEEBDA]/60' : 'text-[#141937]/40'}`}>
                    СИСТЕМНИЙ СТАНДАРТ • 0{item.number}
                  </span>

                  <ArrowUpRight className={`w-4 h-4 transition-transform duration-300 ${
                    isExpanded ? 'text-[#F3C3CF] translate-x-1 -translate-y-1' : 'text-[#141937]/40 group-hover:text-[#141937]'
                  }`} />
                </div>

              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
