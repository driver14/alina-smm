import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { triggerHaptic } from '../../utils/haptics'

export const BdbFaq: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  const faqs = [
    {
      q: 'З якими нішами ви працюєте?',
      a: 'Працюю з бізнесами та експертами з різних сфер: beauty, fashion, медицина, особисті бренди, онлайн-продукти та послуги.'
    },
    {
      q: 'Чи можна замовити тільки таргетовану рекламу?',
      a: 'Так. Можна замовити окрему послугу з налаштування та ведення реклами без комплексного SMM.'
    },
    {
      q: 'Чи обов’язково замовляти повний пакет послуг?',
      a: 'Ні. Ми можемо сформувати індивідуальний пакет відповідно до ваших цілей, потреб і бюджету.'
    },
    {
      q: 'Чи розробляєте ви стратегію перед початком роботи?',
      a: 'Так. Стратегія є основою співпраці. Перед її розробкою я вивчаю бізнес, аудиторію, конкурентів і поточну ситуацію.'
    },
    {
      q: 'Хто створює контент?',
      a: 'Залежно від обраного формату співпраці контент створює наша команда або ваша сторона за моїми рекомендаціями та технічними завданнями.'
    },
    {
      q: 'Чи можна почати з консультації?',
      a: 'Так. Ви можете записатися на стратегічну сесію, щоб розібрати поточну ситуацію та отримати рекомендації щодо подальшого розвитку.'
    }
  ]

  const toggleFaq = (idx: number) => {
    triggerHaptic('light')
    setOpenIdx(prev => (prev === idx ? null : idx))
  }

  return (
    <section 
      id="faq" 
      data-theme="dark"
      className="relative z-20 py-24 sm:py-36 bg-transparent text-[#EEEBDA] overflow-hidden text-left"
    >
      {/* Background ambient luxury pearl glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#F3C3CF]/5 blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Section Header (Screen 2 Luxury Dark Aesthetics) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-14 border-b border-white/10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#F3C3CF]">
              <span className="w-2 h-2 rounded-full bg-[#F3C3CF]" />
              <span>10 • ЧАСТІ ЗАПИТАННЯ</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.02]">
              Відповіді на запитання, <br />
              <span className="font-editorial normal-case text-[#F3C3CF] italic font-normal">
                які виникають найчастіше.
              </span>
            </h2>
          </div>

          <div className="text-xs font-semibold uppercase tracking-wider text-[#EEEBDA]/50">
            FAQ & ДЕТАЛІ СПІВПРАЦІ
          </div>
        </div>

        {/* FAQ Accordion List in Dark Luxury Styling */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <div
                key={idx}
                className={`rounded-none border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-white/[0.08] border-white/30 shadow-2xl backdrop-blur-md'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 sm:p-8 flex items-center justify-between gap-4 text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="font-display text-lg sm:text-xl font-black text-[#F3C3CF] group-hover:scale-110 transition-transform">
                      0{idx + 1}
                    </span>
                    <span className="text-base sm:text-xl font-bold uppercase tracking-tight text-white group-hover:text-[#EEEBDA] transition-colors">
                      {faq.q}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0 transition-transform duration-300 group-hover:scale-105 border border-white/10">
                    {isOpen ? <Minus className="w-4 h-4 text-[#F3C3CF]" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="px-6 sm:px-8 pb-8 pt-2 text-[#EEEBDA]/85 text-base sm:text-lg leading-relaxed font-normal border-t border-white/10"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
