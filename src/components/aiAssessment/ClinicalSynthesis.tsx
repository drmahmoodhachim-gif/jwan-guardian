import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Loader2, MessageSquare } from 'lucide-react'
import { CLAUDE_SYNTHESIS } from '../../data/assessmentTasks'
import { anthropicComplete } from '../../lib/anthropic'
import { Card } from '../ui/Card'

const LEVEL_STYLE: Record<string, string> = {
  critical: 'border-rose-300 bg-rose-50/90',
  urgent: 'border-orange-300 bg-orange-50/80',
  important: 'border-amber-200 bg-amber-50/70',
  positive: 'border-teal-200 bg-teal-50/70',
}

export function ClinicalSynthesis() {
  const { t } = useTranslation()
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [exploreText, setExploreText] = useState<Record<string, string>>({})
  const [exploreErr, setExploreErr] = useState<string | null>(null)

  async function exploreFinding(id: string, title: string, body: string, actionRequired: string) {
    setExploreErr(null)
    setLoadingId(id)
    try {
      const text = await anthropicComplete({
        system:
          'You are a careful clinical educator for a gifted child with ASD/PDA. Be concise, warm, and practical. No medical diagnosis — supportive framing only.',
        messages: [
          {
            role: 'user',
            content: `Briefly expand on this synthesis point for the family (3-5 short paragraphs max):\n\nTitle: ${title}\n\nSummary: ${body}\n\nSuggested action: ${actionRequired}\n\nOffer 2-3 concrete next steps for home and school.`,
          },
        ],
        maxTokens: 900,
      })
      setExploreText((prev) => ({ ...prev, [id]: text }))
    } catch (e) {
      setExploreErr(e instanceof Error ? e.message : 'Request failed')
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-jwan-ink">{CLAUDE_SYNTHESIS.title}</h2>
        <p className="mt-1 text-sm text-jwan-gray">{CLAUDE_SYNTHESIS.subtitle}</p>
      </div>

      <div className="flex flex-col gap-4">
        {CLAUDE_SYNTHESIS.findings.map((f) => (
          <div
            key={f.id}
            className={`rounded-2xl border-2 p-4 shadow-sm md:p-5 ${LEVEL_STYLE[f.level] ?? 'border-slate-200 bg-white'}`}
          >
            <p className="text-xs font-bold uppercase tracking-wide text-jwan-gray">{f.level}</p>
            <h3 className="mt-1 text-lg font-semibold text-jwan-ink">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-jwan-ink">{f.body}</p>
            <p className="mt-3 text-sm font-medium text-teal-900">
              <span className="text-jwan-gray">{t('aiAssessment.synthesis.action')} </span>
              {f.actionRequired}
            </p>
            <p className="mt-2 text-xs text-jwan-gray">{f.reference}</p>
            <button
              type="button"
              onClick={() => exploreFinding(f.id, f.title, f.body, f.actionRequired)}
              disabled={loadingId === f.id}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-jwan-teal shadow-sm hover:bg-teal-50 disabled:opacity-60"
            >
              {loadingId === f.id ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <MessageSquare className="h-4 w-4" aria-hidden />
              )}
              {t('aiAssessment.synthesis.explore')}
            </button>
            {exploreText[f.id] ? (
              <div className="mt-4 rounded-xl border border-teal-100 bg-white/90 p-4 text-sm leading-relaxed text-jwan-ink">
                {exploreText[f.id]}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {exploreErr ? (
        <p className="text-sm text-rose-700" role="alert">
          {exploreErr}
        </p>
      ) : null}

      <Card title={t('aiAssessment.synthesis.diagnosisTitle')}>
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="font-semibold text-jwan-ink">{t('aiAssessment.synthesis.primary')}</dt>
            <dd className="mt-1 text-jwan-gray">{CLAUDE_SYNTHESIS.diagnosis.primary}</dd>
          </div>
          <div>
            <dt className="font-semibold text-jwan-ink">{t('aiAssessment.synthesis.comorbid')}</dt>
            <dd className="mt-1 text-jwan-gray">{CLAUDE_SYNTHESIS.diagnosis.comorbid}</dd>
          </div>
          <div>
            <dt className="font-semibold text-jwan-ink">{t('aiAssessment.synthesis.resolved')}</dt>
            <dd className="mt-1 text-jwan-gray">{CLAUDE_SYNTHESIS.diagnosis.resolved}</dd>
          </div>
          <div>
            <dt className="font-semibold text-jwan-ink">{t('aiAssessment.synthesis.intact')}</dt>
            <dd className="mt-1 text-jwan-gray">{CLAUDE_SYNTHESIS.diagnosis.intact}</dd>
          </div>
          <div>
            <dt className="font-semibold text-jwan-ink">{t('aiAssessment.synthesis.followUp')}</dt>
            <dd className="mt-1 text-jwan-gray">{CLAUDE_SYNTHESIS.diagnosis.needsFollowUp}</dd>
          </div>
        </dl>
      </Card>

      <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 text-sm leading-relaxed text-jwan-ink">
        <h3 className="font-semibold text-jwan-teal">{t('aiAssessment.synthesis.prognosisTitle')}</h3>
        <p className="mt-2">{CLAUDE_SYNTHESIS.prognosis}</p>
      </div>
    </div>
  )
}
