/** Monday-based week (Mon–Sun), local calendar dates as YYYY-MM-DD. */

export function startOfWeekMonday(date = new Date()): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  return d
}

export function toDateString(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function parseDateString(s: string): Date {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y!, (m ?? 1) - 1, d ?? 1)
}

export function getWeekMondayString(date = new Date()): string {
  return toDateString(startOfWeekMonday(date))
}

export function addDays(date: Date, n: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + n)
  return d
}

/** Seven dates Mon–Sun for the week containing `weekStart` (Monday). */
export function getWeekDateStrings(weekMondayStr: string): string[] {
  const mon = parseDateString(weekMondayStr)
  return Array.from({ length: 7 }, (_, i) => toDateString(addDays(mon, i)))
}

export function formatWeekRangeLabel(weekMondayStr: string, locale: string): string {
  const mon = parseDateString(weekMondayStr)
  const sun = addDays(mon, 6)
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
  return `${mon.toLocaleDateString(locale, opts)} – ${sun.toLocaleDateString(locale, opts)}`
}

export function isFutureDate(dateStr: string): boolean {
  const t = toDateString(new Date())
  return dateStr > t
}

export function previousWeekMonday(weekMondayStr: string): string {
  const d = parseDateString(weekMondayStr)
  return toDateString(addDays(d, -7))
}

export function nextWeekMonday(weekMondayStr: string): string {
  const d = parseDateString(weekMondayStr)
  return toDateString(addDays(d, 7))
}
