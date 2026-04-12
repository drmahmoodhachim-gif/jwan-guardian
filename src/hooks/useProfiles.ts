import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

/** Map profile id → display name for report attribution */
export function useProfileNames() {
  const [names, setNames] = useState<Record<string, string>>({})

  useEffect(() => {
    let cancelled = false
    void supabase
      .from('profiles')
      .select('id, full_name')
      .then(({ data, error }) => {
        if (cancelled || error || !data) return
        const m: Record<string, string> = {}
        for (const row of data) {
          m[row.id] = row.full_name
        }
        setNames(m)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return names
}
