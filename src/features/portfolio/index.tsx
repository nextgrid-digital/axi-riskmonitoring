import { Main } from '@/components/layout/main'
import { PortfolioMetrics } from './components/portfolio-metrics'
import { PortfolioFilters } from './components/portfolio-filters'
import { PortfolioTable } from './components/portfolio-table'
import { portfolio, calculatePortfolioMetrics } from './data/portfolio'
import { useMemo } from 'react'
import { usePortfolioFilterStore } from '@/stores/portfolio-filter-store'

export function Portfolio() {
  const filters = usePortfolioFilterStore((state) => state.filters)

  // Apply filters to calculate metrics
  const filteredPortfolio = useMemo(() => {
    return portfolio.filter((item) => {
      if (
        filters.geography.length > 0 &&
        !filters.geography.includes(item.geography)
      ) {
        return false
      }
      if (filters.rating.length > 0 && !filters.rating.includes(item.rating)) {
        return false
      }
      if (
        filters.productType.length > 0 &&
        !filters.productType.includes(item.productType)
      ) {
        return false
      }
      if (
        filters.projectType.length > 0 &&
        !filters.projectType.includes(item.projectType)
      ) {
        return false
      }
      if (
        item.bondTenure < filters.bondTenure[0] ||
        item.bondTenure > filters.bondTenure[1]
      ) {
        return false
      }
      if (
        filters.beneficiary.length > 0 &&
        !filters.beneficiary.includes(item.beneficiary)
      ) {
        return false
      }
      if (
        filters.vintage.length > 0 &&
        !filters.vintage.includes(item.vintage)
      ) {
        return false
      }
      if (
        filters.riskBand.length > 0 &&
        !filters.riskBand.includes(item.riskBand)
      ) {
        return false
      }
      return true
    })
  }, [filters])

  const metrics = useMemo(
    () => calculatePortfolioMetrics(filteredPortfolio),
    [filteredPortfolio]
  )

  return (
    <>
      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Portfolio Monitoring Dashboard
            </h2>
            <p className='text-muted-foreground'>
              Monitor contractor risk exposure and portfolio metrics
            </p>
          </div>
          <PortfolioFilters />
        </div>

        <PortfolioMetrics metrics={metrics} />
        <PortfolioTable data={filteredPortfolio} />
      </Main>
    </>
  )
}

