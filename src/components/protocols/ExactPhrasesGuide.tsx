import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PHRASES } from '../../data/protocols'

type TabId = 'transitions' | 'requests' | 'refusals' | 'escalation' | 'positive' | 'zones'

const TABS: { id: TabId; labelKey: string }[] = [
  { id: 'transitions', labelKey: 'protocols.phrases.tab.transitions' },
  { id: 'requests', labelKey: 'protocols.phrases.tab.requests' },
  { id: 'refusals', labelKey: 'protocols.phrases.tab.refusals' },
  { id: 'escalation', labelKey: 'protocols.phrases.tab.escalation' },
  { id: 'positive', labelKey: 'protocols.phrases.tab.positive' },
  { id: 'zones', labelKey: 'protocols.phrases.tab.zones' },
]

export function ExactPhrasesGuide() {
  const { t } = useTranslation()
  const [tab, setTab] = useState<TabId>('transitions')

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2" role="tablist">
        {TABS.map(({ id, labelKey }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold sm:text-sm ${
              tab === id ? 'bg-jwan-teal text-white shadow' : 'bg-slate-100 text-jwan-gray hover:bg-slate-200'
            }`}
          >
            {t(labelKey)}
          </button>
        ))}
      </div>

      {tab === 'transitions' || tab === 'requests' || tab === 'refusals' || tab === 'escalation' ? (
        <ul className="flex flex-col gap-3">
          {(
            tab === 'refusals'
              ? PHRASES.whenSheRefuses
              : tab === 'escalation'
                ? PHRASES.duringEscalation
                : PHRASES[tab]
          ).map((row, i) => (
            <li
              key={i}
              className="grid gap-2 rounded-xl border border-slate-200 md:grid-cols-2 md:gap-0 md:divide-x md:divide-slate-200"
            >
              <div className="rounded-t-xl bg-rose-50 p-4 text-sm md:rounded-l-xl md:rounded-tr-none">
                <p className="text-xs font-semibold uppercase text-rose-800">{t('protocols.phrases.avoid')}</p>
                <p className="mt-1 text-rose-950">{row.avoid}</p>
              </div>
              <div className="rounded-b-xl bg-teal-50/80 p-4 text-sm md:rounded-r-xl md:rounded-bl-none md:rounded-tr-xl">
                <p className="text-xs font-semibold uppercase text-teal-900">{t('protocols.phrases.use')}</p>
                <p className="mt-1 text-teal-950">{row.use}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      {tab === 'positive' ? (
        <ul className="list-disc space-y-2 pl-5 text-sm text-jwan-ink">
          {PHRASES.positiveAcknowledgement.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      ) : null}

      {tab === 'zones' ? (
        <ul className="flex flex-col gap-2 text-sm">
          {Object.entries(PHRASES.zones).map(([key, value]) => (
            <li key={key} className="rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-2">
              <span className="font-medium text-jwan-teal">{key}</span>
              <p className="mt-1 text-jwan-ink">{value}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
