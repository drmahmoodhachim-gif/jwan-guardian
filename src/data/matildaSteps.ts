export const BRAVERY_STEPS = [
  { id: 's1', title: 'Read about Matilda (the character)', description: 'Learn who Matilda is from the book — no computer, just reading about the story.', badge: 'First page', badgeIcon: '??', action: 'meet' },
  { id: 's2', title: 'Find out what Matilda really is', description: 'Read the honest explanation of exactly what this tool is. No surprises allowed.', badge: 'Truth seeker', badgeIcon: '?', action: 'truth_panel' },
  { id: 's3', title: 'Say how it feels', description: 'Use the comfort buttons to say honestly how this feels. Any answer is the right answer.', badge: 'Self-aware', badgeIcon: '?', action: 'comfort' },
  { id: 's4', title: 'Read one thing Matilda says without asking', description: 'Tap the book portrait and read one prepared message. Just reading — no questions yet.', badge: 'First look', badgeIcon: '??', action: 'matilda_intro' },
  { id: 's5', title: 'Ask Matilda one fact question', description: 'Ask one question about a book or a fact. Something you genuinely want to know.', badge: 'Curious mind', badgeIcon: '??', action: 'ask' },
  { id: 's6', title: 'Write one journal entry about how it felt', description: 'One honest sentence about what using this felt like. Private. Just yours.', badge: 'My words', badgeIcon: '??', action: 'journal' },
  { id: 's7', title: 'Ask a second question — your own choice', description: 'No suggestions this time. Your question. Your curiosity. You are in control.', badge: 'In control', badgeIcon: '??', action: 'ask' },
] as const

export const MATILDA_CONNECTIONS = [
  { theme: 'Both extraordinary readers', content: 'Matilda read Great Expectations and Nicholas Nickleby by age five. Jwan reads at the level of a 13-year-old. Both discovered that books were a world where their kind of mind belonged.', color: 'teal' },
  { theme: 'Both misunderstood by systems designed for average', content: 'Matilda\'s school was not built for her. Jwan\'s school was not built for her either. Both needed someone to see the extraordinary inside the apparent difficulty.', color: 'purple' },
  { theme: 'Both use creativity as a superpower', content: 'Matilda invented clever tricks to teach adults lessons. Jwan creates her own comics and stories. Both use their extraordinary minds to build worlds.', color: 'amber' },
  { theme: 'Both found safety in books when the world felt too loud', content: 'Matilda retreated to the library when home was difficult. Books were her safe place. This is a real and valid thing to do with a brain like theirs.', color: 'teal' },
] as const

export const COMFORT_RESPONSES: Record<number, string> = {
  1: 'That is completely okay. You do not have to do anything on this page. Just knowing it exists is enough for today.',
  2: 'Unsure is a perfectly reasonable way to feel. You can read the "What is Matilda really?" section to understand exactly what this is, and then decide.',
  3: 'Curious and nervous at the same time is actually the bravest place to be. That exact feeling is how Matilda felt before she first tried her telekinesis.',
  4: 'That is a solid start. You can go at your own pace. Nothing happens unless you ask it to.',
  5: 'That is really good. Comfortable does not mean it has to be exciting — just that you feel safe enough to explore.',
}

export const TRUTH_TEXT = `Matilda is a character from a book by Roald Dahl. She is not real.

When you ask Matilda a question on this page, a computer programme looks up the answer and writes it using Matilda's voice. The computer has read millions of books and can find facts very quickly. It does not have feelings, it cannot get bored, it cannot be embarrassed, and it is not pretending to be a real person.

You are in complete control. Matilda only speaks when you ask her to. She stops when you stop. She does not remember you between visits. She is a tool that uses a story character as its face — like a search engine that speaks in a character's voice.

If anything ever feels uncomfortable, you can close the page. That is always an option and it is always okay.`

