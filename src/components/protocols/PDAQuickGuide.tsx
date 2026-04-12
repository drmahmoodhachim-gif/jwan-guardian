import { useTranslation } from 'react-i18next'
import { PDA_QUICK_GUIDE } from '../../data/protocols'
import { Card } from '../ui/Card'

export function PDAQuickGuide() {
  const { t, i18n } = useTranslation()
  const ar = i18n.language.startsWith('ar')

  const gp = ar ? PDA_QUICK_GUIDE.governingPrinciple.ar : PDA_QUICK_GUIDE.governingPrinciple.en

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-teal-800">
          {t('protocols.pda.governingTitle')}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-jwan-ink">{gp}</p>
      </div>

      <Card title={t('protocols.pda.rulesTitle')}>
        <ol className="list-decimal space-y-4 pl-5 text-sm">
          {PDA_QUICK_GUIDE.rules.map((rule, i) => (
            <li key={i}>
              <span className="font-semibold text-jwan-ink">
                {ar ? rule.title.ar : rule.title.en}
              </span>
              <p className="mt-1 text-jwan-gray">{ar ? rule.detail.ar : rule.detail.en}</p>
            </li>
          ))}
        </ol>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title={t('protocols.pda.warningYellow')}>
          <ul className="list-disc space-y-2 pl-5 text-sm text-jwan-ink">
            {(ar ? PDA_QUICK_GUIDE.warningSigns.yellow.ar : PDA_QUICK_GUIDE.warningSigns.yellow.en).map(
              (x, i) => (
                <li key={i}>{x}</li>
              ),
            )}
          </ul>
        </Card>
        <Card title={t('protocols.pda.warningRed')}>
          <ul className="list-disc space-y-2 pl-5 text-sm text-jwan-ink">
            {(ar ? PDA_QUICK_GUIDE.warningSigns.red.ar : PDA_QUICK_GUIDE.warningSigns.red.en).map(
              (x, i) => (
                <li key={i}>{x}</li>
              ),
            )}
          </ul>
        </Card>
      </div>
    </div>
  )
}
