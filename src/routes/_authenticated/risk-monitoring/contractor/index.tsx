import { createFileRoute } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'

export const Route = createFileRoute('/_authenticated/risk-monitoring/contractor/')({
  component: ContractorMonitoringPage,
})

function ContractorMonitoringPage() {
  return (
    <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
      <div>
        <h2 className='text-2xl font-bold tracking-tight'>Contractor Monitoring</h2>
        <p className='text-muted-foreground'>
          Monitor and manage contractor performance and risks
        </p>
      </div>
      <div className='flex-1 flex items-center justify-center'>
        <p className='text-muted-foreground'>Contractor Monitoring coming soon...</p>
      </div>
    </Main>
  )
}
