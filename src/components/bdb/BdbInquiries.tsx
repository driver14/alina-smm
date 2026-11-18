import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Activity } from 'lucide-react'
import { triggerHaptic } from '../../utils/haptics'

interface BdbInquiriesProps {
  onOpenBooking: () => void
}

interface InquiryDetail {
  number: string
  problem: string
  diagnosis: string
  solution: string
  metricImpact: string
}

export const BdbInquiries: React.FC<BdbInquiriesProps> = ({ onOpenBooking }) => {
  const [activeInquiryIdx, setActiveInquiryIdx] = useState<number>(0)

  const inquiries: InquiryDetail[] = [
    {
      number: '01',
      problem: 'Є соціальні мережі, але немає стабільного потоку клієнтів.',
      diagnosis: 'Розрив між публікаціями та шляхом клієнта. Відсутня прогрівочна воронка.',
      solution: 'Створюємо чітку архітектуру: лід-магніт ⟶ закріплені кейси ⟶ прямий заклик до запису.',
      metricImpact: 'Зростання конверсії в діалог на +45% у перші 3 тижні'
    },
    {
      number: '02',
      problem: 'Контент виходить регулярно, але не приносить звернень.',
      diagnosis: 'Контент заради контенту без оферів, доказів експертності та закриття заперечень.',
      solution: 'Перехід на смисловий контент: розбори кейсів клієнтів, розвінчання страхів та відео-демонстрації.',
      metricImpact: 'Заявки безпосередньо з Stories та Reels без зайвого навантаження'
    },
    {
      number: '03',
      problem: 'Реклама не дає бажаної кількості заявок або зливає бюджет.',
      diagnosis: 'Таргет веде на холодний непідготовлений профіль, аудиторії занадто широкі, креативи вигоріли.',
      solution: 'Гіперсегментація аудиторій у США/Європі/Україні, тестування 8+ відео-зв’язок та ретаргетинг.',
      metricImpact: 'Зниження вартості ліда (CPL) у 2–3 рази з окупністю ROMI до 10.2X'
    },
    {
      number: '04',
      problem: 'Немає чіткого позиціонування та розуміння своєї аудиторії.',
      diagnosis: 'Бізнес намагається продавати всім, тому ніхто не відчуває цінності високого чека.',
      solution: 'Глибокий маркетинговий аналіз конкурентів і платоспроможних сегментів. Виділення УТП.',
      metricImpact: 'Збільшення середнього чека послуг на 30–50%'
    },
    {
      number: '05',
      problem: 'SMM і таргет працюють окремо, без єдиної системи.',
      diagnosis: 'Таргетолог і контентмейкер не синхронізовані: реклама обіцяє одне, а в профілі інше.',
      solution: 'Єдиний центр управління маркетингом під моїм особистим керівництвом та власною командою.',
      metricImpact: '100% узгодженість кожного етапу воронки без втрати лідів'
    },
    {
      number: '06',
      problem: 'Бізнес розвивається, але маркетинг не встигає за потребами.',
      diagnosis: 'Власник перевантажений рутиною та контролем підрядників замість стратегічного зростання.',
      solution: 'Повний цикл реалізації «під ключ»: від відеомонтажу та дизайну до аналітики та звітів.',
      metricImpact: 'Звільнення 25+ годин власника щотижня за умови прогнозованого зростання виручки'
    }
  ]

  const niches = [
    'Fashion & Одяг',
    'Beauty & Естетика',
    'Медицина & Клініки',
    'Особисті бренди & Експерти',
    'EdTech & Онлайн-школи'
  ]

  const handleSelect = (idx: number) => {
    triggerHaptic('light')
    setActiveInquiryIdx(idx)
  }

  const handleBook = () => {
    triggerHaptic('medium')
    onOpenBooking()
  }

  return (
    <section 
      id="inquiries" 
      data-theme="dark"
      className="relative z-20 py-24 sm:py-36 bg-transparent text-[#EEEBDA] overflow-hidden text-left"
    >
      {/* Background ambient luxury pearl glow */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-[#F3C3CF]/10 blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-14 border-b border-white/10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#F3C3CF]">
              <span className="w-2 h-2 rounded-full bg-[#F3C3CF] animate-pulse" />
              <span>04 • З ЯКИМИ ЗАПИТАМИ Я ПРАЦЮЮ</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.02]">
              Допомагаю перетворити хаотичний SMM <br />
              <span className="font-editorial normal-case text-[#F3C3CF] italic font-normal">
                на зрозумілу маркетингову систему.
              </span>
            </h2>
          </div>

          <div className="text-xs font-semibold uppercase tracking-wider text-[#EEEBDA]/50">
            ОБЕРІТЬ ВАШ ЗАПИТ ДЛЯ ДІАГНОСТИКИ ↗
          </div>
        </div>

        {/* Interactive Diagnostic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {inquiries.map((item, idx) => {
            const isSelected = activeInquiryIdx === idx

            return (
              <div
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`p-8 rounded-none border transition-all duration-300 flex flex-col justify-between cursor-pointer select-none group relative shadow-xl backdrop-blur-md ${
                  isSelected
                    ? 'bg-white/[0.08] border-[#F3C3CF]'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.05]'
                }`}
              >
                {/* Active Status Accent */}
                <div 
                  className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#F3C3CF] to-transparent transition-opacity duration-300 ${
                    isSelected ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold uppercase tracking-wider ${
                      isSelected ? 'text-[#F3C3CF]' : 'text-white/40'
                    }`}>
                      0{idx + 1} • ЗАПИТ БІЗНЕСУ
                    </span>

                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${
                      isSelected ? 'bg-[#F3C3CF] text-[#141937]' : 'bg-white/10 text-white/40'
                    }`}>
                      {isSelected ? '✓' : '+'}
                    </span>
                  </div>

                  <h3 className={`font-display text-lg sm:text-xl font-black uppercase tracking-tight transition-colors ${
                    isSelected ? 'text-white' : 'text-[#EEEBDA]/85 group-hover:text-white'
                  }`}>
                    {item.problem}
                  </h3>

                  {/* Expanded Diagnosis details when active */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="pt-4 border-t border-white/10 space-y-3 text-xs leading-relaxed"
                      >
                        <div className="text-white/90">
                          <span className="text-[#F3C3CF] font-semibold uppercase block mb-1">СИСТЕМНЕ РІШЕННЯ:</span>
                          {item.solution}
                        </div>
                        <div className="p-2.5 bg-[#F3C3CF]/10 border border-[#F3C3CF]/20 text-[#F3C3CF] font-semibold text-[11px]">
                          ⚡ {item.metricImpact}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
                  <span className={isSelected ? 'text-[#F3C3CF] font-bold' : 'text-[#EEEBDA]/50'}>
                    {isSelected ? 'АКТИВНА ДІАГНОСТИКА' : 'НАТИСНІТЬ ДЛЯ РОЗБОРУ'}
                  </span>
                  <ArrowUpRight className={`w-4 h-4 transition-transform duration-200 ${
                    isSelected ? 'text-[#F3C3CF] translate-x-0.5 -translate-y-0.5' : 'text-white/30'
                  }`} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Selected Diagnostic Action Bar */}
        <div className="p-8 sm:p-10 rounded-none bg-gradient-to-r from-white/[0.06] to-white/[0.02] border border-white/15 text-left flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-2xl backdrop-blur-md mb-14">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase text-[#F3C3CF] tracking-wider font-bold">
              <Activity className="w-4 h-4 text-[#F3C3CF]" />
              <span>ДІАГНОЗ ДЛЯ ВАШОГО ПРОЄКТУ:</span>
            </div>
            <div className="text-base sm:text-lg text-white font-medium">
              «{inquiries[activeInquiryIdx].problem}»
            </div>
            <p className="text-xs sm:text-sm text-[#EEEBDA]/75 font-normal">
              Вкажіть цей запит при бронюванні, і на стратегічній сесії ми почнемо саме з його вирішення.
            </p>
          </div>

          <button
            type="button"
            onClick={handleBook}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white hover:bg-[#EEEBDA] text-[#141937] text-xs font-black uppercase tracking-[0.16em] transition-all hover:scale-102 cursor-pointer shadow-xl rolex-sheen shrink-0"
          >
            <span>ОТРИМАТИ РОЗБІР ЦЬОГО ЗАПИТУ</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Niches Banner */}
        <div className="p-8 sm:p-10 rounded-none bg-white/[0.03] border border-white/10 text-left flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl backdrop-blur-sm">
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase text-[#F3C3CF] tracking-wider font-bold">
              ПРАЦЮЮ З РІЗНИМИ НАПРЯМАМИ
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
              Ніші та бізнес-сегменти:
            </h3>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {niches.map((niche, nIdx) => (
              <span
                key={nIdx}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/15 text-xs font-bold uppercase tracking-wider text-[#EEEBDA] hover:border-[#F3C3CF] transition-colors"
              >
                {niche}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
