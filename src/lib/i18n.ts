import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../locales/en.json'
import ar from '../locales/ar.json'
import { applyDomLanguage } from './languageDom'

const STORAGE_KEY = 'jwan-guardian-lang'

function getStoredLang(): 'en' | 'ar' {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw === 'ar' ? 'ar' : 'en'
}

const initialLang = getStoredLang()

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: initialLang,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

applyDomLanguage(initialLang)

export function persistLanguage(lang: 'en' | 'ar') {
  localStorage.setItem(STORAGE_KEY, lang)
}

export { STORAGE_KEY as LANG_STORAGE_KEY }

export default i18n
