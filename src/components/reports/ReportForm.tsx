import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Clock } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { DOMAINS } from '../../lib/constants'
import {
  formatForDatetimeLocal,
  isoToDatetimeLocal,
  parseDatetimeLocalToIso,
} from '../../lib/observationTime'
import type { Report, ReportDomain, Role } from '../../types'
import { StarRating } from '../ui/StarRating'

const ROLES: Role[] = ['dad', 'mom', 'teacher', 'therapist', 'doctor', 'jwan', 'admin']

export function ReportForm({
  report,
  addReport,
  updateReport,
  onSaved,
  onCancel,
}: {
  report?: Report | null
  addReport: (row: import('../../types').ReportInsert) => Promise<{ error: string | null }>
  updateReport: (id: string, patch: import('../../types').ReportUpdate) => Promise<{ error: string | null }>
  onSaved?: () => void
  onCancel?: () => void
}) {
  const { t, i18n } = useTranslation()
  const { profile, user } = useAuth()
  const ar = i18n.language.startsWith('ar')
  const isEdit = Boolean(report?.id)

  const [role, setRole] = useState<string>(report?.role ?? profile?.role ?? 'dad')
  const [domain, setDomain] = useState<ReportDomain>(report?.domain ?? 'general')
  const [rating, setRating] = useState<number | null>(report?.rating ?? null)
  const [context, setContext] = useState(report?.context ?? '')
  const [whatHappened, setWhatHappened] = useState(report?.what_happened ?? '')
  const [jwanResponse, setJwanResponse] = useState(report?.jwan_response ?? '')
  const [mood, setMood] = useState(report?.mood ?? '')
  const [strategies, setStrategies] = useState(report?.strategies_used ?? '')
  const [observedAtLocal, setObservedAtLocal] = useState(() =>
    report ? isoToDatetimeLocal(report.observed_at ?? report.created_at) : formatForDatetimeLocal(new Date()),
  )
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function setNow() {
    setObservedAtLocal(formatForDatetimeLocal(new Date()))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user) {
      setError(t('report.mustLogin'))
      return
    }
    const observedIso = parseDatetimeLocalToIso(observedAtLocal)
    setError(null)
    setPending(true)
    if (isEdit && report) {
      const { error: err } = await updateReport(report.id, {
        role,
        domain,
        rating,
        context: context.trim() || null,
        what_happened: whatHappened.trim(),
        jwan_response: jwanResponse.trim() || null,
        mood: mood.trim() || null,
        strategies_used: strategies.trim() || null,
        observed_at: observedIso,
      })
      setPending(false)
      if (err) {
        setError(err)
        return
      }
      onSaved?.()
      return
    }

    const { error: err } = await addReport({
      author_id: user.id,
      role,
      domain,
      rating,
      context: context.trim() || null,
      what_happened: whatHappened.trim(),
      jwan_response: jwanResponse.trim() || null,
      mood: mood.trim() || null,
      strategies_used: strategies.trim() || null,
      observed_at: observedIso,
    })
    setPending(false)
    if (err) {
      setError(err)
      return
    }
    setRating(null)
    setContext('')
    setWhatHappened('')
    setJwanResponse('')
    setMood('')
    setStrategies('')
    setObservedAtLocal(formatForDatetimeLocal(new Date()))
    onSaved?.()
  }

  return (
    <form onSubmit={(e) => void onSubmit(e)} className="flex flex-col gap-4">
      <div className="rounded-xl border border-teal-100 bg-teal-50/50 p-4">
        <label className="flex flex-col gap-2 text-sm font-medium text-jwan-ink">
          <span className="flex flex-wrap items-center gap-2">
            {t('report.observedAt')}
            <button
              type="button"
              onClick={setNow}
              className="inline-flex items-center gap-1 rounded-full border border-jwan-teal/40 bg-white px-2.5 py-1 text-xs font-semibold text-jwan-teal hover:bg-teal-50"
            >
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {t('report.useNow')}
            </button>
          </span>
          <input
            type="datetime-local"
            value={observedAtLocal}
            onChange={(e) => setObservedAtLocal(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 font-mono text-base"
            dir="ltr"
            required
          />
        </label>
        <p className="mt-2 text-xs text-jwan-gray">{t('report.observedAtHint')}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-medium text-jwan-ink">
          {t('report.roleObserver')}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2"
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {t(`role.${r}`)}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-jwan-ink">
          {t('report.domain')}
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value as ReportDomain)}
            className="rounded-lg border border-slate-200 px-3 py-2"
          >
            {DOMAINS.map((d) => (
              <option key={d.id} value={d.id}>
                {ar ? d.ar : d.en}
              </option>
            ))}
          </select>
        </label>
      </div>

      <StarRating value={rating} onChange={setRating} label={t('report.rating')} />

      <label className="flex flex-col gap-1 text-sm font-medium text-jwan-ink">
        {t('report.context')}
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          rows={2}
          className="rounded-lg border border-slate-200 px-3 py-2"
          placeholder={t('report.contextHint')}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-jwan-ink">
        {t('report.whatHappened')} *
        <textarea
          required
          value={whatHappened}
          onChange={(e) => setWhatHappened(e.target.value)}
          rows={4}
          className="rounded-lg border border-slate-200 px-3 py-2"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-jwan-ink">
        {t('report.jwanResponse')}
        <textarea
          value={jwanResponse}
          onChange={(e) => setJwanResponse(e.target.value)}
          rows={2}
          className="rounded-lg border border-slate-200 px-3 py-2"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-jwan-ink">
        {t('report.mood')}
        <input
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-jwan-ink">
        {t('report.strategies')}
        <textarea
          value={strategies}
          onChange={(e) => setStrategies(e.target.value)}
          rows={2}
          className="rounded-lg border border-slate-200 px-3 py-2"
        />
      </label>

      {error ? (
        <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-800" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-jwan-teal px-5 py-2.5 font-semibold text-white hover:bg-teal-700 disabled:opacity-60"
        >
          {pending ? t('common.loading') : isEdit ? t('common.save') : t('report.submit')}
        </button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-200 px-5 py-2.5 font-medium text-jwan-ink hover:bg-slate-50"
          >
            {t('common.cancel')}
          </button>
        ) : null}
      </div>
    </form>
  )
}
