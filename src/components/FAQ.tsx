import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export const FAQ = () => {
  const { t } = useLanguage()
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <section id="faq" className="py-24 bg-[#F9F7F1] border-b border-[#141937]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-[#141937]/10 text-[#141937] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <img
              src="/pins/pin-question.png"
              alt=""
              className="w-5 h-5 object-contain shrink-0 -my-0.5 animate-float"
            />
            <span>{t.faq.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#141937] tracking-tight leading-[1.15]">
            {t.faq.titleBefore}{' '}
            <span className="word-highlight">
              {t.faq.titleHighlight}
            </span>
          </h2>
          <p className="mt-4 text-base text-[#141937]/80">
            {t.faq.intro}
          </p>
        </div>

        {/* FAQ Accordion List with Soft Rounded Corners */}
        <div className="space-y-4">
          {t.faq.data.map((item, idx) => {
            const isOpen = openIdx === idx
            return (
              <div
                key={idx}
                className="bg-white/85 backdrop-blur-sm border border-[#141937]/10 rounded-2xl transition-all duration-300 shadow-xs hover:shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-[#141937] leading-snug">
                    {item.q}
                  </span>
                  <div className={`p-2 rounded-xl shrink-0 transition-colors ${
                    isOpen ? 'bg-[#141937] text-[#EEEBDA]' : 'bg-[#F3C3CF] text-[#141937]'
                  }`}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 border-t border-[#141937]/8 text-sm sm:text-base text-[#141937]/85 font-normal leading-relaxed animate-in fade-in duration-300">
                    {item.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Contact direct link */}
        <div className="mt-12 p-5 sm:p-6 bg-white/90 backdrop-blur-sm border border-[#141937]/10 rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-12 h-12 bg-[#F3C3CF] rounded-xl flex items-center justify-center text-[#141937] shrink-0 shadow-xs">
              <img
                src="/pins/pin-question.png"
                alt=""
                className="w-7 h-7 object-contain animate-float-slow"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-[#141937] leading-snug">
                {t.faq.haveQuestions}
              </div>
              <div className="text-xs text-[#141937]/70 mt-0.5">
                {t.faq.writeAlina}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto shrink-0">
            <a
              href="https://t.me/vlshavo"
              target="_blank"
              rel="noreferrer"
              className="bg-[#141937] text-[#EEEBDA] hover:bg-[#F3C3CF] hover:text-[#141937] px-5 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-xs flex items-center justify-center gap-2.5 group w-full sm:w-auto text-center"
            >
              <img
                src="/pins/pin-telegram.png"
                alt="Telegram"
                className="w-4.5 h-4.5 object-contain shrink-0 transition-transform group-hover:scale-110"
              />
              <span>Telegram →</span>
            </a>
            <a
              href="https://www.instagram.com/vlsh.av?psln=MWN1bm95N3h3bXgxdg=="
              target="_blank"
              rel="noreferrer"
              className="bg-white text-[#141937] hover:bg-[#F3C3CF] border border-[#141937]/15 px-5 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-xs flex items-center justify-center gap-2.5 group w-full sm:w-auto text-center"
            >
              <img
                src="/pins/pin-instagram.png"
                alt="Instagram"
                className="w-4.5 h-4.5 object-contain shrink-0 transition-transform group-hover:scale-110"
              />
              <span>Instagram →</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
