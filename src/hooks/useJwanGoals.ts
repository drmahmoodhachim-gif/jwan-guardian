import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export interface JwanGoalRow {
  id: string
  goal_text: string
  is_done: boolean
  week_start: string
  created_at: string
}

export function useJwanGoals(weekStart: string) {
  const [goals, setGoals] = useState<JwanGoalRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchGoals = useCallback(async () => {
    setLoading(true)
    const { data, error: q } = await supabase
      .from('jwan_goals')
      .select('*')
      .eq('week_start', weekStart)
      .order('created_at', { ascending: true })

    if (q) {
      setError(q.message)
      setGoals([])
    } else {
      setError(null)
      setGoals((data ?? []) as JwanGoalRow[])
    }
    setLoading(false)
  }, [weekStart])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional load
    void fetchGoals()
  }, [fetchGoals])

  const addGoal = useCallback(
    async (text: string) => {
      const t = text.trim()
      if (!t) return { error: 'Empty goal' as const }
      const { error: e } = await supabase.from('jwan_goals').insert({
        goal_text: t,
        week_start: weekStart,
        is_done: false,
      })
      if (e) return { error: e.message }
      await fetchGoals()
      return { error: null as string | null }
    },
    [weekStart, fetchGoals],
  )

  const completeGoal = useCallback(
    async (id: string, isDone: boolean) => {
      const { error: e } = await supabase.from('jwan_goals').update({ is_done: isDone }).eq('id', id)
      if (e) return { error: e.message }
      await fetchGoals()
      return { error: null as string | null }
    },
    [fetchGoals],
  )

  const toggleGoal = useCallback(
    async (id: string, current: boolean) => {
      return completeGoal(id, !current)
    },
    [completeGoal],
  )

  const deleteGoal = useCallback(
    async (id: string) => {
      const { error: e } = await supabase.from('jwan_goals').delete().eq('id', id)
      if (e) return { error: e.message }
      await fetchGoals()
      return { error: null as string | null }
    },
    [fetchGoals],
  )

  return {
    goals,
    loading,
    error,
    refetch: fetchGoals,
    addGoal,
    completeGoal,
    toggleGoal,
    deleteGoal,
  }
}
