import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BookFinder } from '../components/jwan/BookUniverse/BookFinder'
import { BookQuiz } from '../components/jwan/BookUniverse/BookQuiz'
import { FactEngine } from '../components/jwan/BookUniverse/FactEngine'
import { MyShelf } from '../components/jwan/BookUniverse/MyShelf'
import { ReadingLog } from '../components/jwan/BookUniverse/ReadingLog'
import { AskMatilda } from '../components/jwan/MatildaModule/AskMatilda'
import { BraveryBadges } from '../components/jwan/MatildaModule/BraveryBadges'
import { BraverySteps } from '../components/jwan/MatildaModule/BraverySteps'
import { FeelingsJournal } from '../components/jwan/MatildaModule/FeelingsJournal'
import { MatildaHeader } from '../components/jwan/MatildaModule/MatildaHeader'
import { MeetMatilda } from '../components/jwan/MatildaModule/MeetMatilda'
import { TruthPanel } from '../components/jwan/MatildaModule/TruthPanel'
import { useBraverySteps } from '../hooks/useBraverySteps'
import { useJwanDayFeedback } from '../hooks/useJwanDayFeedback'
import { anthropicComplete } from '../lib/anthropic'
import { JWAN_STRENGTHS } from '../lib/constants'

type TopTab = 'books' | 'matilda' | 'myday' | 'mybrain'
type BookTab = 'fact' | 'finder' | 'shelf' | 'quiz' | 'reading'
type MatildaTab = 'meet' | 'steps' | 'ask' | 'journal' | 'badges'

