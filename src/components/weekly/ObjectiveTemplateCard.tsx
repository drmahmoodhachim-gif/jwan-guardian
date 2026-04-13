import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { ObjectiveCategory, ObjectiveTemplate } from '../../data/weeklyObjectives'
import { Card } from '../ui/Card'

export function ObjectiveTemplateCard({
  template,
  active,
  onToggle,
}: {
  template: ObjectiveTemplate
  active: boolean
  onToggle: () => void
}) {
  const { i18n } = useTranslation()
  const ar = i18n.language.startsWith('ar')
  const title = ar ? template.titleAr : template.title
  const description = ar ? template.descriptionAr : template.description

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-full rounded-2xl border-2 p-4 text-left transition shadow-sm ${
        active ? 'border-jwan-teal bg-teal-50/50 ring-1 ring-teal-200' : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
            active ? 'bg-teal-600 text-white' : 'bg-slate-100 text-jwan-gray'
          }`}
        >
          {active ? 'On' : 'Off'}
        </span>
        <span className="text-xs text-jwan-gray">{template.category}</span>
      </div>
      <h3 className="mt-2 text-sm font-semibold text-jwan-ink">{title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-jwan-gray">{description}</p>
      <p className="mt-2 text-[10px] text-slate-500">
        <span className="font-medium">Source:</span> {template.source}
      </p>
      <div className="mt-2 rounded-lg bg-white/80 p-2 text-[10px] leading-snug text-teal-900">
        <span className="font-semibold">PDA:</span> {template.pdaNote}
      </div>
      {template.clinicalBasis ? (
        <p className="mt-1 text-[10px] text-jwan-gray">
          <span className="font-medium">Clinical:</span> {template.clinicalBasis}
        </p>
      ) : null}
    </button>
  )
}

export function CustomObjectiveForm({
  onAdd,
}: {
  onAdd: (title: string, description: string, category: ObjectiveCategory) => void
}) {
  const { t } = useTranslation()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<ObjectiveCategory>('family')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    onAdd(title.trim(), description.trim(), category)
    setTitle('')
    setDescription('')
  }

  return (
    <Card title={t('weekly.customTitle')}>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="text-xs font-medium text-jwan-gray">{t('weekly.customName')}</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-jwan-gray">{t('weekly.customDetails')}</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-jwan-gray">{t('weekly.customCategory')}</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ObjectiveCategory)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            {['zones', 'sensory', 'emotion', 'pda', 'social', 'ot', 'enrichment', 'family'].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="rounded-full bg-jwan-teal px-4 py-2 text-sm font-semibold text-white shadow"
        >
          {t('weekly.customAdd')}
        </button>
      </form>
    </Card>
  )
}
