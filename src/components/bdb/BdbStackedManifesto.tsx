import React, { useRef, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { triggerHaptic } from '../../utils/haptics'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface BdbStackedManifestoProps {
  onOpenBooking?: () => void
}

export const BdbStackedManifesto: React.FC<BdbStackedManifestoProps> = ({ onOpenBooking }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const line3Ref = useRef<HTMLDivElement>(null)
  const line4Ref = useRef<HTMLDivElement>(null)
  const line5Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sec = sectionRef.current
    if (!sec) return

    const ctx = gsap.context(() => {
      // Horizontal kinetic opposing drifts on scroll (Billion Dollar Boy hallmark)
      gsap.to(line1Ref.current, {
        x: -90,
        ease: 'none',
        scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: 1 }
      })
      gsap.to(line2Ref.current, {
        x: 90,
        ease: 'none',
        scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: 1 }
      })
      gsap.to(line3Ref.current, {
        x: -70,
        ease: 'none',
        scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: 1 }
      })
      gsap.to(line4Ref.current, {
        x: 80,
        ease: 'none',
        scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: 1 }
      })
      gsap.to(line5Ref.current, {
        x: -90,
        ease: 'none',
        scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: 1 }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleCta = () => {
    triggerHaptic('medium')
    if (onOpenBooking) onOpenBooking()
  }

  return (
    <section 
      id="philosophy" 
      data-theme="light"
      ref={sectionRef}
      className="relative z-20 py-24 sm:py-36 bg-transparent text-[#141937] overflow-hidden"
    >
      {/* Ambient luxury light sheen */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-[#F3C3CF]/20 blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Top Minimalist Tag */}
        <div className="flex items-center gap-3 mb-12 text-xs font-bold uppercase tracking-[0.2em] text-[#141937]/60 text-left">
          <span className="w-2 h-2 rounded-full bg-[#141937]" />
          <span>СИСТЕМНА АРХІТЕКТУРА МАРКЕТИНГУ</span>
        </div>

        {/* 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center text-left">
          
          {/* Left Column: Stacked Typographic Kinetic Sculpture (Scrubbed Horizontal Parallax) */}
          <div className="lg:col-span-6 select-none font-display uppercase tracking-tighter leading-[0.88] flex flex-col justify-center overflow-visible">
            
            {/* 1. Ghosted Outline Top */}
            <div 
              ref={line1Ref}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-stroke-outline hover:text-[#141937]/40 transition-colors duration-500 will-change-transform"
            >
              СТРАТЕГІЯ
            </div>

            {/* 2. Solid Bold Navy */}
            <div 
              ref={line2Ref}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-black text-[#141937] tracking-tight hover:text-[#1E254F] transition-colors will-change-transform"
            >
              МАРКЕТИНГ
            </div>

            {/* 3. Solid Bold Navy */}
            <div 
              ref={line3Ref}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-black text-[#141937] tracking-tight hover:text-[#1E254F] transition-colors will-change-transform"
            >
              АНАЛІТИКА
            </div>

            {/* 4. Solid Bold Navy */}
            <div 
              ref={line4Ref}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-black text-[#141937] tracking-tight hover:text-[#1E254F] transition-colors will-change-transform"
            >
              КОНТЕНТ
            </div>

            {/* 5. Ghosted Outline Bottom */}
            <div 
              ref={line5Ref}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-stroke-outline hover:text-[#141937]/40 transition-colors duration-500 will-change-transform"
            >
              ПРОДАЖІ
            </div>

          </div>

          {/* Right Column: Editorial Body Text from User */}
          <div className="lg:col-span-6 space-y-8 max-w-xl">
            
            <p className="text-2xl sm:text-3xl lg:text-[2.25rem] font-light leading-snug text-[#141937]">
              Для мене SMM — це насамперед маркетинг, <br />
              <span className="font-editorial italic font-normal text-[#141937] font-semibold">
                а не контент заради контенту.
              </span>
            </p>

            <div className="space-y-4 text-base sm:text-lg text-[#141937]/75 font-normal leading-relaxed">
              <p>
                Кожне рішення має бути обґрунтованим і працювати на конкретну бізнес-ціль. Соціальні мережі не існують ізольовано: контент, таргетована реклама, аналітика та продажі об’єднуються в єдину злагоджену систему.
              </p>
              <p>
                Разом вони допомагають бізнесу завойовувати увагу, вибудовувати стійку репутацію та генерувати вимірювані фінансові результати.
              </p>
            </div>

            {/* Proof Card (Editorial style) */}
            <div className="p-6 rounded-none bg-white/70 border border-[#141937]/15 shadow-sm flex items-center gap-4">
              <img 
                src="/photos/alina-work-process.jpg" 
                alt="Alina Voloshyna process" 
                className="w-16 h-16 rounded-none object-cover border border-[#141937]/15"
              />
              <div className="text-left">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#141937]">
                  ГЛИБОКА ПІДГОТОВКА КОЖНОГО ПРОЄКТУ
                </div>
                <div className="text-xs text-[#141937]/65 mt-0.5">
                  5–7 днів дослідження ринку та конкурентів перед запуском
                </div>
              </div>
            </div>

            {/* Action Row */}
            <div className="pt-2 flex items-center gap-6">
              <button
                type="button"
                onClick={handleCta}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#141937] hover:bg-[#1E254F] text-[#EEEBDA] text-xs font-extrabold uppercase tracking-[0.16em] transition-all hover:scale-102 cursor-pointer shadow-lg shadow-[#141937]/15 rolex-sheen"
              >
                <span>ПОЧАТИ СПІВПРАЦЮ</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <span className="text-xs font-semibold uppercase tracking-wider text-[#141937]/60">
                США • ЄВРОПА • УКРАЇНА
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
