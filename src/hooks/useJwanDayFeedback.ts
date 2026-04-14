import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export interface JwanDayFeedbackRow {
  id: string
  feedback_date: string
  note: string
  exercises: Record<string, boolean>
  ai_summary: string | null
}

export function useJwanDayFeedback() {
  const [row, setRow] = useState<JwanDayFeedbackRow | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchToday = useCallback(async () => {
    const today = new Date().toISOString().slice(0, 10)
    const { data } = await supabase
      .from('jwan_day_feedback')
      .select('*')
      .eq('feedback_date', today)
      .maybeSingle()
    setRow((data as JwanDayFeedbackRow | null) ?? null)
    setLoading(false)
  }, [])

  useEffect(() => {
    void Promise.resolve().then(() => fetchToday())
  }, [fetchToday])

  const saveToday = useCallback(
    async (payload: { note: string; exercises: Record<string, boolean>; ai_summary?: string }) => {
      const today = new Date().toISOString().slice(0, 10)
      const { data, error } = await supabase
        .from('jwan_day_feedback')
        .upsert(
          {
            feedback_date: today,
            note: payload.note,
            exercises: payload.exercises,
            ai_summary: payload.ai_summary ?? null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'feedback_date' },
        )
        .select()
        .single()
      if (!error) setRow(data as JwanDayFeedbackRow)
      return { error: error?.message ?? null }
    },
    [],
  )

  return { row, loading, saveToday, refetch: fetchToday }
}

