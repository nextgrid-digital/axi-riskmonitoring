import { createFileRoute } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'

function IssuedBonds() {
  return (
    <>
      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Issued Bonds</h2>
          <p className='text-muted-foreground'>Issued bonds management</p>
        </div>
      </Main>
    </>
  )
}

export const Route = createFileRoute('/_authenticated/issued-bonds/')({
  component: IssuedBonds,
})
