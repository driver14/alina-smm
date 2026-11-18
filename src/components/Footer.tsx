import React from 'react'
import { ArrowUp, ArrowUpRight, Check } from 'lucide-react'
import { BrandLogo } from './BrandLogo'
import { TiltCard } from './TiltCard'
import { Magnetic } from './Magnetic'
import { useLanguage } from '../context/LanguageContext'

interface FooterProps {
  onOpenBooking: () => void
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const { lang, t } = useLanguage()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="footer" className="bg-[#141937] text-[#EEEBDA] border-t border-[#EEEBDA]/10">
      
      {/* Pre-footer Call to Action Banner with 3D Tilt, Aurora Atmosphere & Interactive Physics */}
      <div className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <TiltCard
          maxTilt={3.5}
          scale={1.012}
          glare={true}
          glareOpacity={0.14}
          className="w-full rounded-3xl"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-white/10 via-white/[0.04] to-white/[0.02] border border-white/20 rounded-3xl p-7 sm:p-11 lg:p-14 shadow-[0_24px_60px_rgba(10,13,29,0.45),inset_0_1px_1.5px_rgba(255,255,255,0.3)] backdrop-blur-xl">
            
            {/* Ambient Aurora Drifting Glow Orbs */}
            <div className="absolute -top-24 -right-20 w-80 h-80 bg-[#F3C3CF]/25 rounded-full blur-3xl animate-orb-1 pointer-events-none" />
            <div className="absolute -bottom-24 -left-20 w-80 h-80 bg-[#EEEBDA]/10 rounded-full blur-3xl animate-orb-2 pointer-events-none" />
            
            {/* Subtle Dot Grid Texture Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] bg-[size:24px_24px] pointer-events-none opacity-60" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
              
              {/* Left Column: Heading, Subtitle & Live Status */}
              <div className="max-w-2xl space-y-4">
                {/* Live Availability Badge */}
                <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#F3C3CF] shadow-xs">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-radar absolute inline-flex h-full w-full rounded-full bg-[#F3C3CF] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F3C3CF]"></span>
                  </span>
                  <span>{t.footer.ctaBanner.badge}</span>
                  <span className="hidden sm:inline text-white/30">•</span>
                  <span className="hidden sm:inline text-[#EEEBDA]/80 normal-case font-medium">{t.footer.ctaBanner.badgeSubtitle}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#EEEBDA] tracking-tight leading-[1.15]">
                  {t.footer.ctaBanner.titleBefore}{' '}
                  <span className="word-highlight-navy">{t.footer.ctaBanner.titleHighlight}</span>{' '}
                  {t.footer.ctaBanner.titleAfter}
                </h2>

                <p className="text-sm sm:text-base text-[#EEEBDA]/85 font-medium leading-relaxed max-w-xl">
                  {t.footer.ctaBanner.desc}
                </p>

                {/* Assurance Micro-points */}
                <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-[#EEEBDA]/75 font-semibold">
                  <span className="inline-flex items-center gap-1.5">
                    <Check size={14} className="text-[#F3C3CF]" />
                    {t.footer.ctaBanner.point1}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check size={14} className="text-[#F3C3CF]" />
                    {t.footer.ctaBanner.point2}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check size={14} className="text-[#F3C3CF]" />
                    {t.footer.ctaBanner.point3}
                  </span>
                </div>
              </div>

              {/* Right Column: Floating 3D Stars Pin + Animated Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3.5 w-full lg:w-auto shrink-0 relative">
                
                {/* Floating 3D Sparkle Pin Decor */}
                <div
                  className="hidden xl:block absolute -top-12 -right-6 pointer-events-none animate-float-slow z-20"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <img
                    src="/pins/pin-stars.png"
                    alt=""
                    className="w-12 h-12 object-contain drop-shadow-[0_8px_16px_rgba(243,195,207,0.35)]"
                  />
                </div>

                {/* Primary Booking Button with Shimmer & Magnetic */}
                <Magnetic strength={0.25} className="w-full sm:w-auto">
                  <button
                    onClick={onOpenBooking}
                    className="w-full sm:w-auto bg-[#F3C3CF] text-[#141937] hover:bg-white px-7 sm:px-8 py-4 sm:py-4.5 text-xs font-black uppercase tracking-wider rounded-2xl transition-all duration-300 shadow-[0_8px_25px_rgba(243,195,207,0.25)] hover:shadow-[0_12px_35px_rgba(255,255,255,0.4)] flex items-center justify-center gap-2.5 relative overflow-hidden group cursor-pointer"
                  >
                    {/* Shimmer light sweep */}
                    <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg] -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
                    
                    <span className="relative z-10">{t.footer.ctaBanner.btnBook}</span>
                    <ArrowUpRight size={16} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </Magnetic>

