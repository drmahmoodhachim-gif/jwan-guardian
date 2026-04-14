import { useState } from 'react'
import { useJwanJournal } from '../../../hooks/useJwanJournal'
import { MATILDA_PROMPTS, callMatilda } from '../../../lib/bookUniverseApi'

export function FeelingsJournal({
  comfortLevel,
  onSaved,
}: {
  comfortLevel: number
  onSaved: () => void
}) {
  const { entries, addEntry } = useJwanJournal()
  const [text, setText] = useState('')
  const [reflection, setReflection] = useState('')

  async function save() {
    const entry = text.trim()
    if (!entry) return
    await addEntry(entry, comfortLevel)
    setText('')
    onSaved()
  }

  async function askReflection() {
    const entry = text.trim()
    if (!entry) return
    try {
      setReflection(await callMatilda(MATILDA_PROMPTS.journalReflect(entry)))
    } catch {
      setReflection('Matilda says: no reflection available right now.')
    }
  }

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-xs text-jwan-gray">Private. This is not sent to any person.</p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-2 h-28 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          placeholder="Write what using this felt like..."
        />
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={() => void save()}
            className="rounded-lg bg-jwan-teal px-4 py-2 text-sm font-semibold text-white"
          >
            Save entry
          </button>
          <button
            type="button"
            onClick={() => void askReflection()}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm"
          >
            Ask Matilda to notice something
          </button>
        </div>
      </div>

      {reflection ? (
        <div className="rounded-lg border border-teal-100 bg-teal-50 p-3 text-sm">
          <p className="text-[10px] font-semibold uppercase text-jwan-gray">Matilda says</p>
          <p className="mt-1 text-jwan-ink">{reflection}</p>
        </div>
      ) : null}

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-sm font-semibold text-jwan-ink">Recent entries</p>
        <div className="mt-2 space-y-2">
          {entries.map((e) => (
            <div key={e.id} className="rounded-lg bg-slate-50 p-2 text-sm">
              <p className="text-[10px] text-jwan-gray">{new Date(e.created_at).toLocaleDateString()}</p>
              <p className="text-jwan-ink">{e.entry_text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

