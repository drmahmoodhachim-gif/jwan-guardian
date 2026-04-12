import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type Tab = 'overview' | 'social' | 'feelings' | 'attention' | 'gift'

function BrainSvgOverview({ ar }: { ar: boolean }) {
  return (
    <svg viewBox="0 0 320 200" className="h-auto w-full max-w-lg" aria-hidden>
      <title>{ar ? 'رسم تخطيطي للدماغ' : 'Brain diagram'}</title>
      <ellipse cx="160" cy="100" rx="120" ry="85" fill="#e0f2f1" stroke="#0d9488" strokeWidth="2" />
      <ellipse cx="115" cy="95" rx="35" ry="45" fill="#fef3c7" stroke="#d97706" />
      <text x="95" y="100" className="fill-amber-900 text-[10px] font-semibold">
        {ar ? 'اللوزة' : 'Amygdala'}
      </text>
      <ellipse cx="205" cy="75" rx="42" ry="38" fill="#ccfbf1" stroke="#0d9488" />
      <text x="175" y="78" className="fill-teal-900 text-[10px] font-semibold">
        {ar ? 'قشرة جبهية' : 'PFC'}
      </text>
      <ellipse cx="175" cy="125" rx="28" ry="22" fill="#fce7f3" stroke="#db2777" />
      <text x="158" y="130" className="fill-pink-900 text-[9px] font-semibold">
        {ar ? 'تلفيف صدغي علوي' : 'STS'}
      </text>
      <circle cx="160" cy="165" r="18" fill="#e0e7ff" stroke="#4f46e5" />
      <text x="145" y="169" className="fill-indigo-900 text-[9px] font-semibold">
        {ar ? 'مخيخ' : 'Cerebellum'}
      </text>
    </svg>
  )
}

function BrainSvgSocial() {
  return (
    <svg viewBox="0 0 300 180" className="h-auto w-full max-w-md" aria-hidden>
      <rect x="20" y="40" width="70" height="40" rx="6" fill="#ccfbf1" stroke="#0d9488" />
      <text x="35" y="65" className="fill-teal-900 text-[10px] font-semibold">
        STS
      </text>
      <path d="M 90 60 L 130 60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arr)" />
      <rect x="130" y="40" width="70" height="40" rx="6" fill="#fef3c7" stroke="#d97706" />
      <text x="138" y="65" className="fill-amber-900 text-[10px] font-semibold">
        TPJ
      </text>
      <path d="M 200 60 L 240 60" stroke="#64748b" strokeWidth="2" />
      <rect x="240" y="40" width="50" height="50" rx="8" fill="#fecaca" stroke="#dc2626" />
      <text x="248" y="70" className="fill-red-900 text-[9px] font-semibold">
        Amy
      </text>
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>
    </svg>
  )
}

function BrainSvgFeelings() {
  return (
    <svg viewBox="0 0 300 200" className="h-auto w-full max-w-md" aria-hidden>
      <ellipse cx="100" cy="100" rx="35" ry="40" fill="#fecaca" stroke="#dc2626" />
      <text x="70" y="105" className="fill-red-900 text-[10px] font-semibold">
        Amygdala
      </text>
      <path d="M 135 100 L 200 100" stroke="#64748b" strokeWidth="3" strokeDasharray="6 4" />
      <ellipse cx="230" cy="100" rx="45" ry="42" fill="#ccfbf1" stroke="#0d9488" />
      <text x="200" y="105" className="fill-teal-900 text-[10px] font-semibold">
        Prefrontal
      </text>
      <text x="120" y="170" className="fill-slate-600 text-[9px]">
        Slow path · regulation
      </text>
    </svg>
  )
}

function BrainSvgAttention() {
  return (
    <svg viewBox="0 0 300 200" className="h-auto w-full max-w-md" aria-hidden>
      <rect x="40" y="70" width="60" height="50" rx="8" fill="#ccfbf1" stroke="#0d9488" />
      <text x="48" y="100" className="fill-teal-900 text-[10px] font-semibold">
        PFC
      </text>
      <path d="M 100 95 L 150 95" stroke="#64748b" strokeWidth="2" />
      <ellipse cx="185" cy="95" rx="40" ry="28" fill="#fef3c7" stroke="#d97706" />
      <text x="160" y="100" className="fill-amber-900 text-[10px] font-semibold">
        Caudate
      </text>
      <path d="M 225 95 L 260 95" stroke="#64748b" strokeWidth="2" />
      <rect x="260" y="75" width="35" height="40" rx="6" fill="#fce7f3" stroke="#db2777" />
      <text x="265" y="100" className="fill-pink-900 text-[9px] font-semibold">
        ACC
      </text>
    </svg>
  )
}

