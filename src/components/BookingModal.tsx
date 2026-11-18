import React, { useState, useEffect } from 'react'
import { X, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { sendLeadNotification, getDirectTelegramUrl } from '../services/leadNotification'
import { trackVisitorInteraction } from '../services/visitorTracker'
import { haptics } from '../utils/haptics'
import { BrandLogo } from './BrandLogo'
import { Magnetic } from './Magnetic'
import { useLanguage } from '../context/LanguageContext'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  initialService?: string
  initialNote?: string
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService,
  initialNote = '',
}) => {
  const { lang, t } = useLanguage()
  const defaultService = initialService || t.bookingModal.serviceOptions[0]

  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [instagram, setInstagram] = useState('')
  const [service, setService] = useState(defaultService)
  const [niche, setNiche] = useState(t.bookingModal.nicheOptions[0])
  const [comment, setComment] = useState(initialNote)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const alinaTelegram = import.meta.env.VITE_ALINA_TELEGRAM_USERNAME || 'vlshavo'
  const alinaInstagram = import.meta.env.VITE_ALINA_INSTAGRAM_URL || 'https://www.instagram.com/vlsh.av?psln=MWN1bm95N3h3bXgxdg=='

  useEffect(() => {
    if (initialService) {
      setService(initialService)
    } else {
      setService(t.bookingModal.serviceOptions[0])
    }
  }, [initialService, t.bookingModal.serviceOptions])

  useEffect(() => {
    if (initialNote) {
      setComment(initialNote)
    }
  }, [initialNote])

  // Lock body scroll and listen for Escape key when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await sendLeadNotification({
        name,
        contact,
        instagram,
        niche,
        service,
        comment,
        source: `Booking Modal (${lang.toUpperCase()})`
      })
      trackVisitorInteraction('submitted_booking', service)
    } catch (err) {
      console.error('Error submitting form:', err)
    } finally {
      setIsSubmitting(false)
      setSubmitted(true)
      haptics.success()
    }
  }

  const handleReset = () => {
    setSubmitted(false)
    setName('')
    setContact('')
    setInstagram('')
    setComment('')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="booking-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-[#141937]/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          style={{ perspective: 1200 }}
        >
          <motion.div
            key="booking-modal-card"
            initial={{ opacity: 0, scale: 0.88, y: 50, rotateX: 7 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30, rotateX: -4, transition: { duration: 0.22, ease: 'easeIn' } }}
            transition={{
              type: 'spring',
              damping: 24,
              stiffness: 280,
              mass: 0.85,
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-[#EEEBDA] border border-[#141937]/15 rounded-3xl max-w-xl w-full p-5 sm:p-8 shadow-[0_25px_60px_rgba(20,25,55,0.4),0_0_40px_rgba(243,195,207,0.2)] my-auto will-change-transform"
          >
            {/* Soft ambient background glow */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#F3C3CF]/40 to-[#141937]/10 rounded-3xl blur-xl opacity-60 pointer-events-none -z-10" />

            {/* Close Button with rotate hover */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 bg-[#141937] text-[#EEEBDA] hover:bg-[#F3C3CF] hover:text-[#141937] rounded-full transition-all duration-200 cursor-pointer z-10 group hover:rotate-90 shadow-xs"
              aria-label={t.bookingModal.btnClose}
            >
              <X size={18} className="transition-transform group-hover:scale-110" />
            </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 14, stiffness: 220 }}
              className="relative w-18 h-18 mx-auto"
            >
              {/* Outer soft glow ring */}
              <div className="absolute -inset-2 bg-[#F3C3CF]/60 rounded-3xl blur-md animate-pulse"></div>

              <div className="relative w-18 h-18 bg-[#F3C3CF] text-[#141937] rounded-2xl flex items-center justify-center shadow-md">
                <svg
                  className="w-10 h-10 text-[#141937]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <motion.circle
                    cx="12"
                    cy="12"
                    r="10"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                  <motion.path
                    d="m9 12 2 2 4-4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.35, delay: 0.28, ease: 'easeOut' }}
                  />
                </svg>
              </div>
            </motion.div>

            <span className="text-xs font-black uppercase tracking-widest text-[#141937]/70">
              {t.bookingModal.successTitle}
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#141937]">
              {lang === 'ua' ? `Дякуємо, ${name || 'друже'}!` : `Thank you, ${name || 'friend'}!`}
            </h3>

            <p className="text-sm text-[#141937]/85 max-w-md mx-auto leading-relaxed">
              {t.bookingModal.successMessage}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
              <Magnetic strength={0.25}>
                <a
                  href={getDirectTelegramUrl({ name, contact, instagram, niche, service, comment }, alinaTelegram)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto bg-[#141937] text-[#EEEBDA] hover:bg-[#F3C3CF] hover:text-[#141937] px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2.5 transition-colors group shadow-sm hover:shadow-md"
                >
                  <img
                    src="/pins/pin-telegram.png"
                    alt="Telegram"
                    className="w-4.5 h-4.5 object-contain shrink-0 transition-transform group-hover:scale-110"
                  />
                  <span>{t.bookingModal.btnTelegramDirect}</span>
                </a>
              </Magnetic>

              <Magnetic strength={0.2}>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto bg-white/80 border border-[#141937]/15 px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-white cursor-pointer transition-colors shadow-xs"
                >
                  {t.bookingModal.btnClose}
                </button>
              </Magnetic>
            </div>
          </div>
        ) : (
          <div>
            {/* Modal Header */}
            <div className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-[#141937]/10 pr-8">
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="inline-flex items-center gap-1.5 bg-[#141937] text-[#EEEBDA] text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                  <img
                    src="/pins/pin-star.png"
                    alt=""
                    className="w-3.5 h-3.5 object-contain shrink-0"
                  />
                  <span>{t.bookingModal.title}</span>
                </span>
                <BrandLogo size="sm" theme="navy" className="hidden sm:inline-flex" />
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold text-[#141937] tracking-tight leading-tight">
                {service}
              </h3>
              <p className="text-xs sm:text-sm text-[#141937]/80 mt-1">
                {t.bookingModal.subtitle}
              </p>
            </div>

            {/* Instant Direct Links */}
            <div className="grid grid-cols-2 gap-3 mb-6 p-3 bg-white/80 backdrop-blur-sm border border-[#141937]/10 rounded-2xl shadow-xs">
              <a
                href={`https://t.me/${alinaTelegram.replace(/^@/, '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2.5 py-3 px-3 bg-[#141937] text-[#EEEBDA] hover:bg-[#F3C3CF] hover:text-[#141937] text-xs font-bold tracking-wider uppercase rounded-xl transition-all duration-300 group shadow-2xs hover:shadow-xs"
              >
                <img
                  src="/pins/pin-telegram.png"
                  alt="Telegram"
                  className="w-4.5 h-4.5 object-contain shrink-0 transition-transform group-hover:scale-125 group-hover:-rotate-12 duration-300"
                />
                <span>Telegram</span>
              </a>
              <a
                href={alinaInstagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2.5 py-3 px-3 bg-white text-[#141937] hover:bg-[#F3C3CF] text-xs font-bold tracking-wider uppercase rounded-xl border border-[#141937]/15 transition-all duration-300 group shadow-2xs hover:shadow-xs"
              >
                <img
                  src="/pins/pin-instagram.png"
                  alt="Instagram"
                  className="w-4.5 h-4.5 object-contain shrink-0 transition-transform group-hover:scale-125 duration-300"
                />
                <span>Instagram</span>
              </a>
            </div>

            <div className="text-center text-[11px] font-bold uppercase tracking-widest text-[#141937]/50 mb-4 flex items-center justify-center gap-2">
              <span className="h-[1px] w-12 bg-[#141937]/15"></span>
              <span>{lang === 'ua' ? "або залиште контакти для зв'язку" : 'or leave your contact details below'}</span>
              <span className="h-[1px] w-12 bg-[#141937]/15"></span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#141937] mb-1.5">
                  {t.bookingModal.nameLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.bookingModal.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3.5 bg-white border border-[#141937]/15 rounded-xl text-sm text-[#141937] placeholder-[#141937]/40 focus:border-[#141937] focus:ring-1 focus:ring-[#141937] focus:outline-none transition-all shadow-2xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#141937] mb-1.5">
                    {t.bookingModal.contactLabel}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t.bookingModal.contactPlaceholder}
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full p-3.5 bg-white border border-[#141937]/15 rounded-xl text-sm text-[#141937] placeholder-[#141937]/40 focus:border-[#141937] focus:ring-1 focus:ring-[#141937] focus:outline-none transition-all shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#141937] mb-1.5">
                    {t.bookingModal.instagramLabel}
                  </label>
                  <input
                    type="text"
                    placeholder={t.bookingModal.instagramPlaceholder}
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className="w-full p-3.5 bg-white border border-[#141937]/15 rounded-xl text-sm text-[#141937] placeholder-[#141937]/40 focus:border-[#141937] focus:ring-1 focus:ring-[#141937] focus:outline-none transition-all shadow-2xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#141937] mb-1.5">
                    {t.bookingModal.nicheLabel}
                  </label>
                  <select
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full p-3.5 bg-white border border-[#141937]/15 rounded-xl text-sm text-[#141937] focus:border-[#141937] focus:outline-none transition-all shadow-2xs"
                  >
                    {t.bookingModal.nicheOptions.map((opt, oIdx) => (
                      <option key={oIdx} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#141937] mb-1.5">
                    {t.bookingModal.serviceLabel}
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full p-3.5 bg-white border border-[#141937]/15 rounded-xl text-sm text-[#141937] focus:border-[#141937] focus:outline-none transition-all shadow-2xs"
                  >
                    {t.bookingModal.serviceOptions.map((opt, oIdx) => (
                      <option key={oIdx} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#141937] mb-1.5">
                  {t.bookingModal.commentLabel}
                </label>
                <textarea
                  rows={3}
                  placeholder={t.bookingModal.commentPlaceholder}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-3.5 bg-white border border-[#141937]/15 rounded-xl text-sm text-[#141937] placeholder-[#141937]/40 focus:border-[#141937] focus:ring-1 focus:ring-[#141937] focus:outline-none transition-all shadow-2xs"
                ></textarea>
              </div>

              <div className="pt-2">
                <Magnetic strength={0.15} className="w-full block">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 sm:py-4.5 bg-[#141937] text-[#EEEBDA] hover:bg-[#F3C3CF] hover:text-[#141937] text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg disabled:opacity-50 relative overflow-hidden group"
                  >
                    {/* Shimmer light sweep */}
                    <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
                    <Send size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    <span>{isSubmitting ? t.bookingModal.btnSubmitting : t.bookingModal.btnSubmit}</span>
                  </button>
                </Magnetic>
              </div>

              <p className="text-[11px] text-center text-[#141937]/60">
                {t.bookingModal.privacyNotice}
              </p>
            </form>
          </div>
        )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
