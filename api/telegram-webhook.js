// Vercel Serverless Function: High-Performance Telegram Webhook Bot for Alina Voloshyna SMM
import { loadAnalytics } from './_store.js';

const HARDCODED_BOT_TOKEN = '8837959727:AAGW7vreMEddZ2_ur2mggdz9dP9X8JAhzdQ';
const ENV_BOT_TOKEN = (process.env.TELEGRAM_BOT_TOKEN || process.env.VITE_TELEGRAM_BOT_TOKEN || '').trim();
const BOT_TOKEN = ENV_BOT_TOKEN.startsWith('8837959727:') ? ENV_BOT_TOKEN : HARDCODED_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || process.env.VITE_TELEGRAM_CHAT_ID || '879689668';
const BASE_DOMAIN = 'https://smmbyvlsh.com';

const SECTION_ORDER = [
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

const SECTION_NAMES = {
  hero: '🔝 Головний екран (Hero)',
  stats: '📊 Метрики та переваги',
  approach: '💡 Філософія та підхід',
  cases: '💼 Кейси та результати',
  services: '🛠 Послуги та ціни',
  calculator: '🧮 Калькулятор вартості',
  about: '👤 Про Аліну (Бренд & Фото)',
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

async function getRequestBody(req) {
  if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
    return req.body;
  }
  if (typeof req.body === 'string' && req.body.length > 0) {
    try {
      return JSON.parse(req.body);
    } catch {
      // ignore
    }
  }

  // Stream reader fallback for streaming serverless functions
  try {
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const raw = Buffer.concat(buffers).toString('utf-8');
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Stream buffer parse error:', err.message);
  }

  return req.body || {};
}

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

function makeProgressBar(percent, totalBars = 10) {
  const filled = Math.min(totalBars, Math.max(0, Math.round((percent / 100) * totalBars)));
  const empty = totalBars - filled;
  return '█'.repeat(filled) + '░'.repeat(empty);
}

async function sendTelegramMessage(chatId, text, replyMarkup = null) {
  try {
    const payload = {
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true
    };
    if (replyMarkup) payload.reply_markup = replyMarkup;

    console.log('[TG_SEND_START] targetChatId:', chatId, 'tokenPrefix:', BOT_TOKEN.slice(0, 10));

    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    console.log('[TG_SEND_RES] ok:', data.ok, 'description:', data.description || 'none');

    // Fallback: If Telegram fails to parse HTML entities, strip tags and send as plain text
    if (!data.ok && data.description && data.description.includes("can't parse entities")) {
      console.warn('HTML parse failed in Telegram, retrying as plain text:', data.description);
      delete payload.parse_mode;
      payload.text = text.replace(/<[^>]*>/g, '');
      const retryRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const retryData = await retryRes.json();
      console.log('[TG_RETRY_RES] ok:', retryData.ok, 'description:', retryData.description || 'none');
      return retryData;
    }

    return data;
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
    if (replyMarkup) payload.reply_markup = replyMarkup;

    console.log('[TG_EDIT_START] targetChatId:', chatId, 'msgId:', messageId);

    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/editMessageText`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    console.log('[TG_EDIT_RES] ok:', data.ok, 'description:', data.description || 'none');

    // If message wasn't modified, Telegram returns 400 - that's completely normal
    if (!data.ok && data.description && data.description.includes('message is not modified')) {
      return { ok: true, notModified: true };
    }

    // HTML fallback for edit
    if (!data.ok && data.description && data.description.includes("can't parse entities")) {
      delete payload.parse_mode;
      payload.text = text.replace(/<[^>]*>/g, '');
      const retryRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/editMessageText`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const retryData = await retryRes.json();
      console.log('[TG_EDIT_RETRY_RES] ok:', retryData.ok);
      return retryData;
    }

    return data;
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
      body: JSON.stringify({ callback_query_id: callbackQueryId, text })
    });
  } catch {
    // ignore
  }
}

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

