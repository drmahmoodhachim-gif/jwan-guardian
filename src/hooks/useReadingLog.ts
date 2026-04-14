import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'

export interface ReadingEntry { id: string; title: string; pages: number; status: 'reading' | 'done' | 'want'; note: string | null; logged_at: string }

export function useReadingLog() {
  const [rows, setRows] = useState<ReadingEntry[]>([])
  const [loading, setLoading] = useState(true)

  const fetchRows = useCallback(async () => {
    const { data } = await supabase.from('jwan_reading_log').select('*').order('logged_at', { ascending: false })
    if (data) setRows(data as ReadingEntry[])
    setLoading(false)
  }, [])

  useEffect(() => {
    void Promise.resolve().then(() => fetchRows())
  }, [fetchRows])

  const addBook = useCallback(async (title: string, pages: number, status: ReadingEntry['status'], note: string) => {
    const { error } = await supabase.from('jwan_reading_log').insert({ title, pages, status, note: note || null })
    if (!error) await fetchRows()
    return { error: error?.message ?? null }
  }, [fetchRows])

  const updateStatus = useCallback(async (id: string, status: ReadingEntry['status']) => {
    const { error } = await supabase.from('jwan_reading_log').update({ status }).eq('id', id)
    if (!error) await fetchRows()
    return { error: error?.message ?? null }
  }, [fetchRows])

  const getStats = useMemo(() => {
    const total = rows.length
    const pages = rows.reduce((a, b) => a + (b.pages || 0), 0)
    const done = rows.filter((r) => r.status === 'done').length
    const reading = rows.filter((r) => r.status === 'reading').length
    const want = rows.filter((r) => r.status === 'want').length
    return { total, pages, done, reading, want }
  }, [rows])

  return { rows, loading, addBook, updateStatus, getStats, refetch: fetchRows }
}

