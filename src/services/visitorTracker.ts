/**
 * Real-time visitor engagement tracking & Telegram notification service.
 * Tracks:
 * - IP, Location (city, country, flag, ISP)
 * - Device, OS, Browser, Screen resolution, Language, Referrer
 * - Active dwell time (active seconds spent on page, ignoring hidden tabs)
 * - Max scroll depth percentage (0-100%)
 * - Furthest section reached (Hero -> About -> Philosophy -> Cases -> Services -> Calculator -> FAQ -> Footer)
 * - Exit / Drop-off section (where visitor closed or switched tab)
 * - Key user interactions (opened booking modal, interacted with cases, etc.)
 */

export interface GeoData {
  ip: string
  country: string
  countryCode: string
  city: string
  region: string
  flag: string
  isp: string
}

export const TRACKED_SECTIONS = [
  { id: 'hero', name: '🔝 Головний екран (Hero)' },
  { id: 'stats', name: '📊 Метрики та переваги' },
  { id: 'approach', name: '💡 Філософія та підхід' },
  { id: 'cases', name: '💼 Кейси та результати' },
  { id: 'services', name: '🛠 Послуги та ціни' },
  { id: 'calculator', name: '🧮 Калькулятор вартості' },
  { id: 'about', name: '👤 Про Аліну (Бренд & Фото)' },
  { id: 'faq', name: '❓ Часті запитання (FAQ)' },
  { id: 'footer', name: '🔻 Футер (Контакти)' }
] as const

export type TrackedSectionId = typeof TRACKED_SECTIONS[number]['id']

function parseDevice() {
  const ua = navigator.userAgent || ''
  let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop'

  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    deviceType = 'tablet'
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated/i.test(ua)) {
    deviceType = 'mobile'
  }

  // OS Detection
  let os = 'Unknown OS'
  if (/iPhone|iPad|iPod/.test(ua)) {
    const match = ua.match(/OS (\d+[_.]\d+)/)
    os = match ? `iOS ${match[1].replace(/_/g, '.')}` : 'iOS'
  } else if (/Android/.test(ua)) {
    const match = ua.match(/Android (\d+(\.\d+)?)/)
    os = match ? `Android ${match[1]}` : 'Android'
  } else if (/Windows NT 10.0/.test(ua)) {
    os = 'Windows 10/11'
  } else if (/Windows/.test(ua)) {
    os = 'Windows'
  } else if (/Macintosh|Mac OS X/.test(ua)) {
    os = 'macOS'
  } else if (/Linux/.test(ua)) {
    os = 'Linux'
  }

  // Browser Detection (including popular social in-app browsers)
  let browser = 'Unknown Browser'
  if (/Instagram/i.test(ua)) {
    browser = 'Instagram In-App'
  } else if (/Telegram/i.test(ua)) {
    browser = 'Telegram In-App'
  } else if (/TikTok/i.test(ua)) {
    browser = 'TikTok In-App'
  } else if (/Edg\//i.test(ua)) {
    browser = 'Microsoft Edge'
  } else if (/Chrome|CriOS/i.test(ua) && !/Edg/i.test(ua)) {
    browser = deviceType === 'mobile' ? 'Chrome Mobile' : 'Chrome'
  } else if (/Safari/i.test(ua) && !/Chrome|CriOS/i.test(ua)) {
    browser = deviceType === 'mobile' ? 'Mobile Safari' : 'Safari'
  } else if (/Firefox|FxiOS/i.test(ua)) {
    browser = 'Firefox'
  }

  const screen = typeof window !== 'undefined' ? `${window.screen.width}×${window.screen.height}` : ''
  const language = typeof navigator !== 'undefined' ? (navigator.language || 'uk') : 'uk'

  return { deviceType, os, browser, screen, language }
}

function parseReferrer(): string {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search)
    const source = params.get('utm_source')?.toLowerCase()
    if (source) {
      if (source === 'ig_stories' || source === 'stories') return '📸 Instagram Stories (UTM)'
      if (source === 'ig_reels' || source === 'reels') return '🎬 Instagram Reels (UTM)'
      if (source === 'ig_bio' || source === 'bio') return '👤 Instagram Bio (UTM)'
      if (source === 'tiktok') return '🎵 TikTok (UTM)'
      if (source === 'blogger' || source === 'blog') return '📢 Реклама у блогера (UTM)'
      if (source === 'dm' || source === 'direct') return '💬 Direct / Особисті (UTM)'
      if (source === 'threads') return '🧵 Threads (UTM)'
      if (source === 'facebook' || source === 'fb') return '🌐 Facebook (UTM)'
      if (source === 'telegram' || source === 'tg') return '✈️ Telegram (UTM)'
      return `🔗 UTM: ${params.get('utm_source')}`
    }
  }

  if (typeof document === 'undefined') return 'Direct'
  const ref = document.referrer
  if (!ref) {
    return 'Прямий захід / Закладка'
  }

  try {
    const url = new URL(ref)
    const host = url.hostname.toLowerCase()
    if (host.includes('instagram.com')) return '📸 Instagram'
    if (host.includes('t.me') || host.includes('telegram.org')) return '✈️ Telegram'
    if (host.includes('facebook.com')) return '🌐 Facebook'
    if (host.includes('google.')) return '🔎 Google Пошук'
    if (host.includes('tiktok.com')) return '🎵 TikTok'
    if (host.includes('youtube.com')) return '▶️ YouTube'
    return host.replace(/^www\./, '')
  } catch {
    return ref.slice(0, 30)
  }
}

