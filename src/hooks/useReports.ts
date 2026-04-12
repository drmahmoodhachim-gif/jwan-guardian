import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Report, ReportDomain, ReportInsert, ReportUpdate } from '../types'
import { DOMAINS } from '../lib/constants'

export function useReports() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchReports = useCallback(async () => {
    const { data, error: qError } = await supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false })

    if (qError) {
      setError(qError.message)
      setLoading(false)
      return
    }
    setError(null)
    setReports((data ?? []) as Report[])
    setLoading(false)
  }, [])

  useEffect(() => {
    void Promise.resolve().then(() => fetchReports())
  }, [fetchReports])

  useEffect(() => {
    const channel = supabase
      .channel('reports-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'reports' },
        () => {
          void fetchReports()
        },
      )
      .subscribe()

    return () => {
      void supabase.removeChannel(channel)
    }
  }, [fetchReports])

  const addReport = useCallback(async (row: ReportInsert) => {
    const { error: insertError } = await supabase.from('reports').insert({
      ...row,
      updated_at: new Date().toISOString(),
    })
    if (insertError) return { error: insertError.message }
    await fetchReports()
    return { error: null as string | null }
  }, [fetchReports])

  const updateReport = useCallback(
    async (id: string, patch: ReportUpdate) => {
      const { error: upError } = await supabase
        .from('reports')
        .update({ ...patch, updated_at: new Date().toISOString() })
        .eq('id', id)
      if (upError) return { error: upError.message }
      await fetchReports()
      return { error: null as string | null }
    },
    [fetchReports],
  )

  const removeReport = useCallback(
    async (id: string) => {
      const { error: delError } = await supabase.from('reports').delete().eq('id', id)
      if (delError) return { error: delError.message }
      await fetchReports()
      return { error: null as string | null }
    },
    [fetchReports],
  )

  const domainAverages = useMemo(() => {
    const sums: Record<string, { sum: number; n: number }> = {}
    for (const d of DOMAINS) {
      sums[d.id] = { sum: 0, n: 0 }
    }
    for (const r of reports) {
      if (r.rating == null) continue
      const bucket = sums[r.domain]
      if (!bucket) continue
      bucket.sum += r.rating
      bucket.n += 1
    }
    const out: Record<string, number | null> = {}
    for (const d of DOMAINS) {
      const b = sums[d.id]
      out[d.id] = b.n === 0 ? null : b.sum / b.n
    }
    return out
  }, [reports])

  return {
    reports,
    loading,
    error,
    refetch: fetchReports,
    addReport,
    updateReport,
    removeReport,
    domainAverages,
  }
}

export function filterReports(
  list: Report[],
  roleFilter: string,
  domainFilter: ReportDomain | 'all',
): Report[] {
  return list.filter((r) => {
    if (roleFilter !== 'all' && r.role !== roleFilter) return false
    if (domainFilter !== 'all' && r.domain !== domainFilter) return false
    return true
  })
}
