import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Reminder } from '../types'

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    void supabase
      .from('reminders')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) {
          console.error('[reminders]', error.message)
          setLoading(false)
          return
        }
        setReminders((data ?? []) as Reminder[])
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { reminders, loading }
}
