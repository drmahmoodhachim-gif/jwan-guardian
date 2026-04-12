import { useTranslation } from 'react-i18next'

interface Props {
  translationKey: string
}

export function SectionPlaceholder({ translationKey }: Props) {
  const { t } = useTranslation()
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <h2 className="text-xl font-semibold text-jwan-ink">{t(translationKey)}</h2>
      <p className="mt-3 text-jwan-gray">{t('phase.placeholder')}</p>
    </div>
  )
}
