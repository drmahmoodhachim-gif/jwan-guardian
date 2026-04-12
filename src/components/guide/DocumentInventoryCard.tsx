import { useTranslation } from 'react-i18next'
import { DOCUMENT_INVENTORY } from '../../data/documentInventory'
import { Card } from '../ui/Card'

export function DocumentInventoryCard() {
  const { t } = useTranslation()

  return (
    <Card title={t('guide.documentInventoryTitle')}>
      <p className="mb-4 text-sm text-jwan-gray">{t('guide.documentInventoryIntro')}</p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-jwan-gray">
              <th className="py-2 pr-2">#</th>
              <th className="py-2 pr-2">{t('guide.doc.col.document')}</th>
              <th className="py-2 pr-2">{t('guide.doc.col.institution')}</th>
              <th className="py-2 pr-2">{t('guide.doc.col.reportDate')}</th>
              <th className="py-2 pr-2">{t('guide.doc.col.period')}</th>
              <th className="py-2 pr-2">{t('guide.doc.col.age')}</th>
              <th className="py-2">{t('guide.doc.col.file')}</th>
            </tr>
          </thead>
          <tbody>
            {DOCUMENT_INVENTORY.map((row) => (
              <tr key={row.n} className="border-b border-slate-100 text-jwan-ink">
                <td className="py-2 pr-2 align-top">{row.n}</td>
                <td className="py-2 pr-2 align-top">{row.document}</td>
                <td className="py-2 pr-2 align-top">{row.institution}</td>
                <td className="py-2 pr-2 align-top">{row.reportDate}</td>
                <td className="py-2 pr-2 align-top">{row.assessmentPeriod}</td>
                <td className="py-2 pr-2 align-top">{row.age}</td>
                <td className="py-2 align-top text-jwan-gray">{row.sourceFile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