                {/* Secondary Telegram Direct Chat Button with Magnetic */}
                <Magnetic strength={0.25} className="w-full sm:w-auto">
                  <a
                    href="https://t.me/vlshavo"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/20 text-[#EEEBDA] hover:text-white px-6 sm:px-7 py-4 sm:py-4.5 text-xs font-bold uppercase tracking-wider rounded-2xl backdrop-blur-md transition-all duration-300 inline-flex items-center justify-center gap-2.5 text-center group shadow-md cursor-pointer"
                  >
                    <img
                      src="/pins/pin-telegram.png"
                      alt="Telegram"
                      className="w-5 h-5 object-contain shrink-0 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12"
                    />
                    <span>{t.footer.ctaBanner.btnTelegram}</span>
                  </a>
                </Magnetic>
              </div>

            </div>
          </div>
        </TiltCard>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3 group">
              <BrandLogo size="md" theme="blush" />
              <div>
                <span className="font-extrabold tracking-tight text-lg text-[#EEEBDA] block">
                  {t.brand.name}
                </span>
                <span className="text-[11px] tracking-widest uppercase text-[#EEEBDA]/70">
                  {t.brand.role}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#EEEBDA]/75 max-w-sm leading-relaxed">
              {t.footer.desc}
            </p>

            {/* Social & Contact Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://t.me/vlshavo"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 text-[#EEEBDA] rounded-xl border border-white/10 flex items-center justify-center transition-all duration-200 group"
                aria-label="Telegram"
                title="Telegram: @vlshavo"
              >
                <img
                  src="/pins/pin-telegram.png"
                  alt="Telegram"
                  className="w-5 h-5 object-contain transition-transform group-hover:scale-110"
                />
              </a>
              <a
                href="https://www.instagram.com/vlsh.av?psln=MWN1bm95N3h3bXgxdg=="
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 text-[#EEEBDA] rounded-xl border border-white/10 flex items-center justify-center transition-all duration-200 group"
                aria-label="Instagram"
                title="Instagram: @vlsh.av"
              >
                <img
                  src="/pins/pin-instagram.png"
                  alt="Instagram"
                  className="w-5 h-5 object-contain transition-transform group-hover:scale-110"
                />
              </a>
              <a
                href="mailto:vlshavvoloshina1204@gmail.com"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 text-[#EEEBDA] rounded-xl border border-white/10 flex items-center justify-center transition-all duration-200 group"
                aria-label="Email"
                title="Email: vlshavvoloshina1204@gmail.com"
              >
                <img
                  src="/pins/pin-envelope.png"
                  alt="Email"
                  className="w-5 h-5 object-contain transition-transform group-hover:scale-110"
                />
              </a>
            </div>

            {/* Clickable Email Direct Text Link */}
            <div className="pt-1">
              <a
                href="mailto:vlshavvoloshina1204@gmail.com"
                className="inline-flex items-center gap-2 text-xs text-[#EEEBDA]/85 hover:text-[#F3C3CF] transition-colors py-1 group"
              >
                <img
                  src="/pins/pin-envelope.png"
                  alt=""
                  className="w-4 h-4 object-contain transition-transform group-hover:scale-110"
                />
                <span className="font-medium underline underline-offset-4 decoration-white/20 group-hover:decoration-[#F3C3CF]">
                  vlshavvoloshina1204@gmail.com
                </span>
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#F3C3CF] mb-4">
              {t.footer.quickLinksTitle}
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-[#EEEBDA]/80">
              {t.nav.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-[#F3C3CF] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Geography & Formats */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#F3C3CF] mb-4">
              {lang === 'ua' ? 'Географія & Ніші' : 'Markets & Niches'}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#EEEBDA]/80">
              <li>{lang === 'ua' ? 'США (USA Market)' : 'USA Market'}</li>
              <li>{lang === 'ua' ? 'Країни Європи (EU)' : 'European Union (EU)'}</li>
              <li>{lang === 'ua' ? 'Україна' : 'Ukraine'}</li>
              <li className="pt-2 text-[11px] text-[#EEEBDA]/60 uppercase tracking-wider">
                Beauty • Fashion • EdTech • E-Commerce
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EEEBDA]/60">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© {new Date().getFullYear()} {t.brand.name}. {t.footer.copyright}</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <a
              href="mailto:vlshavvoloshina1204@gmail.com"
              className="hover:text-[#F3C3CF] transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-[#F3C3CF]"
            >
              vlshavvoloshina1204@gmail.com
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#F3C3CF] transition-colors cursor-pointer"
          >
            <span>{lang === 'ua' ? 'Вгору' : 'Top'}</span>
            <ArrowUp size={14} />
          </button>
        </div>

      </div>
    </footer>
  )
}
