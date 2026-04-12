import { useTranslation } from 'react-i18next'
import { CARE_TEAM_APRIL_2025 } from '../../data/careTeamSnapshot'
import { Card } from '../ui/Card'

export function CareTeamSnapshotCard() {
  const { t } = useTranslation()

  return (
    <Card title={t('guide.careTeamTitle')}>
      <p className="mb-4 text-sm text-jwan-gray">{t('guide.careTeamIntro')}</p>
      <ul className="flex flex-col gap-2 text-sm">
        {CARE_TEAM_APRIL_2025.map((row, i) => (
          <li
            key={i}
            className="flex flex-col gap-0.5 rounded-lg border border-slate-100 bg-white px-3 py-2 sm:flex-row sm:justify-between"
          >
            <span className="font-medium text-jwan-ink">{row.provider}</span>
            <span className="text-jwan-gray">{row.role}</span>
            <span className="text-xs text-teal-800">{row.status}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
