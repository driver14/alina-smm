import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { triggerHaptic } from '../../utils/haptics'
import { Reveal, Lines } from './ui/Reveal'
import { Section } from './ui/Section'

const FAQS = [
  {
    q: 'З якими нішами ви працюєте?',
    a: 'Працюю з бізнесами та експертами з різних сфер: beauty, fashion, медицина, особисті бренди, онлайн-продукти та послуги.'
  },
  {
    q: 'Чи можна замовити тільки таргетовану рекламу?',
    a: 'Так. Можна замовити окрему послугу з налаштування та ведення реклами без комплексного SMM.'
  },
  {
    q: 'Чи обов’язково замовляти повний пакет послуг?',
    a: 'Ні. Ми можемо сформувати індивідуальний пакет відповідно до ваших цілей, потреб і бюджету.'
  },
  {
    q: 'Чи розробляєте ви стратегію перед початком роботи?',
    a: 'Так. Стратегія є основою співпраці. Перед її розробкою я вивчаю бізнес, аудиторію, конкурентів і поточну ситуацію.'
  },
  {
    q: 'Хто створює контент?',
    a: 'Залежно від обраного формату співпраці контент створює наша команда або ваша сторона за моїми рекомендаціями та технічними завданнями.'
  },
  {
    q: 'Чи можна почати з консультації?',
    a: 'Так. Ви можете записатися на стратегічну сесію, щоб розібрати поточну ситуацію та отримати рекомендації щодо подальшого розвитку.'
  }
]

/** 10 — FAQ: sticky title, divider-only accordion. */
export const BdbFaq: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  const toggle = (idx: number) => {
    triggerHaptic('light')
    setOpenIdx((prev) => (prev === idx ? null : idx))
  }

  return (
    <Section id="faq" theme="ink" labelledBy="faq-title" className="section-y">
      <div className="wrap grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-14">
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky" style={{ top: 'calc(var(--header-h) + 40px)' }}>
            <h2 id="faq-title">
              <span className="t-display-m block">
                <Lines lines={['Відповіді', 'на запитання,']} />
              </span>
              <span className="t-serif-l block text-pink mt-2">
                <Lines start={2} lines={['які виникають', 'найчастіше.']} />
              </span>
            </h2>
          </div>
        </Reveal>

        <ul className="lg:col-span-7 border-t border-paper/15">
          {FAQS.map((item, idx) => {
            const open = openIdx === idx
            return (
              <li key={item.q} className="border-b border-paper/15">
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${idx}`}
                    aria-expanded={open}
                    aria-controls={`faq-a-${idx}`}
                    onClick={() => toggle(idx)}
                    className="w-full flex items-start justify-between gap-6 py-6 sm:py-7 text-left cursor-pointer group"
                  >
                                          <span className="font-display font-extrabold uppercase text-[22px] sm:text-[28px] leading-[1.05] tracking-[-0.01em] group-hover:text-pink transition-colors">
                        {item.q}
                      </span>
                    <Plus
                      aria-hidden="true"
                      className={`w-6 h-6 shrink-0 mt-1 transition-transform duration-300 ${open ? 'rotate-45 text-pink' : ''}`}
                      style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
                    />
                  </button>
                </h3>
                <div
                  id={`faq-a-${idx}`}
                  role="region"
                  aria-labelledby={`faq-q-${idx}`}
                  inert={!open}
                  className="grid transition-[grid-template-rows] duration-300"
                  style={{ gridTemplateRows: open ? '1fr' : '0fr', transitionTimingFunction: 'var(--ease-out-expo)' }}
                >
                  <div className="overflow-hidden">
                    <p className="t-body-l opacity-80 pb-8 max-w-[640px]">{item.a}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}
