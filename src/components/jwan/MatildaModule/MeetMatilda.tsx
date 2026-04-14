import { useState } from 'react'
import { COMFORT_RESPONSES, MATILDA_CONNECTIONS } from '../../../data/matildaSteps'

export function MeetMatilda({
  onComfortSelect,
}: {
  onComfortSelect: (level: number) => void
}) {
  const [level, setLevel] = useState<number | null>(null)
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-sm font-semibold text-jwan-ink">Who is Matilda?</p>
        <p className="mt-1 text-sm text-jwan-gray">
          Matilda is a fictional child from a book. This page uses that character voice for facts and
          books, while staying honest that it is a computer tool.
        </p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {MATILDA_CONNECTIONS.map((c) => (
          <div key={c.theme} className="rounded-xl border border-slate-200 bg-white p-3">
            <p className="text-sm font-semibold text-jwan-ink">{c.theme}</p>
            <p className="mt-1 text-xs text-jwan-gray">{c.content}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-sm font-semibold text-jwan-ink">How does this feel right now?</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => {
                setLevel(n)
                onComfortSelect(n)
              }}
              className={`rounded-full border px-3 py-1 text-xs ${
                level === n ? 'border-teal-500 bg-teal-50 text-teal-900' : 'border-slate-200 bg-white'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        {level ? <p className="mt-2 text-sm text-jwan-gray">{COMFORT_RESPONSES[level]}</p> : null}
      </div>
    </div>
  )
}

