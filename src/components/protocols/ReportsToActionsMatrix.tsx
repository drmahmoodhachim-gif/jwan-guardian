import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, ChevronRight } from 'lucide-react'
import type { ActionWho } from '../../data/protocols/types'
import type { ReportsToActionsEntry } from '../../data/protocols/reportsToActions'
import { REPORTS_TO_ACTIONS } from '../../data/protocols'

const WHO_FILTER: (ActionWho | 'all')[] = [
  'all',
  'dad',
  'mom',
  'nanny',
  'lsa',
  'teacher',
  'therapist',
  'bcba',
]

const COLOR_RING: Record<string, string> = {
  purple: 'border-l-purple-500 bg-purple-50/50',
  red: 'border-l-red-500 bg-red-50/40',
  teal: 'border-l-teal-500 bg-teal-50/40',
  amber: 'border-l-amber-500 bg-amber-50/40',
  pink: 'border-l-pink-500 bg-pink-50/40',
}

function entryMatchesWho(entry: ReportsToActionsEntry, who: ActionWho | 'all'): boolean {
  if (who === 'all') return true
  return entry.actions.some((a) => a.who === who || a.who === 'all')
}

export function ReportsToActionsMatrix() {
  const { t } = useTranslation()
  const [sourceFilter, setSourceFilter] = useState<string>('all')
  const [whoFilter, setWhoFilter] = useState<ActionWho | 'all'>('all')
  const [openId, setOpenId] = useState<string | null>(REPORTS_TO_ACTIONS[0]?.id ?? null)

  const sources = useMemo(
    () => ['all', ...Array.from(new Set(REPORTS_TO_ACTIONS.map((r) => r.source)))],
    [],
  )

  const filtered = useMemo(() => {
    return REPORTS_TO_ACTIONS.filter((r) => {
      if (sourceFilter !== 'all' && r.source !== sourceFilter) return false
      if (!entryMatchesWho(r, whoFilter)) return false
      return true
    })
  }, [sourceFilter, whoFilter])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
        <label className="flex min-w-[200px] flex-col gap-1 text-sm">
          <span className="font-medium text-jwan-ink">{t('protocols.matrix.filterSource')}</span>
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            {sources.map((s) => (
              <option key={s} value={s}>
                {s === 'all' ? t('protocols.matrix.allSources') : s}
              </option>
            ))}
          </select>
        </label>
        <label className="flex min-w-[200px] flex-col gap-1 text-sm">
          <span className="font-medium text-jwan-ink">{t('protocols.matrix.filterWho')}</span>
          <select
            value={whoFilter}
            onChange={(e) => setWhoFilter(e.target.value as ActionWho | 'all')}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            {WHO_FILTER.map((w) => (
              <option key={w} value={w}>
                {t(`protocols.who.${w}`)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="text-sm text-jwan-gray">
        {t('protocols.matrix.count', { count: filtered.length })}
      </p>

      <ul className="flex flex-col gap-2">
        {filtered.map((row) => {
          const open = openId === row.id
          const ring = COLOR_RING[row.sourceColor] ?? 'border-l-slate-400 bg-slate-50/50'
          return (
            <li
              key={row.id}
              className={`overflow-hidden rounded-xl border border-slate-200 border-l-4 shadow-sm ${ring}`}
            >
              <button
                type="button"
                onClick={() => setOpenId(open ? null : row.id)}
                className="flex w-full items-start gap-2 px-4 py-3 text-left transition hover:bg-white/60"
              >
                {open ? (
                  <ChevronDown className="mt-0.5 h-5 w-5 shrink-0 text-jwan-gray" />
                ) : (
                  <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-jwan-gray" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-jwan-gray">{row.source}</p>
                  <p className="mt-1 font-medium text-jwan-ink">{row.finding}</p>
                </div>
              </button>
              {open ? (
                <div className="border-t border-slate-200/80 bg-white/80 px-4 py-3 pl-11 text-sm">
                  <p className="text-jwan-gray">{row.implication}</p>
                  <h4 className="mt-3 font-semibold text-jwan-teal">{t('protocols.matrix.actions')}</h4>
                  <ul className="mt-2 space-y-2">
                    {row.actions.map((a, i) => (
                      <li key={i} className="flex gap-2 rounded-lg bg-slate-50/90 px-3 py-2">
                        <span className="shrink-0 rounded-full bg-jwan-teal/15 px-2 py-0.5 text-xs font-semibold text-teal-900">
                          {t(`protocols.who.${a.who}`)}
                        </span>
                        <span className="text-jwan-ink">{a.action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </li>
          )
        })}
      </ul>

      {filtered.length === 0 ? (
        <p className="text-sm text-jwan-gray">{t('protocols.matrix.none')}</p>
      ) : null}
    </div>
  )
}
