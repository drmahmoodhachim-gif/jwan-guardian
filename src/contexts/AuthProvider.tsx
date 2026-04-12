import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import type { Profile } from '../types'
import i18n from '../lib/i18n'
import { persistLanguage } from '../lib/i18n'
import { initDomFromStoredLang } from '../lib/languageDom'
import { AuthContext } from './auth-context'

async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle()
  if (error) {
    console.error('[auth] profile fetch', error.message)
    return null
  }
  return data as Profile | null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [sessionResolved, setSessionResolved] = useState(false)
  const [loading, setLoading] = useState(true)

  const syncLanguageFromProfile = useCallback((p: Profile | null) => {
    if (p?.preferred_lang) {
      const lang = p.preferred_lang
      void i18n.changeLanguage(lang)
      persistLanguage(lang)
      initDomFromStoredLang(lang)
    }
  }, [])

  const refreshProfile = useCallback(async () => {
    if (!user) {
      setProfile(null)
      return
    }
    const p = await fetchProfile(user.id)
    setProfile(p)
    syncLanguageFromProfile(p)
  }, [user, syncLanguageFromProfile])

  useEffect(() => {
    let cancelled = false

    supabase.auth
      .getSession()
      .then(({ data: { session: s } }) => {
        if (cancelled) return
        setSession(s)
        setUser(s?.user ?? null)
        setSessionResolved(true)
      })
      .catch(() => {
        if (cancelled) return
        setSessionResolved(true)
      })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
      setUser(s?.user ?? null)
    })

    return () => {
      cancelled = true
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!sessionResolved) {
      return
    }
    if (!user) {
      const id = requestAnimationFrame(() => {
        setProfile(null)
        setLoading(false)
      })
      return () => cancelAnimationFrame(id)
    }
    let cancelled = false
    void Promise.resolve().then(() => {
      if (cancelled) return
      setLoading(true)
      void fetchProfile(user.id).then((p) => {
        if (cancelled) return
        setProfile(p)
        syncLanguageFromProfile(p)
        setLoading(false)
      })
    })
    return () => {
      cancelled = true
    }
  }, [sessionResolved, user, syncLanguageFromProfile])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    setProfile(null)
  }, [])

  const value = useMemo(
    () => ({
      session,
      user,
      profile,
      loading,
      refreshProfile,
      signOut,
    }),
    [session, user, profile, loading, refreshProfile, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
