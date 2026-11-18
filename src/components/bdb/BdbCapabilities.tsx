import React from 'react'
import { triggerHaptic } from '../../utils/haptics'
import { Reveal, Lines } from './ui/Reveal'
import { Section, Kicker } from './ui/Section'

interface BdbCapabilitiesProps {
  onOpenBooking: (service?: string, note?: string) => void
}

interface ServiceItem {
  id: string
  number: string
  title: string
  price: string
  desc: string
  tag: string
  features: string[]
  isFlagship?: boolean
}

const SERVICES: ServiceItem[] = [
  {
    id: 'smm-target',
    number: '01',
    title: 'SMM + Target',
    price: 'Від $700 / місяць',
    desc: 'Комплексне ведення соціальних мереж та таргетована реклама. Стратегія, контент, візуальне оформлення, комунікація з аудиторією, рекламні кампанії та аналітика.',
    tag: 'ФЛАГМАНСЬКИЙ КОМПЛЕКС',
    features: ['Повна SMM-стратегія', 'Продакшн контенту & Reels', 'Налаштування та оптимізація таргету', 'Щотижнева аналітика & ROMI'],
    isFlagship: true
  },
  {
    id: 'smm-management',
    number: '02',
    title: 'SMM Management',
    price: 'Від $500 / місяць',
    desc: 'Комплексне ведення соціальних мереж: стратегія, контент-план, тексти, дизайн, монтаж відео, Stories, публікації та аналітика.',
    tag: 'КОНТЕНТ ТА АНАЛІТИКА',
    features: ['Контент-план & копірайтинг', 'Монтаж динамічних відео', 'Stories-менеджмент', 'Аналіз залученості аудиторії']
  },
  {
    id: 'target',
    number: '03',
    title: 'Targeted Advertising',
    price: 'Від $250 / місяць',
    desc: 'Розробка рекламної стратегії, налаштування, запуск, тестування та оптимізація рекламних кампаній. Аналіз ефективності й звітність.',
    tag: 'ТАРГЕТ ТА ОКУПНІСТЬ',
    features: ['Спліт-тестування оферів', 'Зниження вартості ліда (CPA)', 'Meta Ads кампанії (США, Європа, Україна)', 'Прозорий фінансовий звіт']
  },
  {
    id: 'strategic-mgmt',
    number: '04',
    title: 'Strategic Management',
    price: 'Від $300 / місяць',
    desc: 'Стратегічний супровід вашого маркетингу. Розробка позиціонування, комунікаційної стратегії, контент-плану, рекомендацій і контроль загального напряму роботи.',
    tag: 'СУПРОВІД МАРКЕТИНГУ',
    features: ['Аудит роботи підрядників', 'Корекція позиціонування', 'Стратегічні сесії з власником', 'Контроль маркетингового вектору']
  },
  {
    id: 'session',
    number: '05',
    title: 'Strategic Session',
    price: '$100 / сесія',
    desc: 'Індивідуальна консультація для бізнесу, експертів і спеціалістів. Аналізуємо поточну ситуацію, знаходимо точки зростання та формуємо конкретний план подальших дій.',
    tag: 'ІНДИВІДУАЛЬНИЙ АУДИТ',
    features: ['90 хвилин інтенсивного розбору', 'Пошук вузьких місць воронки', 'Покроковий action-plan', 'Запис сесії та підсумкові матеріали']
  }
]

/** 07 — Services as an editorial price list. */
export const BdbCapabilities: React.FC<BdbCapabilitiesProps> = ({ onOpenBooking }) => {
  const handleBookService = (serviceTitle: string) => {
    triggerHaptic('medium')
    onOpenBooking(serviceTitle, `Запит на пакет: ${serviceTitle}`)
  }

  const handleGeneralBooking = () => {
    triggerHaptic('medium')
    onOpenBooking('Безкоштовний стратегічний розбір', 'Запит на безкоштовний стратегічний розбір проєкту')
  }

  return (
    <Section id="services" theme="paper" labelledBy="services-title" className="section-y">
      <Reveal className="wrap grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-10 items-end">
        <div className="lg:col-span-8">
          <Kicker index="07" className="mb-8">
            Послуги та вартість
          </Kicker>
          <h2 id="services-title">
            <span className="t-display block">
              <Lines lines={['Формати співпраці,']} />
            </span>
            <span className="t-serif-xl block mt-2">
              <Lines start={1} lines={['які можна адаптувати', 'під ваш бізнес.']} />
            </span>
          </h2>
        </div>
        <div className="fade-up lg:col-span-4 space-y-4 text-[15px] leading-[1.5]" style={{ ['--i' as string]: 3 } as React.CSSProperties}>
          <p className="font-medium">
            Вартість усіх послуг є орієнтовною та залежить від обсягу завдань, потреб вашого бізнесу й обраного формату
            співпраці.
          </p>
          <p className="opacity-75">
            Ми можемо скоригувати наявні пакети або сформувати індивідуальний комплекс послуг відповідно до вашого запиту
            та бюджету. Разом визначимо пріоритети й підберемо найбільш вигідний для вас формат.
          </p>
        </div>
      </Reveal>

      <div className="wrap mt-16 sm:mt-24">
        <p className="t-ui opacity-60 pb-4 border-b-2 border-ink">Нижче — орієнтовна вартість основних послуг • Гнучка адаптація</p>
        <ul>
          {SERVICES.map((s) => (
            <li key={s.id} className="group border-b border-ink/15 py-8 sm:py-10 grid grid-cols-12 gap-x-6 gap-y-4 items-start">
              <span className="col-span-2 sm:col-span-1 t-ui opacity-60 pt-2">{s.number}</span>
              <div className="col-span-10 sm:col-span-11 lg:col-span-6">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <h3 className="t-display-m">{s.title}</h3>
                  {s.isFlagship && <span className="t-block t-ui !text-[11px] px-1.5 py-1">{s.tag}</span>}
                </div>
                {!s.isFlagship && <p className="t-ui opacity-60 mt-3">{s.tag}</p>}
                <p className="mt-4 text-[15px] leading-[1.5] opacity-80 max-w-[560px]">{s.desc}</p>
                <p className="mt-4 text-[13px] leading-[1.6] opacity-65 max-w-[560px]">{s.features.join(' · ')}</p>
              </div>
              <div className="col-span-10 col-start-3 sm:col-span-11 sm:col-start-2 lg:col-span-5 lg:col-start-8 flex flex-wrap lg:flex-col items-baseline lg:items-end justify-between gap-4 lg:text-right">
                <div>
                  <p className="t-ui opacity-60">Орієнтовна вартість</p>
                  <p className="t-serif-l mt-1 whitespace-nowrap">{s.price}</p>
                </div>
                <button type="button" onClick={() => handleBookService(s.title)} className="btn-tag">
                  Обрати цей формат
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex justify-end">
          <button type="button" onClick={handleGeneralBooking} className="btn-tag btn-tag--lg">
            Отримати стратегічний розбір свого проєкту
          </button>
        </div>
      </div>
    </Section>
  )
}
