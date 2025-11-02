import { createFileRoute } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'

function InIssuance() {
  return (
    <>
      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>In Issuance</h2>
          <p className='text-muted-foreground'>Bond applications in issuance</p>
        </div>
      </Main>
    </>
  )
}

export const Route = createFileRoute('/_authenticated/bond-applications/issuance')({
  component: InIssuance,
})
