import React, { useState, useEffect } from 'react'
import { trackSiteVisitor, trackVisitorInteraction } from '../../services/visitorTracker'
import { BdbNavbar } from './BdbNavbar'
import { BdbHero } from './BdbHero'
import { BdbExpertise } from './BdbExpertise'
import { BdbStackedManifesto } from './BdbStackedManifesto'
import { BdbInteractiveWheel } from './BdbInteractiveWheel'
import { BdbApproach } from './BdbApproach'
import { BdbInquiries } from './BdbInquiries'
import { BdbMethodology } from './BdbMethodology'
import { BdbWorks } from './BdbWorks'
import { BdbCapabilities } from './BdbCapabilities'
import { BdbAbout } from './BdbAbout'
import { BdbProcess } from './BdbProcess'
import { BdbFaq } from './BdbFaq'
import { BdbFooter } from './BdbFooter'
import { BookingModal } from '../BookingModal'
import { DynamicBackgroundController } from '../DynamicBackgroundController'

export const BdbSite: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [bookingNote, setBookingNote] = useState('')

  useEffect(() => {
    trackSiteVisitor()
  }, [])

  const handleOpenBooking = (serviceTitle?: string, note?: string) => {
    setSelectedService(serviceTitle || 'Безкоштовний стратегічний розбір')
    setBookingNote(note || '')
    setIsBookingOpen(true)
    trackVisitorInteraction('opened_booking_modal_bdb', serviceTitle || 'Default')
  }

  const handleCloseBooking = () => {
    setIsBookingOpen(false)
  }

  return (
    <div 
      id="site-canvas" 
      className="min-h-screen flex flex-col relative overflow-x-clip"
    >
      <a href="#main-content" className="skip-link">Перейти до змісту</a>

      {/* Custom cursor (fine pointers only) */}

      {/* Navbar theme sync — sections own their solid backgrounds */}
      <DynamicBackgroundController />


      {/* Navigation */}
      <BdbNavbar onOpenBooking={() => handleOpenBooking()} />

      {/* Surfaces: pink → ink → paper … each section owns its background */}
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        
        {/* 01 Hero — pink */}
        <BdbHero onOpenBooking={() => handleOpenBooking()} />

        {/* 02 Expertise — ink */}
        <BdbExpertise />

        {/* 02.5 Philosophy — paper */}
        <BdbStackedManifesto onOpenBooking={() => handleOpenBooking()} />

        {/* 02.6 System vectors drum — ink */}
        <BdbInteractiveWheel onOpenBooking={(service, note) => handleOpenBooking(service, note)} />

        {/* 03 Approach — paper */}
        <BdbApproach />

        {/* 04 Inquiries — ink */}
        <BdbInquiries onOpenBooking={(service, note) => handleOpenBooking(service, note)} />

        {/* 05 Methodology — paper */}
        <BdbMethodology />

        {/* 06 Cases — ink */}
        <BdbWorks onOpenBooking={(service, note) => handleOpenBooking(service, note)} />

        {/* 07 Services — paper */}
        <BdbCapabilities onOpenBooking={(service, note) => handleOpenBooking(service, note)} />

        {/* 08 About — pink + ink */}
        <BdbAbout onOpenBooking={(service, note) => handleOpenBooking(service, note)} />

        {/* 09 Process — paper */}
        <BdbProcess />

        {/* 10 FAQ — ink */}
        <BdbFaq />

      </main>

      {/* Closing CTA (pink) + footer (ink) */}
      <BdbFooter onOpenBooking={(service, note) => handleOpenBooking(service, note)} />

      {/* Unified Lead Generation Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialService={selectedService}
        initialNote={bookingNote}
      />
    </div>
  )
}
