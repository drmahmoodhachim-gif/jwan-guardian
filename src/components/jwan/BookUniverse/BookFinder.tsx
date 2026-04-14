import { useState } from 'react'
import { BOOK_CATEGORIES, CURATED_BOOKS } from '../../../data/bookUniverse'
import { MATILDA_PROMPTS, callKnowledgeEngine } from '../../../lib/bookUniverseApi'

type BookResult = { title: string; author: string; level: string; match: string }

function parseBooks(raw: string): BookResult[] {
  const blocks = raw.split(/\n\s*\n/)
  const out: BookResult[] = []
  for (const b of blocks) {
    const title = (b.match(/TITLE:\s*([^|\n]+)/i)?.[1] ?? '').trim()
    const author = (b.match(/AUTHOR:\s*([^|\n]+)/i)?.[1] ?? '').trim()
    const level = (b.match(/LEVEL:\s*([^|\n]+)/i)?.[1] ?? '').trim()
    const match = (b.match(/MATCH:\s*([^\n]+)/i)?.[1] ?? '').trim()
    if (title) out.push({ title, author, level, match })
  }
  return out.slice(0, 4)
}

const colorCls: Record<string, string> = {
  purple: 'border-purple-400',
  teal: 'border-teal-400',
  amber: 'border-amber-400',
  coral: 'border-orange-400',
}

export function BookFinder({
  query,
  onQueryChange,
}: {
  query: string
  onQueryChange: (q: string) => void
}) {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<BookResult[]>([])

  async function search(input?: string) {
    const q = (input ?? query).trim()
    if (!q) return
    setLoading(true)
    try {
      const raw = await callKnowledgeEngine(MATILDA_PROMPTS.bookSearch(q))
      setResults(parseBooks(raw))
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap gap-2">
          {BOOK_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setSelectedCategory(c)
                onQueryChange(c)
                void search(c)
              }}
              className={`rounded-full border px-3 py-1 text-xs ${
                selectedCategory === c
                  ? 'border-teal-500 bg-teal-50 text-teal-900'
                  : 'border-slate-200 bg-white text-jwan-gray'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder="Find your next book..."
          />
          <button
            type="button"
            disabled={loading}
            onClick={() => void search()}
            className="rounded-lg bg-jwan-teal px-4 py-2 text-sm font-semibold text-white"
          >
            {loading ? 'Searching...' : 'Search books'}
          </button>
        </div>

        {results.length > 0 ? (
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {results.map((b) => (
              <div key={b.title} className="rounded-lg border-l-4 border-teal-400 bg-slate-50 p-3">
                <p className="text-sm font-semibold text-jwan-ink">{b.title}</p>
                <p className="text-xs text-jwan-gray">
                  {b.author} - {b.level}
                </p>
                <p className="mt-1 text-xs text-teal-900">{b.match}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="mb-2 text-sm font-medium text-jwan-ink">Books matched to Jwan&apos;s profile</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {CURATED_BOOKS.map((b) => (
            <div
              key={b.title}
              className={`rounded-lg border-l-4 bg-slate-50 p-3 ${colorCls[b.color] ?? 'border-teal-400'}`}
            >
              <p className="text-sm font-semibold text-jwan-ink">{b.title}</p>
              <p className="text-xs text-jwan-gray">
                {b.author} - {b.ageLevel}
              </p>
              <p className="mt-1 text-xs text-teal-900">{b.why}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

