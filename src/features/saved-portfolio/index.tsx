import { useState, useMemo, useEffect } from 'react'
import { Main } from '@/components/layout/main'
import { BondsTable } from '@/features/bonds/components/bonds-table'
import { BondsGlobalSearch } from '@/features/bonds/components/bonds-global-search'
import { RiskMonitoringTabs } from '@/features/risk-monitoring'
import { SavedViewsList } from './components/saved-views-list'
import { SaveViewDialog } from './components/save-view-dialog'
import { useSavedPortfolioStore } from '@/stores/saved-portfolio-store'
import { useBondFilterStore } from '@/stores/bond-filter-store'
import { getContractorBondSummaries } from '@/features/bonds/data/contractor-bonds'

export function SavedPortfolio() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedViewId, setSelectedViewId] = useState<string | null>(null)
  
  const getAllViews = useSavedPortfolioStore((state) => state.getAllViews)
  const loadView = useSavedPortfolioStore((state) => state.loadView)
  const applyFilters = useBondFilterStore((state) => state.applyFilters)

  // Get contractor bond summaries
  const contractorSummaries = useMemo(() => {
    try {
      return getContractorBondSummaries()
    } catch (error) {
      console.error('Error loading contractor bond summaries:', error)
      return []
    }
  }, [])

  // Load first view on mount
  useEffect(() => {
    try {
      const views = getAllViews()
      if (views.length > 0) {
        const firstView = views[0]
        setSelectedViewId(firstView.id)
        const filters = loadView(firstView.id)
        if (filters) {
          applyFilters(filters)
        }
      }
    } catch (error) {
      console.error('Error loading first view:', error)
    }
  }, [getAllViews, loadView, applyFilters])

  // Filter by search query only
  // BondsTable will apply filters from the store
  const filteredSummaries = useMemo(() => {
    if (!searchQuery.trim()) {
      return contractorSummaries
    }

    const query = searchQuery.toLowerCase()
    return contractorSummaries.filter((summary) => {
      return (
        summary.bondId.toLowerCase().includes(query) ||
        summary.contractorName.toLowerCase().includes(query) ||
        summary.panNumber.toLowerCase().includes(query) ||
        summary.industry.toLowerCase().includes(query) ||
        summary.state.toLowerCase().includes(query) ||
        summary.beneficiary.toLowerCase().includes(query)
      )
    })
  }, [contractorSummaries, searchQuery])

  return (
    <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
      {/* Header */}
      <div className='flex items-end justify-between gap-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>
            Risk Portfolio
          </h2>
          <p className='text-muted-foreground'>
            Access your saved filter views
          </p>
        </div>
        <SaveViewDialog />
      </div>

      {/* Tabs */}
      <RiskMonitoringTabs />

      {/* Main Content Area */}
      <div className='flex gap-6'>
        {/* Left Sidebar - Saved Views List */}
        <aside className='w-48 flex-shrink-0 border-r pr-3'>
          <SavedViewsList selectedViewId={selectedViewId} onViewSelect={setSelectedViewId} />
        </aside>

        {/* Right Side - Search + Table */}
        <div className='flex-1 min-w-0 space-y-4'>
          <BondsGlobalSearch value={searchQuery} onChange={setSearchQuery} />
          <BondsTable data={filteredSummaries} />
        </div>
      </div>
    </Main>
  )
}

