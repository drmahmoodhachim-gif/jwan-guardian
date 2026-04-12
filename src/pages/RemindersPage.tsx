import { useTranslation } from 'react-i18next'
import { useReminders } from '../hooks/useReminders'
import { ReminderForm } from '../components/reminders/ReminderForm'
import { ReminderList } from '../components/reminders/ReminderList'
import { Card } from '../components/ui/Card'

export function RemindersPage() {
  const { t } = useTranslation()
  const { reminders, loading, addReminder, updateReminder, removeReminder } = useReminders({
    onlyActive: false,
  })

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-jwan-ink">{t('nav.reminders')}</h1>
        <p className="mt-1 max-w-2xl text-sm text-jwan-gray">{t('reminders.subtitle')}</p>
      </div>

      <ReminderForm addReminder={addReminder} />

      <Card title={t('reminders.listTitle')}>
        <ReminderList
          reminders={reminders}
          loading={loading}
          updateReminder={updateReminder}
          removeReminder={removeReminder}
        />
      </Card>
    </div>
  )
}
