import portfolioData from '@/data/portfolio.json'
import alertsData from '@/data/alerts.json'
import tasksData from '@/data/tasks.json'
import type { PortfolioItem, PortfolioMetrics } from '../types'

export const portfolio: PortfolioItem[] = portfolioData as PortfolioItem[]
export const alerts = alertsData
export const tasks = tasksData

export function calculatePortfolioMetrics(
  portfolioItems: PortfolioItem[]
): PortfolioMetrics {
  const totalActiveRisk = portfolioItems.reduce(
    (sum, item) => sum + item.exposure,
    0
  )

  const contractorsUnderWatch = portfolioItems.filter(
    (item) => item.alerts > 0 || item.tasks > 0
  ).length

  const totalAlerts = portfolioItems.reduce((sum, item) => sum + item.alerts, 0)

  const totalTasks = portfolioItems.reduce((sum, item) => sum + item.tasks, 0)

  // Calculate risk expiring soon (next 90 days)
  const now = new Date()
  const ninetyDaysLater = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000)

  const riskExpiringSoon = portfolioItems
    .filter((item) => {
      const nextDueDate = new Date(item.nextDue)
      return nextDueDate >= now && nextDueDate <= ninetyDaysLater
    })
    .reduce((sum, item) => sum + item.exposure, 0)

  return {
    totalActiveRisk,
    contractorsUnderWatch,
    alertsTriggered: totalAlerts,
    tasksOpen: totalTasks,
    riskExpiringSoon,
  }
}

