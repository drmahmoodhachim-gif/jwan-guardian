import { useTranslation } from 'react-i18next'
import { JWAN_IQ_SNAPSHOTS } from '../../data/assessments'
import { Card } from '../ui/Card'

export function IqSnapshotsCard() {
  const { t } = useTranslation()

  return (
    <Card title={t('guide.iqSnapshotsTitle')}>
      <p className="mb-4 text-sm text-jwan-gray">{t('guide.iqSnapshotsIntro')}</p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs font-semibold text-jwan-gray">
              <th className="py-2 pr-2">{t('guide.iq.date')}</th>
              <th className="py-2 pr-2">{t('guide.iq.age')}</th>
              <th className="py-2 pr-2">{t('guide.iq.tool')}</th>
              <th className="py-2 pr-2">{t('guide.iq.score')}</th>
              <th className="py-2">{t('guide.iq.note')}</th>
            </tr>
          </thead>
          <tbody>
            {JWAN_IQ_SNAPSHOTS.map((row, i) => (
              <tr key={i} className="border-b border-slate-100">
                <td className="py-2 pr-2 text-jwan-ink">{row.date}</td>
                <td className="py-2 pr-2">{row.age}</td>
                <td className="py-2 pr-2">{row.tool}</td>
                <td className="py-2 pr-2 font-semibold">{row.score}</td>
                <td className="py-2 text-jwan-gray">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm font-medium text-jwan-teal">{t('guide.iqConclusion')}</p>
    </Card>
  )
}
