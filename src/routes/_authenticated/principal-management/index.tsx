import { createFileRoute } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'

function PrincipalManagement() {
  return (
    <>
      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Principal Management</h2>
          <p className='text-muted-foreground'>Principal management page</p>
        </div>
      </Main>
    </>
  )
}

export const Route = createFileRoute('/_authenticated/principal-management/')({
  component: PrincipalManagement,
})
