import { useState } from 'react'
import { useReadingLog } from '../../../hooks/useReadingLog'

const badge: Record<'reading' | 'done' | 'want', string> = {
  reading: 'bg-teal-50 text-teal-900',
  done: 'bg-purple-50 text-purple-900',
  want: 'bg-amber-50 text-amber-900',
}

export function ReadingLog() {
  const { rows, getStats, addBook, updateStatus } = useReadingLog()
  const [title, setTitle] = useState('')
  const [pages, setPages] = useState('')
  const [status, setStatus] = useState<'reading' | 'done' | 'want'>('reading')
  const [note, setNote] = useState('')
  const stats = getStats

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    await addBook(title.trim(), Number(pages || 0), status, note.trim())
    setTitle(''); setPages(''); setNote(''); setStatus('reading')
  }

  const sorted = [...rows].sort((a, b) => ({ reading: 0, done: 1, want: 2 }[a.status] - { reading: 0, done: 1, want: 2 }[b.status]) || b.logged_at.localeCompare(a.logged_at))

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2 text-center text-xs"><div className="rounded bg-slate-50 p-2"><p className="text-jwan-gray">Books logged</p><p className="text-xl font-semibold text-jwan-ink">{stats.total}</p></div><div className="rounded bg-slate-50 p-2"><p className="text-jwan-gray">Pages total</p><p className="text-xl font-semibold text-jwan-ink">{stats.pages}</p></div><div className="rounded bg-slate-50 p-2"><p className="text-jwan-gray">Finished</p><p className="text-xl font-semibold text-jwan-ink">{stats.done}</p></div></div>
      <form onSubmit={(e) => void submit(e)} className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="grid gap-2 sm:grid-cols-[1fr_110px_120px]">
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Book title" />
          <input value={pages} onChange={(e) => setPages(e.target.value)} type="number" min={0} className="rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Pages" />
          <select value={status} onChange={(e) => setStatus(e.target.value as 'reading' | 'done' | 'want')} className="rounded-lg border border-slate-200 px-3 py-2 text-sm"><option value="reading">Reading</option><option value="done">Finished</option><option value="want">Want to read</option></select>
        </div>
        <div className="mt-2 flex gap-2"><input value={note} onChange={(e) => setNote(e.target.value)} className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Interesting note (optional)" /><button type="submit" className="rounded-lg bg-jwan-teal px-4 py-2 text-sm font-semibold text-white">Log</button></div>
      </form>
      <div className="rounded-xl border border-slate-200 bg-white p-4"><p className="mb-2 text-sm font-medium text-jwan-ink">Reading history</p><div className="space-y-2">{sorted.length === 0 ? <p className="text-sm text-jwan-gray">No books logged yet.</p> : sorted.map((r) => <button type="button" key={r.id} onClick={() => void updateStatus(r.id, 'done')} className="flex w-full items-center gap-2 rounded-lg border border-slate-100 px-3 py-2 text-left"><span className="flex-1"><p className="text-sm font-medium text-jwan-ink">{r.title}</p>{r.note ? <p className="text-xs text-jwan-gray">{r.note}</p> : null}</span><span className={`rounded-full px-2 py-1 text-xs font-medium ${badge[r.status]}`}>{r.status}</span></button>)}</div></div>
    </div>
  )
}

