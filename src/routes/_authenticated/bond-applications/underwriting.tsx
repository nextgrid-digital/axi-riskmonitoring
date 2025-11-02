import { createFileRoute } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'

function InUnderwriting() {
  return (
    <>
      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>In Underwriting</h2>
          <p className='text-muted-foreground'>Bond applications in underwriting</p>
        </div>
      </Main>
    </>
  )
}

export const Route = createFileRoute('/_authenticated/bond-applications/underwriting')({
  component: InUnderwriting,
})
