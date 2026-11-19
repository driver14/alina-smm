export type Language = 'ua' | 'en'

export interface CaseSlideTranslation {
  id: number
  title: string
  subtitle: string
  category: 'screenshot' | 'creative' | 'analytics' | 'review' | 'result'
  placeholderText: string
  imageUrl?: string
}

export interface CaseStudyTranslation {
  id: string
  niche: string
  title: string
  highlightMetric: string
  metricLabel: string
  budgetAndReturn: string
  period: string
  problemText: string
  solutionText: string
  resultSummary: string
  tags: string[]
  slides: CaseSlideTranslation[]
}

export interface ServiceTranslation {
  id: string
  title: string
  badge: string
  isPopular?: boolean
  targetAudience: string
  description: string
  features: string[]
  note?: string
  ctaText: string
  threeAudienceBreakdown?: {
    forWho: string
    text: string
  }[]
}

export interface FAQTranslation {
  q: string
  a: string
}

export interface TranslationDictionary {
  brand: {
    name: string
    role: string
    tagline: string
  }
  nav: {
    links: { label: string; href: string }[]
    cta: string
    mobileCta: string
    markets: string
    switchLangTooltip: string
  }
  hero: {
    badge: string
    titleBefore: string
    titleHighlight: string
    titleAfter: string
    subtitle: string
    formulaTitle: string
    formulaSteps: {
      goal: string
      analytics: string
      strategy: string
      contentAds: string
    }
    ctaBook: string
    ctaCases: string
    trust1: string
    trust2: string
    trust3: string
    badgeEdTechValue: string
    badgeEdTechLabel: string
    badgeBeautyNiche: string
    badgeBeautyValue: string
    badgeBeautyDesc: string
  }
  stats: {
    marquee: string[]
    cards: {
      value: string
      label: string
      desc: string
    }[]
    metricTag: string
    topLevelTag: string
  }
  about: {
    tag: string
    titleBefore: string
    titleHighlight: string
    bioP1: string
    bioP2: string
    quote: string
    quoteRule: string
    bioP3: string
    principles: string[]
    ctaTalk: string
    ctaTelegram: string
    workBadge: string
    workTitle: string
    workDesc: string
    autoPlayActive: string
    autoPlayPaused: string
    slides: {
      tag: string
      title: string
      desc: string
    }[]
  }
  philosophy: {
    tag: string
    titleBefore: string
    titleHighlight: string
    intro: string
    brokenTitle: string
    brokenBadge: string
    brokenDesc: string
    brokenItems: string[]
    brokenResult: string
    teamTitle: string
    teamBadge: string
    teamDesc: string
    teamItems: string[]
    teamResult: string
    stepsTitle: string
    steps: {
      num: string
      title: string
      subtitle: string
      desc: string
      deliverable: string
    }[]
    deliverableLabel: string
  }
  cases: {
    tag: string
    titleBefore: string
    titleHighlight: string
    intro: string
    financialResultLabel: string
    materialsLabel: string
    pauseAutoplay: string
    playAutoplay: string
    slidesCountSuffix: string
    slideLabel: string
    ofLabel: string
    zoomLabel: string
    swipeHint: string
    pointALabel: string
    solutionLabel: string
    pointBLabel: string
    data: CaseStudyTranslation[]
    allCasesTitle: string
    slideOf: string
    fullscreenLabel: string
    autoplayLabel: string
    prevSlide: string
    nextSlide: string
  }
  services: {
    tag: string
    titleBefore: string
    titleHighlight: string
    intro: string
    forWhoLabel: string
    data: ServiceTranslation[]
  }
  calculator: {
    tag: string
    titleBefore: string
    titleHighlight: string
    intro: string
    step1Title: string
    step2Title: string
    step3Title: string
    niches: { id: string; label: string }[]
    pains: { id: string; label: string }[]
    goals: { id: string; label: string }[]
    recBadge: string
    recTitle: string
    recReasonPrefix: string
    ctaButton: string
    auditBadge: string
    auditReason: string
    adsBadge: string
    adsReason: string
    smmBadge: string
    smmReason: string
    comboBadge: string
    comboReason: string
  }
  faq: {
    tag: string
    titleBefore: string
    titleHighlight: string
    intro: string
    data: FAQTranslation[]
    haveQuestions: string
    writeAlina: string
    chatTelegram: string
    chatInstagram: string
  }
  footer: {
    ctaBanner: {
      badge: string
      badgeSubtitle: string
      titleBefore: string
      titleHighlight: string
      titleAfter: string
      desc: string
      point1: string
      point2: string
      point3: string
      btnBook: string
      btnTelegram: string
    }
    desc: string
    quickLinksTitle: string
    servicesTitle: string
    contactsTitle: string
    copyright: string
    allRightsReserved: string
  }
  bookingModal: {
    title: string
    subtitle: string
    nameLabel: string
    namePlaceholder: string
    contactLabel: string
    contactPlaceholder: string
    instagramLabel: string
    instagramPlaceholder: string
    nicheLabel: string
    nicheOptions: string[]
    serviceLabel: string
    serviceOptions: string[]
    commentLabel: string
    commentPlaceholder: string
    btnSubmit: string
    btnSubmitting: string
    successTitle: string
    successMessage: string
    btnTelegramDirect: string
    directNotice: string
    btnClose: string
    privacyNotice: string
  }
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  ua: {
    brand: {
      name: 'АЛІНА ВОЛОШИНА',
      role: 'SMM-стратег & Команда',
      tagline: 'Системні продажі через соцмережі'
    },
    nav: {
      links: [
        { label: 'Підхід', href: '#approach' },
        { label: 'Кейси в цифрах', href: '#cases' },
        { label: 'Послуги', href: '#services' },
        { label: 'Діагностика', href: '#calculator' },
        { label: 'Про мене', href: '#about' },
        { label: 'FAQ', href: '#faq' },
      ],
      cta: 'Безкоштовна сесія',
      mobileCta: 'Записатися на безкоштовну сесію',
      markets: 'Ринки: США • Європа • Україна',
      switchLangTooltip: 'Switch to English'
    },
    hero: {
      badge: 'SMM-стратег & Власна команда таргетологів',
      titleBefore: 'Робимо із соцмереж інструмент',
      titleHighlight: 'продажів',
      titleAfter: 'для бізнесів та експертів',
      subtitle: 'У мене власна команда, в якій працює і таргетолог. Ми закриваємо весь шлях клієнта: від глибокої аналітики і стратегії до контенту, реклами та цільових заявок у вашому Direct. Без пошуку 5 різних підрядників і пояснень кожному з нуля.',
      formulaTitle: 'Мій системний підхід:',
      formulaSteps: {
        goal: 'Ціль',
        analytics: 'Аналітика',
        strategy: 'Стратегія',
        contentAds: 'Контент & Реклама'
      },
      ctaBook: 'Записатися на безкоштовну сесію',
      ctaCases: 'Результати в цифрах ↓',
      trust1: '3 роки досвіду в SMM',
      trust2: 'Ринки: США, Європа, Україна',
      trust3: 'Кожна публікація під задачу',
      badgeEdTechValue: '×2 Зростання',
      badgeEdTechLabel: 'Онлайн-школа',
      badgeBeautyNiche: 'Кейс Beauty',
      badgeBeautyValue: '×10 Окупність',
      badgeBeautyDesc: '$200 бюджету → $2000'
    },
    stats: {
      marquee: [
        'США • ЄВРОПА • УКРАЇНА',
        '×10 ОКУПНІСТЬ РЕКЛАМИ В BEAUTY',
        'FASHION-БРЕНДИ & E-COMMERCE',
        'ВЛАСНА КОМАНДА З ТАРГЕТОЛОГОМ',
        '×2 ЗРОСТАННЯ В EDTECH ЗА 1-Й МІСЯЦЬ',
        'КОЖНА ПУБЛІКАЦІЯ МАЄ СВОЮ ЗАДАЧУ',
        'ВІД СТРАТЕГІЇ ДО ЗАЯВОК У DIRECT',
      ],
      cards: [
        {
          value: '3 Роки',
          label: 'Практичного досвіду в SMM & таргетинг',
          desc: 'Глибоке розуміння алгоритмів та поведінки покупців'
        },
        {
          value: '3 Ринки',
          label: 'США, Європа та Україна',
          desc: 'Адаптація офферів під різний менталітет і платоспроможність'
        },
        {
          value: '×10 ROMI',
          label: 'Окупність рекламних кампаній',
          desc: '$200 бюджету принесли $2000 виручки за перший місяць'
        },
        {
          value: '100% Цикл',
          label: 'Повний шлях клієнта',
          desc: 'Стратегія + контент + таргет + аналітика в одних руках'
        },
        {
          value: '1 Команда',
          label: 'Власний таргетолог & продакшн',
          desc: 'Ніяких розривів між контентом і рекламними обіцянками'
        }
      ],
      metricTag: 'МЕТРИКА',
      topLevelTag: 'ВЕРХНІЙ РІВЕНЬ'
    },
    about: {
      tag: 'Знайомство',
      titleBefore: 'Хто така Аліна Волошина і чому вам',
      titleHighlight: 'сюди?',
      bioP1: 'Я SMM-стратег, яка робить із соцмереж інструмент системних продажів для бізнесів та експертів.',
      bioP2: 'У мене власна команда, в якій працює і таргетолог. Тому ми закриваємо весь шлях клієнта: від стратегії й контенту до реклами та заявок у вашому direct. Вам не потрібно шукати кількох підрядників і пояснювати кожному окремо, чого ви хочете.',
      quote: '«Я починаю не з контенту, а з вашого бізнесу: спочатку розбираюся в продукті, аудиторії, конкурентах і цілях, а вже потім вирішую, які інструменти потрібні».',
      quoteRule: '— Головне правило моєї роботи',
      bioP3: 'За 3 роки досвіду я реалізувала проєкти на ринках США, Європи та України у нішах fashion-брендів, beauty, онлайн-продуктів та EdTech (онлайн-освіта).',
      principles: [
        'Кожна публікація має свою задачу',
        'Результат у цифрах і виручці',
        'Узгодження до першого долара в рекламі',
        'Індивідуальний підхід без шаблонів'
      ],
      ctaTalk: 'Обговорити ваш проєкт з Аліною',
      ctaTelegram: 'Написати в Telegram',
      workBadge: 'Реальний робочий процес',
      workTitle: 'Глибока підготовка кожної SMM-стратегії',
      workDesc: '5–7 днів аналізу вашого бізнесу перед запуском першого долара',
      autoPlayActive: 'Призупинити',
      autoPlayPaused: 'Увімкнути автопоказ',
      slides: [
        {
          tag: 'Естетика & Стиль',
          title: 'Аліна Волошина',
          desc: 'SMM-стратег, яка поєднує глянцевий візуал із маркетинговими цифрами'
        },
        {
          tag: 'Міжнародний рівень',
          title: 'Системний підхід',
          desc: 'Власна команда з таргетологом та закриття повного шляху клієнта'
        },
        {
          tag: 'Контент & Атмосфера',
          title: 'Lifestyle підхід',
          desc: 'Контент, який формує щиру довіру та підводить до покупки'
        },
        {
          tag: 'Editorial B&W',
          title: 'Fashion-бачення',
          desc: 'Досвід роботи з фешн-брендами США, Європи та України'
        },
        {
          tag: 'Енергія & Живий бренд',
          title: 'Щирість та лояльність',
          desc: 'Створення сильного ком\'юніті навколо вашого продукту'
        }
      ]
    },
    philosophy: {
      tag: 'Чому саме вам сюди?',
      titleBefore: 'Чому більшість SMM не приносить грошей, і як ми це',
      titleHighlight: 'виправляємо',
      intro: 'Я за SMM, у якому кожна публікація має свою задачу, а результат видно в цифрах виручки, а не тільки в «красивій стрічці».',
      brokenTitle: 'Як у більшості (Розрив підрядників)',
      brokenBadge: 'Злив бюджету',
      brokenDesc: 'Ви наймаєте окремо SMM-спеціаліста і окремо таргетолога. Кожен відповідає лише за свою ділянку й перекладає провину на іншого.',
      brokenItems: [
        'Реклама обіцяє одне, а на сторінці людина бачить зовсім інше — люди клікають і відразу йдуть.',
        'Публікації заради публікацій: пости виходять, картинки красиві, а звернень у Direct як не було, так і нема.',
        'Вам доводиться бути посередником: узгоджувати тексти, креативи й пояснювати кожному окремо, чого ви хочете.'
      ],
      brokenResult: 'Результат: витрачені кошти та нуль розуміння, куди подівся бюджет.',
      teamTitle: 'У моїй команді (Єдина система)',
      teamBadge: 'Зростання продажів',
      teamDesc: 'У мене власна команда, в якій працює і таргетолог. Ми закриваємо весь шлях клієнта «під ключ» від стратегії до продажів.',
      teamItems: [
        'Стратегія і реклама узгоджуються ще до того, як витрачено перший долар.',
        'Контент і таргетинг говорять в один голос: людина бачить у стрічці продовження того, що її зацікавило в рекламі.',
        'Ви спілкуєтеся з одним лідером команди й отримуєте зрозумілі фінансові звіти без перекладання відповідальності.'
      ],
      teamResult: 'Результат: керований потік клієнтів і прогнозоване повернення інвестицій.',
      stepsTitle: '4 кроки моєї системи:',
      steps: [
        {
          num: '01',
          title: 'Ціль',
          subtitle: 'Визначаємо бізнес-задачу',
          desc: 'Я починаю не з контенту чи вибору кольорів, а з вашого бізнесу: скільки заявок потрібно, який середній чек, яка маржинальність і реальні фінансові цілі на 3–6 місяців.',
          deliverable: 'Фіксована точка Б та план продажів через соцмережі'
        },
        {
          num: '02',
          title: 'Аналітика',
          subtitle: 'Аудит продукту, аудиторії та конкурентів',
          desc: 'Досліджуємо глибинні болі вашого клієнта, тригери прийняття рішень та слабкі місця конкурентів. Розуміємо, чому у вас купували раніше або чому йшли до інших.',
          deliverable: 'Карта сегментів ЦА та розбір помилок поточної сторінки'
        },
        {
          num: '03',
          title: 'Стратегія',
          subtitle: 'Позиціонування та шлях клієнта',
          desc: 'Вибудовуємо зрозуміле позиціонування та воронку: від першого дотику в рекламі до закриття сумнівів на сторінці та очевидного кроку до покупки в Direct.',
          deliverable: 'Покрокова стратегія просування без хаотичних дій'
        },
        {
          num: '04',
          title: 'Контент & Реклама',
          subtitle: 'Синхронна робота команди',
          desc: 'Контент і реклама запускаються як єдиний механізм. Реклама обіцяє саме те, що людина бачить на сторінці. Кожна публікація виконує свою роль у продажах.',
          deliverable: 'Регулярні заявки та щомісячна аналітика в цифрах'
        }
      ],
      deliverableLabel: 'Результат:'
    },
    cases: {
      tag: 'Реальні результати',
      titleBefore: 'Кейси та результати в',
      titleHighlight: 'цифрах',
      intro: 'Реальні цифри, скриншоти рекламних кабінетів та детальні розбори того, як системна робота команди приносить прибуток.',
      financialResultLabel: 'ФІНАНСОВИЙ РЕЗУЛЬТАТ:',
      materialsLabel: 'МАТЕРІАЛИ КЕЙСУ',
      pauseAutoplay: 'Призупинити автопрогравання',
      playAutoplay: 'Увімкнути автопрогравання',
      slidesCountSuffix: 'слайдів',
      slideLabel: 'Слайд',
      ofLabel: 'з',
      zoomLabel: 'Збільшити',
      swipeHint: 'свайпайте вліво / вправо →',
      pointALabel: '✕ ТОЧКА А (ПРОБЛЕМА):',
      solutionLabel: '✔ РІШЕННЯ КОМАНДИ АЛІНИ:',
      pointBLabel: '📈 ТОЧКА Б (РЕЗУЛЬТАТ):',
      allCasesTitle: 'Оберіть кейс для детального перегляду:',
      slideOf: 'Слайд',
      fullscreenLabel: 'На весь екран',
      autoplayLabel: 'Автопоказ',
      prevSlide: 'Попередній',
      nextSlide: 'Наступний',
      data: [
        {
          id: 'case-permanent-makeup',
          niche: 'Beauty & Сфера послуг',
          title: 'Майстер перманентного макіяжу',
          highlightMetric: '×10 ROMI',
          metricLabel: 'Окупність рекламного бюджету',
          budgetAndReturn: '$200 бюджету → $2000 виручки',
          period: '1 місяць співпраці',
          tags: ['Таргет', 'SMM', 'Beauty-ніша', 'Високий чек'],
          problemText: 'Реклама раніше запускалася хаотично і приводила людей, які «просто запитували ціну» і зникали. Сторінка не закривала страх процедури та не показувала експертність.',
          solutionText: 'Синхронізували рекламу і посадкову сторінку: підготували відео-докази безпеки, серію stories із розбором пігментів та чіткий оффер на первинну консультацію. Рекламні кампанії налаштували на платоспроможну жіночу аудиторію в конкретній локації.',
          resultSummary: 'Повний запис на місяць вперед. З $200 рекламного бюджету отримано 34 цільові заявки, з яких майстер закрила клієнтів на суму понад $2000.',
          slides: [
            {
              id: 1,
              title: 'Як отримати $2,000 виручки з $200 рекламного бюджету',
              subtitle: 'Кейс таргетованої реклами майстра перманентного макіяжу (Naples, FL)',
              category: 'creative',
              placeholderText: 'Обкладинка кейсу: окупність реклами в 10Х',
              imageUrl: '/cases/case1/slide-1.webp'
            },
            {
              id: 2,
              title: 'Точка А: Старт Instagram майстра з нуля',
              subtitle: 'Локальна аудиторія в Naples, Florida (~20 тис. жителів)',
              category: 'screenshot',
              placeholderText: 'Початковий стан профілю: 0 підписників, вузький ринок',
              imageUrl: '/cases/case1/slide-2.webp'
            },
            {
              id: 3,
              title: 'Перший місяць: тестування гіпотез та зв’язок',
              subtitle: 'Не гналися за швидким результатом, а шукали робочі зв’язки',
              category: 'analytics',
              placeholderText: 'Тестування аудиторій, креативів та налаштувань',
              imageUrl: '/cases/case1/slide-3.webp'
            },
            {
              id: 4,
              title: 'Цільові діалоги в Direct за низькою вартістю',
              subtitle: '23 діалоги за ціною $4.57 та доведення до реального запису',
              category: 'screenshot',
              placeholderText: 'Скриншот Direct та Meta Ads: якісні ліди, а не просто пусті кліки',
              imageUrl: '/cases/case1/slide-4.webp'
            },
            {
              id: 5,
              title: 'Дії у вересні: 3 нові відео та оптимізація',
              subtitle: 'Щоденний контроль бюджету, відключення неефективного',
              category: 'creative',
              placeholderText: 'Тестування нових форматів відеореклами та аудиторій',
              imageUrl: '/cases/case1/slide-5.webp'
            },
            {
              id: 6,
              title: 'Звітність за вересень: ключові метрики',
              subtitle: '33 звернення, 5 нових клієнтів (15.2%), середній чек $420',
              category: 'result',
              placeholderText: 'Офіційний звіт: $200 бюджет, 5 клієнтів, ROAS 10x',
              imageUrl: '/cases/case1/slide-6.webp'
            },
            {
              id: 7,
              title: 'Вклали $200 → отримали $2,000 виручки',
              subtitle: 'Окупність 10Х: кожен $1 у рекламу приніс $10 чистої виручки',
              category: 'result',
              placeholderText: 'Підтвердження ROAS 10x за період 01.09 – 30.09',
              imageUrl: '/cases/case1/slide-7.webp'
            },
            {
              id: 8,
              title: 'План масштабування на наступний місяць',
              subtitle: 'Плавне зростання бюджету (+15-20%) та підготовка нових зв’язок',
              category: 'analytics',
              placeholderText: 'Стратегія довгострокового залучення клієнтів без вигорання',
              imageUrl: '/cases/case1/slide-8.webp'
            },
            {
              id: 9,
              title: 'Філософія таргетованої реклами',
              subtitle: 'Результат — це не випадковість, а точний розрахунок і контроль',
              category: 'review',
              placeholderText: 'Чому реклама стає керованим інструментом прибутку',
              imageUrl: '/cases/case1/slide-9.webp'
            }
          ]
        },
        {
          id: 'case-english-school',
          niche: 'Beauty & PMU (США)',
          title: 'PMU-майстер: запуск з нуля в Naples, FL',
          highlightMetric: '50+ запитів',
          metricLabel: 'Перші клієнти в слабкий сезон',
          budgetAndReturn: '33 запити та 5 записів з нуля',
          period: '1,5 місяці співпраці',
          tags: ['SMM + Таргет', 'PMU', 'Локальний бізнес у США', 'Google-профіль'],
          problemText: 'Клієнтка поєднувала PMU, татуювання та вії і хотіла поступово залишити інші послуги, щоб розвиватися саме як PMU-майстер. До цього був контент, публікували «до/після», відгуки та вільні віконця, але записів це не приносило. До того ж працювати потрібно було на локальну аудиторію в Naples, Florida у дуже слабкий сезон.',
          solutionText: 'Побудували нульовий акаунт під конкретну бізнес-ціль: поєднали SMM + таргет, пропрацювали Google-профіль для локального пошуку б’юті-послуг у США, щотижня оновлювали креативи та повністю перебудували комунікацію в Direct від сухого прайсу до експертної консультації.',
          resultSummary: 'За перші 1,5 місяці роботи з нуля отримали: +136 живих підписників, 33 цільові запити та 5 реальних записів на процедури у слабкий сезон. Сформовано надійну базу для масштабування в сильний сезон.',
          slides: [
            {
              id: 1,
              title: '50+ запитів і перші записи з нуля у слабкий сезон',
              subtitle: 'Кейс майстра перманентного макіяжу з Naples, Florida',
              category: 'creative',
              placeholderText: 'Обкладинка кейсу PMU в слабкий сезон',
              imageUrl: '/cases/case2/slide-1.webp'
            },
            {
              id: 2,
              title: 'Точка А: регулярний контент без нових клієнтів',
              subtitle: 'Публікації до/після та вільних віконець не давали записів',
              category: 'screenshot',
              placeholderText: 'Попередній досвід роботи з SMM без конверсій',
              imageUrl: '/cases/case2/slide-2.webp'
            },
            {
              id: 3,
              title: 'Задача: виділити PMU в окремий та основний напрям',
              subtitle: 'Поступово залишити другорядні послуги та масштабувати перманент',
              category: 'analytics',
              placeholderText: 'Формування позиціонування під моно-послугу',
              imageUrl: '/cases/case2/slide-3.webp'
            },
            {
              id: 4,
              title: 'Побудова нульового акаунта під бізнес-ціль',
              subtitle: 'Поєднання SMM + таргету в одну систему замість двох окремих процесів',
              category: 'creative',
              placeholderText: 'Хто наш клієнт і як довести його до запису',
              imageUrl: '/cases/case2/slide-4.webp'
            },
            {
              id: 5,
              title: 'Оптимізація Google-профілю для локального ринку США',
              subtitle: 'Локальний пошук у Google як важливий канал для б’юті-послуг',
              category: 'screenshot',
              placeholderText: 'Пропрацювання відгуків та локального SEO в Naples',
              imageUrl: '/cases/case2/slide-5.webp'
            },
            {
              id: 6,
              title: 'Щотижневе оновлення креативів та контроль показників',
              subtitle: 'Реагували на цифри в процесі, а не чекали саморозкрутки',
              category: 'analytics',
              placeholderText: 'Постійне тестування подач та контроль ціни ліда',
              imageUrl: '/cases/case2/slide-6.webp'
            },
            {
              id: 7,
              title: 'Реформа комунікації в Direct: «До» та «Після»',
              subtitle: 'Замість сухого скидання прайсу — консультація та виявлення потреб',
              category: 'screenshot',
              placeholderText: 'Порівняння діалогів та конверсія в реальне бронювання',
              imageUrl: '/cases/case2/slide-7.webp'
            },
            {
              id: 8,
              title: 'Результати за 1,5 місяці: 33 запити та 5 записів',
              subtitle: '+136 підписників з нуля у найслабший локальний сезон',
              category: 'result',
              placeholderText: 'Підсумкова статистика профілю та перші продажі',
              imageUrl: '/cases/case2/slide-8.webp'
            },
            {
              id: 9,
              title: 'Стратегія масштабування у високий сезон',
              subtitle: 'Переведення PMU в основне джерело доходу майстра',
              category: 'review',
              placeholderText: 'План масштабування на наступний сезон',
              imageUrl: '/cases/case2/slide-9.webp'
            }
          ]
        },
        {
          id: 'case-fashion-brand',
          niche: 'EdTech / Онлайн-освіта',
          title: 'Мовна онлайн-школа: зростання продажів ×2',
          highlightMetric: '×2 продажі',
          metricLabel: 'Зростання продажів у перший місяць',
          budgetAndReturn: 'Перебудова позиціонування та контенту',
          period: 'Перший місяць роботи',
          tags: ['SMM-стратегія', 'Аналіз продукту', 'Шлях клієнта', 'EdTech'],
          problemText: 'Школа вкладала кошти в SMM, рекламу та просування через інфлюенсерів, маючи блог власниці на 25k підписників, але не отримувала зростання продажів навіть на 30%. Причина крилася в продукті: абонементи стартували від $200, і нова аудиторія не бачила достатньої цінності для моментальної великої покупки.',
          solutionText: 'Розробили повноцінну SMM-стратегію та перезібрали шлях клієнта до покупки. Замість абстрактних фраз «ми хороша школа» перебудували контент навколо ключового питання: «Чому клієнту варто заплатити $200+ саме за це навчання?», розкривши методику, результати учнів та експертність викладачів.',
          resultSummary: 'Подвоєння продажів курсів та абонементів уже за перший місяць роботи без роздування рекламного бюджету, суто коштом конверсійного контенту та чіткого донесення цінності.',
          slides: [
            {
              id: 1,
              title: 'Як стратегічний SMM збільшив продажі ×2',
              subtitle: 'Коли на перший погляд усе вже було добре',
              category: 'creative',
              placeholderText: 'Обкладинка кейсу мовної школи',
              imageUrl: '/cases/case3/slide-1.webp'
            },
            {
              id: 2,
              title: 'Точка А: аудиторія та увага є, але продажі не ростуть',
              subtitle: '1,5k підписників, охоплення 138k та згадки блогерів без конверсії',
              category: 'analytics',
              placeholderText: 'Статистика акаунта на старті співпраці',
              imageUrl: '/cases/case3/slide-2.webp'
            },
            {
              id: 3,
              title: 'Аналіз продукту: чому люди не купували абонементи від $200',
              subtitle: 'Новим підписникам було складно одразу зробити дорогий чек',
              category: 'screenshot',
              placeholderText: 'Виявлення бар’єрів до покупки в продуктовому аналізі',
              imageUrl: '/cases/case3/slide-3.webp'
            },
            {
              id: 4,
              title: 'SMM-стратегія та перезбірка шляху клієнта',
              subtitle: 'Відповідь на запитання: «Чому мені варто заплатити $200+?»',
              category: 'creative',
              placeholderText: 'Схема розбору шляху клієнта та стратегії',
              imageUrl: '/cases/case3/slide-4.webp'
            },
            {
              id: 5,
              title: 'Зміна принципу створення контенту: демонстрація цінності',
              subtitle: 'Замість загальних переваг — конкретні відповіді та методисти в кадрі',
              category: 'creative',
              placeholderText: 'Приклади нових Reels та розборів методики',
              imageUrl: '/cases/case3/slide-5.webp'
            },
            {
              id: 6,
              title: 'Перетворення характеристик на цінність для клієнта',
              subtitle: '«Не просто сучасна методика, а як вона приведе учня до результату»',
              category: 'creative',
              placeholderText: 'Трансформація переваг у персональну цінність',
              imageUrl: '/cases/case3/slide-6.webp'
            },
            {
              id: 7,
              title: 'Нова роль Stories: послідовні відповіді перед покупкою',
              subtitle: 'Що за продукт → Кому підходить → Яку проблему вирішує → Чому обрати його',
              category: 'creative',
              placeholderText: 'Схема щоденних змістовних Stories',
              imageUrl: '/cases/case3/slide-7.webp'
            },
            {
              id: 8,
              title: 'Оновлений шлях клієнта: від уваги до оплати',
              subtitle: 'Увага → розуміння продукту → цінність → довіра → рішення про покупку',
              category: 'analytics',
              placeholderText: 'Схема шляху прийняття рішень клієнтом',
              imageUrl: '/cases/case3/slide-8.webp'
            },
            {
              id: 9,
              title: 'Результат за 1 місяць: зростання ×2 за всіма показниками',
              subtitle: 'Охоплення 289,491, 3 880 підписників та кратне зростання продажів абонементів',
              category: 'result',
              placeholderText: 'Статистика акаунта з подвоєнням охоплень та виручки',
              imageUrl: '/cases/case3/slide-9.webp'
            },
            {
              id: 10,
              title: 'Головний висновок: суть стратегічного SMM',
              subtitle: 'Будувати комунікацію навколо того, що потрібно клієнту для рішення',
              category: 'review',
              placeholderText: 'Філософія стратегічного SMM у кейсі школи',
              imageUrl: '/cases/case3/slide-10.webp'
            }
          ]
        }
      ]
    },
    services: {
      tag: 'Послуги & Формати роботи',
      titleBefore: 'Оберіть формат, який вирішує задачу вашого',
      titleHighlight: 'бізнесу',
      intro: 'Від повної передачі соцмереж «під ключ» до точкових стратегічних розборів у Zoom. Без нав\'язування зайвих послуг.',
      forWhoLabel: 'Для кого:',
      data: [
        {
          id: 'smm-target',
          title: 'SMM + таргет',
          badge: 'Комплексна система',
          isPopular: true,
          targetAudience: 'Для бізнесів, яким потрібна не просто красива сторінка чи окремі запуски реклами, а постійний потік звернень.',
          description: 'Контент і реклама працюють як одна система. Реклама приводить на сторінку нових людей, а сторінка вже готова їх прийняти: в неї зрозуміле позиціонування, контент, який закриває сумніви, і очевидний наступний крок. У моїй команді стратегія і реклама узгоджуються ще до того, як витрачено перший долар.',
          features: [
            'Аналіз бізнесу, аудиторії та конкурентів',
            'SMM-стратегія і контент-стратегія',
            'Контент: Reels, stories, пости, тексти, дизайн',
            'Налаштування, тести й оптимізація реклами',
            'Щомісячна аналітика соцмереж і реклами в одному зрозумілому звіті'
          ],
          ctaText: 'Обрати SMM + таргет'
        },
        {
          id: 'smm-management',
          title: 'SMM-супровід',
          badge: 'Повне делегування',
          isPopular: false,
          targetAudience: 'Для тих, хто хоче повністю делегувати Instagram і отримати системну роботу, а не публікації заради публікацій.',
          description: 'Перед стартом я аналізую ваш бізнес, аудиторію, конкурентів і поточну сторінку. Далі вибудовую систему, в якій кожен формат має свою роль: одні публікації приводять нових людей, інші формують довіру, треті підводять до покупки.',
          features: [
            'SMM-стратегія та позиціонування',
            'Контент-стратегія і контент-плани',
            'Сценарії Reels, тексти, stories',
            'Дизайн і візуальне оформлення',
            'Організація зйомок і продакшену',
            'Ведення сторінки',
            'Щомісячна аналітика і коригування стратегії'
          ],
          note: 'Обсяг і формат контенту підбираю під ваш бізнес, задачі та бюджет.',
          ctaText: 'Делегувати SMM'
        },
        {
          id: 'targeted-ads',
          title: 'Таргетована реклама',
          badge: 'Лідогенерація',
          isPopular: false,
          targetAudience: 'Для бізнесів, яким потрібні заявки з реклами в Instagram і Facebook.',
          description: 'Технічну частину веде таргетолог моєї команди, а я відповідаю за те, щоб реклама працювала на ваші маркетингові цілі: щоб оффер, аудиторія і сторінка, на яку веде реклама, були пов\'язані між собою. Ми дивимося не тільки на кількість заявок, а й на вартість результату та якість людей, які приходять.',
          features: [
            'Аналіз бізнесу, продукту й аудиторії',
            'Рекламна стратегія та гіпотези для тестування',
            'Підготовка креативів та копірайтинг',
            'Запуск, контроль і оптимізація кампаній',
            'Аналіз показників і практичні рекомендації'
          ],
          note: 'Рекламний бюджет оплачується окремо.',
          ctaText: 'Запустити рекламу'
        },
        {
          id: 'strategy-session',
          title: 'Стратегічна сесія',
          badge: 'Індивідуальний розбір',
          isPopular: false,
          targetAudience: 'Іноді не потрібно делегувати весь Instagram, достатньо зрозуміти, що саме не працює і що робити далі.',
          description: 'У мене немає шаблонної програми: кожна сесія збирається під ваш запит. Спочатку ви заповнюєте бриф, потім 5–7 днів я готуюся і розбираю вашу ситуацію, і вже після цього ми зустрічаємось у Zoom.',
          threeAudienceBreakdown: [
            {
              forWho: 'Для бізнесів',
              text: 'Просування, позиціонування, контент, реклама і чому соцмережі не приносять звернень.'
            },
            {
              forWho: 'Для експертів',
              text: 'Позиціонування, презентація послуг, контент, який формує довіру і приводить клієнтів.'
            },
            {
              forWho: 'Для SMM-спеціалістів-початківців',
              text: 'Розбір реального проєкту, стратегія, аналітика, аргументація рішень перед клієнтом і перехід від створення контенту до системного маркетингового мислення.'
            }
          ],
          features: [
            'Глибокий попередній аналіз сторінки та конкурентів (5–7 днів)',
            'Індивідуальна сесія у Zoom (1.5–2 години)',
            'Запис зустрічі + інтерактивна mind-карта або PDF зі стратегією',
            'Тиждень підтримки в месенджері після сесії'
          ],
          ctaText: 'Замовити стратегічну сесію'
        }
      ]
    },
    calculator: {
      tag: 'Інтерактивний підбір',
      titleBefore: 'Експрес-діагностика: який формат потрібен вашому',
      titleHighlight: 'проєкту?',
      intro: 'Дайте відповідь на 3 коротких питання, щоб миттєво отримати персональну рекомендацію під вашу нішу та бюджет.',
      step1Title: 'Крок 1. Ваша ніша:',
      step2Title: 'Крок 2. Головна проблема зараз:',
      step3Title: 'Крок 3. Бажаний результат:',
      niches: [
        { id: 'beauty', label: 'Beauty & Послуги' },
        { id: 'fashion', label: 'Fashion & Одяг' },
        { id: 'edtech', label: 'Онлайн-освіта / EdTech' },
        { id: 'expert', label: 'Експертний блог' },
        { id: 'business', label: 'Товарний бізнес' },
      ],
      pains: [
        { id: 'leads', label: 'Пости виходять, але Direct порожній' },
        { id: 'ads_drain', label: 'Реклама зливає бюджет, ліди дорогі' },
        { id: 'no_system', label: 'Немає системи: робимо все хаотично' },
        { id: 'delegate', label: 'Хочу повністю делегувати соцмережі' },
      ],
      goals: [
        { id: 'sales', label: 'Швидкі системні продажі (x2–x10 окупність)' },
        { id: 'audit', label: 'Зрозуміти помилки та скласти стратегію' },
        { id: 'international', label: 'Вихід на ринки США або Європи' },
      ],
      recBadge: 'Рекомендований формат для вас:',
      recTitle: 'Чому саме цей формат:',
      recReasonPrefix: '',
      ctaButton: 'Записатися на безкоштовний розбір',
      auditBadge: 'Швидкий старт & Аудит',
      auditReason: 'Вам потрібен індивідуальний розбір та чітка дорожня карта: чому зараз соцмережі не працюють і що саме виправити в позиціонуванні.',
      adsBadge: 'Зниження ціни ліда',
      adsReason: 'Таргетолог моєї команди оптимізує вартість заявки, а я зв\'яжу оффер із посадковою сторінкою, щоб реклама давала якісних покупців.',
      smmBadge: 'Повне делегування',
      smmReason: 'Повне звільнення вашого часу: беремо на себе стратегію, сценарії Reels, тексти, візуал, продакшн і системну аналітику.',
      comboBadge: 'Максимальний результат',
      comboReason: 'Флагманська система, де контент і реклама підсилюють одне одного без розриву підрядників. Оптимально для максимальної окупності (до ×10 ROMI).'
    },
    faq: {
      tag: 'Відповіді на запитання',
      titleBefore: 'Часті запитання перед',
      titleHighlight: 'стартом',
      intro: 'Все, що потрібно знати про формат роботи, терміни, бюджети та гарантію окупності.',
      haveQuestions: 'Залишилися індивідуальні запитання?',
      writeAlina: 'Напишіть Аліні прямо в Telegram або Instagram',
      chatTelegram: 'Telegram: @vlshavo',
      chatInstagram: 'Instagram: @vlsh.av',
      data: [
        {
          q: 'Чому саме ваша команда, а не окремий SMM-ник чи велика агенція?',
          a: 'У великих агенціях вашим проєктом часто займаються стажери, а комунікація заплутана. У фрилансерів-одинаків немає ресурсу одночасно глибоко розбиратися і в контенті, і в аналітиці, і в таргетинг-налаштуваннях Meta Ads. У моїй команді я особисто тримаю стратегію та сенси, а технічну частину веде досвідчений таргетолог. Ви отримуєте рівень агенції за ціною однієї узгодженої команди.'
        },
        {
          q: 'Скільки часу потрібно, щоб побачити перші результати?',
          a: 'Перші результати у вигляді заявок з реклами ми отримуємо вже на 1–2 тижні після старту тестів. Повноцінна системна окупність та нарощування ядра лояльної аудиторії вибудовується протягом першого місяця, коли реклама й контент починають підсилювати одне одного.'
        },
        {
          q: 'Чи потрібно мені самостійно знімати відео та писати тексти?',
          a: 'Ні, в пакеті повного супроводу ми закриваємо копірайтинг, сценарії та дизайн. Якщо потрібні зйомки за вашою участю, я надаю готові похвилинні сценарії, розкадровки та супроводжую процес, щоб зйомка займала у вас 1–2 години на місяць замість постійного стресу.'
        },
        {
          q: 'Як проходить безкоштовна стратегічна сесія?',
          a: 'Це 20–30 хвилинний формат у Zoom або листуванні в Telegram, де ми знайомимося, дивимося на вашу поточну сторінку, визначаємо слабкі місця (де ви втрачаєте ліди) та розуміємо, який формат роботи вам найкраще підійде.'
        },
        {
          q: 'З якими нішами ви працюєте?',
          a: 'Маємо перевірені кейси у fashion-індустрії, beauty-сфері, онлайн-освіті (EdTech), інфобізнесі, експертних блогах, локальних послугах та товарах для ринків України, США та країн Європи.'
        }
      ]
    },
    footer: {
      ctaBanner: {
        badge: 'Готові масштабувати продажі?',
        badgeSubtitle: 'Запис на цей тиждень',
        titleBefore: 'Зробіть соцмережі',
        titleHighlight: 'системним',
        titleAfter: 'джерелом клієнтів',
        desc: 'Без хаотичного контенту та злитих бюджетів. Розберемо ваші точки зростання та покажемо покроковий план окупного просування.',
        point1: '30 хвилин у Zoom',
        point2: 'Експрес-аудит профілю',
        point3: 'Без нав\'язувань',
        btnBook: 'Записатися на безкоштовну сесію',
        btnTelegram: 'Написати в Telegram'
      },
      desc: 'Комплексний SMM та таргетована реклама для бізнесів і експертів. Вибудовуємо зрозумілий шлях клієнта від першого кліку до покупки.',
      quickLinksTitle: 'Навігація',
      servicesTitle: 'Послуги',
      contactsTitle: 'Зв\'язок з Аліною',
      copyright: 'Всі права захищено.',
      allRightsReserved: 'SMM-стратег Аліна Волошина & Команда'
    },
    bookingModal: {
      title: 'Записатися на безкоштовну сесію',
      subtitle: 'Залиште контакти — я зв\'яжуся з вами протягом 2–3 годин, щоб погодити зручний час для знайомства та експрес-аудиту вашого профілю.',
      nameLabel: 'Ваше ім\'я *',
      namePlaceholder: 'Як до вас звертатися?',
      contactLabel: 'Телефон / Telegram *',
      contactPlaceholder: '+380... або @username',
      instagramLabel: 'Instagram профіль проєкту',
      instagramPlaceholder: '@vash_proekt або посилання',
      nicheLabel: 'Ваша ніша / Сфера бізнесу',
      nicheOptions: [
        'Beauty & Послуги',
        'Fashion & Шоурум',
        'Онлайн-освіта (EdTech)',
        'Експертний блог',
        'Товарний бізнес / E-commerce',
        'Інша сфера'
      ],
      serviceLabel: 'Послуга, яка цікавить',
      serviceOptions: [
        'Безкоштовна стратегічна сесія',
        'SMM + таргет (комплексна система)',
        'SMM-супровід (повне делегування)',
        'Таргетована реклама (лідогенерація)',
        'Стратегічна сесія (глибокий аудит)'
      ],
      commentLabel: 'Коротко про задачу або бюджет',
      commentPlaceholder: 'Опишіть поточну ситуацію або запитання...',
      btnSubmit: 'Відправити заявку',
      btnSubmitting: 'Відправка...',
      successTitle: 'Заявку успішно надіслано!',
      successMessage: 'Дякую за довіру! Я вже отримала вашу відповідь і напишу вам у месенджер найближчим часом.',
      btnTelegramDirect: 'Написати в Telegram особисто',
      directNotice: 'Якщо питання термінове, ви можете написати Аліні напряму:',
      btnClose: 'Закрити',
      privacyNotice: 'Ваші контактні дані використовуються виключно для зв\'язку щодо співпраці.'
    }
  },

