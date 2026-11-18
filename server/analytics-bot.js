import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env manually
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.VITE_TELEGRAM_BOT_TOKEN || '8837959727:AAGW7vreMEddZ2_ur2mggdz9dP9X8JAhzdQ';
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || process.env.VITE_TELEGRAM_CHAT_ID || '879689668';
const PORT = parseInt(process.env.ANALYTICS_PORT || '3001', 10);
const DATA_FILE = path.resolve(__dirname, 'data/analytics.json');
const BASE_DOMAIN = 'https://smmbyvlsh.com';

// Ensure data folder and file exist
if (!fs.existsSync(path.dirname(DATA_FILE))) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ visits: [], leads: [] }, null, 2), 'utf-8');
}

// In-memory anti-spam notification tracking
const lastNotificationMap = new Map();
const notifiedHotLeads = new Set();
let lastDigestSentDate = '';
const NOTIFICATION_COOLDOWN_MS = 15 * 60 * 1000;

export const SECTION_ORDER = [
  'hero',
  'stats',
  'approach',
  'cases',
  'services',
  'calculator',
  'about',
  'faq',
  'footer'
];

export const SECTION_NAMES = {
  hero: '🔝 Головний екран (Hero)',
  stats: '📊 Метрики та переваги',
  about: '👤 Про Аліну Волошину',
  approach: '💡 Філософія та підхід',
  cases: '💼 Кейси та результати',
  services: '🛠 Послуги та ціни',
  calculator: '🧮 Калькулятор вартості',
  faq: '❓ Часті запитання (FAQ)',
  footer: '🔻 Футер (Контакти)',
  booking: '📝 Форма запису на сесію'
};

const UTM_PRESETS = [
  { slug: 'ig_stories', label: '📸 Instagram Stories', desc: 'Для стікерів-посилань у сторіс' },
  { slug: 'ig_reels', label: '🎬 Instagram Reels', desc: 'Для закріплених посилань у Reels' },
  { slug: 'ig_bio', label: '👤 Instagram Bio', desc: 'Для шапки профілю Instagram' },
  { slug: 'tiktok', label: '🎵 TikTok', desc: 'Для біо або коментарів у TikTok' },
  { slug: 'blogger', label: '📢 Реклама у блогера', desc: 'Для відстеження колаборацій та реклами' },
  { slug: 'dm', label: '💬 Direct / Особисті', desc: 'Для відправки клієнтам у приватні повідомлення' },
  { slug: 'threads', label: '🧵 Threads', desc: 'Для постів у Threads' },
  { slug: 'facebook', label: '🌐 Facebook', desc: 'Для сторінки або таргетингу FB' }
];

function formatDuration(sec = 0) {
  const s = Math.max(0, Math.round(sec));
  if (s < 60) return `${s} сек`;
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m} хв ${rem} сек`;
}

function getKyivTime(date = new Date()) {
  return new Intl.DateTimeFormat('uk-UA', {
    timeZone: 'Europe/Kyiv',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date);
}

function getKyivDateString(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Kyiv',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
}

function escapeHtml(text = '') {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function loadAnalytics() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!parsed.visits) parsed.visits = [];
    if (!parsed.leads) parsed.leads = [];
    return parsed;
  } catch (err) {
    console.error('Error loading analytics:', err);
    return { visits: [], leads: [] };
  }
}

function saveAnalytics(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving analytics:', err);
  }
}

async function sendTelegramMessage(chatId, text, replyMarkup = null) {
  try {
    const payload = {
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true
    };
    if (replyMarkup) {
      payload.reply_markup = replyMarkup;
    }
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch (err) {
    console.error('Failed to send Telegram message:', err);
    return null;
  }
}

async function editTelegramMessage(chatId, messageId, text, replyMarkup = null) {
  try {
    const payload = {
      chat_id: chatId,
      message_id: messageId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true
    };
    if (replyMarkup) {
      payload.reply_markup = replyMarkup;
    }
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/editMessageText`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch (err) {
    console.error('Failed to edit Telegram message:', err);
    return null;
  }
}

async function answerCallbackQuery(callbackQueryId, text = '') {
  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        callback_query_id: callbackQueryId,
        text
      })
    });
  } catch {
    // Ignore
  }
}

function makeProgressBar(percent, totalBars = 10) {
  const filled = Math.min(totalBars, Math.max(0, Math.round((percent / 100) * totalBars)));
  const empty = totalBars - filled;
  return '█'.repeat(filled) + '░'.repeat(empty);
}

