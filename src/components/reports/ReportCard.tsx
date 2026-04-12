import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pencil, Trash2 } from 'lucide-react'
import type { Report, Role } from '../../types'
import { DOMAINS } from '../../lib/constants'
import { reportObservationIso } from '../../lib/observationTime'
import { StarRating } from '../ui/StarRating'

const ROLES: Role[] = ['dad', 'mom', 'teacher', 'therapist', 'doctor', 'jwan', 'admin']

function domainLabel(domain: string, ar: boolean) {
  const d = DOMAINS.find((x) => x.id === domain)
  if (!d) return domain
  return ar ? d.ar : d.en
}

export function ReportCard({
  report,
  authorName,
  canEdit,
  onEdit,
  onDelete,
}: {
  report: Report
  authorName: string
  canEdit: boolean
  onEdit: () => void
  onDelete: () => void | Promise<unknown>
}) {
  const { t, i18n } = useTranslation()
  const ar = i18n.language.startsWith('ar')
  const [open, setOpen] = useState(false)
  const [confirmDel, setConfirmDel] = useState(false)

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 text-start shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-jwan-ink">{authorName}</p>
          <p className="text-xs text-jwan-gray">
            {ROLES.includes(report.role as Role) ? t(`role.${report.role as Role}`) : report.role} ·{' '}
            {domainLabel(report.domain, ar)} ·{' '}
            {new Date(reportObservationIso(report)).toLocaleString(ar ? 'ar-AE' : 'en-GB', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </p>
          <p className="mt-0.5 text-[11px] text-slate-400">
            {t('report.savedAt')}{' '}
            {new Date(report.created_at).toLocaleString(ar ? 'ar-AE' : 'en-GB', {
              dateStyle: 'short',
              timeStyle: 'short',
            })}
          </p>
        </div>
        <div className="flex items-center gap-1">
          {canEdit ? (
            <>
              <button
                type="button"
                onClick={onEdit}
                className="rounded-lg p-2 text-jwan-teal hover:bg-teal-50"
                aria-label={t('report.edit')}
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setConfirmDel(true)}
                className="rounded-lg p-2 text-rose-600 hover:bg-rose-50"
                aria-label={t('report.delete')}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </>
          ) : null}
        </div>
      </div>

      {report.rating != null ? (
        <div className="mt-2 opacity-80">
          <StarRating value={report.rating} onChange={() => {}} disabled label={t('report.rating')} />
        </div>
      ) : (
        <p className="mt-2 text-xs text-jwan-gray">{t('report.noRating')}</p>
      )}

      <p className="mt-3 text-sm text-jwan-ink">{report.what_happened}</p>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="mt-2 text-xs font-medium text-jwan-teal hover:underline"
      >
        {open ? t('report.less') : t('report.more')}
      </button>

      {open ? (
        <dl className="mt-3 space-y-2 border-t border-slate-100 pt-3 text-sm">
          {report.context ? (
            <>
              <dt className="font-medium text-jwan-gray">{t('report.context')}</dt>
              <dd className="text-jwan-ink">{report.context}</dd>
            </>
          ) : null}
          {report.jwan_response ? (
            <>
              <dt className="font-medium text-jwan-gray">{t('report.jwanResponse')}</dt>
              <dd className="text-jwan-ink">{report.jwan_response}</dd>
            </>
          ) : null}
          {report.mood ? (
            <>
              <dt className="font-medium text-jwan-gray">{t('report.mood')}</dt>
              <dd className="text-jwan-ink">{report.mood}</dd>
            </>
          ) : null}
          {report.strategies_used ? (
            <>
              <dt className="font-medium text-jwan-gray">{t('report.strategies')}</dt>
              <dd className="text-jwan-ink">{report.strategies_used}</dd>
            </>
          ) : null}
        </dl>
      ) : null}

      {confirmDel ? (
        <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm">
          <p className="text-rose-900">{t('report.confirmDelete')}</p>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={() => {
                void Promise.resolve(onDelete()).then(() => setConfirmDel(false))
              }}
              className="rounded-lg bg-rose-600 px-3 py-1.5 font-medium text-white"
            >
              {t('report.delete')}
            </button>
            <button
              type="button"
              onClick={() => setConfirmDel(false)}
              className="rounded-lg border border-slate-200 px-3 py-1.5"
            >
              {t('common.cancel')}
            </button>
          </div>
        </div>
      ) : null}
    </article>
  )
}
