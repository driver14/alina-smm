import React, { useState } from 'react'
import { triggerHaptic } from '../../utils/haptics'
import { Reveal, Lines } from './ui/Reveal'
import { Section, Kicker } from './ui/Section'

interface BdbInquiriesProps {
  onOpenBooking: (service?: string, note?: string) => void
}

interface InquiryDetail {
  number: string
  problem: string
  diagnosis: string
  solution: string
  metricImpact: string
}

const INQUIRIES: InquiryDetail[] = [
  {
    number: '01',
    problem: 'Є соціальні мережі, але немає стабільного потоку клієнтів.',
    diagnosis: 'Розрив між публікаціями та шляхом клієнта. Відсутня прогрівочна воронка.',
    solution: 'Створюємо чітку архітектуру: лід-магніт ⟶ закріплені кейси ⟶ прямий заклик до запису.',
    metricImpact: 'Зростання конверсії в діалог на +45% у перші 3 тижні'
  },
  {
    number: '02',
    problem: 'Контент виходить регулярно, але не приносить звернень.',
    diagnosis: 'Контент заради контенту без оферів, доказів експертності та закриття заперечень.',
    solution: 'Перехід на смисловий контент: розбори кейсів клієнтів, розвінчання страхів та відео-демонстрації.',
    metricImpact: 'Заявки безпосередньо з Stories та Reels без зайвого навантаження'
  },
  {
    number: '03',
    problem: 'Реклама не дає бажаної кількості заявок або зливає бюджет.',
    diagnosis: 'Таргет веде на холодний непідготовлений профіль, аудиторії занадто широкі, креативи вигоріли.',
    solution: 'Гіперсегментація аудиторій у США/Європі/Україні, тестування 8+ відео-зв’язок та ретаргетинг.',
    metricImpact: 'Зниження вартості ліда (CPL) у 2–3 рази з окупністю ROMI до 10.2X'
  },
  {
    number: '04',
    problem: 'Немає чіткого позиціонування та розуміння своєї аудиторії.',
    diagnosis: 'Бізнес намагається продавати всім, тому ніхто не відчуває цінності високого чека.',
    solution: 'Глибокий маркетинговий аналіз конкурентів і платоспроможних сегментів. Виділення УТП.',
    metricImpact: 'Збільшення середнього чека послуг на 30–50%'
  },
  {
    number: '05',
    problem: 'SMM і таргет працюють окремо, без єдиної системи.',
    diagnosis: 'Таргетолог і контентмейкер не синхронізовані: реклама обіцяє одне, а в профілі інше.',
    solution: 'Єдиний центр управління маркетингом під моїм особистим керівництвом та власною командою.',
    metricImpact: '100% узгодженість кожного етапу воронки без втрати лідів'
  },
  {
    number: '06',
    problem: 'Бізнес розвивається, але маркетинг не встигає за потребами.',
    diagnosis: 'Власник перевантажений рутиною та контролем підрядників замість стратегічного зростання.',
    solution: 'Повний цикл реалізації «під ключ»: від відеомонтажу та дизайну до аналітики та звітів.',
    metricImpact: 'Звільнення 25+ годин власника щотижня за умови прогнозованого зростання виручки'
  }
]

const NICHES = [
  'Fashion & Одяг',
  'Beauty & Естетика',
  'Медицина & Клініки',
  'Особисті бренди & Експерти',
  'EdTech & Онлайн-школи'
]

