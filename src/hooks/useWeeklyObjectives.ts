import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import { getTemplateById, type ObjectiveCategory, type ObjectiveTemplate } from '../data/weeklyObjectives'
import { getWeekDateStrings } from '../lib/weekUtils'

export type CompletionStatus = 'done' | 'partial' | 'skip' | 'none'

export interface WeeklyObjectiveRow {
  id: string
  template_id: string | null
  week_start: string
  is_custom: boolean
  category: string
  title: string
  description: string | null
  source_reference: string | null
  assigned_to: string | null
  active_days: number[] | null
  is_active: boolean
  created_at: string
}

export interface WeeklyCompletionRow {
  id: string
  objective_id: string
  completion_date: string
  status: CompletionStatus
  notes: string | null
  logged_by: string | null
}

function completionKey(objectiveId: string, dateStr: string) {
  return `${objectiveId}|${dateStr}`
}

export function useWeeklyObjectives(weekStart: string) {
  const [objectives, setObjectives] = useState<WeeklyObjectiveRow[]>([])
  const [completions, setCompletions] = useState<WeeklyCompletionRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const weekDates = useMemo(() => getWeekDateStrings(weekStart), [weekStart])

  const fetchAll = useCallback(async () => {
    setLoading(true)
    const { data: objs, error: e1 } = await supabase
      .from('weekly_objectives')
      .select('*')
      .eq('week_start', weekStart)
      .eq('is_active', true)
      .order('created_at', { ascending: true })

    if (e1) {
      setError(e1.message)
      setObjectives([])
      setCompletions([])
      setLoading(false)
      return
    }

    const list = (objs ?? []) as WeeklyObjectiveRow[]
    setObjectives(list)
    setError(null)

    if (list.length === 0) {
      setCompletions([])
      setLoading(false)
      return
    }

    const ids = list.map((o) => o.id)
    const { data: comp, error: e2 } = await supabase
      .from('weekly_completions')
      .select('*')
      .in('objective_id', ids)
      .gte('completion_date', weekDates[0]!)
      .lte('completion_date', weekDates[6]!)

    if (e2) {
      setError(e2.message)
      setCompletions([])
    } else {
      setCompletions((comp ?? []) as WeeklyCompletionRow[])
    }
    setLoading(false)
  }, [weekStart, weekDates])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional load
    void fetchAll()
  }, [fetchAll])

  const completionMap = useMemo(() => {
    const m = new Map<string, CompletionStatus>()
    for (const c of completions) {
      if (c.status !== 'none') m.set(completionKey(c.objective_id, c.completion_date), c.status)
    }
    return m
  }, [completions])

  const getCompletionStatus = useCallback(
    (objectiveId: string, dateStr: string): CompletionStatus => {
      return completionMap.get(completionKey(objectiveId, dateStr)) ?? 'none'
    },
    [completionMap],
  )

  const setCompletion = useCallback(
    async (objectiveId: string, dateStr: string, status: CompletionStatus) => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      const loggedBy = user?.id ?? null

      if (status === 'none') {
        const { error: delErr } = await supabase
          .from('weekly_completions')
          .delete()
          .eq('objective_id', objectiveId)
          .eq('completion_date', dateStr)
        if (delErr) {
          setError(delErr.message)
          return
        }
      } else {
        const { error: upErr } = await supabase.from('weekly_completions').upsert(
          {
            objective_id: objectiveId,
            completion_date: dateStr,
            status,
            logged_by: loggedBy,
          },
          { onConflict: 'objective_id,completion_date' },
        )
        if (upErr) {
          setError(upErr.message)
          return
        }
      }
      setError(null)
      await fetchAll()
    },
    [fetchAll],
  )

  const cycleCompletion = useCallback(
    async (objectiveId: string, dateStr: string) => {
      const cur = getCompletionStatus(objectiveId, dateStr)
      const order: CompletionStatus[] = ['none', 'done', 'partial', 'skip']
      const i = order.indexOf(cur)
      const next = order[(i + 1) % 4]!
      await setCompletion(objectiveId, dateStr, next)
    },
    [getCompletionStatus, setCompletion],
  )

  const addObjectiveFromTemplate = useCallback(
    async (templateId: string) => {
      const t = getTemplateById(templateId)
      if (!t) return { error: 'Unknown template' as const }
      const { data: existing } = await supabase
        .from('weekly_objectives')
        .select('id, is_active')
        .eq('template_id', templateId)
        .eq('week_start', weekStart)
        .maybeSingle()

      if (existing) {
        const { error: u } = await supabase
          .from('weekly_objectives')
          .update({ is_active: true })
          .eq('id', (existing as { id: string }).id)
        if (u) return { error: u.message }
        await fetchAll()
        return { error: null as string | null }
      }

      const { error: ins } = await supabase.from('weekly_objectives').insert({
        template_id: templateId,
        week_start: weekStart,
        is_custom: false,
        category: t.category,
        title: t.title,
        description: t.description,
        source_reference: t.source,
        assigned_to: t.assignedTo,
        active_days: t.activeDays,
        is_active: true,
      })
      if (ins) return { error: ins.message }
      await fetchAll()
      return { error: null as string | null }
    },
    [weekStart, fetchAll],
  )

  const addCustomObjective = useCallback(
    async (title: string, description: string, category: ObjectiveCategory) => {
      const { error: ins } = await supabase.from('weekly_objectives').insert({
        week_start: weekStart,
        is_custom: true,
        template_id: null,
        category,
        title,
        description: description || null,
        source_reference: null,
        assigned_to: 'all',
        active_days: [0, 1, 2, 3, 4, 5, 6],
        is_active: true,
      })
      if (ins) return { error: ins.message }
      await fetchAll()
      return { error: null as string | null }
    },
    [weekStart, fetchAll],
  )

  const removeObjective = useCallback(
    async (id: string) => {
      const { error: u } = await supabase.from('weekly_objectives').update({ is_active: false }).eq('id', id)
      if (u) return { error: u.message }
      await fetchAll()
      return { error: null as string | null }
    },
    [fetchAll],
  )

  const getWeekSummary = useCallback(() => {
    let totalCells = 0
    let doneCells = 0
    let partialCells = 0
    for (const o of objectives) {
      const days = o.active_days ?? [0, 1, 2, 3, 4, 5, 6]
      for (let di = 0; di < 7; di++) {
        if (!days.includes(di)) continue
        const dateStr = weekDates[di]!
        totalCells++
        const st = getCompletionStatus(o.id, dateStr)
        if (st === 'done') doneCells++
        if (st === 'partial') partialCells++
      }
    }
    const pct = totalCells > 0 ? Math.round(((doneCells + partialCells * 0.5) / totalCells) * 100) : 0
    return {
      totalCells,
      doneCells,
      partialCells,
      skipCells: objectives.reduce((acc, o) => {
        const days = o.active_days ?? []
        let s = 0
        for (let di = 0; di < 7; di++) {
          if (!days.includes(di)) continue
          if (getCompletionStatus(o.id, weekDates[di]!) === 'skip') s++
        }
        return acc + s
      }, 0),
      completionPct: pct,
      activeObjectiveCount: objectives.length,
    }
  }, [objectives, weekDates, getCompletionStatus])

  const carryForwardToNextWeek = useCallback(
    async (nextWeekStart: string) => {
      const templates = objectives.filter((o) => o.template_id).map((o) => o.template_id!)
      for (const tid of templates) {
        const { data: exists } = await supabase
          .from('weekly_objectives')
          .select('id')
          .eq('template_id', tid)
          .eq('week_start', nextWeekStart)
          .maybeSingle()
        if (exists) continue
        const t = getTemplateById(tid)
        if (!t) continue
        await supabase.from('weekly_objectives').insert({
          template_id: tid,
          week_start: nextWeekStart,
          is_custom: false,
          category: t.category,
          title: t.title,
          description: t.description,
          source_reference: t.source,
          assigned_to: t.assignedTo,
          active_days: t.activeDays,
          is_active: true,
        })
      }
      return { error: null as string | null }
    },
    [objectives],
  )

  return {
    objectives,
    weekDates,
    loading,
    error,
    refetch: fetchAll,
    getCompletionStatus,
    setCompletion,
    cycleCompletion,
    addObjectiveFromTemplate,
    addCustomObjective,
    removeObjective,
    getWeekSummary,
    carryForwardToNextWeek,
    completionMap,
  }
}

export type { ObjectiveCategory, ObjectiveTemplate }
