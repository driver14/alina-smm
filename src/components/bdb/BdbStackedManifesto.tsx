import React from 'react'
import { triggerHaptic } from '../../utils/haptics'
import { Reveal, Lines } from './ui/Reveal'
import { Section, Kicker } from './ui/Section'

interface BdbStackedManifestoProps {
  onOpenBooking?: () => void
}

/** 02.5 — Philosophy: one centred editorial statement, then two quiet columns. */
export const BdbStackedManifesto: React.FC<BdbStackedManifestoProps> = ({ onOpenBooking }) => {
  const handleCta = () => {
    triggerHaptic('medium')
    onOpenBooking?.()
  }

  return (
    <Section id="philosophy" theme="paper" labelledBy="philosophy-title" className="section-y">
      <Reveal className="wrap">
        <Kicker className="justify-center mb-12">Системна архітектура маркетингу</Kicker>

        <h2 id="philosophy-title" className="text-center mx-auto max-w-[1200px]">
          <span className="t-display block">
            <Lines lines={['Для мене SMM —', 'це насамперед маркетинг,']} />
          </span>
          <span className="t-serif-xl block mt-3">
            <Lines start={2} lines={['а не контент заради контенту.']} />
          </span>
        </h2>

        <div className="mt-20 sm:mt-28 grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-8">
          <p
            className="fade-up md:col-span-5 md:col-start-2 t-serif"
            style={{ ['--i' as string]: 3 } as React.CSSProperties}
          >
            Кожне рішення має бути обґрунтованим і працювати на конкретну бізнес-ціль. Соціальні мережі не існують
            ізольовано: контент, таргетована реклама, аналітика та продажі об’єднуються в єдину злагоджену систему.
          </p>
          <div
            className="fade-up md:col-span-4 md:col-start-8 space-y-8"
            style={{ ['--i' as string]: 4 } as React.CSSProperties}
          >
            <p className="text-[16px] leading-[1.5] opacity-80">
              Разом вони допомагають бізнесу завойовувати увагу, вибудовувати стійку репутацію та генерувати вимірювані
              фінансові результати.
            </p>
            <p className="border-t border-ink/15 pt-5">
              <span className="t-ui block">Глибока підготовка кожного проєкту</span>
              <span className="block mt-2 text-[15px] opacity-75">
                5–7 днів дослідження ринку та конкурентів перед запуском
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <button type="button" onClick={handleCta} className="btn-tag">
                Почати співпрацю
              </button>
              <span className="t-ui opacity-60">США • Європа • Україна</span>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
