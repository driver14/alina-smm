import React, { useState } from 'react'
import { Calculator, Sparkles, ArrowRight } from 'lucide-react'
import { triggerHaptic } from '../../utils/haptics'

interface KineticDiagnosticProps {
  onOpenBooking: (service: string, note: string) => void
}

const NICHES = [
  { id: 'beauty', label: 'Beauty & Сфера послуг', avgCheck: '$400' },
  { id: 'fashion', label: 'Fashion & Шоуруми', avgCheck: '$250' },
  { id: 'expert', label: 'Експерти & Коучинг', avgCheck: '$800' },
  { id: 'horeca', label: 'HoReCa & Заклади', avgCheck: '$150' },
  { id: 'b2b', label: 'B2B & Інтер’єр / Нерухомість', avgCheck: '$2,000' }
]

const STAGES = [
  { id: 'zero', label: 'Старт з нуля', desc: 'Сторінки немає або вона пуста' },
  { id: 'stuck', label: 'Сторінка є, але мало продажів', desc: 'Є підписники, але Direct мовчить' },
  { id: 'scale', label: 'Масштабування бізнесу', desc: 'Хочу системний x2–x5 ріст' }
]

export const KineticDiagnostic: React.FC<KineticDiagnosticProps> = ({ onOpenBooking }) => {
  const [selectedNiche, setSelectedNiche] = useState(NICHES[0].id)
  const [selectedStage, setSelectedStage] = useState(STAGES[1].id)
  const [monthlyTarget, setMonthlyTarget] = useState(3000)

  const handleNicheSelect = (id: string) => {
    triggerHaptic('light')
    setSelectedNiche(id)
  }

  const handleStageSelect = (id: string) => {
    triggerHaptic('light')
    setSelectedStage(id)
  }

  // Dynamic calculations
  const nicheData = NICHES.find(n => n.id === selectedNiche) || NICHES[0]
  const estLeads = Math.round(monthlyTarget / 80)
  const estRomi = selectedStage === 'scale' ? '×8 – ×10' : '×5 – ×8'
  const recommendedPlan = selectedStage === 'zero' 
    ? 'Стратегічний старт + Упаковка' 
    : selectedStage === 'scale' 
      ? 'Повний SMM-супровід під ключ + Таргет' 
      : 'Стратегія воронки продажів + Reels'

  const handleApply = () => {
    triggerHaptic('medium')
    const note = `Діагностика: Ніша ${nicheData.label}, Етап: ${STAGES.find(s => s.id === selectedStage)?.label}, Ціль: $${monthlyTarget}/міс. Прогнозовано ~${estLeads} заявок.`
    onOpenBooking(recommendedPlan, note)
  }

  return (
    <section id="calculator" className="py-24 relative bg-gradient-to-b from-transparent via-white/40 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141937]/5 border border-[#141937]/10 text-xs font-bold text-[#141937] uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5 text-[#141937]" />
            Інтерактивний розрахунок потенціалу
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#141937] tracking-tight text-balance mb-4">
            Скільки заявок та прибутку може приносити{' '}
            <span className="relative inline-block px-2 py-0.5 rounded-md bg-[#F3C3CF] text-[#141937]">
              ваш Instagram?
            </span>
          </h2>
          <p className="text-base text-[#141937]/75 font-medium max-w-xl mx-auto text-pretty">
            Пройдіть експрес-діагностику за 30 секунд і отримайте рекомендований формат запуску з розрахунком лідів.
          </p>
        </div>

        {/* Diagnostic Panel */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#141937]/10 shadow-2xl shadow-[#141937]/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Inputs (7 cols) */}
            <div className="lg:col-span-7 space-y-8 text-left">
              
              {/* Step 1: Niche */}
              <div>
                <label className="block text-xs font-bold text-[#141937]/70 uppercase tracking-wider mb-3">
                  1. Оберіть напрямок вашої діяльності
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {NICHES.map(n => (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => handleNicheSelect(n.id)}
                      className={`p-3.5 rounded-xl text-left border transition-all text-xs font-bold flex items-center justify-between ${
                        selectedNiche === n.id
                          ? 'border-[#141937] bg-[#141937] text-white shadow-md'
                          : 'border-black/5 bg-[#F9F7F1] text-[#141937] hover:border-black/20'
                      }`}
                    >
                      <span>{n.label}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                        selectedNiche === n.id ? 'bg-[#F3C3CF] text-[#141937]' : 'bg-black/5 text-[#141937]/60'
                      }`}>
                        чек ~{n.avgCheck}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Current Stage */}
              <div>
                <label className="block text-xs font-bold text-[#141937]/70 uppercase tracking-wider mb-3">
                  2. Поточний стан вашої сторінки
                </label>
                <div className="space-y-2">
                  {STAGES.map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleStageSelect(s.id)}
                      className={`w-full p-3.5 rounded-xl text-left border transition-all flex items-center justify-between ${
                        selectedStage === s.id
                          ? 'border-[#141937] bg-[#141937] text-white shadow-md'
                          : 'border-black/5 bg-[#F9F7F1] text-[#141937] hover:border-black/20'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold">{s.label}</div>
                        <div className={`text-[11px] font-medium ${selectedStage === s.id ? 'text-white/70' : 'text-[#141937]/60'}`}>
                          {s.desc}
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        selectedStage === s.id ? 'border-[#F3C3CF] bg-[#F3C3CF]' : 'border-black/20'
                      }`}>
                        {selectedStage === s.id && <div className="w-1.5 h-1.5 rounded-full bg-[#141937]" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Target Revenue Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold text-[#141937]/70 uppercase tracking-wider">
                    3. Цільовий дохід на місяць з соцмереж
                  </label>
                  <span className="text-base font-black text-[#141937] font-mono tabular-nums">
                    ${monthlyTarget.toLocaleString('en-US')}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="15000"
                  step="500"
                  value={monthlyTarget}
                  onChange={(e) => {
                    setMonthlyTarget(Number(e.target.value))
                    triggerHaptic('light')
                  }}
                  className="w-full h-2 bg-[#141937]/10 rounded-lg appearance-none cursor-pointer accent-[#141937]"
                />
                <div className="flex justify-between text-[11px] text-[#141937]/50 font-mono mt-1 font-semibold">
                  <span>$1,000</span>
                  <span>$5,000</span>
                  <span>$10,000</span>
                  <span>$15,000+</span>
                </div>
              </div>

            </div>

            {/* Right Output Card (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#141937] to-[#1E254F] text-white shadow-xl text-left">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F3C3CF] uppercase tracking-wider mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  Індивідуальний прогноз
                </div>

                <div className="space-y-4 mb-6">
                  <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                    <div className="text-xs text-white/70 font-medium">Очікуваний обсяг заявок</div>
                    <div className="text-2xl font-black text-white font-mono tabular-nums">
                      ~{estLeads} – {estLeads + 15} лідів / міс
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                    <div className="text-xs text-white/70 font-medium">Прогнозована окупність реклами</div>
                    <div className="text-2xl font-black text-[#F3C3CF] font-mono tabular-nums">
                      {estRomi} ROMI
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 mb-6">
                  <div className="text-xs text-white/60 font-semibold mb-1 uppercase tracking-wider">
                    Рекомендований план:
                  </div>
                  <div className="text-base font-black text-white leading-snug">
                    {recommendedPlan}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleApply}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#F3C3CF] to-[#E2C39B] text-[#141937] font-black text-sm shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>Отримати план реалізації</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
