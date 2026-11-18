import React, { useState, useEffect } from 'react'
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { BrandLogo } from './BrandLogo'
import { Magnetic } from './Magnetic'
import { useLanguage } from '../context/LanguageContext'
import { haptics } from '../utils/haptics'

interface NavbarProps {
  onOpenBooking: (serviceTitle?: string) => void
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const { lang, toggleLang, t } = useLanguage()

  const handleToggleLang = () => {
    haptics.click()
    toggleLang()
  }

  const handleBooking = (service?: string) => {
    haptics.click()
    onOpenBooking(service)
  }
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Track scroll position for background opacity transitions
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Dynamic physics-based scroll sway ("пошатывание при скролле")
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 18,
    stiffness: 160,
    mass: 0.5,
  })

  // Map scroll velocity to gentle inertia lag & liquid angular wobble
  const navY = useTransform(smoothVelocity, [-2000, 0, 2000], [-4.5, 0, 4.5])
  const navRotate = useTransform(smoothVelocity, [-2000, 0, 2000], [-0.7, 0, 0.7])
  const navScale = useTransform(smoothVelocity, [-2000, 0, 2000], [0.995, 1, 0.995])

  return (
    <div className="sticky top-2 sm:top-3.5 z-50 w-full px-3 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300">
      <motion.header
        style={{
          y: navY,
          rotate: navRotate,
          scale: navScale,
          transformOrigin: 'center center',
          WebkitBackdropFilter: 'blur(24px) saturate(200%)',
          backdropFilter: 'blur(24px) saturate(200%)',
        }}
        className={`w-full max-w-[1460px] mx-auto pointer-events-auto transition-colors duration-300 rounded-2xl sm:rounded-full border ${
          scrolled
            ? 'bg-white/25 border-white/50 shadow-[0_12px_40px_rgba(20,25,55,0.06),inset_0_1px_1.5px_rgba(255,255,255,0.7)] py-2 sm:py-2.5 px-3.5 sm:px-5 lg:px-6 2xl:px-8'
            : 'bg-white/16 border-white/40 shadow-[0_4px_24px_rgba(20,25,55,0.03),inset_0_1px_1px_rgba(255,255,255,0.5)] py-2.5 sm:py-3 px-4 sm:px-5 lg:px-6 2xl:px-8'
        }`}
      >
        <div className="w-full flex items-center justify-between gap-2.5 sm:gap-4">
          {/* Logo / Personal Monogram */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="sm:hidden shrink-0">
              <BrandLogo size="sm" theme="navy" />
            </div>
            <div className="hidden sm:block shrink-0">
              <BrandLogo size="md" theme="navy" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-sm sm:text-base lg:text-lg text-[#141937] leading-tight">
                {t.brand.name}
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-[#141937]/70 font-semibold">
                {t.brand.role}
              </span>
            </div>
          </a>

          {/* Desktop Menu Links (>= 1280px) */}
          <nav className="hidden xl:flex items-center gap-3.5 2xl:gap-6 shrink-0">
            {t.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-wider font-semibold text-[#141937]/80 hover:text-[#141937] transition-colors relative py-1 whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:rounded-full after:bg-[#141937] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Cluster: Socials + Language Switcher + CTA + Mobile Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Social Links & Language Switcher in style of Insta/Telega */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Magnetic strength={0.25}>
                <a
                  href="https://www.instagram.com/vlsh.av?psln=MWN1bm95N3h3bXgxdg=="
                  target="_blank"
                  rel="noreferrer"
                  className="h-8.5 w-8.5 sm:h-9.5 sm:w-9.5 2xl:w-auto 2xl:px-3 rounded-xl sm:rounded-full bg-white/60 hover:bg-[#F3C3CF]/60 border border-white/70 text-[#141937] text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 shadow-2xs hover:shadow-xs group cursor-pointer backdrop-blur-sm"
                  title="Instagram: @vlsh.av"
                >
                  <img
                    src="/pins/pin-instagram.png"
                    alt="Instagram"
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5 object-contain shrink-0 transition-transform group-hover:scale-110"
                  />
                  <span className="hidden 2xl:inline text-[11px] uppercase tracking-wider font-bold whitespace-nowrap">Instagram</span>
                </a>
              </Magnetic>

              <Magnetic strength={0.25}>
                <a
                  href="https://t.me/vlshavo"
                  target="_blank"
                  rel="noreferrer"
                  className="h-8.5 w-8.5 sm:h-9.5 sm:w-9.5 2xl:w-auto 2xl:px-3 rounded-xl sm:rounded-full bg-white/60 hover:bg-[#F3C3CF]/60 border border-white/70 text-[#141937] text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 shadow-2xs hover:shadow-xs group cursor-pointer backdrop-blur-sm"
                  title="Telegram: @vlshavo"
                >
                  <img
                    src="/pins/pin-telegram.png"
                    alt="Telegram"
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5 object-contain shrink-0 transition-transform group-hover:scale-110"
                  />
                  <span className="hidden 2xl:inline text-[11px] uppercase tracking-wider font-bold whitespace-nowrap">Telegram</span>
                </a>
              </Magnetic>

              {/* Language Switcher Button (UA ⇄ EN) replacing email button */}
              <Magnetic strength={0.25}>
                <button
                  type="button"
                  onClick={handleToggleLang}
                  className="h-8.5 w-8.5 sm:h-9.5 sm:w-9.5 2xl:w-auto 2xl:px-3 rounded-xl sm:rounded-full bg-white/60 hover:bg-[#F3C3CF]/60 border border-white/70 text-[#141937] text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 shadow-2xs hover:shadow-xs group cursor-pointer backdrop-blur-sm select-none active:scale-95"
                  title={t.nav.switchLangTooltip}
                  aria-label={t.nav.switchLangTooltip}
                >
                  <motion.div
                    key={lang}
                    initial={{ scale: 0.75, opacity: 0, rotateY: 90 }}
                    animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                    exit={{ scale: 0.75, opacity: 0, rotateY: -90 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className="flex items-center justify-center"
                  >
                    <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-lg bg-gradient-to-b from-white/95 to-[#EEEBDA]/70 border border-white/90 shadow-[0_1px_3px_rgba(20,25,55,0.12),inset_0_1px_1px_rgba(255,255,255,0.95)] flex items-center justify-center group-hover:scale-108 transition-transform">
                      <span className="font-black text-[9.5px] sm:text-[10.5px] tracking-tight text-[#141937] leading-none uppercase">
                        {lang === 'ua' ? 'UA' : 'EN'}
                      </span>
                    </div>
                  </motion.div>
                  <span className="hidden 2xl:inline text-[11px] uppercase tracking-wider font-bold whitespace-nowrap text-[#141937]/75 group-hover:text-[#141937] transition-colors">
                    {lang === 'ua' ? 'Мова' : 'Lang'}
                  </span>
                </button>
              </Magnetic>
            </div>

            {/* CTA & Actions - comfortably nested inside the bar */}
            <div className="hidden md:flex items-center ml-1 sm:ml-2">
              <Magnetic strength={0.25}>
                <button
                  onClick={() => handleBooking(t.nav.cta)}
                  className="bg-[#141937] text-[#EEEBDA] hover:bg-[#F3C3CF] hover:text-[#141937] text-xs uppercase tracking-wider font-bold px-3.5 sm:px-4.5 2xl:px-5 py-2 lg:py-2.5 rounded-full border border-[#141937] transition-all duration-300 flex items-center gap-1.5 sm:gap-2 group cursor-pointer shadow-xs hover:shadow-md whitespace-nowrap"
                >
                  <span>{t.nav.cta}</span>
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </Magnetic>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-1.5 sm:p-2 text-[#141937] rounded-full bg-white/60 border border-white/70 hover:bg-white/90 focus:outline-none transition-colors ml-0.5"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown Card */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 pt-3 border-t border-[#141937]/10 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-1">
              {t.nav.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-bold uppercase tracking-wider text-[#141937] py-2 px-2 rounded-lg hover:bg-white/60 flex justify-between items-center transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={15} className="text-[#141937]/40" />
                </a>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenBooking(t.nav.mobileCta)
                }}
                className="w-full bg-[#141937] text-[#EEEBDA] hover:bg-[#F3C3CF] hover:text-[#141937] text-center font-bold uppercase tracking-wider text-xs py-3 rounded-full shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>{t.nav.mobileCta}</span>
                <ArrowUpRight size={15} />
              </button>

              <div className="text-center text-[10px] text-[#141937]/60 font-medium">
                {t.nav.markets}
              </div>
            </div>
          </div>
        )}
      </motion.header>
    </div>
  )
}
