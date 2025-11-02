import { useState, useMemo } from 'react'
import { Main } from '@/components/layout/main'
import { BondFilters } from './components/bond-filters'
import { BondsTable } from './components/bonds-table'
import { BondsGlobalSearch } from './components/bonds-global-search'
import { RiskMonitoringTabs } from '@/features/risk-monitoring'
import { SaveViewDialog } from '@/features/saved-portfolio/components/save-view-dialog'
import { getContractorBondSummaries } from './data/contractor-bonds'

export function Bonds() {
  console.log('Bonds component rendering')
  const [searchQuery, setSearchQuery] = useState('')

  // Get contractor bond summaries
  const contractorSummaries = useMemo(() => {
    try {
      return getContractorBondSummaries()
    } catch (error) {
      console.error('Error loading contractor bond summaries:', error)
      return []
    }
  }, [])

  // Filter by search query
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
      {/* Fixed Header and Tabs */}
      <div className='sticky top-0 z-10 bg-[#F9FAFB] pb-2 pt-2 space-y-4 border-b'>
        {/* Header */}
        <div className='flex items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
            Portfolio Monitoring
          </h2>
            <p className='text-muted-foreground'>
              Track project bonds, exposure, and contractor performance across all projects
            </p>
          </div>
          <SaveViewDialog />
        </div>

        {/* Tabs */}
        <RiskMonitoringTabs />
      </div>

      {/* Main Content Area */}
      <div className='flex gap-6'>
        {/* Left Sidebar - Filters */}
        <aside className='flex-shrink-0 sticky top-[140px] self-start'>
          <BondFilters />
        </aside>

        {/* Main Content - Search + Table */}
        <div className='flex-1 min-w-0 space-y-4'>
          <BondsGlobalSearch value={searchQuery} onChange={setSearchQuery} />
          <BondsTable data={filteredSummaries} />
        </div>
      </div>
    </Main>
  )
}

