import React, { useState, useEffect, useRef } from 'react'
import { Check, ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play, ShieldCheck } from 'lucide-react'
import { TiltCard } from './TiltCard'
import { useLanguage } from '../context/LanguageContext'

interface AboutAlinaProps {
  onOpenBooking: () => void
}

export const AboutAlina: React.FC<AboutAlinaProps> = ({ onOpenBooking }) => {
  const { t } = useLanguage()
  const [activePhotoIdx, setActivePhotoIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const photoSources = [
    { src: '/photos/alina-portrait.jpg', position: 'object-top' },
    { src: '/photos/alina-barcelona.jpg', position: 'object-[center_60%]' },
    { src: '/photos/alina-cafe.jpg', position: 'object-top' },
    { src: '/photos/alina-editorial.jpg', position: 'object-top' },
    { src: '/photos/alina-flowers.jpg', position: 'object-top' }
  ]

  const galleryPhotos = photoSources.map((item, idx) => ({
    src: item.src,
    position: item.position,
    tag: t.about.slides[idx]?.tag || '',
    title: t.about.slides[idx]?.title || '',
    desc: t.about.slides[idx]?.desc || ''
  }))

  // Auto-play timer for smooth crossfade rotation
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setActivePhotoIdx((prev) => (prev + 1) % galleryPhotos.length)
      }, 3400)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPaused, galleryPhotos.length])

  const nextPhoto = () => {
    setActivePhotoIdx((prev) => (prev + 1) % galleryPhotos.length)
  }

  const prevPhoto = () => {
    setActivePhotoIdx((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length)
  }

  return (
    <section id="about" className="py-24 bg-[#EEEBDA] border-b border-[#141937]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Personal Photos with Smooth Auto-Crossfade (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div 
              className="relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Soft ambient background blur */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#F3C3CF]/50 to-[#141937]/10 rounded-3xl blur-lg opacity-70"></div>

              {/* Primary Personal Photo Card with 3D Tilt */}
              <TiltCard maxTilt={5} scale={1.015} glare={true} glareOpacity={0.12} className="relative z-10 rounded-3xl">
                <div className="bg-white/80 backdrop-blur-md border border-[#141937]/10 p-5 rounded-3xl shadow-[0_10px_35px_rgba(20,25,55,0.06)]">
                
                {/* Image Frame with Smooth Crossfade */}
                <div className="aspect-[4/5] bg-[#141937] rounded-2xl relative overflow-hidden group shadow-inner">
                  {galleryPhotos.map((photo, pIdx) => (
                    <img
                      key={pIdx}
                      src={photo.src}
                      alt={photo.title}
                      className={`absolute inset-0 w-full h-full object-cover ${photo.position || 'object-top'} transition-opacity duration-1000 ease-in-out ${
                        activePhotoIdx === pIdx ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                      }`}
                      style={{ transitionProperty: 'opacity, transform' }}
                    />
                  ))}

                  {/* Gentle gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141937]/90 via-[#141937]/15 to-transparent pointer-events-none"></div>

                  {/* Gallery Controls (Play/Pause + Nav Arrows) */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 z-20">
                    <button
                      onClick={() => setIsPaused(!isPaused)}
                      className="p-2 bg-[#141937]/80 backdrop-blur-md text-[#EEEBDA] hover:text-[#F3C3CF] rounded-full border border-white/20 cursor-pointer transition-all duration-200"
                      title={isPaused ? t.about.autoPlayPaused : t.about.autoPlayActive}
                      aria-label={isPaused ? t.about.autoPlayPaused : t.about.autoPlayActive}
                    >
                      {isPaused ? <Play size={13} /> : <Pause size={13} />}
                    </button>
                    <button
                      onClick={prevPhoto}
                      className="p-2 bg-[#141937]/80 backdrop-blur-md text-[#EEEBDA] hover:bg-[#F3C3CF] hover:text-[#141937] rounded-full border border-white/20 cursor-pointer transition-all duration-200"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft size={15} />
                    </button>
                    <button
                      onClick={nextPhoto}
                      className="p-2 bg-[#141937]/80 backdrop-blur-md text-[#EEEBDA] hover:bg-[#F3C3CF] hover:text-[#141937] rounded-full border border-white/20 cursor-pointer transition-all duration-200"
                      aria-label="Next photo"
                    >
                      <ChevronRight size={15} />
                    </button>
                  </div>

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-5 left-5 right-5 z-20 text-[#EEEBDA]">
                    <h4 className="text-xl font-extrabold tracking-tight text-[#EEEBDA]">
                      {galleryPhotos[activePhotoIdx]?.title}
                    </h4>
                    <p className="text-xs text-[#EEEBDA]/90 font-medium leading-relaxed mt-1">
                      {galleryPhotos[activePhotoIdx]?.desc}
                    </p>
                  </div>
                </div>

                {/* Progress Indicators / Thumbnail Strip (All 5 photos) */}
                <div className="mt-4 grid grid-cols-5 gap-2.5">
                  {galleryPhotos.map((photo, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => {
                        setActivePhotoIdx(pIdx)
                        setIsPaused(true)
                      }}
                      className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                        activePhotoIdx === pIdx
                          ? 'ring-2 ring-[#141937] ring-offset-2 ring-offset-[#EEEBDA] scale-105 shadow-md'
                          : 'opacity-60 hover:opacity-100 hover:scale-102'
                      }`}
                    >
                      <img src={photo.src} alt={photo.title} className={`w-full h-full object-cover ${photo.position || 'object-top'}`} />
                      {activePhotoIdx === pIdx && (
                        <div className="absolute inset-0 bg-[#F3C3CF]/20 border-2 border-[#141937] rounded-xl pointer-events-none"></div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-[#141937]/65 px-1">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-[#141937]" />
                    <span>{galleryPhotos[activePhotoIdx]?.tag}</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider">
                    {activePhotoIdx + 1} / {galleryPhotos.length}
                  </span>
                </div>
              </div>
            </TiltCard>
            </div>

            {/* Working Process Proof Card with 3D Tilt */}
            <TiltCard maxTilt={4} scale={1.02} glare={false} className="rounded-2xl">
              <div className="bg-white/80 backdrop-blur-sm border border-[#141937]/10 p-4 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-[#141937]/15 shadow-sm">
                  <img
                    src="/photos/alina-work-process.jpg"
                    alt={t.about.workTitle}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-[#F3C3CF]/60 text-[#141937] px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider mb-1">
                    <span>{t.about.workBadge}</span>
                  </div>
                  <h5 className="text-sm font-bold text-[#141937] leading-snug">
                    {t.about.workTitle}
                  </h5>
                  <p className="text-xs text-[#141937]/75 mt-0.5">
                    {t.about.workDesc}
                  </p>
                </div>
              </div>
            </TiltCard>

          </div>

          {/* Right Column: Bio, Story, Philosophy (7 cols) */}
          <div className="lg:col-span-7 space-y-7">
            
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-[#141937]/10 text-[#141937] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
              <img
                src="/pins/pin-person.png"
                alt=""
                className="w-5 h-5 object-contain shrink-0 -my-0.5 animate-float-delayed"
              />
              <span>{t.about.tag}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#141937] tracking-tight leading-[1.15]">
              {t.about.titleBefore}{' '}
              <span className="word-highlight">
                {t.about.titleHighlight}
              </span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#141937]/85 leading-relaxed font-normal">
              <p>
                {t.about.bioP1}
              </p>
              <p>
                {t.about.bioP2}
              </p>
              
              <div className="p-6 bg-white/90 backdrop-blur-sm border border-[#141937]/10 rounded-2xl space-y-2 shadow-sm my-6">
                <p className="text-base sm:text-lg text-[#141937] font-semibold leading-relaxed">
                  {t.about.quote}
                </p>
                <div className="text-xs font-bold uppercase tracking-wider text-[#141937]/60 pt-1">
                  {t.about.quoteRule}
                </div>
              </div>

              <p>
                {t.about.bioP3}
              </p>
            </div>

            {/* Principles Checklist with Soft Rounded Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {t.about.principles.map((principle, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 bg-white/70 backdrop-blur-sm border border-[#141937]/10 rounded-xl shadow-xs">
                  <div className="p-1.5 bg-[#F3C3CF] text-[#141937] rounded-lg mt-0.5 shrink-0">
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <span className="text-xs font-bold text-[#141937]">{principle}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onOpenBooking}
                className="bg-[#141937] text-[#EEEBDA] hover:bg-[#F3C3CF] hover:text-[#141937] text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-xl border border-[#141937] transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <span>{t.about.ctaTalk}</span>
                <ArrowUpRight size={16} />
              </button>

              <a
                href="https://t.me/vlshavo"
                target="_blank"
                rel="noreferrer"
                className="bg-white/80 hover:bg-white text-[#141937] text-xs font-bold uppercase tracking-wider px-6 py-4 rounded-xl border border-[#141937]/15 transition-all duration-300 inline-flex items-center justify-center gap-2.5 text-center shadow-xs group"
              >
                <img
                  src="/pins/pin-telegram.png"
                  alt="Telegram"
                  className="w-4.5 h-4.5 object-contain shrink-0 transition-transform group-hover:scale-110"
                />
                <span>Telegram</span>
              </a>

              <a
                href="https://www.instagram.com/vlsh.av?psln=MWN1bm95N3h3bXgxdg=="
                target="_blank"
                rel="noreferrer"
                className="bg-white/80 hover:bg-white text-[#141937] text-xs font-bold uppercase tracking-wider px-6 py-4 rounded-xl border border-[#141937]/15 transition-all duration-300 inline-flex items-center justify-center gap-2.5 text-center shadow-xs group"
                title="Instagram: @vlsh.av"
              >
                <img
                  src="/pins/pin-instagram.png"
                  alt="Instagram"
                  className="w-4.5 h-4.5 object-contain shrink-0 transition-transform group-hover:scale-110"
                />
                <span>Instagram</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
