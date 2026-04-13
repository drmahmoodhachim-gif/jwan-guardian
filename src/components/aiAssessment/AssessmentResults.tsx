import { useTranslation } from 'react-i18next'
import type { AiAssessmentRow } from '../../hooks/useAiAssessments'
import { TASK_CLINICAL_MAPPINGS } from '../../data/assessmentTasks'
import { Card } from '../ui/Card'

function actionKeysForLatest(latest: Partial<Record<string, AiAssessmentRow>>): string[] {
  const keys: string[] = []
  const emo = latest.emo_detective
  if (emo?.accuracy_pct != null) {
    keys.push(emo.accuracy_pct < 84 ? 'aiAssessment.results.actionEmoSupport' : 'aiAssessment.results.actionEmoAligns')
  }
  const mem = latest.memory_spark
  if (mem?.max_span != null) {
    if (mem.max_span >= 5) keys.push('aiAssessment.results.actionMemoryDemand')
    if (mem.max_span <= 3) keys.push('aiAssessment.results.actionMemoryCheck')
  }
  const story = latest.story_mind
  if (story?.accuracy_pct === 100) keys.push('aiAssessment.results.actionStoryPda')
  const world = latest.my_world
  const ds = world?.domain_scores as { pdaConsistent?: boolean; anxietyElevated?: boolean } | null
  if (ds?.pdaConsistent) keys.push('aiAssessment.results.actionWorldPda')
  if (ds?.anxietyElevated) keys.push('aiAssessment.results.actionWorldAnxiety')
  return keys
}

export function AssessmentResults({ rows, loading }: { rows: AiAssessmentRow[]; loading: boolean }) {
  const { t } = useTranslation()

  if (loading) {
    return <p className="text-sm text-jwan-gray">{t('aiAssessment.results.loading')}</p>
  }

  if (rows.length === 0) {
    return (
      <p className="text-sm text-jwan-gray">{t('aiAssessment.results.empty')}</p>
    )
  }

  const latestByType: Partial<Record<string, AiAssessmentRow>> = {}
  for (const r of rows) {
    if (!latestByType[r.task_type]) latestByType[r.task_type] = r
  }

  const actionKeys = actionKeysForLatest(latestByType)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-semibold text-jwan-ink">{t('aiAssessment.results.jwanFirst')}</h3>
        <p className="mt-1 text-sm text-jwan-gray">{t('aiAssessment.results.jwanFirstBody')}</p>
      </div>

      {actionKeys.length > 0 ? (
        <Card title={t('aiAssessment.results.actionsTitle')}>
          <ul className="list-inside list-disc space-y-2 text-sm text-jwan-gray">
            {actionKeys.map((key) => (
              <li key={key}>{t(key)}</li>
            ))}
          </ul>
        </Card>
      ) : null}

      <Card title={t('aiAssessment.results.timeline')}>
        <ul className="space-y-2 text-sm">
          {rows.slice(0, 20).map((r) => (
            <li key={r.id} className="flex flex-wrap justify-between gap-2 border-b border-slate-100 py-2">
              <span className="font-medium capitalize">{r.task_type.replace('_', ' ')}</span>
              <span className="text-jwan-gray">
                {new Date(r.session_date).toLocaleString()}
              </span>
              <span className="w-full text-xs text-jwan-gray">
                {r.accuracy_pct != null ? `${r.accuracy_pct}%` : ''}
                {r.max_span != null ? ` · max span ${r.max_span}` : ''}
                {r.world_demand_avg != null && r.world_safety_avg != null
                  ? ` · demand ${r.world_demand_avg.toFixed(1)} / safety ${r.world_safety_avg.toFixed(1)}`
                  : ''}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      <Card title={t('aiAssessment.results.interpreter')}>
        <div className="space-y-4 text-sm text-jwan-gray">
          <section>
            <h4 className="font-semibold text-jwan-ink">{t('aiAssessment.results.emo')}</h4>
            <p className="mt-1">{TASK_CLINICAL_MAPPINGS.emoDetective.formalMapping}</p>
            <ul className="mt-1 list-inside list-disc text-xs">
              {Object.entries(TASK_CLINICAL_MAPPINGS.emoDetective.interpretNorms).map(([k, v]) => (
                <li key={k}>
                  <span className="font-medium text-jwan-ink">{k}</span>: {v}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h4 className="font-semibold text-jwan-ink">{t('aiAssessment.results.memory')}</h4>
            <p className="mt-1">{TASK_CLINICAL_MAPPINGS.memorySpan.clinicalInterpretation}</p>
          </section>
          <section>
            <h4 className="font-semibold text-jwan-ink">{t('aiAssessment.results.story')}</h4>
            <p className="mt-1">{TASK_CLINICAL_MAPPINGS.storyMind.discrepancyNote}</p>
          </section>
          <section>
            <h4 className="font-semibold text-jwan-ink">{t('aiAssessment.results.world')}</h4>
            <p className="mt-1">{TASK_CLINICAL_MAPPINGS.myWorld.pdaThreshold}</p>
          </section>
        </div>
      </Card>

      {latestByType.emo_detective?.domain_scores ? (
        <Card title={t('aiAssessment.results.latestEmo')}>
          <pre className="overflow-x-auto text-xs">
            {JSON.stringify(latestByType.emo_detective.domain_scores, null, 2)}
          </pre>
        </Card>
      ) : null}
    </div>
  )
}
