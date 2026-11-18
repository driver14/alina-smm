import '../styles/legacy.css'
import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { trackSiteVisitor, trackVisitorInteraction } from '../services/visitorTracker'
import { Navbar } from './Navbar'
import { Hero } from './Hero'
import { StatsBar } from './StatsBar'
import { Philosophy } from './Philosophy'
import { Services } from './Services'
import { CasesGallery } from './CasesGallery'
import { InteractiveCalculator } from './InteractiveCalculator'
import { AboutAlina } from './AboutAlina'
import { FAQ } from './FAQ'
import { Footer } from './Footer'
import { BookingModal } from './BookingModal'
import { AmbientSpotlight } from './AmbientSpotlight'

/** Legacy "classic" concept (V1). Loaded on demand only via ?v=classic. */
export default function ClassicSite() {
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

