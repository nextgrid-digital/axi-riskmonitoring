import { createFileRoute } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'
import { Bonds } from '@/features/bonds'

export const Route = createFileRoute('/_authenticated/risk-monitoring/project/')({
  component: ProjectMonitoringPage,
})

function ProjectMonitoringPage() {
  console.log('ProjectMonitoringPage rendering')
  
  try {
    return (
      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <Bonds />
      </Main>
    )
  } catch (error) {
    console.error('Error in ProjectMonitoringPage:', error)
    return (
      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='p-6'>
          <h2 className='text-2xl font-bold tracking-tight text-red-600'>Error Loading Page</h2>
          <p className='text-muted-foreground mt-2'>
            {error instanceof Error ? error.message : 'Unknown error occurred'}
          </p>
        </div>
      </Main>
    )
  }
}