const Detail: React.FC<{ item: InquiryDetail; onBook: () => void }> = ({ item, onBook }) => (
  <div className="swap-in">
    <p className="t-ui text-pink">Діагноз для вашого проєкту</p>
    <p className="t-serif-l mt-4" style={{ ['--i' as string]: 1 } as React.CSSProperties}>
      «{item.problem}»
    </p>
    <dl className="mt-8 space-y-6 text-[15px] leading-[1.5]" style={{ ['--i' as string]: 2 } as React.CSSProperties}>
      <div>
        <dt className="t-ui opacity-60">Причина</dt>
        <dd className="mt-2 opacity-85">{item.diagnosis}</dd>
      </div>
      <div>
        <dt className="t-ui opacity-60">Системне рішення</dt>
        <dd className="mt-2 opacity-85">{item.solution}</dd>
      </div>
    </dl>
    <p className="t-serif mt-8 text-pink border-t border-paper/15 pt-6" style={{ ['--i' as string]: 3 } as React.CSSProperties}>
      {item.metricImpact}
    </p>
    <div style={{ ['--i' as string]: 4 } as React.CSSProperties}>
      <p className="mt-6 text-[14px] opacity-65 max-w-[420px]">
        Вкажіть цей запит при бронюванні, і на стратегічній сесії ми почнемо саме з його вирішення.
      </p>
      <button type="button" onClick={onBook} className="btn-tag btn-tag--light mt-6">
        Отримати розбір цього запиту
      </button>
    </div>
  </div>
)

/** 04 — Inquiries: numbered problem list; the selected one opens its diagnosis. */
export const BdbInquiries: React.FC<BdbInquiriesProps> = ({ onOpenBooking }) => {
  const [activeIdx, setActiveIdx] = useState(0)
  const active = INQUIRIES[activeIdx]

  const handleBook = () => {
    triggerHaptic('medium')
    onOpenBooking('Безкоштовний стратегічний розбір', `Запит ${active.number}: ${active.problem}`)
  }

  return (
    <Section id="inquiries" theme="ink" labelledBy="inquiries-title" className="section-y">
      <Reveal className="wrap">
        <Kicker index="04" className="mb-8">
          З якими запитами я працюю
        </Kicker>
        <h2 id="inquiries-title" className="max-w-[1150px]">
          <span className="t-display block">
            <Lines lines={['Допомагаю перетворити', 'хаотичний SMM']} />
          </span>
          <span className="t-serif-xl block text-pink mt-2">
            <Lines start={2} lines={['на зрозумілу маркетингову систему.']} />
          </span>
        </h2>
      </Reveal>

      <div className="wrap mt-16 sm:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-x-6">
        <div className="lg:col-span-7">
          <p className="t-ui opacity-60 pb-4 border-b border-paper/15">Оберіть ваш запит для діагностики</p>
          <ul>
            {INQUIRIES.map((item, idx) => {
              const isActive = idx === activeIdx
              return (
                <li key={item.number} className="border-b border-paper/15">
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => {
                      triggerHaptic('light')
                      setActiveIdx(idx)
                    }}
                    className={`group w-full grid grid-cols-[48px_1fr] sm:grid-cols-[72px_1fr] items-baseline gap-x-4 py-6 text-left cursor-pointer transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-45 hover:opacity-90'
                    }`}
                  >
                    <span className={`t-ui ${isActive ? 'text-pink' : ''}`}>{item.number}</span>
                    <span className="t-h3 leading-[1.05]">{item.problem}</span>
                  </button>
                  {isActive && (
                    <div className="lg:hidden pb-10 pl-[64px] sm:pl-[88px]">
                      <Detail item={item} onBook={handleBook} />
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        <div className="hidden lg:block lg:col-span-4 lg:col-start-9" aria-live="polite">
          <div className="sticky" style={{ top: 'calc(var(--header-h) + 40px)' }}>
            <Detail key={active.number} item={active} onBook={handleBook} />
          </div>
        </div>
      </div>

      <Reveal className="wrap mt-20 sm:mt-28">
        <p className="t-ui opacity-60 mb-6">Працюю з різними напрямами · Ніші та бізнес-сегменти</p>
        <ul className="t-serif-l flex flex-wrap gap-x-4 gap-y-1">
          {NICHES.map((n, i) => (
            <li key={n} className="fade-up" style={{ ['--i' as string]: i } as React.CSSProperties}>
              {n}
              {i < NICHES.length - 1 && <span className="text-pink pl-4" aria-hidden="true">/</span>}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