async function fetchGeoData(): Promise<GeoData> {
  // Local development fallback — avoid external rate limits during dev & tests
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return {
      ip: '127.0.0.1',
      country: 'Ukraine',
      countryCode: 'UA',
      city: 'Kyiv',
      region: 'Kyiv',
      flag: '🇺🇦',
      isp: 'Localhost Dev'
    }
  }

  // Primary: ipwho.is (fast, CORS-friendly, detailed city & emoji flag)
  try {
    const res = await fetch('https://ipwho.is/', { signal: AbortSignal.timeout(2800) })
    const data = await res.json()
    if (data && data.success !== false && data.ip) {
      return {
        ip: data.ip,
        country: data.country || '',
        countryCode: data.country_code || '',
        city: data.city || '',
        region: data.region || '',
        flag: data.flag?.emoji || '🌐',
        isp: data.connection?.isp || ''
      }
    }
  } catch {
    // Continue to fallback
  }

  // Fallback: freeipapi.com
  try {
    const res = await fetch('https://freeipapi.com/api/json', { signal: AbortSignal.timeout(2800) })
    const data = await res.json()
    if (data && data.ipAddress) {
      return {
        ip: data.ipAddress,
        country: data.countryName || '',
        countryCode: data.countryCode || '',
        city: data.cityName || '',
        region: data.regionName || '',
        flag: '🌐',
        isp: ''
      }
    }
  } catch {
    // Continue to fallback
  }

  // Last Resort: api.ipify.org
  try {
    const res = await fetch('https://api.ipify.org?format=json', { signal: AbortSignal.timeout(2000) })
    const data = await res.json()
    if (data && data.ip) {
      return {
        ip: data.ip,
        country: '',
        countryCode: '',
        city: '',
        region: '',
        flag: '🌐',
        isp: ''
      }
    }
  } catch {
    // Nothing
  }

  return {
    ip: 'Unknown IP',
    country: '',
    countryCode: '',
    city: '',
    region: '',
    flag: '🌐',
    isp: ''
  }
}

