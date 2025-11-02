import type { BondFilters } from '@/features/bonds/types'

export interface SavedView {
  id: string
  name: string
  filters: BondFilters
  isPredefined: boolean
  createdAt?: string
}

export const PREDEFINED_VIEW_IDS = {
  AT_RISK_BONDS: 'at-risk-bonds',
  DELAYED_PROJECTS: 'delayed-projects',
  PREMIUM_OVERDUE: 'premium-overdue',
  LOW_COLLATERAL: 'low-collateral',
} as const

export type PredefinedViewId = typeof PREDEFINED_VIEW_IDS[keyof typeof PREDEFINED_VIEW_IDS]

