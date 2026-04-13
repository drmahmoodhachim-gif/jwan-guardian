import { useTranslation } from 'react-i18next'
import type { SensorySessionType } from '../../hooks/useSensoryLog'
import { isFutureDate } from '../../lib/weekUtils'
import { Card } from '../ui/Card'

const SESSIONS: { key: SensorySessionType; labelKey: string }[] = [
  { key: 'morning', labelKey: 'weekly.sensory.morning' },
  { key: 'midday', labelKey: 'weekly.sensory.midday' },
  { key: 'afternoon', labelKey: 'weekly.sensory.afternoon' },
]

export function SensoryDietTracker({
  weekDates,
  getSession,
  onToggle,
}: {
  weekDates: string[]
  getSession: (type: SensorySessionType, date: string) => boolean
  onToggle: (type: SensorySessionType, date: string) => void
}) {
  const { t } = useTranslation()
  const dayLabels = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((k) => t(`weekly.dayShort.${k}`))

  return (
    <div className="flex flex-col gap-6">
      <Card title={t('weekly.sensoryTitle')}>
        <p className="mb-4 text-sm text-jwan-gray">{t('weekly.sensoryIntro')}</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-center text-xs">
            <thead>
              <tr>
                <th className="border-b border-slate-200 p-2 text-left text-jwan-gray">{t('weekly.sensory.session')}</th>
                {dayLabels.map((label, i) => (
                  <th key={i} className="border-b border-slate-200 p-2 font-semibold text-jwan-ink">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SESSIONS.map(({ key, labelKey }) => (
                <tr key={key}>
                  <td className="border-b border-slate-100 p-2 text-left font-medium text-jwan-ink">{t(labelKey)}</td>
                  {weekDates.map((dateStr) => {
                    const done = getSession(key, dateStr)
                    const future = isFutureDate(dateStr)
                    const disabled = future
                    return (
                      <td key={dateStr} className="border-b border-slate-100 p-1">
                        <button
                          type="button"
                          disabled={disabled}
                          onClick={() => !disabled && onToggle(key, dateStr)}
                          className={`h-9 w-full max-w-[44px] rounded-lg border-2 text-xs font-semibold transition ${
                            disabled
                              ? 'cursor-not-allowed opacity-35'
                              : 'cursor-pointer hover:opacity-90'
                          } ${done ? 'border-teal-500 bg-teal-50 text-teal-800' : 'border-slate-200 bg-white text-slate-400'}`}
                        >
                          {done ? '✓' : '○'}
                        </button>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title={t('weekly.sensoryGuide')}>
        <ul className="list-inside list-disc space-y-2 text-sm text-jwan-gray">
          <li>{t('weekly.sensoryGuide1')}</li>
          <li>{t('weekly.sensoryGuide2')}</li>
          <li>{t('weekly.sensoryGuide3')}</li>
        </ul>
      </Card>
    </div>
  )
}