// 1. Funnel & Drop-off Report
export function generateFunnelReport(period = 'all') {
  const store = loadAnalytics();
  const visits = store.visits || [];

  if (visits.length === 0) {
    return `📉 <b>ВОРОНКА ДОСКРОЛУ ТА ВІДСІВУ САЙТУ ALINA SMM</b>\n\nПоки що немає даних відвідувачів. Щойно гості почнуть скролити сайт, тут сформується точна воронка!`;
  }

  const todayStr = getKyivDateString(new Date());
  let targetVisits = visits;
  if (period === 'today') {
    targetVisits = visits.filter(v => getKyivDateString(new Date(v.timestamp)) === todayStr);
  }

  const total = targetVisits.length;
  if (total === 0) {
    return `📉 <b>ВОРОНКА ДОСКРОЛУ ЗА СЬОГОДНІ</b>\n\nСьогодні відвідувачів ще не було. Щойно хтось відкриє сайт — з'явиться детальний зріз!`;
  }

  const stages = [
    { id: 'hero', name: '🔝 Головний екран' },
    { id: 'approach', name: '💡 Філософія та підхід' },
    { id: 'cases', name: '💼 Кейси та результати' },
    { id: 'services', name: '🛠 Послуги та ціни' },
    { id: 'calculator', name: '🧮 Калькулятор вартості' },
    { id: 'about', name: '👤 Про Аліну (Бренд & Фото)' },
    { id: 'faq', name: '❓ Часті запитання (FAQ)' },
    { id: 'booking', name: '📝 Відкрили форму запису' }
  ];

  const counts = {};
  for (const s of stages) counts[s.id] = 0;
  const dropOffCounts = {};

  for (const v of targetVisits) {
    const deepest = v.deepestSection || 'hero';
    let deepestIdx = SECTION_ORDER.indexOf(deepest);
    if (deepestIdx === -1) deepestIdx = 0;

    if (deepestIdx >= SECTION_ORDER.indexOf('hero')) counts.hero++;
    if (deepestIdx >= SECTION_ORDER.indexOf('about')) counts.about++;
    if (deepestIdx >= SECTION_ORDER.indexOf('approach')) counts.approach++;
    if (deepestIdx >= SECTION_ORDER.indexOf('cases')) counts.cases++;
    if (deepestIdx >= SECTION_ORDER.indexOf('services')) counts.services++;
    if (deepestIdx >= SECTION_ORDER.indexOf('calculator')) counts.calculator++;
    if (deepestIdx >= SECTION_ORDER.indexOf('faq')) counts.faq++;

    const hasBooking = (v.interactions || []).some(i => i.startsWith('opened_booking_modal'));
    if (hasBooking) counts.booking++;

    const exit = v.exitSection || deepest;
    const exitName = SECTION_NAMES[exit] || exit;
    dropOffCounts[exitName] = (dropOffCounts[exitName] || 0) + 1;
  }

  let funnelText = '';
  stages.forEach((st, idx) => {
    const count = counts[st.id] || 0;
    const pct = Math.round((count / total) * 100);
    const bar = makeProgressBar(pct, 10);
    
    let dropNotice = '';
    if (idx > 0 && idx < stages.length - 1) {
      const prevCount = counts[stages[idx - 1].id] || 0;
      const lost = prevCount - count;
      if (lost > 0) {
        dropNotice = ` • <i>відсів: -${lost}</i>`;
      }
    }

    funnelText += `${idx + 1}. <b>${st.name}:</b>\n` +
      `   <code>${bar}</code> <b>${pct}%</b> (${count}/${total})${dropNotice}\n\n`;
  });

  const sortedDropOffs = Array.from(Object.entries(dropOffCounts))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  let dropOffText = '';
  sortedDropOffs.forEach(([name, count], idx) => {
    const pct = Math.round((count / total) * 100);
    dropOffText += `${idx + 1}. <b>${name}</b> — <b>${count}</b> (${pct}% виходів)\n`;
  });

  const totalDuration = targetVisits.reduce((acc, v) => acc + (v.timeSpent || 0), 0);
  const avgDuration = Math.round(totalDuration / total);
  const bounces = targetVisits.filter(v => (v.timeSpent || 0) < 10).length;
  const bouncePct = Math.round((bounces / total) * 100);

  return `📉 <b>ВОРОНКА ДОСКРОЛУ ТА ВІДСІВУ (FUNNEL)</b>
${period === 'today' ? '📅 <i>Зріз за сьогоднішній день</i>' : '📈 <i>Загальна воронка за весь час</i>'}

👥 <b>Всього сесій:</b> <b>${total}</b>
⏱ <b>Середній час на сайті:</b> <b>${formatDuration(avgDuration)}</b>
⚡️ <b>Швидкий відхід (< 10 сек):</b> <b>${bouncePct}%</b> (${bounces})

📊 <b>ЕТАПИ ВОРОНКИ (КОНВЕРСІЯ ДОСКРОЛУ):</b>
${funnelText}
🚪 <b>ДЕ НАЙЧАСТІШЕ ВІДСІЮЮТЬСЯ (ТОП ТОЧОК ВИХОДУ):</b>
${dropOffText || '• Дані формуються...\n'}
💡 <i>Порада: якщо багато виходів на блоці «Кейси» — перевір оффер або заклик до дії одразу після них!</i>`;
}

