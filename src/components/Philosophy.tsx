import { useState } from 'react'
import { AlertTriangle, CheckCircle, Layers, BarChart2, Compass, Film } from 'lucide-react'
import { TiltCard } from './TiltCard'
import { useLanguage } from '../context/LanguageContext'

export const Philosophy = () => {
  const { t } = useLanguage()
  const [activeStep, setActiveStep] = useState(0)

  const stepIcons = [
    <Compass size={22} />,
    <BarChart2 size={22} />,
    <Layers size={22} />,
    <Film size={22} />
  ]

  return (
    <section id="approach" className="py-24 bg-[#EEEBDA] border-b border-[#141937]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-[#141937]/10 text-[#141937] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <img
              src="/pins/pin-pushpin.png"
              alt=""
              className="w-5 h-5 object-contain shrink-0 -my-0.5 animate-float"
            />
            <span>{t.philosophy.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#141937] tracking-tight leading-[1.15]">
            {t.philosophy.titleBefore}{' '}
            <span className="word-highlight">
              {t.philosophy.titleHighlight}
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#141937]/80 leading-relaxed">
            {t.philosophy.intro}
          </p>
        </div>

        {/* The Big Difference: Comparison Grid with Softer Rounded Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          
          {/* Card 1: The Broken Traditional Way */}
          <TiltCard maxTilt={4} scale={1.015} glare={false} className="h-full">
            <div className="bg-white/70 backdrop-blur-sm border border-red-200/80 p-8 rounded-3xl relative shadow-[0_8px_30px_rgba(20,25,55,0.04)] h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#141937]/10 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-center justify-center font-bold">
                      <AlertTriangle size={18} />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold uppercase tracking-wide text-[#141937]">
                      {t.philosophy.brokenTitle}
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 bg-red-100/70 text-red-700 rounded-full border border-red-200 uppercase">
                    {t.philosophy.brokenBadge}
                  </span>
                </div>

                <p className="text-sm text-[#141937]/80 leading-relaxed mb-6">
                  {t.philosophy.brokenDesc}
                </p>

                <ul className="space-y-4 text-xs sm:text-sm text-[#141937]/90 font-medium">
                  {t.philosophy.brokenItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-red-500 font-black mt-0.5">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-[#141937]/10 text-xs text-red-700 font-bold tracking-wide">
                {t.philosophy.brokenResult}
              </div>
            </div>
          </TiltCard>

          {/* Card 2: The Alina Voloshyna System */}
          <TiltCard maxTilt={5} scale={1.018} glare={true} glareOpacity={0.12} className="h-full">
            <div className="bg-[#141937] text-[#EEEBDA] border border-[#141937] p-8 rounded-3xl relative shadow-[0_12px_40px_rgba(20,25,55,0.15)] h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#EEEBDA]/15 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#F3C3CF] text-[#141937] rounded-xl flex items-center justify-center font-bold shadow-xs">
                      <CheckCircle size={18} />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold uppercase tracking-wide text-[#EEEBDA]">
                      {t.philosophy.teamTitle}
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 bg-[#F3C3CF] text-[#141937] rounded-full uppercase">
                    {t.philosophy.teamBadge}
                  </span>
                </div>

                <p className="text-sm text-[#EEEBDA]/85 leading-relaxed mb-6">
                  {t.philosophy.teamDesc}
                </p>

                <ul className="space-y-4 text-xs sm:text-sm text-[#EEEBDA]/95 font-medium">
                  {t.philosophy.teamItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-[#F3C3CF] font-bold mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-[#EEEBDA]/15 text-xs text-[#F3C3CF] font-bold tracking-wide">
                {t.philosophy.teamResult}
              </div>
            </div>
          </TiltCard>

        </div>

        {/* The 4-Step Methodology Pipeline */}
        <div className="bg-white/80 backdrop-blur-md border border-[#141937]/10 p-8 lg:p-12 rounded-3xl shadow-[0_10px_35px_rgba(20,25,55,0.05)]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#141937]/10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#141937]/60 block mb-1">
                {t.philosophy.tag}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#141937]">
                {t.philosophy.stepsTitle}
              </h3>
            </div>
            <div className="text-xs uppercase tracking-wider font-semibold text-[#141937]/70">
              4 steps to scalable revenue
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.philosophy.steps.map((step, idx) => (
              <TiltCard key={idx} maxTilt={6} scale={1.02} glare={true} glareOpacity={0.08} className="h-full">
                <div
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between h-full ${
                    activeStep === idx
                      ? 'bg-[#141937] text-[#EEEBDA] border-[#141937] -translate-y-1 shadow-lg'
                      : 'bg-[#EEEBDA]/60 text-[#141937] border-[#141937]/10 hover:border-[#141937]/30 hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-2xl font-black ${activeStep === idx ? 'text-[#F3C3CF]' : 'text-[#141937]'}`}>
                        {step.num}
                      </span>
                      <div className={`p-2 rounded-xl border ${
                        activeStep === idx 
                          ? 'bg-[#F3C3CF] text-[#141937] border-[#F3C3CF]' 
                          : 'bg-white text-[#141937] border-[#141937]/15'
                      }`}>
                        {stepIcons[idx] || <Compass size={22} />}
                      </div>
                    </div>

                    <h4 className="text-xl font-bold mb-1">
                      {step.title}
                    </h4>
                    <div className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                      activeStep === idx ? 'text-[#F3C3CF]' : 'text-[#141937]/70'
                    }`}>
                      {step.subtitle}
                    </div>
                    <p className={`text-xs leading-relaxed ${
                      activeStep === idx ? 'text-[#EEEBDA]/85' : 'text-[#141937]/80'
                    }`}>
                      {step.desc}
                    </p>
                  </div>

                  <div className={`mt-6 pt-3 border-t text-[11px] font-medium ${
                    activeStep === idx ? 'border-[#EEEBDA]/20 text-[#EEEBDA]/90' : 'border-[#141937]/10 text-[#141937]/80'
                  }`}>
                    <span className="font-bold block text-[10px] uppercase tracking-wider opacity-70 mb-0.5">{t.philosophy.deliverableLabel}</span>
                    {step.deliverable}
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>

          {/* Real Photo Banner: Alina's Laptop with "SMM СТРАТЕГІЯ" */}
          <TiltCard maxTilt={3} scale={1.01} glare={true} glareOpacity={0.06} className="mt-10">
            <div className="p-5 sm:p-6 bg-[#EEEBDA]/70 border border-[#141937]/10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-[#141937]/15 shadow-sm">
                  <img
                    src="/photos/alina-work-process.jpg"
                    alt={t.about.workTitle}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-[#F3C3CF]/70 text-[#141937] px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider mb-1">
                    <span>{t.about.workBadge}</span>
                  </div>
                  <h5 className="font-extrabold text-sm sm:text-base text-[#141937]">
                    {t.about.workTitle}
                  </h5>
                  <p className="text-xs text-[#141937]/80 max-w-lg mt-0.5">
                    {t.about.workDesc}
                  </p>
                </div>
              </div>
              
              <div className="shrink-0 flex items-center gap-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-3.5 py-1.5 bg-[#141937] text-[#EEEBDA] rounded-full shadow-xs">
                  FULL-CYCLE AGENCY
                </span>
              </div>
            </div>
          </TiltCard>

        </div>

      </div>
    </section>
  )
}
