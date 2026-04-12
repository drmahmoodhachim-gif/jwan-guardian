import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../hooks/useAuth'
import type { Reminder } from '../../types'

const ASSIGNED: { value: string; labelKey: string }[] = [
  { value: 'all', labelKey: 'reminders.assign.all' },
  { value: 'dad', labelKey: 'role.dad' },
  { value: 'mom', labelKey: 'role.mom' },
  { value: 'teacher', labelKey: 'role.teacher' },
  { value: 'therapist', labelKey: 'role.therapist' },
  { value: 'doctor', labelKey: 'role.doctor' },
  { value: 'jwan', labelKey: 'role.jwan' },
]

const FREQ: Reminder['frequency'][] = ['once', 'daily', 'weekly', 'monthly']

export function ReminderForm({
  addReminder,
}: {
  addReminder: (row: {
    text_en: string
    text_ar: string | null
    frequency: Reminder['frequency']
    assigned_to: string
    created_by: string | null
  }) => Promise<{ error: string | null }>
}) {
  const { t } = useTranslation()
  const { user, profile } = useAuth()
  const [text_en, setTextEn] = useState('')
  const [text_ar, setTextAr] = useState('')
  const [frequency, setFrequency] = useState<Reminder['frequency']>('weekly')
  const [assigned_to, setAssignedTo] = useState('all')
  const [pending, setPending] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const te = text_en.trim()
    if (!te) {
      setErr(t('reminders.needEn'))
      return
    }
    if (!user) return
    setErr(null)
    setPending(true)
    const { error } = await addReminder({
      text_en: te,
      text_ar: text_ar.trim() || null,
      frequency,
      assigned_to,
      created_by: profile?.id ?? null,
    })
    setPending(false)
    if (error) {
      setErr(error)
      return
    }
    setTextEn('')
    setTextAr('')
    setFrequency('weekly')
    setAssignedTo('all')
  }

  return (
    <form
      onSubmit={(e) => void onSubmit(e)}
      className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-jwan-ink">{t('reminders.add')}</h2>

      <label className="flex flex-col gap-1 text-sm font-medium text-jwan-ink">
        {t('reminders.textEn')}
        <input
          value={text_en}
          onChange={(e) => setTextEn(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2"
          required
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-jwan-ink">
        {t('reminders.textAr')}
        <input
          value={text_ar}
          onChange={(e) => setTextAr(e.target.value)}
          dir="rtl"
          className="rounded-lg border border-slate-200 px-3 py-2"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-medium text-jwan-ink">
          {t('reminders.frequency')}
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as Reminder['frequency'])}
            className="rounded-lg border border-slate-200 px-3 py-2"
          >
            {FREQ.map((f) => (
              <option key={f} value={f}>
                {t(`frequency.${f}`)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-jwan-ink">
          {t('reminders.assigned')}
          <select
            value={assigned_to}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2"
          >
            {ASSIGNED.map((a) => (
              <option key={a.value} value={a.value}>
                {t(a.labelKey)}
              </option>
            ))}
          </select>
        </label>
      </div>

      {err ? <p className="text-sm text-rose-700">{err}</p> : null}

      <button
        type="submit"
        disabled={pending || !user}
        className="rounded-xl bg-jwan-teal px-6 py-2.5 font-semibold text-white disabled:opacity-50"
      >
        {pending ? t('common.loading') : t('reminders.submit')}
      </button>
    </form>
  )
}
