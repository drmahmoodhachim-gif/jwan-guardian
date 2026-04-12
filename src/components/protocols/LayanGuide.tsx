import { useTranslation } from 'react-i18next'
import { LAYAN_PROTOCOL } from '../../data/protocols'
import { Card } from '../ui/Card'

export function LayanGuide() {
  const { i18n } = useTranslation()
  const ar = i18n.language.startsWith('ar')

  const intro = ar ? LAYAN_PROTOCOL.explanationForLayan.ar : LAYAN_PROTOCOL.explanationForLayan.en
  const also = ar ? LAYAN_PROTOCOL.forLayanAlso.ar : LAYAN_PROTOCOL.forLayanAlso.en

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border-2 border-violet-200 bg-gradient-to-b from-violet-50/80 to-white p-6 shadow-sm">
        <p className="text-lg leading-relaxed text-jwan-ink md:text-xl">{intro}</p>
        <ol className="mt-8 space-y-6">
          {LAYAN_PROTOCOL.threeThings.map((item, i) => (
            <li
              key={i}
              className="flex gap-4 rounded-xl border border-violet-100 bg-white/90 p-4 shadow-sm"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-600 text-lg font-bold text-white"
                aria-hidden
              >
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-violet-950">
                  {ar ? item.titleAr : item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-jwan-gray">
                  {ar ? item.detailAr : item.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-base leading-relaxed text-jwan-ink md:text-lg">{also}</p>
      </div>

      <Card title={ar ? 'للوالدين — ليان' : 'For parents — Layan'}>
        <ul className="space-y-4 text-sm">
          {LAYAN_PROTOCOL.parentGuidanceForLayan.map((g, i) => (
            <li key={i} className="rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-3">
              <p className="font-semibold text-jwan-ink">{g.title}</p>
              <p className="mt-1 text-jwan-gray">{g.detail}</p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
