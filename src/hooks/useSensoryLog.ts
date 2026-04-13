import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import { getWeekDateStrings } from '../lib/weekUtils'

export type SensorySessionType = 'morning' | 'midday' | 'afternoon'

export interface SensoryLogRow {
  id: string
  session_type: SensorySessionType
  log_date: string
  completed: boolean
  logged_by: string | null
}

export function useSensoryLog(weekStart: string) {
  const [rows, setRows] = useState<SensoryLogRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const weekDates = useMemo(() => getWeekDateStrings(weekStart), [weekStart])

  const fetchRows = useCallback(async () => {
    setLoading(true)
    const { data, error: q } = await supabase
      .from('sensory_log')
      .select('*')
      .gte('log_date', weekDates[0]!)
      .lte('log_date', weekDates[6]!)
      .order('log_date', { ascending: true })

    if (q) {
      setError(q.message)
      setRows([])
    } else {
      setError(null)
      setRows((data ?? []) as SensoryLogRow[])
    }
    setLoading(false)
  }, [weekDates])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional load
    void fetchRows()
  }, [fetchRows])

  const getSession = useCallback(
    (sessionType: SensorySessionType, logDate: string): boolean => {
      const r = rows.find((x) => x.session_type === sessionType && x.log_date === logDate)
      return r?.completed ?? false
    },
    [rows],
  )

  const logSession = useCallback(
    async (sessionType: SensorySessionType, logDate: string, completed: boolean) => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      const { error: e } = await supabase.from('sensory_log').upsert(
        {
          session_type: sessionType,
          log_date: logDate,
          completed,
          logged_by: user?.id ?? null,
        },
        { onConflict: 'session_type,log_date' },
      )
      if (e) {
        setError(e.message)
        return
      }
      setError(null)
      await fetchRows()
    },
    [fetchRows],
  )

  const toggleSession = useCallback(
    async (sessionType: SensorySessionType, logDate: string) => {
      const cur = getSession(sessionType, logDate)
      await logSession(sessionType, logDate, !cur)
    },
    [getSession, logSession],
  )

  return {
    weekDates,
    rows,
    loading,
    error,
    refetch: fetchRows,
    getSession,
    logSession,
    toggleSession,
  }
}
