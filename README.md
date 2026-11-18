# Alina Voloshina — SMM & Marketing Luxury Web Platform (V3.0 BDB Edition)

Елітний веб-сайт маркетингової агенції та персонального бренду Аліни Волошиної (SMM & Performance Marketing). Реалізований у стилістиці та якості Awwwards (рівень Billion Dollar Boy / Rolex).

[![React](https://img.shields.io/badge/React-19.0-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88ce02?logo=greensock)](https://greensock.com/)
[![Lenis](https://img.shields.io/badge/Lenis-Scroll-black)](https://github.com/darkroomengineering/lenis)

---

## ✦ Особливості та Технології

- **Dynamic Background Color Morphing:** Безшовні переходи кольорів (`#FAF7F2` айворі / беж ↔ `#0B1021` преміальний midnight navy) на глобальному контейнері через GSAP ScrollTrigger без різких швів та сірих смуг.
- **Lenis Smooth Momentum Scrolling:** Ультра-плавний інерційний скролл із підтримкою доступності (`prefers-reduced-motion`).
- **Interactive Case Deck (Кейси):** Слайд-інспектор із перемикачем «Точка А / Система Волошиної», інтерактивними табами, 100% видимістю на всіх розширеннях та адаптивним переглядом.
- **3D Interactive Wheel (Вектори системи):** Інтерактивне колесо з селектором ключових векторів маркетингу.
- **Custom Liquid Magnetic Cursor:** Кастомний курсор із магнітним ефектом, взаємодією з кнопками та делікатним слідом.
- **A11y & WCAG 2.1 AA:** Повна клавіатурна навігація, коректні ARIA-мітки, блокування фокусу в мобільному меню, відсутність горизонтального скролу (0px overflow).
- **Vercel Serverless Function & Telegram Lead Notification:** Автоматичні сповіщення про візити та заявки у Telegram.

---

## ✦ Швидкий запуск (Quick Start)

### 1. Клонування репозиторію
```bash
git clone https://github.com/rellik491-design/alina-smm.git
cd alina-smm
```

### 2. Встановлення залежностей
```bash
npm install
```

### 3. Налаштування змінних оточення (за бажанням)
Створіть файл `.env` на основі `.env.example`:
```bash
cp .env.example .env
```
Заповніть ваші Telegram Bot Token та Chat ID для отримання лідів.

### 4. Запуск локального сервера розробки
```bash
npm run dev
```
Відкрийте у браузері: [http://localhost:5173](http://localhost:5173)

---

## ✦ Скрипти проекту

| Команда | Опис |
|---------|------|
| `npm run dev` | Запуск сервера розробки Vite з HMR |
| `npm run build` | Повна перевірка типів TypeScript та оптимізований production build |
| `npm run preview` | Локальний попередній перегляд production збірки |
| `npm run lint` | Швидка перевірка лінтером Oxlint |

---

## ✦ Структура проекту

```
alina-smm/
├── public/                 # Статичні ассети, фото кейсів, іконки, брендинг
├── src/
│   ├── components/         # React-компоненти інтерфейсу
│   │   ├── BdbHero.tsx                 # Головний екран із типографікою
│   │   ├── BdbExpertise.tsx            # Експертиза та результати
│   │   ├── BdbCapabilities.tsx         # Послуги та вартість (Dark luxury)
│   │   ├── BdbWorks.tsx                # Інтерактивна колода кейсів
│   │   ├── BdbInteractiveWheel.tsx     # Інтерактивне колесо векторів
│   │   ├── BdbApproach.tsx             # Підхід та філософія
│   │   ├── BdbInquiries.tsx            # Форма заявки та зворотного зв'язку
│   │   ├── BdbNavbar.tsx               # Фіксоване меню з мобільним дровером
│   │   ├── BdbFooter.tsx               # Підвал сайту
│   │   ├── CustomCursor.tsx            # Плавний курсор
│   │   ├── DynamicBackgroundController.tsx # GSAP контролер зміни кольорів
│   │   └── SmoothScrollProvider.tsx    # Lenis провайдер скролу
│   ├── App.tsx             # Головний компонент із маршрутами та секціями
│   ├── main.tsx            # Точка входу додатку
│   └── index.css           # Tailwind стилі, шрифти та кастомні ефекти
├── api/                    # Vercel Serverless функція для лідів
├── .antigravityrules       # Системні стандарти коду та Awwwards анімацій
├── .cursorrules            # Правила для редактора коду
├── package.json            # Залежності проекту
└── vite.config.ts          # Конфігурація збірки
```

---

## ✦ Деплой на Vercel

Проект повністю оптимізований для деплою в один клік:
1. Зайдіть на [vercel.com](https://vercel.com) та натисніть **Add New Project**.
2. Оберіть репозиторій `alina-smm`.
3. У блоці **Environment Variables** вкажіть змінні з `.env`.
4. Натисніть **Deploy**.

---

© 2026 Alina Voloshina. Розроблено для елітного позиціонування персонального бренду.
