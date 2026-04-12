import { useTranslation } from 'react-i18next'
import { AlertCircle, Heart, Palette } from 'lucide-react'
import type { ClinicalAlert } from '../../data/clinicalAlerts'
import { CLINICAL_ALERTS } from '../../data/clinicalAlerts'
import { Card } from '../ui/Card'

const ICONS = { Heart, Palette, AlertCircle } as const

function AlertBlock({ alert: a }: { alert: ClinicalAlert }) {
  const { i18n } = useTranslation()
  const ar = i18n.language.startsWith('ar')
  const Icon = ICONS[a.icon] ?? AlertCircle
  const border =
    a.level === 'high'
      ? 'border-violet-200 bg-violet-50/80'
      : 'border-teal-200 bg-teal-50/60'

  return (
    <div className={`flex gap-3 rounded-xl border p-4 ${border}`}>
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-jwan-ink opacity-80" aria-hidden />
      <div className="min-w-0 text-sm">
        <h3 className="font-semibold text-jwan-ink">{ar ? a.titleAr : a.title}</h3>
        <p className="mt-1 leading-relaxed text-jwan-ink">{ar ? a.bodyAr : a.body}</p>
        <p className="mt-2 text-xs text-jwan-gray">{a.source}</p>
      </div>
    </div>
  )
}

export function ClinicalAlertsCard() {
  const { t } = useTranslation()

  return (
    <Card title={t('guide.clinicalAlertsTitle')}>
      <p className="mb-4 text-sm text-jwan-gray">{t('guide.clinicalAlertsIntro')}</p>
      <div className="flex flex-col gap-3">
        {CLINICAL_ALERTS.map((a) => (
          <AlertBlock key={`${a.level}-${a.source}`} alert={a} />
        ))}
      </div>
    </Card>
  )
}
