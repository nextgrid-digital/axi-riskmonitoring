import { createFileRoute } from '@tanstack/react-router'
import { Bonds } from '@/features/bonds'

export const Route = createFileRoute('/_authenticated/risk-monitoring/project/portfolio/')({
  component: PortfolioPage,
})

function PortfolioPage() {
  return <Bonds />
}
