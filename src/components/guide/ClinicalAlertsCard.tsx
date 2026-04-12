import { useTranslation } from 'react-i18next'
import {
  Activity,
  AlertCircle,
  Brain,
  CheckCircle,
  Eye,
  Heart,
  Palette,
  Star,
} from 'lucide-react'
import type { ClinicalAlert } from '../../data/clinicalAlerts'
import { CLINICAL_ALERTS } from '../../data/clinicalAlerts'
import { Card } from '../ui/Card'

const ICONS = {
  Heart,
  Palette,
  AlertCircle,
  Activity,
  Brain,
  CheckCircle,
  Star,
  Eye,
} as const

function alertStyles(level: ClinicalAlert['level'], color: string) {
  if (level === 'positive') {
    return 'border-emerald-200 bg-emerald-50/90'
  }
  if (level === 'high') {
    if (color === 'amber') return 'border-amber-200 bg-amber-50/90'
    return 'border-violet-200 bg-violet-50/80'
  }
  if (level === 'warning') {
    return 'border-orange-200 bg-orange-50/80'
  }
  if (color === 'teal') return 'border-teal-200 bg-teal-50/60'
  return 'border-slate-200 bg-slate-50/80'
}

function AlertBlock({ alert: a }: { alert: ClinicalAlert }) {
  const { i18n } = useTranslation()
  const ar = i18n.language.startsWith('ar')
  const Icon = ICONS[a.icon] ?? AlertCircle

  return (
    <div className={`flex gap-3 rounded-xl border p-4 ${alertStyles(a.level, a.color)}`}>
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-jwan-ink opacity-85" aria-hidden />
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
          <AlertBlock key={a.id} alert={a} />
        ))}
      </div>
    </Card>
  )
}
