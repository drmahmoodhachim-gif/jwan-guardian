import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pencil, Trash2 } from 'lucide-react'
import type { Reminder } from '../../types'

export function ReminderList({
  reminders,
  loading,
  updateReminder,
  removeReminder,
}: {
  reminders: Reminder[]
  loading: boolean
  updateReminder: (
    id: string,
    patch: Partial<Pick<Reminder, 'text_en' | 'text_ar' | 'frequency' | 'assigned_to' | 'is_active'>>,
  ) => Promise<{ error: string | null }>
  removeReminder: (id: string) => Promise<{ error: string | null }>
}) {
  const { t, i18n } = useTranslation()
  const ar = i18n.language.startsWith('ar')
  const [editing, setEditing] = useState<string | null>(null)
  const [draft, setDraft] = useState<Partial<Reminder>>({})
  const [busy, setBusy] = useState<string | null>(null)

  function startEdit(r: Reminder) {
    setEditing(r.id)
    setDraft({
      text_en: r.text_en,
      text_ar: r.text_ar ?? '',
      frequency: r.frequency,
      assigned_to: r.assigned_to,
      is_active: r.is_active,
    })
  }

  async function save(id: string) {
    setBusy(id)
    const { error } = await updateReminder(id, {
      text_en: (draft.text_en ?? '').trim(),
      text_ar: (draft.text_ar ?? '').trim() || null,
      frequency: draft.frequency,
      assigned_to: (draft.assigned_to ?? 'all').trim() || 'all',
      is_active: draft.is_active,
    })
    setBusy(null)
    if (!error) setEditing(null)
  }

  async function del(id: string) {
    if (!window.confirm(t('reminders.confirmDelete'))) return
    setBusy(id)
    await removeReminder(id)
    setBusy(null)
  }

  if (loading) {
    return <p className="text-sm text-jwan-gray">{t('common.loading')}</p>
  }

  if (reminders.length === 0) {
    return <p className="text-sm text-jwan-gray">{t('reminders.empty')}</p>
  }

  return (
    <ul className="flex flex-col gap-3">
      {reminders.map((r) => (
        <li
          key={r.id}
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          {editing === r.id ? (
            <div className="flex flex-col gap-3">
              <input
                value={draft.text_en ?? ''}
                onChange={(e) => setDraft((d) => ({ ...d, text_en: e.target.value }))}
                className="rounded border border-slate-200 px-2 py-1 text-sm"
              />
              <input
                value={draft.text_ar ?? ''}
                onChange={(e) => setDraft((d) => ({ ...d, text_ar: e.target.value }))}
                dir="rtl"
                className="rounded border border-slate-200 px-2 py-1 text-sm"
              />
              <div className="flex flex-wrap gap-2">
                <select
                  value={draft.frequency}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, frequency: e.target.value as Reminder['frequency'] }))
                  }
                  className="rounded border px-2 py-1 text-xs"
                >
                  {(['once', 'daily', 'weekly', 'monthly'] as const).map((f) => (
                    <option key={f} value={f}>
                      {t(`frequency.${f}`)}
                    </option>
                  ))}
                </select>
                <input
                  value={draft.assigned_to ?? ''}
                  onChange={(e) => setDraft((d) => ({ ...d, assigned_to: e.target.value }))}
                  className="min-w-[8rem] rounded border px-2 py-1 text-xs"
                  placeholder={t('reminders.assigned')}
                  aria-label={t('reminders.assigned')}
                />
                <label className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={draft.is_active ?? true}
                    onChange={(e) => setDraft((d) => ({ ...d, is_active: e.target.checked }))}
                  />
                  {t('reminders.active')}
                </label>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={busy === r.id}
                  onClick={() => void save(r.id)}
                  className="rounded-lg bg-jwan-teal px-3 py-1 text-sm text-white"
                >
                  {t('common.save')}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="rounded-lg border px-3 py-1 text-sm"
                >
                  {t('common.cancel')}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-jwan-ink">
                    {ar && r.text_ar ? r.text_ar : r.text_en}
                  </p>
                  {r.text_ar && !ar ? (
                    <p className="mt-1 text-sm text-jwan-gray" dir="rtl">
                      {r.text_ar}
                    </p>
                  ) : null}
                  <p className="mt-2 text-xs text-jwan-gray">
                    {t(`frequency.${r.frequency}`)} · {t('reminders.assignLabel')}: {r.assigned_to}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      r.is_active ? 'bg-teal-100 text-teal-900' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {r.is_active ? t('reminders.active') : t('reminders.inactive')}
                  </span>
                  <button
                    type="button"
                    onClick={() => startEdit(r)}
                    className="rounded-lg p-2 text-jwan-gray hover:bg-slate-100"
                    aria-label={t('reminders.edit')}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => void del(r.id)}
                    disabled={busy === r.id}
                    className="rounded-lg p-2 text-rose-600 hover:bg-rose-50"
                    aria-label={t('reminders.delete')}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  )
}
