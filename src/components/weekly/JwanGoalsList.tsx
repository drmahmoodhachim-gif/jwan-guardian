import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Trash2, Sparkles } from 'lucide-react'
import { JWAN_GOAL_SUGGESTIONS } from '../../data/weeklyObjectives'
import type { JwanGoalRow } from '../../hooks/useJwanGoals'
import { Card } from '../ui/Card'

export function JwanGoalsList({
  goals,
  onAdd,
  onToggle,
  onDelete,
}: {
  goals: JwanGoalRow[]
  onAdd: (text: string) => Promise<void>
  onToggle: (id: string, done: boolean) => Promise<void>
  onDelete: (id: string) => Promise<void>
}) {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [celebrateId, setCelebrateId] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    await onAdd(text.trim())
    setText('')
  }

  async function handleToggle(g: JwanGoalRow) {
    const next = !g.is_done
    await onToggle(g.id, next)
    if (next) {
      setCelebrateId(g.id)
      window.setTimeout(() => setCelebrateId(null), 1400)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card title={t('weekly.jwanTitle')}>
        <p className="mb-4 text-sm text-jwan-gray">{t('weekly.jwanSubtitle')}</p>
        <form onSubmit={submit} className="flex flex-wrap gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('weekly.jwanPlaceholder')}
            className="min-w-[200px] flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm"
          />
          <button
            type="submit"
            className="rounded-full bg-jwan-teal px-5 py-2 text-sm font-semibold text-white shadow"
          >
            {t('weekly.jwanAdd')}
          </button>
        </form>

        <ul className="mt-6 space-y-3">
          {goals.map((g) => (
            <li
              key={g.id}
              className={`flex items-start gap-3 rounded-xl border p-3 transition ${
                celebrateId === g.id ? 'celebrate-pop border-amber-300 bg-amber-50/80' : 'border-slate-100 bg-white'
              }`}
            >
              <button
                type="button"
                onClick={() => handleToggle(g)}
                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold ${
                  g.is_done ? 'border-teal-500 bg-teal-500 text-white' : 'border-slate-200 bg-white text-transparent'
                }`}
                aria-pressed={g.is_done}
              >
                ✓
              </button>
              <div className="min-w-0 flex-1">
                <p className={`text-sm ${g.is_done ? 'text-jwan-gray line-through' : 'text-jwan-ink'}`}>{g.goal_text}</p>
                {celebrateId === g.id ? (
                  <p className="mt-1 flex items-center gap-1 text-xs font-medium text-amber-800">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden />
                    {t('weekly.jwanCelebration')}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => onDelete(g.id)}
                className="text-slate-400 hover:text-rose-600"
                aria-label={t('weekly.jwanDelete')}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      </Card>

      <Card title={t('weekly.jwanSuggestions')}>
        <ul className="space-y-2 text-sm text-jwan-gray">
          {JWAN_GOAL_SUGGESTIONS.map((s, i) => (
            <li key={i} className="flex flex-col rounded-lg bg-slate-50/80 px-3 py-2">
              <span className="font-medium text-jwan-ink">{s.text}</span>
              <span className="text-xs">{s.why}</span>
            </li>
          ))}
        </ul>
      </Card>

      <style>{`
        @keyframes celebrate-pop {
          0% { transform: scale(1); }
          40% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        .celebrate-pop {
          animation: celebrate-pop 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}