// 2. Full Analytics Report
export function generateAnalyticsReport(period = 'all') {
  const store = loadAnalytics();
  const visits = store.visits || [];

  if (visits.length === 0) {
    return `📊 <b>АНАЛІТИКА ВІДВІДУВАНЬ САЙТУ ALINA SMM</b>\n\nПоки що немає зареєстрованих відвідувачів. Щойно хтось відкриє сайт, тут з'явиться детальна статистика!`;
  }

  const todayStr = getKyivDateString(new Date());
  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

  let targetVisits = visits;
  if (period === 'today') {
    targetVisits = visits.filter(v => getKyivDateString(new Date(v.timestamp)) === todayStr);
  }

  const totalVisits = targetVisits.length;
  const uniqueIps = new Set(targetVisits.map(v => v.ip)).size;

  const todayVisits = visits.filter(v => getKyivDateString(new Date(v.timestamp)) === todayStr).length;
  const weekVisits = visits.filter(v => new Date(v.timestamp).getTime() >= sevenDaysAgo).length;

  const totalDuration = targetVisits.reduce((acc, v) => acc + (v.timeSpent || 0), 0);
  const avgDuration = totalVisits > 0 ? Math.round(totalDuration / totalVisits) : 0;
  const totalScroll = targetVisits.reduce((acc, v) => acc + (v.maxScrollPercent || 0), 0);
  const avgScroll = totalVisits > 0 ? Math.round(totalScroll / totalVisits) : 0;

  const bookingOpens = targetVisits.filter(v => (v.interactions || []).some(i => i.startsWith('opened_booking_modal'))).length;
  const bookingRate = totalVisits > 0 ? Math.round((bookingOpens / totalVisits) * 100) : 0;

  // Geography
  const countryMap = new Map();
  for (const v of targetVisits) {
    const cName = v.country || 'Невизначено';
    const cFlag = v.flag || '🌐';
    const key = `${cFlag} ${cName}`;
    if (!countryMap.has(key)) {
      countryMap.set(key, { count: 0, cities: new Map() });
    }
    const cEntry = countryMap.get(key);
    cEntry.count++;
    const cityName = v.city || 'Інше місто';
    cEntry.cities.set(cityName, (cEntry.cities.get(cityName) || 0) + 1);
  }

  const sortedCountries = Array.from(countryMap.entries())
    .sort((a, b) => b[1].count - a[1].count);

  let geoText = '';
  sortedCountries.slice(0, 5).forEach(([cName, data], idx) => {
    const sortedCities = Array.from(data.cities.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([city, count]) => `${city}: ${count}`)
      .join(', ');
    geoText += `${idx + 1}. <b>${cName}</b> — <b>${data.count}</b> (${sortedCities || 'місто не визначено'})\n`;
  });

  // Devices & Referrers (with UTM grouping)
  const deviceCounts = { mobile: 0, desktop: 0, tablet: 0 };
  const referrerCounts = new Map();

  for (const v of targetVisits) {
    const dType = v.deviceType || 'desktop';
    deviceCounts[dType] = (deviceCounts[dType] || 0) + 1;
    const ref = v.referrer || 'Прямий захід';
    referrerCounts.set(ref, (referrerCounts.get(ref) || 0) + 1);
  }

  const mobilePct = totalVisits > 0 ? Math.round((deviceCounts.mobile / totalVisits) * 100) : 0;
  const desktopPct = 100 - mobilePct;
  const topReferrers = Array.from(referrerCounts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const lastVisit = visits[visits.length - 1];
  const lastTime = lastVisit ? getKyivTime(new Date(lastVisit.timestamp)) : '—';
  const lastLoc = lastVisit ? `${lastVisit.flag || '📍'} ${lastVisit.city ? lastVisit.city + ', ' : ''}${lastVisit.country || 'Локація'}` : '—';
  const lastDev = lastVisit ? `${lastVisit.os || ''} • ${lastVisit.browser || ''}` : '—';
  const lastTimeSpent = lastVisit ? formatDuration(lastVisit.timeSpent || 0) : '—';

  return `📊 <b>АНАЛІТИКА ВІДВІДУВАНЬ САЙТУ ALINA SMM</b>
${period === 'today' ? '📅 <i>Звіт за сьогоднішній день</i>' : '📈 <i>Загальний звіт за весь час</i>'}

👥 <b>Всього сесій:</b> <b>${totalVisits}</b>
👤 <b>Унікальних відвідувачів (IP):</b> <b>${uniqueIps}</b>

⏱ <b>Середній час на сайті:</b> <b>${formatDuration(avgDuration)}</b>
⚡️ <b>Середня глибина скролу:</b> <b>${avgScroll}%</b>
🎯 <b>Відкрили форму запису:</b> <b>${bookingOpens}</b> (конверсія <b>${bookingRate}%</b>)

📅 <b>Динаміка візитів:</b>
• Сьогодні: <b>${todayVisits}</b>
• За 7 днів: <b>${weekVisits}</b>
• За весь час: <b>${visits.length}</b>

🌍 <b>Географія відвідувачів:</b>
${geoText || '• Дані про географію збираються...\n'}
📱 <b>Пристрої:</b>
• 📱 Мобільні: <b>${mobilePct}%</b> (${deviceCounts.mobile})
• 💻 Комп'ютери: <b>${desktopPct}%</b> (${deviceCounts.desktop})

🔗 <b>Джерела переходів та UTM:</b>
${topReferrers.map(([ref, count]) => `• ${ref}: <b>${count}</b>`).join('\n')}

🕒 <b>Останній відвідувач:</b>
📍 ${lastLoc}
📱 ${lastDev}
⏱ Провів на сайті: <b>${lastTimeSpent}</b>
⏰ ${lastTime} (Київ)`;
}

// 3. Morning Daily Digest Report
export function generateDailyDigest(targetDate = new Date(Date.now() - 24 * 60 * 60 * 1000)) {
  const store = loadAnalytics();
  const visits = store.visits || [];
  const targetDateStr = getKyivDateString(targetDate);

  const dayVisits = visits.filter(v => getKyivDateString(new Date(v.timestamp)) === targetDateStr);
  const total = dayVisits.length;

  if (total === 0) {
    return `☀️ <b>РАНКОВИЙ ДАЙДЖЕСТ САЙТУ (ALINA SMM)</b>
📅 <i>Звіт за ${targetDateStr}</i>

Вчора на сайті не було нових відвідувачів.
Чудовий день, щоб опублікувати новий Stories або Reels з посиланням на сайт! 🚀`;
  }

  const uniqueIps = new Set(dayVisits.map(v => v.ip)).size;
  const totalDuration = dayVisits.reduce((acc, v) => acc + (v.timeSpent || 0), 0);
  const avgDuration = Math.round(totalDuration / total);
  const avgScroll = Math.round(dayVisits.reduce((acc, v) => acc + (v.maxScrollPercent || 0), 0) / total);

  const bookingOpens = dayVisits.filter(v => (v.interactions || []).some(i => i.startsWith('opened_booking_modal'))).length;

  // Top source
  const sourceMap = new Map();
  for (const v of dayVisits) {
    const s = v.referrer || 'Прямий захід';
    sourceMap.set(s, (sourceMap.get(s) || 0) + 1);
  }
  const topSource = Array.from(sourceMap.entries()).sort((a, b) => b[1] - a[1])[0];

  // Top exit
  const exitMap = new Map();
  for (const v of dayVisits) {
    const e = SECTION_NAMES[v.exitSection] || v.exitSection || 'Головний екран';
    exitMap.set(e, (exitMap.get(e) || 0) + 1);
  }
  const topExit = Array.from(exitMap.entries()).sort((a, b) => b[1] - a[1])[0];

  return `☀️ <b>РАНКОВИЙ ДАЙДЖЕСТ САЙТУ ALINA SMM</b>
📅 <i>Підсумок за ${targetDateStr}</i>

👥 <b>Відвідувачів за день:</b> <b>${total}</b> (унікальних: <b>${uniqueIps}</b>)
⏱ <b>Середній час на сайті:</b> <b>${formatDuration(avgDuration)}</b>
⚡️ <b>Середня глибина скролу:</b> <b>${avgScroll}%</b>
🎯 <b>Відкрили форму запису:</b> <b>${bookingOpens}</b> ${bookingOpens > 0 ? '🔥' : ''}

🏆 <b>Головне джерело трафіку:</b>
• ${topSource ? `${topSource[0]} (${topSource[1]} переходів)` : 'Прямі візити'}

🚪 <b>Основна точка відсіву:</b>
• ${topExit ? `${topExit[0]} (${topExit[1]} виходів)` : '—'}

Вдалого та продуктивного дня, Аліно! ✨`;
}

// 4. Recent Visitors Detailed Cards
export function generateRecentVisitorsList(limit = 6) {
  const store = loadAnalytics();
  const visits = store.visits || [];

  if (visits.length === 0) {
    return `ℹ️ Поки немає зареєстрованих відвідувачів.`;
  }

  const recent = visits.slice(-limit).reverse();

  let text = `🕒 <b>ОСТАННІ ${recent.length} ВІДВІДУВАЧІВ САЙТУ:</b>\n\n`;
  recent.forEach((v, idx) => {
    const time = getKyivTime(new Date(v.timestamp));
    const deepestName = SECTION_NAMES[v.deepestSection] || v.deepestSection || 'Головний екран';
    const exitName = SECTION_NAMES[v.exitSection] || v.exitSection || deepestName;
    const duration = formatDuration(v.timeSpent || 0);

    const hasBooking = (v.interactions || []).some(i => i.startsWith('opened_booking_modal'));

    text += `<b>${idx + 1}. ${v.flag || '📍'} ${v.city ? v.city + ', ' : ''}${v.country || 'Країна'}</b> ${hasBooking ? '🔥' : ''}\n`;
    text += `🌐 IP: <code>${v.ip}</code>${v.isp ? ` (${v.isp})` : ''}\n`;
    text += `⏱ Час на сайті: <b>${duration}</b>\n`;
    text += `📜 Дійшов до: <b>${deepestName}</b> (${v.maxScrollPercent || 0}%)\n`;
    text += `🚪 Вийшов у блоці: <i>${exitName}</i>\n`;
    text += `📱 ${v.os || 'OS'} • ${v.browser || 'Browser'} (${v.screen || 'екран'})\n`;
    text += `🔗 Джерело: ${v.referrer || 'Direct'}\n`;
    text += `⏰ Час: ${time}\n\n`;
  });

  return text;
}

// 5. UTM Generator Interface
function getUtmMenuKeyboard() {
  return {
    inline_keyboard: [
      [
        { text: '📸 Instagram Stories', callback_data: 'utm_ig_stories' },
        { text: '🎬 Instagram Reels', callback_data: 'utm_ig_reels' }
      ],
      [
        { text: '👤 Instagram Bio', callback_data: 'utm_ig_bio' },
        { text: '🎵 TikTok', callback_data: 'utm_tiktok' }
      ],
      [
        { text: '📢 Реклама у блогера', callback_data: 'utm_blogger' },
        { text: '💬 Direct / Особисті', callback_data: 'utm_dm' }
      ],
      [
        { text: '🧵 Threads', callback_data: 'utm_threads' },
        { text: '🌐 Facebook', callback_data: 'utm_facebook' }
      ]
    ]
  };
}

function generateUtmCard(presetSlug) {
  const preset = UTM_PRESETS.find(p => p.slug === presetSlug) || {
    slug: presetSlug,
    label: `🔗 Канал: ${presetSlug}`,
    desc: 'Індивідуальне промо-посилання'
  };

  const link = `${BASE_DOMAIN}/?utm_source=${preset.slug}`;

  return `🔗 <b>ГОТОВЕ UTM-ПОСИЛАННЯ ДЛЯ ${preset.label.toUpperCase()}:</b>

<code>${link}</code>

📋 <i>Натисни на посилання вище, щоб миттєво скопіювати його в буфер обміну!</i>
ℹ️ <i>${preset.desc}</i>

📊 <b>Як це працює:</b>
1. Коли людина перейде за цим посиланням, у сповіщенні бот напише:
   «🔗 Джерело: ${preset.label} (UTM)»
2. У воронці /funnel та аналітиці /analytics цей канал підраховується окремо!`;
}

// Keyboards
function getCommonInlineKeyboard(currentCmd = 'all') {
  return {
    inline_keyboard: [
      [
        { text: currentCmd === 'analytics' ? '🔘 Вся аналітика' : '📊 Вся аналітика', callback_data: 'cmd_analytics' },
        { text: currentCmd === 'funnel' ? '🔘 Воронка відсіву' : '📉 Воронка відсіву', callback_data: 'cmd_funnel' }
      ],
      [
        { text: currentCmd === 'utm' ? '🔘 UTM-посилання' : '🔗 UTM-посилання', callback_data: 'cmd_utm' },
        { text: currentCmd === 'digest' ? '🔘 Ранковий дайджест' : '☀️ Дайджест', callback_data: 'cmd_digest' }
      ],
      [
        { text: currentCmd === 'today' ? '🔘 За сьогодні' : '📅 За сьогодні', callback_data: 'cmd_today' },
        { text: currentCmd === 'recent' ? '🔘 Останні сесії' : '👥 Останні сесії', callback_data: 'cmd_recent' }
      ],
      [
        { text: '🔄 Оновити дані', callback_data: `cmd_refresh_${currentCmd}` }
      ]
    ]
  };
}

function getReplyMenuKeyboard() {
  return {
    keyboard: [
      [{ text: '📊 Аналітика' }, { text: '📉 Воронка відсіву' }],
      [{ text: '🔗 Створити UTM-посилання' }, { text: '☀️ Ранковий дайджест' }],
      [{ text: '📅 За сьогодні' }, { text: '👥 Останні гості' }],
      [{ text: 'ℹ️ Довідка' }]
    ],
    resize_keyboard: true
  };
}

// HTTP Server for handling /api/visit from local dev & proxies
const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  // Health check API
  if (req.method === 'GET' && url.pathname === '/api/analytics') {
    const store = loadAnalytics();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      total: store.visits.length,
      unique: new Set(store.visits.map(v => v.ip)).size,
      recent: store.visits.slice(-10)
    }));
    return;
  }

  // Receive visitor telemetry
  if (req.method === 'POST' && url.pathname === '/api/visit') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const action = payload.action || 'start';

        let rawIp = payload.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
        if (rawIp.includes(',')) rawIp = rawIp.split(',')[0].trim();
        rawIp = rawIp.replace(/^::ffff:/, '');

        let country = payload.country || '';
        let city = payload.city || '';
        let flag = payload.flag || '🌐';
        let isp = payload.isp || '';

        const store = loadAnalytics();
        const existingSession = store.visits.find(v => v.id === payload.sessionId);

        // 1. ACTION: START
        if (action === 'start') {
          const isUnique = !store.visits.some(v => v.ip === rawIp);
          const timeStr = getKyivTime();

          const record = {
            id: payload.sessionId || `v_${Date.now()}`,
            timestamp: new Date().toISOString(),
            ip: rawIp,
            country: country || 'Невизначено',
            city: city || '',
            flag: flag || '🌐',
            isp: isp || '',
            deviceType: payload.deviceType || 'desktop',
            os: payload.os || 'Unknown OS',
            browser: payload.browser || 'Unknown Browser',
            screen: payload.screen || '',
            language: payload.language || 'uk',
            referrer: payload.referrer || 'Direct',
            path: payload.path || '/',
            timeSpent: 0,
            maxScrollPercent: 0,
            deepestSection: 'hero',
            exitSection: 'hero',
            interactions: [],
            isUnique
          };

          store.visits.push(record);
          saveAnalytics(store);

          const lastNotif = lastNotificationMap.get(rawIp) || 0;
          const now = Date.now();
          let messageId = null;

          if ((now - lastNotif) > NOTIFICATION_COOLDOWN_MS) {
            lastNotificationMap.set(rawIp, now);

            const alertMessage = `👀 <b>НОВИЙ ВІДВІДУВАЧ НА САЙТІ!</b> 🟢\n\n` +
              `📍 <b>Локація:</b> ${record.flag} ${record.city ? record.city + ', ' : ''}${record.country}\n` +
              `🌐 <b>IP:</b> <code>${record.ip}</code>\n` +
              `🏢 <b>Провайдер:</b> ${escapeHtml(record.isp || 'Невідомо')}\n` +
              `📱 <b>Пристрій:</b> ${escapeHtml(record.os)} • <i>${record.deviceType === 'mobile' ? 'Мобільний' : 'Комп\'ютер'}</i>\n` +
              `🖥 <b>Браузер:</b> ${escapeHtml(record.browser)} (${escapeHtml(record.screen)})\n` +
              `🗣 <b>Мова:</b> ${escapeHtml(record.language)}\n` +
              `🔗 <b>Джерело:</b> ${escapeHtml(record.referrer)}\n\n` +
              `📊 <b>АКТИВНІСТЬ:</b>\n` +
              `⏱ <b>Час на сайті:</b> <i>зараз читає...</i>\n` +
              `📜 <b>Поточний блок:</b> 🔝 Головний екран (Hero)\n` +
              `⏰ <b>Час:</b> ${timeStr} (Київ)\n` +
              `${isUnique ? '✨ <i>Унікальний відвідувач!</i>' : '🔄 <i>Повторний візит</i>'}`;

            const tgRes = await sendTelegramMessage(CHAT_ID, alertMessage);
            messageId = tgRes?.result?.message_id || null;
          }

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, messageId }));
          return;
        }

        // 2. ACTION: HEARTBEAT or EXIT
        if (existingSession) {
          existingSession.timeSpent = payload.timeSpent || existingSession.timeSpent;
          existingSession.maxScrollPercent = Math.max(existingSession.maxScrollPercent || 0, payload.maxScrollPercent || 0);
          existingSession.deepestSection = payload.deepestSection || existingSession.deepestSection;
          existingSession.exitSection = payload.exitSection || payload.currentSection || existingSession.exitSection;
          existingSession.interactions = Array.from(new Set([
            ...(existingSession.interactions || []),
            ...(payload.interactions || [])
          ]));

          saveAnalytics(store);

          const targetMessageId = payload.messageId;
          if (targetMessageId) {
            const isExit = action === 'exit';
            const timeStr = getKyivTime();
            const timeSpent = existingSession.timeSpent;
            const deepestName = SECTION_NAMES[existingSession.deepestSection] || existingSession.deepestSection;
            const exitName = SECTION_NAMES[existingSession.exitSection] || existingSession.exitSection;
            const currentName = SECTION_NAMES[payload.currentSection] || payload.currentSection || deepestName;

            const hasBooking = existingSession.interactions.some(i => i.startsWith('opened_booking_modal'));
            let statusBadge = '👀 <b>Перегляд сайту</b>';
            if (hasBooking) statusBadge = '🔥 <b>ГАРЯЧИЙ ЛІД (відкрив форму запису)</b>';
            else if (timeSpent >= 90) statusBadge = '⭐️ <b>Висока залученість (> 1.5 хв)</b>';
            else if (timeSpent >= 30) statusBadge = '⚡️ <b>Активний перегляд</b>';
            else if (timeSpent < 10 && isExit) statusBadge = '⚪️ <b>Швидкий відхід (< 10 сек)</b>';

            const updatedMsg = `👀 <b>ВІДВІДУВАЧ НА САЙТІ</b> ${isExit ? '⚪️ <i>(Сесія завершена)</i>' : '🟢 <i>(Активний зараз)</i>'}\n\n` +
              `📍 <b>Локація:</b> ${existingSession.flag} ${existingSession.city ? existingSession.city + ', ' : ''}${existingSession.country}\n` +
              `🌐 <b>IP:</b> <code>${existingSession.ip}</code>\n` +
              `🏢 <b>Провайдер:</b> ${escapeHtml(existingSession.isp || 'Невідомо')}\n` +
              `📱 <b>Пристрій:</b> ${escapeHtml(existingSession.os)} • <i>${existingSession.deviceType === 'mobile' ? 'Мобільний' : 'Комп\'ютер'}</i>\n` +
              `🖥 <b>Браузер:</b> ${escapeHtml(existingSession.browser)} (${escapeHtml(existingSession.screen)})\n` +
              `🗣 <b>Мова:</b> ${escapeHtml(existingSession.language)}\n` +
              `🔗 <b>Джерело:</b> ${escapeHtml(existingSession.referrer)}\n\n` +
              `📊 <b>ПОВЕДІНКА ТА ЗАЛУЧЕНІСТЬ:</b>\n` +
              `⏱ <b>Час на сайті:</b> <b>${formatDuration(timeSpent)}</b>\n` +
              `📜 <b>Найглибший блок:</b> ${deepestName} (${existingSession.maxScrollPercent}%)\n` +
              (isExit ? `🚪 <b>Точка виходу (відсів):</b> ${exitName}\n` : `📍 <b>Зараз у блоці:</b> ${currentName}\n`) +
              `🏷 <b>Статус:</b> ${statusBadge}\n` +
              `⏰ <b>Час:</b> ${timeStr} (Київ)`;

            await editTelegramMessage(CHAT_ID, targetMessageId, updatedMsg);

            if (hasBooking && !notifiedHotLeads.has(existingSession.id)) {
              notifiedHotLeads.add(existingSession.id);
              await sendTelegramMessage(
                CHAT_ID,
                `🔥 <b>ГАРЯЧИЙ ЛІД!</b> Відвідувач із <b>${existingSession.city || existingSession.country}</b> щойно відкрив форму запису на консультацію!\n⏱ <i>Провів на сайті: ${formatDuration(timeSpent)}</i>`
              );
            }
          }
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (err) {
        console.error('Error handling /api/visit in server:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[Analytics Server] Running on http://0.0.0.0:${PORT}`);
});

// Automatic Morning Digest (09:00 Kyiv time)
function checkMorningDigestSchedule() {
  const now = new Date();
  const timeFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Kyiv',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  const [hourStr, minStr] = timeFormatter.format(now).split(':');
  const hour = parseInt(hourStr, 10);
  const min = parseInt(minStr, 10);
  const todayDateStr = getKyivDateString(now);

  if (hour === 9 && min === 0 && lastDigestSentDate !== todayDateStr) {
    lastDigestSentDate = todayDateStr;
    console.log('[Telegram Bot] Sending scheduled Morning Digest at 09:00 Kyiv time...');
    const digestText = generateDailyDigest();
    sendTelegramMessage(CHAT_ID, digestText, getCommonInlineKeyboard('digest'));
  }
}

setInterval(checkMorningDigestSchedule, 45000);

// Register Bot Commands with Telegram Menu
async function registerBotCommands() {
  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setMyCommands`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        commands: [
          { command: 'analytics', description: '📊 Повна аналітика відвідувачів та міст' },
          { command: 'funnel', description: '📉 Воронка доскролу та точки відсіву' },
          { command: 'utm', description: '🔗 Створити UTM-посилання для Stories/Reels' },
          { command: 'digest', description: '☀️ Ранковий дайджест за вчора' },
          { command: 'today', description: '📅 Статистика за сьогоднішній день' },
          { command: 'recent', description: '🕒 Останні гості з часом та точкою виходу' },
          { command: 'help', description: 'ℹ️ Довідка та меню команд' }
        ]
      })
    });
    console.log('[Telegram Bot] Commands registered successfully!');
  } catch (err) {
    console.error('[Telegram Bot] Error registering commands:', err);
  }
}

registerBotCommands();

// Telegram Bot Polling Loop
let lastUpdateId = 0;
let isPolling = true;

async function pollTelegramUpdates() {
  console.log('[Telegram Bot] Starting polling loop for @vlshav_smm_bot...');

  while (isPolling) {
    try {
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=${lastUpdateId + 1}&timeout=20`;
      const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
      const data = await res.json();

      if (data.ok && Array.isArray(data.result)) {
        for (const update of data.result) {
          lastUpdateId = Math.max(lastUpdateId, update.update_id);

          // 1. Handle Inline Button Callbacks
          if (update.callback_query) {
            const cq = update.callback_query;
            const cbData = cq.data || '';
            const msgChatId = cq.message?.chat?.id || CHAT_ID;
            const msgId = cq.message?.message_id;

            await answerCallbackQuery(cq.id, 'Завантажую...');

            let responseText = '';
            let newCmd = 'analytics';
            let customMarkup = null;

            if (cbData.startsWith('utm_')) {
              const presetSlug = cbData.replace('utm_', '');
              responseText = generateUtmCard(presetSlug);
              newCmd = 'utm';
              customMarkup = getUtmMenuKeyboard();
            } else if (cbData === 'cmd_utm' || cbData === 'cmd_refresh_utm') {
              responseText = `🔗 <b>ГЕНЕРАТОР UTM-ПОСИЛАНЬ ДЛЯ АЛІНИ:</b>\n\nОберіть канал, для якого хочете створити промо-посилання:`;
              newCmd = 'utm';
              customMarkup = getUtmMenuKeyboard();
            } else if (cbData === 'cmd_digest' || cbData === 'cmd_refresh_digest') {
              responseText = generateDailyDigest();
              newCmd = 'digest';
            } else if (cbData === 'cmd_funnel' || cbData === 'cmd_refresh_funnel') {
              responseText = generateFunnelReport('all');
              newCmd = 'funnel';
            } else if (cbData === 'cmd_today' || cbData === 'cmd_refresh_today') {
              responseText = generateAnalyticsReport('today');
              newCmd = 'today';
            } else if (cbData === 'cmd_recent' || cbData === 'cmd_refresh_recent') {
              responseText = generateRecentVisitorsList(6);
              newCmd = 'recent';
            } else {
              responseText = generateAnalyticsReport('all');
              newCmd = 'analytics';
            }

            const finalMarkup = customMarkup || getCommonInlineKeyboard(newCmd);

            if (msgId) {
              await editTelegramMessage(msgChatId, msgId, responseText, finalMarkup);
            } else {
              await sendTelegramMessage(msgChatId, responseText, finalMarkup);
            }
            continue;
          }

          // 2. Handle Text Messages & Commands
          const message = update.message;
          if (!message || !message.text) continue;

          const text = message.text.trim();
          const chatId = message.chat.id;

          console.log(`[Telegram Bot] Message from ${message.from?.username || chatId}: "${text}"`);

          if (text === '/utm' || text === '🔗 Створити UTM-посилання' || text.startsWith('/utm@')) {
            const prompt = `🔗 <b>ГЕНЕРАТОР UTM-ПОСИЛАНЬ ДЛЯ АЛІНИ:</b>\n\nОберіть канал, щоб миттєво згенерувати посилання для відстеження:`;
            await sendTelegramMessage(chatId, prompt, getUtmMenuKeyboard());
          } else if (text.startsWith('/utm ')) {
            const customSlug = text.replace('/utm ', '').trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
            const card = generateUtmCard(customSlug || 'custom');
            await sendTelegramMessage(chatId, card, getUtmMenuKeyboard());
          } else if (text === '/digest' || text === '☀️ Ранковий дайджест' || text.startsWith('/digest@')) {
            const report = generateDailyDigest();
            await sendTelegramMessage(chatId, report, getCommonInlineKeyboard('digest'));
          } else if (text === '/funnel' || text === '📉 Воронка відсіву' || text.startsWith('/funnel@')) {
            const report = generateFunnelReport('all');
            await sendTelegramMessage(chatId, report, getCommonInlineKeyboard('funnel'));
          } else if (text === '/analytics' || text === '/stats' || text === '📊 Аналітика' || text.startsWith('/analytics@')) {
            const report = generateAnalyticsReport('all');
            await sendTelegramMessage(chatId, report, getCommonInlineKeyboard('analytics'));
          } else if (text === '/today' || text === '📅 За сьогодні' || text.startsWith('/today@')) {
            const report = generateAnalyticsReport('today');
            await sendTelegramMessage(chatId, report, getCommonInlineKeyboard('today'));
          } else if (text === '/recent' || text === '👥 Останні гості' || text.startsWith('/recent@')) {
            const report = generateRecentVisitorsList(6);
            await sendTelegramMessage(chatId, report, getCommonInlineKeyboard('recent'));
          } else if (text === '/start' || text === '/help' || text === 'ℹ️ Довідка') {
            const welcomeText = `👋 <b>Привіт, ${escapeHtml(message.from?.first_name || 'Аліно')}!</b>

Я оновлений аналітичний бот сайту <b>Alina Voloshyna SMM</b>.

🔔 <b>Що я вмію:</b>
• ⏱ <b>Відстежую точний час</b> на сайті та найглибший екран.
• 🚪 <b>Визначаю точку виходу</b> (де саме людина закрила сайт).
• 🔗 <b>Генерую UTM-посилання</b> для Stories, Reels, блогерів.
• 💬 <b>Додаю кнопки «Відповісти в 1 клік»</b> прямо під кожною заявкою!
• ☀️ <b>Надсилаю ранковий дайджест</b> о 09:00 щодня.

📊 <b>Команди та швидкі кнопки:</b>
• /funnel — Воронка доскролу та точки відсіву
• /utm — Створити відстежуване посилання
• /digest — Дайджест за вчора
• /analytics — Загальна статистика та аналітика
• /today — Звіт тільки за сьогодні
• /recent — Останні відвідувачі
• /help — Довідка`;

            await sendTelegramMessage(chatId, welcomeText, getReplyMenuKeyboard());
          }
        }
      } else if (!data.ok) {
        console.warn('[Telegram Bot] getUpdates returned non-ok:', data);
        await new Promise(r => setTimeout(r, 3000));
      }
    } catch (err) {
      if (err.name !== 'TimeoutError') {
        console.error('[Telegram Bot] Polling error:', err.message);
      }
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}

pollTelegramUpdates().catch(err => {
  console.error('[Telegram Bot] Fatal polling crash:', err);
});

process.on('SIGINT', () => {
  console.log('Shutting down server...');
  isPolling = false;
  server.close();
  process.exit(0);
});
