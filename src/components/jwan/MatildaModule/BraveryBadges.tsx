import { useState } from 'react'
import { BRAVERY_STEPS } from '../../../data/matildaSteps'
import { MATILDA_PROMPTS, callMatilda } from '../../../lib/bookUniverseApi'

export function BraveryBadges({ completedSteps }: { completedSteps: string[] }) {
  const [quote, setQuote] = useState('')

  async function fetchQuote() {
    try {
      setQuote(await callMatilda(MATILDA_PROMPTS.bravery))
    } catch {
      setQuote('Matilda says: bravery can be quiet and still count.')
    }
  }

  return (
    <div className="space-y-3">
      <div className="grid gap-2 sm:grid-cols-2">
        {BRAVERY_STEPS.map((step) => {
          const earned = completedSteps.includes(step.id)
          return (
            <div
              key={step.id}
              className={`rounded-xl border p-3 ${
                earned ? 'border-teal-300 bg-teal-50' : 'border-dashed border-slate-300 bg-slate-50'
              }`}
            >
              <p className="text-sm font-semibold text-jwan-ink">{step.badge}</p>
              <p className="text-xs text-jwan-gray">{step.title}</p>
            </div>
          )
        })}
      </div>
      <button
        type="button"
        onClick={() => void fetchQuote()}
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
      >
        Bravery quote from Matilda
      </button>
      {quote ? (
        <div className="rounded-lg border border-teal-100 bg-teal-50 p-3 text-sm">
          <p className="text-[10px] font-semibold uppercase text-jwan-gray">Matilda says</p>
          <p className="mt-1 text-jwan-ink">{quote}</p>
        </div>
      ) : null}
    </div>
  )
}

