import { createFileRoute } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'
import { Card } from '@/components/ui/card'

export const Route = createFileRoute('/_authenticated/strategy/')({
  component: StrategyPage,
})

function StrategyPage() {
  return (
    <Main className='flex flex-1 flex-col gap-6'>
      <h2 className='text-2xl font-bold'>Contractor Strategy Register</h2>
      <Card className='p-6'>
        <p className='text-muted-foreground'>Strategy timeline functionality coming soon...</p>
      </Card>
    </Main>
  )
}
