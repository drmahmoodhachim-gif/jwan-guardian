import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import type { Report, ReportDomain, Role } from '../../types'
import { DOMAINS } from '../../lib/constants'
import { filterReports } from '../../hooks/useReports'
import { ReportCard } from './ReportCard'
import { ReportForm } from './ReportForm'

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

export function ReportList({
  reports,
  names,
  currentUserId,
  addReport,
  updateReport,
  removeReport,
}: {
  reports: Report[]
  names: Record<string, string>
  currentUserId: string
  addReport: Parameters<typeof ReportForm>[0]['addReport']
  updateReport: Parameters<typeof ReportForm>[0]['updateReport']
  removeReport: (id: string) => Promise<{ error: string | null }>
}) {
  const { t, i18n } = useTranslation()
  const ar = i18n.language.startsWith('ar')
  const [searchParams, setSearchParams] = useSearchParams()
  const roleFilter = (searchParams.get('role') ?? 'all') as 'all' | Role
  const domainFilter = (searchParams.get('domain') ?? 'all') as ReportDomain | 'all'

  const [editing, setEditing] = useState<Report | null>(null)

  const filtered = useMemo(
    () => filterReports(reports, roleFilter, domainFilter),
    [reports, roleFilter, domainFilter],
  )

  function setRoleFilter(next: 'all' | Role) {
    const nextParams = new URLSearchParams(searchParams)
    if (next === 'all') nextParams.delete('role')
    else nextParams.set('role', next)
    setSearchParams(nextParams)
  }

  function setDomainFilter(next: ReportDomain | 'all') {
    const nextParams = new URLSearchParams(searchParams)
    if (next === 'all') nextParams.delete('domain')
    else nextParams.set('domain', next)
    setSearchParams(nextParams)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3">
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

      <p className="text-sm text-jwan-gray">
        {t('reports.count', { count: filtered.length })}
      </p>

      {editing ? (
        <div className="rounded-xl border-2 border-jwan-teal/40 bg-teal-50/50 p-4">
          <ReportForm
            key={editing.id}
            report={editing}
            addReport={addReport}
            updateReport={updateReport}
            onSaved={() => setEditing(null)}
            onCancel={() => setEditing(null)}
          />
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <p className="text-sm text-jwan-gray">{t('reports.none')}</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {filtered.map((r) => (
            <li key={r.id}>
              <ReportCard
                report={r}
                authorName={r.author_id ? names[r.author_id] ?? '…' : '—'}
                canEdit={r.author_id === currentUserId}
                onEdit={() => setEditing(r)}
                onDelete={async () => removeReport(r.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
