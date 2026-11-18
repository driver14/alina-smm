import React from 'react'
import { Check, X } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

interface BdbManifestoProps {
  onOpenBooking?: () => void
}

export const BdbManifesto: React.FC<BdbManifestoProps> = () => {
  const { lang } = useLanguage()
  const isUa = lang === 'ua'

  return (
    <section id="manifesto" className="py-24 md:py-36 bg-[#0E100F] text-[#F9F7F4] border-b border-white/10 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Category Label */}
        <div className="flex items-center gap-3 mb-10 text-xs font-mono-tech uppercase text-white/50">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FE4F2A]" />
          <span>[ 03 // MANIFESTO & PHILOSOPHY ]</span>
        </div>

        {/* The Massive BDB Giant Statement */}
        <div className="mb-20">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black uppercase tracking-tight leading-[0.98] max-w-5xl text-left">
            {isUa ? (
              <>
                Бренди, які перемагають, <br />
                будують свій бізнес <br />
                <span className="font-editorial normal-case text-[#FE4F2A] italic font-normal">
                  як креатори.
                </span>
              </>
            ) : (
              <>
                The brands that win <br />
                build and scale <br />
                <span className="font-editorial normal-case text-[#FE4F2A] italic font-normal">
                  like creators.
                </span>
              </>
            )}
          </h2>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 border-t border-white/10 text-left">
          
          <div className="lg:col-span-5">
            <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight mb-4 text-white">
              {isUa ? 'Соціальні мережі — це більше не просто канал. Це місце, де народжується прибуток.' : 'Social is no longer just a channel. It is where brands are built.'}
            </h3>
            <p className="text-sm font-mono-tech uppercase text-white/40 tracking-wider">
              ALINA VOLOSHYNA // CREATOR INSTINCT METHOD
            </p>
          </div>

          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-white/70 font-normal leading-relaxed text-pretty">
            <p>
              {isUa 
                ? 'Ера шаблонних картинок у Canva, накручених підписників та безглуздих сторіс «Доброго ранку» закінчилася. Алгоритми Meta та Instagram винагороджують лише тих, хто володіє увагою та говорить мовою живих сенсів.'
                : 'The era of generic Canva templates, inflated vanity followers, and aimless "good morning" stories is over. Modern social algorithms only reward those who capture raw cultural attention and speak the language of real human emotion.'}
            </p>
            <p>
              {isUa
                ? 'Ми відмовилися від громіздкої бюрократії старих рекламних агенцій на користь швидкості та точності: власна продакшн-команда, сильні сценарії Reels, щоденний контроль за кожним доларом таргетингу та повна прозорість у Telegram.'
                : 'We dismantled the slow, rigid bureaucracy of legacy marketing agencies in favor of agile creator instinct: bespoke production, psychology-backed Reels, hyper-targeted ad mechanics, and 100% transparent live analytics.'}
            </p>
          </div>

        </div>

        {/* The Comparative Architecture Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20 text-left">
          
          {/* Legacy Agency / Chaotic SMM */}
          <div className="p-8 rounded-3xl bg-[#171918] border border-white/5 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <span className="text-xs font-mono-tech text-white/40 uppercase tracking-widest">[ OLD WAY ]</span>
              <span className="text-xs font-bold text-rose-400 font-mono-tech">TRADITIONAL SMM</span>
            </div>
            
            <ul className="space-y-4 text-sm font-medium text-white/60">
              <li className="flex items-start gap-3">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Гонитва за пустими переглядами замість заявок у Direct</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Злитий бюджет на кнопку «Просувати» без чіткої аналітики</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Втома та вигорання експерта від щоденного знімання контенту</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Звіти раз на місяць у незрозумілих PDF без зв'язку з грошима</span>
              </li>
            </ul>
          </div>

          {/* BDB / Alina Voloshyna Way */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#1C1E1D] to-[#141514] border border-[#FE4F2A]/30 space-y-6 shadow-2xl shadow-[#FE4F2A]/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FE4F2A]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
              <span className="text-xs font-mono-tech text-[#FE4F2A] uppercase tracking-widest">[ THE SYSTEM ]</span>
              <span className="text-xs font-bold text-emerald-400 font-mono-tech">ALINA VOLOSHYNA ®</span>
            </div>
            
            <ul className="space-y-4 text-sm font-medium text-white/90 relative z-10">
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Окупність рекламного бюджету 10X (ROMI) з підтвердженою виручкою</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Сенсові Reels, що закривають заперечення ще до першого повідомлення</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Кваліфіковані ліди з високим чеком ($500 – $2,000+)</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Миттєва телеметрія відвідувачів та сповіщення у Telegram 24/7</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  )
}
