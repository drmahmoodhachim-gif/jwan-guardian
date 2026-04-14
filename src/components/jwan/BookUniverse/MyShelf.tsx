import { useState } from 'react'
import { SPINE_COLORS } from '../../../data/bookUniverse'
import { useJwanShelf } from '../../../hooks/useJwanShelf'
import { MATILDA_PROMPTS, callMatilda } from '../../../lib/bookUniverseApi'

export function MyShelf() {
  const { shelf, loading, addBook } = useJwanShelf()
  const [selected, setSelected] = useState(0)
  const [fact, setFact] = useState('')
  const [newTitle, setNewTitle] = useState('')

  async function add() {
    const title = newTitle.trim()
    if (!title) return
    await addBook(title, '')
    setNewTitle('')
  }

  async function fetchFact() {
    const book = shelf[selected]
    if (!book) return
    try {
      setFact(await callMatilda(MATILDA_PROMPTS.bookFact(book.title, book.author ?? 'unknown')))
    } catch {
      setFact('Matilda says: the library is quiet for a moment. Try again soon.')
    }
  }

  if (loading) return <p className="text-sm text-jwan-gray">Loading shelf...</p>

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-sm font-medium text-jwan-ink">My shelf</p>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
          {shelf.map((b, i) => (
            <button key={b.id} type="button" onClick={() => setSelected(i)} className="w-16 shrink-0">
              <div
                className={`h-24 rounded-sm ${selected === i ? 'ring-2 ring-teal-500' : ''}`}
                style={{ backgroundColor: SPINE_COLORS[b.spine_color % SPINE_COLORS.length] }}
              />
              <p className="mt-1 line-clamp-2 text-[10px] text-jwan-gray">{b.title}</p>
            </button>
          ))}
        </div>

        {shelf[selected] ? (
          <div className="mt-2 rounded-lg bg-slate-50 p-3">
            <p className="text-sm font-semibold text-jwan-ink">{shelf[selected]!.title}</p>
            <p className="text-xs text-jwan-gray">{shelf[selected]!.author || 'Unknown author'}</p>
            <button
              type="button"
              onClick={() => void fetchFact()}
              className="mt-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs"
            >
              Get a fact
            </button>
          </div>
        ) : null}

        {fact ? (
          <div className="mt-3 rounded-lg border border-teal-100 bg-teal-50 p-3 text-sm">
            <p className="text-[10px] font-semibold uppercase text-jwan-gray">Matilda says</p>
            <p className="mt-1 text-jwan-ink">{fact}</p>
          </div>
        ) : null}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-sm font-medium text-jwan-ink">Add a book</p>
        <div className="mt-2 flex gap-2">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder="Book title..."
          />
          <button
            type="button"
            onClick={() => void add()}
            className="rounded-lg bg-jwan-teal px-4 py-2 text-sm font-semibold text-white"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

