import { useState } from 'react'
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react'
import { TiltCard } from './TiltCard'
import { useLanguage } from '../context/LanguageContext'

interface InteractiveCalculatorProps {
  onRecommendService: (serviceName: string, details?: string) => void
}

export const InteractiveCalculator = ({ onRecommendService }: InteractiveCalculatorProps) => {
  const { lang, t } = useLanguage()
  const [selectedNiche, setSelectedNiche] = useState('beauty')
  const [selectedPain, setSelectedPain] = useState('leads')
  const [selectedGoal, setSelectedGoal] = useState('sales')

  // Dynamic calculation of the best package using localized strings
  const getRecommendation = () => {
    if (selectedPain === 'no_system' || selectedGoal === 'audit') {
      const s = t.services.data.find(x => x.id === 'strategy-session')
      return {
        service: s ? s.title : (lang === 'ua' ? 'Стратегічна сесія' : 'Strategy Intensive'),
        reason: t.calculator.auditReason,
        badge: t.calculator.auditBadge
      }
    }
    if (selectedPain === 'ads_drain' && selectedNiche !== 'fashion') {
      const s = t.services.data.find(x => x.id === 'targeted-ads')
      return {
        service: s ? s.title : (lang === 'ua' ? 'Таргетована реклама' : 'Targeted Advertising'),
        reason: t.calculator.adsReason,
        badge: t.calculator.adsBadge
      }
    }
    if (selectedPain === 'delegate') {
      const s = t.services.data.find(x => x.id === 'smm-management')
      return {
        service: s ? s.title : (lang === 'ua' ? 'SMM-супровід' : 'Full SMM Retainer'),
        reason: t.calculator.smmReason,
        badge: t.calculator.smmBadge
      }
    }
    const s = t.services.data.find(x => x.id === 'smm-target')
    return {
      service: s ? s.title : (lang === 'ua' ? 'SMM + таргет' : 'SMM + Paid Ads'),
      reason: t.calculator.comboReason,
      badge: t.calculator.comboBadge
    }
  }

  const rec = getRecommendation()

  return (
    <section id="calculator" className="py-24 bg-[#F9F7F1] border-b border-[#141937]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-[#141937]/10 text-[#141937] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <img
              src="/pins/pin-loupe.png"
              alt=""
              className="w-5 h-5 object-contain shrink-0 -my-0.5 animate-float-delayed"
            />
            <span>{t.calculator.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#141937] tracking-tight leading-[1.15]">
            {t.calculator.titleBefore}{' '}
            <span className="word-highlight">
              {t.calculator.titleHighlight}
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#141937]/80 leading-relaxed">
            {t.calculator.intro}
          </p>
        </div>

        {/* Diagnostic Tool Card with Soft Rounded Corners */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white/90 backdrop-blur-md border border-[#141937]/10 p-6 sm:p-8 lg:p-10 rounded-3xl shadow-[0_12px_45px_rgba(20,25,55,0.06)]">
          
          {/* Questions (7 cols) */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Step 1: Niche */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[#141937] mb-3">
                {t.calculator.step1Title}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {t.calculator.niches.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => setSelectedNiche(n.id)}
                    className={`p-3.5 text-xs font-bold rounded-xl border transition-all text-left cursor-pointer ${
                      selectedNiche === n.id
                        ? 'bg-[#141937] text-[#EEEBDA] border-[#141937] shadow-sm'
                        : 'bg-[#EEEBDA]/50 text-[#141937] border-[#141937]/10 hover:border-[#141937]/30 hover:bg-white'
                    }`}
                  >
                    {n.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Pain Point */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[#141937] mb-3">
                {t.calculator.step2Title}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {t.calculator.pains.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPain(p.id)}
                    className={`p-4 text-xs font-bold rounded-xl border transition-all text-left cursor-pointer flex items-center gap-2.5 ${
                      selectedPain === p.id
                        ? 'bg-[#141937] text-[#EEEBDA] border-[#141937] shadow-sm'
                        : 'bg-[#EEEBDA]/50 text-[#141937] border-[#141937]/10 hover:border-[#141937]/30 hover:bg-white'
                    }`}
                  >
                    <span className="w-2 h-2 shrink-0 rounded-full bg-[#F3C3CF]"></span>
                    <span>{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Goal */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[#141937] mb-3">
                {t.calculator.step3Title}
              </label>
              <div className="grid grid-cols-1 gap-2.5">
                {t.calculator.goals.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGoal(g.id)}
                    className={`p-4 text-xs font-bold rounded-xl border transition-all text-left cursor-pointer flex items-center justify-between ${
                      selectedGoal === g.id
                        ? 'bg-[#141937] text-[#EEEBDA] border-[#141937] shadow-sm'
                        : 'bg-[#EEEBDA]/50 text-[#141937] border-[#141937]/10 hover:border-[#141937]/30 hover:bg-white'
                    }`}
                  >
                    <span>{g.label}</span>
                    <span className="text-[10px] font-bold opacity-75">
                      {selectedGoal === g.id 
                        ? (lang === 'ua' ? '✓ Обрано' : '✓ Selected') 
                        : (lang === 'ua' ? '+ Вибрати' : '+ Choose')}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Real-time Recommendation Result (5 cols) with Interactive 3D Floating Tilt */}
          <TiltCard maxTilt={5} scale={1.015} glare={true} glareOpacity={0.12} className="lg:col-span-5 h-full rounded-3xl">
            <div className="flex flex-col justify-between bg-[#141937] text-[#EEEBDA] p-6 sm:p-8 rounded-3xl shadow-lg h-full">
              
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#EEEBDA]/15 mb-6">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#F3C3CF] flex items-center gap-1.5">
                    <Sparkles size={14} /> {t.calculator.recBadge}
                  </span>
                  <span className="text-[10px] bg-[#F3C3CF] text-[#141937] font-bold uppercase px-3 py-1 rounded-full">
                    {rec.badge}
                  </span>
                </div>

                <div className="text-xs uppercase tracking-wider opacity-70 mb-1">
                  {lang === 'ua' ? 'Рекомендована послуга:' : 'Recommended service:'}
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-black text-[#EEEBDA] mb-4">
                  {rec.service}
                </h3>

                <div className="p-4 bg-white/10 rounded-2xl border border-white/10 text-xs sm:text-sm leading-relaxed mb-6 font-medium text-[#EEEBDA]/90">
                  {rec.reason}
                </div>

                <div className="space-y-2.5 text-xs font-semibold text-[#EEEBDA]/80 mb-6">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={15} className="text-[#F3C3CF]" />
                    <span>{lang === 'ua' ? 'Розбір вашого продукту перед стартом' : 'Product & funnel audit before start'}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={15} className="text-[#F3C3CF]" />
                    <span>{lang === 'ua' ? 'Команда таргетолога та стратега' : 'In-house media buyer & strategist'}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={15} className="text-[#F3C3CF]" />
                    <span>{lang === 'ua' ? 'Прозорі звіти в цифрах виручки' : 'Transparent revenue & ROI reports'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EEEBDA]/15">
                <button
                  onClick={() => onRecommendService(rec.service, `Niche: ${selectedNiche}, Pain: ${selectedPain}, Goal: ${selectedGoal}`)}
                  className="w-full py-4 px-6 bg-[#F3C3CF] text-[#141937] hover:bg-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <span>{lang === 'ua' ? `Обговорити ${rec.service}` : `Discuss ${rec.service}`}</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>

            </div>
          </TiltCard>

        </div>

      </div>
    </section>
  )
}