export function BrainPage() {
  const { t, i18n } = useTranslation()
  const ar = i18n.language.startsWith('ar')
  const [tab, setTab] = useState<Tab>('overview')

  const tabs: { id: Tab; labelKey: string }[] = [
    { id: 'overview', labelKey: 'brain.overview' },
    { id: 'social', labelKey: 'brain.social' },
    { id: 'feelings', labelKey: 'brain.feelings' },
    { id: 'attention', labelKey: 'brain.attention' },
    { id: 'gift', labelKey: 'brain.gift' },
  ]

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-jwan-ink">{t('nav.brain')}</h1>
        <p className="mt-1 max-w-3xl text-sm leading-relaxed text-jwan-gray">{t('brain.intro')}</p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2" role="tablist">
        {tabs.map(({ id, labelKey }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              tab === id
                ? 'bg-jwan-teal text-white shadow'
                : 'bg-slate-100 text-jwan-gray hover:bg-slate-200'
            }`}
          >
            {t(labelKey)}
          </button>
        ))}
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        {tab === 'overview' ? (
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <div className="min-w-0 flex-1">
              <BrainSvgOverview ar={ar} />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-4 text-sm leading-relaxed">
              <div>
                <h3 className="font-semibold text-jwan-teal">{t('brain.forCaregivers')}</h3>
                <p className="mt-1 text-jwan-ink">{t('brain.ov.care')}</p>
              </div>
              <div>
                <h3 className="font-semibold text-violet-700">{t('brain.forJwan')}</h3>
                <p className="mt-1 text-jwan-ink">{t('brain.ov.jwan')}</p>
              </div>
            </div>
          </div>
        ) : null}

        {tab === 'social' ? (
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="min-w-0 flex-1">
              <BrainSvgSocial />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-4 text-sm leading-relaxed">
              <div>
                <h3 className="font-semibold text-jwan-teal">{t('brain.forCaregivers')}</h3>
                <p className="mt-1 text-jwan-ink">{t('brain.social.care')}</p>
              </div>
              <div>
                <h3 className="font-semibold text-violet-700">{t('brain.forJwan')}</h3>
                <p className="mt-1 text-jwan-ink">{t('brain.social.jwan')}</p>
              </div>
            </div>
          </div>
        ) : null}

        {tab === 'feelings' ? (
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="min-w-0 flex-1">
              <BrainSvgFeelings />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-4 text-sm leading-relaxed">
              <div>
                <h3 className="font-semibold text-jwan-teal">{t('brain.forCaregivers')}</h3>
                <p className="mt-1 text-jwan-ink">{t('brain.feel.care')}</p>
              </div>
              <div>
                <h3 className="font-semibold text-violet-700">{t('brain.forJwan')}</h3>
                <p className="mt-1 text-jwan-ink">{t('brain.feel.jwan')}</p>
              </div>
            </div>
          </div>
        ) : null}

        {tab === 'attention' ? (
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="min-w-0 flex-1">
              <BrainSvgAttention />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-4 text-sm leading-relaxed">
              <div>
                <h3 className="font-semibold text-jwan-teal">{t('brain.forCaregivers')}</h3>
                <p className="mt-1 text-jwan-ink">{t('brain.attn.care')}</p>
              </div>
              <div>
                <h3 className="font-semibold text-violet-700">{t('brain.forJwan')}</h3>
                <p className="mt-1 text-jwan-ink">{t('brain.attn.jwan')}</p>
              </div>
            </div>
          </div>
        ) : null}

        {tab === 'gift' ? (
          <div className="max-w-3xl text-sm leading-relaxed">
            <h3 className="text-lg font-semibold text-jwan-ink">{t('brain.giftTitle')}</h3>
            <p className="mt-3 text-jwan-ink">{t('brain.giftBody')}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-jwan-ink">
              <li>{t('brain.gift.vci')}</li>
              <li>{t('brain.gift.fsiq')}</li>
              <li>{t('brain.gift.lang')}</li>
            </ul>
            <p className="mt-4 text-jwan-gray">{t('brain.giftFoot')}</p>
          </div>
        ) : null}
      </section>
    </div>
  )
}
