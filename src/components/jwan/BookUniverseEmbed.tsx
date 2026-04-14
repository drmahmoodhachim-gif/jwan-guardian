import { useTranslation } from 'react-i18next'
import { Card } from '../ui/Card'

export function BookUniverseEmbed() {
  const { t } = useTranslation()

  return (
    <Card title={t('jwan.booksTitle')}>
      <p className="mb-4 text-sm text-jwan-gray">{t('jwan.booksIntro')}</p>
      <div className="mb-3">
        <a
          href="/jwan_book_universe.html"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-jwan-ink hover:bg-slate-50"
        >
          {t('jwan.booksOpenNew')}
        </a>
      </div>
      <iframe
        title="Jwan Book Universe"
        src="/jwan_book_universe.html"
        className="h-[80vh] w-full rounded-xl border border-slate-200"
      />
    </Card>
  )
}

