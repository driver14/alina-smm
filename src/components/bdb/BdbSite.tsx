import React, { useState, useEffect } from 'react'
import { trackSiteVisitor, trackVisitorInteraction } from '../../services/visitorTracker'
import { BdbPreloader } from './BdbPreloader'
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
import { CustomCursor } from '../CustomCursor'
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
      className="min-h-screen bg-transparent text-[#141937] flex flex-col font-sans selection:bg-[#F3C3CF] selection:text-[#141937] relative overflow-x-clip"
    >
      {/* 00. Dedicated Hardware-Accelerated Liquid Canvas Layer */}
      <div
        id="site-bg-canvas"
        className="fixed inset-0 pointer-events-none -z-10 will-change-[background-color]"
        style={{ backgroundColor: '#EEEBDA' }}
        aria-hidden="true"
      />
      
      {/* 00. Interactive Magnetic Luxury Cursor (Awwwards Grade) */}
      <CustomCursor />

      {/* 00. Dynamic Background Theme Controller (Alternating Light ⟷ Dark Sections) */}
      <DynamicBackgroundController />

      {/* 00. Luxury Logo Intro Preloader */}
      <BdbPreloader />

      {/* 00. Minimalist Clean Navbar */}
      <BdbNavbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Content Sections (All Alternating Light ⟷ Dark) */}
      <main className="flex-1">
        
        {/* 01. ГОЛОВНИЙ ЕКРАН (Light Ivory Cream) */}
        <BdbHero onOpenBooking={() => handleOpenBooking()} />

        {/* 02. ДОСВІД ТА ЕКСПЕРТИЗА (Dark Deep Navy - Interactive Telemetry Console) */}
        <BdbExpertise />

        {/* 02.5 СИСТЕМНА АРХІТЕКТУРА МАРКЕТИНГУ (Light Ivory Cream) */}
        <BdbStackedManifesto onOpenBooking={() => handleOpenBooking()} />

        {/* 02.6 ІНТЕРАКТИВНЕ КОЛЕСО НАВІГАЦІЇ (Dark Deep Navy - No Lines, Pure Clean Typography) */}
        <BdbInteractiveWheel onOpenBooking={(service, note) => handleOpenBooking(service, note)} />

        {/* 03. МІЙ ПІДХІД (Light Ivory Cream - Kinetic Expanding Pillars) */}
        <BdbApproach />

        {/* 04. З ЯКИМИ ЗАПИТАМИ Я ПРАЦЮЮ (Dark Deep Navy) */}
        <BdbInquiries onOpenBooking={() => handleOpenBooking()} />

        {/* 05. ЯК Я БУДУЮ МАРКЕТИНГОВУ СИСТЕМУ (Light Ivory Cream) */}
        <BdbMethodology />

        {/* 06. КЕЙСИ ТА РЕЗУЛЬТАТИ (Dark Deep Navy - Straight Cuts, No Text-Obscuring Overlay, Isolated Wheel) */}
        <BdbWorks onOpenBooking={(service, note) => handleOpenBooking(service, note)} />

        {/* 07. ПОСЛУГИ ТА ВАРТІСТЬ (Light Ivory Cream - Spectrum Spectrum Rows) */}
        <BdbCapabilities onOpenBooking={(service, note) => handleOpenBooking(service, note)} />

        {/* 08. ПРО МЕНЕ ТА КОМАНДУ (Dark Deep Navy - Asymmetrical Fashion Editorial) */}
        <BdbAbout onOpenBooking={(service, note) => handleOpenBooking(service, note)} />

        {/* 09. ЯК ВІДБУВАЄТЬСЯ СПІВПРАЦЯ (Light Ivory Cream) */}
        <BdbProcess />

        {/* 10. FAQ (Dark Deep Navy - Zero Sparkles, Straight Cuts) */}
        <BdbFaq />

      </main>

      {/* 11. ФІНАЛЬНИЙ БЛОК & ФУТЕР (Dark Deep Navy) */}
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
