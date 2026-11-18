import React, { useState } from 'react'
import { ArrowRight, CheckCircle2, ShieldCheck, Compass, Target, LineChart } from 'lucide-react'
import { triggerHaptic } from '../../utils/haptics'

export const BdbMethodology: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      number: '01',
      title: 'Бізнес та цілі',
      desc: 'Знайомлюся з вашим бізнесом, продуктом, послугами та цілями. Визначаємо поточну ситуацію, бажаний результат і ключові показники ефективності.',
      stage: 'АУДИТ ТА ЦІЛІ',
      deliverables: ['Аналіз поточної воронки', 'Визначення фінансових KPI', 'Синхронізація очікувань'],
      icon: Compass
    },
    {
      number: '02',
      title: 'Аналітика та дослідження',
      desc: 'Аналізую цільову аудиторію, конкурентів, ринок, сильні сторони бізнесу та точки зростання. Жодних здогадок — лише оцифровані факти.',
      stage: 'АНАЛІТИКА РИНКУ',
      deliverables: ['Карта конкурентів', 'Сегментація платоспроможної ЦА', 'Пошук невидимих точок росту'],
      icon: LineChart
    },
    {
      number: '03',
      title: 'Маркетингова стратегія',
      desc: 'Формую позиціонування, унікальну торгову пропозицію, Tone of Voice, комунікаційну стратегію, контентну систему та шлях клієнта до покупки.',
      stage: 'АРХІТЕКТУРА ВОРОНКИ',
      deliverables: ['Формування УТП бренду', 'Сценарії конверсії в Direct', 'Календарний план запусків'],
      icon: Target
    },
    {
      number: '04',
      title: 'Реалізація та оптимізація',
      desc: 'Переходимо до роботи з контентом і рекламою. Аналізуємо результати, тестуємо гіпотези та коригуємо стратегію відповідно до показників.',
      stage: 'ЗАПУСК ТА ОПТИМІЗАЦІЯ',
      deliverables: ['Запуск рекламних зв’язок', 'Щотижнева оптимізація CPA', 'Регулярні аналітичні звіти'],
      icon: ShieldCheck
    }
  ]

  const handleStepHover = (idx: number) => {
    if (activeStep !== idx) {
      triggerHaptic('light')
      setActiveStep(idx)
    }
  }

  return (
    <section 
      id="methodology" 
      data-theme="light"
      className="relative z-20 py-24 sm:py-36 bg-transparent text-[#141937] overflow-hidden text-left"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-16 border-b border-[#141937]/10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#141937]/60">
              <span className="w-2 h-2 rounded-full bg-[#141937]" />
              <span>05 • ЯК Я БУДУЮ МАРКЕТИНГОВУ СИСТЕМУ</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#141937] leading-[1.02]">
              Не починаю з публікацій. <br />
              <span className="font-editorial normal-case text-[#141937] italic font-normal">
                Починаю з розуміння бізнесу.
              </span>
            </h2>
          </div>

          <div className="text-xs font-semibold uppercase tracking-wider text-[#141937]/50">
            4 ПОСЛІДОВНИХ СИСТЕМНИХ ЕТАПИ
          </div>
        </div>

        {/* Monolithic Continuous Architectural Tunnel (Straight cuts) */}
        <div className="border border-[#141937]/15 rounded-none overflow-hidden bg-white/70 backdrop-blur-sm divide-y lg:divide-y-0 lg:divide-x divide-[#141937]/15 shadow-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx
            const Icon = step.icon

            return (
              <div
                key={step.number}
                onMouseEnter={() => handleStepHover(idx)}
                onClick={() => handleStepHover(idx)}
                className={`p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 cursor-pointer relative group ${
                  isActive ? 'bg-[#141937] text-white shadow-2xl' : 'hover:bg-white text-[#141937]'
                }`}
              >
                {/* Active top line */}
                <div 
                  className={`absolute top-0 inset-x-0 h-1 bg-[#F3C3CF] transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`} 
                />

                <div>
                  {/* Step Head */}
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-current/10">
                    <span className={`font-display text-4xl font-black ${
                      isActive ? 'text-[#F3C3CF]' : 'text-[#141937]'
                    }`}>
                      {step.number}
                    </span>
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 ${
                      isActive ? 'bg-white/15 text-[#EEEBDA]' : 'bg-[#141937]/5 text-[#141937]/70'
                    }`}>
                      <Icon className="w-3 h-3" />
                      <span>{step.stage}</span>
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-black uppercase tracking-tight mb-4">
                    {step.title}
                  </h3>

                  <p className={`text-sm leading-relaxed font-normal ${
                    isActive ? 'text-[#EEEBDA]/90' : 'text-[#141937]/75'
                  }`}>
                    {step.desc}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="mt-6 pt-5 border-t border-current/10 space-y-2.5">
                    {step.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs font-semibold">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${
                          isActive ? 'text-[#F3C3CF]' : 'text-[#141937]/60'
                        }`} />
                        <span className={isActive ? 'text-[#EEEBDA]/85' : 'text-[#141937]/80'}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-8 border-t border-current/10 flex items-center justify-between text-xs font-semibold uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">
                  <span>{isActive ? 'АКТИВНИЙ ЕТАП' : 'ДЕТАЛІ ЕТАПУ'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Process Note */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-semibold uppercase tracking-wider text-[#141937]/60">
          <span>СИСТЕМНА ПОСЛІДОВНІСТЬ • КОЖЕН КРОК ПРАЦЮЄ НА ПРИБУТОК</span>
          <span className="text-[#141937]">АЛІНА ВОЛОШИНА | SMM & MARKETING</span>
        </div>

      </div>
    </section>
  )
}
