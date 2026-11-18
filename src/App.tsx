import { useState, useEffect } from 'react'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { trackSiteVisitor, trackVisitorInteraction } from './services/visitorTracker'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { StatsBar } from './components/StatsBar'
import { Philosophy } from './components/Philosophy'
import { Services } from './components/Services'
import { CasesGallery } from './components/CasesGallery'
import { InteractiveCalculator } from './components/InteractiveCalculator'
import { AboutAlina } from './components/AboutAlina'
import { FAQ } from './components/FAQ'
import { Footer } from './components/Footer'
import { BookingModal } from './components/BookingModal'
import { AmbientSpotlight } from './components/AmbientSpotlight'
import { KineticSite } from './components/v2/KineticSite'
import { BdbSite } from './components/bdb/BdbSite'
import { VersionSwitcher, type SiteVersion } from './components/VersionSwitcher'
import { SmoothScrollProvider } from './providers/SmoothScrollProvider'

function ClassicSite() {
  const { t } = useLanguage()
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [bookingNote, setBookingNote] = useState('')

  useEffect(() => {
    trackSiteVisitor()
  }, [])

  const handleOpenBooking = (serviceTitle?: string, note?: string) => {
    setSelectedService(serviceTitle || t.bookingModal.serviceOptions[0])
    setBookingNote(note || '')
    setIsBookingOpen(true)
    trackVisitorInteraction('opened_booking_modal', serviceTitle || 'Default')
  }

  const handleCloseBooking = () => {
    setIsBookingOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#EEEBDA] text-[#141937] flex flex-col font-sans selection:bg-[#F3C3CF] selection:text-[#141937] relative overflow-x-clip">
      {/* 60fps Ambient Spotlight & Vitality Background Orbs */}
      <AmbientSpotlight />

      {/* Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with Alina's Portrait */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* 2. Key Metrics & 60fps Running Marquee */}
        <StatsBar />

        {/* 3. Methodology & Core Philosophy: Why Traditional SMM fails vs Our System */}
        <Philosophy />

        {/* 4. 3 Distinct Case Blocks with 5-10 Slide Galleries */}
        <CasesGallery />

        {/* 5. 4 Core Services Grid */}
        <Services onSelectService={(service) => handleOpenBooking(service)} />

        {/* 6. Interactive Diagnostic Tool */}
        <InteractiveCalculator
          onRecommendService={(service, details) => handleOpenBooking(service, details)}
        />

        {/* 7. Who is Alina Voloshyna (Personal Photos, Brand & Principles) */}
        <AboutAlina onOpenBooking={() => handleOpenBooking()} />

        {/* 8. Frequently Asked Questions (FAQ) */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Lead Generation & Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialService={selectedService || t.bookingModal.serviceOptions[0]}
        initialNote={bookingNote}
      />
    </div>
  )
}

export function App() {
  const [version, setVersion] = useState<SiteVersion>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const v = urlParams.get('v')
      if (v === 'classic') return 'classic'
      if (v === 'kinetic' || v === 'luxe' || v === 'v2') return 'kinetic'
      if (v === 'bdb' || v === 'v3') return 'bdb'
      const saved = localStorage.getItem('alina_site_concept') as SiteVersion | null
      if (saved === 'classic' || saved === 'kinetic' || saved === 'bdb') return saved
    }
    return 'bdb'
  })

  const handleVersionChange = (newV: SiteVersion) => {
    setVersion(newV)
    if (typeof window !== 'undefined') {
      localStorage.setItem('alina_site_concept', newV)
    }
  }

  return (
    <SmoothScrollProvider>
      <LanguageProvider>
        {version === 'bdb' ? (
          <BdbSite />
        ) : version === 'kinetic' ? (
          <KineticSite />
        ) : (
          <ClassicSite />
        )}
        <VersionSwitcher version={version} onChange={handleVersionChange} />
      </LanguageProvider>
    </SmoothScrollProvider>
  )
}

export default App
