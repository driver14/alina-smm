// Vercel Serverless Function: Visitor Engagement & Live Telegram Updates
import { recordVisitSession } from './_store.js';

const SECTION_LABELS = {
  hero: '🔝 Головний екран (Hero)',
  stats: '📊 Метрики та переваги',
  approach: '💡 Філософія та підхід',
  cases: '💼 Кейси та результати',
  services: '🛠 Послуги та ціни',
  calculator: '🧮 Калькулятор вартості',
  about: '👤 Про Аліну (Бренд & Фото)',
  faq: '❓ Часті запитання (FAQ)',
  footer: '🔻 Футер (Контакти)'
};

function formatDuration(sec = 0) {
  const s = Math.max(0, Math.round(sec));
  if (s < 60) return `${s} сек`;
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m} хв ${rem} сек`;
}

function escapeHtml(text = '') {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function getKyivTime() {
  return new Intl.DateTimeFormat('uk-UA', {
    timeZone: 'Europe/Kyiv',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date());
}

async function getRequestBody(req) {
  if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
    return req.body;
  }
  if (typeof req.body === 'string' && req.body.length > 0) {
    try { return JSON.parse(req.body); } catch {}
  }
  try {
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const raw = Buffer.concat(buffers).toString('utf-8');
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn('Stream buffer parse error in visit:', err.message);
  }
  return req.body || {};
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload = await getRequestBody(req);
    const action = payload.action || 'start';

    const envToken = (process.env.TELEGRAM_BOT_TOKEN || process.env.VITE_TELEGRAM_BOT_TOKEN || '').trim();
    const token = envToken.startsWith('8837959727:') ? envToken : '8837959727:AAGW7vreMEddZ2_ur2mggdz9dP9X8JAhzdQ';
    const chatId = process.env.TELEGRAM_CHAT_ID || process.env.VITE_TELEGRAM_CHAT_ID || '879689668';

    if (!token || !chatId) {
      return res.status(500).json({ error: 'Telegram configuration missing' });
    }

    // Extract Client details
    let rawIp = payload.ip || req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.socket?.remoteAddress || '127.0.0.1';
    if (rawIp.includes(',')) rawIp = rawIp.split(',')[0].trim();
    rawIp = rawIp.replace(/^::ffff:/, '');

    let country = payload.country || '';
    let city = payload.city || '';
    let flag = payload.flag || '🌐';
    let isp = payload.isp || '';

    // Fast fallback geo lookup if missing
    const isLocal = rawIp === '127.0.0.1' || rawIp === '::1' || rawIp.startsWith('192.168.') || rawIp.startsWith('10.');
    if ((!country || !city) && !isLocal && action === 'start') {
      try {
        const geoRes = await fetch(`https://ipwho.is/${rawIp}`, { signal: AbortSignal.timeout(2600) });
        const geoData = await geoRes.json();
        if (geoData && geoData.success !== false) {
          country = geoData.country || country;
          city = geoData.city || city;
          flag = geoData.flag?.emoji || flag;
          isp = geoData.connection?.isp || isp;
        }
      } catch {
        // Continue
      }
    }

    const timeStr = getKyivTime();
    const timeSpent = payload.timeSpent || 0;
    const maxScroll = payload.maxScrollPercent || 0;
    const deepestSectionLabel = SECTION_LABELS[payload.deepestSection] || payload.deepestSection || '🔝 Головний екран (Hero)';
    const currentSectionLabel = SECTION_LABELS[payload.currentSection] || payload.currentSection || '🔝 Головний екран';
    const exitSectionLabel = SECTION_LABELS[payload.exitSection] || payload.exitSection || deepestSectionLabel;

    const interactions = Array.isArray(payload.interactions) ? payload.interactions : [];
    const hasBookingModal = interactions.some(i => i.startsWith('opened_booking_modal'));
    const hasSubmittedBooking = interactions.some(i => i.startsWith('submitted_booking'));

    let statusBadge = '👀 <b>Перегляд сайту</b>';
    if (hasSubmittedBooking) {
      statusBadge = '🎯 <b>ЗАЯВКА НАДІСЛАНА!</b>';
    } else if (hasBookingModal) {
      statusBadge = '🔥 <b>ГАРЯЧИЙ ЛІД (відкрив форму запису)</b>';
    } else if (timeSpent >= 90) {
      statusBadge = '⭐️ <b>Висока залученість (> 1.5 хв)</b>';
    } else if (timeSpent >= 30) {
      statusBadge = '⚡️ <b>Активний перегляд</b>';
    } else if (timeSpent < 10 && action === 'exit') {
      statusBadge = '⚪️ <b>Швидкий відсів (< 10 сек)</b>';
    }

    let interactionsText = '';
    if (interactions.length > 0) {
      const labels = interactions.map(item => {
        if (item.startsWith('opened_booking_modal')) return '📝 Відкрив форму запису';
        if (item.startsWith('submitted_booking')) return '✅ Надіслав заявку';
        if (item.startsWith('viewed_cases')) return '💼 Гортав кейси';
        if (item.startsWith('used_calculator')) return '🧮 Використав калькулятор';
        return escapeHtml(item);
      });
      interactionsText = labels.slice(0, 3).join(', ');
    }

    // 1. ACTION: START (New Visitor Alert)
    if (action === 'start') {
      const msg = `👀 <b>НОВИЙ ВІДВІДУВАЧ НА САЙТІ!</b> 🟢\n\n` +
        `📍 <b>Локація:</b> ${flag} ${city ? city + ', ' : ''}${country || 'Країна'}\n` +
        `🌐 <b>IP:</b> <code>${rawIp}</code>\n` +
        `🏢 <b>Провайдер:</b> ${escapeHtml(isp || 'Невідомо')}\n` +
        `📱 <b>Пристрій:</b> ${escapeHtml(payload.os || 'OS')} • <i>${payload.deviceType === 'mobile' ? 'Мобільний' : 'Комп\'ютер'}</i>\n` +
        `🖥 <b>Браузер:</b> ${escapeHtml(payload.browser || 'Browser')} (${escapeHtml(payload.screen || '')})\n` +
        `🗣 <b>Мова:</b> ${escapeHtml(payload.language || 'uk')}\n` +
        `🔗 <b>Джерело:</b> ${escapeHtml(payload.referrer || 'Direct')}\n\n` +
        `📊 <b>АКТИВНІСТЬ:</b>\n` +
        `⏱ <b>Час на сайті:</b> <i>зараз на сайті (0 сек)...</i>\n` +
        `📜 <b>Поточний блок:</b> 🔝 Головний екран (Hero)\n` +
        `⏰ <b>Час входу:</b> ${timeStr} (Київ)`;

      const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: msg,
          parse_mode: 'HTML'
        })
      });

      const tgData = await tgRes.json().catch(() => ({}));
      const messageId = tgData?.result?.message_id || null;

      // Persist in cloud store
      payload.ip = rawIp;
      payload.country = country;
      payload.city = city;
      payload.flag = flag;
      payload.isp = isp;
      payload.messageId = messageId;
      await recordVisitSession(payload, 'start').catch(() => {});

      return res.status(200).json({
        success: true,
        sessionId: payload.sessionId,
        messageId,
        ip: rawIp
      });
    }

    // 2. ACTION: HEARTBEAT or EXIT (Live Message Edit with Depth & Drop-off)
    payload.ip = rawIp;
    await recordVisitSession(payload, action).catch(() => {});

    if (payload.messageId) {
      const isExit = action === 'exit';
      const updatedMsg = `👀 <b>ВІДВІДУВАЧ НА САЙТІ</b> ${isExit ? '⚪️ <i>(Сесія завершена)</i>' : '🟢 <i>(Активний зараз)</i>'}\n\n` +
        `📍 <b>Локація:</b> ${flag} ${city ? city + ', ' : ''}${country || 'Країна'}\n` +
        `🌐 <b>IP:</b> <code>${rawIp}</code>\n` +
        `🏢 <b>Провайдер:</b> ${escapeHtml(isp || 'Невідомо')}\n` +
        `📱 <b>Пристрій:</b> ${escapeHtml(payload.os || 'OS')} • <i>${payload.deviceType === 'mobile' ? 'Мобільний' : 'Комп\'ютер'}</i>\n` +
        `🖥 <b>Браузер:</b> ${escapeHtml(payload.browser || 'Browser')} (${escapeHtml(payload.screen || '')})\n` +
        `🗣 <b>Мова:</b> ${escapeHtml(payload.language || 'uk')}\n` +
        `🔗 <b>Джерело:</b> ${escapeHtml(payload.referrer || 'Direct')}\n\n` +
        `📊 <b>ПОВЕДІНКА ТА ЗАЛУЧЕНІСТЬ:</b>\n` +
        `⏱ <b>Час на сайті:</b> <b>${formatDuration(timeSpent)}</b>\n` +
        `📜 <b>Найглибший блок:</b> ${deepestSectionLabel} (${maxScroll}%)\n` +
        (isExit ? `🚪 <b>Точка виходу (відсів):</b> ${exitSectionLabel}\n` : `📍 <b>Зараз у блоці:</b> ${currentSectionLabel}\n`) +
        (interactionsText ? `🎯 <b>Дії:</b> ${interactionsText}\n` : '') +
        `🏷 <b>Статус:</b> ${statusBadge}\n` +
        `⏰ <b>Час:</b> ${timeStr} (Київ)`;

      await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          message_id: payload.messageId,
          text: updatedMsg,
          parse_mode: 'HTML'
        })
      }).catch(() => {});

      // If user opened booking modal or submitted booking on this pulse, send high priority ping
      if (hasBookingModal && payload.isFirstBookingModalOpen) {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: `🔥 <b>ГАРЯЧИЙ ЛІД!</b> Відвідувач із <b>${city || country || 'сайту'}</b> щойно відкрив форму запису на консультацію!\n⏱ <i>Провів на сайті: ${formatDuration(timeSpent)}</i>`,
            parse_mode: 'HTML'
          })
        }).catch(() => {});
      }
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Vercel visit handler error:', err);
    return res.status(500).json({ error: err.message });
  }
}
