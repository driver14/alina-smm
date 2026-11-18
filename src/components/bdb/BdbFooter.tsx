import React, { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { triggerHaptic } from '../../utils/haptics'
import { Reveal, Lines } from './ui/Reveal'

interface BdbFooterProps {
  onOpenBooking: (service?: string, note?: string) => void
}

const SECTIONS = [
  { href: '#hero', label: 'Головний екран' },
  { href: '#expertise', label: 'Досвід та експертиза' },
  { href: '#philosophy', label: 'Філософія та колесо' },
  { href: '#approach', label: 'Мій підхід' },
  { href: '#cases', label: 'Кейси та результати' },
  { href: '#services', label: 'Послуги та вартість' },
  { href: '#about', label: 'Про мене та команду' },
  { href: '#faq', label: 'FAQ' },
]

const GEO = [
  { label: 'Україна (Київ HQ)', accent: true },
  { label: 'США (Маямі, Флорида)', accent: false },
  { label: 'Європа (Варшава, ЄС)', accent: false },
]

function formatKyivTime(): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Kyiv',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date())
  } catch {
    return '—'
  }
}

export const BdbFooter: React.FC<BdbFooterProps> = ({ onOpenBooking }) => {
  const [kyivTime, setKyivTime] = useState<string>('')

  useEffect(() => {
    const update = () => setKyivTime(formatKyivTime())
    update()
    const timer = window.setInterval(update, 15000)
    return () => window.clearInterval(timer)
  }, [])

  const handleBook = () => {
    triggerHaptic('medium')
    onOpenBooking('Безкоштовний стратегічний розбір', 'Запит із фінального блоку сайту')
  }

  return (
    <>
      {/* Closing call to action */}
      <section id="contact" data-theme="accent" aria-labelledby="cta-title" className="surface-pink">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <figure className="m-0 lg:col-span-5 relative h-[60svh] lg:h-auto min-h-[380px] overflow-hidden bg-ink">
            <img
              src="/photos/alina-cafe.jpg"
              alt="Аліна Волошина в кав’ярні"
              width={682}
              height={1024}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </figure>

          <Reveal className="lg:col-span-7 wrap section-y flex flex-col justify-between gap-14">
            <p className="t-ui opacity-70">Фінальний крок до системи</p>

            <div className="space-y-8">
              <h2 id="cta-title" className="t-display">
                <Lines lines={['Ваш бізнес', 'заслуговує на', 'маркетинг,']} />
                <span className="reveal-line">
                  <span className="t-serif-xl block normal-case" style={{ ['--i' as string]: 3 } as React.CSSProperties}>
                    який працює <em className="italic">системно.</em>
                  </span>
                </span>
              </h2>
              <p className="fade-up t-body-l max-w-[560px]" style={{ ['--i' as string]: 4 } as React.CSSProperties}>
                Розкажіть мені про свій проєкт, цілі та завдання. Разом визначимо, які інструменти допоможуть вашому
                бізнесу розвиватися та залучати більше клієнтів.
              </p>
            </div>

            <div className="fade-up flex flex-wrap items-end justify-between gap-6" style={{ ['--i' as string]: 5 } as React.CSSProperties}>
              <p className="t-ui max-w-[320px]">Почнемо з безкоштовного стратегічного розбору вашого проєкту</p>
              <button type="button" onClick={handleBook} className="group inline-flex items-stretch cursor-pointer">
                <span className="btn-tag btn-tag--lg !py-0 flex items-center">Хочу отримати розбір проєкту</span>
                <span className="btn-arrow group-hover:bg-pink-deep group-hover:text-ink" aria-hidden="true">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <footer data-theme="dark" className="surface-ink">
        <div className="wrap pt-20 sm:pt-28 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-16">
            <div className="lg:col-span-4">
              <p
                className="font-display font-black uppercase leading-[0.84] tracking-[-0.03em]"
                style={{ fontSize: 'clamp(56px, 5.6vw, 88px)' }}
              >
                Аліна
                <br />
                Волошина
              </p>
              <p className="t-serif mt-5 text-pink">SMM & Marketing</p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
              <div>
                <h2 className="t-serif text-[26px] mb-6">Прямі канали зв’язку</h2>
                <ul className="space-y-3 text-[13px]">
                  <li>
                    <a href="https://t.me/smmbyvlsh" target="_blank" rel="noopener noreferrer" className="link-h">
                      Telegram · @smmbyvlsh
                    </a>
                  </li>
                  <li>
                    <a href="https://instagram.com/smmbyvlsh" target="_blank" rel="noopener noreferrer" className="link-h">
                      Instagram · @smmbyvlsh
                    </a>
                  </li>
                  <li>
                    <a href="mailto:contact@smmbyvlsh.com" className="link-h break-all">
                      contact@smmbyvlsh.com
                    </a>
                  </li>
                </ul>
              </div>

              <nav aria-label="Розділи сайту">
                <h2 className="t-serif text-[26px] mb-6">Розділи сайту</h2>
                <ul className="space-y-2.5 text-[13px]">
                  {SECTIONS.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} className="link-h">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div>
                <h2 className="t-serif text-[26px] mb-6">Географія проєктів</h2>
                <ul className="space-y-3 text-[13px]">
                  {GEO.map((g) => (
                    <li key={g.label} className="flex items-center gap-2.5">
                      <span
                        aria-hidden="true"
                        className={`w-2 h-2 rounded-full ${g.accent ? 'bg-pink' : 'bg-paper/40'}`}
                      />
                      {g.label}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="t-serif text-[26px] mb-6">Київський час</h2>
                <p className="font-display font-black text-[44px] leading-none tracking-[-0.02em] tabular-nums">
                  {kyivTime || '—'}
                </p>
                <p className="text-[13px] mt-4 opacity-70 leading-[1.45]">
                  Відповідаємо у Telegram протягом 1-2 годин у робочі дні.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-6 border-t border-paper/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 t-ui opacity-70">
            <p>© 2026 Аліна Волошина | SMM & Marketing. Всі права захищені.</p>
            <a href="#hero" onClick={() => triggerHaptic('light')} className="link-u">
              Вгору ↑
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
