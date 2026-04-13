import { useTranslation } from 'react-i18next'
import type { CompletionStatus, WeeklyObjectiveRow as Row } from '../../hooks/useWeeklyObjectives'
import { getTemplateById } from '../../data/weeklyObjectives'
import { isFutureDate } from '../../lib/weekUtils'

const CAT_DOT: Record<string, string> = {
  zones: 'bg-teal-500',
  sensory: 'bg-violet-500',
  emotion: 'bg-rose-400',
  pda: 'bg-amber-500',
  social: 'bg-sky-500',
  ot: 'bg-orange-500',
  enrichment: 'bg-emerald-500',
  family: 'bg-slate-500',
}

const STATUS_CLASS: Record<CompletionStatus, string> = {
  none: 'border-slate-200 bg-white hover:border-slate-300',
  done: 'border-teal-500 bg-teal-50 text-teal-900',
  partial: 'border-amber-400 bg-amber-50 text-amber-900',
  skip: 'border-slate-300 bg-slate-100 text-slate-600',
}

function nextLabel(s: CompletionStatus): string {
  if (s === 'done') return '✓'
  if (s === 'partial') return '½'
  if (s === 'skip') return '—'
  return ''
}

export function WeeklyObjectiveRow({
  objective,
  weekDates,
  getStatus,
  onCycle,
}: {
  objective: Row
  weekDates: string[]
  getStatus: (objectiveId: string, dateStr: string) => CompletionStatus
  onCycle: (objectiveId: string, dateStr: string) => void
}) {
  const { i18n, t } = useTranslation()
  const lang = i18n.language
  const tpl = objective.template_id ? getTemplateById(objective.template_id) : undefined
  const title =
    lang.startsWith('ar') && tpl?.titleAr ? tpl.titleAr : objective.title
  const assigned = objective.assigned_to ?? 'all'
  const days = objective.active_days ?? [0, 1, 2, 3, 4, 5, 6]
  const dot = CAT_DOT[objective.category] ?? 'bg-slate-400'

  return (
    <div className="flex flex-col gap-2 border-b border-slate-100 py-3 last:border-0 md:flex-row md:items-center md:gap-3">
      <div className="min-w-0 flex-1 md:max-w-[280px]">
        <div className="flex items-start gap-2">
          <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${dot}`} aria-hidden />
          <div>
            <p className="text-sm font-semibold text-jwan-ink">{title}</p>
            <p className="text-xs text-jwan-gray">
              {t(`weekly.assign.${assigned}`)} · {objective.category}
            </p>
          </div>
        </div>
      </div>
      <div className="grid min-w-0 flex-1 grid-cols-7 gap-1">
        {weekDates.map((dateStr, di) => {
          const active = days.includes(di)
          const st = getStatus(objective.id, dateStr)
          const future = isFutureDate(dateStr)
          const disabled = !active || future
          return (
            <button
              key={dateStr}
              type="button"
              disabled={disabled}
              title={`${dateStr} · ${st}`}
              onClick={() => !disabled && onCycle(objective.id, dateStr)}
              className={[
                'flex h-10 items-center justify-center rounded-lg border-2 text-xs font-semibold transition',
                disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
                STATUS_CLASS[st],
              ].join(' ')}
            >
              {active ? nextLabel(st) : '·'}
            </button>
          )
        })}
      </div>
    </div>
  )
}
