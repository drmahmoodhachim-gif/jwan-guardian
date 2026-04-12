import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { Report, ReportDomain, Role } from '../../types'
import { DOMAINS } from '../../lib/constants'
import { filterReports } from '../../hooks/useReports'
import { Card } from '../ui/Card'

const STROKES: Record<string, string> = {
  social: '#f43f5e',
  emotion: '#e11d48',
  attention: '#d97706',
  language: '#0d9488',
  motor: '#ca8a04',
  sensory: '#eab308',
  adaptive: '#64748b',
  general: '#94a3b8',
}

const ROLE_FILTERS: Array<'all' | Role> = [
  'all',
  'dad',
  'mom',
  'teacher',
  'therapist',
  'doctor',
  'jwan',
  'admin',
]

function monthKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

function formatMonthLabel(key: string, locale: string) {
  const [y, m] = key.split('-').map(Number)
  const dt = new Date(y, m - 1, 1)
  return dt.toLocaleDateString(locale, { year: 'numeric', month: 'short' })
}

export function ProgressCharts({ reports }: { reports: Report[] }) {
  const { t, i18n } = useTranslation()
  const ar = i18n.language.startsWith('ar')
  const locale = ar ? 'ar-AE' : 'en-GB'

  const [roleFilter, setRoleFilter] = useState<'all' | Role>('all')
  const [domainFilter, setDomainFilter] = useState<ReportDomain | 'all'>('all')

  const chartData = useMemo(() => {
    const filtered = filterReports(reports, roleFilter, domainFilter).filter((r) => r.rating != null)
    const byMonth = new Map<string, Report[]>()
    for (const r of filtered) {
      const k = monthKey(new Date(r.created_at))
      if (!byMonth.has(k)) byMonth.set(k, [])
      byMonth.get(k)!.push(r)
    }
    const months = [...byMonth.keys()].sort()
    const domainIds =
      domainFilter === 'all' ? (DOMAINS.map((d) => d.id) as string[]) : [domainFilter]

    return months.map((mkey) => {
      const row: Record<string, string | number | null> = {
        monthKey: mkey,
        monthLabel: formatMonthLabel(mkey, locale),
      }
      const list = byMonth.get(mkey) ?? []
      for (const dom of domainIds) {
        const rs = list.filter((r) => r.domain === dom)
        const avg =
          rs.length === 0 ? null : rs.reduce((s, r) => s + (r.rating ?? 0), 0) / rs.length
        row[dom] = avg == null ? null : Number(avg.toFixed(2))
      }
      return row
    })
  }, [reports, roleFilter, domainFilter, locale])

  const domainIds =
    domainFilter === 'all' ? (DOMAINS.map((d) => d.id) as string[]) : [domainFilter]

  const empty = chartData.length === 0

  return (
    <Card title={t('reports.charts')}>
      <div className="mb-4 flex flex-wrap gap-3">
        <label className="flex flex-col gap-1 text-sm font-medium text-jwan-ink">
          {t('reports.filterRole')}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as 'all' | Role)}
            className="rounded-lg border border-slate-200 px-3 py-2"
          >
            <option value="all">{t('common.all')}</option>
            {ROLE_FILTERS.filter((x) => x !== 'all').map((r) => (
              <option key={r} value={r}>
                {t(`role.${r}`)}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-jwan-ink">
          {t('reports.filterDomain')}
          <select
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value as ReportDomain | 'all')}
            className="rounded-lg border border-slate-200 px-3 py-2"
          >
            <option value="all">{t('common.all')}</option>
            {DOMAINS.map((d) => (
              <option key={d.id} value={d.id}>
                {ar ? d.ar : d.en}
              </option>
            ))}
          </select>
        </label>
      </div>

      {empty ? (
        <p className="text-sm text-jwan-gray">{t('charts.noData')}</p>
      ) : (
        <div className="h-80 w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="monthLabel" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 5]} tickCount={6} tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              {domainIds.map((dom) => (
                <Line
                  key={dom}
                  type="monotone"
                  dataKey={dom}
                  name={ar ? DOMAINS.find((d) => d.id === dom)?.ar ?? dom : DOMAINS.find((d) => d.id === dom)?.en ?? dom}
                  stroke={STROKES[dom] ?? '#64748b'}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  )
}
