import { useTranslation } from 'react-i18next'
import {
  MOOD_KEYS,
  SETTING_KEYS,
  STRATEGY_KEYS,
  toggleStrategyKey,
} from '../../lib/reportOptions'

export function StructuredReportOptions({
  settingKey,
  setSettingKey,
  moodKey,
  setMoodKey,
  strategyKeys,
  setStrategyKeys,
  contextDetail,
  setContextDetail,
  moodNotes,
  setMoodNotes,
  strategyNotes,
  setStrategyNotes,
}: {
  settingKey: string
  setSettingKey: (v: string) => void
  moodKey: string
  setMoodKey: (v: string) => void
  strategyKeys: string[]
  setStrategyKeys: (v: string[]) => void
  contextDetail: string
  setContextDetail: (v: string) => void
  moodNotes: string
  setMoodNotes: (v: string) => void
  strategyNotes: string
  setStrategyNotes: (v: string) => void
}) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-6 rounded-xl border border-slate-200 bg-slate-50/80 p-4 md:p-5">
      <div>
        <h3 className="text-sm font-semibold text-jwan-ink">{t('report.structuredTitle')}</h3>
        <p className="mt-1 text-xs text-jwan-gray">{t('report.structuredHint')}</p>
      </div>

      <label className="flex flex-col gap-1 text-sm font-medium text-jwan-ink">
        {t('report.settingLabel')} *
        <select
          required
          value={settingKey}
          onChange={(e) => setSettingKey(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2"
        >
          <option value="">{t('report.selectPlaceholder')}</option>
          {SETTING_KEYS.map((k) => (
            <option key={k} value={k}>
              {t(`report.opt.set.${k}`)}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-jwan-ink">
        {t('report.contextDetail')}
        <textarea
          value={contextDetail}
          onChange={(e) => setContextDetail(e.target.value)}
          rows={2}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2"
          placeholder={t('report.contextDetailHint')}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-jwan-ink">
        {t('report.moodClinical')} *
        <select
          required
          value={moodKey}
          onChange={(e) => setMoodKey(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2"
        >
          <option value="">{t('report.selectPlaceholder')}</option>
          {MOOD_KEYS.map((k) => (
            <option key={k} value={k}>
              {t(`report.opt.mood.${k}`)}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-jwan-ink">
        {t('report.moodNotes')}
        <textarea
          value={moodNotes}
          onChange={(e) => setMoodNotes(e.target.value)}
          rows={2}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2"
          placeholder={t('report.moodNotesHint')}
        />
      </label>

      <fieldset className="flex flex-col gap-2 border-0 p-0">
        <legend className="text-sm font-medium text-jwan-ink">{t('report.strategiesPick')}</legend>
        <p className="text-xs text-jwan-gray">{t('report.strategiesPickHint')}</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {STRATEGY_KEYS.map((k) => (
            <label
              key={k}
              className="flex cursor-pointer items-start gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
            >
              <input
                type="checkbox"
                checked={strategyKeys.includes(k)}
                onChange={() => setStrategyKeys(toggleStrategyKey(strategyKeys, k))}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-jwan-teal focus:ring-jwan-teal"
              />
              <span>{t(`report.opt.strat.${k}`)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex flex-col gap-1 text-sm font-medium text-jwan-ink">
        {t('report.strategiesNotes')}
        <textarea
          value={strategyNotes}
          onChange={(e) => setStrategyNotes(e.target.value)}
          rows={2}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2"
          placeholder={t('report.strategiesNotesHint')}
        />
      </label>
    </div>
  )
}
