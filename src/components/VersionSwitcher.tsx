import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Flame, Compass } from 'lucide-react'

export type SiteVersion = 'classic' | 'kinetic' | 'bdb'

interface VersionSwitcherProps {
  version: SiteVersion
  onChange: (version: SiteVersion) => void
}

export const VersionSwitcher: React.FC<VersionSwitcherProps> = ({ version, onChange }) => {
  return (
    <aside
      aria-label="Режим концепту дизайну"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1.5 pointer-events-auto select-none"
    >
      <div className="flex items-center gap-1 p-1 rounded-full bg-[#0E100F]/90 backdrop-blur-md border border-white/15 shadow-2xl shadow-black/60">
        
        {/* V1: Classic */}
        <button
          type="button"
          onClick={() => onChange('classic')}
          className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide transition-colors duration-200 flex items-center gap-1.5 cursor-pointer ${
            version === 'classic' ? 'text-[#141937]' : 'text-white/70 hover:text-white'
          }`}
        >
          {version === 'classic' && (
            <motion.div
              layoutId="version-pill"
              className="absolute inset-0 bg-[#EEEBDA] rounded-full shadow-sm"
              transition={{ type: 'spring', stiffness: 450, damping: 32 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Класичний</span>
            <span className="sm:hidden">V1</span>
          </span>
        </button>

        {/* V2: Kinetic Luxe */}
        <button
          type="button"
          onClick={() => onChange('kinetic')}
          className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide transition-colors duration-200 flex items-center gap-1.5 cursor-pointer ${
            version === 'kinetic' ? 'text-[#141937]' : 'text-white/70 hover:text-white'
          }`}
        >
          {version === 'kinetic' && (
            <motion.div
              layoutId="version-pill"
              className="absolute inset-0 bg-gradient-to-r from-[#F3C3CF] to-[#E2C39B] rounded-full shadow-sm"
              transition={{ type: 'spring', stiffness: 450, damping: 32 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5 font-bold">
            <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Kinetic Luxe</span>
            <span className="sm:hidden">V2</span>
          </span>
        </button>

        {/* V3: BDB Edition */}
        <button
          type="button"
          onClick={() => onChange('bdb')}
          className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide transition-colors duration-200 flex items-center gap-1.5 cursor-pointer ${
            version === 'bdb' ? 'text-white' : 'text-white/70 hover:text-white'
          }`}
        >
          {version === 'bdb' && (
            <motion.div
              layoutId="version-pill"
              className="absolute inset-0 bg-[#141937] border border-white/20 rounded-full shadow-md"
              transition={{ type: 'spring', stiffness: 450, damping: 32 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5 font-bold">
            <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F3C3CF]" aria-hidden="true" />
            <span className="hidden sm:inline">BDB Edition (V3)</span>
            <span className="sm:hidden">BDB</span>
          </span>
        </button>

      </div>

      <span className="hidden sm:inline text-[9px] font-mono-tech tracking-wider uppercase text-white/70 bg-black/60 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-white/10 shadow-sm">
        Локальний прев’ю • Без деплою на сервер
      </span>
    </aside>
  )
}
