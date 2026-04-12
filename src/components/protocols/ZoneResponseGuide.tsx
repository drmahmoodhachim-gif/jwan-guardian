import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
import { ZONE_RESPONSE_GUIDE, type ZoneKey } from '../../data/protocols'

const ZONES: ZoneKey[] = ['blue', 'green', 'yellow', 'red']

export function ZoneResponseGuide() {
  const { i18n } = useTranslation()
  const ar = i18n.language.startsWith('ar')
  const [open, setOpen] = useState<ZoneKey | null>('green')

  return (
    <div className="flex flex-col gap-2">
      {ZONES.map((z) => {
        const row = ZONE_RESPONSE_GUIDE[z]
        const expanded = open === z
        const label = ar ? row.label.ar : row.label.en
        return (
          <div
            key={z}
            className="overflow-hidden rounded-xl border border-slate-200 shadow-sm"
            style={{ backgroundColor: row.color }}
          >
            <button
              type="button"
              onClick={() => setOpen((o) => (o === z ? null : z))}
              className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-semibold"
            >
              <span>{label}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 transition ${expanded ? 'rotate-180' : ''}`}
                aria-hidden
              />
            </button>
            {expanded ? (
              <div className="space-y-3 border-t border-black/5 bg-white/70 px-4 py-4 text-sm">
                <div>
                  <p className="text-xs font-semibold uppercase text-jwan-gray">
                    {ar ? 'ما تحتاجه جوان' : 'What Jwan needs'}
                  </p>
                  <p className="mt-1 text-jwan-ink">{ar ? row.jwanNeeds.ar : row.jwanNeeds.en}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-jwan-gray">
                    {ar ? 'ما يفعله البالغون' : 'What adults do'}
                  </p>
                  <p className="mt-1 text-jwan-ink">{ar ? row.adultsDo.ar : row.adultsDo.en}</p>
                </div>
                <div className="rounded-lg bg-white/90 px-3 py-2">
                  <p className="text-xs font-semibold uppercase text-jwan-gray">
                    {ar ? 'عبارة' : 'Script'}
                  </p>
                  <p className="mt-1 italic text-jwan-ink">{ar ? row.script.ar : row.script.en}</p>
                </div>
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
