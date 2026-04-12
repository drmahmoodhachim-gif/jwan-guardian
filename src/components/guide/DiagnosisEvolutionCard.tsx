import { useTranslation } from 'react-i18next'
import { DIAGNOSIS_EVOLUTION } from '../../data/diagnosisEvolution'
import { Card } from '../ui/Card'

export function DiagnosisEvolutionCard() {
  const { t } = useTranslation()

  return (
    <Card title={t('guide.diagnosisEvolutionTitle')}>
      <p className="mb-4 text-sm text-jwan-gray">{t('guide.diagnosisEvolutionIntro')}</p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs font-semibold text-jwan-gray">
              <th className="py-2 pr-3">{t('guide.dx.date')}</th>
              <th className="py-2 pr-3">{t('guide.dx.age')}</th>
              <th className="py-2 pr-3">{t('guide.dx.assessor')}</th>
              <th className="py-2">{t('guide.dx.label')}</th>
            </tr>
          </thead>
          <tbody>
            {DIAGNOSIS_EVOLUTION.map((row, i) => (
              <tr key={i} className="border-b border-slate-100">
                <td className="py-2 pr-3 align-top text-jwan-ink">{row.date}</td>
                <td className="py-2 pr-3 align-top">{row.age}</td>
                <td className="py-2 pr-3 align-top text-jwan-gray">{row.assessor}</td>
                <td className="py-2 align-top text-jwan-ink">{row.diagnosis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
