import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { PreferredLang } from '../types'
import { persistLanguage } from '../lib/i18n'
import { supabase } from '../lib/supabase'
import { applyDomLanguage } from '../lib/languageDom'

export function useLanguage() {
  const { i18n } = useTranslation()

  const setLanguage = useCallback(
    async (lang: PreferredLang, options?: { profileId?: string }) => {
      await i18n.changeLanguage(lang)
      persistLanguage(lang)
      applyDomLanguage(lang)

      if (options?.profileId) {
        await supabase.from('profiles').update({ preferred_lang: lang }).eq('id', options.profileId)
      }
    },
    [i18n],
  )

  const toggleLanguage = useCallback(
    async (profileId?: string) => {
      const next: PreferredLang = i18n.language?.startsWith('ar') ? 'en' : 'ar'
      await setLanguage(next, profileId ? { profileId } : undefined)
    },
    [i18n.language, setLanguage],
  )

  return {
    language: (i18n.language?.startsWith('ar') ? 'ar' : 'en') as PreferredLang,
    setLanguage,
    toggleLanguage,
    applyDomLanguage,
  }
}
