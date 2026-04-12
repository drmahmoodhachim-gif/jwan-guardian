import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Report } from '../../types'
import { DOMAINS } from '../../lib/constants'
import { reportObservationIso } from '../../lib/observationTime'
import { Card } from '../ui/Card'

function domainLabel(domain: string, ar: boolean) {
  const d = DOMAINS.find((x) => x.id === domain)
  if (!d) return domain
  return ar ? d.ar : d.en
}

export function ActivityFeed({
  reports,
  names,
}: {
  reports: Report[]
  names: Record<string, string>
}) {
  const { t, i18n } = useTranslation()
  const ar = i18n.language.startsWith('ar')
  const recent = reports.slice(0, 12)

  return (
    <Card title={t('dashboard.activity')}>
      {recent.length === 0 ? (
        <p className="text-sm text-jwan-gray">{t('activity.empty')}</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {recent.map((r) => {
            const who = r.author_id ? names[r.author_id] ?? '…' : '—'
            const preview = r.what_happened.slice(0, 120)
            const ell = r.what_happened.length > 120 ? '…' : ''
            return (
              <li
                key={r.id}
                className="border-b border-slate-100 pb-3 text-start last:border-0 last:pb-0"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs text-jwan-gray">
                  <span className="font-medium text-jwan-ink">{who}</span>
                  <span>
                    {domainLabel(r.domain, ar)} ·{' '}
                    {new Date(reportObservationIso(r)).toLocaleString(ar ? 'ar-AE' : 'en-GB', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </span>
                </div>
                <p className="mt-1 text-sm text-jwan-ink">
                  {preview}
                  {ell}
                </p>
              </li>
            )
          })}
        </ul>
      )}
      <div className="mt-4 text-center">
        <Link
          to="/reports"
          className="text-sm font-semibold text-jwan-teal hover:underline"
        >
          {t('reports.view')}
        </Link>
      </div>
    </Card>
  )
}
