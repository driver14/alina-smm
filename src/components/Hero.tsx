import React from 'react'
import { ArrowDownRight, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react'
import { TiltCard } from './TiltCard'
import { Magnetic } from './Magnetic'
import { useLanguage } from '../context/LanguageContext'

interface HeroProps {
  onOpenBooking: () => void
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const { t } = useLanguage()

  return (
    <section id="hero" className="relative border-b border-[#141937]/10 overflow-hidden pt-8 pb-16 lg:py-20">
      {/* Soft Ambient Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#F3C3CF]/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* Left Column: Offer, Copy & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="inline-flex items-center gap-2.5 bg-white/90 backdrop-blur-sm border border-[#141937]/10 text-[#141937] px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-xs">
              <img
                src="/pins/pin-star.png"
                alt=""
                className="w-5.5 h-5.5 object-contain shrink-0 -my-0.5 animate-float"
              />
              <span>{t.hero.badge}</span>
            </div>

            {/* Main Headline with Clean, Modern Word Highlight */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#141937] leading-[1.12]">
              {t.hero.titleBefore}{' '}
              <span className="word-highlight">
                {t.hero.titleHighlight}
              </span>{' '}
              {t.hero.titleAfter}
            </h1>

            {/* Subtitle / Core Value Proposition */}
            <p className="text-base sm:text-lg text-[#141937]/80 font-normal leading-relaxed max-w-2xl border-l-2 border-[#141937]/30 pl-4">
              {t.hero.subtitle}
            </p>

            {/* The Formula Badge: 3D interactive floating card */}
            <TiltCard maxTilt={4} scale={1.01} glare={false}>
              <div className="p-4 sm:p-5 bg-white/80 backdrop-blur-sm border border-[#141937]/10 rounded-2xl shadow-xs space-y-2.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#141937]/65 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#141937]" />
                  <span>{t.hero.formulaTitle}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold text-[#141937]">
                  <span className="bg-[#EEEBDA] px-3 py-1.5 rounded-lg border border-[#141937]/15">{t.hero.formulaSteps.goal}</span>
                  <span className="text-[#141937]/40">→</span>
                  <span className="bg-[#EEEBDA] px-3 py-1.5 rounded-lg border border-[#141937]/15">{t.hero.formulaSteps.analytics}</span>
                  <span className="text-[#141937]/40">→</span>
                  <span className="bg-[#EEEBDA] px-3 py-1.5 rounded-lg border border-[#141937]/15">{t.hero.formulaSteps.strategy}</span>
                  <span className="text-[#141937]/40">→</span>
                  <span className="bg-[#F3C3CF] text-[#141937] px-3 py-1.5 rounded-lg font-extrabold shadow-xs">{t.hero.formulaSteps.contentAds}</span>
                </div>
              </div>
            </TiltCard>

            {/* CTA Buttons with Magnetic Pull and Micro-Interactions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2 items-stretch sm:items-center">
              <Magnetic strength={0.25}>
                <button
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto bg-[#141937] text-[#EEEBDA] hover:bg-[#F3C3CF] hover:text-[#141937] font-bold text-xs uppercase tracking-wider px-8 py-4.5 rounded-xl border border-[#141937] transition-all duration-300 flex items-center justify-center gap-3 group shadow-md hover:shadow-xl cursor-pointer"
                >
                  <span>{t.hero.ctaBook}</span>
                  <ArrowDownRight size={17} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </button>
              </Magnetic>

              <Magnetic strength={0.2}>
                <a
                  href="#cases"
                  className="w-full sm:w-auto bg-white/70 hover:bg-white text-[#141937] font-bold text-xs uppercase tracking-wider px-7 py-4.5 rounded-xl border border-[#141937]/15 transition-all duration-300 flex items-center justify-center gap-2 text-center shadow-xs hover:shadow-sm"
                >
                  <span>{t.hero.ctaCases}</span>
                </a>
              </Magnetic>
            </div>

            {/* Trust points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#141937]/10">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#141937]/90">
                <CheckCircle2 size={16} className="text-[#141937] shrink-0" />
                <span>{t.hero.trust1}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#141937]/90">
                <TrendingUp size={16} className="text-[#141937] shrink-0" />
                <span>{t.hero.trust2}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#141937]/90">
                <ShieldCheck size={16} className="text-[#141937] shrink-0" />
                <span>{t.hero.trust3}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Photo Card with Interactive 3D Tilt Floating (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Soft decorative shadow background */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#F3C3CF]/60 to-[#141937]/10 rounded-3xl blur-xl opacity-70"></div>

              {/* Interactive 3D Floating Tilt Card */}
              <TiltCard maxTilt={8} scale={1.02} glare={true} glareOpacity={0.15} className="w-full">
                <div className="relative z-10 bg-white/80 backdrop-blur-md border border-[#141937]/10 p-4 rounded-3xl shadow-[0_12px_40px_rgba(20,25,55,0.08)]">
                  
                  {/* Photo Aspect Ratio Container (Portrait 3:4) */}
                  <div className="relative aspect-[3/4] w-full bg-[#141937] rounded-2xl overflow-hidden group shadow-inner">
                    
                    {/* Real Photo of Alina Voloshyna (Black suit) */}
                    <img
                      src="/photos/alina-hero.jpg"
                      alt={`${t.brand.name} — ${t.brand.role}`}
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-104"
                    />

                    {/* Gradient overlay for text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141937]/85 via-[#141937]/15 to-transparent pointer-events-none"></div>

                    {/* Floating Metric Badge 2: EdTech with 3D Pop */}
                    <div
                      className="absolute top-4 right-4 z-20 bg-[#F3C3CF] text-[#141937] px-3.5 py-2 rounded-xl shadow-md border border-white/30 text-right animate-float-slow"
                      style={{ transform: 'translateZ(30px)' }}
                    >
                      <div className="text-base font-black leading-none">
                        {t.hero.badgeEdTechValue}
                      </div>
                      <div className="text-[10px] font-bold text-[#141937]/80 uppercase">
                        {t.hero.badgeEdTechLabel}
                      </div>
                    </div>

                    {/* Bottom Information Overlay with 3D Pop */}
                    <div
                      className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3"
                      style={{ transform: 'translateZ(28px)' }}
                    >
                      <div className="bg-white/95 backdrop-blur-md border border-[#141937]/15 p-3 rounded-xl text-left shadow-lg max-w-[200px] animate-float-delayed">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#141937]/70">
                          {t.hero.badgeBeautyNiche}
                        </div>
                        <div className="text-lg font-black text-[#141937] leading-none my-0.5">
                          {t.hero.badgeBeautyValue}
                        </div>
                        <div className="text-[11px] text-[#141937]/80 font-medium">
                          {t.hero.badgeBeautyDesc}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Frame Details */}
                  <div className="mt-3.5 flex items-center justify-between text-xs font-semibold text-[#141937]/70 px-2">
                    <span>STRATEGY • ADS • CONTENT</span>
                    <span className="text-[11px] font-bold text-[#141937]/50">EST. 2023</span>
                  </div>

                </div>
              </TiltCard>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
