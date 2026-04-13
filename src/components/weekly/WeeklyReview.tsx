import { useTranslation } from 'react-i18next'
import type { WeeklyObjectiveRow } from '../../hooks/useWeeklyObjectives'
import type { CompletionStatus } from '../../hooks/useWeeklyObjectives'
import type { JwanGoalRow } from '../../hooks/useJwanGoals'
import { getWeekDateStrings } from '../../lib/weekUtils'
import { Card } from '../ui/Card'

function barPct(done: number, total: number) {
  if (total <= 0) return 0
  return Math.round((done / total) * 100)
}

export function WeeklyReview({
  weekStart,
  objectives,
  getCompletionStatus,
  goals,
  summary,
  onCarryForward,
}: {
  weekStart: string
  objectives: WeeklyObjectiveRow[]
  getCompletionStatus: (objectiveId: string, dateStr: string) => CompletionStatus
  goals: JwanGoalRow[]
  summary: {
    totalCells: number
    doneCells: number
    partialCells: number
    completionPct: number
    activeObjectiveCount: number
  }
  onCarryForward: () => void
}) {
  const { t } = useTranslation()
  const weekDates = getWeekDateStrings(weekStart)

  const goalsDone = goals.filter((g) => g.is_done).length
  const goalsTotal = goals.length

  const insights: string[] = []
  if (summary.completionPct >= 70) insights.push(t('weekly.reviewInsightHigh'))
  else if (summary.completionPct < 40 && summary.activeObjectiveCount > 0)
    insights.push(t('weekly.reviewInsightLow'))
  if (goalsTotal > 0 && goalsDone === goalsTotal) insights.push(t('weekly.reviewInsightGoals'))

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-teal-100 bg-teal-50/80 p-4">
          <p className="text-xs font-medium uppercase text-teal-800">{t('weekly.reviewWeekPct')}</p>
          <p className="mt-1 text-3xl font-bold text-teal-900">{summary.completionPct}%</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-medium uppercase text-jwan-gray">{t('weekly.reviewObjectives')}</p>
          <p className="mt-1 text-2xl font-semibold text-jwan-ink">{summary.activeObjectiveCount}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-medium uppercase text-jwan-gray">{t('weekly.reviewJwanGoals')}</p>
          <p className="mt-1 text-2xl font-semibold text-jwan-ink">
            {goalsTotal === 0 ? '—' : `${goalsDone}/${goalsTotal}`}
          </p>
        </div>
      </div>

      {insights.length > 0 ? (
        <Card title={t('weekly.reviewInsights')}>
          <ul className="list-inside list-disc space-y-1 text-sm text-jwan-gray">
            {insights.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </Card>
      ) : null}

      <Card title={t('weekly.reviewPerObjective')}>
        <ul className="space-y-4">
          {objectives.map((o) => {
            const days = o.active_days ?? [0, 1, 2, 3, 4, 5, 6]
            let done = 0
            let total = 0
            for (let di = 0; di < 7; di++) {
              if (!days.includes(di)) continue
              total++
              const st = getCompletionStatus(o.id, weekDates[di]!)
              if (st === 'done') done++
              if (st === 'partial') done += 0.5
            }
            const pct = barPct(done, total)
            return (
              <li key={o.id}>
                <div className="flex justify-between gap-2 text-sm">
                  <span className="font-medium text-jwan-ink line-clamp-2">{o.title}</span>
                  <span className="shrink-0 text-jwan-gray">{Math.round(pct)}%</span>
                </div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-jwan-teal transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      </Card>

      <Card title={t('weekly.reviewCarry')}>
        <p className="text-sm text-jwan-gray">{t('weekly.reviewCarryBody')}</p>
        <button
          type="button"
          onClick={onCarryForward}
          className="mt-4 rounded-full bg-jwan-teal px-5 py-2.5 text-sm font-semibold text-white shadow"
        >
          {t('weekly.reviewCarryBtn')}
        </button>
      </Card>
    </div>
  )
}
