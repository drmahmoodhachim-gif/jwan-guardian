import { JWAN_DOB } from '../lib/constants'

export interface AgeParts {
  years: number
  months: number
  /** e.g. "9y3m" for display */
  compact: string
}

function computeAge(dob: Date, now: Date): AgeParts {
  let years = now.getFullYear() - dob.getFullYear()
  let months = now.getMonth() - dob.getMonth()
  if (now.getDate() < dob.getDate()) {
    months -= 1
  }
  if (months < 0) {
    years -= 1
    months += 12
  }
  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    compact: `${years}y${months}m`,
  }
}

/** Recomputes from the current date on each render so the displayed age stays current. */
export function useAge(): AgeParts {
  return computeAge(JWAN_DOB, new Date())
}
