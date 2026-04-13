import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react'
import { OBJECTIVE_TEMPLATES } from '../data/weeklyObjectives'
import { useWeeklyObjectives } from '../hooks/useWeeklyObjectives'
import { useSensoryLog } from '../hooks/useSensoryLog'
import { useJwanGoals } from '../hooks/useJwanGoals'
import {
  formatWeekRangeLabel,
  getWeekMondayString,
  nextWeekMonday,
  previousWeekMonday,
} from '../lib/weekUtils'
import { WeeklyObjectiveRow } from '../components/weekly/WeeklyObjectiveRow'
import { CustomObjectiveForm, ObjectiveTemplateCard } from '../components/weekly/ObjectiveTemplateCard'
import { JwanGoalsList } from '../components/weekly/JwanGoalsList'
import { SensoryDietTracker } from '../components/weekly/SensoryDietTracker'
import { WeeklyReview } from '../components/weekly/WeeklyReview'

type Tab = 'week' | 'build' | 'jwan' | 'sensory' | 'review'

export function WeeklyObjectives() {
  const { t, i18n } = useTranslation()
  const [weekStart, setWeekStart] = useState(() => getWeekMondayString())
  const [tab, setTab] = useState<Tab>('week')

  const wo = useWeeklyObjectives(weekStart)
  const sensory = useSensoryLog(weekStart)
  const jwan = useJwanGoals(weekStart)

  const weekLabel = useMemo(
    () => formatWeekRangeLabel(weekStart, i18n.language.startsWith('ar') ? 'ar' : 'en'),
    [weekStart, i18n.language],
  )

  const summary = wo.getWeekSummary()

  const templateActive = useCallback(
    (templateId: string) => wo.objectives.some((o) => o.template_id === templateId),
    [wo.objectives],
  )

  const handleTemplateToggle = useCallback(
    async (templateId: string) => {
      if (templateActive(templateId)) {
        const row = wo.objectives.find((o) => o.template_id === templateId)
        if (row) await wo.removeObjective(row.id)
      } else {
        await wo.addObjectiveFromTemplate(templateId)
      }
    },
    [templateActive, wo],
  )

  const loadDefaults = useCallback(async () => {
    for (const tpl of OBJECTIVE_TEMPLATES.filter((x) => x.defaultActive)) {
      if (!templateActive(tpl.id)) await wo.addObjectiveFromTemplate(tpl.id)
    }
  }, [templateActive, wo])

  const carryForward = useCallback(async () => {
    const next = nextWeekMonday(weekStart)
    await wo.carryForwardToNextWeek(next)
    setWeekStart(next)
    setTab('week')
  }, [weekStart, wo])

  const tabs: { id: Tab; labelKey: string }[] = [
    { id: 'week', labelKey: 'weekly.tab.week' },
    { id: 'build', labelKey: 'weekly.tab.build' },
    { id: 'jwan', labelKey: 'weekly.tab.jwan' },
    { id: 'sensory', labelKey: 'weekly.tab.sensory' },
    { id: 'review', labelKey: 'weekly.tab.review' },
  ]

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Flame className="h-8 w-8 text-orange-500" aria-hidden />
          <div>
            <h1 className="text-2xl font-semibold text-jwan-ink">{t('weekly.pageTitle')}</h1>
            <p className="text-sm text-jwan-gray">{t('weekly.pageSubtitle')}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setWeekStart((w) => previousWeekMonday(w))}
            className="inline-flex items-center rounded-full border border-slate-200 p-2 hover:bg-slate-50"
            aria-label={t('weekly.prevWeek')}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="min-w-[140px] text-center text-sm font-semibold text-jwan-ink">{weekLabel}</span>
          <button
            type="button"
            onClick={() => setWeekStart((w) => nextWeekMonday(w))}
            className="inline-flex items-center rounded-full border border-slate-200 p-2 hover:bg-slate-50"
            aria-label={t('weekly.nextWeek')}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-2 flex justify-between text-xs text-jwan-gray">
          <span>{t('weekly.progressLabel')}</span>
          <span>{summary.completionPct}%</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-400 transition-all"
            style={{ width: `${summary.completionPct}%` }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2" role="tablist">
        {tabs.map(({ id, labelKey }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`rounded-full px-3 py-2 text-xs font-semibold sm:text-sm ${
              tab === id ? 'bg-jwan-teal text-white shadow' : 'bg-slate-100 text-jwan-gray hover:bg-slate-200'
            }`}
          >
            {t(labelKey)}
          </button>
        ))}
      </div>

      {wo.error ? (
        <p className="text-sm text-rose-700" role="alert">
          {wo.error}
        </p>
      ) : null}
      {sensory.error ? (
        <p className="text-sm text-rose-700" role="alert">
          {sensory.error}
        </p>
      ) : null}
      {jwan.error ? (
        <p className="text-sm text-rose-700" role="alert">
          {jwan.error}
        </p>
      ) : null}

      <div role="tabpanel" className="min-h-[200px]">
        {tab === 'week' ? (
          <div className="space-y-4">
            {wo.loading ? (
              <p className="text-sm text-jwan-gray">{t('common.loading')}</p>
            ) : wo.objectives.length === 0 ? (
              <p className="text-sm text-jwan-gray">{t('weekly.emptyWeek')}</p>
            ) : (
              <>
                <div className="hidden grid-cols-[minmax(0,1fr)_repeat(7,minmax(0,1fr))] gap-1 text-center text-[10px] font-semibold uppercase text-jwan-gray md:grid">
                  <span />
                  {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((k) => (
                    <span key={k}>{t(`weekly.dayShort.${k}`)}</span>
                  ))}
                </div>
                {wo.objectives.map((o) => (
                  <WeeklyObjectiveRow
                    key={o.id}
                    objective={o}
                    weekDates={wo.weekDates}
                    getStatus={wo.getCompletionStatus}
                    onCycle={wo.cycleCompletion}
                  />
                ))}
              </>
            )}
          </div>
        ) : null}

        {tab === 'build' ? (
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => void loadDefaults()}
                className="rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-medium text-teal-900"
              >
                {t('weekly.loadDefaults')}
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {OBJECTIVE_TEMPLATES.map((tpl) => (
                <ObjectiveTemplateCard
                  key={tpl.id}
                  template={tpl}
                  active={templateActive(tpl.id)}
                  onToggle={() => void handleTemplateToggle(tpl.id)}
                />
              ))}
            </div>
            <CustomObjectiveForm
              onAdd={async (title, description, category) => {
                await wo.addCustomObjective(title, description, category)
              }}
            />
          </div>
        ) : null}

        {tab === 'jwan' ? (
          <JwanGoalsList
            goals={jwan.goals}
            onAdd={async (text) => {
              await jwan.addGoal(text)
            }}
            onToggle={async (id, isDone) => {
              await jwan.completeGoal(id, isDone)
            }}
            onDelete={async (id) => {
              await jwan.deleteGoal(id)
            }}
          />
        ) : null}

        {tab === 'sensory' ? (
          sensory.loading ? (
            <p className="text-sm text-jwan-gray">{t('common.loading')}</p>
          ) : (
            <SensoryDietTracker
              weekDates={sensory.weekDates}
              getSession={sensory.getSession}
              onToggle={sensory.toggleSession}
            />
          )
        ) : null}

        {tab === 'review' ? (
          <WeeklyReview
            weekStart={weekStart}
            objectives={wo.objectives}
            getCompletionStatus={wo.getCompletionStatus}
            goals={jwan.goals}
            summary={summary}
            onCarryForward={() => void carryForward()}
          />
        ) : null}
      </div>
    </div>
  )
}
