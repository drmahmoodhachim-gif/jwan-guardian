import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Reminder } from '../types'

export function useReminders(options?: { onlyActive?: boolean }) {
  const onlyActive = options?.onlyActive ?? true
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [loading, setLoading] = useState(true)

  const fetchReminders = useCallback(async () => {
    let q = supabase.from('reminders').select('*').order('created_at', { ascending: true })
    if (onlyActive) {
      q = q.eq('is_active', true)
    }
    const { data, error } = await q

    if (error) {
      console.error('[reminders]', error.message)
      setLoading(false)
      return
    }
    setReminders((data ?? []) as Reminder[])
    setLoading(false)
  }, [onlyActive])

  useEffect(() => {
    void Promise.resolve().then(() => fetchReminders())
  }, [fetchReminders])

  useEffect(() => {
    const ch = supabase
      .channel('reminders-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'reminders' },
        () => {
          void fetchReminders()
        },
      )
      .subscribe()
    return () => {
      void supabase.removeChannel(ch)
    }
  }, [fetchReminders])

  const addReminder = useCallback(
    async (row: {
      text_en: string
      text_ar: string | null
      frequency: Reminder['frequency']
      assigned_to: string
      created_by: string | null
    }) => {
      const { error } = await supabase.from('reminders').insert({
        ...row,
        is_active: true,
      })
      if (error) return { error: error.message }
      await fetchReminders()
      return { error: null as string | null }
    },
    [fetchReminders],
  )

  const updateReminder = useCallback(
    async (id: string, patch: Partial<Pick<Reminder, 'text_en' | 'text_ar' | 'frequency' | 'assigned_to' | 'is_active'>>) => {
      const { error } = await supabase.from('reminders').update(patch).eq('id', id)
      if (error) return { error: error.message }
      await fetchReminders()
      return { error: null as string | null }
    },
    [fetchReminders],
  )

  const removeReminder = useCallback(
    async (id: string) => {
      const { error } = await supabase.from('reminders').delete().eq('id', id)
      if (error) return { error: error.message }
      await fetchReminders()
      return { error: null as string | null }
    },
    [fetchReminders],
  )

  return {
    reminders,
    loading,
    refetch: fetchReminders,
    addReminder,
    updateReminder,
    removeReminder,
  }
}