export function JwanPage() {
  const { t } = useTranslation()
  const [topTab, setTopTab] = useState<TopTab>('books')
  const [bookTab, setBookTab] = useState<BookTab>('fact')
  const [matildaTab, setMatildaTab] = useState<MatildaTab>('meet')
  const [bookQuery, setBookQuery] = useState('')
  const [truthOpen, setTruthOpen] = useState(true)
  const { completedSteps, comfortLevel, markStep, logComfort } = useBraverySteps()
  const { row, saveToday } = useJwanDayFeedback()
  const [exerciseDone, setExerciseDone] = useState<Record<string, boolean>>({})
  const [dayText, setDayText] = useState('')
  const [savedNote, setSavedNote] = useState('')
  const [savedSummary, setSavedSummary] = useState('')
  const [savingDay, setSavingDay] = useState(false)

  async function buildGentleSummary(note: string, exercises: Record<string, boolean>) {
    const done = Object.keys(exercises).filter((k) => exercises[k]).length
    try {
      return await anthropicComplete({
        system:
          'Write short child-safe daily encouragement. 2 sentences max. Warm, concrete, no diagnosis, no judgment. Include one tiny next step.',
        messages: [
          {
            role: 'user',
            content: `Daily note: "${note || 'No note'}". Completed exercises count: ${done}.`,
          },
        ],
        maxTokens: 140,
      })
    } catch {
      if (done >= 3) return 'You did many strong steps today. Tiny next step: pick one favorite calm activity before bed.'
      if (done >= 1) return 'You made progress today and that matters. Tiny next step: complete one more short exercise tomorrow.'
      return 'Today can be a reset day, and that is okay. Tiny next step: try one small breathing round tomorrow.'
    }
  }

  // Keep local page state aligned with the latest row from Supabase.
  useEffect(() => {
    if (!row) return
    void Promise.resolve().then(() => {
      setExerciseDone(row.exercises ?? {})
      setDayText(row.note ?? '')
      setSavedNote(row.note ?? '')
      setSavedSummary(row.ai_summary ?? '')
    })
  }, [row])

  async function onStepAction(action: string, stepId: string) {
    await markStep(stepId)
    if (action === 'ask') setMatildaTab('ask')
    if (action === 'journal') setMatildaTab('journal')
    if (action === 'truth_panel') setTruthOpen(true)
  }

  return (
    <div className="jwan-page flex flex-1 flex-col gap-6 rounded-3xl bg-gradient-to-br from-teal-50 via-white to-amber-50 p-4">
      <div>
        <h1 className="jwan-hello bg-gradient-to-r from-teal-600 to-slate-900 bg-clip-text text-4xl font-extrabold text-transparent">
          Hello Jwan!
        </h1>
        <p className="jwan-greeting-card mt-2 max-w-2xl rounded-2xl border border-teal-100 bg-teal-50/60 p-3 text-sm text-jwan-ink">
          This is your space. Facts, books, and bravery steps at your pace.
        </p>
      </div>

      <div className="flex gap-2 border-b border-teal-100 pb-3">
        {[
          { id: 'books' as const, label: 'Book universe' },
          { id: 'matilda' as const, label: 'Matilda' },
          { id: 'myday' as const, label: 'My day' },
          { id: 'mybrain' as const, label: 'My brain' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setTopTab(tab.id)}
            className={`jwan-tab-btn rounded-full px-4 py-2 text-sm font-semibold transition ${
              topTab === tab.id
                ? 'is-active bg-gradient-to-r from-teal-500 to-teal-700 text-white shadow-md'
                : 'bg-white text-jwan-gray hover:-translate-y-0.5 hover:border-teal-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {topTab === 'books' ? (
        <div className="jwan-panel space-y-3">
          <p className="text-xs font-semibold uppercase text-jwan-gray">
            Knowledge engine - data and facts only
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'fact' as const, label: 'Fact engine' },
              { id: 'finder' as const, label: 'Book finder' },
              { id: 'shelf' as const, label: 'My shelf' },
              { id: 'quiz' as const, label: 'Book quiz' },
              { id: 'reading' as const, label: 'Reading log' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setBookTab(tab.id)}
                className={`jwan-tab-btn rounded-full border px-3 py-1 text-xs ${
                  bookTab === tab.id
                    ? 'is-active border-teal-500 bg-teal-50 text-teal-900'
                    : 'border-slate-200 bg-white text-jwan-gray'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {bookTab === 'fact' ? (
            <FactEngine
              onBookSearch={(q) => {
                setBookQuery(q)
                setBookTab('finder')
              }}
            />
          ) : null}
          {bookTab === 'finder' ? <BookFinder query={bookQuery} onQueryChange={setBookQuery} /> : null}
          {bookTab === 'shelf' ? <MyShelf /> : null}
          {bookTab === 'quiz' ? <BookQuiz /> : null}
          {bookTab === 'reading' ? <ReadingLog /> : null}
        </div>
      ) : null}

      {topTab === 'matilda' ? (
        <div className="jwan-panel space-y-3">
          <MatildaHeader
            onTruthToggle={() => {
              setTruthOpen((v) => !v)
              void markStep('s2')
            }}
            comfortLevel={comfortLevel}
          />
          <TruthPanel isOpen={truthOpen} />
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'meet' as const, label: 'Meet Matilda' },
              { id: 'steps' as const, label: 'My steps' },
              { id: 'ask' as const, label: 'Ask Matilda' },
              { id: 'journal' as const, label: 'My journal' },
              { id: 'badges' as const, label: 'My badges' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setMatildaTab(tab.id)}
                className={`jwan-tab-btn rounded-full border px-3 py-1 text-xs ${
                  matildaTab === tab.id
                    ? 'is-active border-teal-500 bg-teal-50 text-teal-900'
                    : 'border-slate-200 bg-white text-jwan-gray'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {matildaTab === 'meet' ? (
            <MeetMatilda
              onComfortSelect={(lvl) => {
                void markStep('s3')
                void logComfort(lvl, 'meet_matilda')
              }}
            />
          ) : null}
          {matildaTab === 'steps' ? (
            <BraverySteps completedSteps={completedSteps} onStepAction={onStepAction} />
          ) : null}
          {matildaTab === 'ask' ? (
            <AskMatilda
              onAskDone={(isSecond) => {
                void markStep(isSecond ? 's7' : 's5')
              }}
            />
          ) : null}
          {matildaTab === 'journal' ? (
            <FeelingsJournal comfortLevel={comfortLevel} onSaved={() => void markStep('s6')} />
          ) : null}
          {matildaTab === 'badges' ? <BraveryBadges completedSteps={completedSteps} /> : null}
        </div>
      ) : null}

      {topTab === 'myday' ? (
        <div className="jwan-panel space-y-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold text-jwan-ink">My strengths</p>
            <ul className="mt-2 space-y-2 text-sm text-jwan-gray">
              {JWAN_STRENGTHS.map((s) => (
                <li key={s.en} className="rounded-lg bg-teal-50/60 px-3 py-2 text-jwan-ink">
                  {s.en}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold text-jwan-ink">Mini exercises</p>
            <p className="mt-1 text-xs text-jwan-gray">Choose any exercise. No pressure - every step counts.</p>
            <div className="mt-3 grid gap-2">
              {[
                '4 calm breaths',
                'Read for 10 minutes',
                'Write one happy sentence',
                'Stretch for 2 minutes',
              ].map((exercise) => (
                <button
                  key={exercise}
                  type="button"
                  onClick={() => {
                    const next = { ...exerciseDone, [exercise]: !exerciseDone[exercise] }
                    setExerciseDone(next)
                  }}
                  className={`rounded-lg border px-3 py-2 text-left text-sm ${
                    exerciseDone[exercise]
                      ? 'border-teal-400 bg-teal-50 text-teal-900'
                      : 'border-slate-200 bg-white text-jwan-ink'
                  }`}
                >
                  {exerciseDone[exercise] ? '✓ ' : ''} {exercise}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold text-jwan-ink">How was your day?</p>
            <textarea
              value={dayText}
              onChange={(e) => setDayText(e.target.value)}
              placeholder="Write one line about your day..."
              className="mt-2 h-24 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={() => {
                void (async () => {
                  setSavingDay(true)
                  const note = dayText.trim()
                  const summary = await buildGentleSummary(note, exerciseDone)
                  const { error } = await saveToday({
                    note,
                    exercises: exerciseDone,
                    ai_summary: summary,
                  })
                  if (!error) {
                    setSavedNote(note)
                    setSavedSummary(summary)
                  }
                  setSavingDay(false)
                })()
              }}
              disabled={savingDay}
              className="mt-2 rounded-full bg-jwan-teal px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {savingDay ? 'Saving...' : 'Save today&apos;s feedback'}
            </button>
            {savedNote ? (
              <p className="mt-2 rounded-lg bg-teal-50 p-2 text-xs text-teal-900">
                Saved note: {savedNote}
              </p>
            ) : null}
            {savedSummary ? (
              <p className="mt-2 rounded-lg border border-teal-200 bg-white p-2 text-xs text-jwan-ink">
                Gentle AI summary: {savedSummary}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      {topTab === 'mybrain' ? (
        <div className="jwan-panel space-y-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold text-jwan-ink">My brain</p>
            <p className="mt-1 text-sm text-jwan-gray">{t('brain.ov.jwan')}</p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-jwan-ink">Social brain</p>
              <p className="mt-1 text-sm text-jwan-gray">{t('brain.social.jwan')}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-jwan-ink">Feelings brain</p>
              <p className="mt-1 text-sm text-jwan-gray">{t('brain.feel.jwan')}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-jwan-ink">Attention brain</p>
              <p className="mt-1 text-sm text-jwan-gray">{t('brain.attn.jwan')}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold text-jwan-ink">Body + movement</p>
            <p className="mt-1 text-sm text-jwan-gray">{t('brain.motor.jwan')}</p>
          </div>
        </div>
      ) : null}
      <div className="text-[11px] text-jwan-gray">
        No pressure. No deadlines. You can pause any step and return anytime.
      </div>
    </div>
  )
}
