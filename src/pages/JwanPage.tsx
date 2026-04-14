import { useState } from 'react'
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

type TopTab = 'books' | 'matilda'
type BookTab = 'fact' | 'finder' | 'shelf' | 'quiz' | 'reading'
type MatildaTab = 'meet' | 'steps' | 'ask' | 'journal' | 'badges'

export function JwanPage() {
  const [topTab, setTopTab] = useState<TopTab>('books')
  const [bookTab, setBookTab] = useState<BookTab>('fact')
  const [matildaTab, setMatildaTab] = useState<MatildaTab>('meet')
  const [bookQuery, setBookQuery] = useState('')
  const [truthOpen, setTruthOpen] = useState(true)
  const { completedSteps, comfortLevel, markStep, logComfort } = useBraverySteps()

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
      <div className="text-[11px] text-jwan-gray">
        No pressure. No deadlines. You can pause any step and return anytime.
      </div>
    </div>
  )
}
