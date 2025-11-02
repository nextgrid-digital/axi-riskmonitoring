import { createFileRoute } from '@tanstack/react-router'
import { Alerts } from '@/features/alerts'

export const Route = createFileRoute('/_authenticated/risk-monitoring/project/alerts/')({
  component: AlertsPage,
})

function AlertsPage() {
  return <Alerts />
}
