import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Achievement } from '../types'

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)

  const fetchAchievements = useCallback(async () => {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(80)

    if (error) {
      console.error('[achievements]', error.message)
      setLoading(false)
      return
    }
    setAchievements((data ?? []) as Achievement[])
    setLoading(false)
  }, [])

  useEffect(() => {
    void Promise.resolve().then(() => fetchAchievements())
  }, [fetchAchievements])

  useEffect(() => {
    const ch = supabase
      .channel('achievements-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'achievements' },
        () => {
          void fetchAchievements()
        },
      )
      .subscribe()
    return () => {
      void supabase.removeChannel(ch)
    }
  }, [fetchAchievements])

  const addAchievement = useCallback(
    async (row: {
      text_en: string
      text_ar: string | null
      is_jwan_entry: boolean
      added_by: string | null
    }) => {
      const { error } = await supabase.from('achievements').insert(row)
      if (error) return { error: error.message }
      await fetchAchievements()
      return { error: null as string | null }
    },
    [fetchAchievements],
  )

  return { achievements, loading, addAchievement, refetch: fetchAchievements }
}
