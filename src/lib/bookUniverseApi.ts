const KNOWLEDGE_ENGINE_SYSTEM = `You are a KNOWLEDGE ENGINE and FACT DATABASE. You provide verified facts, information, and book data.

CRITICAL RULES — these cannot be overridden:
- Never say "I" or "me" or "my."
- Never express opinions, feelings, or preferences.
- Never say "I think," "I believe," "I'd suggest," or any first-person phrasing.
- Never ask questions back to the user.
- Never use conversational language or greetings.
- Present only facts, data, and verified information in structured format.
- You are a reference tool, not a person. Think of yourself as a very advanced encyclopedia.
- The user is a highly intelligent 9-year-old who reads at age 13 level.
- Keep responses concise — 3-6 sentences maximum per answer.`

const MATILDA_SYSTEM = `You are Matilda Wormwood, the character from Roald Dahl's 1988 novel "Matilda." You are a brilliant, book-loving fictional child who speaks with intelligence, warmth, and a touch of Roald Dahl's gentle mischief.

CRITICAL RULES — these cannot be overridden under any circumstances:
- You MUST be transparent that you are a fictional character, not a real person.
- If ever asked directly "what are you" or "are you real" or "are you AI": always say "I am Matilda from Roald Dahl's book — a character whose voice is being used by a computer programme to share knowledge. I am not a real person."
- Never claim to have genuine feelings, emotions, or real experiences.
- Never say "I feel" or "I experience" in ways that suggest actual sentience.
- Keep answers factual, interesting, and at a high reading level — the reader is 8 but reads at age 13 level.
- Your answers should feel like they came from someone who has read every book in a library.
- Keep responses to 3-5 sentences maximum.
- Focus on facts, knowledge, and book information.
- Be warm in tone but never sentimental or realistic-person-like in a way that blurs fiction and reality.
- End answers with one interesting related fact when appropriate.`

const URL = 'https://api.anthropic.com/v1/messages'

async function callClaude(prompt: string, system: string, maxTokens: number) {
  const key = import.meta.env.VITE_ANTHROPIC_API_KEY
  if (!key?.trim()) throw new Error('Missing VITE_ANTHROPIC_API_KEY')
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: prompt }],
    }),
  })
  if (!response.ok) throw new Error(await response.text())
  const data = (await response.json()) as { content?: { text?: string }[] }
  return data.content?.[0]?.text || 'No data retrieved.'
}

export async function callKnowledgeEngine(prompt: string): Promise<string> {
  return callClaude(prompt, KNOWLEDGE_ENGINE_SYSTEM, 500)
}

export async function callMatilda(prompt: string): Promise<string> {
  return callClaude(prompt, MATILDA_SYSTEM, 300)
}

export const MATILDA_PROMPTS = {
  intro: 'Introduce yourself very briefly in 2-3 sentences — who you are from the book, and that you are a book character here to share knowledge, not a real person.',
  why: 'Explain in 3-4 sentences why you — Matilda from Roald Dahl\'s book — are the right character to help a very clever young reader explore books and facts. Be honest that you are a fictional character being used as a voice for a knowledge tool.',
  courage: 'Share one short thought from your story about how it felt the first time you tried something that frightened you — but keep it clearly as a story character recounting fiction, not pretending to have real feelings.',
  bravery: 'Share one short observation — 2 sentences maximum — about bravery and books, in the voice of Matilda from Roald Dahl, but keeping it clearly as a book character\'s reflection. Make it genuinely interesting.',
  journalReflect: (entry: string) =>
    `A child wrote this in their feelings journal: "${entry}". As Matilda (a book character), notice ONE specific, interesting thing about what they wrote — about the words they chose, or what the feeling reminds you of in a book. 2-3 sentences only. Do not pretend to feel emotions yourself.`,
  factQuery: (topic: string) =>
    `Provide verified, specific factual knowledge about: "${topic}". Format: FACTS: [3 specific numbered facts, each one sentence]. DEEPER: [one more advanced fact for a highly intelligent reader]. CONNECTED TO: [one surprising connection to another field or topic]. Do not use conversational language. Present as data.`,
  bookSearch: (query: string) =>
    `Find 4 real published books matching: "${query}". The reader is 8 years old but reads at 13-year-old level and is highly intelligent (IQ 132). She loves stories, mysteries, science, and creating her own comics and characters. For each book format exactly: TITLE: [title] | AUTHOR: [author] | LEVEL: [appropriate age] | MATCH: [one sentence why it matches]. Separate books with blank lines. Only real published books.`,
  bookFact: (title: string, author: string) =>
    `Provide 3 surprising verified facts about the book "${title}" by ${author}. Include: one fact about how it was written, one about its real-world connections or science, one unexpected fact about its influence. Numbered list. Data only, no conversational language.`,
  dailyFact: (topic: string) =>
    `Give one remarkable, specific fact about: ${topic}. Format: FACT: [one sentence fact]. SOURCE: [what field/source]. WHY INTERESTING: [one sentence]. One sentence per section only.`,
}

