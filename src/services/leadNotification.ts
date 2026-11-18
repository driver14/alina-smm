export interface LeadData {
  name: string
  contact: string
  instagram?: string
  niche: string
  service: string
  comment?: string
  source?: string
}

function escapeHtml(text?: string): string {
  if (!text) return ''
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/**
 * Builds direct action buttons for Alina in Telegram
 */
function buildLeadActionButtons(data: LeadData) {
  const inlineButtons: Array<Array<{ text: string; url: string }>> = []
  const row1: Array<{ text: string; url: string }> = []

  // 1. Instagram Link
  if (data.instagram) {
    const cleanIg = data.instagram.replace(/^@/, '').trim()
    if (cleanIg) {
      row1.push({
        text: '📸 Відкрити Instagram',
        url: `https://instagram.com/${cleanIg}`
      })
    }
  }

  // 2. Telegram or Phone Link
  if (data.contact) {
    const contactStr = data.contact.trim()

    // If starts with @ or is a Telegram handle
    if (contactStr.startsWith('@') || /^[a-zA-Z0-9_]{5,32}$/.test(contactStr)) {
      const cleanTg = contactStr.replace(/^@/, '')
      row1.push({
        text: '💬 Написати в Telegram',
        url: `https://t.me/${cleanTg}`
      })
    } else if (contactStr.includes('t.me/')) {
      const match = contactStr.match(/t\.me\/([a-zA-Z0-9_+]+)/)
      if (match) {
        row1.push({
          text: '💬 Написати в Telegram',
          url: `https://t.me/${match[1]}`
        })
      }
    } else {
      // Check if it's a telephone number
      const digitsOnly = contactStr.replace(/[^0-9+]/g, '')
      if (digitsOnly.length >= 9) {
        inlineButtons.push([
          {
            text: `📞 Дзвінок: ${digitsOnly}`,
            url: `tel:${digitsOnly}`
          }
        ])
      }
    }
  }

  if (row1.length > 0) {
    inlineButtons.unshift(row1)
  }

  return inlineButtons
}

/**
 * Sends lead information to Telegram Bot or external webhook with 1-click reply buttons
 */
export async function sendLeadNotification(data: LeadData): Promise<{ success: boolean; message?: string }> {
  const telegramBotToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
  const telegramChatId = import.meta.env.VITE_TELEGRAM_CHAT_ID
  const webhookUrl = import.meta.env.VITE_FORM_WEBHOOK_URL

  const formattedMessage = `🔔 <b>НОВА ЗАЯВКА НА КОНСУЛЬТАЦІЮ!</b>

👤 <b>Клієнт:</b> ${escapeHtml(data.name)}
📱 <b>Контакт:</b> <code>${escapeHtml(data.contact)}</code>
📸 <b>Instagram:</b> ${data.instagram ? `@${escapeHtml(data.instagram.replace(/^@/, ''))}` : 'Не вказано'}
💼 <b>Ніша:</b> ${escapeHtml(data.niche)}
🏷 <b>Формат:</b> ${escapeHtml(data.service)}
💬 <b>Задача / Коментар:</b>
${escapeHtml(data.comment || 'Не вказано')}

🌐 <b>Джерело:</b> ${escapeHtml(data.source || 'Сайт alina-smm')}
⏰ <b>Час:</b> ${new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' })}`

  const inlineButtons = buildLeadActionButtons(data)

  // 1. Send via serverless API
  try {
    const apiRes = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(3500)
    })
    if (apiRes.ok) {
      return { success: true }
    }
  } catch {
    // Continue to direct fallback
  }

  // 2. Direct Telegram API fallback
  if (telegramBotToken && telegramChatId) {
    try {
      const payload: Record<string, unknown> = {
        chat_id: telegramChatId,
        text: formattedMessage,
        parse_mode: 'HTML',
      }
      if (inlineButtons.length > 0) {
        payload.reply_markup = { inline_keyboard: inlineButtons }
      }

      const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        return { success: true }
      }
    } catch (err) {
      console.warn('Telegram Bot send error:', err)
    }
  }

  // 2. If Webhook URL is configured (Make, Zapier, Web3Forms, Formspree, Google Sheet)
  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        return { success: true }
      }
    } catch (err) {
      console.warn('Webhook send error:', err)
    }
  }

  // 3. Fallback: Save to localStorage as a safety net
  try {
    const existing = JSON.parse(localStorage.getItem('alina_leads_backup') || '[]')
    existing.push({ ...data, createdAt: new Date().toISOString() })
    localStorage.setItem('alina_leads_backup', JSON.stringify(existing))
  } catch {
    // Ignore
  }

  return { success: true }
}

/**
 * Generates direct link to Telegram with pre-filled message
 */
export function getDirectTelegramUrl(data: Partial<LeadData>, username = 'vlshavo') {
  const cleanUsername = username.replace(/^@/, '')
  const text = encodeURIComponent(
    `Привіт, Аліно! Хочу записатися на консультацію.\n\n` +
    `Мене звати: ${data.name || ''}\n` +
    `Мій контакт: ${data.contact || ''}\n` +
    (data.instagram ? `Мій Instagram: @${data.instagram.replace(/^@/, '')}\n` : '') +
    (data.niche ? `Ніша: ${data.niche}\n` : '') +
    (data.service ? `Формат: ${data.service}\n` : '') +
    (data.comment ? `Задача: ${data.comment}` : '')
  )
  return `https://t.me/${cleanUsername}?text=${text}`
}
