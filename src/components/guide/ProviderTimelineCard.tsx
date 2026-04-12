import { useTranslation } from 'react-i18next'
import { PROVIDER_TIMELINE } from '../../data/providerTimeline'
import { Card } from '../ui/Card'

export function ProviderTimelineCard() {
  const { t, i18n } = useTranslation()
  const ar = i18n.language.startsWith('ar')

  return (
    <Card title={t('guide.providerTimelineTitle')}>
      <p className="mb-4 text-sm text-jwan-gray">{t('guide.providerTimelineIntro')}</p>
      <ul className="flex flex-col gap-3 text-sm">
        {PROVIDER_TIMELINE.map((row, i) => (
          <li key={i} className="flex flex-col gap-0.5 border-l-2 border-teal-200 pl-3">
            <span className="font-semibold text-jwan-teal">{ar ? row.periodAr : row.period}</span>
            <span className="leading-relaxed text-jwan-ink">{ar ? row.detailAr : row.detail}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
