import { createFileRoute } from '@tanstack/react-router'
import { Tasks } from '@/features/tasks'
import { Main } from '@/components/layout/main'

export const Route = createFileRoute('/_authenticated/risk-monitoring/project/tasks/')({
  component: TasksPage,
})

function TasksPage() {
  try {
    return <Tasks />
  } catch (error) {
    console.error('Error in TasksPage:', error)
    return (
      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='p-6'>
          <h2 className='text-2xl font-bold tracking-tight text-red-600'>Error Loading Page</h2>
          <p className='text-muted-foreground mt-2'>
            {error instanceof Error ? error.message : 'Unknown error occurred'}
          </p>
          <p className='text-sm text-muted-foreground mt-4'>
            Check the browser console for more details.
          </p>
        </div>
      </Main>
    )
  }
}
