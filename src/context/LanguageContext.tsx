import React, { createContext, useContext, useState, useEffect } from 'react'
import type { Language, TranslationDictionary } from '../data/translations'
import { TRANSLATIONS } from '../data/translations'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  toggleLang: () => void
  t: TranslationDictionary
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = 'alina_smm_language_v1'

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always default to Ukrainian ('ua') when first entering the site
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'ua' || saved === 'en') {
        return saved
      }
    } catch {
      // ignore localStorage errors (e.g. private mode)
    }
    return 'ua'
  })

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    try {
      localStorage.setItem(STORAGE_KEY, newLang)
    } catch {
      // ignore
    }
  }

  const toggleLang = () => {
    setLang(lang === 'ua' ? 'en' : 'ua')
  }

  // Update HTML lang attribute
  useEffect(() => {
    document.documentElement.lang = lang === 'ua' ? 'uk' : 'en'
  }, [lang])

  const t = TRANSLATIONS[lang]

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
