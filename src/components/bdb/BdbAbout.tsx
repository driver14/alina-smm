import React from 'react'
import { triggerHaptic } from '../../utils/haptics'
import { Reveal, Lines } from './ui/Reveal'
import { Section, Kicker } from './ui/Section'

interface BdbAboutProps {
  onOpenBooking: (service?: string, note?: string) => void
}

interface CompetencyItem {
  id: string
  role: string
  lead: string
  desc: string
  metric: string
}

const COMPETENCIES: CompetencyItem[] = [
  {
    id: 'strategy',
    role: 'СТРАТЕГІЯ ТА АНАЛІТИКА',
    lead: 'Особисто Аліна Волошина',
    desc: 'Позиціонування бренду, архітектура воронки продажів, аналіз ринку США/Європи та щотижневий контроль фінансового результату.',
    metric: '100% особиста відповідальність'
  },
  {
    id: 'content',
    role: 'КОНТЕНТ ТА ПРОДАКШН',
    lead: 'Команда продакшну',
    desc: 'Сценарії Reels, візуальна естетика, зйомки, монтаж динамічних роликів та щоденні сенсові сторітелінги для високого чеку.',
    metric: 'Регулярність & висока якість'
  },
  {
    id: 'target',
    role: 'ТАРГЕТОВАНА РЕКЛАМА',
    lead: 'Таргет-спеціаліст',
    desc: 'Запуск рекламних зв’язок у Meta Ads, тестування аудиторій, зниження CPA та щоденна оптимізація рекламних бюджетів.',
    metric: 'Підтверджений ROMI до 10.2X'
  },
  {
    id: 'management',
    role: 'УПРАВЛІННЯ ТА ЗВІТНІСТЬ',
    lead: 'Аліна + Project Manager',
    desc: 'Синхронізація всіх процесів в єдиний робочий простір, прозора щотижнева звітність у цифрах без води та затримок.',
    metric: 'Повна прозорість для власника'
  }
]

/** 08 — About: large portrait to the edge, statement and quote, team as rows. */
export const BdbAbout: React.FC<BdbAboutProps> = ({ onOpenBooking }) => {
  const handleBookSession = () => {
    triggerHaptic('medium')
    onOpenBooking('Особиста стратегія з Аліною', 'Запит на знайомство та стратегічну сесію')
  }

  return (
    <Section id="about" theme="pink" labelledBy="about-title">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <Reveal as="figure" className="m-0 lg:col-span-6 relative min-h-[70svh] lg:min-h-[100svh] overflow-hidden bg-ink">
          <img
            src="/photos/alina-barcelona.jpg"
            alt="Аліна Волошина — SMM-стратегиня, Барселона"
            width={682}
            height={1024}
            loading="lazy"
            decoding="async"
            className="clip-up absolute inset-0 w-full h-full object-cover"
          />
          <figcaption className="absolute left-0 bottom-0 btn-tag !text-[14px] pointer-events-none">
            3+ роки в SMM & маркетингу
          </figcaption>
        </Reveal>

        <Reveal className="lg:col-span-6 wrap section-y flex flex-col justify-between gap-14">
          <div>
            <Kicker index="08" className="mb-8">
              Про мене та команду
            </Kicker>
            <h2 id="about-title">
              <span className="t-display block">
                <Lines lines={['Особиста', 'стратегія.']} />
              </span>
              <span className="t-serif-xl block mt-2">
                <Lines start={2} lines={['Командна реалізація.']} />
              </span>
            </h2>
          </div>

          <div className="fade-up space-y-6 max-w-[560px]" style={{ ['--i' as string]: 3 } as React.CSSProperties}>
            <p className="t-ui opacity-70">Філософія керування маркетингом</p>
            <p className="t-h3">
              Мене звати Аліна Волошина. Я будую системний маркетинг, який приносить реальний дохід.
            </p>
            <p className="text-[16px] leading-[1.5]">
              Я особисто відповідаю за стратегію, управління проєктами, маркетингові рішення та фінансовий результат
              кожного клієнта.
            </p>
            <p className="text-[15px] leading-[1.5] opacity-80">
              Над реалізацією працюю разом із власною командою спеціалістів: залежно від завдань бізнесу залучаємо
              експертів із якісного контенту, дизайну, динамічного монтажу та високоефективної таргетованої реклами.
            </p>
          </div>

          <blockquote className="fade-up border-t border-ink/20 pt-8" style={{ ['--i' as string]: 4 } as React.CSSProperties}>
            <p className="t-serif-l">
              «Для мене важливо, щоб кожен етап роботи був узгодженим, а всі інструменти маркетингу працювали на єдину
              бізнес-мету вашого проєкту.»
            </p>
          </blockquote>

          <div className="fade-up flex flex-wrap items-center gap-x-6 gap-y-3" style={{ ['--i' as string]: 5 } as React.CSSProperties}>
            <button type="button" onClick={handleBookSession} className="btn-tag btn-tag--lg">
              Обговорити співпрацю з Аліною
            </button>
            <span className="t-ui opacity-70">Безкоштовний первинний аудит</span>
          </div>
        </Reveal>
      </div>

      {/* Team directions */}
      <div className="surface-ink">
        <div className="wrap py-16 sm:py-24">
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-10">
            <h3 className="t-display-m">Команда</h3>
            <p className="t-ui opacity-60">США • Європа • Україна · 100+ успішних кампаній</p>
          </div>
          <ol className="border-t border-paper/15">
            {COMPETENCIES.map((c, i) => (
              <li key={c.id} className="grid grid-cols-12 gap-x-6 gap-y-2 py-7 border-b border-paper/15">
                <span className="col-span-2 sm:col-span-1 t-ui opacity-60 pt-1.5">{String(i + 1).padStart(2, '0')}</span>
                <div className="col-span-10 sm:col-span-5">
                  <p className="t-h3">{c.role}</p>
                  <p className="t-serif text-pink mt-1">{c.lead}</p>
                </div>
                <p className="col-span-12 sm:col-span-4 text-[15px] leading-[1.5] opacity-80">{c.desc}</p>
                <p className="col-span-12 sm:col-span-2 t-ui opacity-70 sm:text-right pt-1.5">{c.metric}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
