/**
 * Interactive wizard: writes .env.local from your pasted keys.
 * Run: npm run setup:env
 *
 * Supabase: Dashboard → Project Settings → API (Project URL + anon public key)
 */
import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.join(__dirname, '..', '.env.local')

function escapeEnvValue(val) {
  const s = val.trim()
  if (s === '') return ''
  // Wrap in double quotes if needed for dotenv parsers
  if (/[\s#"']/.test(s)) {
    return `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
  }
  return s
}

const rl = readline.createInterface({ input, output })

console.log('')
console.log('Jwan Guardian — local environment (.env.local)')
console.log('Paste values from Supabase: Project Settings → API')
console.log('(Typed input is visible in this terminal.)')
console.log('')

const existing = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : ''
if (existing.trim()) {
  const ans = (await rl.question('.env.local already exists. Overwrite? [y/N] ')).trim().toLowerCase()
  if (ans !== 'y' && ans !== 'yes') {
    console.log('Cancelled.')
    rl.close()
    process.exit(0)
  }
}

const url = await rl.question('VITE_SUPABASE_URL (https://….supabase.co): ')
const anon = await rl.question('VITE_SUPABASE_ANON_KEY (eyJ…): ')
const anthropic = await rl.question('VITE_ANTHROPIC_API_KEY (optional, Enter to skip): ')

rl.close()

if (!url.trim() || !anon.trim()) {
  console.error('\nBoth VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are required.')
  process.exit(1)
}

const lines = [
  '# Created by npm run setup:env',
  '# Supabase: Project Settings → API',
  '',
  `VITE_SUPABASE_URL=${escapeEnvValue(url)}`,
  `VITE_SUPABASE_ANON_KEY=${escapeEnvValue(anon)}`,
  `VITE_ANTHROPIC_API_KEY=${escapeEnvValue(anthropic)}`,
  '',
]

fs.writeFileSync(envPath, lines.join('\n'), 'utf8')
console.log('')
console.log(`Saved: ${envPath}`)
console.log('Next: npm run dev')
console.log('')
