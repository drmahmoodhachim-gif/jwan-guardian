import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export interface JournalEntry { id: string; entry_text: string; comfort_level: number | null; created_at: string }

export function useJwanJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([])

  const getEntries = useCallback(async (limit = 5) => {
    const { data } = await supabase.from('jwan_journal').select('*').order('created_at', { ascending: false }).limit(limit)
    if (data) setEntries(data as JournalEntry[])
  }, [])

  useEffect(() => {
    void Promise.resolve().then(() => getEntries(5))
  }, [getEntries])

  const addEntry = useCallback(async (entryText: string, comfortLevel: number) => {
    const { error } = await supabase.from('jwan_journal').insert({ entry_text: entryText, comfort_level: comfortLevel })
    if (!error) await getEntries(5)
    return { error: error?.message ?? null }
  }, [getEntries])

  return { entries, addEntry, getEntries }
}

