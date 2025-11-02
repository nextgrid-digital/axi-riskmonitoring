import contractorsData from '@/data/contractors.json'
import portfolioData from '@/data/portfolio.json'
import alertsData from '@/data/alerts.json'
import tasksData from '@/data/tasks.json'
import type { Contractor, Bond } from '../types'
import type { Alert } from '@/features/alerts/types'
import type { Task } from '@/features/tasks/types'
import type { PortfolioItem } from '@/features/portfolio/types'

export function getContractorById(id: string): Contractor | undefined {
  return (contractorsData as Contractor[]).find((c) => c.id === id)
}

export function getContractorBonds(contractorId: string): Bond[] {
  const portfolio = portfolioData as PortfolioItem[]
  const contractor = portfolio.find((p) => p.contractorId === contractorId)

  if (!contractor) return []

  // Generate bonds based on portfolio data
  const bonds: Bond[] = []
  for (let i = 0; i < contractor.projects; i++) {
    bonds.push({
      id: `BOND-${contractorId}-${String.fromCharCode(65 + i)}`,
      projectName: `Project ${String.fromCharCode(65 + i)}`,
      amount: contractor.exposure / contractor.projects,
      productType: contractor.productType,
      projectType: contractor.projectType,
      bondTenure: contractor.bondTenure,
      beneficiary: contractor.beneficiary,
      startDate: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toISOString(),
      expiryDate: new Date(
        Date.now() + contractor.bondTenure * 30 * 24 * 60 * 60 * 1000 - i * 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      status: 'Active' as const,
    })
  }

  return bonds
}

export function getContractorAlerts(contractorId: string): Alert[] {
  return (alertsData as Alert[]).filter(
    (alert) => alert.contractorId === contractorId
  )
}

export function getContractorTasks(contractorId: string): Task[] {
  return (tasksData as Task[]).filter((task) => task.contractorId === contractorId)
}

export function getContractorExposureTrend(
  contractorId: string,
  months: number = 12
): { date: string; amount: number }[] {
  const contractor = (portfolioData as PortfolioItem[]).find(
    (p) => p.contractorId === contractorId
  )
  if (!contractor) return []

  const trend = []
  const now = new Date()
  const baseExposure = contractor.exposure

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setMonth(date.getMonth() - i)
    trend.push({
      date: date.toISOString(),
      amount: baseExposure * (0.9 + Math.random() * 0.2), // Simulate variation
    })
  }

  return trend
}

