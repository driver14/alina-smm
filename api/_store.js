// Serverless Persistent Analytics Store via Vercel Private Blob
import { put, get } from '@vercel/blob';

const BLOB_NAME = 'analytics_store_v1.json';
let memoryCache = null;
let cacheTime = 0;
const CACHE_TTL_MS = 2000; // 2 seconds in-memory cache for high throughput

export async function loadAnalytics() {
  const now = Date.now();
  if (memoryCache && (now - cacheTime < CACHE_TTL_MS)) {
    return memoryCache;
  }

  const fallback = memoryCache || { visits: [], leads: [], lastUpdated: new Date().toISOString() };

  try {
    const fetchBlobPromise = (async () => {
      try {
        const blob = await get(BLOB_NAME, { access: 'private' });
        if (!blob || !blob.stream) {
          return fallback;
        }
        const text = await new Response(blob.stream).text();
        const parsed = JSON.parse(text);
        if (!parsed.visits) parsed.visits = [];
        if (!parsed.leads) parsed.leads = [];
        return parsed;
      } catch (err) {
        console.warn('[Store] Read blob error:', err.message);
        return fallback;
      }
    })();

    const timeoutPromise = new Promise((resolve) => {
      setTimeout(() => {
        console.warn('[Store] Blob get() timed out (500ms limit), using memory fallback');
        resolve(fallback);
      }, 500);
    });

    const result = await Promise.race([fetchBlobPromise, timeoutPromise]);
    memoryCache = result;
    cacheTime = now;
    return result;
  } catch (err) {
    console.warn('[Store] loadAnalytics catch:', err.message);
    return fallback;
  }
}

export async function saveAnalytics(data) {
  try {
    data.lastUpdated = new Date().toISOString();
    memoryCache = data;
    cacheTime = Date.now();

    // Keep store size efficient by retaining the last 500 visits
    if (data.visits && data.visits.length > 500) {
      data.visits = data.visits.slice(-500);
    }
    if (data.leads && data.leads.length > 200) {
      data.leads = data.leads.slice(-200);
    }

    const savePromise = put(BLOB_NAME, JSON.stringify(data), {
      access: 'private',
      addRandomSuffix: false,
      allowOverwrite: true
    }).catch(err => {
      console.warn('[Store] Background put error:', err.message);
    });

    const timeoutPromise = new Promise(resolve => setTimeout(resolve, 800));
    await Promise.race([savePromise, timeoutPromise]);
    return true;
  } catch (err) {
    console.warn('[Store] save error:', err.message);
    return false;
  }
}

export async function recordVisitSession(payload, action = 'start') {
  const store = await loadAnalytics();
  const visits = store.visits || [];

  const sessionId = payload.sessionId || `v_${Date.now()}`;
  let existing = visits.find(v => v.id === sessionId);

  if (action === 'start' || !existing) {
    if (!existing) {
      existing = {
        id: sessionId,
        timestamp: new Date().toISOString(),
        ip: payload.ip || 'Unknown IP',
        country: payload.country || 'Україна',
        countryCode: payload.countryCode || '',
        city: payload.city || '',
        region: payload.region || '',
        flag: payload.flag || '🌐',
        isp: payload.isp || '',
        deviceType: payload.deviceType || 'desktop',
        os: payload.os || '',
        browser: payload.browser || '',
        screen: payload.screen || '',
        language: payload.language || 'uk',
        referrer: payload.referrer || 'Direct',
        path: payload.path || '/',
        timeSpent: payload.timeSpent || 0,
        maxScrollPercent: payload.maxScrollPercent || 0,
        deepestSection: payload.deepestSection || 'hero',
        exitSection: payload.exitSection || 'hero',
        interactions: payload.interactions || [],
        messageId: payload.messageId || null
      };
      visits.push(existing);
    }
  } else {
    // Heartbeat or Exit
    existing.timeSpent = Math.max(existing.timeSpent || 0, payload.timeSpent || 0);
    existing.maxScrollPercent = Math.max(existing.maxScrollPercent || 0, payload.maxScrollPercent || 0);
    if (payload.deepestSection) existing.deepestSection = payload.deepestSection;
    if (payload.exitSection) existing.exitSection = payload.exitSection;
    if (payload.messageId && !existing.messageId) existing.messageId = payload.messageId;

    if (Array.isArray(payload.interactions)) {
      existing.interactions = Array.from(new Set([...(existing.interactions || []), ...payload.interactions]));
    }
  }

  await saveAnalytics(store);
  return { store, session: existing };
}

export async function recordLeadSubmission(leadData) {
  const store = await loadAnalytics();
  if (!store.leads) store.leads = [];

  store.leads.push({
    id: `lead_${Date.now()}`,
    timestamp: new Date().toISOString(),
    ...leadData
  });

  await saveAnalytics(store);
  return store;
}
