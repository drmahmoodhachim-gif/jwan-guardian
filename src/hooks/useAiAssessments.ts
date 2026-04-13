import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export type AiTaskType = 'emo_detective' | 'memory_spark' | 'story_mind' | 'my_world'

export interface AiAssessmentRow {
  id: string
  task_type: AiTaskType
  score: number | null
  max_span: number | null
  accuracy_pct: number | null
  domain_scores: Record<string, unknown> | null
  raw_responses: unknown | null
  world_ratings: number[] | null
  world_demand_avg: number | null
  world_safety_avg: number | null
  session_date: string
}

export function useAiAssessments() {
  const [rows, setRows] = useState<AiAssessmentRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRows = useCallback(async () => {
    setLoading(true)
    const { data, error: qErr } = await supabase
      .from('ai_assessments')
      .select('*')
      .order('session_date', { ascending: false })
      .limit(100)

    if (qErr) {
      setError(qErr.message)
      setRows([])
      setLoading(false)
      return
    }
    setError(null)
    setRows((data ?? []) as AiAssessmentRow[])
    setLoading(false)
  }, [])

  useEffect(() => {
    // Mount-only Supabase load; fetchRows updates loading/error state.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional initial fetch
    void fetchRows()
  }, [fetchRows])

  const saveAssessment = useCallback(
    async (payload: {
      task_type: AiTaskType
      score?: number | null
      max_span?: number | null
      accuracy_pct?: number | null
      domain_scores?: Record<string, unknown> | null
      raw_responses?: unknown | null
      world_ratings?: number[] | null
      world_demand_avg?: number | null
      world_safety_avg?: number | null
    }) => {
      const { error: insErr } = await supabase.from('ai_assessments').insert({
        task_type: payload.task_type,
        score: payload.score ?? null,
        max_span: payload.max_span ?? null,
        accuracy_pct: payload.accuracy_pct ?? null,
        domain_scores: payload.domain_scores ?? null,
        raw_responses: payload.raw_responses ?? null,
        world_ratings: payload.world_ratings ?? null,
        world_demand_avg: payload.world_demand_avg ?? null,
        world_safety_avg: payload.world_safety_avg ?? null,
      })
      if (insErr) return { error: insErr.message }
      await fetchRows()
      return { error: null as string | null }
    },
    [fetchRows],
  )

  return { rows, loading, error, refetch: fetchRows, saveAssessment }
}
