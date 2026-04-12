import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ReportsToActionsMatrix } from '../components/protocols/ReportsToActionsMatrix'
import { PDAQuickGuide } from '../components/protocols/PDAQuickGuide'
import { PersonSelector } from '../components/protocols/PersonSelector'
import { ZoneResponseGuide } from '../components/protocols/ZoneResponseGuide'
import { ExactPhrasesGuide } from '../components/protocols/ExactPhrasesGuide'
import { LayanGuide } from '../components/protocols/LayanGuide'

type Section = 'matrix' | 'pda' | 'people' | 'zones' | 'phrases' | 'layan'

const SECTIONS: { id: Section; labelKey: string }[] = [
  { id: 'matrix', labelKey: 'protocols.tab.matrix' },
  { id: 'pda', labelKey: 'protocols.tab.pda' },
  { id: 'people', labelKey: 'protocols.tab.people' },
  { id: 'zones', labelKey: 'protocols.tab.zones' },
  { id: 'phrases', labelKey: 'protocols.tab.phrases' },
  { id: 'layan', labelKey: 'protocols.tab.layan' },
]

export function CareTeamProtocols() {
  const { t } = useTranslation()
  const [section, setSection] = useState<Section>('matrix')

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="sticky top-0 z-10 -mx-4 border-b border-slate-200/80 bg-white/95 px-4 py-3 shadow-sm backdrop-blur md:-mx-6 md:px-6">
        <p className="text-center text-xs font-medium text-jwan-gray md:text-sm">
          {t('protocols.banner.line1')}
        </p>
        <p className="mt-1 text-center text-xs text-jwan-teal md:text-sm">{t('protocols.banner.line2')}</p>
      </div>

      <div>
        <h1 className="text-2xl font-semibold text-jwan-ink">{t('protocols.pageTitle')}</h1>
        <p className="mt-1 max-w-3xl text-sm text-jwan-gray">{t('protocols.pageIntro')}</p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2" role="tablist">
        {SECTIONS.map(({ id, labelKey }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={section === id}
            onClick={() => setSection(id)}
            className={`rounded-full px-3 py-2 text-xs font-semibold sm:text-sm ${
              section === id
                ? 'bg-jwan-teal text-white shadow'
                : 'bg-slate-100 text-jwan-gray hover:bg-slate-200'
            }`}
          >
            {t(labelKey)}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="min-h-[320px]">
        {section === 'matrix' ? <ReportsToActionsMatrix /> : null}
        {section === 'pda' ? <PDAQuickGuide /> : null}
        {section === 'people' ? <PersonSelector /> : null}
        {section === 'zones' ? <ZoneResponseGuide /> : null}
        {section === 'phrases' ? <ExactPhrasesGuide /> : null}
        {section === 'layan' ? <LayanGuide /> : null}
      </div>
    </div>
  )
}