function generateUtmCard(presetSlug) {
  const preset = UTM_PRESETS.find(p => p.slug === presetSlug) || {
    slug: presetSlug,
    label: `🔗 Канал: ${presetSlug}`,
    desc: 'Індивідуальне промо-посилання'
  };

  const link = `${BASE_DOMAIN}/?utm_source=${preset.slug}`;

  return `🔗 <b>ГОТОВЕ UTM-ПОСИЛАННЯ ДЛЯ ${escapeHtml(preset.label.toUpperCase())}:</b>

<code>${escapeHtml(link)}</code>

📋 <i>Натисни на посилання вище, щоб миттєво скопіювати його в буфер обміну!</i>
ℹ️ <i>${escapeHtml(preset.desc)}</i>

📊 <b>Як це працює:</b>
1. Коли людина перейде за цим посиланням, у сповіщенні бот напише:
   «🔗 Джерело: ${escapeHtml(preset.label)} (UTM)»
2. У воронці /funnel та аналітиці /analytics цей канал підраховується окремо!`;
}

function generateFunnelReport(store, period = 'all') {
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
    return `📉 <b>ВОРОНКА ДОСКРОЛУ ЗА СЬОГОДНІ</b>\n📅 <i>${todayStr}</i>\n\nСьогодні відвідувачів ще не було. Щойно хтось відкриє сайт — з'явиться детальний зріз!\n\n💡 <i>За весь час роботи сайту: ${visits.length} сесій.</i>`;
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
    if (deepestIdx >= SECTION_ORDER.indexOf('approach')) counts.approach++;
    if (deepestIdx >= SECTION_ORDER.indexOf('cases')) counts.cases++;
    if (deepestIdx >= SECTION_ORDER.indexOf('services')) counts.services++;
    if (deepestIdx >= SECTION_ORDER.indexOf('calculator')) counts.calculator++;
    if (deepestIdx >= SECTION_ORDER.indexOf('about')) counts.about++;
    if (deepestIdx >= SECTION_ORDER.indexOf('faq')) counts.faq++;

    const interactions = Array.isArray(v.interactions) ? v.interactions : [];
    const hasBooking = interactions.some(i => String(i).startsWith('opened_booking_modal'));
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
    dropOffText += `${idx + 1}. <b>${escapeHtml(name)}</b> — <b>${count}</b> (${pct}% виходів)\n`;
  });

  const totalDuration = targetVisits.reduce((acc, v) => acc + (v.timeSpent || 0), 0);
  const avgDuration = Math.round(totalDuration / total);
  const bounces = targetVisits.filter(v => (v.timeSpent || 0) < 10).length;
  const bouncePct = Math.round((bounces / total) * 100);

  return `📉 <b>ВОРОНКА ДОСКРОЛУ ТА ВІДСІВУ (FUNNEL)</b>
${period === 'today' ? `📅 <i>Зріз за сьогодні (${todayStr})</i>` : '📈 <i>Загальна воронка за весь час</i>'}

👥 <b>Всього сесій:</b> <b>${total}</b>
⏱ <b>Середній час на сайті:</b> <b>${formatDuration(avgDuration)}</b>
⚡️ <b>Швидкий відхід (< 10 сек):</b> <b>${bouncePct}%</b> (${bounces})

📊 <b>ЕТАПИ ВОРОНКИ (КОНВЕРСІЯ ДОСКРОЛУ):</b>
${funnelText}
🚪 <b>ДЕ НАЙЧАСТІШЕ ВІДСІЮЮТЬСЯ (ТОП ТОЧОК ВИХОДУ):</b>
${dropOffText || '• Дані формуються...\n'}
💡 <i>Порада: якщо багато виходів на блоці «Кейси» — перевір оффер або заклик до дії одразу після них!</i>`;
}

