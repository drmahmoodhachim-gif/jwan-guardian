import { useTranslation } from 'react-i18next'
import type { PersonProtocol } from '../../data/protocols'

export function PersonProtocolCard({ protocol }: { protocol: PersonProtocol }) {
  const { i18n } = useTranslation()
  const ar = i18n.language.startsWith('ar')

  return (
    <div
      className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm"
      style={{ borderTopWidth: 4, borderTopColor: protocol.color }}
    >
      <div className="bg-white p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-3xl" aria-hidden>
            {protocol.emoji}
          </span>
          <div>
            <h2 className="text-xl font-semibold text-jwan-ink">{ar ? protocol.nameAr : protocol.name}</h2>
            <p className="text-sm text-jwan-gray">{ar ? protocol.roleAr : protocol.role}</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-jwan-ink">
          {ar ? protocol.taglineAr : protocol.tagline}
        </p>

        <div className="mt-4 rounded-xl bg-teal-50/80 px-4 py-3 text-sm">
          <p className="font-semibold text-teal-900">{ar ? 'المبدأ' : 'Key principle'}</p>
          <p className="mt-1 text-teal-950/90">{ar ? protocol.keyPrincipleAr : protocol.keyPrinciple}</p>
        </div>

        <h3 className="mt-6 font-semibold text-jwan-ink">{ar ? 'خطوات' : 'Steps'}</h3>
        <ol className="mt-3 list-decimal space-y-4 pl-5 text-sm">
          {protocol.steps.map((s, i) => (
            <li key={i}>
              <span className="font-medium text-jwan-ink">{ar ? s.titleAr : s.title}</span>
              <p className="mt-1 text-jwan-gray">{ar ? s.detailAr : s.detail}</p>
            </li>
          ))}
        </ol>

        <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50/70 px-4 py-3 text-sm">
          <p className="font-semibold text-rose-900">{ar ? 'تجنب' : 'Avoid'}</p>
          <p className="mt-1 text-rose-950/90">{ar ? protocol.avoidAr : protocol.avoid}</p>
        </div>

        <div className="mt-4 rounded-xl border border-teal-200 bg-teal-50/60 px-4 py-3 text-sm">
          <p className="font-semibold text-teal-900">{ar ? 'قوة فريدة' : 'Unique strength'}</p>
          <p className="mt-1 text-teal-950/90">{ar ? protocol.uniqueStrengthAr : protocol.uniqueStrength}</p>
        </div>
      </div>
    </div>
  )
}
