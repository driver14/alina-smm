import React, { useState, useEffect } from 'react'
import { ArrowUpRight, Send, Mail, ArrowUp } from 'lucide-react'
import { triggerHaptic } from '../../utils/haptics'

const InstagramIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

interface BdbFooterProps {
  onOpenBooking: (service?: string, note?: string) => void
}

export const BdbFooter: React.FC<BdbFooterProps> = ({ onOpenBooking }) => {
  const [kyivTime, setKyivTime] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date()
        const formatted = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/Kyiv',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(now)
        setKyivTime(formatted)
      } catch (e) {
        setKyivTime('15:00:00')
      }
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const scrollToTop = () => {
    triggerHaptic('light')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBook = () => {
    triggerHaptic('medium')
    onOpenBooking('Безкоштовний стратегічний розбір', 'Запит із фінального блоку сайту')
  }

  return (
    <footer 
      data-theme="dark"
      className="bg-transparent text-[#EEEBDA] pt-24 pb-12 relative overflow-hidden text-left border-t border-white/10"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Massive Call To Action Header */}
        <div className="pb-16 border-b border-white/10">
          <div className="flex items-center gap-3 mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#F3C3CF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F3C3CF] animate-ping" />
            <span>ФІНАЛЬНИЙ КРОК ДО СИСТЕМИ</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-6">
              <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.05]">
                Ваш бізнес заслуговує на маркетинг, <br />
                <span className="font-editorial normal-case text-[#F3C3CF] italic font-normal">
                  який працює системно.
                </span>
              </h2>

              <p className="text-base sm:text-lg text-[#EEEBDA]/85 max-w-2xl leading-relaxed font-normal">
                Розкажіть мені про свій проєкт, цілі та завдання. Разом визначимо, які інструменти допоможуть вашому бізнесу розвиватися та залучати більше клієнтів.
              </p>

              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#F3C3CF]">
                ПОЧНЕМО З БЕЗКОШТОВНОГО СТРАТЕГІЧНОГО РОЗБОРУ ВАШОГО ПРОЄКТУ
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-5">
              <button
                type="button"
                onClick={handleBook}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-9 py-4.5 sm:py-5 bg-[#EEEBDA] hover:bg-white text-[#141937] text-xs sm:text-sm uppercase tracking-[0.16em] font-extrabold rounded-full transition-all hover:scale-105 cursor-pointer shadow-2xl rolex-sheen"
              >
                <span>Хочу отримати розбір проєкту</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <div className="text-xs font-bold text-[#EEEBDA]/50 uppercase tracking-widest text-left lg:text-right">
                АЛІНА ВОЛОШИНА | SMM & MARKETING
              </div>
            </div>
          </div>
        </div>

        {/* Mid Row: Navigation Links & Channels */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-white/10 text-xs font-bold uppercase tracking-wider">
          
          {/* Col 1: Direct Contact */}
          <div>
            <div className="text-[#F3C3CF] mb-4 tracking-[0.18em]">ПРЯМІ КАНАЛИ ЗВ'ЯЗКУ</div>
            <ul className="space-y-3 font-normal">
              <li>
                <a
                  href="https://t.me/smmbyvlsh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#EEEBDA]/80 hover:text-white transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>TELEGRAM • @smmbyvlsh</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/smmbyvlsh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#EEEBDA]/80 hover:text-white transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>INSTAGRAM • @smmbyvlsh</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@smmbyvlsh.com"
                  className="flex items-center gap-2 text-[#EEEBDA]/80 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>CONTACT@SMMBYVLSH.COM</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <div className="text-[#F3C3CF] mb-4 tracking-[0.18em]">РОЗДІЛИ САЙТУ</div>
            <ul className="space-y-2.5 text-[#EEEBDA]/80 font-normal">
              <li><a href="#hero" className="hover:text-white transition-colors">ГОЛОВНИЙ ЕКРАН</a></li>
              <li><a href="#expertise" className="hover:text-white transition-colors">ДОСВІД ТА ЕКСПЕРТИЗА</a></li>
              <li><a href="#philosophy" className="hover:text-white transition-colors">ФІЛОСОФІЯ ТА КОЛЕСО</a></li>
              <li><a href="#approach" className="hover:text-white transition-colors">МІЙ ПІДХІД</a></li>
              <li><a href="#cases" className="hover:text-white transition-colors">КЕЙСИ ТА РЕЗУЛЬТАТИ</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">ПОСЛУГИ ТА ВАРТІСТЬ</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">ПРО МЕНЕ ТА КОМАНДУ</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Col 3: Coordinates */}
          <div>
            <div className="text-[#F3C3CF] mb-4 tracking-[0.18em]">ГЕОГРАФІЯ ПРОЄКТІВ</div>
            <ul className="space-y-2 text-[#EEEBDA]/75 font-normal">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F3C3CF]" />
                <span>УКРАЇНА (КИЇВ HQ)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EEEBDA]/40" />
                <span>США (МАЯМІ, ФЛОРИДА)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EEEBDA]/40" />
                <span>ЄВРОПА (ВАРШАВА, ЄС)</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Live Time & Status */}
          <div>
            <div className="text-[#F3C3CF] mb-4 tracking-[0.18em]">КИЇВСЬКИЙ ЧАС</div>
            <div className="font-display text-2xl font-black text-white mb-2 tracking-wider">
              KYIV {kyivTime || '15:00:00'} <span className="text-xs text-[#F3C3CF] font-sans font-bold">UTC+2</span>
            </div>
            <div className="text-[12px] text-[#EEEBDA]/70 font-normal leading-relaxed">
              Відповідаємо у Telegram протягом 1-2 годин у робочі дні.
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EEEBDA]/60 uppercase tracking-wider font-semibold">
          <div>
            © 2026 АЛІНА ВОЛОШИНА | SMM & MARKETING. ВСІ ПРАВА ЗАХИЩЕНІ.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[#EEEBDA]/80 hover:text-white transition-colors cursor-pointer group"
          >
            <span>ВГОРУ</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  )
}
