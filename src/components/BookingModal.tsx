import React, { useState, useEffect, useRef } from 'react'
import { X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { sendLeadNotification, getDirectTelegramUrl } from '../services/leadNotification'
import { trackVisitorInteraction } from '../services/visitorTracker'
import { haptics } from '../utils/haptics'
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
        <BookingDialog onClose={onClose} labelledBy="booking-title">
          <div className="flex items-start justify-between gap-6 mb-8">
            <p className="t-ui opacity-70">{submitted ? t.bookingModal.successTitle : t.bookingModal.title}</p>
            <button
              type="button"
              onClick={onClose}
              className="btn-tag !px-2.5 !py-2"
              aria-label={t.bookingModal.btnClose}
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>

          {submitted ? (
            <div className="space-y-6">
              <h2 id="booking-title" className="t-display-m">
                {lang === 'ua' ? `Дякуємо, ${name || 'друже'}!` : `Thank you, ${name || 'friend'}!`}
              </h2>
              <p className="t-body-l opacity-80">{t.bookingModal.successMessage}</p>
              <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a
                  href={getDirectTelegramUrl({ name, contact, instagram, niche, service, comment }, alinaTelegram)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-tag btn-tag--lg"
                >
                  {t.bookingModal.btnTelegramDirect}
                </a>
                <button type="button" onClick={handleReset} className="t-ui link-u cursor-pointer">
                  {t.bookingModal.btnClose}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 id="booking-title" className="t-display-m">
                {service}
              </h2>
              <p className="text-[15px] opacity-75 mt-3">{t.bookingModal.subtitle}</p>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 pb-6 border-b border-ink/15">
                <a href={`https://t.me/${alinaTelegram.replace(/^@/, '')}`} target="_blank" rel="noreferrer" className="btn-tag">
                  Telegram
                </a>
                <a href={alinaInstagram} target="_blank" rel="noreferrer" className="t-ui link-u">
                  Instagram ↗
                </a>
                <span className="t-ui opacity-55 w-full sm:w-auto sm:ml-auto">
                  {lang === 'ua' ? "або залиште контакти для зв'язку" : 'or leave your contact details below'}
                </span>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <Field label={t.bookingModal.nameLabel} id="bm-name">
                  <input
                    id="bm-name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder={t.bookingModal.namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={INPUT}
                  />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label={t.bookingModal.contactLabel} id="bm-contact">
                    <input
                      id="bm-contact"
                      type="text"
                      required
                      autoComplete="tel"
                      placeholder={t.bookingModal.contactPlaceholder}
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className={INPUT}
                    />
                  </Field>
                  <Field label={t.bookingModal.instagramLabel} id="bm-instagram">
                    <input
                      id="bm-instagram"
                      type="text"
                      placeholder={t.bookingModal.instagramPlaceholder}
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      className={INPUT}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label={t.bookingModal.nicheLabel} id="bm-niche">
                    <select id="bm-niche" value={niche} onChange={(e) => setNiche(e.target.value)} className={INPUT}>
                      {t.bookingModal.nicheOptions.map((opt, oIdx) => (
                        <option key={oIdx} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label={t.bookingModal.serviceLabel} id="bm-service">
                    <select id="bm-service" value={service} onChange={(e) => setService(e.target.value)} className={INPUT}>
                      {!t.bookingModal.serviceOptions.includes(service) && <option value={service}>{service}</option>}
                      {t.bookingModal.serviceOptions.map((opt, oIdx) => (
                        <option key={oIdx} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label={t.bookingModal.commentLabel} id="bm-comment">
                  <textarea
                    id="bm-comment"
                    rows={3}
                    placeholder={t.bookingModal.commentPlaceholder}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className={`${INPUT} resize-y`}
                  />
                </Field>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-[12px] opacity-60 max-w-[300px]">{t.bookingModal.privacyNotice}</p>
                  <button type="submit" disabled={isSubmitting} className="group inline-flex items-stretch cursor-pointer disabled:opacity-50">
                    <span className="btn-tag btn-tag--lg">{isSubmitting ? t.bookingModal.btnSubmitting : t.bookingModal.btnSubmit}</span>
                    <span className="btn-arrow !w-[42px] !h-auto group-hover:bg-pink-deep group-hover:text-ink" aria-hidden="true">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </BookingDialog>
      )}
    </AnimatePresence>
  )
}

const INPUT =
  'w-full bg-transparent border-0 border-b border-ink/30 rounded-none px-0 py-2.5 text-[16px] text-ink placeholder-ink/35 focus:border-ink focus:outline-none focus-visible:outline-none transition-colors'

const Field: React.FC<{ label: string; id: string; children: React.ReactNode }> = ({ label, id, children }) => (
  <div>
    <label htmlFor={id} className="t-ui block opacity-70">
      {label}
    </label>
    {children}
  </div>
)

/** Modal shell: backdrop, slide-in panel, Esc handled by parent, focus trap + restore. */
const BookingDialog: React.FC<{ onClose: () => void; labelledBy: string; children: React.ReactNode }> = ({
  onClose,
  labelledBy,
  children,
}) => {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const panel = panelRef.current
    panel?.querySelector<HTMLElement>('input, button')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !panel) return
      const items = Array.from(panel.querySelectorAll<HTMLElement>('a[href], button, input, select, textarea')).filter(
        (el) => !el.hasAttribute('disabled'),
      )
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      previouslyFocused?.focus?.()
    }
  }, [])

  return (
    <motion.div
      key="booking-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[70] bg-ink/70 flex justify-end"
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="surface-paper w-full max-w-[640px] h-full overflow-y-auto overscroll-contain p-6 sm:p-10"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
