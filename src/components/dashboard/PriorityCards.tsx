import { useTranslation } from 'react-i18next'
import { Bell } from 'lucide-react'
import type { Reminder } from '../../types'
import { Card } from '../ui/Card'

function frequencyLabel(freq: Reminder['frequency'], t: (k: string) => string) {
  switch (freq) {
    case 'once':
      return t('frequency.once')
    case 'daily':
      return t('frequency.daily')
    case 'weekly':
      return t('frequency.weekly')
    case 'monthly':
      return t('frequency.monthly')
    default:
      return freq
  }
}

export function PriorityCards({
  reminders,
  loading,
}: {
  reminders: Reminder[]
  loading: boolean
}) {
  const { t, i18n } = useTranslation()
  const ar = i18n.language.startsWith('ar')
  const top = reminders.slice(0, 6)

  return (
    <Card title={t('dashboard.priorities')}>
      {loading ? (
        <p className="text-sm text-jwan-gray">{t('common.loading')}</p>
      ) : top.length === 0 ? (
        <p className="text-sm text-jwan-gray">{t('priority.empty')}</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {top.map((r) => (
            <li
              key={r.id}
              className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2 text-start"
            >
              <Bell className="mt-0.5 h-5 w-5 shrink-0 text-jwan-teal" aria-hidden />
              <div>
                <p className="text-sm font-medium text-jwan-ink">
                  {ar && r.text_ar ? r.text_ar : r.text_en}
                </p>
                <p className="mt-0.5 text-xs text-jwan-gray">
                  {frequencyLabel(r.frequency, t)}
                  {r.assigned_to !== 'all' ? ` · ${r.assigned_to}` : ''}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
