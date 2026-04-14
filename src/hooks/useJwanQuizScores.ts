import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export interface QuizScoreRow { id: string; score: number; total: number; streak: number; session_date: string }

export function useJwanQuizScores() {
  const [latest, setLatest] = useState<QuizScoreRow | null>(null)

  const fetchLatest = useCallback(async () => {
    const { data } = await supabase.from('jwan_quiz_scores').select('*').order('session_date', { ascending: false }).limit(1).maybeSingle()
    if (data) setLatest(data as QuizScoreRow)
  }, [])

  useEffect(() => {
    void Promise.resolve().then(() => fetchLatest())
  }, [fetchLatest])

  const saveScore = useCallback(async (score: number, total: number, streak: number) => {
    const { error } = await supabase.from('jwan_quiz_scores').insert({ score, total, streak })
    if (!error) await fetchLatest()
    return { error: error?.message ?? null }
  }, [fetchLatest])

  return { latest, saveScore, refetch: fetchLatest }
}

