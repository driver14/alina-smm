import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XCircle, CheckCircle2, Sparkles, AlertCircle, TrendingUp } from 'lucide-react'
import { triggerHaptic } from '../../utils/haptics'

export const BeforeAfterMatrix: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'system' | 'chaos'>('system')

  const handleTabSwitch = (tab: 'system' | 'chaos') => {
    triggerHaptic('light')
    setActiveTab(tab)
  }

  return (
    <section className="py-20 relative bg-white/50 border-y border-[#141937]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141937]/5 border border-[#141937]/10 text-xs font-bold text-[#141937] uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#141937]" />
            Порівняння підходів
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#141937] tracking-tight text-balance mb-4">
            Чому 90% сторінок не продають, а наша система дає{' '}
            <span className="relative inline-block px-2 py-0.5 rounded-md bg-[#F3C3CF] text-[#141937]">
              окупність 10X
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#141937]/75 text-pretty font-medium">
            Різниця між злитим бюджетом і чергою в Direct полягає не в кількості постів, а в архітектурі воронки.
          </p>
        </div>

        {/* Interactive Comparison Switcher Pill */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#141937]/5 border border-[#141937]/10 backdrop-blur-md">
            <button
              type="button"
              onClick={() => handleTabSwitch('system')}
              className={`relative px-6 py-2.5 rounded-xl text-sm font-bold transition-colors duration-200 flex items-center gap-2 ${
                activeTab === 'system' ? 'text-white' : 'text-[#141937]/70 hover:text-[#141937]'
              }`}
            >
              {activeTab === 'system' && (
                <motion.div
                  layoutId="matrix-tab"
                  className="absolute inset-0 bg-[#141937] rounded-xl shadow-md"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Система Аліни Волошиної
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleTabSwitch('chaos')}
              className={`relative px-6 py-2.5 rounded-xl text-sm font-bold transition-colors duration-200 flex items-center gap-2 ${
                activeTab === 'chaos' ? 'text-white' : 'text-[#141937]/70 hover:text-[#141937]'
              }`}
            >
              {activeTab === 'chaos' && (
                <motion.div
                  layoutId="matrix-tab"
                  className="absolute inset-0 bg-red-950/90 rounded-xl shadow-md"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-400" />
                Звичайний хаотичний SMM
              </span>
            </button>
          </div>
        </div>

        {/* Comparison Cards Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'system' ? (
            <motion.div
              key="system"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <div className="p-6 rounded-2xl bg-white border border-emerald-500/20 shadow-xl shadow-emerald-500/5 hover:border-emerald-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-[#141937] mb-2">Глибоке позиціонування</h3>
                <p className="text-sm text-[#141937]/75 font-medium leading-relaxed">
                  Чітка диференціація від конкурентів. Клієнти розуміють цінність послуги ще до того, як запитати ціну.
                </p>
                <div className="mt-4 pt-3 border-t border-black/5 text-xs font-bold text-emerald-700">
                  Результат: високий середній чек ($500+)
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-emerald-500/20 shadow-xl shadow-emerald-500/5 hover:border-emerald-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-[#141937] mb-2">Окупність бюджету 10X</h3>
                <p className="text-sm text-[#141937]/75 font-medium leading-relaxed">
                  Кожен $1 у рекламу приносить від $5 до $10 виручки за рахунок вивірених зв'язок та фільтрації аудиторії.
                </p>
                <div className="mt-4 pt-3 border-t border-black/5 text-xs font-bold text-emerald-700">
                  Приклад: $200 бюджет → $2,000 виручки
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-emerald-500/20 shadow-xl shadow-emerald-500/5 hover:border-emerald-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-[#141937] mb-2">Сенсові Reels & Сценарії</h3>
                <p className="text-sm text-[#141937]/75 font-medium leading-relaxed">
                  Відео працюють як безкоштовний відділ продажів: знімають заперечення, транслюють експертність і ведуть у Direct.
                </p>
                <div className="mt-4 pt-3 border-t border-black/5 text-xs font-bold text-emerald-700">
                  Результат: стабільний потік заявок
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-emerald-500/20 shadow-xl shadow-emerald-500/5 hover:border-emerald-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-[#141937] mb-2">Прогнозований спокій</h3>
                <p className="text-sm text-[#141937]/75 font-medium leading-relaxed">
                  Ви не думаєте щодня, що викласти у сторіс. Система працює за затвердженим планом і щотижневими звітами.
                </p>
                <div className="mt-4 pt-3 border-t border-black/5 text-xs font-bold text-emerald-700">
                  Результат: ви фокусуєтесь на бізнесі
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="chaos"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
                  <XCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-rose-950 mb-2">Пости заради постів</h3>
                <p className="text-sm text-rose-900/80 font-medium leading-relaxed">
                  Безсистемні публікації, картинки з Pinterest, сторіс «доброго ранку». Нуль розуміння, як це має продавати.
                </p>
                <div className="mt-4 pt-3 border-t border-rose-200 text-xs font-bold text-rose-700">
                  Наслідок: втрата часу та енергії
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-rose-950 mb-2">Злитий рекламний бюджет</h3>
                <p className="text-sm text-rose-900/80 font-medium leading-relaxed">
                  Таргет запускається навмання на кнопку «Просувати». Кліки є, але реальних продажів і записів нуль.
                </p>
                <div className="mt-4 pt-3 border-t border-rose-200 text-xs font-bold text-rose-700">
                  Наслідок: зневіра в інструменті
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
                  <XCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-rose-950 mb-2">«Пусті» клієнти у Direct</h3>
                <p className="text-sm text-rose-900/80 font-medium leading-relaxed">
                  Люди запитують «ціна?», отримують відповідь і зникають. Немає воронки догріву та закриття заперечень.
                </p>
                <div className="mt-4 pt-3 border-t border-rose-200 text-xs font-bold text-rose-700">
                  Наслідок: демпінг і низький чек
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-rose-950 mb-2">Вигорання експерта</h3>
                <p className="text-sm text-rose-900/80 font-medium leading-relaxed">
                  Постійне відчуття каторги: треба щось знімати, придумувати, але очікуваного результату в грошах немає.
                </p>
                <div className="mt-4 pt-3 border-t border-rose-200 text-xs font-bold text-rose-700">
                  Наслідок: закидання профілю
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
