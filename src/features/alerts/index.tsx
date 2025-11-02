import { Main } from '@/components/layout/main'
import { AlertsFilters } from './components/alerts-filters'
import { AlertsTable } from './components/alerts-table'
import { RiskMonitoringTabs } from '@/features/risk-monitoring'
import { alerts } from './data/alerts'

export function Alerts() {
  return (
    <>
      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
                <div className='flex flex-wrap items-end justify-between gap-2'>
                  <div>
                    <h2 className='text-2xl font-bold tracking-tight'>Risk Portfolio</h2>
                    <p className='text-muted-foreground'>
                      View and manage all system and custom alerts
                    </p>
                  </div>
                  <AlertsFilters />
                </div>

        {/* Tabs */}
        <RiskMonitoringTabs />

        <AlertsTable data={alerts} />
      </Main>
    </>
  )
}

