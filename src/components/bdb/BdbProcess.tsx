import React, { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { triggerHaptic } from '../../utils/haptics'

export const BdbProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
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

  const handleStepHover = (idx: number) => {
    if (activeStep !== idx) {
      triggerHaptic('light')
      setActiveStep(idx)
    }
  }

  return (
    <section 
      id="process" 
      data-theme="light"
      className="relative z-20 py-24 sm:py-36 bg-transparent text-[#141937] overflow-hidden text-left"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-16 border-b border-[#141937]/10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#141937]/60">
              <span className="w-2 h-2 rounded-full bg-[#141937]" />
              <span>09 • ЯК ВІДБУВАЄТЬСЯ СПІВПРАЦЯ</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#141937] leading-[1.02]">
              Зрозумілий процес <br />
              <span className="font-editorial normal-case text-[#141937] italic font-normal">
                від знайомства до результату.
              </span>
            </h2>
          </div>

          <div className="text-xs font-semibold uppercase tracking-wider text-[#141937]/50">
            5 ПОСЛІДОВНИХ ЕТАПІВ
          </div>
        </div>

        {/* Monolithic Kinetic Journey Rail (Straight cuts) */}
        <div className="border border-[#141937]/15 rounded-none overflow-hidden bg-white/70 backdrop-blur-sm divide-y xl:divide-y-0 xl:divide-x divide-[#141937]/15 shadow-xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5">
          {steps.map((st, idx) => {
            const isActive = activeStep === idx

            return (
              <div
                key={st.num}
                onMouseEnter={() => handleStepHover(idx)}
                onClick={() => handleStepHover(idx)}
                className={`p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 cursor-pointer relative group ${
                  isActive ? 'bg-[#141937] text-white shadow-2xl' : 'hover:bg-white text-[#141937]'
                }`}
              >
                {/* Active indicator */}
                <div 
                  className={`absolute top-0 inset-x-0 h-1 bg-[#F3C3CF] transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`} 
                />

                <div>
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-current/10">
                    <span className={`font-display text-3xl sm:text-4xl font-black ${
                      isActive ? 'text-[#F3C3CF]' : 'text-[#141937]'
                    }`}>
                      {st.num}
                    </span>
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      isActive ? 'bg-white/15 text-[#EEEBDA]' : 'bg-[#141937]/5 text-[#141937]/70'
                    }`}>
                      {st.stage}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight mb-3">
                    {st.title}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed font-normal ${
                    isActive ? 'text-[#EEEBDA]/90' : 'text-[#141937]/75'
                  }`}>
                    {st.desc}
                  </p>
                </div>

                <div className="pt-6 mt-8 border-t border-current/10 flex items-center justify-between text-xs font-semibold uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">
                  <span>{isActive ? 'АКТИВНИЙ КРОК' : 'ЕТАП СПІВПРАЦІ'}</span>
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isActive ? 'text-[#F3C3CF]' : 'text-[#141937]'}`} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Process Note */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-semibold uppercase tracking-wider text-[#141937]/60">
          <span>ПРОЗОРІСТЬ ТА ЗРОЗУМІЛІСТЬ НА КОЖНОМУ ЕТАПІ</span>
          <span className="text-[#141937]">АЛІНА ВОЛОШИНА | SMM & MARKETING</span>
        </div>

      </div>
    </section>
  )
}
