import { useState } from 'react'
import { callMatilda } from '../../../lib/bookUniverseApi'

const SUGGESTIONS = [
  'Why do stories use symbols?',
  'What makes a mystery fair to readers?',
  'How does memory work while reading?',
  'What is cryptography in simple terms?',
  'What is one strange fact from ancient libraries?',
]

export function AskMatilda({
  onAskDone,
}: {
  onAskDone: (isSecond: boolean) => void
}) {
  const [askedCount, setAskedCount] = useState(0)
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState('')

  async function ask() {
    const q = question.trim()
    if (!q) return
    setLoading(true)
    try {
      setAnswer(await callMatilda(q))
      const next = askedCount + 1
      setAskedCount(next)
      onAskDone(next >= 2)
    } catch {
      setAnswer('Matilda says: the library is quiet for a moment. Try again soon.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-sm text-jwan-gray">
        Ask any question about books, words, stories, science, history, or facts.
      </p>
      <p className="mt-2 rounded-lg bg-amber-50 p-2 text-xs text-amber-900">
        Matilda is a book character voice. If anything feels strange, stop anytime.
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setQuestion(s)}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs"
          >
            {s}
          </button>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
          placeholder="Ask your question..."
        />
        <button
          type="button"
          onClick={() => void ask()}
          disabled={loading}
          className="rounded-lg bg-jwan-teal px-4 py-2 text-sm font-semibold text-white"
        >
          {loading ? 'Thinking...' : 'Ask'}
        </button>
      </div>
      {answer ? (
        <div className="mt-3 rounded-lg border border-teal-100 bg-teal-50 p-3 text-sm">
          <p className="text-[10px] font-semibold uppercase text-jwan-gray">Matilda says</p>
          <p className="mt-1 text-jwan-ink">{answer}</p>
        </div>
      ) : null}
    </div>
  )
}

