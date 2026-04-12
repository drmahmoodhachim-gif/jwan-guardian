import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Checkin, CheckinMood, ZoneColor } from '../types'

export function useCheckins() {
  const [checkins, setCheckins] = useState<Checkin[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCheckins = useCallback(async () => {
    const { data, error } = await supabase
      .from('checkins')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(40)

    if (error) {
      console.error('[checkins]', error.message)
      setLoading(false)
      return
    }
    setCheckins((data ?? []) as Checkin[])
    setLoading(false)
  }, [])

  useEffect(() => {
    void Promise.resolve().then(() => fetchCheckins())
  }, [fetchCheckins])

  useEffect(() => {
    const ch = supabase
      .channel('checkins-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'checkins' },
        () => {
          void fetchCheckins()
        },
      )
      .subscribe()
    return () => {
      void supabase.removeChannel(ch)
    }
  }, [fetchCheckins])

  const addCheckin = useCallback(
    async (mood: CheckinMood, mood_note?: string | null, zone?: ZoneColor | null) => {
      const { error } = await supabase.from('checkins').insert({
        mood,
        mood_note: mood_note?.trim() || null,
        zone: zone ?? null,
      })
      if (error) return { error: error.message }
      await fetchCheckins()
      return { error: null as string | null }
    },
    [fetchCheckins],
  )

  return { checkins, loading, addCheckin, refetch: fetchCheckins }
}
