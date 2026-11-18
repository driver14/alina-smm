// Vercel Serverless Function: Handle Lead Submissions & Instant Action Buttons in Telegram
import { recordLeadSubmission } from './_store.js';

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
    console.warn('Stream buffer parse error in lead:', err.message);
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
    const data = await getRequestBody(req);

    const envToken = (process.env.TELEGRAM_BOT_TOKEN || process.env.VITE_TELEGRAM_BOT_TOKEN || '').trim();
    const token = envToken.startsWith('8837959727:') ? envToken : '8837959727:AAGW7vreMEddZ2_ur2mggdz9dP9X8JAhzdQ';
    const chatId = process.env.TELEGRAM_CHAT_ID || process.env.VITE_TELEGRAM_CHAT_ID || '879689668';

    if (!token || !chatId) {
      return res.status(500).json({ error: 'Telegram configuration missing' });
    }

    const cleanName = String(data.name || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const cleanContact = String(data.contact || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const cleanIg = data.instagram ? String(data.instagram).replace(/^@/, '').trim() : '';
    const cleanNiche = String(data.niche || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const cleanService = String(data.service || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const cleanComment = String(data.comment || 'Не вказано').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const cleanSource = String(data.source || 'Сайт smmbyvlsh.com').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const timeStr = new Intl.DateTimeFormat('uk-UA', {
      timeZone: 'Europe/Kyiv',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date());

    const message = `🔔 <b>НОВА ЗАЯВКА НА КОНСУЛЬТАЦІЮ!</b>\n\n` +
      `👤 <b>Клієнт:</b> ${cleanName}\n` +
      `📱 <b>Контакт:</b> <code>${cleanContact}</code>\n` +
      `📸 <b>Instagram:</b> ${cleanIg ? `@${cleanIg}` : 'Не вказано'}\n` +
      `💼 <b>Ніша:</b> ${cleanNiche}\n` +
      `🏷 <b>Формат:</b> ${cleanService}\n` +
      `💬 <b>Задача / Коментар:</b>\n${cleanComment}\n\n` +
      `🌐 <b>Джерело:</b> ${cleanSource}\n` +
      `⏰ <b>Час:</b> ${timeStr} (Київ)`;

    // Build action buttons for Alina
    const inlineButtons = [];
    const row1 = [];

    if (cleanIg) {
      row1.push({
        text: '📸 Відкрити Instagram',
        url: `https://instagram.com/${cleanIg}`
      });
    }

    if (cleanContact) {
      if (cleanContact.startsWith('@') || /^[a-zA-Z0-9_]{5,32}$/.test(cleanContact)) {
        row1.push({
          text: '💬 Написати в Telegram',
          url: `https://t.me/${cleanContact.replace(/^@/, '')}`
        });
      } else if (cleanContact.includes('t.me/')) {
        const match = cleanContact.match(/t\.me\/([a-zA-Z0-9_+]+)/);
        if (match) {
          row1.push({
            text: '💬 Написати в Telegram',
            url: `https://t.me/${match[1]}`
          });
        }
      } else {
        const digits = cleanContact.replace(/[^0-9+]/g, '');
        if (digits.length >= 9) {
          inlineButtons.push([{
            text: `📞 Дзвінок: ${digits}`,
            url: `tel:${digits}`
          }]);
        }
      }
    }

    if (row1.length > 0) {
      inlineButtons.unshift(row1);
    }

    const payload = {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    };

    if (inlineButtons.length > 0) {
      payload.reply_markup = { inline_keyboard: inlineButtons };
    }

    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const tgData = await tgRes.json().catch(() => ({}));

    await recordLeadSubmission({
      name: cleanName,
      contact: cleanContact,
      instagram: cleanIg,
      niche: cleanNiche,
      service: cleanService,
      comment: cleanComment,
      source: cleanSource,
      messageId: tgData?.result?.message_id
    }).catch(() => {});

    return res.status(200).json({ success: true, messageId: tgData?.result?.message_id });
  } catch (err) {
    console.error('Lead handler error:', err);
    return res.status(500).json({ error: err.message });
  }
}