function generateAnalyticsReport(store, period = 'all') {
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

  const bookingOpens = targetVisits.filter(v => (Array.isArray(v.interactions) ? v.interactions : []).some(i => String(i).startsWith('opened_booking_modal'))).length;
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
      .map(([city, count]) => `${escapeHtml(city)}: ${count}`)
      .join(', ');
    geoText += `${idx + 1}. <b>${escapeHtml(cName)}</b> — <b>${data.count}</b> (${sortedCities || 'місто не визначено'})\n`;
  });

  // Devices & Referrers
  const deviceCounts = { mobile: 0, desktop: 0, tablet: 0 };
  const referrerCounts = new Map();

  for (const v of targetVisits) {
    const dType = v.deviceType || 'desktop';
    deviceCounts[dType] = (deviceCounts[dType] || 0) + 1;
    const ref = v.referrer || 'Прямий захід';
    referrerCounts.set(ref, (referrerCounts.get(ref) || 0) + 1);
  }

  const mobilePct = totalVisits > 0 ? Math.round((deviceCounts.mobile / totalVisits) * 100) : 0;
  const desktopPct = totalVisits > 0 ? (100 - mobilePct) : 0;
  const topReferrers = Array.from(referrerCounts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const lastVisit = visits[visits.length - 1];
  const lastTime = lastVisit ? getKyivTime(new Date(lastVisit.timestamp)) : '—';
  const lastLoc = lastVisit ? `${lastVisit.flag || '📍'} ${lastVisit.city ? escapeHtml(lastVisit.city) + ', ' : ''}${escapeHtml(lastVisit.country || 'Локація')}` : '—';
  const lastDev = lastVisit ? `${escapeHtml(lastVisit.os || '')} • ${escapeHtml(lastVisit.browser || '')}` : '—';
  const lastTimeSpent = lastVisit ? formatDuration(lastVisit.timeSpent || 0) : '—';

  return `📊 <b>АНАЛІТИКА ВІДВІДУВАНЬ САЙТУ ALINA SMM</b>
${period === 'today' ? `📅 <i>Звіт за сьогодні (${todayStr})</i>` : '📈 <i>Загальний звіт за весь час</i>'}

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
${topReferrers.map(([ref, count]) => `• ${escapeHtml(ref)}: <b>${count}</b>`).join('\n')}

🕒 <b>Останній зареєстрований відвідувач:</b>
📍 ${lastLoc}
📱 ${lastDev}
⏱ Провів на сайті: <b>${lastTimeSpent}</b>
⏰ ${lastTime} (Київ)`;
}

function generateRecentVisitorsList(store, limit = 6) {
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

    const interactions = Array.isArray(v.interactions) ? v.interactions : [];
    const hasBooking = interactions.some(i => String(i).startsWith('opened_booking_modal'));

    text += `<b>${idx + 1}. ${v.flag || '📍'} ${v.city ? escapeHtml(v.city) + ', ' : ''}${escapeHtml(v.country || 'Країна')}</b> ${hasBooking ? '🔥' : ''}\n`;
    text += `🌐 IP: <code>${escapeHtml(v.ip)}</code>${v.isp ? ` (${escapeHtml(v.isp)})` : ''}\n`;
    text += `⏱ Час на сайті: <b>${duration}</b>\n`;
    text += `📜 Дійшов до: <b>${escapeHtml(deepestName)}</b> (${v.maxScrollPercent || 0}%)\n`;
    text += `🚪 Вийшов у блоці: <i>${escapeHtml(exitName)}</i>\n`;
    text += `📱 ${escapeHtml(v.os || 'OS')} • ${escapeHtml(v.browser || 'Browser')} (${escapeHtml(v.screen || 'екран')})\n`;
    text += `🔗 Джерело: ${escapeHtml(v.referrer || 'Direct')}\n`;
    text += `⏰ Час: ${time}\n\n`;
  });

  return text;
}

