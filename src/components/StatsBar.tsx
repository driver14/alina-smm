import React from 'react'
import { Globe, DollarSign, Award, Target, Users } from 'lucide-react'
import { TiltCard } from './TiltCard'
import { useLanguage } from '../context/LanguageContext'

export const StatsBar: React.FC = () => {
  const { t } = useLanguage()

  const icons = [
    <Award className="text-[#141937]" size={22} />,
    <Globe className="text-[#141937]" size={22} />,
    <DollarSign className="text-[#141937]" size={22} />,
    <Target className="text-[#141937]" size={22} />,
    <Users className="text-[#141937]" size={22} />
  ]

  return (
    <div id="stats" className="bg-[#141937] text-[#EEEBDA] border-b border-[#EEEBDA]/10 overflow-hidden">
      
      {/* 60fps Running Marquee Ticker */}
      <div className="py-3.5 bg-[#141937] border-b border-[#EEEBDA]/10 flex overflow-hidden whitespace-nowrap select-none">
        <div className="animate-marquee flex items-center gap-8">
          {t.stats.marquee.concat(t.stats.marquee).map((text, idx) => (
            <div key={idx} className="flex items-center gap-8 text-xs font-bold tracking-widest uppercase text-[#EEEBDA]/90">
              <span>{text}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#F3C3CF]"></span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid of Key Numbers with Soft Rounded Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {t.stats.cards.map((stat, idx) => (
            <TiltCard key={idx} maxTilt={7} scale={1.03} glare={true} glareOpacity={0.14} className="h-full rounded-2xl">
              <div
                className="bg-white/10 backdrop-blur-md text-[#EEEBDA] p-6 rounded-2xl border border-white/10 flex flex-col justify-between relative group hover:bg-white/15 transition-colors duration-300 shadow-sm h-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-[#F3C3CF] text-[#141937] rounded-xl shadow-xs">
                    {icons[idx] || <Award className="text-[#141937]" size={22} />}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#EEEBDA]/40">
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <div className="text-3xl font-extrabold tracking-tight text-[#EEEBDA] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#F3C3CF] mb-2">
                    {stat.label}
                  </div>
                  <p className="text-xs text-[#EEEBDA]/75 font-normal leading-relaxed">
                    {stat.desc}
                  </p>
                </div>

                {/* Bottom decorative bar */}
                <div className="mt-4 pt-3 border-t border-white/10 flex justify-between text-[10px] font-semibold text-[#EEEBDA]/50">
                  <span>{t.stats.metricTag}</span>
                  <span>{t.stats.topLevelTag}</span>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

    </div>
  )
}
