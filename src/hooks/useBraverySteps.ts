import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import { BRAVERY_STEPS } from '../data/matildaSteps'

export function useBraverySteps() {
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [comfortLevel, setComfortLevel] = useState<number>(3)

  const fetchAll = useCallback(async () => {
    const { data } = await supabase.from('jwan_bravery_steps').select('step_id').order('completed_at')
    if (data) setCompletedSteps((data as { step_id: string }[]).map((x) => x.step_id))
    const { data: comfort } = await supabase.from('jwan_comfort_log').select('level').order('logged_at', { ascending: false }).limit(1).maybeSingle()
    if (comfort?.level) setComfortLevel(comfort.level)
  }, [])

  useEffect(() => {
    void Promise.resolve().then(() => fetchAll())
  }, [fetchAll])

  const markStep = useCallback(async (stepId: string) => {
    const { error } = await supabase.from('jwan_bravery_steps').upsert({ step_id: stepId }, { onConflict: 'step_id' })
    if (!error) await fetchAll()
    return { error: error?.message ?? null }
  }, [fetchAll])

  const logComfort = useCallback(async (level: number, context: string) => {
    const { error } = await supabase.from('jwan_comfort_log').insert({ level, context })
    if (!error) {
      setComfortLevel(level)
      await fetchAll()
    }
    return { error: error?.message ?? null }
  }, [fetchAll])

  const getProgress = useMemo(() => {
    const done = completedSteps.length
    const total = BRAVERY_STEPS.length
    const pct = Math.round((done / total) * 100)
    return { done, total, pct }
  }, [completedSteps])

  return { completedSteps, comfortLevel, markStep, logComfort, getProgress, refetch: fetchAll }
}

