import type { PreferredLang } from '../types'

export function applyDomLanguage(lang: PreferredLang) {
  document.documentElement.lang = lang === 'ar' ? 'ar' : 'en'
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
}

export function initDomFromStoredLang(lang: 'en' | 'ar') {
  applyDomLanguage(lang)
}
