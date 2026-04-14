import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export interface ShelfBook { id: string; title: string; author: string | null; spine_color: number; added_at: string }

export function useJwanShelf() {
  const [shelf, setShelf] = useState<ShelfBook[]>([])
  const [loading, setLoading] = useState(true)

  const fetchShelf = useCallback(async () => {
    const { data } = await supabase.from('jwan_shelf').select('*').order('added_at')
    if (data) setShelf(data as ShelfBook[])
    setLoading(false)
  }, [])

  useEffect(() => {
    void Promise.resolve().then(() => fetchShelf())
  }, [fetchShelf])

  const addBook = useCallback(async (title: string, author: string) => {
    const color = shelf.length % 8
    const { data } = await supabase.from('jwan_shelf').insert({ title, author, spine_color: color }).select().single()
    if (data) setShelf((prev) => [...prev, data as ShelfBook])
    return data as ShelfBook | null
  }, [shelf.length])

  return { shelf, loading, addBook, refetch: fetchShelf }
}

