import React, { useState, useEffect } from 'react'
import { ArrowUpRight, Menu, X, Send } from 'lucide-react'
import { triggerHaptic } from '../../utils/haptics'

const InstagramIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

interface BdbNavbarProps {
  onOpenBooking: () => void
}

export const BdbNavbar: React.FC<BdbNavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    let lastScrolled = false
    const handleScroll = () => {
      const scrolled = window.scrollY > 25
      if (scrolled !== lastScrolled) {
        lastScrolled = scrolled
        setIsScrolled(scrolled)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    const checkDark = () => {
      const active = document.documentElement.classList.contains('theme-dark-active')
      setIsDark((prev) => (prev !== active ? active : prev))
    }
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsMobileOpen(false)
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  const handleCtaClick = () => {
    triggerHaptic('medium')
    onOpenBooking()
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        isDark
          ? isScrolled
            ? 'bg-[#0B1021]/90 backdrop-blur-md border-b border-white/10 shadow-lg py-3.5'
            : 'bg-[#0B1021]/60 backdrop-blur-xs border-b border-white/5 py-5'
          : isScrolled
            ? 'bg-[#EEEBDA]/95 backdrop-blur-md border-b border-[#141937]/10 shadow-xs py-3.5'
            : 'bg-[#EEEBDA]/80 backdrop-blur-xs border-b border-[#141937]/5 py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        
        {/* Brand Wordmark (Rolex / BDB style: clean, confident, minimal) */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 text-left group cursor-pointer"
          onClick={() => triggerHaptic('light')}
        >
          <div className="flex flex-col">
            <span className={`font-black text-base sm:text-lg tracking-tight leading-none uppercase transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-[#141937]'
            }`}>
              АЛІНА ВОЛОШИНА
            </span>
            <span className={`text-[10px] tracking-[0.2em] uppercase font-bold mt-1 transition-colors duration-300 ${
              isDark ? 'text-[#F3C3CF]' : 'text-[#141937]/60'
            }`}>
              SMM & MARKETING
            </span>
          </div>
        </a>

        {/* Minimalist Navigation */}
        <nav className={`hidden lg:flex items-center gap-7 xl:gap-8 text-[12px] font-bold uppercase tracking-[0.14em] transition-colors duration-300 ${
          isDark ? 'text-[#EEEBDA]/75' : 'text-[#141937]/75'
        }`}>
          <a href="#hero" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-[#141937]'}`}>ГОЛОВНА</a>
          <a href="#expertise" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-[#141937]'}`}>ДОСВІД</a>
          <a href="#philosophy" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-[#141937]'}`}>ФІЛОСОФІЯ</a>
          <a href="#approach" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-[#141937]'}`}>ПІДХІД</a>
          <a href="#cases" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-[#141937]'}`}>КЕЙСИ</a>
          <a href="#services" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-[#141937]'}`}>ПОСЛУГИ</a>
          <a href="#about" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-[#141937]'}`}>ПРО МЕНЕ</a>
          <a href="#faq" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-[#141937]'}`}>FAQ</a>
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-3">
          
          {/* Social Icons */}
          <div className="hidden sm:flex items-center gap-2">
            <a
              href="https://instagram.com/smmbyvlsh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram profile"
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                isDark
                  ? 'border-white/20 bg-white/5 text-white hover:bg-white hover:text-[#0B1021]'
                  : 'border-[#141937]/15 bg-white/60 text-[#141937] hover:bg-[#141937] hover:text-[#EEEBDA]'
              }`}
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://t.me/smmbyvlsh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram direct"
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                isDark
                  ? 'border-white/20 bg-white/5 text-white hover:bg-white hover:text-[#0B1021]'
                  : 'border-[#141937]/15 bg-white/60 text-[#141937] hover:bg-[#141937] hover:text-[#EEEBDA]'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Minimalist Solid Pill Button */}
          <button
            type="button"
            onClick={handleCtaClick}
            className={`group relative px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs font-bold uppercase tracking-[0.14em] transition-all duration-200 flex items-center gap-1.5 cursor-pointer rolex-sheen ${
              isDark
                ? 'bg-white hover:bg-[#EEEBDA] text-[#0B1021] shadow-lg shadow-white/5'
                : 'bg-[#141937] hover:bg-[#1E254F] text-[#EEEBDA] shadow-md shadow-[#141937]/15'
            }`}
          >
            <span>СТРАТЕГІЧНИЙ РОЗБІР</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle navigation menu"
            className={`lg:hidden p-2 rounded-lg border transition-colors cursor-pointer ${
              isDark
                ? 'border-white/20 text-white hover:bg-white/10'
                : 'border-[#141937]/15 text-[#141937] hover:bg-black/5'
            }`}
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileOpen && (
        <div className={`lg:hidden border-b px-6 py-6 space-y-3 ${
          isDark ? 'bg-[#0B1021] border-white/15' : 'bg-[#EEEBDA] border-[#141937]/15'
        }`}>
          <nav className={`flex flex-col space-y-3 text-sm font-bold uppercase tracking-wider ${
            isDark ? 'text-white' : 'text-[#141937]'
          }`}>
            <a href="#hero" onClick={() => setIsMobileOpen(false)} className={`py-2 border-b flex justify-between ${isDark ? 'border-white/10' : 'border-[#141937]/10'}`}>
              <span>ГОЛОВНА</span>
              <ArrowUpRight className="w-4 h-4 opacity-40" />
            </a>
            <a href="#expertise" onClick={() => setIsMobileOpen(false)} className={`py-2 border-b flex justify-between ${isDark ? 'border-white/10' : 'border-[#141937]/10'}`}>
              <span>ДОСВІД ТА ЕКСПЕРТИЗА</span>
              <ArrowUpRight className="w-4 h-4 opacity-40" />
            </a>
            <a href="#philosophy" onClick={() => setIsMobileOpen(false)} className={`py-2 border-b flex justify-between ${isDark ? 'border-white/10' : 'border-[#141937]/10'}`}>
              <span>ФІЛОСОФІЯ МАРКЕТИНГУ</span>
              <ArrowUpRight className="w-4 h-4 opacity-40" />
            </a>
            <a href="#approach" onClick={() => setIsMobileOpen(false)} className={`py-2 border-b flex justify-between ${isDark ? 'border-white/10' : 'border-[#141937]/10'}`}>
              <span>МІЙ ПІДХІД</span>
              <ArrowUpRight className="w-4 h-4 opacity-40" />
            </a>
            <a href="#cases" onClick={() => setIsMobileOpen(false)} className={`py-2 border-b flex justify-between ${isDark ? 'border-white/10' : 'border-[#141937]/10'}`}>
              <span>КЕЙСИ ТА РЕЗУЛЬТАТИ</span>
              <ArrowUpRight className="w-4 h-4 opacity-40" />
            </a>
            <a href="#services" onClick={() => setIsMobileOpen(false)} className={`py-2 border-b flex justify-between ${isDark ? 'border-white/10' : 'border-[#141937]/10'}`}>
              <span>ПОСЛУГИ ТА ВАРТІСТЬ</span>
              <ArrowUpRight className="w-4 h-4 opacity-40" />
            </a>
            <a href="#about" onClick={() => setIsMobileOpen(false)} className={`py-2 border-b flex justify-between ${isDark ? 'border-white/10' : 'border-[#141937]/10'}`}>
              <span>ПРО МЕНЕ ТА КОМАНДУ</span>
              <ArrowUpRight className="w-4 h-4 opacity-40" />
            </a>
            <a href="#faq" onClick={() => setIsMobileOpen(false)} className="py-2 flex justify-between">
              <span>ЧАСТІ ЗАПИТАННЯ</span>
              <ArrowUpRight className="w-4 h-4 opacity-40" />
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
