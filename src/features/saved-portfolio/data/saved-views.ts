import type { SavedView } from '../types'
import predefinedViewsData from '@/data/saved-portfolio-views.json'

const STORAGE_PREFIX = 'saved-portfolio-view-'

/**
 * Load pre-defined views from JSON data
 */
export function loadPredefinedViews(): SavedView[] {
  return predefinedViewsData.map((view: any) => ({
    id: view.id,
    name: view.name,
    filters: {
      beneficiary: view.filters?.beneficiary || [],
      industry: view.filters?.industry || [],
      state: view.filters?.state || [],
      bondType: view.filters?.bondType || [],
      tenor: view.filters?.tenor || view.filters?.productTenor || [],
      exposureAmount: view.filters?.exposureAmount || [],
      internalRating: view.filters?.internalRating || [],
      reinsurance: view.filters?.reinsurance || (view.filters?.reinsuranceOk ? ['OK'] : []),
    },
    isPredefined: true,
  }))
}

/**
 * Load user views from localStorage
 */
export function loadUserViews(): SavedView[] {
  const userViews: SavedView[] = []
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
  return userViews.sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
    return dateB - dateA // Most recent first
  })
}

/**
 * Combine pre-defined and user views
 */
export function getAllViews(): SavedView[] {
  return [...loadPredefinedViews(), ...loadUserViews()]
}

