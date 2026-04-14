import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Sparkles } from 'lucide-react'
import { anthropicComplete } from '../../lib/anthropic'
import { Card } from '../ui/Card'

const SCALE = [1, 2, 3, 4, 5] as const

function localSupportSummary(
  ratings: number[],
  note: string,
  t: (k: string, vars?: Record<string, string | number>) => string,
): string {
  const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length
  const top = ratings
    .map((v, i) => ({ v, i: i + 1 }))
    .sort((a, b) => b.v - a.v)
    .slice(0, 2)

  const lines: string[] = []
  lines.push(t('jwan.support.local.intro'))

  if (avg >= 4) lines.push(t('jwan.support.local.high'))
  else if (avg >= 3) lines.push(t('jwan.support.local.medium'))
  else lines.push(t('jwan.support.local.low'))

  lines.push(t('jwan.support.local.top', { a: top[0]?.i ?? 1, b: top[1]?.i ?? 2 }))
  lines.push(t('jwan.support.local.actions'))
  if (note.trim()) lines.push(`${t('jwan.support.local.note')} ${note.trim()}`)
  return lines.join('\n\n')
}

export function SupportQuestions() {
  const { t } = useTranslation()
  const questions = useMemo(
    () => [1, 2, 3, 4, 5, 6].map((n) => t(`jwan.support.q${n}`)),
    [t],
  )

  const [ratings, setRatings] = useState<number[]>(() => questions.map(() => 3))
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)

  async function analyze() {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const text = await anthropicComplete({
        system:
          'You are a kind child-support assistant. Summarize what the child needs today in warm, simple language. No diagnosis words. Keep to 4 short bullet points with practical help ideas for adults.',
        messages: [
          {
            role: 'user',
            content: JSON.stringify({ ratings, note, questions }),
          },
        ],
        maxTokens: 350,
      })
      setResult(text)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Error'
      if (
        msg.includes('Missing VITE_ANTHROPIC_API_KEY') ||
        msg.includes('Failed to fetch') ||
        msg.includes('Anthropic API error')
      ) {
        setResult(localSupportSummary(ratings, note, t))
      } else {
        setError(msg)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card title={t('jwan.support.title')}>
      <p className="mb-4 text-sm text-jwan-gray">{t('jwan.support.intro')}</p>

      <div className="space-y-4">
        {questions.map((q, i) => (
          <div key={i} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
            <p className="text-sm font-medium text-jwan-ink">{q}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {SCALE.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() =>
                    setRatings((prev) => {
                      const next = [...prev]
                      next[i] = n
                      return next
                    })
                  }
                  className={`h-9 min-w-[2.25rem] rounded-lg border-2 text-sm font-semibold ${
                    ratings[i] === n
                      ? 'border-jwan-teal bg-teal-50 text-teal-900'
                      : 'border-slate-200 bg-white text-jwan-gray hover:border-slate-300'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <label className="mt-4 block text-sm font-medium text-jwan-ink">
        {t('jwan.support.note')}
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          placeholder={t('jwan.support.noteHint')}
        />
      </label>

      <button
        type="button"
        onClick={() => void analyze()}
        disabled={loading}
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-jwan-teal px-4 py-2.5 text-sm font-semibold text-white shadow disabled:opacity-60"
      >
        <Sparkles className="h-4 w-4" aria-hidden />
        {loading ? t('common.loading') : t('jwan.support.run')}
      </button>

      {error ? (
        <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-800" role="alert">
          {error}
        </p>
      ) : null}

      {result ? (
        <div className="mt-4 whitespace-pre-wrap rounded-xl border border-teal-100 bg-teal-50/70 p-4 text-sm text-jwan-ink">
          {result}
        </div>
      ) : null}
    </Card>
  )
}

