import type { Alert } from '@/features/alerts/types'
import type { PortfolioItem } from '@/features/portfolio/types'
import type { Task } from '@/features/tasks/types'

export interface Bond {
  id: string
  projectName: string
  amount: number // ₹Cr
  productType: string
  projectType: string
  bondTenure: number // months
  beneficiary: string
  startDate: string // ISO date string
  expiryDate: string // ISO date string
  status: 'Active' | 'Expired' | 'Closed'
}

export interface Contractor {
  id: string
  name: string
  rating: string
  geography: string
  contactPerson: string
  email: string
  phone: string
  address: string
  established: string
  employeeCount: number
  totalExposure: number // ₹Cr
  activeProjects: number
  completedProjects: number
}

export interface ContractorDetail {
  contractor: Contractor
  bonds: Bond[]
  tasks: Task[]
  alerts: Alert[]
  exposureTrend: {
    date: string
    amount: number
  }[]
}