function generateDailyDigest(store, targetDate = new Date(Date.now() - 24 * 60 * 60 * 1000)) {
  const visits = store.visits || [];
  const targetDateStr = getKyivDateString(targetDate);
  const dayVisits = visits.filter(v => getKyivDateString(new Date(v.timestamp)) === targetDateStr);
  const total = dayVisits.length;

  if (total === 0) {
    return `☀️ <b>РАНКОВИЙ ДАЙДЖЕСТ САЙТУ ALINA SMM</b>\n📅 <i>За ${targetDateStr}</i>\n\nВ цей день відвідувачів на сайті не було.`;
  }

  const uniqueIps = new Set(dayVisits.map(v => v.ip)).size;
  const totalDuration = dayVisits.reduce((acc, v) => acc + (v.timeSpent || 0), 0);
  const avgDuration = Math.round(totalDuration / total);
  const avgScroll = Math.round(dayVisits.reduce((acc, v) => acc + (v.maxScrollPercent || 0), 0) / total);
  const bookingOpens = dayVisits.filter(v => (Array.isArray(v.interactions) ? v.interactions : []).some(i => String(i).startsWith('opened_booking_modal'))).length;

  const sourceMap = new Map();
  for (const v of dayVisits) {
    const s = v.referrer || 'Прямий захід';
    sourceMap.set(s, (sourceMap.get(s) || 0) + 1);
  }
  const topSource = Array.from(sourceMap.entries()).sort((a, b) => b[1] - a[1])[0];

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
• ${topSource ? `${escapeHtml(topSource[0])} (${topSource[1]} переходів)` : 'Прямі візити'}

🚪 <b>Основна точка відсіву:</b>
• ${topExit ? `${escapeHtml(topExit[0])} (${topExit[1]} виходів)` : '—'}

Вдалого та продуктивного дня, Аліно! ✨`;
}

// Main Vercel Serverless Function Handler
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).json({ ok: true, status: 'Telegram Webhook is live!' });
  }

  const startTime = Date.now();

  try {
    const update = await getRequestBody(req);
    console.log('[Webhook] Received update:', JSON.stringify(update));

    if (!update || typeof update !== 'object') {
      return res.status(200).json({ ok: true, skipped: 'empty update' });
    }

    // 1. Handle Inline Button Callbacks
    if (update.callback_query) {
      const cq = update.callback_query;
      const cbData = cq.data || '';
      const msgChatId = cq.message?.chat?.id || cq.from?.id || CHAT_ID;
      const msgId = cq.message?.message_id;

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
        const store = await loadAnalytics();
        responseText = generateDailyDigest(store);
        newCmd = 'digest';
      } else if (cbData === 'cmd_funnel' || cbData === 'cmd_refresh_funnel') {
        const store = await loadAnalytics();
        responseText = generateFunnelReport(store, 'all');
        newCmd = 'funnel';
      } else if (cbData === 'cmd_today' || cbData === 'cmd_refresh_today') {
        const store = await loadAnalytics();
        responseText = generateAnalyticsReport(store, 'today');
        newCmd = 'today';
      } else if (cbData === 'cmd_recent' || cbData === 'cmd_refresh_recent') {
        const store = await loadAnalytics();
        responseText = generateRecentVisitorsList(store, 6);
        newCmd = 'recent';
      } else {
        const store = await loadAnalytics();
        responseText = generateAnalyticsReport(store, 'all');
        newCmd = 'analytics';
      }

      const finalMarkup = customMarkup || getCommonInlineKeyboard(newCmd);

      if (msgId) {
        const editRes = await editTelegramMessage(msgChatId, msgId, responseText, finalMarkup);
        if (editRes && editRes.notModified) {
          await answerCallbackQuery(cq.id, '✅ Дані вже актуальні!');
        } else {
          await answerCallbackQuery(cq.id, '✅ Оновлено');
        }
      } else {
        await sendTelegramMessage(msgChatId, responseText, finalMarkup);
        await answerCallbackQuery(cq.id);
      }

      return res.status(200).json({ ok: true, duration: Date.now() - startTime });
    }

    // 2. Handle Text Messages & Commands
    const message = update.message;
    if (message && message.text) {
      const rawText = message.text.trim();
      const text = rawText.split('@')[0].toLowerCase();
      const chatId = message.chat.id;

      console.log('[Webhook] Processing text:', rawText, 'from chatId:', chatId);

      if (text === '/ping') {
        const latency = Date.now() - startTime;
        await sendTelegramMessage(chatId, `⚡️ <b>PONG!</b>\n\nСервер працює у хмарі Vercel 24/7.\nЗатримка обробки: <b>${latency} мс</b>.`);
      } else if (text === '/utm' || rawText === '🔗 Створити UTM-посилання' || rawText === '🔗 UTM-посилання') {
        const prompt = `🔗 <b>ГЕНЕРАТОР UTM-ПОСИЛАНЬ ДЛЯ АЛІНИ:</b>\n\nОберіть канал, щоб миттєво згенерувати посилання для відстеження:`;
        await sendTelegramMessage(chatId, prompt, getUtmMenuKeyboard());
      } else if (rawText.startsWith('/utm ')) {
        const customSlug = rawText.replace('/utm ', '').trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
        const card = generateUtmCard(customSlug || 'custom');
        await sendTelegramMessage(chatId, card, getUtmMenuKeyboard());
      } else if (text === '/digest' || rawText === '☀️ Ранковий дайджест' || rawText === '☀️ Дайджест') {
        const store = await loadAnalytics();
        const report = generateDailyDigest(store);
        await sendTelegramMessage(chatId, report, getCommonInlineKeyboard('digest'));
      } else if (text === '/funnel' || rawText === '📉 Воронка відсіву' || rawText === 'Воронка відсіву') {
        const store = await loadAnalytics();
        const report = generateFunnelReport(store, 'all');
        await sendTelegramMessage(chatId, report, getCommonInlineKeyboard('funnel'));
      } else if (text === '/analytics' || text === '/stats' || rawText === '📊 Аналітика' || rawText === '📊 Вся аналітика' || rawText === 'Аналітика') {
        const store = await loadAnalytics();
        const report = generateAnalyticsReport(store, 'all');
        await sendTelegramMessage(chatId, report, getCommonInlineKeyboard('analytics'));
      } else if (text === '/today' || rawText === '📅 За сьогодні' || rawText === 'За сьогодні') {
        const store = await loadAnalytics();
        const report = generateAnalyticsReport(store, 'today');
        await sendTelegramMessage(chatId, report, getCommonInlineKeyboard('today'));
      } else if (text === '/recent' || rawText === '👥 Останні гості' || rawText === '👥 Останні сесії' || rawText === 'Останні сесії') {
        const store = await loadAnalytics();
        const report = generateRecentVisitorsList(store, 6);
        await sendTelegramMessage(chatId, report, getCommonInlineKeyboard('recent'));
      } else if (text === '/start' || text === '/help' || rawText === 'ℹ️ Довідка') {
        const welcomeText = `👋 <b>Привіт, ${escapeHtml(message.from?.first_name || 'Аліно')}!</b>

Я оновлений хмарний аналітичний бот сайту <b>Alina Voloshyna SMM</b> 🚀

⚡️ <b>Тепер я працюю 24/7 у хмарі Vercel:</b>
• ⏱ <b>Відстежую точний час</b> на сайті та найглибший екран.
• 🚪 <b>Визначаю точку виходу</b> (де саме людина закрила сайт).
• 🔗 <b>Генерую UTM-посилання</b> для Stories, Reels, блогерів.
• 💬 <b>Додаю кнопки «Відповісти в 1 клік»</b> прямо під кожною заявкою!
• ⚡️ <b>Миттєвий відгук</b> на команди (< 0.2 сек) без затримок!

📊 <b>Команди та швидкі кнопки:</b>
• /analytics — Загальна статистика та аналітика
• /today — Звіт тільки за сьогодні
• /funnel — Воронка доскролу та точки відсіву
• /recent — Останні відвідувачі
• /utm — Створити відстежуване посилання
• /digest — Дайджест за вчора
• /help — Довідка`;

        await sendTelegramMessage(chatId, welcomeText, getReplyMenuKeyboard());
      } else {
        // Universal fallback for any text message
        const fallbackText = `👋 <b>Бот онлайн та готовий до роботи!</b>\n\nОберіть потрібний розділ за допомогою кнопок нижче:`;
        await sendTelegramMessage(chatId, fallbackText, getReplyMenuKeyboard());
      }
    }

    return res.status(200).json({ ok: true, duration: Date.now() - startTime });
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(200).json({ ok: false, error: err.message });
  }
}
