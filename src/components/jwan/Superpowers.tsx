import { useTranslation } from 'react-i18next'
import { Sparkles } from 'lucide-react'
import { JWAN_STRENGTHS } from '../../lib/constants'
import { Card } from '../ui/Card'

export function Superpowers() {
  const { i18n, t } = useTranslation()
  const ar = i18n.language.startsWith('ar')

  return (
    <Card title={t('jwan.powers')}>
      <p className="mb-4 flex items-start gap-2 text-sm text-jwan-gray">
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden />
        {t('jwan.powersIntro')}
      </p>
      <ul className="flex flex-col gap-3">
        {JWAN_STRENGTHS.map((row, i) => (
          <li
            key={i}
            className="flex gap-3 rounded-xl border border-amber-100 bg-amber-50/60 px-4 py-3 text-sm text-jwan-ink"
          >
            <span className="font-semibold text-amber-700">{i + 1}.</span>
            <span>{ar ? row.ar : row.en}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
