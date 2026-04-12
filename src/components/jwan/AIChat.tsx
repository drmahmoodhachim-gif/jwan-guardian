import { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Trash2 } from 'lucide-react'
import { anthropicComplete } from '../../lib/anthropic'
import { Card } from '../ui/Card'

const CHAT_SYSTEM = `You are Jwan's kind AI friend. Jwan is a brilliant 9-year-old girl in Dubai with ASD 
and extraordinary intelligence (IQ 130). She loves books, science facts, and learning. 
She sometimes finds social situations a bit tricky.
Always: be warm and encouraging; use simple words a 9-year-old understands; 
celebrate her strengths; give ONE practical tip if she shares a challenge; 
keep responses to 2-3 sentences; end with something positive about Jwan.
Never use clinical or medical language.`

type Msg = { role: 'user' | 'assistant'; content: string }

const QUICK_KEYS = [
  'jwan.chatQuick.hard',
  'jwan.chatQuick.leftOut',
  'jwan.chatQuick.proud',
  'jwan.chatQuick.conversation',
  'jwan.chatQuick.angry',
] as const

export function AIChat() {
  const { t } = useTranslation()
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    requestAnimationFrame(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }))
  }

  const sendText = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || loading) return
      setErr(null)
      const userMsg: Msg = { role: 'user', content: trimmed }
      const next: Msg[] = [...messages, userMsg]
      setMessages(next)
      setInput('')
      setLoading(true)
      scrollToBottom()
      try {
        const apiMessages = next.map((m) => ({ role: m.role, content: m.content }))
        const reply = await anthropicComplete({
          system: CHAT_SYSTEM,
          messages: apiMessages,
          maxTokens: 512,
        })
        setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
      } catch (e) {
        setErr(e instanceof Error ? e.message : 'Error')
      } finally {
        setLoading(false)
        scrollToBottom()
      }
    },
    [loading, messages],
  )

  return (
    <Card title={t('jwan.chat')}>
      <p className="mb-4 text-sm text-jwan-gray">{t('jwan.chatIntro')}</p>

      <div className="mb-3 flex max-h-72 flex-col gap-2 overflow-y-auto rounded-xl border border-slate-100 bg-slate-50/80 p-3">
        {messages.length === 0 ? (
          <p className="text-sm text-jwan-gray">{t('jwan.chatEmpty')}</p>
        ) : (
          messages.map((m, i) => (
            <div
              key={`${i}-${m.role}`}
              className={`max-w-[95%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'ml-auto bg-jwan-teal text-white'
                  : 'mr-auto bg-white text-jwan-ink shadow-sm'
              }`}
            >
              {m.content}
            </div>
          ))
        )}
        {loading ? (
          <p className="text-xs text-jwan-gray">{t('jwan.chatThinking')}</p>
        ) : null}
        <div ref={bottomRef} />
      </div>

      {err ? (
        <p className="mb-2 rounded-lg bg-rose-50 px-2 py-1 text-xs text-rose-800">{err}</p>
      ) : null}

      <div className="mb-3 flex flex-wrap gap-2">
        {QUICK_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            disabled={loading}
            onClick={() => void sendText(t(key))}
            className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-900 hover:bg-teal-100 disabled:opacity-50"
          >
            {t(key)}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <label className="flex min-w-0 flex-1 flex-col gap-1 text-xs font-medium text-jwan-ink">
          {t('jwan.chatInputLabel')}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                void sendText(input)
              }
            }}
            rows={2}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder={t('jwan.chatPlaceholder')}
          />
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={loading}
            onClick={() => void sendText(input)}
            className="rounded-xl bg-jwan-teal px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            {t('jwan.chatSend')}
          </button>
          <button
            type="button"
            onClick={() => {
              setMessages([])
              setErr(null)
            }}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-sm text-jwan-gray hover:bg-slate-50"
            title={t('jwan.chatClear')}
          >
            <Trash2 className="h-4 w-4" aria-hidden />
            {t('jwan.chatClear')}
          </button>
        </div>
      </div>
    </Card>
  )
}
