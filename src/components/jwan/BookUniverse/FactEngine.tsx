import { useEffect, useMemo, useState } from 'react'
import { DAILY_FACT_TOPICS, FACT_TOPICS } from '../../../data/bookUniverse'
import { MATILDA_PROMPTS, callKnowledgeEngine } from '../../../lib/bookUniverseApi'

function splitResult(text: string) {
  const parts = { facts: '', deeper: '', connected: '' }
  for (const line of text.split('\n')) {
    const l = line.trim()
    if (l.toUpperCase().startsWith('DEEPER:')) parts.deeper += `${l.replace(/DEEPER:\s*/i, '')}\n`
    else if (l.toUpperCase().startsWith('CONNECTED TO:'))
      parts.connected += `${l.replace(/CONNECTED TO:\s*/i, '')}\n`
    else if (l.toUpperCase().startsWith('FACTS:')) parts.facts += `${l.replace(/FACTS:\s*/i, '')}\n`
    else parts.facts += `${l}\n`
  }
  return parts
}

export function FactEngine({ onBookSearch }: { onBookSearch: (query: string) => void }) {
  const [topic, setTopic] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [dailyFact, setDailyFact] = useState('Loading...')

  useEffect(() => {
    const topicOfDay = DAILY_FACT_TOPICS[new Date().getDay() % DAILY_FACT_TOPICS.length]!
    void callKnowledgeEngine(MATILDA_PROMPTS.dailyFact(topicOfDay))
      .then(setDailyFact)
      .catch(() => setDailyFact('Knowledge engine unavailable.'))
  }, [])

  async function run(q?: string) {
    const final = (q ?? topic).trim()
    if (!final) return
    setLoading(true)
    setResult('')
    try {
      setResult(await callKnowledgeEngine(MATILDA_PROMPTS.factQuery(final)))
    } catch {
      setResult('Knowledge engine unavailable. Check connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const parsed = useMemo(() => splitResult(result), [result])

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-sm font-semibold text-jwan-ink">What do you want to know about?</p>
        <p className="text-xs text-jwan-gray">Knowledge engine - data and facts only</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {FACT_TOPICS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setSelectedTag(t)
                setTopic(t)
                void run(t)
              }}
              className={`rounded-full border px-3 py-1 text-xs ${
                selectedTag === t
                  ? 'border-teal-500 bg-teal-50 text-teal-900'
                  : 'border-slate-200 bg-white text-jwan-gray'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-3 flex gap-2">
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder="Type any topic..."
          />
          <button
            type="button"
            disabled={loading}
            onClick={() => void run()}
            className="rounded-lg bg-jwan-teal px-4 py-2 text-sm font-semibold text-white"
          >
            {loading ? 'Searching...' : 'Find facts'}
          </button>
        </div>

        {result ? (
          <div className="mt-4 rounded-lg bg-slate-50 p-3">
            <div className="mb-2">
              <p className="text-[10px] font-semibold uppercase text-jwan-gray">Facts</p>
              <p className="whitespace-pre-wrap text-sm text-jwan-ink">{parsed.facts.trim()}</p>
            </div>
            {parsed.deeper.trim() ? (
              <div className="mb-2">
                <p className="text-[10px] font-semibold uppercase text-jwan-gray">Deeper</p>
                <p className="text-sm text-jwan-ink">{parsed.deeper.trim()}</p>
              </div>
            ) : null}
            {parsed.connected.trim() ? (
              <div>
                <p className="text-[10px] font-semibold uppercase text-jwan-gray">Connected to</p>
                <p className="text-sm text-jwan-ink">{parsed.connected.trim()}</p>
              </div>
            ) : null}
            <button
              type="button"
              onClick={() => onBookSearch(`books about ${topic}`)}
              className="mt-3 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs"
            >
              Get books on this topic
            </button>
          </div>
        ) : null}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-[10px] font-semibold uppercase text-jwan-gray">Daily fact</p>
        <p className="mt-1 text-sm text-jwan-ink">{dailyFact}</p>
      </div>
    </div>
  )
}

