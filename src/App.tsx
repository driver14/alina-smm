import { useState, lazy, Suspense } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import { BdbSite } from './components/bdb/BdbSite'
import type { SiteVersion } from './components/VersionSwitcher'
import { SmoothScrollProvider } from './providers/SmoothScrollProvider'

// Alternative concepts are review-only: split into separate chunks so the
// production (BDB) experience never downloads them.
const ClassicSite = lazy(() => import('./components/ClassicSite'))
const KineticSite = lazy(() => import('./components/v2/KineticSite').then((m) => ({ default: m.KineticSite })))
const VersionSwitcher = lazy(() => import('./components/VersionSwitcher').then((m) => ({ default: m.VersionSwitcher })))

function readRequestedVersion(): SiteVersion | null {
  if (typeof window === 'undefined') return null
  const v = new URLSearchParams(window.location.search).get('v')
  if (v === 'classic') return 'classic'
  if (v === 'kinetic' || v === 'luxe' || v === 'v2') return 'kinetic'
  if (v === 'bdb' || v === 'v3') return 'bdb'
  return null
}

export function App() {
  const requested = readRequestedVersion()
  // The concept switcher is an internal review tool: visible in dev, or when a
  // reviewer explicitly opens a concept via ?v=… . Public visitors always get BDB.
  const showSwitcher = import.meta.env.DEV || requested !== null

  const [version, setVersion] = useState<SiteVersion>(() => {
    if (requested) return requested
    if (!showSwitcher) return 'bdb'
    try {
      const saved = localStorage.getItem('alina_site_concept')
      if (saved === 'classic' || saved === 'kinetic' || saved === 'bdb') return saved
    } catch {
      /* storage unavailable */
    }
    return 'bdb'
  })

  const handleVersionChange = (newV: SiteVersion) => {
    setVersion(newV)
    try {
      localStorage.setItem('alina_site_concept', newV)
    } catch {
      /* storage unavailable */
    }
  }

  return (
    <SmoothScrollProvider>
      <LanguageProvider>
        <Suspense fallback={<div className="min-h-screen bg-[#EEEBDA]" />}>
          {version === 'bdb' ? <BdbSite /> : version === 'kinetic' ? <KineticSite /> : <ClassicSite />}
          {showSwitcher && <VersionSwitcher version={version} onChange={handleVersionChange} />}
        </Suspense>
      </LanguageProvider>
    </SmoothScrollProvider>
  )
}

export default App
