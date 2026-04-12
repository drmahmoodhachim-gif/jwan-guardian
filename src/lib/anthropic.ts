const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'

export async function anthropicComplete(params: {
  system: string
  messages: { role: 'user' | 'assistant'; content: string }[]
  maxTokens?: number
}): Promise<string> {
  const key = import.meta.env.VITE_ANTHROPIC_API_KEY
  if (!key?.trim()) {
    throw new Error('Missing VITE_ANTHROPIC_API_KEY')
  }

  const res = await fetch(ANTHROPIC_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      // Required for client-side calls; without it the API returns 503 / Failed to fetch.
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: params.maxTokens ?? 1024,
      system: params.system,
      messages: params.messages,
    }),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(errText || `Anthropic API error ${res.status}`)
  }

  const data = (await res.json()) as { content?: { type: string; text?: string }[] }
  const text = data.content?.find((c) => c.type === 'text')?.text ?? ''
  return text.trim()
}
