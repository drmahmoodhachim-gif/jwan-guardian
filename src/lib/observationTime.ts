import type { Report } from '../types'

/** When the observation happened (falls back to server `created_at` for older rows). */
export function reportObservationIso(r: Pick<Report, 'observed_at' | 'created_at'>): string {
  return r.observed_at ?? r.created_at
}

/** Value for `<input type="datetime-local" />` in the user's local timezone. */
export function formatForDatetimeLocal(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

/** Parse `datetime-local` value as local civil time → ISO UTC for Supabase. */
export function parseDatetimeLocalToIso(local: string): string {
  const trimmed = local.trim()
  if (!trimmed) return new Date().toISOString()
  const [datePart, timePart] = trimmed.split('T')
  if (!datePart || !timePart) return new Date().toISOString()
  const [y, mo, da] = datePart.split('-').map(Number)
  const [h, mi] = timePart.split(':').map(Number)
  if ([y, mo, da, h, mi].some((n) => Number.isNaN(n))) return new Date().toISOString()
  return new Date(y, mo - 1, da, h, mi, 0, 0).toISOString()
}

export function isoToDatetimeLocal(iso: string): string {
  return formatForDatetimeLocal(new Date(iso))
}
