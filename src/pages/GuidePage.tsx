import { useTranslation } from 'react-i18next'
import { Card } from '../components/ui/Card'
import { ClinicalAlertsCard } from '../components/guide/ClinicalAlertsCard'
import { AssessmentTimelineCard } from '../components/guide/AssessmentTimelineCard'
import { ProviderTimelineCard } from '../components/guide/ProviderTimelineCard'
import { IqSnapshotsCard } from '../components/guide/IqSnapshotsCard'

export function GuidePage() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-jwan-ink">{t('nav.guide')}</h1>
        <p className="mt-1 max-w-3xl text-sm leading-relaxed text-jwan-gray">{t('guide.intro')}</p>
      </div>

      <ClinicalAlertsCard />
      <ProviderTimelineCard />
      <AssessmentTimelineCard />
      <IqSnapshotsCard />

      <Card title={t('guide.goldenTitle')}>
        <ul className="list-disc space-y-3 pl-5 text-sm leading-relaxed text-jwan-ink">
          <li>{t('guide.golden.1')}</li>
          <li>{t('guide.golden.2')}</li>
          <li>{t('guide.golden.3')}</li>
          <li>{t('guide.golden.4')}</li>
        </ul>
      </Card>

      <Card title={t('guide.routineTitle')}>
        <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-jwan-ink">
          <li>{t('guide.routine.1')}</li>
          <li>{t('guide.routine.2')}</li>
          <li>{t('guide.routine.3')}</li>
          <li>{t('guide.routine.4')}</li>
        </ol>
      </Card>

      <Card title={t('guide.crisisTitle')}>
        <p className="text-sm leading-relaxed text-jwan-ink">{t('guide.crisis.intro')}</p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm font-medium text-jwan-ink">
          <li>{t('guide.crisis.step1')}</li>
          <li>{t('guide.crisis.step2')}</li>
          <li>{t('guide.crisis.step3')}</li>
          <li>{t('guide.crisis.step4')}</li>
        </ol>
        <p className="mt-4 text-sm text-jwan-gray">{t('guide.crisis.note')}</p>
      </Card>

      <Card title={t('guide.evidenceTitle')}>
        <div className="space-y-4 text-sm leading-relaxed text-jwan-ink">
          <div>
            <h3 className="font-semibold text-jwan-teal">PEERS</h3>
            <p className="mt-1">{t('guide.evidence.peers')}</p>
          </div>
          <div>
            <h3 className="font-semibold text-jwan-teal">{t('guide.evidence.zonesTitle')}</h3>
            <p className="mt-1">{t('guide.evidence.zones')}</p>
          </div>
          <div>
            <h3 className="font-semibold text-jwan-teal">{t('guide.evidence.cbtTitle')}</h3>
            <p className="mt-1">{t('guide.evidence.cbt')}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
