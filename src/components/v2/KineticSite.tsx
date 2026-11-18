import React, { useState, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { trackSiteVisitor, trackVisitorInteraction } from '../../services/visitorTracker'
import { Navbar } from '../Navbar'
import { KineticHero } from './KineticHero'
import { StatsBar } from '../StatsBar'
import { BeforeAfterMatrix } from './BeforeAfterMatrix'
import { KineticCases } from './KineticCases'
import { Services } from '../Services'
import { KineticDiagnostic } from './KineticDiagnostic'
import { AboutAlina } from '../AboutAlina'
import { FAQ } from '../FAQ'
import { Footer } from '../Footer'
import { BookingModal } from '../BookingModal'
import { AmbientSpotlight } from '../AmbientSpotlight'

export const KineticSite: React.FC = () => {
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
    trackVisitorInteraction('opened_booking_modal_v2', serviceTitle || 'Default')
  }

  const handleCloseBooking = () => {
    setIsBookingOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#141937] flex flex-col font-sans selection:bg-[#F3C3CF] selection:text-[#141937] relative overflow-x-clip">
      {/* 60fps Ambient Spotlight */}
      <AmbientSpotlight />

      {/* Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Kinetic Hero with 3D Tilt Card and Magnetic Button */}
        <KineticHero onOpenBooking={() => handleOpenBooking()} />

        {/* 2. Key Metrics & 60fps Running Marquee */}
        <StatsBar />

        {/* 3. Before vs After Strategy Matrix */}
        <BeforeAfterMatrix />

        {/* 4. Interactive Cases & Real Revenue Proof */}
        <KineticCases onOpenBooking={(service, note) => handleOpenBooking(service, note)} />

        {/* 5. 4 Core Services Grid */}
        <Services onSelectService={(service) => handleOpenBooking(service)} />

        {/* 6. Interactive Diagnostic & ROI Simulator */}
        <KineticDiagnostic onOpenBooking={(service, note) => handleOpenBooking(service, note)} />

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
