import { create } from 'zustand'
import type { SavedView } from '@/features/saved-portfolio/types'
import type { BondFilters } from '@/features/bonds/types'
import { PREDEFINED_VIEW_IDS } from '@/features/saved-portfolio/types'
import { RiskBand, ProgressStatus, PremiumStatus } from '@/features/bonds/types'
import predefinedViewsData from '@/data/saved-portfolio-views.json'

const STORAGE_PREFIX = 'saved-portfolio-view-'

// Pre-defined views
const predefinedViews: SavedView[] = predefinedViewsData.map((view: any) => ({
  id: view.id,
  name: view.name,
  filters: {
    progressStatus: (view.filters?.progressStatus || []).map((s: string) => s as ProgressStatus),
    milestoneDue: view.filters?.milestoneDue || [],
    riskBand: (view.filters?.riskBand || []).map((r: string) => r as RiskBand),
    productTenor: view.filters?.productTenor || [],
    claimPeriodRemaining: view.filters?.claimPeriodRemaining || [],
    collateralOk: view.filters?.collateralOk ?? null,
    premiumPaid: (view.filters?.premiumPaid || []).map((p: string) => p as PremiumStatus),
    reinsuranceOk: view.filters?.reinsuranceOk ?? null,
  },
  isPredefined: true,
}))

interface SavedPortfolioState {
  saveView: (name: string, filters: BondFilters) => string
  loadView: (id: string) => BondFilters | null
  deleteView: (id: string) => void
  getAllViews: () => SavedView[]
  getPredefinedViews: () => SavedView[]
  getUserViews: () => SavedView[]
}

export const useSavedPortfolioStore = create<SavedPortfolioState>(() => ({
  saveView: (name: string, filters: BondFilters): string => {
    const id = `user-${Date.now()}`
    const view: SavedView = {
      id,
      name,
      filters,
      isPredefined: false,
      createdAt: new Date().toISOString(),
    }
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(`${STORAGE_PREFIX}${id}`, JSON.stringify(view))
      }
    } catch {
      // localStorage might not be available
    }
    return id
  },

  loadView: (id: string): BondFilters | null => {
    try {
      // Check pre-defined views first
      const predefined = predefinedViews.find((view) => view.id === id)
      if (predefined) {
        // Normalize filters to current structure
        const filters = predefined.filters as any
        return {
          beneficiary: filters.beneficiary || [],
          industry: filters.industry || [],
          state: filters.state || [],
          bondType: filters.bondType || [],
          tenor: filters.tenor || [],
          exposureAmount: filters.exposureAmount || [],
          internalRating: filters.internalRating || [],
          reinsurance: filters.reinsurance || [],
        }
      }

      // Check localStorage for user views
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem(`${STORAGE_PREFIX}${id}`)
        if (stored) {
          try {
            const view: SavedView = JSON.parse(stored)
            // Normalize filters to current structure
            const filters = view.filters as any
            return {
              beneficiary: filters.beneficiary || [],
              industry: filters.industry || [],
              state: filters.state || [],
              bondType: filters.bondType || [],
              tenor: filters.tenor || [],
              exposureAmount: filters.exposureAmount || [],
              internalRating: filters.internalRating || [],
              reinsurance: filters.reinsurance || [],
            }
          } catch {
            return null
          }
        }
      }
    } catch (error) {
      console.error('Error loading view:', error)
      return null
    }

    return null
  },

  deleteView: (id: string): void => {
    // Don't delete pre-defined views
    if (predefinedViews.some((view) => view.id === id)) {
      return
    }
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(`${STORAGE_PREFIX}${id}`)
      }
    } catch {
      // localStorage might not be available
    }
  },

  getAllViews: (): SavedView[] => {
    const userViews: SavedView[] = []
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i)
          if (key?.startsWith(STORAGE_PREFIX)) {
            try {
              const view: SavedView = JSON.parse(localStorage.getItem(key) || '{}')
              if (view.id && !view.isPredefined) {
                userViews.push(view)
              }
            } catch {
              // Ignore invalid entries
            }
          }
        }
      }
    } catch {
      // localStorage might not be available
    }
    return [...predefinedViews, ...userViews.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
      return dateB - dateA // Most recent first
    })]
  },

  getPredefinedViews: (): SavedView[] => {
    return predefinedViews
  },

  getUserViews: (): SavedView[] => {
    const userViews: SavedView[] = []
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i)
          if (key?.startsWith(STORAGE_PREFIX)) {
            try {
              const view: SavedView = JSON.parse(localStorage.getItem(key) || '{}')
              if (view.id && !view.isPredefined) {
                userViews.push(view)
              }
            } catch {
              // Ignore invalid entries
            }
          }
        }
      }
    } catch {
      // localStorage might not be available
    }
    return userViews.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
      return dateB - dateA // Most recent first
    })
  },
}))

