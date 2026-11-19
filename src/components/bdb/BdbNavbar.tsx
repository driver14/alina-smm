import React, { useState, useEffect, useRef, useCallback } from 'react'
import { triggerHaptic } from '../../utils/haptics'

interface BdbNavbarProps {
  onOpenBooking: () => void
}

type NavTheme = 'light' | 'dark' | 'accent'

const NAV_LINKS = [
  { href: '#expertise', label: 'Досвід', long: 'Досвід та експертиза' },
  { href: '#philosophy', label: 'Філософія', long: 'Філософія маркетингу' },
  { href: '#approach', label: 'Підхід', long: 'Мій підхід' },
  { href: '#cases', label: 'Кейси', long: 'Кейси та результати' },
  { href: '#services', label: 'Послуги', long: 'Послуги та вартість' },
  { href: '#about', label: 'Про мене', long: 'Про мене та команду' },
  { href: '#faq', label: 'FAQ', long: 'Часті запитання' },
]

const SURFACE: Record<NavTheme, string> = {
  light: 'bg-paper text-ink',
  dark: 'bg-ink text-paper',
  accent: 'bg-pink text-ink',
}

export const BdbNavbar: React.FC<BdbNavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState<NavTheme>('accent')
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const root = document.documentElement
    const read = () => {
      const t = root.dataset.navTheme
      setTheme(t === 'dark' || t === 'light' || t === 'accent' ? t : 'accent')
    }
    read()
    const mo = new MutationObserver(read)
    mo.observe(root, { attributes: true, attributeFilter: ['data-nav-theme'] })

    return () => {
      window.removeEventListener('scroll', onScroll)
      mo.disconnect()
    }
  }, [])

  const close = useCallback((restoreFocus = true) => {
    setIsOpen(false)
    if (restoreFocus) toggleRef.current?.focus()
  }, [])

  // Mobile overlay: scroll lock, Esc, focus trap
  useEffect(() => {
    if (!isOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const panel = panelRef.current
    panel?.querySelector<HTMLElement>('a, button')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }
      if (e.key !== 'Tab' || !panel) return
      const items = Array.from(panel.querySelectorAll<HTMLElement>('a, button'))
      const all = [toggleRef.current!, ...items]
      const first = all[0]
      const last = all[all.length - 1]
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
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, close])

  const handleCta = () => {
    triggerHaptic('medium')
    setIsOpen(false)
    onOpenBooking()
  }

  const surface = isOpen ? SURFACE.dark : SURFACE[theme]
  const onDark = isOpen || theme === 'dark'

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-[background-color,color,height] duration-300 ${surface}`}
      style={{ height: isScrolled ? 'calc(var(--header-h) - 12px)' : 'var(--header-h)' }}
    >
      <div className="wrap h-full flex items-center justify-between gap-6">
        {/* Stacked wordmark */}
        <a
          href="#hero"
          aria-label="Аліна Волошина — на початок сторінки"
          onClick={() => setIsOpen(false)}
          className="font-display font-black uppercase leading-[0.82] tracking-[-0.02em] text-[15px] sm:text-[17px] whitespace-nowrap"
        >
          <span className="block">Аліна</span>
          <span className="block">Волошина</span>
        </a>

        <nav aria-label="Основна навігація" className="hidden lg:block">
          <ul className="flex items-center gap-7 xl:gap-9">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="t-ui link-h">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleCta}
            className={`btn-tag ${onDark ? 'btn-tag--light' : ''}`}
          >
            <span className="sm:hidden">Розбір</span>
            <span className="hidden sm:inline">Стратегічний розбір</span>
          </button>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setIsOpen((o) => !o)}
            aria-label={isOpen ? 'Закрити меню' : 'Відкрити меню'}
            aria-expanded={isOpen}
            aria-controls="site-menu"
            className="lg:hidden relative w-11 h-11 -mr-2 flex flex-col items-center justify-center gap-[6px] cursor-pointer"
          >
            <span
              aria-hidden="true"
              className={`block w-6 h-[2px] bg-current transition-transform duration-300 ${isOpen ? 'translate-y-[4px] rotate-45' : ''}`}
            />
            <span
              aria-hidden="true"
              className={`block w-6 h-[2px] bg-current transition-transform duration-300 ${isOpen ? '-translate-y-[4px] -rotate-45' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Full-screen mobile menu */}
      <div
        id="site-menu"
        ref={panelRef}
        hidden={!isOpen}
        className="lg:hidden fixed inset-x-0 bottom-0 bg-ink text-paper overflow-y-auto overscroll-contain"
        style={{ top: 'calc(var(--header-h) - 1px)' }}
      >
        <nav aria-label="Мобільна навігація" className="wrap pt-6 pb-10 flex flex-col min-h-full">
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.href} className="border-b border-paper/15">
                <a
                  href={l.href}
                  onClick={() => close(false)}
                  className="flex items-baseline justify-between gap-4 py-3.5"
                >
                  <span className="t-display-m leading-none">{l.long}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10 flex flex-wrap items-center gap-x-6 gap-y-3 t-ui">
            <a href="https://t.me/smmbyvlsh" target="_blank" rel="noopener noreferrer" className="link-u">
              Telegram
            </a>
            <a href="https://instagram.com/smmbyvlsh" target="_blank" rel="noopener noreferrer" className="link-u">
              Instagram
            </a>
            <a href="mailto:contact@smmbyvlsh.com" className="link-u">
              contact@smmbyvlsh.com
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
