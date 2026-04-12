import { useTranslation } from 'react-i18next'
import { Card } from '../ui/Card'

const ZONE_KEYS = ['blue', 'green', 'yellow', 'red'] as const

const ZONE_STYLE: Record<(typeof ZONE_KEYS)[number], string> = {
  blue: 'border-[#bfdbfe] bg-[#E6F1FB] text-[#0C447C]',
  green: 'border-[#a7f3d0] bg-[#E1F5EE] text-[#085041]',
  yellow: 'border-[#fcd34d] bg-[#FAEEDA] text-[#633806]',
  red: 'border-[#fecaca] bg-[#FAECE7] text-[#712B13]',
}

export function ZonesTracker() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-4">
      <Card title={t('jwan.zonesTitle')}>
        <p className="mb-4 text-sm text-jwan-gray">{t('jwan.zonesIntro')}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {ZONE_KEYS.map((z) => (
            <div
              key={z}
              className={`rounded-xl border-2 p-4 text-sm shadow-sm ${ZONE_STYLE[z]}`}
            >
              <p className="text-2xl" aria-hidden>
                {t(`jwan.zoneCard.${z}.emoji`)}
              </p>
              <h3 className="mt-2 font-semibold">{t(`jwan.zoneCard.${z}.name`)}</h3>
              <p className="mt-1 text-sm opacity-95">{t(`jwan.zoneCard.${z}.feel`)}</p>
              <p className="mt-2 text-xs font-medium opacity-90">{t('jwan.zoneBodyClue')}</p>
              <p className="text-xs opacity-90">{t(`jwan.zoneCard.${z}.bodyClue`)}</p>
              <p className="mt-3 text-xs font-medium opacity-90">{t('jwan.zoneStrategies')}</p>
              <p className="text-xs opacity-90">{t(`jwan.zoneCard.${z}.strategies`)}</p>
              {z === 'red' ? (
                <p className="mt-3 text-xs italic opacity-95">{t('jwan.zoneCard.red.adult')}</p>
              ) : null}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
