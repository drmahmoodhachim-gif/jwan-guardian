import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Sparkles } from 'lucide-react'
import type { Report } from '../../types'
import { anthropicComplete } from '../../lib/anthropic'
import { Card } from '../ui/Card'

const SYSTEM = `You are a specialist supporting twice-exceptional children with ASD and giftedness. 
Jwan is 9 years old, IQ 130 (VCI=140), Mild ASD diagnosed 2021 in Dubai. 
Analyze the recent care team observations: identify 2-3 patterns, note what is working, 
give 1 specific actionable recommendation for this week. 
Be warm and evidence-based. Maximum 120 words.`

function buildUserContext(reports: Report[]): string {
  const slice = reports.slice(0, 10)
  if (slice.length === 0) return 'No observations logged yet.'
  return slice
    .map((r, i) => {
      const parts = [
        `Observation ${i + 1} (${r.domain}, rating ${r.rating ?? 'n/a'}):`,
        r.what_happened,
        r.jwan_response ? `Jwan response: ${r.jwan_response}` : '',
      ]
        .filter(Boolean)
        .join(' ')
      return parts
    })
    .join('\n\n')
}

export function AIInsights({ reports }: { reports: Report[] }) {
  const { t } = useTranslation()
  const [out, setOut] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function run() {
    setError(null)
    setOut(null)
    setLoading(true)
    try {
      const text = await anthropicComplete({
        system: SYSTEM,
        messages: [{ role: 'user', content: buildUserContext(reports) }],
        maxTokens: 400,
      })
      setOut(text)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card title={t('dashboard.aiInsights')}>
      <p className="mb-4 text-sm text-jwan-gray">{t('dashboard.aiInsightsHint')}</p>
      <button
        type="button"
        onClick={() => void run()}
        disabled={loading || reports.length === 0}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-jwan-teal px-5 py-2.5 font-semibold text-white shadow disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Sparkles className="h-4 w-4" aria-hidden />
        {loading ? t('common.loading') : t('dashboard.aiRun')}
      </button>
      {reports.length === 0 ? (
        <p className="mt-3 text-sm text-amber-800">{t('dashboard.aiNeedReports')}</p>
      ) : null}
      {error ? (
        <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-800" role="alert">
          {error}
        </p>
      ) : null}
      {out ? (
        <div className="mt-4 rounded-xl border border-teal-100 bg-teal-50/60 p-4 text-sm leading-relaxed text-jwan-ink whitespace-pre-wrap">
          {out}
        </div>
      ) : null}
    </Card>
  )
}