  en: {
    brand: {
      name: 'ALINA VOLOSHYNA',
      role: 'SMM Strategist & Team',
      tagline: 'Predictable social media sales systems'
    },
    nav: {
      links: [
        { label: 'Approach', href: '#approach' },
        { label: 'Case Studies', href: '#cases' },
        { label: 'Services', href: '#services' },
        { label: 'Diagnostics', href: '#calculator' },
        { label: 'About', href: '#about' },
        { label: 'FAQ', href: '#faq' },
      ],
      cta: 'Free Session',
      mobileCta: 'Book a Free Strategy Session',
      markets: 'Markets: USA • Europe • Ukraine',
      switchLangTooltip: 'Перемкнути на українську'
    },
    hero: {
      badge: 'SMM Strategist & Dedicated Ads Team',
      titleBefore: 'Turning social media into a reliable',
      titleHighlight: 'sales engine',
      titleAfter: 'for businesses & creators',
      subtitle: 'With my dedicated team, including an in-house media buyer, we cover the full customer journey: from deep analytics and market strategy to creative content, paid ads, and qualified leads in your Direct. No need to manage 5 disconnected freelancers.',
      formulaTitle: 'My systematic framework:',
      formulaSteps: {
        goal: 'Goal',
        analytics: 'Analytics',
        strategy: 'Strategy',
        contentAds: 'Content & Ads'
      },
      ctaBook: 'Book a Free Strategy Session',
      ctaCases: 'Results in numbers ↓',
      trust1: '3 years of SMM expertise',
      trust2: 'Markets: USA, Europe, Ukraine',
      trust3: 'Every post serves a purpose',
      badgeEdTechValue: '×2 Sales Growth',
      badgeEdTechLabel: 'EdTech School',
      badgeBeautyNiche: 'Beauty Case',
      badgeBeautyValue: '×10 ROAS',
      badgeBeautyDesc: '$200 ad spend → $2,000 revenue'
    },
    stats: {
      marquee: [
        'USA • EUROPE • UKRAINE',
        '×10 ROAS IN BEAUTY & PMU',
        'FASHION BRANDS & E-COMMERCE',
        'IN-HOUSE MEDIA BUYER & PRODUCTION',
        '×2 SALES GROWTH IN EDTECH (MONTH 1)',
        'EVERY POST SERVES A BUSINESS GOAL',
        'FROM STRATEGY TO QUALIFIED INBOX LEADS',
      ],
      cards: [
        {
          value: '3 Years',
          label: 'Hands-on experience in SMM & Ads',
          desc: 'Deep mastery of platform algorithms & consumer buyer psychology'
        },
        {
          value: '3 Markets',
          label: 'USA, Europe & Ukraine',
          desc: 'Tailoring offers to cultural nuances & local purchasing power'
        },
        {
          value: '×10 ROAS',
          label: 'Ad campaign profitability',
          desc: '$200 ad spend delivered $2,000 in revenue in month 1'
        },
        {
          value: '100% Funnel',
          label: 'End-to-end customer journey',
          desc: 'Strategy + content + ads + analytics unified in one seamless system'
        },
        {
          value: '1 Team',
          label: 'In-house media buyer & production',
          desc: 'Zero disconnect between brand content and ad creatives'
        }
      ],
      metricTag: 'METRIC',
      topLevelTag: 'TOP TIER'
    },
    about: {
      tag: 'About Me',
      titleBefore: 'Who is Alina Voloshyna and why',
      titleHighlight: 'choose us?',
      bioP1: 'I am an SMM strategist who turns social media into a predictable sales system for businesses and personal brands.',
      bioP2: 'I lead my own dedicated team with an experienced media buyer. We manage the entire buyer journey: from brand positioning and content creation to Meta Ads and warm inquiries in your direct messages. You never have to juggle multiple contractors and re-explain your vision.',
      quote: '“I start with your business model, not just pretty visuals: first breaking down your product economics, audience segments, competitors, and revenue goals, and only then deciding which creative tactics will win.”',
      quoteRule: '— Core principle of my work',
      bioP3: 'Over 3 years of hands-on experience, I have successfully scaled client brands across the United States, Europe, and Ukraine in fashion, beauty, digital education (EdTech), and high-ticket service industries.',
      principles: [
        'Every single post serves a clear business goal',
        'Results measured in revenue & closed deals',
        'Strategic alignment before spending the first ad dollar',
        'Bespoke execution with zero cookie-cutter templates'
      ],
      ctaTalk: 'Discuss Your Project with Alina',
      ctaTelegram: 'Chat on Telegram',
      workBadge: 'Real Workflow',
      workTitle: 'Deep research behind every SMM strategy',
      workDesc: '5–7 days of rigorous market audit before launching your first campaign',
      autoPlayActive: 'Pause autoplay',
      autoPlayPaused: 'Resume autoplay',
      slides: [
        {
          tag: 'Aesthetics & Style',
          title: 'Alina Voloshyna',
          desc: 'SMM strategist marrying high-fashion editorial visuals with performance data'
        },
        {
          tag: 'Global Standard',
          title: 'Systematic Framework',
          desc: 'In-house team managing strategy, media buying, and the entire buyer funnel'
        },
        {
          tag: 'Tone & Atmosphere',
          title: 'Lifestyle Storytelling',
          desc: 'Content that nurtures authentic buyer trust and drives conversions'
        },
        {
          tag: 'Editorial B&W',
          title: 'Fashion Vision',
          desc: 'Deep track record scaling fashion labels in the US, Europe, and Ukraine'
        },
        {
          tag: 'Brand Affinity',
          title: 'Loyal Community',
          desc: 'Fostering brand loyalty and building a vibrant, repeat customer base'
        }
      ]
    },
    philosophy: {
      tag: 'Why Work With Us?',
      titleBefore: 'Why most SMM fails to generate revenue, and how we',
      titleHighlight: 'fix it',
      intro: 'I advocate for SMM where every publication has a defined commercial objective, and success is proven in revenue numbers, not just vanity follower counts.',
      brokenTitle: 'How Most Operate (Fragmented Freelancers)',
      brokenBadge: 'Wasted Budget',
      brokenDesc: 'You hire a freelance SMM person and a separate media buyer. Each manages only their narrow silo and blames the other when sales stall.',
      brokenItems: [
        'The ads make promises that the profile page doesn’t fulfill — visitors click, get confused, and bounce.',
        'Posting for the sake of posting: aesthetic graphics, but zero qualified leads in your inbox.',
        'You become an unpaid project manager: mediating disputes, rewriting ad copy, and trying to align two unrelated parties.'
      ],
      brokenResult: 'Result: wasted marketing budget and zero clarity on what generated actual ROI.',
      teamTitle: 'In My Team (Unified System)',
      teamBadge: 'Predictable Growth',
      teamDesc: 'I run my own dedicated team with an in-house media buyer. We deliver an end-to-end, full-funnel solution from day one.',
      teamItems: [
        'Brand strategy and paid campaigns are synchronized before spending a single dollar.',
        'Content and targeting speak the exact same language: ad prospects find an immediate continuation of what hooked them.',
        'You have one accountable strategist and receive clear financial reports tied to your bottom line.'
      ],
      teamResult: 'Result: a consistent pipeline of ideal clients and predictable return on ad spend.',
      stepsTitle: '4 Pillars of My Framework:',
      steps: [
        {
          num: '01',
          title: 'Goal',
          subtitle: 'Defining commercial targets',
          desc: 'We start with your business fundamentals: required lead volume, average order value, margin, and realistic 3–6 month revenue targets.',
          deliverable: 'Quantified commercial milestones & social media sales roadmap'
        },
        {
          num: '02',
          title: 'Analytics',
          subtitle: 'Product, customer & competitor audit',
          desc: 'We uncover deep emotional pain points, buying triggers, and competitor gaps to understand exactly why clients choose you over alternatives.',
          deliverable: 'Audience segment map & page friction audit'
        },
        {
          num: '03',
          title: 'Strategy',
          subtitle: 'Positioning & customer funnel',
          desc: 'We craft high-converting messaging from first ad impression to objections handling on your page and clear closing steps in Direct.',
          deliverable: 'Step-by-step scaling blueprint without chaotic trial-and-error'
        },
        {
          num: '04',
          title: 'Content & Ads',
          subtitle: 'Synchronized team execution',
          desc: 'High-converting creative assets and paid ads launch in lockstep, continually optimized based on real lead quality and acquisition cost.',
          deliverable: 'Consistent inbound inquiries & transparent monthly reporting'
        }
      ],
      deliverableLabel: 'Deliverable:'
    },
    cases: {
      tag: 'Real Results',
      titleBefore: 'Case studies & results in',
      titleHighlight: 'numbers',
      intro: 'Verified campaign metrics, Meta Ads manager screenshots, and detailed breakdowns of how our integrated system produces returns.',
      financialResultLabel: 'FINANCIAL RESULT:',
      materialsLabel: 'CASE MATERIALS',
      pauseAutoplay: 'Pause autoplay',
      playAutoplay: 'Play autoplay',
      slidesCountSuffix: 'slides',
      slideLabel: 'Slide',
      ofLabel: 'of',
      zoomLabel: 'Enlarge',
      swipeHint: 'swipe left / right →',
      pointALabel: '✕ POINT A (PROBLEM):',
      solutionLabel: "✔ ALINA'S TEAM SOLUTION:",
      pointBLabel: '📈 POINT B (RESULT):',
      allCasesTitle: 'Select a case study to inspect:',
      slideOf: 'Slide',
      fullscreenLabel: 'Fullscreen',
      autoplayLabel: 'Autoplay',
      prevSlide: 'Previous',
      nextSlide: 'Next',
      data: [
        {
          id: 'case-permanent-makeup',
          niche: 'Beauty & High-Ticket Services',
          title: 'Permanent Makeup Artist',
          highlightMetric: '×10 ROMI',
          metricLabel: 'Return on ad spend',
          budgetAndReturn: '$200 ad spend → $2,000 revenue',
          period: '1 month campaign',
          tags: ['Paid Ads', 'SMM', 'Beauty Niche', 'High-Ticket'],
          problemText: 'Ads were previously launched without cohesion, attracting tire-kickers who asked for prices and vanished. The profile didn’t mitigate procedure anxiety or prove technical mastery.',
          solutionText: 'We synchronized the ads with the landing profile: produced video proof of clinical sterility, educational pigment breakdown stories, and an irresistible low-friction offer for initial consultations targeted at affluent women in a specific location.',
          resultSummary: 'Fully booked calendar one month in advance. A $200 ad budget generated 34 qualified inquiries, resulting in over $2,000 in closed bookings.',
          slides: [
            {
              id: 1,
              title: 'How to generate $2,000 in revenue from a $200 ad budget',
              subtitle: 'Paid advertising case study for a PMU artist in Naples, FL',
              category: 'creative',
              placeholderText: 'Case study cover: 10X return on ad spend',
              imageUrl: '/cases/case1/slide-1.webp'
            },
            {
              id: 2,
              title: 'Point A: Starting Instagram from absolute scratch',
              subtitle: 'Local market targeting in Naples, Florida (~20k residents)',
              category: 'screenshot',
              placeholderText: 'Initial profile state: 0 followers, tight demographic market',
              imageUrl: '/cases/case1/slide-2.webp'
            },
            {
              id: 3,
              title: 'Month One: Testing hypotheses and creative angles',
              subtitle: 'Prioritizing sustainable audience-creative fit over vanity metrics',
              category: 'analytics',
              placeholderText: 'Audience and creative split testing in Meta Ads',
              imageUrl: '/cases/case1/slide-3.webp'
            },
            {
              id: 4,
              title: 'Targeted Direct inquiries at ultra-low acquisition cost',
              subtitle: '23 high-intent conversations at $4.57/lead converting into bookings',
              category: 'screenshot',
              placeholderText: 'Meta Ads and Direct dashboard showing high lead conversion',
              imageUrl: '/cases/case1/slide-4.webp'
            },
            {
              id: 5,
              title: 'September execution: 3 new video hooks & real-time optimization',
              subtitle: 'Daily budget governance and pruning underperforming creatives',
              category: 'creative',
              placeholderText: 'Testing novel short-form video angles and demographic tiers',
              imageUrl: '/cases/case1/slide-5.webp'
            },
            {
              id: 6,
              title: 'September reporting: Core performance metrics',
              subtitle: '33 inquiries, 5 high-ticket new clients (15.2%), $420 average order value',
              category: 'result',
              placeholderText: 'Official client report: $200 spend, 5 clients, 10x ROAS',
              imageUrl: '/cases/case1/slide-6.webp'
            },
            {
              id: 7,
              title: 'Invested $200 → Generated $2,000 in direct revenue',
              subtitle: '10X ROAS: Every $1 invested returned $10 in net client revenue',
              category: 'result',
              placeholderText: 'Verified ROAS documentation for period 09.01 – 09.30',
              imageUrl: '/cases/case1/slide-7.webp'
            },
            {
              id: 8,
              title: 'Scaling roadmap for the upcoming quarter',
              subtitle: 'Controlled budget expansion (+15-20%) and testing secondary offers',
              category: 'analytics',
              placeholderText: 'Long-term customer acquisition strategy without burnout',
              imageUrl: '/cases/case1/slide-8.webp'
            },
            {
              id: 9,
              title: 'Targeted advertising philosophy',
              subtitle: 'Predictable growth is not luck—it is precise calibration and testing',
              category: 'review',
              placeholderText: 'Why paid acquisition becomes a reliable revenue generator',
              imageUrl: '/cases/case1/slide-9.webp'
            }
          ]
        },
        {
          id: 'case-english-school',
          niche: 'Beauty & PMU (USA)',
          title: 'PMU Artist: 0 to Full Bookings in Naples, FL',
          highlightMetric: '50+ Inquiries',
          metricLabel: 'First clients during low season',
          budgetAndReturn: '33 inquiries & 5 closed bookings from scratch',
          period: '1.5 months collaboration',
          tags: ['SMM + Ads', 'PMU', 'US Local Business', 'Google Business'],
          problemText: 'The client combined PMU, tattoo, and lashes and wanted to phase out low-margin services to focus exclusively on high-ticket PMU. Previous generic posts (before/afters and open calendar slots) yielded zero bookings in a tough off-season in Florida.',
          solutionText: 'We constructed an account geared specifically for high-ticket bookings: integrated SMM with Meta Ads, optimized her Google Business profile for local high-intent search, refreshed creatives weekly, and completely overhauled Direct sales scripts from static pricing to consultative bookings.',
          resultSummary: 'Within the first 6 weeks: +136 organic followers, 33 warm inquiries, and 5 confirmed procedure appointments during off-season, creating a solid base for the busy winter season.',
          slides: [
            {
              id: 1,
              title: '50+ inquiries and first bookings from scratch in low season',
              subtitle: 'PMU artist case study based in Naples, Florida',
              category: 'creative',
              placeholderText: 'Off-season PMU client acquisition case cover',
              imageUrl: '/cases/case2/slide-1.webp'
            },
            {
              id: 2,
              title: 'Point A: Frequent posting with zero incoming clients',
              subtitle: 'Before/after pictures and calendar stories produced no bookings',
              category: 'screenshot',
              placeholderText: 'Prior SMM efforts lacking commercial conversion',
              imageUrl: '/cases/case2/slide-2.webp'
            },
            {
              id: 3,
              title: 'Mission: Position PMU as the flagship premium service',
              subtitle: 'Phasing out low-margin services to scale permanent makeup',
              category: 'analytics',
              placeholderText: 'Single-service premium positioning framework',
              imageUrl: '/cases/case2/slide-3.webp'
            },
            {
              id: 4,
              title: 'Building a fresh profile around revenue goals',
              subtitle: 'Unifying organic SMM and targeted ads into one fluid system',
              category: 'creative',
              placeholderText: 'Defining ideal client avatars and the path to booking',
              imageUrl: '/cases/case2/slide-4.webp'
            },
            {
              id: 5,
              title: 'Google Profile optimization for local US searches',
              subtitle: 'Local search engine capture as a vital channel for beauty services',
              category: 'screenshot',
              placeholderText: 'Local reviews management and local SEO in Naples',
              imageUrl: '/cases/case2/slide-5.webp'
            },
            {
              id: 6,
              title: 'Weekly creative iteration and real-time KPI auditing',
              subtitle: 'Adapting to live analytics rather than waiting passively',
              category: 'analytics',
              placeholderText: 'Continuous split-testing and CPA tracking',
              imageUrl: '/cases/case2/slide-6.webp'
            },
            {
              id: 7,
              title: 'Direct messaging overhaul: Before vs After',
              subtitle: 'Replacing sterile price sheets with personalized consultations',
              category: 'screenshot',
              placeholderText: 'Inbox dialogue comparison and high-converting chat flows',
              imageUrl: '/cases/case2/slide-7.webp'
            },
            {
              id: 8,
              title: 'Results after 6 weeks: 33 inquiries & 5 paid bookings',
              subtitle: '+136 organic followers from scratch during the slowest local season',
              category: 'result',
              placeholderText: 'Final profile performance dashboard and first revenue figures',
              imageUrl: '/cases/case2/slide-8.webp'
            },
            {
              id: 9,
              title: 'High-season scale strategy',
              subtitle: 'Transitioning PMU into the primary revenue generator for the artist',
              category: 'review',
              placeholderText: 'High-season budget and booking expansion plan',
              imageUrl: '/cases/case2/slide-9.webp'
            }
          ]
        },
        {
          id: 'case-fashion-brand',
          niche: 'EdTech / Online Education',
          title: 'Online Language Academy: 2X Sales Surge',
          highlightMetric: '×2 Sales',
          metricLabel: 'Doubled sales in the very first month',
          budgetAndReturn: 'Positioning & conversion funnel overhaul',
          period: 'Month 1 collaboration',
          tags: ['SMM Strategy', 'Product Audit', 'Customer Journey', 'EdTech'],
          problemText: 'The school had invested in SMM, ads, and influencer collaborations—backed by the founder’s 25k personal blog—yet failed to grow sales by even 30%. The issue was product framing: courses began at $200+, and cold prospects couldn’t perceive enough tangible value for an immediate high-ticket commitment.',
          solutionText: 'We drafted an end-to-end SMM strategy and reconstructed the customer journey. Instead of generic slogans like “we are a great school,” we centered content around the core objection: “Why is it worth paying $200+ for this curriculum?”, showcasing proprietary methodology, alumni achievements, and faculty credentials.',
          resultSummary: 'Doubled enrollment in course packages within the first 30 days without increasing ad spend, purely through high-converting storytelling and crystal-clear value framing.',
          slides: [
            {
              id: 1,
              title: 'How strategic SMM doubled academy sales (2X)',
              subtitle: 'Fixing the funnel when everything seemed fine on the surface',
              category: 'creative',
              placeholderText: 'EdTech language academy case study cover',
              imageUrl: '/cases/case3/slide-1.webp'
            },
            {
              id: 2,
              title: 'Point A: High attention and traffic, but stagnant revenue',
              subtitle: '1.5k followers, 138k reach, and influencer shoutouts without sales',
              category: 'analytics',
              placeholderText: 'Account metrics at the start of engagement',
              imageUrl: '/cases/case3/slide-2.webp'
            },
            {
              id: 3,
              title: 'Product audit: Why prospects hesitated at the $200+ price tag',
              subtitle: 'Cold followers were unprepared to convert without structured proof',
              category: 'screenshot',
              placeholderText: 'Pinpointing buyer friction in the product offering',
              imageUrl: '/cases/case3/slide-3.webp'
            },
            {
              id: 4,
              title: 'SMM strategy & customer journey realignment',
              subtitle: 'Answering the burning question: “Why invest $200+ right here?”',
              category: 'creative',
              placeholderText: 'Customer decision pathway and strategic funnel map',
              imageUrl: '/cases/case3/slide-4.webp'
            },
            {
              id: 5,
              title: 'Reframing content creation: Demonstrating tangible outcomes',
              subtitle: 'Replacing hollow claims with concrete student transformation stories',
              category: 'creative',
              placeholderText: 'Sample high-converting Reels and pedagogical breakdowns',
              imageUrl: '/cases/case3/slide-5.webp'
            },
            {
              id: 6,
              title: 'Translating course features into personal learner value',
              subtitle: '“Not just a modern curriculum, but how it delivers your desired outcome”',
              category: 'creative',
              placeholderText: 'Converting academic features into emotional benefits',
              imageUrl: '/cases/case3/slide-6.webp'
            },
            {
              id: 7,
              title: 'The new role of Stories: Sequential objection-handling',
              subtitle: 'What is this? → Who is it for? → What pain does it resolve? → Why now?',
              category: 'creative',
              placeholderText: 'Daily strategic Stories architecture',
              imageUrl: '/cases/case3/slide-7.webp'
            },
            {
              id: 8,
              title: 'Revamped customer journey: From curiosity to enrollment',
              subtitle: 'Awareness → Understanding → Value recognition → Trust → Purchase',
              category: 'analytics',
              placeholderText: 'Decision-making progression diagram',
              imageUrl: '/cases/case3/slide-8.webp'
            },
            {
              id: 9,
              title: 'Results in 30 days: 2X growth across all core KPIs',
              subtitle: '289,491 reach, 3,880 active followers, and doubled course revenues',
              category: 'result',
              placeholderText: 'Account performance report demonstrating doubled revenue',
              imageUrl: '/cases/case3/slide-9.webp'
            },
            {
              id: 10,
              title: 'Core takeaway: The essence of strategic SMM',
              subtitle: 'Building communication entirely around what your buyer needs to decide',
              category: 'review',
              placeholderText: 'Strategic SMM philosophy demonstrated in the academy case',
              imageUrl: '/cases/case3/slide-10.webp'
            }
          ]
        }
      ]
    },
    services: {
      tag: 'Services & Engagement Formats',
      titleBefore: 'Choose the format tailored to your',
      titleHighlight: 'business goals',
      intro: 'From full turnkey social media management to focused 1-on-1 strategic audits on Zoom. No unneeded add-ons.',
      forWhoLabel: 'Best for:',
      data: [
        {
          id: 'smm-target',
          title: 'SMM + Paid Ads',
          badge: 'Integrated System',
          isPopular: true,
          targetAudience: 'For businesses seeking not merely a pretty feed or isolated ad boosts, but a consistent, predictable stream of qualified buyer leads.',
          description: 'Content and paid advertising operate as a single coordinated mechanism. Ads drive targeted prospects to your page, which is calibrated to welcome them: crystal-clear positioning, objection-dissolving content, and an obvious next action. In my team, strategy and media buying are aligned before spending the first dollar.',
          features: [
            'In-depth business, audience & competitor benchmarking',
            'Strategic SMM positioning & editorial content plan',
            'Full creative production: Reels, stories, copywriting & graphic design',
            'Campaign configuration, split-testing & daily Meta Ads optimization',
            'Comprehensive monthly analytics and revenue reports in one clear dashboard'
          ],
          ctaText: 'Select SMM + Paid Ads'
        },
        {
          id: 'smm-management',
          title: 'Full SMM Retainer',
          badge: 'Complete Delegation',
          isPopular: false,
          targetAudience: 'For founders and creators who want to fully delegate their Instagram presence and receive systematic, revenue-driven execution.',
          description: 'Before kickoff, I thoroughly dissect your product economics, market competitors, and existing page. Then I establish an ecosystem where every format plays an intentional role: some posts attract cold reach, others build unshakeable trust, and others close sales.',
          features: [
            'Brand positioning & comprehensive SMM strategy',
            'Content calendars & thematic content pillars',
            'Reels scripting, copywriting, and daily storytelling',
            'Visual identity, aesthetic layout & design assets',
            'Full production coordination and remote shoot briefs',
            'Day-to-day profile management & community engagement',
            'Monthly performance audits and iterative strategic adjustments'
          ],
          note: 'Content volume and format are customized to your specific business model and budget.',
          ctaText: 'Delegate My SMM'
        },
        {
          id: 'targeted-ads',
          title: 'Targeted Advertising',
          badge: 'Lead Generation',
          isPopular: false,
          targetAudience: 'For businesses needing high-intent customer inquiries from Meta Ads (Instagram & Facebook).',
          description: 'The technical setup and algorithmic bidding are handled by our dedicated media buyer, while I ensure the creative angle strictly serves your marketing goals: aligning the offer, audience psychology, and landing destination. We track not just raw clicks, but customer acquisition cost and buyer quality.',
          features: [
            'Market analysis, audience segmentation & product offer audit',
            'Paid advertising strategy with structured testing hypotheses',
            'Ad creative development & high-converting copywriting',
            'Campaign launch, budget pacing & algorithmic scaling',
            'Weekly metric reporting and actionable conversion recommendations'
          ],
          note: 'Ad spend budget is paid directly to Meta.',
          ctaText: 'Launch Ad Campaigns'
        },
        {
          id: 'strategy-session',
          title: 'Strategy Intensive',
          badge: '1-on-1 Deep Dive',
          isPopular: false,
          targetAudience: 'Sometimes you don’t need to outsource everything—you just need clarity on what is broken and an exact roadmap of what to fix.',
          description: 'No generic slide decks: every session is custom-engineered for your challenge. You complete a detailed brief, I spend 5–7 days auditing your assets and competitors, and we meet live on Zoom for an intensive roadmap session.',
          threeAudienceBreakdown: [
            {
              forWho: 'For Business Owners',
              text: 'Market positioning, offer clarity, creative angles, and resolving why traffic fails to convert.'
            },
            {
              forWho: 'For Creators & Experts',
              text: 'Brand authority, packaging high-ticket offers, and storytelling that establishes premium pricing power.'
            },
            {
              forWho: 'For Aspiring SMM Marketers',
              text: 'Real-world project teardown, strategy defense, analytics, and leveling up from content creator to strategic marketer.'
            }
          ],
          features: [
            '5–7 days of preliminary diagnostic analysis of your page & competitors',
            '1.5–2 hour live strategic working session on Zoom',
            'Session recording + interactive mind map or structured PDF roadmap',
            '7 days of follow-up messaging support for Q&A execution'
          ],
          ctaText: 'Book Strategic Intensive'
        }
      ]
    },
    calculator: {
      tag: 'Interactive Diagnostics',
      titleBefore: 'Express Diagnostics: Which format best fits your',
      titleHighlight: 'project?',
      intro: 'Answer 3 brief questions to receive an instant, personalized recommendation tailored to your niche and growth objectives.',
      step1Title: 'Step 1. Your niche:',
      step2Title: 'Step 2. Main roadblock right now:',
      step3Title: 'Step 3. Primary growth target:',
      niches: [
        { id: 'beauty', label: 'Beauty & Services' },
        { id: 'fashion', label: 'Fashion & Apparel' },
        { id: 'edtech', label: 'Online Education / EdTech' },
        { id: 'expert', label: 'Personal Brand / Creator' },
        { id: 'business', label: 'E-commerce & Products' },
      ],
      pains: [
        { id: 'leads', label: 'Posting regularly, but our inbox is quiet' },
        { id: 'ads_drain', label: 'Ads burn money; cost per lead is too high' },
        { id: 'no_system', label: 'No real system: chaotic, reactive posting' },
        { id: 'delegate', label: 'Want to fully delegate our social media' },
      ],
      goals: [
        { id: 'sales', label: 'Predictable, scalable sales (2X–10X ROAS)' },
        { id: 'audit', label: 'Uncover bottlenecks & get a clear roadmap' },
        { id: 'international', label: 'Expansion to US or European markets' },
      ],
      recBadge: 'Recommended format for you:',
      recTitle: 'Why this format fits your goals:',
      recReasonPrefix: '',
      ctaButton: 'Book a Free Strategy Breakdown',
      auditBadge: 'Fast Start & Strategic Audit',
      auditReason: 'You need an individualized audit and an actionable roadmap: identifying why current efforts stall and exactly how to fix your market positioning.',
      adsBadge: 'Reduce Lead Cost',
      adsReason: 'Our media buyer optimizes your cost per acquisition, while I align the ad offer with your profile so ads attract genuine high-paying buyers.',
      smmBadge: 'Complete Delegation',
      smmReason: 'Reclaim your executive focus: we take ownership of high-level strategy, Reels scripts, visual identity, production, and monthly analytics.',
      comboBadge: 'Maximum Commercial Impact',
      comboReason: 'Our flagship integrated system, where organic content and paid ads amplify one another without contractor friction. Built for maximum return on ad spend.'
    },
    faq: {
      tag: 'Frequently Asked Questions',
      titleBefore: 'Common questions before',
      titleHighlight: 'getting started',
      intro: 'Everything you need to know about our engagement formats, turnaround timelines, budgets, and commercial accountability.',
      haveQuestions: 'Have a specific question about your project?',
      writeAlina: 'Message Alina directly via Telegram or Instagram',
      chatTelegram: 'Telegram: @vlshavo',
      chatInstagram: 'Instagram: @vlsh.av',
      data: [
        {
          q: 'Why choose your team over a solo freelancer or a large agency?',
          a: 'At large agencies, your account is often passed to junior interns, while communication becomes slow and bureaucratic. Solo freelancers rarely possess the bandwidth to excel at high-level business strategy, creative copywriting, visual design, and sophisticated Meta Ads media buying simultaneously. In my team, I personally direct the strategy and brand narrative, while our experienced media buyer manages technical campaign optimization. You gain full-agency caliber at the agile price of a unified boutique team.'
        },
        {
          q: 'How soon can we expect to see tangible results?',
          a: 'Initial traction in the form of qualified inbound ad inquiries typically arrives within 1–2 weeks of campaign testing. Full commercial momentum and an established core of loyal recurring buyers solidify over the first month as organic content and targeted ads start compounding each other.'
        },
        {
          q: 'Do I have to record videos and write copy myself?',
          a: 'No. In our full-service management retainer, we take complete ownership of copywriting, creative scripts, and graphic design. When on-camera founder presence is required, I deliver turn-key minute-by-minute scripts and shot lists so your monthly filming takes just 1–2 relaxed hours instead of ongoing stress.'
        },
        {
          q: 'What happens during the free strategy session?',
          a: 'It is a 20–30 minute Zoom consultation or focused Telegram voice exchange where we get acquainted, audit your current profile, identify revenue leaks, and determine the exact roadmap and format that will yield the highest return for your goals.'
        },
        {
          q: 'Which industries and niches do you work with?',
          a: 'We possess verified case studies in fashion, beauty & aesthetics, online education (EdTech), infobusiness, expert personal brands, and local services across the United States, Europe, and Ukraine.'
        }
      ]
    },
    footer: {
      ctaBanner: {
        badge: 'Ready to scale your sales?',
        badgeSubtitle: 'Bookings open for this week',
        titleBefore: 'Make social media a',
        titleHighlight: 'predictable',
        titleAfter: 'source of client revenue',
        desc: 'Say goodbye to random posting and wasted budgets. Let’s audit your growth bottlenecks and map out a step-by-step roadmap to profitable growth.',
        point1: '30-minute Zoom call',
        point2: 'Profile express audit',
        point3: 'Zero pressure or sales pitch',
        btnBook: 'Book a Free Strategy Session',
        btnTelegram: 'Message on Telegram'
      },
      desc: 'Full-service SMM & performance advertising for businesses and creators. Building high-converting client journeys from the very first impression to closed deals.',
      quickLinksTitle: 'Navigation',
      servicesTitle: 'Services',
      contactsTitle: 'Contact Alina',
      copyright: 'All rights reserved.',
      allRightsReserved: 'SMM Strategist Alina Voloshyna & Team'
    },
    bookingModal: {
      title: 'Book a Free Strategy Session',
      subtitle: 'Leave your details — I will reach out within 2–3 hours to schedule a convenient time for our meeting and express audit of your profile.',
      nameLabel: 'Your Name *',
      namePlaceholder: 'How should we address you?',
      contactLabel: 'Phone / Telegram *',
      contactPlaceholder: '+1... or @username',
      instagramLabel: 'Instagram Project Handle',
      instagramPlaceholder: '@your_brand or link',
      nicheLabel: 'Your Niche / Industry',
      nicheOptions: [
        'Beauty & Aesthetics',
        'Fashion & Showroom',
        'Online Education (EdTech)',
        'Expert / Personal Brand',
        'E-commerce & Consumer Goods',
        'Other Industry'
      ],
      serviceLabel: 'Service of Interest',
      serviceOptions: [
        'Free Strategy Session',
        'SMM + Paid Ads (Integrated System)',
        'Full SMM Retainer (Complete Delegation)',
        'Targeted Ads (Lead Generation)',
        'Strategy Intensive (1-on-1 Audit)'
      ],
      commentLabel: 'Brief note on your goals or current ad spend',
      commentPlaceholder: 'Describe your current situation or core question...',
      btnSubmit: 'Submit Application',
      btnSubmitting: 'Submitting...',
      successTitle: 'Application successfully sent!',
      successMessage: 'Thank you for your trust! I have received your request and will message you via your preferred channel shortly.',
      btnTelegramDirect: 'Message Alina on Telegram directly',
      directNotice: 'If your inquiry is urgent, feel free to text Alina directly:',
      btnClose: 'Close',
      privacyNotice: 'Your contact details are strictly used to coordinate our strategic collaboration.'
    }
  }
}
