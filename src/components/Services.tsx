import React from 'react'
import { Check, ArrowRight } from 'lucide-react'
import { TiltCard } from './TiltCard'
import { Magnetic } from './Magnetic'
import { useLanguage } from '../context/LanguageContext'

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const { lang, t } = useLanguage()

  return (
    <section id="services" className="py-24 bg-[#EEEBDA] border-b border-[#141937]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-[#141937]/10 text-[#141937] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <img
              src="/pins/pin-handshake.png"
              alt=""
              className="w-5 h-5 object-contain shrink-0 -my-0.5 animate-float"
            />
            <span>{t.services.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#141937] tracking-tight leading-[1.15]">
            {t.services.titleBefore}{' '}
            <span className="word-highlight">
              {t.services.titleHighlight}
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#141937]/80 leading-relaxed">
            {t.services.intro}
          </p>
        </div>

        {/* 4 Core Services Grid with Interactive 3D Floating Tilt Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {t.services.data.map((service, idx) => {
            const isFlagship = service.id === 'smm-target'

            return (
              <TiltCard
                key={service.id}
                maxTilt={5}
                scale={1.015}
                glare={true}
                glareOpacity={isFlagship ? 0.12 : 0.08}
                className="h-full rounded-3xl"
              >
                <div
                  className={`p-8 lg:p-10 rounded-3xl border flex flex-col justify-between relative transition-colors duration-300 h-full ${
                    isFlagship
                      ? 'bg-[#141937] text-[#EEEBDA] border-[#141937] shadow-[0_15px_45px_rgba(20,25,55,0.15)]'
                      : 'bg-white/85 backdrop-blur-md text-[#141937] border-[#141937]/10 hover:border-[#141937]/25 shadow-xs hover:shadow-md'
                  }`}
                >
                {/* Header Tag / Badge */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-current/15">
                    <span
                      className={`text-xs font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full ${
                        isFlagship
                          ? 'bg-[#F3C3CF] text-[#141937]'
                          : 'bg-[#141937] text-[#EEEBDA]'
                      }`}
                    >
                      {service.badge}
                    </span>

                    <span className="text-xs font-black tracking-widest uppercase opacity-60">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
                    {service.title}
                  </h3>

                  {/* Target Audience Pill */}
                  <div className={`p-4 mb-6 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed border ${
                    isFlagship
                      ? 'bg-white/10 border-white/15 text-[#EEEBDA]'
                      : 'bg-[#EEEBDA]/50 border-[#141937]/10 text-[#141937]'
                  }`}>
                    <strong className="block text-[11px] uppercase tracking-wider font-extrabold mb-1 opacity-75">
                      {t.services.forWhoLabel}
                    </strong>
                    {service.targetAudience}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm leading-relaxed mb-6 opacity-90">
                    {service.description}
                  </p>

                  {/* If Strategy session, show the 3 target audiences explicitly */}
                  {service.threeAudienceBreakdown && (
                    <div className="space-y-3 mb-6 p-4 rounded-2xl bg-[#EEEBDA]/50 border border-[#141937]/10 text-[#141937]">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#141937]/70">
                        {lang === 'ua' ? 'Сесія збирається індивідуально під 3 запити:' : 'Tailored specifically to 3 target profiles:'}
                      </div>
                      {service.threeAudienceBreakdown.map((item, itemIdx) => (
                        <div key={itemIdx} className="text-xs border-l-2 border-[#141937] pl-3 py-0.5">
                          <span className="font-bold block text-[#141937]">{item.forWho}:</span>
                          <span className="text-[#141937]/80">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider opacity-75">
                      {lang === 'ua' ? 'Що входить у співпрацю:' : 'What is included in the scope:'}
                    </div>
                    <ul className="space-y-2.5">
                      {service.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium">
                          <span
                            className={`p-1 mt-0.5 rounded-lg shrink-0 ${
                              isFlagship ? 'bg-[#F3C3CF] text-[#141937]' : 'bg-[#141937] text-[#EEEBDA]'
                            }`}
                          >
                            <Check size={12} strokeWidth={3} />
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Note if any */}
                  {service.note && (
                    <div className="text-[11px] italic opacity-75 mb-6 border-t border-current/15 pt-3">
                      * {service.note}
                    </div>
                  )}
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-6 border-t border-current/15">
                  <button
                    onClick={() => onSelectService(service.title)}
                    className={`w-full py-4 px-6 font-bold uppercase tracking-wider text-xs sm:text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-0.5 ${
                      isFlagship
                        ? 'bg-[#F3C3CF] text-[#141937] hover:bg-white'
                        : 'bg-[#141937] text-[#EEEBDA] hover:bg-[#F3C3CF] hover:text-[#141937]'
                    }`}
                  >
                    <span>{service.ctaText}</span>
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </TiltCard>
          )
        })}
      </div>

      {/* Bottom Banner: Free Strategy Session Offer with Soft Styling */}
      <div className="mt-14 p-8 lg:p-12 bg-gradient-to-r from-[#F3C3CF] to-[#FCE8EE] border border-[#141937]/10 text-[#141937] rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-6 shadow-[0_10px_35px_rgba(243,195,207,0.3)]">
        <div className="space-y-2 max-w-2xl">
          <span className="bg-[#141937] text-[#EEEBDA] text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
            {lang === 'ua' ? 'Перший крок без ризику' : 'Zero-Risk First Step'}
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {lang === 'ua' ? 'Не впевнені, який саме формат вам потрібен?' : 'Unsure which format best fits your goals?'}
          </h3>
          <p className="text-xs sm:text-sm text-[#141937]/90 leading-relaxed font-medium">
            {lang === 'ua' 
              ? 'Запишіться на 20-хвилинну безкоштовну стратегічну сесію. Я подивлюся на вашу сторінку, покажу, де зливаються клієнти, і підкажу оптимальне рішення.'
              : 'Book a 20-minute free strategic consultation. I will audit your profile, reveal conversion bottlenecks, and suggest the most profitable path forward.'}
          </p>
        </div>

        <Magnetic strength={0.25}>
          <button
            onClick={() => onSelectService(t.nav.cta)}
            className="shrink-0 bg-[#141937] text-[#EEEBDA] hover:bg-white hover:text-[#141937] px-8 py-4.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
          >
            {t.hero.ctaBook} →
          </button>
        </Magnetic>
      </div>

      </div>
    </section>
  )
}
