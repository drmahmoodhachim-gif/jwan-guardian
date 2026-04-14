import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MoodCheckin } from '../components/jwan/MoodCheckin'
import { AIChat } from '../components/jwan/AIChat'
import { Superpowers } from '../components/jwan/Superpowers'
import { Achievements } from '../components/jwan/Achievements'
import { BreathingTool } from '../components/jwan/BreathingTool'
import { ZonesTracker } from '../components/jwan/ZonesTracker'
import { SupportQuestions } from '../components/jwan/SupportQuestions'

type Tab = 'mood' | 'chat' | 'support' | 'powers' | 'wins' | 'breathe' | 'zones'

export function JwanPage() {
  const { t } = useTranslation()
  const [tab, setTab] = useState<Tab>('mood')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'mood', label: t('jwan.tab.mood') },
    { id: 'chat', label: t('jwan.tab.chat') },
    { id: 'support', label: t('jwan.tab.support') },
    { id: 'powers', label: t('jwan.tab.powers') },
    { id: 'wins', label: t('jwan.tab.wins') },
    { id: 'breathe', label: t('jwan.tab.breathe') },
    { id: 'zones', label: t('jwan.tab.zones') },
  ]

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-jwan-ink">{t('jwan.welcome')}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-jwan-ink">{t('jwan.pageIntro')}</p>
      </div>

      <div
        className="flex flex-wrap gap-2 border-b border-slate-200 pb-2"
        role="tablist"
        aria-label={t('nav.jwan')}
      >
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              tab === id
                ? 'bg-jwan-teal text-white shadow'
                : 'bg-slate-100 text-jwan-gray hover:bg-slate-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div role="tabpanel">
        {tab === 'mood' ? <MoodCheckin /> : null}
        {tab === 'chat' ? <AIChat /> : null}
        {tab === 'support' ? <SupportQuestions /> : null}
        {tab === 'powers' ? <Superpowers /> : null}
        {tab === 'wins' ? <Achievements /> : null}
        {tab === 'breathe' ? <BreathingTool /> : null}
        {tab === 'zones' ? <ZonesTracker /> : null}
      </div>
    </div>
  )
}
