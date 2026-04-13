import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AssessmentResults } from '../components/aiAssessment/AssessmentResults'
import { ClinicalSynthesis } from '../components/aiAssessment/ClinicalSynthesis'
import {
  EmoDetective,
  EmoDetectiveResultsPanel,
  type EmoDetectiveResults,
} from '../components/aiAssessment/EmoDetective'
import {
  MemorySpark,
  MemorySparkResultsPanel,
  type MemorySparkResults,
} from '../components/aiAssessment/MemorySpark'
import { MyWorld } from '../components/aiAssessment/MyWorld'
import {
  StoryMind,
  StoryMindResultsPanel,
  type StoryMindResults,
} from '../components/aiAssessment/StoryMind'
import { computeWorldProfile } from '../data/assessmentTasks'
import { useAiAssessments } from '../hooks/useAiAssessments'

type Tab =
  | 'synthesis'
  | 'emo'
  | 'memory'
  | 'story'
  | 'world'
  | 'results'

export function AIAssessment() {
  const { t } = useTranslation()
  const { rows, loading, saveAssessment, refetch } = useAiAssessments()
  const [tab, setTab] = useState<Tab>('synthesis')

  const [emoResults, setEmoResults] = useState<EmoDetectiveResults | null>(null)
  const [memResults, setMemResults] = useState<MemorySparkResults | null>(null)
  const [storyResults, setStoryResults] = useState<StoryMindResults | null>(null)

  const onEmoComplete = useCallback(
    async (r: EmoDetectiveResults) => {
      setEmoResults(r)
      await saveAssessment({
        task_type: 'emo_detective',
        score: r.correctCount,
        accuracy_pct: r.accuracyPct,
        domain_scores: r.byDomain as Record<string, unknown>,
        raw_responses: { choices: r.choices, timesMs: r.timesMs },
      })
    },
    [saveAssessment],
  )

  const onMemComplete = useCallback(
    async (r: MemorySparkResults) => {
      setMemResults(r)
      await saveAssessment({
        task_type: 'memory_spark',
        max_span: r.maxSpan,
        score: r.maxSpan,
        raw_responses: r.rounds,
      })
    },
    [saveAssessment],
  )

  const onStoryComplete = useCallback(
    async (r: StoryMindResults) => {
      setStoryResults(r)
      await saveAssessment({
        task_type: 'story_mind',
        score: r.correctCount,
        accuracy_pct: r.accuracyPct,
        raw_responses: r.choices,
      })
    },
    [saveAssessment],
  )

  const onWorldSubmit = useCallback(
    async (ratings: number[], profile: ReturnType<typeof computeWorldProfile>) => {
      await saveAssessment({
        task_type: 'my_world',
        world_ratings: ratings,
        world_demand_avg: profile.demand ?? null,
        world_safety_avg: profile.safety ?? null,
        domain_scores: {
          anxiety: profile.anxiety,
          pdaConsistent: profile.pdaConsistent,
          anxietyElevated: profile.anxietyElevated,
        } as Record<string, unknown>,
      })
    },
    [saveAssessment],
  )

  const tabs: { id: Tab; labelKey: string }[] = [
    { id: 'synthesis', labelKey: 'aiAssessment.tab.synthesis' },
    { id: 'emo', labelKey: 'aiAssessment.tab.emo' },
    { id: 'memory', labelKey: 'aiAssessment.tab.memory' },
    { id: 'story', labelKey: 'aiAssessment.tab.story' },
    { id: 'world', labelKey: 'aiAssessment.tab.world' },
    { id: 'results', labelKey: 'aiAssessment.tab.results' },
  ]

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-jwan-ink">{t('aiAssessment.pageTitle')}</h1>
        <p className="mt-1 max-w-3xl text-sm text-jwan-gray">{t('aiAssessment.pageIntro')}</p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2" role="tablist">
        {tabs.map(({ id, labelKey }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`rounded-full px-3 py-2 text-xs font-semibold sm:text-sm ${
              tab === id ? 'bg-jwan-teal text-white shadow' : 'bg-slate-100 text-jwan-gray hover:bg-slate-200'
            }`}
          >
            {t(labelKey)}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="min-h-[200px]">
        {tab === 'synthesis' ? <ClinicalSynthesis /> : null}
        {tab === 'emo' ? (
          <div className="flex flex-col gap-6">
            <EmoDetective onComplete={onEmoComplete} />
            <EmoDetectiveResultsPanel results={emoResults} />
          </div>
        ) : null}
        {tab === 'memory' ? (
          <div className="flex flex-col gap-6">
            <MemorySpark onComplete={onMemComplete} />
            <MemorySparkResultsPanel results={memResults} />
          </div>
        ) : null}
        {tab === 'story' ? (
          <div className="flex flex-col gap-6">
            <StoryMind onComplete={onStoryComplete} />
            <StoryMindResultsPanel results={storyResults} />
          </div>
        ) : null}
        {tab === 'world' ? <MyWorld onSubmit={onWorldSubmit} /> : null}
        {tab === 'results' ? (
          <AssessmentResults rows={rows} loading={loading} />
        ) : null}
      </div>

      <button
        type="button"
        onClick={() => void refetch()}
        className="self-start text-sm font-medium text-jwan-teal underline"
      >
        {t('aiAssessment.refresh')}
      </button>
    </div>
  )
}