// Global active session state
class VisitorSessionTracker {
  private sessionId = `s_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
  private messageId: number | null = null
  private activeSeconds = 0
  private maxScrollPercent = 0
  private deepestSectionIndex = 0
  private currentSectionId: TrackedSectionId = 'hero'
  private interactions = new Set<string>()
  private isInitialized = false
  private geo: GeoData | null = null
  private device = parseDevice()
  private referrer = parseReferrer()
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null
  private dwellInterval: ReturnType<typeof setInterval> | null = null
  private exitBeaconSent = false

  public cleanup() {
    if (this.heartbeatTimer) clearInterval(this.heartbeatTimer)
    if (this.dwellInterval) clearInterval(this.dwellInterval)
  }

  public async init() {
    if (this.isInitialized || typeof window === 'undefined') return
    this.isInitialized = true

    // Recover or generate session id in sessionStorage
    const storedSession = sessionStorage.getItem('alina_v_session')
    if (storedSession) {
      try {
        const parsed = JSON.parse(storedSession)
        if (parsed.id && (Date.now() - parsed.created < 45 * 60 * 1000)) {
          this.sessionId = parsed.id
          this.messageId = parsed.messageId || null
        }
      } catch {
        // Ignore
      }
    }

    // 1. Start active dwell time ticker (only increments when tab is visible)
    this.dwellInterval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        this.activeSeconds++
      }
    }, 1000)

    // 2. Fetch Geo & Send Start Ping
    this.geo = await fetchGeoData()
    await this.sendPing('start')

    // 3. Setup Scroll & Section Observers
    this.setupScrollTracking()
    this.setupSectionObserver()

    // 4. Milestone Heartbeats (15s, 45s, 90s, 180s, and every 30s)
    let nextMilestoneIdx = 0
    const milestones = [15, 45, 90, 180]
    this.heartbeatTimer = setInterval(() => {
      if (document.visibilityState !== 'visible') return

      let shouldPing = false
      if (nextMilestoneIdx < milestones.length && this.activeSeconds >= milestones[nextMilestoneIdx]) {
        shouldPing = true
        nextMilestoneIdx++
      } else if (nextMilestoneIdx >= milestones.length && this.activeSeconds % 30 === 0) {
        shouldPing = true
      }

      if (shouldPing) {
        this.sendPing('heartbeat')
      }
    }, 2000)

    // 5. Visibility Change & Exit Listeners
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.sendExitBeacon()
      } else {
        // Returned to tab
        this.exitBeaconSent = false
      }
    })

    window.addEventListener('pagehide', () => {
      this.sendExitBeacon()
    })

    window.addEventListener('beforeunload', () => {
      this.sendExitBeacon()
    })
  }

  public recordInteraction(interactionName: string, detail?: string) {
    const entry = detail ? `${interactionName}:${detail}` : interactionName
    this.interactions.add(entry)

    // If high-priority action (e.g. opened booking modal), trigger instant heartbeat update
    if (interactionName === 'opened_booking_modal' || interactionName === 'submitted_booking') {
      this.sendPing('heartbeat')
    }
  }

  private setupScrollTracking() {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset || 0
          const windowHeight = window.innerHeight || 800
          const docHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            windowHeight
          )
          const percent = Math.min(100, Math.round(((scrollY + windowHeight) / docHeight) * 100))
          if (percent > this.maxScrollPercent) {
            this.maxScrollPercent = percent
          }
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
  }

  private setupSectionObserver() {
    if (typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            const sectionId = entry.target.id as TrackedSectionId
            if (sectionId) {
              this.currentSectionId = sectionId

              // Update furthest section reached
              const sIdx = TRACKED_SECTIONS.findIndex((s) => s.id === sectionId)
              if (sIdx > this.deepestSectionIndex) {
                this.deepestSectionIndex = sIdx
              }
            }
          }
        }
      },
      {
        threshold: [0.2, 0.5]
      }
    )

    // Observe all tracked sections on DOM ready
    setTimeout(() => {
      for (const s of TRACKED_SECTIONS) {
        const el = document.getElementById(s.id)
        if (el) {
          observer.observe(el)
        }
      }
    }, 500)
  }

  private getDeepestSectionId(): TrackedSectionId {
    return TRACKED_SECTIONS[this.deepestSectionIndex]?.id || 'hero'
  }

  private buildPayload(action: 'start' | 'heartbeat' | 'exit') {
    return {
      action,
      sessionId: this.sessionId,
      messageId: this.messageId,
      timeSpent: this.activeSeconds,
      maxScrollPercent: this.maxScrollPercent,
      deepestSection: this.getDeepestSectionId(),
      currentSection: this.currentSectionId,
      exitSection: this.currentSectionId,
      interactions: Array.from(this.interactions),
      ip: this.geo?.ip || 'Unknown IP',
      country: this.geo?.country || '',
      countryCode: this.geo?.countryCode || '',
      city: this.geo?.city || '',
      region: this.geo?.region || '',
      flag: this.geo?.flag || '🌐',
      isp: this.geo?.isp || '',
      deviceType: this.device.deviceType,
      os: this.device.os,
      browser: this.device.browser,
      screen: this.device.screen,
      language: this.device.language,
      referrer: this.referrer,
      path: window.location.pathname + window.location.hash
    }
  }

  private async sendPing(action: 'start' | 'heartbeat') {
    if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      return // Don't trigger 502 from Vite proxy when local backend server is not running
    }

    const payload = this.buildPayload(action)

    try {
      const res = await fetch('/api/visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(3500)
      })

      if (res.ok) {
        const data = await res.json().catch(() => ({}))
        if (data.messageId && !this.messageId) {
          this.messageId = data.messageId
          sessionStorage.setItem(
            'alina_v_session',
            JSON.stringify({
              id: this.sessionId,
              messageId: this.messageId,
              created: Date.now()
            })
          )
        }
      }
    } catch {
      // Backend offline or direct Telegram fallback handled if needed
    }
  }

  private sendExitBeacon() {
    if (this.exitBeaconSent) return
    if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      return
    }
    this.exitBeaconSent = true

    const payload = this.buildPayload('exit')
    const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' })

    // Use sendBeacon for guaranteed delivery on window close/tab hide
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/visit', blob)
    } else {
      fetch('/api/visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(() => {})
    }
  }
}

// Singleton tracker instance
const trackerInstance = new VisitorSessionTracker()

export function trackSiteVisitor() {
  trackerInstance.init()
}

export function trackVisitorInteraction(interactionName: string, detail?: string) {
  trackerInstance.recordInteraction(interactionName, detail)
}
