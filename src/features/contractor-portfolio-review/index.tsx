import { useState, useMemo, useEffect } from 'react'
import { Main } from '@/components/layout/main'
import { BondFilters } from '@/features/bonds/components/bond-filters'
import { BondsGlobalSearch } from '@/features/bonds/components/bonds-global-search'
import { BondPortfolioTable } from './components/bond-portfolio-table'
import { SaveViewDialog } from '@/features/saved-portfolio/components/save-view-dialog'
import { bonds } from '@/features/bonds/data/bonds'
import { getCaseForBond } from '@/features/case/data/case'

interface ContractorPortfolioReviewProps {
  initialSearch?: string
}

export function ContractorPortfolioReview({ initialSearch = '' }: ContractorPortfolioReviewProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  
  // Update search query when initialSearch changes (e.g., from URL params)
  useEffect(() => {
    if (initialSearch) {
      setSearchQuery(initialSearch)
    }
  }, [initialSearch])

  // Generate random project names
  const randomProjectNames = useMemo(() => {
    const projects = [
      'Highway Expansion Phase 2',
      'Metro Rail Extension',
      'Bridge Construction Project',
      'Airport Terminal Upgrade',
      'Port Development Initiative',
      'Urban Infrastructure Modernization',
      'Railway Network Enhancement',
      'Smart City Infrastructure',
      'Water Treatment Facility',
      'Renewable Energy Plant',
      'Industrial Park Development',
      'Coastal Road Construction',
      'Underground Metro Line',
      'Expressway Connectivity',
      'Logistics Hub Development',
      'Municipal Waste Management',
      'Seismic Retrofit Project',
      'Green Building Initiative',
      'Traffic Management System',
      'Public Transportation Network',
    ]
    // Shuffle array to randomize
    const shuffled = [...projects].sort(() => Math.random() - 0.5)
    return shuffled
  }, [])

  // Enhance bonds with additional data from case data
  const enhancedBonds = useMemo(() => {
    return bonds.map((bond, index) => {
      const caseData = getCaseForBond(bond.id)
      // Derive industry from contractor or beneficiary
      const industry = bond.industry || (() => {
        if (bond.beneficiary.includes('NTPC') || bond.beneficiary.includes('BHEL')) return 'Power'
        if (bond.beneficiary.includes('NHAI')) return 'Transportation'
        return 'EPC / Infrastructure'
      })()
      
      // First bond (PAB4048) uses case data, others use random project names
      const projectName = index === 0 
        ? (caseData?.project_name || `${bond.contractor} - Project`)
        : randomProjectNames[index % randomProjectNames.length] || `${bond.contractor} - Project ${index + 1}`
      
      // First bond value is 28 crore, others use estimated value
      const bondValue = index === 0
        ? 28.0 // First bond is 28 crore
        : (() => {
            const estimatedValue = (bond.claimPeriodRemaining / 180) * 10 // Rough estimate
            return estimatedValue || 1.0 // Default 1 crore
          })()
      
      return {
        ...bond,
        industry,
        projectName,
        bondValue,
        bondStartDate: bond.lastUpdate,
        bondEndDate: bond.milestoneDueDate,
        premiumRate: (() => {
          // Default premium rate based on risk band
          if (bond.riskBand === 'Red') return 2.5
          if (bond.riskBand === 'Amber') return 1.75
          return 1.5 // Green
        })(),
      }
    })
  }, [randomProjectNames])

  // Filter by search query
  const filteredBonds = useMemo(() => {
    if (!searchQuery.trim()) {
      return enhancedBonds
    }

    const query = searchQuery.toLowerCase()
    return enhancedBonds.filter((bond) => {
      return (
        bond.id.toLowerCase().includes(query) ||
        bond.bondNumber.toLowerCase().includes(query) ||
        bond.contractor.toLowerCase().includes(query) ||
        bond.beneficiary.toLowerCase().includes(query) ||
        (bond.industry && bond.industry.toLowerCase().includes(query)) ||
        (bond.projectName && bond.projectName.toLowerCase().includes(query))
      )
    })
  }, [enhancedBonds, searchQuery])

  return (
    <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
      {/* Fixed Header */}
      <div className='sticky top-0 z-10 bg-[#F9FAFB] pb-2 pt-2 border-b'>
        {/* Header */}
        <div className='flex items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Contractor Portfolio Review
            </h2>
            <p className='text-muted-foreground'>
              Track project bonds, exposure, and contractor performance across all projects
            </p>
          </div>
          <SaveViewDialog />
        </div>
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
          <BondPortfolioTable data={filteredBonds} />
        </div>
      </div>
    </Main>
  )
}

