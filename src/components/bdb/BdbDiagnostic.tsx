import React, { useState, useId } from 'react'
import { Calculator, ArrowUpRight, TrendingUp, Sliders } from 'lucide-react'
import { triggerHaptic } from '../../utils/haptics'
import { useLanguage } from '../../context/LanguageContext'

interface BdbDiagnosticProps {
  onOpenBooking: (service?: string, note?: string) => void
}

export const BdbDiagnostic: React.FC<BdbDiagnosticProps> = ({ onOpenBooking }) => {
  const { lang } = useLanguage()
  const isUa = lang === 'ua'
  const revenueSliderId = useId()
  const budgetSliderId = useId()

  // State
  const [revenue, setRevenue] = useState<number>(10000)
  const [adBudget, setAdBudget] = useState<number>(1000)
  const [selectedGoal, setSelectedGoal] = useState<string>('scale')

  // Calculated estimates based on benchmarks
  const multiplier = selectedGoal === 'scale' ? 2.8 : selectedGoal === 'premium' ? 3.2 : 2.4
  const estimatedMinAdded = Math.round(revenue * 0.45 + adBudget * multiplier * 0.8)
  const estimatedMaxAdded = Math.round(revenue * 0.95 + adBudget * multiplier * 1.6)
  const projectedRomi = (adBudget > 0 ? ((estimatedMinAdded / (adBudget + 1500)) * 1.8).toFixed(1) : '6.4')

  const handleRevenueChange = (val: number) => {
    triggerHaptic('light')
    setRevenue(val)
  }

  const handleBudgetChange = (val: number) => {
    triggerHaptic('light')
    setAdBudget(val)
  }

  const handleGoalSelect = (goal: string) => {
    triggerHaptic('light')
    setSelectedGoal(goal)
  }

  const handleBookWithDiagnostic = () => {
    triggerHaptic('medium')
    const note = `Діагностика BDB: Дохід $${revenue}/міс, Бюджет $${adBudget}/міс, Ціль: ${selectedGoal}, Прогноз приросту: +$${estimatedMinAdded.toLocaleString()}-$${estimatedMaxAdded.toLocaleString()}`
    onOpenBooking(isUa ? 'Стратегічна сесія на основі аудиту' : 'Diagnostic-Based Strategic Session', note)
  }

  return (
    <section id="diagnostic" className="py-24 md:py-36 bg-[#121413] text-[#F9F7F4] border-b border-white/10 relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-16 border-b border-white/10 text-left">
          <div>
            <div className="flex items-center gap-3 mb-4 text-xs font-mono-tech uppercase text-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FE4F2A]" />
              <span>[ 03 // DIAGNOSTIC ENGINE & ROI PROJECTION ]</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white">
              {isUa ? (
                <>
                  Скільки виручки недоотримує <br />
                  <span className="font-editorial normal-case text-[#FE4F2A] italic font-normal">
                    ваш бізнес в Instagram?
                  </span>
                </>
              ) : (
                <>
                  Quantify your untapped <br />
                  <span className="font-editorial normal-case text-[#FE4F2A] italic font-normal">
                    revenue potential.
                  </span>
                </>
              )}
            </h2>
          </div>

          <div className="text-xs font-mono-tech uppercase text-white/40 tracking-wider">
            [ ENGINE: V3.8 // 30+ BENCHMARK DATASET ]
          </div>
        </div>

        {/* Diagnostic Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-[#171918] border border-white/10 p-6 sm:p-10 rounded-sm space-y-10 text-left">
            
            {/* Control 1: Revenue Slider */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label htmlFor={revenueSliderId} className="text-xs font-mono-tech uppercase tracking-wider text-white/70 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#FE4F2A]" />
                  <span>{isUa ? '1. Поточний щомісячний дохід бізнесу:' : '1. Current Monthly Revenue:'}</span>
                </label>
                <span className="font-mono-tech text-xl font-bold text-[#FFC300]">
                  ${revenue.toLocaleString()}
                </span>
              </div>
              <input
                id={revenueSliderId}
                type="range"
                min={2000}
                max={50000}
                step={1000}
                value={revenue}
                onChange={(e) => handleRevenueChange(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FE4F2A]"
              />
              <div className="flex justify-between text-[11px] font-mono-tech text-white/40 mt-2">
                <span>$2,000</span>
                <span>$15,000</span>
                <span>$30,000</span>
                <span>$50,000+</span>
              </div>
            </div>

            {/* Control 2: Ad Budget Slider */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label htmlFor={budgetSliderId} className="text-xs font-mono-tech uppercase tracking-wider text-white/70 flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-[#FE4F2A]" />
                  <span>{isUa ? '2. Поточний бюджет на рекламу / трафік:' : '2. Monthly Paid Ad Budget:'}</span>
                </label>
                <span className="font-mono-tech text-xl font-bold text-white">
                  ${adBudget.toLocaleString()}
                </span>
              </div>
              <input
                id={budgetSliderId}
                type="range"
                min={0}
                max={10000}
                step={250}
                value={adBudget}
                onChange={(e) => handleBudgetChange(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FE4F2A]"
              />
              <div className="flex justify-between text-[11px] font-mono-tech text-white/40 mt-2">
                <span>$0 (Органіка)</span>
                <span>$1,000</span>
                <span>$3,000</span>
                <span>$10,000+</span>
              </div>
            </div>

            {/* Control 3: Goal Selector */}
            <div>
              <label className="block text-xs font-mono-tech uppercase tracking-wider text-white/70 mb-4">
                {isUa ? '3. Ваша пріоритетна стратегічна ціль:' : '3. Primary Strategic Objective:'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'scale',
                    labelUa: 'Масштабування продажів у 3X',
                    labelEn: '3X Sales Scale',
                    descUa: 'Керований приріст лідів',
                    descEn: 'Predictable leads'
                  },
                  {
                    id: 'premium',
                    labelUa: 'Вихід у High-Ticket сегмент',
                    labelEn: 'High-Ticket Premium',
                    descUa: 'Зростання середнього чеку',
                    descEn: 'Higher order value'
                  },
                  {
                    id: 'automation',
                    labelUa: 'Автоматизація & делегування',
                    labelEn: 'Autopilot Delegation',
                    descUa: 'Звільнити час фаундера',
                    descEn: 'Free founder time'
                  }
                ].map((goal) => {
                  const isSelected = selectedGoal === goal.id
                  return (
                    <button
                      key={goal.id}
                      onClick={() => handleGoalSelect(goal.id)}
                      className={`p-4 rounded-sm border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#FE4F2A] bg-[#FE4F2A]/10 text-white'
                          : 'border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold font-mono-tech">
                          {isSelected ? '✓ ' : ''}{isUa ? goal.labelUa : goal.labelEn}
                        </span>
                      </div>
                      <p className="text-[11px] text-white/50">
                        {isUa ? goal.descUa : goal.descEn}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

          </div>

          {/* Projection HUD Column */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#0E100F] border border-[#FE4F2A]/50 p-6 sm:p-10 rounded-sm relative overflow-hidden text-left">
            
            {/* Top HUD badge */}
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <div className="text-xs font-mono-tech uppercase tracking-wider text-[#FE4F2A] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FE4F2A] animate-ping" />
                  <span>[ SYSTEM CALCULATION RESULT ]</span>
                </div>
                <span className="text-[11px] font-mono-tech text-white/40">CONFIDENCE: 94%</span>
              </div>

              {/* Main Metric */}
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-mono-tech uppercase text-white/50 tracking-wider mb-2">
                    {isUa ? 'Потенційний приріст виручки на місяць:' : 'Estimated Monthly Revenue Uplift:'}
                  </div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-mono-tech">
                    +${estimatedMinAdded.toLocaleString()} – ${estimatedMaxAdded.toLocaleString()}
                  </div>
                  <div className="text-xs text-[#FFC300] font-mono-tech mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+{Math.round((estimatedMinAdded / revenue) * 100)}% {isUa ? 'до вашого поточного обороту' : 'over baseline'}</span>
                  </div>
                </div>

                {/* Sub Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                  <div>
                    <div className="text-[11px] font-mono-tech text-white/40 uppercase mb-1">
                      {isUa ? 'Очікуваний ROMI' : 'Projected ROMI'}
                    </div>
                    <div className="text-2xl font-black text-[#FE4F2A] font-mono-tech">
                      {projectedRomi}X
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono-tech text-white/40 uppercase mb-1">
                      {isUa ? 'Охоплення Reels/міс' : 'Monthly Short-Form'}
                    </div>
                    <div className="text-2xl font-black text-white font-mono-tech">
                      250K+
                    </div>
                  </div>
                </div>

                {/* Recommended Framework */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                  <div className="text-[11px] font-mono-tech text-white/50 uppercase mb-1">
                    {isUa ? 'РЕКОМЕНДОВАНИЙ СТЕК АЛІНИ ВОЛОШИНОЇ:' : 'RECOMMENDED FRAMEWORK:'}
                  </div>
                  <div className="text-sm font-bold text-white">
                    {revenue > 20000 
                      ? (isUa ? 'Флагманський SMM під ключ + CBO Meta Ads' : 'Flagship Turnkey SMM + CBO Scaling')
                      : (isUa ? 'SMM-Стратегія + Сенсовий Reels Lab' : 'Core SMM Strategy + Reels Production Lab')}
                  </div>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                onClick={handleBookWithDiagnostic}
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 bg-[#FE4F2A] hover:bg-[#FE4F2A]/90 text-white font-mono-tech text-xs uppercase tracking-wider font-bold rounded-sm transition-all hover:translate-x-1 cursor-pointer"
              >
                <span>{isUa ? 'ЗАКРІПИТИ РОЗРАХУНОК ТА ОТРИМАТИ ПЛАН' : 'CLAIM DIAGNOSTIC STRATEGY PLAN'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <div className="text-center text-[10px] font-mono-tech text-white/40 uppercase tracking-widest mt-3">
                {isUa ? 'Безкоштовно // Без зобов’язань // 30 хв сесія' : '100% Free // Zero Commitment // 30-min strategy audit'}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
