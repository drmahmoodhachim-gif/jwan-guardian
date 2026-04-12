import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PERSON_PROTOCOLS } from '../../data/protocols'
import { PersonProtocolCard } from './PersonProtocolCard'

export function PersonSelector() {
  const { i18n } = useTranslation()
  const ar = i18n.language.startsWith('ar')
  const [selected, setSelected] = useState(PERSON_PROTOCOLS[0]?.id ?? 'dad')

  const protocol = PERSON_PROTOCOLS.find((p) => p.id === selected) ?? PERSON_PROTOCOLS[0]

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
        {PERSON_PROTOCOLS.map((p) => {
          const active = p.id === selected
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelected(p.id)}
              className={[
                'flex flex-col items-center gap-1 rounded-xl border-2 px-3 py-3 text-center text-sm transition',
                active
                  ? 'border-jwan-teal bg-teal-50 shadow-md'
                  : 'border-slate-200 bg-white hover:border-slate-300',
              ].join(' ')}
              style={active ? { borderColor: p.color } : undefined}
            >
              <span className="text-2xl" aria-hidden>
                {p.emoji}
              </span>
              <span className="font-semibold leading-tight text-jwan-ink">{ar ? p.nameAr : p.name}</span>
              <span className="text-[11px] leading-tight text-jwan-gray">{ar ? p.roleAr : p.role}</span>
            </button>
          )
        })}
      </div>

      {protocol ? <PersonProtocolCard protocol={protocol} /> : null}
    </div>
  )
}
